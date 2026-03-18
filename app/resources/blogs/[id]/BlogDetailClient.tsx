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

export default function BlogDetailClient({ blog }: { blog: any }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Meta title={`${blog.title} | Blog | Hutech Solutions`} description={blog.content[0].text} />
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex min-h-[500px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={blog.image}
            alt={blog.title}
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
              href="/resources/blogs"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#FFAF2B] uppercase transition-colors hover:text-white"
            >
              <ArrowLeft size={16} /> All Blogs
            </Link>

            <div className="flex items-center gap-6">
              <span className="rounded-full border border-[#FFAF2B]/20 bg-[#FFAF2B]/10 px-4 py-1.5 text-[10px] font-black tracking-widest text-[#FFAF2B] uppercase">
                {blog.category}
              </span>
              <span className="flex items-center gap-2 text-xs font-bold tracking-widest text-white/60 uppercase">
                <Clock size={14} /> {blog.readTime}
              </span>
            </div>

            <h1 className="display-font max-w-5xl text-4xl leading-[1.1] font-semibold md:text-7xl">
              {blog.title}
            </h1>

            <div className="flex w-fit flex-wrap items-center gap-10 border-t border-white/10 pt-4 pr-12">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0171c1] text-lg font-bold text-white">
                  {blog.author.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{blog.author}</div>
                  <div className="text-[10px] font-bold tracking-widest text-white/40 uppercase">
                    {blog.role}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 border-l border-white/10 pl-10">
                <Calendar className="h-5 w-5 text-[#FFAF2B]" />
                <div>
                  <div className="text-sm font-bold text-white">{blog.date}</div>
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
                {blog.content.map((block: any, idx: number) => {
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
                {blog.tags.map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="cursor-pointer rounded-full bg-gray-50 px-4 py-2 text-xs font-bold text-gray-500 transition-all hover:bg-[#0171c1] hover:text-white"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Sidebar: Related Blogs */}
            <div className="lg:col-span-4 lg:pl-12">
              <div className="sticky top-32 space-y-12">
                <div className="space-y-8">
                  <h4 className="display-font border-b border-gray-100 pb-4 text-xl font-bold text-[#001A3D]">
                    Latest Insights
                  </h4>
                  <div className="space-y-8">
                    {[
                      { title: "Building Resilient Supply Chains", date: "Feb 20, 2026" },
                      { title: "Scaling Cloud Native Apps", date: "Jan 15, 2026" },
                      { title: "The Impact of Quantum Computing", date: "Dec 10, 2025" },
                    ].map((item, idx) => (
                      <div key={idx} className="group cursor-pointer">
                        <div className="mb-2 flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#FFAF2B] uppercase">
                          <Calendar size={12} /> {item.date}
                        </div>
                        <h5 className="leading-snug font-bold text-[#001A3D] transition-colors group-hover:text-[#0171c1]">
                          {item.title}
                        </h5>
                        <div className="mt-4 flex items-center gap-2 text-[10px] font-black tracking-widest text-gray-300 uppercase transition-all group-hover:text-[#001A3D]">
                          Read Article <ChevronRight size={14} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Newsletter CTA */}
                <div className="relative overflow-hidden rounded-[2.5rem] bg-[#001A3D] p-10 text-white">
                  <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-[#0171c1]/20 blur-3xl"></div>
                  <div className="relative z-10 space-y-6">
                    <h4 className="display-font text-2xl font-bold">Hutech Dispatch.</h4>
                    <p className="text-sm leading-relaxed font-medium text-white/50">
                      Subscribe for curated technical insights and architectural deep-dives.
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
