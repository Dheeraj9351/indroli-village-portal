import React, { useState } from 'react';
import { 
  MessageSquareCheck, 
  CheckCircle2, 
  Search, 
  ShieldAlert, 
  Camera 
} from 'lucide-react';
import { complaintCategories, initialComplaints } from '../data/complaintsData';

export default function ComplaintsPage({ lang }) {
  const isHi = lang === 'hi';
  const [complaintsList, setComplaintsList] = useState(() => {
    try {
      const saved = localStorage.getItem('indroli_complaints');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return initialComplaints;
  });
  const [activeTab, setActiveTab] = useState('lodge'); // 'lodge' | 'track'

  // Form state
  const [formData, setFormData] = useState({
    citizenName: '',
    mobile: '',
    category: 'water',
    description: '',
    location: '',
    photoPreview: null
  });

  const [errors, setErrors] = useState({});
  const [submittedTicket, setSubmittedTicket] = useState(null);

  // Tracking state
  const [trackingId, setTrackingId] = useState('');
  const [trackedResult, setTrackedResult] = useState(null);
  const [trackError, setTrackError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photoPreview: reader.result }));
      };
      reader.readAsDataURL(file);
    }
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
      errs.description = isHi ? 'कृपया समस्या का कम से कम 15 अक्षरों में स्पष्ट विवरण दें' : 'Please provide details (min 15 chars)';
    }
    if (!formData.location.trim()) {
      errs.location = isHi ? 'कृपया गाँव में सटीक स्थान अथवा मोहल्ला बताएं' : 'Village location/mohalla is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newTicketId = `IND-2026-${randomSuffix}`;

    const catObj = complaintCategories.find(c => c.id === formData.category);
    const categoryName = catObj ? catObj.nameHi : 'अन्य';

    const newComplaint = {
      ticketId: newTicketId,
      citizenName: formData.citizenName,
      mobile: formData.mobile,
      category: categoryName,
      location: formData.location,
      description: formData.description,
      photoUrl: formData.photoPreview,
      status: 'पंजीकृत (समीक्षाधीन)',
      statusEn: 'Registered (Under Review)',
      submittedAt: new Date().toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      actionNote: 'शिकायत नागरिक पोर्टल पर सफलतापूर्वक पंजीकृत हो गई है।'
    };

    const updated = [newComplaint, ...complaintsList];
    setComplaintsList(updated);
    localStorage.setItem('indroli_complaints', JSON.stringify(updated));

    setSubmittedTicket(newComplaint);
    // Reset form
    setFormData({
      citizenName: '',
      mobile: '',
      category: 'water',
      description: '',
      location: '',
      photoPreview: null
    });
    setErrors({});
  };

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    setTrackError('');
    setTrackedResult(null);

    const q = trackingId.trim().toUpperCase();
    if (!q) {
      setTrackError(isHi ? 'कृपया ट्रैकिंग टिकट संख्या दर्ज करें' : 'Enter ticket ID');
      return;
    }

    const found = complaintsList.find(c => c.ticketId.toUpperCase() === q);
    if (found) {
      setTrackedResult(found);
    } else {
      setTrackError(isHi ? 'यह टिकट संख्या नहीं मिली। कृपया सही आईडी (उदा. IND-2026-1042) जांचें।' : 'Ticket ID not found. Please verify.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider">
            <MessageSquareCheck className="w-3.5 h-3.5" />
            <span>{isHi ? 'नागरिक निवारण प्रणाली' : 'Citizen Grievance Cell'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isHi ? 'जन-समस्या एवं सुझाव निवारण प्रणाली' : 'Grievance & Suggestion Redressal'}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {isHi 
              ? 'गाँव इन्द्रौली में पानी, सड़क, स्ट्रीट लाइट, सफाई अथवा किसी भी जनसुविधा से संबंधित समस्या या सुझाव को ऑनलाइन दर्ज करें तथा उसकी स्थिति ट्रैक करें।' 
              : 'Submit village grievances or community suggestions and track resolution status transparently.'}
          </p>

          {/* Mandatory Demo Disclaimer */}
          <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700 text-xs text-amber-300 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              {isHi 
                ? 'महत्वपूर्ण सूचना: यह एक नागरिक सुविधा प्रोटोटाइप/प्रदर्शन प्रणाली (Demo System) है। यह सीधे सरकारी विभागीय सर्वर से संबद्ध नहीं है। आपातकालीन सहायता हेतु सीधे 181 (राजस्थान संपर्क) या 112 पर संपर्क करें।' 
                : 'Notice: This is a front-end demonstration system. It is not directly linked to a state government backend. In emergency, call 181 (Rajasthan Sampark) or 112.'}
            </span>
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
          <span>{isHi ? 'नई समस्या / सुझाव दर्ज करें' : 'Lodge Grievance'}</span>
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
          <span>{isHi ? 'शिकायत की स्थिति जांचें (Track Status)' : 'Track Grievance'}</span>
        </button>
      </div>

      {/* 3. TAB 1: LODGE COMPLAINT FORM */}
      {activeTab === 'lodge' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-xl font-bold text-slate-900">
                {isHi ? 'नागरिक शिकायत / विकास सुझाव प्रपत्र' : 'Citizen Grievance Submission Form'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {isHi ? 'कृपया सही व स्पष्ट विवरण भरें ताकि निवारण सुगम हो सके।' : 'Please fill accurate particulars.'}
              </p>
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
                {isHi ? 'समस्या की श्रेणी' : 'Grievance Category'} <span className="text-red-500">*</span>
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
                {isHi ? 'गाँव में स्थान / मोहल्ला / लैंडमार्क' : 'Village Location / Landmark'} <span className="text-red-500">*</span>
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
                {isHi ? 'समस्या का स्पष्ट विवरण' : 'Detailed Description'} <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={isHi ? "कृपया समस्या का विस्तार से वर्णन करें, कब से समस्या है और क्या प्रभाव पड़ रहा है..." : "Describe the problem in detail..."}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-xs focus:outline-none focus:ring-2 ${
                  errors.description ? 'border-red-400 focus:ring-red-300' : 'border-slate-300 focus:ring-emerald-600'
                }`}
              />
              {errors.description && <p className="text-red-500 text-[11px]">{errors.description}</p>}
            </div>

            {/* Field: Photo Upload (Mock with Preview) */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                {isHi ? 'समस्या का फ़ोटो संलग्न करें (वैकल्पिक)' : 'Upload Site Photo (Optional)'}
              </label>
              
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-emerald-500 transition">
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {formData.photoPreview ? (
                  <div className="space-y-2">
                    <img src={formData.photoPreview} alt="Preview" className="h-36 mx-auto object-cover rounded-lg shadow-sm" />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, photoPreview: null }))}
                      className="text-xs text-red-600 hover:underline cursor-pointer"
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
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>{isHi ? 'शिकायत / सुझाव दर्ज करें (Submit)' : 'Submit Grievance'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 4. TAB 2: TRACK GRIEVANCE STATUS */}
      {activeTab === 'track' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
          <div className="max-w-xl space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              {isHi ? 'अपनी शिकायत या सुझाव की स्थिति जानें' : 'Track Grievance Resolution Status'}
            </h2>
            <p className="text-xs text-slate-600">
              {isHi ? 'पंजीकरण के समय प्राप्त टोकन / टिकट नंबर (उदा. IND-2026-1042) दर्ज करें:' : 'Enter ticket ID received upon lodging:'}
            </p>

            <form onSubmit={handleTrackSubmit} className="flex gap-2">
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="IND-2026-XXXX"
                className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 text-xs uppercase font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition cursor-pointer"
              >
                {isHi ? 'जांचें' : 'Track'}
              </button>
            </form>

            {trackError && (
              <p className="text-red-500 text-xs font-medium">{trackError}</p>
            )}

            {/* Sample IDs helper */}
            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <span>{isHi ? 'नमूना टिकट नंबर जांचने हेतु:' : 'Sample Ticket IDs to test:'}</span>
              <div className="flex flex-wrap gap-2 pt-1 font-mono">
                <button
                  onClick={() => { setTrackingId('IND-2026-1042'); }}
                  className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-emerald-800 cursor-pointer"
                >
                  IND-2026-1042
                </button>
                <button
                  onClick={() => { setTrackingId('IND-2026-1038'); }}
                  className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-emerald-800 cursor-pointer"
                >
                  IND-2026-1038
                </button>
              </div>
            </div>
          </div>

          {/* Tracked Result Card */}
          {trackedResult && (
            <div className="border border-emerald-300 bg-emerald-50/50 rounded-2xl p-6 max-w-2xl space-y-4 animate-in fade-in">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                    {trackedResult.ticketId}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                    {trackedResult.category}
                  </h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  trackedResult.status.includes('निस्तारित') ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}>
                  ● {trackedResult.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">{isHi ? 'नागरिक' : 'Citizen'}</span>
                  <span className="font-semibold text-slate-800">{trackedResult.citizenName}</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">{isHi ? 'स्थान' : 'Location'}</span>
                  <span className="font-semibold text-slate-800">{trackedResult.location}</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 sm:col-span-2">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">{isHi ? 'समस्या विवरण' : 'Description'}</span>
                  <p className="text-slate-700 mt-0.5">{trackedResult.description}</p>
                </div>
                <div className="p-3 bg-white rounded-lg border border-emerald-300 sm:col-span-2">
                  <span className="text-emerald-800 block text-[10px] uppercase font-bold">{isHi ? 'प्रशासनिक कार्रवाई / टिप्पणी' : 'Action Update'}</span>
                  <p className="text-slate-800 font-medium mt-0.5">{trackedResult.actionNote}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. SUCCESS MODAL */}
      {submittedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 space-y-4 text-center shadow-2xl border border-slate-200">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              {isHi ? 'शिकायत सफलतापूर्वक दर्ज हुई!' : 'Grievance Lodged Successfully!'}
            </h3>

            <p className="text-xs text-slate-600">
              {isHi ? 'आपकी समस्या नागरिक पोर्टल पर पंजीकृत कर ली गई है। ट्रैकिंग हेतु यह टिकट नंबर सुरक्षित रखें:' : 'Your issue is recorded in the civic tracker. Retain this ticket ID:'}
            </p>

            <div className="p-3.5 bg-slate-100 rounded-xl border border-slate-300 font-mono font-bold text-lg text-emerald-900">
              {submittedTicket.ticketId}
            </div>

            <p className="text-[11px] text-slate-400">
              ℹ️ {isHi ? 'यह डेमो रिकॉर्ड स्थानीय स्टोरेज में सहेजा गया है। आप एडमिन डैशबोर्ड में भी इसकी समीक्षा कर सकते हैं।' : 'This demo record is stored in localStorage and can also be viewed in the Admin Dashboard.'}
            </p>

            <div className="pt-2">
              <button
                onClick={() => setSubmittedTicket(null)}
                className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition cursor-pointer"
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
