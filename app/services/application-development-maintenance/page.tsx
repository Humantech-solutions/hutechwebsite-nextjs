"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  Code2,
  Settings,
  ShieldCheck,
  RefreshCw,
  Monitor,
  Database,
  Zap,
  MoveRight,
  Layout,
  Layers,
  Wrench,
  Clock,
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

const ADM_SERVICES = [
  {
    title: "Custom Application Development",
    icon: <Code2 className="h-8 w-8 text-[#0171c1]" />,
    desc: "End-to-end development of scalable, high-performance web and mobile applications using modern frameworks and cloud-native architectures.",
  },
  {
    title: "Application Maintenance & Support",
    icon: <Settings className="h-8 w-8 text-[#0171c1]" />,
    desc: "Ensuring 24/7 reliability through proactive monitoring, bug fixes, performance tuning, and continuous updates for legacy and modern apps.",
  },
  {
    title: "Legacy Modernization",
    icon: <RefreshCw className="h-8 w-8 text-[#0171c1]" />,
    desc: "Transforming outdated monolithic systems into microservices-based, cloud-ready architectures to improve agility and reduce technical debt.",
  },
];

const ADM_CAPABILITIES = [
  {
    title: "UI/UX Design & Prototyping",
    icon: <Layout className="h-6 w-6 text-[#0171c1]" />,
    desc: "User-centric design focused on intuitive navigation and seamless experiences across all devices and platforms.",
  },
  {
    title: "API Integration & Middleware",
    icon: <Layers className="h-6 w-6 text-[#0171c1]" />,
    desc: "Connecting disparate systems through robust API layers and enterprise service buses for unified data flow.",
  },
  {
    title: "Application Testing & QA",
    icon: <ShieldCheck className="h-6 w-6 text-[#0171c1]" />,
    desc: "Comprehensive automated and manual testing to ensure zero-defect delivery and superior user satisfaction.",
  },
  {
    title: "DevSecOps & CI/CD",
    icon: <Zap className="h-6 w-6 text-[#0171c1]" />,
    desc: "Integrating security and automation into the development lifecycle for faster, safer, and more reliable deployments.",
  },
];

export default function AppDevMaintenance() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="Development and Maintenance | Hutech Solutions"
        description="Full-cycle application development and maintenance services. We build, manage, and modernize enterprise software to drive business growth."
      />
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1632910121591-29e2484c0259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Software Development Team"
            className="h-full w-full scale-105 object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-20">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[1px] w-12 bg-[#F99D1C]"></span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#F99D1C] uppercase">
                App Lifecycle Management
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              Development <br />
              <span className="text-[#F99D1C]">and Maintenance.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              From initial concept to long-term support, we manage the entire application lifecycle,
              ensuring your software remains competitive, secure, and resilient.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Strategic Value Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
            <div className="space-y-8">
              <h2 className="display-font text-3xl leading-tight font-semibold text-[#001A3D] md:text-5xl">
                Driving Business <br />
                <span className="text-[#0171c1]">Agility through ADM.</span>
              </h2>
              <div className="h-1 w-20 bg-[#0171c1]"></div>
              <p className="text-lg leading-relaxed font-medium text-gray-500">
                In a rapidly evolving digital landscape, your applications must do more than just
                function—they must innovate. Our Development and Maintenance services focus on
                reducing operational costs while accelerating time-to-market.
              </p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {[
                  { title: "Zero Downtime", icon: <Clock className="h-5 w-5" /> },
                  { title: "Cloud-First Approach", icon: <Monitor className="h-5 w-5" /> },
                  { title: "Continuous Optimization", icon: <Wrench className="h-5 w-5" /> },
                  { title: "Security by Design", icon: <ShieldCheck className="h-5 w-5" /> },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="text-[#0171c1]">{item.icon}</div>
                    <span className="text-sm font-bold tracking-wide text-gray-700 uppercase">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 overflow-hidden rounded-[3rem] border border-gray-100 bg-gray-50 p-12">
                <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-[#0171c1]/5"></div>
                <h3 className="display-font mb-6 text-2xl font-bold text-[#001A3D]">
                  Our ADM Methodology
                </h3>
                <div className="space-y-8">
                  {[
                    {
                      step: "01",
                      title: "Analyze & Assess",
                      desc: "Understanding current application health and business gaps.",
                    },
                    {
                      step: "02",
                      title: "Develop & Integrate",
                      desc: "Building feature-rich solutions with seamless connectivity.",
                    },
                    {
                      step: "03",
                      title: "Manage & Optimize",
                      desc: "Continuous monitoring and proactive performance enhancements.",
                    },
                  ].map((m, i) => (
                    <div key={i} className="flex gap-6">
                      <span className="display-font text-4xl font-bold text-[#0171c1]/20">
                        {m.step}
                      </span>
                      <div>
                        <h4 className="mb-1 font-bold text-[#001A3D]">{m.title}</h4>
                        <p className="text-sm leading-relaxed font-medium text-gray-500">
                          {m.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
              Core Service Offerings
            </h2>
            <p className="mx-auto max-w-3xl text-lg font-medium text-gray-500">
              Comprehensive application management designed to keep your digital heartbeat strong
              and responsive.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {ADM_SERVICES.map((item, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group h-full space-y-8 rounded-[2.5rem] border border-gray-100 bg-white p-12 shadow-sm transition-all hover:shadow-2xl"
              >
                <div className="w-fit rounded-2xl bg-gray-50 p-4 shadow-sm transition-all duration-500 group-hover:bg-[#0171c1] group-hover:text-white">
                  {item.icon}
                </div>
                <h3 className="display-font text-2xl leading-tight font-bold text-[#001A3D]">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed font-medium text-gray-500">{item.desc}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {ADM_CAPABILITIES.map((item, i) => (
              <div
                key={i}
                className="group space-y-6 rounded-xl border border-gray-50 p-8 transition-colors hover:bg-gray-50"
              >
                <div className="w-fit shrink-0 rounded-lg bg-[#0171c1]/5 p-3 transition-colors group-hover:bg-[#0171c1] group-hover:text-white">
                  {item.icon}
                </div>
                <h4 className="display-font text-lg font-bold text-[#001A3D]">{item.title}</h4>
                <p className="text-sm leading-relaxed font-medium text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Tiers Banner */}
      <section className="relative overflow-hidden bg-[#001A3D] py-24 text-white">
        <div className="absolute top-0 right-0 -mt-32 -mr-32 h-64 w-64 rounded-full bg-[#0171c1]/10 blur-3xl"></div>
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
            <div className="max-w-3xl space-y-6 text-center lg:text-left">
              <h2 className="display-font text-3xl font-bold md:text-5xl">
                Modernize your legacy <span className="text-[#0171c1]">Systems.</span>
              </h2>
              <p className="text-lg font-medium text-gray-400">
                Our maintenance services include deep refactoring and cloud migration paths to
                ensure your older apps run as efficiently as the newest ones.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-sm bg-[#0171c1] px-12 py-5 text-[11px] font-bold tracking-wider text-white uppercase shadow-xl transition-all duration-500 hover:bg-white hover:text-[#001A3D]"
              >
                Inquire About ADM <MoveRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
