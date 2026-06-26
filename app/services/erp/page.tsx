"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Database,
  Workflow,
  Globe,
  Cloud,
  LayoutGrid,
  Lock,
  BarChart3,
  ShieldCheck,
  Settings,
  TrendingUp,
  Sparkles,
  Smartphone,
  Network,
  MessageSquare,
  FileText,
  Zap,
  ChevronRight,
  MoveRight,
  ArrowRight,
  Server,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

import { ServiceDetailContactCTA } from "@/components/ServiceDetailContactCTA";

const ERP_SERVICES = [
  {
    icon: Database,
    title: "SAP S/4HANA Implementation",
    description:
      "Navigate your journey to the digital core with confidence. We develop comprehensive roadmaps—including Greenfield, Brownfield, and Clean Core strategies—to ensure a seamless transition for your legacy ERP systems.",
  },
  {
    icon: Workflow,
    title: "ServiceNow Workflows",
    description:
      "Maximize flexibility and avoid operational silos. We design and manage unified digital workflows across IT, HR, and Customer Service operations, ensuring your team processes are optimized for speed.",
  },
  {
    icon: Globe,
    title: "Oracle Cloud & NetSuite",
    description:
      "Build for the future of enterprise business. We leverage Oracle Fusion Cloud and NetSuite setups to create highly integrated supply chain, human capital, and financial accounting architectures.",
  },
  {
    icon: Cloud,
    title: "Salesforce CRM Systems",
    description:
      "Stop losing customer analytics to disconnected databases. Our experts implement multi-cloud Salesforce solutions with Einstein AI to provide a 360-degree view of your customer database.",
  },
  {
    icon: LayoutGrid,
    title: "Pega Business Management",
    description:
      "Don't let manual case handling limit your operations. We transform traditional business rules into automated case management files and robotic process automation scripts.",
  },
  {
    icon: Network,
    title: "Open Source ERP Systems",
    description:
      "Focus on scaling your business without high licensing overhead. We design, customize, and deploy modular Odoo and Python-based ERPNext solutions tailored directly to your operating DNA.",
  },
];

const ESSENTIAL_SOLUTIONS = [
  {
    icon: Lock,
    title: "Business Process Re-engineering",
    description:
      "Protect your enterprise profitability. We perform deep audits of your current workflows to simplify task paths and align core operations with long-term KPI metrics.",
  },
  {
    icon: Workflow,
    title: "Unified Systems Integration",
    description:
      "Accelerate data connectivity. We build secure API middleware to synchronize data transactions between CRM, ERP, and physical warehouse databases in real-time.",
  },
  {
    icon: BarChart3,
    title: "Change Management Strategy",
    description:
      "Unlock the value of your new platforms. We run targeted user training programs, prepare guides, and build alignment structures to guarantee rapid staff adoption.",
  },
  {
    icon: ShieldCheck,
    title: "High-Throughput Inventory Sync",
    description:
      "Ensure supply chain stability never stops. We design automated database replication scripts that update stock ledgers immediately across international offices.",
  },
  {
    icon: Settings,
    title: "Compliance & Security Audits",
    description:
      "Automate your internal access controls. We configure role-based visibility, encrypt database tables, and verify transactions to meet strict financial accounting rules.",
  },
  {
    icon: TrendingUp,
    title: "Managed Core Optimization",
    description:
      "Deliver peak platform performance under load. We optimize database queries, deploy upgrades, and perform daily monitoring to ensure enterprise systems run smoothly.",
  },
];

