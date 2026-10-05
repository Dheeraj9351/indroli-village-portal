import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  Calendar, 
  MapPin, 
  X,
  AlertCircle
} from 'lucide-react';
import { projectsData } from '../data/projectsData';

export default function TrackerPage({ lang }) {
  const isHi = lang === 'hi';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  // 5 Clear Status Categories
  const statuses = [
    { id: 'all', label: isHi ? 'समस्त स्थितियां' : 'All Statuses' },
    { id: 'वर्तमान सुविधा', label: isHi ? '1. वर्तमान सुविधा' : '1. Existing Facility' },
    { id: 'प्रस्तावित कार्य', label: isHi ? '2. प्रस्तावित कार्य' : '2. Proposed Work' },
    { id: 'स्वीकृत कार्य', label: isHi ? '3. स्वीकृत कार्य' : '3. Approved Work' },
    { id: 'कार्य प्रगति पर', label: isHi ? '4. कार्य प्रगति पर' : '4. Work in Progress' },
    { id: 'पूर्ण कार्य', label: isHi ? '5. पूर्ण कार्य' : '5. Completed Work' }
  ];

  const categories = [
    { id: 'all', label: isHi ? 'सभी श्रेणियां' : 'All Categories' },
    { id: 'स्ट्रीट लाइट', label: isHi ? 'स्ट्रीट लाइट' : 'Street Lighting' },
    { id: 'सड़क एवं नाली', label: isHi ? 'सड़क एवं नाली' : 'Roads & Drainage' },
    { id: 'शिक्षा', label: isHi ? 'शिक्षा एवं पुस्तकालय' : 'Education' },
    { id: 'पेयजल', label: isHi ? 'पेयजल' : 'Drinking Water' },
    { id: 'सफाई', label: isHi ? 'सफाई' : 'Sanitation' },
    { id: 'पर्यावरण', label: isHi ? 'पर्यावरण' : 'Environment' }
  ];

  const filteredProjects = projectsData.filter((proj) => {
    const matchesSearch = 
      (isHi ? proj.titleHi : proj.titleEn).toLowerCase().includes(searchQuery.toLowerCase()) ||
      (isHi ? proj.locationHi : proj.locationEn).toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.code.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || proj.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || proj.category === selectedCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'वर्तमान सुविधा':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'पूर्ण कार्य':
        return 'bg-teal-100 text-teal-800 border-teal-300';
      case 'कार्य प्रगति पर':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'स्वीकृत कार्य':
        return 'bg-sky-100 text-sky-800 border-sky-300';
      case 'प्रस्तावित कार्य':
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden border border-emerald-800/40">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-bold uppercase tracking-wider border border-emerald-600/40">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>{isHi ? 'नागरिक विकास ट्रैकर • पारदर्शी वर्गीकरण' : 'Civic Development Tracker • Categorized Roadmap'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            {isHi ? 'ग्राम इन्द्रौली विकास कार्य ट्रैकर डैशबोर्ड' : 'Village Indroli Development Tracker Dashboard'}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
            {isHi 
              ? 'गाँव की वर्तमान सुविधाओं तथा आगामी विकास प्राथमिकताओं की वास्तविक स्थिति, स्थल एवं कार्ययोजना का पारदर्शी नागरिक डैशबोर्ड।' 
              : 'Public accountability dashboard tracking stages, status, and community proposals of all village civic priorities.'}
          </p>

          {/* Strict Non-Fabrication & Labeling Notice */}
          <div className="p-3.5 bg-amber-950/70 rounded-xl border border-amber-500/40 text-xs text-amber-200 flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="block text-amber-300 font-bold mb-0.5">
                {isHi ? 'महत्वपूर्ण पारदर्शी वर्गीकरण सूचना:' : 'Mandatory Civic Classification Notice:'}
              </strong>
              <span>
                {isHi 
                  ? 'जिन सुविधाओं या कार्यों की आधिकारिक स्वीकृति, बजट आवंटन या पूर्णता का सत्यापित सरकारी रिकॉर्ड उपलब्ध नहीं है, उन्हें स्पष्ट रूप से "विकास की प्राथमिकता" अथवा "प्रस्तावित विकास लक्ष्य" के रूप में प्रदर्शित किया गया है। किसी भी असत्यापित कार्य को पूर्ण या स्वीकृत घोषित नहीं किया गया है।' 
                  : 'Where a facility is not verified as existing, officially approved, or completed, it is clearly classified as a "Development Priority" or "Proposed Goal".'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Clear Categories Legend Strip */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs">
        <span className="text-xs font-bold text-slate-600 block mb-2 uppercase tracking-wider">
          {isHi ? 'पारदर्शी कार्य श्रेणियां (5 स्पष्ट स्थितियां):' : 'Clear Civic Project Classifications:'}
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
          <div className="bg-emerald-50 text-emerald-900 border border-emerald-200 p-2.5 rounded-xl text-center">
            <span className="font-bold block">1. वर्तमान सुविधा</span>
            <span className="text-[10px] text-emerald-700">गाँव में मौजूदा सेवा</span>
          </div>
          <div className="bg-slate-100 text-slate-800 border border-slate-200 p-2.5 rounded-xl text-center">
            <span className="font-bold block">2. प्रस्तावित कार्य</span>
            <span className="text-[10px] text-slate-600">प्राथमिकता / प्रस्ताव</span>
          </div>
          <div className="bg-sky-50 text-sky-900 border border-sky-200 p-2.5 rounded-xl text-center">
            <span className="font-bold block">3. स्वीकृत कार्य</span>
            <span className="text-[10px] text-sky-700">स्वीकृति उपरांत</span>
          </div>
          <div className="bg-amber-50 text-amber-900 border border-amber-200 p-2.5 rounded-xl text-center">
            <span className="font-bold block">4. कार्य प्रगति पर</span>
            <span className="text-[10px] text-amber-700">भौतिक निर्माण जारी</span>
          </div>
          <div className="bg-teal-50 text-teal-900 border border-teal-200 p-2.5 rounded-xl text-center">
            <span className="font-bold block">5. पूर्ण कार्य</span>
            <span className="text-[10px] text-teal-700">सत्यापित पूर्ण</span>
          </div>
        </div>
      </div>

      {/* 2. Filters & Search Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isHi ? "परियोजना नाम, कोड या स्थान से खोजें..." : "Search project, code or location..."}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {statuses.map((st) => (
                <option key={st.id} value={st.id}>{st.label}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Counter & Reset */}
        <div className="flex justify-between items-center text-xs text-slate-500 pt-1 border-t border-slate-100">
          <span>
            {isHi ? 'कुल परिणाम:' : 'Total Results:'} <strong>{filteredProjects.length}</strong> {isHi ? 'प्रविष्टियां' : 'Entries'}
          </span>
          {(searchQuery || selectedStatus !== 'all' || selectedCategory !== 'all') && (
            <button
              onClick={() => { setSearchQuery(''); setSelectedStatus('all'); setSelectedCategory('all'); }}
              className="text-emerald-700 hover:underline font-bold cursor-pointer"
            >
              {isHi ? 'फ़िल्टर साफ़ करें (Reset)' : 'Reset Filters'}
            </button>
          )}
        </div>
      </div>

      {/* 3. Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((proj) => (
          <div 
            key={proj.id} 
            className="bg-white rounded-3xl border-2 border-slate-200/90 hover:border-emerald-500/50 shadow-sm hover:shadow-lg transition p-6 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {proj.code}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(proj.status)}`}>
                  ● {isHi ? proj.status : proj.statusEn}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-emerald-800">{proj.category}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                    {proj.facilityType}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {isHi ? proj.titleHi : proj.titleEn}
                </h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {isHi ? proj.detailsHi : proj.detailsEn}
              </p>

              <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span><strong>{isHi ? 'स्थान:' : 'Location:'}</strong> {isHi ? proj.locationHi : proj.locationEn}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span><strong>{isHi ? 'स्थिति/समय-सीमा:' : 'Timeline:'}</strong> {proj.startDate}</span>
                </div>
              </div>

              {/* Progress indication */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">{isHi ? 'कार्य स्थिति:' : 'Status:'}</span>
                  <span className="text-emerald-800 font-bold">
                    {proj.status === 'वर्तमान सुविधा' ? (isHi ? 'सक्रिय संधारण' : 'Active Facility') : (isHi ? 'प्रस्तावित कार्य' : 'Proposed Work')}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                🏛️ {isHi ? proj.department : proj.departmentEn}
              </span>
              <button
                onClick={() => setSelectedProject(proj)}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200"
              >
                <span>{isHi ? 'विस्तार से देखें' : 'Details'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                  {selectedProject.facilityType}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-2">
                  {isHi ? selectedProject.titleHi : selectedProject.titleEn}
                </h3>
                <span className="text-xs text-slate-400">कोड: {selectedProject.code}</span>
              </div>
              <button 
                onClick={() => setSelectedProject(null)} 
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 block">{isHi ? 'कार्य विवरण एवं नागरिक लक्ष्य:' : 'Details:'}</span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {isHi ? selectedProject.detailsHi : selectedProject.detailsEn}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">{isHi ? 'स्थान' : 'Location'}</span>
                  <span className="font-bold text-slate-900">{isHi ? selectedProject.locationHi : selectedProject.locationEn}</span>
                </div>
                <div className="p-3 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">{isHi ? 'स्थिति वर्गीकरण' : 'Classification'}</span>
                  <span className="font-bold text-emerald-800">{isHi ? selectedProject.status : selectedProject.statusEn}</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
                ℹ️ {isHi ? 'यह नागरिक सूचना ग्राम इन्द्रौली के समग्र एवं पारदर्शी विकास हेतु प्रदर्शित है।' : 'Displayed for civic transparency and village progress.'}
              </div>
            </div>

            <div className="pt-2 text-right">
              <button 
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 cursor-pointer"
              >
                {isHi ? 'बंद करें' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
