"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { 
  FileText, 
  Download, 
  FileJson, 
  FileCode, 
  LayoutGrid, 
  List, 
  Calendar, 
  Search,
  Filter
} from "lucide-react";
import { Meta } from "@/components/Meta";

const DOCUMENTS = [
  {
    id: "gov-policy",
    title: "Corporate Governance Policy",
    type: "PDF",
    size: "2.4 MB",
    category: "Corporate",
    date: "Mar 14, 2026",
    icon: <FileText className="text-[#FFAF2B]" />
  },
  {
    id: "supply-chain-26",
    title: "Global Supply Chain Report 2026",
    type: "PDF",
    size: "15.8 MB",
    category: "Report",
    date: "Feb 28, 2026",
    icon: <FileText className="text-[#FFAF2B]" />
  },
  {
    id: "ai-framework",
    title: "AI & ML Framework Whitepaper",
    type: "PDF",
    size: "8.1 MB",
    category: "Technical",
    date: "Jan 15, 2026",
    icon: <FileCode className="text-[#FFAF2B]" />
  },
  {
    id: "brand-guidelines",
    title: "Hutech Solutions Brand Guidelines",
    type: "PDF",
    size: "12.4 MB",
    category: "Guidelines",
    date: "Dec 10, 2025",
    icon: <FileJson className="text-[#FFAF2B]" />
  },
  {
    id: "sustainability",
    title: "Sustainability ESG Report 2025",
    type: "PDF",
    size: "6.7 MB",
    category: "Report",
    date: "Nov 05, 2025",
    icon: <FileText className="text-[#FFAF2B]" />
  },
  {
    id: "security-compliance",
    title: "Security & Compliance Overview",
    type: "PDF",
    size: "3.2 MB",
    category: "Technical",
    date: "Oct 22, 2025",
    icon: <FileCode className="text-[#FFAF2B]" />
  }
];

