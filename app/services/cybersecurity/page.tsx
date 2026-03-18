"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
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
  CheckCircle2, 
  ShieldCheck, 
  ShieldX, 
  Fingerprint, 
  Network
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

const CORE_SERVICES = [
  {
    title: "Managed Security Services (MSSP)",
    icon: <Activity className="w-8 h-8 text-[#FFAF2B]" />,
    desc: "24/7 Security Operations Center (SOC) monitoring, threat detection, and rapid incident response to keep your operations running smoothly."
  },
  {
    title: "Identity & Access Management (IAM)",
    icon: <Fingerprint className="w-8 h-8 text-[#FFAF2B]" />,
    desc: "Implementing robust authentication frameworks, zero-trust architectures, and privileged access management (PAM) solutions."
  },
  {
    title: "Risk, Compliance & Governance",
    icon: <ShieldCheck className="w-8 h-8 text-[#FFAF2B]" />,
    desc: "Assessing organizational risks and ensuring adherence to global standards like ISO 27001, GDPR, HIPAA, and SOC2."
  }
];

const SPECIALIZED_AREAS = [
  {
    title: "Infrastructure & Cloud Security",
    icon: <Server className="w-6 h-6 text-[#0171c1]" />,
    desc: "Hardening your cloud footprint across AWS, Azure, and GCP, protecting workloads from specialized cloud-native threats."
  },
  {
    title: "Application Security (AppSec)",
    icon: <Cpu className="w-6 h-6 text-[#0171c1]" />,
    desc: "Integrating security into your DevOps pipeline with DevSecOps, automated code scanning, and manual penetration testing."
  },
  {
    title: "Threat Intelligence & Hunting",
    icon: <Eye className="w-6 h-6 text-[#0171c1]" />,
    desc: "Proactively searching for undetected advanced persistent threats (APTs) and malware within your network infrastructure."
  },
  {
    title: "Data Privacy & Protection",
    icon: <Database className="w-6 h-6 text-[#0171c1]" />,
    desc: "Advanced encryption, data loss prevention (DLP), and privacy-by-design frameworks to safeguard your most sensitive assets."
  }
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
      <section className="bg-[#001A3D] text-white h-[450px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1691435828932-911a7801adfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Cybersecurity Command Center"
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
              <span className="text-[#FFAF2B] font-bold uppercase tracking-[0.3em] text-[10px]">Cyber Defense Center</span>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight display-font mb-8">
              Fortifying the <br />
              <span className="text-[#FFAF2B]">Digital Enterprise.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed">
              In an era of relentless cyber threats, we provide proactive, intelligence-led security strategies that safeguard your business continuity and customer trust.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font leading-tight">
                Our Security <br />
                <span className="text-[#0171c1]">Operating Philosophy.</span>
              </h2>
              <div className="w-20 h-1 bg-[#0171c1]"></div>
              <p className="text-lg text-gray-500 font-medium leading-relaxed">
                We believe security should be an enabler, not a bottleneck. Our approach shifts security from a reactive technical function to a strategic business imperative, integrating defense mechanisms into the very fabric of your organizational processes.
              </p>
              <div className="space-y-4">
                {['Zero-Trust Frameworks', 'Predictive Threat Analysis', 'Regulatory Compliance Assurance', 'Resilient Incident Response'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-[#0171c1] w-5 h-5 shrink-0" />
                    <span className="text-gray-700 font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                   <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm text-center group hover:border-[#0171c1] transition-all duration-500">
                      <ShieldAlert className="w-10 h-10 text-[#0171c1] mx-auto mb-4" />
                      <h4 className="text-[#001A3D] font-bold display-font">Proactive</h4>
                   </div>
                   <div className="bg-[#001A3D] p-8 rounded-2xl border border-[#001A3D] shadow-xl text-center text-white">
                      <Lock className="w-10 h-10 text-[#0171c1] mx-auto mb-4" />
                      <h4 className="font-bold display-font text-white">Encrypted</h4>
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm text-center group hover:border-[#0171c1] transition-all duration-500">
                      <Network className="w-10 h-10 text-[#0171c1] mx-auto mb-4" />
                      <h4 className="text-[#001A3D] font-bold display-font">Integrated</h4>
                   </div>
                   <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm text-center group hover:border-[#0171c1] transition-all duration-500">
                      <Activity className="w-10 h-10 text-[#0171c1] mx-auto mb-4" />
                      <h4 className="text-[#001A3D] font-bold display-font">Real-time</h4>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font mb-6">Our Security Arsenal</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
              We provide a multi-layered defense strategy designed to protect every entry point of your digital ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CORE_SERVICES.map((service, i) => (
              <Motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-12 rounded-[2.5rem] bg-white border border-gray-100 space-y-8 hover:shadow-2xl transition-all group h-full shadow-sm"
              >
                <div className="p-4 bg-gray-50 rounded-2xl w-fit shadow-sm group-hover:bg-[#FFAF2B]/10 transition-all duration-500">{service.icon}</div>
                <h3 className="text-2xl font-bold text-[#001A3D] display-font leading-tight">{service.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed text-sm">{service.desc}</p>
                <div className="pt-4">
                  <Link href="/contact" className="text-[11px] font-bold text-[#0171c1] uppercase tracking-wider flex items-center group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-3 h-3 ml-2" />
                  </Link>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized areas */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SPECIALIZED_AREAS.map((item, i) => (
              <div key={i} className="space-y-6 p-8 border border-gray-50 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="shrink-0 p-3 bg-[#0171c1]/5 rounded-lg w-fit group-hover:bg-[#0171c1] group-hover:text-white transition-colors">{item.icon}</div>
                <h4 className="font-bold text-[#001A3D] text-lg display-font">{item.title}</h4>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
       </section>

      {/* Security Banner CTA */}
      <section className="py-24 bg-[#001A3D] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0171c1]/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
             <div className="max-w-3xl space-y-6">
                <h2 className="text-3xl md:text-5xl font-bold display-font">Is your infrastructure <span className="text-[#0171c1]">Future-Proof?</span></h2>
                <p className="text-lg text-gray-400 font-medium">Don't wait for a breach to happen. Let our security experts perform a comprehensive vulnerability assessment today.</p>
             </div>
             <div className="shrink-0">
               <Link 
                href="/contact" 
                className="inline-flex items-center gap-3 bg-[#0171c1] text-white px-12 py-5 font-bold uppercase tracking-wider text-[11px] hover:bg-white hover:text-[#001A3D] transition-all duration-500 rounded-sm"
              >
                Contact Cyber Experts <ShieldAlert className="w-4 h-4" />
              </Link>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
