"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ShieldAlert,
  Lock,
  Eye,
  Zap,
  Database,
  Activity,
  Server,
  Cpu,
  Globe,
  ArrowRight,
  ShieldCheck,
  Fingerprint,
  Network,
  ChevronRight,
  MoveRight,
  Workflow,
  Settings,
  Sparkles,
  Smartphone,
  MessageSquare,
  FileText,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { InlineContactForm } from "@/components/InlineContactForm";

const CYBER_SERVICES = [
  {
    icon: Activity,
    title: "Managed Security Services (MSSP)",
    description:
      "Navigate your journey to digital security with confidence. We develop comprehensive SOC roadmaps—including 24/7 network monitoring and real-time response—to safeguard your legacy systems.",
  },
  {
    icon: Fingerprint,
    title: "Identity & Access Management",
    description:
      "Maximize flexibility and avoid unauthorized access. We design and manage complex authentication schemes, zero-trust verification rules, and privileged account access across your databases.",
  },
  {
    icon: ShieldCheck,
    title: "Risk, Compliance & Governance",
    description:
      "Build for the future of compliance. We audit your databases, policies, and systems to ensure alignment with global standards including ISO 27001, GDPR, HIPAA, and SOC 2.",
  },
  {
    icon: Server,
    title: "Cloud & Infrastructure Hardening",
    description:
      "Stop leaving resources exposed. Our experts perform deep security audits of your cloud environments across AWS, Azure, and Google Cloud, sealing vulnerability leaks.",
  },
  {
    icon: Cpu,
    title: "Application Security & Audits",
    description:
      "Don't let application vulnerabilities hold you back. We transform manual code reviews into automated DevSecOps pipelines and run regular penetration testing on custom products.",
  },
  {
    icon: Eye,
    title: "Threat Intelligence & Hunting",
    description:
      "Focus on your business while we monitor threats. We provide proactive log search networks, advanced threat scanning, and immediate malware removal across operations.",
  },
];

const ESSENTIAL_SOLUTIONS = [
  {
    icon: Lock,
    title: "Zero-Trust Access Architecture",
    description:
      "Protect your network perimeter. We implement continuous device verification, end-to-end data encryption, and network isolation policies to block lateral movement.",
  },
  {
    icon: Workflow,
    title: "Automated Incident Playbooks",
    description:
      "Accelerate threat containment cycles. We automate your alerts parsing, threat isolation scripts, and node shutdowns, letting your team stop hackers in milliseconds.",
  },
  {
    icon: BarChart3,
    title: "Proactive Penetration Auditing",
    description:
      "Unlock the value of secure code. We perform automated and manual white-hat attacks on your applications, exposing design vulnerabilities before exploits happen.",
  },
  {
    icon: ShieldCheck,
    title: "Real-Time Telemetry Feeds",
    description:
      "Ensure threat intelligence never stops. We integrate global threat database updates to block zero-day vulnerabilities and suspicious source IPs automatically.",
  },
  {
    icon: Settings,
    title: "Data Loss Prevention (DLP)",
    description:
      "Automate your file transfer security. We use pattern analysis to block transfers of social security numbers, API tokens, and customer lists from your servers.",
  },
  {
    icon: TrendingUp,
    title: "End-to-End Audit Logs",
    description:
      "Deliver absolute audit preparedness. We optimize your system event aggregation, database trails, and user log indexing to satisfy strict compliance auditors.",
  },
];

const INNOVATIONS = [
  {
    icon: Sparkles,
    title: "AI Behavioral Access Control",
    description:
      "Leverage machine learning to analyze employee typing cadences and menu execution tracks, flagging compromised credentials without manual audits.",
  },
  {
    icon: Smartphone,
    title: "Passwordless Biometric Auth",
    description:
      "Eliminate password database breaches. We integrate secure hardware passkeys and mobile biometric screens directly with your corporate login gateways.",
  },
  {
    icon: Globe,
    title: "Decoupled Sandbox Execution",
    description:
      "Process email files with zero threat. We design automated micro-sandboxes to run untrusted code blocks, protecting local servers from zero-day malware.",
  },
  {
    icon: Database,
    title: "Blockchain Audit Trails",
    description:
      "Eliminate ledger tampering risks. We write cryptographic access records to permissioned ledger networks, ensuring log historical records cannot be edited.",
  },
  {
    icon: Network,
    title: "Zero-Knowledge Database Analysis",
    description:
      "Manage sensitive consumer tables securely. We implement homomorphic encryption structures, letting models compute details on data without seeing raw values.",
  },
  {
    icon: Lock,
    title: "Edge Micro-Firewall Shields",
    description:
      "Protect devices far from the host. We deploy lightweight localized packet inspectors to shield IoT terminals and mobile devices from network injection.",
  },
];

