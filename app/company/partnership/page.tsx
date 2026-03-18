"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Handshake, Globe2, Zap, ShieldCheck, CheckCircle2, ArrowRight, Server, Cloud, Database, Cpu, MessageSquare, Briefcase } from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

const PARTNER_CATEGORIES = [
  {
    title: "Cloud & Infrastructure",
    description: "Empowering businesses with scalable, secure, and high-performance cloud ecosystems.",
    icon: Cloud,
    partners: ["AWS", "Microsoft Azure", "Google Cloud", "IBM Cloud", "DigitalOcean"]
  },
  {
    title: "Enterprise Solutions",
    description: "Driving operational excellence through world-class ERP and CRM integrations.",
    icon: Briefcase,
    partners: ["ServiceNow", "SAP", "Oracle", "Microsoft Dynamics", "Salesforce"]
  },
  {
    title: "Data & Intelligence",
    description: "Unlocking actionable insights with advanced analytics and AI-driven platforms.",
    icon: Database,
    partners: ["Snowflake", "Databricks", "Tableau", "Power BI", "Cloudera"]
  }
];

const BENEFITS = [
  {
    title: "Global Delivery Capabilities",
    description: "Access our worldwide network of development centers and domain experts.",
    icon: Globe2
  },
  {
    title: "Co-Innovation Programs",
    description: "Work with our R&D teams to build next-generation prototypes and POCs.",
    icon: Zap
  },
  {
    title: "Strategic Go-to-Market",
    description: "Joint marketing and sales initiatives to accelerate market penetration.",
    icon: Handshake
  },
  {
    title: "Governance & Compliance",
    description: "Rigorous security standards and multi-region regulatory compliance.",
    icon: ShieldCheck
  }
];

