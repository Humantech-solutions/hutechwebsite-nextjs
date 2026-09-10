"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowUpRight, CheckCircle2, Search, X } from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";
import { CaseStudy } from "@/lib/data/case-studies";
import { renderTitle } from "@/lib/utils";

export default function CaseStudiesClient({
  caseStudies,
  pageTitle,
  pageDescription,
  bgImageUrl,
}: {
  caseStudies: CaseStudy[];
  pageTitle?: string;
  pageDescription?: string;
  bgImageUrl?: string;
}) {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const dynamicCategories = [
    "All",
    ...Array.from(
      new Set(caseStudies.map((s) => s.category).filter((c) => c && c !== "Case Study"))
    ),
  ];

  const filteredStudies = caseStudies.filter((study) => {
    const matchesTab = activeTab === "All" || study.category === activeTab;

    if (!searchQuery.trim()) {
      return matchesTab;
    }

    const keywords = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);

    // Combine all searchable text into one string for easy keyword matching
    const searchableText = [
      study.title,
      study.client,
      study.listClient || "",
      study.shortDesc || "",
      study.listDesc || "",
      ...(study.tags || []),
    ]
      .join(" ")
      .toLowerCase();

    // Ensure EVERY keyword entered by the user is found somewhere in the case study
    const matchesSearch = keywords.every((keyword) => searchableText.includes(keyword));

    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-white">
      <Meta
        title="Case Studies | Hutech Solutions"
        description="Real-world examples of how Hutech Solutions drives digital transformation."
      />
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex items-center overflow-hidden bg-[#001A3D] py-32 text-white">
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-20">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <span className="block h-[2px] w-8 bg-[#F99D1C]"></span>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#F99D1C]">
                Global Impact
              </span>
            </div>
            <h1 className="display-font mb-6 text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
              {pageTitle ? (
                renderTitle(pageTitle, "text-inherit", "text-[#F99D1C]", "text-[#0171c1]")
              ) : (
                <>
                  Digital <br />
                  <span className="text-[#F99D1C]">Success Stories.</span>
                </>
              )}
            </h1>
            <p className="max-w-2xl text-xl font-medium leading-relaxed text-gray-400">
              {pageDescription ||
                "Discover how we've partnered with industry leaders to solve complex challenges and achieve measurable results through technological excellence."}
            </p>
          </Motion.div>
        </div>
        {bgImageUrl && (
          <div className="absolute inset-0 z-0">
            <ImageWithFallback
              src={bgImageUrl}
              alt="Case Studies Background"
              className="h-full w-full object-cover opacity-20"
            />
          </div>
        )}
        <div className="bg-linear-to-l pointer-events-none absolute right-0 top-0 z-10 h-full w-1/2 from-[#0171c1]/10 to-transparent"></div>
      </section>

      {/* Sticky Search & Filter Bar */}
      <section className="sticky top-[72px] z-30 border-b border-gray-100 bg-white/80 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-8 px-6 py-8 md:flex-row lg:px-20">
          <div className="no-scrollbar flex w-full items-center gap-2 overflow-x-auto pb-2 md:w-auto md:pb-0">
            {dynamicCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`whitespace-nowrap rounded-full px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                  activeTab === cat
                    ? "bg-[#0171c1] text-white shadow-xl"
                    : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-[#001A3D]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="group relative w-full md:w-96">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#0171c1]"
              size={20}
            />
            <input
              type="text"
              placeholder="Search case studies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-gray-100 bg-gray-50 py-4 pl-14 pr-12 text-sm font-medium text-[#001A3D] shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#0171c1]/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="bg-gray-50/30 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <AnimatePresence mode="popLayout">
            {filteredStudies.length > 0 ? (
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-20">
                {filteredStudies.map((study, i) => (
                  <Motion.div
                    key={study.slug}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group flex h-full flex-col overflow-hidden rounded-[15px] bg-gray-50 transition-all duration-500 hover:bg-[#001A3D] md:rounded-[2.5rem]"
                  >
                    <Link
                      href={`/resources/case-studies/${study.slug}`}
                      className="flex h-full flex-col"
                    >
                      <div className="relative h-96 overflow-hidden">
                        <ImageWithFallback
                          src={study.image}
                          alt={study.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D] via-[#001A3D]/20 to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-80"></div>
                        <div className="absolute bottom-10 left-10 flex flex-wrap gap-2 pr-6">
                          {study.tags.map((tag, j) => (
                            <span
                              key={j}
                              className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-grow flex-col justify-between space-y-8 p-10 lg:p-12">
                        <div className="space-y-4">
                          <span className="block text-sm font-bold uppercase tracking-widest text-[#F99D1C]">
                            {study.listClient || study.client}
                          </span>
                          <h3 className="display-font text-2xl font-bold leading-tight text-[#001A3D] transition-colors group-hover:text-white md:text-3xl">
                            {study.title}
                          </h3>
                        </div>
                        <div className="mt-auto flex items-center justify-between gap-4 border-t border-gray-200 pt-8 group-hover:border-white/20">
                          <div className="flex min-w-0 flex-1 items-center gap-3">
                            <CheckCircle2
                              size={24}
                              className="min-w-[24px] shrink-0 text-[#F99D1C]"
                            />
                            <span className="line-clamp-2 text-lg font-bold leading-snug text-[#001A3D] group-hover:text-white">
                              {study.listDesc || study.shortDesc}
                            </span>
                          </div>
                          <div className="flex aspect-square h-16 w-12 shrink-0 transform items-center justify-center rounded-full bg-white text-[#001A3D] shadow-sm transition-all group-hover:rotate-45 group-hover:bg-[#F99D1C] group-hover:text-[#001A3D]">
                            <ArrowUpRight size={28} className="shrink-0" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Motion.div>
                ))}
              </div>
            ) : (
              <div className="rounded-[15px] border border-gray-100 bg-white py-40 text-center shadow-sm md:rounded-[4rem]">
                <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gray-50">
                  <Search size={40} className="text-gray-200" />
                </div>
                <h3 className="display-font mb-4 text-3xl font-bold text-[#001A3D]">
                  No case studies found
                </h3>
                <p className="mx-auto mb-10 max-w-sm font-medium text-gray-500">
                  We couldn&apos;t find any success stories matching your requirements. Try
                  adjusting your search or filters.
                </p>
                <button
                  onClick={() => {
                    setActiveTab("All");
                    setSearchQuery("");
                  }}
                  className="text-xs font-black uppercase tracking-widest text-[#0171c1] hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
