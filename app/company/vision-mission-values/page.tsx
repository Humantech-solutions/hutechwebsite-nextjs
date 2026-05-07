"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Eye, Target, ShieldCheck, Zap, Star, Users, Award } from "lucide-react";
import { Meta } from "@/components/Meta";

export default function VisionMissionValues() {
  const values = [
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "Integrity",
      desc: "We uphold the highest standards of integrity in all our actions, ensuring transparency, honesty, and ethical conduct in every partnership.",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Innovation",
      desc: "We foster a culture of relentless innovation, constantly exploring new technologies and methodologies to solve complex business challenges.",
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Excellence",
      desc: "We are committed to delivering excellence in everything we do, from the code we write to the strategic advice we provide.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Customer Focus",
      desc: "Our clients' success is our success. We prioritize understanding their unique needs and delivering solutions that drive measurable impact.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Accountability",
      desc: "We take full ownership of our commitments and results, ensuring that we deliver on our promises with precision and quality.",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Collaboration",
      desc: "We believe in the power of synergy. By working closely with our clients and within our teams, we achieve extraordinary results.",
    },
  ];

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="Vision, Mission & Values | Hutech Solutions"
        description="Discover the core principles, vision, and mission that drive Hutech Solutions toward excellence in the global technology landscape."
      />
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
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
                Our Purpose
              </span>
            </div>
            <h1 className="display-font text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              Our Vision, <br />
              Mission & <span className="text-[#F99D1C]">Values.</span>
            </h1>
            <p className="max-w-2xl text-xl leading-relaxed font-medium text-gray-400">
              At Hutech Solutions, we are driven by a singular purpose: to empower businesses
              through transformative technology and unwavering commitment to excellence.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="relative overflow-hidden bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-12 md:gap-20 lg:grid-cols-2">
            {/* Vision */}
            <Motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative space-y-10 overflow-hidden rounded-[3rem] border border-gray-100 bg-gray-50 p-12 transition-all duration-500 hover:shadow-2xl md:p-16"
            >
              <div className="pointer-events-none absolute top-0 right-0 p-8 text-[#001A3D] opacity-[0.03]">
                <Eye size={120} />
              </div>
              <div className="w-fit rounded-2xl bg-white p-6 text-[#F99D1C] shadow-sm transition-colors duration-500 group-hover:bg-[#F99D1C] group-hover:text-white">
                <Eye size={36} />
              </div>
              <div className="space-y-6">
                <h2 className="display-font text-4xl font-semibold tracking-tight text-[#001A3D]">
                  Our Vision
                </h2>
                <p className="text-xl leading-relaxed font-medium text-gray-500">
                  To be a globally recognized leader in providing innovative technology solutions
                  that empower businesses and individuals to achieve their full potential and
                  transcend traditional boundaries.
                </p>
              </div>
            </Motion.div>

            {/* Mission */}
            <Motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative space-y-10 overflow-hidden rounded-[3rem] bg-[#001A3D] p-12 text-white transition-all duration-500 hover:shadow-2xl md:p-16"
            >
              <div className="pointer-events-none absolute top-0 right-0 p-8 text-white opacity-[0.05]">
                <Target size={120} />
              </div>
              <div className="w-fit rounded-2xl bg-[#F99D1C] p-6 text-[#001A3D] shadow-sm">
                <Target size={36} />
              </div>
              <div className="space-y-6">
                <h2 className="display-font text-4xl font-semibold tracking-tight text-[#F99D1C]">
                  Our Mission
                </h2>
                <p className="text-xl leading-relaxed font-medium text-gray-300">
                  To deliver high-quality, cost-effective, and customized technology solutions that
                  meet the unique needs of our clients while fostering a culture of continuous
                  improvement, innovation, and employee growth.
                </p>
              </div>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="relative overflow-hidden border-y border-gray-100 bg-gray-50 py-24">
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 opacity-[0.02]">
          <svg viewBox="0 0 100 100" className="h-full w-full fill-[#001A3D]">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mx-auto mb-24 max-w-3xl space-y-6 text-center">
            <span className="text-xs font-bold tracking-widest text-[#F99D1C] uppercase">
              The Pillars of Hutech
            </span>
            <h2 className="display-font text-4xl font-semibold tracking-tight text-[#001A3D] md:text-6xl">
              Our Core Values
            </h2>
            <p className="text-lg font-medium text-gray-500">
              The fundamental beliefs that shape our culture and define how we work together to
              serve our clients.
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
                className="group space-y-8 rounded-[2.5rem] border border-gray-100 bg-white p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl md:p-12"
              >
                <div className="w-fit rounded-2xl bg-gray-50 p-4 text-[#F99D1C] transition-all duration-300 group-hover:bg-[#F99D1C] group-hover:text-white">
                  {v.icon}
                </div>
                <div className="space-y-4">
                  <h3 className="display-font text-2xl font-bold text-[#001A3D]">{v.title}</h3>
                  <p className="leading-relaxed font-medium text-gray-500">{v.desc}</p>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="group relative overflow-hidden rounded-[3rem] bg-[#001A3D] p-12 text-center text-white md:p-24">
            <div className="absolute top-0 right-0 -mt-48 -mr-48 h-96 w-96 rounded-full bg-[#F99D1C]/10 blur-[100px] transition-transform duration-700 group-hover:scale-150"></div>
            <div className="relative z-10 space-y-10">
              <h2 className="display-font mx-auto max-w-4xl text-4xl leading-tight font-semibold tracking-tight md:text-6xl">
                Join Us in Shaping the <span className="text-[#F99D1C]">Future of Technology.</span>
              </h2>
              <p className="mx-auto max-w-2xl text-xl font-medium text-gray-400">
                Experience the Hutech difference where values meet innovation to deliver exceptional
                results.
              </p>
              <div className="flex flex-col justify-center gap-6 pt-4 sm:flex-row">
                <button className="rounded-sm bg-[#F99D1C] px-12 py-5 text-xs font-bold tracking-wide text-[#001A3D] shadow-xl shadow-[#F99D1C]/20 transition-all hover:bg-white">
                  Partner With Us
                </button>
                <button className="rounded-sm border border-white/20 bg-transparent px-12 py-5 text-xs font-bold tracking-wide text-white transition-all hover:border-[#F99D1C] hover:text-[#F99D1C]">
                  View Careers
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
