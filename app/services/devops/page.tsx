"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Server,
  Cloud,
  Workflow,
  BarChart3,
  ShieldCheck,
  Settings,
  TrendingUp,
  Sparkles,
  Smartphone,
  Globe,
  Database,
  Network,
  MessageSquare,
  FileText,
  Zap,
  ChevronRight,
  MoveRight,
  ArrowRight,
  Lock,
  RefreshCw,
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
      "Navigate your journey to the cloud with confidence. We develop comprehensive roadmaps—including Rehost, Refactor, and Replatform strategies—to ensure a seamless transition for your legacy systems.",
  },
  {
    icon: Workflow,
    title: "Continuous Release Pipelines",
    description:
      "Maximize flexibility and avoid vendor lock-in. We design and manage complex architectures across AWS, Azure, and Google Cloud, ensuring your workloads are optimized for performance and cost.",
  },
  {
    icon: Server,
    title: "Site Observability & Monitoring",
    description:
      "Build for the future of the web. We leverage microservices, containers (Kubernetes), and serverless architectures to create highly scalable, resilient, and high-performance applications.",
  },
  {
    icon: Zap,
    title: "Kubernetes Orchestration",
    description:
      "Stop overspending on unused resources. Our experts perform deep audits of your cloud infrastructure to identify waste, right-size instances, and implement automated cost-saving measures.",
  },
  {
    icon: RefreshCw,
    title: "Infrastructure as Code (IaC)",
    description:
      "Don't let aging software hold you back. We transform monolithic legacy applications into agile, cloud-ready systems that can take full advantage of modern infrastructure capabilities.",
  },
  {
    icon: Network,
    title: "Service Mesh Architecture",
    description:
      "Focus on your business while we handle the infrastructure. We provide 24/7 monitoring, security patching, and proactive maintenance for your entire cloud environment.",
  },
];

const ESSENTIAL_SOLUTIONS = [
  {
    icon: Lock,
    title: "Blue-Green Release Stability",
    description:
      "Protect your cloud perimeter. We implement robust identity management, end-to-end encryption, and continuous security monitoring to ensure your data remains secure in the cloud.",
  },
  {
    icon: Workflow,
    title: "Automated Rollback Safeguards",
    description:
      "Accelerate your delivery cycles. We automate your development, testing, and deployment workflows, allowing your teams to ship features faster and with higher quality.",
  },
  {
    icon: BarChart3,
    title: "Continuous Security Integration",
    description:
      "Unlock the value of your data. We build scalable data lakes and warehouses in the cloud, enabling real-time analytics and AI-driven insights for your organization.",
  },
  {
    icon: ShieldCheck,
    title: "Distributed Log Aggregation",
    description:
      "Ensure your business never stops. We design automated backup and failover solutions that guarantee your systems are back online in minutes, not days.",
  },
  {
    icon: Settings,
    title: "Cost-Optimized Cloud Usage",
    description:
      "Automate your infrastructure management. We use Terraform and CloudFormation to define your environment in code, ensuring consistency, repeatability, and speed.",
  },
  {
    icon: TrendingUp,
    title: "Proactive Disaster Recovery",
    description:
      "Deliver lightning-fast experiences to your users. We optimize your cloud network, storage, and compute configurations to ensure peak performance under any load.",
  },
];

const INNOVATIONS = [
  {
    icon: Sparkles,
    title: "AI-Driven Log Anomaly Detection",
    description:
      "Leverage machine learning to automate resource scaling and anomaly detection, ensuring your cloud remains efficient and self-healing.",
  },
  {
    icon: Smartphone,
    title: "GitOps Workflow Orchestration",
    description:
      "Process data closer to the source. We integrate cloud backends with edge devices to reduce latency and improve response times for real-time applications.",
  },
  {
    icon: Globe,
    title: "Chaos Engineering Injection",
    description:
      "Reduce your environmental impact. We design energy-efficient cloud solutions that align with your corporate sustainability goals and reduce your carbon footprint.",
  },
  {
    icon: Database,
    title: "Serverless Edge Pipelines",
    description:
      "Eliminate server management entirely. We build applications that scale automatically from zero to millions of users, charging you only for what you use.",
  },
  {
    icon: Network,
    title: "Zero-Trust Network Controls",
    description:
      "Manage complex microservices communications with ease. We implement Istio and Linkerd to provide security, visibility, and control across your network.",
  },
  {
    icon: Lock,
    title: "Self-Healing Pod Clusters",
    description:
      "Protect data even while it's being processed. We leverage TEE (Trusted Execution Environments) to ensure your most sensitive workloads remain private.",
  },
];

const WHY_CHOOSE = [
  {
    title: "Elite Shared-Service Support",
    description:
      "Our team is certified across AWS, Microsoft Azure, and Google Cloud Platform, ensuring you get the best tool for your specific business requirements.",
  },
  {
    title: "Follow-the-Sun Monitoring",
    description:
      "We don't treat security as an afterthought. We build multi-layered protection into every layer of your cloud architecture from day one.",
  },
  {
    title: "Vendor-Neutral Philosophy",
    description:
      "We use a battle-tested methodology for cloud migration that minimizes risk, prevents data loss, and ensures zero disruption to your business operations.",
  },
  {
    title: "Accelerate Release Speed",
    description:
      "We don't just move you to the cloud; we ensure it's profitable. Our focus is on long-term cost efficiency and maximizing your return on investment.",
  },
];

