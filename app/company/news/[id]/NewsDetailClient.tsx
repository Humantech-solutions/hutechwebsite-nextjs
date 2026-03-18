"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  Calendar,
  Share2,
  ArrowLeft,
  Tag,
  Quote,
  Facebook,
  Twitter,
  Linkedin,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

const NEWS_DATA = {
  "top-global-tech-firms-2025": {
    title: "Hutech Solutions Ranked Among Top Global Tech Firms",
    date: "October 12, 2025",
    author: "Elena Vance",
    role: "Corporate Communications",
    category: "Corporate",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1769556669134-fe947b53bdbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    content: [
      {
        type: "paragraph",
        text: "In a significant milestone for Hutech Solutions, we are proud to announce our inclusion in the 2025 Global Technology Excellence Index. This recognition highlights our commitment to engineering excellence and our rapid expansion across international markets.",
      },
      {
        type: "heading",
        text: "Innovation at Our Core",
      },
      {
        type: "paragraph",
        text: "The selection criteria for this year's index focused heavily on sustainable digital transformation and the successful deployment of AI-driven enterprise solutions. Hutech's recent work in the Fintech and Healthcare sectors was specifically noted for its high impact and operational efficiency.",
      },
      {
        type: "quote",
        text: "This ranking is a testament to the tireless effort of our 2,500+ engineers globally. We've always focused on building solutions that don't just work for today, but are architected for the next decade.",
        author: "Dr. Vikram Sethi",
        designation: "CEO, Hutech Solutions",
      },
      {
        type: "paragraph",
        text: "As we look toward 2026, we remain dedicated to pushing the boundaries of what's possible in cloud transformation and autonomous intelligence. Our inclusion in this list isn't just an award; it's a responsibility to continue leading the way in ethical technology implementation.",
      },
    ],
    tags: ["Excellence", "Global Reach", "Engineering", "Awards"],
  },
  "london-expansion-growth": {
    title: "Expanding Global Reach: New Office in London",
    date: "September 28, 2025",
    author: "David Thorne",
    role: "Head of Operations EMEA",
    category: "Growth",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    content: [
      {
        type: "paragraph",
        text: "Following a record-breaking fiscal year in the EMEA region, Hutech Solutions is excited to announce the opening of its newest regional headquarters in the heart of London's financial district.",
      },
      {
        type: "heading",
        text: "A Strategic Hub for EMEA",
      },
      {
        type: "paragraph",
        text: "The new office will serve as a central hub for our European client base, specifically focusing on our expanding Fintech and Cybersecurity practices. This facility will house over 300 specialists by the end of 2026.",
      },
      {
        type: "paragraph",
        text: "The London office features a state-of-the-art Innovation Lab where clients can co-create digital products alongside Hutech architects using the latest in VR and AR prototyping tools.",
      },
    ],
    tags: ["EMEA", "London", "Fintech", "Global Headquarter"],
  },
  "innovating-ai-framework": {
    title: "Innovating with AI: Hutech's New ML Framework",
    date: "August 15, 2025",
    author: "Dr. Sarah Chen",
    role: "Chief AI Officer",
    category: "Technology",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    content: [
      {
        type: "paragraph",
        text: "Hutech Solutions is proud to announce the launch of 'Hutech Vision ML', a revolutionary machine learning framework specifically engineered for real-time edge computing in dense industrial environments.",
      },
      {
        type: "heading",
        text: "Bridging the Gap",
      },
      {
        type: "paragraph",
        text: "By moving inference directly to the edge, our new framework reduces latency by up to 90% compared to traditional cloud-based processing, enabling split-second decision making for autonomous systems and high-speed production lines.",
      },
    ],
    tags: ["AI", "ML", "Edge Computing", "Innovation"],
  },
};

