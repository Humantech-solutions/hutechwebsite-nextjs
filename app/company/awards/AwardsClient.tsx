"use client";

import React from "react";
import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Award, Star, Trophy, Medal, ShieldCheck, Zap, Globe } from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";
import { renderTitle } from "@/lib/utils";

interface AwardsClientProps {
  heroTagline?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroBgImage?: string;
  
  journeyTagline?: string;
  journeyTitle?: string;
  journeyDescription?: string;
  awardsList?: {
    title: string;
    year: string;
    issuer: string;
    desc: string;
    iconName: string;
    link?: string;
  }[];
  
  featuredTitle?: string;
  featuredDescription?: string;
  featuredImage?: string;
  stats?: {
    label: string;
    value: string;
  }[];
  
  ctaTitle?: string;
  ctaBtn1Text?: string;
  ctaBtn1Url?: string;
  ctaBtn2Text?: string;
  ctaBtn2Url?: string;
}

const getIcon = (name: string) => {
  switch (name) {
    case "Zap": return <Zap className="h-8 w-8" />;
    case "Star": return <Star className="h-8 w-8" />;
    case "Globe": return <Globe className="h-8 w-8" />;
    case "ShieldCheck": return <ShieldCheck className="h-8 w-8" />;
    case "Medal": return <Medal className="h-8 w-8" />;
    case "Award": return <Award className="h-8 w-8" />;
    case "Trophy":
    default:
      return <Trophy className="h-8 w-8" />;
  }
};

const DEFAULT_AWARDS = [
  {
    title: "Excellence in Digital Engineering",
    year: "2025",
    issuer: "Global Tech Awards",
    desc: "Awarded for exceptional contributions to regional digital infrastructure development.",
    iconName: "Trophy",
  },
  {
    title: "Innovation in AI & Machine Learning",
    year: "2024",
    issuer: "Future Tech Summit",
    desc: "Recognized for pioneering implementations of RAG and LLM technologies in enterprise software.",
    iconName: "Zap",
  },
  {
    title: "Top Workplace for Global Talent",
    year: "2024",
    issuer: "Great Place to Work®",
    desc: "Honored for our inclusive culture and commitment to professional growth and wellness.",
    iconName: "Star",
  },
  {
    title: "Cloud Transformation Partner of the Year",
    year: "2023",
    issuer: "Cloud World Forum",
    desc: "Recognized for leading multi-cloud migrations for Fortune 500 enterprises.",
    iconName: "Globe",
  },
  {
    title: "Best Cybersecurity Implementation",
    year: "2023",
    issuer: "Security Leaders Forum",
    desc: "Awarded for excellence in zero-trust architecture and data protection strategies.",
    iconName: "ShieldCheck",
  },
  {
    title: "Sustainable Tech Growth Award",
    year: "2022",
    issuer: "Eco-Tech Alliance",
    desc: "Recognized for reducing the carbon footprint of data centers through optimized software engineering.",
    iconName: "Medal",
  },
];

const DEFAULT_STATS = [
  { label: "ISO Certified", value: "9001 & 27001" },
  { label: "Global Reach", value: "12+ Countries" },
  { label: "Elite Partners", value: "AWS, Azure, GCP" },
  { label: "Satisfaction", value: "98% Client Retention" },
];

