"use client";

import {
  Cpu,
  Cloud,
  BarChart,
  Settings,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Database,
  Globe,
  TrendingUp,
  MoveRight,
  Briefcase,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";
import { ServiceCategoryGroup } from "@/lib/wordpress";
import { renderTitle } from "@/lib/utils";

const BRAND_ORANGE = "#F99D1C";
const BRAND_BLUE = "#001A3D";

const ICON_MAP: Record<string, React.ReactNode> = {
  "ai-ml": <Cpu className="h-8 w-8 text-[#F99D1C]" />,
  "cloud-transformation": <Cloud className="h-8 w-8 text-[#F99D1C]" />,
  "devops": <Settings className="h-8 w-8 text-[#F99D1C]" />,
  "data-engineering": <Database className="h-8 w-8 text-[#F99D1C]" />,
  "data-visualization-reporting": <BarChart className="h-8 w-8 text-[#F99D1C]" />,
  "erp": <Database className="h-8 w-8 text-[#F99D1C]" />,
  "application-development-maintenance": <Settings className="h-8 w-8 text-[#F99D1C]" />,
  "fintech": <TrendingUp className="h-8 w-8 text-[#F99D1C]" />,
  "ecommerce": <ShoppingCart className="h-8 w-8 text-[#F99D1C]" />,
  "consulting": <Briefcase className="h-8 w-8 text-[#F99D1C]" />,
  "ai-consulting": <Sparkles className="h-8 w-8 text-[#F99D1C]" />,
  "iot": <Zap className="h-8 w-8 text-[#F99D1C]" />,
  "cybersecurity": <ShieldCheck className="h-8 w-8 text-[#F99D1C]" />,
};

const SERVICE_CATEGORIES: any[] = [
  {
    category: "Cloud, Data and AI",
    items: [
      {
        title: "AI/ML Solutions",
        href: "/services/ai-ml",
        icon: <Cpu className="h-8 w-8 text-[#F99D1C]" />,
        desc: "Autonomous systems and predictive analytics.",
      },
      {
        title: "Cloud Transformation",
        href: "/services/cloud-transformation",
        icon: <Cloud className="h-8 w-8 text-[#F99D1C]" />,
        desc: "Modernizing legacy apps for the cloud.",
      },
      {
        title: "SRE & DevOps Services",
        href: "/services/devops",
        icon: <Settings className="h-8 w-8 text-[#F99D1C]" />,
        desc: "Ensuring site reliability and efficient deployment.",
      },
      {
        title: "Data Engineering",
        href: "/services/data-engineering",
        icon: <Database className="h-8 w-8 text-[#F99D1C]" />,
        desc: "Robust data pipelines and scalable warehouse architectures.",
      },
      {
        title: "Data Visualization and Reporting",
        href: "/services/data-visualization-reporting",
        icon: <BarChart className="h-8 w-8 text-[#F99D1C]" />,
        desc: "Interactive dashboards and real-time business intelligence reporting.",
      },
    ],
  },
  {
    category: "Enterprise Engineering",
    items: [
      {
        title: "Enterprise Digital Solutions",
        href: "/services/erp",
        icon: <Database className="h-8 w-8 text-[#F99D1C]" />,
        desc: "Optimizing enterprise resource management.",
      },
      {
        title: "Development and Maintenance",
        href: "/services/application-development-maintenance",
        icon: <Settings className="h-8 w-8 text-[#F99D1C]" />,
        desc: "End-to-end application lifecycle management.",
      },
    ],
  },
  {
    category: "Specialized Services",
    items: [
      {
        title: "Banking & Financial Services",
        href: "/services/fintech",
        icon: <TrendingUp className="h-8 w-8 text-[#F99D1C]" />,
        desc: "Secure banking and payment platforms.",
      },
      {
        title: "Ecommerce Development",
        href: "/services/ecommerce",
        icon: <ShoppingCart className="h-8 w-8 text-[#F99D1C]" />,
        desc: "Scalable retail and marketplace systems.",
      },
      {
        title: "Consulting Service",
        href: "/services/consulting",
        icon: <Briefcase className="h-8 w-8 text-[#F99D1C]" />,
        desc: "Expert business and technology strategy consulting.",
      },
      {
        title: "AI Consulting & Prompt Engineering",
        href: "/services/ai-consulting",
        icon: <Sparkles className="h-8 w-8 text-[#F99D1C]" />,
        desc: "Maximize LLM potential with expert AI strategy and advanced prompt design.",
      },
      {
        title: "IOT (Internet of Things)",
        href: "/services/iot",
        icon: <Zap className="h-8 w-8 text-[#F99D1C]" />,
        desc: "Connected ecosystems and smart hardware solutions.",
      },
      {
        title: "Cybersecurity",
        href: "/services/cybersecurity",
        icon: <ShieldCheck className="h-8 w-8 text-[#F99D1C]" />,
        desc: "Protecting your digital assets with advanced defense.",
      },
    ],
  },
];

const ServiceCard = ({ item, itemIdx }: { item: any; itemIdx: number }) => (
  <Link href={item.href}>
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: itemIdx * 0.1 }}
      className="group h-full cursor-pointer rounded-[2.5rem] border border-gray-100 bg-gray-50 p-12 transition-all duration-500 hover:bg-white hover:shadow-2xl"
    >
      <div className="mb-10 w-fit rounded-2xl bg-white p-4 shadow-sm transition-colors group-hover:bg-[#F99D1C]/10">
        {item.iconUrl ? (
          <img src={item.iconUrl} alt={item.title} className="h-8 w-8 object-contain" />
        ) : (
          item.icon || (item.slug && ICON_MAP[item.slug]) || <Settings className="h-8 w-8 text-[#F99D1C]" />
        )}
      </div>
      <h3 className="display-font mb-6 text-2xl font-semibold tracking-tight text-[#001A3D] transition-colors group-hover:text-[#F99D1C]">
        {item.title}
      </h3>
      <p className="mb-10 text-base leading-relaxed font-medium text-gray-500">
        {item.desc}
      </p>
      <div className="mt-auto flex items-center text-[11px] font-semibold tracking-wide text-[#001A3D]">
        Learn More{" "}
        <MoveRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-2" />
      </div>
    </Motion.div>
  </Link>
);

