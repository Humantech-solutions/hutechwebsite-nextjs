"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Database,
  Workflow,
  BarChart3,
  ShieldCheck,
  Settings,
  TrendingUp,
  Sparkles,
  Smartphone,
  Globe,
  Network,
  MessageSquare,
  FileText,
  Zap,
  ChevronRight,
  MoveRight,
  ArrowRight,
  Layers,
  RefreshCw,
  Server,
  Lock,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

const DATA_SERVICES = [
  {
    icon: Database,
    title: "Data Strategy & Governance",
    description:
      "Navigate your journey to unified data with confidence. We develop comprehensive roadmaps—including cataloging and role-based policies—to ensure data consistency across your legacy silos.",
  },
  {
    icon: Layers,
    title: "Lakehouse Implementations",
    description:
      "Maximize flexibility and avoid database vendor lock-in. We design and manage Delta Lake structures across AWS, Azure, and Google Cloud, ensuring unstructured data is ready for SQL querying.",
  },
  {
    icon: RefreshCw,
    title: "ETL/ELT Pipeline Automation",
    description:
      "Build for the future of enterprise intelligence. We leverage modern toolsets like dbt, Airflow, and Fivetran to create highly scalable, resilient, and automated data loading workflows.",
  },
  {
    icon: Zap,
    title: "Real-time Streaming Fabric",
    description:
      "Stop losing business insights to batch delays. Our experts perform deep audits of your systems to design event-driven Apache Kafka pipelines, processing transaction logs in real-time.",
  },
  {
    icon: Server,
    title: "Cloud Warehouse Migration",
    description:
      "Don't let legacy databases hold your business back. We transform slow, monolithic database systems into modern cloud warehouses (Snowflake, BigQuery, Databricks) with zero downtime.",
  },
  {
    icon: Network,
    title: "Data Mesh Orchestration",
    description:
      "Focus on analytics while we handle the network layers. We provide decentralized domain-led database structures governed by centralized compliance and secure access schemas.",
  },
];

const ESSENTIAL_SOLUTIONS = [
  {
    icon: Lock,
    title: "Data-to-Value Acceleration",
    description:
      "Protect your strategic timelines. We implement query optimizations, partition indexing, and database caching to deliver dashboard reports to business leaders in seconds.",
  },
  {
    icon: Workflow,
    title: "Enterprise Data Compliance",
    description:
      "Accelerate compliance reviews. We automate data masking, data residency filtering, and tokenization to satisfy GDPR, HIPAA, and regional database audit rules.",
  },
  {
    icon: BarChart3,
    title: "High-Throughput Stream Parsing",
    description:
      "Unlock the value of fast streaming. We design elastic ingestion clusters capable of importing and analyzing millions of transaction logs per minute without system failure.",
  },
  {
    icon: ShieldCheck,
    title: "Data Quality Observability",
    description:
      "Ensure pipeline stability never stops. We configure automated validation checks that inspect schema types, detect null values, and notify engineering teams instantly.",
  },
  {
    icon: Settings,
    title: "Infrastructure Cost Control",
    description:
      "Automate your warehouse compute budgeting. We write auto-scaling warehouse configuration code and partition storage targets to slash monthly cloud bills by 30%.",
  },
  {
    icon: TrendingUp,
    title: "Single System of Record",
    description:
      "Deliver unified data to your enterprise. We optimize your master data management rules, clear duplicated fields, and configure central databases to yield verified insights.",
  },
];

const INNOVATIONS = [
  {
    icon: Sparkles,
    title: "Zero-Copy Data Sharing",
    description:
      "Leverage Snowflake sharing protocols to grant immediate query access to partners and vendors without duplicating files, reducing storage overhead costs.",
  },
  {
    icon: Smartphone,
    title: "Autonomous Schema Evolution",
    description:
      "Build pipelines that adapt. We write automated ingestion layers that identify source API parameter additions, altering database tables in real-time without errors.",
  },
  {
    icon: Globe,
    title: "Edge-Based Data Compression",
    description:
      "Reduce network load. We build lightweight data encoders that filter and compress raw device telemetry directly on edge chips before uploading records to the cloud.",
  },
  {
    icon: Database,
    title: "Homomorphic Query Engines",
    description:
      "Analyze private datasets securely. We configure SQL query engines to compute calculations on encrypted databases, protecting personal identity information.",
  },
  {
    icon: Network,
    title: "Semantic Metadata Catalogs",
    description:
      "Manage database schemas with ease. We deploy AI models that scan table names, write column descriptions, and draw data lineage pathways automatically.",
  },
  {
    icon: Lock,
    title: "Delta-Lake Write-Ahead Auditing",
    description:
      "Protect table states from unauthorized changes. We leverage transaction log ledger security to audit system access and revert records to historic checkpoints.",
  },
];

