import React, { useState } from 'react';
import { 
  MessageSquareCheck, 
  CheckCircle2, 
  Search, 
  ShieldAlert, 
  Camera,
  Loader2,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  PhoneCall
} from 'lucide-react';
import { complaintCategories } from '../data/complaintsData';

export default function ComplaintsPage({ lang }) {
  const isHi = lang === 'hi';
  const [activeTab, setActiveTab] = useState('lodge'); // 'lodge' | 'track'

  // Form state
  const [formData, setFormData] = useState({
    recordType: 'complaint', // 'complaint' | 'suggestion'
    citizenName: '',
    mobile: '',
    category: 'water',
    description: '',
    location: '',
    photoPreview: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState(null);

  // Tracking state
  const [trackingId, setTrackingId] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [trackedResult, setTrackedResult] = useState(null);
  const [trackError, setTrackError] = useState('');

  // Client-side image compression for fast & resilient upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert(isHi ? 'फ़ोटो का आकार 5MB से कम होना चाहिए।' : 'Photo size should be less than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const scaleSize = MAX_WIDTH / img.width;
        if (scaleSize < 1) {
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
        setFormData(prev => ({ ...prev, photoPreview: compressedDataUrl }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errs = {};
    if (!formData.citizenName.trim()) {
      errs.citizenName = isHi ? 'कृपया अपना पूरा नाम दर्ज करें' : 'Name is required';
    }
    const mobileDigits = formData.mobile.replace(/\D/g, '');
    if (!mobileDigits || mobileDigits.length !== 10) {
      errs.mobile = isHi ? 'कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें' : 'Enter valid 10-digit mobile number';
    }
    if (!formData.description.trim() || formData.description.trim().length < 15) {
      errs.description = isHi ? 'कृपया कम से कम 15 अक्षरों में स्पष्ट विवरण दें' : 'Please provide details (min 15 chars)';
    }
    if (!formData.location.trim()) {
      errs.location = isHi ? 'कृपया गाँव में सटीक स्थान अथवा मोहल्ला बताएं' : 'Village location/mohalla is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!validate()) return;

    setIsSubmitting(true);

    const catObj = complaintCategories.find(c => c.id === formData.category);
    const categoryName = catObj ? catObj.nameHi : 'अन्य';

    try {
      const payload = {
        recordType: formData.recordType,
        citizenName: formData.citizenName,
        mobile: formData.mobile,
        category: categoryName,
        mohallaLocation: formData.location,
        description: formData.description,
        photoUrl: formData.photoPreview
      };

      const res = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || (isHi ? 'डेटाबेस में सहेजने में विफल। कृपया पुनः प्रयास करें।' : 'Failed to save to database.'));
      }

      // ONLY display success modal when verified by database
      setSubmittedTicket({
        ticketId: data.ticketId,
        recordType: data.recordType,
        citizenName: formData.citizenName,
        category: categoryName,
        location: formData.location,
        description: formData.description,
        status: data.status || 'प्राप्त',
        submittedAt: new Date().toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        whatsappNotice: data.whatsapp?.sent ? 'अधिसूचना व्यवस्थापक को प्रेषित' : null
      });

      // Reset form
      setFormData({
        recordType: 'complaint',
        citizenName: '',
        mobile: '',
        category: 'water',
        description: '',
        location: '',
        photoPreview: null
      });
      setErrors({});
    } catch (err) {
      console.error('Complaint lodge error:', err);
      setSubmitError(err.message || (isHi ? 'सर्वर से संपर्क करने में असमर्थ। कृपया बाद में प्रयास करें।' : 'Network error. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTrackSubmit = async (e) => {
    e.preventDefault();
    setTrackError('');
    setTrackedResult(null);

    const q = trackingId.trim().toUpperCase();
    if (!q) {
      setTrackError(isHi ? 'कृपया ट्रैकिंग टिकट संख्या दर्ज करें' : 'Enter ticket ID');
      return;
    }

    setIsTracking(true);
    try {
      const res = await fetch(`/api/track?ticketId=${encodeURIComponent(q)}`);
      const data = await res.json();

      if (!res.ok || !data.success || !data.record) {
        setTrackError(data.error || (isHi ? 'यह टिकट संख्या नहीं मिली। कृपया सही आईडी (उदा. IND-2026-1042) जांचें।' : 'Ticket ID not found.'));
      } else {
        setTrackedResult(data.record);
      }
    } catch (err) {
      console.error('Tracking fetch error:', err);
      setTrackError(isHi ? 'सर्वर से स्थिति प्राप्त करने में त्रुटि। कृपया पुनः प्रयास करें।' : 'Failed to fetch status from server.');
    } finally {
      setIsTracking(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'पूर्ण':
      case 'निस्तारित':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'प्रगति पर':
      case 'प्रक्रियाधीन':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'जाँच में':
      case 'पंजीकृत (समीक्षाधीन)':
        return 'bg-sky-100 text-sky-900 border-sky-300';
      case 'प्राप्त':
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden border border-emerald-800/40">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider">
            <MessageSquareCheck className="w-3.5 h-3.5" />
            <span>{isHi ? 'नागरिक निवारण एवं सुझाव पोर्टल' : 'Citizen Grievance & Suggestion Cell'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isHi ? 'जन-समस्या एवं सुझाव निवारण प्रणाली' : 'Grievance & Suggestion Redressal'}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {isHi 
              ? 'गाँव इन्द्रौली में पानी, सड़क, स्ट्रीट लाइट, सफाई अथवा किसी भी जनसुविधा से संबंधित समस्या या विकास सुझाव को ऑनलाइन दर्ज करें तथा उसकी स्थिति सीधे ट्रैक करें।' 
              : 'Submit village grievances or community suggestions and track resolution status transparently.'}
          </p>

          {/* Rajasthan Sampark 181 & Grievance Notice */}
          <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700 text-xs text-amber-300 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
            <div className="space-y-1">
              <span>
                {isHi 
                  ? 'नागरिक सूचना: यह ग्राम पंचायत इन्द्रौली का स्थानीय नागरिक सुविधा एवं सुझाव पोर्टल है। यदि समस्या आपातकालीन अथवा राज्य स्तरीय हो, तो सीधे 181 (राजस्थान संपर्क) अथवा 112 पर कॉल करें।' 
                  : 'Notice: This is Gram Panchayat Indroli civic portal. For emergency or state-level redressal, dial 181 (Rajasthan Sampark) or 112 directly.'}
              </span>
              <div className="pt-0.5">
                <a 
                  href="https://sampark.rajasthan.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-bold hover:underline"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>राजस्थान संपर्क पोर्टल (181) खोलें</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Switcher: Lodge Complaint vs Track Complaint */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('lodge')}
          className={`py-3 px-6 text-sm font-bold border-b-2 transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'lodge'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <MessageSquareCheck className="w-4 h-4" />
          <span>{isHi ? 'नई समस्या / सुझाव दर्ज करें' : 'Lodge Grievance / Suggestion'}</span>
        </button>

        <button
          onClick={() => setActiveTab('track')}
          className={`py-3 px-6 text-sm font-bold border-b-2 transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'track'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>{isHi ? 'स्थिति जांचें (Track Status)' : 'Track Status'}</span>
        </button>
      </div>

      {/* 3. TAB 1: LODGE COMPLAINT / SUGGESTION FORM */}
      {activeTab === 'lodge' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-xl font-bold text-slate-900">
                {isHi ? 'नागरिक शिकायत / विकास सुझाव प्रपत्र' : 'Citizen Grievance & Suggestion Submission Form'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {isHi ? 'कृपया सही व स्पष्ट विवरण भरें। यह सीधे इन्द्रौली ग्राम पोर्टल डेटाबेस में सुरक्षित होगा।' : 'Please fill accurate particulars. It will be stored in Indroli database.'}
              </p>
            </div>

            {/* Error Banner */}
            {submitError && (
              <div className="p-3.5 bg-red-50 border border-red-300 rounded-xl text-red-700 text-xs flex items-start gap-2 animate-in fade-in">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Record Type Selector (Complaint vs Suggestion) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                {isHi ? 'प्रकार चुनें' : 'Submission Type'} <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, recordType: 'complaint' }))}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition flex items-center gap-2.5 ${
                    formData.recordType === 'complaint'
                      ? 'border-emerald-700 bg-emerald-50/70 text-emerald-950 font-bold'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <MessageSquareCheck className={`w-4 h-4 ${formData.recordType === 'complaint' ? 'text-emerald-700' : 'text-slate-400'}`} />
                  <div>
                    <span className="block text-xs font-bold">{isHi ? 'जन-समस्या (शिकायत)' : 'Civic Grievance'}</span>
                    <span className="block text-[10px] text-slate-500">{isHi ? 'सड़क, पानी, लाइट आदि' : 'Road, Water, Light'}</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, recordType: 'suggestion' }))}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition flex items-center gap-2.5 ${
                    formData.recordType === 'suggestion'
                      ? 'border-emerald-700 bg-emerald-50/70 text-emerald-950 font-bold'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Lightbulb className={`w-4 h-4 ${formData.recordType === 'suggestion' ? 'text-amber-600' : 'text-slate-400'}`} />
                  <div>
                    <span className="block text-xs font-bold">{isHi ? 'गाँव विकास सुझाव' : 'Development Suggestion'}</span>
                    <span className="block text-[10px] text-slate-500">{isHi ? 'नई योजना, नवाचार' : 'Idea & Proposals'}</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Field: Name */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                {isHi ? 'नागरिक का पूरा नाम' : 'Full Name'} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.citizenName}
                onChange={(e) => setFormData({ ...formData, citizenName: e.target.value })}
                placeholder={isHi ? "उदा. रमेश चन्द" : "e.g. Ramesh Chand"}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-xs focus:outline-none focus:ring-2 ${
                  errors.citizenName ? 'border-red-400 focus:ring-red-300' : 'border-slate-300 focus:ring-emerald-600'
                }`}
              />
              {errors.citizenName && <p className="text-red-500 text-[11px]">{errors.citizenName}</p>}
            </div>

            {/* Field: Mobile Number */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                {isHi ? 'मोबाइल नंबर (10 अंक)' : 'Mobile Number (10 digits)'} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                  placeholder="9829000000"
                  className={`w-full pl-12 pr-3.5 py-2.5 rounded-lg border text-xs focus:outline-none focus:ring-2 ${
                    errors.mobile ? 'border-red-400 focus:ring-red-300' : 'border-slate-300 focus:ring-emerald-600'
                  }`}
                />
              </div>
              {errors.mobile && <p className="text-red-500 text-[11px]">{errors.mobile}</p>}
            </div>

            {/* Field: Category */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                {isHi ? 'विषय / समस्या की श्रेणी' : 'Category'} <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                {complaintCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {isHi ? cat.nameHi : cat.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Field: Village Location */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                {isHi ? 'गाँव में स्थान / मोहल्ला / लैंडमार्क' : 'Village Location / Mohalla'} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder={isHi ? "उदा. वार्ड नं. 3, स्कूल वाली गली या चौपाल के पास" : "e.g. Ward 3, Near school lane"}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-xs focus:outline-none focus:ring-2 ${
                  errors.location ? 'border-red-400 focus:ring-red-300' : 'border-slate-300 focus:ring-emerald-600'
                }`}
              />
              {errors.location && <p className="text-red-500 text-[11px]">{errors.location}</p>}
            </div>

            {/* Field: Problem Description */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                {isHi ? 'समस्या या सुझाव का स्पष्ट विवरण' : 'Detailed Description'} <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={isHi ? "कृपया समस्या अथवा सुझाव का विस्तार से वर्णन करें (कम से कम 15 अक्षर)..." : "Describe the issue or suggestion in detail..."}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-xs focus:outline-none focus:ring-2 ${
                  errors.description ? 'border-red-400 focus:ring-red-300' : 'border-slate-300 focus:ring-emerald-600'
                }`}
              />
              {errors.description && <p className="text-red-500 text-[11px]">{errors.description}</p>}
            </div>

            {/* Field: Photo Upload (Optional) */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                {isHi ? 'स्थल का फ़ोटो संलग्न करें (वैकल्पिक)' : 'Upload Site Photo (Optional)'}
              </label>
              
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center hover:border-emerald-500 transition">
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {formData.photoPreview ? (
                  <div className="space-y-2">
                    <img src={formData.photoPreview} alt="Preview" className="h-36 mx-auto object-cover rounded-xl shadow-sm border border-slate-200" />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, photoPreview: null }))}
                      className="text-xs text-red-600 font-bold hover:underline cursor-pointer"
                    >
                      {isHi ? 'फ़ोटो हटाएं' : 'Remove Photo'}
                    </button>
                  </div>
                ) : (
                  <label htmlFor="photo-upload" className="cursor-pointer space-y-1 block">
                    <Camera className="w-8 h-8 mx-auto text-slate-400" />
                    <span className="block text-xs font-semibold text-emerald-800">
                      {isHi ? 'फ़ोटो चुनने के लिए यहाँ क्लिक करें' : 'Click to select photo'}
                    </span>
                    <span className="block text-[11px] text-slate-400">JPG, PNG (अधिकतम 5MB)</span>
                  </label>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold text-sm rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                    <span>{isHi ? 'सुरक्षित रूप से दर्ज किया जा रहा है...' : 'Saving to Database...'}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>
                      {formData.recordType === 'suggestion' 
                        ? (isHi ? 'सुझाव दर्ज करें (Submit Suggestion)' : 'Submit Suggestion')
                        : (isHi ? 'शिकायत दर्ज करें (Submit Grievance)' : 'Submit Grievance')}
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 4. TAB 2: TRACK GRIEVANCE STATUS */}
      {activeTab === 'track' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
          <div className="max-w-xl space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              {isHi ? 'अपनी शिकायत या सुझाव की स्थिति जानें' : 'Track Grievance / Suggestion Status'}
            </h2>
            <p className="text-xs text-slate-600">
              {isHi ? 'पंजीकरण के समय प्राप्त टोकन / टिकट संख्या (उदा. IND-2026-1042 या SUG-2026-1011) दर्ज करें:' : 'Enter ticket ID received upon lodging:'}
            </p>

            <form onSubmit={handleTrackSubmit} className="flex gap-2">
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="IND-2026-XXXX"
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs uppercase font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <button
                type="submit"
                disabled={isTracking}
                className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-1.5"
              >
                {isTracking && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{isHi ? 'जांचें' : 'Track'}</span>
              </button>
            </form>

            {trackError && (
              <p className="text-red-500 text-xs font-medium animate-in fade-in">{trackError}</p>
            )}

            {/* Sample IDs helper */}
            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <span>{isHi ? 'नमूना टिकट नंबर जांचने हेतु:' : 'Sample Ticket IDs to test:'}</span>
              <div className="flex flex-wrap gap-2 pt-1 font-mono">
                <button
                  type="button"
                  onClick={() => { setTrackingId('IND-2026-1042'); }}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-emerald-800 font-bold cursor-pointer transition text-[11px]"
                >
                  IND-2026-1042
                </button>
                <button
                  type="button"
                  onClick={() => { setTrackingId('IND-2026-1038'); }}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-emerald-800 font-bold cursor-pointer transition text-[11px]"
                >
                  IND-2026-1038
                </button>
              </div>
            </div>
          </div>

          {/* Tracked Result Card */}
          {trackedResult && (
            <div className="border border-emerald-300 bg-emerald-50/50 rounded-2xl p-6 max-w-2xl space-y-4 animate-in fade-in">
              <div className="flex justify-between items-start gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block font-mono">
                      {trackedResult.ticketId}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                      {trackedResult.recordType === 'suggestion' ? (isHi ? 'विकास सुझाव' : 'Suggestion') : (isHi ? 'नागरिक शिकायत' : 'Complaint')}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    {trackedResult.category}
                  </h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border shrink-0 ${getStatusBadge(trackedResult.status)}`}>
                  ● {trackedResult.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">{isHi ? 'नागरिक (गोपनीय)' : 'Citizen (Masked)'}</span>
                  <span className="font-semibold text-slate-800">{trackedResult.citizenName}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">{isHi ? 'स्थान / मोहल्ला' : 'Location'}</span>
                  <span className="font-semibold text-slate-800">{trackedResult.mohallaLocation || trackedResult.location}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 sm:col-span-2">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">{isHi ? 'विवरण' : 'Description'}</span>
                  <p className="text-slate-700 mt-0.5">{trackedResult.description}</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-emerald-300 sm:col-span-2">
                  <span className="text-emerald-800 block text-[10px] uppercase font-bold">{isHi ? 'प्रशासनिक कार्रवाई / अद्यतन टिप्पणी' : 'Action Update'}</span>
                  <p className="text-slate-800 font-medium mt-0.5">{trackedResult.actionNote || (isHi ? 'समीक्षाधीन है।' : 'Under Review')}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. VERIFIED SUCCESS MODAL (Rendered strictly upon successful DB save) */}
      {submittedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-4 text-center shadow-2xl border border-slate-200">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              {submittedTicket.recordType === 'suggestion' 
                ? (isHi ? 'सुझाव सफलतापूर्वक दर्ज हुआ!' : 'Suggestion Saved Successfully!')
                : (isHi ? 'शिकायत सफलतापूर्वक दर्ज हुई!' : 'Grievance Saved Successfully!')}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              {isHi 
                ? 'आपकी प्रविष्टि ग्राम पंचायत इन्द्रौली के सुरक्षित डेटाबेस में स्थायी रूप से पंजीकृत हो गई है। ट्रैकिंग हेतु यह टोकन संख्या सुरक्षित रखें:' 
                : 'Your submission is safely recorded in the village portal database. Retain this ticket ID:'}
            </p>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300 font-mono font-black text-xl text-emerald-950 tracking-wider">
              {submittedTicket.ticketId}
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">{isHi ? 'वर्तमान स्थिति:' : 'Status:'}</span>
                <span className="font-bold text-emerald-800">● {submittedTicket.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">{isHi ? 'श्रेणी:' : 'Category:'}</span>
                <span className="font-bold text-slate-800">{submittedTicket.category}</span>
              </div>
              {submittedTicket.whatsappNotice && (
                <div className="text-[11px] text-emerald-700 pt-1 font-medium">
                  ✓ {submittedTicket.whatsappNotice}
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setSubmittedTicket(null)}
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-md"
              >
                {isHi ? 'ठीक है (बंद करें)' : 'Done (Close)'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
