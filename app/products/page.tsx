"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Meta } from "@/components/Meta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { 
  Shield, Cloud, Database, Sparkles, Box, ExternalLink, 
  Cpu, Zap, Activity, LayoutGrid, ArrowRight, Filter, 
  Search, Eye, HardDrive, Share2, Layers, BarChart3, 
  Settings, UserCheck, Truck, CreditCard, Code, FileText,
  Volume2, Terminal, GraduationCap, Briefcase
} from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

const CATEGORIES = [
  "All Products",
  "Gen AI Products",
  "AI productivity tools",
  "DevOps & SRE Automation",
  "LMS",
  "ERP & Office Productivity",
  "Logistics and Delivery"
];

const PRODUCTS_DATA = [
  {
    id: "sentinelcore",
    title: "SentinelCore AI",
    category: "Gen AI Products",
    description: "Generative AI-driven security platform providing proactive threat hunting and automated incident response.",
    icon: <Shield className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    color: "#FFAF2B"
  },
  {
    id: "visionsense",
    title: "VisionSense Analytics",
    category: "Gen AI Products",
    description: "Industrial computer vision for real-time quality inspection and safety monitoring using generative models.",
    icon: <Eye className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    color: "#0171c1"
  },
  {
    id: "automation-forge",
    title: "Automation Forge",
    category: "AI productivity tools",
    description: "Low-code platform for building complex RPA workflows with cognitive AI.",
    icon: <Sparkles className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800",
    color: "#0171c1"
  },
  {
    id: "hutech-assist",
    title: "Hutech Assist",
    category: "AI productivity tools",
    description: "Enterprise-wide AI assistant for technical documentation and knowledge management.",
    icon: <FileText className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    color: "#FFAF2B"
  },
  {
    id: "cloudorbit",
    title: "CloudOrbit SRE",
    category: "DevOps & SRE Automation",
    description: "Automated reliability engineering platform for complex multi-cloud deployments.",
    icon: <Zap className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    color: "#FFAF2B"
  },
  {
    id: "skynode-edge",
    title: "SkyNode Edge",
    category: "DevOps & SRE Automation",
    description: "Distributed infrastructure for low-latency edge computing and local data processing.",
    icon: <HardDrive className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
    color: "#0171c1"
  },
  {
    id: "edu-nexus",
    title: "EduNexus LMS",
    category: "LMS",
    description: "Comprehensive learning management system for enterprise training and skill certification.",
    icon: <GraduationCap className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800",
    color: "#FFAF2B"
  },
  {
    id: "erp-nexus",
    title: "ERP Nexus",
    category: "ERP & Office Productivity",
    description: "Seamless integration layer for SAP, Oracle, and modern cloud applications.",
    icon: <ExternalLink className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    color: "#0171c1"
  },
  {
    id: "office-flow",
    title: "OfficeFlow",
    category: "ERP & Office Productivity",
    description: "Unified productivity suite for team collaboration and document workflow automation.",
    icon: <Briefcase className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800",
    color: "#FFAF2B"
  },
  {
    id: "supplychain-sentry",
    title: "SupplyChain Sentry",
    category: "Logistics and Delivery",
    description: "Real-time logistics optimization and risk management for global supply chains.",
    icon: <Truck className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    color: "#0171c1"
  },
  {
    id: "hutrac-gps",
    title: "HuTrac GPS",
    category: "Logistics and Delivery",
    description: "Advanced fleet tracking and route optimization for last-mile delivery services.",
    icon: <Activity className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800",
    color: "#FFAF2B"
  }
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (categoryParam && CATEGORIES.includes(categoryParam)) {
      setActiveCategory(categoryParam);
    } else {
      setActiveCategory("All Products");
    }
  }, [categoryParam]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter(product => {
      const matchesCategory = activeCategory === "All Products" || product.category === activeCategory;
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="flex flex-col bg-white">
      <Meta 
        title="Solutions Catalog | Hutech Solutions"
        description="Explore our proprietary engineering platforms across AI, Cloud, Data, and Enterprise domains."
      />
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="bg-[#001A3D] text-white h-[450px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Products Ecosystem"
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
              <span className="text-[#FFAF2B] font-bold uppercase tracking-[0.3em] text-[10px]">Engineered for Resilience</span>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight display-font mb-8">
              Our <span className="text-[#FFAF2B]">Solutions</span> Ecosystem
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed">
              Proprietary IP and enterprise-ready platforms designed to solve high-complexity engineering challenges.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-[64px] z-40 bg-white border-b border-gray-100 py-6">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-4 lg:pb-0 w-full lg:w-auto no-scrollbar">
              <Filter className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => navigate.push(`/products?category=${encodeURIComponent(cat)}`)}
                  className={`px-5 py-2.5 text-[11px] font-black uppercase tracking-widest whitespace-nowrap rounded-sm transition-all duration-300 border ${
                    activeCategory === cat 
                    ? "bg-[#001A3D] border-[#001A3D] text-white shadow-lg shadow-[#001A3D]/10" 
                    : "bg-white border-gray-100 text-gray-500 hover:border-[#0171c1] hover:text-[#0171c1]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search solutions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-3 bg-gray-50 border border-gray-100 rounded-sm focus:outline-none focus:border-[#0171c1] focus:ring-1 focus:ring-[#0171c1] transition-all text-sm font-medium"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="py-20 min-h-[600px]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, idx) => (
                  <Motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="group flex flex-col bg-white border border-gray-100 rounded-sm overflow-hidden hover:shadow-2xl hover:shadow-gray-100 transition-all duration-500"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <ImageWithFallback 
                        src={product.image} 
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <div className="bg-white/95 backdrop-blur-md p-3 rounded-sm shadow-sm text-[#001A3D] group-hover:text-[#0171c1] transition-colors">
                          {product.icon}
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                         <div className="bg-white/90 backdrop-blur-md p-3 text-[10px] font-black uppercase tracking-widest text-center text-[#0171c1] rounded-sm">
                           {product.category}
                         </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="text-xl font-semibold text-[#001A3D] mb-4 display-font group-hover:text-[#0171c1] transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">
                        {product.description}
                      </p>
                      
                      <Link 
                        href={`/products/${product.id}`}
                        className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-[#001A3D] group/btn transition-all"
                      >
                        <span>Learn More</span>
                        <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover/btn:bg-[#0171c1] group-hover/btn:border-[#0171c1] group-hover/btn:text-white transition-all">
                          <ArrowRight size={14} />
                        </div>
                      </Link>
                    </div>
                  </Motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-40">
               <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-300">
                 <Search size={32} />
               </div>
               <h3 className="text-2xl font-semibold text-[#001A3D] display-font mb-4">No matching solutions</h3>
               <p className="text-gray-500">Try adjusting your filters or search query to find what you're looking for.</p>
               <button 
                onClick={() => setActiveCategory("All Products")}
                className="mt-8 text-[#0171c1] font-bold text-sm uppercase tracking-widest"
               >
                 Clear all filters
               </button>
            </div>
          )}
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="flex flex-wrap justify-center gap-12 lg:gap-24 items-center opacity-40 grayscale">
            <div className="font-black uppercase tracking-[0.2em] text-[#001A3D]">ISO 27001</div>
            <div className="font-black uppercase tracking-[0.2em] text-[#001A3D]">SOC2 TYPE II</div>
            <div className="font-black uppercase tracking-[0.2em] text-[#001A3D]">HIPAA READY</div>
            <div className="font-black uppercase tracking-[0.2em] text-[#001A3D]">GDPR COMPLIANT</div>
            <div className="font-black uppercase tracking-[0.2em] text-[#001A3D]">CLOUD NATIVE</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Products() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0171c1]"></div></div>}>
      <ProductsContent />
    </Suspense>
  );
}
