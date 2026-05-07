"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  Database,
  Server,
  RefreshCw,
  Layers,
  ShieldCheck,
  BarChart3,
  MoveRight,
  Workflow,
  Network,
  HardDrive,
  Cpu,
  Search,
  Sparkles,
  Zap,
  Activity,
  BrainCircuit,
  LineChart,
  Settings2,
  Lock,
  MessageSquare,
  FileText,
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

const SERVICES = [
  {
    category: "Data Strategy & Advisory",
    description: "Aligning your data ecosystem with business goals for maximum ROI.",
    items: [
      { title: "Data-to-Value Strategy", icon: <LineChart className="h-5 w-5" /> },
      { title: "Governance & Compliance", icon: <ShieldCheck className="h-5 w-5" /> },
      { title: "Modernization Roadmap", icon: <Workflow className="h-5 w-5" /> },
    ],
  },
  {
    category: "Modern Data Engineering",
    description: "Building the high-performance foundations for digital-first enterprises.",
    items: [
      { title: "Data Lakehouse Architecture", icon: <Layers className="h-5 w-5" /> },
      { title: "Real-time Data Fabric", icon: <Network className="h-5 w-5" /> },
      { title: "ETL/ELT Pipeline Automation", icon: <RefreshCw className="h-5 w-5" /> },
    ],
  },
  {
    category: "AI & Machine Learning",
    description: "Transforming raw information into predictive power and generative intelligence.",
    items: [
      { title: "LLM Ops & Generative AI", icon: <Sparkles className="h-5 w-5" /> },
      { title: "Predictive Analytics", icon: <Activity className="h-5 w-5" /> },
      { title: "Computer Vision & NLP", icon: <BrainCircuit className="h-5 w-5" /> },
    ],
  },
];

const INNOVATIONS = [
  {
    title: "Data Mesh & Fabric",
    desc: "Decentralizing data ownership while maintaining centralized governance for rapid agility.",
    icon: <Network className="text-[#0171c1]" />,
  },
  {
    title: "Vector Databases & RAG",
    desc: "Optimizing AI performance with Retrieval-Augmented Generation for specialized business contexts.",
    icon: <Database className="text-[#0171c1]" />,
  },
  {
    title: "AutoML & LLM Ops",
    desc: "Streamlining the lifecycle of machine learning models from training to global deployment.",
    icon: <Zap className="text-[#0171c1]" />,
  },
  {
    title: "Data Observability",
    desc: "Real-time health monitoring of data pipelines to ensure zero-trust reliability.",
    icon: <Search className="text-[#0171c1]" />,
  },
];

