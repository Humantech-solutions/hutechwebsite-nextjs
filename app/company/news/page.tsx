"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Newspaper, Calendar, ArrowRight, Clock, Tag } from "lucide-react";
import { Meta } from "@/components/Meta";
import Link from "next/link";

export default function News() {
  const newsItems = [
    { 
      id: "top-global-tech-firms-2025",
      title: "Hutech Solutions Ranked Among Top Global Tech Firms", 
      date: "Oct 12, 2025", 
      category: "Corporate",
      readTime: "6 min read",
      desc: "Our commitment to engineering excellence and rapid expansion across international markets recognized by the Global Tech Index."
    },
    { 
      id: "london-expansion-growth",
      title: "Expanding Global Reach: New Office in London", 
      date: "Sep 28, 2025", 
      category: "Growth",
      readTime: "4 min read",
      desc: "Strategic EMEA headquarters opened in London's financial district to support our expanding Fintech and Cybersecurity practices."
    },
    { 
      id: "innovating-ai-framework",
      title: "Innovating with AI: Hutech's New ML Framework", 
      date: "Aug 15, 2025", 
      category: "Technology",
      readTime: "8 min read",
      desc: "Launching 'Hutech Vision ML' - a revolutionary framework designed for real-time edge computing in industrial automation."
    }
  ];

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta 
        title="In The News | Hutech Solutions"
        description="Stay updated with the latest news, events, and milestones from Hutech Solutions."
      />
      <Breadcrumbs variant="light" />
      <section className="bg-[#001A3D] text-white h-[450px] relative flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1583737177755-74c167f871eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920" 
            alt="Corporate News" 
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
              <span className="text-[#FFAF2B] font-bold uppercase tracking-[0.3em] text-[10px]">Corporate Insights</span>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight display-font mb-8">
              In The <br /> 
              <span className="text-[#FFAF2B]">News.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed">
              Keeping you updated with our latest milestones, global expansions, and industry-defining engineering breakthroughs.
            </p>
          </Motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-12">
            {newsItems.map((item, i) => (
              <Motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col md:flex-row gap-12 p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl hover:border-[#0171c1]/20 transition-all duration-500"
              >
                <div className="flex-1 space-y-6">
                  <div className="flex flex-wrap items-center gap-6">
                    <span className="px-4 py-1.5 bg-[#FFAF2B]/10 text-[#FFAF2B] text-[10px] font-black uppercase tracking-widest rounded-full border border-[#FFAF2B]/20">
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-400 font-bold flex items-center gap-2 uppercase tracking-widest">
                      <Calendar size={14} className="text-[#0171c1]" /> {item.date}
                    </span>
                    <span className="text-xs text-gray-400 font-bold flex items-center gap-2 uppercase tracking-widest">
                      <Clock size={14} className="text-[#0171c1]" /> {item.readTime}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-4xl font-bold text-[#001A3D] display-font group-hover:text-[#0171c1] transition-colors leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-3xl">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center gap-8">
                    <Link 
                      href={`/company/news/${item.id}`} 
                      className="inline-flex items-center gap-3 text-[#001A3D] font-black uppercase tracking-widest text-[11px] border-b-2 border-[#FFAF2B] pb-1 hover:gap-6 transition-all"
                    >
                      Read Full Story <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Communications CTA */}
      <section className="pb-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
           <div className="bg-[#001A3D] rounded-[3rem] p-12 md:p-20 text-center space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0171c1]/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
              <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
                 <h2 className="text-3xl md:text-5xl font-bold text-white display-font">Media Inquiries</h2>
                 <p className="text-lg text-white/50 font-medium leading-relaxed">
                    For press kits, high-resolution imagery, or executive interview requests, please contact our global communications office.
                 </p>
                 <div className="pt-6">
                    <Link 
                      href="/contact" 
                      className="inline-flex px-12 py-5 bg-[#0171c1] text-white font-black uppercase tracking-widest text-[11px] hover:bg-white hover:text-[#001A3D] transition-all duration-500 rounded-sm text-center"
                    >
                      Contact Press Team
                    </Link>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
