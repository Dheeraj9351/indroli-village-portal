import React from 'react';
import { 
  Building2, 
  MapPin, 
  Scale
} from 'lucide-react';
import { translations } from '../data/translations';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer({ setActivePage, lang }) {
  const t = translations[lang];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t-4 border-emerald-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Village Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-700 flex items-center justify-center text-white shadow-md">
                <Building2 className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">
                  {lang === 'hi' ? 'ग्राम पंचायत इन्द्रौली' : 'Gram Panchayat Indroli'}
                </h3>
                <p className="text-xs text-emerald-400 font-medium">
                  {lang === 'hi' ? 'कामां • डीग • राजस्थान' : 'Kaman • Deeg • Rajasthan'}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {t.footerGovNote}
            </p>

            <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700/60 text-[11px] text-slate-300 space-y-1">
              <div className="flex items-start gap-1.5 text-amber-400 font-medium">
                <Scale className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{lang === 'hi' ? 'गैर-राजनीतिक नागरिक घोषणा:' : 'Non-Political Civic Notice:'}</span>
              </div>
              <p className="text-slate-400">
                {lang === 'hi' 
                  ? 'यह एक नागरिक एवं ग्रामीण विकास सूचना पोर्टल है। यह किसी भी राजनीतिक दल, व्यक्तिगत प्रचार या मत-याचना से संबद्ध नहीं है।'
                  : 'This is a public civic and village development portal, completely independent of political persuasion or vote solicitation.'}
              </p>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 border-l-2 border-emerald-500 pl-2">
              {t.footerQuickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => { setActivePage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-400 transition cursor-pointer text-left"
                >
                  → {t.navAbout}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActivePage('priorities'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-400 transition cursor-pointer text-left"
                >
                  → {t.navPriorities}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActivePage('tracker'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-400 transition cursor-pointer text-left"
                >
                  → {t.navTracker}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActivePage('transparency'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-400 transition cursor-pointer text-left"
                >
                  → {t.navTransparency}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActivePage('education'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-400 transition cursor-pointer text-left"
                >
                  → {t.navEducation} (बालिका पुस्तकालय)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActivePage('meetings'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-400 transition cursor-pointer text-left"
                >
                  → {t.navMeetings}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActivePage('complaints'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-400 transition cursor-pointer text-left"
                >
                  → {t.navComplaints}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Emergency Helplines */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 border-l-2 border-amber-500 pl-2">
              {t.emergencyHelpline}
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2 bg-slate-800 rounded border border-slate-700">
                <span className="text-slate-300">राजस्थान संपर्क (Grievance)</span>
                <span className="font-bold text-amber-400">181</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-800 rounded border border-slate-700">
                <span className="text-slate-300">आपातकालीन एम्बुलेंस (Medical)</span>
                <span className="font-bold text-rose-400">108 / 104</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-800 rounded border border-slate-700">
                <span className="text-slate-300">पुलिस सहायता (Police)</span>
                <span className="font-bold text-sky-400">112</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-800 rounded border border-slate-700">
                <span className="text-slate-300">महिला सुरक्षा (Women Helpline)</span>
                <span className="font-bold text-purple-400">1090</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-800 rounded border border-slate-700">
                <span className="text-slate-300">बिजली आपूर्ति शिकायत (JVVNL)</span>
                <span className="font-bold text-yellow-400">1912</span>
              </div>
            </div>
          </div>

          {/* Col 4: Address & Civic Info */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 border-l-2 border-sky-500 pl-2">
              {t.footerContact}
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p>{t.footerPanchayatAddress}</p>
              </div>

              <div className="p-2.5 bg-slate-800/60 rounded border border-slate-700 text-[11px] space-y-1">
                <span className="font-medium text-emerald-400 block">
                  {lang === 'hi' ? 'कार्यालय समय:' : 'Office Hours:'}
                </span>
                <p className="text-slate-400">
                  {lang === 'hi' 
                    ? 'सोमवार से शुक्रवार: प्रातः 10:00 से सायं 05:00 बजे तक' 
                    : 'Monday - Friday: 10:00 AM to 05:00 PM'}
                </p>
              </div>

              <div className="pt-1">
                <button
                  onClick={() => { setActivePage('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full text-center px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded border border-slate-600 transition cursor-pointer"
                >
                  ⚙️ {lang === 'hi' ? 'प्रशासनिक लॉगिन / डेमो डैशबोर्ड' : 'Admin Login / Demo Portal'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Disclaimers, and Accessibility */}
        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <p>© {CURRENT_YEAR} {t.portalName} ({t.portalSubtitle}) - {t.rightsReserved}</p>
            <p className="text-[11px] text-slate-400 mt-1">
              {lang === 'hi' 
                ? 'काल्पनिक या अपुष्ट आंकड़े प्रदर्शित नहीं किए जाते हैं। वास्तविक सत्यापन उपरांत ही प्रविष्टियां मान्य हैं।' 
                : 'No fabricated or unverified claims are hosted. Real data is subject to statutory verification.'}
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button 
              onClick={() => { setActivePage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-emerald-400 transition cursor-pointer"
            >
              {lang === 'hi' ? 'साइट जानकारी' : 'Site Info'}
            </button>
            <span>•</span>
            <button 
              onClick={() => { setActivePage('transparency'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-emerald-400 transition cursor-pointer"
            >
              {lang === 'hi' ? 'पारदर्शिता नीति' : 'Transparency Policy'}
            </button>
            <span>•</span>
            <button 
              onClick={() => { setActivePage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-emerald-400 transition cursor-pointer"
            >
              {lang === 'hi' ? 'सुलभता एवं संपर्क' : 'Accessibility & Contact'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
