"use client";

import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

const CATEGORIES = ["All", "Technology", "Cybersecurity", "Logistics", "Cloud", "AI"];

const BLOGS = [
  {
    id: 1,
    title: "The Future of AI in Enterprise",
    excerpt:
      "How generative AI is reshaping the landscape of corporate decision making and operational efficiency across global markets.",
    category: "AI",
    date: "March 10, 2026",
    author: "Dr. Sarah Chen",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 2,
    title: "Securing the Hybrid Cloud",
    excerpt:
      "Best practices for maintaining a robust security posture in a distributed cloud environment using zero-trust principles.",
    category: "Cybersecurity",
    date: "March 05, 2026",
    author: "James Wilson",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 3,
    title: "Data-Driven Logistics",
    excerpt:
      "Real-time analytics and their impact on global supply chain resilience and cost optimization in the modern era.",
    category: "Logistics",
    date: "February 28, 2026",
    author: "Michael Port",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 4,
    title: "Cloud Native Transformation",
    excerpt:
      "Moving beyond virtualization to true cloud-native architectures for unparalleled scalability and developer velocity.",
    category: "Cloud",
    date: "February 15, 2026",
    author: "Elena Rodriguez",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 5,
    title: "The Ethics of Autonomous Systems",
    excerpt:
      "Navigating the complex moral landscape of self-driving and self-deciding systems in industrial applications.",
    category: "Technology",
    date: "February 10, 2026",
    author: "Dr. Sarah Chen",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 6,
    title: "Quantum Computing: A Decadal Outlook",
    excerpt:
      "Preparing for the post-quantum world and understanding the implications for cryptography and materials science.",
    category: "Technology",
    date: "January 25, 2026",
    author: "James Wilson",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
];

export default function Blogs() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = BLOGS.filter((blog) => {
    const matchesTab = activeTab === "All" || blog.category === activeTab;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Meta
        title="Blogs | Hutech Solutions"
        description="Latest insights and thought leadership from Hutech Solutions experts."
      />
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex items-center overflow-hidden bg-[#001A3D] py-24 text-white">
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-20">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl space-y-6"
          >
            <div className="flex items-center gap-3">
              <span className="block h-[2px] w-8 bg-[#FFAF2B]"></span>
              <span className="text-xs font-semibold tracking-widest text-[#FFAF2B] uppercase">
                Thought Leadership
              </span>
            </div>
            <h1 className="display-font mb-6 text-5xl leading-tight font-semibold tracking-tight md:text-8xl">
              Insights & <br />
              <span className="text-[#FFAF2B]">Perspectives.</span>
            </h1>
            <p className="text-lg leading-relaxed font-medium text-gray-400 md:text-xl">
              Stay ahead of the curve with the latest trends, expert analyses, and technological
              innovations curated by our global team.
            </p>
          </Motion.div>
        </div>
        <div className="absolute top-0 right-0 h-full w-1/3 translate-x-1/4 skew-x-12 bg-[#0171c1]/5"></div>
        <div className="absolute -bottom-24 left-24 h-80 w-80 rounded-full bg-[#FFAF2B]/5 blur-[100px]"></div>
      </section>

      {/* Search & Filter Bar */}
      <section className="sticky top-[72px] z-30 border-b border-gray-100 bg-white/80 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-8 px-6 py-6 md:flex-row lg:px-20">
          <div className="no-scrollbar flex w-full items-center gap-2 overflow-x-auto pb-2 md:w-auto md:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`rounded-full px-5 py-2.5 text-[10px] font-black tracking-[0.2em] whitespace-nowrap uppercase transition-all ${
                  activeTab === cat
                    ? "bg-[#001A3D] text-white shadow-xl"
                    : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-[#001A3D]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-none border-gray-100 bg-gray-50 py-3.5 pr-4 pl-12 text-sm font-medium shadow-sm transition-all focus:ring-2 focus:ring-[#0171c1]/20 focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="bg-gray-50/30 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
              {filteredBlogs.map((blog, i) => (
                <Motion.article
                  key={blog.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-transparent bg-white transition-all duration-700 hover:border-gray-100 hover:shadow-[0_48px_100px_-20px_rgba(0,0,0,0.1)]"
                >
                  <div className="relative h-72 overflow-hidden">
                    <ImageWithFallback
                      src={blog.image}
                      alt={blog.title}
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute top-8 left-8">
                      <span className="rounded-full border border-white/20 bg-white/90 px-5 py-2 text-[10px] font-black tracking-widest text-[#001A3D] uppercase shadow-xl backdrop-blur-md">
                        {blog.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-grow flex-col space-y-6 p-10">
                    <div className="flex items-center gap-6 text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">
                      <span className="flex items-center gap-2">
                        <Calendar size={14} className="text-[#0171c1]" /> {blog.date}
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-200"></span>
                      <span className="flex items-center gap-2">
                        <User size={14} className="text-[#0171c1]" /> {blog.author}
                      </span>
                    </div>
                    <h3 className="display-font text-2xl leading-tight font-bold text-[#001A3D] transition-colors group-hover:text-[#0171c1] md:text-3xl">
                      {blog.title}
                    </h3>
                    <p className="line-clamp-3 text-lg leading-relaxed font-medium text-gray-500">
                      {blog.excerpt}
                    </p>
                    <div className="mt-auto border-t border-gray-50 pt-8">
                      <Link
                        href={`/resources/blogs/${blog.id}`}
                        className="group/link inline-flex items-center gap-3 text-xs font-black tracking-[0.2em] text-[#001A3D] uppercase transition-all hover:text-[#FFAF2B]"
                      >
                        READ ARTICLE{" "}
                        <ArrowRight
                          size={18}
                          className="text-[#0171c1] transition-transform group-hover/link:translate-x-3"
                        />
                      </Link>
                    </div>
                  </div>
                </Motion.article>
              ))}
            </div>
          ) : (
            <div className="rounded-[3rem] border border-gray-100 bg-white py-40 text-center shadow-sm">
              <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gray-50">
                <Search size={40} className="text-gray-200" />
              </div>
              <h3 className="display-font mb-4 text-3xl font-bold text-[#001A3D]">
                No matches found
              </h3>
              <p className="mx-auto mb-10 max-w-sm font-medium text-gray-500">
                We couldn't find any articles matching your current search or filter selection.
              </p>
              <button
                onClick={() => {
                  setActiveTab("All");
                  setSearchQuery("");
                }}
                className="text-xs font-black tracking-widest text-[#0171c1] uppercase hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="relative overflow-hidden bg-[#001A3D] py-32">
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex flex-col items-center justify-between gap-16 lg:flex-row">
            <div className="max-w-2xl space-y-6 text-center lg:text-left">
              <h2 className="display-font text-4xl leading-tight font-bold tracking-tight text-white md:text-6xl">
                Stay updated with <br />
                <span className="text-[#FFAF2B]">Hutech Insights.</span>
              </h2>
              <p className="text-xl font-medium text-gray-400">
                Get the latest technical reviews and industry reports delivered to your inbox every
                month.
              </p>
            </div>
            <div className="w-full lg:w-auto">
              <form className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-2 backdrop-blur-md sm:flex-row">
                <input
                  type="email"
                  placeholder="Your professional email"
                  className="min-w-[300px] flex-1 bg-transparent px-8 py-5 text-lg font-medium text-white focus:outline-none"
                />
                <button className="rounded-[1.5rem] bg-[#FFAF2B] px-10 py-5 text-xs font-black tracking-[0.2em] text-[#001A3D] uppercase shadow-2xl transition-all hover:bg-white">
                  SUBSCRIBE
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 h-full w-1/2 translate-x-1/4 skew-x-12 bg-linear-to-l from-white/5 to-transparent"></div>
      </section> */}
    </div>
  );
}
