import React from 'react';
import { 
  Users, 
  Trophy, 
  GraduationCap, 
  CheckCircle2, 
  Scissors 
} from 'lucide-react';
import { womenYouthData } from '../data/womenYouthData';

export default function WomenYouthPage({ setActivePage, lang }) {
  const isHi = lang === 'hi';
  const { womenSection, youthSection } = womenYouthData;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-semibold">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>{isHi ? 'मानव संसाधन विकास • ग्राम इन्द्रौली' : 'Human Capital Upliftment • Village Indroli'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isHi ? 'महिला स्वावलंबन एवं युवा सशक्तिकरण' : 'Women Empowerment & Youth Development'}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {isHi 
              ? 'गाँव की महिलाओं को आर्थिक रूप से आत्मनिर्भर बनाना और युवाओं को खेलकूद, डिजिटल कौशल व रोजगार के साधनों से जोड़कर उज्ज्वल भविष्य का मार्ग प्रशस्त करना।' 
              : 'Empowering women through vocational initiatives & self-help groups, and nurturing village youth through sports, digital literacy, and career coaching.'}
          </p>
        </div>
      </div>

      {/* SECTION 1: WOMEN EMPOWERMENT & SKILL TRAINING */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-rose-700 text-xs font-bold uppercase tracking-wider">
              <Scissors className="w-4 h-4" />
              <span>{isHi ? 'महिला सशक्तिकरण पहल' : 'Women Empowerment Initiatives'}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              {isHi ? womenSection.titleHi : womenSection.titleEn}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {isHi ? womenSection.introHi : womenSection.introEn}
            </p>
          </div>
          <span className="text-xs font-semibold bg-rose-50 text-rose-800 px-3 py-1 rounded-full border border-rose-200">
            {isHi ? 'राजीविका (RGAVP) समन्वय' : 'SHG Coordination'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {womenSection.initiatives.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-rose-300 transition space-y-2">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-bold text-sm text-slate-900">{isHi ? item.titleHi : item.titleEn}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-900 shrink-0">
                  {item.target}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isHi ? item.descHi : item.descEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: YOUTH DEVELOPMENT & SPORTS */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8">
        <div className="border-b border-slate-100 pb-4">
          <div className="inline-flex items-center gap-1.5 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>{isHi ? 'युवा शक्ति एवं खेल विकास' : 'Youth Force & Athletics'}</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            {isHi ? youthSection.titleHi : youthSection.titleEn}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isHi ? youthSection.introHi : youthSection.introEn}
          </p>
        </div>

        {/* Sports Subsection */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-emerald-700" />
            <span>{isHi ? 'खेल सुविधाएं एवं प्रतियोगिताएं (Sports Facilities):' : 'Sports Infrastructure & Tournaments:'}</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {youthSection.sports.map((sp, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
                <h4 className="font-bold text-xs text-emerald-950">{isHi ? sp.nameHi : sp.nameEn}</h4>
                <p className="text-xs text-slate-600">{isHi ? sp.descHi : sp.descEn}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills & Digital Literacy Subsection */}
        <div className="space-y-4 pt-2">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-emerald-700" />
            <span>{isHi ? 'कौशल विकास, डिजिटल साक्षरता एवं उद्यमिता (Skills & Entrepreneurship):' : 'Skills & Digital Literacy:'}</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {youthSection.skills.map((sk, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{isHi ? sk.titleHi : sk.titleEn}</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{isHi ? sk.descHi : sk.descEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-white">
            {isHi ? 'क्या आप कौशल शिविर या खेल प्रतियोगिता में भाग लेना चाहते हैं?' : 'Interested in Skill Camps or Sports?'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {isHi ? 'पंचायत सूचना पट्ट पर आगामी प्रशिक्षण एवं शिविरों की तिथियां प्रकाशित की जाती हैं।' : 'Upcoming dates and application guidelines are regularly published on the notice board.'}
          </p>
        </div>
        <button
          onClick={() => setActivePage('announcements')}
          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition cursor-pointer whitespace-nowrap"
        >
          {isHi ? 'नवीनतम सूचनाएं देखें' : 'View Notices'}
        </button>
      </div>
    </div>
  );
}
