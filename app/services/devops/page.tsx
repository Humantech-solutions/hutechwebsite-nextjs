"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Server,
  Cloud,
  Activity,
  Rocket,
  Shield,
  Zap,
  BarChart3,
  TrendingDown,
  ArrowRight,
  MoveRight,
  Check,
  Sparkles,
  DollarSign,
  Users,
  Target,
  Award,
  CheckCircle2,
  Settings,
  GitBranch,
  Eye,
  AlertCircle,
  ShieldCheck,
  Workflow,
  Lock,
  MessageSquare,
  FileText,
  ChevronRight,
  RefreshCw,
  Network,
  Terminal,
  Cpu,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

import { ServiceDetailContactCTA } from "@/components/ServiceDetailContactCTA";

const DEVOPS_SERVICES = [
  {
    icon: Cloud,
    title: "DevOps & Cloud Support",
    description:
      "End-to-end infrastructure management and cloud platform setup. We handle the heavy lifting of cloud provisioning, scaling, and 24/7 monitoring so your developers can focus on code.",
    functions: [
      "Multi-Cloud Platform Provisioning (AWS, Azure, GCP)",
      "Continuous Monitoring & Real-time Alerting",
      "Infrastructure Scaling & Auto-scaling Setup",
      "Cost Optimization & Resource Utilization Audits",
    ],
  },
  {
    icon: GitBranch,
    title: "Release Management",
    description:
      "Streamline your software delivery lifecycle. We implement robust CI/CD pipelines that automate testing, security scans, and deployments for zero-downtime releases.",
    functions: [
      "Automated CI/CD Pipeline Design",
      "Blue-Green & Canary Deployment Strategies",
      "Artifact Management & Version Control",
      "Automated Rollback Mechanisms",
    ],
  },
  {
    icon: Eye,
    title: "Site Reliability & Observability",
    description:
      "Build resilient systems that learn from failure. Our SRE experts implement deep observability to predict issues before they impact your users.",
    functions: [
      "Distributed Tracing & Log Aggregation",
      "Service Level Objective (SLO) Management",
      "Incident Response & Post-Mortem Analysis",
      "Disaster Recovery & High Availability Design",
    ],
  },
];

const INNOVATIONS = [
  {
    icon: Sparkles,
    title: "AIOps Integration",
    description:
      "Harness AI to analyze petabytes of log data, identifying anomalies and predicting potential system failures before they occur.",
  },
  {
    icon: Terminal,
    title: "Infrastructure as Code (IaC)",
    description:
      "We define your entire data center in code using Terraform and Ansible, ensuring 100% environment consistency and rapid disaster recovery.",
  },
  {
    icon: ShieldCheck,
    title: "DevSecOps Transformation",
    description:
      "Security is no longer an afterthought. We bake security scanning and compliance checks directly into your automated delivery pipelines.",
  },
  {
    icon: Activity,
    title: "Chaos Engineering",
    description:
      "We proactively inject controlled failures into your systems to uncover hidden weaknesses and build bulletproof resilience.",
  },
  {
    icon: Cpu,
    title: "Serverless & Containerization",
    description:
      "Modernize your workloads with Kubernetes and Serverless architectures to maximize efficiency and minimize operational overhead.",
  },
  {
    icon: Network,
    title: "Service Mesh Orchestration",
    description:
      "Manage complex microservices communications with Istio or Linkerd, providing security, visibility, and traffic control at scale.",
  },
];

const PRICING_COMPARISON = [
  {
    service: "DevOps & Cloud Support",
    hutechCost: "$700",
    resourceCost: "$2,500+",
    savings: "Save 72%",
  },
  {
    service: "Release Management",
    hutechCost: "$800",
    resourceCost: "$3,000+",
    savings: "Save 67%",
  },
  {
    service: "SRE & Observability",
    hutechCost: "$1,200",
    resourceCost: "$3,500+",
    savings: "Save 66%",
  },
];

const WHY_CHOOSE = [
  {
    title: "Shared-Service Advantage",
    description:
      "Access a world-class team of SREs and DevOps engineers for a fraction of the cost of a single full-time hire.",
  },
  {
    title: "24/7 Global Vigilance",
    description:
      "Our distributed team provides 'follow-the-sun' monitoring and incident response, ensuring your systems never sleep.",
  },
  {
    title: "Vendor-Neutral Philosophy",
    description:
      "We are experts in AWS, Azure, GCP, and On-Premise, recommending the best architecture for your unique needs.",
  },
  {
    title: "Speed to Market focus",
    description:
      "Our automation frameworks typically reduce software release cycles by up to 60%, getting your features to users faster.",
  },
];

