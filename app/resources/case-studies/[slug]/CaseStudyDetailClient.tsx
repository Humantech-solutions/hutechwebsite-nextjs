"use client";

import { motion as Motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2,
  ArrowRight,
  Smartphone,
  Globe,
  Zap,
  Target,
  BarChart3,
  ArrowUp,
  Database,
  Cpu,
  Download,
  ChevronLeft,
  ChevronRight,
  X,
  AlertTriangle,
  Layers,
  ShieldCheck,
  Cloud,
  GitBranch,
  Activity,
  Server,
  Lock,
  Gauge,
  Settings,
  Monitor,
  Tablet,
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";
import { CaseStudy } from "@/lib/data/case-studies";
import { FAQAccordion } from "@/components/FAQAccordion";
import { renderTitle } from "@/lib/utils";
import { useState, useCallback, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ── Icon map (for dynamic icons from data) ────────────────────────────────────
const iconMap: Record<string, React.ReactNode> = {
  Target:       <Target className="w-6 h-6 text-[#F99D1C]" />,
  Smartphone:   <Smartphone className="w-6 h-6 text-[#F99D1C]" />,
  Globe:        <Globe className="w-6 h-6 text-[#F99D1C]" />,
  Zap:          <Zap className="w-6 h-6 text-[#F99D1C]" />,
  CheckCircle2: <CheckCircle2 className="w-6 h-6 text-[#F99D1C]" />,
  Database:     <Database className="w-6 h-6 text-[#F99D1C]" />,
  Cpu:          <Cpu className="w-6 h-6 text-[#F99D1C]" />,
  BarChart3:    <BarChart3 className="w-6 h-6 text-[#F99D1C]" />,
  ShieldCheck:  <ShieldCheck className="w-6 h-6 text-[#F99D1C]" />,
  MapPin:       <Target className="w-6 h-6 text-[#F99D1C]" />,
};
// ── Static content for redesigned sections ─────────────────────────────────────
const CHALLENGES_AND_SOLUTIONS = [
  {
    step: "01",
    challenge: {
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
      title: "Legacy Infrastructure Bottlenecks",
      desc: "Outdated mainframe and monolithic architecture prevented integration with modern third-party SaaS services, creating serious operational bottlenecks."
    },
    solution: {
      icon: <Layers className="w-5 h-5 text-emerald-500" />,
      title: "Cloud-Native Microservices Migration",
      desc: "Architected a decoupled microservices design using containerized Docker engines and serverless functions, enabling flexible scaling and API-driven workflows."
    }
  },
  {
    step: "02",
    challenge: {
      icon: <Smartphone className="w-5 h-5 text-red-500" />,
      title: "Fragmented Mobile User Experience",
      desc: "Slow mobile interfaces with non-responsive tables and hard-to-read grids led to high checkout drop-offs and poor driver satisfaction scores on the road."
    },
    solution: {
      icon: <Zap className="w-5 h-5 text-emerald-500" />,
      title: "Modern Mobile First-Class Interface",
      desc: "Redesigned visual flow using specialized mobile viewport components, reducing order dispatch completion time by over 60% with instant data caching."
    }
  },
  {
    step: "03",
    challenge: {
      icon: <Gauge className="w-5 h-5 text-red-500" />,
      title: "Suboptimal Page Speed & Latency",
      desc: "Web page loads averaged 8 seconds. This latency caused high cart abandonment rates and negative ranking penalties on search engine results."
    },
    solution: {
      icon: <Server className="w-5 h-5 text-emerald-500" />,
      title: "Sub-Second Backend Optimization",
      desc: "Deployed Redis caching layers, query indexing strategies, and automated CDN static asset distribution to bring page load speeds under 800ms."
    }
  },
];

const TECH_CARDS = [
  { 
    icon: <Layers className="w-6 h-6" />, 
    title: "Microservices Architecture", 
    desc: "A fully modular microservices design pattern utilizing independent container clusters. Decouples processing layers to isolate fault domains and ensure continuous operations.",
    gradient: "from-blue-500 to-blue-700"
  },
  { 
    icon: <Cloud className="w-6 h-6" />, 
    title: "Cloud Infrastructure", 
    desc: "Built on AWS and Google Cloud with multi-region backup structures, containerized deployment, auto-scaling groups, and automated CDN asset replication.",
    gradient: "from-cyan-500 to-blue-600"
  },
  { 
    icon: <Activity className="w-6 h-6" />, 
    title: "API Integration", 
    desc: "A high-performance centralized GraphQL and REST API gateway featuring rate-limiting, auto-retries, schema validation, and real-time messaging pipelines.",
    gradient: "from-indigo-500 to-purple-600"
  },
  { 
    icon: <Lock className="w-6 h-6" />, 
    title: "Authentication & Security", 
    desc: "Enterprise SSO with OAuth 2.0, JSON Web Tokens (JWT), role-based fine-grained permissions, and end-to-end data encryption in transit and at rest.",
    gradient: "from-orange-500 to-amber-600"
  },
];

const TECH_STACK = [
  {
    category: "Frontend",
    color: "#0171c1",
    techs: [
      { name: "React", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
      { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "TypeScript", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" },
      { name: "Tailwind CSS", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
    ],
  },
  {
    category: "Backend",
    color: "#001A3D",
    techs: [
      { name: "Node.js", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" },
      { name: "Python", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" },
      { name: "GraphQL", logo: "https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg" },
      { name: "NestJS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg" },
    ],
  },
  {
    category: "Mobile",
    color: "#F99D1C",
    techs: [
      { name: "Flutter", logo: "https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png" },
      { name: "React Native", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
    ],
  },
  {
    category: "Database",
    color: "#0171c1",
    techs: [
      { name: "PostgreSQL", logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" },
      { name: "MongoDB", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" },
      { name: "Redis", logo: "https://upload.wikimedia.org/wikipedia/commons/6/64/Logo-redis.svg" },
    ],
  },
  {
    category: "Cloud",
    color: "#001A3D",
    techs: [
      { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
      { name: "Google Cloud", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" },
      { name: "Azure", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg" },
    ],
  },
  {
    category: "DevOps",
    color: "#F99D1C",
    techs: [
      { name: "Kubernetes", logo: "https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg" },
      { name: "Terraform", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
      { name: "GitHub Actions", logo: "https://avatars.githubusercontent.com/u/44036562?s=200&v=4" },
    ],
  },
  {
    category: "Analytics",
    color: "#0171c1",
    techs: [
      { name: "Datadog", logo: "https://upload.wikimedia.org/wikipedia/commons/0/07/Datadog_Logo.png" },
      { name: "Recharts", logo: "https://avatars.githubusercontent.com/u/8690858?s=200&v=4" },
    ],
  },
  {
    category: "Security",
    color: "#001A3D",
    techs: [
      { name: "OAuth2 / JWT", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3a/OpenID_logo.svg" },
      { name: "Auth0", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/auth0/auth0-original.svg" },
    ],
  },
];


// ── App Screens Carousel (dummy slides with device mockup framing) ─────────────
const APP_SCREENS = [
  {
    device: "desktop",
    title: "Analytics Dashboard",
    tag: "Operations Hub",
    desc: "The main command centre provides fleet managers with a real-time bird's-eye view of all active vehicles, KPIs, and operational metrics at a glance.",
    image: "/images/app_screen_dashboard.png",
    color: "#27c93f",
  },
  {
    device: "tablet",
    title: "Route Optimisation View",
    tag: "Dispatch Control",
    desc: "Dispatch operators can visualise live traffic overlays, assign routes, and monitor ETA accuracy directly from the tablet-optimised interface.",
    image: "/images/app_screen_route.png",
    color: "#F99D1C",
  },
  {
    device: "mobile",
    title: "Driver Companion App",
    tag: "Driver Assistant",
    desc: "Designed for use on the road, the mobile app surfaces turn-by-turn guidance, proof-of-delivery capture, and instant alerts even in low-connectivity zones.",
    image: "/images/app_screen_mobile.png",
    color: "#0171c1",
  },
  {
    device: "desktop",
    title: "Reporting & Insights",
    tag: "Fleet Analytics",
    desc: "Automated reporting surfaces fuel-consumption trends, driver-behaviour scores, and SLA compliance across all depots in a single exportable view.",
    image: "/images/app_screen_insights.png",
    color: "#ffbd2e",
  },
  {
    device: "desktop",
    title: "Real-Time Tracking Map",
    tag: "Live Telemetry",
    desc: "Monitor speeds, engine diagnostics, temperatures, and geofence status dynamically with instant color-coded status indicators on a dark vector map.",
    image: "/images/app_screen_tracking.png",
    color: "#27c93f",
  },
  {
    device: "tablet",
    title: "Warehouse Inventory Status",
    tag: "Inventory Management",
    desc: "Track stock counts, warehouse layouts, and barcode scan logs in real-time. Features colored status alerts for low stock levels.",
    image: "/images/app_screen_inventory.png",
    color: "#F99D1C",
  },
  {
    device: "mobile",
    title: "Customer Tracking Portal",
    tag: "Customer Experience",
    desc: "Surfaces real-time package status, vehicle ETA mapping, and live driver communication options to improve customer satisfaction.",
    image: "/images/app_screen_mobile.png",
    color: "#0171c1",
  },
  {
    device: "desktop",
    title: "Fleet Performance Summary",
    tag: "Operations Summary",
    desc: "High-level overview of daily active vehicles, total miles logged, average fuel consumption, and safety compliance across all branches.",
    image: "/images/app_screen_insights.png",
    color: "#ffbd2e",
  },
];

// ── Carousel Card Renderer (responsive, rounded corners, subtle border, aspect ratios) ───────────────────────────────────────────────────────
function CarouselCard({ slide, onZoom }: { slide: typeof APP_SCREENS[0]; onZoom: () => void }) {
  if (slide.device === "desktop") {
    return (
      <div className="relative flex flex-col justify-between h-[480px] rounded-[15px] md:rounded-[2rem] overflow-hidden bg-[#090b11] border border-white/5">
        {/* Browser Chrome Header */}
        <div className="flex items-center gap-2 px-6 py-4 bg-[#141824] shrink-0">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          <div className="ml-4 flex-1 h-5 rounded-md bg-[#090b11]/50 flex items-center px-3 text-[9px] text-gray-500 font-mono overflow-hidden">
            hutechsolutions.com/{slide.title.toLowerCase().replace(/\s+/g, "-")}
          </div>
        </div>
        <div className="relative flex-1 bg-[#090b11] overflow-hidden group/img">
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover opacity-90 md:group-hover/img:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 md:group-hover/img:opacity-100 transition-opacity duration-300">
            <button 
              onClick={onZoom}
              className="h-12 w-12 rounded-full bg-white/90 shadow-xl flex items-center justify-center text-[#0171c1] hover:scale-110 transition-transform cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="p-6 bg-[#0d111b] border-t border-white/5">
          <span className="text-[9px] font-bold tracking-widest text-[#F99D1C] uppercase">{slide.tag}</span>
          <h3 className="text-lg font-bold text-white mt-1 leading-snug">{slide.title}</h3>
          <p className="text-[11px] text-gray-400 font-medium leading-relaxed mt-2 line-clamp-2">{slide.desc}</p>
        </div>
      </div>
    );
  }

  if (slide.device === "tablet") {
    return (
      <div className="relative flex flex-col justify-between h-[480px] rounded-[15px] md:rounded-[2rem] overflow-hidden bg-[#090b11] border border-white/5 p-8 group/card">
        <div className="space-y-3">
          <span className="inline-block text-[9px] font-bold tracking-widest text-[#F99D1C] uppercase">{slide.tag}</span>
          <h3 className="text-xl font-bold text-white display-font leading-tight">
            {slide.title}
          </h3>
          <p className="text-[11px] text-gray-400 font-medium leading-relaxed line-clamp-3">
            {slide.desc}
          </p>
        </div>
        
        {/* Tablet mockup centered/bottom */}
        <div 
          onClick={onZoom}
          className="relative w-full max-w-[250px] mx-auto mt-4 cursor-pointer md:group-hover/card:scale-102 transition-transform duration-500"
        >
          <div className="rounded-t-lg border-[3px] border-[#1e2330] bg-[#1e2330] overflow-hidden aspect-[4/3]">
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          </div>
          <div className="h-1 w-[104%] -ml-[2%] rounded-b-sm bg-[#2d3142]" />
        </div>

        <div className="mt-4 border-t border-white/5 pt-4 flex items-center justify-between">
          <span className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">Device: Tablet</span>
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: slide.color || "#F99D1C" }} />
        </div>
      </div>
    );
  }

  // Mobile device Card
  return (
    <div className="relative flex flex-col justify-between h-[480px] rounded-[15px] md:rounded-[2rem] overflow-hidden bg-[#090b11] border border-white/5 p-8 group/card">
      <div className="space-y-3">
        <span className="inline-block text-[9px] font-bold tracking-widest text-[#F99D1C] uppercase">{slide.tag}</span>
        <h3 className="text-xl font-bold text-white display-font leading-tight">
          {slide.title}
        </h3>
        <p className="text-[11px] text-gray-400 font-medium leading-relaxed line-clamp-3">
          {slide.desc}
        </p>
      </div>

      {/* Phone mockup centered */}
      <div 
        onClick={onZoom}
        className="relative flex justify-center mt-4 h-[180px] cursor-pointer md:group-hover/card:scale-105 transition-transform duration-500"
      >
        <div className="w-[105px] rounded-t-xl border-[3px] border-b-0 border-[#1e2330] bg-[#1e2330] overflow-hidden aspect-[9/16]">
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="mt-4 border-t border-white/5 pt-4 flex items-center justify-between">
        <span className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">Device: Mobile</span>
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: slide.color || "#0171c1" }} />
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function CaseStudyDetailClient({ study }: { study: CaseStudy }) {
  // Carousel state
  const [activeSlide, setActiveSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const sliderRef = useRef<Slider>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const mobileIndexRef = useRef(0);
  const userTouchingRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-scroll mobile carousel every 4 s (matches desktop autoplaySpeed)
  useEffect(() => {
    if (!mounted) return;
    const container = mobileScrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      if (userTouchingRef.current) return;
      const cardWidth = container.offsetWidth;
      const maxIndex = APP_SCREENS.length - 1;
      const next = mobileIndexRef.current < maxIndex ? mobileIndexRef.current + 1 : 0;
      mobileIndexRef.current = next;
      container.scrollTo({ left: cardWidth * next, behavior: "smooth" });
    }, 4000);

    return () => clearInterval(interval);
  }, [mounted]);

  const total = APP_SCREENS.length;

  const goNext = useCallback(() => {
    sliderRef.current?.slickNext();
  }, []);

  const goPrev = useCallback(() => {
    sliderRef.current?.slickPrev();
  }, []);

  const goTo = (i: number) => {
    sliderRef.current?.slickGoTo(i);
  };

  const goLightboxNext = useCallback(() => {
    setLightboxIndex((p) => (p + 1) % total);
  }, [total]);

  const goLightboxPrev = useCallback(() => {
    setLightboxIndex((p) => (p - 1 + total) % total);
  }, [total]);

  // Keyboard nav for lightbox
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") goLightboxNext();
      if (e.key === "ArrowLeft") goLightboxPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, goLightboxNext, goLightboxPrev]);

  const slide = APP_SCREENS[lightboxIndex];

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    swipe: true,
    draggable: true,
    beforeChange: (current: number, next: number) => {
      setActiveSlide(next);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="flex flex-col bg-white min-h-screen overflow-hidden">
      <Meta
        title={`${study.title} | Case Study | Hutech Solutions`}
        description={study.shortDesc}
      />
      <Breadcrumbs variant="light" />

      {/* ── 1. HERO SECTION (unchanged layout, responsive padding) ─────────────────────────────────────── */}
      <section className="bg-[#001A3D] text-white min-h-[500px] py-16 md:py-24 lg:py-0 lg:h-[570px] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={study.heroImage}
            alt={study.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/80 to-transparent" />
        </div>

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-20 z-10 w-full">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-[1px] bg-[#F99D1C]" />
              <span className="text-[#F99D1C] font-bold uppercase tracking-[0.3em] text-[10px]">
                {study.category} Case Study
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight display-font mb-8">
              {renderTitle(study.impact || study.title, "text-inherit", "text-[#F99D1C]", "text-[#0171c1]")}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl font-medium leading-relaxed mb-12">
              {study.shortDesc}
            </p>

            <div className="flex flex-wrap gap-8 py-8 border-t border-white/10">
              <div>
                <p className="text-[10px] font-bold text-[#F99D1C] uppercase tracking-widest mb-1">Client Domain</p>
                <p className="text-white font-semibold">{study.clientDomain}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#F99D1C] uppercase tracking-widest mb-1">Platform</p>
                <p className="text-white font-semibold">{study.platform}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#F99D1C] uppercase tracking-widest mb-1">Geography</p>
                <p className="text-white font-semibold">{study.geography}</p>
              </div>
            </div>
          </Motion.div>
        </div>
      </section>

      {/* ── 2. PROJECT OVERVIEW (unchanged) ─────────────────────────────────── */}
      <section className="py-[50px] md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-5 space-y-8">
              <div className="w-20 h-1.5 bg-[#0171c1]" />
              <h2 className="text-4xl font-bold text-[#001A3D] display-font leading-tight">Project Overview</h2>
              <p className="text-lg text-gray-600 font-medium leading-relaxed italic border-l-4 border-[#F99D1C] pl-8">
                &quot;{study.overviewQuote}&quot;
              </p>
            </div>
            <div className="lg:col-span-7 space-y-6">
              {study.overviewText.map((text, i) => (
                <p key={i} className="text-gray-500 text-lg leading-relaxed font-medium">{text}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. APPLICATION SCREENS CAROUSEL ─────────────────────────────────── */}
      <section className="py-[50px] md:py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="space-y-4">
              <span className="text-[#0171c1] font-bold uppercase tracking-widest text-xs">Visual Walkthrough</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#001A3D] display-font">Application Screens</h2>
              <p className="text-gray-500 font-medium max-w-lg">
                Explore the key interfaces across Desktop, Tablet, and Mobile — all crafted for intuitive, high-performance use.
              </p>
            </div>
            {/* Arrow controls */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={goPrev}
                aria-label="Previous screen"
                className="carousel-arrow"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-sm font-bold text-[#001A3D] tabular-nums">
                {String(activeSlide + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <button
                onClick={goNext}
                aria-label="Next screen"
                className="carousel-arrow"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* ── Mobile scroll-snap carousel (visible only on < md) ── */}
          <div className="md:hidden">
            <div
              ref={mobileScrollRef}
              className="flex overflow-x-auto gap-0 pb-2 snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
              onTouchStart={() => { userTouchingRef.current = true; }}
              onTouchEnd={() => {
                setTimeout(() => {
                  const container = mobileScrollRef.current;
                  if (container) {
                    mobileIndexRef.current = Math.round(container.scrollLeft / container.offsetWidth);
                  }
                  userTouchingRef.current = false;
                }, 400);
              }}
              onScroll={() => {
                const container = mobileScrollRef.current;
                if (!container) return;
                // Debounce: only update dot when scroll settles (card fully in view)
                clearTimeout((container as any).__scrollTimer);
                (container as any).__scrollTimer = setTimeout(() => {
                  const idx = Math.round(container.scrollLeft / container.offsetWidth);
                  mobileIndexRef.current = idx;
                  setActiveSlide(idx);
                }, 150);
              }}
            >
              {APP_SCREENS.map((slide, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-full snap-center"
                >
                  <CarouselCard
                    slide={slide}
                    onZoom={() => {
                      setLightboxIndex(idx);
                      setLightboxOpen(true);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── Desktop / tablet slick carousel (hidden on < md) ── */}
          <div className="hidden md:block relative animate-fadeIn">
            {mounted && (
              <Slider ref={sliderRef} {...carouselSettings}>
                {APP_SCREENS.map((slide, idx) => (
                  <div key={idx} className="outline-none px-2">
                    <CarouselCard 
                      slide={slide} 
                      onZoom={() => {
                        setLightboxIndex(idx);
                        setLightboxOpen(true);
                      }} 
                    />
                  </div>
                ))}
              </Slider>
            )}
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-10">
            {APP_SCREENS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === activeSlide
                    ? "w-8 h-2.5 bg-[#0171c1]"
                    : "w-2.5 h-2.5 bg-gray-200 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxOpen && (
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
              onClick={() => setLightboxOpen(false)}
            >
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
              >
                <X size={24} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goLightboxPrev(); }}
                className="absolute left-4 md:left-8 carousel-arrow !bg-white/10 !border-white/20 !text-white hover:!bg-[#F99D1C]"
              >
                <ChevronLeft size={24} />
              </button>
              <Motion.div
                key={lightboxIndex + "-lb"}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-5xl w-full rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <img src={slide.image} alt={slide.title} className="w-full h-auto object-contain max-h-[80vh] mx-auto" />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white text-center">
                  <p className="font-bold text-lg">{slide.title}</p>
                  <p className="text-xs text-gray-300 mt-1">{lightboxIndex + 1} / {total}</p>
                </div>
              </Motion.div>
              <button
                onClick={(e) => { e.stopPropagation(); goLightboxNext(); }}
                className="absolute right-4 md:right-8 carousel-arrow !bg-white/10 !border-white/20 !text-white hover:!bg-[#F99D1C]"
              >
                <ChevronRight size={24} />
              </button>
            </Motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── 4. CHALLENGES & SOLUTIONS ───────────────────────────────────────── */}
      <section className="py-[50px] md:py-24 bg-[#F8FAFC] relative overflow-hidden">
        {/* Background decorative blobs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-red-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10">
          {/* Header */}
          <div className="text-center mb-20 space-y-4">
            <span className="inline-flex items-center gap-2 bg-[#0171c1]/10 text-[#0171c1] font-bold uppercase tracking-widest text-[10px] px-4 py-1.5 rounded-full">
              Strategic Analysis
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#001A3D] display-font">Challenges & Solutions</h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">
              Every complex problem deserves an equally deliberate solution. Here&apos;s how we navigated the critical hurdles.
            </p>
          </div>

          {/* Column Headers */}
          <div className="hidden lg:grid grid-cols-[1fr_80px_1fr] gap-6 mb-6 px-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-red-500">Enterprise Challenges</span>
            </div>
            <div />
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600">Hutech Solutions</span>
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-5 relative">
            {/* Vertical timeline line (desktop only) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-red-100 via-gray-200 to-emerald-100 -translate-x-1/2 hidden lg:block z-0" />

            {CHALLENGES_AND_SOLUTIONS.map((item, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="grid grid-cols-1 lg:grid-cols-[1fr_80px_1fr] gap-4 lg:gap-6 items-stretch"
              >
                {/* Challenge Card */}
                <div className="group bg-white border border-red-100 rounded-[15px] md:rounded-2xl p-7 hover:border-red-300 hover:shadow-[0_8px_30px_rgba(239,68,68,0.08)] transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 group-hover:bg-red-100 transition-colors">
                      {item.challenge.icon}
                    </div>
                    <div className="space-y-2 flex-1">
                      <span className="text-[9px] font-bold tracking-widest text-red-400 uppercase">Challenge {item.step}</span>
                      <h3 className="font-bold text-[#001A3D] text-base leading-snug display-font">{item.challenge.title}</h3>
                      <p className="text-gray-500 text-[13px] leading-relaxed font-medium">{item.challenge.desc}</p>
                    </div>
                  </div>
                </div>

                {/* Step Connector */}
                <div className="flex justify-center items-center relative">
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white border-2 border-gray-200 font-bold text-sm text-[#001A3D] shadow-md select-none">
                    {item.step}
                  </div>
                </div>

                {/* Solution Card */}
                <div className="group bg-white border border-emerald-100 rounded-[15px] md:rounded-2xl p-7 hover:border-emerald-300 hover:shadow-[0_8px_30px_rgba(16,185,129,0.08)] transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors">
                      {item.solution.icon}
                    </div>
                    <div className="space-y-2 flex-1">
                      <span className="text-[9px] font-bold tracking-widest text-emerald-600 uppercase">Solution {item.step}</span>
                      <h3 className="font-bold text-[#001A3D] text-base leading-snug display-font">{item.solution.title}</h3>
                      <p className="text-gray-500 text-[13px] leading-relaxed font-medium">{item.solution.desc}</p>
                    </div>
                  </div>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. TECHNICAL SOLUTION ───────────────────────────────────────────── */}
      <section className="py-[50px] md:py-24 bg-[#001A3D] relative overflow-hidden">
        {/* Background glow circles */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#0171c1]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#F99D1C]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <span className="inline-flex items-center gap-2 bg-[#0171c1]/20 text-[#0171c1] font-bold uppercase tracking-widest text-[10px] px-4 py-1.5 rounded-full border border-[#0171c1]/20">
              Engineering Depth
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white display-font">Technical Solution</h2>
            <p className="text-white/50 font-medium max-w-2xl mx-auto">
              A breakdown of the four core engineering pillars that make this solution robust, scalable, and enterprise-ready.
            </p>
          </div>

          {/* Cards grid — exactly 4 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TECH_CARDS.map((card, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative bg-white/5 border border-white/10 rounded-[15px] md:rounded-2xl p-8 hover:bg-white/10 hover:border-white/25 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-default overflow-hidden"
              >
                {/* Gradient top-accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-[15px] md:rounded-t-2xl`} />

                {/* Icon */}
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${card.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>

                <h3 className="font-bold text-white mb-3 leading-snug text-lg">{card.title}</h3>
                <p className="text-sm text-white/50 font-medium leading-relaxed group-hover:text-white/70 transition-colors">{card.desc}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. TECHNOLOGY STACK ─────────────────────────────────────────────── */}
      <section className="py-[50px] md:py-24 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-flex items-center gap-2 bg-[#0171c1]/10 text-[#0171c1] font-bold uppercase tracking-widest text-[10px] px-4 py-1.5 rounded-full">
              Tools &amp; Technologies
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#001A3D] display-font">Technology Stack</h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">
              A curated ecosystem of best-in-class technologies chosen for performance, developer experience, and long-term maintainability.
            </p>
          </div>

          {/* Single-row logo marquee */}
          <Motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden"
          >
            {/* Fade edges */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />

            <div className="flex gap-5 animate-marquee items-start">
              {[...TECH_STACK.flatMap((g) => g.techs), ...TECH_STACK.flatMap((g) => g.techs)].map((tech, ti) => (
                <Motion.div
                  key={ti}
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex-shrink-0 flex flex-col items-center gap-[10px] cursor-default"
                >
                  {/* Card — completely unchanged */}
                  <div className="flex items-center justify-center w-[104px] h-[104px] rounded-[15px] md:rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-300 hover:bg-white hover:shadow-lg transition-all duration-200 p-2">
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      className="w-12 h-12 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                  {/* Label — outside the card, centered below */}
                  <span className="text-[15px] md:text-[16px] lg:text-[18px] font-semibold text-[#001A3D] text-center whitespace-nowrap leading-none">
                    {tech.name}
                  </span>
                </Motion.div>
              ))}
            </div>
          </Motion.div>
        </div>
      </section>


      {/* ── Existing data-driven sections (Challenges, Solutions, Process, Results) ── */}
      {/* Keep original dynamic section only if the new static ones look different enough  */}
      {/* Results Section */}
      {study.results && study.results.length > 0 && (
        <section className="py-[50px] md:py-24 bg-[#0171c1] text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 p-20 opacity-10">
            <BarChart3 size={400} />
          </div>
          <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10">
            <div className="max-w-3xl space-y-12">
              <h2 className="text-4xl md:text-6xl font-bold display-font">Results & Outcomes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {study.results.map((res, i) => (
                  <div key={i} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="text-[#F99D1C] shrink-0" />
                      <h4 className="font-bold text-xl uppercase tracking-wider">
                        {renderTitle(res.title)}
                      </h4>
                    </div>
                    <p className="text-blue-100 font-medium leading-relaxed">{res.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {study.faqs && study.faqs.length > 0 && (
        <section className="py-[50px] md:py-24 bg-gray-50">
          <div className="max-w-[1000px] mx-auto px-6 lg:px-20 space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-[#001A3D] display-font">
                {study.faqTitle ? renderTitle(study.faqTitle) : "Frequently Asked Questions"}
              </h2>
              <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">
                {study.faqSubtitle
                  ? renderTitle(study.faqSubtitle)
                  : `Common questions about our ${study.category} case study.`}
              </p>
            </div>
            <FAQAccordion faqs={study.faqs} />
          </div>
        </section>
      )}

      {/* ── 7. CTA SECTION (existing layout kept) ───────────────────────────── */}
      <section className="py-[50px] md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 text-center">

          <Motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex flex-col items-center gap-4 mx-auto"
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-[#001A3D] group-hover:text-white transition-all duration-500">
              <ArrowUp size={20} className="text-[#0171c1] group-hover:text-[#F99D1C]" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#001A3D] opacity-40 group-hover:opacity-100 transition-opacity">
              Back to top
            </span>
          </Motion.button>
        </div>
      </section>
    </div>
  );
}
