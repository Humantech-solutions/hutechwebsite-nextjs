"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, Lightbulb, Zap, Wind, Sun, Battery, Droplets, Gauge, TrendingUp, BarChart, Workflow, Cpu, Smartphone, Cloud, Lock, MessageSquare, FileText, Sparkles, MoveRight, ArrowRight, ChevronRight, Target, LayoutGrid, Search, Users, Building2, BarChart3, Globe, Radio
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

const UTILITIES_SERVICES = [
  {
    icon: Lightbulb,
    title: "Smart Grid Management",
    description: "Transform your power distribution with intelligent grid solutions. We build platforms for real-time monitoring, automated fault detection, and optimized energy flow across the entire network."
  },
  {
    icon: Battery,
    title: "Energy Storage Systems",
    description: "Optimize energy storage and management. Our custom software helps you manage large-scale battery storage, ensure grid stability, and maximize the utility of stored renewable energy."
  },
  {
    icon: Wind,
    title: "Renewable Energy Integration",
    description: "Seamlessly integrate solar, wind, and other renewable sources into your existing infrastructure with smart forecasting and balancing tools that ensure constant power supply."
  },
  {
    icon: Droplets,
    title: "Water & Waste Management",
    description: "Smart solutions for water utilities. We develop systems for leak detection, water quality monitoring, and automated billing, ensuring sustainable and efficient water distribution."
  },
  {
    icon: Gauge,
    title: "Smart Metering & Billing",
    description: "Empower customers and reduce operational costs with Advanced Metering Infrastructure (AMI). We build secure, scalable platforms for real-time usage tracking and automated billing."
  },
  {
    icon: Workflow,
    title: "Utility Process Automation",
    description: "Unlock operational efficiency by automating field service scheduling, asset maintenance, and regulatory reporting with intelligent workflows and mobile-first tools."
  }
];

const ESSENTIAL_SOLUTIONS = [
  {
    icon: Radio,
    title: "Predictive Asset Maintenance",
    description: "Leverage IoT and AI to monitor equipment health in real-time. Predict potential failures before they occur, reducing downtime and extending the lifespan of critical infrastructure."
  },
  {
    icon: Target,
    title: "Grid Stability & Resilience",
    description: "Advanced algorithms maintain the delicate balance between supply and demand, ensuring grid stability even during extreme weather events or sudden load shifts."
  },
  {
    icon: BarChart,
    title: "Energy Consumption Analytics",
    description: "Turn raw data into actionable insights. Our dashboards provide deep visibility into usage patterns, helping both utilities and customers make informed energy decisions."
  },
  {
    icon: ShieldCheck,
    title: "Regulatory Compliance",
    description: "Ensure your operations meet all local and international environmental and safety regulations with automated reporting and real-time compliance monitoring."
  },
  {
    icon: Globe,
    title: "Carbon Footprint Tracking",
    description: "Accurately measure and manage your environmental impact. We build platforms for tracking emissions and managing carbon credits across your entire energy portfolio."
  },
  {
    icon: BarChart3,
    title: "Operational Dashboards",
    description: "Gain a unified view of your entire utility ecosystem. Monitor KPIs like system uptime, line losses, and field crew productivity from a single, centralized command center."
  }
];

const INNOVATIONS = [
  {
    icon: Cpu,
    title: "AI in Energy Trading",
    description: "Maximize ROI with AI-driven energy trading platforms that predict market fluctuations and optimize buying and selling strategies in real-time."
  },
  {
    icon: Zap,
    title: "Microgrid Control Systems",
    description: "Enable decentralized energy generation and consumption with smart microgrid controllers that allow communities to operate independently of the main grid."
  },
  {
    icon: Cloud,
    title: "Cloud-Native Grid Edge",
    description: "Process data at the edge of the grid for faster response times and improved security, powered by resilient and scalable cloud-native architectures."
  },
  {
    icon: Lock,
    title: "Cybersecurity for Infrastructure",
    description: "Protect critical national infrastructure from cyber threats with robust, multi-layered security protocols designed specifically for the unique needs of utilities."
  },
  {
    icon: Smartphone,
    title: "Customer Engagement Portals",
    description: "Building modern web and mobile portals that allow customers to track their usage, pay bills, and receive outage alerts, improving overall customer satisfaction."
  },
  {
    icon: Sparkles,
    title: "Digital Twins for Utilities",
    description: "Create virtual replicas of your physical assets to simulate scenarios, optimize performance, and train field crews in a safe, risk-free digital environment."
  }
];

