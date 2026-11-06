"use client";

import {
  Sparkles,
  Search,
  Code2,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  ArrowDown,
} from "lucide-react";
import { MASTER_PAGE_DATA } from "@/lib/data/legacy-modernization";
import { renderTitle } from "@/lib/utils";

export function AgenticPlatformSection({ data }: { data?: any }) {
  const platform = data || MASTER_PAGE_DATA.platform;

  return (
    <section id="agentic-platform" className="scroll-mt-16 bg-[#F8FAFC] py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Value Proposition */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#F99D1C]" />
              <span className="text-xs font-bold tracking-[0.25em] text-[#F99D1C] uppercase">
                {platform.tagline}
              </span>
            </div>

            <h2 className="display-font text-3xl font-bold tracking-tight text-[#001A3D] sm:text-4xl lg:text-5xl">
              {renderTitle(
                platform.title || "Accelerate Legacy Modernization with Hutech’s |Agentic Development Platform",
                "text-[#001A3D]",
                "text-[#0171c1]",
                "text-[#F99D1C]"
              )}
            </h2>

            <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
              {platform.description}
            </p>

            <ul className="mt-8 space-y-4">
              {platform.features.map((feat: any, idx: number) => (
                <li key={idx} className="flex items-start gap-3.5">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#0171c1]">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <strong className="display-font block text-sm font-bold text-[#001A3D]">
                      {feat.title}
                    </strong>
                    <span className="text-xs text-gray-500">
                      {feat.description}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Platform Flow Terminal Panel */}
          <div className="rounded-2xl border border-blue-950 bg-[#001A3D] p-6 text-white shadow-2xl sm:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-semibold text-gray-300">
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <span>HUTECH AGENTIC DEVELOPMENT PLATFORM</span>
              </span>
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/30" />
                <span className="h-2 w-2 rounded-full bg-white/40" />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {/* Step 1 */}
              <div className="flex items-center justify-between rounded-xl border border-blue-900 bg-[#00285a]/70 px-4 py-3.5 text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
                    <Search className="h-4 w-4" />
                  </div>
                  <span>Legacy Application Discovery & AST Analysis</span>
                </div>
                <span className="rounded bg-cyan-400/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                  ANALYZE
                </span>
              </div>

              <div className="flex justify-center text-cyan-400">
                <ArrowDown className="h-4 w-4 animate-bounce" />
              </div>

              {/* Step 2 */}
              <div className="flex items-center justify-between rounded-xl border border-blue-900 bg-[#00285a]/70 px-4 py-3.5 text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-400/10 text-blue-400">
                    <Code2 className="h-4 w-4" />
                  </div>
                  <span>AI-Assisted Code Refactoring & Logic Extraction</span>
                </div>
                <span className="rounded bg-blue-400/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-300">
                  MODERNIZE
                </span>
              </div>

              <div className="flex justify-center text-cyan-400">
                <ArrowDown className="h-4 w-4 animate-bounce" />
              </div>

              {/* Step 3 */}
              <div className="flex items-center justify-between rounded-xl border border-blue-900 bg-[#00285a]/70 px-4 py-3.5 text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-400/10 text-sky-400">
                    <Cpu className="h-4 w-4" />
                  </div>
                  <span>Cloud-Native Architecture & API Enablement</span>
                </div>
                <span className="rounded bg-sky-400/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-300">
                  ENGINEER
                </span>
              </div>

              <div className="flex justify-center text-cyan-400">
                <ArrowDown className="h-4 w-4 animate-bounce" />
              </div>

              {/* Step 4 */}
              <div className="flex items-center justify-between rounded-xl border border-blue-900 bg-[#00285a]/70 px-4 py-3.5 text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <span>Automated Parity Testing & Human Validation</span>
                </div>
                <span className="rounded bg-cyan-400/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                  VALIDATE
                </span>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-xs text-gray-300">
              <strong className="text-cyan-300">Human-Governed Delivery:</strong>{" "}
              AI agents autonomously process AST syntax conversions and generate parity test suites, while senior enterprise software architects validate all architectural decisions, compliance, and security.
            </div>
          </div>
        </div>

        {/* Comparison Table: Traditional vs Agentic Modernization (7 Rows from docx) */}
        <div className="mt-20 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 bg-gray-50/70 px-8 py-5">
            <h3 className="display-font text-lg font-bold text-[#001A3D]">
              Why Agentic AI Matters: Traditional Modernization vs. AI-Assisted Modernization
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Direct comparison of software engineering activities across the modernization lifecycle.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-gray-100 bg-gray-50/40 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-6 py-4">Modernization Dimension</th>
                  <th className="px-6 py-4 text-gray-600">Traditional Modernization</th>
                  <th className="px-6 py-4 text-[#0171c1]">Hutech Agentic AI Modernization</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                {platform.comparisonTable.map((row: any, i: number) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-[#001A3D]">
                      {row.dimension}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {row.traditional}
                    </td>
                    <td className="px-6 py-4 font-medium text-[#001A3D]">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0171c1]" />
                        <span>{row.agentic}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
