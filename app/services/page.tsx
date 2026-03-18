"use client";

import { Cpu, Cloud, BarChart, Settings, ShoppingCart, Zap, ShieldCheck, Database, Globe, TrendingUp, MoveRight, Briefcase, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";

const BRAND_ORANGE = "#FFAF2B";
const BRAND_BLUE = "#001A3D";

const SERVICE_CATEGORIES = [
  {
    category: "Cloud, Data and AI",
    items: [
      {
        title: "AI/ML Solutions",
        href: "/services/ai-ml",
        icon: <Cpu className="w-8 h-8 text-[#FFAF2B]" />,
        desc: "Autonomous systems and predictive analytics."
      },
      {
        title: "Cloud Transformation",
        href: "/services/cloud-transformation",
        icon: <Cloud className="w-8 h-8 text-[#FFAF2B]" />,
        desc: "Modernizing legacy apps for the cloud."
      },
      {
        title: "SRE & DevOps Services",
        href: "/services/devops",
        icon: <Settings className="w-8 h-8 text-[#FFAF2B]" />,
        desc: "Ensuring site reliability and efficient deployment."
      },
      {
        title: "Data Engineering",
        href: "/services/data-engineering",
        icon: <Database className="w-8 h-8 text-[#FFAF2B]" />,
        desc: "Robust data pipelines and scalable warehouse architectures."
      },
      {
        title: "Data Visualization and Reporting",
        href: "/services/data-visualization-reporting",
        icon: <BarChart className="w-8 h-8 text-[#FFAF2B]" />,
        desc: "Interactive dashboards and real-time business intelligence reporting."
      }
    ]
  },
  {
    category: "Enterprise Engineering",
    items: [
      {
        title: "Enterprise Digital Solutions",
        href: "/services/enterprise-digital-solutions",
        icon: <Database className="w-8 h-8 text-[#FFAF2B]" />,
        desc: "Optimizing enterprise resource management."
      },
      {
        title: "Development and Maintenance",
        href: "/services/application-development-maintenance",
        icon: <Settings className="w-8 h-8 text-[#FFAF2B]" />,
        desc: "End-to-end application lifecycle management."
      }
    ]
  },
  {
    category: "Specialized Services",
    items: [
      {
        title: "Banking & Financial Services",
        href: "/services/fintech",
        icon: <TrendingUp className="w-8 h-8 text-[#FFAF2B]" />,
        desc: "Secure banking and payment platforms."
      },
      {
        title: "Ecommerce Development",
        href: "/services/ecommerce",
        icon: <ShoppingCart className="w-8 h-8 text-[#FFAF2B]" />,
        desc: "Scalable retail and marketplace systems."
      },
      {
        title: "Consulting Service",
        href: "/services/consulting",
        icon: <Briefcase className="w-8 h-8 text-[#FFAF2B]" />,
        desc: "Expert business and technology strategy consulting."
      },
      {
        title: "AI Consulting & Prompt Engineering",
        href: "/services/ai-consulting",
        icon: <Sparkles className="w-8 h-8 text-[#FFAF2B]" />,
        desc: "Maximize LLM potential with expert AI strategy and advanced prompt design."
      },
      {
        title: "IOT (Internet of Things)",
        href: "/services/iot",
        icon: <Zap className="w-8 h-8 text-[#FFAF2B]" />,
        desc: "Connected ecosystems and smart hardware solutions."
      },
      {
        title: "Cybersecurity",
        href: "/services/cybersecurity",
        icon: <ShieldCheck className="w-8 h-8 text-[#FFAF2B]" />,
        desc: "Protecting your digital assets with advanced defense."
      }
    ]
  }
];

export default function Services() {
  return (
    <div className="bg-white">
      <Meta 
        title="Our Services | Hutech Solutions"
        description="Comprehensive technology services including AI/ML, Data Engineering, SRE & DevOps, and IOT solutions."
      />
      <Breadcrumbs variant="light" />
      <section className="bg-gray-50 h-[450px] border-b border-gray-200 overflow-hidden relative flex items-center">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-[#FFAF2B]/5 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 text-left relative z-10 w-full">
           <div className="max-w-5xl">
             <span className="text-[#FFAF2B] font-semibold tracking-wide text-xs">Our Expertise</span>
             <h1 className="text-5xl md:text-7xl font-semibold text-[#001A3D] mt-8 leading-[1.1] tracking-tight display-font">
               Comprehensive Technology Services for <br /><span className="text-[#FFAF2B]">Complex Businesses.</span>
             </h1>
             <p className="text-xl text-gray-500 mt-10 max-w-2xl font-medium">
               From strategic consulting to full-cycle development, we provide the technical edge needed to dominate your industry.
             </p>
           </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
           {SERVICE_CATEGORIES.map((cat, idx) => (
             <div key={cat.category} className={`mb-32 last:mb-0`}>
                <div className="flex items-center space-x-4 mb-16">
                   <div className="w-12 h-[2px] bg-[#FFAF2B]"></div>
                   <h2 className="text-sm font-semibold text-[#001A3D] tracking-wide display-font">{cat.category}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {cat.items.map((item, itemIdx) => (
                     <Link key={item.title} href={item.href}>
                       <Motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: itemIdx * 0.1 }}
                          className="p-12 rounded-[2.5rem] bg-gray-50 border border-gray-100 group hover:shadow-2xl hover:bg-white transition-all duration-500 cursor-pointer h-full"
                        >
                          <div className="mb-10 p-4 bg-white rounded-2xl w-fit shadow-sm group-hover:bg-[#FFAF2B]/10 transition-colors">{item.icon}</div>
                          <h3 className="text-2xl font-semibold text-[#001A3D] mb-6 group-hover:text-[#FFAF2B] transition-colors tracking-tight display-font">{item.title}</h3>
                          <p className="text-gray-500 leading-relaxed text-base font-medium mb-10">{item.desc}</p>
                          <div className="flex items-center text-[11px] font-semibold text-[#001A3D] tracking-wide mt-auto">
                             Learn More <MoveRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                          </div>
                       </Motion.div>
                     </Link>
                   ))}
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-[#001A3D] py-24 text-white overflow-hidden relative">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full"><circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.1" fill="none" /></svg>
         </div>
         <div className="max-w-[1280px] mx-auto px-6 lg:px-20 flex flex-col md:flex-row justify-between items-center relative z-10 gap-12">
            <div className="text-3xl font-semibold tracking-tight max-w-2xl leading-tight display-font">
               Ready to engineer your next <span className="text-[#FFAF2B]">breakthrough?</span>
            </div>
            <Link href="/contact" className="bg-[#FFAF2B] hover:bg-[#ff9d00] text-[#001A3D] px-12 py-5 rounded-sm font-bold transition-all tracking-wide text-xs shadow-xl shadow-[#FFAF2B]/20">
               Start a Project
            </Link>
         </div>
      </section>
    </div>
  );
}
