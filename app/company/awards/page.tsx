"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Award, Star, Trophy, Medal, ShieldCheck, Zap, Globe, MoveRight } from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

export default function Awards() {
  const awardsList = [
    {
      title: "Excellence in Digital Engineering",
      year: "2025",
      issuer: "Global Tech Awards",
      desc: "Awarded for exceptional contributions to regional digital infrastructure development.",
      icon: <Trophy className="h-8 w-8" />,
    },
    {
      title: "Innovation in AI & Machine Learning",
      year: "2024",
      issuer: "Future Tech Summit",
      desc: "Recognized for pioneering implementations of RAG and LLM technologies in enterprise software.",
      icon: <Zap className="h-8 w-8" />,
    },
    {
      title: "Top Workplace for Global Talent",
      year: "2024",
      issuer: "Great Place to Work®",
      desc: "Honored for our inclusive culture and commitment to professional growth and wellness.",
      icon: <Star className="h-8 w-8" />,
    },
    {
      title: "Cloud Transformation Partner of the Year",
      year: "2023",
      issuer: "Cloud World Forum",
      desc: "Recognized for leading multi-cloud migrations for Fortune 500 enterprises.",
      icon: <Globe className="h-8 w-8" />,
    },
    {
      title: "Best Cybersecurity Implementation",
      year: "2023",
      issuer: "Security Leaders Forum",
      desc: "Awarded for excellence in zero-trust architecture and data protection strategies.",
      icon: <ShieldCheck className="h-8 w-8" />,
    },
    {
      title: "Sustainable Tech Growth Award",
      year: "2022",
      issuer: "Eco-Tech Alliance",
      desc: "Recognized for reducing the carbon footprint of data centers through optimized software engineering.",
      icon: <Medal className="h-8 w-8" />,
    },
  ];

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
            src="https://images.unsplash.com/photo-1764874299025-d8b2251f307d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
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
                  Our Milestones
                </span>
              </div>
              <h1 className="display-font text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
                Awards & <br />
                <span className="text-[#F99D1C]">Recognition.</span>
              </h1>
              <p className="max-w-2xl text-xl leading-relaxed font-medium text-gray-400">
                Celebrating a legacy of excellence and the relentless pursuit of innovation that
                defines Hutech Solutions.
              </p>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* Recognition Grid */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {awardsList.map((award, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group space-y-8 rounded-[2.5rem] border border-gray-100 bg-gray-50 p-10 transition-all duration-500 hover:bg-white hover:shadow-2xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#F99D1C] shadow-sm transition-all duration-500 group-hover:bg-[#F99D1C] group-hover:text-white">
                  {award.icon}
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <span className="text-xs font-bold tracking-widest text-[#F99D1C] uppercase">
                      {award.year}
                    </span>
                    <span className="text-xs font-semibold text-gray-400">{award.issuer}</span>
                  </div>
                  <h3 className="display-font text-2xl leading-tight font-bold text-[#001A3D]">
                    {award.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-medium text-gray-500">{award.desc}</p>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Award Section */}
      <section className="relative overflow-hidden bg-[#001A3D] py-24 text-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex flex-col items-center gap-20 lg:flex-row">
            <div className="flex-1 space-y-10">
              <h2 className="display-font text-4xl leading-tight font-semibold tracking-tight md:text-6xl">
                Recognized for <br /> <span className="text-[#F99D1C]">Global Excellence.</span>
              </h2>
              <p className="text-lg leading-relaxed font-medium text-gray-400">
                Our journey is marked by certifications and recognitions that validate our
                engineering prowess and operational maturity. From ISO standards to premier
                partnership tiers with tech giants, we ensure our clients work with the best.
              </p>
              <div className="grid grid-cols-2 gap-10">
                {[
                  { label: "ISO Certified", value: "9001 & 27001" },
                  { label: "Global Reach", value: "12+ Countries" },
                  { label: "Elite Partners", value: "AWS, Azure, GCP" },
                  { label: "Satisfaction", value: "98% Client Retention" },
                ].map((stat, i) => (
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
                  src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
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
            Join our award-winning <span className="text-[#F99D1C]">journey.</span>
          </h2>
          <div className="flex flex-col justify-center gap-6 sm:flex-row">
            <Link
              href="/resources/case-studies"
              className="rounded-sm bg-[#F99D1C] px-12 py-5 text-center text-xs font-bold tracking-wide text-[#001A3D] shadow-xl shadow-[#F99D1C]/20 transition-all hover:bg-[#ff9d00]"
            >
              Explore Case Studies
            </Link>
            <Link
              href="/contact"
              className="rounded-sm border border-[#001A3D]/20 bg-transparent px-12 py-5 text-center text-xs font-bold tracking-wide text-[#001A3D] transition-all hover:border-[#F99D1C] hover:text-[#F99D1C]"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
