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
  Search,
} from "lucide-react";
import * as Icons from "lucide-react";
import { Meta } from "@/components/Meta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";
import { CaseStudy } from "@/lib/data/case-studies";
import { FAQAccordion } from "@/components/FAQAccordion";
import { DownloadFormModal } from "@/components/DownloadFormModal";
import { renderTitle } from "@/lib/utils";
import { useState, useCallback, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ── Icon map (for dynamic icons from data) ────────────────────────────────────
const iconMap: Record<string, React.ReactNode> = {
  Target: <Target className="h-6 w-6 text-[#F99D1C]" />,
  Smartphone: <Smartphone className="h-6 w-6 text-[#F99D1C]" />,
  Globe: <Globe className="h-6 w-6 text-[#F99D1C]" />,
  Zap: <Zap className="h-6 w-6 text-[#F99D1C]" />,
  CheckCircle2: <CheckCircle2 className="h-6 w-6 text-[#F99D1C]" />,
  Database: <Database className="h-6 w-6 text-[#F99D1C]" />,
  Cpu: <Cpu className="h-6 w-6 text-[#F99D1C]" />,
  BarChart3: <BarChart3 className="h-6 w-6 text-[#F99D1C]" />,
  ShieldCheck: <ShieldCheck className="h-6 w-6 text-[#F99D1C]" />,
  MapPin: <Target className="h-6 w-6 text-[#F99D1C]" />,
};
// ── Static content for redesigned sections ─────────────────────────────────────
const CHALLENGES_AND_SOLUTIONS = [
  {
    step: "01",
    challenge: {
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
      title: "Legacy Infrastructure Bottlenecks",
      desc: "Outdated mainframe and monolithic architecture prevented integration with modern third-party SaaS services, creating serious operational bottlenecks.",
    },
    solution: {
      icon: <Layers className="h-5 w-5 text-emerald-500" />,
      title: "Cloud-Native Microservices Migration",
      desc: "Architected a decoupled microservices design using containerized Docker engines and serverless functions, enabling flexible scaling and API-driven workflows.",
    },
  },
  {
    step: "02",
    challenge: {
      icon: <Smartphone className="h-5 w-5 text-red-500" />,
      title: "Fragmented Mobile User Experience",
      desc: "Slow mobile interfaces with non-responsive tables and hard-to-read grids led to high checkout drop-offs and poor driver satisfaction scores on the road.",
    },
    solution: {
      icon: <Zap className="h-5 w-5 text-emerald-500" />,
      title: "Modern Mobile First-Class Interface",
      desc: "Redesigned visual flow using specialized mobile viewport components, reducing order dispatch completion time by over 60% with instant data caching.",
    },
  },
  {
    step: "03",
    challenge: {
      icon: <Gauge className="h-5 w-5 text-red-500" />,
      title: "Suboptimal Page Speed & Latency",
      desc: "Web page loads averaged 8 seconds. This latency caused high cart abandonment rates and negative ranking penalties on search engine results.",
    },
    solution: {
      icon: <Server className="h-5 w-5 text-emerald-500" />,
      title: "Sub-Second Backend Optimization",
      desc: "Deployed Redis caching layers, query indexing strategies, and automated CDN static asset distribution to bring page load speeds under 800ms.",
    },
  },
];

const TECH_CARDS = [
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Microservices Architecture",
    desc: "A fully modular microservices design pattern utilizing independent container clusters. Decouples processing layers to isolate fault domains and ensure continuous operations.",
    gradient: "from-blue-500 to-blue-700",
  },
  {
    icon: <Cloud className="h-6 w-6" />,
    title: "Cloud Infrastructure",
    desc: "Built on AWS and Google Cloud with multi-region backup structures, containerized deployment, auto-scaling groups, and automated CDN asset replication.",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: <Activity className="h-6 w-6" />,
    title: "API Integration",
    desc: "A high-performance centralized GraphQL and REST API gateway featuring rate-limiting, auto-retries, schema validation, and real-time messaging pipelines.",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Authentication & Security",
    desc: "Enterprise SSO with OAuth 2.0, JSON Web Tokens (JWT), role-based fine-grained permissions, and end-to-end data encryption in transit and at rest.",
    gradient: "from-orange-500 to-amber-600",
  },
];

