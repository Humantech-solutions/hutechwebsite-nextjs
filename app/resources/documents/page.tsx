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
    icon: <FileText className="text-[#FFAF2B]" />,
  },
  {
    id: "supply-chain-26",
    title: "Global Supply Chain Report 2026",
    type: "PDF",
    size: "15.8 MB",
    category: "Report",
    date: "Feb 28, 2026",
    icon: <FileText className="text-[#FFAF2B]" />,
  },
  {
    id: "ai-framework",
    title: "AI & ML Framework Whitepaper",
    type: "PDF",
    size: "8.1 MB",
    category: "Technical",
    date: "Jan 15, 2026",
    icon: <FileCode className="text-[#FFAF2B]" />,
  },
  {
    id: "brand-guidelines",
    title: "Hutech Solutions Brand Guidelines",
    type: "PDF",
    size: "12.4 MB",
    category: "Guidelines",
    date: "Dec 10, 2025",
    icon: <FileJson className="text-[#FFAF2B]" />,
  },
  {
    id: "sustainability",
    title: "Sustainability ESG Report 2025",
    type: "PDF",
    size: "6.7 MB",
    category: "Report",
    date: "Nov 05, 2025",
    icon: <FileText className="text-[#FFAF2B]" />,
  },
  {
    id: "security-compliance",
    title: "Security & Compliance Overview",
    type: "PDF",
    size: "3.2 MB",
    category: "Technical",
    date: "Oct 22, 2025",
    icon: <FileCode className="text-[#FFAF2B]" />,
  },
];

