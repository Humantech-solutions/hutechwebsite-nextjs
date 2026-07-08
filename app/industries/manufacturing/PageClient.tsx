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
  Container
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";
import { InlineContactForm } from "@/components/InlineContactForm";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

const BRAND_BLUE = "#0171c1";
const DARK_BLUE = "#001A3D";
const BRAND_ORANGE = "#FFAF2B";

const MANUFACTURING_SERVICES = [
  {
    icon: Factory,
    title: "Smart Factory Transformation",
    description: "Lead your facility into the era of Industry 4.0. We design and implement end-to-end digital factory solutions that integrate IoT, automation, and real-time data for unparalleled production visibility."
  },
  {
    icon: Cpu,
    title: "Industrial IoT (IIoT) Solutions",
    description: "Connect your machinery and assets. Our IIoT platforms collect and analyze data from the factory floor, enabling proactive decision-making and optimizing resource utilization across your entire network."
  },
  {
    icon: Settings,
    title: "Manufacturing Execution Systems (MES)",
    description: "Streamline your production life cycle. We build custom MES that track and document the transformation of raw materials to finished goods, ensuring full traceability and operational efficiency."
  },
  {
    icon: Microscope,
    title: "AI-Driven Quality Control",
    description: "Ensure zero-defect manufacturing. We implement advanced computer vision and machine learning algorithms that detect anomalies and quality issues in real-time, reducing waste and rework costs."
  },
  {
    icon: TrendingUp,
    title: "Predictive Maintenance Platforms",
    description: "Eliminate unplanned downtime. Our AI-powered maintenance solutions predict equipment failures before they happen, allowing you to schedule repairs at the most cost-effective times."
  },
  {
    icon: Workflow,
    title: "Production Process Automation",
    description: "Unlock throughput by automating repetitive manual tasks. We help you implement robotic process automation (RPA) and smart workflows to synchronize production stages and reduce cycle times."
  }
];

const ESSENTIAL_SOLUTIONS = [
  {
    icon: Layers,
    title: "Digital Twin Implementation",
    description: "Create high-fidelity virtual replicas of your physical production lines. Simulate new processes, optimize layouts, and identify bottlenecks in a risk-free digital environment before physical implementation."
  },
  {
    icon: Target,
    title: "Real-Time Production Monitoring",
    description: "Gain an instant pulse on your factory floor. Our dashboards provide live OEE (Overall Equipment Effectiveness) tracking, allowing you to react immediately to performance dips or quality shifts."
  },
  {
    icon: BarChart,
    title: "Supply Chain & Demand Analytics",
    description: "Synchronize production with market demand. We leverage advanced analytics to forecast demand and optimize raw material procurement, ensuring you produce the right goods at the right time."
  },
  {
    icon: ShieldCheck,
    title: "Regulatory & Safety Compliance",
    description: "Ensure your manufacturing operations meet all international safety and environmental standards. We build automated compliance reporting systems that simplify audits and reduce risk."
  },
  {
    icon: HardHat,
    title: "Worker Safety & Performance",
    description: "Protect your most valuable assets—your people. We develop wearable integrations and AI-monitored safety systems that alert supervisors to potential hazards and monitor ergonomic health."
  },
  {
    icon: BarChart3,
    title: "Asset Lifecycle Management",
    description: "Maximize the value of your industrial assets. Monitor health, performance, and maintenance history of every piece of equipment from acquisition to decommissioning through a unified portal."
  }
];

const INNOVATIONS = [
  {
    icon: Sparkles,
    title: "Generative AI in Design",
    description: "Accelerate product development with AI-driven generative design tools that optimize parts for weight, strength, and manufacturability while reducing R&D cycles."
  },
  {
    icon: Zap,
    title: "Edge Computing for Low Latency",
    description: "Process critical production data at the source. Our edge computing architectures ensure sub-millisecond response times for automated control systems and safety sensors."
  },
  {
    icon: Globe,
    title: "Blockchain for Traceability",
    description: "Build an immutable record of your product's journey. Blockchain technology ensures full transparency and provenance of raw materials and components across the global supply chain."
  },
  {
    icon: Smartphone,
    title: "AR for Maintenance & Training",
    description: "Empower your technicians with Augmented Reality. Provide hands-free access to digital manuals, remote expert assistance, and interactive 3D training modules on the factory floor."
  },
  {
    icon: Lock,
    title: "Cybersecurity for OT Networks",
    description: "Secure your operational technology from cyber threats. We implement robust, industrial-grade security protocols that protect your manufacturing networks without compromising production uptime."
  },
  {
    icon: Boxes,
    title: "Additive Manufacturing Integration",
    description: "Seamlessly integrate 3D printing into your production workflow. We develop software for distributed additive manufacturing, allowing you to print spare parts and prototypes on-demand."
  }
];

