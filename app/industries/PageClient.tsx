"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import {
  Activity,
  Landmark,
  Lightbulb,
  Truck,
  MoveRight,
  ShieldCheck,
  Zap,
  Globe2,
  Factory,
  ShoppingBag,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { Meta } from "@/components/Meta";
import { IndustryPageData, IndustryItem } from "@/lib/wordpress";
import { renderTitle } from "@/lib/utils";

const INDUSTRIES_DATA = [
  {
    name: "Banking & Financial Services",
    path: "/industries/banking-finance",
    icon: <Landmark className="h-12 w-12 text-[#F99D1C]" />,
    desc: "Next-gen fintech architectures, secure payment gateways, and AI-driven fraud detection for the world's leading banks.",
    image:
      "https://images.unsplash.com/photo-1590649681928-4b179f773bd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stats: ["99.9% Uptime", "PCI DSS Compliant", "AI Risk Engines"],
  },
  {
    name: "Healthcare & Life Sciences",
    path: "/industries/healthcare-life-sciences",
    icon: <Activity className="h-12 w-12 text-[#F99D1C]" />,
    desc: "Patient-centric ecosystems, HIPAA-compliant cloud storage, and predictive analytics for personalized medicine.",
    image:
      "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stats: ["Precision Tech", "Secure Data", "Patient Portals"],
  },
  {
    name: "Utilities & Energy",
    path: "/industries/utilities-energy",
    icon: <Lightbulb className="h-12 w-12 text-[#F99D1C]" />,
    desc: "Smart grid optimization, renewable energy management platforms, and real-time operational monitoring.",
    image:
      "https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stats: ["Grid Intelligence", "Green Energy", "Edge Computing"],
  },
  {
    name: "Logistics & Supply Chain",
    path: "/industries/logistics-supply-chain",
    icon: <Truck className="h-12 w-12 text-[#F99D1C]" />,
    desc: "Automated warehouse management, AI routing optimization, and blockchain-based tracking for global shipping.",
    image:
      "https://images.unsplash.com/photo-1644134913822-1cd030b3d148?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stats: ["Real-time Tracking", "Smart Warehousing", "Route AI"],
  },
  {
    name: "Manufacturing",
    path: "/industries/manufacturing",
    icon: <Factory className="h-12 w-12 text-[#F99D1C]" />,
    desc: "Industry 4.0 transformation, AI-driven quality control, and predictive maintenance for smart factory excellence.",
    image:
      "https://images.unsplash.com/photo-1647427060118-4911c9821b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stats: ["IIoT Integrated", "OEE Optimized", "Predictive Tech"],
  },
  {
    name: "Retail & Consumer",
    path: "/industries/retail-consumer",
    icon: <ShoppingBag className="h-12 w-12 text-[#F99D1C]" />,
    desc: "Omnichannel commerce, hyper-personalization, and smart retail tech that builds lasting customer loyalty.",
    image:
      "https://images.unsplash.com/photo-1764795849878-59b546cfe9c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stats: ["Seamless UX", "AI Personalization", "Real-time Stock"],
  },
];

