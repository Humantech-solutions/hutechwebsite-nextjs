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
      icon: <Trophy className="w-8 h-8" />
    },
    { 
      title: "Innovation in AI & Machine Learning", 
      year: "2024", 
      issuer: "Future Tech Summit",
      desc: "Recognized for pioneering implementations of RAG and LLM technologies in enterprise software.",
      icon: <Zap className="w-8 h-8" />
    },
    { 
      title: "Top Workplace for Global Talent", 
      year: "2024", 
      issuer: "Great Place to Work®",
      desc: "Honored for our inclusive culture and commitment to professional growth and wellness.",
      icon: <Star className="w-8 h-8" />
    },
    { 
      title: "Cloud Transformation Partner of the Year", 
      year: "2023", 
      issuer: "Cloud World Forum",
      desc: "Recognized for leading multi-cloud migrations for Fortune 500 enterprises.",
      icon: <Globe className="w-8 h-8" />
    },
    { 
      title: "Best Cybersecurity Implementation", 
      year: "2023", 
      issuer: "Security Leaders Forum",
      desc: "Awarded for excellence in zero-trust architecture and data protection strategies.",
      icon: <ShieldCheck className="w-8 h-8" />
    },
    { 
      title: "Sustainable Tech Growth Award", 
      year: "2022", 
      issuer: "Eco-Tech Alliance",
      desc: "Recognized for reducing the carbon footprint of data centers through optimized software engineering.",
      icon: <Medal className="w-8 h-8" />
    }
  ];

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta 
        title="Awards and Recognition | Hutech Solutions"
        description="Celebrating our achievements and global recognition in technology and engineering excellence."
      />
      <Breadcrumbs variant="light" />
      
      {/* Hero Section */}
      <section className="bg-[#001A3D] text-white h-[450px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1764874299025-d8b2251f307d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Awards and Recognition"
            className="w-full h-full object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/80 to-transparent"></div>
        </div>
        
        <div className="absolute inset-0 flex items-center z-10 text-left">
          <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-20">
            <Motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-4xl space-y-8"
            >
              <div className="flex items-center space-x-3">
                <span className="w-12 h-[1px] bg-[#FFAF2B]"></span>
                <span className="text-[#FFAF2B] font-semibold tracking-wide text-xs uppercase">Our Milestones</span>
              </div>
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight display-font">
                Awards & <br />
                <span className="text-[#FFAF2B]">Recognition.</span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed max-w-2xl font-medium">
                Celebrating a legacy of excellence and the relentless pursuit of innovation that defines Hutech Solutions.
              </p>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* Recognition Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {awardsList.map((award, i) => (
              <Motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 space-y-8 hover:bg-white hover:shadow-2xl transition-all group duration-500"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#FFAF2B] shadow-sm group-hover:bg-[#FFAF2B] group-hover:text-white transition-all duration-500">
                  {award.icon}
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <span className="text-[#FFAF2B] text-xs font-bold uppercase tracking-widest">{award.year}</span>
                    <span className="text-gray-400 text-xs font-semibold">{award.issuer}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#001A3D] display-font leading-tight">
                    {award.title}
                  </h3>
                  <p className="text-gray-500 font-medium text-sm leading-relaxed">
                    {award.desc}
                  </p>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Award Section */}
      <section className="py-24 bg-[#001A3D] text-white relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 space-y-10">
               <h2 className="text-4xl md:text-6xl font-semibold display-font leading-tight tracking-tight">
                 Recognized for <br /> <span className="text-[#FFAF2B]">Global Excellence.</span>
               </h2>
               <p className="text-gray-400 text-lg leading-relaxed font-medium">
                 Our journey is marked by certifications and recognitions that validate our engineering prowess and operational maturity. From ISO standards to premier partnership tiers with tech giants, we ensure our clients work with the best.
               </p>
               <div className="grid grid-cols-2 gap-10">
                  {[
                    { label: "ISO Certified", value: "9001 & 27001" },
                    { label: "Global Reach", value: "12+ Countries" },
                    { label: "Elite Partners", value: "AWS, Azure, GCP" },
                    { label: "Satisfaction", value: "98% Client Retention" }
                  ].map((stat, i) => (
                    <div key={i} className="space-y-2 border-l border-[#FFAF2B]/30 pl-6">
                       <p className="text-[#FFAF2B] text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                       <p className="text-2xl font-bold display-font">{stat.value}</p>
                    </div>
                  ))}
               </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-[#FFAF2B]/10 blur-3xl rounded-full"></div>
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Corporate Milestone"
                  className="rounded-[3rem] shadow-2xl relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 text-center space-y-12">
           <h2 className="text-4xl md:text-5xl font-semibold text-[#001A3D] display-font tracking-tight">
             Join our award-winning <span className="text-[#FFAF2B]">journey.</span>
           </h2>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <Link href="/resources/case-studies" className="bg-[#FFAF2B] text-[#001A3D] px-12 py-5 rounded-sm font-bold transition-all tracking-wide text-xs shadow-xl shadow-[#FFAF2B]/20 hover:bg-[#ff9d00] text-center">
                Explore Case Studies
             </Link>
             <Link href="/contact" className="bg-transparent border border-[#001A3D]/20 text-[#001A3D] px-12 py-5 rounded-sm font-bold transition-all tracking-wide text-xs hover:border-[#FFAF2B] hover:text-[#FFAF2B] text-center">
                Partner With Us
             </Link>
           </div>
        </div>
      </section>
    </div>
  );
}
