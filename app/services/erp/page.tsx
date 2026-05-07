"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  Database,
  Settings,
  BarChart3,
  Users,
  Zap,
  ShieldCheck,
  MoveRight,
  LayoutGrid,
  Cloud,
  Workflow,
  Globe,
  Lock,
  RefreshCw,
  Rocket,
  ArrowRight,
  MessageSquare,
  Monitor,
  CheckCircle2,
  Layers,
  Cpu,
  TrendingUp,
  Server,
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

const ENTERPRISE_SOLUTIONS = [
  {
    title: "SAP Implementation",
    tagline: "The Intelligent Enterprise Core",
    icon: <Database className="h-10 w-10 text-[#F99D1C]" />,
    desc: "Hutech enables organizations to transition from legacy ECC environments to SAP S/4HANA, creating a digital-first foundation for global operations. Our methodology focuses on 'Clean Core' principles to ensure future-proof upgrades.",
    capabilities: [
      {
        name: "S/4HANA Transformation",
        detail: "Greenfield, Brownfield, and Selective Data Transitions.",
      },
      {
        name: "SAP BTP Integration",
        detail: "Extension and integration using Business Technology Platform.",
      },
      { name: "RISE with SAP", detail: "Accelerated cloud journeys with managed services." },
      {
        name: "Fiori UX Modernization",
        detail: "Intuitive, role-based user experiences for all modules.",
      },
    ],
    sectors: ["Manufacturing", "Automotive", "Retail", "Life Sciences"],
  },
  {
    title: "ServiceNow Implementation",
    tagline: "Digital Workflow Orchestration",
    icon: <Workflow className="h-10 w-10 text-[#F99D1C]" />,
    desc: "We transform fragmented internal processes into unified digital workflows. By leveraging the Now Platform, we help enterprises automate IT, HR, and Customer Service operations while maintaining a single system of record.",
    capabilities: [
      {
        name: "IT Service Management (ITSM)",
        detail: "Standardizing IT delivery and operational excellence.",
      },
      {
        name: "HR Service Delivery (HRSD)",
        detail: "Enhancing employee experience and self-service.",
      },
      {
        name: "IT Operations Management (ITOM)",
        detail: "AIOps-driven visibility and service mapping.",
      },
      {
        name: "App Engine Low-Code",
        detail: "Custom application development for unique business needs.",
      },
    ],
    sectors: ["Financial Services", "Technology", "Healthcare", "Public Sector"],
  },
  {
    title: "Oracle Implementation",
    tagline: "Agile Cloud Infrastructure & ERP",
    icon: <Globe className="h-10 w-10 text-[#F99D1C]" />,
    desc: "Our Oracle practice specializes in Fusion Cloud applications and NetSuite implementations. We provide deep expertise in financial management, supply chain orchestration, and human capital management on a global scale.",
    capabilities: [
      { name: "Oracle Fusion Cloud ERP", detail: "Automated financials and real-time reporting." },
      { name: "Supply Chain (SCM)", detail: "End-to-end visibility and demand forecasting." },
      { name: "Oracle HCM Cloud", detail: "Strategic workforce planning and talent management." },
      {
        name: "NetSuite for Scale-ups",
        detail: "Rapid ERP deployment for fast-growing businesses.",
      },
    ],
    sectors: ["Logistics", "Energy", "E-commerce", "High-Tech"],
  },
  {
    title: "Salesforce Implementation",
    tagline: "Customer-Centric Growth Platforms",
    icon: <Cloud className="h-10 w-10 text-[#F99D1C]" />,
    desc: "Hutech helps you build a 360-degree view of your customer. We implement complex multi-cloud Salesforce solutions that bridge the gap between sales, service, marketing, and commerce through Einstein AI-driven insights.",
    capabilities: [
      { name: "Sales & Service Cloud", detail: "Lead-to-cash automation and omnichannel support." },
      { name: "Marketing Cloud Engagement", detail: "Personalized customer journeys at scale." },
      {
        name: "Financial Services Cloud",
        detail: "Verticalized CRM for banking and wealth management.",
      },
      {
        name: "MuleSoft Integration",
        detail: "API-led connectivity for legacy system synchronization.",
      },
    ],
    sectors: ["Banking", "Insurance", "Professional Services", "Media"],
  },
  {
    title: "Pega Implementation",
    tagline: "Intelligent Automation & Case Management",
    icon: <LayoutGrid className="h-10 w-10 text-[#F99D1C]" />,
    desc: "We leverage Pega’s low-code platform to solve complex business problems. Our Pega experts focus on Decision Hub and Customer Service modules to deliver hyper-personalized experiences and operational efficiency.",
    capabilities: [
      { name: "BPM & Case Management", detail: "Streamlining complex enterprise processes." },
      { name: "Customer Decision Hub", detail: "Next-Best-Action (NBA) predictive analytics." },
      { name: "Pega RPA", detail: "Robotic automation for repetitive manual tasks." },
      { name: "Government Platform", detail: "Compliance-heavy workflow solutions for agencies." },
    ],
    sectors: ["Government", "Telecommunications", "Insurance", "Retail"],
  },
  {
    title: "Open Source Implementation",
    tagline: "Sovereign & Customizable ERP Solutions",
    icon: <Rocket className="h-10 w-10 text-[#F99D1C]" />,
    desc: "For enterprises seeking flexibility and lower TCO, we provide implementations of Odoo and ERPNext. We customize these platforms into high-performance systems that match your specific business DNA without vendor lock-in.",
    capabilities: [
      { name: "Odoo Enterprise", detail: "Modular apps for accounting, CRM, and manufacturing." },
      {
        name: "ERPNext Customization",
        detail: "Python-based flexible ERP for modern enterprises.",
      },
      {
        name: "Headless ERP Architecture",
        detail: "Decoupling front-end from core business logic.",
      },
      { name: "Cloud-Native Deployment", detail: "Kubernetes-ready open source scaling." },
    ],
    sectors: ["SMEs", "Education", "Hospitality", "Non-Profits"],
  },
];

