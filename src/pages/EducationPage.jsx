import React from 'react';
import { 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Users, 
  Sparkles 
} from 'lucide-react';
import { educationData } from '../data/educationData';

export default function EducationPage({ setActivePage, lang }) {
  const isHi = lang === 'hi';
  const { hero, girlsLibrary, competitiveExams, careerGuidance } = educationData;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* 1. Hero Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
            <span>{isHi ? 'शिक्षा एवं स्वाध्याय मिशन • ग्राम इन्द्रौली' : 'Education & Mentorship Mission • Village Indroli'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isHi ? hero.titleHi : hero.titleEn}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {isHi ? hero.taglineHi : hero.taglineEn}
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <button 
              onClick={() => {
                const el = document.getElementById('girls-lib-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition cursor-pointer"
            >
              {isHi ? 'बालिका पुस्तकालय विवरण' : 'Girls Library Details'}
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById('exam-prep-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-slate-800/80 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-600 transition cursor-pointer"
            >
              {isHi ? 'प्रतियोगी परीक्षा पुस्तकें' : 'Competitive Exam Resources'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. SPOTLIGHT: SAVITRIBAI PHULE GIRLS LIBRARY & STUDY ROOM */}
      <section id="girls-lib-section" className="bg-white rounded-2xl border-2 border-emerald-500/50 shadow-md p-6 sm:p-10 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{girlsLibrary.badge}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {isHi ? girlsLibrary.titleHi : girlsLibrary.titleEn}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isHi ? girlsLibrary.descriptionHi : girlsLibrary.descriptionEn}
            </p>

            <div className="space-y-3 pt-2">
              {girlsLibrary.features.map((feat, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{feat.titleHi}</h4>
                    <p className="text-[11px] text-slate-600 mt-0.5">{feat.descHi}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Rules */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 space-y-1.5">
              <h4 className="font-bold">{isHi ? 'पुस्तकालय नियम एवं समय:' : 'Library Timings & Code:'}</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                {girlsLibrary.rulesHi.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Image / Visual Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-slate-200 bg-slate-900 group relative">
              <img 
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&auto=format&fit=crop&q=80" 
                alt="सावित्रीबाई फुले बालिका पुस्तकालय"
                className="w-full h-80 object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-bold text-amber-300 block">
                  {isHi ? 'प्रस्तावित स्वाध्याय केंद्र मॉडल (नमूना चित्र)' : 'Proposed Study Space Model'}
                </span>
                <p className="text-xs font-semibold mt-0.5">
                  {isHi ? 'बेटियों के लिए शांत एवं अनुशासित स्वाध्याय कक्ष की कार्ययोजना' : 'Civic blueprint for girls quiet study sanctuary'}
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="block font-bold text-emerald-900 text-sm">प्रस्तावित</span>
                <span className="text-[10px] text-slate-600">{isHi ? 'अध्ययन सीटें लक्ष्य' : 'Target Study Desks'}</span>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="block font-bold text-emerald-900 text-sm">डिजिटल</span>
                <span className="text-[10px] text-slate-600">{isHi ? 'कंप्यूटर संसाधन' : 'Computer Stations'}</span>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="block font-bold text-emerald-900 text-sm">जनसहयोग</span>
                <span className="text-[10px] text-slate-600">{isHi ? 'पुस्तक संकलन' : 'Book Drive'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMPETITIVE EXAM PREPARATION & DIGITAL EDUCATION */}
      <section id="exam-prep-section" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-700" />
            <span>{isHi ? 'प्रतियोगी परीक्षा तैयारी एवं उपलब्ध पुस्तकें' : 'Competitive Exam Preparation & Literature'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isHi 
              ? 'राजस्थान एवं केंद्रीय भर्ती परीक्षाओं के लिए प्रामाणिक पुस्तकें व पिछले वर्षों के प्रश्न-पत्र संग्रह' 
              : 'Authentic study guides and past test papers for state and central examinations'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {competitiveExams.map((ex, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <h4 className="font-bold text-xs text-slate-900">{ex.name}</h4>
              </div>
              <p className="text-xs text-slate-600 pl-8 leading-snug">
                <strong>{isHi ? 'पुस्तकों का संकलन:' : 'Materials:'}</strong> {ex.books}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CAREER GUIDANCE & MONTHLY MENTORSHIP */}
      <section className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
              <Users className="w-4 h-4" />
              <span>{isHi ? 'मासिक करियर काउंसलिंग एवं मेंटरशिप' : 'Monthly Mentorship & Guidance'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {isHi ? careerGuidance.titleHi : careerGuidance.titleEn}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isHi ? careerGuidance.descriptionHi : careerGuidance.descriptionEn}
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col items-start md:items-end justify-center">
            <button
              onClick={() => setActivePage('announcements')}
              className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
            >
              {isHi ? 'आगामी कार्यशाला सूचना देखें' : 'View Workshop Notice'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
