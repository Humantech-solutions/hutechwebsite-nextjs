"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  Handshake,
  Globe2,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Server,
  Cloud,
  Database,
  Cpu,
  MessageSquare,
  Briefcase,
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";
import { renderTitle } from "@/lib/utils";

const STATIC_CATEGORIES = [
  {
    title: "Cloud & Infrastructure",
    desc: "Empowering businesses with scalable, secure, and high-performance cloud ecosystems.",
    icon: Cloud,
    partners: "AWS, Microsoft Azure, Google Cloud, IBM Cloud, DigitalOcean",
  },
  {
    title: "Enterprise Solutions",
    desc: "Driving operational excellence through world-class ERP and CRM integrations.",
    icon: Briefcase,
    partners: "ServiceNow, SAP, Oracle, Microsoft Dynamics, Salesforce",
  },
  {
    title: "Data & Intelligence",
    desc: "Unlocking actionable insights with advanced analytics and AI-driven platforms.",
    icon: Database,
    partners: "Snowflake, Databricks, Tableau, Power BI, Cloudera",
  },
];

const STATIC_BENEFITS = [
  {
    title: "Global Delivery Capabilities",
    desc: "Access our worldwide network of development centers and domain experts.",
    icon: Globe2,
  },
  {
    title: "Co-Innovation Programs",
    desc: "Work with our R&D teams to build next-generation prototypes and POCs.",
    icon: Zap,
  },
  {
    title: "Strategic Go-to-Market",
    desc: "Joint marketing and sales initiatives to accelerate market penetration.",
    icon: Handshake,
  },
  {
    title: "Governance & Compliance",
    desc: "Rigorous security standards and multi-region regulatory compliance.",
    icon: ShieldCheck,
  },
];

