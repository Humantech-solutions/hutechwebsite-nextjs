"use client";

import { useState, useMemo, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Meta } from "@/components/Meta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { renderTitle, formatQuotesToBold } from "@/lib/utils";
import { cn } from "@/components/ui/utils";
import { ProductItem, PRODUCT_CATEGORIES, DEFAULT_PRODUCTS } from "@/lib/product-catalog";
import { ProductPageData } from "@/lib/wordpress";
import { submitContactForm } from "@/lib/api";
import {
  Sparkles,
  Cpu,
  Database,
  Cloud,
  Shield,
  Zap,
  Layers,
  Search,
  Filter,
  ArrowRight,
  CheckCircle2,
  Activity,
  Server,
  Lock,
  Globe2,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  User,
  Mail,
  Phone,
  ChevronDown,
} from "lucide-react";

interface PageClientProps {
  pageData?: ProductPageData | null;
  products?: ProductItem[];
}

const ICON_MAP: Record<string, React.ReactNode> = {
  sparkles: <Sparkles className="h-5 w-5" />,
  cpu: <Cpu className="h-5 w-5" />,
  database: <Database className="h-5 w-5" />,
  cloud: <Cloud className="h-5 w-5" />,
  shield: <Shield className="h-5 w-5" />,
  zap: <Zap className="h-5 w-5" />,
  layers: <Layers className="h-5 w-5" />,
};

const PILLAR_ICON_MAP: Record<string, React.ReactNode> = {
  server: <Server className="h-7 w-7 text-[#0171c1]" strokeWidth={1.5} />,
  zap: <Zap className="h-7 w-7 text-[#0171c1]" strokeWidth={1.5} />,
  globe: <Globe2 className="h-7 w-7 text-[#0171c1]" strokeWidth={1.5} />,
  lock: <Lock className="h-7 w-7 text-[#0171c1]" strokeWidth={1.5} />,
  shield: <ShieldCheck className="h-7 w-7 text-[#0171c1]" strokeWidth={1.5} />,
  cloud: <Cloud className="h-7 w-7 text-[#0171c1]" strokeWidth={1.5} />,
  database: <Database className="h-7 w-7 text-[#0171c1]" strokeWidth={1.5} />,
  cpu: <Cpu className="h-7 w-7 text-[#0171c1]" strokeWidth={1.5} />,
  activity: <Activity className="h-7 w-7 text-[#0171c1]" strokeWidth={1.5} />,
  trending: <TrendingUp className="h-7 w-7 text-[#0171c1]" strokeWidth={1.5} />,
};

const ARCHITECTURE_PILLARS = [
  {
    icon: <Server className="h-7 w-7 text-[#0171c1]" strokeWidth={1.5} />,
    title: "VPC & Sovereign Deployment",
    description:
      "Deploy entirely in your private cloud (AWS VPC, GCP VPC, Azure VNet) or on-premise Kubernetes clusters with 100% data residency.",
  },
  {
    icon: <Zap className="h-7 w-7 text-[#0171c1]" strokeWidth={1.5} />,
    title: "Sub-Second Event Latency",
    description:
      "Engineered on high-throughput event buses and distributed workers to guarantee real-time orchestration under peak global loads.",
  },
  {
    icon: <Globe2 className="h-7 w-7 text-[#0171c1]" strokeWidth={1.5} />,
    title: "Zero Vendor Lock-In",
    description:
      "Built with open OpenAPI standards, exportable state definitions, and cloud-agnostic containers so you always maintain complete ownership.",
  },
  {
    icon: <Lock className="h-7 w-7 text-[#0171c1]" strokeWidth={1.5} />,
    title: "Continuous Compliance",
    description:
      "Audited continuously against SOC 2 Type II, ISO 27001, HIPAA, and GDPR frameworks with automated policy-as-code enforcement.",
  },
];

