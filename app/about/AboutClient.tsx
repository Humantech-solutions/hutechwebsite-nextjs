"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import {
  Users,
  Globe2,
  Briefcase,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Star,
  Code2,
  Cpu,
  Fingerprint,
  Layers,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { Meta } from "@/components/Meta";
import { GlobalMap, OfficeLocation } from "@/components/GlobalMap";
import { renderTitle } from "@/lib/utils";

// ── Icon map used by the overview/feature section ────────────────────────────
const ICON_MAP: Record<string, React.ReactNode> = {
  Code2:      <Code2 size={24} />,
  Cpu:        <Cpu size={24} />,
  Fingerprint:<Fingerprint size={24} />,
  ShieldCheck:<ShieldCheck size={24} />,
  TrendingUp: <TrendingUp size={24} />,
  Globe2:     <Globe2 size={24} />,
  Users:      <Users size={24} />,
  Star:       <Star size={24} />,
};

const STAT_ICONS: React.ReactNode[] = [
  <Users key="i1" size={20} />,
  <Briefcase key="i2" size={20} />,
  <CheckCircle2 key="i3" size={20} />,
  <Globe2 key="i4" size={20} />,
  <TrendingUp key="i5" size={20} />,
  <Star key="i6" size={20} />,
];

// ── Static fallback data ──────────────────────────────────────────────────────
const STATIC_STATS = [
  { label: "Associates",        value: "100+" },
  { label: "Happy Clients",     value: "20+"  },
  { label: "Project Delivered", value: "40+"  },
  { label: "Countries Served",  value: "10+"  },
  { label: "Years in Business", value: "5+"   },
  { label: "Client Satisfaction",value: "100%"},
];

const STATIC_FEATURES = [
  { title: "Technical Depth",      icon: "Code2",       desc: "Our team consists of experienced engineers, architects, and creative minds who have developed software for various industries worldwide." },
  { title: "Flexible Engagement",  icon: "Cpu",         desc: "Hire dedicated software development teams or individual experts to work at your premises with seamless integration." },
  { title: "Consulting First",     icon: "Fingerprint", desc: "We help businesses grow by providing consulting, design, and long-term software maintenance that consistently generates business value." },
  { title: "Certified Quality",    icon: "ShieldCheck", desc: "As an ISO 9001:2015 certified company and a proud NASSCOM member, we adhere to global quality standards across every delivery." },
];

const STATIC_WHAT_WE_DO = ["Strategic IT Consulting", "Full-Stack Development", "Cloud Infrastructure", "Managed Maintenance"];
const STATIC_WHO_WE_HELP = ["Funded Tech Startups", "SME Growth Entities", "Global Enterprises", "Industry Specialists"];

const STATIC_MILESTONES = [
  { year: "2019",       title: "Foundation",   desc: "Incorporated with a 2-member core. Grew to 10 members and secured 2 major clients by Q1." },
  { year: "2020 – 21", title: "Resilience",   desc: "Developed 2 enterprise products for funded startups. Signed MOU with Singapore-based IT org." },
  { year: "2021 – 22", title: "Expansion",    desc: "Secured tech partnerships in Logistics & EV sectors. Team scaled to 78 specialists." },
  { year: "2022 – 23", title: "Global Reach", desc: "Opened Pune office, US subsidiary, and strategic UK collaboration with Acend Solutions." },
  { year: "2023 – 24", title: "Leadership",   desc: "Established Hutech Inc. (USA), joined NASSCOM, and achieved ISO 9001:2015 certification. Team 90+." },
  { year: "2025 – Now",title: "Innovation",   desc: "Forged alliances with XOOTS & Maconsus (Vietnam), enhancing our global network and R&D." },
];

