"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShieldAlert,
  Lock,
  Eye,
  Zap,
  Database,
  Activity,
  Server,
  Cpu,
  Globe,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  ShieldX,
  Fingerprint,
  Network, MoveRight, } from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

import { ServiceDetailContactCTA } from "@/components/ServiceDetailContactCTA";

const CORE_SERVICES = [
  {
    title: "Managed Security Services (MSSP)",
    icon: <Activity className="h-8 w-8 text-[#F99D1C]" />,
    desc: "24/7 Security Operations Center (SOC) monitoring, threat detection, and rapid incident response to keep your operations running smoothly.",
  },
  {
    title: "Identity & Access Management (IAM)",
    icon: <Fingerprint className="h-8 w-8 text-[#F99D1C]" />,
    desc: "Implementing robust authentication frameworks, zero-trust architectures, and privileged access management (PAM) solutions.",
  },
  {
    title: "Risk, Compliance & Governance",
    icon: <ShieldCheck className="h-8 w-8 text-[#F99D1C]" />,
    desc: "Assessing organizational risks and ensuring adherence to global standards like ISO 27001, GDPR, HIPAA, and SOC2.",
  },
];

const SPECIALIZED_AREAS = [
  {
    title: "Infrastructure & Cloud Security",
    icon: <Server className="h-6 w-6 text-[#0171c1]" />,
    desc: "Hardening your cloud footprint across AWS, Azure, and GCP, protecting workloads from specialized cloud-native threats.",
  },
  {
    title: "Application Security (AppSec)",
    icon: <Cpu className="h-6 w-6 text-[#0171c1]" />,
    desc: "Integrating security into your DevOps pipeline with DevSecOps, automated code scanning, and manual penetration testing.",
  },
  {
    title: "Threat Intelligence & Hunting",
    icon: <Eye className="h-6 w-6 text-[#0171c1]" />,
    desc: "Proactively searching for undetected advanced persistent threats (APTs) and malware within your network infrastructure.",
  },
  {
    title: "Data Privacy & Protection",
    icon: <Database className="h-6 w-6 text-[#0171c1]" />,
    desc: "Advanced encryption, data loss prevention (DLP), and privacy-by-design frameworks to safeguard your most sensitive assets.",
  },
];

const CYBERSECURITY_STACK = [
  { primary: "PALO ALTO", secondary: "NETWORK SECURITY" },
  { primary: "CROWDSTRIKE", secondary: "ENDPOINT SECURITY" },
  { primary: "SPLUNK", secondary: "SIEM" },
  { primary: "OKTA", secondary: "IDENTITY MANAGEMENT" },
  { primary: "WIRESHARK", secondary: "NETWORK ANALYSIS" },
  { primary: "NESSUS", secondary: "VULNERABILITY SCANNING" },
  { primary: "AWS SECURITY", secondary: "CLOUD SECURITY" },
  { primary: "AZURE SENTINEL", secondary: "THREAT DETECTION" },
  { primary: "ELASTIC SIEM", secondary: "LOG ANALYTICS" },
  { primary: "DOCKER", secondary: "SECURE CONTAINERS" },
  { primary: "KUBERNETES", secondary: "INFRASTRUCTURE SECURITY" },
  { primary: "PYTHON", secondary: "SECURITY AUTOMATION" },
];

export default function Cybersecurity() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="Cybersecurity Services | Hutech Solutions"
        description="Enterprise-grade cybersecurity solutions including MSSP, IAM, cloud security, and risk compliance to protect your digital ecosystem."
      />
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1691435828932-911a7801adfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Cybersecurity Command Center"
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
                Cyber Defense Center
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              Fortifying the <br />
              <span className="text-[#F99D1C]">Digital Enterprise.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              In an era of relentless cyber threats, we provide proactive, intelligence-led security
              strategies that safeguard your business continuity and customer trust.
            </p>
            <Link href="/contact" className="btn-banner-cta mt-6 group">
              Consult Us
              <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
            </Link>
          </Motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
            <div className="space-y-8">
              <h2 className="display-font text-3xl leading-tight font-semibold text-[#001A3D] md:text-5xl">
                Our Security <br />
                <span className="text-[#0171c1]">Operating Philosophy.</span>
              </h2>
              <div className="h-1 w-20 bg-[#0171c1]"></div>
              <p className="text-lg leading-relaxed font-medium text-gray-500">
                We believe security should be an enabler, not a bottleneck. Our approach shifts
                security from a reactive technical function to a strategic business imperative,
                integrating defense mechanisms into the very fabric of your organizational
                processes.
              </p>
              <div className="space-y-4">
                {[
                  "Zero-Trust Frameworks",
                  "Predictive Threat Analysis",
                  "Regulatory Compliance Assurance",
                  "Resilient Incident Response",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#0171c1]" />
                    <span className="font-semibold text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div className="group rounded-2xl border border-gray-100 bg-gray-50 p-8 text-center shadow-sm transition-all duration-500 hover:border-[#0171c1]">
                    <ShieldAlert className="mx-auto mb-4 h-10 w-10 text-[#0171c1]" />
                    <h4 className="display-font font-bold text-[#001A3D]">Proactive</h4>
                  </div>
                  <div className="rounded-2xl border border-[#001A3D] bg-[#001A3D] p-8 text-center text-white shadow-xl">
                    <Lock className="mx-auto mb-4 h-10 w-10 text-[#0171c1]" />
                    <h4 className="display-font font-bold text-white">Encrypted</h4>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="group rounded-2xl border border-gray-100 bg-gray-50 p-8 text-center shadow-sm transition-all duration-500 hover:border-[#0171c1]">
                    <Network className="mx-auto mb-4 h-10 w-10 text-[#0171c1]" />
                    <h4 className="display-font font-bold text-[#001A3D]">Integrated</h4>
                  </div>
                  <div className="group rounded-2xl border border-gray-100 bg-gray-50 p-8 text-center shadow-sm transition-all duration-500 hover:border-[#0171c1]">
                    <Activity className="mx-auto mb-4 h-10 w-10 text-[#0171c1]" />
                    <h4 className="display-font font-bold text-[#001A3D]">Real-time</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 text-center">
            <h2 className="display-font mb-6 text-3xl font-semibold text-[#001A3D] md:text-5xl">
              Our Security Arsenal
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-gray-500">
              We provide a multi-layered defense strategy designed to protect every entry point of
              your digital ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {CORE_SERVICES.map((service, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group h-full space-y-8 rounded-[2.5rem] border border-gray-100 bg-white p-12 shadow-sm transition-all hover:shadow-2xl"
              >
                <div className="w-fit rounded-2xl bg-gray-50 p-4 shadow-sm transition-all duration-500 group-hover:bg-[#F99D1C]/10">
                  {service.icon}
                </div>
                <h3 className="display-font text-2xl leading-tight font-bold text-[#001A3D]">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed font-medium text-gray-500">{service.desc}</p>
                <div className="pt-4">
                  <Link
                    href="/contact"
                    className="flex items-center text-[11px] font-bold tracking-wider text-[#0171c1] uppercase transition-all group-hover:gap-2"
                  >
                    Learn More <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cybersecurity Technology Stack Section */}
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
              {CYBERSECURITY_STACK.map((item, idx) => (
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

      {/* Specialized areas */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {SPECIALIZED_AREAS.map((item, i) => (
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


      <ServiceDetailContactCTA />

    </div>
  );
}
