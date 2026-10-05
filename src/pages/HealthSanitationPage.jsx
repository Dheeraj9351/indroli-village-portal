import React from 'react';
import { 
  HeartPulse, 
  Sparkles, 
  Droplets, 
  Trash2, 
  PhoneCall, 
  Calendar, 
  MapPin, 
  CheckCircle2 
} from 'lucide-react';
import { healthData } from '../data/healthData';

export default function HealthSanitationPage({ setActivePage, lang }) {
  const isHi = lang === 'hi';
  const { overviewHi, overviewEn, camps, sanitationPillars, emergencyContacts } = healthData;

  const pillarIcons = {
    ShieldAlert: Sparkles,
    Trash2: Trash2,
    Droplets: Droplets,
    CheckCircle: CheckCircle2
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-950 to-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-semibold">
            <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
            <span>{isHi ? 'आरोग्य एवं स्वच्छता मिशन • ग्राम इन्द्रौली' : 'Health & Hygiene Mission • Village Indroli'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isHi ? 'स्वास्थ्य, स्वच्छता एवं जल प्रबंधन' : 'Public Health, Sanitation & Water Security'}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {isHi ? overviewHi : overviewEn}
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => setActivePage('complaints')}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition cursor-pointer"
            >
              {isHi ? 'सफाई या जल समस्या दर्ज करें' : 'Report Sanitation/Water Issue'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. SANITATION PILLARS (Cleanliness, Drainage, Drinking Water, Waste Management) */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-700" />
            <span>{isHi ? 'गाँव में स्वच्छता एवं जल प्रबंधन के चार स्तंभ' : 'Four Pillars of Village Sanitation'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isHi ? 'नाली सफाई, ठोस कचरा पृथक्करण, क्लोरीनेटेड पेयजल एवं सार्वजनिक शौचालय' : 'Drain desilting, waste segregation, chlorinated drinking water, and public restrooms'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sanitationPillars.map((pil, idx) => {
            const Icon = pillarIcons[pil.icon] || Sparkles;
            return (
              <div key={idx} className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">{pil.titleHi}</h3>
                </div>
                <p className="text-xs text-slate-600 pl-10.5 leading-relaxed">
                  {pil.descHi}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. HEALTH CAMPS SCHEDULE */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-700" />
              <span>{isHi ? 'नियमित एवं आगामी स्वास्थ्य शिविर' : 'Health Camps & Vaccination Drives'}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {isHi ? 'मातृ-शिशु पोषण, टीकाकरण, नेत्र जांच एवं सामान्य चिकित्सा' : 'Scheduled clinics, immunisation and specialist visits'}
            </p>
          </div>
          <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
            {isHi ? 'निःशुल्क सेवा' : 'Free Public Care'}
          </span>
        </div>

        <div className="space-y-4">
          {camps.map((camp, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-base font-bold text-slate-900">{camp.titleHi}</h3>
                <span className="text-xs font-bold text-emerald-800 bg-white px-2.5 py-0.5 rounded border border-slate-200 self-start sm:self-auto">
                  {camp.scheduleHi}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span><strong>{isHi ? 'स्थान:' : 'Venue:'}</strong> {camp.venueHi}</span>
              </div>
              <p className="text-xs text-slate-600 pt-1 leading-relaxed">
                <strong>{isHi ? 'उपलब्ध सेवाएं:' : 'Services:'}</strong> {camp.servicesHi}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. EMERGENCY & HEALTH HOTLINES */}
      <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-amber-400" />
            <span>{isHi ? 'आपातकालीन चिकित्सा एवं जन-सुविधा हेल्पलाइन' : 'Emergency Medical & Helpline Directory'}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isHi ? 'राजस्थान सरकार द्वारा संचालित चौबीसों घंटे निःशुल्क आपातकालीन संपर्क नंबर' : '24x7 Government emergency toll-free numbers'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {emergencyContacts.map((cnt, idx) => (
            <div key={idx} className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">{cnt.serviceHi}</span>
                <span className="text-[10px] text-slate-400 block">{cnt.type}</span>
              </div>
              <span className="text-lg font-bold text-amber-400 bg-slate-900 px-3 py-1 rounded border border-slate-700">
                {cnt.number}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