const WHY_CHOOSE = [
  {
    title: "Infrastructure Expertise",
    description: "We have deep experience working with large-scale utility providers, understanding the critical nature of power and water distribution systems."
  },
  {
    title: "Reliability First Approach",
    description: "We build software that is as resilient as the infrastructure it controls. Our solutions are designed for 99.99% availability and high fault tolerance."
  },
  {
    title: "Legacy System Integration",
    description: "Our experts specialize in bridging the gap between aging legacy infrastructure and modern digital platforms, ensuring a smooth transformation path."
  },
  {
    title: "Future-Ready Solutions",
    description: "We design our platforms to be modular and scalable, allowing you to easily integrate new energy sources and technologies as they emerge."
  }
];

const FAQS = [
  {
    question: "How can smart grid technology reduce operational costs?",
    answer: "Smart grids reduce costs by automating fault detection (reducing field crew dispatch time), optimizing energy distribution (reducing line losses), and enabling predictive maintenance (reducing expensive emergency repairs)."
  },
  {
    question: "Do you provide solutions for small-scale renewable providers?",
    answer: "Yes, our platforms are highly scalable and can be tailored for everything from community solar projects and local microgrids to national-scale energy distribution networks."
  },
  {
    question: "How do you handle the cybersecurity of critical energy infrastructure?",
    answer: "We implement a 'Security-by-Design' approach, featuring end-to-end encryption, strict access controls, continuous monitoring, and air-gapped backups for the most critical systems."
  },
  {
    question: "Can your platforms help with sustainability goals?",
    answer: "Absolutely. We build specialized tools for tracking carbon emissions, managing renewable energy integration, and optimizing resource usage, directly supporting your ESG and sustainability initiatives."
  },
  {
    question: "What is the typical timeline for a utility digital transformation project?",
    answer: "Timelines vary depending on the scope and complexity of existing systems, but we typically deliver initial high-value modules within 4-6 months, following an agile, phased implementation approach."
  }
];

