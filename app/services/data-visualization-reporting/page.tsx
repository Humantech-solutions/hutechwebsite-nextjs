"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ShieldCheck,
  Cpu,
  Zap,
  BarChart3,
  MoveRight,
  ArrowRight,
  ChevronRight,
  Workflow,
  Smartphone,
  Lock,
  MessageSquare,
  FileText,
  Sparkles,
  Database,
  RefreshCw,
  LayoutGrid,
  Search,
  Users,
  Building2,
  Globe,
  Settings,
  Network,
  Layout,
  Clock,
  Presentation,
  Eye,
  Monitor,
  TrendingUp,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

import { ServiceDetailContactCTA } from "@/components/ServiceDetailContactCTA";

const REPORTING_SERVICES = [
  {
    icon: Layout,
    title: "Interactive Dashboards",
    description:
      "Build dynamic, drill-down capable dashboards using Power BI, Tableau, and custom React-based visualization frameworks to reveal business trends across departments.",
  },
  {
    icon: Clock,
    title: "Real-Time Data Streaming",
    description:
      "Implement live-streaming reporting architectures for real-time operations monitoring, ensuring zero-latency awareness of critical systems and daily metrics.",
  },
  {
    icon: Presentation,
    title: "Executive Strategic Reporting",
    description:
      "Design C-suite level reports that distill complex data lakes into clean, high-impact executive summaries for informed, rapid strategic business decisions.",
  },
  {
    icon: Eye,
    title: "Custom Chart & Map Design",
    description:
      "Develop bespoke charts, geographic maps, and complex network diagrams tailored to unique industry metrics and specialized proprietary datasets.",
  },
  {
    icon: Monitor,
    title: "Embedded Web Analytics",
    description:
      "Integrate secure, white-labeled reporting portals and interactive dashboards directly into your existing client applications and enterprise portals seamlessly.",
  },
  {
    icon: Zap,
    title: "Self-Service BI Environments",
    description:
      "Set up governed analytics environments that enable business users to self-explore data and create their own custom reports without IT bottlenecks.",
  },
];

const ESSENTIAL_SOLUTIONS = [
  {
    icon: Search,
    title: "Enterprise Data Storytelling",
    description:
      "Transform raw figures into visual narratives that call out seasonal trends, market anomalies, and latent growth opportunities across operations.",
  },
  {
    icon: Database,
    title: "Cross-Platform Integration",
    description:
      "Connect reporting interfaces to diverse data backends including Snowflake, Databricks, SQL databases, and SaaS APIs with high performance.",
  },
  {
    icon: Cpu,
    title: "High-Performance Rendering",
    description:
      "Optimize visualization render times for massive, multi-million row datasets using pre-aggregated data layers and advanced query caching rules.",
  },
  {
    icon: ShieldCheck,
    title: "Data Security & Governance",
    description:
      "Enforce Row-Level Security (RLS) and granular user permissions to ensure sensitive business intelligence is only accessible to authorized eyes.",
  },
  {
    icon: Settings,
    title: "Automated Alerting Systems",
    description:
      "Configure automated triggers and webhooks to notify team members via Slack or email when key performance metrics cross specific thresholds.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Reporting",
    description:
      "Design responsive reports optimized for tablets and mobile devices, keeping executives connected to operational insights on the go.",
  },
];

const INNOVATIONS = [
  {
    icon: Sparkles,
    title: "Natural Language Querying",
    description:
      "Integrate AI-driven search boxes enabling business users to ask questions like 'What was last month's revenue?' and get instant visual charts.",
  },
  {
    icon: TrendingUp,
    title: "AI-Powered Trend Projection",
    description:
      "Apply predictive analytics inside your dashboards to automatically forecast future sales, customer churn, and market trends visually.",
  },
  {
    icon: Globe,
    title: "Immersive 3D Spatial Maps",
    description:
      "Render complex geospatial logistics, city utility networks, and real estate assets in interactive 3D map interfaces directly in the browser.",
  },
  {
    icon: Search,
    title: "Automated Insights Generation",
    description:
      "Utilize machine learning to scan reports, automatically draft textual summaries of key insights, and identify statistical anomalies.",
  },
  {
    icon: Users,
    title: "Collaborative Live BI Spaces",
    description:
      "Create virtual war rooms with real-time multiplayer annotations and dashboard sharing, allowing team members to analyze data in sync.",
  },
  {
    icon: Network,
    title: "Decentralized Open Metadata",
    description:
      "Adopt open data cataloging standards to trace data lineage, showing business users the exact origins and calculations of every dashboard metric.",
  },
];

