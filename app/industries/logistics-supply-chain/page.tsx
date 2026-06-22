"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Truck,
  Package,
  Map,
  Navigation,
  Globe,
  Box,
  ClipboardCheck,
  TrendingUp,
  BarChart,
  Zap,
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
  Link as LinkIcon,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";


const LOGISTICS_SERVICES = [
  {
    icon: LayoutGrid,
    title: "Warehouse Management Systems (WMS)",
    description:
      "Optimize your warehouse operations with our custom WMS solutions. From inventory tracking to order fulfillment, we provide real-time visibility and control over your entire warehouse ecosystem.",
  },
  {
    icon: Truck,
    title: "Fleet & Transportation Management",
    description:
      "Manage your fleet with precision. Our solutions include real-time vehicle tracking, route optimization, and driver performance monitoring to ensure timely and cost-effective deliveries.",
  },
  {
    icon: Map,
    title: "Supply Chain Visibility",
    description:
      "Gain end-to-end visibility into your supply chain. We build platforms that integrate data from multiple sources, providing a single source of truth for all your logistical activities.",
  },
  {
    icon: ClipboardCheck,
    title: "Inventory & Order Management",
    description:
      "Never lose track of your stock. Our automated inventory management systems help you maintain optimal stock levels, reduce carrying costs, and improve order accuracy.",
  },
  {
    icon: Navigation,
    title: "Last-Mile Delivery Solutions",
    description:
      "Perfect your final leg of delivery. We develop mobile-first solutions for delivery agents, featuring route navigation, proof of delivery, and real-time customer notifications.",
  },
  {
    icon: Workflow,
    title: "Logistics Process Automation",
    description:
      "Unlock efficiency by automating repetitive logistical tasks. We help you implement RPA and smart workflows to reduce manual errors and speed up your logistics pipeline.",
  },
];

const ESSENTIAL_SOLUTIONS = [
  {
    icon: TrendingUp,
    title: "Route Optimization",
    description:
      "Advanced algorithms calculate the most efficient routes, reducing fuel consumption, vehicle wear, and delivery times while maximizing driver productivity.",
  },
  {
    icon: Search,
    title: "Real-Time Tracking",
    description:
      "Integrated GPS and IoT sensors provide live tracking of shipments and assets, giving you and your customers peace of mind with accurate delivery estimates.",
  },
  {
    icon: BarChart,
    title: "Demand Forecasting",
    description:
      "Leverage AI and historical data to predict future demand trends, allowing you to optimize inventory levels and prepare for peak seasons with confidence.",
  },
  {
    icon: ShieldCheck,
    title: "Risk & Compliance",
    description:
      "Ensure your logistics operations meet all local and international regulations, with automated documentation and real-time alerts for potential compliance issues.",
  },
  {
    icon: Users,
    title: "Partner & Vendor Management",
    description:
      "Streamline communication and collaboration with your logistical partners through secure portals that manage contracts, performance metrics, and payments.",
  },
  {
    icon: BarChart3,
    title: "Logistics Analytics",
    description:
      "Turn your logistics data into actionable insights with comprehensive dashboards that track KPIs like cost-per-mile, on-time delivery rates, and asset utilization.",
  },
];

const INNOVATIONS = [
  {
    icon: Cpu,
    title: "AI in Logistics",
    description:
      "From predictive maintenance for your fleet to AI-powered load planning, we bring machine learning to the heart of your logistics strategy.",
  },
  {
    icon: LinkIcon,
    title: "Blockchain for Supply Chain",
    description:
      "Ensure full traceability and transparency across your global supply chain with immutable distributed ledger technology that builds trust among stakeholders.",
  },
  {
    icon: Zap,
    title: "IoT & Smart Sensors",
    description:
      "Monitor the condition of sensitive shipments in real-time with IoT sensors that track temperature, humidity, and shock during transit.",
  },
  {
    icon: Cloud,
    title: "Cloud-Native Logistics",
    description:
      "Scale your logistics infrastructure on-demand with resilient cloud solutions that provide high availability and seamless data integration.",
  },
  {
    icon: Smartphone,
    title: "Mobile Logistics Apps",
    description:
      "Empower your workforce with powerful mobile apps that handle everything from warehouse picking and packing to field service and last-mile delivery.",
  },
  {
    icon: Sparkles,
    title: "Robotic Automation",
    description:
      "Integrating warehouse robotics and autonomous mobile robots (AMRs) into your logistical workflows to significantly increase throughput and accuracy.",
  },
];

const WHY_CHOOSE = [
  {
    title: "Domain Knowledge",
    description:
      "We have extensive experience in the logistics and supply chain sector, understanding the complexities of global trade and domestic distribution.",
  },
  {
    title: "Customized Technology",
    description:
      "We don't offer generic software. Every solution we build is tailored to your specific logistical challenges and operational requirements.",
  },
  {
    title: "Seamless Integration",
    description:
      "Our solutions are designed to integrate effortlessly with your existing ERPs, CRMs, and legacy systems, ensuring a unified data environment.",
  },
  {
    title: "Global Scalability",
    description:
      "Whether you manage a local fleet or a global supply chain, our platforms are built to scale with your business as you expand into new markets.",
  },
];