// ── Props (all from WP, with defaults) ───────────────────────────────────────
interface AboutClientProps {
  heroTagline?:     string;
  heroTitle?:       string;
  heroDescription?: string;
  heroBgImage?:     string;
  stats?:           { value: string; label: string }[];
  overviewTitle?:   string;
  overviewQuote?:   string;
  features?:        { title: string; desc: string; icon: string }[];
  whatWeDoTitle?:   string;
  whatWeDoDesc?:    string;
  whatWeDoItems?:   string[];
  whoWeHelpTitle?:  string;
  whoWeHelpDesc?:   string;
  whoWeHelpItems?:  string[];
  whyChooseTitle?:  string;
  whyChooseDesc?:   string;
  synergyTitle?:    string;
  synergyDesc?:     string;
  synergyStat1?:    string;
  synergyStat2?:    string;
  mapLabel?:        string;
  mapTitle?:        string;
  mapDescription?:  string;
  mapStat1Value?:   string;
  mapStat1Label?:   string;
  mapStat2Value?:   string;
  mapStat2Label?:   string;
  offices?:         OfficeLocation[];
  historySubtitle?: string;
  historyTitle?:    string;
  milestones?:      { year: string; title: string; desc: string }[];
  ctaBgImage?:      string;
  ctaTitle?:        string;
  ctaDescription?:  string;
  ctaBtn1Text?:     string;
  ctaBtn1Url?:      string;
  ctaBtn2Text?:     string;
  ctaBtn2Url?:      string;
}

