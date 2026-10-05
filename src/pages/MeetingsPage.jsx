import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  FileText, 
  Download, 
  CheckCircle2, 
  Users, 
  ShieldAlert
} from 'lucide-react';
import { meetingsData } from '../data/meetingsData';

export default function MeetingsPage({ lang }) {
  const isHi = lang === 'hi';
  const { notice, upcomingMeeting, pastMeetings } = meetingsData;
  const [activeTab, setActiveTab] = useState('upcoming');
  const [downloadAlert, setDownloadAlert] = useState(null);

  const handleDownloadDemo = (fileName) => {
    setDownloadAlert(`डाउनलोड प्रारंभ: "${fileName}" (नमूना प्रारूप - Demo Document)`);
    setTimeout(() => setDownloadAlert(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* 1. Header Banner with Clear DEMO DATA Badge */}
      <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{notice.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isHi ? 'मासिक ग्राम पंचायत बैठकें एवं कार्यवृत्त' : 'Monthly Gram Panchayat Meetings & Minutes'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-800/60 p-3 rounded-lg border border-slate-700">
            ⚠️ {isHi ? notice.disclaimerHi : notice.disclaimerEn}
          </p>
        </div>
      </div>

      {/* Simulated Download Notification */}
      {downloadAlert && (
        <div className="bg-emerald-100 border border-emerald-400 text-emerald-900 text-xs px-4 py-3 rounded-lg flex items-center justify-between shadow-sm animate-in fade-in">
          <span>✓ {downloadAlert}</span>
          <button onClick={() => setDownloadAlert(null)} className="font-bold text-emerald-900 text-sm">×</button>
        </div>
      )}

      {/* Tab Switcher: Upcoming Meeting vs Past Meeting Records */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`py-3 px-6 text-sm font-bold border-b-2 transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'upcoming'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{isHi ? 'आगामी बैठक (Upcoming)' : 'Upcoming Meeting'}</span>
        </button>

        <button
          onClick={() => setActiveTab('past')}
          className={`py-3 px-6 text-sm font-bold border-b-2 transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'past'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{isHi ? 'विगत बैठक रिकॉर्ड्स एवं निर्णय (Past Records)' : 'Past Records & Decisions'}</span>
        </button>
      </div>

      {/* 2. UPCOMING MEETING VIEW */}
      {activeTab === 'upcoming' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                {isHi ? 'आधिकारिक कार्यसूची एवं बैठक सूचना' : 'Official Notice & Agenda'}
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                {isHi ? upcomingMeeting.titleHi : upcomingMeeting.titleEn}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {isHi ? 'अध्यक्षता:' : 'Chaired by:'} <strong>{isHi ? upcomingMeeting.presidedByHi : upcomingMeeting.presidedByEn}</strong>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => handleDownloadDemo("बैठक_एजेंडा_अप्रैल_2026.pdf")}
                className="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{isHi ? 'एजेंडा कॉपी डाउनलोड' : 'Download Agenda PDF'}</span>
              </button>
            </div>
          </div>

          {/* Meeting Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <Calendar className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold text-slate-400 block uppercase">{isHi ? 'दिनांक' : 'Date'}</span>
                <span className="text-sm font-bold text-slate-900">{isHi ? upcomingMeeting.dateHi : upcomingMeeting.dateEn}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold text-slate-400 block uppercase">{isHi ? 'समय' : 'Time'}</span>
                <span className="text-sm font-bold text-slate-900">{isHi ? upcomingMeeting.timeHi : upcomingMeeting.timeEn}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold text-slate-400 block uppercase">{isHi ? 'स्थान / सभागार' : 'Venue'}</span>
                <span className="text-sm font-bold text-slate-900">{isHi ? upcomingMeeting.venueHi : upcomingMeeting.venueEn}</span>
              </div>
            </div>
          </div>

          {/* Quorum and Invite Notice */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <Users className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">{isHi ? 'भागीदारी सूचना:' : 'Participation Note:'}</span>
              <p className="mt-0.5">{isHi ? upcomingMeeting.quorumRequirement : upcomingMeeting.quorumRequirementEn}</p>
            </div>
          </div>

          {/* Detailed Agenda Items */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              {isHi ? 'विचारणीय कार्यसूची (Agenda Points for Deliberation)' : 'Scheduled Agenda Items'}
            </h3>

            <div className="space-y-3">
              {upcomingMeeting.agendaItems.map((item) => (
                <div key={item.num} className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-emerald-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {item.num}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {item.focus}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-900 mt-1">
                      {isHi ? item.titleHi : item.titleEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. PAST MEETING RECORDS & ACTION ITEMS */}
      {activeTab === 'past' && (
        <div className="space-y-8">
          {pastMeetings.map((meet) => (
            <div key={meet.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
                      {meet.dateHi}
                    </span>
                    <span className="text-xs text-slate-500">
                      उपस्थिति: <strong>{meet.attendeesCount} नागरिक एवं प्रतिनिधि</strong>
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    {isHi ? meet.titleHi : meet.titleEn}
                  </h3>
                </div>

                <button
                  onClick={() => handleDownloadDemo(meet.minutesDoc)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>{isHi ? 'हस्ताक्षरित कार्यवृत्त देखें' : 'View Signed Minutes'}</span>
                </button>
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <strong>{isHi ? 'बैठक सारांश:' : 'Meeting Summary:'}</strong> {isHi ? meet.summaryHi : meet.summaryEn}
              </p>

              {/* Decisions Taken */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {isHi ? 'मुख्य निर्णय (Decisions Taken):' : 'Key Resolutions Passed:'}
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {(isHi ? meet.decisionsTaken : meet.decisionsTakenEn).map((dec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{dec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Items Table */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {isHi ? 'क्रियान्वयन एवं दायित्व सूची (Action Items Tracking):' : 'Action Items & Accountability:'}
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                    <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[11px]">
                      <tr>
                        <th className="p-3">कार्य विवरण (Task)</th>
                        <th className="p-3">जिम्मेदार विभाग / व्यक्ति</th>
                        <th className="p-3">स्थिति (Status)</th>
                        <th className="p-3">नियत तिथि</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {meet.actionItems.map((act, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="p-3 font-medium text-slate-900">{isHi ? act.taskHi : act.taskEn}</td>
                          <td className="p-3 text-slate-600">{isHi ? act.responsiblePersonHi : act.responsiblePersonEn}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              act.statusHi === 'पूर्ण' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {isHi ? act.statusHi : act.statusEn}
                            </span>
                          </td>
                          <td className="p-3 text-slate-500">{act.dueDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
