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
  ArrowRight,
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
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocs = DOCUMENTS.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <Meta title="Hutech Documents | Hutech Solutions" description="Access official Hutech Solutions corporate documents, reports, and whitepapers." />
      <Breadcrumbs variant="light" />
      
      <section className="bg-[#001A3D] text-white h-[350px] relative overflow-hidden flex items-center">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10 w-full text-center md:text-left">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <span className="block w-8 h-[2px] bg-[#FFAF2B]"></span>
              <span className="text-[#FFAF2B] text-xs font-semibold tracking-widest uppercase">Resource Library</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-semibold display-font leading-tight">
              Hutech <span className="text-[#FFAF2B]">Documents.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed font-medium mx-auto md:mx-0">
              Access official publications, corporate reports, and technical whitepapers curated by our engineering teams.
            </p>
          </Motion.div>
        </div>
        <div className="absolute right-0 bottom-0 w-1/3 h-full bg-[#FFAF2B]/5 -skew-x-12 translate-x-1/2"></div>
      </section>

      <section className="py-20 bg-gray-50/50">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 w-full md:w-auto">
               <div className="relative flex-1 md:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search documents by title or category..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-[#0171c1] focus:ring-1 focus:ring-[#0171c1] transition-all"
                  />
               </div>
               <button className="p-3.5 bg-gray-50 border border-gray-100 rounded-xl text-gray-500 hover:bg-white hover:border-[#0171c1] hover:text-[#0171c1] transition-all">
                  <Filter size={18} />
               </button>
            </div>

            <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
              <button 
                onClick={() => setViewMode("list")}
                className={`px-5 py-2.5 rounded-lg transition-all flex items-center gap-2 text-[10px] font-black tracking-widest ${viewMode === "list" ? "bg-[#001A3D] text-white shadow-lg" : "text-gray-400 hover:text-[#001A3D]"}`}
              >
                <List size={14} /> LIST VIEW
              </button>
              <button 
                onClick={() => setViewMode("card")}
                className={`px-5 py-2.5 rounded-lg transition-all flex items-center gap-2 text-[10px] font-black tracking-widest ${viewMode === "card" ? "bg-[#001A3D] text-white shadow-lg" : "text-gray-400 hover:text-[#001A3D]"}`}
              >
                <LayoutGrid size={14} /> CARD VIEW
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {filteredDocs.length > 0 ? (
              viewMode === "list" ? (
                <Motion.div 
                  key="list-view"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {filteredDocs.map((doc, i) => (
                    <div 
                      key={doc.id}
                      className="group flex flex-col md:flex-row items-start md:items-center justify-between p-8 bg-white border border-gray-100 hover:border-[#0171c1] hover:shadow-2xl hover:shadow-gray-100 transition-all duration-300 rounded-2xl gap-8"
                    >
                      <div className="flex items-center gap-8 flex-1">
                        <div className="p-5 bg-gray-50 rounded-2xl group-hover:bg-[#0171c1]/10 transition-colors">
                          {doc.icon}
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] font-black text-[#FFAF2B] uppercase tracking-[0.2em]">{doc.category}</span>
                          <h3 className="text-xl md:text-2xl font-semibold text-[#001A3D] display-font group-hover:text-[#0171c1] transition-colors">{doc.title}</h3>
                          <div className="flex flex-wrap items-center gap-4 text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                            <span className="flex items-center gap-2"><Calendar size={14} className="text-[#0171c1]" /> {doc.date}</span>
                            <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
                            <span>{doc.size}</span>
                            <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
                            <span className="text-[#0171c1]">{doc.type}</span>
                          </div>
                        </div>
                      </div>
                      <button className="w-full md:w-auto flex items-center justify-center gap-3 bg-gray-50 group-hover:bg-[#001A3D] text-[#001A3D] group-hover:text-white px-10 py-5 rounded-xl font-black text-[11px] tracking-[0.2em] transition-all shadow-sm hover:shadow-xl">
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
                  {filteredDocs.map((doc, i) => (
                    <div 
                      key={doc.id}
                      className="group bg-white p-10 border border-gray-100 hover:border-[#0171c1] hover:shadow-2xl hover:shadow-gray-100 transition-all duration-500 rounded-[2.5rem] flex flex-col justify-between"
                    >
                      <div className="space-y-10">
                         <div className="flex justify-between items-start">
                            <div className="p-6 bg-gray-50 rounded-2xl group-hover:bg-[#0171c1]/10 transition-colors">
                              {doc.icon}
                            </div>
                            <span className="text-[10px] font-black text-[#FFAF2B] bg-[#FFAF2B]/5 px-4 py-1.5 rounded-full uppercase tracking-[0.15em] border border-[#FFAF2B]/10">
                              {doc.category}
                            </span>
                         </div>
                         <div className="space-y-4">
                            <h3 className="text-2xl font-semibold text-[#001A3D] display-font group-hover:text-[#0171c1] transition-colors leading-tight">
                              {doc.title}
                            </h3>
                            <div className="flex items-center gap-4 text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                              <span className="flex items-center gap-1.5"><Calendar size={12} /> {doc.date}</span>
                              <span className="w-1.5 h-1.5 bg-gray-100 rounded-full"></span>
                              <span>{doc.size}</span>
                            </div>
                         </div>
                      </div>
                      
                      <button className="mt-12 flex items-center justify-between w-full bg-gray-50 group-hover:bg-[#001A3D] group-hover:text-white p-6 rounded-2xl transition-all font-black text-[11px] tracking-[0.2em]">
                        GET DOCUMENT <Download size={18} className="text-[#FFAF2B]" />
                      </button>
                    </div>
                  ))}
                </Motion.div>
              )
            ) : (
              <Motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-center py-40"
              >
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-300">
                  <Search size={40} />
                </div>
                <h3 className="text-3xl font-semibold text-[#001A3D] display-font mb-4">No documents found</h3>
                <p className="text-gray-500 max-w-md mx-auto font-medium">Try adjusting your search query or filters to find the specific document you are looking for.</p>
                <button 
                  onClick={() => setSearchQuery("")}
                  className="mt-10 text-[#0171c1] font-black text-xs uppercase tracking-widest hover:underline"
                >
                  Clear search
                </button>
              </Motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-32 bg-gray-50 border-t border-gray-100">
         <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
            <div className="bg-[#001A3D] p-16 md:p-24 rounded-[4rem] relative overflow-hidden shadow-2xl">
               <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
                  <div className="space-y-8 text-center lg:text-left">
                     <h2 className="text-4xl md:text-6xl font-semibold text-white display-font tracking-tight leading-tight">Need custom <br /> documentation?</h2>
                     <p className="text-gray-400 text-xl max-w-xl font-medium leading-relaxed">
                        Our specialized engineering teams can provide tailored technical whitepapers, architectural blueprints, and compliance documentation for your enterprise infrastructure.
                     </p>
                  </div>
                  <button className="bg-[#FFAF2B] hover:bg-white text-[#001A3D] px-14 py-6 rounded-xl font-black text-xs tracking-[0.2em] transition-all shadow-2xl shadow-[#FFAF2B]/20 whitespace-nowrap group">
                     REQUEST ACCESS <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
               {/* Decorative Background */}
               <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-white/5 to-transparent skew-x-12 translate-x-1/4"></div>
               <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#0171c1]/20 rounded-full blur-[100px]"></div>
            </div>
         </div>
      </section>
    </div>
  );
}