export default function AboutClient({
  heroTagline      = "Corporate Profile",
  heroTitle       = "Architecting |Business Value.",
  heroDescription = "We are a remarkable group of creatives who transform traditional company concepts into reliable digital solutions through cutting-edge methodologies and industry-standard practices.",
  heroBgImage     = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
  stats           = STATIC_STATS,
  overviewTitle   = "Providing The Finest |Digital Experiences.",
  overviewQuote   = "\"We don't just build products; we architect the growth of businesses through engineering precision and creative thinking.\"",
  features        = STATIC_FEATURES,
  whatWeDoTitle   = "What We Do",
  whatWeDoDesc    = "We offer a wide range of IT services that empower businesses to leverage technology. From core development to advanced enterprise consulting.",
  whatWeDoItems   = STATIC_WHAT_WE_DO,
  whoWeHelpTitle  = "Who We Help?",
  whoWeHelpDesc   = "We help organisations across various industries, from early-stage funded startups to established global entities.",
  whoWeHelpItems  = STATIC_WHO_WE_HELP,
  whyChooseTitle  = "Why Choose Us",
  whyChooseDesc   = "Partner with us to unlock the full potential of technology and drive meaningful business outcomes through transparency and engineering excellence.",
  synergyTitle    = "Global |Synergy.",
  synergyDesc     = "Our offices in India, US, and UK work in a unified ecosystem to provide round-the-clock delivery and strategic support.",
  synergyStat1    = "4 Global Offices",
  synergyStat2    = "90+ Member Team",
  mapLabel        = "Global Delivery Model",
  mapTitle        = "Global Footprint, |Local Expertise.",
  mapDescription  = "Hutech Solutions operates through a unified global network, ensuring high-density engineering delivery and seamless client engagement across timezones.",
  mapStat1Value   = "24/7",
  mapStat1Label   = "Operations",
  mapStat2Value   = "3",
  mapStat2Label   = "Continents",
  offices,
  historySubtitle  = "Corporate Evolution",
  historyTitle    = "Our |History.",
  milestones      = STATIC_MILESTONES,
  ctaBgImage      = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
  ctaTitle        = "Join the Next |Digital Revolution.",
  ctaDescription  = "Whether you're looking for a technology partner or your next career move, we're building the future together.",
  ctaBtn1Text     = "Start Your Project",
  ctaBtn1Url      = "/contact",
  ctaBtn2Text     = "Executive Careers",
  ctaBtn2Url      = "/careers",
}: AboutClientProps) {

  return (
    <div className="flex flex-col overflow-hidden bg-white selection:bg-[#0171c1] selection:text-white">
      <Meta
        title="About Hutech | Hutech Solutions"
        description="Global IT services and consulting company with a strong presence in India, US, and UK, delivering latest technology solutions."
      />
      <Breadcrumbs variant="light" />

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[45vh] sm:min-h-[50vh] lg:min-h-[600px] items-center overflow-hidden bg-[#001A3D] py-[50px] lg:py-0">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 right-0 h-full w-full bg-[radial-gradient(circle_at_70%_30%,#0171c1_0%,transparent_50%)]" />
          <div className="absolute bottom-0 left-0 h-full w-full bg-[radial-gradient(circle_at_20%_80%,#F99D1C_0%,transparent_40%)]" />
          <ImageWithFallback
            src={heroBgImage}
            className="h-full w-full object-cover mix-blend-overlay grayscale"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="space-y-10 lg:col-span-8">
              <Motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-6 py-2 backdrop-blur-md">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#F99D1C]" />
                  <span className="text-[10px] font-bold tracking-widest text-white uppercase">
                    {heroTagline}
                  </span>
                </div>
                <h1 className="display-font text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
                  {renderTitle(heroTitle, "text-white", "text-[#F99D1C]", "text-[#0171c1]")}
                </h1>
                <p className="max-w-2xl text-xl leading-relaxed font-medium text-white/60">
                  {heroDescription}
                </p>
              </Motion.div>
            </div>

            {/* Stats grid */}
            <div className="hidden lg:col-span-4 lg:block">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <Motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="rounded-[15px] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md"
                  >
                    <div className="display-font mb-1 text-3xl font-black text-white">{stat.value}</div>
                    <div className="text-[10px] font-bold tracking-widest text-[#F99D1C] uppercase">{stat.label}</div>
                  </Motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Strategic Overview ────────────────────────────────────────────────── */}
      <section className="bg-white py-[50px] lg:py-32">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-20 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-4">
              <div className="h-2 w-20 bg-[#0171c1]" />
              <h2 className="display-font text-4xl leading-tight font-bold text-[#001A3D] md:text-5xl">
                {renderTitle(overviewTitle, "text-[#001A3D]", "text-[#0171c1]", "text-[#F99D1C]")}
              </h2>
              <p className="font-medium text-gray-400">{overviewQuote}</p>
            </div>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:col-span-8">
              {features.map((ft, i) => (
                <div key={i} className="space-y-6">
                  <div className="w-fit rounded-2xl bg-gray-50 p-4 text-[#0171c1]">
                    {ICON_MAP[ft.icon] ?? <Code2 size={24} />}
                  </div>
                  <h4 className="text-xl font-bold text-[#001A3D]">{ft.title}</h4>
                  <p className="leading-relaxed font-medium text-gray-500">{ft.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Narrative ─────────────────────────────────────────────────────────── */}
      <section className="bg-slate-50/50 py-[50px] lg:py-32 overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-6 lg:pl-20 lg:pr-0">
          <div className="flex flex-col lg:flex-row items-stretch shadow-[0_8px_40px_rgba(0,0,0,0.08)] bg-white rounded-[15px] lg:rounded-r-none lg:rounded-l-[15px]">

            {/* ── LEFT: White card (65%) ── */}
            <div className="w-full lg:w-[65%] bg-white rounded-t-[15px] lg:rounded-t-none lg:rounded-l-[15px] flex flex-col gap-10 p-6 md:p-12 lg:p-16">

              {/* Two-column top content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">

                {/* What We Do */}
                <div>
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-[#0171c1] mb-5">
                    <Layers size={22} />
                  </div>
                  <h3 className="display-font text-[26px] font-bold text-[#001A3D] leading-tight mb-2">
                    {whatWeDoTitle}
                  </h3>
                  <div className="w-9 h-[3px] bg-[#0171c1] mb-4" />
                  <p className="text-[15px] leading-[1.75] text-gray-500 mb-6">
                    {whatWeDoDesc}
                  </p>
                  <ul className="space-y-0">
                    {whatWeDoItems.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 py-[11px] border-b border-gray-100 last:border-0">
                        <span className="w-[7px] h-[7px] rounded-full bg-[#0171c1] shrink-0" />
                        <span className="text-[15px] font-semibold text-[#0F1C35]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Who We Help */}
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#FFF6E9] flex items-center justify-center text-[#F99D1C] mb-5">
                    <Users size={22} />
                  </div>
                  <h3 className="display-font text-[26px] font-bold text-[#001A3D] leading-tight mb-2">
                    {whoWeHelpTitle}
                  </h3>
                  <div className="w-9 h-[3px] bg-[#F99D1C] mb-4" />
                  <p className="text-[15px] leading-[1.75] text-gray-500 mb-6">
                    {whoWeHelpDesc}
                  </p>
                  <ul className="space-y-0">
                    {whoWeHelpItems.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 py-[11px] border-b border-gray-100 last:border-0">
                        <span className="w-[7px] h-[7px] rounded-full bg-[#F99D1C] shrink-0" />
                        <span className="text-[15px] font-semibold text-[#0F1C35]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Why Choose Us CTA */}
              <div className="flex items-center gap-5 rounded-[15px] bg-[#F4F6FA] border border-[#E8ECF4] shadow-sm px-6 py-5">
                <div className="flex-shrink-0 w-[64px] h-[64px] rounded-[16px] bg-[#0171c1] flex items-center justify-center shadow-md shadow-[#0171c1]/25">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[17px] font-bold text-[#001A3D] mb-1">{whyChooseTitle}</h4>
                  <p className="text-[13px] leading-[1.65] text-gray-500">{whyChooseDesc}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#0171c1] shrink-0" />
              </div>
            </div>

            {/* ── RIGHT: Dark navy panel — extends to viewport right edge ── */}
            <div className="relative w-full lg:w-[35%] bg-[#000c24] rounded-b-[15px] lg:rounded-b-none lg:rounded-tr-none flex flex-col justify-start pt-14 px-8 md:px-10 pb-10 min-h-[480px]">

              {/* Background color bleed: extends 200vw to the right on desktop.
                  The parent <section> has overflow-hidden which clips it at the
                  viewport edge — giving a seamless full-bleed navy right half. */}
              <div className="hidden lg:block absolute inset-y-0 left-0 right-[-200vw] bg-[#000c24] z-0" />

              {/* Globe background container - covers the entire panel with overflow-hidden and matching rounded corners */}
              <div className="absolute inset-0 rounded-b-[15px] lg:rounded-b-none lg:rounded-tr-none overflow-hidden pointer-events-none select-none z-[1]">
                <img
                  src="/assets/global_synergy_globe.jpg"
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                  style={{
                    transform: "scaleX(-1)", // Flips the globe to span from bottom-right to top-left
                    filter: "brightness(0.95) contrast(1.1)",
                  }}
                />
                {/* 60-75% opacity blue overlay to ensure text readability and seamless edge blending */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#04152D]/75 via-[#061B3A]/65 to-[#000c24]" />
              </div>

              {/* Content */}
              <div className="relative z-20 space-y-6 max-w-[280px]">
                {/* Heading */}
                <div>
                  <h2 className="text-[40px] md:text-[46px] font-bold leading-[1.1] text-white">
                    Global<br />
                    <span className="text-[#F99D1C]">Synergy.</span>
                  </h2>
                  <div className="w-9 h-[3px] bg-[#F99D1C] mt-3" />
                </div>

                {/* Description */}
                <p className="text-[14px] leading-[1.8] text-white/75">
                  {synergyDesc}
                </p>

                {/* Stat cards */}
                <div className="space-y-3 pt-2">
                  {/* Stat 1 */}
                  <div className="flex items-center gap-4 rounded-[15px] border border-white/[0.10] bg-white/[0.07] backdrop-blur-sm px-4 py-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.10]">
                      <Globe2 size={18} className="text-[#F99D1C]" />
                    </div>
                    <div>
                      <div className="text-[22px] font-bold text-white leading-none mb-0.5">
                        {synergyStat1.split(" ")[0] || "4"}
                      </div>
                      <div className="text-[10px] font-bold tracking-[0.12em] text-white/55 uppercase">
                        {synergyStat1.replace(synergyStat1.split(" ")[0], "").trim() || "GLOBAL OFFICES"}
                      </div>
                    </div>
                  </div>

                  {/* Stat 2 */}
                  <div className="flex items-center gap-4 rounded-[15px] border border-white/[0.10] bg-white/[0.07] backdrop-blur-sm px-4 py-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.10]">
                      <Users size={18} className="text-[#F99D1C]" />
                    </div>
                    <div>
                      <div className="text-[22px] font-bold text-white leading-none mb-0.5">
                        {synergyStat2.split(" ")[0] || "90+"}
                      </div>
                      <div className="text-[10px] font-bold tracking-[0.12em] text-white/55 uppercase">
                        {synergyStat2.replace(synergyStat2.split(" ")[0], "").trim() || "MEMBER TEAM"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Global Map ────────────────────────────────────────────────────────── */}
      <GlobalMap
        label={mapLabel}
        title={mapTitle}
        description={mapDescription}
        stat1Value={mapStat1Value}
        stat1Label={mapStat1Label}
        stat2Value={mapStat2Value}
        stat2Label={mapStat2Label}
        locations={offices}
      />

      {/* ── History Timeline ──────────────────────────────────────────────────── */}
      <section className="bg-white pt-[50px] pb-[50px] lg:py-32">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-[50px] space-y-6 text-center">
            <span className="text-[10px] font-black tracking-[0.2em] text-[#0171c1] uppercase">
              {historySubtitle}
            </span>
            <h2 className="display-font text-4xl font-bold tracking-tight text-[#001A3D] md:text-6xl">
              {renderTitle(historyTitle, "text-[#001A3D]", "text-[#0171c1]", "text-[#F99D1C]")}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {milestones.map((item, idx) => (
              <Motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-[15px] border border-gray-100 bg-white p-10 transition-all duration-500 hover:border-[#0171c1] hover:shadow-2xl"
              >
                <div className="pointer-events-none absolute top-0 right-0 p-8 text-[#001A3D] opacity-[0.05] transition-opacity group-hover:opacity-[0.1]">
                  <span className="display-font text-6xl font-black">{item.year.split(" – ")[0]}</span>
                </div>
                <div className="relative z-10 space-y-6">
                  <div className="display-font text-3xl font-black text-[#0171c1]">{item.year}</div>
                  <h4 className="text-xl font-bold text-[#001A3D]">{item.title}</h4>
                  <p className="text-sm leading-relaxed font-medium text-gray-500">{item.desc}</p>
                  <div className="h-1 w-12 bg-[#F99D1C] transition-all duration-700 group-hover:w-full" />
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="py-[50px] lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="relative overflow-hidden rounded-[15px] lg:rounded-[4rem] bg-[#001A3D] p-6 md:p-12 lg:p-24 text-center">
            <div className="absolute inset-0 z-0">
              <ImageWithFallback
                src={ctaBgImage}
                className="h-full w-full object-cover opacity-10"
              />
            </div>
            <div className="relative z-10 mx-auto max-w-4xl space-y-10">
              <h2 className="display-font text-4xl leading-tight font-bold text-white md:text-6xl">
                {renderTitle(ctaTitle, "text-white", "text-[#F99D1C]", "text-[#0171c1]")}
              </h2>
              <p className="text-xl leading-relaxed font-medium text-white/50">{ctaDescription}</p>
              <div className="flex flex-col justify-center gap-6 sm:flex-row">
                <Link
                  href={ctaBtn1Url}
                  className="rounded-sm bg-[#0171c1] px-12 py-5 text-[11px] font-black tracking-widest text-white uppercase shadow-xl transition-all hover:bg-[#F99D1C] hover:text-[#001A3D]"
                >
                  {ctaBtn1Text}
                </Link>
                <Link
                  href={ctaBtn2Url}
                  className="rounded-sm border border-white/20 px-12 py-5 text-[11px] font-black tracking-widest text-white uppercase transition-all hover:bg-white/10"
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