const BLOG_POSTS = [
  {
    title: "The Role of AI in the 2026 Global Energy Transition",
    description: "As the world moves toward 100% renewables, we explore how artificial intelligence is the key to balancing a decentralized power grid...",
    image: "https://images.unsplash.com/photo-1768224656445-33d078c250b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    title: "Ensuring Grid Resilience Against Extreme Weather",
    description: "Learn how Hutech Solutions' predictive grid modeling helps utilities prepare for and recover faster from climate-driven outages...",
    image: "https://images.unsplash.com/photo-1715605569717-494ac7c5656a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    title: "Smart Water Management: Beyond Just Metering",
    description: "Discover how IoT and digital twins are helping cities manage water scarcity and infrastructure decay through proactive digital strategies...",
    image: "https://images.unsplash.com/photo-1630672607721-48e0a0187a92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
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

export default function UtilitiesEnergy() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta 
        title="Utilities & Energy Tech Solutions | Hutech Solutions"
        description="Empowering the Energy Sector with Smart, Scalable, AI-Driven Solutions. Specialized in smart grids, renewable integration, and asset management."
      />
      
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="bg-[#001A3D] text-white h-[450px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1715605569717-494ac7c5656a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Energy Transformation"
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
              <span className="text-[#FFAF2B] font-bold uppercase tracking-[0.3em] text-[10px]">Energy Excellence</span>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight display-font mb-8">
              Your Energy Vision. Our Code. <br />
              <span className="text-[#FFAF2B]">One Digital Power Revolution.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed">
              We craft intelligent utility experiences through cutting-edge software solutions and expert consulting for global energy and water providers.
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
                  Empowering Utilities & Energy with Smart, Scalable, AI-Driven Solutions
                </h2>
                <div className="w-20 h-1 bg-[#0171c1]"></div>
              </div>
              <div className="space-y-6">
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  At Hutech Solutions, we bring deep expertise in implementing, supporting, and managing integrated energy platforms. Our end-to-end solutions include system implementation, custom upgrades, performance optimization, and seamless third-party integrations.
                </p>
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  We ensure our clients can operate with agility, security, and sustainability, enabling them to expand services and integrate fresh digital solutions to meet specific infrastructure and regulatory needs.
                </p>
              </div>
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-[#001A3D] display-font">15GW+</p>
                  <p className="text-[10px] font-bold text-[#0171c1] uppercase tracking-widest">Power Managed</p>
                </div>
                <div className="w-[1px] h-12 bg-gray-200 hidden md:block"></div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-[#001A3D] display-font">200+</p>
                  <p className="text-[10px] font-bold text-[#0171c1] uppercase tracking-widest">Smart Grids</p>
                </div>
                <div className="w-[1px] h-12 bg-gray-200 hidden md:block"></div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-[#001A3D] display-font">99.9%</p>
                  <p className="text-[10px] font-bold text-[#0171c1] uppercase tracking-widest">Uptime Record</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-sm overflow-hidden shadow-2xl">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1772384388864-e965cdb1825f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                  alt="Renewable Infrastructure" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-[#0171c1] p-10 text-white space-y-4 max-w-xs shadow-2xl hidden md:block">
                <Zap size={32} strokeWidth={1.5} />
                <h3 className="text-xl font-bold display-font">Reliable Power</h3>
                <p className="text-sm font-medium opacity-80 leading-relaxed">
                  Integrating AI and cloud-native services across utility platforms to streamline tasks and enhance infrastructure resilience.
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
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Our Services in Utilities & Energy</h2>
            <p className="text-lg text-gray-500 max-w-4xl mx-auto font-medium leading-relaxed">
              At Hutech Solutions, we specialize in delivering cutting-edge software technology solutions tailored for the modern utilities and energy landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {UTILITIES_SERVICES.map((service, i) => {
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
              What Makes Custom Utility Solutions Essential for Your Business?
            </h2>
            <div className="w-20 h-1 bg-[#0171c1] mx-auto"></div>
            <p className="text-gray-400 max-w-3xl mx-auto font-medium text-lg leading-relaxed">
              In the rapidly evolving infrastructure landscape, custom software solutions are key to ensuring grid stability and operational efficiency.
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
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Which Innovations Can Transform Your Services?</h2>
            <p className="text-lg text-gray-500 font-medium max-w-3xl mx-auto leading-relaxed">
              Incorporating advanced technologies can significantly enhance your utility offerings for the modern age.
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
                  Discover Your Energy Digital Transformation Strategy With Us
                </h2>
                <div className="w-20 h-1 bg-[#0171c1]"></div>
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  Schedule a consultation with our expert EnergyTech team and take the first step towards a digital-first utility experience.
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
                  src="https://images.unsplash.com/photo-1768224656445-33d078c250b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                  alt="Energy Analytics" 
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
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Why Choose Hutech Solutions for Your Utility Project?</h2>
            <p className="text-lg text-gray-500 font-medium max-w-4xl mx-auto leading-relaxed">
              At Hutech Solutions, we specialize in delivering Utilities and Energy solutions tailored to your unique clinical needs.
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
              <h2 className="text-3xl font-bold text-[#001A3D] display-font mb-10">Share Your Utility Project With Us</h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Name*" className="w-full p-4 border border-gray-200 outline-none focus:border-[#0171c1] transition-all font-medium text-sm" />
                <input type="email" placeholder="Email*" className="w-full p-4 border border-gray-200 outline-none focus:border-[#0171c1] transition-all font-medium text-sm" />
                <input type="tel" placeholder="Phone Number*" className="w-full p-4 border border-gray-200 outline-none focus:border-[#0171c1] transition-all font-medium text-sm md:col-span-2" />
                <textarea placeholder="Tell us about your infrastructure needs" rows={4} className="w-full p-4 border border-gray-200 outline-none focus:border-[#0171c1] transition-all font-medium text-sm md:col-span-2 resize-none"></textarea>
                <div className="md:col-span-2">
                  <button type="button" className="bg-[#FFAF2B] text-[#001A3D] px-12 py-5 font-bold uppercase tracking-wider text-[11px] hover:bg-[#001A3D] hover:text-white transition-all duration-500 shadow-xl rounded-sm w-full md:w-auto">
                    Submit Project Request
                  </button>
                </div>
              </form>
            </div>
            <div className="lg:col-span-5 space-y-12 py-8">
              <h2 className="text-3xl font-bold text-[#001A3D] display-font">What Is The Next Step?</h2>
              <div className="space-y-10">
                {[
                  { icon: MessageSquare, text: "An energy technology consultant will review your request and contact you within a few business hours." },
                  { icon: FileText, text: "We will schedule a deep-dive session to understand your infrastructure and regulatory needs." },
                  { icon: Sparkles, text: "You will receive a detailed proposal including technical architecture and implementation roadmaps." }
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
              <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Energy Insights & Articles</h2>
              <p className="text-lg text-gray-500 font-medium">
                Explore our latest thinking on energy technology and digital utility trends.
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
                    <span className="bg-[#0171c1] text-white text-[9px] font-bold px-3 py-1 uppercase tracking-widest rounded-sm">EnergyTech</span>
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
        </div>
      </section>
    </div>
  );
}
