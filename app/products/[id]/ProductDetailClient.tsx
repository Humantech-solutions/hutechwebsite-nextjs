"use client";

import { motion as Motion } from "framer-motion";
import Link from "next/link";
import { Meta } from "@/components/Meta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  Shield,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Download,
  PlayCircle,
  Settings,
  Layers,
  Globe,
  HelpCircle,
} from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { PRODUCTS_DATA } from "./data";

export default function ProductDetailClient({ id }: { id: string }) {
  const product = id ? PRODUCTS_DATA[id as keyof typeof PRODUCTS_DATA] : null;

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 pt-20">
        <div className="max-w-md space-y-8 px-6 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <HelpCircle size={48} />
          </div>
          <h1 className="display-font text-4xl font-semibold text-[#001A3D]">Solution Not Found</h1>
          <p className="font-medium text-gray-500">
            The specific solution page you are looking for has been moved or is currently being
            updated in our engineering catalog.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 rounded-sm bg-[#001A3D] px-10 py-5 text-[11px] font-black tracking-[0.2em] text-white uppercase transition-all hover:bg-[#0171c1]"
          >
            <ArrowLeft size={16} /> Return to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white">
      <Meta
        title={`${product.title} | Technical Overview | Hutech Solutions`}
        description={product.description}
      />

      {/* Dynamic Header / Hero */}
      <section className="relative overflow-hidden bg-[#001A3D] pt-32 pb-60">
        <div className="absolute inset-0 scale-105 opacity-20">
          <ImageWithFallback
            src={product.heroImage}
            alt={product.title}
            className="h-full w-full object-cover blur-[2px]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#001A3D]/40 via-[#001A3D]/80 to-[#001A3D]"></div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="mb-12 flex items-center gap-4">
              <Link
                href="/products"
                className="flex items-center gap-2 text-[11px] font-black tracking-widest text-white/60 uppercase transition-colors hover:text-[#0171c1]"
              >
                <ArrowLeft size={14} /> Back
              </Link>
              <div className="h-4 w-[1px] bg-white/20"></div>
              <span className="text-[11px] font-black tracking-[0.3em] text-[#0171c1] uppercase">
                {product.category}
              </span>
            </div>

            <div className="mb-10 flex flex-col gap-8 md:flex-row md:items-end">
              <div className="rounded-sm border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
                <div className="text-[#0171c1]">{product.icon}</div>
              </div>
              <div>
                <h1 className="display-font mb-4 text-5xl leading-none font-semibold tracking-tight text-white md:text-7xl">
                  {product.title}
                </h1>
                <div className="flex items-center gap-4 text-sm font-bold tracking-wide text-[#FFAF2B]">
                  <Globe size={18} /> Global Availability <span className="text-white/20">•</span>{" "}
                  v4.2.0 Stable
                </div>
              </div>
            </div>

            <p className="max-w-3xl border-l-4 border-[#0171c1] py-2 pl-8 text-xl leading-relaxed font-medium text-gray-300 md:text-2xl">
              {product.description}
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="relative z-20 mx-auto -mt-32 w-full max-w-[1280px] px-6 lg:px-20">
        <div className="grid grid-cols-1 overflow-hidden rounded-sm border border-gray-100 bg-white shadow-2xl md:grid-cols-3">
          {product.stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`group p-12 text-center transition-colors duration-500 hover:bg-gray-50 ${idx !== 2 ? "border-gray-100 md:border-r" : ""}`}
            >
              <div className="mb-4 text-[10px] font-black tracking-[0.25em] text-gray-400 uppercase transition-colors group-hover:text-[#0171c1]">
                {stat.label}
              </div>
              <div className="display-font text-4xl font-semibold text-[#001A3D]">{stat.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Deep Dive */}
      <section className="py-32">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-20 lg:grid-cols-12">
            {/* Left: Capabilities */}
            <div className="space-y-16 lg:col-span-7">
              <div>
                <h2 className="display-font mb-8 text-4xl font-semibold text-[#001A3D]">
                  Core Engineering Capabilities
                </h2>
                <p className="mb-12 text-lg leading-relaxed font-medium text-gray-500">
                  Built on a foundation of resilience and high-availability, {product.title}{" "}
                  addresses the most demanding requirements of modern enterprise infrastructure.
                </p>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {product.features.map((feature, idx) => (
                    <Motion.div
                      key={idx}
                      whileHover={{ x: 5 }}
                      className="group flex gap-4 rounded-sm border-l-2 border-[#0171c1] bg-gray-50 p-6 transition-all duration-300 hover:bg-white hover:shadow-xl"
                    >
                      <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-[#0171c1]" />
                      <span className="text-sm leading-snug font-bold text-[#001A3D]">
                        {feature}
                      </span>
                    </Motion.div>
                  ))}
                </div>
              </div>

              {/* Architecture Visualization Placeholder */}
              {product.architecture?.steps && product.architecture.steps.length > 0 && (
                <div className="rounded-sm border border-gray-100 bg-gray-50 p-12">
                  <h3 className="display-font mb-10 flex items-center gap-3 text-xl font-semibold text-[#001A3D]">
                    <Layers className="text-[#0171c1]" /> Technical Architecture
                  </h3>
                  <div className="relative flex flex-col items-center justify-between gap-8 md:flex-row">
                    {product.architecture.steps.map((step, idx) => (
                      <div key={step.title} className="relative z-10 flex-1 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-[#001A3D] font-bold text-white shadow-lg">
                          {idx + 1}
                        </div>
                        <h4 className="mb-2 text-sm font-bold text-[#001A3D]">{step.title}</h4>
                        <p className="text-[12px] leading-relaxed font-medium text-gray-500">
                          {step.desc}
                        </p>
                      </div>
                    ))}
                    {/* Connector line */}
                    <div className="absolute top-6 left-0 -z-0 hidden h-[2px] w-full bg-gray-200 md:block"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: CTA & Resources */}
            <div className="space-y-10 lg:col-span-5">
              <div className="relative overflow-hidden rounded-sm bg-[#001A3D] p-12 text-white shadow-2xl">
                <div className="relative z-10">
                  <h3 className="display-font mb-6 text-3xl leading-tight font-semibold">
                    Implement {product.title}
                  </h3>
                  <p className="mb-10 text-lg font-medium text-gray-400">
                    Collaborate with our solution architects to design a custom integration path for
                    your infrastructure.
                  </p>
                  <div className="space-y-4">
                    <button className="group flex w-full items-center justify-center gap-3 rounded-sm bg-[#0171c1] py-6 text-[11px] font-black tracking-widest text-white uppercase transition-all hover:bg-white hover:text-[#001A3D]">
                      Schedule Technical Demo{" "}
                      <PlayCircle
                        size={18}
                        className="transition-transform group-hover:scale-110"
                      />
                    </button>
                    <button className="flex w-full items-center justify-center gap-3 rounded-sm border border-white/20 bg-transparent py-6 text-[11px] font-black tracking-widest text-white uppercase transition-all hover:bg-white/10">
                      View Documentation <Download size={18} />
                    </button>
                  </div>
                </div>
                <div className="absolute right-0 bottom-0 -mr-32 -mb-32 h-64 w-64 rounded-full bg-[#0171c1]/10 blur-[100px]"></div>
              </div>

              {/* Compliance Trust */}
              <div className="space-y-8 rounded-sm border border-gray-100 p-10">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                    Security Certifications
                  </h4>
                  <Shield size={16} className="text-[#0171c1]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-sm bg-gray-50 p-4 text-center">
                    <div className="text-[11px] font-black text-[#001A3D]">ISO 27001</div>
                    <div className="mt-1 text-[9px] font-bold text-gray-400 uppercase">
                      Verified
                    </div>
                  </div>
                  <div className="rounded-sm bg-gray-50 p-4 text-center">
                    <div className="text-[11px] font-black text-[#001A3D]">SOC2 TYPE II</div>
                    <div className="mt-1 text-[9px] font-bold text-gray-400 uppercase">
                      Certified
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              {product.faqs && product.faqs.length > 0 && (
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                    Common Inquiries
                  </h4>
                  <div className="space-y-4">
                    {product.faqs.map((faq, i) => (
                      <div key={i} className="group cursor-help">
                        <div className="mb-1 flex items-start gap-2 text-sm font-bold text-[#001A3D]">
                          <span className="text-[#0171c1]">Q:</span> {faq.q}
                        </div>
                        <div className="pl-6 text-[13px] leading-relaxed font-medium text-gray-500">
                          {faq.a}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Integration Banner */}
      <section className="border-y border-gray-100 bg-gray-50 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            <div className="flex-1 text-center lg:text-left">
              <span className="mb-4 block text-[10px] font-black tracking-[0.3em] text-[#0171c1] uppercase">
                Connectivity First
              </span>
              <h2 className="display-font mb-6 text-3xl leading-tight font-semibold text-[#001A3D] md:text-5xl">
                Engineered for <br /> Multi-Vendor Ecosystems
              </h2>
              <p className="max-w-xl text-lg font-medium text-gray-500">
                We ensure our products integrate seamlessly with your existing technology stack,
                reducing time-to-value for global engineering teams.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8 opacity-40 grayscale md:grid-cols-4">
              <Settings size={48} />
              <Globe size={48} />
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Navigation */}
      <section className="py-20">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-12 px-6 md:flex-row lg:px-20">
          <Link
            href="/products"
            className="group flex items-center gap-6 text-[#001A3D] transition-all"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-100 transition-all duration-500 group-hover:border-[#0171c1] group-hover:bg-[#0171c1] group-hover:text-white group-hover:shadow-xl">
              <ArrowLeft size={20} />
            </div>
            <div>
              <div className="mb-1 text-[10px] font-black tracking-widest text-gray-400 uppercase">
                Explore More
              </div>
              <div className="text-lg font-bold">Return to Product Catalog</div>
            </div>
          </Link>

          <Link
            href="/contact"
            className="group flex items-center gap-6 text-right text-[#001A3D] transition-all"
          >
            <div className="text-right">
              <div className="mb-1 text-[10px] font-black tracking-widest text-gray-400 uppercase">
                Next Step
              </div>
              <div className="text-lg font-bold">Inquire Technical Spec</div>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#001A3D] text-white transition-all duration-500 group-hover:bg-[#0171c1] group-hover:shadow-xl">
              <ArrowRight size={20} />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
