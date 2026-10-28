"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DownloadFormModal } from "@/components/DownloadFormModal";
import {
  ArrowRight,
  Play,
  Check,
  Plus,
  Minus,
  Shield,
  Activity,
} from "lucide-react";

export interface ModernProductData {
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    titleItalic: string;
    description: string;
    primaryCtaText: string;
    primaryCtaUrl: string;
    secondaryCtaText: string;
    ratingScore: string;
    ratingText: string;
    dashboard: {
      velocity: string;
      velocityDelta: string;
      activeTasks: string;
      activeTasksDelta: string;
      timeSavedWeekly: string;
      activeTaskTitle: string;
      activeTaskSubtitle: string;
    };
  };
  overview: {
    sectionTag: string;
    sectionTitle: string;
    headlineLine1: string;
    headlineItalic: string;
    description: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
  };
  features: {
    sectionTag: string;
    sectionTitle: string;
    headlinePrefix: string;
    headlineItalic: string;
    description: string;
    cards: Array<{
      number: string;
      title: string;
      description: string;
      iconType: "concentric" | "diamond" | "square" | "rings";
    }>;
  };
  benefits: {
    sectionTag: string;
    sectionTitle: string;
    headlineLine1: string;
    headlineItalic: string;
    description: string;
    donutStat: string;
    donutLabel: string;
    card1Title: string;
    card1Description: string;
    card2Title: string;
    card2Description: string;
    card2Stat: string;
    card2StatLabel: string;
    card3Title: string;
    card3Description: string;
  };
  howItWorks: {
    sectionTag: string;
    sectionTitle: string;
    headlinePrefix: string;
    headlineItalic: string;
    description: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
      activeStep: 1 | 2 | 3;
    }>;
  };
  useCases: {
    sectionTag: string;
    sectionTitle: string;
    headlinePrefix: string;
    headlineItalic: string;
    cards: Array<{
      number: string;
      title: string;
      description: string;
      pills: string[];
    }>;
  };
  industries: {
    sectionTag: string;
    sectionTitle: string;
    headlinePrefix: string;
    headlineItalic: string;
    description: string;
    items: Array<{
      number: string;
      name: string;
      tagline: string;
      description?: string;
    }>;
  };
  technicalSpecs: {
    sectionTag: string;
    sectionTitle: string;
    headlinePrefix: string;
    headlineItalic: string;
    specs: Array<{
      number: string;
      category: string;
      details: string;
      metric: string;
    }>;
  };
  integrations: {
    sectionTag: string;
    sectionTitle: string;
    headlinePrefix: string;
    headlineItalic: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
  };
  security: {
    sectionTag: string;
    sectionTitle: string;
    headlinePrefix: string;
    headlineItalic: string;
    description: string;
    pillars: Array<{
      number: string;
      title: string;
      description: string;
    }>;
    badges: string[];
  };
  faqs: {
    sectionTag: string;
    sectionTitle: string;
    headlinePrefix: string;
    headlineItalic: string;
    description: string;
    contactText: string;
    contactUrl: string;
    items: Array<{
      number: string;
      question: string;
      answer: string;
    }>;
  };
  ctaBanner: {
    tag: string;
    headlineLine1: string;
    headlineLine2: string;
    headlineItalic: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
  };
}

const FALLBACK_INDUSTRY_DETAILS: Record<string, string> = {
  "01":
    "Automate compliance controls, safeguard financial transactions, and maintain immutable audit trails across core banking, wealth management, and payment rails.",
  "02":
    "Protect sensitive patient health information (PHI) while enabling interoperable EHR data exchange and compliant clinical workflows across care networks.",
  "03":
    "Ship faster with standardized microservice deployment guardrails, multi-region auto-scaling, and deep observability across your distributed stack.",
  "04":
    "Streamline multi-client delivery workflows, automate resource scheduling, and ensure total visibility into delivery milestones and project profitability.",
  "05":
    "Maintain ultra-responsive checkout experiences during peak traffic surges, sync real-time omnichannel inventory, and personalize customer journeys.",
};

