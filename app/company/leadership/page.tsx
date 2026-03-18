"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { MoveRight, Linkedin, Twitter, Mail, Award, Globe, Briefcase } from "lucide-react";
import Link from "next/link";
import { Meta } from "@/components/Meta";

export default function Leadership() {
  const leaders = [
    {
      name: "Siddharth Verma",
      role: "CEO & Founder",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      bio: "20+ years of experience in scaling technology consulting firms across APAC and EMEA.",
    },
    {
      name: "Ananya Rao",
      role: "Chief Technology Officer",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      bio: "Former lead architect at a Silicon Valley giant, now driving Hutech's AI and Cloud strategy.",
    },
    {
      name: "Michael Chen",
      role: "Head of AI Innovation",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      bio: "PhD in Machine Learning with a focus on real-time edge computing and industrial automation.",
    },
    {
      name: "Elena Rodriguez",
      role: "VP of Global Delivery",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      bio: "Ensures operational excellence across Hutech's 15+ global delivery centers.",
    },
    {
      name: "David Thorne",
      role: "Chief Operations Officer",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      bio: "Expert in lean management and global supply chain technology integration.",
    },
    {
      name: "Sarah Jenkins",
      role: "Head of Talent & Culture",
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      bio: "Scaling Hutech's global workforce while maintaining a culture of engineering integrity.",
    },
    {
      name: "Vikram Malhotra",
      role: "VP of Sales - Americas",
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      bio: "Strategizing enterprise growth and key account management for Fortune 500 clients.",
    },
    {
      name: "Li Wei",
      role: "Head of Cybersecurity",
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      bio: "Architecting zero-trust security frameworks for Hutech's global fintech implementations.",
    },
  ];

  const advisors = [
    { name: "Dr. James Aris", firm: "Former CIO, Global Bank", region: "London" },
    { name: "Linda Kawaski", firm: "Retail Tech Advisor", region: "New York" },
    { name: "Robert Sung", firm: "Cloud Infrastructure Specialist", region: "Singapore" },
  ];

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="Leadership Team | Hutech Solutions"
        description="Meet the visionaries and experts leading Hutech Solutions toward innovation and global leadership."
      />
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            className="h-full w-full object-cover opacity-10"
            alt="Leadership at Hutech"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#001A3D]"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 text-left lg:px-20">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <span className="h-[1px] w-12 bg-[#FFAF2B]"></span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#FFAF2B] uppercase">
                The Executive Bench
              </span>
            </div>
            <h1 className="display-font text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              The <span className="text-[#FFAF2B]">Visionaries.</span>
            </h1>
            <p className="max-w-2xl text-xl font-medium text-gray-400 italic">
              "Leadership at Hutech is about enabling the brilliance of our engineers to solve the
              world's most complex digital challenges."
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Main Leadership Grid */}
      <section className="bg-white py-32">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2 lg:grid-cols-4">
            {leaders.map((leader, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group"
              >
                <div className="relative mb-8 aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-gray-50 shadow-lg transition-all duration-500 group-hover:shadow-2xl">
                  <ImageWithFallback
                    src={leader.img}
                    alt={leader.name}
                    className="h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#001A3D] via-transparent to-transparent p-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="flex gap-4">
                      <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-colors hover:bg-[#FFAF2B]">
                        <Linkedin size={16} className="text-white" />
                      </button>
                      <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-colors hover:bg-[#FFAF2B]">
                        <Twitter size={16} className="text-white" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 px-2">
                  <h4 className="display-font text-2xl font-bold tracking-tight text-[#001A3D]">
                    {leader.name}
                  </h4>
                  <p className="text-[10px] font-black tracking-widest text-[#0171c1] uppercase">
                    {leader.role}
                  </p>
                  <p className="line-clamp-2 text-sm leading-relaxed font-medium text-gray-400 transition-all duration-500 group-hover:line-clamp-none">
                    {leader.bio}
                  </p>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board Section */}
      <section className="relative overflow-hidden bg-[#FAF9F6] py-32">
        <div className="pointer-events-none absolute top-0 right-0 p-32 text-[#001A3D] opacity-[0.03]">
          <Globe size={400} />
        </div>
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-20 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-4">
              <h2 className="display-font text-4xl leading-tight font-bold text-[#001A3D] md:text-6xl">
                Board of <br /> <span className="text-[#0171c1]">Advisors.</span>
              </h2>
              <p className="text-lg leading-relaxed font-medium text-gray-500">
                Our strategic direction is refined by a global board of industry veterans who bring
                decades of leadership experience from the world's most successful organizations.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-sm bg-[#001A3D] px-10 py-5 text-[11px] font-black tracking-widest text-white uppercase transition-all hover:bg-[#0171c1]"
              >
                Engage with Us <MoveRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:col-span-8">
              {advisors.map((advisor, idx) => (
                <div
                  key={idx}
                  className="group rounded-[2.5rem] border border-gray-100 bg-white p-10 shadow-sm transition-all duration-500 hover:shadow-xl"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 transition-colors group-hover:bg-[#FFAF2B] group-hover:text-white">
                    <Briefcase size={20} />
                  </div>
                  <h4 className="mb-1 text-xl font-bold text-[#001A3D]">{advisor.name}</h4>
                  <p className="mb-4 text-xs font-bold tracking-widest text-[#0171c1] uppercase">
                    {advisor.firm}
                  </p>
                  <div className="border-t border-gray-50 pt-4 text-[10px] font-black tracking-widest text-gray-300 uppercase">
                    {advisor.region}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Join CTA */}
      <section className="py-32">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="group relative overflow-hidden rounded-[3rem] bg-[#001A3D] p-12 text-center text-white md:p-24">
            <div className="absolute top-0 right-0 -mt-48 -mr-48 h-96 w-96 rounded-full bg-[#0171c1]/20 blur-[100px]"></div>
            <div className="relative z-10 mx-auto max-w-4xl space-y-10">
              <div className="flex justify-center">
                <Award size={64} className="text-[#FFAF2B]" />
              </div>
              <h2 className="display-font text-4xl leading-tight font-semibold tracking-tight md:text-6xl">
                Lead the Next <br /> <span className="text-[#FFAF2B]">Digital Frontier.</span>
              </h2>
              <p className="text-xl font-medium text-gray-400">
                We are always looking for visionary leaders to join our executive bench. If you have
                a passion for engineering excellence and global growth, we want to hear from you.
              </p>
              <div className="flex flex-col justify-center gap-6 pt-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="rounded-sm bg-[#0171c1] px-12 py-5 text-center text-[11px] font-black tracking-widest text-white uppercase shadow-xl transition-all hover:bg-white hover:text-[#001A3D]"
                >
                  Partner With Us
                </Link>
                <Link
                  href="/careers"
                  className="rounded-sm border border-white/20 bg-transparent px-12 py-5 text-center text-[11px] font-black tracking-widest text-white uppercase transition-all hover:border-[#FFAF2B] hover:text-[#FFAF2B]"
                >
                  Executive Careers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
