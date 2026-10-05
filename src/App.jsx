import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import VillageProfilePage from './pages/VillageProfilePage';
import PrioritiesPage from './pages/PrioritiesPage';
import MeetingsPage from './pages/MeetingsPage';
import TrackerPage from './pages/TrackerPage';
import TransparencyPage from './pages/TransparencyPage';
import EducationPage from './pages/EducationPage';
import WomenYouthPage from './pages/WomenYouthPage';
import HealthSanitationPage from './pages/HealthSanitationPage';
import ComplaintsPage from './pages/ComplaintsPage';
import GalleryPage from './pages/GalleryPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import ContactPage from './pages/ContactPage';
import RepresentativePage from './pages/RepresentativePage';
import AdminDashboardPage from './pages/AdminDashboardPage';

import { ArrowUp, MessageSquarePlus } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('indroli_lang') || 'hi';
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync language with localStorage
  useEffect(() => {
    localStorage.setItem('indroli_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  // Back to top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage setActivePage={setActivePage} lang={lang} />;
      case 'about':
        return <VillageProfilePage lang={lang} />;
      case 'priorities':
        return <PrioritiesPage setActivePage={setActivePage} lang={lang} />;
      case 'meetings':
        return <MeetingsPage lang={lang} />;
      case 'tracker':
        return <TrackerPage lang={lang} />;
      case 'transparency':
        return <TransparencyPage lang={lang} />;
      case 'education':
        return <EducationPage setActivePage={setActivePage} lang={lang} />;
      case 'youth-women':
        return <WomenYouthPage setActivePage={setActivePage} lang={lang} />;
      case 'health':
        return <HealthSanitationPage setActivePage={setActivePage} lang={lang} />;
      case 'complaints':
        return <ComplaintsPage lang={lang} />;
      case 'gallery':
        return <GalleryPage lang={lang} />;
      case 'announcements':
        return <AnnouncementsPage lang={lang} />;
      case 'contact':
        return <ContactPage lang={lang} />;
      case 'representative':
        return <RepresentativePage lang={lang} />;
      case 'admin':
        return <AdminDashboardPage lang={lang} />;
      default:
        return <HomePage setActivePage={setActivePage} lang={lang} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-sans">
      {/* Main Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        lang={lang}
        setLang={setLang}
      />

      {/* Main Content View */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Quick Floating Action Button for Grievance & Back to Top */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5">
        {activePage !== 'complaints' && (
          <button
            onClick={() => {
              setActivePage('complaints');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105 cursor-pointer border border-amber-300"
            title="शिकायत या सुझाव दर्ज करें"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span className="hidden sm:inline">
              {lang === 'hi' ? 'शिकायत / सुझाव' : 'Grievance'}
            </span>
          </button>
        )}

        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-3 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full shadow-md hover:shadow-lg transition cursor-pointer backdrop-blur-sm self-end"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Footer */}
      <Footer setActivePage={setActivePage} lang={lang} />
    </div>
  );
}
