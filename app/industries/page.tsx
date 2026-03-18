"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Activity, Landmark, Lightbulb, Truck, MoveRight, ShieldCheck, Zap, Globe2, Factory, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Meta } from "@/components/Meta";

const INDUSTRIES_DATA = [
  {
    name: "Banking & Financial Services",
    path: "/industries/banking-finance",
    icon: <Landmark className="w-12 h-12 text-[#FFAF2B]" />,
    desc: "Next-gen fintech architectures, secure payment gateways, and AI-driven fraud detection for the world's leading banks.",
    image: "https://images.unsplash.com/photo-1590649681928-4b179f773bd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stats: ["99.9% Uptime", "PCI DSS Compliant", "AI Risk Engines"]
  },
  {
    name: "Healthcare & Life Sciences",
    path: "/industries/healthcare-life-sciences",
    icon: <Activity className="w-12 h-12 text-[#FFAF2B]" />,
    desc: "Patient-centric ecosystems, HIPAA-compliant cloud storage, and predictive analytics for personalized medicine.",
    image: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stats: ["Precision Tech", "Secure Data", "Patient Portals"]
  },
  {
    name: "Utilities & Energy",
    path: "/industries/utilities-energy",
    icon: <Lightbulb className="w-12 h-12 text-[#FFAF2B]" />,
    desc: "Smart grid optimization, renewable energy management platforms, and real-time operational monitoring.",
    image: "https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stats: ["Grid Intelligence", "Green Energy", "Edge Computing"]
  },
  {
    name: "Logistics & Supply Chain",
    path: "/industries/logistics-supply-chain",
    icon: <Truck className="w-12 h-12 text-[#FFAF2B]" />,
    desc: "Automated warehouse management, AI routing optimization, and blockchain-based tracking for global shipping.",
    image: "https://images.unsplash.com/photo-1644134913822-1cd030b3d148?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stats: ["Real-time Tracking", "Smart Warehousing", "Route AI"]
  },
  {
    name: "Manufacturing",
    path: "/industries/manufacturing",
    icon: <Factory className="w-12 h-12 text-[#FFAF2B]" />,
    desc: "Industry 4.0 transformation, AI-driven quality control, and predictive maintenance for smart factory excellence.",
    image: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stats: ["IIoT Integrated", "OEE Optimized", "Predictive Tech"]
  },
  {
    name: "Retail & Consumer",
    path: "/industries/retail-consumer",
    icon: <ShoppingBag className="w-12 h-12 text-[#FFAF2B]" />,
    desc: "Omnichannel commerce, hyper-personalization, and smart retail tech that builds lasting customer loyalty.",
    image: "https://images.unsplash.com/photo-1764795849878-59b546cfe9c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stats: ["Seamless UX", "AI Personalization", "Real-time Stock"]
  }
];

