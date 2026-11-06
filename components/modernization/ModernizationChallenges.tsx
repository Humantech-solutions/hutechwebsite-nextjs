"use client";

import { useState } from "react";
import {
  Cpu,
  DollarSign,
  Layers,
  Boxes,
  ShieldAlert,
  FileText,
  Network,
  Users,
  Clock,
  CloudOff,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { MASTER_PAGE_DATA } from "@/lib/data/legacy-modernization";
import { renderTitle } from "@/lib/utils";

const ICON_MAP: Record<string, React.ElementType> = {
  Cpu,
  DollarSign,
  Layers,
  Boxes,
  ShieldAlert,
  FileText,
  Network,
  Users,
  Clock,
  CloudOff,
};

// Group challenges into strategic diagnostic categories for interactive filtering
const CATEGORIES = [
  { id: "all", label: "All Challenges (10)" },
  { id: "architecture", label: "Architecture & Scale" },
  { id: "cost", label: "Cost & Resources" },
  { id: "security", label: "Security & Risk" },
];

export function ModernizationChallenges({ data, tagline, heading, description }: { data?: any[]; tagline?: string; heading?: string; description?: string }) {
  const challenges = data || MASTER_PAGE_DATA.challenges;
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredChallenges = challenges.filter((c, idx) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "architecture") return [0, 2, 3, 6, 9].includes(idx);
    if (activeCategory === "cost") return [1, 7, 8].includes(idx);
    if (activeCategory === "security") return [4, 5].includes(idx);
    return true;
  });

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-8 bg-[#F99D1C]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#F99D1C] uppercase">
              {tagline || "WHY MODERNIZE"}
            </span>
          </div>
          <h2 className="display-font text-3xl font-bold tracking-tight text-[#001A3D] sm:text-4xl lg:text-5xl">
            {renderTitle(
              heading || "Is Your Legacy Technology |Holding Back Business Innovation?",
              "text-[#001A3D]",
              "text-[#0171c1]",
              "text-[#F99D1C]"
            )}
          </h2>
          <p className="mt-4 text-base text-gray-500 sm:text-lg">
            {description || "Legacy applications often remain essential to enterprise operations. However, outdated architectures, aging technology stacks, and increasing maintenance costs can limit an organization’s ability to innovate, scale, and secure digital workflows."}
          </p>
        </div>

        {/* Diagnostic Matrix - Interactive List Layout (No Repetitive Cards) */}
        <div className="mt-14 lg:mt-20">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pb-8 border-b border-gray-100">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-5 py-2 text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[#001A3D] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* 2-Column Split: Architectural Health Overview + Streamlined Risk Ledger */}
          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.8fr] lg:gap-16 items-start">
            {/* Left Column: Sticky Diagnostic Summary */}
            <div className="lg:sticky lg:top-24 rounded-2xl bg-[#001A3D] p-8 text-white shadow-xl">
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-8 bg-[#F99D1C]" />
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#F99D1C] uppercase">
                  ARCHITECTURAL HEALTH CHECK
                </span>
              </div>
              <h3 className="display-font mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl">
                The Compounding Cost of Inaction
              </h3>
              <p className="mt-4 text-xs leading-relaxed text-gray-300 sm:text-sm">
                Each unresolved legacy constraint compounds enterprise operational risk, inflating infrastructure bills and stalling time-to-market for digital products.
              </p>

              {/* Key Diagnostic Metrics */}
              <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-300">Technical Debt Multiplier</span>
                  <span className="text-sm font-bold text-[#F99D1C]">3.8x Yearly</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-300">Monolithic Deployment Risk</span>
                  <span className="text-sm font-bold text-white">Elevated</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-300">Legacy Maintenance Share</span>
                  <span className="text-sm font-bold text-[#0171c1]">60–80% IT Budget</span>
                </div>
              </div>

              {/* CTA Link */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0171c1] py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-md transition-all hover:bg-[#005bb5]"
                >
                  Request Application Audit
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Clean, Borderless Interactive Ledger (Zero Cards) */}
            <div className="divide-y divide-gray-100">
              {filteredChallenges.map((c, idx) => {
                const Icon = ICON_MAP[c.icon] || AlertTriangle;
                const originalIndex = challenges.findIndex(
                  (item) => item.challenge === c.challenge
                );

                return (
                  <div
                    key={idx}
                    className="group py-6 first:pt-0 last:pb-0 transition-colors duration-200"
                  >
                    <div className="flex items-start gap-5">
                      {/* Numeric Index + Icon Node */}
                      <div className="flex flex-col items-center">
                        <span className="text-[11px] font-bold text-gray-400 group-hover:text-[#0171c1] transition-colors">
                          {String(originalIndex + 1).padStart(2, "0")}
                        </span>
                        <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-[#0171c1] transition-colors duration-200 group-hover:bg-blue-50 group-hover:text-[#0171c1]">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="display-font text-base font-bold text-[#001A3D] group-hover:text-[#0171c1] transition-colors sm:text-lg">
                            {c.challenge}
                          </h4>
                          <span className="rounded bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-[#0171c1] uppercase">
                            Operational Impact
                          </span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-gray-500 sm:text-sm">
                          {c.impact}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
