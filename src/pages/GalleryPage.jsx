import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Filter, 
  MapPin, 
  Calendar, 
  X, 
  Info 
} from 'lucide-react';
import { galleryCategories, galleryItems } from '../data/galleryData';

export default function GalleryPage({ lang }) {
  const isHi = lang === 'hi';
  const [selectedCategory, setSelectedCategory] = useState('सभी');
  const [activePhoto, setActivePhoto] = useState(null);

  const filteredItems = galleryItems.filter((item) => {
    if (selectedCategory === 'सभी') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-semibold">
            <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>{isHi ? 'चित्र वीथिका • विकास एवं ग्राम्य संस्कृति' : 'Photo Gallery • Village Culture & Progress'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isHi ? 'ग्राम इन्द्रौली : छायाचित्र दीर्घा' : 'Village Indroli : Photo Gallery'}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {isHi 
              ? 'गाँव के प्राकृतिक सौंदर्य, सीसी सड़क निर्माण, जल जीवन मिशन, सौर प्रकाश, विद्यालय, स्वच्छता अभियान एवं ग्राम सभा कार्यक्रमों के प्रामाणिक छायाचित्र।' 
              : 'Visual documentation of landscape, street lighting, roads, water infrastructure, schools, and civic drives.'}
          </p>

          {/* Replacement Guide Note */}
          <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700 text-xs text-amber-300 flex items-start gap-2">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              {isHi 
                ? 'फ़ोटो प्रतिस्थापन निर्देश: वास्तविक ग्राम छायाचित्र उपलब्ध होने पर आप आसानी से src/data/galleryData.js में फ़ोटो लिंक अथवा public/images/ में स्थानीय फ़ाइलें जोड़ सकते हैं।' 
                : 'Photo Replacement Note: Actual village photos can be directly linked or added to src/data/galleryData.js.'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0 mr-1">
          <Filter className="w-3.5 h-3.5" />
          {isHi ? 'श्रेणी:' : 'Category:'}
        </span>
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. Photo Grid with Lazy Loading */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActivePhoto(item)}
            className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
          >
            <div className="relative overflow-hidden bg-slate-900 aspect-video">
              <img
                src={item.imageUrl}
                alt={isHi ? item.titleHi : item.titleEn}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition"></div>

              {/* Category Pill */}
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded text-[11px] font-bold text-amber-300 border border-slate-700">
                {item.category}
              </div>

              {/* Placeholder indicator tag */}
              {item.isPlaceholder && (
                <div className="absolute top-3 right-3 bg-emerald-950/80 px-2 py-0.5 rounded text-[10px] text-emerald-300 border border-emerald-700">
                  {isHi ? 'स्थानिक नमूना' : 'Placeholder'}
                </div>
              )}

              <div className="absolute bottom-2.5 left-3 right-3 text-white">
                <span className="text-[11px] text-slate-300 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  {item.location}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition line-clamp-1">
                  {isHi ? item.titleHi : item.titleEn}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                  {isHi ? item.descriptionHi : item.descriptionEn}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </span>
                <span className="text-emerald-700 font-semibold group-hover:underline">
                  {isHi ? 'बड़ा देखें →' : 'Expand →'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. LIGHTBOX MODAL */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="relative bg-slate-950">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.titleHi}
                className="w-full max-h-[60vh] object-contain mx-auto"
              />
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800">
                  {activePhoto.category}
                </span>
                <span className="text-xs text-slate-500">{activePhoto.date}</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                {isHi ? activePhoto.titleHi : activePhoto.titleEn}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isHi ? activePhoto.descriptionHi : activePhoto.descriptionEn}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 text-slate-700 font-medium">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  {activePhoto.location}
                </span>

                <button
                  onClick={() => setActivePhoto(null)}
                  className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 cursor-pointer font-semibold"
                >
                  {isHi ? 'बंद करें' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
