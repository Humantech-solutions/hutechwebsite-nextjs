"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Lightbulb,
  Zap,
  Wind,
  Sun,
  Battery,
  Droplets,
  Gauge,
  TrendingUp,
  BarChart,
  Workflow,
  Cpu,
  Smartphone,
  Cloud,
  Lock,
  MessageSquare,
  FileText,
  Sparkles,
  MoveRight,
  ArrowRight,
  ChevronRight,
  Target,
  LayoutGrid,
  Search,
  Users,
  Building2,
  BarChart3,
  Globe,
  Radio,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";


const UTILITIES_SERVICES = [
  {
    icon: Lightbulb,
    title: "Smart Grid Management",
    description:
      "Transform your power distribution with intelligent grid solutions. We build platforms for real-time monitoring, automated fault detection, and optimized energy flow across the entire network.",
  },
  {
    icon: Battery,
    title: "Energy Storage Systems",
    description:
      "Optimize energy storage and management. Our custom software helps you manage large-scale battery storage, ensure grid stability, and maximize the utility of stored renewable energy.",
  },
  {
    icon: Wind,
    title: "Renewable Energy Integration",
    description:
      "Seamlessly integrate solar, wind, and other renewable sources into your existing infrastructure with smart forecasting and balancing tools that ensure constant power supply.",
  },
  {
    icon: Droplets,
    title: "Water & Waste Management",
    description:
      "Smart solutions for water utilities. We develop systems for leak detection, water quality monitoring, and automated billing, ensuring sustainable and efficient water distribution.",
  },
  {
    icon: Gauge,
    title: "Smart Metering & Billing",
    description:
      "Empower customers and reduce operational costs with Advanced Metering Infrastructure (AMI). We build secure, scalable platforms for real-time usage tracking and automated billing.",
  },
  {
    icon: Workflow,
    title: "Utility Process Automation",
    description:
      "Unlock operational efficiency by automating field service scheduling, asset maintenance, and regulatory reporting with intelligent workflows and mobile-first tools.",
  },
];

const ESSENTIAL_SOLUTIONS = [
  {
    icon: Radio,
    title: "Predictive Asset Maintenance",
    description:
      "Leverage IoT and AI to monitor equipment health in real-time. Predict potential failures before they occur, reducing downtime and extending the lifespan of critical infrastructure.",
  },
  {
    icon: Target,
    title: "Grid Stability & Resilience",
    description:
      "Advanced algorithms maintain the delicate balance between supply and demand, ensuring grid stability even during extreme weather events or sudden load shifts.",
  },
  {
    icon: BarChart,
    title: "Energy Consumption Analytics",
    description:
      "Turn raw data into actionable insights. Our dashboards provide deep visibility into usage patterns, helping both utilities and customers make informed energy decisions.",
  },
  {
    icon: ShieldCheck,
    title: "Regulatory Compliance",
    description:
      "Ensure your operations meet all local and international environmental and safety regulations with automated reporting and real-time compliance monitoring.",
  },
  {
    icon: Globe,
    title: "Carbon Footprint Tracking",
    description:
      "Accurately measure and manage your environmental impact. We build platforms for tracking emissions and managing carbon credits across your entire energy portfolio.",
  },
  {
    icon: BarChart3,
    title: "Operational Dashboards",
    description:
      "Gain a unified view of your entire utility ecosystem. Monitor KPIs like system uptime, line losses, and field crew productivity from a single, centralized command center.",
  },
];

const INNOVATIONS = [
  {
    icon: Cpu,
    title: "AI in Energy Trading",
    description:
      "Maximize ROI with AI-driven energy trading platforms that predict market fluctuations and optimize buying and selling strategies in real-time.",
  },
  {
    icon: Zap,
    title: "Microgrid Control Systems",
    description:
      "Enable decentralized energy generation and consumption with smart microgrid controllers that allow communities to operate independently of the main grid.",
  },
  {
    icon: Cloud,
    title: "Cloud-Native Grid Edge",
    description:
      "Process data at the edge of the grid for faster response times and improved security, powered by resilient and scalable cloud-native architectures.",
  },
  {
    icon: Lock,
    title: "Cybersecurity for Infrastructure",
    description:
      "Protect critical national infrastructure from cyber threats with robust, multi-layered security protocols designed specifically for the unique needs of utilities.",
  },
  {
    icon: Smartphone,
    title: "Customer Engagement Portals",
    description:
      "Building modern web and mobile portals that allow customers to track their usage, pay bills, and receive outage alerts, improving overall customer satisfaction.",
  },
  {
    icon: Sparkles,
    title: "Digital Twins for Utilities",
    description:
      "Create virtual replicas of your physical assets to simulate scenarios, optimize performance, and train field crews in a safe, risk-free digital environment.",
  },
];

