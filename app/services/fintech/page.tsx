"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Wallet,
  Building2,
  Lock,
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
  RefreshCw,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";

import { ServiceDetailContactCTA } from "@/components/ServiceDetailContactCTA";

const FINTECH_SERVICES = [
  {
    icon: Wallet,
    title: "Digital Payments & Wallets",
    description:
      "Navigate your journey to digital commerce with confidence. We develop comprehensive payment architectures—including peer-to-peer and contactless systems—to ensure a seamless transition for your legacy ledgers.",
  },
  {
    icon: Building2,
    title: "Neobanking & Digital Core",
    description:
      "Maximize flexibility and avoid physical infrastructure lock-in. We design and manage complex digital banking platforms across cloud layers, ensuring your banking workflows are optimized for scalability.",
  },
  {
    icon: Database,
    title: "Blockchain & Decentralized Ledger",
    description:
      "Build for the future of finance. We leverage smart contracts, secure token standards, and distributed ledgers to create highly transparent, resilient, and audit-ready financial systems.",
  },
  {
    icon: Zap,
    title: "RegTech & Compliance Systems",
    description:
      "Stop worrying about audit failures and regulatory penalties. Our compliance engines perform real-time verification of KYC, AML, and tax laws, automating risk management processes.",
  },
  {
    icon: RefreshCw,
    title: "P2P Lending & Credit Scoring",
    description:
      "Don't let legacy credit scoring hold your growth back. We transform traditional lending practices into agile, AI-ready loan management systems that speed up approvals and assess risk accurately.",
  },
  {
    icon: Network,
    title: "WealthTech & Financial Tools",
    description:
      "Focus on your customers while we handle the analytics. We provide AI-driven wealth management dashboards, automated budgeting integrations, and personalized investment tools.",
  },
];

const ESSENTIAL_SOLUTIONS = [
  {
    icon: Lock,
    title: "Zero-Trust Financial Security",
    description:
      "Protect your financial perimeter. We implement robust identity verification, end-to-end data encryption, and continuous transaction monitoring to ensure customer wealth remains secure.",
  },
  {
    icon: Workflow,
    title: "Secure API Integrations",
    description:
      "Accelerate banking connectivity. We automate your payment integrations, open banking APIs, and financial service gateways, allowing your applications to connect securely and instantly.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Transaction Ledgers",
    description:
      "Unlock the value of financial data. We build scalable real-time auditing databases and data lakes, enabling instant fraud analysis and transaction tracking for your organization.",
  },
  {
    icon: ShieldCheck,
    title: "Fraud Prevention Systems",
    description:
      "Ensure transaction safety never stops. We design automated machine learning models that detect anomalies, block malicious transfers, and verify accounts in milliseconds.",
  },
  {
    icon: Settings,
    title: "Automated Compliance Auditing",
    description:
      "Automate your financial report filings. We use customizable compliance scripts to define your reporting rules in code, ensuring accuracy, consistency, and filing speed.",
  },
  {
    icon: TrendingUp,
    title: "High-Throughput Processing",
    description:
      "Deliver lightning-fast settlements to your users. We optimize your transaction queues, message brokers, and ledger queries to ensure peak performance under massive volumes.",
  },
];