export default function PageClient({ pageData, products = DEFAULT_PRODUCTS }: PageClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState<string>("All Products");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  // Hero Lead Capture Form State
  const [heroForm, setHeroForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isHeroSubmitting, setIsHeroSubmitting] = useState<boolean>(false);
  const [heroFormStatus, setHeroFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Click event action tracking
  const handleHeroButtonClick = () => {
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "product_hero_demo_button_click",
        button_name: "Request Platform Demo",
        page_location: window.location.href,
        page_title: document.title,
        timestamp: new Date().toISOString(),
      });
    }
  };

  // Lead capture form submit via CRM admin API
  const handleHeroFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsHeroSubmitting(true);
    setHeroFormStatus({ type: null, message: "" });

    try {
      await submitContactForm({
        name: heroForm.name,
        email: heroForm.email,
        phone: heroForm.phone,
        subject: "Platform Demo Request - Products Banner",
        message: "Inquiry and platform demo request submitted via Products hero banner lead form.",
        category: "Products",
        gtmEventName: "product_hero_demo_request_submit",
      });

      setHeroFormStatus({
        type: "success",
        message: "Thank you! Your demo request has been received. Our enterprise platform specialists will contact you shortly.",
      });
      setHeroForm({ name: "", email: "", phone: "" });
    } catch (error) {
      setHeroFormStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to submit request. Please try again.",
      });
    } finally {
      setIsHeroSubmitting(false);
    }
  };

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    } else if (pageData?.category) {
      setActiveCategory(pageData.category);
    } else {
      setActiveCategory("All Products");
    }
  }, [categoryParam, pageData?.category]);

  const configuredCount = pageData?.postsCount || pageData?.productsCount || 0;

  const allItems = useMemo(() => {
    const list = products && products.length > 0 ? products : DEFAULT_PRODUCTS;
    if (configuredCount > 0 && list.length > configuredCount) {
      return list.slice(0, configuredCount);
    }
    return list;
  }, [products, configuredCount]);

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return allItems.filter((product) => {
      const matchesCategory =
        activeCategory === "All Products" ||
        product.category.toLowerCase() === activeCategory.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tagline.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.capabilities.some((c) => c.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [allItems, activeCategory, searchQuery]);

  // Catalog pagination (Load More)
  const initialProductsCount = configuredCount > 0 ? configuredCount : 6;
  const [visibleCount, setVisibleCount] = useState<number>(initialProductsCount);

  useEffect(() => {
    setVisibleCount(configuredCount > 0 ? configuredCount : 6);
  }, [activeCategory, searchQuery, configuredCount]);

  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const hasMoreProducts = visibleCount < filteredProducts.length;

  const pageTitle = pageData?.title || "Platforms Built to |Accelerate Enterprise.";
  const pageDescription =
    pageData?.description ||
    "Engineered for resilience, scalability, and mission-critical performance across modern enterprise workloads.";
  const pageLabel = pageData?.label || "Enterprise Software Platforms";

  // Trust Checkmarks list with fallback
  const trustList = useMemo(() => {
    if (pageData?.trustCheckmarks && pageData.trustCheckmarks.length > 0) {
      return pageData.trustCheckmarks;
    }
    return [
      "VPC & Sovereign Deployment",
      "100% Zero Vendor Lock-In",
      "Sub-Second Event Latency",
      "SOC 2 Type II & ISO 27001 Certified",
    ];
  }, [pageData?.trustCheckmarks]);

  // Flagship product for spotlight
  const selectedFlagshipSlug = (
    pageData?.flagshipSlug ||
    pageData?.flagshipProduct?.post_name ||
    pageData?.flagshipProduct?.slug ||
    pageData?.spotlightSlug ||
    ""
  ).toLowerCase().trim();

  const selectedFlagshipId = pageData?.flagshipProductId
    ? String(pageData.flagshipProductId).trim()
    : pageData?.flagshipProduct?.ID
    ? String(pageData.flagshipProduct.ID).trim()
    : pageData?.flagshipProduct?.id
    ? String(pageData.flagshipProduct.id).trim()
    : "";

  const selectedFlagshipTitle = (
    pageData?.flagshipTitle ||
    pageData?.flagshipProduct?.post_title ||
    pageData?.flagshipProduct?.title?.rendered ||
    pageData?.flagshipProduct?.title ||
    ""
  ).toLowerCase().trim();

  const flagshipPool = products && products.length > 0 ? products : DEFAULT_PRODUCTS;

  const flagship = useMemo(() => {
    const found =
      (selectedFlagshipId &&
        flagshipPool.find(
          (p) =>
            String(p.databaseId) === selectedFlagshipId ||
            String(p.wpId) === selectedFlagshipId ||
            String(p.id) === selectedFlagshipId
        )) ||
      (selectedFlagshipSlug &&
        flagshipPool.find(
          (p) =>
            p.slug.toLowerCase() === selectedFlagshipSlug ||
            p.id.toLowerCase() === selectedFlagshipSlug
        )) ||
      (selectedFlagshipTitle &&
        flagshipPool.find(
          (p) =>
            p.title.toLowerCase() === selectedFlagshipTitle ||
            p.title.toLowerCase().includes(selectedFlagshipTitle) ||
            selectedFlagshipTitle.includes(p.title.toLowerCase())
        )) ||
      (!selectedFlagshipId && !selectedFlagshipSlug && !selectedFlagshipTitle
        ? flagshipPool.find((p) => p.featured)
        : undefined) ||
      allItems[0] ||
      flagshipPool[0];

    if (found) return found;

    // If explicitly chosen (e.g. Data Kavach) but not found in the pool
    if (selectedFlagshipTitle || selectedFlagshipSlug) {
      const displayTitle =
        pageData?.flagshipTitle ||
        (selectedFlagshipSlug
          ? selectedFlagshipSlug.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())
          : "Enterprise Platform");
      return {
        id: selectedFlagshipSlug || "custom-flagship",
        slug: selectedFlagshipSlug || "custom-flagship",
        title: displayTitle,
        category: "Enterprise Platform",
        tagline: "Proprietary Enterprise Software Platform",
        description:
          "Engineered for resilience, high availability, and mission-critical enterprise workloads.",
        badge: "Flagship",
        version: "v4.2",
        featured: true,
        image:
          "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
        iconName: "shield" as const,
        accentColor: "#0171c1",
        stats: [
          { value: "99.99%", label: "Uptime SLA" },
          { value: "< 10ms", label: "Latency" },
        ],
        capabilities: [
          "Autonomous Workflow Engine",
          "Real-Time Telemetry & Context",
          "Continuous Compliance Guardrails",
          "Sovereign Private Cloud Deployment",
        ],
        compliance: ["SOC 2 Type II", "ISO 27001", "HIPAA", "GDPR"],
        ctaText: `Explore ${displayTitle}`,
      };
    }

    return allItems[0] || DEFAULT_PRODUCTS[0];
  }, [
    selectedFlagshipId,
    selectedFlagshipSlug,
    selectedFlagshipTitle,
    flagshipPool,
    allItems,
    pageData?.flagshipTitle,
  ]);
  const showFlagshipSpotlight =
    pageData?.showSpotlight !== false &&
    (activeCategory === "All Products" || activeCategory === flagship?.category) &&
    !searchQuery.trim();

  // Flagship interactive image gallery
  const [flagshipSlide, setFlagshipSlide] = useState<number>(0);
  const [isSliderHovered, setIsSliderHovered] = useState<boolean>(false);

  const flagshipGallery = useMemo(() => {
    // If custom slides were explicitly provided, respect them
    if (pageData?.spotlightSlides && pageData.spotlightSlides.length > 0 && pageData.spotlightSlides[0]?.title) {
      return pageData.spotlightSlides.map((slide, idx) => ({
        id: slide.id || `slide-${idx}`,
        tag: slide.tag || "Platform Intelligence",
        label: slide.label || `Feature 0${idx + 1}`,
        path: slide.path || `${flagship.slug}.platform/feature-${idx + 1}`,
        image: slide.image || flagship.image,
        title: slide.title,
        description: slide.description,
        metric: slide.metric,
      }));
    }

    // Dynamic rendering from the selected flagship product post type
    const cap1 = flagship.capabilities?.[0] || "Autonomous Workflow Engine";
    const cap2 = flagship.capabilities?.[1] || "Real-Time Context & Telemetry";
    const cap3 = flagship.capabilities?.[2] || "Continuous Governance Guardrails";
    const cap4 = flagship.capabilities?.[3] || "Sovereign Private Cloud Deployment";

    const stat1 = flagship.stats?.[0] ? `${flagship.stats[0].value} ${flagship.stats[0].label}` : "3.2x Faster Delivery";
    const stat2 = flagship.stats?.[1] ? `${flagship.stats[1].value} ${flagship.stats[1].label}` : "< 90s MTTR Response";
    const stat3 = flagship.stats?.[2] ? `${flagship.stats[2].value} ${flagship.stats[2].label}` : "100% Policy Adherence";
    const stat4 = flagship.stats?.[3] ? `${flagship.stats[3].value} ${flagship.stats[3].label}` : "99.99% Availability SLA";

    const baseSlug = flagship.slug || "platform";
    const complianceSummary =
      flagship.compliance && flagship.compliance.length > 0
        ? flagship.compliance.join(", ")
        : "SOC 2 Type II, ISO 27001";

    return [
      {
        id: "slide-1",
        tag: flagship.category || "Workflow Orchestration",
        label: "Command Center",
        path: `${baseSlug}.platform/workflows`,
        image:
          flagship.image ||
          "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1400",
        title: cap1,
        description: flagship.description || "Adaptive event buses connecting teams, tools & microservices in real-time.",
        metric: stat1,
      },
      {
        id: "slide-2",
        tag: "Operational Intelligence",
        label: "Telemetry Graph",
        path: `${baseSlug}.platform/telemetry`,
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1400",
        title: cap2,
        description: `${flagship.title} live telemetry stream with sub-second event ingestion and predictive analytics.`,
        metric: stat2,
      },
      {
        id: "slide-3",
        tag: "Continuous Compliance",
        label: "Governance Engine",
        path: `${baseSlug}.platform/governance`,
        image:
          "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=1400",
        title: cap3,
        description: `Zero-touch compliance validation with automated ${complianceSummary} auditing and guardrails.`,
        metric: stat3,
      },
      {
        id: "slide-4",
        tag: "Edge Topology",
        label: "Private VPC Mesh",
        path: `${baseSlug}.platform/vpc-mesh`,
        image:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1400",
        title: cap4,
        description: "Zero vendor lock-in with localized VPC routing, enterprise tenancy, and dedicated data residency.",
        metric: stat4,
      },
    ];
  }, [pageData?.spotlightSlides, flagship]);

  // Enterprise Architecture Pillars List with image & icon mapping
  const pillarsList = useMemo(() => {
    if (pageData?.pillars && pageData.pillars.length > 0) {
      return pageData.pillars.map((pillar, idx) => {
        const iconVal = typeof pillar.icon === "string" ? pillar.icon.trim() : "";
        const isMediaImg =
          iconVal.startsWith("http://") ||
          iconVal.startsWith("https://") ||
          iconVal.startsWith("/") ||
          iconVal.startsWith("data:image") ||
          /\.(svg|png|jpe?g|webp|gif)($|\?)/i.test(iconVal);

        let iconNode: React.ReactNode;
        if (isMediaImg) {
          iconNode = (
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-white shadow-md p-2.5 transition-transform duration-300 group-hover:scale-110">
              <img
                src={iconVal}
                alt={pillar.title || `Pillar ${idx + 1}`}
                className="h-7 w-7 object-contain max-h-7 max-w-7"
              />
            </div>
          );
        } else {
          const iconKey = iconVal.toLowerCase();
          const defaultIcon =
            PILLAR_ICON_MAP[iconKey] ||
            [
              <Server key="s" className="h-7 w-7 text-[#0171c1]" strokeWidth={1.5} />,
              <Zap key="z" className="h-7 w-7 text-[#0171c1]" strokeWidth={1.5} />,
              <Globe2 key="g" className="h-7 w-7 text-[#0171c1]" strokeWidth={1.5} />,
              <Lock key="l" className="h-7 w-7 text-[#0171c1]" strokeWidth={1.5} />,
            ][idx % 4];

          iconNode = (
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-white/10 text-[#0171c1] transition-transform duration-300 group-hover:scale-110">
              {defaultIcon}
            </div>
          );
        }

        return {
          icon: iconNode,
          title: pillar.title,
          description: pillar.description,
        };
      });
    }
    return ARCHITECTURE_PILLARS.map((p) => ({
      ...p,
      icon: (
        <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-white/10 text-[#0171c1] transition-transform duration-300 group-hover:scale-110">
          {p.icon}
        </div>
      ),
    }));
  }, [pageData?.pillars]);

  // Auto-advance slider (pauses on hover)
  useEffect(() => {
    if (isSliderHovered) return;
    const timer = setInterval(() => {
      setFlagshipSlide((prev) => (prev + 1) % flagshipGallery.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isSliderHovered, flagshipGallery.length]);

  return (
    <div className="flex flex-col bg-white font-sans text-gray-900 selection:bg-[#F99D1C]/20 selection:text-[#001A3D]">
      <Meta
        title="Proprietary Enterprise Software Platforms | Hutech Solutions"
        description={pageDescription}
      />
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#001A3D] pt-10 pb-14 text-white sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20">
        {/* Banner Background Image if configured */}
        {pageData?.heroBgImage && (
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <img
              src={pageData.heroBgImage}
              alt=""
              className="h-full w-full object-cover object-center opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D] via-transparent to-transparent" />
          </div>
        )}

        {/* Subtle grid pattern background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Ambient gradient glow accents */}
        <div className="pointer-events-none absolute -top-40 left-1/4 h-[420px] w-[500px] rounded-full bg-[#0171c1]/25 blur-[120px]" />
        <div className="pointer-events-none absolute top-1/3 right-10 h-[380px] w-[450px] rounded-full bg-[#F99D1C]/15 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-20">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-8 lg:gap-14">
            {/* Left Column: Headline & Value Proposition */}
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="md:col-span-6 lg:col-span-7"
            >
              {/* Eyebrow Pill */}
              <div className="mb-4 sm:mb-5 md:mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#F99D1C] shadow-[0_0_8px_#F99D1C]" />
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-white/90 uppercase">
                  {pageLabel}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="display-font mb-4 sm:mb-6 text-2xl font-semibold tracking-tight text-white sm:text-4xl md:text-3xl lg:text-[54px] lg:leading-[1.12]">
                {renderTitle(pageTitle, "text-white", "text-[#F99D1C]", "text-[#0171c1]")}
              </h1>

              {/* Description */}
              <p className="max-w-2xl text-sm leading-relaxed text-gray-300 md:text-sm lg:text-lg">
                {formatQuotesToBold(pageDescription)}
              </p>

              {/* Trust Checkmarks */}
              {trustList.length > 0 && (
                <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 sm:gap-3">
                  {trustList.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs font-medium text-gray-300">
                      <CheckCircle2
                        className={cn("h-4 w-4 shrink-0", idx % 2 === 0 ? "text-[#F99D1C]" : "text-[#0171c1]")}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </Motion.div>

            {/* Right Column: Hero Lead Capture Form */}
            <Motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="md:col-span-6 lg:col-span-5 w-full"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] p-5 sm:p-6 lg:p-7 backdrop-blur-xl shadow-2xl shadow-[#000a1a]/50 w-full max-w-md sm:max-w-lg md:max-w-none mx-auto">
                {/* Subtle card lighting accents */}
                <div className="pointer-events-none absolute -top-16 -right-16 h-36 w-36 rounded-full bg-[#F99D1C]/20 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-16 -left-16 h-36 w-36 rounded-full bg-[#0171c1]/25 blur-2xl" />

                <div className="relative z-10">
                  <div className="mb-4 sm:mb-5">
                    <span className="inline-block rounded-full bg-[#F99D1C]/15 px-3 py-1 text-[10px] font-bold tracking-wider text-[#F99D1C] uppercase">
                      {pageData?.heroFormBadge || "REQUEST DEMO"}
                    </span>
                    <h3 className="display-font mt-1.5 sm:mt-2 text-lg sm:text-xl lg:text-2xl font-bold text-white">
                      {renderTitle(
                        pageData?.heroFormTitle || "Experience Our Platforms",
                        "text-white",
                        "text-[#F99D1C]",
                        "text-[#0171c1]"
                      )}
                    </h3>
                    <p className="mt-1 text-xs text-gray-300 leading-relaxed">
                      {pageData?.heroFormSubtitle || "Connect with our enterprise solution architects for a live interactive demo."}
                    </p>
                  </div>

                  <form onSubmit={handleHeroFormSubmit} className="space-y-3 sm:space-y-3.5">
                    {/* Name Field */}
                    <div>
                      <label className="mb-1 block text-[11px] font-semibold tracking-wider text-gray-300 uppercase">
                        Name <span className="text-[#F99D1C]">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          required
                          value={heroForm.name}
                          onChange={(e) => setHeroForm((prev) => ({ ...prev, name: e.target.value }))}
                          placeholder="Your Full Name"
                          className="w-full rounded-lg border border-white/15 bg-white/[0.06] py-2.5 sm:py-3 pr-4 pl-10 text-xs sm:text-sm text-white placeholder-gray-400 outline-none transition-all focus:border-[#F99D1C] focus:bg-white/10 focus:ring-1 focus:ring-[#F99D1C]"
                        />
                      </div>
                    </div>

                    {/* Mail ID Field */}
                    <div>
                      <label className="mb-1 block text-[11px] font-semibold tracking-wider text-gray-300 uppercase">
                        Mail ID <span className="text-[#F99D1C]">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          required
                          value={heroForm.email}
                          onChange={(e) => setHeroForm((prev) => ({ ...prev, email: e.target.value }))}
                          placeholder="name@company.com"
                          className="w-full rounded-lg border border-white/15 bg-white/[0.06] py-2.5 sm:py-3 pr-4 pl-10 text-xs sm:text-sm text-white placeholder-gray-400 outline-none transition-all focus:border-[#F99D1C] focus:bg-white/10 focus:ring-1 focus:ring-[#F99D1C]"
                        />
                      </div>
                    </div>

                    {/* Phone Number Field */}
                    <div>
                      <label className="mb-1 block text-[11px] font-semibold tracking-wider text-gray-300 uppercase">
                        Phone Number <span className="text-[#F99D1C]">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={heroForm.phone}
                          onChange={(e) => setHeroForm((prev) => ({ ...prev, phone: e.target.value }))}
                          placeholder="+1 (555) 000-0000"
                          className="w-full rounded-lg border border-white/15 bg-white/[0.06] py-2.5 sm:py-3 pr-4 pl-10 text-xs sm:text-sm text-white placeholder-gray-400 outline-none transition-all focus:border-[#F99D1C] focus:bg-white/10 focus:ring-1 focus:ring-[#F99D1C]"
                        />
                      </div>
                    </div>

                    {/* Feedback Status */}
                    {heroFormStatus.type && (
                      <div
                        className={cn(
                          "rounded-lg p-3 text-xs font-medium",
                          heroFormStatus.type === "success"
                            ? "border border-emerald-500/30 bg-emerald-500/15 text-emerald-300"
                            : "border border-rose-500/30 bg-rose-500/15 text-rose-300"
                        )}
                      >
                        {heroFormStatus.message}
                      </div>
                    )}

                    {/* Submit Button with Click Event Tracking */}
                    <button
                      type="submit"
                      disabled={isHeroSubmitting}
                      onClick={handleHeroButtonClick}
                      className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#F99D1C] to-[#f58d04] px-5 sm:px-6 py-3 sm:py-3.5 text-xs font-bold tracking-wider text-[#001A3D] uppercase shadow-lg shadow-[#F99D1C]/25 transition-all duration-300 hover:from-[#f58d04] hover:to-[#e07a00] hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                    >
                      <span>
                        {isHeroSubmitting
                          ? "Submitting Request..."
                          : pageData?.heroFormBtnText || "Request Platform Demo"}
                      </span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>

                    <p className="text-center text-[10px] text-gray-400">
                      {pageData?.heroFormNote || "🔒 Enterprise confidentiality guaranteed. No spam."}
                    </p>
                  </form>
                </div>
              </div>
            </Motion.div>
          </div>
        </div>
      </section>
      {/* Products Catalog Area - Search bar stickiness is strictly bounded to this container */}
      <div className="relative">
        {/* Sticky Filter & Search Bar */}
        <section
          id="products-catalog"
          className="sticky top-[64px] z-30 border-b border-gray-100 bg-white/95 py-3 sm:py-3.5 backdrop-blur-md shadow-sm transition-all"
        >
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Left: Summary Count / Active Filters Info */}
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 truncate">
              <span className="font-bold text-[#001A3D]">{filteredProducts.length}</span>
              <span>{filteredProducts.length === 1 ? "platform available" : "platforms available"}</span>
              {(activeCategory !== "All Products" || searchQuery) && (
                <span className="text-gray-400 truncate">
                  • filtered by{" "}
                  {activeCategory !== "All Products" && (
                    <strong className="text-[#0171c1]">{activeCategory}</strong>
                  )}
                  {activeCategory !== "All Products" && searchQuery && " + "}
                  {searchQuery && <strong className="text-[#F99D1C]">"{searchQuery}"</strong>}
                </span>
              )}
            </div>

            {/* Right: Enhanced Search Bar + Filter Option Beside It */}
            <div className="flex w-full sm:w-auto flex-1 items-center justify-end gap-2.5 sm:gap-3 sm:max-w-xl">
              {/* Enhanced Search Input */}
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 sm:left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={
                    pageData?.catalogSearchPlaceholder ||
                    "Search platforms by name, capability, or stack..."
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/70 py-2 sm:py-2.5 pr-8 sm:pr-9 pl-9 sm:pl-10 text-xs font-medium text-gray-800 transition-all placeholder:text-gray-400 placeholder:truncate focus:border-[#0171c1] focus:bg-white focus:ring-4 focus:ring-[#0171c1]/10 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute top-1/2 right-2.5 sm:right-3 -translate-y-1/2 rounded-full p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Filter Option Beside Search Bar */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsFilterOpen((prev) => !prev)}
                  aria-label="Filter by category"
                  className={cn(
                    "relative flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl border transition-all cursor-pointer shadow-xs",
                    activeCategory !== "All Products"
                      ? "border-[#0171c1] bg-blue-50 text-[#0171c1]"
                      : "border-gray-200 bg-white text-gray-600 hover:border-[#0171c1] hover:text-[#0171c1]"
                  )}
                  title={activeCategory !== "All Products" ? `Filtered: ${activeCategory}` : "Filter platforms"}
                >
                  <Filter className="h-4 w-4" />
                  {activeCategory !== "All Products" && (
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#F99D1C]" />
                  )}
                </button>

                {/* Filter Dropdown Menu */}
                {isFilterOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsFilterOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 z-50 w-72 max-w-[calc(100vw-32px)] rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl shadow-black/10 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                          Filter by Category
                        </span>
                        {activeCategory !== "All Products" && (
                          <button
                            onClick={() => {
                              setActiveCategory("All Products");
                              router.push("/products", { scroll: false });
                              setIsFilterOpen(false);
                            }}
                            className="text-[11px] font-bold text-[#0171c1] hover:underline cursor-pointer"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                      <div className="py-1">
                        {PRODUCT_CATEGORIES.map((cat) => {
                          const isSelected = activeCategory === cat;
                          const count =
                            cat === "All Products"
                              ? allItems.length
                              : allItems.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length;

                          return (
                            <button
                              key={cat}
                              onClick={() => {
                                setActiveCategory(cat);
                                router.push(`/products?category=${encodeURIComponent(cat)}`, { scroll: false });
                                setIsFilterOpen(false);
                              }}
                              className={cn(
                                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition-all cursor-pointer",
                                isSelected
                                  ? "bg-[#001A3D] text-white"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-[#0171c1]"
                              )}
                            >
                              <span className="truncate">{cat}</span>
                              <span
                                className={cn(
                                  "ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold",
                                  isSelected ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                                )}
                              >
                                {count}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Quick Reset Button if active filters exist */}
              {(activeCategory !== "All Products" || searchQuery) && (
                <button
                  onClick={() => {
                    setActiveCategory("All Products");
                    setSearchQuery("");
                    router.push("/products", { scroll: false });
                  }}
                  className="hidden md:inline-flex items-center gap-1 text-[11px] font-bold text-gray-500 hover:text-[#0171c1] cursor-pointer whitespace-nowrap"
                  title="Clear all filters"
                >
                  <X className="h-3.5 w-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Platform Spotlight (LumaCore) */}
      {showFlagshipSpotlight && (
        <section className="border-b border-gray-100 bg-gradient-to-b from-gray-50/50 to-white py-6 sm:py-7 lg:py-8">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-20">
            {/* Clean Section Eyebrow */}
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="h-1 w-6 rounded-full bg-[#F99D1C]" />
                <span className="text-[11px] font-bold tracking-[0.25em] text-gray-500 uppercase">
                  {pageData?.spotlightEyebrow || "Flagship Platform Spotlight"}
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                {pageData?.spotlightBadge || "Enterprise Ready • v4.2"}
              </span>
            </div>

            {/* Spotlight Card */}
            <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-4 sm:p-6 lg:p-7 shadow-lg shadow-gray-100/60">
              <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
                {/* Left Column: Focused copy */}
                <div className="lg:col-span-5 space-y-3.5">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold text-[#0171c1] uppercase tracking-wider">
                    <Sparkles className="h-3 w-3 text-[#F99D1C]" />
                    {flagship.category}
                  </div>

                  <div>
                    <h2 className="display-font text-xl font-bold tracking-tight text-[#001A3D] sm:text-2xl lg:text-3xl">
                      {flagship.title}
                    </h2>
                    <p className="mt-1 text-xs font-medium text-gray-500 sm:text-sm">
                      {flagship.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed text-gray-600 line-clamp-3">
                    {flagship.description}
                  </p>

                  {/* Clean 3-bullet capabilities */}
                  <div className="pt-1 space-y-1.5">
                    {flagship.capabilities.slice(0, 3).map((cap: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#0171c1]" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div className="pt-2 flex items-center">
                    <Link
                      href={`/products/${flagship.slug || pageData?.spotlightSlug}`}
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-[#001A3D] px-5 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-md transition-all duration-300 hover:bg-[#0171c1] hover:shadow-lg hover:scale-[1.02] sm:hover:scale-105 active:scale-95"
                    >
                      <span>{pageData?.spotlightCtaText || `Explore ${flagship.title}`}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Right Column: Modern Image Gallery Slider */}
                <div
                  className="lg:col-span-7"
                  onMouseEnter={() => setIsSliderHovered(true)}
                  onMouseLeave={() => setIsSliderHovered(false)}
                >
                  <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-950 shadow-xl group">
                    {/* Window Title Bar */}
                    <div className="flex items-center justify-between border-b border-white/10 bg-[#001A3D] px-3 sm:px-4 py-2">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/90" />
                          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/90" />
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/90" />
                        </div>
                        <div className="ml-2 hidden sm:flex items-center gap-1.5 rounded bg-white/5 px-2 py-0.5 text-[10px] font-mono text-gray-300 border border-white/5">
                          <Lock className="h-2.5 w-2.5 text-emerald-400" />
                          <span>{flagshipGallery[flagshipSlide]?.path}</span>
                        </div>
                      </div>

                      {/* Slide Counter & Live Indicator */}
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono font-semibold tracking-wider text-gray-300">
                          0{flagshipSlide + 1} <span className="text-gray-500">/</span> 0{flagshipGallery.length}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          LIVE
                        </span>
                      </div>
                    </div>

                    {/* App Visual Canvas / Slider */}
                    <div className="relative h-[230px] sm:h-[290px] lg:h-[340px] w-full overflow-hidden bg-gray-950">
                      <AnimatePresence mode="wait">
                        <Motion.div
                          key={flagshipSlide}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.02 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="absolute inset-0 h-full w-full"
                        >
                          <ImageWithFallback
                            src={flagshipGallery[flagshipSlide].image}
                            alt={flagshipGallery[flagshipSlide].title}
                            className="h-full w-full object-cover"
                          />
                          {/* Rich gradient overlays for depth and readability */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D] via-[#001A3D]/40 to-transparent" />
                          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D]/50 via-transparent to-transparent" />
                        </Motion.div>
                      </AnimatePresence>

                      {/* Left / Right Arrow Controls */}
                      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 sm:px-3 pointer-events-none z-10">
                        <button
                          type="button"
                          onClick={() =>
                            setFlagshipSlide(
                              (prev) => (prev - 1 + flagshipGallery.length) % flagshipGallery.length
                            )
                          }
                          aria-label="Previous platform preview"
                          className="pointer-events-auto flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-black/80 hover:border-white/40 active:scale-95 cursor-pointer shadow-md"
                        >
                          <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setFlagshipSlide((prev) => (prev + 1) % flagshipGallery.length)
                          }
                          aria-label="Next platform preview"
                          className="pointer-events-auto flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-black/80 hover:border-white/40 active:scale-95 cursor-pointer shadow-md"
                        >
                          <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>
                      </div>

                      {/* Floating Key Info Card at Bottom */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 z-10 rounded-lg border border-white/15 bg-[#001A3D]/90 p-2 sm:p-3 backdrop-blur-md shadow-lg">
                        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-[#F99D1C] uppercase shrink-0">
                                {flagshipGallery[flagshipSlide].tag}
                              </span>
                              <span className="text-gray-500 text-[10px]">•</span>
                              <span className="truncate text-[11px] sm:text-xs font-semibold text-white">
                                {flagshipGallery[flagshipSlide].title}
                              </span>
                            </div>
                            <p className="mt-0.5 truncate text-[10px] sm:text-[11px] text-gray-300">
                              {flagshipGallery[flagshipSlide].description}
                            </p>
                          </div>

                          <div className="flex shrink-0 items-center gap-2">
                            <div className="rounded border border-white/10 bg-white/10 px-2 py-0.5 text-right">
                              <div className="text-[7px] sm:text-[8px] font-medium text-gray-400 uppercase tracking-wider">
                                Benchmark
                              </div>
                              <div className="text-[11px] sm:text-xs font-bold text-white">
                                {flagshipGallery[flagshipSlide].metric}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Interactive Thumbnail / Tab Selector */}
                    <div className="grid grid-cols-4 border-t border-white/10 bg-[#001A3D]">
                      {flagshipGallery.map((slide, idx) => {
                        const isActive = idx === flagshipSlide;
                        return (
                          <button
                            key={slide.id}
                            type="button"
                            onClick={() => setFlagshipSlide(idx)}
                            className={cn(
                              "relative px-1 sm:px-1.5 py-2 text-center transition-all cursor-pointer",
                              isActive
                                ? "bg-white/10 text-white font-bold"
                                : "text-gray-400 hover:bg-white/5 hover:text-gray-200 font-medium"
                            )}
                          >
                            <span className="block truncate text-[9px] sm:text-[10px] md:text-[11px] tracking-tight sm:tracking-normal">
                              {slide.label}
                            </span>
                            {/* Active Tab Accent Line */}
                            {isActive && (
                              <Motion.div
                                layoutId="activeFlagshipTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0171c1] to-[#F99D1C]"
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Products Grid Section */}
      <section className="py-10 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-20">
          {/* Section Header */}
          <div className="mb-6 sm:mb-8 flex flex-col justify-between gap-3 sm:gap-4 border-b border-gray-100 pb-4 sm:pb-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-1.5 sm:mb-2 flex items-center gap-2">
                <span className="h-1.5 w-6 rounded-full bg-[#0171c1]" />
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#0171c1] uppercase">
                  {pageData?.catalogEyebrow || "Available Solutions"}
                </span>
              </div>
              <h2 className="display-font text-xl sm:text-2xl lg:text-3xl font-bold text-[#001A3D]">
                {renderTitle(
                  pageData?.catalogTitle || "Enterprise Product Catalog",
                  "text-[#001A3D]",
                  "text-[#F99D1C]",
                  "text-[#0171c1]"
                )}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-gray-500">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              <span>
                Showing{" "}
                <strong className="text-[#001A3D]">
                  {visibleProducts.length}
                </strong>
                {filteredProducts.length > visibleProducts.length ? (
                  <>
                    {" "}of <strong className="text-[#001A3D]">{filteredProducts.length}</strong>
                  </>
                ) : null}{" "}
                {filteredProducts.length === 1 ? "platform" : "platforms"}
              </span>
              {activeCategory !== "All Products" && (
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-[#0171c1]">
                  in {activeCategory}
                </span>
              )}
            </div>
          </div>

          {/* Cards Grid */}
          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {visibleProducts.map((product) => {
                    const icon = ICON_MAP[product.iconName] || <Sparkles className="h-4 w-4" />;
                    const displayTagline =
                      product.tagline &&
                      product.tagline.toLowerCase() !== product.category.toLowerCase() &&
                      product.tagline.toLowerCase() !== product.badge?.toLowerCase()
                        ? product.tagline
                        : product.capabilities?.[0] || product.category;

                    return (
                      <Motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.3 }}
                        className="group flex flex-col"
                      >
                        <Link
                          href={`/products/${product.slug}`}
                          className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0171c1] hover:shadow-xl hover:shadow-[#001A3D]/8"
                        >
                          {/* Card Visual Thumbnail */}
                          <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                            <ImageWithFallback
                              src={product.image}
                              alt={product.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15" />

                            {/* Top Badge (Single clean pill, no icon) */}
                            {(product.badge || product.category) && (
                              <div className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3">
                                <span className="rounded-full bg-[#001A3D]/85 backdrop-blur-md px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] font-bold tracking-wider text-[#F99D1C] border border-white/10 uppercase shadow-sm">
                                  {product.badge || product.category}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Card Body */}
                          <div className="flex flex-1 flex-col justify-between p-4 sm:p-5 lg:p-6">
                            <div>
                              {/* Category Eyebrow */}
                              {product.category &&
                                product.category.toLowerCase() !== product.badge?.toLowerCase() && (
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0171c1]">
                                    {product.category}
                                  </span>
                                )}
                              {/* Title & Arrow Header */}
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0 flex-1">
                                  <h3 className="display-font text-base sm:text-lg lg:text-xl font-bold text-[#001A3D] transition-colors group-hover:text-[#0171c1] truncate">
                                    {product.title}
                                  </h3>
                                  <p className="mt-0.5 sm:mt-1 text-xs font-medium text-gray-500 line-clamp-1">
                                    {displayTagline}
                                  </p>
                                </div>
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all duration-300 group-hover:bg-[#0171c1] group-hover:text-white group-hover:translate-x-0.5">
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </div>
                              </div>

                              {/* Description */}
                              <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm leading-relaxed text-gray-600 line-clamp-2">
                                {product.description}
                              </p>

                              {/* Key Stats Bar */}
                              {product.stats && product.stats.length > 0 && (
                                <div className="mt-3.5 sm:mt-4 flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/80 px-2.5 sm:px-3 py-1.5 sm:py-2">
                                  <div className="flex items-center gap-1.5 min-w-0 flex-1 truncate">
                                    <span className="text-xs font-black text-[#001A3D] shrink-0">
                                      {product.stats[0].value}
                                    </span>
                                    <span className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-tight truncate">
                                      {product.stats[0].label}
                                    </span>
                                  </div>
                                  {product.stats[1] && (
                                    <div className="flex items-center gap-1.5 border-l border-gray-200 pl-2.5 sm:pl-3 min-w-0 flex-1 justify-end truncate">
                                      <span className="text-xs font-black text-[#0171c1] shrink-0">
                                        {product.stats[1].value}
                                      </span>
                                      <span className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-tight truncate">
                                        {product.stats[1].label}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Capabilities Pill Strip */}
                              {product.capabilities && product.capabilities.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-1 sm:gap-1.5">
                                  {product.capabilities.slice(0, 2).map((cap, idx) => (
                                    <span
                                      key={idx}
                                      className="inline-flex items-center gap-1 rounded-md bg-blue-50/70 px-2 py-0.5 text-[9px] sm:text-[10px] font-medium text-[#0171c1]"
                                    >
                                      <span className="h-1 w-1 rounded-full bg-[#0171c1]" />
                                      <span className="truncate max-w-[120px] sm:max-w-[140px]">{cap}</span>
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Footer Action */}
                            <div className="mt-4 sm:mt-5 flex items-center justify-between border-t border-gray-100 pt-3 sm:pt-3.5">
                              <span className="text-xs font-bold text-[#001A3D] transition-colors group-hover:text-[#0171c1] flex items-center gap-1">
                                <span>{product.ctaText || `Explore Platform`}</span>
                                <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 text-[#0171c1]" />
                              </span>

                              {product.compliance && product.compliance.length > 0 && (
                                <span className="rounded bg-gray-100 px-2 py-0.5 text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                                  {product.compliance[0]}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      </Motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Load More Section */}
              {hasMoreProducts && (
                <div className="mt-8 sm:mt-10 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => prev + (pageData?.postsCount || pageData?.productsCount || 6))}
                    className="group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 sm:px-6 py-2.5 text-xs font-semibold text-gray-700 shadow-xs transition-all duration-200 hover:border-[#0171c1] hover:text-[#0171c1] hover:shadow-sm active:scale-95 cursor-pointer"
                  >
                    <span>{pageData?.catalogLoadMoreBtnText || "Load More"}</span>
                    <ChevronDown className="h-3.5 w-3.5 text-gray-400 transition-colors group-hover:text-[#0171c1]" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-2xl border border-gray-200 bg-gray-50/50 py-16 sm:py-24 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm">
                <Search className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <h3 className="display-font text-lg sm:text-xl font-bold text-[#001A3D]">
                {pageData?.catalogNoResultsTitle || "No matching software platforms found"}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-500">
                {pageData?.catalogNoResultsDescription || "Try searching with different keywords or clearing your active filters."}
              </p>
              <button
                onClick={() => {
                  setActiveCategory("All Products");
                  setSearchQuery("");
                  router.push("/products", { scroll: false });
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-sm bg-[#001A3D] px-5 sm:px-6 py-2.5 text-xs font-bold tracking-wider text-white uppercase transition-all hover:bg-[#0171c1]"
              >
                <span>{pageData?.catalogResetBtnText || "Reset Filters"}</span>
              </button>
            </div>
          )}
        </div>
      </section>
      </div>

      {/* Enterprise Architecture Pillars */}
      <section className="border-t border-gray-100 bg-[#001A3D] py-14 sm:py-18 lg:py-24 text-white">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-20">
          <div className="max-w-2xl">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-6 rounded-full bg-[#F99D1C]" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-[#F99D1C] uppercase">
                {pageData?.pillarsEyebrow || "Enterprise Standards"}
              </span>
            </div>
            <h2 className="display-font text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              {renderTitle(
                pageData?.pillarsTitle || "Architected for Mission-Critical |Enterprise Environments.",
                "text-white",
                "text-[#F99D1C]",
                "text-[#0171c1]"
              )}
            </h2>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm lg:text-base leading-relaxed text-gray-300">
              {formatQuotesToBold(
                pageData?.pillarsDescription ||
                  "Every Hutech software product is built according to defense-in-depth principles, guaranteeing zero vendor lock-in, open APIs, and continuous regulatory adherence."
              )}
            </p>
          </div>

          <div className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8">
            {pillarsList.map((pillar, idx) => (
              <div
                key={idx}
                className="group space-y-4 sm:space-y-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 xl:p-8 transition-all duration-300 hover:bg-white/[0.07] hover:border-white/20 hover:-translate-y-0.5"
              >
                {pillar.icon}
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="display-font text-lg sm:text-xl font-bold tracking-tight text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed font-normal text-gray-300/90">
                    {formatQuotesToBold(pillar.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PreFooter CTA Section (Floating Modern Product Banner) */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-20">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#00132B] via-[#002B5B] to-[#000E20] p-6 sm:p-10 lg:p-16 text-white shadow-2xl border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* CTA Background Image if configured */}
            {pageData?.ctaBgImage && (
              <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                <img
                  src={pageData.ctaBgImage}
                  alt=""
                  className="h-full w-full object-cover object-center opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#00132B] via-[#002B5B]/85 to-transparent" />
              </div>
            )}

            {/* Ambient Glow */}
            <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-[#0171c1]/20 blur-[130px]" />

            {/* Left Content */}
            <div className="relative z-10 max-w-xl space-y-4 sm:space-y-6 w-full lg:w-auto">
              <div className="mb-2 sm:mb-3 flex items-center gap-2.5 sm:gap-3">
                <span className="block h-[2px] w-6 md:w-8 shrink-0 bg-[#F99D1C]" />
                <span className="text-[10px] sm:text-[11px] md:text-[12px] font-bold tracking-[0.25em] text-[#F99D1C] uppercase">
                  {pageData?.ctaTag || "Ready When You Are"}
                </span>
              </div>

              <h2 className="display-font text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
                {renderTitle(
                  pageData?.ctaTitle || "Turn your best ideas\ninto |real momentum.",
                  "text-white",
                  "text-[#F99D1C] italic font-normal",
                  "text-[#0171c1]"
                )}
              </h2>

              <p className="text-xs sm:text-sm lg:text-base text-gray-300 font-normal leading-relaxed">
                {formatQuotesToBold(
                  pageData?.ctaDescription ||
                    "See how our proprietary platforms can transform the way your organization works."
                )}
              </p>

              <div className="pt-2">
                <Link
                  href={pageData?.ctaBtnLink || "/contact"}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-lg bg-[#0171c1] px-6 sm:px-8 py-3.5 sm:py-4 text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-[#0171c1]/30 hover:bg-white hover:text-[#001A3D] transition-all"
                >
                  <span>{pageData?.ctaBtnText || "Book Your Personalized Demo"}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Concentric Radar Graphic: Ambient BG on mobile/tablet, relative column on desktop */}
            <div className="absolute -bottom-20 -right-20 sm:-bottom-16 sm:-right-12 lg:relative lg:bottom-auto lg:right-auto z-0 lg:z-10 shrink-0 pointer-events-none lg:pointer-events-auto opacity-15 sm:opacity-20 lg:opacity-100 transition-opacity">
              <div className="relative flex h-60 w-60 sm:h-72 sm:w-72 lg:h-72 lg:w-72 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <div className="flex h-44 w-44 sm:h-56 sm:w-56 lg:h-44 lg:w-44 items-center justify-center rounded-full border border-[#0171c1]/30">
                  <div className="flex h-28 w-28 sm:h-36 sm:w-36 lg:h-28 lg:w-28 items-center justify-center rounded-full border border-[#0171c1]/60 bg-[#0171c1]/10">
                    <span className="h-10 w-10 sm:h-12 sm:w-12 lg:h-10 lg:w-10 rounded-full bg-[#0171c1] shadow-lg shadow-[#0171c1]/50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