const WHY_CHOOSE = [
  {
    title: "Security-First System Design",
    description:
      "We design our software architectures with security at the foundation, building database isolation and credentials vaulting into every API from day one.",
  },
  {
    title: "Certified Cyber Architects",
    description:
      "Our team is certified across CISSP, CEH, and OSCP frameworks, bringing expert, real-world defensive engineering to your digital networks.",
  },
  {
    title: "24/7 Security Operations SOC",
    description:
      "We provide follow-the-sun continuous monitoring and rapid response to security alerts, ensuring your digital assets are protected around the clock.",
  },
  {
    title: "Strict Compliance Assurance",
    description:
      "We don't just secure networks; we ensure they pass. We structure configurations to satisfy PCI-DSS, GDPR, HIPAA, and SOC 2 audits seamlessly.",
  },
];

const FAQS = [
  {
    question: "What is the role of an MSSP and why does our business need one?",
    answer:
      "A Managed Security Service Provider (MSSP) delivers continuous network monitoring, patches system exploits, analyzes security logs, and deploys rapid incident response playbooks to keep your digital systems safe.",
  },
  {
    question: "How do you ensure our software complies with HIPAA and GDPR rules?",
    answer:
      "We design compliant database structures, build end-to-end data encryption loops, configure access logging keys, and setup automated compliance verification checks.",
  },
  {
    question: "What is a Zero-Trust network architecture?",
    answer:
      "Zero-Trust operates under the rule of 'never trust, always verify.' It blocks automatic privileges, requiring continuous identity and device health checks for every transaction request.",
  },
  {
    question: "How often should our organization run penetration tests?",
    answer:
      "We recommend conducting comprehensive network and software application penetration testing at least once a year, or after releasing major system updates.",
  },
  {
    question: "Do you assist with ransomware incident mitigation?",
    answer:
      "Yes. Our security operations team is prepared to isolate affected network nodes, restore databases from secure cloud backups, and patch entry exploits immediately.",
  },
];