const WHY_CHOOSE = [
  {
    title: "Deep Domain Expertise",
    description: "We understand the complexities of the factory floor, from PLC integrations to global supply chain synchronization, ensuring practical and effective solutions."
  },
  {
    title: "Legacy-Modern Hybridity",
    description: "We specialize in bridging the gap between decades-old industrial equipment and modern cloud-native software, enabling a seamless digital transformation path."
  },
  {
    title: "Scalable Industrial Architecture",
    description: "Our platforms are built to grow with you. Whether you operate a single facility or a global network of smart factories, our architectures scale to meet your needs."
  },
  {
    title: "Zero-Downtime Deployment",
    description: "We recognize that production stops for nothing. Our implementation strategies focus on minimal disruption and phased deployments to ensure continuous operations."
  }
];

const FAQS = [
  {
    question: "Can you integrate software with our existing legacy machinery?",
    answer: "Yes, we specialize in 'Retrofit Digitization'. We use industrial gateways and IoT sensors to pull data from legacy PLCs and machines that weren't originally designed for connectivity, bringing them into your digital ecosystem."
  },
  {
    question: "How long does a typical smart factory transformation take?",
    answer: "Transformation is usually a phased journey. We typically implement a high-impact 'Pilot' module (like real-time monitoring) within 3-4 months, followed by a roadmap of broader integration over 12-24 months."
  },
  {
    question: "How does your software improve OEE (Overall Equipment Effectiveness)?",
    answer: "Our platforms improve OEE by reducing downtime through predictive maintenance, increasing performance through real-time bottleneck analysis, and improving quality through automated AI inspection systems."
  },
  {
    question: "What industries within manufacturing do you serve?",
    answer: "We serve a wide range of sectors including Automotive, Electronics, Pharmaceuticals, Food & Beverage, and Heavy Industrial Equipment, tailoring our MES and IoT solutions to the specific needs of each."
  },
  {
    question: "Is our factory data secure in the cloud?",
    answer: "Absolutely. we implement multi-layered security, including data encryption at rest and in transit, private cloud deployments, and strict access controls that meet global industrial cybersecurity standards."
  }
];