const WHY_CHOOSE = [
  {
    title: "Infrastructure Expertise",
    description:
      "We have deep experience working with large-scale utility providers, understanding the critical nature of power and water distribution systems.",
  },
  {
    title: "Reliability First Approach",
    description:
      "We build software that is as resilient as the infrastructure it controls. Our solutions are designed for 99.99% availability and high fault tolerance.",
  },
  {
    title: "Legacy System Integration",
    description:
      "Our experts specialize in bridging the gap between aging legacy infrastructure and modern digital platforms, ensuring a smooth transformation path.",
  },
  {
    title: "Future-Ready Solutions",
    description:
      "We design our platforms to be modular and scalable, allowing you to easily integrate new energy sources and technologies as they emerge.",
  },
];

const FAQS = [
  {
    question: "How can smart grid technology reduce operational costs?",
    answer:
      "Smart grids reduce costs by automating fault detection (reducing field crew dispatch time), optimizing energy distribution (reducing line losses), and enabling predictive maintenance (reducing expensive emergency repairs).",
  },
  {
    question: "Do you provide solutions for small-scale renewable providers?",
    answer:
      "Yes, our platforms are highly scalable and can be tailored for everything from community solar projects and local microgrids to national-scale energy distribution networks.",
  },
  {
    question: "How do you handle the cybersecurity of critical energy infrastructure?",
    answer:
      "We implement a 'Security-by-Design' approach, featuring end-to-end encryption, strict access controls, continuous monitoring, and air-gapped backups for the most critical systems.",
  },
  {
    question: "Can your platforms help with sustainability goals?",
    answer:
      "Absolutely. We build specialized tools for tracking carbon emissions, managing renewable energy integration, and optimizing resource usage, directly supporting your ESG and sustainability initiatives.",
  },
  {
    question: "What is the typical timeline for a utility digital transformation project?",
    answer:
      "Timelines vary depending on the scope and complexity of existing systems, but we typically deliver initial high-value modules within 4-6 months, following an agile, phased implementation approach.",
  },
];

