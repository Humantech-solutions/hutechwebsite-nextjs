"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Cpu,
  Settings,
  Factory,
  Zap,
  TrendingUp,
  BarChart,
  Workflow,
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
  Microscope,
  HardHat,
  Boxes,
  Layers,
  Container,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";


const BRAND_BLUE = "#0171c1";
const DARK_BLUE = "#001A3D";
const BRAND_ORANGE = "#F99D1C";

const MANUFACTURING_SERVICES = [
  {
    icon: Factory,
    title: "Smart Factory Transformation",
    description:
      "Lead your facility into the era of Industry 4.0. We design and implement end-to-end digital factory solutions that integrate IoT, automation, and real-time data for unparalleled production visibility.",
  },
  {
    icon: Cpu,
    title: "Industrial IoT (IIoT) Solutions",
    description:
      "Connect your machinery and assets. Our IIoT platforms collect and analyze data from the factory floor, enabling proactive decision-making and optimizing resource utilization across your entire network.",
  },
  {
    icon: Settings,
    title: "Manufacturing Execution Systems (MES)",
    description:
      "Streamline your production life cycle. We build custom MES that track and document the transformation of raw materials to finished goods, ensuring full traceability and operational efficiency.",
  },
  {
    icon: Microscope,
    title: "AI-Driven Quality Control",
    description:
      "Ensure zero-defect manufacturing. We implement advanced computer vision and machine learning algorithms that detect anomalies and quality issues in real-time, reducing waste and rework costs.",
  },
  {
    icon: TrendingUp,
    title: "Predictive Maintenance Platforms",
    description:
      "Eliminate unplanned downtime. Our AI-powered maintenance solutions predict equipment failures before they happen, allowing you to schedule repairs at the most cost-effective times.",
  },
  {
    icon: Workflow,
    title: "Production Process Automation",
    description:
      "Unlock throughput by automating repetitive manual tasks. We help you implement robotic process automation (RPA) and smart workflows to synchronize production stages and reduce cycle times.",
  },
];

const ESSENTIAL_SOLUTIONS = [
  {
    icon: Layers,
    title: "Digital Twin Implementation",
    description:
      "Create high-fidelity virtual replicas of your physical production lines. Simulate new processes, optimize layouts, and identify bottlenecks in a risk-free digital environment before physical implementation.",
  },
  {
    icon: Target,
    title: "Real-Time Production Monitoring",
    description:
      "Gain an instant pulse on your factory floor. Our dashboards provide live OEE (Overall Equipment Effectiveness) tracking, allowing you to react immediately to performance dips or quality shifts.",
  },
  {
    icon: BarChart,
    title: "Supply Chain & Demand Analytics",
    description:
      "Synchronize production with market demand. We leverage advanced analytics to forecast demand and optimize raw material procurement, ensuring you produce the right goods at the right time.",
  },
  {
    icon: ShieldCheck,
    title: "Regulatory & Safety Compliance",
    description:
      "Ensure your manufacturing operations meet all international safety and environmental standards. We build automated compliance reporting systems that simplify audits and reduce risk.",
  },
  {
    icon: HardHat,
    title: "Worker Safety & Performance",
    description:
      "Protect your most valuable assets—your people. We develop wearable integrations and AI-monitored safety systems that alert supervisors to potential hazards and monitor ergonomic health.",
  },
  {
    icon: BarChart3,
    title: "Asset Lifecycle Management",
    description:
      "Maximize the value of your industrial assets. Monitor health, performance, and maintenance history of every piece of equipment from acquisition to decommissioning through a unified portal.",
  },
];

