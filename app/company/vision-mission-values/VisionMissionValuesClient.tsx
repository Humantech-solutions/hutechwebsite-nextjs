"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Eye, Target, ShieldCheck, Zap, Star, Users, Award } from "lucide-react";
import { Meta } from "@/components/Meta";
import Link from "next/link";
import { renderTitle } from "@/lib/utils";

// ── Icon map (icons are purely presentational; order matches values array) ────
const VALUE_ICONS = [
  <ShieldCheck key="i0" className="h-8 w-8" />,
  <Zap         key="i1" className="h-8 w-8" />,
  <Star        key="i2" className="h-8 w-8" />,
  <Users       key="i3" className="h-8 w-8" />,
  <Award       key="i4" className="h-8 w-8" />,
  <Target      key="i5" className="h-8 w-8" />,
];

// ── Static fallback values ────────────────────────────────────────────────────
const STATIC_VALUES = [
  { title: "Integrity",        desc: "We uphold the highest standards of integrity in all our actions, ensuring transparency, honesty, and ethical conduct in every partnership." },
  { title: "Innovation",       desc: "We foster a culture of relentless innovation, constantly exploring new technologies and methodologies to solve complex business challenges." },
  { title: "Excellence",       desc: "We are committed to delivering excellence in everything we do, from the code we write to the strategic advice we provide." },
  { title: "Customer Focus",   desc: "Our clients' success is our success. We prioritize understanding their unique needs and delivering solutions that drive measurable impact." },
  { title: "Accountability",   desc: "We take full ownership of our commitments and results, ensuring that we deliver on our promises with precision and quality." },
  { title: "Collaboration",    desc: "We believe in the power of synergy. By working closely with our clients and within our teams, we achieve extraordinary results." },
];

// ── Props interface ───────────────────────────────────────────────────────────
interface VMVClientProps {
  heroTagline?:        string;
  heroTitle?:          string;
  heroDescription?:    string;

  visionTitle?:        string;
  visionDescription?:  string;

  missionTitle?:       string;
  missionDescription?: string;

  valuesTagline?:      string;
  valuesTitle?:        string;
  valuesDescription?:  string;
  values?:             { title: string; desc: string }[];

  ctaTitle?:           string;
  ctaDescription?:     string;
  ctaBtn1Text?:        string;
  ctaBtn1Url?:         string;
  ctaBtn2Text?:        string;
  ctaBtn2Url?:         string;
}

