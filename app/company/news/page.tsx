"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Newspaper, Calendar, ArrowRight, Clock, Tag, ExternalLink } from "lucide-react";
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
              <span className="h-[1px] w-12 bg-[#F99D1C]"></span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#F99D1C] uppercase">
                Corporate Insights
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              In The <br />
              <span className="text-[#F99D1C]">News.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              Keeping you updated with our latest milestones, global expansions, and
              industry-defining engineering breakthroughs.
            </p>
          </Motion.div>
        </div>
      </section>

      <section className="bg-[#F7F7F7] py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex flex-col">
            {newsItems.map((item, i) => {
              // Map categories to premium news publications for authentic editorial style
              const sourceName = 
                item.category === "Corporate" ? "BLOOMBERG TECHNOLOGY" :
                item.category === "Growth" ? "FINANCIAL TIMES" :
                "BUSINESS INSIDER";

              return (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="group relative flex flex-col md:flex-row md:items-center gap-6 md:gap-12 py-12 px-6 md:px-12 bg-transparent hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.03)] rounded-3xl transition-all duration-500 border-b border-gray-200/80 last:border-b-0 -mx-6 md:-mx-12"
                >
                  {/* Left Column: Fixed Width (~260px) */}
                  <div className="w-full md:w-[260px] md:shrink-0 flex flex-col gap-1 md:gap-2">
                    <span className="text-xs font-bold tracking-[0.15em] text-[#F99D1C] uppercase">
                      {item.date}
                    </span>
                    <span className="text-sm font-extrabold tracking-wider text-[#001A3D] uppercase">
                      {sourceName}
                    </span>
                  </div>

                  {/* Right Column: Flexible */}
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="space-y-3">
                      <h3 className="display-font text-2xl md:text-3xl font-light leading-tight text-[#001A3D] transition-colors duration-300 group-hover:text-[#F99D1C]">
                        {item.title}
                      </h3>
                      {item.desc && (
                        <p className="max-w-4xl text-[15px] md:text-base leading-relaxed font-medium text-gray-500">
                          {item.desc}
                        </p>
                      )}
                    </div>

                    <div className="pt-2">
                      <Link
                        href={`/company/news/${item.id}`}
                        className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#001A3D] uppercase relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#001A3D] after:origin-right after:scale-x-0 group-hover:after:scale-x-100 group-hover:after:origin-left transition-all duration-300"
                      >
                        VIEW ARTICLE <ExternalLink size={13} className="text-[#001A3D] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>
                </Motion.div>
              );
            })}
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
