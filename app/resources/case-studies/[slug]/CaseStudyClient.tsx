"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import {
  CheckCircle2,
  ArrowRight,
  ArrowUp,
  BarChart3,
  MoveRight,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { CASE_STUDIES_DETAILS } from "./data";

export default function CaseStudyClient({ slug }: { slug: string }) {
  const study =
    CASE_STUDIES_DETAILS[slug as keyof typeof CASE_STUDIES_DETAILS] ||
    CASE_STUDIES_DETAILS["shopify-fashion-storefront"];

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-white">
      <Meta title={`${study.title} | Case Study | Hutech Solutions`} description={study.tagline} />
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex min-h-[600px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={study.image}
            alt={study.title}
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 py-24 lg:px-20">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl space-y-10"
          >
            <Link
              href="/resources/case-studies"
              className="group inline-flex items-center gap-3 text-[11px] font-black tracking-[0.3em] text-[#FFAF2B] uppercase transition-all hover:text-white"
            >
              <ArrowUp
                className="rotate-[-90deg] transition-transform group-hover:-translate-x-2"
                size={16}
              />{" "}
              Back to All Stories
            </Link>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="h-[2px] w-16 bg-[#FFAF2B]"></span>
                <span className="text-[10px] font-black tracking-[0.4em] text-[#FFAF2B] uppercase">
                  Case Study Analysis
                </span>
              </div>
              <h1 className="display-font text-4xl leading-tight font-semibold md:text-6xl lg:text-7xl">
                {study.title.split(":").length > 1 ? (
                  <>
                    {study.title.split(":")[0]}: <br />
                    <span className="text-[#FFAF2B]">{study.title.split(":")[1]}</span>
                  </>
                ) : (
                  <>
                    Building a Scalable <br />
                    <span className="text-[#FFAF2B]">Digital Future.</span>
                  </>
                )}
              </h1>
              <p className="max-w-3xl text-xl leading-relaxed font-medium text-gray-300 md:text-2xl">
                {study.tagline}
              </p>
            </div>

            <div className="flex flex-wrap gap-12 border-t border-white/10 pt-12">
              <div className="space-y-2">
                <p className="text-[10px] font-black tracking-[0.3em] text-[#FFAF2B] uppercase opacity-60">
                  Client Domain
                </p>
                <p className="font-bold text-white">{study.client}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black tracking-[0.3em] text-[#FFAF2B] uppercase opacity-60">
                  Technology Stack
                </p>
                <p className="font-bold text-white">{study.platform}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black tracking-[0.3em] text-[#FFAF2B] uppercase opacity-60">
                  Key Impact
                </p>
                <p className="font-bold text-white">{study.geography}</p>
              </div>
            </div>
          </Motion.div>
        </div>
        {/* Decorative elements */}
        <div className="absolute right-0 bottom-0 h-full w-1/3 translate-x-1/2 skew-x-12 bg-[#0171c1]/5"></div>
      </section>

      {/* Project Overview */}
      <section className="bg-white py-32">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-24 lg:grid-cols-12">
            <div className="space-y-10 lg:col-span-5">
              <div className="h-2 w-24 bg-[#0171c1]"></div>
              <h2 className="display-font text-4xl leading-tight font-bold tracking-tight text-[#001A3D]">
                Project <br />
                Overview
              </h2>
              <p className="border-l-4 border-[#FFAF2B] pl-10 text-2xl leading-relaxed font-medium text-gray-600 italic">
                "{study.overviewQuote}"
              </p>
            </div>
            <div className="space-y-8 lg:col-span-7">
              <p className="text-lg leading-relaxed font-medium text-gray-500">{study.overview}</p>
              {study.secondaryOverview && (
                <p className="mt-6 text-lg leading-relaxed font-medium text-gray-500">
                  {study.secondaryOverview}
                </p>
              )}
              <div className="pt-10">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-4 text-sm font-black tracking-[0.2em] text-[#001A3D] uppercase"
                >
                  GET SIMILAR RESULTS{" "}
                  <ArrowRight className="text-[#0171c1] transition-transform group-hover:translate-x-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="relative overflow-hidden bg-gray-50/50 py-32">
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-24 space-y-6 text-center">
            <span className="text-[10px] font-black tracking-[0.4em] text-[#0171c1] uppercase">
              Strategic Hurdles
            </span>
            <h2 className="display-font text-5xl font-bold tracking-tight text-[#001A3D] uppercase md:text-7xl">
              Critical Challenges
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {study.challenges.map((item, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-[15px] md:rounded-[4rem] border border-gray-100/50 bg-white p-16 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] transition-all duration-700 hover:shadow-[0_48px_100px_-20px_rgba(0,0,0,0.1)]"
              >
                <div className="mb-10 flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-50 text-[#0171c1] shadow-sm transition-all duration-500 group-hover:bg-[#0171c1] group-hover:text-white">
                  {item.icon}
                </div>
                <h3 className="mb-4 text-2xl font-bold text-[#001A3D]">{item.title}</h3>
                <p className="text-sm leading-relaxed font-medium text-gray-500">{item.desc}</p>
              </Motion.div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 -z-10 h-full w-full translate-x-1/2 -translate-y-1/2 bg-[#0171c1]/5 blur-[120px]"></div>
      </section>

      {/* Solutions Section - Custom for each if available */}
      {study.solutions && (
        <section className="bg-white py-32">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
            <div className="grid grid-cols-1 gap-24 lg:grid-cols-12">
              <div className="space-y-20 lg:col-span-12">
                <div className="flex flex-col justify-between gap-12 border-b border-gray-100 pb-16 md:flex-row md:items-end">
                  <div className="space-y-6">
                    <span className="text-[10px] font-black tracking-[0.4em] text-[#0171c1] uppercase">
                      Our Intervention
                    </span>
                    <h2 className="display-font text-4xl font-bold tracking-tight text-[#001A3D] md:text-5xl">
                      Solution Provided
                    </h2>
                  </div>
                  <p className="max-w-xl text-xl leading-relaxed font-medium text-gray-500">
                    Our engineering team collaborated closely with the client to implement these
                    high-impact solutions.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-x-24 gap-y-20 md:grid-cols-2">
                  {study.solutions.map((sol, i) => (
                    <div key={i} className="group space-y-8">
                      <div className="flex items-center gap-6">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 text-[#0171c1] shadow-sm transition-all duration-500 group-hover:bg-[#0171c1] group-hover:text-white">
                          {sol.icon}
                        </div>
                        <div className="h-1 w-12 bg-[#FFAF2B] transition-all duration-700 group-hover:w-24"></div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-[#001A3D]">{sol.title}</h3>
                        <p className="text-lg leading-relaxed font-medium text-gray-500">
                          {sol.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Implementation Process Section */}
      {study.processSteps && (
        <section className="bg-white py-32">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
            <div className="grid grid-cols-1 gap-24 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="sticky top-32 space-y-8">
                  <h2 className="display-font text-5xl font-bold tracking-tight text-[#001A3D] uppercase">
                    Execution <br />
                    Strategy
                  </h2>
                  <p className="text-xl leading-relaxed font-medium text-gray-500">
                    The project was carried out in organized stages to guarantee quality and
                    conformity with brand standards.
                  </p>
                  <div className="space-y-6 rounded-[15px] md:rounded-[2.5rem] bg-[#001A3D] p-10 text-white shadow-2xl">
                    <Zap className="h-8 w-8 text-[#FFAF2B]" />
                    <h4 className="display-font text-2xl font-bold">Agile Methodology</h4>
                    <p className="text-base leading-relaxed font-medium opacity-70">
                      Quickly evaluating plugins and third-party apps, adapting to evolving needs
                      through continuous optimization.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-16 lg:col-span-8">
                {study.processSteps.map((step, i) => (
                  <div key={i} className="group flex gap-10">
                    <div className="display-font shrink-0 text-6xl font-black text-gray-100 transition-colors group-hover:text-[#FFAF2B]">
                      {step.number}
                    </div>
                    <div className="w-full space-y-6 border-b border-gray-100 pt-2 pb-16">
                      <h3 className="display-font text-3xl font-bold tracking-tight text-[#001A3D]">
                        {step.title}
                      </h3>
                      <p className="text-xl leading-relaxed font-medium text-gray-500 italic">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section - Specific to some */}
      {study.stats && (
        <section className="relative overflow-hidden bg-[#0171c1] py-32 text-white">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
            <div className="grid grid-cols-2 gap-16 lg:grid-cols-4 lg:gap-24">
              {study.stats.map((stat, i) => (
                <div key={i} className="space-y-4 text-center lg:text-left">
                  <div className="display-font text-6xl font-black tracking-tighter text-[#FFAF2B] md:text-8xl">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-black tracking-[0.4em] uppercase opacity-60">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 h-full w-1/3 translate-x-1/3 skew-x-12 bg-white/5"></div>
        </section>
      )}

      {/* Final Results for Shopify style */}
      {study.results && (
        <section className="relative overflow-hidden bg-[#001A3D] py-32 text-white">
          <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
            <div className="max-w-4xl space-y-20">
              <h2 className="display-font text-5xl font-bold tracking-tight uppercase md:text-8xl">
                Results & <br />
                <span className="text-[#FFAF2B]">Outcomes.</span>
              </h2>

              <div className="grid grid-cols-1 gap-x-24 gap-y-16 md:grid-cols-2">
                {study.results.map((res, i) => (
                  <div key={i} className="space-y-6">
                    <div className="flex items-center gap-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFAF2B]/20 text-[#FFAF2B]">
                        <CheckCircle2 size={24} />
                      </div>
                      <h4 className="display-font text-2xl font-bold tracking-tight uppercase">
                        {res.title}
                      </h4>
                    </div>
                    <p className="text-xl leading-relaxed font-medium text-gray-400">{res.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-20 opacity-5">
            <BarChart3 size={500} />
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="relative overflow-hidden bg-white py-32">
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center lg:px-20">

          <Motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group mx-auto mt-24 flex flex-col items-center gap-6"
            whileHover={{ y: -10 }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-100 text-[#0171c1] shadow-sm transition-all duration-700 group-hover:border-[#001A3D] group-hover:bg-[#001A3D] group-hover:text-white">
              <ArrowUp size={24} />
            </div>
            <span className="text-[10px] font-black tracking-[0.5em] text-[#001A3D] uppercase opacity-40 transition-opacity group-hover:opacity-100">
              Back to top
            </span>
          </Motion.button>
        </div>
        <div className="absolute bottom-0 left-0 -z-10 h-1/2 w-full translate-y-1/2 rounded-t-[100%] bg-gray-50/50 blur-[120px]"></div>
      </section>
    </div>
  );
}