export default function HutechDocuments() {
  const [viewMode, setViewMode] = useState<"list" | "card">("list");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocs = DOCUMENTS.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Meta
        title="Hutech Documents | Hutech Solutions"
        description="Access official Hutech Solutions corporate documents, reports, and whitepapers."
      />
      <Breadcrumbs variant="light" />

      <section className="relative flex h-[350px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 text-center md:text-left lg:px-20">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <span className="block h-[2px] w-8 bg-[#FFAF2B]"></span>
              <span className="text-xs font-semibold tracking-widest text-[#FFAF2B] uppercase">
                Resource Library
              </span>
            </div>
            <h1 className="display-font text-5xl leading-tight font-semibold md:text-8xl">
              Hutech <span className="text-[#FFAF2B]">Documents.</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-gray-400 md:mx-0 md:text-xl">
              Access official publications, corporate reports, and technical whitepapers curated by
              our engineering teams.
            </p>
          </Motion.div>
        </div>
        <div className="absolute right-0 bottom-0 h-full w-1/3 translate-x-1/2 -skew-x-12 bg-[#FFAF2B]/5"></div>
      </section>

      <section className="bg-gray-50/50 py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          {/* Controls */}
          <div className="mb-16 flex flex-col items-center justify-between gap-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:flex-row">
            <div className="flex w-full items-center gap-4 md:w-auto">
              <div className="relative flex-1 md:w-96">
                <Search
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search documents by title or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-gray-100 bg-gray-50 py-3.5 pr-4 pl-12 text-sm font-medium transition-all focus:border-[#0171c1] focus:ring-1 focus:ring-[#0171c1] focus:outline-none"
                />
              </div>
              <button className="rounded-xl border border-gray-100 bg-gray-50 p-3.5 text-gray-500 transition-all hover:border-[#0171c1] hover:bg-white hover:text-[#0171c1]">
                <Filter size={18} />
              </button>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 p-1.5">
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-[10px] font-black tracking-widest transition-all ${viewMode === "list" ? "bg-[#001A3D] text-white shadow-lg" : "text-gray-400 hover:text-[#001A3D]"}`}
              >
                <List size={14} /> LIST VIEW
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-[10px] font-black tracking-widest transition-all ${viewMode === "card" ? "bg-[#001A3D] text-white shadow-lg" : "text-gray-400 hover:text-[#001A3D]"}`}
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
                      className="group flex flex-col items-start justify-between gap-8 rounded-2xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:border-[#0171c1] hover:shadow-2xl hover:shadow-gray-100 md:flex-row md:items-center"
                    >
                      <div className="flex flex-1 items-center gap-8">
                        <div className="rounded-2xl bg-gray-50 p-5 transition-colors group-hover:bg-[#0171c1]/10">
                          {doc.icon}
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] font-black tracking-[0.2em] text-[#FFAF2B] uppercase">
                            {doc.category}
                          </span>
                          <h3 className="display-font text-xl font-semibold text-[#001A3D] transition-colors group-hover:text-[#0171c1] md:text-2xl">
                            {doc.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-[11px] font-bold tracking-widest text-gray-400 uppercase">
                            <span className="flex items-center gap-2">
                              <Calendar size={14} className="text-[#0171c1]" /> {doc.date}
                            </span>
                            <span className="h-1.5 w-1.5 rounded-full bg-gray-200"></span>
                            <span>{doc.size}</span>
                            <span className="h-1.5 w-1.5 rounded-full bg-gray-200"></span>
                            <span className="text-[#0171c1]">{doc.type}</span>
                          </div>
                        </div>
                      </div>
                      <button className="flex w-full items-center justify-center gap-3 rounded-xl bg-gray-50 px-10 py-5 text-[11px] font-black tracking-[0.2em] text-[#001A3D] shadow-sm transition-all group-hover:bg-[#001A3D] group-hover:text-white hover:shadow-xl md:w-auto">
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
                  {filteredDocs.map((doc, i) => (
                    <div
                      key={doc.id}
                      className="group flex flex-col justify-between rounded-[2.5rem] border border-gray-100 bg-white p-10 transition-all duration-500 hover:border-[#0171c1] hover:shadow-2xl hover:shadow-gray-100"
                    >
                      <div className="space-y-10">
                        <div className="flex items-start justify-between">
                          <div className="rounded-2xl bg-gray-50 p-6 transition-colors group-hover:bg-[#0171c1]/10">
                            {doc.icon}
                          </div>
                          <span className="rounded-full border border-[#FFAF2B]/10 bg-[#FFAF2B]/5 px-4 py-1.5 text-[10px] font-black tracking-[0.15em] text-[#FFAF2B] uppercase">
                            {doc.category}
                          </span>
                        </div>
                        <div className="space-y-4">
                          <h3 className="display-font text-2xl leading-tight font-semibold text-[#001A3D] transition-colors group-hover:text-[#0171c1]">
                            {doc.title}
                          </h3>
                          <div className="flex items-center gap-4 text-[11px] font-bold tracking-widest text-gray-400 uppercase">
                            <span className="flex items-center gap-1.5">
                              <Calendar size={12} /> {doc.date}
                            </span>
                            <span className="h-1.5 w-1.5 rounded-full bg-gray-100"></span>
                            <span>{doc.size}</span>
                          </div>
                        </div>
                      </div>

                      <button className="mt-12 flex w-full items-center justify-between rounded-2xl bg-gray-50 p-6 text-[11px] font-black tracking-[0.2em] transition-all group-hover:bg-[#001A3D] group-hover:text-white">
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
                className="py-40 text-center"
              >
                <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gray-50 text-gray-300">
                  <Search size={40} />
                </div>
                <h3 className="display-font mb-4 text-3xl font-semibold text-[#001A3D]">
                  No documents found
                </h3>
                <p className="mx-auto max-w-md font-medium text-gray-500">
                  Try adjusting your search query or filters to find the specific document you are
                  looking for.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-10 text-xs font-black tracking-widest text-[#0171c1] uppercase hover:underline"
                >
                  Clear search
                </button>
              </Motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Support Section */}
      <section className="border-t border-gray-100 bg-gray-50 py-32">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="relative overflow-hidden rounded-[4rem] bg-[#001A3D] p-16 shadow-2xl md:p-24">
            <div className="relative z-10 flex flex-col items-center justify-between gap-16 lg:flex-row">
              <div className="space-y-8 text-center lg:text-left">
                <h2 className="display-font text-4xl leading-tight font-semibold tracking-tight text-white md:text-6xl">
                  Need custom <br /> documentation?
                </h2>
                <p className="max-w-xl text-xl leading-relaxed font-medium text-gray-400">
                  Our specialized engineering teams can provide tailored technical whitepapers,
                  architectural blueprints, and compliance documentation for your enterprise
                  infrastructure.
                </p>
              </div>
              <button className="group rounded-xl bg-[#FFAF2B] px-14 py-6 text-xs font-black tracking-[0.2em] whitespace-nowrap text-[#001A3D] shadow-2xl shadow-[#FFAF2B]/20 transition-all hover:bg-white">
                REQUEST ACCESS{" "}
                <ArrowRight className="ml-2 inline-block transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 h-full w-1/2 translate-x-1/4 skew-x-12 bg-linear-to-l from-white/5 to-transparent"></div>
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#0171c1]/20 blur-[100px]"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
