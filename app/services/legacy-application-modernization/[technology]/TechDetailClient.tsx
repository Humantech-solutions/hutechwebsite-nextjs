"use client";

import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  Layers,
  ArrowRight,
  Wrench,
  MoveRight,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ModernizationFaq } from "@/components/modernization/ModernizationFaq";
import { ModernizationCTA } from "@/components/modernization/ModernizationCTA";
import {
  LegacyTechDetail,
  LEGACY_TECHNOLOGY_PAGES,
} from "@/lib/data/legacy-modernization";
import { getTechVectorLogo } from "@/components/modernization/TechLogos";
import { renderTitle } from "@/lib/utils";

export default function TechDetailClient({ tech }: { tech: LegacyTechDetail }) {
  // Other technologies for cross-navigation (5 stacks)
  const otherTechs = Object.values(LEGACY_TECHNOLOGY_PAGES).filter(
    (t) => t.slug !== tech.slug
  );

  return (
    <div className="flex flex-col overflow-hidden bg-white text-[#101c35]">
      {/* Light breadcrumb bar */}
      <Breadcrumbs variant="light" />

      {/* Hero Section - Matching Service Detail Theme */}
      <section className="relative flex min-h-[420px] items-center overflow-hidden bg-[#001A3D] py-16 text-white md:h-[450px] md:py-0">
        {/* Subtle Background Lighting */}
        <div
          className="pointer-events-none absolute -right-24 -top-20 h-[500px] w-[500px] rounded-full opacity-35 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(1, 113, 193, 0.7) 0%, rgba(0, 26, 61, 0) 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute -left-20 bottom-0 h-[350px] w-[350px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(53, 216, 235, 0.4) 0%, rgba(0, 26, 61, 0) 70%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-20">
          <div className="max-w-4xl">
            {/* Tagline / Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[1px] w-12 bg-[#F99D1C]"></span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#F99D1C] uppercase">
                {tech.badge}
              </span>
            </div>

            {/* Inner Page Title - Theme Proportions */}
            <h1 className="display-font mb-6 text-3xl font-semibold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl">
              {renderTitle(
                tech.name,
                "text-white",
                "text-[#F99D1C]",
                "text-[#0171c1]"
              )}
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl text-base font-medium leading-relaxed text-gray-300 md:text-lg">
              {tech.heroSubtitle}
            </p>

            {/* Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-sm bg-[#0171c1] px-6 py-3 text-xs font-bold tracking-wider text-white uppercase shadow-md transition-all hover:bg-[#005bb5]"
              >
                Schedule {tech.shortName} Assessment
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#architecture-blueprint"
                className="inline-flex items-center gap-2 rounded-sm border border-white/20 bg-white/5 px-6 py-3 text-xs font-bold tracking-wider text-white uppercase backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
              >
                Architecture Blueprint ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Intro & Key Metrics Section - Executive Ledger */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* Left Column: Heading, Context & Aligned Stats */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="display-font text-3xl font-semibold leading-tight text-[#001A3D] md:text-4xl">
                  {renderTitle(
                    `Transforming Legacy ${tech.shortName} into Cloud-Native Agility`,
                    "text-[#001A3D]",
                    "text-[#0171c1]",
                    "text-[#F99D1C]"
                  )}
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
              </div>

              <div className="space-y-4">
                <p className="text-base font-medium leading-relaxed text-gray-500 md:text-lg">
                  {tech.heroTitle}. Hutech combines automated code intelligence,
                  deterministic AST parsers, and experienced enterprise
                  engineering to transition legacy systems into modular,
                  high-performance cloud architectures.
                </p>
                <p className="text-sm leading-relaxed text-gray-500">
                  Our structured approach guarantees 100% preservation of
                  mission-critical business logic while eliminating server
                  licensing overhead, security vulnerabilities, and deployment
                  bottlenecks.
                </p>
              </div>

              {/* Theme Aligned Stats Bar with Vertical Dividers */}
              <div className="grid grid-cols-2 gap-6 pt-4 sm:grid-cols-4 sm:gap-4">
                {tech.keyStats.map((stat, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="display-font text-2xl font-bold text-[#001A3D] sm:text-3xl">
                      {stat.value}
                    </p>
                    <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive Migration Console (Replaces generic box card) */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-[#F8FAFC] shadow-lg">
              <div className="bg-[#001A3D] p-6 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white">
                    {getTechVectorLogo(tech.slug, "w-5 h-5")}
                  </div>
                  <div>
                    <h3 className="display-font text-base font-bold text-white">
                      {tech.shortName} Modernization Scope
                    </h3>
                    <p className="text-[11px] text-gray-300">
                      Standardized Architecture Roadmap
                    </p>
                  </div>
                </div>
                <span className="rounded bg-blue-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                  Phased Cutover
                </span>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                {/* From Legacy Box */}
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <span className="block text-[10px] font-bold tracking-wider text-gray-500 uppercase">
                    From Legacy Runtimes:
                  </span>
                  <p className="mt-1 text-xs font-semibold text-gray-800 leading-relaxed">
                    {tech.legacyStack.slice(0, 4).join(" · ")}
                  </p>
                </div>

                {/* Arrow Indicator */}
                <div className="flex justify-center text-[#0171c1]">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    ↓ Modernized With Hutech Platform ↓
                  </span>
                </div>

                {/* To Target Box */}
                <div className="rounded-lg border border-blue-100 bg-blue-50/70 p-4">
                  <span className="block text-[10px] font-bold tracking-wider text-[#0171c1] uppercase">
                    To Target Modern Cloud Architecture:
                  </span>
                  <p className="mt-1 text-xs font-semibold text-[#001A3D] leading-relaxed">
                    {tech.targetStack.slice(0, 4).join(" · ")}
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#0171c1] py-3 text-xs font-bold tracking-wider text-white uppercase shadow-md transition-all hover:bg-[#005bb5]"
                  >
                    Request Modernization Scope
                    <MoveRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Bottlenecks & Pain Points - Structured Risk Ledger (Replaces 4 Cards) */}
      <section className="bg-gray-50 py-20 lg:py-24 border-t border-gray-100">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-16 space-y-4 text-center">
            <div className="mb-2 flex items-center justify-center gap-3">
              <span className="h-[2px] w-8 bg-[#F99D1C]"></span>
              <span className="text-xs font-bold tracking-[0.25em] text-[#F99D1C] uppercase">
                ARCHITECTURAL CHALLENGES
              </span>
            </div>
            <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
              {renderTitle(
                `Why Staying on Legacy ${tech.shortName} Threatens Growth`,
                "text-[#001A3D]",
                "text-[#0171c1]",
                "text-[#F99D1C]"
              )}
            </h2>
            <div className="mx-auto h-1 w-20 bg-[#0171c1]"></div>
            <p className="mx-auto max-w-4xl text-base font-medium leading-relaxed text-gray-500 md:text-lg">
              Aging runtime dependencies, deprecated language features, and
              accumulating technical debt create severe operational
              liabilities, licensing costs, and critical vulnerabilities.
            </p>
          </div>

          {/* Clean Borderless Risk Ledger (Zero Cards) */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm divide-y divide-gray-100">
            {tech.challenges.map((c, i) => (
              <div
                key={i}
                className="group p-6 sm:p-8 transition-colors hover:bg-[#F8FAFC]"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <span className="display-font text-xl font-bold text-gray-300 group-hover:text-[#0171c1] transition-colors">
                      0{i + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-[#0171c1]" />
                        <h3 className="display-font text-lg font-bold text-[#001A3D]">
                          {c.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-gray-500 max-w-3xl">
                        {c.description}
                      </p>
                    </div>
                  </div>

                  {/* Impact Callout Pill */}
                  <div className="shrink-0 sm:w-72 rounded-lg bg-gray-50 border border-gray-200 p-3 text-xs">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#0171c1]">
                      Enterprise Liability:
                    </span>
                    <span className="mt-0.5 block font-medium text-gray-700 leading-tight">
                      {c.impact}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Comparison: Unified Dual-Pane Blueprint (Replaces 2 Separate Cards) */}
      <section
        id="architecture-blueprint"
        className="scroll-mt-16 bg-white py-20 lg:py-24 border-t border-gray-100"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-16 space-y-4 text-center">
            <div className="mb-2 flex items-center justify-center gap-3">
              <span className="h-[2px] w-8 bg-[#F99D1C]"></span>
              <span className="text-xs font-bold tracking-[0.25em] text-[#F99D1C] uppercase">
                ARCHITECTURAL TRANSFORMATION
              </span>
            </div>
            <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
              {renderTitle(
                "Legacy Monolith vs. Cloud-Native Target",
                "text-[#001A3D]",
                "text-[#0171c1]",
                "text-[#F99D1C]"
              )}
            </h2>
            <div className="mx-auto h-1 w-20 bg-[#0171c1]"></div>
            <p className="mx-auto max-w-4xl text-base font-medium leading-relaxed text-gray-500 md:text-lg">
              A side-by-side architectural blueprint contrasting your current legacy state against Hutech’s target cloud-native engineering blueprint:
            </p>
          </div>

          {/* Unified Dual-Pane Architecture Blueprint */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">
            <div className="grid grid-cols-1 divide-y divide-gray-200 lg:grid-cols-2 lg:divide-y-0 lg:divide-x">
              {/* Left Pane: Current Legacy Monolith */}
              <div className="p-8 sm:p-10 flex flex-col justify-between bg-gray-50/50">
                <div>
                  <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-gray-200/80 px-3.5 py-1.5 text-xs font-bold text-gray-700">
                      <Layers className="h-4 w-4 text-gray-500" />
                      <span>{tech.architectureBefore.title}</span>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                      CURRENT STATE
                    </span>
                  </div>

                  <ul className="mt-6 space-y-3.5 text-sm text-gray-600">
                    {tech.architectureBefore.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-400 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Legacy Stacks Container */}
                <div className="mt-8 rounded-xl border border-gray-200 bg-white p-4">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Legacy Frameworks & Runtimes:
                  </span>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {tech.legacyStack.map((stk, idx) => (
                      <span
                        key={idx}
                        className="rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700"
                      >
                        {stk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Pane: Target Cloud-Native Architecture */}
              <div className="p-8 sm:p-10 flex flex-col justify-between bg-blue-50/20">
                <div>
                  <div className="flex items-center justify-between border-b border-blue-100 pb-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-bold text-[#0171c1]">
                      <CheckCircle2 className="h-4 w-4 text-[#0171c1]" />
                      <span>{tech.architectureAfter.title}</span>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0171c1]">
                      TARGET STATE
                    </span>
                  </div>

                  <ul className="mt-6 space-y-3.5 text-sm text-gray-700">
                    {tech.architectureAfter.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0171c1]" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Target Modern Stack Container */}
                <div className="mt-8 rounded-xl border border-blue-100 bg-white p-4">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#0171c1]">
                    Target Modern Ecosystem & Cloud Services:
                  </span>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {tech.targetStack.map((stk, idx) => (
                      <span
                        key={idx}
                        className="rounded-md border border-blue-200 bg-blue-50/50 px-2.5 py-1 text-xs font-medium text-[#001A3D]"
                      >
                        {stk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Playbook - Connected Vertical Engineering Timeline (Replaces 5 Cards) */}
      <section
        id="transformation-playbook"
        className="scroll-mt-16 bg-gray-50 py-20 lg:py-24 border-t border-gray-100"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-16 space-y-4 text-center">
            <div className="mb-2 flex items-center justify-center gap-3">
              <span className="h-[2px] w-8 bg-[#F99D1C]"></span>
              <span className="text-xs font-bold tracking-[0.25em] text-[#F99D1C] uppercase">
                MIGRATION BLUEPRINT
              </span>
            </div>
            <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
              {renderTitle(
                `5-Phase ${tech.shortName} Modernization Playbook`,
                "text-[#001A3D]",
                "text-[#0171c1]",
                "text-[#F99D1C]"
              )}
            </h2>
            <div className="mx-auto h-1 w-20 bg-[#0171c1]"></div>
            <p className="mx-auto max-w-4xl text-base font-medium leading-relaxed text-gray-500 md:text-lg">
              How Hutech applies Agentic AI automation and experienced software engineering to modernize your {tech.shortName} application safely without breaking business logic:
            </p>
          </div>

          {/* Connected Vertical Timeline Stream */}
          <div className="relative max-w-5xl mx-auto">
            {/* Continuous Vertical Track Line */}
            <div className="absolute top-6 bottom-6 left-6 md:left-8 w-0.5 bg-blue-200" />

            <div className="space-y-8 relative z-10">
              {tech.transformationPlaybook.map((phase, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-6 md:gap-8 group"
                >
                  {/* Numbered Milestone Node */}
                  <div className="flex h-12 w-12 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-2xl bg-white border-2 border-[#0171c1] text-sm md:text-base font-bold text-[#001A3D] shadow-md group-hover:bg-[#0171c1] group-hover:text-white transition-colors">
                    0{idx + 1}
                  </div>

                  {/* Phase Details (Border-b divider instead of enclosing card) */}
                  <div className="flex-1 pb-8 border-b border-gray-200 last:border-b-0">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#0171c1]">
                          {phase.step}
                        </span>
                        <h3 className="display-font mt-1 text-xl font-bold text-[#001A3D]">
                          {phase.title}
                        </h3>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">
                          {phase.description}
                        </p>
                      </div>

                      {/* Tool Callout Pill */}
                      <div className="shrink-0 rounded-lg bg-blue-50/70 border border-blue-100 p-3.5 text-xs lg:w-64">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#0171c1]">
                          <Wrench className="h-3.5 w-3.5 text-[#0171c1]" />
                          <span>Accelerating Tools:</span>
                        </div>
                        <span className="mt-1 block font-semibold text-[#001A3D] leading-tight">
                          {phase.tools}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Business Benefits & Measurable ROI - Executive Metric Wall (Replaces 4 Cards) */}
      <section className="bg-[#001A3D] py-20 text-white lg:py-24 overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-16 space-y-4 text-center">
            <div className="mb-2 flex items-center justify-center gap-3">
              <span className="h-[2px] w-8 bg-[#F99D1C]"></span>
              <span className="text-xs font-bold tracking-[0.25em] text-[#F99D1C] uppercase">
                MEASURABLE ENTERPRISE OUTCOMES
              </span>
            </div>
            <h2 className="display-font text-3xl font-semibold text-white md:text-5xl">
              {renderTitle(
                `Concrete ROI from Modernizing ${tech.shortName}`,
                "text-white",
                "text-[#F99D1C]",
                "text-[#0171c1]"
              )}
            </h2>
            <div className="mx-auto h-1 w-20 bg-[#0171c1]"></div>
            <p className="mx-auto max-w-4xl text-base font-medium leading-relaxed text-gray-400 md:text-lg">
              Proven business impact achieved by migrating away from legacy constraints:
            </p>
          </div>

          {/* Borderless Executive ROI Grid with Clean Vertical Dividers */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md overflow-hidden">
            <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
              {tech.businessBenefits.map((b, i) => (
                <div
                  key={i}
                  className="p-8 flex flex-col justify-between transition-colors hover:bg-white/[0.02]"
                >
                  <div>
                    <span className="display-font block text-3xl font-bold text-cyan-300">
                      {b.metric}
                    </span>
                    <h3 className="display-font mt-3 text-lg font-bold text-white">
                      {b.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-gray-300">
                      {b.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-1.5 text-[11px] font-semibold text-[#F99D1C]">
                    <span>Verified Value Driver</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Specific FAQs */}
      <ModernizationFaq items={tech.faqs} />

      {/* Cross Navigation: Horizontal Tech Stack Ribbon (Replaces 5 Cards) */}
      <section className="border-t border-gray-100 bg-gray-50 py-20 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <span className="h-[2px] w-8 bg-[#0171c1]"></span>
                <span className="text-xs font-bold tracking-[0.25em] text-[#0171c1] uppercase">
                  ENTERPRISE MODERNIZATION MATRIX
                </span>
              </div>
              <h3 className="display-font text-2xl font-bold text-[#001A3D] sm:text-3xl">
                Explore Other Legacy Modernization Stacks
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-gray-500">
                Hutech delivers dedicated engineering blueprints, automated AST parsers, and Agentic AI workflows for all major enterprise legacy platforms:
              </p>
            </div>
            <Link
              href="/services/legacy-application-modernization"
              className="inline-flex shrink-0 items-center gap-2 rounded-sm border border-[#0171c1] px-5 py-2.5 text-xs font-bold tracking-wider text-[#0171c1] uppercase transition-all hover:bg-[#0171c1] hover:text-white"
            >
              <span>View All Stacks Hub</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Sleek Horizontal Stack Ribbon */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {otherTechs.map((ot) => (
              <Link
                key={ot.slug}
                href={`/services/legacy-application-modernization/${ot.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-[#0171c1] hover:shadow-md cursor-pointer"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-[#0171c1] group-hover:bg-[#0171c1] group-hover:text-white transition-colors">
                  {getTechVectorLogo(ot.slug, "w-5 h-5")}
                </div>
                <div>
                  <span className="display-font block text-xs font-bold text-[#001A3D] group-hover:text-[#0171c1] transition-colors">
                    {ot.shortName}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    Modernization →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <ModernizationCTA
        buttonText={`Schedule ${tech.shortName} Assessment`}
      />
    </div>
  );
}
