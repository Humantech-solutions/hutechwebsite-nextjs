"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import {
  Users,
  Globe2,
  Building2,
  Briefcase,
  CheckCircle2,
  TrendingUp,
  Layout,
  Settings,
  ShieldCheck,
  Star,
  Award,
  Search,
  Zap,
  MoveRight,
  Code2,
  Cpu,
  Fingerprint,
} from "lucide-react";
import Link from "next/link";
import { Meta } from "@/components/Meta";
import { GlobalMap } from "@/components/GlobalMap";

export default function AboutHutech() {
  const stats = [
    { label: "Associates", value: "100+", icon: <Users size={20} /> },
    { label: "Happy Clients", value: "20+", icon: <Briefcase size={20} /> },
    { label: "Project Delivered", value: "40+", icon: <CheckCircle2 size={20} /> },
    { label: "Countries Served", value: "10+", icon: <Globe2 size={20} /> },
    { label: "Years in Business", value: "5+", icon: <TrendingUp size={20} /> },
    { label: "Client Satisfaction", value: "100%", icon: <Star size={20} /> },
  ];

  const milestones = [
    {
      year: "2019",
      title: "Foundation",
      desc: "Incorporated with a 2-member core. Grew to 10 members and secured 2 major clients by Q1.",
    },
    {
      year: "2020 – 21",
      title: "Resilience",
      desc: "Developed 2 enterprise products for funded startups. Signed MOU with Singapore-based IT org.",
    },
    {
      year: "2021 – 22",
      title: "Expansion",
      desc: "Secured tech partnerships in Logistics & EV sectors. Team scaled to 78 specialists.",
    },
    {
      year: "2022 – 23",
      title: "Global Reach",
      desc: "Opened Pune office, US subsidiary, and strategic UK collaboration with Acend Solutions.",
    },
    {
      year: "2023 – 24",
      title: "Leadership",
      desc: "Established Hutech Inc. (USA), joined NASSCOM, and achieved ISO 9001:2015 certification. Team 90+.",
    },
    {
      year: "2025 – Now",
      title: "Innovation",
      desc: "Forged alliances with XOOTS & Maconsus (Vietnam), enhancing our global network and R&D.",
    },
  ];

  return (
    <div className="flex flex-col overflow-hidden bg-white selection:bg-[#0171c1] selection:text-white">
      <Meta
        title="About Hutech | Hutech Solutions"
        description="Global IT services and consulting company with a strong presence in India, US, and UK, delivering latest technology solutions."
      />
      <Breadcrumbs variant="light" />

      {/* Architectural Hero */}
      <section className="relative flex min-h-[600px] items-center overflow-hidden bg-[#001A3D] pt-20">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 right-0 h-full w-full bg-[radial-gradient(circle_at_70%_30%,#0171c1_0%,transparent_50%)]"></div>
          <div className="absolute bottom-0 left-0 h-full w-full bg-[radial-gradient(circle_at_20%_80%,#FFAF2B_0%,transparent_40%)]"></div>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
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
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#FFAF2B]"></span>
                  <span className="text-[10px] font-bold tracking-widest text-white uppercase">
                    Corporate Profile
                  </span>
                </div>
                <h1 className="display-font text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
                  Architecting <br />
                  <span className="text-[#FFAF2B]">Business Value.</span>
                </h1>
                <p className="max-w-2xl text-xl leading-relaxed font-medium text-white/60">
                  We are a remarkable group of creatives who transform traditional company concepts
                  into reliable digital solutions. We provide comprehensive solutions that
                  effortlessly include cutting-edge ideas by employing cutting-edge methodologies.
                  Our tried-and-true digital techniques follow accepted industry standards and
                  provide usable products that appeal to a wide audience.
                </p>
              </Motion.div>
            </div>
            <div className="hidden lg:col-span-4 lg:block">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <Motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md"
                  >
                    <div className="display-font mb-1 text-3xl font-black text-white">
                      {stat.value}
                    </div>
                    <div className="text-[10px] font-bold tracking-widest text-[#FFAF2B] uppercase">
                      {stat.label}
                    </div>
                  </Motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Overview - High Density Text Grid */}
      <section className="bg-white py-32">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-20 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-4">
              <div className="h-2 w-20 bg-[#0171c1]"></div>
              <h2 className="display-font text-4xl leading-tight font-bold text-[#001A3D] md:text-5xl">
                Providing The Finest <br />{" "}
                <span className="text-[#0171c1]">Digital Experiences.</span>
              </h2>
              <p className="font-medium text-gray-400">
                "We don't just build products; we architect the growth of businesses through
                engineering precision and creative thinking."
              </p>
            </div>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:col-span-8">
              <div className="space-y-6">
                <div className="w-fit rounded-2xl bg-gray-50 p-4 text-[#0171c1]">
                  <Code2 size={24} />
                </div>
                <h4 className="text-xl font-bold text-[#001A3D]">Technical Depth</h4>
                <p className="leading-relaxed font-medium text-gray-500">
                  Our team consists of experienced engineers, architects, and creative minds who
                  have developed software for various industries worldwide. We bridge the gap
                  between complex problems and elegant solutions.
                </p>
              </div>
              <div className="space-y-6">
                <div className="w-fit rounded-2xl bg-gray-50 p-4 text-[#0171c1]">
                  <Cpu size={24} />
                </div>
                <h4 className="text-xl font-bold text-[#001A3D]">Flexible Engagement</h4>
                <p className="leading-relaxed font-medium text-gray-500">
                  Hire dedicated software development teams or individual experts to work at your
                  premises. We offer seamless integration into your project workflows for maximum
                  operational efficiency.
                </p>
              </div>
              <div className="space-y-6">
                <div className="w-fit rounded-2xl bg-gray-50 p-4 text-[#0171c1]">
                  <Fingerprint size={24} />
                </div>
                <h4 className="text-xl font-bold text-[#001A3D]">Consulting First</h4>
                <p className="leading-relaxed font-medium text-gray-500">
                  We help businesses grow by providing a range of services including consulting,
                  design, and long-term software maintenance that consistently generates substantial
                  business value.
                </p>
              </div>
              <div className="space-y-6">
                <div className="w-fit rounded-2xl bg-gray-50 p-4 text-[#0171c1]">
                  <ShieldCheck size={24} />
                </div>
                <h4 className="text-xl font-bold text-[#001A3D]">Certified Quality</h4>
                <p className="leading-relaxed font-medium text-gray-500">
                  As an ISO 9001:2015 certified company and a proud NASSCOM member, we adhere to
                  global quality standards across every delivery and partnership milestone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section - Immersive Content */}
      <section className="relative overflow-hidden bg-[#FAF9F6] py-32">
        <div className="absolute top-0 right-0 hidden h-full w-1/3 bg-[#001A3D] lg:block"></div>
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-12">
            <div className="space-y-16 rounded-l-[3rem] bg-white p-12 shadow-2xl lg:col-span-8 lg:p-24">
              <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
                <div className="space-y-6">
                  <h3 className="display-font text-3xl font-bold text-[#001A3D]">What We Do</h3>
                  <p className="leading-relaxed font-medium text-gray-500">
                    We offer a wide range of IT services and solutions that empower businesses to
                    leverage technology for success. From core development to advanced enterprise
                    consulting.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Strategic IT Consulting",
                      "Full-Stack Development",
                      "Cloud Infrastructure",
                      "Managed Maintenance",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-sm font-bold text-[#001A3D]"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-[#0171c1]"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-6">
                  <h3 className="display-font text-3xl font-bold text-[#001A3D]">Who We Help?</h3>
                  <p className="leading-relaxed font-medium text-gray-500">
                    We are dedicated to helping a wide range of organizations across various
                    industries, from early-stage funded startups to established global entities.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Funded Tech Startups",
                      "SME Growth Entities",
                      "Global Enterprises",
                      "Industry Specialists",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-sm font-bold text-[#001A3D]"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-[#FFAF2B]"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex flex-col items-center gap-8 rounded-3xl border border-[#0171c1]/10 bg-[#0171c1]/5 p-10 md:flex-row">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#0171c1] text-white">
                  <TrendingUp size={40} />
                </div>
                <div>
                  <h4 className="mb-2 text-xl font-bold text-[#001A3D]">Why Choose Us</h4>
                  <p className="text-sm leading-relaxed font-medium text-gray-500">
                    Partner with us to unlock the full potential of technology and drive meaningful
                    business outcomes through transparency and engineering excellence.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center rounded-r-[3rem] bg-[#001A3D] p-12 lg:col-span-4 lg:p-24">
              <div className="space-y-8">
                <h2 className="display-font text-4xl leading-tight font-bold text-white">
                  Global <br /> <span className="text-[#FFAF2B]">Synergy.</span>
                </h2>
                <p className="leading-relaxed font-medium text-white/60">
                  Our offices in India, US, and UK work in a unified ecosystem to provide
                  round-the-clock delivery and strategic support for our global clients.
                </p>
                <div className="space-y-6 pt-6">
                  <div className="group flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#FFAF2B] transition-colors group-hover:bg-[#FFAF2B] group-hover:text-[#001A3D]">
                      <Globe2 size={20} />
                    </div>
                    <span className="text-xs font-bold tracking-widest text-white uppercase">
                      4 Global Offices
                    </span>
                  </div>
                  <div className="group flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#FFAF2B] transition-colors group-hover:bg-[#FFAF2B] group-hover:text-[#001A3D]">
                      <Users size={20} />
                    </div>
                    <span className="text-xs font-bold tracking-widest text-white uppercase">
                      90+ Member Team
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Footprint */}
      <GlobalMap />

      {/* History Timeline - Staggered Grid Design */}
      <section className="bg-white py-32">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-24 space-y-6 text-center">
            <span className="text-[10px] font-black tracking-[0.2em] text-[#0171c1] uppercase">
              Corporate Evolution
            </span>
            <h2 className="display-font text-4xl font-bold tracking-tight text-[#001A3D] md:text-6xl">
              Our History.
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
                className="group relative overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white p-10 transition-all duration-500 hover:border-[#0171c1] hover:shadow-2xl"
              >
                <div className="pointer-events-none absolute top-0 right-0 p-8 text-[#001A3D] opacity-[0.05] transition-opacity group-hover:opacity-[0.1]">
                  <span className="display-font text-6xl font-black">
                    {item.year.split(" – ")[0]}
                  </span>
                </div>
                <div className="relative z-10 space-y-6">
                  <div className="display-font text-3xl font-black text-[#0171c1]">{item.year}</div>
                  <h4 className="text-xl font-bold text-[#001A3D]">{item.title}</h4>
                  <p className="text-sm leading-relaxed font-medium text-gray-500">{item.desc}</p>
                  <div className="h-1 w-12 bg-[#FFAF2B] transition-all duration-700 group-hover:w-full"></div>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="relative overflow-hidden rounded-[4rem] bg-[#001A3D] p-12 text-center lg:p-24">
            <div className="absolute inset-0 z-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
                className="h-full w-full object-cover opacity-10"
              />
            </div>
            <div className="relative z-10 mx-auto max-w-4xl space-y-10">
              <h2 className="display-font text-4xl leading-tight font-bold text-white md:text-6xl">
                Join the Next <br /> <span className="text-[#FFAF2B]">Digital Revolution.</span>
              </h2>
              <p className="text-xl leading-relaxed font-medium text-white/50">
                Whether you're looking for a technology partner or your next career move, we're
                building the future together.
              </p>
              <div className="flex flex-col justify-center gap-6 sm:flex-row">
                <Link
                  href="/contact"
                  className="rounded-sm bg-[#0171c1] px-12 py-5 text-[11px] font-black tracking-widest text-white uppercase shadow-xl transition-all hover:bg-[#FFAF2B] hover:text-[#001A3D]"
                >
                  Start Your Project
                </Link>
                <Link
                  href="/careers"
                  className="rounded-sm border border-white/20 px-12 py-5 text-[11px] font-black tracking-widest text-white uppercase transition-all hover:bg-white/10"
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