export default function VisionMissionValuesClient({
  heroTagline        = "Our Purpose",
  heroTitle          = "Our Vision, |Mission & ^Values.",
  heroDescription    = "At Hutech Solutions, we are driven by a singular purpose: to empower businesses through transformative technology and unwavering commitment to excellence.",

  visionTitle        = "Our Vision",
  visionDescription  = "To be a globally recognized leader in providing innovative technology solutions that empower businesses and individuals to achieve their full potential and transcend traditional boundaries.",

  missionTitle       = "Our Mission",
  missionDescription = "To deliver high-quality, cost-effective, and customized technology solutions that meet the unique needs of our clients while fostering a culture of continuous improvement, innovation, and employee growth.",

  valuesTagline      = "The Pillars of Hutech",
  valuesTitle        = "Our ^Core Values",
  valuesDescription  = "The fundamental beliefs that shape our culture and define how we work together to serve our clients.",
  values             = STATIC_VALUES,

  ctaTitle           = "Join Us in Shaping the ^Future of Technology.",
  ctaDescription     = "Experience the Hutech difference where values meet innovation to deliver exceptional results.",
  ctaBtn1Text        = "Partner With Us",
  ctaBtn1Url         = "/contact",
  ctaBtn2Text        = "View Careers",
  ctaBtn2Url         = "/careers",
}: VMVClientProps) {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="Vision, Mission & Values | Hutech Solutions"
        description="Discover the core principles, vision, and mission that drive Hutech Solutions toward excellence in the global technology landscape."
      />
      <Breadcrumbs variant="light" />

      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[45vh] lg:h-[450px] items-center overflow-hidden bg-[#001A3D] text-white py-[50px] lg:py-0">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 -mt-96 -mr-96 h-[800px] w-[800px] rounded-full bg-[#F99D1C]/20 blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 -mb-48 -ml-48 h-[600px] w-[600px] rounded-full bg-[#F99D1C]/10 blur-[100px]"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-20">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl space-y-8"
          >
            <div className="flex items-center space-x-3">
              <span className="h-[1px] w-12 bg-[#F99D1C]"></span>
              <span className="text-xs font-semibold tracking-wide text-[#F99D1C]">
                {heroTagline}
              </span>
            </div>
            <h1 className="display-font text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              {renderTitle(heroTitle, "text-white", "text-[#F99D1C]", "text-[#0171c1]")}
            </h1>
            <p className="max-w-2xl text-xl leading-relaxed font-medium text-gray-400">
              {heroDescription}
            </p>
          </Motion.div>
        </div>
      </section>

      {/* ── Vision & Mission Section ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white py-[50px] lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-12 md:gap-20 lg:grid-cols-2">
            {/* Vision */}
            <Motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative space-y-10 overflow-hidden rounded-[15px] lg:rounded-[3rem] border border-gray-100 bg-gray-50 p-8 md:p-12 transition-all duration-500 hover:shadow-2xl lg:p-16"
            >
              <div className="pointer-events-none absolute top-0 right-0 p-8 text-[#001A3D] opacity-[0.03]">
                <Eye size={120} />
              </div>
              <div className="w-fit rounded-2xl bg-white p-6 text-[#F99D1C] shadow-sm transition-colors duration-500 group-hover:bg-[#F99D1C] group-hover:text-white">
                <Eye size={36} />
              </div>
              <div className="space-y-6">
                <h2 className="display-font text-4xl font-semibold tracking-tight text-[#001A3D]">
                  {renderTitle(visionTitle, "text-[#001A3D]", "text-[#F99D1C]", "text-[#0171c1]")}
                </h2>
                <p className="text-xl leading-relaxed font-medium text-gray-500">
                  {visionDescription}
                </p>
              </div>
            </Motion.div>

            {/* Mission */}
            <Motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative space-y-10 overflow-hidden rounded-[15px] lg:rounded-[3rem] bg-[#001A3D] p-8 md:p-12 text-white transition-all duration-500 hover:shadow-2xl lg:p-16"
            >
              <div className="pointer-events-none absolute top-0 right-0 p-8 text-white opacity-[0.05]">
                <Target size={120} />
              </div>
              <div className="w-fit rounded-2xl bg-[#F99D1C] p-6 text-[#001A3D] shadow-sm">
                <Target size={36} />
              </div>
              <div className="space-y-6">
                <h2 className="display-font text-4xl font-semibold tracking-tight text-[#F99D1C]">
                  {renderTitle(missionTitle, "text-[#F99D1C]", "text-white", "text-[#0171c1]")}
                </h2>
                <p className="text-xl leading-relaxed font-medium text-gray-300">
                  {missionDescription}
                </p>
              </div>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* ── Core Values Section ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-y border-gray-100 bg-gray-50 py-[50px] lg:py-24">
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 opacity-[0.02]">
          <svg viewBox="0 0 100 100" className="h-full w-full fill-[#001A3D]">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mx-auto mb-[50px] lg:mb-24 max-w-3xl space-y-6 text-center">
            <span className="text-xs font-bold tracking-widest text-[#F99D1C] uppercase">
              {valuesTagline}
            </span>
            <h2 className="display-font text-4xl font-semibold tracking-tight text-[#001A3D] md:text-6xl">
              {renderTitle(valuesTitle, "text-[#001A3D]", "text-[#F99D1C]", "text-[#0171c1]")}
            </h2>
            <p className="text-lg font-medium text-gray-500">
              {valuesDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group space-y-8 rounded-[15px] lg:rounded-[2.5rem] border border-gray-100 bg-white p-8 md:p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl lg:p-12"
              >
                <div className="w-fit rounded-2xl bg-gray-50 p-4 text-[#F99D1C] transition-all duration-300 group-hover:bg-[#F99D1C] group-hover:text-white">
                  {VALUE_ICONS[i % VALUE_ICONS.length]}
                </div>
                <div className="space-y-4">
                  <h3 className="display-font text-2xl font-bold text-[#001A3D]">
                    {renderTitle(v.title, "text-[#001A3D]", "text-[#F99D1C]", "text-[#0171c1]")}
                  </h3>
                  <p className="leading-relaxed font-medium text-gray-500">{v.desc}</p>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ───────────────────────────────────────────────────── */}
      <section className="bg-white py-[50px] lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="group relative overflow-hidden rounded-[15px] lg:rounded-[3rem] bg-[#001A3D] p-6 md:p-12 text-center text-white lg:p-24">
            <div className="absolute top-0 right-0 -mt-48 -mr-48 h-96 w-96 rounded-full bg-[#F99D1C]/10 blur-[100px] transition-transform duration-700 group-hover:scale-150"></div>
            <div className="relative z-10 space-y-10">
              <h2 className="display-font mx-auto max-w-4xl text-4xl leading-tight font-semibold tracking-tight md:text-6xl">
                {renderTitle(ctaTitle, "text-white", "text-[#F99D1C]", "text-[#0171c1]")}
              </h2>
              <p className="mx-auto max-w-2xl text-xl font-medium text-gray-400">
                {ctaDescription}
              </p>
              <div className="flex flex-col justify-center gap-6 pt-4 sm:flex-row">
                <Link
                  href={ctaBtn1Url}
                  className="rounded-sm bg-[#F99D1C] px-12 py-5 text-xs font-bold tracking-wide text-[#001A3D] shadow-xl shadow-[#F99D1C]/20 transition-all hover:bg-white"
                >
                  {ctaBtn1Text}
                </Link>
                <Link
                  href={ctaBtn2Url}
                  className="rounded-sm border border-white/20 bg-transparent px-12 py-5 text-xs font-bold tracking-wide text-white transition-all hover:border-[#F99D1C] hover:text-[#F99D1C]"
                >
                  {ctaBtn2Text}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
