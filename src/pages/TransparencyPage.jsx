import React from 'react';
import { 
  Scale, 
  FileText, 
  AlertCircle 
} from 'lucide-react';
import { transparencyData } from '../data/transparencyData';

export default function TransparencyPage({ lang }) {
  const isHi = lang === 'hi';
  const { disclaimer, auditGuidelines, worksRecords } = transparencyData;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* 1. Header Banner with Strict Fiscal Sanctity Statement */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700 text-emerald-200 text-xs font-semibold">
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span>{isHi ? 'नागरिक अधिकार • शुचिता एवं जवाबदेही' : 'Citizen Rights • Fiscal Sanctity & Oversight'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isHi ? 'प्रशासनिक एवं वित्तीय पारदर्शिता पोर्टल' : 'Administrative & Fiscal Transparency'}
          </h1>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-xs sm:text-sm text-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{isHi ? disclaimer.titleHi : disclaimer.titleEn}</span>
            </div>
            <p className="leading-relaxed">
              {isHi ? disclaimer.contentHi : disclaimer.contentEn}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Audit Guidelines & Citizen Rights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {auditGuidelines.map((item, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 font-bold flex items-center justify-center text-xs">
              {idx + 1}
            </div>
            <h3 className="font-bold text-sm text-slate-900">
              {item.titleHi}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {item.descHi}
            </p>
          </div>
        ))}
      </div>

      {/* 3. Works and Transparency Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-700" />
              <span>{isHi ? 'स्वीकृत विकास कार्यों का पारदर्शी वित्तीय लेखा' : 'Statutory Record of Village Works'}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {isHi 
                ? 'स्वीकृत राशि, व्यय, एजेंसी एवं भौतिक सत्यापन रिपोर्ट का सार्वजनिक विवरण' 
                : 'Sanctioned funds, expenditure, executing agency, and physical inspection register'}
            </p>
          </div>
          <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
            {isHi ? 'सूचना का अधिकार (RTI 2005) के अनुरूप' : 'As per RTI 2005 Norms'}
          </span>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[11px]">
              <tr>
                <th className="p-3.5">कार्य कोड / विवरण (Work Details)</th>
                <th className="p-3.5">कार्यदायी एजेंसी</th>
                <th className="p-3.5">स्थिति (Status)</th>
                <th className="p-3.5">स्वीकृत राशि</th>
                <th className="p-3.5">व्यय राशि</th>
                <th className="p-3.5">पूर्णता / संभावित तिथि</th>
                <th className="p-3.5">अंकेक्षण स्थिति (Audit)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {worksRecords.map((rec) => (
                <tr key={rec.workCode} className="hover:bg-slate-50">
                  <td className="p-3.5">
                    <span className="font-bold text-slate-900 block">{isHi ? rec.titleHi : rec.titleEn}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">{rec.workCode}</span>
                  </td>
                  <td className="p-3.5 text-slate-600">{rec.agency}</td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      rec.status === 'पूर्ण' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {rec.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-700 font-medium">
                    {rec.approvedAmount}
                  </td>
                  <td className="p-3.5 text-slate-700 font-medium">
                    {rec.expenditure}
                  </td>
                  <td className="p-3.5 text-slate-600">
                    {rec.completionDate}
                  </td>
                  <td className="p-3.5">
                    <span className="text-[11px] text-emerald-800 font-semibold block">
                      ✓ {rec.auditStatus}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {rec.inspectionReport}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Note on Physical Inspection */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
          <p className="font-semibold text-slate-800">
            {isHi ? 'नागरिक अभिलेख निरीक्षण प्रक्रिया:' : 'Citizen Document Inspection Procedure:'}
          </p>
          <p>
            {isHi 
              ? 'ग्राम पंचायत इन्द्रौली का कोई भी निवासी कार्यालय दिवसों (सोमवार से शुक्रवार) में पंचायत सचिवालय में उपस्थित होकर ग्राम विकास अधिकारी अथवा कनिष्ठ सहायक की उपस्थिति में मस्टर रोल, माप पुस्तिका (MB) एवं कैश बुक का नियमानुसार अवलोकन कर सकता है।' 
              : 'Any citizen of Indroli may inspect the physical cash book, muster rolls, and MB registers at the Panchayat Secretariat during office hours.'}
          </p>
        </div>
      </div>
    </div>
  );
}