const INNOVATIONS = [
  {
    icon: Sparkles,
    title: "Intelligent ServiceNow AIOps",
    description:
      "Leverage machine learning to map IT resources and analyze log anomalies automatically, predicting and resolving system incidents before they affect users.",
  },
  {
    icon: Smartphone,
    title: "Low-Code App Development",
    description:
      "Deploy custom dashboards fast. We build mobile-responsive screens utilizing ServiceNow App Engine or Pega to handle field service workflows in real-time.",
  },
  {
    icon: Globe,
    title: "Clean Core SAP Architecture",
    description:
      "Reduce system update costs. We isolate custom coding in SAP Business Technology Platform (BTP), allowing core software upgrades with zero operational bugs.",
  },
  {
    icon: Database,
    title: "Predictive Supply Chain Planning",
    description:
      "Eliminate material ordering delays. We build ML algorithms that analyze global cargo transit reports to adjust assembly line schedules automatically.",
  },
  {
    icon: Network,
    title: "Robotic Process Automation",
    description:
      "Manage document processing with ease. We write software bots that parse incoming invoices, match delivery slips, and update ledger lines without human errors.",
  },
  {
    icon: Lock,
    title: "Headless ERP Interfaces",
    description:
      "Protect operational efficiency in warehouses. We decouple backend ERP databases from custom mobile screens, delivering lightning-fast usability for packers.",
  },
];

const WHY_CHOOSE = [
  {
    title: "Certified Platform Consultants",
    description:
      "Our architects are fully certified across SAP S/4HANA, ServiceNow, Oracle, and Salesforce, delivering verified implementation patterns.",
  },
  {
    title: "Four-Pillar Execution Model",
    description:
      "We follow a rigorous discovery, agile deployment, change management, and managed evolution roadmap to guarantee successful transformations.",
  },
  {
    title: "Zero-Downtime Data Migration",
    description:
      "We design custom extract-transform-load (ETL) scripts to clean and migrate transaction history from legacy databases without database downtime.",
  },
  {
    title: "Long-Term Evolution Focus",
    description:
      "We don't leave you after go-live. We offer managed operations, configuration tuning, and cost-benefit audits to maximize your software ROI.",
  },
];

const FAQS = [
  {
    question: "Which ERP platform is right for our organization?",
    answer:
      "The best platform depends on your sector, transaction volume, and scaling targets. SAP is suited for global manufacturers, Oracle supports complex supply chains, NetSuite is excellent for mid-market scale-ups, and open-source models fit smaller operations.",
  },
  {
    question: "How do you manage data migration from our legacy systems?",
    answer:
      "We develop secure ETL scripts to extract legacy transactions, clean raw records, and map data parameters to the new cloud core, validating database integrity before launching.",
  },
  {
    question: "What is your 'Clean Core' strategy for SAP implementations?",
    answer:
      "We keep the core ERP code pristine. All custom apps, calculations, and integrations are built externally on SAP BTP, allowing you to deploy core patches without breaks.",
  },
  {
    question: "Do you offer post-implementation user training?",
    answer:
      "Yes, change management is a key part of our service. We deliver role-based training materials, run training workshops, and configure self-help screens to ensure team adoption.",
  },
  {
    question: "How long does a ServiceNow implementation typically take?",
    answer:
      "A standard ITSM or HRSD workflow module deployment takes 10-14 weeks, whereas complex, multi-module enterprise transformations range from 4-6 months.",
  },
];

