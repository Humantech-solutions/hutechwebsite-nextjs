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
  Filter,
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
    icon: <FileText className="text-[#F99D1C]" />,
  },
  {
    id: "supply-chain-26",
    title: "Global Supply Chain Report 2026",
    type: "PDF",
    size: "15.8 MB",
    category: "Report",
    date: "Feb 28, 2026",
    icon: <FileText className="text-[#F99D1C]" />,
  },
  {
    id: "ai-framework",
    title: "AI & ML Framework Whitepaper",
    type: "PDF",
    size: "8.1 MB",
    category: "Technical",
    date: "Jan 15, 2026",
    icon: <FileCode className="text-[#F99D1C]" />,
  },
  {
    id: "brand-guidelines",
    title: "Hutech Solutions Brand Guidelines",
    type: "PDF",
    size: "12.4 MB",
    category: "Guidelines",
    date: "Dec 10, 2025",
    icon: <FileJson className="text-[#F99D1C]" />,
  },
  {
    id: "sustainability",
    title: "Sustainability ESG Report 2025",
    type: "PDF",
    size: "6.7 MB",
    category: "Report",
    date: "Nov 05, 2025",
    icon: <FileText className="text-[#F99D1C]" />,
  },
  {
    id: "security-compliance",
    title: "Security & Compliance Overview",
    type: "PDF",
    size: "3.2 MB",
    category: "Technical",
    date: "Oct 22, 2025",
    icon: <FileCode className="text-[#F99D1C]" />,
  },
];

