import React from 'react';
import { 
  MapPin, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  Bell, 
  Clock,
  Sun,
  Route,
  Droplets,
  BookOpen,
  GraduationCap,
  HeartPulse,
  Users,
  CheckCircle2,
  Image as ImageIcon,
  MessageSquareCheck,
  Sparkles
} from 'lucide-react';
import { villageData } from '../data/villageData';
import { announcementsData } from '../data/announcementsData';
import { meetingsData } from '../data/meetingsData';
import { projectsData } from '../data/projectsData';
import { galleryItems } from '../data/galleryData';

export default function HomePage({ setActivePage, lang }) {
  const isHi = lang === 'hi';
  const urgentNotice = announcementsData.find(n => n.urgent) || announcementsData[0];
  const upcoming = meetingsData.upcomingMeeting;

  // Selected top visual gallery items for the preview
  const previewGallery = galleryItems.slice(0, 6);

  return (
    <div className="space-y-12 pb-14">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: VILLAGE-FOCUSED, CIVIC & WELCOMING                       */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden hero-pattern text-white py-12 lg:py-16 border-b border-emerald-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge: Geographic & Civic Identity */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/90 border border-emerald-400/30 text-emerald-100 text-xs font-semibold shadow-inner">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{isHi ? 'तहसील कामां • जिला डीग (राजस्थान)' : 'Tehsil Kaman • District Deeg (Rajasthan)'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>पिन: 321022</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                  {isHi ? 'ग्राम इन्द्रौली विकास मंच' : 'Village Indroli Development Portal'}
                </h1>
                <p className="text-xl sm:text-2xl font-semibold text-emerald-200">
                  {isHi ? 'हमारा गांव, हमारी प्रगति • पारदर्शी नागरिक सेवा पोर्टल' : 'Our Village, Our Progress • Civic Transparency & Service'}
                </p>
              </div>

              {/* Introduction */}
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-normal">
                {isHi ? villageData.overview.hi : villageData.overview.en}
              </p>

              {/* Explicit Civic & Non-Political Trust Notice */}
              <div className="flex items-start gap-2.5 text-xs text-amber-200 bg-amber-950/60 p-3.5 rounded-xl border border-amber-500/40 max-w-2xl shadow-sm">
                <ShieldCheck className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
                <div className="leading-relaxed">
                  <strong className="block text-amber-300 font-bold mb-0.5">
                    {isHi ? '100% गैर-राजनीतिक एवं जनहितकारी नागरिक मंच:' : 'Non-Partisan Civic Commitment:'}
                  </strong>
                  <span>
                    {isHi 
                      ? 'यह पोर्टल केवल और केवल गांव की बुनियादी सुविधाओं, पारदर्शी विकास और ग्रामीणों की समस्याओं के सीधे समाधान हेतु समर्पित है। किसी भी राजनीतिक दल या प्रचार से पूर्णतः मुक्त।' 
                      : 'Dedicated exclusively to village civic infrastructure, open governance, and neutral public grievance redressal.'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setActivePage('tracker');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition flex items-center gap-2 cursor-pointer"
                >
                  <span>{isHi ? 'विकास कार्य प्रगति देखें' : 'View Development Progress'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setActivePage('complaints');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-sm border border-emerald-400/40 shadow-sm transition flex items-center gap-2 cursor-pointer"
                >
                  <MessageSquareCheck className="w-4 h-4 text-amber-300" />
                  <span>{isHi ? 'सुझाव / शिकायत दर्ज करें' : 'Lodge Complaint / Suggestion'}</span>
                </button>

                <button
                  onClick={() => {
                    setActivePage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition cursor-pointer"
                >
                  {isHi ? 'गाँव की रूपरेखा' : 'Village Profile'}
                </button>
              </div>
            </div>

            {/* Right Hero Image & Community Spotlight */}
            <div className="lg:col-span-5 space-y-3">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-emerald-700/60 bg-slate-950 group">
                <img 
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=900&auto=format&fit=crop&q=80"
                  alt="ग्राम इन्द्रौली प्राकृतिक परिदृश्य"
                  className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-amber-300 border border-slate-700">
                  📷 {isHi ? 'ग्राम इन्द्रौली परिदृश्य (नमूना चित्र)' : 'Indroli Village Landscape'}
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-emerald-300">
                      {isHi ? 'ग्राम इन्द्रौली, कामां' : 'Gram Indroli, Kaman'}
                    </span>
                    <span className="text-[11px] font-medium text-slate-300 bg-emerald-900/80 px-2 py-0.5 rounded">
                      डीग (राजस्थान)
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-snug">
                    {isHi 
                      ? 'लहलहाते खेत, शांतिपूर्ण ग्रामीण परिवेश एवं विकास की नई राह। वास्तविक ग्राम छायाचित्र गैलरी में कभी भी जोड़े जा सकते हैं।' 
                      : 'Agricultural serenity and civic development. Actual photos can be added anytime in the gallery.'}
                  </p>
                </div>
              </div>

              {/* 3 Trust Pillars Quick Strip */}
              <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                <div className="bg-emerald-900/70 p-2.5 rounded-xl border border-emerald-700/50">
                  <span className="block font-black text-amber-300 text-sm">100%</span>
                  <span className="text-[11px] text-slate-200">{isHi ? 'खुली पारदर्शिता' : 'Transparency'}</span>
                </div>
                <div className="bg-emerald-900/70 p-2.5 rounded-xl border border-emerald-700/50">
                  <span className="block font-black text-emerald-300 text-sm">24x7</span>
                  <span className="text-[11px] text-slate-200">{isHi ? 'नागरिक सेवा' : 'Public Access'}</span>
                </div>
                <div className="bg-emerald-900/70 p-2.5 rounded-xl border border-emerald-700/50">
                  <span className="block font-black text-sky-300 text-sm">0%</span>
                  <span className="text-[11px] text-slate-200">{isHi ? 'राजनीतिक दुर्भावना' : 'Non-Partisan'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. URGENT ANNOUNCEMENT TICKER / BANNER                                    */}
      {/* ========================================================================= */}
      {urgentNotice && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
          <div className="bg-white rounded-xl shadow-lg border-l-4 border-amber-500 p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 border border-slate-200">
            <div className="flex items-start md:items-center gap-3">
              <span className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0">
                <Bell className="w-5 h-5 animate-bounce" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500 text-slate-950 uppercase">
                    {urgentNotice.category}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{urgentNotice.date}</span>
                </div>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  {isHi ? urgentNotice.titleHi : urgentNotice.titleEn}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setActivePage('announcements');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="self-end md:self-center text-xs font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 cursor-pointer whitespace-nowrap bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-100 transition"
            >
              <span>{isHi ? 'पूरी सूचना पढ़ें' : 'Read Notice'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 3. DIGITAL VILLAGE SECTION: WHY THIS WEBSITE EXISTS (Requirement 14)       */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-700/60 relative overflow-hidden">
          <div className="max-w-3xl mb-8 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-600/40">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{isHi ? 'डिजिटल इन्द्रौली पहल' : 'Digital Indroli Initiative'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {isHi ? 'यह वेबसाइट क्यों बनाई गई है? हमारा नागरिक उद्देश्य' : 'Why Does This Portal Exist? Our Civic Mission'}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {isHi 
                ? 'गाँव के प्रत्येक नागरिक को अपने गाँव की प्रगति, बजट और विकास प्राथमिकताओं की प्रामाणिक जानकारी मिले तथा वे बिना किसी मध्यस्थ या बिचौलिये के सीधे अपनी बात रख सकें।' 
                : 'Empowering every resident with open civic data, transparent work records, and direct unmediated grievance resolution.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Pillar 1: Full Transparency */}
            <div className="bg-slate-800/70 backdrop-blur-sm p-5 rounded-2xl border border-slate-700/80 hover:border-emerald-500/50 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg mb-3">
                1
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">
                {isHi ? '100% खुला विकास' : 'Full Transparency'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isHi 
                  ? 'गांव में क्या वर्तमान सुविधा है और क्या प्रस्तावित है — हर जानकारी हर ग्रामीण के लिए पारदर्शी रूप से खुली है।' 
                  : 'Complete clarity on what exists, what is proposed, and future village civic priorities.'}
              </p>
            </div>

            {/* Pillar 2: Direct Citizen Connect */}
            <div className="bg-slate-800/70 backdrop-blur-sm p-5 rounded-2xl border border-slate-700/80 hover:border-amber-500/50 transition">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg mb-3">
                2
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">
                {isHi ? 'सीधी जनसुनवाई' : 'Direct Grievance'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isHi 
                  ? 'बिना किसी सिफारिश या भागदौड़ के, अपनी समस्या या सुझाव सीधे ऑनलाइन दर्ज करें और टोकन नंबर से प्रगति जांचें।' 
                  : 'Lodge civic complaints or suggestions directly without intermediaries, receiving trackable ticket IDs.'}
              </p>
            </div>

            {/* Pillar 3: Core Civic Needs */}
            <div className="bg-slate-800/70 backdrop-blur-sm p-5 rounded-2xl border border-slate-700/80 hover:border-sky-500/50 transition">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-lg mb-3">
                3
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">
                {isHi ? 'बुनियादी सुविधाओं पर जोर' : 'Focus on Core Needs'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isHi 
                  ? 'रोशनी, पक्की सड़क, ढकी नालियां, शुद्ध पेयजल, बेटियों की पढ़ाई और युवाओं के खेल — गाँव की बुनियादी प्राथमिकताओं पर कार्य।' 
                  : 'Dedicated focus on solar lighting, paved CC roads, covered drains, potable water, and girl education.'}
              </p>
            </div>

            {/* Pillar 4: Non-Partisan Platform */}
            <div className="bg-slate-800/70 backdrop-blur-sm p-5 rounded-2xl border border-slate-700/80 hover:border-emerald-500/50 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg mb-3">
                4
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">
                {isHi ? 'सबका साझा मंच' : 'Non-Partisan Platform'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isHi 
                  ? 'यह किसी पार्टी या व्यक्ति विशेष का नहीं, बल्कि पूरे इन्द्रौली गांव का साझा विकास मंच है जहाँ हर नागरिक का समान अधिकार है।' 
                  : 'An inclusive civic platform owned by the villagers of Indroli, entirely free from political polarization.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. LARGE VISUAL DEVELOPMENT CARDS (Requirements 2 to 9)                  */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>{isHi ? 'गाँव की विकास प्राथमिकताएं' : 'Civic Priorities'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            {isHi ? 'इन्द्रौली के विकास संकल्प — बड़े विजुअल विकास कार्ड्स' : 'Pillars of Progress in Village Indroli'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {isHi 
              ? 'बिना किसी राजनीतिक भेदभाव के, गाँव के प्रत्येक मोहल्ले, प्रत्येक वर्ग और आने वाली पीढ़ी के उज्ज्वल भविष्य के लिए निर्धारित बुनियादी कार्ययोजना:' 
              : 'Actionable civic works targeted at fundamental public infrastructure, transparent execution, and social upliftment.'}
          </p>
        </div>

        {/* 7 Large Visual Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Solar Street Lights (Requirement 3) */}
          <div className="bg-white rounded-3xl border-2 border-amber-200/80 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shadow-inner">
                  <Sun className="w-6 h-6 text-amber-600" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  {isHi ? 'विकास की प्राथमिकता' : 'Development Priority'}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition">
                  {isHi ? 'सौर स्ट्रीट लाइटें (Solar Street Lights)' : 'Solar Street Lighting'}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {isHi 
                    ? 'गाँव के मुख्य चौराहों, बस स्टैंड, स्कूल मार्ग एवं अँधेरे मोड़ों पर सौर स्ट्रीट लाइटों की स्थापना का प्रस्ताव ताकि रात्रि आवागमन सुरक्षित रहे। (प्रस्तावित कार्य)' 
                    : 'Civic proposal for installing dusk-to-dawn standalone solar LED street lights across key dark junctures.'}
                </p>
              </div>

              {/* Action Points / Benefits */}
              <div className="bg-amber-50/60 p-3 rounded-2xl border border-amber-100 space-y-1.5 text-xs text-slate-700">
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>{isHi ? 'मुख्य चौराहों व अंधेरे मार्गों पर सौर रोशनी का प्रस्ताव।' : 'Solar illumination blueprint for critical junctions.'}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>{isHi ? 'महिलाओं, बच्चों व बुजुर्गों के सुरक्षित आवागमन का लक्ष्य।' : 'Safer nocturnal movement for all residents.'}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>{isHi ? 'नागरिक सहभागिता से संवेदनशील स्थलों का चिन्हीकरण।' : 'Community mapping of sensitive dark zones.'}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                {isHi ? 'प्रस्तावित कार्य' : 'Proposed Work'}
              </span>
              <button
                onClick={() => {
                  setActivePage('complaints');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
              >
                <span>{isHi ? 'स्थल सुझाव दें' : 'Suggest Location'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Roads and Drainage (Requirement 4) */}
          <div className="bg-white rounded-3xl border-2 border-emerald-200/80 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shadow-inner">
                  <Route className="w-6 h-6 text-emerald-700" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                  {isHi ? 'विकास की प्राथमिकता' : 'Development Priority'}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition">
                  {isHi ? 'पक्की सड़कें एवं कवर्ड नाली निर्माण (Roads & Drainage)' : 'Roads and Drainage System'}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {isHi 
                    ? 'गाँव की आंतरिक गलियों में टिकाऊ सीसी सड़क और दोनों ओर ढकी हुई पक्की नालियों के निर्माण का प्रस्ताव जिससे कीचड़ व जलभराव से मुक्ति मिले।' 
                    : 'Proposal for upgrading village pathways with concrete (CC) roads and lined, covered drainage.'}
                </p>
              </div>

              {/* Action Points / Benefits */}
              <div className="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100 space-y-1.5 text-xs text-slate-700">
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{isHi ? 'कीचड़ मुक्त रास्ते एवं सुगम आवागमन का प्रस्ताव।' : 'Mud-free lanes for hassle-free walking and transit.'}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{isHi ? 'ढकी हुई आरसीसी नालियां व सोखता गड्ढे बनाने की योजना।' : 'Covered RCC drains avoiding foul odor and stagnant water.'}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{isHi ? 'कार्य पूर्व व पश्चात (Before/After) पारदर्शी दस्तावेजीकरण।' : 'Transparent before and after photographic records upon execution.'}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                {isHi ? 'प्रस्तावित कार्य' : 'Proposed Work'}
              </span>
              <button
                onClick={() => {
                  setActivePage('tracker');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
              >
                <span>{isHi ? 'प्रस्ताव देखें' : 'View Proposal'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Safe Drinking Water (Requirement 5) */}
          <div className="bg-white rounded-3xl border-2 border-blue-200/80 hover:border-blue-500 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold shadow-inner">
                  <Droplets className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300">
                  {isHi ? 'विकास की प्राथमिकता' : 'Development Priority'}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-800 transition">
                  {isHi ? 'शुद्ध एवं नियमित पेयजल (Drinking Water)' : 'Safe & Reliable Drinking Water'}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {isHi 
                    ? 'गाँव के मौजूदा पेयजल जलाशय की नियमित सफाई, क्लोरीनेशन, पाइपलाइन लीकेज निवारण एवं शुद्ध नल-जल विस्तार का प्राथमिकता प्रस्ताव।' 
                    : 'Maintaining existing storage reservoir, tank chlorination, and piped water expansion proposal.'}
                </p>
              </div>

              {/* Action Points / Benefits */}
              <div className="bg-blue-50/60 p-3 rounded-2xl border border-blue-100 space-y-1.5 text-xs text-slate-700">
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{isHi ? 'मौजूदा ओवरहेड टंकी की नियमित ब्लीचिंग व क्लोरीनेशन।' : 'Scheduled overhead tank chlorination & hygiene.'}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{isHi ? 'जल जीवन मिशन द्वारा वंचित बस्तियों तक पाइपलाइन विस्तार।' : 'Piped water expansion proposal for uncovered areas.'}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{isHi ? 'पाइपलाइन लीकेज व दूषित पानी की सीधी शिकायत।' : 'Fast grievance redressal for pipeline bursts.'}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                {isHi ? 'वर्तमान सुविधा (संवर्धन प्रस्तावित)' : 'Existing (Upgradation Proposed)'}
              </span>
              <button
                onClick={() => {
                  setActivePage('complaints');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="font-bold text-blue-800 hover:text-blue-950 flex items-center gap-1 cursor-pointer"
              >
                <span>{isHi ? 'जल समस्या बताएं' : 'Water Grievance'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 4: Girls Library & Study Centre (Requirement 6) */}
          <div className="bg-white rounded-3xl border-2 border-rose-200/80 hover:border-rose-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold shadow-inner">
                  <BookOpen className="w-6 h-6 text-rose-600" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-900 border border-rose-300">
                  {isHi ? 'प्रस्तावित विकास लक्ष्य' : 'Proposed Development Goal'}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-800 transition">
                  {isHi ? 'सावित्रीबाई फुले बालिका पुस्तकालय एवं स्वाध्याय केंद्र' : 'Girls Library & Study Centre'}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {isHi 
                    ? 'गाँव की बेटियों के लिए सुरक्षित, शांत एवं अनुशासित अध्ययन केंद्र की स्थापना का प्रस्ताव जहाँ प्रतियोगी परीक्षाओं की पुस्तकें एवं कंप्यूटर अध्ययन संसाधन उपलब्ध हों।' 
                    : 'Civic proposal for a dedicated, safe study space for female students with exam books and computer stations.'}
                </p>
              </div>

              {/* Action Points / Benefits */}
              <div className="bg-rose-50/60 p-3 rounded-2xl border border-rose-100 space-y-1.5 text-xs text-slate-700">
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <span>{isHi ? 'छात्राओं हेतु समर्पित सुरक्षित व अनुशासित स्वाध्याय कक्ष प्रस्ताव।' : 'Dedicated study room proposal for girls.'}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <span>{isHi ? 'प्रतियोगी पुस्तकों (REET, CET, पुलिस, SSC) के संकलन की योजना।' : 'Plan for competitive exam guides and journals repository.'}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <span>{isHi ? 'कंप्यूटर व डिजिटल अध्ययन संसाधनों की व्यवस्था हेतु जनसहयोग।' : 'Community cooperation for digital learning resources.'}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                {isHi ? 'प्रस्तावित कार्य' : 'Proposed Work'}
              </span>
              <button
                onClick={() => {
                  setActivePage('education');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="font-bold text-rose-800 hover:text-rose-950 flex items-center gap-1 cursor-pointer"
              >
                <span>{isHi ? 'पुस्तकालय प्रस्ताव' : 'Library Proposal'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 5: Education & Schools (Requirement 7) */}
          <div className="bg-white rounded-3xl border-2 border-indigo-200/80 hover:border-indigo-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold shadow-inner">
                  <GraduationCap className="w-6 h-6 text-indigo-700" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-300">
                  {isHi ? 'विकास की प्राथमिकता' : 'Development Priority'}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-800 transition">
                  {isHi ? 'गुणवत्तापूर्ण शिक्षा एवं विद्यालय उन्नयन (Education)' : 'School Education & Infrastructure'}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {isHi 
                    ? 'राजकीय उच्च माध्यमिक व प्राथमिक विद्यालय में बालक-बालिका पृथक शौचालय, स्वच्छ पेयजल, स्मार्ट क्लास एवं छात्रवृत्ति मार्गदर्शन का प्रस्ताव।' 
                    : 'Proposal for classroom upgrades, separate restrooms, clean water stations, and scholarship guidance.'}
                </p>
              </div>

              {/* Action Points / Benefits */}
              <div className="bg-indigo-50/60 p-3 rounded-2xl border border-indigo-100 space-y-1.5 text-xs text-slate-700">
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>{isHi ? 'बालक-बालिका अलग स्वच्छ शौचालय व्यवस्था का सुदृढ़ीकरण।' : 'Strengthening separate restrooms for boys and girls.'}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>{isHi ? 'डिजिटल क्लासरूम एवं सामान्य कंप्यूटर साक्षरता का सहयोग।' : 'Support for digital tools and computer literacy.'}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>{isHi ? 'मेधावी विद्यार्थियों हेतु मार्गदर्शन एवं छात्रवृत्ति सहायता।' : 'Scholarship guidance and study support.'}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                {isHi ? 'प्रस्तावित कार्य' : 'Proposed Work'}
              </span>
              <button
                onClick={() => {
                  setActivePage('education');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="font-bold text-indigo-800 hover:text-indigo-950 flex items-center gap-1 cursor-pointer"
              >
                <span>{isHi ? 'शिक्षा प्रस्ताव' : 'Proposal'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 6: Health & Sanitation (Requirement 8) */}
          <div className="bg-white rounded-3xl border-2 border-teal-200/80 hover:border-teal-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold shadow-inner">
                  <HeartPulse className="w-6 h-6 text-teal-700" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-teal-100 text-teal-900 border border-teal-300">
                  {isHi ? 'विकास की प्राथमिकता' : 'Development Priority'}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-800 transition">
                  {isHi ? 'सुलभ स्वास्थ्य एवं स्वच्छ इन्द्रौली (Health & Sanitation)' : 'Health, Hygiene & Sanitation'}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {isHi 
                    ? 'नियमित स्वास्थ्य व नेत्र जांच शिविर, मातृ-शिशु टीकाकरण जागरूकता, नाली सफाई और 108/104 आपातकालीन एम्बुलेंस समन्वय का प्रस्ताव।' 
                    : 'Periodic health checkup drives, maternal-child immunisation tracking, and ambulance coordination.'}
                </p>
              </div>

              {/* Action Points / Benefits */}
              <div className="bg-teal-50/60 p-3 rounded-2xl border border-teal-100 space-y-1.5 text-xs text-slate-700">
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <span>{isHi ? 'सामान्य एवं नेत्र चिकित्सा शिविरों के आयोजन का प्रस्ताव।' : 'Multi-speciality checkup drive proposals.'}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <span>{isHi ? 'नालियों की नियमित गाद निकासी व कीटनाशक छिड़काव योजना।' : 'Drain desilting and anti-larval sprays plan.'}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <span>{isHi ? '108 / 104 आपातकालीन एम्बुलेंस संपर्क समन्वय।' : 'Direct link to 108/104 emergency helplines.'}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                {isHi ? 'प्रस्तावित कार्य' : 'Proposed Work'}
              </span>
              <button
                onClick={() => {
                  setActivePage('health');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="font-bold text-teal-800 hover:text-teal-950 flex items-center gap-1 cursor-pointer"
              >
                <span>{isHi ? 'स्वास्थ्य सेवाएं' : 'Health Services'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 7: Women & Youth Development (Requirement 9) - Span on md/lg */}
          <div className="bg-white rounded-3xl border-2 border-orange-200/80 hover:border-orange-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group md:col-span-2 lg:col-span-3">
            <div className="p-6 lg:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-800 flex items-center justify-center font-bold shadow-inner">
                    <Users className="w-6 h-6 text-orange-700" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-900 border border-orange-300">
                      {isHi ? 'प्रस्तावित विकास लक्ष्य' : 'Proposed Development Goal'}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">
                      {isHi ? 'महिला स्वावलंबन एवं युवा कौशल-खेल विकास (Women & Youth)' : 'Women Empowerment & Youth Skill Development'}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {isHi 
                    ? 'गाँव की महिलाओं के लिए स्वयं सहायता समूहों (SHG) के माध्यम से सिलाई-कढ़ाई व स्वरोजगार प्रशिक्षण तथा युवाओं के लिए खेल मैदान समतलीकरण, खेल सामग्री और सेना/पुलिस भर्ती मार्गदर्शन का कार्ययोजना प्रस्ताव।' 
                    : 'Proposals for Self-Help Group (SHG) vocational training; village playground leveling, sports equipment, and defense recruitment mentorship for youth.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 pt-1">
                  <div className="bg-orange-50/70 p-3 rounded-2xl border border-orange-100 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <span>{isHi ? 'महिला स्वयं सहायता समूह: बैंक लिंकेज, सिलाई प्रशिक्षण एवं डिजिटल बैंकिंग सुरक्षा प्रस्ताव।' : 'Women SHGs: Micro-enterprise, tailoring training, and digital financial safety proposal.'}</span>
                  </div>
                  <div className="bg-orange-50/70 p-3 rounded-2xl border border-orange-100 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <span>{isHi ? 'युवा शक्ति: खेल मैदान समतलीकरण (क्रिकेट/वॉलीबॉल), रनिंग ट्रैक व शारीरिक परीक्षा तैयारी प्रस्ताव।' : 'Youth power: Village sports ground leveling, running track, and exam fitness coaching proposal.'}</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col items-start md:items-end justify-center gap-3 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                  {isHi ? 'प्रस्तावित कार्ययोजना' : 'Proposed Action Plan'}
                </span>
                <button
                  onClick={() => {
                    setActivePage('youth-women');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{isHi ? 'महिला व युवा प्रस्ताव देखें' : 'Explore Youth & Women'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Explore All Priorities Button */}
        <div className="text-center pt-2">
          <button
            onClick={() => {
              setActivePage('priorities');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-sm transition inline-flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span>{isHi ? 'सभी 10 विकास प्राथमिकताएं विस्तार से देखें' : 'Explore All 10 Priorities in Detail'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. MONTHLY PANCHAYAT MEETINGS SPOTLIGHT (Requirement 10)                  */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-emerald-700/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>{isHi ? 'मासिक ग्राम पंचायत एवं जनसुनवाई बैठक' : 'Monthly Panchayat & Public Sabha'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {isHi ? upcoming.titleHi : upcoming.titleEn}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {isHi 
                  ? 'ग्राम सभा में भाग लेना प्रत्येक नागरिक का लोकतांत्रिक अधिकार है। आइए, मिलकर गाँव के विकास और अपनी समस्याओं पर खुली चर्चा करें।' 
                  : 'Participating in Gram Sabha is every citizen’s right. Join us for open deliberations on village progress.'}
              </p>

              {/* Date, Time & Venue Chips */}
              <div className="flex flex-wrap gap-3 text-xs text-slate-200 pt-1">
                <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span><strong>{isHi ? upcoming.dateHi : upcoming.dateEn}</strong> ({upcoming.timeHi})</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>{isHi ? upcoming.venueHi : upcoming.venueEn}</span>
                </div>
              </div>

              {/* Agenda Highlights */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  {isHi ? 'मुख्य कार्यसूची (एजेंडा बिंदु):' : 'Key Agenda Highlights:'}
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                  {upcoming.agendaItems.slice(0, 4).map((item) => (
                    <li key={item.num} className="flex items-start gap-2 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
                      <span className="text-amber-400 font-bold">{item.num}.</span>
                      <span className="leading-snug">{isHi ? item.titleHi : item.titleEn}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-3">
              <button
                onClick={() => {
                  setActivePage('meetings');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isHi ? 'बैठक कार्यवृत्त व रिकॉर्ड्स देखें' : 'View Minutes & History'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-slate-400 text-left lg:text-right max-w-xs">
                {isHi 
                  ? 'पिछली समस्त बैठकों के निर्णय एवं कार्यवृत्त पोर्टल पर सार्वजनिक रूप से उपलब्ध हैं।' 
                  : 'All past resolutions and meeting minutes are archived openly on this portal.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. DEVELOPMENT PROGRESS TRACKER (Requirement 11)                         */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>{isHi ? 'पारदर्शी कार्य श्रेणियां (5 स्पष्ट स्थितियां)' : 'Categorized Project Tracker'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                {isHi ? 'विकास कार्यों की वास्तविक स्थिति' : 'Active Projects Progress Tracker'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {isHi ? 'सत्यापित भौतिक प्रगति — शून्य मनगढ़ंत आंकड़े या फर्जी स्वीकृति दावे' : 'Strictly verified metrics only • Zero fabricated financial claims'}
              </p>
            </div>
            <button
              onClick={() => {
                setActivePage('tracker');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 transition flex items-center gap-1 cursor-pointer"
            >
              <span>{isHi ? 'सम्पूर्ण ट्रैकर डैशबोर्ड खोलें' : 'Open Full Tracker'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 5 Status categories legend */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs pt-1">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {projectsData.slice(0, 4).map((proj) => (
              <div key={proj.id} className="p-5 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-3 hover:border-emerald-300 transition">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-700">
                        {proj.code}
                      </span>
                      <span className="text-xs font-bold text-emerald-800">
                        {proj.category}
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                        {proj.facilityType}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 mt-1">
                      {isHi ? proj.titleHi : proj.titleEn}
                    </h3>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                    proj.status === 'वर्तमान सुविधा' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                    proj.status === 'पूर्ण कार्य' ? 'bg-teal-100 text-teal-800 border border-teal-300' :
                    proj.status === 'कार्य प्रगति पर' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                    'bg-slate-100 text-slate-800 border border-slate-300'
                  }`}>
                    ● {isHi ? proj.status : proj.statusEn}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {isHi ? proj.detailsHi : proj.detailsEn}
                </p>

                <div className="flex justify-between items-center text-xs text-slate-500 pt-1 border-t border-slate-200/60">
                  <span className="truncate max-w-[200px]">📍 {isHi ? proj.locationHi : proj.locationEn}</span>
                  <span className="font-semibold text-emerald-800">
                    {proj.status === 'वर्तमान सुविधा' ? (isHi ? 'सक्रिय संधारण' : 'Active Facility') : (isHi ? 'प्रस्ताव स्तर' : 'Proposed')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. CITIZEN COMPLAINT / SUGGESTION BANNER (Requirement 12)                 */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 rounded-3xl p-6 sm:p-10 shadow-lg border border-amber-300 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <MessageSquareCheck className="w-3.5 h-3.5" />
                <span>{isHi ? 'नागरिक जनसुनवाई प्रणाली' : 'Citizen Grievance & Suggestion'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
                {isHi ? 'गाँव की समस्या या विकास सुझाव? सीधे ऑनलाइन दर्ज करें' : 'Have a Village Issue or Suggestion? Submit Directly'}
              </h2>

              <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-medium">
                {isHi 
                  ? 'स्ट्रीट लाइट बंद है, नाली की सफाई चाहिए, पानी की पाइपलाइन में लीकेज है या कोई नया विचार? 2 मिनट में अपनी बात रखें और टोकन संख्या प्राप्त करें।' 
                  : 'Report broken street lights, drain clogging, water leakages or suggest new civic amenities in minutes with instant tracking.'}
              </p>

              {/* 3 Step Visual Guide */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
                <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-amber-600/20">
                  <span className="font-bold text-amber-900 block text-xs">1. विवरण भरें</span>
                  <span className="text-[11px] text-slate-700">नाम, फोन व समस्या का स्थान बताएं</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-amber-600/20">
                  <span className="font-bold text-amber-900 block text-xs">2. फ़ोटो जोड़ें (वैकल्पिक)</span>
                  <span className="text-[11px] text-slate-700">समस्या स्थल का फोटो संलग्न करें</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-amber-600/20">
                  <span className="font-bold text-amber-900 block text-xs">3. टोकन नंबर पाएं</span>
                  <span className="text-[11px] text-slate-700">स्थिति कभी भी ऑनलाइन ट्रैक करें</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 items-start lg:items-end justify-center">
              <button
                onClick={() => {
                  setActivePage('complaints');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider shadow-xl transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isHi ? 'शिकायत / सुझाव दर्ज करें' : 'Lodge Grievance Now'}</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>

              <div className="text-left lg:text-right text-xs text-slate-900">
                <span className="font-semibold block">{isHi ? 'राजस्थान संपर्क हेल्पलाइन:' : 'State Helpline:'} <strong>181</strong> (टोल-फ्री)</span>
                <span className="text-[11px] text-slate-800">{isHi ? 'आपातकालीन सहायता: 112 | एम्बुलेंस: 108' : 'Emergency: 112 | Ambulance: 108'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. VILLAGE PHOTO GALLERY SHOWCASE (Requirement 13)                        */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <ImageIcon className="w-3.5 h-3.5 text-emerald-700" />
              <span>{isHi ? 'चित्र वीथिका' : 'Photo Gallery'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {isHi ? 'ग्राम इन्द्रौली : छायाचित्र दीर्घा' : 'Village Indroli : Visual Showcase'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {isHi ? 'गाँव की प्राकृतिक सुंदरता, विद्यालय एवं प्रस्तावित विकास प्राथमिकताओं की संदर्भ झलक' : 'Glimpses of village landscape, school and civic priorities'}
            </p>
          </div>
          <button
            onClick={() => {
              setActivePage('gallery');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 transition flex items-center gap-1 cursor-pointer"
          >
            <span>{isHi ? 'सम्पूर्ण गैलरी देखें' : 'View Full Gallery'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewGallery.map((item) => (
            <div 
              key={item.id}
              onClick={() => {
                setActivePage('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
            >
              <div className="relative overflow-hidden bg-slate-900 aspect-video">
                <img 
                  src={item.imageUrl}
                  alt={isHi ? item.titleHi : item.titleEn}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition"></div>

                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded text-[11px] font-bold text-amber-300 border border-slate-700">
                  {item.category}
                </div>

                {item.isPlaceholder && (
                  <div className="absolute top-3 right-3 bg-emerald-950/80 px-2 py-0.5 rounded text-[10px] text-emerald-300 border border-emerald-700">
                    {isHi ? 'स्थानिक नमूना' : 'Placeholder'}
                  </div>
                )}
              </div>

              <div className="p-4 space-y-1.5">
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-800 transition line-clamp-1">
                  {isHi ? item.titleHi : item.titleEn}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {isHi ? item.descriptionHi : item.descriptionEn}
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                  <span>📍 {item.location}</span>
                  <span>🗓️ {item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. STATUTORY GOVERNMENT PORTALS & PUBLIC HELPLINES                        */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-slate-200 pt-8">
          <div className="text-center mb-6">
            <h3 className="text-base font-bold text-slate-800">
              {isHi ? 'महत्वपूर्ण आधिकारिक सरकारी पोर्टल एवं जन-सेवाएं' : 'Official Government Portals & Public Services'}
            </h3>
            <p className="text-xs text-slate-500">
              {isHi ? 'नागरिक सुविधाओं, राशन, पेंशन एवं योजनाओं के आधिकारिक स्रोत' : 'Direct statutory links for citizen amenities, ration, and welfare'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <a 
              href="https://sampark.rajasthan.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 text-center transition group shadow-sm"
            >
              <span className="block font-bold text-xs text-slate-800 group-hover:text-emerald-700">राजस्थान संपर्क</span>
              <span className="text-[11px] text-slate-500 block">हेल्पलाइन 181</span>
            </a>

            <a 
              href="https://egramswaraj.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 text-center transition group shadow-sm"
            >
              <span className="block font-bold text-xs text-slate-800 group-hover:text-emerald-700">e-GramSwaraj</span>
              <span className="text-[11px] text-slate-500 block">पंचायत लेखा पोर्टल</span>
            </a>

            <a 
              href="https://jansoochna.rajasthan.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 text-center transition group shadow-sm"
            >
              <span className="block font-bold text-xs text-slate-800 group-hover:text-emerald-700">जन सूचना पोर्टल</span>
              <span className="text-[11px] text-slate-500 block">पारदर्शी जन-कल्याण</span>
            </a>

            <a 
              href="https://ejalshakti.gov.in/jjmreport" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 text-center transition group shadow-sm"
            >
              <span className="block font-bold text-xs text-slate-800 group-hover:text-emerald-700">जल जीवन मिशन</span>
              <span className="text-[11px] text-slate-500 block">हर घर नल योजना</span>
            </a>

            <a 
              href="https://deeg.rajasthan.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 text-center transition group shadow-sm col-span-2 sm:col-span-1"
            >
              <span className="block font-bold text-xs text-slate-800 group-hover:text-emerald-700">जिला डीग पोर्टल</span>
              <span className="text-[11px] text-slate-500 block">कलेक्ट्रेट सूचना</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
