"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { 
  Code2, 
  Settings, 
  ShieldCheck, 
  RefreshCw, 
  Monitor, 
  Database, 
  Zap, 
  MoveRight,
  Layout,
  Layers,
  Wrench,
  Clock
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

const ADM_SERVICES = [
  {
    title: "Custom Application Development",
    icon: <Code2 className="w-8 h-8 text-[#0171c1]" />,
    desc: "End-to-end development of scalable, high-performance web and mobile applications using modern frameworks and cloud-native architectures."
  },
  {
    title: "Application Maintenance & Support",
    icon: <Settings className="w-8 h-8 text-[#0171c1]" />,
    desc: "Ensuring 24/7 reliability through proactive monitoring, bug fixes, performance tuning, and continuous updates for legacy and modern apps."
  },
  {
    title: "Legacy Modernization",
    icon: <RefreshCw className="w-8 h-8 text-[#0171c1]" />,
    desc: "Transforming outdated monolithic systems into microservices-based, cloud-ready architectures to improve agility and reduce technical debt."
  }
];

const ADM_CAPABILITIES = [
  {
    title: "UI/UX Design & Prototyping",
    icon: <Layout className="w-6 h-6 text-[#0171c1]" />,
    desc: "User-centric design focused on intuitive navigation and seamless experiences across all devices and platforms."
  },
  {
    title: "API Integration & Middleware",
    icon: <Layers className="w-6 h-6 text-[#0171c1]" />,
    desc: "Connecting disparate systems through robust API layers and enterprise service buses for unified data flow."
  },
  {
    title: "Application Testing & QA",
    icon: <ShieldCheck className="w-6 h-6 text-[#0171c1]" />,
    desc: "Comprehensive automated and manual testing to ensure zero-defect delivery and superior user satisfaction."
  },
  {
    title: "DevSecOps & CI/CD",
    icon: <Zap className="w-6 h-6 text-[#0171c1]" />,
    desc: "Integrating security and automation into the development lifecycle for faster, safer, and more reliable deployments."
  }
];

export default function AppDevMaintenance() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta 
        title="Development and Maintenance | Hutech Solutions"
        description="Full-cycle application development and maintenance services. We build, manage, and modernize enterprise software to drive business growth."
      />
      <Breadcrumbs variant="light" />
      
      {/* Hero Section */}
      <section className="bg-[#001A3D] text-white h-[450px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1632910121591-29e2484c0259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Software Development Team"
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
              <span className="text-[#FFAF2B] font-bold uppercase tracking-[0.3em] text-[10px]">App Lifecycle Management</span>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight display-font mb-8">
              Development <br />
              <span className="text-[#FFAF2B]">and Maintenance.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed">
              From initial concept to long-term support, we manage the entire application lifecycle, ensuring your software remains competitive, secure, and resilient.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Strategic Value Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font leading-tight">
                Driving Business <br />
                <span className="text-[#0171c1]">Agility through ADM.</span>
              </h2>
              <div className="w-20 h-1 bg-[#0171c1]"></div>
              <p className="text-lg text-gray-500 font-medium leading-relaxed">
                In a rapidly evolving digital landscape, your applications must do more than just function—they must innovate. Our Development and Maintenance services focus on reducing operational costs while accelerating time-to-market.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {[
                   { title: "Zero Downtime", icon: <Clock className="w-5 h-5" /> },
                   { title: "Cloud-First Approach", icon: <Monitor className="w-5 h-5" /> },
                   { title: "Continuous Optimization", icon: <Wrench className="w-5 h-5" /> },
                   { title: "Security by Design", icon: <ShieldCheck className="w-5 h-5" /> }
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3">
                      <div className="text-[#0171c1]">{item.icon}</div>
                      <span className="text-gray-700 font-bold text-sm tracking-wide uppercase">{item.title}</span>
                   </div>
                 ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gray-50 rounded-[3rem] p-12 border border-gray-100 relative z-10 overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#0171c1]/5 rounded-full -mr-16 -mt-16"></div>
                 <h3 className="text-2xl font-bold text-[#001A3D] display-font mb-6">Our ADM Methodology</h3>
                 <div className="space-y-8">
                    {[
                      { step: "01", title: "Analyze & Assess", desc: "Understanding current application health and business gaps." },
                      { step: "02", title: "Develop & Integrate", desc: "Building feature-rich solutions with seamless connectivity." },
                      { step: "03", title: "Manage & Optimize", desc: "Continuous monitoring and proactive performance enhancements." }
                    ].map((m, i) => (
                      <div key={i} className="flex gap-6">
                         <span className="text-4xl font-bold text-[#0171c1]/20 display-font">{m.step}</span>
                         <div>
                            <h4 className="font-bold text-[#001A3D] mb-1">{m.title}</h4>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">{m.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-6">
             <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Core Service Offerings</h2>
             <p className="text-lg text-gray-500 max-w-3xl mx-auto font-medium">
                Comprehensive application management designed to keep your digital heartbeat strong and responsive.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ADM_SERVICES.map((item, i) => (
              <Motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-12 rounded-[2.5rem] bg-white border border-gray-100 space-y-8 hover:shadow-2xl transition-all group h-full shadow-sm"
              >
                <div className="p-4 bg-gray-50 rounded-2xl w-fit shadow-sm group-hover:bg-[#0171c1] group-hover:text-white transition-all duration-500">{item.icon}</div>
                <h3 className="text-2xl font-bold text-[#001A3D] display-font leading-tight">{item.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed text-sm">{item.desc}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ADM_CAPABILITIES.map((item, i) => (
              <div key={i} className="space-y-6 p-8 border border-gray-50 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="shrink-0 p-3 bg-[#0171c1]/5 rounded-lg w-fit group-hover:bg-[#0171c1] group-hover:text-white transition-colors">{item.icon}</div>
                <h4 className="font-bold text-[#001A3D] text-lg display-font">{item.title}</h4>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Tiers Banner */}
      <section className="py-24 bg-[#001A3D] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0171c1]/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
             <div className="max-w-3xl space-y-6 text-center lg:text-left">
                <h2 className="text-3xl md:text-5xl font-bold display-font">Modernize your legacy <span className="text-[#0171c1]">Systems.</span></h2>
                <p className="text-lg text-gray-400 font-medium">Our maintenance services include deep refactoring and cloud migration paths to ensure your older apps run as efficiently as the newest ones.</p>
             </div>
             <div className="shrink-0">
               <Link 
                href="/contact" 
                className="inline-flex items-center gap-3 bg-[#0171c1] text-white px-12 py-5 font-bold uppercase tracking-wider text-[11px] hover:bg-white hover:text-[#001A3D] transition-all duration-500 rounded-sm shadow-xl"
              >
                Inquire About ADM <MoveRight className="w-4 h-4" />
              </Link>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
