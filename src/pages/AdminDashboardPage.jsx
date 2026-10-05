import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  MessageSquareCheck, 
  Calendar, 
  Bell, 
  Image as ImageIcon, 
  Plus, 
  RefreshCw, 
  X 
} from 'lucide-react';
import { initialComplaints } from '../data/complaintsData';
import { projectsData } from '../data/projectsData';
import { announcementsData } from '../data/announcementsData';
import { meetingsData } from '../data/meetingsData';
import { galleryItems } from '../data/galleryData';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('complaints'); // 'complaints' | 'projects' | 'announcements'
  
  // Complaints in state / localStorage
  const [complaints, setComplaints] = useState(() => {
    try {
      const saved = localStorage.getItem('indroli_complaints');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return initialComplaints;
  });
  const [projectsList, setProjectsList] = useState(projectsData);
  const [announcementsList] = useState(announcementsData);

  // Status edit modal for complaints
  const [editingComplaint, setEditingComplaint] = useState(null);
  const [adminNote, setAdminNote] = useState('');
  const [complaintStatus, setComplaintStatus] = useState('प्रक्रियाधीन');

  // New Project Modal
  const [newProjectModal, setNewProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({
    titleHi: '',
    category: 'सड़क एवं नाली',
    locationHi: '',
    status: 'प्रस्तावित',
    progress: 10
  });

  const handleUpdateComplaint = () => {
    if (!editingComplaint) return;
    const updated = complaints.map(c => {
      if (c.ticketId === editingComplaint.ticketId) {
        return {
          ...c,
          status: complaintStatus,
          actionNote: adminNote || c.actionNote
        };
      }
      return c;
    });
    setComplaints(updated);
    localStorage.setItem('indroli_complaints', JSON.stringify(updated));
    setEditingComplaint(null);
  };

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

  const handleResetData = () => {
    if (window.confirm('क्या आप डेमो डेटा को रीसेट करना चाहते हैं?')) {
      localStorage.setItem('indroli_complaints', JSON.stringify(initialComplaints));
      setComplaints(initialComplaints);
      setProjectsList(projectsData);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden border border-slate-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-700 text-amber-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>प्रशासनिक नियंत्रण कक्ष (Admin Demo Portal)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              ग्राम पंचायत इन्द्रौली : एडमिन प्रबंधन डैशबोर्ड
            </h1>
            <p className="text-xs text-slate-300">
              भविष्य के पंचायत प्रशासक / VDO हेतु विकास योजनाओं, जन-शिकायतों, बैठकों एवं सूचनाओं के प्रबंधन का फ्रंटएंड इंटरफेस।
            </p>
          </div>

          <button
            onClick={handleResetData}
            className="px-3.5 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>रीसेट डेमो डेटा</span>
          </button>
        </div>
      </div>

      {/* 2. KPI Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start text-emerald-700">
            <span className="text-xs font-bold text-slate-500 uppercase">कुल परियोजनाएं</span>
            <Layers className="w-4 h-4" />
          </div>
          <span className="text-2xl font-bold text-slate-900 mt-2 block">{projectsList.length}</span>
          <span className="text-[11px] text-emerald-600">सक्रिय ट्रैकिंग</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start text-amber-600">
            <span className="text-xs font-bold text-slate-500 uppercase">प्राप्त शिकायतें</span>
            <MessageSquareCheck className="w-4 h-4" />
          </div>
          <span className="text-2xl font-bold text-slate-900 mt-2 block">{complaints.length}</span>
          <span className="text-[11px] text-amber-600">नागरिक निवारण</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start text-sky-600">
            <span className="text-xs font-bold text-slate-500 uppercase">बैठक रिकॉर्ड</span>
            <Calendar className="w-4 h-4" />
          </div>
          <span className="text-2xl font-bold text-slate-900 mt-2 block">{meetingsData.pastMeetings.length + 1}</span>
          <span className="text-[11px] text-sky-600">कार्यवृत्त दर्ज</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start text-purple-600">
            <span className="text-xs font-bold text-slate-500 uppercase">विज्ञप्तियां / सूचनाएं</span>
            <Bell className="w-4 h-4" />
          </div>
          <span className="text-2xl font-bold text-slate-900 mt-2 block">{announcementsList.length}</span>
          <span className="text-[11px] text-purple-600">प्रकाशित नोटिस</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm col-span-2 sm:col-span-1">
          <div className="flex justify-between items-start text-rose-600">
            <span className="text-xs font-bold text-slate-500 uppercase">गैलरी छायाचित्र</span>
            <ImageIcon className="w-4 h-4" />
          </div>
          <span className="text-2xl font-bold text-slate-900 mt-2 block">{galleryItems.length}</span>
          <span className="text-[11px] text-rose-600">स्थानिक अभिलेख</span>
        </div>
      </div>

      {/* 3. Tab Switcher */}
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
          <span>शिकायतें / सुझाव समीक्षा ({complaints.length})</span>
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

      {/* 4. TAB 1: COMPLAINTS MANAGEMENT */}
      {activeTab === 'complaints' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                नागरिक शिकायतों की सूची एवं स्थिति अद्यतन
              </h2>
              <p className="text-xs text-slate-500">
                पोर्टल पर दर्ज शिकायतों की समीक्षा करें एवं समाधान टिप्पणी दर्ज करें।
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[11px]">
                <tr>
                  <th className="p-3">टोकन ID</th>
                  <th className="p-3">नागरिक</th>
                  <th className="p-3">श्रेणी</th>
                  <th className="p-3">स्थान</th>
                  <th className="p-3">स्थिति</th>
                  <th className="p-3">प्रशासनिक टिप्पणी</th>
                  <th className="p-3">कार्रवाई</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {complaints.map((c) => (
                  <tr key={c.ticketId} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-800">{c.ticketId}</td>
                    <td className="p-3 font-medium text-slate-900">{c.citizenName}</td>
                    <td className="p-3 text-slate-600">{c.category}</td>
                    <td className="p-3 text-slate-600">{c.location}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        c.status.includes('निस्तारित') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600 max-w-xs truncate">{c.actionNote}</td>
                    <td className="p-3">
                      <button
                        onClick={() => {
                          setEditingComplaint(c);
                          setComplaintStatus(c.status);
                          setAdminNote(c.actionNote || '');
                        }}
                        className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold rounded text-xs transition cursor-pointer"
                      >
                        संपादित करें
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. TAB 2: PROJECTS MANAGEMENT */}
      {activeTab === 'projects' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                विकास परियोजनाओं का प्रबंधन
              </h2>
              <p className="text-xs text-slate-500">
                नई परियोजनाएं जोड़ें एवं प्रगति प्रतिशत अद्यतन करें।
              </p>
            </div>
            <button
              onClick={() => setNewProjectModal(true)}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>नई परियोजना जोड़ें (Add Project)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectsList.map((p) => (
              <div key={p.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
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
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">
              सूचनाएं एवं विज्ञप्तियां (Notice Board)
            </h2>
            <p className="text-xs text-slate-500">
              गाँव के सूचना पट्ट पर सक्रिय सभी आधिकारिक सूचनाएं।
            </p>
          </div>

          <div className="space-y-3">
            {announcementsList.map((not) => (
              <div key={not.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-start text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-800">{not.category}</span>
                    <span className="text-slate-400">• {not.date}</span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 mt-1">{not.titleHi}</h3>
                  <p className="text-slate-600 mt-0.5">{not.summaryHi}</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] shrink-0">
                  सक्रिय
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: EDIT COMPLAINT */}
      {editingComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400">{editingComplaint.ticketId}</span>
                <h3 className="font-bold text-base text-slate-900">{editingComplaint.category}</h3>
              </div>
              <button onClick={() => setEditingComplaint(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">स्थिति चयन करें (Status):</label>
                <select
                  value={complaintStatus}
                  onChange={(e) => setComplaintStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                >
                  <option value="पंजीकृत (समीक्षाधीन)">पंजीकृत (समीक्षाधीन)</option>
                  <option value="प्रक्रियाधीन (फील्ड निरीक्षण)">प्रक्रियाधीन (फील्ड निरीक्षण)</option>
                  <option value="निस्तारित (Resolved)">निस्तारित (Resolved)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">प्रशासनिक कार्रवाई / टिप्पणी:</label>
                <textarea
                  rows={3}
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="उदा. स्थल निरीक्षण पूर्ण हुआ, संबंधित विभाग को कार्य आदेश जारी..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setEditingComplaint(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold text-slate-700 cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  onClick={handleUpdateComplaint}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg font-bold cursor-pointer"
                >
                  सहेजें
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD NEW DEMO PROJECT */}
      {newProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
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
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">श्रेणी:</label>
                <select
                  value={newProject.category}
                  onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
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
                  placeholder="उदा. वार्ड नं. 2"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">स्थिति:</label>
                <select
                  value={newProject.status}
                  onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                >
                  <option value="प्रस्तावित">प्रस्तावित</option>
                  <option value="स्वीकृत">स्वीकृत</option>
                  <option value="कार्य प्रारंभ">कार्य प्रारंभ</option>
                  <option value="प्रगति पर">प्रगति पर</option>
                  <option value="पूर्ण">पूर्ण</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewProjectModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold text-slate-700 cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg font-bold cursor-pointer"
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