const BLOG_POSTS = [
  {
    id: "1",
    title: "Securing the Hybrid Workplace: Zero-Trust Best Practices",
    description:
      "As corporate teams log in from home and coffee networks, implementing strict zero-trust access control is essential...",
    image:
      "https://images.unsplash.com/photo-1691435828932-911a7801adfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "2",
    title: "The Rise of Passwordless Auth: Integrating FIDO2 Gateways",
    description:
      "Traditional passwords are vulnerability leaks. Discover how hardware passkeys and mobile biometrics protect login screens...",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "3",
    title: "DevSecOps: Scaling Automated Vulnerability Scans in 2026",
    description:
      "How leading engineering groups embed security scanners inside CI/CD scripts to audit and patch code exploits automatically...",
    image:
      "https://images.unsplash.com/photo-1686061593213-98dad7c599b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

const CYBER_STACK = [
  { primary: "CROWDSTRIKE", secondary: "ENDPOINT SECURITY" },
  { primary: "SENTINELONE", secondary: "THREAT DETECTION" },
  { primary: "SPLUNK", secondary: "SIEM LOGS" },
  { primary: "OKTA", secondary: "IDENTITY GATEWAY" },
  { primary: "PALO ALTO", secondary: "FIREWALLS" },
  { primary: "FORTINET", secondary: "NETWORK DEFENSE" },
  { primary: "ZSCALER", secondary: "ZERO TRUST" },
  { primary: "TENABLE", secondary: "VULNERABILITY SCAN" },
  { primary: "QUALYS", secondary: "HARDENING AUDIT" },
  { primary: "IBM QRADAR", secondary: "SIEM ENGINE" },
  { primary: "MS SENTINEL", secondary: "CLOUD SECURITY" },
  { primary: "WIRESHARK", secondary: "PACKET ANALYSIS" },
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

export default function Cybersecurity() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="Cybersecurity Services | Hutech Solutions"
        description="Protect your enterprise with Hutech's Cybersecurity services. Specialized in SOC monitoring, zero-trust architectures, compliance, and cloud security."
      />

      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1691435828932-911a7801adfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Cybersecurity Defense Architecture"
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
                Security Excellence
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              Your Security Vision. <br />
              <span className="text-[#F99D1C]">Cyber Resilience.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              We craft intelligent threat detection systems, zero-trust network perimeters, and automated regulatory compliance tools for global enterprises.
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
                  Empowering Organizations with Smart, Scalable Cyber Security Defense
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
              </div>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  At Hutech Solutions, we bring deep expertise in implementing, supporting, and
                  managing integrated security networks. Our end-to-end solutions include Managed Security Services (MSSP), 24/7 Security Operations Center (SOC) oversight, and zero-trust identity management frameworks.
                </p>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  We ensure our clients can operate with agility, high safety, and compliance, enabling
                  them to expand operations and integrate fresh cybersecurity solutions to meet specific data and market protection needs.
                </p>
              </div>
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">1000+</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Threats Blocked
                  </p>
                </div>
                <div className="hidden h-12 w-[1px] bg-gray-200 md:block"></div>
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">99.8%</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Avg Detection Rate
                  </p>
                </div>
                <div className="hidden h-12 w-[1px] bg-gray-200 md:block"></div>
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">24/7</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    SOC Coverage
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-sm shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1691435828932-911a7801adfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Cyber Security Operations Center"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 hidden max-w-xs space-y-4 bg-[#0171c1] p-10 text-white shadow-2xl md:block">
                <ShieldCheck size={32} strokeWidth={1.5} />
                <h3 className="display-font text-xl font-bold">Cyber Defense</h3>
                <p className="text-sm leading-relaxed font-medium opacity-80">
                  Integrating advanced AI endpoint security, multi-factor biometric rules, and continuous penetration audits to protect corporate databases.
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
              Our Cybersecurity Services
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              At Hutech Solutions, we specialize in delivering cutting-edge software technology
              solutions tailored for the global enterprise cyber defense landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {CYBER_SERVICES.map((service, i) => {
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
              What Makes Custom Cybersecurity Solutions Essential for Your Business?
            </h2>
            <div className="mx-auto h-1 w-20 bg-[#0171c1]"></div>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-400">
              In the modern digital landscape, custom security perimeters are key to staying
              competitive and ensuring operational continuity.
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
              Which Innovations Can Transform Your Security Perimeter?
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-500">
              Incorporating advanced tools can significantly enhance your defensive capabilities
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
                  Discover Your Cybersecurity Strategy With Us
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  Schedule a consultation with our expert cyber defense team and take the
                  first step towards a secure, resilient business infrastructure.
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
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Security Defense Analytics"
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
              MODERN CYBERSECURITY STACK
            </h2>

            <div className="mx-auto mt-4 h-[3px] w-14 bg-[#F99D1C]" />

            <p className="mx-auto mt-6 max-w-2xl text-sm font-medium text-gray-400 md:text-base leading-relaxed">
              Advanced cybersecurity technologies enabling threat detection, data protection, secure infrastructure, and enterprise resilience
            </p>
          </div>

          {/* Cards Grid */}
          <div className="border-l border-t border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {CYBER_STACK.map((item, idx) => (
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
              Why Choose Hutech Solutions for Your Cybersecurity Project?
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              At Hutech Solutions, we specialize in delivering Cybersecurity solutions
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
                Start Your Cybersecurity Project
              </h2>
              <InlineContactForm
                category="Cybersecurity Solutions"
                textareaPlaceholder="Tell us about your security and compliance needs"
              />
            </div>
            <div className="space-y-12 py-8 lg:col-span-5">
              <h2 className="display-font text-3xl font-bold text-[#001A3D]">
                What Is The Next Step?
              </h2>
              <div className="space-y-10">
                {[
                  {
                    icon: MessageSquare,
                    text: "A cybersecurity specialist will review your request and contact you within a few business hours.",
                  },
                  {
                    icon: FileText,
                    text: "We will schedule a deep-dive security assessment to map your current assets and check vulnerabilities.",
                  },
                  {
                    icon: Sparkles,
                    text: "You will receive a detailed proposal including security architecture options and regulatory cost analysis.",
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
                Cybersecurity Insights & Articles
              </h2>
              <p className="text-lg font-medium text-gray-500">
                Explore our latest thinking on cyber defense technology and data privacy trends.
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
                      CyberSec
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