const WHY_CHOOSE = [
  {
    title: "Human-Centric UX Design",
    description:
      "We design dashboards that are intuitive and easy to digest, ensuring your team spends less time interpreting charts and more time taking action.",
  },
  {
    title: "End-to-End Analytics Integration",
    description:
      "We don't just build the frontend; we optimize the underlying data warehouses, pipelines, and queries to guarantee lightning-fast report performance.",
  },
  {
    title: "Security & Governance Focus",
    description:
      "We set up governed data models with strict row-level security policies, ensuring regulatory compliance while enabling self-service exploration.",
  },
  {
    title: "Platform-Agnostic Experience",
    description:
      "Our engineers are certified across Power BI, Tableau, and Looker, as well as custom code solutions (D3.js, React), recommending the best fit.",
  },
];

const FAQS = [
  {
    question: "Which BI tool is right for our organization?",
    answer:
      "It depends on your infrastructure. Power BI is ideal for Microsoft ecosystems, Tableau is excellent for deep exploratory analysis, Looker works well for SQL-centric teams using modern warehouses, and custom D3.js is best for embedded SaaS apps.",
  },
  {
    question: "How do you connect dashboards to multiple separate data sources?",
    answer:
      "We build unified semantic models using data orchestration tools or modern warehouse layers (like Snowflake/Databricks). This blends disparate data (e.g., Salesforce CRM and SQL databases) into single dashboards.",
  },
  {
    question: "Can dashboards be viewed on mobile devices?",
    answer:
      "Yes, we design responsive dashboard layouts specifically optimized for mobile and tablet dimensions, ensuring legible text and touch-friendly interactive filtering.",
  },
  {
    question: "How do you guarantee fast dashboard load times with large data?",
    answer:
      "We optimize report queries, create pre-aggregated summary tables, configure incremental data refreshes, and leverage high-performance backend database indexing to keep reports rendering in seconds.",
  },
  {
    question: "What is self-service BI and how do you implement it?",
    answer:
      "Self-service BI allows business users to build their own custom reports using pre-verified, secure data sources. We implement it by defining clear data catalogs, setting up governed workspaces, and providing user training.",
  },
];