const INNOVATIONS = [
  {
    icon: Sparkles,
    title: "Generative AI in Design",
    description:
      "Accelerate product development with AI-driven generative design tools that optimize parts for weight, strength, and manufacturability while reducing R&D cycles.",
  },
  {
    icon: Zap,
    title: "Edge Computing for Low Latency",
    description:
      "Process critical production data at the source. Our edge computing architectures ensure sub-millisecond response times for automated control systems and safety sensors.",
  },
  {
    icon: Globe,
    title: "Blockchain for Traceability",
    description:
      "Build an immutable record of your product's journey. Blockchain technology ensures full transparency and provenance of raw materials and components across the global supply chain.",
  },
  {
    icon: Smartphone,
    title: "AR for Maintenance & Training",
    description:
      "Empower your technicians with Augmented Reality. Provide hands-free access to digital manuals, remote expert assistance, and interactive 3D training modules on the factory floor.",
  },
  {
    icon: Lock,
    title: "Cybersecurity for OT Networks",
    description:
      "Secure your operational technology from cyber threats. We implement robust, industrial-grade security protocols that protect your manufacturing networks without compromising production uptime.",
  },
  {
    icon: Boxes,
    title: "Additive Manufacturing Integration",
    description:
      "Seamlessly integrate 3D printing into your production workflow. We develop software for distributed additive manufacturing, allowing you to print spare parts and prototypes on-demand.",
  },
];

const WHY_CHOOSE = [
  {
    title: "Deep Domain Expertise",
    description:
      "We understand the complexities of the factory floor, from PLC integrations to global supply chain synchronization, ensuring practical and effective solutions.",
  },
  {
    title: "Legacy-Modern Hybridity",
    description:
      "We specialize in bridging the gap between decades-old industrial equipment and modern cloud-native software, enabling a seamless digital transformation path.",
  },
  {
    title: "Scalable Industrial Architecture",
    description:
      "Our platforms are built to grow with you. Whether you operate a single facility or a global network of smart factories, our architectures scale to meet your needs.",
  },
  {
    title: "Zero-Downtime Deployment",
    description:
      "We recognize that production stops for nothing. Our implementation strategies focus on minimal disruption and phased deployments to ensure continuous operations.",
  },
];

const FAQS = [
  {
    question: "Can you integrate software with our existing legacy machinery?",
    answer:
      "Yes, we specialize in 'Retrofit Digitization'. We use industrial gateways and IoT sensors to pull data from legacy PLCs and machines that weren't originally designed for connectivity, bringing them into your digital ecosystem.",
  },
  {
    question: "How long does a typical smart factory transformation take?",
    answer:
      "Transformation is usually a phased journey. We typically implement a high-impact 'Pilot' module (like real-time monitoring) within 3-4 months, followed by a roadmap of broader integration over 12-24 months.",
  },
  {
    question: "How does your software improve OEE (Overall Equipment Effectiveness)?",
    answer:
      "Our platforms improve OEE by reducing downtime through predictive maintenance, increasing performance through real-time bottleneck analysis, and improving quality through automated AI inspection systems.",
  },
  {
    question: "What industries within manufacturing do you serve?",
    answer:
      "We serve a wide range of sectors including Automotive, Electronics, Pharmaceuticals, Food & Beverage, and Heavy Industrial Equipment, tailoring our MES and IoT solutions to the specific needs of each.",
  },
  {
    question: "Is our factory data secure in the cloud?",
    answer:
      "Absolutely. we implement multi-layered security, including data encryption at rest and in transit, private cloud deployments, and strict access controls that meet global industrial cybersecurity standards.",
  },
];