const FAQS = [
  {
    question: "What is DevOps as a Service?",
    answer:
      "Our service model allows organizations to access a dedicated team of DevOps architects and SREs on demand to manage deployment pipelines, optimize cloud spend, and configure automated system alerts.",
  },
  {
    question: "How do you ensure security inside our CI/CD pipelines?",
    answer:
      "We integrate automated security audits (DevSecOps) directly into build runs, utilizing static scans, secrets vaulting, container security checks, and identity validation rules.",
  },
  {
    question: "Do you support migration to Google Cloud or Microsoft Azure?",
    answer:
      "Yes, we have certified experts cross-trained in AWS, Google Cloud, Azure, and private virtualization layers to manage complete cloud migration and database failovers.",
  },
  {
    question: "What is your response time for high-severity automated alerts?",
    answer:
      "We operate under strict Service Level Agreements (SLAs), offering follow-the-sun continuous monitoring that responds to critical P0 system outages in under 15 minutes.",
  },
  {
    question: "Can we use Terraform if we already have manual setups?",
    answer:
      "Absolutely. We perform a complete infrastructure audit of your existing resources, export configurations, and convert them into clean, repeatable Terraform code scripts.",
  },
];

const BLOG_POSTS = [
  {
    id: "1",
    title: "GitOps Best Practices: Scaling Kubernetes in 2026",
    description:
      "Syncing cluster configurations with repository files is standard, but scaling enterprise clusters requires unified GitOps architectures...",
    image:
      "https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "2",
    title: "Chaos Engineering: Injecting Outages to Discover Weakness",
    description:
      "Why leading engineering teams deliberately shut down production nodes and inject latency to test recovery automated scripts...",
    image:
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "3",
    title: "DevSecOps: Embedding Vulnerability Auditing in Pull Requests",
    description:
      "Save weeks of bug-fixing. Learn how automated SAST scans inside merge workflows alert developers to security leaks before deployment...",
    image:
      "https://images.unsplash.com/photo-1686061593213-98dad7c599b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

const DEVOPS_STACK = [
  { primary: "KUBERNETES", secondary: "ORCHESTRATION" },
  { primary: "TERRAFORM", secondary: "IaC TOOL" },
  { primary: "JENKINS", secondary: "PIPELINE ENGINE" },
  { primary: "GITHUB ACTIONS", secondary: "WORKFLOW RUNNER" },
  { primary: "ARGOCD", secondary: "GITOPS ENGINE" },
  { primary: "PROMETHEUS", secondary: "MONITORING TOOL" },
  { primary: "GRAFANA", secondary: "OBSERVABILITY" },
  { primary: "DATADOG", secondary: "LOG METRICS" },
  { primary: "DOCKER", secondary: "VIRTUALIZATION" },
  { primary: "HELM", secondary: "PACKAGE MANAGER" },
  { primary: "AWS", secondary: "CLOUD PLATFORM" },
  { primary: "ANSIBLE", secondary: "CONFIGURATION" },
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
        description="Transform your infrastructure with Hutech's SRE & DevOps services. Specialized in CI/CD automation, Kubernetes scaling, and cloud reliability."
      />

      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="DevOps Automation Infrastructure"
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
                DevOps Excellence
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              Your Deployment Vision. <br />
              <span className="text-[#F99D1C]">DevOps Revolution.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              We craft automated release pipelines, site reliability frameworks, and cloud orchestration systems for global enterprise software teams.
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
                  Empowering Organizations with Smart, Scalable SRE & DevOps Services
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
              </div>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  At Hutech Solutions, we bring deep expertise in implementing, supporting, and
                  managing integrated cloud infrastructures. Our end-to-end solutions include cloud
                  automation provisioning, site reliability engineering, release pipeline designs, and 24/7 incident response.
                </p>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  We ensure our clients can operate with agility, high availability, and efficiency, enabling
                  them to expand operations and integrate modern deployment frameworks to meet specific software and market needs.
                </p>
              </div>
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">600+</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Pipelines Built
                  </p>
                </div>
                <div className="hidden h-12 w-[1px] bg-gray-200 md:block"></div>
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">80%</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Faster Deployments
                  </p>
                </div>
                <div className="hidden h-12 w-[1px] bg-gray-200 md:block"></div>
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">99.99%</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    System Uptime
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-sm shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="DevOps Operations Center"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 hidden max-w-xs space-y-4 bg-[#0171c1] p-10 text-white shadow-2xl md:block">
                <Server size={32} strokeWidth={1.5} />
                <h3 className="display-font text-xl font-bold">Reliable Operations</h3>
                <p className="text-sm leading-relaxed font-medium opacity-80">
                  Integrating advanced chaos engineering, containerized platforms, and automated logging networks to enhance operational uptime.
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
              Our SRE & DevOps Services
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              At Hutech Solutions, we specialize in delivering cutting-edge software technology
              solutions tailored for the global DevOps automation landscape.
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
              What Makes Custom DevOps Solutions Essential for Your Business?
            </h2>
            <div className="mx-auto h-1 w-20 bg-[#0171c1]"></div>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-400">
              In the modern digital landscape, custom automation and site reliability are key to staying
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
              Which Innovations Can Transform Your DevOps Infrastructure?
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-500">
              Incorporating advanced tools can significantly enhance your deployment capabilities
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
                  Discover Your SRE & DevOps Strategy With Us
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  Schedule a consultation with our expert DevOps team and take the
                  first step towards a digital-first automated infrastructure.
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
                  src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Infrastructure Cost Analytics"
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
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
              Why Choose Hutech Solutions for Your DevOps Project?
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              At Hutech Solutions, we specialize in delivering SRE & DevOps solutions
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

            <ServiceDetailContactCTA />
    </div>
  );
}
