"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Meta } from "@/components/Meta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  Shield,
  Cloud,
  Database,
  Sparkles,
  Box,
  ExternalLink,
  Cpu,
  Zap,
  Activity,
  LayoutGrid,
  ArrowRight,
  Filter,
  Search,
  Eye,
  HardDrive,
  Share2,
  Layers,
  BarChart3,
  Settings,
  UserCheck,
  Truck,
  CreditCard,
  Code,
  FileText,
  Volume2,
  Terminal,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

const CATEGORIES = [
  "All Products",
  "Gen AI Products",
  "AI productivity tools",
  "DevOps & SRE Automation",
  "LMS",
  "ERP & Office Productivity",
  "Logistics and Delivery",
];

const PRODUCTS_DATA = [
  {
    id: "sentinelcore",
    title: "SentinelCore AI",
    category: "Gen AI Products",
    description:
      "Generative AI-driven security platform providing proactive threat hunting and automated incident response.",
    icon: <Shield className="h-6 w-6" />,
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    color: "#FFAF2B",
  },
  {
    id: "visionsense",
    title: "VisionSense Analytics",
    category: "Gen AI Products",
    description:
      "Industrial computer vision for real-time quality inspection and safety monitoring using generative models.",
    icon: <Eye className="h-6 w-6" />,
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    color: "#0171c1",
  },
  {
    id: "automation-forge",
    title: "Automation Forge",
    category: "AI productivity tools",
    description: "Low-code platform for building complex RPA workflows with cognitive AI.",
    icon: <Sparkles className="h-6 w-6" />,
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800",
    color: "#0171c1",
  },
  {
    id: "hutech-assist",
    title: "Hutech Assist",
    category: "AI productivity tools",
    description:
      "Enterprise-wide AI assistant for technical documentation and knowledge management.",
    icon: <FileText className="h-6 w-6" />,
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    color: "#FFAF2B",
  },
  {
    id: "cloudorbit",
    title: "CloudOrbit SRE",
    category: "DevOps & SRE Automation",
    description: "Automated reliability engineering platform for complex multi-cloud deployments.",
    icon: <Zap className="h-6 w-6" />,
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    color: "#FFAF2B",
  },
  {
    id: "skynode-edge",
    title: "SkyNode Edge",
    category: "DevOps & SRE Automation",
    description:
      "Distributed infrastructure for low-latency edge computing and local data processing.",
    icon: <HardDrive className="h-6 w-6" />,
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
    color: "#0171c1",
  },
  {
    id: "edu-nexus",
    title: "EduNexus LMS",
    category: "LMS",
    description:
      "Comprehensive learning management system for enterprise training and skill certification.",
    icon: <GraduationCap className="h-6 w-6" />,
    image:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800",
    color: "#FFAF2B",
  },
  {
    id: "erp-nexus",
    title: "ERP Nexus",
    category: "ERP & Office Productivity",
    description: "Seamless integration layer for SAP, Oracle, and modern cloud applications.",
    icon: <ExternalLink className="h-6 w-6" />,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    color: "#0171c1",
  },
  {
    id: "office-flow",
    title: "OfficeFlow",
    category: "ERP & Office Productivity",
    description:
      "Unified productivity suite for team collaboration and document workflow automation.",
    icon: <Briefcase className="h-6 w-6" />,
    image:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800",
    color: "#FFAF2B",
  },
  {
    id: "supplychain-sentry",
    title: "SupplyChain Sentry",
    category: "Logistics and Delivery",
    description: "Real-time logistics optimization and risk management for global supply chains.",
    icon: <Truck className="h-6 w-6" />,
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    color: "#0171c1",
  },
  {
    id: "hutrac-gps",
    title: "HuTrac GPS",
    category: "Logistics and Delivery",
    description: "Advanced fleet tracking and route optimization for last-mile delivery services.",
    icon: <Activity className="h-6 w-6" />,
    image:
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800",
    color: "#FFAF2B",
  },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
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
    return PRODUCTS_DATA.filter((product) => {
      const matchesCategory =
        activeCategory === "All Products" || product.category === activeCategory;
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Products Ecosystem"
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
              <span className="h-[1px] w-12 bg-[#FFAF2B]"></span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#FFAF2B] uppercase">
                Engineered for Resilience
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              Our <span className="text-[#FFAF2B]">Solutions</span> Ecosystem
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              Proprietary IP and enterprise-ready platforms designed to solve high-complexity
              engineering challenges.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-[64px] z-40 border-b border-gray-100 bg-white py-6">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div className="no-scrollbar flex w-full items-center gap-2 overflow-x-auto pb-4 lg:w-auto lg:pb-0">
              <Filter className="mr-2 h-4 w-4 shrink-0 text-gray-400" />
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => router.push(`/products?category=${encodeURIComponent(cat)}`)}
                  className={`rounded-sm border px-5 py-2.5 text-[11px] font-black tracking-widest whitespace-nowrap uppercase transition-all duration-300 ${
                    activeCategory === cat
                      ? "border-[#001A3D] bg-[#001A3D] text-white shadow-lg shadow-[#001A3D]/10"
                      : "border-gray-100 bg-white text-gray-500 hover:border-[#0171c1] hover:text-[#0171c1]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-80">
              <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search solutions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-sm border border-gray-100 bg-gray-50 py-3 pr-6 pl-12 text-sm font-medium transition-all focus:border-[#0171c1] focus:ring-1 focus:ring-[#0171c1] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="min-h-[600px] py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, idx) => (
                  <Motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="group flex flex-col overflow-hidden rounded-sm border border-gray-100 bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-gray-100"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <div className="rounded-sm bg-white/95 p-3 text-[#001A3D] shadow-sm backdrop-blur-md transition-colors group-hover:text-[#0171c1]">
                          {product.icon}
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full translate-y-full p-4 transition-transform duration-500 group-hover:translate-y-0">
                        <div className="rounded-sm bg-white/90 p-3 text-center text-[10px] font-black tracking-widest text-[#0171c1] uppercase backdrop-blur-md">
                          {product.category}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-8">
                      <h3 className="display-font mb-4 text-xl font-semibold text-[#001A3D] transition-colors group-hover:text-[#0171c1]">
                        {product.title}
                      </h3>
                      <p className="mb-8 flex-1 text-sm leading-relaxed text-gray-500">
                        {product.description}
                      </p>

                      <Link
                        href={`/products/${product.id}`}
                        className="group/btn inline-flex items-center gap-3 text-[11px] font-black tracking-widest text-[#001A3D] uppercase transition-all"
                      >
                        <span>Learn More</span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 transition-all group-hover/btn:border-[#0171c1] group-hover/btn:bg-[#0171c1] group-hover/btn:text-white">
                          <ArrowRight size={14} />
                        </div>
                      </Link>
                    </div>
                  </Motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="py-40 text-center">
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gray-50 text-gray-300">
                <Search size={32} />
              </div>
              <h3 className="display-font mb-4 text-2xl font-semibold text-[#001A3D]">
                No matching solutions
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters or search query to find what you're looking for.
              </p>
              <button
                onClick={() => setActiveCategory("All Products")}
                className="mt-8 text-sm font-bold tracking-widest text-[#0171c1] uppercase"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-gray-100 bg-gray-50 py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-40 grayscale lg:gap-24">
            <div className="font-black tracking-[0.2em] text-[#001A3D] uppercase">ISO 27001</div>
            <div className="font-black tracking-[0.2em] text-[#001A3D] uppercase">SOC2 TYPE II</div>
            <div className="font-black tracking-[0.2em] text-[#001A3D] uppercase">HIPAA READY</div>
            <div className="font-black tracking-[0.2em] text-[#001A3D] uppercase">
              GDPR COMPLIANT
            </div>
            <div className="font-black tracking-[0.2em] text-[#001A3D] uppercase">CLOUD NATIVE</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Products() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-[#0171c1]"></div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
