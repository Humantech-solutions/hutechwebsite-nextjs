"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { renderTitle } from "@/lib/utils";
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
import { DownloadFormModal } from "@/components/DownloadFormModal";
import { HutechDocument } from "@/lib/wordpress";

interface HutechDocumentsClientProps {
  documents: HutechDocument[];
  pageData: {
    heroTagline: string;
    heroTitle: string;
    heroDesc: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaBtnText: string;
    ctaBtnUrl: string;
  };
}

function getDocIcon(mimeType?: string) {
  if (mimeType?.includes("pdf")) return <FileText className="text-[#F99D1C]" />;
  if (mimeType?.includes("json") || mimeType?.includes("sheet") || mimeType?.includes("csv")) return <FileJson className="text-[#F99D1C]" />;
  if (mimeType?.includes("image")) return <FileCode className="text-[#F99D1C]" />;
  return <FileText className="text-[#F99D1C]" />;
}

export default function HutechDocumentsClient({ documents, pageData }: HutechDocumentsClientProps) {
  const [viewMode, setViewMode] = useState<"list" | "card">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<HutechDocument | null>(null);

  const categories = ["All", ...Array.from(new Set(documents.map(d => d.category).filter(Boolean)))];

  const filteredDocs = documents.filter((doc) => {
    const matchesCat = activeCategory === "All" || doc.category === activeCategory;
    if (!matchesCat) return false;
    
    if (!searchQuery.trim()) return true;

    const keywords = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
    const searchableText = [doc.title, doc.category, doc.mimeType].join(" ").toLowerCase();

    return keywords.every((keyword) => searchableText.includes(keyword));
  });

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Meta
        title="Hutech Documents | Hutech Solutions"
        description={pageData.heroDesc}
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
                {pageData.heroTagline}
              </span>
            </div>
            <h1 className="display-font text-4xl leading-tight font-semibold md:text-6xl">
              {renderTitle(pageData.heroTitle)}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-400">
              {pageData.heroDesc}
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-[#001A3D] rounded-sm border border-gray-100 bg-gray-50 py-3 pr-4 pl-12 text-sm font-medium transition-colors focus:border-[#F99D1C] focus:outline-none"
                />
              </div>
              <div className="relative">
                <button 
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className={`rounded-sm border border-gray-100 p-3 transition-all hover:border-[#F99D1C] hover:bg-white ${showFilterMenu ? 'bg-white border-[#F99D1C] text-[#F99D1C]' : 'bg-gray-50 text-gray-500'}`}
                >
                  <Filter size={18} />
                </button>
                {showFilterMenu && (
                  <div className="absolute top-full mt-2 right-0 w-48 rounded-md bg-white shadow-xl border border-gray-100 z-50">
                    <div className="py-2">
                      <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest">Filter by Category</div>
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setActiveCategory(cat);
                            setShowFilterMenu(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-gray-50 ${activeCategory === cat ? 'text-[#F99D1C] font-semibold' : 'text-[#001A3D]'}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
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
                {filteredDocs.length > 0 ? (
                  filteredDocs.map((doc, i) => (
                  <div
                    key={doc.id}
                    className="group flex flex-col items-start justify-between gap-6 rounded-[15px] md:rounded-xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:border-[#F99D1C] hover:shadow-xl md:flex-row md:items-center"
                  >
                    <div className="flex flex-1 items-center gap-6">
                      <div className="rounded-xl bg-gray-50 p-4 transition-colors group-hover:bg-[#F99D1C]/10">
                        {getDocIcon(doc.mimeType)}
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
                          <span>{doc.sizeText || "-"}</span>
                          <span className="h-1 w-1 rounded-full bg-gray-200"></span>
                          <span>{doc.mimeType?.split("/")[1] || "File"}</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedDoc(doc)}
                      className="flex w-full items-center justify-center gap-3 rounded-lg bg-gray-50 px-8 py-4 text-[11px] font-bold tracking-widest text-[#001A3D] transition-all group-hover:bg-[#F99D1C] md:w-auto"
                    >
                      DOWNLOAD <Download size={16} />
                    </button>
                  </div>
                ))
                ) : (
                  <div className="py-20 text-center">
                    <h3 className="display-font mb-4 text-2xl font-bold text-[#001A3D]">
                      No documents found
                    </h3>
                    <p className="text-gray-400">
                      We couldn&apos;t find any documents matching your search.
                    </p>
                  </div>
                )}
              </Motion.div>
            ) : (
              <Motion.div
                key="card-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={filteredDocs.length > 0 ? "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" : ""}
              >
                {filteredDocs.length > 0 ? (
                  filteredDocs.map((doc, i) => (
                  <div
                    key={doc.id}
                    className="group flex flex-col justify-between rounded-[15px] md:rounded-[2.5rem] border border-gray-100 bg-white p-8 transition-all duration-500 hover:border-[#F99D1C] hover:shadow-2xl"
                  >
                    <div className="space-y-8">
                      <div className="flex items-start justify-between">
                        <div className="rounded-2xl bg-gray-50 p-5 transition-colors group-hover:bg-[#F99D1C]/10">
                          {getDocIcon(doc.mimeType)}
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
                          <span>{doc.sizeText || "-"}</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setSelectedDoc(doc)}
                      className="mt-12 flex w-full items-center justify-between rounded-2xl p-5 text-xs font-bold tracking-widest transition-all group-hover:bg-[#001A3D] group-hover:text-white bg-gray-50 text-[#001A3D]"
                    >
                      GET DOCUMENT <Download size={18} className="text-[#F99D1C]" />
                    </button>
                  </div>
                ))
                ) : (
                  <div className="col-span-full py-20 text-center">
                    <h3 className="display-font mb-4 text-2xl font-bold text-[#001A3D]">
                      No documents found
                    </h3>
                    <p className="text-gray-400">
                      We couldn&apos;t find any documents matching your search.
                    </p>
                  </div>
                )}
              </Motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Support Section */}
      <section className="border-t border-gray-100 bg-[#FAF9F6] py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="relative overflow-hidden rounded-[15px] md:rounded-[3rem] bg-[#001A3D] p-12 md:p-16">
            <div className="relative z-10 flex flex-col items-center justify-between gap-12 lg:flex-row">
              <div className="space-y-6 text-center lg:text-left">
                <h2 className="display-font text-3xl font-semibold tracking-tight text-white md:text-5xl">
                  {pageData.ctaTitle}
                </h2>
                <p className="max-w-xl text-lg font-medium text-gray-400">
                  {pageData.ctaDesc}
                </p>
              </div>
              <a 
                href={pageData.ctaBtnUrl}
                className="rounded-sm bg-[#F99D1C] px-12 py-5 text-xs font-bold tracking-widest whitespace-nowrap text-[#001A3D] shadow-xl shadow-[#F99D1C]/20 transition-all hover:bg-[#ff9d00]"
              >
                {pageData.ctaBtnText}
              </a>
            </div>
            <div className="absolute top-0 right-0 h-full w-1/2 translate-x-1/2 skew-x-12 bg-white/5"></div>
          </div>
        </div>
      </section>

      {/* Download Form Modal */}
      <DownloadFormModal
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
        documentTitle={selectedDoc?.title || ""}
        downloadUrl={selectedDoc?.externalUrl || selectedDoc?.fileUrl || ""}
      />
    </div>
  );
}
