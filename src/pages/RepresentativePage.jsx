import React from 'react';
import { 
  UserCheck, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';
import { representativeData } from '../data/representativeData';

export default function RepresentativePage({ lang }) {
  const isHi = lang === 'hi';
  const { notice, profile } = representativeData;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* 1. Header Banner & Strict Non-Political Civic Notice */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-semibold">
            <UserCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>{isHi ? 'नागरिक प्रतिनिधि प्रोफ़ाइल' : 'Civic Representative Profile'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isHi ? 'पंचायत प्रतिनिधि / लोकसेवक प्रोफ़ाइल' : 'Panchayat Representative Profile'}
          </h1>

          <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700 text-xs text-amber-300 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
            <span>
              {isHi ? notice.disclaimerHi : notice.disclaimerEn}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left: Verified Photo Placeholder Frame */}
          <div className="md:col-span-4 flex flex-col items-center">
            <div className="w-48 h-56 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-4 text-center shadow-inner relative group">
              <UserCheck className="w-16 h-16 text-slate-400 mb-2" />
              <span className="text-xs font-bold text-slate-700 block">
                {isHi ? '[सत्यापित फ़ोटो संलग्न करें]' : '[Verified Photo Slot]'}
              </span>
              <span className="text-[10px] text-slate-500 mt-1 block">
                {isHi ? 'src/data/representativeData.js में फ़ोटो पथ जोड़ें' : 'Add photo in representativeData.js'}
              </span>
            </div>

            <div className="mt-3 text-center">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {isHi ? profile.roleHi : profile.roleEn}
              </span>
              <p className="text-[11px] text-slate-400 mt-1">
                {profile.village}, {profile.tehsil} ({profile.district})
              </p>
            </div>
          </div>

          {/* Right: Verified Credentials and Vision */}
          <div className="md:col-span-8 space-y-5">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                {isHi ? 'प्रतिनिधि का नाम' : 'Representative Name'}
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-0.5">
                {isHi ? profile.nameHi : profile.nameEn}
              </h2>
            </div>

            {/* Educational Qualification (Factual / Placeholder) */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                {isHi ? 'शैक्षणिक योग्यता (Verified Educational Background):' : 'Educational Qualifications:'}
              </span>
              <p className="text-xs font-medium text-slate-800">
                {isHi ? profile.qualificationHi : profile.qualificationEn}
              </p>
            </div>

            {/* Experience & Social Work */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                {isHi ? 'सार्वजनिक सेवा एवं अनुभव (Public Engagement & Experience):' : 'Experience & Social Service:'}
              </span>
              <p className="text-xs font-medium text-slate-800">
                {isHi ? profile.experienceHi : profile.experienceEn}
              </p>
            </div>

            {/* Civic Vision */}
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1">
              <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block">
                {isHi ? 'ग्राम विकास दृष्टि (Civic Vision for Village Indroli):' : 'Vision for Village Development:'}
              </span>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                "{isHi ? profile.civicVisionHi : profile.civicVisionEn}"
              </p>
            </div>
          </div>
        </div>

        {/* 3. Public Responsibilities */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-base font-bold text-slate-900">
            {isHi ? 'लोकतांत्रिक एवं प्रशासनिक दायित्व (Civic Responsibilities):' : 'Key Statutory Responsibilities:'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.publicResponsibilities.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{item.titleHi}</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-snug">{item.descHi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Availability & Meeting Hours */}
        <div className="p-5 rounded-xl bg-slate-900 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
          <div className="space-y-1">
            <span className="font-bold text-amber-400 block">{isHi ? 'जनसुनवाई एवं जन-संवाद समय:' : 'Public Hearing Schedule:'}</span>
            <p className="text-slate-300">{isHi ? profile.contactInfo.officeHoursHi : profile.contactInfo.officeHoursEn}</p>
            <p className="text-slate-400">{isHi ? profile.contactInfo.officeHi : profile.contactInfo.officeEn}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