const BLOG_POSTS = [
  {
    title: "The Role of AI in the 2026 Global Energy Transition",
    description:
      "As the world moves toward 100% renewables, we explore how artificial intelligence is the key to balancing a decentralized power grid...",
    image:
      "https://images.unsplash.com/photo-1768224656445-33d078c250b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    title: "Ensuring Grid Resilience Against Extreme Weather",
    description:
      "Learn how Hutech Solutions' predictive grid modeling helps utilities prepare for and recover faster from climate-driven outages...",
    image:
      "https://images.unsplash.com/photo-1715605569717-494ac7c5656a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    title: "Smart Water Management: Beyond Just Metering",
    description:
      "Discover how IoT and digital twins are helping cities manage water scarcity and infrastructure decay through proactive digital strategies...",
    image:
      "https://images.unsplash.com/photo-1630672607721-48e0a0187a92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
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

export default function UtilitiesEnergy() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="Utilities & Energy Tech Solutions | Hutech Solutions"
        description="Empowering the Energy Sector with Smart, Scalable, AI-Driven Solutions. Specialized in smart grids, renewable integration, and asset management."
      />

      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1715605569717-494ac7c5656a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Energy Transformation"
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
                Energy Excellence
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              Your Energy Vision. Our Code. <br />
              <span className="text-[#F99D1C]">One Digital Power Revolution.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              We craft intelligent utility experiences through cutting-edge software solutions and
              expert consulting for global energy and water providers.
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
                  Empowering Utilities & Energy with Smart, Scalable, AI-Driven Solutions
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
              </div>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  At Hutech Solutions, we bring deep expertise in implementing, supporting, and
                  managing integrated energy platforms. Our end-to-end solutions include system
                  implementation, custom upgrades, performance optimization, and seamless
                  third-party integrations.
                </p>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  We ensure our clients can operate with agility, security, and sustainability,
                  enabling them to expand services and integrate fresh digital solutions to meet
                  specific infrastructure and regulatory needs.
                </p>
              </div>
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">15GW+</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Power Managed
                  </p>
                </div>
                <div className="hidden h-12 w-[1px] bg-gray-200 md:block"></div>
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">200+</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Smart Grids
                  </p>
                </div>
                <div className="hidden h-12 w-[1px] bg-gray-200 md:block"></div>
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">99.9%</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Uptime Record
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-sm shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1772384388864-e965cdb1825f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Renewable Infrastructure"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 hidden max-w-xs space-y-4 bg-[#0171c1] p-10 text-white shadow-2xl md:block">
                <Zap size={32} strokeWidth={1.5} />
                <h3 className="display-font text-xl font-bold">Reliable Power</h3>
                <p className="text-sm leading-relaxed font-medium opacity-80">
                  Integrating AI and cloud-native services across utility platforms to streamline
                  tasks and enhance infrastructure resilience.
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
              Our Services in Utilities & Energy
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              At Hutech Solutions, we specialize in delivering cutting-edge software technology
              solutions tailored for the modern utilities and energy landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {UTILITIES_SERVICES.map((service, i) => {
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

      {/* Essential Solutions Section (Dark) */}
      <section className="overflow-hidden bg-[#001A3D] py-24 text-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font mx-auto max-w-4xl text-3xl leading-tight font-semibold md:text-5xl">
              What Makes Custom Utility Solutions Essential for Your Business?
            </h2>
            <div className="mx-auto h-1 w-20 bg-[#0171c1]"></div>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-400">
              In the rapidly evolving infrastructure landscape, custom software solutions are key to
              ensuring grid stability and operational efficiency.
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
              Which Innovations Can Transform Your Services?
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-500">
              Incorporating advanced technologies can significantly enhance your utility offerings
              for the modern age.
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

      {/* CTA Section / Strategy */}
      <section className="overflow-hidden bg-[#F2F2F2] py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex flex-col items-center gap-20 lg:flex-row">
            <div className="flex-1 space-y-10">
              <div className="space-y-6">
                <h2 className="display-font text-3xl leading-[1.2] font-semibold text-[#001A3D] md:text-5xl">
                  Discover Your Energy Digital Transformation Strategy With Us
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  Schedule a consultation with our expert EnergyTech team and take the first step
                  towards a digital-first utility experience.
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
                  src="https://images.unsplash.com/photo-1768224656445-33d078c250b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Energy Analytics"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -top-10 -right-10 -z-10 h-64 w-64 rounded-full bg-[#0171c1]/5 blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 -z-10 h-48 w-48 rounded-full bg-[#F99D1C]/10 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
              Why Choose Hutech Solutions for Your Utility Project?
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              At Hutech Solutions, we specialize in delivering Utilities and Energy solutions
              tailored to your unique clinical needs.
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
                Share Your Utility Project With Us
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
                  placeholder="Tell us about your infrastructure needs"
                  rows={4}
                  className="w-full resize-none border border-gray-200 p-4 text-sm font-medium transition-all outline-none focus:border-[#0171c1] md:col-span-2"
                ></textarea>
                <div className="md:col-span-2">
                  <button
                    type="button"
                    className="w-full rounded-sm bg-[#F99D1C] px-12 py-5 text-[11px] font-bold tracking-wider text-[#001A3D] uppercase shadow-xl transition-all duration-500 hover:bg-[#001A3D] hover:text-white md:w-auto"
                  >
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
                    text: "An energy technology consultant will review your request and contact you within a few business hours.",
                  },
                  {
                    icon: FileText,
                    text: "We will schedule a deep-dive session to understand your infrastructure and regulatory needs.",
                  },
                  {
                    icon: Sparkles,
                    text: "You will receive a detailed proposal including technical architecture and implementation roadmaps.",
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

      {/* Resource Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-16 flex items-end justify-between gap-8">
            <div className="max-w-2xl space-y-6">
              <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
                Energy Insights & Articles
              </h2>
              <p className="text-lg font-medium text-gray-500">
                Explore our latest thinking on energy technology and digital utility trends.
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
                      EnergyTech
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
                      href="/resources"
                      className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#001A3D] uppercase transition-colors hover:text-[#0171c1]"
                    >
                      Read Article <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
