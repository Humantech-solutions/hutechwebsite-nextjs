"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CaseUpper, Filter, ArrowUpRight, CheckCircle2, MoveRight, Search, X } from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

const CASE_STUDIES = [
  {
    title: "Building a Scalable Shopify Fashion Storefront",
    client: "Global Fashion Brand Storefront on Shopify",
    impact: "Seamless Data Validation & Brand-Consistent Design",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    tags: ["Shopify", "Ecommerce", "Fashion"],
    category: "Ecommerce",
    slug: "shopify-fashion-storefront"
  },
  {
    title: "Hutrac: Next-Gen GPS Fleet Solutions",
    client: "Smarter tracking for smarter decisions",
    impact: "Live GPS Tracking & Sensor-Driven Insights",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    tags: ["Angular", "React JS", "AWS", "AI & Analytics"],
    category: "IoT & AI",
    slug: "hutrac-gps-fleet"
  },
  {
    title: "IOT - FLEET MANAGEMENT",
    client: "Cold Chain Supply Operations",
    impact: "Effective IoT solutions for Cold Chain Operations",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    tags: ["React Js", "Flutter", "AWS", "Mongo DB"],
    category: "Logistics",
    slug: "iot-fleet-management"
  },
  {
    title: "Truck Link",
    client: "Carrying & Forwarding (C&F) Application",
    impact: "SaaS-based delivery management with optimized routes",
    image: "https://images.unsplash.com/photo-1590243677390-21377b28f3ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    tags: ["Node JS", "React JS", "Mongo DB", "AWS", "AntD"],
    category: "Logistics",
    slug: "truck-link"
  },
  {
    title: "Engage Loop",
    client: "REWARDS AND RECOGNITION PLATFORM",
    impact: "Seamless, simplified and customizable engagement",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    tags: ["Node JS", "React JS", "AWS", "Mongo DB"],
    category: "Product",
    slug: "engage-loop"
  },
  {
    title: "LOGISTICS, COURIER & SUPPLY CHAIN SOLUTION",
    client: "COURIER & LOGISTICS APPLICATION",
    impact: "Routing, dispatch, tracking, and proof of delivery",
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    tags: ["Python", "MySQL", "AWS", "Cognito", "GPT"],
    category: "Logistics",
    slug: "logistics-courier-supply-chain"
  },
  {
    title: "Max Drive",
    client: "Driving Innovation with End-to-End Fleet Solutions",
    impact: "Real-time monitoring and vehicle traceability",
    image: "https://images.unsplash.com/photo-1580674271209-40b48e153ff7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    tags: ["Flutter", "Node JS", "AWS", "Mongo DB"],
    category: "IoT & AI",
    slug: "max-drive"
  },
  {
    title: "D2C Platform",
    client: "D2C (Direct-to-Consumer) ecommerce platform",
    impact: "Streamlined operations from listing to fulfillment",
    image: "https://images.unsplash.com/photo-1556742049-13ad733d024c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    tags: ["Python", "NextJs", "PostgreSQL", "AWS"],
    category: "Ecommerce",
    slug: "d2c-platform"
  }
];

const CATEGORIES = ["All", "Ecommerce", "Logistics", "IoT & AI", "Product"];

