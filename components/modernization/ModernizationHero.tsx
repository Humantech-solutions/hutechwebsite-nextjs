"use client";

import Link from "next/link";
import {
  Sparkles,
  Code2,
  Cpu,
  Cloud,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { MASTER_PAGE_DATA } from "@/lib/data/legacy-modernization";
import { renderTitle } from "@/lib/utils";

export function ModernizationHero({ data }: { data?: any }) {
  const hero = data || MASTER_PAGE_DATA.hero;

  return (
    <section className="relative overflow-hidden bg-[#001A3D] py-16 text-white md:py-24 lg:py-28">
      {/* Background radial ambient lighting */}
      <div
        className="pointer-events-none absolute -right-36 -top-24 h-[650px] w-[750px] rounded-full opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(1, 113, 193, 0.7) 0%, rgba(0, 26, 61, 0) 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -left-28 bottom-0 h-[450px] w-[450px] rounded-full opacity-25 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(53, 216, 235, 0.4) 0%, rgba(0, 26, 61, 0) 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left Column: Copy & Actions */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#F99D1C]" />
              <span className="text-xs font-bold tracking-[0.25em] text-[#F99D1C] uppercase">
                {hero.eyebrow}
              </span>
            </div>

            <h1 className="display-font text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[56px]">
              {renderTitle(
                hero.headline || `${hero.headlineStart || "Modernize legacy."} |${hero.headlineGrad || "Accelerate what's next."}`,
                "text-white",
                "text-[#0171c1]",
                "text-[#F99D1C]"
              )}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
              {hero.description}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0171c1] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#005bb5] hover:shadow-lg"
              >
                Start Modernization Journey
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="#technology-stacks"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
              >
                Explore Legacy Stacks
                <ChevronDown className="h-4 w-4" />
              </a>

              <a
                href="#agentic-platform"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#F99D1C] transition-colors hover:text-white"
              >
                <span>Discover Agentic AI</span>
                <span>→</span>
              </a>
            </div>

            {/* Trust Checks - Balanced 2x2 Grid */}
            <div className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3">
              {hero.checks.map((chk: string, i: number) => (
                <div key={i} className="flex items-center gap-2.5 text-xs font-medium text-gray-300">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0171c1]/20 text-[#0171c1]">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <span>{chk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: High-Tech Orbit Visualization */}
          <div className="relative flex h-[380px] w-full items-center justify-center sm:h-[440px]">
            {/* Outer Static Orbit */}
            <div className="absolute h-[340px] w-[340px] rounded-full border border-blue-500/20 shadow-[0_0_80px_rgba(1,113,193,0.15)] sm:h-[390px] sm:w-[390px]" />

            {/* Inner Dashed Orbit */}
            <div className="absolute h-[250px] w-[250px] animate-[spin_50s_linear_infinite] rounded-full border border-dashed border-cyan-400/30 sm:h-[290px] sm:w-[290px]" />

            {/* Center Agentic AI Node */}
            <div className="relative z-10 flex h-[160px] w-[160px] flex-col items-center justify-center rounded-2xl border border-blue-400/30 bg-gradient-to-br from-[#00285a] to-[#001430] p-4 text-center shadow-[0_0_60px_rgba(1,113,193,0.45)] sm:h-[180px] sm:w-[180px]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-[#0171c1]">
                <Sparkles className="h-7 w-7 text-cyan-300 animate-pulse" />
              </div>
              <b className="mt-3 text-xs font-bold tracking-[2px] text-white uppercase sm:text-sm">
                AGENTIC AI
              </b>
              <span className="mt-0.5 text-[10px] text-cyan-200/80">Platform Orchestrator</span>
            </div>

            {/* Floating Pill 1: Top Left */}
            <div className="absolute -left-2 top-4 z-20 flex items-center gap-3 rounded-xl border border-white/10 bg-[#001430]/90 px-3.5 py-2.5 shadow-xl backdrop-blur-md sm:top-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-cyan-300">
                <Code2 className="h-4 w-4" />
              </div>
              <div className="text-left text-xs">
                <strong className="block font-bold text-white">Legacy Code Analysis</strong>
                <span className="text-[10px] text-gray-400">AST Discovery · Rules</span>
              </div>
            </div>

            {/* Floating Pill 2: Top Right */}
            <div className="absolute -right-2 top-14 z-20 flex items-center gap-3 rounded-xl border border-white/10 bg-[#001430]/90 px-3.5 py-2.5 shadow-xl backdrop-blur-md sm:top-16">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-blue-300">
                <Cpu className="h-4 w-4" />
              </div>
              <div className="text-left text-xs">
                <strong className="block font-bold text-white">Intelligent Refactoring</strong>
                <span className="text-[10px] text-gray-400">Transform · Optimize</span>
              </div>
            </div>

            {/* Floating Pill 3: Bottom Left */}
            <div className="absolute -left-3 bottom-10 z-20 flex items-center gap-3 rounded-xl border border-white/10 bg-[#001430]/90 px-3.5 py-2.5 shadow-xl backdrop-blur-md">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-sky-300">
                <Cloud className="h-4 w-4" />
              </div>
              <div className="text-left text-xs">
                <strong className="block font-bold text-white">Cloud Modernization</strong>
                <span className="text-[10px] text-gray-400">Docker · Microservices</span>
              </div>
            </div>

            {/* Floating Pill 4: Bottom Right */}
            <div className="absolute -right-1 bottom-4 z-20 flex items-center gap-3 rounded-xl border border-white/10 bg-[#001430]/90 px-3.5 py-2.5 shadow-xl backdrop-blur-md">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-cyan-300">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div className="text-left text-xs">
                <strong className="block font-bold text-white">AI-Assisted Testing</strong>
                <span className="text-[10px] text-gray-400">Parity · Zero Regression</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Stats Banner - Modern, Proportional & Theme-Aligned */}
        <div className="mx-auto mt-12 max-w-5xl rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.05] via-white/[0.02] to-white/[0.05] p-1.5 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-2 divide-y divide-white/10 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
            {hero.stats.map((st: any, i: number) => (
              <div
                key={i}
                className="px-6 py-4 text-center sm:text-left transition-colors duration-200 hover:bg-white/[0.02]"
              >
                <strong className="display-font block text-base font-bold tracking-tight text-white sm:text-lg lg:text-xl">
                  {st.strong}
                </strong>
                <span className="mt-1 block text-xs font-medium text-gray-300/90 sm:text-[13px] leading-snug">
                  {st.span}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
