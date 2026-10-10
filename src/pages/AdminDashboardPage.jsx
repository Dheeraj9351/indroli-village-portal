import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  MessageSquareCheck, 
  Bell, 
  Image as ImageIcon, 
  Plus, 
  RefreshCw, 
  X,
  Lock,
  LogOut,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Lightbulb,
  Loader2
} from 'lucide-react';
import { projectsData } from '../data/projectsData';
import { announcementsData } from '../data/announcementsData';

export default function AdminDashboardPage() {
  // Authentication State
  const [token, setToken] = useState(() => {
    return sessionStorage.getItem('indroli_admin_token') || '';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Dashboard Tab state: 'complaints' | 'projects' | 'announcements'
  const [activeTab, setActiveTab] = useState('complaints');

  // Complaints & Suggestions Data State
  const [records, setRecords] = useState([]);
  const [recordsLoading, setRecordsLoading] = useState(false);
  const [recordsError, setRecordsError] = useState('');

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'complaint' | 'suggestion'
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'प्राप्त' | 'जाँच में' | 'प्रगति पर' | 'पूर्ण'

  // Other mock admin tabs data
  const [projectsList, setProjectsList] = useState(projectsData);
  const [announcementsList] = useState(announcementsData);

  // Status edit modal
  const [editingRecord, setEditingRecord] = useState(null);
  const [editStatus, setEditStatus] = useState('प्राप्त');
  const [editActionNote, setEditActionNote] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState('');

  // Photo preview modal
  const [previewPhoto, setPreviewPhoto] = useState(null);

  // New Project Modal
  const [newProjectModal, setNewProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({
    titleHi: '',
    category: 'सड़क एवं नाली',
    locationHi: '',
    status: 'प्रस्तावित',
    progress: 10
  });

  // Fetch verified records from backend API
  const fetchRecords = async (authToken) => {
    const activeToken = authToken || token;
    if (!activeToken) return;

    setRecordsLoading(true);
    setRecordsError('');
    try {
      const res = await fetch('/api/admin/records', {
        headers: {
          'Authorization': `Bearer ${activeToken}`
        }
      });

      if (res.status === 401) {
        sessionStorage.removeItem('indroli_admin_token');
        setToken('');
        setAuthError('सत्र समाप्त हो गया है। कृपया पुनः पासवर्ड दर्ज करें।');
        return;
      }

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'रिकॉर्ड्स लोड करने में विफल।');
      }

      setRecords(data.records || []);
    } catch (err) {
      console.error('Fetch records error:', err);
      setRecordsError(err.message || 'सर्वर से कनेक्ट करने में त्रुटि।');
    } finally {
      setRecordsLoading(false);
    }
  };

  // Synchronize records when token is present
  useEffect(() => {
    let isCancelled = false;
    if (token) {
      const loadInitial = async () => {
        try {
          const res = await fetch('/api/admin/records', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.status === 401) {
            if (!isCancelled) {
              sessionStorage.removeItem('indroli_admin_token');
              setToken('');
              setAuthError('सत्र समाप्त हो गया है। कृपया पुनः पासवर्ड दर्ज करें।');
            }
            return;
          }
          const data = await res.json();
          if (!isCancelled && data.success) {
            setRecords(data.records || []);
          }
        } catch (err) {
          if (!isCancelled) setRecordsError(err.message || 'सर्वर से कनेक्ट करने में त्रुटि।');
        }
      };
      loadInitial();
    }
    return () => {
      isCancelled = true;
    };
  }, [token]);

  // Handle Admin Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    if (!passwordInput) return;

    setAuthLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      });
      const data = await res.json();

      if (!res.ok || !data.success || !data.token) {
        throw new Error(data.error || 'अमान्य पासवर्ड! कृपया सही व्यवस्थापक पासवर्ड दर्ज करें।');
      }

      sessionStorage.setItem('indroli_admin_token', data.token);
      setToken(data.token);
      setPasswordInput('');
    } catch (err) {
      console.error('Admin login error:', err);
      setAuthError(err.message || 'प्रमाणीकरण विफल।');
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Admin Logout
  const handleLogout = () => {
    sessionStorage.removeItem('indroli_admin_token');
    setToken('');
    setRecords([]);
  };

  // Handle Status Update Submission
  const handleUpdateStatus = async () => {
    if (!editingRecord) return;
    setUpdateLoading(true);
    setUpdateError('');

    try {
      const res = await fetch('/api/admin/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ticketId: editingRecord.ticketId,
          status: editStatus,
          actionNote: editActionNote
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'स्थिति अद्यतन विफल।');
      }

      // Update local state smoothly
      setRecords(prev => prev.map(r => {
        if (r.ticketId === editingRecord.ticketId) {
          return {
            ...r,
            status: editStatus,
            actionNote: editActionNote || r.actionNote
          };
        }
        return r;
      }));

      setEditingRecord(null);
    } catch (err) {
      console.error('Update status error:', err);
      setUpdateError(err.message || 'स्थिति सहेजने में विफल।');
    } finally {
      setUpdateLoading(false);
    }
  };

  // Filtered records calculation
  const filteredRecords = records.filter(r => {
    const matchesSearch = 
      (r.ticketId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.citizenName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.mobile || '').includes(searchQuery) ||
      (r.location || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.category || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === 'all' || r.recordType === filterType;
    const matchesStatus = filterStatus === 'all' || r.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  // KPI Metrics Calculation
  const totalComplaints = records.filter(r => r.recordType === 'complaint').length;
  const totalSuggestions = records.filter(r => r.recordType === 'suggestion').length;
  const pendingCount = records.filter(r => r.status === 'प्राप्त' || r.status === 'जाँच में' || r.status === 'पंजीकृत (समीक्षाधीन)').length;
  const inProgressCount = records.filter(r => r.status === 'प्रगति पर' || r.status === 'प्रक्रियाधीन').length;
  const resolvedCount = records.filter(r => r.status === 'पूर्ण' || r.status === 'निस्तारित').length;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'पूर्ण':
      case 'निस्तारित':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'प्रगति पर':
      case 'प्रक्रियाधीन':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'जाँच में':
      case 'पंजीकृत (समीक्षाधीन)':
        return 'bg-sky-100 text-sky-800 border-sky-300';
      case 'प्राप्त':
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  // Handle Mock Project Creation
  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProject.titleHi) return;
    const created = {
      id: `PRJ-00${projectsList.length + 1}`,
      code: `IND-ADM-2026-0${projectsList.length + 1}`,
      titleHi: newProject.titleHi,
      titleEn: newProject.titleHi,
      category: newProject.category,
      categoryEn: newProject.category,
      locationHi: newProject.locationHi || 'ग्राम इन्द्रौली',
      locationEn: newProject.locationHi || 'Village Indroli',
      status: newProject.status,
      statusEn: newProject.status,
      approvedAmount: 'डेटा उपलब्ध नहीं है',
      expenditure: 'डेटा उपलब्ध नहीं है',
      startDate: 'अप्रैल 2026',
      expectedCompletion: 'अगस्त 2026',
      progress: Number(newProject.progress),
      department: 'ग्राम पंचायत प्रशासन',
      detailsHi: 'प्रशासनिक स्तर पर नई परियोजना प्रारूप दर्ज किया गया।'
    };
    setProjectsList([created, ...projectsList]);
    setNewProjectModal(false);
    setNewProject({ titleHi: '', category: 'सड़क एवं नाली', locationHi: '', status: 'प्रस्तावित', progress: 10 });
  };

  // ============================================================================
  // 1. RENDER AUTHENTICATION SCREEN IF NOT LOGGED IN
  // ============================================================================
  if (!token) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 sm:py-24 animate-in fade-in">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-slate-900">
              ग्राम पंचायत इन्द्रौली
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              प्रशासनिक नियंत्रण कक्ष • व्यवस्थापक प्रमाणीकरण
            </p>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
            <span>
              नागरिक गोपनीयता सुरक्षा: यह पृष्ठ अधिकृत ग्राम प्रशासक / VDO हेतु पासवर्ड संरक्षित है।
            </span>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 rounded-xl border border-red-300 text-red-700 text-xs flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                व्यवस्थापक पासवर्ड (Admin Password)
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="पासवर्ड दर्ज करें..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <p className="text-[11px] text-slate-400">
                (डिफ़ॉल्ट विकास पासवर्ड: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-600">Indroli@Admin2026</code>)
              </p>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 bg-emerald-800 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold text-sm rounded-xl transition cursor-pointer flex items-center justify-center gap-2 shadow-md"
            >
              {authLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>सत्यापित किया जा रहा है...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>डैशबोर्ड में प्रवेश करें (Login)</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ============================================================================
  // 2. RENDER AUTHENTICATED ADMIN DASHBOARD
  // ============================================================================
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden border border-slate-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 text-emerald-300 text-xs font-semibold border border-emerald-700/50">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>प्रशासनिक नियंत्रण कक्ष • अधिकृत सत्र सक्रिय</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              ग्राम पंचायत इन्द्रौली : एडमिन प्रबंधन डैशबोर्ड
            </h1>
            <p className="text-xs text-slate-300">
              पोर्टल पर प्राप्त जन-शिकायतों, नागरिक विकास सुझावों, स्थिति अद्यतन एवं विकास योजनाओं का केंद्रीय प्रबंधन।
            </p>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              onClick={() => fetchRecords(token)}
              disabled={recordsLoading}
              className="px-3.5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition cursor-pointer border border-slate-600"
              title="डेटा रिफ्रेश करें"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${recordsLoading ? 'animate-spin' : ''}`} />
              <span>रिफ्रेश</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-red-950 hover:bg-red-900 text-red-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border border-red-800"
              title="सुरक्षित लॉगआउट"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>लॉगआउट</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. KPI Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start text-emerald-700">
            <span className="text-[11px] font-bold text-slate-500 uppercase">कुल प्रविष्टियां</span>
            <MessageSquareCheck className="w-4 h-4" />
          </div>
          <span className="text-2xl font-black text-slate-900 mt-2 block">{records.length}</span>
          <span className="text-[11px] text-slate-500">डेटाबेस रिकॉर्ड्स</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start text-red-600">
            <span className="text-[11px] font-bold text-slate-500 uppercase">शिकायतें</span>
            <AlertCircle className="w-4 h-4" />
          </div>
          <span className="text-2xl font-black text-slate-900 mt-2 block">{totalComplaints}</span>
          <span className="text-[11px] text-red-600 font-semibold">नागरिक समस्याएं</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start text-amber-600">
            <span className="text-[11px] font-bold text-slate-500 uppercase">विकास सुझाव</span>
            <Lightbulb className="w-4 h-4" />
          </div>
          <span className="text-2xl font-black text-slate-900 mt-2 block">{totalSuggestions}</span>
          <span className="text-[11px] text-amber-600 font-semibold">नवाचार प्रस्ताव</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start text-sky-600">
            <span className="text-[11px] font-bold text-slate-500 uppercase">समीक्षाधीन (लंबित)</span>
            <Clock className="w-4 h-4" />
          </div>
          <span className="text-2xl font-black text-slate-900 mt-2 block">{pendingCount}</span>
          <span className="text-[11px] text-sky-600 font-semibold">प्राप्त / जाँच में</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start text-amber-600">
            <span className="text-[11px] font-bold text-slate-500 uppercase">प्रगति पर</span>
            <RefreshCw className="w-4 h-4" />
          </div>
          <span className="text-2xl font-black text-slate-900 mt-2 block">{inProgressCount}</span>
          <span className="text-[11px] text-amber-600 font-semibold">फील्ड स्तर पर कार्य</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start text-emerald-600">
            <span className="text-[11px] font-bold text-slate-500 uppercase">पूर्ण समाधान</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-2xl font-black text-slate-900 mt-2 block">{resolvedCount}</span>
          <span className="text-[11px] text-emerald-600 font-semibold">सत्यापित निस्तारित</span>
        </div>
      </div>

      {/* 3. Main Navigation Tab Switcher */}
      <div className="flex border-b border-slate-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('complaints')}
          className={`py-3 px-5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'complaints'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <MessageSquareCheck className="w-4 h-4" />
          <span>शिकायतें एवं सुझाव प्रबंधन ({records.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`py-3 px-5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'projects'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>विकास परियोजनाएं ({projectsList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('announcements')}
          className={`py-3 px-5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'announcements'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>सूचना पट्ट प्रबंधन ({announcementsList.length})</span>
        </button>
      </div>

      {/* 4. TAB 1: COMPLAINTS & SUGGESTIONS MANAGEMENT */}
      {activeTab === 'complaints' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                नागरिक शिकायतों एवं सुझावों की सूची
              </h2>
              <p className="text-xs text-slate-500">
                डेटाबेस में सुरक्षित प्रविष्टियों की समीक्षा करें एवं स्थिति 'प्राप्त', 'जाँच में', 'प्रगति पर' अथवा 'पूर्ण' में अद्यतन करें।
              </p>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="टोकन, नाम, मोबाइल या स्थान से खोजें..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="all">सभी प्रकार (प्रकार: All)</option>
                <option value="complaint">केवल शिकायतें (Complaints)</option>
                <option value="suggestion">केवल विकास सुझाव (Suggestions)</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="all">समस्त स्थितियां (स्थिति: All)</option>
                <option value="प्राप्त">1. प्राप्त (Received)</option>
                <option value="जाँच में">2. जाँच में (Under Review)</option>
                <option value="प्रगति पर">3. प्रगति पर (In Progress)</option>
                <option value="पूर्ण">4. पूर्ण (Resolved / Completed)</option>
              </select>
            </div>
          </div>

          {recordsError && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-300">
              {recordsError}
            </div>
          )}

          {/* Table View */}
          <div className="overflow-x-auto">
            {recordsLoading ? (
              <div className="py-12 text-center text-slate-500 text-xs space-y-2">
                <Loader2 className="w-6 h-6 animate-spin mx-auto text-emerald-700" />
                <span>रिकॉर्ड्स लोड हो रहे हैं...</span>
              </div>
            ) : filteredRecords.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                कोई रिकॉर्ड नहीं मिला।
              </div>
            ) : (
              <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[11px]">
                  <tr>
                    <th className="p-3">टोकन ID</th>
                    <th className="p-3">प्रकार</th>
                    <th className="p-3">नागरिक विवरण</th>
                    <th className="p-3">श्रेणी व स्थान</th>
                    <th className="p-3">पंजीकरण दिनांक</th>
                    <th className="p-3">वर्तमान स्थिति</th>
                    <th className="p-3">प्रशासनिक टिप्पणी</th>
                    <th className="p-3">कार्रवाई</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredRecords.map((r) => (
                    <tr key={r.ticketId} className="hover:bg-slate-50/80 transition">
                      <td className="p-3 font-mono font-bold text-slate-800 whitespace-nowrap">
                        {r.ticketId}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          r.recordType === 'suggestion' 
                            ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                            : 'bg-slate-100 text-slate-700 border border-slate-300'
                        }`}>
                          {r.recordType === 'suggestion' ? 'सुझाव' : 'शिकायत'}
                        </span>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="font-semibold text-slate-900">{r.citizenName}</div>
                        <div className="text-[11px] text-slate-500 font-mono">📱 {r.mobile}</div>
                      </td>
                      <td className="p-3">
                        <div className="font-medium text-slate-900">{r.category}</div>
                        <div className="text-[11px] text-slate-500 truncate max-w-xs">{r.location}</div>
                      </td>
                      <td className="p-3 text-slate-600 whitespace-nowrap">
                        {r.submittedAt}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadge(r.status)}`}>
                          ● {r.status}
                        </span>
                      </td>
                      <td className="p-3 text-slate-600 max-w-xs truncate" title={r.actionNote}>
                        {r.actionNote || '-'}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          {r.photoUrl && (
                            <button
                              onClick={() => setPreviewPhoto(r.photoUrl)}
                              className="p-1.5 text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition"
                              title="फ़ोटो देखें"
                            >
                              <ImageIcon className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setEditingRecord(r);
                              setEditStatus(r.status === 'निस्तारित' ? 'पूर्ण' : r.status === 'प्रक्रियाधीन' ? 'प्रगति पर' : r.status === 'पंजीकृत (समीक्षाधीन)' ? 'जाँच में' : r.status || 'प्राप्त');
                              setEditActionNote(r.actionNote || '');
                              setUpdateError('');
                            }}
                            className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-lg text-xs transition cursor-pointer border border-emerald-200"
                          >
                            अद्यतन
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* 5. TAB 2: PROJECTS MANAGEMENT */}
      {activeTab === 'projects' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                विकास परियोजनाओं का प्रबंधन
              </h2>
              <p className="text-xs text-slate-500">
                नई परियोजनाएं जोड़ें एवं भौतिक प्रगति प्रतिशत अद्यतन करें।
              </p>
            </div>
            <button
              onClick={() => setNewProjectModal(true)}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>नई परियोजना जोड़ें (Add Project)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectsList.map((p) => (
              <div key={p.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-slate-500 text-[10px]">{p.code}</span>
                  <span className="font-bold text-emerald-800">{p.status}</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900">{p.titleHi}</h3>
                <p className="text-slate-600">स्थान: {p.locationHi}</p>
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between font-semibold">
                    <span>प्रगति: {p.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${p.progress}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. TAB 3: ANNOUNCEMENTS MANAGEMENT */}
      {activeTab === 'announcements' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">
              सूचना पट्ट प्रबंधन (Notice Board)
            </h2>
            <p className="text-xs text-slate-500">
              गाँव के सूचना पट्ट पर सक्रिय सभी आधिकारिक सूचनाएं।
            </p>
          </div>

          <div className="space-y-3">
            {announcementsList.map((not) => (
              <div key={not.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-start text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-800">{not.category}</span>
                    <span className="text-slate-400">• {not.date}</span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 mt-1">{not.titleHi}</h3>
                  <p className="text-slate-600 mt-0.5">{not.summaryHi}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] shrink-0 border border-emerald-300">
                  सक्रिय
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* MODAL: UPDATE COMPLAINT / SUGGESTION STATUS */}
      {/* ====================================================================== */}
      {editingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-500">{editingRecord.ticketId}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {editingRecord.recordType === 'suggestion' ? 'सुझाव' : 'शिकायत'}
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900 mt-1">{editingRecord.category}</h3>
                <p className="text-xs text-slate-500">{editingRecord.citizenName} • {editingRecord.location}</p>
              </div>
              <button 
                onClick={() => setEditingRecord(null)} 
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description view */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
              <span className="font-bold block text-slate-900 mb-0.5">नागरिक विवरण:</span>
              <p className="leading-relaxed">{editingRecord.description}</p>
            </div>

            {updateError && (
              <div className="p-2.5 bg-red-50 text-red-700 text-xs rounded-xl border border-red-300">
                {updateError}
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1 uppercase tracking-wider text-[11px]">
                  नई स्थिति चयन करें (Update Status): <span className="text-red-500">*</span>
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="प्राप्त">1. प्राप्त (Received)</option>
                  <option value="जाँच में">2. जाँच में (Under Review / Inspection)</option>
                  <option value="प्रगति पर">3. प्रगति पर (In Progress / Action Initiated)</option>
                  <option value="पूर्ण">4. पूर्ण (Completed / Resolved)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1 uppercase tracking-wider text-[11px]">
                  प्रशासनिक कार्रवाई / समाधान टिप्पणी (Action Note):
                </label>
                <textarea
                  rows={3}
                  value={editActionNote}
                  onChange={(e) => setEditActionNote(e.target.value)}
                  placeholder="उदा. स्थल निरीक्षण पूर्ण हुआ, संबंधित विभाग/तकनीशियन को समाधान हेतु निर्देशित किया गया..."
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingRecord(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-slate-700 cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="button"
                  disabled={updateLoading}
                  onClick={handleUpdateStatus}
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-700 disabled:bg-slate-400 text-white rounded-xl font-bold cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  {updateLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>डेटाबेस में सहेजें (Save)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHOTO PREVIEW MODAL */}
      {previewPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-xs text-slate-700">स्थल फ़ोटो पूर्वावलोकन</span>
              <button onClick={() => setPreviewPhoto(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <img src={previewPhoto} alt="Site" className="w-full max-h-[70vh] object-contain rounded-2xl bg-black" />
          </div>
        </div>
      )}

      {/* MODAL: ADD NEW DEMO PROJECT */}
      {newProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">नई विकास परियोजना जोड़ें</h3>
              <button onClick={() => setNewProjectModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">परियोजना शीर्षक:</label>
                <input
                  type="text"
                  required
                  value={newProject.titleHi}
                  onChange={(e) => setNewProject({ ...newProject, titleHi: e.target.value })}
                  placeholder="उदा. पश्चिमी मोहल्ला पेवर ब्लॉक सड़क"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">श्रेणी:</label>
                <select
                  value={newProject.category}
                  onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                >
                  <option value="सड़क एवं नाली">सड़क एवं नाली</option>
                  <option value="स्ट्रीट लाइट">स्ट्रीट लाइट</option>
                  <option value="पेयजल">पेयजल</option>
                  <option value="शिक्षा">शिक्षा</option>
                  <option value="सफाई">सफाई</option>
                  <option value="पर्यावरण">पर्यावरण</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">स्थान:</label>
                <input
                  type="text"
                  value={newProject.locationHi}
                  onChange={(e) => setNewProject({ ...newProject, locationHi: e.target.value })}
                  placeholder="उदा. वार्ड नं. 2, इन्द्रौली"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">स्थिति:</label>
                <select
                  value={newProject.status}
                  onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                >
                  <option value="प्रस्तावित कार्य">प्रस्तावित कार्य</option>
                  <option value="स्वीकृत कार्य">स्वीकृत कार्य</option>
                  <option value="कार्य प्रगति पर">कार्य प्रगति पर</option>
                  <option value="पूर्ण कार्य">पूर्ण कार्य</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewProjectModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-slate-700 cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl font-bold cursor-pointer shadow-sm"
                >
                  जोड़ें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