const BLOG_POSTS = [
  {
    id: "1",
    title: "SAP Clean Core Strategy: Simplifying Enterprise Upgrades",
    description:
      "Learn how separating custom code from your core ERP database reduces system upgrade friction and operational downtime...",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "2",
    title: "Automating IT Workflows: The ServiceNow AIOps Revolution",
    description:
      "How enterprise IT groups utilize service mapping and automated alerts to catch and resolve outages before customers notice...",
    image:
      "https://images.unsplash.com/photo-1551288049-bbbda546697c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "3",
    title: "NetSuite vs. SAP S/4HANA: Choosing the Right Cloud ERP",
    description:
      "An in-depth guide comparing implementation speeds, platform licensing costs, and total cost of ownership for growing brands...",
    image:
      "https://images.unsplash.com/photo-1686061593213-98dad7c599b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

const ERP_STACK = [
  { primary: "SAP S/4HANA", secondary: "ERP SYSTEMS" },
  { primary: "ORACLE ERP", secondary: "ENTERPRISE CORE" },
  { primary: "MS DYNAMICS", secondary: "OPERATIONS" },
  { primary: "SALESFORCE", secondary: "CRM CORE" },
  { primary: "SERVICENOW", secondary: "WORKFLOWS" },
  { primary: "WORKDAY", secondary: "HCM SYSTEMS" },
  { primary: "NETSUITE", secondary: "SCALE-UP ERP" },
  { primary: "INFOR", secondary: "SUPPLY CHAIN" },
  { primary: "IBM MIDDLEWARE", secondary: "INTEGRATION" },
  { primary: "SAGE", secondary: "FINANCE CORPS" },
  { primary: "EPICOR", secondary: "MANUFACTURING" },
  { primary: "PYTHON", secondary: "AUTOMATION" },
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

export default function EnterpriseDigitalSolutions() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="Enterprise Digital Solutions | Hutech Solutions"
        description="Transform your enterprise with Hutech's ERP & Workflow services. Specialized in SAP, ServiceNow, Oracle Cloud, and digital transformation."
      />

      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Enterprise Technology Architecture"
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
                Enterprise Excellence
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              Your Enterprise Vision. <br />
              <span className="text-[#F99D1C]">Digital Revolution.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              We craft integrated ERP ecosystems, automate corporate workflows, and deploy digital core solutions for global businesses.
            </p>
            <Link href="/contact" className="btn-banner-cta mt-6 group">
              Consult Us
              <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
            </Link>
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
                  Empowering Organizations with Smart, Scalable Enterprise Digital Solutions
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
              </div>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  At Hutech Solutions, we bring deep expertise in implementing, supporting, and
                  managing integrated enterprise cores. Our end-to-end solutions include system
                  implementations across SAP, ServiceNow, and Oracle Cloud, custom integrations, and business process automation.
                </p>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  We ensure our clients can operate with agility, efficiency, and clarity, enabling
                  them to expand operations and integrate modern digital core platforms to meet specific transaction and management needs.
                </p>
              </div>
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">200+</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    ERP Implementations
                  </p>
                </div>
                <div className="hidden h-12 w-[1px] bg-gray-200 md:block"></div>
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">45%</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Avg Efficiency Gains
                  </p>
                </div>
                <div className="hidden h-12 w-[1px] bg-gray-200 md:block"></div>
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">150+</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Connected Integrations
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-sm shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Enterprise Digital Center"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 hidden max-w-xs space-y-4 bg-[#0171c1] p-10 text-white shadow-2xl md:block">
                <Server size={32} strokeWidth={1.5} />
                <h3 className="display-font text-xl font-bold">Enterprise Core</h3>
                <p className="text-sm leading-relaxed font-medium opacity-80">
                  Integrating advanced databases, cloud workflows, and unified ledger technologies across platforms to streamline operations.
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
              Our Enterprise Digital Solutions
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              At Hutech Solutions, we specialize in delivering cutting-edge software technology
              solutions tailored for the global enterprise infrastructure landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {ERP_SERVICES.map((service, i) => {
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
              What Makes Custom Enterprise Solutions Essential for Your Business?
            </h2>
            <div className="mx-auto h-1 w-20 bg-[#0171c1]"></div>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-400">
              In the modern digital landscape, custom enterprise cores are key to staying competitive
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
              Which Innovations Can Transform Your Enterprise Operations?
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-500">
              Incorporating advanced integrations can significantly enhance your workflow capabilities
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
                  Discover Your Enterprise Digital Transformation Strategy With Us
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  Schedule a consultation with our expert enterprise architecture team and take the
                  first step towards a digital-first integrated core.
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
                  src="https://images.unsplash.com/photo-1551288049-bbbda546697c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Enterprise Core Analytics"
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
              MODERN ENTERPRISE & ERP STACK
            </h2>

            <div className="mx-auto mt-4 h-[3px] w-14 bg-[#F99D1C]" />

            <p className="mx-auto mt-6 max-w-2xl text-sm font-medium text-gray-400 md:text-base leading-relaxed">
              Enterprise platforms and integration frameworks powering robust, secure, and data-backed business management
            </p>
          </div>

          {/* Cards Grid */}
          <div className="border-l border-t border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {ERP_STACK.map((item, idx) => (
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
              Why Choose Hutech Solutions for Your Enterprise Project?
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              At Hutech Solutions, we specialize in delivering Enterprise Digital Solutions
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


      <ServiceDetailContactCTA />

    </div>
  );
}
