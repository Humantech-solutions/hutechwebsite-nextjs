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
  FileText
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

const SERVICES = [
  {
    category: "Data Strategy & Advisory",
    description: "Aligning your data ecosystem with business goals for maximum ROI.",
    items: [
      { title: "Data-to-Value Strategy", icon: <LineChart className="w-5 h-5" /> },
      { title: "Governance & Compliance", icon: <ShieldCheck className="w-5 h-5" /> },
      { title: "Modernization Roadmap", icon: <Workflow className="w-5 h-5" /> }
    ]
  },
  {
    category: "Modern Data Engineering",
    description: "Building the high-performance foundations for digital-first enterprises.",
    items: [
      { title: "Data Lakehouse Architecture", icon: <Layers className="w-5 h-5" /> },
      { title: "Real-time Data Fabric", icon: <Network className="w-5 h-5" /> },
      { title: "ETL/ELT Pipeline Automation", icon: <RefreshCw className="w-5 h-5" /> }
    ]
  },
  {
    category: "AI & Machine Learning",
    description: "Transforming raw information into predictive power and generative intelligence.",
    items: [
      { title: "LLM Ops & Generative AI", icon: <Sparkles className="w-5 h-5" /> },
      { title: "Predictive Analytics", icon: <Activity className="w-5 h-5" /> },
      { title: "Computer Vision & NLP", icon: <BrainCircuit className="w-5 h-5" /> }
    ]
  }
];