const BLOG_POSTS = [
  {
    id: "1",
    title: "5 Design Principles for Clear Executive Dashboards",
    description:
      "Avoid dashboard clutter. Learn how to apply visual hierarchy, negative space, and key metrics selection to build reports executives love...",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "2",
    title: "How Embedded Analytics Drives SaaS Engagement",
    description:
      "Embedding reporting portals directly into your customer application keeps users engaged. Discover best practices for white-label BI...",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "3",
    title: "Tableau vs Power BI: Choosing the Best Tool in 2026",
    description:
      "An in-depth, feature-by-feature comparison of the two industry giants, analyzed for scalability, pricing, and custom reporting capabilities...",
    image:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

const REPORTING_STACK = [
  { primary: "POWER BI", secondary: "BUSINESS INTELLIGENCE" },
  { primary: "TABLEAU", secondary: "DATA VISUALIZATION" },
  { primary: "LOOKER", secondary: "ENTERPRISE ANALYTICS" },
  { primary: "GRAFANA", secondary: "METRICS MONITORING" },
  { primary: "APACHE SUPERSET", secondary: "OPEN SOURCE BI" },
  { primary: "D3.JS", secondary: "CUSTOM VISUALIZATION" },
  { primary: "METABASE", secondary: "SIMPLE ANALYTICS" },
  { primary: "QLIK SENSE", secondary: "ASSOCIATIVE BI" },
  { primary: "SISENSE", secondary: "EMBEDDED ANALYTICS" },
  { primary: "THOUGHTSPOT", secondary: "SEARCH-DRIVEN BI" },
  { primary: "DBT", secondary: "DATA TRANSFORMATION" },
  { primary: "PYTHON", secondary: "DATA ANALYTICS" },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-center justify-between py-6 text-left"
      >
        <span
          className={`text-lg font-bold transition-colors md:text-xl ${isOpen ? "text-[#0171c1]" : "text-[#001A3D] group-hover:text-[#0171c1]"}`}
        >
          {question}
        </span>
        <div
          className={`flex h-8 w-8 items-center justify-center transition-all ${isOpen ? "text-[#0171c1]" : "text-gray-400"}`}
        >
          <ChevronRight
            className={`transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
          />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-lg leading-relaxed text-gray-500">{answer}</p>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DataVisualizationReporting() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="Data Visualization & Reporting | Hutech Solutions"
        description="Transform complex data into actionable insights with Hutech's expert Data Visualization and Business Intelligence reporting services."
      />

      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Data Visualization Dashboard"
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
                Analytics Excellence
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              Your Data Vision. <br />
              <span className="text-[#F99D1C]">Insights Revolution.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              We turn complex, fragmented data into clear, interactive visual stories. Gain the
              clarity you need to make rapid, evidence-based strategic decisions.
            </p>
            <Link href="/contact" className="btn-banner-cta mt-6 group">
              Consult Us
              <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
              Our Data Visualization & Reporting Services
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              At Hutech Solutions, we specialize in delivering cutting-edge software technology
              solutions tailored for the global enterprise reporting landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {REPORTING_SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative flex flex-col space-y-6 overflow-hidden border border-gray-100 bg-white p-12 shadow-sm transition-all duration-500 hover:shadow-2xl"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5 transition-opacity group-hover:opacity-10">
                    <Icon size={80} strokeWidth={1} />
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-sm bg-gray-50 text-[#0171c1] transition-all duration-500 group-hover:bg-[#0171c1] group-hover:text-white">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="display-font text-xl leading-tight font-bold text-[#001A3D]">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-medium text-gray-500">
                    {service.description}
                  </p>
                  <div className="mt-auto pt-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#0171c1] uppercase transition-all group-hover:gap-4"
                    >
                      Learn More <MoveRight size={14} />
                    </Link>
                  </div>
                </Motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Essential Solutions Section */}
      <section className="overflow-hidden bg-[#001A3D] py-24 text-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font mx-auto max-w-4xl text-3xl leading-tight font-semibold md:text-5xl">
              What Makes Custom Reporting Solutions Essential for Your Business?
            </h2>
            <div className="mx-auto h-1 w-20 bg-[#0171c1]"></div>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-400">
              In the modern digital landscape, custom data visualizations are key to staying
              competitive and ensuring operational excellence.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {ESSENTIAL_SOLUTIONS.map((item, i) => {
              const Icon = item.icon;
              return (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group space-y-6 rounded-sm border border-white/5 p-8 transition-colors hover:bg-white/5"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-sm bg-white/10 text-[#0171c1] transition-transform group-hover:scale-110">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="display-font text-xl font-bold tracking-tight">{item.title}</h3>
                    <p className="text-sm leading-relaxed font-medium text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </Motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Innovations Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
              Which Innovations Can Transform Your Analytics Capabilities?
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-500">
              Incorporating advanced technologies can significantly enhance your business intelligence
              capabilities for the digital-first era.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {INNOVATIONS.map((item, i) => {
              const Icon = item.icon;
              return (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex flex-col items-center space-y-6 text-center"
                >
                  <div className="text-[#0171c1] transition-transform duration-500 group-hover:scale-110">
                    <Icon size={56} strokeWidth={1} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="display-font text-xl font-bold tracking-tight text-[#001A3D]">
                      {item.title}
                    </h3>
                    <p className="max-w-sm text-sm leading-relaxed font-medium text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </Motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="overflow-hidden bg-[#F2F2F2] py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex flex-col items-center gap-20 lg:flex-row">
            <div className="flex-1 space-y-10">
              <div className="space-y-6">
                <h2 className="display-font text-3xl leading-[1.2] font-semibold text-[#001A3D] md:text-5xl">
                  Discover Your Analytics & Visualization Strategy With Us
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  Schedule a consultation with our expert Business Intelligence team and take the first
                  step towards a data-driven, digital-first reporting experience.
                </p>
              </div>
              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-sm bg-[#F99D1C] px-10 py-5 text-[11px] font-bold tracking-wider text-[#001A3D] uppercase shadow-xl transition-all duration-500 hover:bg-[#001A3D] hover:text-white"
                >
                  Consult Us Now <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="relative flex-1">
              <div className="relative z-10 aspect-video rounded-sm bg-white p-2 shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Business Intelligence Interface"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -top-10 -right-10 -z-10 h-64 w-64 rounded-full bg-[#0171c1]/5 blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 -z-10 h-48 w-48 rounded-full bg-[#F99D1C]/10 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#001A3D] via-[#030E21] to-[#020B1E] py-24 md:py-32 text-white">
        {/* Radial Light Glow behind heading */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Glowing Grid Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
          {/* Header */}
          <div className="mb-16 text-center md:mb-20">
            <div className="flex items-center justify-center gap-3 text-[10px] font-bold tracking-[0.3em] text-[#F99D1C] uppercase">
              <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#F99D1C]" />
              TECHNOLOGY STACK
              <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#F99D1C]" />
            </div>

            <h2 className="mt-4 display-font text-3xl font-bold tracking-wider text-white sm:text-4xl md:text-5xl uppercase">
              MODERN DATA VISUALIZATION & REPORTING STACK
            </h2>

            <div className="mx-auto mt-4 h-[3px] w-14 bg-[#F99D1C]" />

            <p className="mx-auto mt-6 max-w-2xl text-sm font-medium text-gray-400 md:text-base leading-relaxed">
              Enterprise-grade analytics and visualization technologies powering interactive dashboards,
              governed business intelligence, and real-time operational reports
            </p>
          </div>

          {/* Cards Grid */}
          <div className="border-l border-t border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {REPORTING_STACK.map((item, idx) => (
                <Motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="group relative z-0 hover:z-10 border-r border-b border-white/10 bg-[#030d22]/50 backdrop-blur-sm py-12 px-4 flex flex-col justify-center items-center h-32 md:h-36 text-center transition-all duration-300 ease-out hover:-translate-y-1.5 hover:bg-[#0a2a60]/40 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] hover:border-white/20"
                >
                  <span className="text-white font-bold tracking-wider text-xs md:text-sm uppercase mb-2 group-hover:text-white transition-colors duration-300">
                    {item.primary}
                  </span>
                  <span className="text-cyan-400 font-semibold tracking-wider text-[10px] md:text-xs uppercase transition-colors duration-300">
                    {item.secondary}
                  </span>
                </Motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
              Why Choose Hutech Solutions for Your Data Visualization Project?
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              At Hutech Solutions, we specialize in delivering business intelligence solutions tailored to
              your unique organizational needs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-20 gap-y-16 md:grid-cols-2">
            {WHY_CHOOSE.map((item, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group flex items-start gap-8"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm bg-[#0171c1]/5 text-[#0171c1] transition-all duration-500 group-hover:bg-[#0171c1] group-hover:text-white">
                  <Zap size={24} strokeWidth={1.5} />
                </div>
                <div className="space-y-4">
                  <h3 className="display-font text-xl font-bold tracking-tight text-[#001A3D]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-medium text-gray-500">
                    {item.description}
                  </p>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-20 lg:grid-cols-12">
            <div className="rounded-sm border border-gray-100 bg-white p-10 shadow-2xl md:p-14 lg:col-span-7">
              <h2 className="display-font mb-10 text-3xl font-bold text-[#001A3D]">
                Share Your Data Visualization Project With Us
              </h2>
              <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Name*"
                  className="w-full border border-gray-200 p-4 text-sm font-medium transition-all outline-none focus:border-[#0171c1]"
                />
                <input
                  type="email"
                  placeholder="Email*"
                  className="w-full border border-gray-200 p-4 text-sm font-medium transition-all outline-none focus:border-[#0171c1]"
                />
                <input
                  type="tel"
                  placeholder="Phone Number*"
                  className="w-full border border-gray-200 p-4 text-sm font-medium transition-all outline-none focus:border-[#0171c1] md:col-span-2"
                />
                <textarea
                  placeholder="Tell us about your business intelligence and dashboard reporting needs"
                  rows={4}
                  className="w-full resize-none border border-gray-200 p-4 text-sm font-medium transition-all outline-none focus:border-[#0171c1] md:col-span-2"
                ></textarea>
                <div className="md:col-span-2">
                  <button className="w-full rounded-sm bg-[#F99D1C] px-12 py-5 text-[11px] font-bold tracking-wider text-[#001A3D] uppercase shadow-xl transition-all duration-500 hover:bg-[#001A3D] hover:text-white md:w-auto">
                    Submit Project Request
                  </button>
                </div>
              </form>
            </div>
            <div className="space-y-12 py-8 lg:col-span-5">
              <h2 className="display-font text-3xl font-bold text-[#001A3D]">
                What Is The Next Step?
              </h2>
              <div className="space-y-10">
                {[
                  {
                    icon: MessageSquare,
                    text: "An analytics technology consultant will review your request and contact you within a few business hours.",
                  },
                  {
                    icon: FileText,
                    text: "We will schedule a scoping session to review your existing data sources, key metrics, and user dashboard requirements.",
                  },
                  {
                    icon: Sparkles,
                    text: "You will receive a detailed mockup and implementation plan, including data model strategy and cost analysis.",
                  },
                ].map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={i} className="group flex items-start gap-8">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gray-200 text-[#0171c1] transition-all duration-500 group-hover:border-[#0171c1] group-hover:bg-[#0171c1] group-hover:text-white">
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      <p className="pt-2 text-lg leading-relaxed font-medium text-gray-500">
                        {step.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

            <ServiceDetailContactCTA />
    </div>
  );
}
