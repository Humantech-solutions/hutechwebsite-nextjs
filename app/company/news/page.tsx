"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Newspaper, Calendar, ArrowRight, Clock, Tag } from "lucide-react";
import { Meta } from "@/components/Meta";
import Link from "next/link";

export default function News() {
  const newsItems = [
    {
      id: "top-global-tech-firms-2025",
      title: "Hutech Solutions Ranked Among Top Global Tech Firms",
      date: "Oct 12, 2025",
      category: "Corporate",
      readTime: "6 min read",
      desc: "Our commitment to engineering excellence and rapid expansion across international markets recognized by the Global Tech Index.",
    },
    {
      id: "london-expansion-growth",
      title: "Expanding Global Reach: New Office in London",
      date: "Sep 28, 2025",
      category: "Growth",
      readTime: "4 min read",
      desc: "Strategic EMEA headquarters opened in London's financial district to support our expanding Fintech and Cybersecurity practices.",
    },
    {
      id: "innovating-ai-framework",
      title: "Innovating with AI: Hutech's New ML Framework",
      date: "Aug 15, 2025",
      category: "Technology",
      readTime: "8 min read",
      desc: "Launching 'Hutech Vision ML' - a revolutionary framework designed for real-time edge computing in industrial automation.",
    },
  ];

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="In The News | Hutech Solutions"
        description="Stay updated with the latest news, events, and milestones from Hutech Solutions."
      />
      <Breadcrumbs variant="light" />
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1583737177755-74c167f871eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Corporate News"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/80 to-transparent"></div>
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 text-left lg:px-20">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[1px] w-12 bg-[#FFAF2B]"></span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#FFAF2B] uppercase">
                Corporate Insights
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              In The <br />
              <span className="text-[#FFAF2B]">News.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              Keeping you updated with our latest milestones, global expansions, and
              industry-defining engineering breakthroughs.
            </p>
          </Motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-12">
            {newsItems.map((item, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col gap-12 rounded-[2.5rem] border border-gray-100 bg-gray-50 p-8 transition-all duration-500 hover:border-[#0171c1]/20 hover:bg-white hover:shadow-2xl md:flex-row"
              >
                <div className="flex-1 space-y-6">
                  <div className="flex flex-wrap items-center gap-6">
                    <span className="rounded-full border border-[#FFAF2B]/20 bg-[#FFAF2B]/10 px-4 py-1.5 text-[10px] font-black tracking-widest text-[#FFAF2B] uppercase">
                      {item.category}
                    </span>
                    <span className="flex items-center gap-2 text-xs font-bold tracking-widest text-gray-400 uppercase">
                      <Calendar size={14} className="text-[#0171c1]" /> {item.date}
                    </span>
                    <span className="flex items-center gap-2 text-xs font-bold tracking-widest text-gray-400 uppercase">
                      <Clock size={14} className="text-[#0171c1]" /> {item.readTime}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <h3 className="display-font text-2xl leading-tight font-bold text-[#001A3D] transition-colors group-hover:text-[#0171c1] md:text-4xl">
                      {item.title}
                    </h3>
                    <p className="max-w-3xl text-lg leading-relaxed font-medium text-gray-500">
                      {item.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-8 pt-4">
                    <Link
                      href={`/company/news/${item.id}`}
                      className="inline-flex items-center gap-3 border-b-2 border-[#FFAF2B] pb-1 text-[11px] font-black tracking-widest text-[#001A3D] uppercase transition-all hover:gap-6"
                    >
                      Read Full Story <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Communications CTA */}
      <section className="pb-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="relative space-y-8 overflow-hidden rounded-[3rem] bg-[#001A3D] p-12 text-center md:p-20">
            <div className="absolute top-0 right-0 -mt-32 -mr-32 h-64 w-64 rounded-full bg-[#0171c1]/20 blur-[100px]"></div>
            <div className="relative z-10 mx-auto max-w-3xl space-y-6">
              <h2 className="display-font text-3xl font-bold text-white md:text-5xl">
                Media Inquiries
              </h2>
              <p className="text-lg leading-relaxed font-medium text-white/50">
                For press kits, high-resolution imagery, or executive interview requests, please
                contact our global communications office.
              </p>
              <div className="pt-6">
                <Link
                  href="/contact"
                  className="inline-flex rounded-sm bg-[#0171c1] px-12 py-5 text-center text-[11px] font-black tracking-widest text-white uppercase transition-all duration-500 hover:bg-white hover:text-[#001A3D]"
                >
                  Contact Press Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