export default function HutechDocuments() {
  const [viewMode, setViewMode] = useState<"list" | "card">("list");

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <Meta title="Hutech Documents | Hutech Solutions" description="Access official Hutech Solutions corporate documents, reports, and whitepapers." />
      <Breadcrumbs variant="light" />
      
      <section className="bg-[#001A3D] text-white h-[300px] relative overflow-hidden flex items-center">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10 w-full">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="block w-8 h-[2px] bg-[#FFAF2B]"></span>
              <span className="text-[#FFAF2B] text-xs font-semibold tracking-widest uppercase">Resource Library</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold display-font leading-tight">
              Hutech <span className="text-[#FFAF2B]">Documents.</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl leading-relaxed font-medium">
              Access official publications, corporate reports, and technical whitepapers.
            </p>
          </Motion.div>
        </div>
        <div className="absolute right-0 bottom-0 w-1/3 h-full bg-[#FFAF2B]/5 -skew-x-12 translate-x-1/2"></div>
      </section>

      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-4 w-full md:w-auto">
               <div className="relative flex-1 md:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search documents..." 
                    className="w-full bg-gray-50 border border-gray-100 rounded-sm py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-[#FFAF2B] transition-colors"
                  />
               </div>
               <button className="p-3 bg-gray-50 border border-gray-100 rounded-sm text-gray-500 hover:bg-white hover:border-[#FFAF2B] transition-all">
                  <Filter size={18} />
               </button>
            </div>

            <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg">
              <button 
                onClick={() => setViewMode("list")}
                className={`p-2.5 rounded-md transition-all flex items-center gap-2 text-xs font-bold tracking-wide ${viewMode === "list" ? "bg-[#001A3D] text-white shadow-lg" : "text-gray-400 hover:text-[#001A3D]"}`}
              >
                <List size={16} /> LIST VIEW
              </button>
              <button 
                onClick={() => setViewMode("card")}
                className={`p-2.5 rounded-md transition-all flex items-center gap-2 text-xs font-bold tracking-wide ${viewMode === "card" ? "bg-[#001A3D] text-white shadow-lg" : "text-gray-400 hover:text-[#001A3D]"}`}
              >
                <LayoutGrid size={16} /> CARD VIEW
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {viewMode === "list" ? (
              <Motion.div 
                key="list-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {DOCUMENTS.map((doc, i) => (
                  <div 
                    key={doc.id}
                    className="group flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-white border border-gray-100 hover:border-[#FFAF2B] hover:shadow-xl transition-all duration-300 rounded-xl gap-6"
                  >
                    <div className="flex items-center gap-6 flex-1">
                      <div className="p-4 bg-gray-50 rounded-xl group-hover:bg-[#FFAF2B]/10 transition-colors">
                        {doc.icon}
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-[#FFAF2B] uppercase tracking-widest">{doc.category}</span>
                        <h3 className="text-xl font-bold text-[#001A3D] display-font">{doc.title}</h3>
                        <div className="flex items-center gap-4 text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                          <span className="flex items-center gap-1.5"><Calendar size={12} className="text-[#FFAF2B]" /> {doc.date}</span>
                          <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                          <span>{doc.size}</span>
                          <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                          <span>{doc.type}</span>
                        </div>
                      </div>
                    </div>
                    <button className="w-full md:w-auto flex items-center justify-center gap-3 bg-gray-50 group-hover:bg-[#FFAF2B] text-[#001A3D] px-8 py-4 rounded-lg font-bold text-[11px] tracking-widest transition-all">
                      DOWNLOAD <Download size={16} />
                    </button>
                  </div>
                ))}
              </Motion.div>
            ) : (
              <Motion.div 
                key="card-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {DOCUMENTS.map((doc, i) => (
                  <div 
                    key={doc.id}
                    className="group bg-white p-8 border border-gray-100 hover:border-[#FFAF2B] hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] flex flex-col justify-between"
                  >
                    <div className="space-y-8">
                       <div className="flex justify-between items-start">
                          <div className="p-5 bg-gray-50 rounded-2xl group-hover:bg-[#FFAF2B]/10 transition-colors">
                            {doc.icon}
                          </div>
                          <span className="text-[10px] font-bold text-[#FFAF2B] bg-[#FFAF2B]/10 px-3 py-1 rounded-full uppercase tracking-widest">
                            {doc.category}
                          </span>
                       </div>
                       <div className="space-y-3">
                          <h3 className="text-2xl font-bold text-[#001A3D] display-font group-hover:text-[#FFAF2B] transition-colors">
                            {doc.title}
                          </h3>
                          <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                            <span className="flex items-center gap-1.5"><Calendar size={12} /> {doc.date}</span>
                            <span className="w-1.5 h-1.5 bg-gray-100 rounded-full"></span>
                            <span>{doc.size}</span>
                          </div>
                       </div>
                    </div>
                    
                    <button className="mt-12 flex items-center justify-between w-full bg-gray-50 group-hover:bg-[#001A3D] group-hover:text-white p-5 rounded-2xl transition-all font-bold text-xs tracking-widest">
                      GET DOCUMENT <Download size={18} className="text-[#FFAF2B]" />
                    </button>
                  </div>
                ))}
              </Motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-[#FAF9F6] border-t border-gray-100">
         <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
            <div className="bg-[#001A3D] p-12 md:p-16 rounded-[3rem] relative overflow-hidden">
               <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                  <div className="space-y-6 text-center lg:text-left">
                     <h2 className="text-3xl md:text-5xl font-semibold text-white display-font tracking-tight">Need custom documentation?</h2>
                     <p className="text-gray-400 text-lg max-w-xl font-medium">
                        Our specialized teams can provide tailored technical whitepapers and architecture documentation for your enterprise needs.
                     </p>
                  </div>
                  <button className="bg-[#FFAF2B] hover:bg-[#ff9d00] text-[#001A3D] px-12 py-5 rounded-sm font-bold text-xs tracking-widest transition-all shadow-xl shadow-[#FFAF2B]/20 whitespace-nowrap">
                     REQUEST ACCESS
                  </button>
               </div>
               <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-1/2"></div>
            </div>
         </div>
      </section>
    </div>
  );
}
