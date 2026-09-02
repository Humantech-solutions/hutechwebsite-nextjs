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
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";
import { useState, useMemo } from "react";
import { WpBlog } from "@/lib/wordpress";
import { renderTitle } from "@/lib/utils";
import { IPublishCardBanner } from "@/components/ipublish/IPublishCardBanner";

type Props = {
  blogs: WpBlog[];
  pageTitle: string;
  pageDescription: string;
  bgImageUrl?: string;
};

export default function BlogsClient({ blogs, pageTitle, pageDescription, bgImageUrl }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  // Extract unique categories and counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: blogs.length };
    blogs.forEach((b) => {
      const cat = b.category ? b.category.trim() : "General";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [blogs]);

  const categories = useMemo(() => Object.keys(categoryCounts), [categoryCounts]);

  // Filter blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const cat = blog.category ? blog.category.trim() : "General";
      const matchesCategory =
        selectedCategory === "All" || cat.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [blogs, selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const currentBlogs = filteredBlogs.slice(startIndex, startIndex + blogsPerPage);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const contentElem = document.getElementById("blog-content-area");
    if (contentElem) {
      contentElem.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 400, behavior: "smooth" });
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
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
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
          <Motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="display-font mb-6 text-5xl font-semibold md:text-7xl"
          >
            {renderTitle(pageTitle)}
          </Motion.h1>
          <p className="max-w-2xl text-xl font-medium leading-relaxed text-gray-400">
            {pageDescription}
          </p>
        </div>
      </section>

      {/* MAIN CONTENT: SIDEBAR + CARDS PATTERN */}
      <section
        id="blog-content-area"
        className="relative overflow-hidden bg-[#f8fafc] py-16 md:py-24"
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
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            {/* LEFT SIDEBAR / MOBILE FILTER NAVIGATION */}
            <aside className="lg:col-span-3">
              <div className="space-y-4 lg:sticky lg:space-y-6 lg:border lg:border-slate-200/90 lg:bg-white/95 lg:p-6 lg:shadow-sm lg:backdrop-blur-md">
                {/* Search Box */}
                <div>
                  <div className="mb-2 hidden items-center justify-between lg:flex">
                    <label
                      htmlFor="blog-search"
                      className="text-xs font-bold uppercase tracking-wider text-slate-500"
                    >
                      Search
                    </label>
                    {searchQuery && (
                      <span className="text-[10px] font-semibold text-[#0171c1]">Filtering</span>
                    )}
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="blog-search"
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="focus:outline-hidden shadow-xs w-full border border-slate-200 bg-white py-2.5 pl-9 pr-9 text-xs font-medium text-slate-800 placeholder-slate-400 transition-all focus:border-[#0171c1] focus:ring-1 focus:ring-[#0171c1] lg:bg-slate-50/70 lg:focus:bg-white"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700"
                        aria-label="Clear search"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                <div className="hidden h-px w-full bg-slate-100 lg:block" />

                {/* Categories Navigation */}
                <div>
                  <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 lg:mb-3">
                    Categories
                  </h3>

                  {/* MOBILE VIEW: Edge-to-Edge Horizontally Scrollable Bar (No Scrollbar) */}
                  <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
                    {categories.map((category) => {
                      const isSelected = selectedCategory === category;
                      const count = categoryCounts[category];
                      return (
                        <button
                          key={category}
                          onClick={() => handleCategoryChange(category)}
                          className={`shadow-xs relative shrink-0 border px-3.5 py-2 text-xs font-medium transition-all ${
                            isSelected
                              ? "border-[#001A3D] bg-[#001A3D] font-bold text-white"
                              : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <span className="flex items-center gap-1.5 whitespace-nowrap">
                            <span>{category}</span>
                            <span
                              className={`text-[10px] font-semibold ${
                                isSelected ? "text-[#F99D1C]" : "text-slate-400"
                              }`}
                            >
                              ({count})
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* DESKTOP VIEW: Vertical List with Smooth Sliding Indicator */}
                  <ul className="m-0 hidden list-none space-y-1 p-0 lg:block">
                    {categories.map((category) => {
                      const isSelected = selectedCategory === category;
                      const count = categoryCounts[category];
                      return (
                        <li key={category} className="relative">
                          {isSelected && (
                            <Motion.div
                              layoutId="activeCategorySidebarIndicator"
                              className="shadow-xs absolute inset-0 border-l-[3px] border-[#001A3D] bg-slate-50"
                              transition={{ type: "spring", stiffness: 450, damping: 35 }}
                            />
                          )}
                          <button
                            onClick={() => handleCategoryChange(category)}
                            className={`relative z-10 flex w-full items-center justify-between px-3.5 py-2.5 text-left text-sm font-medium transition-colors ${
                              isSelected
                                ? "font-bold text-[#001A3D]"
                                : "text-slate-500 hover:text-[#001A3D]"
                            }`}
                          >
                            <span className={isSelected ? "font-bold text-[#001A3D]" : ""}>
                              {category}
                            </span>
                            <span
                              className={`text-xs font-semibold transition-colors ${
                                isSelected ? "text-[#0171c1]" : "text-slate-400"
                              }`}
                            >
                              {count}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </aside>

            {/* RIGHT SIDE: BLOG CARDS GRID */}
            <main className="lg:col-span-9">
              {/* Filter Status Bar */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div className="text-xs font-medium text-slate-500">
                  Showing <span className="font-bold text-[#001A3D]">{filteredBlogs.length}</span>{" "}
                  {filteredBlogs.length === 1 ? "article" : "articles"}
                  {selectedCategory !== "All" && (
                    <>
                      {" "}
                      in <span className="font-bold text-[#0171c1]">"{selectedCategory}"</span>
                    </>
                  )}
                  {searchQuery && (
                    <>
                      {" "}
                      matching <span className="font-bold text-[#001A3D]">"{searchQuery}"</span>
                    </>
                  )}
                </div>

                {(selectedCategory !== "All" || searchQuery) && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All");
                      setCurrentPage(1);
                    }}
                    className="text-xs font-bold text-[#0171c1] hover:underline"
                  >
                    Reset filters
                  </button>
                )}
              </div>
              {filteredBlogs.length === 0 ? (
                <div className="shadow-xs border border-slate-200 bg-white py-20 text-center">
                  <Search size={32} className="mx-auto text-slate-300" />
                  <h4 className="mt-3 text-base font-bold text-[#001A3D]">No articles found</h4>
                  <p className="mt-1 text-xs text-slate-500">
                    Try searching with another keyword or select another category.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All");
                    }}
                    className="mt-5 bg-[#001A3D] px-4 py-2 text-xs font-bold text-white transition-all hover:bg-[#0171c1]"
                  >
                    Clear Filter
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                    {currentBlogs.map((blog, i) => (
                      <Motion.article
                        key={blog.slug}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
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

                          {/* Bottom Action Strip (inspired by the reference UI) */}
                          <div className="flex items-center justify-center border-t border-slate-100 bg-slate-50/50 py-3.5 text-xs font-bold text-slate-600 transition-all duration-300 group-hover:bg-[#001A3D] group-hover:text-[#F99D1C]">
                            <span className="flex items-center gap-1.5">
                              <span>Read article</span>
                              <ArrowRight
                                size={13}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                              />
                            </span>
                          </div>
                        </Link>
                      </Motion.article>
                    ))}
                  </div>

                  {/* MODERN PAGINATION DOCK */}
                  {totalPages > 1 && (
                    <nav
                      aria-label="Blog pagination"
                      className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-8 sm:flex-row"
                    >
                      {/* Page Counter Info */}
                      <p className="text-xs font-medium text-slate-500">
                        Page <span className="font-bold text-[#001A3D]">{currentPage}</span> of{" "}
                        <span className="font-bold text-[#001A3D]">{totalPages}</span>
                      </p>

                      {/* Controls */}
                      <div className="flex items-center gap-1.5">
                        {/* Prev Button with Border & Radius */}
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          aria-label="Previous page"
                          className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 shadow-xs transition-colors hover:border-[#0171c1] hover:bg-slate-50 hover:text-[#0171c1] disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100/90 disabled:text-slate-400 disabled:shadow-none"
                        >
                          <ChevronLeft size={16} />
                        </button>

                        {/* Page Numbers with Radius */}
                        <div className="flex items-center gap-1">
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                            const isCurrent = currentPage === page;
                            return (
                              <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                aria-current={isCurrent ? "page" : undefined}
                                className={`relative flex h-9 w-9 items-center justify-center rounded-md text-xs font-bold transition-colors ${
                                  isCurrent
                                    ? "text-white"
                                    : "text-slate-600 hover:bg-white hover:text-[#001A3D]"
                                }`}
                              >
                                {isCurrent && (
                                  <Motion.div
                                    layoutId="activePageIndicator"
                                    className="shadow-xs absolute inset-0 rounded-md bg-[#001A3D]"
                                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                                  />
                                )}
                                <span className="relative z-10">{page}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Next Button with Border & Radius */}
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          aria-label="Next page"
                          className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 shadow-xs transition-colors hover:border-[#0171c1] hover:bg-slate-50 hover:text-[#0171c1] disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100/90 disabled:text-slate-400 disabled:shadow-none"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </nav>
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