const STATIC_LOGOS = [
  { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { name: "Google Cloud", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" },
  { name: "Microsoft Azure", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg" },
  { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name: "ServiceNow", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d4/ServiceNow_logo.svg" },
  { name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
  { name: "Snowflake", logo: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Snowflake_Logo.svg" },
  { name: "SAP", logo: "https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg" },
];

const STATIC_MEET_IMAGES = [
  { src: "/images/partner-card-oots.png", alt: "Hutech and Oots Strategic Partnership" },
  { src: "/images/partner-card-maconsus.png", alt: "Hutech and Maconsus Strategic Partnership" },
  { src: "/images/partner-card-nasscom.png", alt: "Nasscom Membership Certificate" },
];

interface PartnershipClientProps {
  heroTagline?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroBgImage?: string;

  introTitle?: string;
  introDescription?: string;
  introBullets?: string[];
  introImage?: string;

  categoriesTitle?: string;
  categoriesDescription?: string;
  categories?: { title: string; desc: string; partners: string }[];

  meetTitle?: string;
  meetDescription?: string;
  meetBtnText?: string;
  meetBtnUrl?: string;
  meetImages?: { src: string; alt: string }[];

  logos?: { name: string; logo: string }[];

  benefitsTitle?: string;
  benefitsImage?: string;
  benefits?: { title: string; desc: string }[];

  ctaTitle?: string;
  ctaDescription?: string;
  ctaEmail?: string;
}

export default function PartnershipClient({
  heroTagline = "Ecosystem of Excellence",
  heroTitle = "Strategic |Technology ^Alliances.",
  heroDescription = "We collaborate with the world's leading technology providers to architect, implement, and manage comprehensive digital solutions that empower global enterprises.",
  heroBgImage = "https://images.unsplash.com/photo-1591453214154-c95db71dbd83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",

  introTitle = "Architecting |Shared ^Success.",
  introDescription = "At Hutech Solutions, our partnership philosophy is built on mutual growth, shared innovation, and a commitment to delivering exceptional value. We don't just use technology; we build strategic bridges between platforms and business goals.",
  introBullets = ["Accelerated Time-to-Market", "Access to Specialized Labs", "Joint Product Engineering", "Global Scaling Support"],
  introImage = "https://images.unsplash.com/photo-1610702876884-0f8473590287?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",

  categoriesTitle = "Partner Ecosystem",
  categoriesDescription = "Our alliance network spans across multiple technology domains and industry verticals.",
  categories = STATIC_CATEGORIES,

  meetTitle = "Meet Our Partners",
  meetDescription = "Our partners are industry leaders who share our commitment to innovation and excellence. Together, we combine strengths and leverage cutting-edge solutions to achieve outstanding results. Join us and experience the transformative power of a Hutech Solutions partnership.",
  meetBtnText = "Find What You Need",
  meetBtnUrl = "/services",
  meetImages = STATIC_MEET_IMAGES,

  logos = STATIC_LOGOS,

  benefitsTitle = "Value of |^Association.",
  benefitsImage = "https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  benefits = STATIC_BENEFITS,

  ctaTitle = "Become a |^Strategic Partner.",
  ctaDescription = "Are you ready to redefine industry standards? Join our ecosystem and leverage our global reach and engineering excellence to scale your business.",
  ctaEmail = "alliances@hutechsolutions.com",
}: PartnershipClientProps) {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="Partnership | Hutech Solutions"
        description="Collaborate with Hutech Solutions. We build strategic partnerships with global technology leaders to drive mutual growth and innovation."
      />

      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={heroBgImage}
            alt="Strategic Partnerships"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 text-left lg:px-20">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[1px] w-12 bg-[#F99D1C]"></span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#F99D1C] uppercase">
                {heroTagline}
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              {renderTitle(heroTitle, "text-white", "text-[#F99D1C]", "text-[#0171c1]")}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              {heroDescription}
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
            <Motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="display-font text-4xl leading-tight font-semibold text-[#001A3D] md:text-6xl">
                {renderTitle(introTitle, "text-[#001A3D]", "text-[#F99D1C]", "text-[#0171c1]")}
              </h2>
              <p className="text-lg leading-relaxed font-medium text-gray-600">
                {introDescription}
              </p>
              <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-2">
                {introBullets.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-[#0171c1]" />
                    <span className="text-sm font-bold tracking-wide text-[#001A3D] uppercase">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </Motion.div>

            <Motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 aspect-[4/3] overflow-hidden rounded-[3rem] shadow-2xl">
                <ImageWithFallback
                  src={introImage}
                  alt="Team Collaboration"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 -z-10 h-48 w-48 rounded-full bg-[#0171c1]/10 blur-3xl"></div>
              <div className="absolute -top-10 -right-10 -z-10 h-64 w-64 rounded-full bg-[#001A3D]/5 blur-3xl"></div>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-4 text-center">
            <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
              {renderTitle(categoriesTitle, "text-[#001A3D]", "text-[#F99D1C]", "text-[#0171c1]")}
            </h2>
            <p className="mx-auto max-w-2xl font-medium text-gray-500">
              {categoriesDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {categories.map((cat, i) => {
              // Map fallback icons if they are missing
              const Icon = i === 0 ? Cloud : i === 1 ? Briefcase : Database;
              const partnersList = cat.partners.split(',').map(p => p.trim()).filter(Boolean);
              
              return (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group border border-gray-100 bg-white p-10 shadow-sm transition-all duration-500 hover:shadow-xl"
                >
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-sm bg-[#0171c1]/5 text-[#0171c1] transition-colors duration-500 group-hover:bg-[#0171c1] group-hover:text-white">
                    <Icon size={28} />
                  </div>
                  <h3 className="display-font mb-4 text-2xl font-bold text-[#001A3D]">
                    {renderTitle(cat.title, "text-[#001A3D]", "text-[#F99D1C]", "text-[#0171c1]")}
                  </h3>
                  <p className="mb-8 text-sm leading-relaxed text-gray-500">{cat.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {partnersList.map((p, j) => (
                      <span
                        key={j}
                        className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-bold tracking-widest text-[#001A3D] uppercase"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </Motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet Our Partners Section */}
      <section className="bg-white py-24 border-t border-gray-100">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-12 text-center space-y-4">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="display-font text-3xl font-bold tracking-tight text-[#001A3D] sm:text-5xl"
            >
              {renderTitle(meetTitle, "text-[#001A3D]", "text-[#F99D1C]", "text-[#0171c1]")}
            </Motion.h2>
            <Motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-3xl font-medium text-gray-600 leading-relaxed text-sm md:text-base"
            >
              {meetDescription}
            </Motion.p>
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="pt-2"
            >
              <Link
                href={meetBtnUrl}
                className="inline-flex items-center gap-2 font-bold text-[#0171c1] hover:text-[#001A3D] transition-colors group text-sm"
              >
                {meetBtnText} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Motion.div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {meetImages.map((card, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-gray-200 flex items-center justify-center"
              >
                <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-50 flex items-center justify-center">
                  <img
                    src={card.src}
                    alt={card.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Grid */}
      <section className="border-y border-gray-100 bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-2 items-center gap-12 md:grid-cols-4 lg:grid-cols-8">
            {logos.map((logo, i) => (
              <div 
                key={i} 
                className="flex justify-center p-4 opacity-60 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
              >
                <img src={logo.logo} alt={logo.name} className="h-10 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-[#001A3D] py-24 text-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
            <div>
              <h2 className="display-font mb-12 text-4xl font-semibold md:text-5xl">
                {renderTitle(benefitsTitle, "text-white", "text-[#F99D1C]", "text-[#0171c1]")}
              </h2>
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                {benefits.map((benefit, i) => {
                  const Icon = i === 0 ? Globe2 : i === 1 ? Zap : i === 2 ? Handshake : ShieldCheck;
                  return (
                    <div key={i} className="space-y-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#0171c1]/30 text-[#0171c1]">
                        <Icon size={20} />
                      </div>
                      <h4 className="display-font text-xl font-bold">
                        {renderTitle(benefit.title, "text-white", "text-[#F99D1C]", "text-[#0171c1]")}
                      </h4>
                      <p className="text-sm leading-relaxed text-white/60">{benefit.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src={benefitsImage}
                alt="Cloud Infrastructure"
                className="h-full w-full rounded-[3rem] object-cover opacity-80"
              />
              <div className="absolute inset-0 rounded-[3rem] bg-[#001A3D]/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Form Section */}
      <section className="bg-white py-32">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="relative overflow-hidden rounded-[4rem] border border-gray-100 bg-gray-50 p-12 lg:p-24">
            <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[#0171c1]/5 blur-[100px]"></div>

            <div className="relative z-10 grid grid-cols-1 items-start gap-20 lg:grid-cols-2">
              <div className="space-y-8">
                <h2 className="display-font text-4xl leading-tight font-semibold text-[#001A3D] md:text-6xl">
                  {renderTitle(ctaTitle, "text-[#001A3D]", "text-[#F99D1C]", "text-[#0171c1]")}
                </h2>
                <p className="text-lg font-medium text-gray-500">
                  {ctaDescription}
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-[#0171c1] text-white">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-bold tracking-widest text-gray-400 uppercase">
                        Inquiry Email
                      </p>
                      <p className="font-bold text-[#001A3D]">{ctaEmail}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-10 shadow-2xl md:p-12">
                <h3 className="display-font mb-8 text-2xl font-bold text-[#001A3D]">
                  Partner Registration
                </h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full border-transparent bg-gray-50 p-4 text-sm font-medium transition-all outline-none focus:border-[#0171c1] focus:bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="w-full border-transparent bg-gray-50 p-4 text-sm font-medium transition-all outline-none focus:border-[#0171c1] focus:bg-white"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Business Email"
                    className="w-full border-transparent bg-gray-50 p-4 text-sm font-medium transition-all outline-none focus:border-[#0171c1] focus:bg-white"
                  />
                  <select className="w-full appearance-none border-transparent bg-gray-50 p-4 text-sm font-medium transition-all outline-none focus:border-[#0171c1] focus:bg-white">
                    <option value="">Select Partnership Type</option>
                    <option value="technology">Technology Partner</option>
                    <option value="solution">Solution Partner</option>
                    <option value="channel">Channel Partner</option>
                  </select>
                  <textarea
                    placeholder="Tell us about your proposal"
                    rows={4}
                    className="w-full resize-none border-transparent bg-gray-50 p-4 text-sm font-medium transition-all outline-none focus:border-[#0171c1] focus:bg-white"
                  ></textarea>
                  <button className="flex w-full items-center justify-center gap-3 bg-[#0171c1] py-5 text-xs font-bold tracking-[0.2em] text-white uppercase transition-all hover:bg-[#001A3D]">
                    Submit Proposal <ArrowRight size={16} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