const INNOVATIONS = [
  {
    icon: Sparkles,
    title: "AI-Powered Risk Assessment",
    description:
      "Leverage machine learning to automate commercial credit underwriting and borrower risk analysis, ensuring your loan portfolio remains balanced and low-risk.",
  },
  {
    icon: Smartphone,
    title: "Biometric Checkout Flow",
    description:
      "Authorize payments at the point of sale. We integrate secure biometric APIs with mobile checkout screens to reduce cart abandonment and prevent transaction fraud.",
  },
  {
    icon: Globe,
    title: "Decentralized Finance (DeFi)",
    description:
      "Reduce settlement time and fees. We build decentralized custody systems and liquidity pool tools that enable peer-to-peer asset exchange without central intermediaries.",
  },
  {
    icon: Database,
    title: "Smart Contracts for Escrow",
    description:
      "Eliminate settlement risk entirely. We write self-executing business agreements that release funds automatically based on verifiable cargo delivery or milestones.",
  },
  {
    icon: Network,
    title: "Zero-Knowledge Identity Verification",
    description:
      "Verify client credentials with ease. We implement zero-knowledge protocols to confirm compliance attributes without exposing raw private banking data to the network.",
  },
  {
    icon: Lock,
    title: "Confidential Transaction Vaults",
    description:
      "Protect asset values even while processing trades. We leverage trusted execution environments to guarantee that transaction details remain private from external observers.",
  },
];

const WHY_CHOOSE = [
  {
    title: "Regulatory Compliance Expertise",
    description:
      "Our systems are built in alignment with PCI-DSS, GDPR, PSD2, and local banking rules, ensuring compliance is woven directly into the software architecture.",
  },
  {
    title: "Security-First Engineering",
    description:
      "We build multi-layered fraud defenses and absolute data isolation into every database and API layer of your financial platform from day one.",
  },
  {
    title: "Seamless Core Banking Middleware",
    description:
      "We design custom API middleware that securely bridges aging, monolithic core banking legacy databases with modern, reactive web frontends.",
  },
  {
    title: "High-Volume Performance Focus",
    description:
      "We don't just build finance apps; we guarantee they scale. We focus on low-latency microservices that keep transaction pipelines fast during peak shopping days.",
  },
];

const FAQS = [
  {
    question: "How do you ensure our fintech application remains compliant with regulatory standards?",
    answer:
      "We build compliance directly into the software layout. All data pipelines, storage, and API connections are developed in accordance with international frameworks such as PCI-DSS, GDPR, PSD2, and SOC 2, with automated validation checkpoints.",
  },
  {
    question: "Can you integrate your solutions with our existing legacy core banking systems?",
    answer:
      "Yes. We specialize in building secure, low-latency API wrappers and middleware that bridge monolithic databases and legacy mainframe networks with modern web frontends.",
  },
  {
    question: "What is your experience with blockchain in financial services?",
    answer:
      "We design custom distributed ledger solutions, create secure smart contracts for automated settlements, and construct decentralized escrow modules for cross-border banking.",
  },
  {
    question: "How long does a custom fintech platform development typically take?",
    answer:
      "A focused digital wallet or neobanking prototype takes 3-4 months to build and launch, while complex, enterprise-level core banking transformations take 9-12 months.",
  },
  {
    question: "Do you offer post-launch maintenance and security monitoring?",
    answer:
      "Yes, we provide 24/7 managed security operations, vulnerability testing, performance tuning, and API updates to ensure your financial platform stays online and compliant.",
  },
];