export default function NewsDetailClient({ id }: { id: string }) {
  const news = NEWS_DATA[id as keyof typeof NEWS_DATA] || NEWS_DATA["top-global-tech-firms-2025"];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Meta
        title={`${news.title} | In The News | Hutech Solutions`}
        description={news.content[0].text}
      />
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex min-h-[500px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={news.image}
            alt={news.title}
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 py-20 lg:px-20">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <Link
              href="/company/news"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#FFAF2B] uppercase transition-colors hover:text-white"
            >
              <ArrowLeft size={16} /> All News
            </Link>

            <div className="flex items-center gap-6">
              <span className="rounded-full border border-[#FFAF2B]/20 bg-[#FFAF2B]/10 px-4 py-1.5 text-[10px] font-black tracking-widest text-[#FFAF2B] uppercase">
                {news.category}
              </span>
              <span className="flex items-center gap-2 text-xs font-bold tracking-widest text-white/60 uppercase">
                <Clock size={14} /> {news.readTime}
              </span>
            </div>

            <h1 className="display-font max-w-5xl text-4xl leading-[1.1] font-semibold md:text-7xl">
              {news.title}
            </h1>

            <div className="flex w-fit flex-wrap items-center gap-10 border-t border-white/10 pt-4 pr-12">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0171c1] text-lg font-bold text-white">
                  {news.author.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{news.author}</div>
                  <div className="text-[10px] font-bold tracking-widest text-white/40 uppercase">
                    {news.role}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 border-l border-white/10 pl-10">
                <Calendar className="h-5 w-5 text-[#FFAF2B]" />
                <div>
                  <div className="text-sm font-bold text-white">{news.date}</div>
                  <div className="text-[10px] font-bold tracking-widest text-white/40 uppercase">
                    Published Date
                  </div>
                </div>
              </div>
            </div>
          </Motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            {/* Share Sidebar */}
            <div className="hidden lg:col-span-1 lg:block">
              <div className="sticky top-32 space-y-8">
                <div className="mx-auto mb-8 flex rotate-180 items-center gap-4 text-[10px] font-black tracking-[0.2em] text-[#001A3D] uppercase [writing-mode:vertical-rl]">
                  Share Story <span className="h-[1px] w-12 bg-gray-200"></span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <button className="rounded-full bg-gray-50 p-3 text-gray-400 transition-all hover:bg-[#0171c1] hover:text-white">
                    <Linkedin size={18} />
                  </button>
                  <button className="rounded-full bg-gray-50 p-3 text-gray-400 transition-all hover:bg-[#0171c1] hover:text-white">
                    <Twitter size={18} />
                  </button>
                  <button className="rounded-full bg-gray-50 p-3 text-gray-400 transition-all hover:bg-[#0171c1] hover:text-white">
                    <Facebook size={18} />
                  </button>
                  <button className="rounded-full bg-gray-50 p-3 text-gray-400 transition-all hover:bg-[#FFAF2B] hover:text-white">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="space-y-12 lg:col-span-7">
              <div className="prose prose-xl prose-slate max-w-none">
                {news.content.map((block: any, idx) => {
                  if (block.type === "paragraph") {
                    return (
                      <p
                        key={idx}
                        className="mb-8 text-lg leading-[1.8] font-medium text-gray-500 md:text-xl"
                      >
                        {block.text}
                      </p>
                    );
                  }
                  if (block.type === "heading") {
                    return (
                      <h2
                        key={idx}
                        className="display-font mt-12 mb-8 text-3xl font-bold text-[#001A3D] md:text-4xl"
                      >
                        {block.text}
                      </h2>
                    );
                  }
                  if (block.type === "quote") {
                    return (
                      <div
                        key={idx}
                        className="relative my-16 rounded-[2rem] border-l-8 border-[#FFAF2B] bg-gray-50 p-12"
                      >
                        <Quote className="absolute top-8 right-8 h-12 w-12 text-[#FFAF2B]/10" />
                        <blockquote className="space-y-6">
                          <p className="display-font text-2xl leading-relaxed font-bold text-[#001A3D] italic">
                            "{block.text}"
                          </p>
                          <footer className="flex items-center gap-4">
                            <div className="h-1 h-[2px] w-10 bg-[#FFAF2B]"></div>
                            <div>
                              <div className="font-bold text-[#001A3D]">
                                {block.author || "Quote"}
                              </div>
                              <div className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                                {block.designation}
                              </div>
                            </div>
                          </footer>
                        </blockquote>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-4 border-t border-gray-100 pt-12">
                <div className="mr-4 flex items-center gap-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                  <Tag size={14} /> Related Tags:
                </div>
                {news.tags.map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="cursor-pointer rounded-full bg-gray-50 px-4 py-2 text-xs font-bold text-gray-500 transition-all hover:bg-[#0171c1] hover:text-white"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Sidebar: Related News */}
            <div className="lg:col-span-4 lg:pl-12">
              <div className="sticky top-32 space-y-12">
                <div className="space-y-8">
                  <h4 className="display-font border-b border-gray-100 pb-4 text-xl font-bold text-[#001A3D]">
                    Latest Press Releases
                  </h4>
                  <div className="space-y-8">
                    {[
                      { title: "Hutech Announces 2026 ESG Roadmap", date: "Oct 05, 2025" },
                      {
                        title: "Strategic Partnership with CloudScale Solutions",
                        date: "Sep 20, 2025",
                      },
                      {
                        title: "Hutech Named 'Innovator of the Year' by TechReview",
                        date: "Sep 12, 2025",
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="group cursor-pointer">
                        <div className="mb-2 flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#FFAF2B] uppercase">
                          <Calendar size={12} /> {item.date}
                        </div>
                        <h5 className="leading-snug font-bold text-[#001A3D] transition-colors group-hover:text-[#0171c1]">
                          {item.title}
                        </h5>
                        <div className="mt-4 flex items-center gap-2 text-[10px] font-black tracking-widest text-gray-300 uppercase transition-all group-hover:text-[#001A3D]">
                          Read Release <ChevronRight size={14} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Newsletter CTA */}
                <div className="relative overflow-hidden rounded-[2.5rem] bg-[#001A3D] p-10 text-white">
                  <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-[#0171c1]/20 blur-3xl"></div>
                  <div className="relative z-10 space-y-6">
                    <h4 className="display-font text-2xl font-bold">Stay Informed.</h4>
                    <p className="text-sm leading-relaxed font-medium text-white/50">
                      Get the latest news and architectural insights delivered to your inbox weekly.
                    </p>
                    <form className="space-y-4">
                      <input
                        type="email"
                        placeholder="Corporate Email"
                        className="w-full rounded-sm border border-white/10 bg-white/5 px-6 py-4 text-sm focus:border-[#0171c1] focus:outline-none"
                      />
                      <button className="w-full rounded-sm bg-[#0171c1] py-4 text-[10px] font-black tracking-widest text-white uppercase transition-all duration-500 hover:bg-white hover:text-[#001A3D]">
                        Subscribe Now
                      </button>
                    </form>
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
