"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { LEGACY_TECHNOLOGY_PAGES } from "@/lib/data/legacy-modernization";
import { getTechVectorLogo } from "@/components/modernization/TechLogos";

export function LegacyTechGrid() {
  const technologies = Object.values(LEGACY_TECHNOLOGY_PAGES);
  const [selectedTech, setSelectedTech] = useState(0);

  const activeTech = technologies[selectedTech];

  return (
    <section id="technology-stacks" className="scroll-mt-16 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-8 bg-[#F99D1C]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#F99D1C] uppercase">
              TECHNOLOGY-SPECIFIC MODERNIZATION
            </span>
          </div>
          <h2 className="display-font text-3xl font-bold tracking-tight text-[#001A3D] sm:text-4xl lg:text-5xl">
            Specialized Modernization Across Major Legacy Technologies
          </h2>
          <p className="mt-4 text-base text-gray-500 sm:text-lg">
            Hutech provides dedicated modernization frameworks, automated code intelligence, and specialized engineering for the industry&apos;s most common legacy technology platforms.
          </p>
        </div>

        {/* Interactive Technology Console (Replaces 6 Generic Box Cards) */}
        <div className="mt-14 lg:mt-20">
          {/* Horizontal Technology Tab Selector Strip with Authentic SVGs */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6 pb-6 border-b border-gray-100">
            {technologies.map((tech, idx) => {
              const isSelected = selectedTech === idx;

              return (
                <button
                  key={tech.slug}
                  onClick={() => setSelectedTech(idx)}
                  className={`flex flex-col items-center justify-center gap-2 rounded-xl p-4 transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#001A3D] text-white shadow-lg scale-102"
                      : "bg-[#F8FAFC] text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      isSelected
                        ? "bg-white/10 text-white"
                        : "bg-white text-[#0171c1] shadow-2xs"
                    }`}
                  >
                    {getTechVectorLogo(tech.slug, "w-5 h-5")}
                  </div>
                  <span className="display-font text-xs font-bold tracking-tight">
                    {tech.shortName}
                  </span>
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider ${
                      isSelected ? "text-[#F99D1C]" : "text-gray-400"
                    }`}
                  >
                    Modernization
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Stack Architecture Workbench */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200/80 bg-[#F8FAFC] p-8 sm:p-12 shadow-sm">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
              {/* Left Column: Deep Transformation Architecture */}
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0171c1]">
                    {getTechVectorLogo(activeTech.slug, "w-6 h-6")}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#0171c1]">
                      {activeTech.badge}
                    </span>
                    <h3 className="display-font text-2xl font-bold text-[#001A3D] sm:text-3xl">
                      {activeTech.name}
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">
                  {activeTech.heroSubtitle}
                </p>

                {/* Legacy vs Target Runtime Comparison Matrix */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* From Legacy Box */}
                  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-2xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                      Legacy Runtimes & Frameworks:
                    </span>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {activeTech.legacyStack.slice(0, 4).map((stk, i) => (
                        <span
                          key={i}
                          className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700"
                        >
                          {stk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* To Modern Target Box */}
                  <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-5 shadow-2xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0171c1]">
                      Target Cloud Architecture:
                    </span>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {activeTech.targetStack.slice(0, 4).map((stk, i) => (
                        <span
                          key={i}
                          className="rounded bg-white border border-blue-200/60 px-2 py-1 text-xs font-medium text-[#001A3D]"
                        >
                          {stk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Key Performance Metric Highlight */}
                <div className="mt-6 flex items-center gap-3 rounded-lg bg-white p-3.5 border border-gray-200 text-xs">
                  <span className="font-bold text-[#0171c1]">
                    {activeTech.keyStats[0].value}
                  </span>
                  <span className="text-gray-500">{activeTech.keyStats[0].label}</span>
                </div>
              </div>

              {/* Right Column: Migration Action Blueprint Card */}
              <div className="rounded-2xl border border-blue-900 bg-[#001A3D] p-8 text-white shadow-xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F99D1C]">
                  <Sparkles className="h-4 w-4" />
                  <span>Dedicated Playbook</span>
                </div>

                <h4 className="display-font mt-3 text-xl font-bold text-white">
                  5-Phase {activeTech.shortName} Engineering Blueprint
                </h4>

                <p className="mt-3 text-xs leading-relaxed text-gray-300">
                  Explore how Hutech utilizes automated AST code parsers, semantic analysis, and deterministic refactoring for {activeTech.shortName}.
                </p>

                <div className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0171c1]" />
                    <span>100% Business Logic Preservation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0171c1]" />
                    <span>Automated Regression Parity Suite</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0171c1]" />
                    <span>Zero Downtime Cloud Deployment</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <Link
                    href={`/services/legacy-application-modernization/${activeTech.slug}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0171c1] py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-md transition-all hover:bg-[#005bb5]"
                  >
                    <span>Open {activeTech.shortName} Deep-Dive</span>
                    <ArrowRight className="h-4 w-4" />
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