export default function Industries({
  pageData,
  industriesList,
}: {
  pageData?: IndustryPageData | null;
  industriesList?: IndustryItem[];
}) {
  // Use dynamic data if available (has items), otherwise fall back to static
  const hasWpData = industriesList && industriesList.length > 0;

  const label = pageData?.label || "Industry Verticals";
  const titleRaw = pageData?.title || "Domain Expertise. |Universal Impact.";
  const description = pageData?.description || "We specialize in vertical-specific technology solutions that address the unique complexities and compliance requirements of global markets.";
  const ctaTitle = pageData?.ctaTitle || "Scale Your Industry Dominance Today.";
  const ctaBtnText = pageData?.ctaBtnText || "Request Consultation";
  const ctaBtnLink = pageData?.ctaBtnLink || "/contact";
  const ctaSecondaryText = pageData?.ctaSecondaryText || "Global Offices";
  const ctaSecondaryLink = pageData?.ctaSecondaryLink || "/contact";
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="Expertise Across Industries | Hutech Solutions"
        description="Engineering excellence across Banking, Healthcare, Utilities, Logistics, and more. Vertical-specific technology solutions for global impact."
      />
      <Breadcrumbs variant="light" />

      {/* Page Header */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_center,#F99D1C_0%,transparent_70%)] opacity-20"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 text-left lg:px-20">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl space-y-8"
          >
            <div className="flex items-center space-x-3">
              <span className="h-[1px] w-12 bg-[#F99D1C]"></span>
              <span className="text-xs font-semibold tracking-wide text-[#F99D1C]">
                {label}
              </span>
            </div>
            <h1 className="display-font text-5xl leading-[1.05] font-semibold tracking-tight md:text-8xl">
              {renderTitle(titleRaw)}
            </h1>
            <p className="max-w-2xl text-xl leading-relaxed font-medium text-gray-400">
              {description}
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Industries Alternate Grid */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1280px] space-y-48 px-6 lg:px-20">
          {(hasWpData ? industriesList! : INDUSTRIES_DATA).map((ind: any, idx: number) => (
            <div
              key={ind.name || ind.title}
              className={`flex flex-col items-center gap-24 lg:flex-row ${idx % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
            >
              <Motion.div
                initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex-1 space-y-10"
              >
                <div className="w-fit rounded-2xl border border-gray-100 bg-gray-50 p-5 shadow-sm">
                  {ind.icon || <Globe2 className="h-12 w-12 text-[#F99D1C]" />}
                </div>
                <div className="space-y-4">
                  <h2 className="display-font text-4xl leading-tight font-semibold tracking-tight text-[#001A3D] md:text-5xl">
                    {ind.name || ind.title}
                  </h2>
                  <p className="text-lg leading-relaxed font-medium text-gray-500">{ind.desc}</p>
                </div>

                {ind.stats && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {ind.stats.map((stat: any, i: number) => (
                      <div
                        key={i}
                        className="flex items-center space-x-2 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-[11px] font-semibold tracking-wide text-[#001A3D]"
                      >
                        <ShieldCheck className="h-4 w-4 text-[#F99D1C] flex-shrink-0" />
                        <span>{typeof stat === 'string' ? stat : `${stat.value} ${stat.label}`}</span>
                      </div>
                    ))}
                  </div>
                )}

                <ul className="space-y-6 pt-4">
                  {(ind.topSolutions && ind.topSolutions.length > 0
                    ? ind.topSolutions
                    : ["Strategic Transformation", "Domain Consulting", "Operational Efficiency"]
                  ).map(
                    (solution: string, i: number) => (
                      <li key={i} className="group flex cursor-pointer items-center text-sm font-semibold tracking-wide text-gray-400">
                        <div className="mr-4 h-[1.5px] w-8 bg-[#F99D1C] transition-all duration-500 group-hover:w-14" />
                        <span className="transition-colors group-hover:text-[#001A3D]">
                          {solution}
                        </span>
                      </li>
                    )
                  )}
                </ul>

                <div className="pt-6">
                  <Link
                    href={ind.path || ind.href || `/industries/${ind.slug}`}
                    className="group inline-flex items-center rounded-sm bg-[#001A3D] px-10 py-5 text-xs font-bold tracking-wide text-white shadow-2xl shadow-[#001A3D]/20 transition-all hover:bg-[#0171c1]"
                  >
                    Explore {(ind.name || ind.title || "").split(" ")[0]} Solutions
                    <MoveRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-2" />
                  </Link>
                </div>
              </Motion.div>

              <Motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative flex-1"
              >
                <div className="group relative z-10 aspect-[4/3] overflow-hidden rounded-[3rem] border-[12px] border-white shadow-2xl">
                  <ImageWithFallback
                    src={ind.image || ind.imageUrl || ""}
                    alt={ind.name || ind.title}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#001A3D]/10 mix-blend-overlay"></div>
                </div>
                <div
                  className={`absolute -top-10 ${idx % 2 === 0 ? "-right-10" : "-left-10"} -z-10 h-48 w-48 rounded-full bg-[#F99D1C]/10 blur-3xl`}
                ></div>
                <div
                  className={`absolute -bottom-10 ${idx % 2 === 0 ? "-left-10" : "-right-10"} -z-10 h-64 w-64 rounded-full bg-[#001A3D]/5 blur-3xl`}
                ></div>
              </Motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-[#001A3D] py-20 text-white">
        <div className="relative z-10 mx-auto max-w-4xl space-y-12 px-6 text-center">
          <h2 className="display-font text-4xl leading-tight font-semibold tracking-tight md:text-6xl">
            {renderTitle(ctaTitle)}
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href={ctaBtnLink}
              className="rounded-sm bg-[#F99D1C] px-12 py-6 text-sm font-bold tracking-wide text-[#001A3D] shadow-2xl transition-all hover:bg-[#ff9d00]"
            >
              {ctaBtnText}
            </Link>
            <Link
              href={ctaSecondaryLink}
              className="rounded-sm border border-white/10 bg-white/5 px-12 py-6 text-sm font-bold tracking-wide text-white transition-all hover:bg-white/10"
            >
              {ctaSecondaryText}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
