import React, { useState } from 'react';
import { 
  Sun, 
  Route, 
  Droplets, 
  BookOpen, 
  GraduationCap, 
  HeartPulse, 
  Sparkles, 
  Trees, 
  Trophy, 
  Users,
  CheckCircle2,
  ArrowRight,
  Filter,
  ShieldCheck,
  MessageSquareCheck
} from 'lucide-react';
import { prioritiesData } from '../data/prioritiesData';

export default function PrioritiesPage({ setActivePage, lang }) {
  const isHi = lang === 'hi';
  const [selectedCategory, setSelectedCategory] = useState('all');

  const iconsMap = {
    Sun,
    Route,
    Droplets,
    BookOpen,
    GraduationCap,
    HeartPulse,
    Sparkles,
    Trees,
    Trophy,
    Users
  };

  const categories = [
    { id: 'all', labelHi: 'समस्त 10 प्राथमिकताएं', labelEn: 'All 10 Priorities' },
    { id: 'infrastructure', labelHi: 'आधारभूत संरचना (सड़क, लाइट, पानी)', labelEn: 'Core Infrastructure' },
    { id: 'education', labelHi: 'शिक्षा एवं बालिका पुस्तकालय', labelEn: 'Education & Library' },
    { id: 'health-sanitation', labelHi: 'स्वास्थ्य, स्वच्छता व पर्यावरण', labelEn: 'Health & Environment' },
    { id: 'human-development', labelHi: 'महिला स्वावलंबन एवं युवा विकास', labelEn: 'Women & Youth' }
  ];

  const filteredPriorities = prioritiesData.filter((item) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'infrastructure') return ['solar-street-lights', 'roads-drainage', 'drinking-water'].includes(item.id);
    if (selectedCategory === 'education') return ['girls-library', 'education'].includes(item.id);
    if (selectedCategory === 'health-sanitation') return ['health', 'cleanliness', 'environment'].includes(item.id);
    if (selectedCategory === 'human-development') return ['youth', 'women'].includes(item.id);
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden border border-emerald-800/40">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-bold uppercase tracking-wider border border-emerald-600/40">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>{isHi ? 'गाँव का रोडमैप • 100% गैर-राजनीतिक एवं जनहितकारी' : 'Village Roadmap • Neutral & Non-Partisan'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            {isHi ? 'ग्राम इन्द्रौली : 10 प्रमुख विकास संकल्प' : 'Village Indroli : 10 Core Development Priorities'}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
            {isHi 
              ? 'ये 10 प्राथमिकताएं गाँव के प्रत्येक वर्ग, प्रत्येक बस्ती और आने वाली पीढ़ी के सशक्तिकरण को ध्यान में रखकर तैयार की गई हैं। यह किसी राजनीतिक दल का प्रचार नहीं, बल्कि गाँव के समग्र विकास का नागरिक संकल्प है।' 
              : 'These 10 priorities represent civic aspirations for infrastructure, education, health, and dignity for every resident of Indroli.'}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0 mr-2">
          <Filter className="w-3.5 h-3.5" />
          {isHi ? 'फ़िल्टर:' : 'Filter:'}
        </span>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {isHi ? cat.labelHi : cat.labelEn}
          </button>
        ))}
      </div>

      {/* 10 Large Visual Priorities Cards (A to J) */}
      <div className="space-y-8">
        {filteredPriorities.map((item) => {
          const Icon = iconsMap[item.icon] || Sun;
          return (
            <div 
              key={item.id}
              id={item.id}
              className="bg-white rounded-3xl border-2 border-slate-200/90 hover:border-emerald-500/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6 sm:p-8 space-y-6">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-900 flex flex-col items-center justify-center shadow-inner border border-emerald-200/60 shrink-0">
                      <span className="text-xs font-black text-emerald-700">{item.letter}</span>
                      <Icon className="w-5 h-5 text-emerald-900 mt-0.5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                          {item.category}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                          {item.badge}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                        {isHi ? item.titleHi : item.titleEn}
                      </h2>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">
                      {isHi ? 'वर्तमान स्थिति' : 'Current Status'}
                    </span>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 inline-block mt-1">
                      {isHi ? item.statusHi : item.statusEn}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  {isHi ? item.summaryHi : item.summaryEn}
                </p>

                {/* Action Points / Key Features Grid */}
                <div className="bg-slate-50/80 rounded-2xl p-5 sm:p-6 border border-slate-200 space-y-3">
                  <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>{isHi ? 'प्रमुख कार्ययोजना एवं क्रियान्वयन बिंदु:' : 'Action Plan & Execution Strategy:'}</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                    {(isHi ? item.pointsHi : item.pointsEn).map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-800 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-medium">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer target & Quick jump */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="font-bold text-slate-900">{isHi ? 'नागरिक लक्ष्य:' : 'Target:'}</span>
                    <span className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-3 py-1 rounded-lg font-bold">
                      {item.target}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => {
                        setActivePage('tracker');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold transition cursor-pointer flex items-center gap-1.5 border border-emerald-200"
                    >
                      <span>{isHi ? 'कार्य प्रगति देखें' : 'View in Tracker'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setActivePage('complaints');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold transition cursor-pointer flex items-center gap-1.5 border border-amber-200"
                    >
                      <MessageSquareCheck className="w-3.5 h-3.5 text-amber-700" />
                      <span>{isHi ? 'सुझाव / शिकायत दें' : 'Give Suggestion'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
