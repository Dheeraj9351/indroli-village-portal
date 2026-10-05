import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  PhoneCall, 
  Clock, 
  ExternalLink, 
  Send, 
  CheckCircle2, 
  ShieldAlert, 
  Compass 
} from 'lucide-react';
import { contactData } from '../data/contactData';

export default function ContactPage({ lang }) {
  const isHi = lang === 'hi';
  const { address, phoneNoteHi, phoneNoteEn, emailNoteHi, emailNoteEn, emergencyNumbers } = contactData;

  const [messageForm, setMessageForm] = useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!messageForm.name || !messageForm.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setMessageForm({ name: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>{isHi ? 'नागरिक संपर्क प्रकोष्ठ' : 'Citizen Contact Secretariat'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isHi ? 'ग्राम पंचायत इन्द्रौली से संपर्क करें' : 'Contact Gram Panchayat Indroli'}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {isHi 
              ? 'ग्राम सचिवालय, जनसुनवाई समय, आपातकालीन दूरभाष एवं आधिकारिक सरकारी पोर्टल संदर्भ।' 
              : 'Panchayat secretariat address, citizen hearing timings, emergency contacts and public directories.'}
          </p>
        </div>
      </div>

      {/* 2. Office Location & Contact Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Address and Office Details */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-700" />
              <span>{isHi ? 'कार्यालय एवं भौगोलिक पता' : 'Office & Location Address'}</span>
            </h2>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
              <span className="font-bold text-sm text-slate-900 block">
                {isHi ? address.panchayatOfficeHi : address.panchayatOfficeEn}
              </span>
              <p>
                <strong>{isHi ? 'गाँव:' : 'Village:'}</strong> {address.villageHi}
              </p>
              <p>
                <strong>{isHi ? 'तहसील:' : 'Tehsil:'}</strong> {address.tehsilHi}
              </p>
              <p>
                <strong>{isHi ? 'जिला:' : 'District:'}</strong> {address.districtHi}
              </p>
              <p>
                <strong>{isHi ? 'राज्य:' : 'State:'}</strong> {address.stateHi} (पिन: {address.pincode})
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
              <div className="flex items-center gap-2 font-bold">
                <Clock className="w-4 h-4 text-emerald-700" />
                <span>{isHi ? 'कार्यालय कार्य-समय:' : 'Office Timings:'}</span>
              </div>
              <p className="text-slate-600">
                {isHi ? address.officeHoursHi : address.officeHoursEn}
              </p>
            </div>

            {/* Note on Phone/Email Accuracy Rule */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>{isHi ? 'दूरभाष एवं ई-मेल नीति (Strict Data Policy):' : 'Phone & Email Veracity Policy:'}</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {isHi ? phoneNoteHi : phoneNoteEn}
              </p>
              <p className="text-slate-500 italic mt-1">
                ℹ️ {isHi ? emailNoteHi : emailNoteEn}
              </p>
            </div>
          </div>

          {/* Interactive Map Placeholder */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-700" />
              <span>{isHi ? 'मानचित्र अवस्थिति (Map Reference)' : 'Map Reference'}</span>
            </h3>

            <div className="w-full h-64 rounded-xl bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center border-2 border-slate-800 relative overflow-hidden group">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <div className="relative z-10 space-y-2">
                <MapPin className="w-10 h-10 text-amber-400 mx-auto animate-bounce" />
                <h4 className="font-bold text-base text-white">
                  ग्राम इन्द्रौली (कामां, डीग)
                </h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  अक्षांश/देशांतर: 27.65° N, 77.27° E • कामां मुख्यालय से लगभग 8-12 किमी दूरी
                </p>
                <div className="pt-2">
                  <a
                    href="https://www.google.com/maps/search/Indroli+Kaman+Rajasthan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-xs font-semibold text-white transition"
                  >
                    <span>गूगल मैप्स पर देखें</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Citizen Contact Form */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {isHi ? 'नागरिक संदेश एवं पूछताछ प्रपत्र' : 'Send a Message / Query'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {isHi ? 'ग्राम पंचायत सचिवालय को अपना संदेश अथवा सामान्य पूछताछ भेजें।' : 'Send an inquiry or public request to the village administration.'}
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-300 text-center space-y-2 animate-in fade-in">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-slate-900 text-sm">
                  {isHi ? 'संदेश सफलतापूर्वक प्रेषित हुआ!' : 'Message Sent Successfully!'}
                </h3>
                <p className="text-xs text-slate-600">
                  {isHi ? 'आपके संदेश का अवलोकन कार्यालय दिवस में किया जाएगा। धन्यवाद।' : 'Your message has been queued for review during office hours.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    {isHi ? 'आपका नाम' : 'Your Name'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={messageForm.name}
                    onChange={(e) => setMessageForm({ ...messageForm, name: e.target.value })}
                    placeholder={isHi ? "उदा. कुलदीप सिंह" : "e.g. Kuldeep Singh"}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    {isHi ? 'मोबाइल नंबर (10 अंक)' : 'Phone Number'}
                  </label>
                  <input
                    type="tel"
                    maxLength={10}
                    value={messageForm.phone}
                    onChange={(e) => setMessageForm({ ...messageForm, phone: e.target.value.replace(/\D/g, '') })}
                    placeholder="9829000000"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    {isHi ? 'विषय' : 'Subject'}
                  </label>
                  <input
                    type="text"
                    value={messageForm.subject}
                    onChange={(e) => setMessageForm({ ...messageForm, subject: e.target.value })}
                    placeholder={isHi ? "उदा. बालिका पुस्तकालय सदस्यता बाबत" : "Subject of inquiry"}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    {isHi ? 'संदेश विवरण' : 'Message Details'} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={messageForm.message}
                    onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                    placeholder={isHi ? "अपना संदेश यहाँ लिखें..." : "Type your message..."}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isHi ? 'संदेश भेजें (Send Message)' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Emergency Helplines Box */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <PhoneCall className="w-4 h-4" />
              <span>{isHi ? 'महत्वपूर्ण आपातकालीन एवं जनसुविधा नंबर' : 'Emergency Toll-Free Lines'}</span>
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {emergencyNumbers.map((em, i) => (
                <div key={i} className="p-2.5 bg-slate-800 rounded-lg border border-slate-700 flex justify-between items-center">
                  <span className="text-slate-300 text-[11px]">{em.titleHi}</span>
                  <span className="font-bold text-amber-400 bg-slate-900 px-2 py-0.5 rounded">{em.number}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
