"use client";

import { motion as Motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoveRight } from "lucide-react";

export interface PreFooterCTAProps {
  headline?: string;
  description?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
}

interface PageCTAContent {
  headline: string;
  description: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA: { label: string; href: string };
}

const DEFAULT_SERVICE_CTA: PageCTAContent = {
  headline: "Ready to Accelerate Your Digital Transformation?",
  description: "Join the leading enterprises that have transformed their operations with Hutech Solutions.",
  primaryCTA: { label: "Talk to an Expert", href: "/contact" },
  secondaryCTA: { label: "Explore Success Stories", href: "/resources/case-studies" },
};

const DEFAULT_INDUSTRY_CTA: PageCTAContent = {
  headline: "Ready to Optimize Your Industry Operations?",
  description: "Join the leading enterprises that have transformed their operations with Hutech Solutions.",
  primaryCTA: { label: "Schedule a Consultation", href: "/contact" },
  secondaryCTA: { label: "View Industry Solutions", href: "/resources/case-studies" },
};

const PATH_CONTENT_MAP: Record<string, Partial<PageCTAContent>> = {
  // Service Pages
  "/services/data-engineering": {
    headline: "Ready to Build a Modern Data Foundation?",
    primaryCTA: { label: "Talk to an Expert", href: "/contact" },
    secondaryCTA: { label: "Explore Success Stories", href: "/resources/case-studies" },
  },
  "/services/ai-ml": {
    headline: "Ready to Turn Data into Intelligent Decisions?",
    primaryCTA: { label: "Talk to an Expert", href: "/contact" },
    secondaryCTA: { label: "Explore Success Stories", href: "/resources/case-studies" },
  },
  "/services/cloud-transformation": {
    headline: "Ready to Accelerate Your Cloud Transformation?",
    primaryCTA: { label: "Talk to an Expert", href: "/contact" },
    secondaryCTA: { label: "Explore Success Stories", href: "/resources/case-studies" },
  },
  "/services/data-visualization-reporting": {
    headline: "Ready to Unlock Actionable Business Insights?",
    primaryCTA: { label: "Talk to an Expert", href: "/contact" },
    secondaryCTA: { label: "Explore Success Stories", href: "/resources/case-studies" },
  },

  // Industry Pages
  "/industries/banking-finance": {
    headline: "Ready to Modernize Banking with Intelligent Data Solutions?",
    primaryCTA: { label: "Schedule a Consultation", href: "/contact" },
    secondaryCTA: { label: "View Industry Solutions", href: "/resources/case-studies" },
  },
  "/industries/healthcare-life-sciences": {
    headline: "Ready to Improve Patient Outcomes Through Data?",
    primaryCTA: { label: "Schedule a Consultation", href: "/contact" },
    secondaryCTA: { label: "View Industry Solutions", href: "/resources/case-studies" },
  },
  "/industries/retail-consumer": {
    headline: "Ready to Create Personalized Customer Experiences?",
    primaryCTA: { label: "Schedule a Consultation", href: "/contact" },
    secondaryCTA: { label: "View Industry Solutions", href: "/resources/case-studies" },
  },
  "/industries/manufacturing": {
    headline: "Ready to Optimize Operations with Real-Time Insights?",
    primaryCTA: { label: "Schedule a Consultation", href: "/contact" },
    secondaryCTA: { label: "View Industry Solutions", href: "/resources/case-studies" },
  },
};

/**
 * PreFooterCTA — Reusable conversion section placed directly above the footer
 * on every Service and Industry detail page.
 *
 * It dynamically detects the page type and slug, applying page-specific messaging
 * unless explicitly overridden via props.
 */
export function PreFooterCTA({
  headline,
  description,
  primaryCTA,
  secondaryCTA,
}: PreFooterCTAProps) {
  const pathname = usePathname() || "";

  // 1. Determine dynamic defaults based on path
  let dynamicDefault = pathname.includes("/services/")
    ? DEFAULT_SERVICE_CTA
    : DEFAULT_INDUSTRY_CTA;

  // 2. Look up specific route-based overrides if available
  const routeOverride = PATH_CONTENT_MAP[pathname] || {};

  // 3. Fall back gracefully: Prop > Path Override > General Defaults
  const finalHeadline = headline || routeOverride.headline || dynamicDefault.headline;
  const finalDescription = description || routeOverride.description || dynamicDefault.description;
  const finalPrimaryCTA = {
    label: primaryCTA?.label || routeOverride.primaryCTA?.label || dynamicDefault.primaryCTA.label,
    href: primaryCTA?.href || routeOverride.primaryCTA?.href || dynamicDefault.primaryCTA.href,
  };
  const finalSecondaryCTA = {
    label: secondaryCTA?.label || routeOverride.secondaryCTA?.label || dynamicDefault.secondaryCTA.label,
    href: secondaryCTA?.href || routeOverride.secondaryCTA?.href || dynamicDefault.secondaryCTA.href,
  };

  return (
    <section
      className="relative overflow-hidden bg-[#001A3D] py-[60px]"
      aria-label="Call to action"
    >
      {/* ── Decorative ambient orbs ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-[#0171c1]/20 blur-3xl" />
        <div className="absolute -right-40 -bottom-40 h-[480px] w-[480px] rounded-full bg-[#0171c1]/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-3xl" />
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-20">
        <Motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
        >
          {/* ── Eyebrow pill ── */}
          <Motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-[10px] font-bold tracking-[0.22em] text-white/85 uppercase backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#F99D1C]" aria-hidden="true" />
            Get Started Today
          </Motion.div>

          {/* ── Headline ── */}
          <h2 className="display-font mb-6 max-w-[900px] text-[45px] leading-[1.2] font-semibold tracking-tight text-white">
            {finalHeadline}
          </h2>

          {/* ── Description ── */}
          <p className="mb-11 max-w-2xl text-[16px] leading-relaxed font-medium text-white/85">
            {finalDescription}
          </p>

          {/* ── CTA button ── */}
          <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:gap-5">
            <Motion.div
              whileHover={{ scale: 1.045, y: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/contact"
                className="btn-consult-us group w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0171c1]"
              >
                Consult Us
                <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
              </Link>
            </Motion.div>
          </div>
        </Motion.div>
      </div>
    </section>
  );
}