const BLOG_POSTS = [
  {
    id: "1",
    title: "The Future of Neobanking: Scaling Customer Experience in 2026",
    description:
      "Digital banks are shifting from simple interfaces to hyper-personalized financial actions that double engagement...",
    image:
      "https://images.unsplash.com/photo-1726138388546-30955e45aaec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "2",
    title: "Securing Open Banking APIs: A Zero-Trust Architecture Guide",
    description:
      "Open banking APIs facilitate seamless asset transfers, but protecting them requires a multi-layered security model...",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "3",
    title: "Decentralized Finance: Is Enterprise Adoption Finally Arriving?",
    description:
      "Explore how financial institutions use permissioned distributed ledgers for fast international trade settlement...",
    image:
      "https://images.unsplash.com/photo-1686061593213-98dad7c599b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

const FINTECH_STACK = [
  { primary: "TEMENOS", secondary: "CORE BANKING" },
  { primary: "FINASTRA", secondary: "OPEN FINANCE" },
  { primary: "MUREX", secondary: "TRADING SYSTEMS" },
  { primary: "SPRING BOOT", secondary: "BACKEND API" },
  { primary: "NEXT.JS", secondary: "SECURE PORTALS" },
  { primary: "POSTGRESQL", secondary: "LEDGERS" },
  { primary: "BLOCKCHAIN", secondary: "DECENTRALIZATION" },
  { primary: "STRIPE", secondary: "PAYMENT GATEWAY" },
  { primary: "PLAID", secondary: "BANK INTEGRATION" },
  { primary: "APACHE KAFKA", secondary: "STREAMING DATA" },
  { primary: "KUBERNETES", secondary: "CONTAINER CLOUD" },
  { primary: "PYTHON", secondary: "RISK ANALYTICS" },
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

export default function FintechAppDevelopment() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="Banking & Financial Services | Hutech Solutions"
        description="Secure, scalable, and compliant neobanking and digital payment systems. Expert core banking integrations, blockchain development, and security."
      />

      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1726138388546-30955e45aaec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Fintech Banking Architecture"
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
                FinTech Excellence
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              Your Financial Vision. <br />
              <span className="text-[#F99D1C]">Digital Revolution.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              We craft secure digital banking experiences and future-ready fintech solutions for
              global financial institutions and neobanks.
            </p>
            <Link href="/contact" className="btn-banner-cta mt-6 group">
              Consult Us
              <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="display-font text-3xl leading-tight font-semibold text-[#001A3D] md:text-5xl">
                  Empowering Financial Institutions with Secure, Scalable FinTech Solutions
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
              </div>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  At Hutech Solutions, we bring deep expertise in implementing, supporting, and
                  managing integrated financial platforms. Our end-to-end solutions include digital
                  payment architectures, neobanking systems, regulatory compliance automation, and
                  blockchain integrations.
                </p>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  We ensure our clients can operate with agility, security, and efficiency, enabling
                  them to expand operations and integrate fresh digital solutions to meet specific
                  transaction and customer needs.
                </p>
              </div>
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">300+</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Financial Integrations
                  </p>
                </div>
                <div className="hidden h-12 w-[1px] bg-gray-200 md:block"></div>
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">60%</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Avg Cost Savings
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
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Fintech Operations Center"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 hidden max-w-xs space-y-4 bg-[#0171c1] p-10 text-white shadow-2xl md:block">
                <Building2 size={32} strokeWidth={1.5} />
                <h3 className="display-font text-xl font-bold">Digital Banking</h3>
                <p className="text-sm leading-relaxed font-medium opacity-80">
                  Integrating blockchain and secure digital banking APIs across enterprise platforms
                  to streamline payments and enhance transaction security.
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
              Our Banking & Financial Services
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              At Hutech Solutions, we specialize in delivering cutting-edge software technology
              solutions tailored for the global financial services landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {FINTECH_SERVICES.map((service, i) => {
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
              What Makes Custom FinTech Solutions Essential for Your Business?
            </h2>
            <div className="mx-auto h-1 w-20 bg-[#0171c1]"></div>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-400">
              In the modern digital landscape, custom financial solutions are key to staying
              competitive and ensuring transactional integrity.
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
              Which Innovations Can Transform Your Financial Operations?
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-500">
              Incorporating advanced technologies can significantly enhance your financial capability
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


      {/* Why Choose Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
              Why Choose Hutech Solutions for Your Fintech Project?
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              At Hutech Solutions, we specialize in delivering fintech solutions tailored to your
              unique organizational needs.
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
                Start Your Fintech Project
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
                  placeholder="Tell us about your financial technology needs"
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
                    text: "A financial technology consultant will review your request and contact you within a few business hours.",
                  },
                  {
                    icon: FileText,
                    text: "We will schedule a deep-dive session to understand your current banking systems and compliance goals.",
                  },
                  {
                    icon: Sparkles,
                    text: "You will receive a detailed proposal including system architecture and regulatory compliance analysis.",
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
