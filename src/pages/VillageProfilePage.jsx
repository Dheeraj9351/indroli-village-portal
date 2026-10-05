import React from 'react';
import { 
  Building2, 
  BookOpen, 
  Droplets, 
  Route, 
  Sun, 
  HeartPulse, 
  Users, 
  Compass, 
  Landmark 
} from 'lucide-react';
import { villageData } from '../data/villageData';

export default function VillageProfilePage({ lang }) {
  const isHi = lang === 'hi';
  const { basicInfo, overview, locationDetails, indicators, publicPlaces, civicSectors } = villageData;

  const sectorIcons = {
    roads: Route,
    water: Droplets,
    electricity: Sun,
    education: BookOpen,
    health: HeartPulse,
    community: Building2
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-semibold">
            <Landmark className="w-3.5 h-3.5 text-amber-400" />
            <span>{isHi ? 'हमारा गाँव • परिचय एवं रूपरेखा' : 'Our Village • Profile & Heritage'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isHi ? 'ग्राम इन्द्रौली (कामां, डीग)' : 'Village Indroli (Kaman, Deeg)'}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {isHi ? overview.hi : overview.en}
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <span className="bg-slate-800/80 px-3 py-1 rounded-md border border-slate-700">
              तहसील: <strong>{isHi ? basicInfo.tehsilHi : basicInfo.tehsilEn}</strong>
            </span>
            <span className="bg-slate-800/80 px-3 py-1 rounded-md border border-slate-700">
              जिला: <strong>{isHi ? basicInfo.districtHi : basicInfo.districtEn}</strong>
            </span>
            <span className="bg-slate-800/80 px-3 py-1 rounded-md border border-slate-700">
              पिन कोड: <strong>{basicInfo.pinCode}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* 1. GEOGRAPHICAL LOCATION & ADMINISTRATIVE DETAILS */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-700" />
            <span>{isHi ? 'भौगोलिक स्थिति एवं प्रशासनिक संरचना' : 'Geographic Location & Administration'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isHi ? 'गाँव की अवस्थिति, सीमाएं एवं मुख्य मार्गों से आवागमन' : 'Village boundaries, distances and connectivity'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 font-medium block">{isHi ? 'कामां तहसील से दूरी' : 'Distance to Kaman HQ'}</span>
            <span className="text-base font-bold text-slate-900 mt-1 block">{locationDetails.distanceToKaman}</span>
            <span className="text-slate-400 mt-1 block">{isHi ? 'सुगम पक्की सड़क मार्ग' : 'Well connected roadway'}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 font-medium block">{isHi ? 'जिला मुख्यालय (डीग)' : 'District HQ (Deeg)'}</span>
            <span className="text-base font-bold text-slate-900 mt-1 block">{locationDetails.distanceToDeeg}</span>
            <span className="text-slate-400 mt-1 block">{isHi ? 'नवनिर्मित जिला केंद्र' : 'District administrative center'}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 font-medium block">{isHi ? 'निकटवर्ती रेलवे स्टेशन' : 'Nearest Railway'}</span>
            <span className="text-base font-bold text-slate-900 mt-1 block">{locationDetails.nearestRailway}</span>
            <span className="text-slate-400 mt-1 block">{isHi ? 'कोसी कलां / कामां रेल लाइन' : 'Northern / Western railway access'}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 font-medium block">{isHi ? 'विधानसभा क्षेत्र' : 'Assembly Constituency'}</span>
            <span className="text-sm font-bold text-slate-900 mt-1 block">{basicInfo.assemblyConstituencyHi}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 font-medium block">{isHi ? 'संसदीय क्षेत्र' : 'Parliamentary Constituency'}</span>
            <span className="text-sm font-bold text-slate-900 mt-1 block">{basicInfo.parliamentaryConstituencyHi}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 font-medium block">{isHi ? 'आवागमन संपर्क' : 'Road Connectivity'}</span>
            <span className="text-xs font-semibold text-slate-800 mt-1 block">{locationDetails.connectivity}</span>
          </div>
        </div>
      </section>

      {/* 2. DEMOGRAPHIC & CIVIC INDICATORS - Strict Accuracy Rule */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-700" />
              <span>{isHi ? 'जनसंख्या एवं आजीविका संकेतक' : 'Demographic & Household Indicators'}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {isHi ? 'सत्यापित आंकड़ों की शुचिता नीति के अनुसार प्रविष्टि' : 'Published in strict compliance with data veracity'}
            </p>
          </div>
          <span className="text-xs font-semibold bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300">
            {isHi ? 'काल्पनिक आंकड़ों का उपयोग वर्जित है' : 'Zero Fabricated Figures'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {indicators.map((ind) => (
            <div key={ind.id} className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80 space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-slate-700">
                  {isHi ? ind.labelHi : ind.labelEn}
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-200/70 text-amber-900">
                  {isHi ? 'स्थिति' : 'Status'}
                </span>
              </div>
              <p className="text-base font-bold text-emerald-900">
                {isHi ? ind.valueHi : ind.valueEn}
              </p>
              <p className="text-xs text-slate-500 italic">
                ℹ️ {isHi ? ind.noteHi : ind.noteEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. IMPORTANT PUBLIC PLACES (महत्वपूर्ण सार्वजनिक स्थल) */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-700" />
            <span>{isHi ? 'गाँव के महत्वपूर्ण सार्वजनिक संस्थान एवं स्थल' : 'Key Public Institutions & Landmarks'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isHi ? 'पंचायत भवन, विद्यालय, आँगनवाड़ी, जल स्त्रोत एवं सामुदायिक स्थल' : 'Schools, Panchayat Secretariat, Water Reservoirs & Gathering Spaces'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {publicPlaces.map((place, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-400 transition space-y-2">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-bold text-sm text-slate-900">
                  {isHi ? place.nameHi : place.nameEn}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 shrink-0">
                  {place.type}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isHi ? place.descriptionHi : place.descriptionEn}
              </p>
              <div className="pt-2 text-[11px] font-medium text-emerald-700">
                ✓ {isHi ? place.statusHi : place.statusEn}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CIVIC SECTORS BREAKDOWN (Education, Water, Roads, Electricity, Health, Sanitation) */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <h2 className="text-2xl font-bold text-slate-900">
            {isHi ? 'मूलभूत जन-सुविधाएं एवं विकास क्षेत्र' : 'Civic Sectors & Public Amenities'}
          </h2>
          <p className="text-xs text-slate-500">
            {isHi ? 'सड़क, पेयजल, विद्युत, शिक्षा, स्वास्थ्य एवं स्वच्छता की वर्तमान स्थिति' : 'Detailed overview of core civic utilities in Indroli'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {civicSectors.map((sector) => {
            const Icon = sectorIcons[sector.id] || Building2;
            return (
              <div key={sector.id} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {isHi ? sector.titleHi : sector.titleEn}
                </h3>
                <div className="p-2.5 rounded bg-emerald-50 text-[11px] font-medium text-emerald-900 border border-emerald-200/60">
                  {isHi ? sector.statusHi : sector.statusEn}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isHi ? sector.detailsHi : sector.detailsEn}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