const INNOVATIONS = [
  {
    title: "Data Mesh & Fabric",
    desc: "Decentralizing data ownership while maintaining centralized governance for rapid agility.",
    icon: <Network className="text-[#0171c1]" />
  },
  {
    title: "Vector Databases & RAG",
    desc: "Optimizing AI performance with Retrieval-Augmented Generation for specialized business contexts.",
    icon: <Database className="text-[#0171c1]" />
  },
  {
    title: "AutoML & LLM Ops",
    desc: "Streamlining the lifecycle of machine learning models from training to global deployment.",
    icon: <Zap className="text-[#0171c1]" />
  },
  {
    title: "Data Observability",
    desc: "Real-time health monitoring of data pipelines to ensure zero-trust reliability.",
    icon: <Search className="text-[#0171c1]" />
  }
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
      <section className="bg-[#001A3D] text-white h-[450px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1633412802994-5c058f151b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Data Engineering Architecture"
            className="w-full h-full object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/80 to-transparent"></div>
        </div>
        
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-20 z-10 w-full">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[1px] bg-[#FFAF2B]"></span>
              <span className="text-[#FFAF2B] font-bold uppercase tracking-[0.3em] text-[10px]">Intelligence Architecture</span>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight display-font mb-8">
              From Raw Data <br />
              <span className="text-[#FFAF2B]">To Predictive Power.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed">
              We empower organizations with high-scale data engineering and cutting-edge machine learning frameworks. Turn your data silos into strategic intelligence assets.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font leading-tight">
                  Democratizing Data with <br /> <span className="text-[#0171c1]">Unmatched Reliability.</span>
                </h2>
                <div className="w-20 h-1 bg-[#0171c1]"></div>
              </div>
              <p className="text-lg text-gray-500 font-medium leading-relaxed">
                Modern enterprises struggle not with the lack of data, but with the inability to harness it at speed. Hutech Solutions bridges this gap by implementing high-performance data fabrics and automated machine learning pipelines.
              </p>
              <p className="text-lg text-gray-500 font-medium leading-relaxed">
                Whether you are migrating legacy warehouses to Snowflake/Databricks or building custom Generative AI models, we provide the engineering excellence required to scale safely.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div className="p-8 bg-gray-50 rounded-sm border-l-4 border-[#0171c1]">
                  <p className="text-4xl font-bold text-[#001A3D] mb-1">90%</p>
                  <p className="text-[10px] font-bold text-[#0171c1] uppercase tracking-widest">Automation Efficiency</p>
                </div>
                <div className="p-8 bg-gray-50 rounded-sm border-l-4 border-[#0171c1]">
                  <p className="text-4xl font-bold text-[#001A3D] mb-1">500TB+</p>
                  <p className="text-[10px] font-bold text-[#0171c1] uppercase tracking-widest">Data Managed</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1763568258696-32147bb44379?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                  alt="Data Scientist Insights" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-[#0171c1] p-10 text-white max-w-xs shadow-2xl hidden md:block">
                <BrainCircuit size={40} className="mb-4" />
                <h3 className="text-xl font-bold display-font mb-2">AI-Ready Foundations</h3>
                <p className="text-sm opacity-80 leading-relaxed font-medium">
                  We don't just move data; we prepare it for the AI revolution with clean, governed, and structured pipelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">The Modern Data Stack</h2>
            <p className="text-gray-500 font-medium text-lg max-w-3xl mx-auto">
              Integrated engineering and AI solutions designed to scale with your business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((category, idx) => (
              <div key={idx} className="bg-white p-12 border border-gray-100 flex flex-col h-full shadow-sm hover:shadow-2xl transition-all duration-500 rounded-sm">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-[#001A3D] display-font mb-4">{category.category}</h3>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">{category.description}</p>
                </div>
                <div className="space-y-4 mb-10">
                  {category.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-sm font-semibold text-gray-600 group">
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#0171c1] group-hover:bg-[#0171c1] group-hover:text-white transition-all">
                        {item.icon}
                      </div>
                      <span>{item.title}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-auto">
                  <Link href="/contact" className="inline-flex items-center gap-2 text-[10px] font-bold text-[#0171c1] uppercase tracking-widest hover:gap-4 transition-all">
                    Explore Solutions <MoveRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovations Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#0171c1]/5 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-4 flex flex-col justify-center">
              <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font leading-tight mb-8">
                Future-Proof Your Intelligence.
              </h2>
              <p className="text-gray-500 font-medium leading-relaxed mb-10">
                We implement the latest industry-shaping technologies that are redefining the Data & AI landscape today.
              </p>
              <Link href="/contact" className="bg-[#001A3D] text-white px-10 py-5 font-bold uppercase tracking-wider text-[11px] self-start hover:bg-[#0171c1] transition-all rounded-sm shadow-xl">
                Request A Tech Deep-Dive
              </Link>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {INNOVATIONS.map((inn, i) => (
                <div key={i} className="bg-white p-10 border border-gray-100 shadow-sm hover:border-[#0171c1] transition-all group">
                  <div className="w-12 h-12 mb-6 group-hover:scale-110 transition-transform duration-500">
                    {inn.icon}
                  </div>
                  <h4 className="text-xl font-bold text-[#001A3D] display-font mb-4">{inn.title}</h4>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">{inn.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI & ML Sections and more... */}
      <section className="py-24 bg-[#001A3D] text-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-video rounded-sm overflow-hidden shadow-2xl border border-white/10">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1630832128204-fa1d5b6cbf0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                  alt="AI Neural Network Visualization" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-6 -left-6 bg-[#FFAF2B] text-[#001A3D] p-6 rounded-sm shadow-xl font-bold text-sm display-font">
                LLM OPS READY
              </div>
            </div>
            <div className="space-y-8 order-1 lg:order-2">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-semibold display-font leading-tight">
                  Next-Generation <br /> <span className="text-[#0171c1]">Machine Learning.</span>
                </h2>
                <div className="w-20 h-1 bg-[#0171c1]"></div>
              </div>
              <p className="text-lg text-gray-400 font-medium leading-relaxed">
                Beyond traditional analytics, we build custom AI solutions that act on your data. From autonomous decision-making engines to Retrieval-Augmented Generation (RAG) for localized LLMs.
              </p>
              <div className="space-y-6">
                {[
                  "Generative AI Implementation & Fine-Tuning",
                  "Predictive Demand & Inventory Forecasting",
                  "Automated Fraud & Anomaly Detection",
                  "Custom Recommendation Engines"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm font-semibold">
                    <CheckCircle2 className="text-[#0171c1] shrink-0" size={20} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <Link href="/contact" className="inline-flex items-center gap-3 bg-[#0171c1] text-white px-10 py-5 font-bold uppercase tracking-wider text-[11px] hover:bg-white hover:text-[#001A3D] transition-all rounded-sm">
                  Explore AI Capabilities <MoveRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Our Approach</h2>
            <div className="w-20 h-1 bg-[#0171c1] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                step: "01", 
                title: "Discovery & Audit", 
                desc: "We analyze your current data maturity, identifying silos and performance bottlenecks." 
              },
              { 
                step: "02", 
                title: "Engineering & Pipeline", 
                desc: "We architect the modern stack and build automated, secure, and governed data pipelines." 
              },
              { 
                step: "03", 
                title: "Intelligence & Insights", 
                desc: "We deploy AI models and real-time visualization layers to turn data into business action." 
              }
            ].map((item, i) => (
              <div key={i} className="relative p-10 bg-gray-50 border border-gray-100 group hover:bg-[#001A3D] transition-all duration-500 rounded-sm">
                <span className="text-6xl font-bold text-[#0171c1]/10 group-hover:text-white/10 absolute top-4 right-8 transition-colors display-font">{item.step}</span>
                <div className="relative z-10 space-y-4">
                  <h4 className="text-xl font-bold text-[#001A3D] group-hover:text-white transition-colors display-font tracking-tight">{item.title}</h4>
                  <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#0171c1] text-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 text-center space-y-10">
          <h2 className="text-4xl md:text-6xl font-bold display-font">Ready to Unlock Your Data's Potential?</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">Join the leading enterprises that have transformed their decision-making with Hutech Solutions.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/contact" className="bg-white text-[#0171c1] px-12 py-5 font-bold uppercase tracking-wider text-[11px] hover:bg-[#001A3D] hover:text-white transition-all shadow-2xl rounded-sm">
              Talk To A Data Expert
            </Link>
            <Link href="/resources/case-studies" className="border-2 border-white/30 text-white px-12 py-5 font-bold uppercase tracking-wider text-[11px] hover:bg-white/10 transition-all rounded-sm">
              View Case Studies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function CheckCircle2({ size, className }: { size?: number, className?: string }) {
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