const LOGO_PARTNERS = [
  { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { name: "Google Cloud", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" },
  { name: "Microsoft Azure", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg" },
  { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name: "ServiceNow", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d4/ServiceNow_logo.svg" },
  { name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
  { name: "Snowflake", logo: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Snowflake_Logo.svg" },
  { name: "SAP", logo: "https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg" },
];

export default function Partnership() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta 
        title="Partnership | Hutech Solutions"
        description="Collaborate with Hutech Solutions. We build strategic partnerships with global technology leaders to drive mutual growth and innovation."
      />
      
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="bg-[#001A3D] text-white h-[450px] relative flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1591453214154-c95db71dbd83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280" 
            alt="Strategic Partnerships" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/80 to-transparent"></div>
        </div>
        
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10 text-left w-full">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[1px] bg-[#FFAF2B]"></span>
              <span className="text-[#FFAF2B] font-bold uppercase tracking-[0.3em] text-[10px]">Ecosystem of Excellence</span>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight display-font mb-8">
              Strategic <br /> 
              <span className="text-[#FFAF2B]">Technology Alliances.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed">
              We collaborate with the world's leading technology providers to architect, implement, and manage comprehensive digital solutions that empower global enterprises.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <Motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-6xl font-semibold text-[#001A3D] display-font leading-tight">
                Architecting <br /> <span className="text-[#0171c1]">Shared Success.</span>
              </h2>
              <p className="text-lg text-gray-600 font-medium leading-relaxed">
                At Hutech Solutions, our partnership philosophy is built on mutual growth, shared innovation, and a commitment to delivering exceptional value. We don't just use technology; we build strategic bridges between platforms and business goals.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {[
                  "Accelerated Time-to-Market",
                  "Access to Specialized Labs",
                  "Joint Product Engineering",
                  "Global Scaling Support"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-[#0171c1]" />
                    <span className="font-bold text-[#001A3D] text-sm uppercase tracking-wide">{item}</span>
                  </div>
                ))}
              </div>
            </Motion.div>
            
            <Motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1610702876884-0f8473590287?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                  alt="Team Collaboration" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#0171c1]/10 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#001A3D]/5 rounded-full blur-3xl -z-10"></div>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Partner Ecosystem</h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium">Our alliance network spans across multiple technology domains and industry verticals.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PARTNER_CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
                >
                  <div className="w-16 h-16 bg-[#0171c1]/5 rounded-sm flex items-center justify-center text-[#0171c1] mb-8 group-hover:bg-[#0171c1] group-hover:text-white transition-colors duration-500">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#001A3D] mb-4 display-font">{cat.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8">{cat.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {cat.partners.map((p, j) => (
                      <span key={j} className="px-3 py-1 bg-gray-100 text-[#001A3D] text-[10px] font-bold uppercase tracking-widest rounded-full">{p}</span>
                    ))}
                  </div>
                </Motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Logo Grid */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-12 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
            {LOGO_PARTNERS.map((logo, i) => (
              <div key={i} className="flex justify-center p-4">
                 <img src={logo.logo} alt={logo.name} className="h-10 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-[#001A3D] text-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-semibold display-font mb-12">Value of <span className="text-[#0171c1]">Association.</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {BENEFITS.map((benefit, i) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={i} className="space-y-4">
                      <div className="w-12 h-12 rounded-full border border-[#0171c1]/30 flex items-center justify-center text-[#0171c1]">
                        <Icon size={20} />
                      </div>
                      <h4 className="text-xl font-bold display-font">{benefit.title}</h4>
                      <p className="text-white/60 text-sm leading-relaxed">{benefit.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                alt="Cloud Infrastructure" 
                className="w-full h-full object-cover rounded-[3rem] opacity-80"
              />
              <div className="absolute inset-0 bg-[#001A3D]/20 rounded-[3rem]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Form Section */}
      <section className="py-32 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="bg-gray-50 p-12 lg:p-24 rounded-[4rem] border border-gray-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-[#0171c1]/5 blur-[100px] rounded-full"></div>
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start relative z-10">
                <div className="space-y-8">
                  <h2 className="text-4xl md:text-6xl font-semibold text-[#001A3D] display-font leading-tight">Become a <br /> <span className="text-[#0171c1]">Strategic Partner.</span></h2>
                  <p className="text-lg text-gray-500 font-medium">
                    Are you ready to redefine industry standards? Join our ecosystem and leverage our global reach and engineering excellence to scale your business.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-6 bg-white shadow-sm border border-gray-100">
                       <div className="w-12 h-12 bg-[#0171c1] text-white flex items-center justify-center rounded-sm">
                          <MessageSquare size={20} />
                       </div>
                       <div>
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Inquiry Email</p>
                          <p className="text-[#001A3D] font-bold">alliances@hutechsolutions.com</p>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-10 md:p-12 shadow-2xl border border-gray-100 rounded-2xl">
                   <h3 className="text-2xl font-bold text-[#001A3D] mb-8 display-font">Partner Registration</h3>
                   <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input type="text" placeholder="Full Name" className="w-full p-4 bg-gray-50 border-transparent focus:border-[#0171c1] focus:bg-white outline-none transition-all font-medium text-sm" />
                        <input type="text" placeholder="Company Name" className="w-full p-4 bg-gray-50 border-transparent focus:border-[#0171c1] focus:bg-white outline-none transition-all font-medium text-sm" />
                      </div>
                      <input type="email" placeholder="Business Email" className="w-full p-4 bg-gray-50 border-transparent focus:border-[#0171c1] focus:bg-white outline-none transition-all font-medium text-sm" />
                      <select className="w-full p-4 bg-gray-50 border-transparent focus:border-[#0171c1] focus:bg-white outline-none transition-all font-medium text-sm appearance-none">
                        <option value="">Select Partnership Type</option>
                        <option value="technology">Technology Partner</option>
                        <option value="solution">Solution Partner</option>
                        <option value="channel">Channel Partner</option>
                      </select>
                      <textarea placeholder="Tell us about your proposal" rows={4} className="w-full p-4 bg-gray-50 border-transparent focus:border-[#0171c1] focus:bg-white outline-none transition-all font-medium text-sm resize-none"></textarea>
                      <button className="w-full bg-[#0171c1] hover:bg-[#001A3D] text-white py-5 font-bold tracking-[0.2em] uppercase text-xs transition-all flex items-center justify-center gap-3">
                        Submit Proposal <ArrowRight size={16} />
                      </button>
                   </form>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
