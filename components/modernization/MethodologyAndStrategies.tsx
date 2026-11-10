"use client";

import {
  Search,
  Compass,
  Code2,
  ShieldCheck,
  Rocket,
} from "lucide-react";
import { MASTER_PAGE_DATA } from "@/lib/data/legacy-modernization";
import { renderTitle } from "@/lib/utils";

const STEP_ICONS = [Search, Compass, Code2, ShieldCheck, Rocket];

export function MethodologyAndStrategies({ data, strategies: customStrategies, methodologyHeading, strategiesHeading }: { data?: any; strategies?: any[]; methodologyHeading?: string; strategiesHeading?: string }) {
  const strategies = customStrategies || MASTER_PAGE_DATA.strategies;

  const steps = [
    {
      num: "01",
      title: "Discover & Assess",
      subtitle: "Understand the Landscape",
      desc: "Comprehensive evaluation of application source code, architecture, dependencies, technical debt, and business-critical logic.",
      outcome: "Assessment & transformation roadmap.",
    },
    {
      num: "02",
      title: "Define Strategy",
      subtitle: "Choose the Right Approach (7 Rs)",
      desc: "Selecting the optimal modernization pathway—Rehost, Replatform, Refactor, Rearchitect, Rebuild, Replace, or Retain/Retire.",
      outcome: "Target architecture & phased migration milestones.",
    },
    {
      num: "03",
      title: "AI Transformation",
      subtitle: "Accelerate Application Engineering",
      desc: "Applying our Agentic Development Platform to refactor syntax, decouple monolithic services, and establish modern cloud APIs.",
      outcome: "Modernized components & microservices.",
    },
    {
      num: "04",
      title: "Intelligent Testing",
      subtitle: "Preserve Business Functionality",
      desc: "Executing automated behavioral parity testing, contract verification, load testing, and strict security compliance checks.",
      outcome: "Validated applications ready for cutover.",
    },
    {
      num: "05",
      title: "Deploy & Evolve",
      subtitle: "Enable Continuous Modernization",
      desc: "Cloud deployment, CI/CD integration, observability monitoring, and ongoing optimization for long-term maintainability.",
      outcome: "Live cloud systems designed for continuous evolution.",
    },
  ];

  return (
    <section id="approach" className="scroll-mt-16 bg-white py-10 lg:py-14">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-8 bg-[#F99D1C]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#F99D1C] uppercase">
              OUR METHODOLOGY
            </span>
          </div>
          <h2 className="display-font text-3xl font-bold leading-tight sm:leading-tight lg:leading-tight tracking-tight text-[#001A3D] sm:text-4xl lg:text-5xl">
            {renderTitle(
              methodologyHeading || "How Hutech Modernizes |Legacy Applications Using AI",
              "text-[#001A3D]",
              "text-[#0171c1]",
              "text-[#F99D1C]"
            )}
          </h2>
          <p className="mt-4 text-base text-gray-500 sm:text-lg">
            Hutech follows a structured modernization methodology combining enterprise architecture expertise, AI-assisted engineering, and modern software development practices.
          </p>
        </div>

        {/* Connected Milestone Pipeline (Replaces 5 Generic Cards) */}
        <div className="mt-10 lg:mt-12">
          {/* Desktop Connected Horizontal Pipeline Track */}
          <div className="relative hidden lg:block">
            {/* Horizontal Line connecting nodes */}
            <div className="absolute top-7 left-12 right-12 h-0.5 bg-gradient-to-r from-blue-100 via-[#0171c1] to-blue-100" />

            <div className="grid grid-cols-5 gap-6 relative z-10">
              {steps.map((st, i) => {
                const Icon = STEP_ICONS[i];

                return (
                  <div key={st.num} className="group flex flex-col items-center text-center">
                    {/* Numbered Milestone Node */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white border-2 border-[#0171c1] text-[#0171c1] shadow-md transition-all duration-300 group-hover:bg-[#0171c1] group-hover:text-white group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Step Stage Tag */}
                    <span className="mt-4 inline-block text-[11px] font-bold uppercase tracking-wider text-[#0171c1]">
                      Stage {st.num}
                    </span>

                    {/* Step Title & Subtitle */}
                    <h3 className="display-font mt-1 text-base font-bold text-[#001A3D]">
                      {st.title}
                    </h3>
                    <span className="mt-0.5 block text-xs font-semibold text-gray-400">
                      {st.subtitle}
                    </span>

                    {/* Description */}
                    <p className="mt-3 text-xs leading-relaxed text-gray-500">
                      {st.desc}
                    </p>

                    {/* Deliverable Pill */}
                    <div className="mt-4 w-full rounded-lg bg-gray-50 p-2.5 text-left border border-gray-100">
                      <span className="block text-[9px] font-bold uppercase tracking-wider text-gray-400">
                        Deliverable:
                      </span>
                      <span className="mt-0.5 block text-[11px] font-medium leading-tight text-[#001A3D]">
                        {st.outcome}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile / Tablet Vertical Connected Timeline Track */}
          <div className="relative lg:hidden">
            <div className="absolute top-4 bottom-4 left-6 w-0.5 bg-blue-100" />
            <div className="space-y-8 relative z-10">
              {steps.map((st, i) => {
                const Icon = STEP_ICONS[i];

                return (
                  <div key={st.num} className="flex items-start gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white border-2 border-[#0171c1] text-[#0171c1] shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 pb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0171c1]">
                        Stage {st.num} · {st.subtitle}
                      </span>
                      <h3 className="display-font mt-0.5 text-lg font-bold text-[#001A3D]">
                        {st.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-gray-500">
                        {st.desc}
                      </p>
                      <div className="mt-3 rounded-lg bg-gray-50 p-2.5 border border-gray-100 text-xs">
                        <b className="font-bold text-[#001A3D]">Deliverable: </b>
                        <span className="text-gray-600">{st.outcome}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* The 7 Rs Strategies Section */}
        <div className="mt-12 lg:mt-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-[2px] w-8 bg-[#F99D1C]" />
              <span className="text-xs font-bold tracking-[0.25em] text-[#F99D1C] uppercase">
                THE 7 RS FRAMEWORK
              </span>
            </div>
            <h3 className="display-font text-2xl font-bold leading-tight sm:leading-tight text-[#001A3D] sm:text-4xl">
              Choose the Right Legacy Modernization Strategy
            </h3>
            <p className="mt-3 text-base text-gray-500">
              Not every legacy application requires a complete rebuild. Hutech evaluates architectural health, business value, technical debt, and operational risks to recommend the right transformation path:
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-gray-100 bg-[#F8FAFC] text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  <tr>
                    <th className="px-6 py-4">Modernization Strategy</th>
                    <th className="px-6 py-4">Action Summary</th>
                    <th className="px-6 py-4">Ideal Business Scenario</th>
                    <th className="px-6 py-4">Execution Model</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-600">
                  {strategies.map((strat, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-[#001A3D]">
                        <span className="inline-block rounded-md bg-blue-50 px-2.5 py-1 text-xs font-bold text-[#0171c1]">
                          {strat.strategy}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-[#001A3D]">
                        {strat.description}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {strat.idealScenario}
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-gray-700">
                        {strat.action}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
