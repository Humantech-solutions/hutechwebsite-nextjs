"use client";

import { motion as Motion, AnimatePresence } from "motion/react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  Calendar,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
  Clock,
  Sparkles,
  Filter,
  Mail,
  CheckCircle2,
  ShieldCheck,
  Bell,
  Loader2,
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";
import { useState, useMemo, Fragment } from "react";
import { WpBlog } from "@/lib/wordpress";
import { renderTitle } from "@/lib/utils";
import { IPublishCardBanner } from "@/components/ipublish/IPublishCardBanner";
import { toast } from "sonner";
import { submitContactForm } from "@/lib/api";

type Props = {
  blogs: WpBlog[];
  pageTitle: string;
  pageDescription: string;
  bgImageUrl?: string;
};

export default function BlogsClient({ blogs, pageTitle, pageDescription, bgImageUrl }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(12);
  const maxPosts = 60;

  const categories = useMemo(() => {
    const cats = new Set<string>();
    blogs.forEach((b) => {
      if (b.category) cats.add(b.category);
    });
    return ["All", ...Array.from(cats)].sort((a, b) => {
      if (a === "All") return -1;
      if (b === "All") return 1;
      return a.localeCompare(b);
    });
  }, [blogs]);

  // Filter blogs
  const filteredBlogs = useMemo(() => {
    return blogs
      .filter((blog) => {
        const matchesSearch =
          !searchQuery ||
          blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [blogs, searchQuery, selectedCategory]);

  const limitedBlogs = filteredBlogs.slice(0, maxPosts);
  const currentBlogs = limitedBlogs.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [isSubmittingSubscribe, setIsSubmittingSubscribe] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!subscriberEmail || !subscriberEmail.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setIsSubmittingSubscribe(true);
    try {
      await submitContactForm({
        name: "Blog Subscriber",
        email: subscriberEmail.trim(),
        phone: "N/A",
        subject: "Blog Newsletter Subscription",
        message: "User subscribed to newsletter from blog listing page",
        category: "Blog Newsletter Subscription",
        gtmEventName: "newsletter_subscribe_submit",
      });
      setIsSubscribed(true);
      toast.success("Subscribed successfully! Welcome to Hutech Tech Dispatch.");
      setSubscriberEmail("");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to subscribe. Please try again."
      );
    } finally {
      setIsSubmittingSubscribe(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FBFBFC]">
      <Meta
        title="Blogs | Hutech Solutions"
        description="Latest insights and thought leadership from Hutech Solutions experts."
      />
      <Breadcrumbs variant="light" />

      {/* ORIGINAL HERO BANNER (Height & Image fully preserved) */}
      <section className="relative flex min-h-[450px] items-center overflow-hidden bg-[#001A3D] py-14 text-white">
        {bgImageUrl && (
          <div className="absolute inset-0 z-0">
            <ImageWithFallback
              src={bgImageUrl}
              alt={pageTitle}
              className="h-full w-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D] via-transparent to-transparent"></div>
          </div>
        )}
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            {/* Left side: Heading & Description */}
            <div className="max-w-2xl">
              <Motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="display-font mb-4 text-5xl font-semibold md:text-7xl"
              >
                {renderTitle(pageTitle)}
              </Motion.h1>
              <p className="text-lg font-medium leading-relaxed text-gray-400 sm:text-xl">
                {pageDescription}
              </p>
            </div>

            {/* Right side: Subscription Card */}
            <div className="w-full max-w-md shrink-0 lg:ml-auto">
              <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-md transition-all hover:border-white/25 sm:p-6">
                <div className="mb-3.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#F99D1C]">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>HUTECH INSIGHTS</span>
                  </div>
                  <h3 className="mt-1 text-base font-bold text-white sm:text-lg">
                    Subscribe to our Newsletter
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-300">
                    Get bi-weekly engineering deep-dives, industry trends, and curated insights
                    directly to your inbox.
                  </p>
                </div>

                {isSubscribed ? (
                  <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/15 p-3.5 text-xs text-emerald-300">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                    <span>You’re in! Welcome to Hutech Insights.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-2.5">
                    <div className="flex items-center rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur-md transition-all focus-within:border-[#F99D1C] focus-within:bg-white/15 focus-within:ring-2 focus-within:ring-[#F99D1C]/25">
                      <div className="relative flex flex-1 items-center pl-3">
                        <Mail className="h-4 w-4 shrink-0 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={subscriberEmail}
                          onChange={(e) => setSubscriberEmail(e.target.value)}
                          placeholder="Enter your work email..."
                          className="w-full bg-transparent px-2.5 py-1.5 text-xs font-medium text-white placeholder-slate-400 focus:outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmittingSubscribe}
                        className="flex h-9 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-full bg-[#F99D1C] px-5 text-xs font-bold uppercase tracking-wider text-[#001A3D] shadow-md transition-all hover:bg-white active:scale-95 disabled:opacity-60"
                      >
                        {isSubmittingSubscribe ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin text-[#001A3D]" />
                        ) : (
                          <span>Subscribe</span>
                        )}
                      </button>
                    </div>
                    <div className="flex items-center justify-between px-1 text-[11px] text-slate-400">
                      <span>✓ Bi-weekly digest</span>
                      <span>✓ Zero spam</span>
                      <span>✓ 1-click unsubscribe</span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT: SIDEBAR + CARDS PATTERN */}
      <section
        id="blog-content-area"
        className="relative overflow-hidden bg-[#f8fafc] py-16 md:py-16"
      >
        {/* ── DECORATIVE BACKGROUND ── */}
        {/* Crisp grid lines */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-60"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 26, 61, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 26, 61, 0.05) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Radial ambient gradient glows */}
        <div className="pointer-events-none absolute -right-20 -top-20 z-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#0171c1]/15 via-sky-200/20 to-transparent blur-3xl" />
        <div className="from-[#F99D1C]/12 pointer-events-none absolute -left-32 top-1/3 z-0 h-[450px] w-[450px] rounded-full bg-gradient-to-tr via-amber-100/20 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-1/4 z-0 h-[500px] w-[500px] rounded-full bg-gradient-to-t from-[#001A3D]/10 via-[#0171c1]/10 to-transparent blur-3xl" />

        {/* Top/Bottom gradient border lines */}
        <div className="pointer-events-none absolute left-0 right-0 top-0 z-0 h-px bg-gradient-to-r from-transparent via-[#0171c1]/40 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-px bg-gradient-to-r from-transparent via-[#001A3D]/20 to-transparent" />

        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex flex-col gap-10">
            {/* MAIN BLOG CARDS GRID */}
            <main>
              {/* Filter Status Bar - 1 line on desktop, category carousel on next line on mobile */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-y-3 border-b border-slate-200 pb-4 md:flex-nowrap md:gap-x-6">
                {/* 1. Article count */}
                <div className="order-1 shrink-0 whitespace-nowrap text-xs font-medium text-slate-500">
                  Showing <span className="font-bold text-[#001A3D]">{limitedBlogs.length}</span>{" "}
                  {limitedBlogs.length === 1 ? "article" : "articles"}
                </div>

                {/* 2. Search Bar - right-aligned on mobile (next to count), far right on desktop */}
                <div className="order-2 relative w-40 shrink-0 sm:w-56 md:order-3 md:w-64 lg:w-72">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="blog-search"
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setVisibleCount(12);
                    }}
                    className="focus:outline-hidden shadow-xs h-[38px] w-full rounded-full border border-slate-200 bg-white py-2 pl-9 pr-9 text-xs font-medium text-slate-800 placeholder-slate-400 transition-all focus:border-[#0171c1] focus:ring-1 focus:ring-[#0171c1]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setVisibleCount(12);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700"
                      aria-label="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* 3. Category Carousel Container - 2nd line full-width on mobile, middle on desktop */}
                <div className="order-3 w-full min-w-0 overflow-x-auto py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:order-2 md:w-auto md:flex-1">
                  <div className="flex items-center gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setVisibleCount(12);
                        }}
                        className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                          selectedCategory === cat
                            ? "bg-[#001A3D] text-[#F99D1C]"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {limitedBlogs.length === 0 ? (
                <div className="shadow-xs rounded-xl border border-slate-200 bg-white py-20 text-center">
                  <Search size={32} className="mx-auto text-slate-300" />
                  <h4 className="mt-3 text-base font-bold text-[#001A3D]">No articles found</h4>
                  <p className="mt-1 text-xs text-slate-500">Try searching with another keyword.</p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setVisibleCount(12);
                    }}
                    className="mt-5 rounded-lg bg-[#001A3D] px-4 py-2 text-xs font-bold text-white transition-all hover:bg-[#0171c1]"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {currentBlogs.map((blog, i) => (
                      <Motion.article
                        key={blog.slug}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (i % 3) * 0.05, duration: 0.3 }}
                        className="group relative flex flex-col justify-between border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
                      >
                        <Link
                          href={
                            blog.isIPublish
                              ? `/resources/blogs/ipublish/${blog.slug}`
                              : `/resources/blogs/${blog.slug}`
                          }
                          className="flex flex-1 flex-col"
                        >
                          {/* Image Container */}
                          <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                            {blog.isIPublish && blog.ipublishMeta ? (
                              <IPublishCardBanner blog={blog} />
                            ) : (
                              <ImageWithFallback
                                src={blog.imageUrl || undefined}
                                alt={blog.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            )}
                            <div className="absolute left-4 top-4 z-20 rounded-full bg-[#001A3D]/85 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md group-hover:bg-[#F99D1C]">
                              {blog.category}
                            </div>
                          </div>

                          {/* Card Content */}
                          <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                            <div className="space-y-3">
                              {/* Date */}
                              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                                <Calendar size={13} />
                                <span>{blog.date}</span>
                              </div>

                              {/* Title */}
                              <h3 className="display-font line-clamp-2 text-lg font-bold leading-snug text-[#001A3D] transition-colors duration-200 group-hover:text-[#0171c1]">
                                {blog.title}
                              </h3>

                              {/* Excerpt */}
                              {blog.excerpt && (
                                <p className="line-clamp-2 text-xs font-normal leading-relaxed text-slate-600">
                                  {blog.excerpt}
                                </p>
                              )}
                            </div>
                          </div>
                        </Link>
                      </Motion.article>
                    ))}
                  </div>

                  {/* LOAD MORE BUTTON */}
                  {visibleCount < limitedBlogs.length && (
                    <div className="mt-14 flex justify-center border-t border-slate-200/80 pt-8">
                      <button
                        onClick={handleLoadMore}
                        className="cursor-pointer rounded-full bg-[#001A3D] px-8 py-3 text-sm font-bold text-white transition-all hover:bg-[#0171c1] hover:shadow-lg"
                      >
                        Load More
                      </button>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