export default function Services({
  pageTitle,
  pageDescription,
  serviceCategories,
  pageData,
}: {
  pageTitle?: string;
  pageDescription?: string;
  serviceCategories?: ServiceCategoryGroup[];
  pageData?: any;
}) {
  const categoriesToRender = serviceCategories && serviceCategories.length > 0 
    ? serviceCategories 
    : SERVICE_CATEGORIES;

  const displayTitle = pageTitle || "Comprehensive Technology Services for |Complex Businesses.";
  const displayDescription = pageDescription || "From strategic consulting to full-cycle development, we provide the technical edge needed to dominate your industry.";

  return (
    <div className="bg-white">
      <Meta
        title="Our Services | Hutech Solutions"
        description="Comprehensive technology services including AI/ML, Data Engineering, SRE & DevOps, and IOT solutions."
      />
      <Breadcrumbs variant="light" />
      <section className="relative flex h-[450px] items-center overflow-hidden border-b border-gray-200 bg-gray-50">
        <div className="absolute top-0 right-0 h-full w-1/4 translate-x-1/2 -skew-x-12 bg-[#F99D1C]/5"></div>
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 text-left lg:px-20">
          <div className="max-w-5xl">
            <span className="text-xs font-semibold tracking-wide text-[#F99D1C]">
              {pageData?.expertiseLabel || "Our Expertise"}
            </span>
            <h1 className="display-font mt-8 text-5xl leading-[1.1] font-semibold tracking-tight text-[#001A3D] md:text-7xl">
              {renderTitle(displayTitle)}
            </h1>
            <p className="mt-10 max-w-2xl text-xl font-medium text-gray-500">
              {displayDescription}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          {categoriesToRender.map((cat, idx) => (
            <div key={cat.category} className={`mb-32 last:mb-0`}>

              
              {(cat.subcategories as any) && cat.subcategories.length > 0 && (
                <div className="space-y-20">
                  {cat.subcategories.map((subcat: any) => (
                    <div key={subcat.name}>
                      <div className="mb-16 flex items-center space-x-4">
                        <div className="h-[2px] w-12 bg-[#F99D1C]"></div>
                        <h2 className="display-font text-sm font-semibold tracking-wide text-[#001A3D]">
                          {subcat.name}
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {subcat.items.map((item: any, itemIdx: number) => (
                          <ServiceCard key={item.title} item={item} itemIdx={itemIdx} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {cat.items && cat.items.length > 0 && (
                <div className={(cat.subcategories as any) && cat.subcategories.length > 0 ? "mt-20" : ""}>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {cat.items.map((item: any, itemIdx: number) => (
                      <ServiceCard key={item.title} item={item} itemIdx={itemIdx} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="relative overflow-hidden bg-[#001A3D] py-24 text-white">
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 opacity-5">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.1" fill="none" />
          </svg>
        </div>
        <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-12 px-6 md:flex-row lg:px-20">
          <div className="display-font max-w-2xl text-3xl leading-tight font-semibold tracking-tight">
            {pageData?.ctaTitle ? renderTitle(pageData.ctaTitle) : (
              <>Ready to engineer your next <span className="text-[#F99D1C]">breakthrough?</span></>
            )}
          </div>
          <Link
            href={pageData?.ctaBtnLink || "/contact"}
            className="rounded-sm bg-[#F99D1C] px-12 py-5 text-xs font-bold tracking-wide text-[#001A3D] shadow-xl shadow-[#F99D1C]/20 transition-all hover:bg-[#ff9d00]"
          >
            {pageData?.ctaBtnText || "Start a Project"}
          </Link>
        </div>
      </section>
    </div>
  );
}