export default function DataEngineering() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="Data Engineering & Machine Learning | Hutech Solutions"
        description="Enterprise-grade Data Engineering, AI, and Machine Learning solutions. We architect the intelligence-driven future for global enterprises."
      />

      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1633412802994-5c058f151b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Data Engineering Architecture"
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
                Intelligence Architecture
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              From Raw Data <br />
              <span className="text-[#F99D1C]">To Predictive Power.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              We empower organizations with high-scale data engineering and cutting-edge machine
              learning frameworks. Turn your data silos into strategic intelligence assets.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="display-font text-3xl leading-tight font-semibold text-[#001A3D] md:text-5xl">
                  Democratizing Data with <br />{" "}
                  <span className="text-[#0171c1]">Unmatched Reliability.</span>
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
              </div>
              <p className="text-lg leading-relaxed font-medium text-gray-500">
                Modern enterprises struggle not with the lack of data, but with the inability to
                harness it at speed. Hutech Solutions bridges this gap by implementing
                high-performance data fabrics and automated machine learning pipelines.
              </p>
              <p className="text-lg leading-relaxed font-medium text-gray-500">
                Whether you are migrating legacy warehouses to Snowflake/Databricks or building
                custom Generative AI models, we provide the engineering excellence required to scale
                safely.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div className="rounded-sm border-l-4 border-[#0171c1] bg-gray-50 p-8">
                  <p className="mb-1 text-4xl font-bold text-[#001A3D]">90%</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Automation Efficiency
                  </p>
                </div>
                <div className="rounded-sm border-l-4 border-[#0171c1] bg-gray-50 p-8">
                  <p className="mb-1 text-4xl font-bold text-[#001A3D]">500TB+</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Data Managed
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1763568258696-32147bb44379?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Data Scientist Insights"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -right-10 -bottom-10 hidden max-w-xs bg-[#0171c1] p-10 text-white shadow-2xl md:block">
                <BrainCircuit size={40} className="mb-4" />
                <h3 className="display-font mb-2 text-xl font-bold">AI-Ready Foundations</h3>
                <p className="text-sm leading-relaxed font-medium opacity-80">
                  We don't just move data; we prepare it for the AI revolution with clean, governed,
                  and structured pipelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-4 text-center">
            <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
              The Modern Data Stack
            </h2>
            <p className="mx-auto max-w-3xl text-lg font-medium text-gray-500">
              Integrated engineering and AI solutions designed to scale with your business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {SERVICES.map((category, idx) => (
              <div
                key={idx}
                className="flex h-full flex-col rounded-sm border border-gray-100 bg-white p-12 shadow-sm transition-all duration-500 hover:shadow-2xl"
              >
                <div className="mb-8">
                  <h3 className="display-font mb-4 text-2xl font-bold text-[#001A3D]">
                    {category.category}
                  </h3>
                  <p className="text-sm leading-relaxed font-medium text-gray-500">
                    {category.description}
                  </p>
                </div>
                <div className="mb-10 space-y-4">
                  {category.items.map((item, i) => (
                    <div
                      key={i}
                      className="group flex items-center gap-4 text-sm font-semibold text-gray-600"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-[#0171c1] transition-all group-hover:bg-[#0171c1] group-hover:text-white">
                        {item.icon}
                      </div>
                      <span>{item.title}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-auto">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#0171c1] uppercase transition-all hover:gap-4"
                  >
                    Explore Solutions <MoveRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovations Section */}
      <section className="relative overflow-hidden bg-white py-24">
        <div className="absolute top-0 right-0 h-full w-1/3 translate-x-1/2 -skew-x-12 bg-[#0171c1]/5"></div>
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-20 lg:grid-cols-12">
            <div className="flex flex-col justify-center lg:col-span-4">
              <h2 className="display-font mb-8 text-3xl leading-tight font-semibold text-[#001A3D] md:text-5xl">
                Future-Proof Your Intelligence.
              </h2>
              <p className="mb-10 leading-relaxed font-medium text-gray-500">
                We implement the latest industry-shaping technologies that are redefining the Data &
                AI landscape today.
              </p>
              <Link
                href="/contact"
                className="self-start rounded-sm bg-[#001A3D] px-10 py-5 text-[11px] font-bold tracking-wider text-white uppercase shadow-xl transition-all hover:bg-[#0171c1]"
              >
                Request A Tech Deep-Dive
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:col-span-8">
              {INNOVATIONS.map((inn, i) => (
                <div
                  key={i}
                  className="group border border-gray-100 bg-white p-10 shadow-sm transition-all hover:border-[#0171c1]"
                >
                  <div className="mb-6 h-12 w-12 transition-transform duration-500 group-hover:scale-110">
                    {inn.icon}
                  </div>
                  <h4 className="display-font mb-4 text-xl font-bold text-[#001A3D]">
                    {inn.title}
                  </h4>
                  <p className="text-sm leading-relaxed font-medium text-gray-500">{inn.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI & ML Sections and more... */}
      <section className="overflow-hidden bg-[#001A3D] py-24 text-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-video overflow-hidden rounded-sm border border-white/10 shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1630832128204-fa1d5b6cbf0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="AI Neural Network Visualization"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="display-font absolute -top-6 -left-6 rounded-sm bg-[#F99D1C] p-6 text-sm font-bold text-[#001A3D] shadow-xl">
                LLM OPS READY
              </div>
            </div>
            <div className="order-1 space-y-8 lg:order-2">
              <div className="space-y-4">
                <h2 className="display-font text-3xl leading-tight font-semibold md:text-5xl">
                  Next-Generation <br /> <span className="text-[#0171c1]">Machine Learning.</span>
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
              </div>
              <p className="text-lg leading-relaxed font-medium text-gray-400">
                Beyond traditional analytics, we build custom AI solutions that act on your data.
                From autonomous decision-making engines to Retrieval-Augmented Generation (RAG) for
                localized LLMs.
              </p>
              <div className="space-y-6">
                {[
                  "Generative AI Implementation & Fine-Tuning",
                  "Predictive Demand & Inventory Forecasting",
                  "Automated Fraud & Anomaly Detection",
                  "Custom Recommendation Engines",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm font-semibold">
                    <CheckCircle2 className="shrink-0 text-[#0171c1]" size={20} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-sm bg-[#0171c1] px-10 py-5 text-[11px] font-bold tracking-wider text-white uppercase transition-all hover:bg-white hover:text-[#001A3D]"
                >
                  Explore AI Capabilities <MoveRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
              Our Approach
            </h2>
            <div className="mx-auto h-1 w-20 bg-[#0171c1]"></div>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Discovery & Audit",
                desc: "We analyze your current data maturity, identifying silos and performance bottlenecks.",
              },
              {
                step: "02",
                title: "Engineering & Pipeline",
                desc: "We architect the modern stack and build automated, secure, and governed data pipelines.",
              },
              {
                step: "03",
                title: "Intelligence & Insights",
                desc: "We deploy AI models and real-time visualization layers to turn data into business action.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative rounded-sm border border-gray-100 bg-gray-50 p-10 transition-all duration-500 hover:bg-[#001A3D]"
              >
                <span className="display-font absolute top-4 right-8 text-6xl font-bold text-[#0171c1]/10 transition-colors group-hover:text-white/10">
                  {item.step}
                </span>
                <div className="relative z-10 space-y-4">
                  <h4 className="display-font text-xl font-bold tracking-tight text-[#001A3D] transition-colors group-hover:text-white">
                    {item.title}
                  </h4>
                  <p className="text-sm leading-relaxed font-medium text-gray-500 transition-colors group-hover:text-gray-400">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0171c1] py-24 text-white">
        <div className="mx-auto max-w-[1280px] space-y-10 px-6 text-center lg:px-20">
          <h2 className="display-font text-4xl font-bold md:text-6xl">
            Ready to Unlock Your Data's Potential?
          </h2>
          <p className="mx-auto max-w-3xl text-xl opacity-90">
            Join the leading enterprises that have transformed their decision-making with Hutech
            Solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/contact"
              className="rounded-sm bg-white px-12 py-5 text-[11px] font-bold tracking-wider text-[#0171c1] uppercase shadow-2xl transition-all hover:bg-[#001A3D] hover:text-white"
            >
              Talk To A Data Expert
            </Link>
            <Link
              href="/resources/case-studies"
              className="rounded-sm border-2 border-white/30 px-12 py-5 text-[11px] font-bold tracking-wider text-white uppercase transition-all hover:bg-white/10"
            >
              View Case Studies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function CheckCircle2({ size, className }: { size?: number; className?: string }) {
  return (
    <div className={className}>
      <svg
        width={size || 24}
        height={size || 24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    </div>
  );
}