export default function CaseStudies() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudies = CASE_STUDIES.filter(study => {
    const matchesTab = activeTab === "All" || study.category === activeTab;
    const matchesSearch = study.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         study.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         study.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex flex-col bg-white min-h-screen overflow-hidden">
      <Meta title="Case Studies | Hutech Solutions" description="Real-world examples of how Hutech Solutions drives digital transformation." />
      <Breadcrumbs variant="light" />
      
      {/* Hero Section */}
      <section className="bg-[#001A3D] text-white py-32 relative overflow-hidden flex items-center">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10 w-full">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <span className="block w-8 h-[2px] bg-[#FFAF2B]"></span>
              <span className="text-[#FFAF2B] text-xs font-semibold tracking-widest uppercase">Global Impact</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-semibold mb-6 display-font leading-tight tracking-tight">
              Digital <br /><span className="text-[#FFAF2B]">Success Stories.</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed font-medium">
              Discover how we've partnered with industry leaders to solve complex challenges and achieve measurable results through technological excellence.
            </p>
          </Motion.div>
        </div>
        <div className="absolute right-0 top-0 w-1/2 h-full bg-linear-to-l from-[#0171c1]/10 to-transparent pointer-events-none"></div>
      </section>

      {/* Sticky Search & Filter Bar */}
      <section className="sticky top-[72px] z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 py-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-black tracking-[0.2em] transition-all whitespace-nowrap uppercase ${
                  activeTab === cat 
                  ? "bg-[#0171c1] text-white shadow-xl" 
                  : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-[#001A3D]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0171c1] transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search case studies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0171c1]/20 transition-all shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-24 bg-gray-50/30">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <AnimatePresence mode="popLayout">
            {filteredStudies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                {filteredStudies.map((study, i) => (
                  <Motion.div 
                    key={study.slug}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group bg-gray-50 rounded-[2.5rem] overflow-hidden hover:bg-[#001A3D] transition-all duration-500 h-full flex flex-col"
                  >
                    <Link href={`/resources/case-studies/${study.slug}`} className="flex flex-col h-full">
                      <div className="relative h-96 overflow-hidden">
                        <ImageWithFallback src={study.image} alt={study.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D] via-[#001A3D]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>
                        <div className="absolute bottom-10 left-10 flex flex-wrap gap-2 pr-6">
                          {study.tags.map((tag, j) => (
                            <span key={j} className="px-4 py-1.5 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold rounded-full uppercase tracking-widest border border-white/20">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-10 lg:p-12 flex-grow flex flex-col justify-between space-y-8">
                        <div className="space-y-4">
                           <span className="text-[#FFAF2B] font-bold text-sm tracking-widest uppercase block">{study.client}</span>
                           <h3 className="text-2xl md:text-3xl font-bold text-[#001A3D] group-hover:text-white display-font transition-colors leading-tight">{study.title}</h3>
                        </div>
                        <div className="flex items-center justify-between pt-8 border-t border-gray-200 group-hover:border-white/20 mt-auto">
                          <div className="flex items-center gap-3">
                             <CheckCircle2 size={24} className="text-[#FFAF2B]" />
                             <span className="text-[#001A3D] group-hover:text-white font-bold text-lg leading-snug">{study.impact}</span>
                          </div>
                          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#001A3D] group-hover:bg-[#FFAF2B] group-hover:text-[#001A3D] transition-all transform group-hover:rotate-45 shadow-sm">
                            <ArrowUpRight size={28} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-40 bg-white rounded-[4rem] shadow-sm border border-gray-100">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Search size={40} className="text-gray-200" />
                </div>
                <h3 className="text-3xl font-bold text-[#001A3D] mb-4 display-font">No case studies found</h3>
                <p className="text-gray-500 max-w-sm mx-auto font-medium mb-10">We couldn't find any success stories matching your requirements. Try adjusting your search or filters.</p>
                <button 
                  onClick={() => {setActiveTab("All"); setSearchQuery("");}}
                  className="text-[#0171c1] font-black text-xs uppercase tracking-widest hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Bottom CTA */}
      {/* <section className="py-32 bg-[#FAF9F6] border-t border-gray-100">
         <div className="max-w-[1280px] mx-auto px-6 lg:px-20 text-center space-y-12">
            <h2 className="text-5xl md:text-7xl font-bold text-[#001A3D] display-font tracking-tight leading-tight">Ready to start your <br /><span className="text-[#0171c1]">own success story?</span></h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">Join our network of industry leaders who have transformed their operations with Hutech Solutions.</p>
            <div className="flex flex-wrap justify-center gap-6">
               <Link href="/contact" className="px-12 py-6 bg-[#001A3D] text-white font-black uppercase tracking-[0.2em] text-xs h-16 flex items-center hover:bg-[#0171c1] transition-all shadow-xl rounded-sm">
                  WORK WITH US <MoveRight className="ml-4" size={20} />
               </Link>
               <Link href="/company/awards" className="px-12 py-6 bg-white border border-gray-200 text-[#001A3D] font-black uppercase tracking-[0.2em] text-xs h-16 flex items-center hover:bg-gray-50 transition-all shadow-sm rounded-sm">
                  OUR AWARDS
               </Link>
            </div>
         </div>
      </section> */}
    </div>
  );
}