export default function Industries() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta 
        title="Expertise Across Industries | Hutech Solutions"
        description="Engineering excellence across Banking, Healthcare, Utilities, Logistics, and more. Vertical-specific technology solutions for global impact."
      />
      <Breadcrumbs variant="light" />
      
      {/* Page Header */}
      <section className="bg-[#001A3D] text-white h-[450px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 opacity-10">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,#FFAF2B_0%,transparent_70%)] opacity-20"></div>
        </div>
        
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10 w-full text-left">
          <Motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl space-y-8"
          >
            <div className="flex items-center space-x-3">
              <span className="w-12 h-[1px] bg-[#FFAF2B]"></span>
              <span className="text-[#FFAF2B] font-semibold tracking-wide text-xs">Industry Verticals</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-semibold leading-[1.05] tracking-tight display-font">
              Domain Expertise. <br />
              <span className="text-[#FFAF2B]">Universal Impact.</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl font-medium">
              We specialize in vertical-specific technology solutions that address the unique complexities and compliance requirements of global markets.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Industries Alternate Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 space-y-48">
           {INDUSTRIES_DATA.map((ind, idx) => (
             <div key={ind.name} className={`flex flex-col lg:flex-row items-center gap-24 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <Motion.div 
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex-1 space-y-10"
                >
                   <div className="p-5 bg-gray-50 rounded-2xl w-fit shadow-sm border border-gray-100">{ind.icon}</div>
                   <div className="space-y-4">
                     <h2 className="text-4xl md:text-5xl font-semibold text-[#001A3D] leading-tight tracking-tight display-font">{ind.name}</h2>
                     <p className="text-lg text-gray-500 leading-relaxed font-medium">{ind.desc}</p>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {ind.stats.map((stat) => (
                        <div key={stat} className="flex items-center space-x-2 text-[#001A3D] font-semibold text-[11px] tracking-wide py-3 px-4 bg-gray-50 rounded-lg border border-gray-100">
                           <ShieldCheck className="w-4 h-4 text-[#FFAF2B]" />
                           <span>{stat}</span>
                        </div>
                      ))}
                   </div>

                   <ul className="space-y-6 pt-4">
                      {['Strategic Transformation', 'Domain Consulting', 'Operational Efficiency'].map((item) => (
                        <li key={item} className="flex items-center text-gray-400 font-semibold group cursor-pointer text-sm tracking-wide">
                           <span className="w-8 h-[1.5px] bg-[#FFAF2B] mr-4 group-hover:w-14 transition-all duration-500"></span>
                           <span className="group-hover:text-[#001A3D] transition-colors">{item}</span>
                        </li>
                      ))}
                   </ul>

                   <div className="pt-6">
                     <Link href={ind.path} className="inline-flex bg-[#001A3D] hover:bg-[#0171c1] text-white font-bold py-5 px-10 rounded-sm transition-all shadow-2xl shadow-[#001A3D]/20 tracking-wide text-xs items-center group">
                        Explore {ind.name.split(' ')[0]} Solutions
                        <MoveRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                     </Link>
                   </div>
                </Motion.div>

                <Motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   className="flex-1 relative"
                >
                   <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative group border-[12px] border-white z-10">
                      <ImageWithFallback
                        src={ind.image}
                        alt={ind.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-[#001A3D]/10 mix-blend-overlay"></div>
                   </div>
                   <div className={`absolute -top-10 ${idx % 2 === 0 ? '-right-10' : '-left-10'} w-48 h-48 bg-[#FFAF2B]/10 rounded-full blur-3xl -z-10`}></div>
                   <div className={`absolute -bottom-10 ${idx % 2 === 0 ? '-left-10' : '-right-10'} w-64 h-64 bg-[#001A3D]/5 rounded-full blur-3xl -z-10`}></div>
                </Motion.div>
             </div>
           ))}
        </div>
      </section>
      {/* Expertise Section */}
      <section className="py-20 bg-gray-50 border-y border-gray-100 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
            <div className="lg:col-span-1 space-y-8">
               <h2 className="text-4xl font-semibold text-[#001A3D] leading-tight tracking-tight display-font">Beyond the <br /> Standard Verticals.</h2>
               <p className="text-gray-500 font-medium">Our engineering principles are universal. We apply the same level of precision and security across any industry that demands digital leadership.</p>
               <button className="text-[#001A3D] font-semibold tracking-wide text-xs group flex items-center">
                  Learn about our methodology <MoveRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
               </button>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
               {[
                 { title: "Retail & Commerce", icon: <Zap className="w-8 h-8 text-[#FFAF2B]" /> },
                 { title: "Manufacturing 4.0", icon: <Globe2 className="w-8 h-8 text-[#FFAF2B]" /> },
                 { title: "EdTech Platforms", icon: <ShieldCheck className="w-8 h-8 text-[#FFAF2B]" /> },
                 { title: "Public Sector", icon: <Landmark className="w-8 h-8 text-[#FFAF2B]" /> }
               ].map((item, i) => (
                 <div key={i} className="p-10 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                    <div className="mb-6">{item.icon}</div>
                    <h4 className="text-xl font-semibold text-[#001A3D] tracking-tight group-hover:text-[#FFAF2B] transition-colors display-font">{item.title}</h4>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#001A3D] text-white relative overflow-hidden">
         <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-12">
            <h2 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight display-font">Scale Your Industry <br /> Dominance Today.</h2>
            <div className="flex flex-wrap justify-center gap-6">
               <button className="bg-[#FFAF2B] hover:bg-[#ff9d00] text-[#001A3D] font-bold py-6 px-12 rounded-sm text-sm tracking-wide shadow-2xl transition-all">
                 Request Consultation
               </button>
               <Link href="/contact" className="bg-white/5 hover:bg-white/10 text-white font-bold py-6 px-12 border border-white/10 rounded-sm text-sm tracking-wide transition-all">
                 Global Offices
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
}
