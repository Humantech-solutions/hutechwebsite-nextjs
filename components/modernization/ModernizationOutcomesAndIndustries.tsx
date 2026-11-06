"use client";

import { useState } from "react";
import {
  Zap,
  Layers,
  TrendingUp,
  ShieldCheck,
  Cpu,
  RefreshCw,
  BarChart3,
  Cloud,
  Landmark,
  Activity,
  ShoppingBag,
  Factory,
  Truck,
  Building2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { MASTER_PAGE_DATA } from "@/lib/data/legacy-modernization";
import { renderTitle } from "@/lib/utils";

const BENEFIT_ICONS: Record<string, React.ElementType> = {
  Zap,
  Layers,
  TrendingUp,
  ShieldCheck,
  Cpu,
  RefreshCw,
  BarChart3,
  Cloud,
};

const INDUSTRY_ICONS: Record<string, React.ElementType> = {
  "Banking & Financial Services": Landmark,
  "Healthcare & Life Sciences": Activity,
  "Retail & E-Commerce": ShoppingBag,
  Manufacturing: Factory,
  "Logistics & Supply Chain": Truck,
  "Enterprise Technology & SaaS": Building2,
};

export function ModernizationOutcomesAndIndustries({ benefits, industries: customInd, whyChoose, benefitsHeading, industriesHeading, whyHeading }: { benefits?: any[]; industries?: any[]; whyChoose?: any[]; benefitsHeading?: string; industriesHeading?: string; whyHeading?: string }) {
  const businessBenefits = benefits || MASTER_PAGE_DATA.businessBenefits;
  const industries = customInd || MASTER_PAGE_DATA.industries;
  const whyChooseHutech = whyChoose || MASTER_PAGE_DATA.whyChooseHutech;
  const [selectedIndustry, setSelectedIndustry] = useState(0);

  const activeInd = industries[selectedIndustry];
  const ActiveIndIcon = INDUSTRY_ICONS[activeInd.name] || Building2;

  return (
    <>
      {/* 1. Business Benefits Section - Executive Metric Dashboard (Replaces 8 Box Cards) */}
      <section className="bg-[#001A3D] py-20 text-white lg:py-28">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-[2px] w-8 bg-[#F99D1C]" />
              <span className="text-xs font-bold tracking-[0.25em] text-[#F99D1C] uppercase">
                BUSINESS OUTCOMES
              </span>
            </div>
            <h2 className="display-font text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {renderTitle(
                benefitsHeading || "Business Benefits of AI-Powered |Legacy Modernization",
                "text-white",
                "text-[#0171c1]",
                "text-[#F99D1C]"
              )}
            </h2>
            <p className="mt-4 text-base text-gray-300 sm:text-lg">
              Modernizing legacy applications is more than a technology upgrade. It is an opportunity to improve business agility, optimize IT operational expenses, and create a solid foundation for digital innovation.
            </p>
          </div>

          {/* Borderless Executive Benefits Matrix */}
          <div className="mt-16 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
            <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
              {businessBenefits.slice(0, 4).map((b, i) => {
                const Icon = BENEFIT_ICONS[b.icon] || Zap;
                return (
                  <div key={i} className="p-8 transition-colors hover:bg-white/[0.02]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-[#0171c1]">
                      <Icon className="h-5 w-5 text-cyan-300" />
                    </div>
                    <h3 className="display-font mt-5 text-lg font-bold text-white">
                      {b.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-gray-300">
                      {b.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
              {businessBenefits.slice(4, 8).map((b, i) => {
                const Icon = BENEFIT_ICONS[b.icon] || Zap;
                return (
                  <div key={i + 4} className="p-8 transition-colors hover:bg-white/[0.02]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-[#0171c1]">
                      <Icon className="h-5 w-5 text-cyan-300" />
                    </div>
                    <h3 className="display-font mt-5 text-lg font-bold text-white">
                      {b.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-gray-300">
                      {b.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Industries Section - Interactive Domain Navigator (Replaces 6 Generic Cards) */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-[2px] w-8 bg-[#F99D1C]" />
              <span className="text-xs font-bold tracking-[0.25em] text-[#F99D1C] uppercase">
                ENTERPRISE DOMAINS
              </span>
            </div>
            <h2 className="display-font text-3xl font-bold tracking-tight text-[#001A3D] sm:text-4xl lg:text-5xl">
              Legacy Application Modernization for Enterprise Industries
            </h2>
            <p className="mt-4 text-base text-gray-500 sm:text-lg">
              Hutech’s modernization approach can be applied across industries where mission-critical legacy software supports core daily operations.
            </p>
          </div>

          {/* Interactive Industry Showcase Console */}
          <div className="mt-14 lg:mt-20">
            {/* Horizontal Industry Tab Strip */}
            <div className="flex flex-wrap items-center justify-center gap-2 pb-6 border-b border-gray-100">
              {industries.map((ind, idx) => {
                const Icon = INDUSTRY_ICONS[ind.name] || Building2;
                const isSelected = selectedIndustry === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedIndustry(idx)}
                    className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#001A3D] text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{ind.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Industry Deep-Dive Pane */}
            <div className="mt-10 overflow-hidden rounded-2xl border border-gray-200 bg-[#F8FAFC] p-8 sm:p-12">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
                <div>
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#0171c1]">
                    <ActiveIndIcon className="h-5 w-5" />
                    <span>Domain Focus · Industry {selectedIndustry + 1} of {industries.length}</span>
                  </div>
                  <h3 className="display-font mt-3 text-2xl font-bold text-[#001A3D] sm:text-3xl">
                    {activeInd.name} Modernization
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">
                    {activeInd.description}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-lg bg-[#0171c1] px-6 py-3 text-xs font-bold tracking-wider text-white uppercase shadow-md transition-all hover:bg-[#005bb5]"
                    >
                      <span>Consult {activeInd.name} Specialists</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Right Side: Architectural Highlights */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0171c1]">
                    Modernization Highlights:
                  </span>
                  <ul className="mt-4 space-y-3 text-xs text-gray-700">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0171c1]" />
                      <span>Zero business logic regression on proprietary calculation engines.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0171c1]" />
                      <span>Compliance-certified cloud data pipelines and security hardening.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0171c1]" />
                      <span>Decoupling monolithic operational databases with active-active sync.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Hutech - Split Credo & Numbered Sequence (Replaces 6 Generic Cards) */}
      <section className="bg-[#F8FAFC] py-20 lg:py-28 border-t border-gray-100">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            {/* Left Column: Authority Anchor */}
            <div className="lg:sticky lg:top-24">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[2px] w-8 bg-[#F99D1C]" />
                <span className="text-xs font-bold tracking-[0.25em] text-[#F99D1C] uppercase">
                  WHY HUTECH
                </span>
              </div>
              <h2 className="display-font text-3xl font-bold tracking-tight text-[#001A3D] sm:text-4xl lg:text-5xl">
                Engineering Excellence Meets Agentic AI Speed
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-500">
                Successful modernization requires more than replacing outdated code. It demands an understanding of enterprise architecture, business-critical application logic, operational risks, and modern software engineering practices.
              </p>

              <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50/70 p-5">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#0171c1]">
                  <Sparkles className="h-4 w-4" />
                  <span>The Hutech Advantage</span>
                </div>
                <p className="mt-2 text-xs font-medium leading-relaxed text-[#001A3D]">
                  By combining human-governed enterprise architecture with autonomous AST parsers, we eliminate up to 65% of manual refactoring cycles with zero logic loss.
                </p>
              </div>

              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#001A3D] px-6 py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-md transition-all hover:bg-[#0171c1]"
                >
                  <span>Talk to Modernization Architects</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Numbered Stream (Zero Box Cards) */}
            <div className="divide-y divide-gray-200">
              {whyChooseHutech.map((item) => (
                <div key={item.num} className="group py-6 first:pt-0 last:pb-0 transition-colors">
                  <div className="flex items-start gap-5">
                    <span className="display-font text-2xl font-bold text-[#0171c1] group-hover:scale-110 transition-transform">
                      {item.num}
                    </span>
                    <div>
                      <h3 className="display-font text-lg font-bold text-[#001A3D] group-hover:text-[#0171c1] transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-gray-500 sm:text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