export default function EnterpriseDigitalSolutions() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="Enterprise Digital Solutions | Hutech Solutions"
        description="Comprehensive SAP, ServiceNow, Oracle, Salesforce, Pega and Open Source ERP implementation services. Transform your enterprise with Hutech's digital core solutions."
      />
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Enterprise Technology"
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
                Enterprise Architecture
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              Modernizing the <br />
              <span className="text-[#F99D1C]">Enterprise Core.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              We design and deploy integrated enterprise ecosystems that eliminate data silos,
              automate complex workflows, and provide real-time visibility across your global
              operations.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Strategic Approach */}
      <section className="border-b border-gray-100 bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-1">
              <h2 className="display-font text-3xl leading-tight font-semibold text-[#001A3D] md:text-5xl">
                Our Strategic <br />
                <span className="text-[#0171c1]">Approach.</span>
              </h2>
              <p className="leading-relaxed font-bold text-gray-500">
                Enterprise digital transformation is not just about software; it's about business
                process re-engineering. We follow a four-pillar strategy for every implementation.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:col-span-2">
              {[
                {
                  title: "Discovery & Blueprinting",
                  desc: "Aligning technology roadmaps with core business objectives and ROI targets.",
                },
                {
                  title: "Agile Implementation",
                  desc: "Iterative deployment cycles to ensure rapid value realization and stakeholder feedback.",
                },
                {
                  title: "Change Management",
                  desc: "Empowering your workforce through targeted training and cultural alignment.",
                },
                {
                  title: "Managed Evolution",
                  desc: "Continuous optimization and support to ensure your platforms grow with your business.",
                },
              ].map((step, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="text-4xl font-bold text-gray-100">0{idx + 1}</div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-[#001A3D]">{step.title}</h4>
                    <p className="text-sm leading-relaxed font-bold text-gray-400">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Extensive Platform Deep Dive */}
      <section id="solutions" className="bg-gray-50 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <div className="inline-block rounded-full bg-[#0171c1]/10 px-4 py-1.5 text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
              Platform Expertise
            </div>
            <h2 className="display-font text-3xl leading-tight font-semibold text-[#001A3D] md:text-6xl">
              Global Enterprise Platforms
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-500">
              We provide deep domain expertise across the world's leading enterprise platforms,
              ensuring your implementation is tailored to your industry's unique demands.
            </p>
          </div>

          <div className="space-y-24">
            {ENTERPRISE_SOLUTIONS.map((solution, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`grid grid-cols-1 items-start gap-12 lg:grid-cols-12 ${i !== ENTERPRISE_SOLUTIONS.length - 1 ? "border-b border-gray-200 pb-24" : ""}`}
              >
                {/* Platform Summary */}
                <div className="space-y-8 lg:col-span-4">
                  <div className="w-fit rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                    {solution.icon}
                  </div>
                  <div className="space-y-4">
                    <h3 className="display-font text-3xl leading-tight font-bold text-[#001A3D]">
                      {solution.title}
                    </h3>
                    <div className="text-sm font-bold tracking-wide text-[#0171c1] uppercase">
                      {solution.tagline}
                    </div>
                    <p className="leading-relaxed font-medium text-gray-500">{solution.desc}</p>
                  </div>

                  <div className="space-y-4 pt-6">
                    <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                      Target Industry Sectors
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {solution.sectors.map((sector, idx) => (
                        <span
                          key={idx}
                          className="rounded-full border border-gray-200 bg-white px-3 py-1 text-[10px] font-bold text-[#001A3D] uppercase"
                        >
                          {sector}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Elaborate Capabilities */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-8">
                  {solution.capabilities.map((cap, idx) => (
                    <div
                      key={idx}
                      className="group rounded-2xl border border-gray-100 bg-white p-8 transition-all hover:border-[#0171c1]/20 hover:shadow-xl"
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          <CheckCircle2 className="h-5 w-5 text-[#0171c1]" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-bold text-[#001A3D] transition-colors group-hover:text-[#0171c1]">
                            {cap.name}
                          </h4>
                          <p className="text-sm leading-relaxed font-medium text-gray-400">
                            {cap.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Additional Value Add Info */}
                  <div className="relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-2xl bg-[#001A3D] p-8 text-white md:col-span-2 md:flex-row">
                    <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-[#0171c1]/20 blur-3xl"></div>
                    <div className="relative z-10">
                      <h5 className="mb-2 text-lg font-bold text-white">
                        Why Hutech for {solution.title}?
                      </h5>
                      <p className="max-w-xl text-sm font-medium text-white/60">
                        Our certified consultants combine industry best practices with deep
                        technical mastery to deliver solutions that are scalable, secure, and
                        user-centric.
                      </p>
                    </div>
                    <Link
                      href="/contact"
                      className="relative z-10 flex-shrink-0 rounded-sm bg-[#0171c1] px-8 py-4 text-[10px] font-bold tracking-wider text-white uppercase transition-all hover:bg-white hover:text-[#001A3D]"
                    >
                      Request Case Study
                    </Link>
                  </div>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Call to Action */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="relative space-y-10 overflow-hidden rounded-[4rem] bg-[#001A3D] p-12 text-center shadow-2xl md:p-24">
            <div className="absolute inset-0 z-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1551288049-bbbda546697c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
                alt="Enterprise Network"
                className="h-full w-full object-cover opacity-10"
              />
            </div>
            <div className="relative z-10 mx-auto max-w-4xl space-y-8">
              <h2 className="display-font gap-2 text-4xl leading-tight font-bold text-white md:text-7xl">
                Architect Your <span className="text-[#F99D1C]">Digital Future.</span>
              </h2>
              <p className="mx-auto max-w-2xl text-xl leading-relaxed font-medium text-white/60">
                Connect with our senior enterprise architects today to discuss your roadmap, from
                ERP selection and implementation to continuous evolution and support.
              </p>
              <div className="flex flex-col justify-center gap-6 pt-8 md:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 rounded-sm bg-[#0171c1] px-12 py-6 text-[12px] font-bold tracking-wider text-white uppercase transition-all duration-500 hover:bg-white hover:text-[#001A3D]"
                >
                  Initiate Transformation <MessageSquare className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/company/leadership"
                  className="inline-flex items-center justify-center gap-3 rounded-sm border border-white/20 px-12 py-6 text-[12px] font-bold tracking-wider text-white uppercase transition-all duration-500 hover:bg-white hover:text-[#001A3D]"
                >
                  Meet Our Strategists
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
