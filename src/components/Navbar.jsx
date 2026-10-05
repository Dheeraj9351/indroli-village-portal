import React, { useState } from 'react';
import { 
  Building2, 
  Menu, 
  X, 
  Globe2, 
  PhoneCall, 
  Calendar, 
  Layers, 
  GraduationCap, 
  Users, 
  HeartPulse, 
  MessageSquareCheck, 
  Image as ImageIcon, 
  Bell, 
  Contact, 
  ShieldCheck, 
  UserCheck 
} from 'lucide-react';
import { translations } from '../data/translations';

export default function Navbar({ activePage, setActivePage, lang, setLang }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  const navItems = [
    { id: 'home', label: t.navHome, icon: Building2 },
    { id: 'about', label: t.navAbout, icon: Building2 },
    { id: 'priorities', label: t.navPriorities, icon: Layers },
    { id: 'meetings', label: t.navMeetings, icon: Calendar },
    { id: 'tracker', label: t.navTracker, icon: Layers },
    { id: 'transparency', label: t.navTransparency, icon: ShieldCheck },
    { id: 'education', label: t.navEducation, icon: GraduationCap },
    { id: 'youth-women', label: t.navYouthWomen, icon: Users },
    { id: 'health', label: t.navHealth, icon: HeartPulse },
    { id: 'complaints', label: t.navComplaints, icon: MessageSquareCheck },
    { id: 'gallery', label: t.navGallery, icon: ImageIcon },
    { id: 'announcements', label: t.navAnnouncements, icon: Bell },
    { id: 'contact', label: t.navContact, icon: Contact },
    { id: 'representative', label: t.navRepresentative, icon: UserCheck },
    { id: 'admin', label: t.navAdmin, icon: ShieldCheck, badge: 'Portal' }
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200">
      {/* Top Civic Tricolor Ribbon */}
      <div className="civic-ribbon w-full"></div>

      {/* Top Utility & Accessibility Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center gap-1 font-medium text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {lang === 'hi' ? 'नागरिक विकास पोर्टल' : 'Civic Development Portal'}
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-300">
              {lang === 'hi' ? 'तहसील कामां • जिला डीग (राजस्थान)' : 'Tehsil Kaman • District Deeg (Rajasthan)'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 text-amber-300">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>राजस्थान संपर्क: <strong>181</strong> | आपातकालीन: <strong>112</strong></span>
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
              className="inline-flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-700 text-white px-2.5 py-0.5 rounded-full font-medium transition cursor-pointer text-xs"
              title="Switch Language"
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'English' : 'हिन्दी (Hindi)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Branding Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3.5 text-left group cursor-pointer"
        >
          {/* Civic Seal Emblem */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-800 to-teal-900 text-white flex items-center justify-center shadow-md shadow-emerald-950/20 group-hover:scale-105 transition transform">
            <Building2 className="w-7 h-7 text-amber-400" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-800 transition">
                {lang === 'hi' ? 'ग्राम इन्द्रौली' : 'Gram Indroli'}
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-semibold tracking-wide bg-emerald-100 text-emerald-800 rounded border border-emerald-300">
                {lang === 'hi' ? 'ग्राम पंचायत' : 'Panchayat'}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {lang === 'hi' ? 'तहसील कामां, जिला डीग, राजस्थान (321022)' : 'Tehsil Kaman, District Deeg, Rajasthan (321022)'}
            </p>
          </div>
        </button>

        {/* Desktop Quick Badges & Admin Switch */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => handleNavClick('complaints')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm transition cursor-pointer"
          >
            <MessageSquareCheck className="w-4 h-4" />
            <span>{lang === 'hi' ? 'शिकायत / सुझाव दर्ज करें' : 'Lodge Grievance'}</span>
          </button>
          <button
            onClick={() => handleNavClick('tracker')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white shadow-sm transition cursor-pointer"
          >
            <Layers className="w-4 h-4" />
            <span>{lang === 'hi' ? 'विकास ट्रैकर' : 'Work Tracker'}</span>
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:text-emerald-800 hover:bg-slate-100 focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop Main Navigation Bar */}
      <nav className="hidden lg:block bg-slate-100/90 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-1 overflow-x-auto py-1 scrollbar-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-white hover:text-emerald-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded bg-amber-400 text-slate-900 font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white max-h-[80vh] overflow-y-auto shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="px-4 py-3 space-y-1">
            <div className="pb-2 border-b border-slate-100 mb-2 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {lang === 'hi' ? 'नेविगेशन मेन्यू' : 'Navigation Menu'}
              </span>
              <button
                onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
                className="text-xs text-emerald-800 font-bold bg-emerald-50 px-2 py-1 rounded"
              >
                {lang === 'hi' ? 'Switch to English' : 'हिन्दी चुनें'}
              </button>
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-emerald-700'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400 text-slate-900 font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