export default function AwardsClient({
  heroTagline = "Our Milestones",
  heroTitle = "Awards & |Recognition.",
  heroDescription = "Celebrating a legacy of excellence and the relentless pursuit of innovation that defines Hutech Solutions.",
  heroBgImage = "https://images.unsplash.com/photo-1764874299025-d8b2251f307d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
  journeyTagline = "Milestones",
  journeyTitle = "A Journey of Distinction",
  journeyDescription,
  awardsList = DEFAULT_AWARDS,
  featuredTitle = "Recognized for |Global Excellence.",
  featuredDescription = "Our journey is marked by certifications and recognitions that validate our engineering prowess and operational maturity. From ISO standards to premier partnership tiers with tech giants, we ensure our clients work with the best.",
  featuredImage = "https://images.unsplash.com/photo-1578575437130-527eed3abbec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  stats = DEFAULT_STATS,
  ctaTitle = "Join our award-winning |journey.",
  ctaBtn1Text = "Explore Case Studies",
  ctaBtn1Url = "/resources/case-studies",
  ctaBtn2Text = "Partner With Us",
  ctaBtn2Url = "/contact",
}: AwardsClientProps) {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="Awards and Recognition | Hutech Solutions"
        description="Celebrating our achievements and global recognition in technology and engineering excellence."
      />
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={heroBgImage}
            alt="Awards and Recognition"
            className="h-full w-full scale-105 object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/80 to-transparent"></div>
        </div>

        <div className="absolute inset-0 z-10 flex items-center text-left">
          <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-20">
            <Motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-4xl space-y-8"
            >
              <div className="flex items-center space-x-3">
                <span className="h-[1px] w-12 bg-[#F99D1C]"></span>
                <span className="text-xs font-semibold tracking-wide text-[#F99D1C] uppercase">
                  {heroTagline}
                </span>
              </div>
              <h1 className="display-font text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
                {renderTitle(heroTitle, "text-white", "text-[#F99D1C]")}
              </h1>
              <p className="max-w-2xl text-xl leading-relaxed font-medium text-gray-400">
                {heroDescription}
              </p>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* Recognition Grid */}
      <section className="bg-[#f8f8f8] py-32">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          
          {/* Center-aligned Section Heading */}
          <div className="mb-24 text-center space-y-4">
            {journeyTagline && (
              <p className="text-[10px] md:text-xs font-bold tracking-widest text-[#F99D1C] uppercase">
                {journeyTagline}
              </p>
            )}
            <h2 className="display-font text-3xl font-semibold tracking-tight text-[#001A3D] md:text-4xl">
              {renderTitle(journeyTitle, "text-[#001A3D]", "text-[#F99D1C]")}
            </h2>
            <div className="mx-auto h-[2px] w-16 bg-[#F99D1C]"></div>
            {journeyDescription && (
              <p className="mx-auto max-w-2xl text-sm leading-relaxed font-medium text-gray-500 mt-4">
                {journeyDescription}
              </p>
            )}
          </div>

          {/* Timeline List */}
          <div className="flex flex-col">
            {awardsList.map((award, i) => {
              const Wrapper = award.link ? "a" : "div";
              const wrapperProps = award.link 
                ? { href: award.link, target: "_blank", rel: "noopener noreferrer" } 
                : {};
                
              return (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                  className="group relative flex flex-col md:grid md:grid-cols-[160px_1fr_80px] md:items-center gap-6 md:gap-12 py-12 px-6 md:px-12 bg-transparent hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.03)] rounded-3xl transition-all duration-500 border-b border-gray-200/80 last:border-b-0 -mx-6 md:-mx-12"
                >
                  <Wrapper {...wrapperProps} className="contents">
                    {/* Left Side: Large Year Text */}
                    <div className="w-full md:w-[160px] md:shrink-0">
                      <span className="display-font text-5xl md:text-6xl font-light tracking-tight text-[#001A3D] transition-colors duration-300 group-hover:text-[#F99D1C]">
                        {award.year}
                      </span>
                    </div>

                    {/* Middle Section: Category, Title, Description */}
                    <div className="flex-1 flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <span className="h-[1px] w-6 bg-[#F99D1C]/60"></span>
                        <span className="text-[10px] md:text-xs font-bold tracking-widest text-[#F99D1C] uppercase">
                          {award.issuer}
                        </span>
                      </div>
                      <h3 className="display-font text-2xl font-bold leading-tight text-[#001A3D] group-hover:text-[#0171c1] transition-colors">
                        {award.title}
                      </h3>
                      <p className="max-w-3xl text-sm md:text-base leading-relaxed font-medium text-gray-500">
                        {award.desc}
                      </p>
                    </div>

                    {/* Right Side: Subtle Circular Icon Container */}
                    <div className="w-full md:w-[80px] md:shrink-0 flex md:justify-end">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gray-100 bg-white/80 text-[#F99D1C] shadow-sm transition-all duration-500 group-hover:border-[#F99D1C] group-hover:bg-white group-hover:shadow-[0_0_25px_rgba(249,157,28,0.15)]">
                        {getIcon(award.iconName)}
                      </div>
                    </div>
                  </Wrapper>
                </Motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Award Section */}
      <section className="relative overflow-hidden bg-[#001A3D] py-24 text-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex flex-col items-center gap-20 lg:flex-row">
            <div className="flex-1 space-y-10">
              <h2 className="display-font text-4xl leading-tight font-semibold tracking-tight md:text-6xl">
                {renderTitle(featuredTitle, "text-white", "text-[#F99D1C]")}
              </h2>
              <p className="text-lg leading-relaxed font-medium text-gray-400">
                {featuredDescription}
              </p>
              <div className="grid grid-cols-2 gap-10">
                {stats.map((stat, i) => (
                  <div key={i} className="space-y-2 border-l border-[#F99D1C]/30 pl-6">
                    <p className="text-xs font-bold tracking-widest text-[#F99D1C] uppercase">
                      {stat.label}
                    </p>
                    <p className="display-font text-2xl font-bold">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-[#F99D1C]/10 blur-3xl"></div>
                <ImageWithFallback
                  src={featuredImage}
                  alt="Corporate Milestone"
                  className="relative z-10 rounded-[3rem] shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] space-y-12 px-6 text-center lg:px-20">
          <h2 className="display-font text-4xl font-semibold tracking-tight text-[#001A3D] md:text-5xl">
            {renderTitle(ctaTitle, "text-[#001A3D]", "text-[#F99D1C]")}
          </h2>
          <div className="flex flex-col justify-center gap-6 sm:flex-row">
            {ctaBtn1Text && (
              <Link
                href={ctaBtn1Url}
                className="rounded-sm bg-[#F99D1C] px-12 py-5 text-center text-xs font-bold tracking-wide text-[#001A3D] shadow-xl shadow-[#F99D1C]/20 transition-all hover:bg-[#ff9d00]"
              >
                {ctaBtn1Text}
              </Link>
            )}
            {ctaBtn2Text && (
              <Link
                href={ctaBtn2Url}
                className="rounded-sm border border-[#001A3D]/20 bg-transparent px-12 py-5 text-center text-xs font-bold tracking-wide text-[#001A3D] transition-all hover:border-[#F99D1C] hover:text-[#F99D1C]"
              >
                {ctaBtn2Text}
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
