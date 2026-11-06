"use client";

import { useState } from "react";
import {
  Search,
  Code2,
  Boxes,
  Cloud,
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { MASTER_PAGE_DATA } from "@/lib/data/legacy-modernization";
import { renderTitle } from "@/lib/utils";

const CAP_ICONS: Record<string, React.ElementType> = {
  Search,
  Code2,
  Boxes,
  Cloud,
  RefreshCw,
  ShieldCheck,
};

export function ModernizationCapabilities({ data, tagline, heading, description }: { data?: any[]; tagline?: string; heading?: string; description?: string }) {
  const capabilities = data || MASTER_PAGE_DATA.capabilities;
  const [activeIdx, setActiveIdx] = useState(0);

  const activeCap = capabilities[activeIdx];
  const ActiveIcon = CAP_ICONS[activeCap.icon] || Code2;

  return (
    <section id="services" className="scroll-mt-16 bg-[#F8FAFC] py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-8 bg-[#F99D1C]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#F99D1C] uppercase">
              {tagline || "CORE CAPABILITIES"}
            </span>
          </div>
          <h2 className="display-font text-3xl font-bold tracking-tight text-[#001A3D] sm:text-4xl lg:text-5xl">
            {renderTitle(
              heading || "End-to-End Legacy Application |Modernization Services",
              "text-[#001A3D]",
              "text-[#0171c1]",
              "text-[#F99D1C]"
            )}
          </h2>
          <p className="mt-4 text-base text-gray-500 sm:text-lg">
            {description || "Hutech provides comprehensive application modernization services designed to help enterprises assess, transform, migrate, and optimize legacy software systems combining modern engineering practices with AI-assisted development and intelligent automation."}
          </p>
        </div>

        {/* Interactive Capability Console (Replaces 6 Static Box Cards) */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-xl lg:mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr]">
            {/* Left Column: Interactive Capability Selector List */}
            <div className="border-b border-gray-100 bg-[#F8FAFC] lg:border-r lg:border-b-0">
              <div className="p-4 border-b border-gray-200/60 text-xs font-bold uppercase tracking-wider text-gray-400">
                Select Modernization Practice
              </div>
              <div className="divide-y divide-gray-100">
                {capabilities.map((cap, idx) => {
                  const Icon = CAP_ICONS[cap.icon] || Code2;
                  const isSelected = activeIdx === idx;

                  return (
                    <button
                      key={cap.number}
                      onClick={() => setActiveIdx(idx)}
                      className={`group flex w-full items-center justify-between p-5 text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-white border-l-4 border-l-[#0171c1] shadow-xs"
                          : "hover:bg-gray-100/60 border-l-4 border-l-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                            isSelected
                              ? "bg-[#0171c1] text-white"
                              : "bg-gray-200/70 text-gray-600 group-hover:bg-blue-50 group-hover:text-[#0171c1]"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-gray-400">
                              {cap.number}
                            </span>
                            <span
                              className={`display-font text-sm font-bold ${
                                isSelected ? "text-[#001A3D]" : "text-gray-700"
                              }`}
                            >
                              {cap.title}
                            </span>
                          </div>
                          <span className="block text-[11px] text-gray-500">
                            {cap.subtitle}
                          </span>
                        </div>
                      </div>

                      <ChevronRight
                        className={`h-4 w-4 shrink-0 transition-transform ${
                          isSelected
                            ? "text-[#0171c1] translate-x-1"
                            : "text-gray-300 group-hover:text-gray-500"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Deep-Dive Blueprint Showcase */}
            <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                {/* Active Header Badge & Icon */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0171c1]">
                      <ActiveIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold tracking-wider text-[#0171c1] uppercase">
                          Practice {activeCap.number}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-gray-300" />
                        <span className="text-xs font-semibold text-gray-500">
                          {activeCap.subtitle}
                        </span>
                      </div>
                      <h3 className="display-font mt-1 text-2xl font-bold text-[#001A3D] sm:text-3xl">
                        {activeCap.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Narrative Description */}
                <p className="mt-6 text-sm leading-relaxed text-gray-600 sm:text-base">
                  {activeCap.description}
                </p>

                {/* Key Capabilities Feature Grid */}
                <div className="mt-8">
                  <span className="text-xs font-bold tracking-wider text-[#001A3D] uppercase">
                    Core Technical Deliverables:
                  </span>
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {activeCap.features.map((feat: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 rounded-lg border border-gray-100 bg-[#F8FAFC] p-3 text-xs text-gray-700"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0171c1]" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Value Driver Callout Banner */}
              <div className="mt-10 rounded-xl border border-blue-100 bg-blue-50/60 p-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0171c1]">
                      Enterprise Business Value
                    </span>
                    <p className="mt-1 text-xs font-bold text-[#001A3D] sm:text-sm">
                      {activeCap.businessValue}
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#001A3D] px-5 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-sm transition-all hover:bg-[#0171c1]"
                  >
                    <span>Consult Experts</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