const BLOG_POSTS = [
  {
    title: "Navigating the Shift to Industry 5.0: The Human-Robot Collaboration",
    description: "As automation reaches its peak, the next wave of manufacturing focuses on the synergy between human intuition and machine precision...",
    image: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    title: "Using Computer Vision to Achieve Six Sigma Quality",
    description: "Learn how modern AI inspection systems are outperforming human experts in detecting micro-defects and ensuring perfect production every time...",
    image: "https://images.unsplash.com/photo-1748349221526-33b51820b21e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    title: "Building Resilience: Decoupling Your Supply Chain with Data",
    description: "Discover how advanced demand forecasting and real-time inventory visibility are helping manufacturers navigate global supply disruptions...",
    image: "https://images.unsplash.com/photo-1768796372063-4da660e034b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left group"
      >
        <span className={`text-lg md:text-xl font-bold transition-colors ${isOpen ? "text-[#0171c1]" : "text-[#001A3D] group-hover:text-[#0171c1]"}`}>{question}</span>
        <div className={`w-8 h-8 flex items-center justify-center transition-all ${isOpen ? "text-[#0171c1]" : "text-gray-400"}`}>
          <ChevronRight className={`transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} />
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
            <p className="pb-8 text-gray-500 text-lg leading-relaxed">{answer}</p>
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
      <section className="bg-[#001A3D] text-white h-[450px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1647427060118-4911c9821b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Industry 4.0 Transformation"
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
              <span className="text-[#FFAF2B] font-bold uppercase tracking-[0.3em] text-[10px]">Industry 4.0 Excellence</span>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight display-font mb-8">
              Your Manufacturing Vision. <br />
              <span className="text-[#FFAF2B]">Our Industrial Code.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed">
              We craft intelligent manufacturing experiences through cutting-edge software solutions and expert consulting for global industrial leaders.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font leading-tight">
                  Empowering Manufacturing with Smart, Scalable, AI-Driven Solutions
                </h2>
                <div className="w-20 h-1 bg-[#0171c1]"></div>
              </div>
              <div className="space-y-6">
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  At Hutech Solutions, we bring deep expertise in implementing, supporting, and managing integrated manufacturing platforms. Our end-to-end solutions include system implementation, custom upgrades, performance optimization, and seamless integration with industrial equipment.
                </p>
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  We ensure our clients can operate with agility, security, and precision, enabling them to expand production lines and integrate fresh digital solutions to meet specific factory and market needs.
                </p>
              </div>
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-[#001A3D] display-font">500+</p>
                  <p className="text-[10px] font-bold text-[#0171c1] uppercase tracking-widest">Connected Assets</p>
                </div>
                <div className="w-[1px] h-12 bg-gray-200 hidden md:block"></div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-[#001A3D] display-font">30%</p>
                  <p className="text-[10px] font-bold text-[#0171c1] uppercase tracking-widest">Efficiency Gain</p>
                </div>
                <div className="w-[1px] h-12 bg-gray-200 hidden md:block"></div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-[#001A3D] display-font">Zero</p>
                  <p className="text-[10px] font-bold text-[#0171c1] uppercase tracking-widest">Unplanned Downtime</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-sm overflow-hidden shadow-2xl">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1748349221526-33b51820b21e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                  alt="Modern Production Line" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-[#0171c1] p-10 text-white space-y-4 max-w-xs shadow-2xl hidden md:block">
                <Settings size={32} strokeWidth={1.5} />
                <h3 className="text-xl font-bold display-font">Precision at Scale</h3>
                <p className="text-sm font-medium opacity-80 leading-relaxed">
                  Helping manufacturing leaders streamline complex production workflows, enhance visibility, and reduce operational waste.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Our Services in Manufacturing</h2>
            <p className="text-lg text-gray-500 max-w-4xl mx-auto font-medium leading-relaxed">
              At Hutech Solutions, we specialize in delivering cutting-edge software technology solutions tailored for the modern manufacturing ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MANUFACTURING_SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-12 shadow-sm border border-gray-100 flex flex-col space-y-6 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Icon size={80} strokeWidth={1} />
                  </div>
                  <div className="w-16 h-16 rounded-sm bg-gray-50 flex items-center justify-center text-[#0171c1] group-hover:bg-[#0171c1] group-hover:text-white transition-all duration-500">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-[#001A3D] display-font leading-tight">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">{service.description}</p>
                  <div className="pt-4 mt-auto">
                    <Link href="/contact" className="inline-flex items-center gap-2 text-[10px] font-bold text-[#0171c1] uppercase tracking-widest group-hover:gap-4 transition-all">
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
      <section className="py-24 bg-[#001A3D] text-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold display-font leading-tight max-w-4xl mx-auto">
              What Makes Custom Manufacturing Solutions Essential for Your Business?
            </h2>
            <div className="w-20 h-1 bg-[#0171c1] mx-auto"></div>
            <p className="text-gray-400 max-w-3xl mx-auto font-medium text-lg leading-relaxed">
              In the modern industrial landscape, custom software solutions are key to staying competitive and ensuring zero-defect production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10">
            {ESSENTIAL_SOLUTIONS.map((item, i) => {
              const Icon = item.icon;
              return (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-6 p-8 border border-white/5 hover:bg-white/5 transition-colors rounded-sm group"
                >
                  <div className="w-14 h-14 bg-white/10 rounded-sm flex items-center justify-center text-[#0171c1] group-hover:scale-110 transition-transform">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold display-font tracking-tight">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed font-medium">{item.description}</p>
                  </div>
                </Motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Innovations Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Which Innovations Can Transform Your Factory?</h2>
            <p className="text-lg text-gray-500 font-medium max-w-3xl mx-auto leading-relaxed">
              Incorporating advanced technologies can significantly enhance your manufacturing capabilities for the digital age.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {INNOVATIONS.map((item, i) => {
              const Icon = item.icon;
              return (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center space-y-6 group"
                >
                  <div className="text-[#0171c1] group-hover:scale-110 transition-transform duration-500">
                    <Icon size={56} strokeWidth={1} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-[#001A3D] display-font tracking-tight">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium max-w-sm">{item.description}</p>
                  </div>
                </Motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section / Strategy */}
      <section className="py-24 bg-[#F2F2F2] overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 space-y-10">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font leading-[1.2]">
                  Discover Your Smart Factory Transformation Strategy With Us
                </h2>
                <div className="w-20 h-1 bg-[#0171c1]"></div>
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  Schedule a consultation with our expert Manufacturing software team and take the first step towards a digital-first industrial experience.
                </p>
              </div>
              <div>
                <Link href="/contact" className="inline-flex items-center gap-3 bg-[#FFAF2B] text-[#001A3D] px-10 py-5 font-bold uppercase tracking-wider text-[11px] hover:bg-[#001A3D] hover:text-white transition-all duration-500 shadow-xl rounded-sm">
                  Consult Us Now <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="aspect-video bg-white p-2 rounded-sm shadow-2xl relative z-10">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1768796372063-4da660e034b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                  alt="Industrial Data Analytics" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#0171c1]/5 blur-3xl rounded-full -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#FFAF2B]/10 blur-2xl rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Why Choose Hutech Solutions for Your Industrial Project?</h2>
            <p className="text-lg text-gray-500 font-medium max-w-4xl mx-auto leading-relaxed">
              At Hutech Solutions, we specialize in delivering Manufacturing and Industrial solutions tailored to your unique operational needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
            {WHY_CHOOSE.map((item, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-8 group"
              >
                <div className="w-14 h-14 bg-[#0171c1]/5 flex items-center justify-center text-[#0171c1] shrink-0 group-hover:bg-[#0171c1] group-hover:text-white transition-all duration-500 rounded-sm">
                  <Zap size={24} strokeWidth={1.5} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#001A3D] display-font tracking-tight">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">{item.description}</p>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-7 bg-white p-10 md:p-14 shadow-2xl border border-gray-100 rounded-sm">
              <h2 className="text-3xl font-bold text-[#001A3D] display-font mb-10">Share Your Industrial Project With Us</h2>
              <InlineContactForm textareaPlaceholder="Message" category="Industries" />
            </div>
            <div className="lg:col-span-5 space-y-12 py-8">
              <h2 className="text-3xl font-bold text-[#001A3D] display-font">What Is The Next Step?</h2>
              <div className="space-y-10">
                {[
                  { icon: MessageSquare, text: "An industrial technology consultant will review your request and contact you within a few business hours." },
                  { icon: FileText, text: "We will schedule a deep-dive session to understand your factory workflow and integration needs." },
                  { icon: Sparkles, text: "You will receive a detailed proposal including technical architecture and industrial ROI analysis." }
                ].map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={i} className="flex items-start gap-8 group">
                      <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center text-[#0171c1] group-hover:bg-[#0171c1] group-hover:text-white group-hover:border-[#0171c1] transition-all duration-500 shrink-0">
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      <p className="text-gray-500 font-medium leading-relaxed text-lg pt-2">{step.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font tracking-tight">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-[#0171c1] mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto divide-y divide-gray-100">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Resource Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="flex justify-between items-end mb-16 gap-8">
            <div className="space-y-6 max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Industrial Insights & Articles</h2>
              <p className="text-lg text-gray-500 font-medium">
                Explore our latest thinking on manufacturing technology and Industry 4.0 trends.
              </p>
            </div>
            <Link href="/resources" className="hidden md:flex items-center gap-2 text-[11px] font-bold text-[#0171c1] uppercase tracking-widest hover:gap-4 transition-all pb-2">
              View All Resources <MoveRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {BLOG_POSTS.map((post, i) => (
              <div key={i} className="bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <ImageWithFallback 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#0171c1] text-white text-[9px] font-bold px-3 py-1 uppercase tracking-widest rounded-sm">Manufacturing</span>
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="text-xl font-bold text-[#001A3D] display-font group-hover:text-[#0171c1] transition-colors line-clamp-2 leading-tight min-h-[3.5rem]">{post.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 font-medium">{post.description}</p>
                  <div className="pt-4 border-t border-gray-50">
                    <Link href="/resources" className="inline-flex items-center gap-2 text-[10px] font-bold text-[#001A3D] uppercase tracking-widest hover:text-[#0171c1] transition-colors">
                      Read Article <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center md:hidden">
            <Link href="/resources" className="inline-flex items-center gap-3 bg-[#0171c1] text-white px-10 py-5 font-bold uppercase tracking-wider text-[11px] shadow-xl rounded-sm">
              Explore Resources <MoveRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