export default function HutechDocuments() {
  const [viewMode, setViewMode] = useState<"list" | "card">("list");

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Meta
        title="Hutech Documents | Hutech Solutions"
        description="Access official Hutech Solutions corporate documents, reports, and whitepapers."
      />
      <Breadcrumbs variant="light" />

      <section className="relative flex h-[300px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-20">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="block h-[2px] w-8 bg-[#F99D1C]"></span>
              <span className="text-xs font-semibold tracking-widest text-[#F99D1C] uppercase">
                Resource Library
              </span>
            </div>
            <h1 className="display-font text-4xl leading-tight font-semibold md:text-6xl">
              Hutech <span className="text-[#F99D1C]">Documents.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-400">
              Access official publications, corporate reports, and technical whitepapers.
            </p>
          </Motion.div>
        </div>
        <div className="absolute right-0 bottom-0 h-full w-1/3 translate-x-1/2 -skew-x-12 bg-[#F99D1C]/5"></div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          {/* Controls */}
          <div className="mb-12 flex flex-col items-center justify-between gap-8 border-b border-gray-100 pb-8 md:flex-row">
            <div className="flex w-full items-center gap-4 md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search documents..."
                  className="w-full rounded-sm border border-gray-100 bg-gray-50 py-3 pr-4 pl-12 text-sm font-medium transition-colors focus:border-[#F99D1C] focus:outline-none"
                />
              </div>
              <button className="rounded-sm border border-gray-100 bg-gray-50 p-3 text-gray-500 transition-all hover:border-[#F99D1C] hover:bg-white">
                <Filter size={18} />
              </button>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-1">
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-2 rounded-md p-2.5 text-xs font-bold tracking-wide transition-all ${viewMode === "list" ? "bg-[#001A3D] text-white shadow-lg" : "text-gray-400 hover:text-[#001A3D]"}`}
              >
                <List size={16} /> LIST VIEW
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`flex items-center gap-2 rounded-md p-2.5 text-xs font-bold tracking-wide transition-all ${viewMode === "card" ? "bg-[#001A3D] text-white shadow-lg" : "text-gray-400 hover:text-[#001A3D]"}`}
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
                    className="group flex flex-col items-start justify-between gap-6 rounded-xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:border-[#F99D1C] hover:shadow-xl md:flex-row md:items-center"
                  >
                    <div className="flex flex-1 items-center gap-6">
                      <div className="rounded-xl bg-gray-50 p-4 transition-colors group-hover:bg-[#F99D1C]/10">
                        {doc.icon}
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold tracking-widest text-[#F99D1C] uppercase">
                          {doc.category}
                        </span>
                        <h3 className="display-font text-xl font-bold text-[#001A3D]">
                          {doc.title}
                        </h3>
                        <div className="flex items-center gap-4 text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                          <span className="flex items-center gap-1.5">
                            <Calendar size={12} className="text-[#F99D1C]" /> {doc.date}
                          </span>
                          <span className="h-1 w-1 rounded-full bg-gray-200"></span>
                          <span>{doc.size}</span>
                          <span className="h-1 w-1 rounded-full bg-gray-200"></span>
                          <span>{doc.type}</span>
                        </div>
                      </div>
                    </div>
                    <button className="flex w-full items-center justify-center gap-3 rounded-lg bg-gray-50 px-8 py-4 text-[11px] font-bold tracking-widest text-[#001A3D] transition-all group-hover:bg-[#F99D1C] md:w-auto">
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
                className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {DOCUMENTS.map((doc, i) => (
                  <div
                    key={doc.id}
                    className="group flex flex-col justify-between rounded-[2.5rem] border border-gray-100 bg-white p-8 transition-all duration-500 hover:border-[#F99D1C] hover:shadow-2xl"
                  >
                    <div className="space-y-8">
                      <div className="flex items-start justify-between">
                        <div className="rounded-2xl bg-gray-50 p-5 transition-colors group-hover:bg-[#F99D1C]/10">
                          {doc.icon}
                        </div>
                        <span className="rounded-full bg-[#F99D1C]/10 px-3 py-1 text-[10px] font-bold tracking-widest text-[#F99D1C] uppercase">
                          {doc.category}
                        </span>
                      </div>
                      <div className="space-y-3">
                        <h3 className="display-font text-2xl font-bold text-[#001A3D] transition-colors group-hover:text-[#F99D1C]">
                          {doc.title}
                        </h3>
                        <div className="flex items-center gap-4 text-xs font-medium text-gray-400">
                          <span className="flex items-center gap-1.5">
                            <Calendar size={12} /> {doc.date}
                          </span>
                          <span className="h-1.5 w-1.5 rounded-full bg-gray-100"></span>
                          <span>{doc.size}</span>
                        </div>
                      </div>
                    </div>

                    <button className="mt-12 flex w-full items-center justify-between rounded-2xl bg-gray-50 p-5 text-xs font-bold tracking-widest transition-all group-hover:bg-[#001A3D] group-hover:text-white">
                      GET DOCUMENT <Download size={18} className="text-[#F99D1C]" />
                    </button>
                  </div>
                ))}
              </Motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Support Section */}
      <section className="border-t border-gray-100 bg-[#FAF9F6] py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="relative overflow-hidden rounded-[3rem] bg-[#001A3D] p-12 md:p-16">
            <div className="relative z-10 flex flex-col items-center justify-between gap-12 lg:flex-row">
              <div className="space-y-6 text-center lg:text-left">
                <h2 className="display-font text-3xl font-semibold tracking-tight text-white md:text-5xl">
                  Need custom documentation?
                </h2>
                <p className="max-w-xl text-lg font-medium text-gray-400">
                  Our specialized teams can provide tailored technical whitepapers and architecture
                  documentation for your enterprise needs.
                </p>
              </div>
              <button className="rounded-sm bg-[#F99D1C] px-12 py-5 text-xs font-bold tracking-widest whitespace-nowrap text-[#001A3D] shadow-xl shadow-[#F99D1C]/20 transition-all hover:bg-[#ff9d00]">
                REQUEST ACCESS
              </button>
            </div>
            <div className="absolute top-0 right-0 h-full w-1/2 translate-x-1/2 skew-x-12 bg-white/5"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