const FAQS = [
  {
    question: "How can custom software improve my warehouse efficiency?",
    answer:
      "Custom software can automate inventory tracking, optimize picking routes, and provide real-time visibility into stock levels, reducing manual errors and significantly speeding up the fulfillment process.",
  },
  {
    question: "Do your logistics solutions integrate with major ERP systems?",
    answer:
      "Yes, we have deep expertise in integrating our custom logistics platforms with major ERPs like SAP, Oracle, and Microsoft Dynamics to ensure seamless data flow across your organization.",
  },
  {
    question: "How do you ensure the security of logistical data?",
    answer:
      "We implement robust security protocols, including end-to-end encryption, multi-factor authentication, and secure API gateways, to protect your sensitive shipment and partner data.",
  },
  {
    question: "What are the benefits of using AI in transportation management?",
    answer:
      "AI can predict demand spikes, optimize vehicle routing in real-time based on traffic and weather, and provide predictive maintenance alerts for your fleet, leading to significant cost savings.",
  },
  {
    question: "Can you build solutions for both B2B and B2C logistics?",
    answer:
      "Absolutely. We develop tailored solutions for complex B2B supply chains as well as high-volume B2C last-mile delivery operations, addressing the unique challenges of each.",
  },
];

const BLOG_POSTS = [
  {
    title: "The Future of Integrated Logistics: Trends to Watch in 2026",
    description:
      "As the global supply chain evolves, we explore the key technological shifts that are making logistics more resilient and efficient...",
    image:
      "https://images.unsplash.com/photo-1696069360639-a1124ce8f7ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    title: "Optimizing Last-Mile Delivery for Peak Season Success",
    description:
      "Learn how Hutech Solutions' mobile-first delivery platforms help companies handle the increased volume and complexity of the holiday rush...",
    image:
      "https://images.unsplash.com/photo-1652081439602-b917d33f794b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    title: "Building a Transparent Supply Chain with Blockchain",
    description:
      "Discover how distributed ledger technology is revolutionizing traceability and building trust across complex international shipping networks...",
    image:
      "https://images.unsplash.com/photo-1586449480584-34302e933441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
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

export default function LogisticsSupplyChain() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="Logistics & Supply Chain App Development | Hutech Solutions"
        description="Empowering Logistics with Smart, Scalable, AI-Driven Solutions. Specialized in WMS, fleet management, and supply chain visibility."
      />

      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1696069360639-a1124ce8f7ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Logistics Digital Transformation"
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
                Logistics Excellence
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              Your Logistics Vision. Our Code. <br />
              <span className="text-[#F99D1C]">One Digital Supply Revolution.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              We craft integrated logistical experiences through cutting-edge software solutions and
              expert consulting for global supply chain leaders.
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
                  Empowering Logistics & Supply Chain with Smart, Scalable, AI-Driven Solutions
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
              </div>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  At Hutech Solutions, we bring deep expertise in implementing, supporting, and
                  managing integrated logistics platforms. Our end-to-end solutions include system
                  implementation, custom upgrades, performance optimization, and seamless
                  third-party integrations.
                </p>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  We ensure our clients can operate with agility, security, and efficiency, enabling
                  them to expand operations and integrate fresh digital solutions to meet specific
                  logistical and market needs.
                </p>
              </div>
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">20+</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Global Ports
                  </p>
                </div>
                <div className="hidden h-12 w-[1px] bg-gray-200 md:block"></div>
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">50M+</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Orders Tracked
                  </p>
                </div>
                <div className="hidden h-12 w-[1px] bg-gray-200 md:block"></div>
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">100%</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Visibility Rate
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-sm shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1768796372882-8b67936af681?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Logistics Innovation"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 hidden max-w-xs space-y-4 bg-[#0171c1] p-10 text-white shadow-2xl md:block">
                <Globe size={32} strokeWidth={1.5} />
                <h3 className="display-font text-xl font-bold">Universal Impact</h3>
                <p className="text-sm leading-relaxed font-medium opacity-80">
                  Helping logistical leaders streamline complex global operations, enhance
                  visibility, and reduce operational costs.
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
              Our Services in Logistics & Supply Chain
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              At Hutech Solutions, we specialize in delivering cutting-edge software technology
              solutions tailored for the logistics and supply chain industry.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {LOGISTICS_SERVICES.map((service, i) => {
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
              What Makes Custom Logistics Solutions Essential for Your Business?
            </h2>
            <div className="mx-auto h-1 w-20 bg-[#0171c1]"></div>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-400">
              In the modern distribution landscape, custom software solutions are key to staying
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
              Which Innovations Can Transform Your Logistics?
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-500">
              Incorporating advanced technologies can significantly enhance your logistical
              capabilities for the modern age.
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
                  Discover Your Integrated Logistics Development Strategy With Us
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  Schedule a consultation with our expert Logistics software team and take the first
                  step towards a digital-first supply chain experience.
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
                  src="https://images.unsplash.com/photo-1586449480584-34302e933441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Logistics Analytics"
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
              Why Choose Hutech Solutions for Your Logistics Project?
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              At Hutech Solutions, we specialize in delivering Logistics and Supply Chain solutions
              tailored to your unique operational needs.
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
                Share Your Logistics Project With Us
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
                  placeholder="Tell us about your logistics needs"
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
                    text: "A logistics technology consultant will review your request and contact you within a few business hours.",
                  },
                  {
                    icon: FileText,
                    text: "We will schedule a deep-dive session to understand your supply chain and operational goals.",
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
                Logistics Insights & Articles
              </h2>
              <p className="text-lg font-medium text-gray-500">
                Explore our latest thinking on logistical technology and supply chain trends.
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
                      Logistics
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