const BLOG_POSTS = [
  {
    title: "Navigating the Shift to Industry 5.0: The Human-Robot Collaboration",
    description:
      "As automation reaches its peak, the next wave of manufacturing focuses on the synergy between human intuition and machine precision...",
    image:
      "https://images.unsplash.com/photo-1647427060118-4911c9821b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    title: "Using Computer Vision to Achieve Six Sigma Quality",
    description:
      "Learn how modern AI inspection systems are outperforming human experts in detecting micro-defects and ensuring perfect production every time...",
    image:
      "https://images.unsplash.com/photo-1748349221526-33b51820b21e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    title: "Building Resilience: Decoupling Your Supply Chain with Data",
    description:
      "Discover how advanced demand forecasting and real-time inventory visibility are helping manufacturers navigate global supply disruptions...",
    image:
      "https://images.unsplash.com/photo-1768796372063-4da660e034b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
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

export default function Manufacturing() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="Manufacturing 4.0 & Smart Factory Solutions | Hutech Solutions"
        description="Engineering the Future of Manufacturing with AI-Driven MES and IIoT Solutions. specialized in smart factories, predictive maintenance, and quality automation."
      />

      {/* 40px Breadcrumb Section */}
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1647427060118-4911c9821b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Industry 4.0 Transformation"
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
                Industry 4.0 Excellence
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              Your Manufacturing Vision. <br />
              <span className="text-[#F99D1C]">Our Industrial Code.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              We craft intelligent manufacturing experiences through cutting-edge software solutions
              and expert consulting for global industrial leaders.
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
                  Empowering Manufacturing with Smart, Scalable, AI-Driven Solutions
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
              </div>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  At Hutech Solutions, we bring deep expertise in implementing, supporting, and
                  managing integrated manufacturing platforms. Our end-to-end solutions include
                  system implementation, custom upgrades, performance optimization, and seamless
                  integration with industrial equipment.
                </p>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  We ensure our clients can operate with agility, security, and precision, enabling
                  them to expand production lines and integrate fresh digital solutions to meet
                  specific factory and market needs.
                </p>
              </div>
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">500+</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Connected Assets
                  </p>
                </div>
                <div className="hidden h-12 w-[1px] bg-gray-200 md:block"></div>
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">30%</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Efficiency Gain
                  </p>
                </div>
                <div className="hidden h-12 w-[1px] bg-gray-200 md:block"></div>
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">Zero</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Unplanned Downtime
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-sm shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1748349221526-33b51820b21e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Modern Production Line"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 hidden max-w-xs space-y-4 bg-[#0171c1] p-10 text-white shadow-2xl md:block">
                <Settings size={32} strokeWidth={1.5} />
                <h3 className="display-font text-xl font-bold">Precision at Scale</h3>
                <p className="text-sm leading-relaxed font-medium opacity-80">
                  Helping manufacturing leaders streamline complex production workflows, enhance
                  visibility, and reduce operational waste.
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
              Our Services in Manufacturing
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              At Hutech Solutions, we specialize in delivering cutting-edge software technology
              solutions tailored for the modern manufacturing ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {MANUFACTURING_SERVICES.map((service, i) => {
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
              What Makes Custom Manufacturing Solutions Essential for Your Business?
            </h2>
            <div className="mx-auto h-1 w-20 bg-[#0171c1]"></div>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-400">
              In the modern industrial landscape, custom software solutions are key to staying
              competitive and ensuring zero-defect production.
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
              Which Innovations Can Transform Your Factory?
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-500">
              Incorporating advanced technologies can significantly enhance your manufacturing
              capabilities for the digital age.
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
                  Discover Your Smart Factory Transformation Strategy With Us
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  Schedule a consultation with our expert Manufacturing software team and take the
                  first step towards a digital-first industrial experience.
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
                  src="https://images.unsplash.com/photo-1768796372063-4da660e034b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Industrial Data Analytics"
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
              Why Choose Hutech Solutions for Your Industrial Project?
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              At Hutech Solutions, we specialize in delivering Manufacturing and Industrial
              solutions tailored to your unique operational needs.
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
                Share Your Industrial Project With Us
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
                  placeholder="Tell us about your production needs"
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
                    text: "An industrial technology consultant will review your request and contact you within a few business hours.",
                  },
                  {
                    icon: FileText,
                    text: "We will schedule a deep-dive session to understand your factory workflow and integration needs.",
                  },
                  {
                    icon: Sparkles,
                    text: "You will receive a detailed proposal including technical architecture and industrial ROI analysis.",
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
                Industrial Insights & Articles
              </h2>
              <p className="text-lg font-medium text-gray-500">
                Explore our latest thinking on manufacturing technology and Industry 4.0 trends.
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
                      Manufacturing
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