const FAQS = [
  {
    question: "What is the Shared-Service Model?",
    answer:
      "Our shared-service model allows multiple clients to share a pool of elite DevOps and SRE experts. This drastically reduces individual costs while ensuring you have access to senior-level talent whenever you need it.",
  },
  {
    question: "How do you handle security in your DevOps pipelines?",
    answer:
      "We follow DevSecOps principles, integrating static and dynamic security analysis (SAST/DAST) into every build. We also implement secrets management and zero-trust networking as standard.",
  },
  {
    question: "Can you help us migrate to Kubernetes?",
    answer:
      "Yes, Kubernetes orchestration is one of our core specialties. We handle cluster setup, networking, storage, and the containerization of your applications.",
  },
  {
    question: "What is your response time for critical incidents?",
    answer:
      "For our Enterprise-tier clients, we offer guaranteed response times as low as 15 minutes for P0 incidents, backed by strict SLAs.",
  },
  {
    question: "Do we need to change our current cloud provider?",
    answer:
      "Not at all. We adapt our DevOps frameworks to your existing infrastructure, whether it's public cloud, private cloud, or hybrid.",
  },
];

const DEVOPS_STACK = [
  { primary: "KUBERNETES", secondary: "ORCHESTRATION" },
  { primary: "DOCKER", secondary: "CONTAINERS" },
  { primary: "JENKINS", secondary: "CI/CD" },
  { primary: "TERRAFORM", secondary: "IaC" },
  { primary: "ANSIBLE", secondary: "AUTOMATION" },
  { primary: "GITHUB ACTIONS", secondary: "WORKFLOWS" },
  { primary: "PROMETHEUS", secondary: "MONITORING" },
  { primary: "GRAFANA", secondary: "OBSERVABILITY" },
  { primary: "ARGOCD", secondary: "GITOPS" },
  { primary: "ELASTICSEARCH", secondary: "LOGGING" },
  { primary: "NGINX", secondary: "LOAD BALANCING" },
  { primary: "AWS", secondary: "CLOUD PLATFORM" },
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

export default function SreDevopsServices() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="SRE & DevOps Services | Hutech Solutions"
        description="Enterprise-grade SRE and DevOps as a Service. Save up to 70% with our shared-service model. Accelerate your releases with elite reliability."
      />

      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="DevOps and Infrastructure Monitoring"
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
                Reliability Engineering
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              Velocity Without Risk. <br />
              <span className="text-[#F99D1C]">Enterprise Reliability.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              We help businesses thrive with elite-tier SRE and DevOps solutions. Break the silos,
              automate the toil, and ship with absolute confidence.
            </p>
            <Link href="/contact" className="btn-banner-cta mt-6 group">
              Consult Us
              <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
            </Link>
          </Motion.div>
        </div>
      </section>

      {/* Intro / Value Prop Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="display-font text-3xl leading-tight font-semibold text-[#001A3D] md:text-5xl">
                  Redefining Reliability with a Budget-First Approach
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
              </div>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  Our SRE and DevOps as a Service operates on a unique shared-service model that is
                  simple, scalable, and budget-friendly. We eliminate the need for expensive
                  full-time hires while providing enterprise-grade support.
                </p>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  By leveraging automation, observability, and elite engineering talent, we help
                  organizations reduce their operational costs by up to 70% without compromising on
                  system stability or release speed.
                </p>
              </div>
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">70%</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Avg Cost Reduction
                  </p>
                </div>
                <div className="hidden h-12 w-[1px] bg-gray-200 md:block"></div>
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">60%</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Faster Release Cycles
                  </p>
                </div>
                <div className="hidden h-12 w-[1px] bg-gray-200 md:block"></div>
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">99.9%</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    System Reliability
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-sm shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="DevOps Engineering Dashboard"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 hidden max-w-xs space-y-4 bg-[#0171c1] p-10 text-white shadow-2xl md:block">
                <Zap size={32} strokeWidth={1.5} />
                <h3 className="display-font text-xl font-bold">Shared Expertise</h3>
                <p className="text-sm leading-relaxed font-medium opacity-80">
                  Access senior-level DevOps talent starting from $700/month through our innovative
                  service model.
                </p>
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
              Comprehensive DevOps Solutions
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              We specialize in delivering robust automation and reliability frameworks tailored for
              modern high-growth organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {DEVOPS_SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative flex h-full flex-col space-y-6 overflow-hidden border border-gray-100 bg-white p-12 shadow-sm transition-all duration-500 hover:shadow-2xl"
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

                  <ul className="space-y-3 pt-4">
                    {service.functions.map((func, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-xs font-medium text-gray-600"
                      >
                        <Check size={14} className="mt-0.5 shrink-0 text-[#0171c1]" />
                        <span>{func}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
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

      {/* Pricing Comparison Section */}
      <section className="overflow-hidden bg-[#001A3D] py-24 text-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font mx-auto max-w-4xl text-3xl leading-tight font-semibold md:text-5xl">
              Save Up to 70% on Operations
            </h2>
            <div className="mx-auto h-1 w-20 bg-[#0171c1]"></div>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-400">
              Compare our shared-service model with the cost of traditional hiring. Enterprise-grade
              support at a fraction of the budget.
            </p>
          </div>

          <div className="mb-20 overflow-hidden rounded-sm border border-white/10 bg-white/5">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-8 text-xs font-bold tracking-widest text-gray-400 uppercase">
                    Service Package
                  </th>
                  <th className="p-8 text-xs font-bold tracking-widest text-[#0171c1] uppercase">
                    Hutech Cost (Monthly)
                  </th>
                  <th className="p-8 text-xs font-bold tracking-widest text-gray-400 uppercase">
                    Traditional Hiring
                  </th>
                  <th className="p-8 text-xs font-bold tracking-widest text-emerald-400 uppercase">
                    Total Savings
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 font-medium">
                {PRICING_COMPARISON.map((row, i) => (
                  <tr key={i} className="transition-colors hover:bg-white/5">
                    <td className="display-font p-8 text-lg font-bold">{row.service}</td>
                    <td className="p-8 text-xl font-bold text-[#0171c1]">{row.hutechCost}</td>
                    <td className="p-8 text-gray-500 line-through">{row.resourceCost}</td>
                    <td className="p-8 font-bold tracking-tight text-emerald-400">{row.savings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-sm border border-white/10 bg-white/5 p-12 text-center">
            <h3 className="display-font mb-4 text-2xl font-bold">
              Ready to optimize your infrastructure costs?
            </h3>
            <p className="mx-auto mb-8 max-w-2xl text-gray-400">
              Our consultants will perform a free audit of your current operations and show you
              exactly where you can save.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-sm bg-[#F99D1C] px-10 py-5 text-[11px] font-bold tracking-wider text-[#001A3D] uppercase shadow-xl transition-all hover:bg-white"
            >
              Request A Free Audit <MoveRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Innovations Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl font-semibold tracking-tight text-[#001A3D] md:text-5xl">
              Which Innovations Can Propel Your Reliability?
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-500">
              We integrate the latest advancements in reliability engineering to ensure your systems
              remain future-proof.
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

      {/* SRE & DevOps Services Technology Stack Section */}
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
              MODERN SRE & DEVOPS STACK
            </h2>
            
            <div className="mx-auto mt-4 h-[3px] w-14 bg-[#F99D1C]" />
            
            <p className="mx-auto mt-6 max-w-2xl text-sm font-medium text-gray-400 md:text-base leading-relaxed">
              Reliable DevOps and SRE technologies enabling scalable infrastructure, automation, monitoring, and continuous delivery
            </p>
          </div>

          {/* Cards Grid */}
          <div className="border-l border-t border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {DEVOPS_STACK.map((item, idx) => (
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
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
              Why Choose Hutech Solutions for DevOps?
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              We specialize in delivering high-impact DevOps and SRE solutions tailored for
              rapid-growth enterprise environments.
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
                  <Settings size={24} strokeWidth={1.5} />
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



      {/* FAQ Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl font-semibold tracking-tight text-[#001A3D] md:text-5xl">
              Expert SRE Insights (FAQ)
            </h2>
            <div className="mx-auto h-1 w-20 bg-[#0171c1]"></div>
          </div>
          <div className="mx-auto max-w-4xl divide-y divide-gray-100 rounded-sm bg-white p-8 shadow-sm md:p-12">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

            <ServiceDetailContactCTA />
    </div>
  );
}