const WHY_CHOOSE = [
  {
    title: "Platform-Agnostic Mastery",
    description:
      "Our architects are certified across Snowflake, Databricks, Google BigQuery, and AWS Glue, ensuring you get unbiased advice on the best platform fit.",
  },
  {
    title: "Production MLOps Integration",
    description:
      "We design our data pipeline structures with machine learning in mind, ensuring tables are cleaned, formatted, and instantly ready for AI training runs.",
  },
  {
    title: "Battle-Tested Database Security",
    description:
      "We build strict column-level masking rules, secure credential vaults, and encrypted storage pools to guard sensitive financial and medical records.",
  },
  {
    title: "Business-Led Value Delivery",
    description:
      "We don't build pipelines for the sake of technologies. Every warehouse transformation we design is tied directly to your business ROI and efficiency targets.",
  },
];

const FAQS = [
  {
    question: "What is a modern data lakehouse architecture?",
    answer:
      "A data lakehouse combines the flexible, low-cost file storage of a standard data lake with the structure, transaction integrity, and SQL querying performance of a structured data warehouse.",
  },
  {
    question: "How do you ensure data accuracy inside automated pipelines?",
    answer:
      "We build automated data validation tests using dbt, configure null-record checks, and establish pipeline orchestration rules in Airflow to pause tasks and alert engineering teams if errors spike.",
  },
  {
    question: "Can you help us migrate our legacy on-premise databases to the cloud?",
    answer:
      "Yes, we manage complete migrations, including data cleaning, database schema translation, secure VPN setups, parallel run tests, and zero-downtime cutovers.",
  },
  {
    question: "How do you protect database privacy and compliance?",
    answer:
      "We implement role-based access controls, column-level masking for private consumer records, encryption for data at rest and in transit, and complete data lineage logging.",
  },
  {
    question: "What is the primary difference between ETL and ELT pipelines?",
    answer:
      "ETL (Extract, Transform, Load) transforms data before loading it into a warehouse, whereas ELT (Extract, Load, Transform) loads raw files first, utilizing the warehouse's compute engine to speed up transformations.",
  },
];