const TECH_STACK = [
  {
    category: "Frontend",
    color: "#0171c1",
    techs: [
      { name: "React", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
      {
        name: "Next.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      },
      {
        name: "TypeScript",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
      },
      {
        name: "Tailwind CSS",
        logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
      },
    ],
  },
  {
    category: "Backend",
    color: "#001A3D",
    techs: [
      {
        name: "Node.js",
        logo: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
      },
      {
        name: "Python",
        logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
      },
      {
        name: "GraphQL",
        logo: "https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg",
      },
      {
        name: "NestJS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg",
      },
    ],
  },
  {
    category: "Mobile",
    color: "#F99D1C",
    techs: [
      {
        name: "Flutter",
        logo: "https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png",
      },
      {
        name: "React Native",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      },
    ],
  },
  {
    category: "Database",
    color: "#0171c1",
    techs: [
      {
        name: "PostgreSQL",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
      },
      {
        name: "MongoDB",
        logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg",
      },
      { name: "Redis", logo: "https://upload.wikimedia.org/wikipedia/commons/6/64/Logo-redis.svg" },
    ],
  },
  {
    category: "Cloud",
    color: "#001A3D",
    techs: [
      {
        name: "AWS",
        logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
      },
      {
        name: "Google Cloud",
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg",
      },
      {
        name: "Azure",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg",
      },
    ],
  },
  {
    category: "DevOps",
    color: "#F99D1C",
    techs: [
      {
        name: "Kubernetes",
        logo: "https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg",
      },
      {
        name: "Terraform",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
      },
      {
        name: "GitHub Actions",
        logo: "https://avatars.githubusercontent.com/u/44036562?s=200&v=4",
      },
    ],
  },
  {
    category: "Analytics",
    color: "#0171c1",
    techs: [
      {
        name: "Datadog",
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/07/Datadog_Logo.png",
      },
      { name: "Recharts", logo: "https://avatars.githubusercontent.com/u/8690858?s=200&v=4" },
    ],
  },
  {
    category: "Security",
    color: "#001A3D",
    techs: [
      {
        name: "OAuth2 / JWT",
        logo: "https://upload.wikimedia.org/wikipedia/commons/3/3a/OpenID_logo.svg",
      },
      {
        name: "Auth0",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/auth0/auth0-original.svg",
      },
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

interface ScreenSlide {
  device: string;
  title: string;
  tag: string;
  desc: string;
  image: string;
  color: string;
}

function CarouselCard({ slide, onZoom }: { slide: ScreenSlide; onZoom: () => void }) {
  const deviceString = Array.isArray(slide.device) ? slide.device[0] : (slide.device || "laptop");
  const deviceTypeLower = typeof deviceString === "string" ? deviceString.toLowerCase() : "laptop";

  return (
    <div className="group/card relative flex h-[540px] flex-col justify-between overflow-hidden rounded-[2rem] border border-white/5 bg-[#090b11] p-8 shadow-2xl transition-all duration-300 hover:shadow-black/40">
      {/* Top text content */}
      <div className="space-y-3 shrink-0">
        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#F99D1C]">
          {slide.tag}
        </span>
        <h3 className="display-font text-xl font-bold leading-snug text-white md:text-2xl">
          {slide.title}
        </h3>
        <p className="line-clamp-3 text-[13px] font-medium leading-relaxed text-gray-400">
          {slide.desc}
        </p>
      </div>

      {/* Image Centered (No Shapes) */}
      <div className="flex-1 flex items-center justify-center py-4">
        <div
          className={`relative overflow-hidden rounded-xl shadow-2xl group/img shrink-0 bg-[#141824] ${
            deviceTypeLower === "mobile"
              ? "aspect-[9/16] w-[140px]"
              : deviceTypeLower === "tablet"
              ? "aspect-[4/3] w-full max-w-[260px]"
              : "aspect-[16/10] w-full max-w-[310px]"
          }`}
        >
          <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />

          {/* Zoom Hover Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onZoom();
              }}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white text-[#0171c1] shadow-lg scale-90 group-hover/img:scale-100 transition-all duration-300"
            >
              <Search size={18} className="stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4 shrink-0">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
          Device: {deviceTypeLower}
        </span>
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: slide.color || "#0171c1" }}
        />
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function CaseStudyDetailClient({ study }: { study: CaseStudy }) {
  // Carousel state
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const sliderRef = useRef<Slider>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const mobileIndexRef = useRef(0);
  const userTouchingRef = useRef(false);

  // Dynamic challenges and solutions mapped from WordPress database
  const activeChallengesAndSolutions =
    study.challenges && study.challenges.length > 0
      ? study.challenges.map((challenge, idx) => {
          const solution = study.solutions?.[idx] || { title: "", desc: "", icon: "Zap" };

          // Helper function for dynamic icon nodes
          const getIconNode = (name: string, colorClass: string) => {
            const IconComponent = (Icons as any)[name];
            if (IconComponent) {
              return <IconComponent className={`h-5 w-5 ${colorClass}`} />;
            }
            if (colorClass.includes("red"))
              return <AlertTriangle className={`h-5 w-5 ${colorClass}`} />;
            return <Zap className={`h-5 w-5 ${colorClass}`} />;
          };

          return {
            step: idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`,
            challenge: {
              icon: getIconNode(challenge.icon, "text-red-500"),
              title: challenge.title,
              desc: challenge.desc,
            },
            solution: {
              icon: getIconNode(solution.icon, "text-emerald-500"),
              title: solution.title,
              desc: solution.desc,
            },
          };
        })
      : CHALLENGES_AND_SOLUTIONS;

  // Dynamic technical solution cards
  const activeTechCards =
    study.techCards && study.techCards.length > 0
      ? study.techCards.map((card) => {
          const IconComponent = (Icons as any)[card.icon] || Layers;
          return {
            icon: <IconComponent className="h-6 w-6" />,
            title: card.title,
            desc: card.desc,
            gradient: card.gradient,
          };
        })
      : TECH_CARDS;

  // Dynamic tech stack logo items
  const activeTechStack =
    study.techStackItems && study.techStackItems.length > 0
      ? [...study.techStackItems, ...study.techStackItems]
      : [...TECH_STACK.flatMap((g) => g.techs), ...TECH_STACK.flatMap((g) => g.techs)];

  // Dynamic process steps falling back to default process steps
  const activeProcess =
    study.process && study.process.length > 0
      ? study.process
      : [
          {
            number: "01",
            title: "Discovery & Strategy",
            desc: "Comprehensive mapping of customer workflows, integrations, and performance goals.",
          },
          {
            number: "02",
            title: "UX/UI Prototyping",
            desc: "Designing visual layouts for responsive devices with modern visual components.",
          },
          {
            number: "03",
            title: "Agile Development",
            desc: "Iterative sprints implementing modular microservices, caching, and state management.",
          },
          {
            number: "04",
            title: "Quality Assurance",
            desc: "Automated end-to-end user journey tests, performance benchmarks, and load tests.",
          },
        ];

  // Dynamic results falling back to default results
  const activeResults =
    study.results && study.results.length > 0
      ? study.results
      : [
          {
            title: "Brand Quality Elevated",
            desc: "Cohesive look and feel aligned with global brand guidelines across all devices.",
          },
          {
            title: "60% Completion Speedup",
            desc: "User workflow operations completed faster with instant screen caches and queries.",
          },
          {
            title: "99.99% Architecture Uptime",
            desc: "Scalable container clusters running without single-points-of-failure or buffering errors.",
          },
        ];

  // Map ACF screens if available, otherwise fallback to static APP_SCREENS
  const screens: ScreenSlide[] =
    study.screens && study.screens.length > 0
      ? study.screens.map((s, i) => {
          const isString = typeof s === "string";
          const imageUrl = isString ? s : s.image;
          let device = isString ? "laptop" : s.device || "laptop";
          if (device === "desktop") device = "laptop";
          
          return {
            device,
            title: isString ? `Screen ${i + 1}` : s.title || `Screen ${i + 1}`,
            tag: isString ? (study.client || "Application Screen") : (s.topTitle || study.client || "Application Screen"),
            desc: isString ? "" : s.desc || "",
            image: imageUrl,
            color: device === "mobile" ? "#0171c1" : device === "tablet" ? "#F99D1C" : "#27c93f",
          };
        })
      : APP_SCREENS;

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
      const maxIndex = screens.length - 1;
      const next = mobileIndexRef.current < maxIndex ? mobileIndexRef.current + 1 : 0;
      mobileIndexRef.current = next;
      container.scrollTo({ left: cardWidth * next, behavior: "smooth" });
    }, 4000);

    return () => clearInterval(interval);
  }, [mounted, screens.length]);

  const total = screens.length;

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

  const slide = screens[lightboxIndex];

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
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-white">
      <Meta
        title={`${study.title} | Case Study | Hutech Solutions`}
        description={study.shortDesc}
      />
      <Breadcrumbs variant="light" />

      {/* ── 1. HERO SECTION (unchanged layout, responsive padding) ─────────────────────────────────────── */}
      <section className="relative flex min-h-[500px] items-center overflow-hidden bg-[#001A3D] py-16 text-white md:py-24 lg:h-[570px] lg:py-0">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={study.heroImage}
            alt={study.title}
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/80 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-20">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="mb-8 flex items-center gap-3">
              <span className="h-[1px] w-12 bg-[#F99D1C]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#F99D1C]">
                {study.category} Case Study
              </span>
            </div>
            <h1 className="display-font mb-8 text-4xl font-semibold leading-tight md:text-6xl lg:text-7xl">
              {renderTitle(
                study.impact || study.title,
                "text-inherit",
                "text-[#F99D1C]",
                "text-[#0171c1]"
              )}
            </h1>
            <p className="mb-12 max-w-2xl text-xl font-medium leading-relaxed text-gray-300 md:text-2xl">
              {study.shortDesc}
            </p>

            <div className="flex flex-col justify-between gap-8 border-t border-white/10 py-8 md:flex-row md:items-end">
              <div className="flex flex-wrap gap-8">
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#F99D1C]">
                    Client Domain
                  </p>
                  <p className="font-semibold text-white">{study.clientDomain}</p>
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#F99D1C]">
                    Platform
                  </p>
                  <p className="font-semibold text-white">{study.platform}</p>
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#F99D1C]">
                    Geography
                  </p>
                  <p className="font-semibold text-white">{study.geography}</p>
                </div>
              </div>

              <div className="group relative inline-flex h-12 shrink-0">
                {/* Breathing Glow */}
                <div className="pointer-events-none absolute inset-0 animate-pulse rounded-xl bg-[#F99D1C] opacity-70 blur-md transition-opacity duration-300 group-hover:opacity-0"></div>

                {/* Main Button */}
                <button
                  onClick={() => setIsDownloadModalOpen(true)}
                  className="relative flex h-full items-center justify-center rounded-xl bg-[#F99D1C] px-4 font-bold text-[#001A3D] shadow-[0_4px_20px_rgba(249,157,28,0.3)] transition-all duration-300 hover:bg-[#e08a10] hover:shadow-[0_4px_25px_rgba(249,157,28,0.5)] active:scale-95"
                >
                  <Download size={18} className="shrink-0" />

                  {/* Smooth Grid Expansion */}
                  <div className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:grid-cols-[1fr]">
                    <span className="overflow-hidden whitespace-nowrap pl-0 text-[11px] uppercase tracking-widest transition-all duration-500 group-hover:pl-2">
                      {study.downloadBtnText || "DOWNLOAD CASE"}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </Motion.div>
        </div>
      </section>

      {/* ── 2. PROJECT OVERVIEW (unchanged) ─────────────────────────────────── */}
      <section className="bg-white py-[50px] md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-20 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-5">
              <div className="h-1.5 w-20 bg-[#0171c1]" />
              <h2 className="display-font text-4xl font-bold leading-tight text-[#001A3D]">
                {study.projectOverviewTitle || "Project Overview"}
              </h2>
              <p className="border-l-4 border-[#F99D1C] pl-8 text-lg font-medium italic leading-relaxed text-gray-600">
                &quot;{study.overviewQuote}&quot;
              </p>
            </div>
            <div className="space-y-6 lg:col-span-7">
              {study.projectOverview && (
                <p className="whitespace-pre-wrap text-lg font-medium leading-relaxed text-gray-500">
                  {study.projectOverview}
                </p>
              )}
              {study.overviewText &&
                study.overviewText.map((text, i) => (
                  <p key={i} className="text-lg font-medium leading-relaxed text-gray-500">
                    {text}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. APPLICATION SCREENS CAROUSEL ─────────────────────────────────── */}
      <section className="overflow-hidden bg-gray-50 py-[50px] md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          {/* Section header */}
          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0171c1]">
                {study.screensTopTitle || "Visual Walkthrough"}
              </span>
              <h2 className="display-font text-4xl font-bold text-[#001A3D] md:text-5xl">
                {study.screensTitle || "Application Screens"}
              </h2>
              <p className="max-w-lg font-medium text-gray-500">
                {study.screensDesc ||
                  "Explore the key interfaces across Desktop, Tablet, and Mobile — all crafted for intuitive, high-performance use."}
              </p>
            </div>
            {/* Arrow controls */}
            <div className="flex shrink-0 items-center gap-3">
              <button onClick={goPrev} aria-label="Previous screen" className="carousel-arrow">
                <ChevronLeft size={20} />
              </button>
              <span className="text-sm font-bold tabular-nums text-[#001A3D]">
                {String(activeSlide + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <button onClick={goNext} aria-label="Next screen" className="carousel-arrow">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* ── Mobile scroll-snap carousel (visible only on < md) ── */}
          <div className="md:hidden">
            <div
              ref={mobileScrollRef}
              className="flex snap-x snap-mandatory gap-0 overflow-x-auto scroll-smooth pb-2"
              style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
              onTouchStart={() => {
                userTouchingRef.current = true;
              }}
              onTouchEnd={() => {
                setTimeout(() => {
                  const container = mobileScrollRef.current;
                  if (container) {
                    mobileIndexRef.current = Math.round(
                      container.scrollLeft / container.offsetWidth
                    );
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
              {screens.map((slide, idx) => (
                <div key={idx} className="w-full flex-shrink-0 snap-center">
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
          <div className="animate-fadeIn relative hidden md:block">
            {mounted && (
              <Slider ref={sliderRef} {...carouselSettings}>
                {screens.map((slide, idx) => (
                  <div key={idx} className="px-2 outline-none">
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
          <div className="mt-10 flex justify-center gap-2">
            {screens.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === activeSlide
                    ? "h-2.5 w-8 bg-[#0171c1]"
                    : "h-2.5 w-2.5 bg-gray-200 hover:bg-gray-400"
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
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
              onClick={() => setLightboxOpen(false)}
            >
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
              >
                <X size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goLightboxPrev();
                }}
                className="carousel-arrow absolute left-4 !border-white/20 !bg-white/10 !text-white hover:!bg-[#F99D1C] md:left-8"
              >
                <ChevronLeft size={24} />
              </button>
              <Motion.div
                key={lightboxIndex + "-lb"}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-5xl overflow-hidden rounded-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="mx-auto h-auto max-h-[80vh] w-full object-contain"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-center text-white">
                  <p className="text-lg font-bold">{slide.title}</p>
                  <p className="mt-1 text-xs text-gray-300">
                    {lightboxIndex + 1} / {total}
                  </p>
                </div>
              </Motion.div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goLightboxNext();
                }}
                className="carousel-arrow absolute right-4 !border-white/20 !bg-white/10 !text-white hover:!bg-[#F99D1C] md:right-8"
              >
                <ChevronRight size={24} />
              </button>
            </Motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── 4. CHALLENGES & SOLUTIONS ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#F8FAFC] py-[50px] md:py-24">
        {/* Background decorative blobs */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-red-50 opacity-60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-blue-50 opacity-60 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
          {/* Header */}
          <div className="mb-20 space-y-4 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#0171c1]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#0171c1]">
              {study.challengesTopTitle || "Strategic Analysis"}
            </span>
            <h2 className="display-font text-4xl font-bold text-[#001A3D] md:text-5xl">
              {study.challengesSectionTitle || "Challenges & Solutions"}
            </h2>
            <p className="mx-auto max-w-2xl font-medium text-gray-500">
              {study.challengesDesc ||
                "Every complex problem deserves an equally deliberate solution. Here's how we navigated the critical hurdles."}
            </p>
          </div>

          {/* Column Headers */}
          <div className="mb-6 hidden grid-cols-[1fr_80px_1fr] gap-6 px-2 lg:grid">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-red-500">
                {study.challengesTitle || "Enterprise Challenges"}
              </span>
            </div>
            <div />
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600">
                {study.solutionsTitle || "Hutech Solutions"}
              </span>
            </div>
          </div>

          {/* Cards */}
          <div className="relative space-y-5">
            {/* Vertical timeline line (desktop only) */}
            <div className="absolute bottom-0 left-1/2 top-0 z-0 hidden w-px -translate-x-1/2 bg-gradient-to-b from-red-100 via-gray-200 to-emerald-100 lg:block" />

            {activeChallengesAndSolutions.map((item, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[1fr_80px_1fr] lg:gap-6"
              >
                {/* Challenge Card */}
                <div className="group rounded-[15px] border border-red-100 bg-white p-7 transition-all duration-300 hover:border-red-300 hover:shadow-[0_8px_30px_rgba(239,68,68,0.08)] md:rounded-2xl">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 transition-colors group-hover:bg-red-100">
                      {item.challenge.icon}
                    </div>
                    <div className="flex-1 space-y-2">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-red-400">
                        Challenge {item.step}
                      </span>
                      <h3 className="display-font text-base font-bold leading-snug text-[#001A3D]">
                        {item.challenge.title}
                      </h3>
                      <p className="text-[13px] font-medium leading-relaxed text-gray-500">
                        {item.challenge.desc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step Connector */}
                <div className="relative flex items-center justify-center">
                  <div className="relative z-10 flex h-12 w-12 select-none items-center justify-center rounded-full border-2 border-gray-200 bg-white text-sm font-bold text-[#001A3D] shadow-md">
                    {item.step}
                  </div>
                </div>

                {/* Solution Card */}
                <div className="group rounded-[15px] border border-emerald-100 bg-white p-7 transition-all duration-300 hover:border-emerald-300 hover:shadow-[0_8px_30px_rgba(16,185,129,0.08)] md:rounded-2xl">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 transition-colors group-hover:bg-emerald-100">
                      {item.solution.icon}
                    </div>
                    <div className="flex-1 space-y-2">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600">
                        Solution {item.step}
                      </span>
                      <h3 className="display-font text-base font-bold leading-snug text-[#001A3D]">
                        {item.solution.title}
                      </h3>
                      <p className="text-[13px] font-medium leading-relaxed text-gray-500">
                        {item.solution.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-gray-100 bg-white py-[50px] md:py-24">
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
          {/* Header */}
          <div className="mb-20 space-y-4 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#0171c1]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#0171c1]">
              {study.processTopTitle || "Workflow"}
            </span>
            <h2 className="display-font text-4xl font-bold text-[#001A3D] md:text-5xl">
              {study.processTitle || "Process Steps"}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {activeProcess.map((step, i) => (
              <div
                key={i}
                className="relative rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:shadow-xl break-words overflow-hidden"
              >
                <div className="mb-6 text-5xl font-bold text-gray-100">{step.number}</div>
                <h4 className="mb-2 text-lg font-bold text-[#001A3D] break-words">{step.title}</h4>
                <p className="text-sm leading-relaxed text-gray-500 break-words">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. TECHNICAL SOLUTION ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#001A3D] py-[50px] md:py-24">
        {/* Background glow circles */}
        <div className="pointer-events-none absolute left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-[#0171c1]/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-[#F99D1C]/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-4 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0171c1]/20 bg-[#0171c1]/20 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#0171c1]">
              {study.techTopTitle || "Engineering Depth"}
            </span>
            <h2 className="display-font text-4xl font-bold text-white md:text-5xl">
              {study.techTitle || "Technical Solution"}
            </h2>
            <p className="mx-auto max-w-2xl font-medium text-white/50">
              {study.techDesc ||
                "A breakdown of the four core engineering pillars that make this solution robust, scalable, and enterprise-ready."}
            </p>
          </div>

          {/* Cards grid — exactly 4 cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {activeTechCards.map((card, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative cursor-default overflow-hidden rounded-[15px] border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-white/25 hover:bg-white/10 hover:shadow-2xl md:rounded-2xl"
              >
                {/* Gradient top-accent bar */}
                <div
                  className={`absolute left-0 right-0 top-0 h-1 bg-gradient-to-r ${card.gradient} rounded-t-[15px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:rounded-t-2xl`}
                />

                {/* Icon */}
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${card.gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                >
                  {card.icon}
                </div>

                <h3 className="mb-3 text-lg font-bold leading-snug text-white">{card.title}</h3>
                <p className="text-sm font-medium leading-relaxed text-white/50 transition-colors group-hover:text-white/70">
                  {card.desc}
                </p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. TECHNOLOGY STACK ─────────────────────────────────────────────── */}
      <section className="overflow-hidden bg-white py-[50px] md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-16 space-y-4 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#0171c1]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#0171c1]">
              {study.techStackTopTitle || "Tools & Technologies"}
            </span>
            <h2 className="display-font text-4xl font-bold text-[#001A3D] md:text-5xl">
              {study.techStackTitle || "Technology Stack"}
            </h2>
            <p className="mx-auto max-w-2xl font-medium text-gray-500">
              {study.techStackDesc ||
                "A curated ecosystem of best-in-class technologies chosen for performance, developer experience, and long-term maintainability."}
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
            <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />

            <div className="animate-marquee flex items-start gap-5">
              {activeTechStack.map((tech, ti) => (
                <Motion.div
                  key={ti}
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex flex-shrink-0 cursor-default flex-col items-center gap-[10px]"
                >
                  {/* Card — completely unchanged */}
                  <div className="flex h-[104px] w-[104px] items-center justify-center rounded-[15px] border border-gray-100 bg-gray-50 p-2 transition-all duration-200 hover:border-gray-300 hover:bg-white hover:shadow-lg md:rounded-2xl">
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      className="h-12 w-12 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                  {/* Label — outside the card, centered below */}
                  <span className="whitespace-nowrap text-center text-[15px] font-semibold leading-none text-[#001A3D] md:text-[16px] lg:text-[18px]">
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
      <section className="relative overflow-hidden bg-[#0171c1] py-[50px] text-white md:py-24">
        <div className="absolute right-0 top-0 p-20 opacity-10">
          <BarChart3 size={400} />
        </div>
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="max-w-3xl space-y-12">
            <h2 className="display-font text-4xl font-bold md:text-6xl">
              {study.resultsTitle || "Results & Outcomes"}
            </h2>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              {activeResults.map((res, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="shrink-0 text-[#F99D1C]" />
                    <h4 className="text-xl font-bold uppercase tracking-wider">
                      {renderTitle(res.title)}
                    </h4>
                  </div>
                  <p className="font-medium leading-relaxed text-blue-100">{res.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ────────────────────────────────────────────────────── */}
      <section className="relative bg-white py-[60px] md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex flex-col justify-between gap-10 rounded-[30px] border border-gray-100/50 bg-[#F8FAFC] p-8 md:gap-16 md:rounded-[40px] md:p-16 lg:flex-row lg:items-center lg:p-20">
            <div className="max-w-2xl space-y-4">
              <h2 className="display-font text-4xl font-bold leading-tight text-[#001A3D] md:text-5xl">
                {study.ctaTitle ? (
                  renderTitle(study.ctaTitle)
                ) : (
                  <>
                    Ready to Scale Your <span className="text-[#0171c1]">Digital Storefront?</span>
                  </>
                )}
              </h2>
              <p className="text-base font-medium leading-relaxed text-gray-500 md:text-lg">
                {study.ctaDesc ||
                  "Let our engineering experts build your next-gen ecommerce ecosystem with brand precision."}
              </p>
            </div>
            <Link
              href={study.ctaBtnLink || "/contact"}
              className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-[5px] bg-[#001A3D] px-8 py-5 text-center text-[11px] font-bold uppercase tracking-widest text-white shadow-lg transition-all duration-300 hover:bg-[#F99D1C] hover:text-[#001A3D] md:text-xs"
            >
              <span>{study.ctaBtnText || "DISCUSS YOUR PROJECT"}</span>
              <ArrowRight size={14} className="text-white group-hover:text-[#001A3D] transition-colors duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. CTA SECTION (existing layout kept) ───────────────────────────── */}
      <section className="bg-white py-[50px] md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 text-center lg:px-20">
          <Motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group mx-auto flex flex-col items-center gap-4"
            whileHover={{ y: -5 }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-100 transition-all duration-500 group-hover:bg-[#001A3D] group-hover:text-white">
              <ArrowUp size={20} className="text-[#0171c1] group-hover:text-[#F99D1C]" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#001A3D] opacity-40 transition-opacity group-hover:opacity-100">
              Back to top
            </span>
          </Motion.button>
        </div>
      </section>
      <DownloadFormModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        documentTitle={`${study.title} Case Study`}
        downloadUrl={study.caseStudyPdf || "#"}
      />
    </div>
  );
}
