import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Calendar, 
  Download 
} from 'lucide-react';
import { announcementsData } from '../data/announcementsData';

export default function AnnouncementsPage({ lang }) {
  const isHi = lang === 'hi';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [downloadMsg, setDownloadMsg] = useState(null);

  const categories = [
    { id: 'all', label: isHi ? 'समस्त सूचनाएं' : 'All Notices' },
    { id: 'पंचायत सूचना', label: isHi ? 'पंचायत सूचना' : 'Panchayat Advisory' },
    { id: 'बैठक सूचना', label: isHi ? 'बैठक सूचना' : 'Meeting Notice' },
    { id: 'विकास कार्य सूचना', label: isHi ? 'विकास कार्य सूचना' : 'Works Notice' },
    { id: 'स्वास्थ्य शिविर', label: isHi ? 'स्वास्थ्य शिविर' : 'Health Camp' },
    { id: 'शिक्षा कार्यक्रम', label: isHi ? 'शिक्षा कार्यक्रम' : 'Education Drive' },
    { id: 'रोजगार/कौशल', label: isHi ? 'रोजगार/कौशल' : 'Employment/Skill' }
  ];

  const filteredNotices = announcementsData.filter((item) => {
    const matchesSearch = 
      (isHi ? item.titleHi : item.titleEn).toLowerCase().includes(searchQuery.toLowerCase()) ||
      (isHi ? item.summaryHi : item.summaryEn).toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleDownload = (fileName) => {
    setDownloadMsg(`संलग्नक डाउनलोड हो रहा है: "${fileName}" (नमूना प्रारूप)`);
    setTimeout(() => setDownloadMsg(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-semibold">
            <Bell className="w-3.5 h-3.5 text-amber-400" />
            <span>{isHi ? 'डिजिटल सूचना पट्ट • ग्राम इन्द्रौली' : 'Digital Notice Board • Village Indroli'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isHi ? 'नवीनतम सूचनाएं एवं सार्वजनिक विज्ञप्तियां' : 'Latest Announcements & Public Circulars'}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {isHi 
              ? 'ग्राम पंचायत बैठक, विकास कार्य, स्वास्थ्य शिविर, शिक्षा छात्रवृत्ति, एवं रोजगार मार्गदर्शन से जुड़ी समस्त आधिकारिक सूचनाएं।' 
              : 'Official notices on Gram Sabha meetings, civil works, free clinics, library drives and vocational training.'}
          </p>
        </div>
      </div>

      {/* Simulated Download Alert */}
      {downloadMsg && (
        <div className="bg-emerald-100 border border-emerald-400 text-emerald-900 text-xs px-4 py-3 rounded-lg flex items-center justify-between shadow-sm animate-in fade-in">
          <span>✓ {downloadMsg}</span>
          <button onClick={() => setDownloadMsg(null)} className="font-bold text-emerald-900 text-sm">×</button>
        </div>
      )}

      {/* 2. Search & Category Filters */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isHi ? "सूचना शीर्षक या विवरण से खोजें..." : "Search notices..."}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div className="sm:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs text-slate-500 pt-1 border-t border-slate-100">
          <span>{isHi ? 'कुल सूचनाएं:' : 'Total Notices:'} <strong>{filteredNotices.length}</strong></span>
          {(searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="text-emerald-700 hover:underline font-semibold cursor-pointer"
            >
              {isHi ? 'फ़िल्टर हटाएं' : 'Reset'}
            </button>
          )}
        </div>
      </div>

      {/* 3. Notices List */}
      <div className="space-y-4">
        {filteredNotices.map((notice) => (
          <div
            key={notice.id}
            className={`bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition space-y-3 ${
              notice.urgent ? 'border-amber-300 ring-1 ring-amber-100' : 'border-slate-200'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800">
                  {notice.category}
                </span>
                {notice.urgent && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950 uppercase animate-pulse">
                    {isHi ? 'अति महत्वपूर्ण' : 'Urgent'}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>{notice.date}</span>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {isHi ? notice.titleHi : notice.titleEn}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                {isHi ? notice.summaryHi : notice.summaryEn}
              </p>
            </div>

            {notice.attachment && (
              <div className="pt-2 flex justify-between items-center text-xs">
                <span className="text-slate-400 font-mono text-[11px]">{notice.id}</span>
                <button
                  onClick={() => handleDownload(notice.attachment)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-emerald-800 font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{notice.attachment}</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