const BLOG_POSTS = [
  {
    id: "1",
    title: "Scaling Data Mesh: Decentralized Ownership in 2026",
    description:
      "Discover how domain-led data management allows business groups to build dashboards fast without engineering blockages...",
    image:
      "https://images.unsplash.com/photo-1763568258696-32147bb44379?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "2",
    title: "dbt and Snowflake: Building Fast Transformation Grids",
    description:
      "Best practices for modeling clean database layers and partitioning tables to slash monthly warehouse compute bills...",
    image:
      "https://images.unsplash.com/photo-1633412802994-5c058f151b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "3",
    title: "Real-Time Ingestion: Building Pipelines with Apache Kafka",
    description:
      "A technical guide to configuring distributed streaming brokers to ingest and parse millions of transaction records with zero lag...",
    image:
      "https://images.unsplash.com/photo-1686061593213-98dad7c599b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

const DATA_STACK = [
  { primary: "APACHE SPARK", secondary: "DATA PROCESSING" },
  { primary: "APACHE KAFKA", secondary: "STREAMING DATA" },
  { primary: "AIRFLOW", secondary: "WORKFLOWS" },
  { primary: "SNOWFLAKE", secondary: "DATA CLOUD" },
  { primary: "DATABRICKS", secondary: "DATA ANALYTICS" },
  { primary: "BIGQUERY", secondary: "CLOUD WAREHOUSE" },
  { primary: "AWS GLUE", secondary: "SERVERLESS ETL" },
  { primary: "DELTA LAKE", secondary: "STORAGE LAYER" },
  { primary: "DBT", secondary: "TRANSFORMATION" },
  { primary: "FIVETRAN", secondary: "DATA INGESTION" },
  { primary: "PYTHON", secondary: "DATA SCRIPTS" },
  { primary: "KUBERNETES", secondary: "CONTAINER CLOUD" },
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

export default function DataEngineering() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="Data Engineering Services | Hutech Solutions"
        description="Transform your enterprise databases with Hutech's Data Engineering services. Specialized in data warehouses, ETL pipelines, and lakehouse solutions."
      />

      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1633412802994-5c058f151b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Data Engineering Platform Architecture"
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
                Data Excellence
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              Your Data Vision. <br />
              <span className="text-[#F99D1C]">Engineering Revolution.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              We craft high-scale data warehouses, automated ETL pipelines, and governed data lakehouses for global enterprise leaders.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="display-font text-3xl leading-tight font-semibold text-[#001A3D] md:text-5xl">
                  Empowering Organizations with Smart, Scalable Data Engineering
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
              </div>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  At Hutech Solutions, we bring deep expertise in implementing, supporting, and
                  managing integrated data systems. Our end-to-end solutions include data lakehouse
                  setups, automated streaming pipelines, cloud warehouse migration, and semantic metadata governance.
                </p>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  We ensure our clients can operate with agility, safety, and efficiency, enabling
                  them to expand operations and integrate modern analytics solutions to meet specific data and market needs.
                </p>
              </div>
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">500+</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Pipelines Built
                  </p>
                </div>
                <div className="hidden h-12 w-[1px] bg-gray-200 md:block"></div>
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">10x</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Faster Processing
                  </p>
                </div>
                <div className="hidden h-12 w-[1px] bg-gray-200 md:block"></div>
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">99.9%</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Data Accuracy
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-sm shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1763568258696-32147bb44379?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Data Engineering Center"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 hidden max-w-xs space-y-4 bg-[#0171c1] p-10 text-white shadow-2xl md:block">
                <Database size={32} strokeWidth={1.5} />
                <h3 className="display-font text-xl font-bold">Data Fabric</h3>
                <p className="text-sm leading-relaxed font-medium opacity-80">
                  Integrating advanced streaming ledgers, decentralized data meshes, and unified query engines across enterprise platforms to enhance insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
              Our Data Engineering Services
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              At Hutech Solutions, we specialize in delivering cutting-edge software technology
              solutions tailored for the global database landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {DATA_SERVICES.map((service, i) => {
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
              What Makes Custom Data Engineering Solutions Essential for Your Business?
            </h2>
            <div className="mx-auto h-1 w-20 bg-[#0171c1]"></div>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-400">
              In the modern digital landscape, custom data warehouses are key to staying competitive
              and ensuring operational alignment.
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
              Which Innovations Can Transform Your Data Architecture?
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-500">
              Incorporating advanced database patterns can significantly enhance your reporting capabilities
              for the digital-first era.
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
                  Discover Your Data Engineering Strategy With Us
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  Schedule a consultation with our expert data engineering team and take the first step towards a digital-first database experience.
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
                  src="https://images.unsplash.com/photo-1763568258696-32147bb44379?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Data Engineering Dashboard"
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
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
              MODERN DATA ENGINEERING STACK
            </h2>

            <div className="mx-auto mt-4 h-[3px] w-14 bg-[#F99D1C]" />

            <p className="mx-auto mt-6 max-w-2xl text-sm font-medium text-gray-400 md:text-base leading-relaxed">
              Advanced data engineering technologies enabling scalable pipelines, real-time analytics, and intelligent data processing
            </p>
          </div>

          {/* Cards Grid */}
          <div className="border-l border-t border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {DATA_STACK.map((item, idx) => (
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
              Why Choose Hutech Solutions for Your Data Engineering Project?
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              At Hutech Solutions, we specialize in delivering Data Engineering solutions
              tailored to your unique organizational needs.
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
                Start Your Data Engineering Project
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
                  placeholder="Tell us about your data warehousing and pipeline needs"
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
                    text: "A senior data engineer will review your request and contact you within a few business hours.",
                  },
                  {
                    icon: FileText,
                    text: "We schedule an architecture audit to map your current data sources, databases, and silos.",
                  },
                  {
                    icon: Sparkles,
                    text: "You receive a detailed proposal including modern stack options, pipeline designs, and cost models.",
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

      {/* FAQ Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl font-semibold tracking-tight text-[#001A3D] md:text-5xl">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto h-1 w-20 bg-[#0171c1]"></div>
          </div>
          <div className="mx-auto max-w-4xl divide-y divide-gray-100">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-16 flex items-end justify-between gap-8">
            <div className="max-w-2xl space-y-6">
              <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
                Data Engineering Insights & Articles
              </h2>
              <p className="text-lg font-medium text-gray-500">
                Explore our latest thinking on database technology and data pipeline trends.
              </p>
            </div>
            <Link
              href="/resources"
              className="hidden items-center gap-2 pb-2 text-[11px] font-bold tracking-widest text-[#0171c1] uppercase transition-all hover:gap-4 md:flex"
            >
              View All Resources <MoveRight size={16} />
            </Link>
          </div>

          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {BLOG_POSTS.map((post, i) => (
              <div
                key={i}
                className="group overflow-hidden rounded-sm bg-white shadow-sm transition-all duration-500 hover:shadow-2xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="rounded-sm bg-[#0171c1] px-3 py-1 text-[9px] font-bold tracking-widest text-white uppercase">
                      DataEng
                    </span>
                  </div>
                </div>
                <div className="space-y-4 p-8">
                  <h3 className="display-font line-clamp-2 min-h-[3.5rem] text-xl leading-tight font-bold text-[#001A3D] transition-colors group-hover:text-[#0171c1]">
                    {post.title}
                  </h3>
                  <p className="line-clamp-3 text-sm leading-relaxed font-medium text-gray-500">
                    {post.description}
                  </p>
                  <div className="border-t border-gray-50 pt-4">
                    <Link
                      href={`/resources/blogs/${post.id}`}
                      className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#001A3D] uppercase transition-colors hover:text-[#0171c1]"
                    >
                      Read Article <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center md:hidden">
            <Link
              href="/resources"
              className="inline-flex items-center gap-3 rounded-sm bg-[#0171c1] px-10 py-5 text-[11px] font-bold tracking-wider text-white uppercase shadow-xl"
            >
              Explore Resources <MoveRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