export function ModernProductTemplate({ data }: { data: ModernProductData }) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [hoveredIndustryIndex, setHoveredIndustryIndex] = useState<number | null>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = -70;
      const top = el.getBoundingClientRect().top + window.pageYOffset + offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col bg-white text-[#001A3D] font-sans antialiased selection:bg-[#0171c1] selection:text-white">

      {/* ── Breadcrumbs (Standard Light Variant across entire website) ──────── */}
      <Breadcrumbs variant="light" />

      {/* ========================================================================= */}
      {/* 1. HERO BANNER WITH RICH BRAND GRADIENT */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#00132B] via-[#002B5B] to-[#000E20] text-white pt-12 pb-24 md:pt-16 md:pb-28 border-b border-white/10">

        {/* Luminous multi-color ambient gradient glows */}
        <div className="pointer-events-none absolute -top-40 right-1/4 h-[550px] w-[550px] rounded-full bg-[#0171c1]/35 blur-[140px]" />
        <div className="pointer-events-none absolute -bottom-24 left-10 h-[450px] w-[450px] rounded-full bg-[#F99D1C]/25 blur-[130px]" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[650px] w-[850px] rounded-full bg-[#0171c1]/15 blur-[160px]" />

        {/* Engineering dot/grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Hero Left Content */}
            <div className="lg:col-span-6 space-y-8">

              {/* Category Eyebrow Pill */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 shadow-md backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#F99D1C] animate-pulse" />
                <span className="text-[11px] font-bold tracking-[0.25em] text-[#FFAF2B] uppercase">
                  {data.hero.badge}
                </span>
              </div>

              {/* Headline */}
              <h1 className="display-font text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-white">
                {data.hero.titleLine1} <br />
                {data.hero.titleLine2}{" "}
                <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#0171c1] via-[#38bdf8] to-[#0171c1]">
                  {data.hero.titleItalic}
                </span>
              </h1>

              {/* Subtitle / Lead Description */}
              <p className="max-w-xl text-base md:text-lg leading-relaxed font-normal text-gray-300">
                {data.hero.description}
              </p>

              {/* Action Buttons: 1 line on mobile, standard on desktop */}
              <div className="flex flex-row items-center gap-2 sm:gap-4 pt-2 w-full">
                <Link
                  href={data.hero.primaryCtaUrl}
                  className="group flex-1 sm:flex-none inline-flex items-center justify-center gap-1 sm:gap-3 rounded-sm bg-[#0171c1] px-2 sm:px-8 py-3.5 sm:py-4 text-[10px] sm:text-xs font-bold tracking-tight sm:tracking-wider text-white uppercase shadow-xl shadow-[#0171c1]/30 transition-all duration-300 hover:bg-[#005fa3] hover:shadow-2xl hover:scale-[1.02] active:scale-95 whitespace-nowrap text-center"
                >
                  <span>{data.hero.primaryCtaText}</span>
                  <ArrowRight size={13} className="shrink-0 transition-transform group-hover:translate-x-1 hidden xs:inline-block sm:inline-block" />
                </Link>

                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="group flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-3 rounded-sm border border-white/20 bg-white/5 px-2 sm:px-8 py-3.5 sm:py-4 text-[10px] sm:text-xs font-bold tracking-tight sm:tracking-wider text-white uppercase backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white whitespace-nowrap text-center"
                >
                  <span className="flex h-4 w-4 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-full bg-[#0171c1] text-white transition-colors">
                    <Play size={7} className="fill-current ml-0.5" />
                  </span>
                  <span>{data.hero.secondaryCtaText}</span>
                </button>
              </div>


            </div>

            {/* Hero Right Dashboard Preview in Frosted Glass Palette */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-[540px] rounded-2xl border border-white/15 bg-white/[0.08] p-7 shadow-2xl shadow-black/50 backdrop-blur-xl text-white">

                {/* Floating Pill Top Right */}
                <div className="absolute -top-3.5 -right-2 sm:-right-4 rounded-full border border-white/15 bg-[#001A3D]/90 px-4 py-1.5 shadow-lg backdrop-blur-md flex items-center gap-2 text-[11px] font-bold text-white">
                  <span className="text-[#F99D1C]">⚡</span>
                  {data.hero.dashboard.timeSavedWeekly}
                </div>

                {/* Dashboard Card Header */}
                <div className="flex items-center justify-between pb-5 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="h-6 w-6 rounded-sm bg-[#0171c1]/20 border border-[#0171c1]/40 flex items-center justify-center text-[#0171c1]">
                      <Activity size={13} />
                    </div>
                    <span className="display-font text-xs font-bold text-white">Operations overview</span>
                  </div>
                  <span className="rounded-full bg-[#0171c1]/20 border border-[#0171c1]/40 px-2.5 py-0.5 text-[10px] font-extrabold text-[#0171c1] uppercase tracking-wider">
                    LIVE
                  </span>
                </div>

                {/* 2 Stat Boxes */}
                <div className="grid grid-cols-2 gap-4 py-5">
                  <div className="space-y-1">
                    <div className="text-[11px] font-semibold text-gray-400">Workflow velocity</div>
                    <div className="flex items-baseline gap-2">
                      <span className="display-font text-2xl font-bold text-white">{data.hero.dashboard.velocity}</span>
                      <span className="text-[11px] font-bold text-[#F99D1C]">{data.hero.dashboard.velocityDelta}</span>
                    </div>
                  </div>
                  <div className="space-y-1 border-l border-white/10 pl-4">
                    <div className="text-[11px] font-semibold text-gray-400">Active tasks</div>
                    <div className="flex items-baseline gap-2">
                      <span className="display-font text-2xl font-bold text-white">{data.hero.dashboard.activeTasks}</span>
                      <span className="text-[11px] font-bold text-[#F99D1C]">{data.hero.dashboard.activeTasksDelta}</span>
                    </div>
                  </div>
                </div>

                {/* SVG Trend Line in Hutech Cyan/Blue */}
                <div className="relative pt-2 pb-5">
                  <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                    <span>Workflow velocity</span>
                    <span>Last 30 days</span>
                  </div>
                  <svg className="w-full h-24 overflow-visible" viewBox="0 0 400 90" fill="none">
                    <defs>
                      <linearGradient id="hutechChartGradHero" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0171c1" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#0171c1" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 65 Q 40 45, 80 55 T 160 40 T 240 50 T 320 25 T 400 15 L 400 90 L 0 90 Z"
                      fill="url(#hutechChartGradHero)"
                    />
                    <path
                      d="M0 65 Q 40 45, 80 55 T 160 40 T 240 50 T 320 25 T 400 15"
                      stroke="#0171c1"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="320" cy="25" r="4" fill="#001A3D" stroke="#0171c1" strokeWidth="2.5" />
                  </svg>
                  <div className="flex justify-between text-[10px] text-gray-400 mt-2">
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                      Customer sync completed 4m ago
                    </span>
                    <span className="font-semibold text-[#0171c1]">On track</span>
                  </div>
                </div>

                {/* Floating Bottom Left Pill */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0171c1] text-white">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <div>
                      <div className="text-[11px] font-bold text-white">{data.hero.dashboard.activeTaskTitle}</div>
                      <div className="text-[10px] text-gray-400">{data.hero.dashboard.activeTaskSubtitle}</div>
                    </div>
                  </div>
                  <span className="rounded-sm bg-white/10 px-2 py-0.5 text-[9px] font-bold text-gray-300">
                    Auto
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: PRODUCT OVERVIEW */}
      {/* ========================================================================= */}
      <section id="overview" className="py-24 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="block h-[2px] w-6 md:w-8 shrink-0 bg-[#F99D1C]"></span>
            <span className="text-[11px] md:text-[12px] font-bold tracking-[0.25em] text-[#F99D1C] uppercase">
              {data.overview.sectionTag}
            </span>
          </div>
          <div className="text-[12px] md:text-sm font-bold tracking-[0.2em] text-[#0171c1] uppercase mb-6">
            {data.overview.sectionTitle}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-6 space-y-4">
              <h2 className="display-font text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-[#001A3D]">
                {data.overview.headlineLine1} <br />
                <span className="italic font-normal text-[#0171c1]">
                  {data.overview.headlineItalic}
                </span>
              </h2>
              <div className="h-1 w-20 bg-[#0171c1]"></div>
            </div>

            <div className="lg:col-span-6 space-y-10">
              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-normal">
                {data.overview.description}
              </p>

              <div className="grid grid-cols-2 gap-8 pt-4 border-t border-gray-100">
                <div>
                  <div className="display-font text-4xl sm:text-5xl font-bold text-[#001A3D] tracking-tight">
                    {data.overview.stat1Value}
                  </div>
                  <div className="mt-1 text-[10px] md:text-[11px] font-bold tracking-widest text-[#0171c1] uppercase">
                    {data.overview.stat1Label}
                  </div>
                </div>
                <div>
                  <div className="display-font text-4xl sm:text-5xl font-bold text-[#001A3D] tracking-tight">
                    {data.overview.stat2Value}
                  </div>
                  <div className="mt-1 text-[10px] md:text-[11px] font-bold tracking-widest text-[#0171c1] uppercase">
                    {data.overview.stat2Label}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: KEY FEATURES (Connected Architectural Grid as per img2) */}
      {/* ========================================================================= */}
      <section id="features" className="py-24 bg-[#00132B] text-white relative overflow-hidden border-b border-white/10">
        {/* Subtle radial ambient glow in Hutech cyan */}
        <div className="pointer-events-none absolute -top-40 right-10 h-96 w-96 rounded-full bg-[#0171c1]/10 blur-[130px]" />
        <div className="pointer-events-none absolute bottom-0 left-10 h-96 w-96 rounded-full bg-[#0171c1]/5 blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">

          {/* Top Capability Header Line */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-8 text-[11px] font-mono tracking-wider text-gray-400 uppercase">
            <span>CAPABILITY / 02</span>
          </div>

          {/* Section Category Tag */}
          <div className="text-[11px] md:text-xs font-bold tracking-[0.25em] text-[#0171c1] uppercase mb-4">
            {data.features.sectionTag || "KEY FEATURES"}
          </div>

          {/* Section Headline & Description Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
            <div className="lg:col-span-7">
              <h2 className="display-font text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-white">
                {data.features.headlinePrefix}{" "}
                <span className="italic font-normal text-white/90">
                  {data.features.headlineItalic}
                </span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base text-gray-300 font-normal leading-relaxed">
                {data.features.description}
              </p>
            </div>
          </div>

          {/* 4-Column Feature Grid: '+' cross border separation in tablet view */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-white/15">
            {data.features.cards.map((card, idx) => {
              const isCol1 = idx % 2 === 0;
              const isRow1 = idx < 2;

              return (
                <div
                  key={card.number}
                  className={`group relative flex flex-col justify-start p-8 sm:p-10 pb-12 transition-colors duration-300 border-white/15 ${
                    // Mobile (< md): border-b between cards 0, 1, 2
                    idx < 3 ? "border-b" : "border-b-0"
                  } ${
                    // Tablet (md: to < lg: 2x2 grid): vertical line on col 1, horizontal line on row 1 -> forms a '+'
                    isCol1 ? "md:border-r" : "md:border-r-0"
                  } ${
                    isRow1 ? "md:border-b" : "md:border-b-0"
                  } lg:border-r lg:border-b-0`}
                >
                  {/* Architectural '+' cross marker at center intersection in tablet view */}
                  {idx === 0 && (
                    <span className="hidden md:flex lg:hidden absolute -bottom-3 -right-3 z-20 h-6 w-6 items-center justify-center font-mono text-base font-light text-[#0171c1] select-none pointer-events-none">
                      +
                    </span>
                  )}
                <div>
                  {/* Top Index Number */}
                  <div className="text-xs font-mono font-medium text-gray-400 mb-10 tracking-widest">
                    {card.number}
                  </div>

                  {/* Geometric Graphic Container */}
                  <div className="mb-12 flex h-24 w-full items-center justify-center">
                    {card.iconType === "concentric" && (
                      <div className="relative flex h-20 w-20 items-center justify-center">
                        <div className="absolute inset-0 rounded-full border border-white/20 transition-transform duration-500 group-hover:scale-105" />
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30">
                          <span className="h-2.5 w-2.5 rounded-full bg-[#0171c1] shadow-lg shadow-[#0171c1]/80" />
                        </div>
                      </div>
                    )}
                    {card.iconType === "diamond" && (
                      <div className="relative flex h-20 w-20 items-center justify-center">
                        <div className="absolute inset-1.5 rotate-45 border border-white/20 transition-transform duration-500 group-hover:scale-105" />
                        <div className="flex h-10 w-10 rotate-45 items-center justify-center border border-white/30">
                          <span className="h-2.5 w-2.5 rounded-full bg-[#0171c1] shadow-lg shadow-[#0171c1]/80" />
                        </div>
                      </div>
                    )}
                    {card.iconType === "square" && (
                      <div className="relative flex h-20 w-20 items-center justify-center">
                        <div className="absolute inset-1.5 border border-dashed border-white/25 transition-transform duration-500 group-hover:scale-105" />
                        <div className="flex h-10 w-10 items-center justify-center border border-white/30">
                          <span className="h-2.5 w-2.5 rounded-xs bg-[#0171c1] shadow-lg shadow-[#0171c1]/80" />
                        </div>
                      </div>
                    )}
                    {card.iconType === "rings" && (
                      <div className="relative flex h-20 w-20 items-center justify-center">
                        <div className="absolute inset-0 rounded-full border border-white/20 transition-transform duration-500 group-hover:scale-105" />
                        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40">
                            <span className="h-2 w-2 rounded-full bg-[#0171c1] shadow-lg shadow-[#0171c1]/80" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="display-font text-lg md:text-xl font-bold text-white mb-3 transition-colors group-hover:text-[#0171c1]">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-300 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: BENEFITS & BUSINESS VALUE */}
      {/* ========================================================================= */}
      <section id="benefits" className="py-24 bg-[#FAF9F6] border-b border-gray-100">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="block h-[2px] w-6 md:w-8 shrink-0 bg-[#F99D1C]"></span>
            <span className="text-[11px] md:text-[12px] font-bold tracking-[0.25em] text-[#F99D1C] uppercase">
              {data.benefits.sectionTag}
            </span>
          </div>
          <div className="text-[12px] md:text-sm font-bold tracking-[0.2em] text-[#0171c1] uppercase mb-6">
            {data.benefits.sectionTitle}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
            <div className="lg:col-span-7">
              <h2 className="display-font text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-[#001A3D]">
                {data.benefits.headlineLine1} <br />
                <span className="italic font-normal text-[#0171c1]">
                  {data.benefits.headlineItalic}
                </span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base text-gray-600 font-normal leading-relaxed">
                {data.benefits.description}
              </p>
            </div>
          </div>

          {/* Bento Layout in Hutech Styling */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Left Tall Card: Donut Chart */}
            <div className="lg:col-span-5 group rounded-2xl border border-gray-200/90 bg-white p-8 sm:p-10 flex flex-col justify-between shadow-xs hover:border-[#0171c1] hover:shadow-xl transition-all duration-300">
              <div>
                <span className="text-xs font-mono font-bold text-[#F99D1C] block mb-4">01</span>

                {/* SVG Donut Progress in Hutech Cyan */}
                <div className="my-8 flex justify-center">
                  <div className="relative flex h-52 w-52 items-center justify-center">
                    <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#f3f4f6"
                        strokeWidth="10"
                        fill="transparent"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#0171c1"
                        strokeWidth="10"
                        strokeDasharray="251.2"
                        strokeDashoffset="82.9"
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <div className="display-font text-4xl font-extrabold text-[#001A3D]">{data.benefits.donutStat}</div>
                      <div className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase mt-1">
                        {data.benefits.donutLabel}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="display-font text-xl font-bold text-[#001A3D] mb-2 group-hover:text-[#0171c1] transition-colors">{data.benefits.card1Title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed font-normal">{data.benefits.card1Description}</p>
              </div>
            </div>

            {/* Right 2 Cards */}
            <div className="lg:col-span-7 flex flex-col gap-6">

              {/* Card 02 */}
              <div className="group rounded-2xl border border-gray-200/90 bg-white p-8 sm:p-10 flex flex-col justify-between shadow-xs hover:border-[#0171c1] hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-[#F99D1C] mb-4">
                  <span>02</span>
                </div>
                <div>
                  <h4 className="display-font text-xl font-bold text-[#001A3D] mb-2 group-hover:text-[#0171c1] transition-colors">{data.benefits.card2Title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6 font-normal">{data.benefits.card2Description}</p>
                </div>
                <div>
                  <div className="display-font text-4xl sm:text-5xl font-extrabold text-[#001A3D] tracking-tight">
                    {data.benefits.card2Stat}
                  </div>
                  <div className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase mt-1">
                    {data.benefits.card2StatLabel}
                  </div>
                </div>
              </div>

              {/* Card 03: Hutech Signature Gradient Accent Card */}
              <div className="group rounded-2xl bg-gradient-to-br from-[#0171c1] to-[#001A3D] p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-[#FFAF2B] mb-4">
                  <span>03</span>
                </div>
                <div className="max-w-md">
                  <h4 className="display-font text-xl font-bold text-white mb-2">{data.benefits.card3Title}</h4>
                  <p className="text-sm text-white/90 leading-relaxed font-normal mb-6">{data.benefits.card3Description}</p>
                </div>

                {/* Ascending Bar Graphic in Amber / White Accent */}
                <div className="pt-4 flex items-end justify-end">
                  <div className="flex items-end gap-1.5 h-12">
                    <span className="w-2.5 h-4 bg-white/40 rounded-xs"></span>
                    <span className="w-2.5 h-6 bg-white/60 rounded-xs"></span>
                    <span className="w-2.5 h-8 bg-white/80 rounded-xs"></span>
                    <span className="w-2.5 h-10 bg-[#F99D1C] rounded-xs"></span>
                    <span className="w-2.5 h-12 bg-white rounded-xs"></span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: HOW IT WORKS */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-24 bg-white border-y border-gray-100">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="block h-[2px] w-6 md:w-8 shrink-0 bg-[#F99D1C]"></span>
            <span className="text-[11px] md:text-[12px] font-bold tracking-[0.25em] text-[#F99D1C] uppercase">
              {data.howItWorks.sectionTag}
            </span>
          </div>
          <div className="text-[12px] md:text-sm font-bold tracking-[0.2em] text-[#0171c1] uppercase mb-6">
            {data.howItWorks.sectionTitle}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
            <div className="lg:col-span-7">
              <h2 className="display-font text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-[#001A3D]">
                {data.howItWorks.headlinePrefix} <br />
                <span className="italic font-normal text-[#0171c1]">
                  {data.howItWorks.headlineItalic}
                </span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base text-gray-600 font-normal leading-relaxed">
                {data.howItWorks.description}
              </p>
            </div>
          </div>

          {/* 3 Step Cards in Hutech img2-inspired Styling */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.howItWorks.steps.map((step) => (
              <div
                key={step.number}
                className="group relative flex flex-col justify-between rounded-2xl border border-gray-200/90 bg-white p-8 sm:p-10 shadow-xs hover:border-[#0171c1] hover:shadow-xl transition-all duration-300"
              >
                <div>
                  {/* Step Number in amber mono */}
                  <div className="text-xs font-mono font-bold text-[#F99D1C] mb-6 tracking-wider">
                    {step.number}
                  </div>

                  {/* 3 Overlapping Rounds: Progression from Light to Darker */}
                  <div className="my-8 flex items-center -space-x-3">
                    <span className="h-7 w-7 rounded-full bg-[#0171c1]/20 border border-[#0171c1]/30 transition-transform duration-300 group-hover:scale-105" />
                    <span className="h-7 w-7 rounded-full bg-[#0171c1]/55 border border-[#0171c1]/40 transition-transform duration-300 group-hover:scale-105" />
                    <span className="h-7 w-7 rounded-full bg-[#0171c1] shadow-md shadow-[#0171c1]/30 transition-transform duration-300 group-hover:scale-105" />
                  </div>

                  <h3 className="display-font text-xl font-bold text-[#001A3D] mb-3 group-hover:text-[#0171c1] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: USE CASES (Hutech Navy #001A3D Theme) */}
      {/* ========================================================================= */}
      <section id="use-cases" className="py-24 bg-[#001A3D] text-white relative overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="block h-[2px] w-6 md:w-8 shrink-0 bg-[#F99D1C]"></span>
            <span className="text-[11px] md:text-[12px] font-bold tracking-[0.25em] text-[#F99D1C] uppercase">
              {data.useCases.sectionTag}
            </span>
          </div>
          <div className="text-[12px] md:text-sm font-bold tracking-[0.2em] text-[#0171c1] uppercase mb-6">
            {data.useCases.sectionTitle}
          </div>

          <div className="mb-16">
            <h2 className="display-font text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-white">
              {data.useCases.headlinePrefix} <br />
              <span className="italic font-normal text-[#F99D1C]">
                {data.useCases.headlineItalic}
              </span>
            </h2>
          </div>

          {/* 3 Dark Cards with Glowing Concentric Radar matching img2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.useCases.cards.map((uc) => (
              <div
                key={uc.number}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-7 xl:p-8 transition-all duration-300 hover:bg-white/[0.08] hover:border-[#0171c1]/60 hover:shadow-2xl hover:shadow-[#0171c1]/10 backdrop-blur-md"
              >
                <div>
                  {/* Number */}
                  <div className="text-xs font-mono font-bold text-[#F99D1C] mb-6 tracking-wider">
                    {uc.number}
                  </div>

                  {/* Icon badge matching img2 with radar */}
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-[#0171c1]/30 bg-[#0171c1]/10 shadow-sm shadow-[#0171c1]/20">
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[#0171c1]/40">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#0171c1]/80 bg-[#0171c1]/10">
                        <span className="h-2 w-2 rounded-full bg-[#0171c1] shadow-md shadow-[#0171c1]/50"></span>
                      </div>
                    </div>
                  </div>

                  <h3 className="display-font text-xl font-bold text-white mb-3 group-hover:text-[#0171c1] transition-colors">
                    {uc.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-6 font-normal">
                    {uc.description}
                  </p>

                  <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {uc.pills.map((pill, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-gray-300 whitespace-nowrap"
                      >
                        <Check size={10} className="text-[#0171c1] shrink-0" /> {pill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: INDUSTRIES WE SERVE */}
      {/* ========================================================================= */}
      <section id="industries" className="py-24 bg-[#FAF9F6] border-b border-gray-100">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="block h-[2px] w-6 md:w-8 shrink-0 bg-[#F99D1C]"></span>
            <span className="text-[11px] md:text-[12px] font-bold tracking-[0.25em] text-[#F99D1C] uppercase">
              {data.industries.sectionTag}
            </span>
          </div>
          <div className="text-[12px] md:text-sm font-bold tracking-[0.2em] text-[#0171c1] uppercase mb-6">
            {data.industries.sectionTitle}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="display-font text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-[#001A3D]">
                {data.industries.headlinePrefix} <br />
                <span className="italic font-normal text-[#0171c1]">
                  {data.industries.headlineItalic}
                </span>
              </h2>
              <div className="h-1 w-20 bg-[#0171c1]"></div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <p className="text-base text-gray-600 font-normal leading-relaxed pb-4">
                {data.industries.description}
              </p>

              <div
                className="divide-y divide-gray-200 border-y border-gray-200"
                onMouseLeave={() => setHoveredIndustryIndex(null)}
              >
                {data.industries.items.map((ind, idx) => {
                  const isExpanded = hoveredIndustryIndex === idx;
                  const description =
                    ind.description ||
                    FALLBACK_INDUSTRY_DETAILS[ind.number] ||
                    ind.tagline;

                  return (
                    <div
                      key={ind.number}
                      onMouseEnter={() => setHoveredIndustryIndex(idx)}
                      onClick={() =>
                        setHoveredIndustryIndex(isExpanded ? null : idx)
                      }
                      className="py-5 group cursor-pointer transition-colors"
                    >
                      {/* Header Row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <span className="text-xs font-mono font-bold text-[#F99D1C]">
                            {ind.number}
                          </span>
                          <span
                            className={`display-font text-base sm:text-lg font-semibold transition-colors ${
                              isExpanded
                                ? "text-[#0171c1]"
                                : "text-[#001A3D] group-hover:text-[#0171c1]"
                            }`}
                          >
                            {ind.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 sm:gap-6">
                          <span
                            className={`hidden sm:inline text-xs transition-colors ${
                              isExpanded
                                ? "text-[#001A3D] font-medium"
                                : "text-gray-500 font-normal"
                            }`}
                          >
                            {ind.tagline}
                          </span>
                          <span
                            className={`inline-block transition-transform duration-300 font-bold text-sm sm:text-base ${
                              isExpanded
                                ? "rotate-90 text-[#0171c1]"
                                : "text-gray-400 group-hover:translate-x-1 group-hover:text-[#0171c1]"
                            }`}
                          >
                            →
                          </span>
                        </div>
                      </div>

                      {/* Smooth CSS Grid Drawer: Clean Text Only, No Box */}
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          isExpanded
                            ? "grid-rows-[1fr] opacity-100 mt-3"
                            : "grid-rows-[0fr] opacity-0 mt-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="text-sm text-gray-600 leading-relaxed font-normal max-w-2xl pl-10 sm:pl-12">
                            {description}
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

      {/* ========================================================================= */}
      {/* SECTION 7: TECHNICAL SPECIFICATIONS */}
      {/* ========================================================================= */}
      <section id="specifications" className="py-24 bg-white border-y border-gray-100">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="block h-[2px] w-6 md:w-8 shrink-0 bg-[#F99D1C]"></span>
            <span className="text-[11px] md:text-[12px] font-bold tracking-[0.25em] text-[#F99D1C] uppercase">
              {data.technicalSpecs.sectionTag}
            </span>
          </div>
          <div className="text-[12px] md:text-sm font-bold tracking-[0.2em] text-[#0171c1] uppercase mb-6">
            {data.technicalSpecs.sectionTitle}
          </div>

          <div className="mb-14">
            <h2 className="display-font text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-[#001A3D]">
              {data.technicalSpecs.headlinePrefix} <br />
              <span className="italic font-normal text-[#0171c1]">
                {data.technicalSpecs.headlineItalic}
              </span>
            </h2>
            <div className="h-1 w-20 bg-[#0171c1] mt-4"></div>
          </div>

          {/* Minimal 3-Column Spec Table in Hutech Theme */}
          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {data.technicalSpecs.specs.map((item) => (
              <div
                key={item.number}
                className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-center text-xs"
              >
                <div className="sm:col-span-4 flex items-center gap-4">
                  <span className="font-mono text-[#F99D1C] font-bold">{item.number}</span>
                  <span className="display-font font-bold text-[#001A3D] text-sm">{item.category}</span>
                </div>
                <div className="sm:col-span-5 text-gray-600 font-normal">
                  {item.details}
                </div>
                <div className="sm:col-span-3 sm:text-right font-mono font-bold text-[#0171c1]">
                  {item.metric}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: INTEGRATIONS & COMPATIBILITY (Hutech Navy #001A3D Theme) */}
      {/* ========================================================================= */}
      <section id="integrations" className="py-24 bg-[#001A3D] text-white relative overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="block h-[2px] w-6 md:w-8 shrink-0 bg-[#F99D1C]"></span>
            <span className="text-[11px] md:text-[12px] font-bold tracking-[0.25em] text-[#F99D1C] uppercase">
              {data.integrations.sectionTag}
            </span>
          </div>
          <div className="text-[12px] md:text-sm font-bold tracking-[0.2em] text-[#0171c1] uppercase mb-6">
            {data.integrations.sectionTitle}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="display-font text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-white">
                {data.integrations.headlinePrefix} <br />
                <span className="italic font-normal text-[#F99D1C]">
                  {data.integrations.headlineItalic}
                </span>
              </h2>

              <p className="text-base text-gray-300 font-normal leading-relaxed max-w-lg">
                {data.integrations.description}
              </p>

              <div className="pt-2">
                <Link
                  href={data.integrations.buttonUrl}
                  className="inline-flex items-center gap-3 rounded-sm bg-[#0171c1] px-8 py-4 text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-[#0171c1]/30 hover:bg-white hover:text-[#001A3D] transition-all"
                >
                  {data.integrations.buttonText}
                </Link>
              </div>
            </div>

            {/* 3x3 Grid of Glass Icons in Hutech Navy */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="grid grid-cols-3 gap-4 max-w-[340px] w-full">
                <div className="h-24 w-24 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm flex items-center justify-center text-white text-xl font-bold shadow-md hover:border-[#0171c1]/60 hover:bg-white/[0.08] hover:scale-105 transition-all duration-300">
                  S
                </div>
                <div className="h-24 w-24 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm flex items-center justify-center text-white text-xl font-bold shadow-md hover:border-[#0171c1]/60 hover:bg-white/[0.08] hover:scale-105 transition-all duration-300">
                  ▲
                </div>
                <div className="h-24 w-24 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm flex items-center justify-center text-white text-xl font-bold shadow-md hover:border-[#0171c1]/60 hover:bg-white/[0.08] hover:scale-105 transition-all duration-300">
                  G
                </div>

                <div className="h-24 w-24 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm flex items-center justify-center text-white text-xl font-bold shadow-md hover:border-[#0171c1]/60 hover:bg-white/[0.08] hover:scale-105 transition-all duration-300">
                  ◇
                </div>
                {/* Center Highlighted Hutech Brand Logo */}
                <div className="h-24 w-24 rounded-2xl bg-[#0171c1] text-white flex items-center justify-center shadow-xl shadow-[#0171c1]/40 font-black text-2xl hover:scale-105 transition-all duration-300">
                  ॥
                </div>
                <div className="h-24 w-24 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm flex items-center justify-center text-white text-xl font-bold shadow-md hover:border-[#0171c1]/60 hover:bg-white/[0.08] hover:scale-105 transition-all duration-300">
                  🛡️
                </div>

                <div className="h-24 w-24 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm flex items-center justify-center text-white text-xl font-bold shadow-md hover:border-[#0171c1]/60 hover:bg-white/[0.08] hover:scale-105 transition-all duration-300">
                  Z
                </div>
                <div className="h-24 w-24 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm flex items-center justify-center text-white text-xl font-bold shadow-md hover:border-[#0171c1]/60 hover:bg-white/[0.08] hover:scale-105 transition-all duration-300">
                  A
                </div>
                <div className="h-24 w-24 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm flex items-center justify-center text-white text-xl font-bold shadow-md hover:border-[#0171c1]/60 hover:bg-white/[0.08] hover:scale-105 transition-all duration-300">
                  F
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: SECURITY & COMPLIANCE */}
      {/* ========================================================================= */}
      <section id="security" className="py-24 bg-[#FAF9F6] border-b border-gray-100">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="block h-[2px] w-6 md:w-8 shrink-0 bg-[#F99D1C]"></span>
            <span className="text-[11px] md:text-[12px] font-bold tracking-[0.25em] text-[#F99D1C] uppercase">
              {data.security.sectionTag}
            </span>
          </div>
          <div className="text-[12px] md:text-sm font-bold tracking-[0.2em] text-[#0171c1] uppercase mb-6">
            {data.security.sectionTitle}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
            <div className="lg:col-span-7">
              <h2 className="display-font text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-[#001A3D]">
                {data.security.headlinePrefix} <br />
                <span className="italic font-normal text-[#0171c1]">
                  {data.security.headlineItalic}
                </span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base text-gray-600 font-normal leading-relaxed">
                {data.security.description}
              </p>
            </div>
          </div>

          {/* Graphic & Pillars Grid in Hutech Styling */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">

            {/* Concentric Circular Radar Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-gray-200">
                <div className="flex h-48 w-48 items-center justify-center rounded-full border border-gray-200">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full border border-gray-200">
                    <div className="flex h-16 w-16 items-center justify-center rounded-sm bg-[#001A3D] text-[#0171c1] shadow-xl">
                      <Shield size={28} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Pillars */}
            <div className="lg:col-span-7 space-y-4">
              {data.security.pillars.map((pillar) => (
                <div
                  key={pillar.number}
                  className="group rounded-2xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-xs hover:border-[#0171c1] hover:shadow-lg transition-all duration-300 flex items-start justify-between gap-5"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-xs font-mono font-bold text-[#F99D1C] mt-1 shrink-0">
                      {pillar.number}
                    </span>
                    <div>
                      <h4 className="display-font text-lg font-bold text-[#001A3D] mb-1 group-hover:text-[#0171c1] transition-colors">
                        {pillar.title}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed font-normal">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* 4 Compliance Badges Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-gray-200">
            {data.security.badges.map((badge, idx) => (
              <div
                key={idx}
                className="group rounded-2xl border border-gray-200/90 bg-white p-6 text-center shadow-xs hover:border-[#0171c1] hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-[#0171c1]/30 bg-[#0171c1]/10 text-[#0171c1] shadow-xs group-hover:scale-110 transition-transform">
                  <Shield size={18} />
                </div>
                <div className="display-font text-xs font-black tracking-widest text-[#001A3D] uppercase">
                  {badge.split(" ")[0]}
                </div>
                <div className="text-[10px] text-[#0171c1] font-bold uppercase tracking-wider mt-0.5">
                  {badge.split(" ").slice(1).join(" ") || "Certified"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10: FREQUENTLY ASKED QUESTIONS (FAQS) */}
      {/* ========================================================================= */}
      <section id="faqs" className="py-24 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="block h-[2px] w-6 md:w-8 shrink-0 bg-[#F99D1C]"></span>
            <span className="text-[11px] md:text-[12px] font-bold tracking-[0.25em] text-[#F99D1C] uppercase">
              {data.faqs.sectionTag}
            </span>
          </div>
          <div className="text-[12px] md:text-sm font-bold tracking-[0.2em] text-[#0171c1] uppercase mb-6">
            {data.faqs.sectionTitle}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left FAQ Intro */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="display-font text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-[#001A3D]">
                {data.faqs.headlinePrefix} <br />
                <span className="italic font-normal text-[#0171c1]">
                  {data.faqs.headlineItalic}
                </span>
              </h2>
              <div className="h-1 w-20 bg-[#0171c1]"></div>

              <p className="text-base text-gray-600 font-normal leading-relaxed">
                {data.faqs.description}
              </p>

              <div>
                <Link
                  href={data.faqs.contactUrl}
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#0171c1] hover:text-[#001A3D] transition-colors"
                >
                  {data.faqs.contactText} →
                </Link>
              </div>
            </div>

            {/* Right Accordion List as Cards */}
            <div className="lg:col-span-7 space-y-4">
              {data.faqs.items.map((item, idx) => {
                const isOpen = openFaqIndex === idx;

                return (
                  <div
                    key={item.number}
                    className={`group rounded-2xl border transition-all duration-300 p-6 ${isOpen
                      ? "border-[#0171c1] bg-white shadow-md"
                      : "border-gray-200/90 bg-white shadow-xs hover:border-[#0171c1]/60 hover:shadow-sm"
                      }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between text-left group"
                    >
                      <div className="flex items-center gap-4 pr-6">
                        <span className="text-xs font-mono font-bold text-[#F99D1C]">{item.number}</span>
                        <span className={`display-font text-base sm:text-lg font-bold transition-colors ${isOpen ? "text-[#0171c1]" : "text-[#001A3D] group-hover:text-[#0171c1]"}`}>
                          {item.question}
                        </span>
                      </div>
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${isOpen ? "bg-[#0171c1] text-white" : "bg-gray-100 text-gray-500 group-hover:text-[#001A3D]"}`}>
                        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="pt-4 pl-9 pr-6 text-sm text-gray-600 leading-relaxed font-normal border-t border-gray-100 mt-4">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FINAL CTA BANNER (Hutech Navy #001A3D Gradient) */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="rounded-3xl bg-gradient-to-br from-[#00132B] via-[#002B5B] to-[#000E20] text-white p-10 sm:p-14 lg:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl border border-white/10">

            {/* Ambient Glow */}
            <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-[#0171c1]/20 blur-[130px]" />

            {/* Left Content */}
            <div className="max-w-xl space-y-6 relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="block h-[2px] w-6 md:w-8 shrink-0 bg-[#F99D1C]"></span>
                <span className="text-[11px] md:text-[12px] font-bold tracking-[0.25em] text-[#F99D1C] uppercase">
                  {data.ctaBanner.tag}
                </span>
              </div>

              <h2 className="display-font text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
                {data.ctaBanner.headlineLine1} <br />
                {data.ctaBanner.headlineLine2}{" "}
                <span className="italic font-normal text-[#F99D1C]">
                  {data.ctaBanner.headlineItalic}
                </span>
              </h2>

              <p className="text-base text-gray-300 font-normal leading-relaxed">
                {data.ctaBanner.description}
              </p>

              <div>
                <Link
                  href={data.ctaBanner.buttonUrl}
                  className="inline-flex items-center gap-3 rounded-sm bg-[#0171c1] px-8 py-4 text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-[#0171c1]/30 hover:bg-white hover:text-[#001A3D] transition-all"
                >
                  <span>{data.ctaBanner.buttonText}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Concentric Radar Graphic: Ambient BG on mobile/tablet, relative column on desktop */}
            <div className="absolute -bottom-20 -right-20 sm:-bottom-16 sm:-right-12 lg:relative lg:bottom-auto lg:right-auto z-0 lg:z-10 shrink-0 pointer-events-none lg:pointer-events-auto opacity-20 sm:opacity-25 lg:opacity-100 transition-opacity">
              <div className="relative flex h-64 w-64 sm:h-80 sm:w-80 lg:h-72 lg:w-72 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <div className="flex h-48 w-48 sm:h-60 sm:w-60 lg:h-44 lg:w-44 items-center justify-center rounded-full border border-[#0171c1]/30">
                  <div className="flex h-32 w-32 sm:h-40 sm:w-40 lg:h-28 lg:w-28 items-center justify-center rounded-full border border-[#0171c1]/60 bg-[#0171c1]/10">
                    <span className="h-12 w-12 sm:h-14 sm:w-14 lg:h-10 lg:w-10 rounded-full bg-[#0171c1] shadow-lg shadow-[#0171c1]/50"></span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Download Modal for document actions */}
      <DownloadFormModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        documentTitle="Product Architecture Whitepaper"
        downloadUrl="https://hutechsolutions.ai/docs/product-spec.pdf"
      />

    </div>
  );
}
