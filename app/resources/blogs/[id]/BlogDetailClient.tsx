"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion as Motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Tag,
  Quote,
  Facebook,
  Linkedin,
  Share2,
  Check,
  User,
  ChevronRight,
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Blog, BLOG_DATA } from "@/lib/data/blogs";
import { renderTitle } from "@/lib/utils";
import { FAQAccordion } from "@/components/FAQAccordion";

export type LatestThinkingBlog = {
  id?: string;
  slug?: string;
  title: string;
  category: string;
  date: string;
  excerpt?: string;
  image?: string;
  path?: string;
};

// Default fallback articles if needed for related reading
const DEFAULT_RELATED: LatestThinkingBlog[] = [
  {
    id: "small-models-big-impact",
    slug: "small-models-big-impact",
    title: "Small Models, Big Impact: Why Domain-Specific AI Is...",
    category: "ARTIFICIAL INTELLIGENCE",
    date: "July 28, 2026",
    excerpt: "Introduction For years, the AI conversation was dominated by scale. Bigger models, more...",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "agentic-ai-autonomous-operators",
    slug: "agentic-ai-autonomous-operators",
    title: "Agentic AI: From Chatbots to Autonomous Business Operators",
    category: "ARTIFICIAL INTELLIGENCE",
    date: "July 28, 2026",
    excerpt: "Introduction For years, AI in the enterprise meant chatbots — tools that answered questions,...",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "blockchain-supply-chain-revolution",
    slug: "blockchain-supply-chain-revolution",
    title: "Blockchain: The Supply Chain Revolution",
    category: "BLOCKCHAIN",
    date: "June 26, 2026",
    excerpt: "Supply chains are among the most complex systems in modern commerce, involving countless...",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
];

export default function BlogDetailClient({
  blog,
  latestBlogs,
}: {
  blog: Blog;
  latestBlogs?: LatestThinkingBlog[];
}) {
  const [copied, setCopied] = useState(false);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6">
        <div className="text-center space-y-6">
          <h2 className="display-font text-4xl font-bold text-[#001A3D]">Article Not Found</h2>
          <p className="text-gray-500">The article you&apos;re looking for might have been moved or the link is incorrect.</p>
          <Link href="/resources/blogs" className="inline-block bg-[#001A3D] text-white px-8 py-4 rounded-sm font-bold text-xs tracking-wide">
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href.replace(window.location.origin, "https://hutechsolutions.ai") : "";

  const handleCopyLink = async () => {
    if (typeof window !== "undefined") {
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        }
      } catch {
        // fallback
      }
    }
  };

  const getShareUrl = (platform: "twitter" | "linkedin" | "facebook") => {
    if (typeof window === "undefined") return "#";
    const currentUrl = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(`${blog.title} | Hutech Solutions`);

    switch (platform) {
      case "twitter":
        return `https://twitter.com/intent/tweet?url=${currentUrl}&text=${title}`;
      case "linkedin":
        return `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
    }
  };

  // Filter out the currently viewed blog so it doesn't recommend itself in Related Reading
  const currentSlugOrId = (blog as any).slug || blog.id || "";
  const dynamicFiltered = (latestBlogs || []).filter(
    (item) =>
      item.slug !== currentSlugOrId &&
      item.id !== currentSlugOrId &&
      item.title !== blog.title
  );

  // Fallback to static items if latestBlogs has fewer than 3 items
  const staticFallbackFiltered = Object.values(BLOG_DATA)
    .filter((b) => b.id !== currentSlugOrId && b.title !== blog.title)
    .map((b) => ({
      id: b.id,
      slug: b.id,
      title: b.title,
      category: b.category,
      date: b.date,
      excerpt: b.excerpt || b.content?.[0]?.text || "",
      image: b.image,
      path: `/resources/blogs/${b.id}/`,
    }));

  const combinedRelated: LatestThinkingBlog[] = [
    ...dynamicFiltered,
    ...staticFallbackFiltered,
    ...DEFAULT_RELATED,
  ].filter(
    (item, index, self) =>
      index === self.findIndex((t) => (t.slug || t.id) === (item.slug || item.id)) &&
      (item.slug || item.id) !== currentSlugOrId
  );

  const relatedReadingItems = combinedRelated.slice(0, 3);

  return (
    <div className="flex flex-col bg-white min-h-screen text-[#172033] font-sans antialiased selection:bg-[#0754C6]/20 selection:text-[#0754C6]">
      <Meta
        title={`${blog.title} | Blogs | Hutech Solutions`}
        description={blog.excerpt ?? (blog.content?.[0]?.text ?? "")}
      />

      {/* ========================================================================= */}
      {/* 1. HERO BANNER SECTION */}
      {/* ========================================================================= */}
      <section className="bg-[#001A3D] text-white min-h-[440px] lg:min-h-[480px] relative overflow-hidden flex items-center">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          {blog.image ? (
            <ImageWithFallback
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover opacity-25"
            />
          ) : (
            <div className="w-full h-full bg-[#001430] opacity-40" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D] via-[#001A3D]/80 to-transparent" />
        </div>

        <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full py-16 lg:py-20">
          <Motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Back to All Blogs Link */}
            <Link
              href="/resources/blogs"
              className="inline-flex items-center gap-2 text-[#F99D1C] font-bold text-xs uppercase tracking-widest hover:text-white transition-colors"
            >
              <ArrowLeft size={16} /> All Blogs
            </Link>

            {/* Category Badge & Reading Time */}
            <div className="flex items-center gap-4">
              <span className="px-3.5 py-1 bg-[#F99D1C]/15 text-[#F99D1C] text-[10px] font-black uppercase tracking-widest rounded-full border border-[#F99D1C]/30">
                {blog.category || "Fintech"}
              </span>
              <span className="flex items-center gap-2 text-white/70 text-xs font-bold uppercase tracking-widest">
                <Clock size={14} className="text-[#F99D1C]" /> {blog.readTime || "5 min read"}
              </span>
            </div>

            {/* Hero Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold display-font leading-[1.12] max-w-4xl text-white">
              {renderTitle(blog.title)}
            </h1>

            {/* Author & Published Date Metadata */}
            <div className="flex flex-wrap items-center gap-8 pt-4 border-t border-white/10 w-fit">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0171c1]/30 border border-white/10 flex items-center justify-center text-[#F99D1C]">
                  <User size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{blog.author || "Hutech Solutions"}</div>
                  <div className="text-[10.5px] text-white/50 font-medium uppercase tracking-wider">
                    {blog.role || "Technology Practice Lead"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 border-l border-white/10 pl-8">
                <Calendar className="text-[#F99D1C] w-5 h-5" />
                <div>
                  <div className="text-sm font-bold text-white">{blog.date}</div>
                  <div className="text-[10.5px] text-white/50 font-medium uppercase tracking-wider">
                    Published Date
                  </div>
                </div>
              </div>
            </div>
          </Motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. BREADCRUMB (AFTER HERO BANNER & BEFORE ARTICLE CONTENT) */}
      {/* ========================================================================= */}
      <div className="bg-[#F7F7F8] border-b border-gray-200/70 py-3.5">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-2 text-xs sm:text-[13px] text-[#5A6270]">
              <li>
                <Link href="/" className="hover:text-[#0754C6] transition-colors font-medium">
                  Home
                </Link>
              </li>
              <li className="text-gray-400 select-none">/</li>
              <li>
                <Link href="/resources/blogs" className="hover:text-[#0754C6] transition-colors font-medium">
                  Blog
                </Link>
              </li>
              {blog.category &&
                blog.category.trim().toLowerCase() !== "blog" &&
                blog.category.trim().toLowerCase() !== "blogs" && (
                  <>
                    <li className="text-gray-400 select-none">/</li>
                    <li>
                      <span className="text-[#5A6270] font-medium">
                        {blog.category}
                      </span>
                    </li>
                  </>
              )}
              <li className="text-gray-400 select-none">/</li>
              <li
                className="text-[#172033] font-semibold truncate max-w-[240px] sm:max-w-[400px] md:max-w-[500px]"
                aria-current="page"
                title={blog.title}
              >
                {blog.title}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. TWO-COLUMN ARTICLE CONTENT + STICKY RIGHT SIDEBAR */}
      {/* ========================================================================= */}
      <div className="bg-[#F7F7F8] py-10 lg:py-16">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-10 lg:gap-12 xl:gap-14 items-start">
            
            {/* --------------------------------------------------------------------- */}
            {/* LEFT COLUMN: MAIN ARTICLE CONTENT WITH STICKY SOCIAL SHARING */}
            {/* --------------------------------------------------------------------- */}
            <main className="w-full min-w-0 flex items-start gap-6 lg:gap-8 xl:gap-10">
              
              {/* Sticky Left Social Media Bar (Matching Reference Image) */}
              <div className="hidden md:flex flex-col items-center sticky top-[100px] self-start shrink-0 pt-1 select-none">
                {/* SHARE ARTICLE Vertical Label */}
                <span
                  className="text-[10.5px] font-semibold text-[#8A919D] uppercase tracking-[0.22em] mb-7 select-none"
                  style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                  }}
                >
                  Share Article
                </span>

                {/* Social Share Icons */}
                <div className="flex flex-col items-center gap-5">
                  <a
                    href={getShareUrl("linkedin")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8A919D] hover:text-[#0A66C2] transition-colors p-1 flex items-center justify-center"
                    aria-label="Share on LinkedIn"
                    title="Share on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={getShareUrl("twitter")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8A919D] hover:text-black transition-colors p-1 flex items-center justify-center"
                    aria-label="Share on X"
                    title="Share on X"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href={getShareUrl("facebook")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8A919D] hover:text-[#1877F2] transition-colors p-1 flex items-center justify-center"
                    aria-label="Share on Facebook"
                    title="Share on Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className="text-[#8A919D] hover:text-[#172033] transition-colors p-1 relative group flex items-center justify-center"
                    aria-label="Copy article link"
                    title="Copy link"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                    {copied && (
                      <span className="absolute left-7 top-1/2 -translate-y-1/2 bg-[#172033] text-white text-[10px] font-medium py-1 px-2 rounded whitespace-nowrap shadow-md pointer-events-none z-20">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Main Article Content Container */}
              <div className="w-full min-w-0 flex-1">
                <article className="space-y-8">
                  
                  {/* Mobile/Tablet Fallback Share Row (< md) */}
                  <div className="flex md:hidden items-center justify-between pb-6 border-b border-gray-200">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#8A919D]">
                      Share Article
                    </span>
                    <div className="flex items-center gap-3">
                      <a
                        href={getShareUrl("linkedin")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-white border border-gray-200 text-[#8A919D] hover:text-[#0A66C2] hover:border-[#0A66C2] transition-colors shadow-sm"
                        aria-label="Share on LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href={getShareUrl("twitter")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-white border border-gray-200 text-[#8A919D] hover:text-black hover:border-black transition-colors shadow-sm"
                        aria-label="Share on X"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                      <a
                        href={getShareUrl("facebook")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-white border border-gray-200 text-[#8A919D] hover:text-[#1877F2] hover:border-[#1877F2] transition-colors shadow-sm"
                        aria-label="Share on Facebook"
                      >
                        <Facebook className="w-4 h-4" />
                      </a>
                      <button
                        onClick={handleCopyLink}
                        className="p-2 rounded-full bg-white border border-gray-200 text-[#8A919D] hover:text-[#172033] hover:border-[#172033] transition-colors shadow-sm relative group"
                        aria-label="Copy article link"
                        title="Copy link"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                        {copied && (
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#172033] text-white text-[10px] font-medium py-1 px-2 rounded whitespace-nowrap shadow-md pointer-events-none">
                            Copied!
                          </span>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Main Article Body Text & Headings */}
                  <div className="prose prose-slate max-w-none">
                    {(blog as any).contentHtml ? (
                      <div
                        className="wp-content text-[15.5px] leading-[1.78] text-[#4E5665] font-normal [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:text-[#172033] [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#172033] [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_li]:mb-2 [&_a]:text-[#0754C6] [&_a]:underline"
                        dangerouslySetInnerHTML={{ __html: (blog as any).contentHtml }}
                      />
                    ) : (
                      blog.content.map((block, idx) => {
                        if (block.type === "paragraph") {
                          return (
                            <p
                              key={idx}
                              className="text-[15px] sm:text-[15.5px] leading-[1.75] text-[#4E5665] font-normal mb-6"
                            >
                              {block.text}
                            </p>
                          );
                        }
                        if (block.type === "heading") {
                          return (
                            <h2
                              key={idx}
                              className="text-[19px] sm:text-[22px] font-bold text-[#172033] leading-snug mt-10 mb-4"
                            >
                              {block.text}
                            </h2>
                          );
                        }
                        if (block.type === "quote") {
                          return (
                            <div
                              key={idx}
                              className="my-10 relative p-8 sm:p-10 bg-white rounded-[4px] border-l-4 border-[#0754C6] shadow-sm"
                            >
                              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#0754C6]/15" />
                              <blockquote className="space-y-4">
                                <p className="text-lg sm:text-xl font-normal text-[#172033] font-serif italic leading-relaxed">
                                  &ldquo;{block.text}&rdquo;
                                </p>
                                <footer className="pt-2">
                                  <div className="font-bold text-[#172033] text-sm">{block.author}</div>
                                  <div className="text-xs text-[#8A919D] font-medium tracking-wide">
                                    {block.designation}
                                  </div>
                                </footer>
                              </blockquote>
                            </div>
                          );
                        }
                        return null;
                      })
                    )}
                  </div>

                  {/* Tags Section */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="pt-8 border-t border-gray-200 flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mr-2">
                        <Tag size={14} /> Tags:
                      </div>
                      {blog.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3.5 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-[2px] text-xs font-semibold hover:border-[#0754C6] hover:text-[#0754C6] transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* FAQ Section */}
                  {blog.faqs && blog.faqs.length > 0 && (
                    <div className="pt-12 space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-[#172033]">
                          {blog.faqTitle ? renderTitle(blog.faqTitle) : "Frequently Asked Questions"}
                        </h3>
                        {blog.faqSubtitle && (
                          <p className="text-sm text-gray-500 mt-1">
                            {renderTitle(blog.faqSubtitle)}
                          </p>
                        )}
                      </div>
                      <FAQAccordion faqs={blog.faqs} />
                    </div>
                  )}

                  {/* ========================================================================= */}
                  {/* 4. ARTICLE-BOTTOM IMAGE / CTA SECTION (MATCHING article-bottom.png) */}
                  {/* ========================================================================= */}
                  <div className="mt-12 bg-[#0754C6] text-white p-6 sm:p-8 rounded-[4px] shadow-md">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div className="space-y-2.5 max-w-[480px]">
                        <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-blue-100/90">
                          NEW HIRES BURIED ON DAY TWO?
                        </div>
                        <p className="font-serif text-[18px] sm:text-[20px] font-normal leading-[1.35] text-white">
                          See how realfast does it — every tool your team runs on, pulled into one connected page the moment a new hire needs it.
                        </p>
                      </div>

                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center bg-white text-[#172033] text-sm font-bold px-6 py-3 rounded-[3px] hover:bg-blue-50 transition-all shadow-sm hover:shadow active:scale-[0.98] whitespace-nowrap self-start sm:self-center"
                      >
                        Book a Demo
                      </Link>
                    </div>
                  </div>

                </article>
              </div>
            </main>

            {/* --------------------------------------------------------------------- */}
            {/* RIGHT COLUMN: STICKY SIDEBAR (MATCHING right-side(1).png) */}
            {/* --------------------------------------------------------------------- */}
            <aside className="w-full lg:sticky lg:top-[100px] lg:self-start">
              <div className="bg-[#0754C6] p-7 text-white rounded-[4px] shadow-md">
                {/* Small Top Label */}
                <div className="text-sm font-medium text-blue-100/95 tracking-wide mb-3">
                  Hutech Solutions
                </div>

                {/* Large Serif Headline */}
                <h3 className="font-serif text-[28px] sm:text-[30px] font-normal leading-[1.18] text-white mb-3.5">
                  From strategy to shipped
                </h3>

                {/* Supporting Copy */}
                <p className="text-[13.5px] text-blue-100/90 leading-[1.55] mb-7 font-normal">
                  Tell us what you want built. We come back with a plan and a timeline.
                </p>

                {/* White Action Button */}
                <Link
                  href="/contact"
                  className="w-full bg-white text-[#172033] font-bold text-sm py-3.5 rounded-[3px] hover:bg-blue-50 transition-all flex items-center justify-center text-center shadow-sm hover:shadow active:scale-[0.99]"
                >
                  Book Meeting
                </Link>
              </div>
            </aside>

          </div>

          {/* ========================================================================= */}
          {/* 5. RELATED ARTICLES / RELATED READING (MATCHING related-article.png) */}
          {/* ========================================================================= */}
          <section aria-labelledby="related-reading-heading" className="mt-16 lg:mt-20 pt-10 border-t border-gray-300">
            {/* Header with Title and All posts Link */}
            <div className="flex items-center justify-between mb-8">
              <h2 id="related-reading-heading" className="text-xl sm:text-2xl font-bold text-[#172033]">
                Related reading
              </h2>
              <Link
                href="/resources/blogs"
                className="text-sm font-semibold text-[#172033] hover:text-[#0754C6] transition-colors flex items-center gap-1"
              >
                All posts
              </Link>
            </div>

            {/* 3-Column Responsive Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
              {relatedReadingItems.map((article, idx) => (
                <article
                  key={article.slug || article.id || idx}
                  className="group bg-white border border-[#E5E7EB] rounded-[4px] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md hover:border-gray-300"
                >
                  {/* 16:9 Thumbnail with Category Badge */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                    <Image
                      src={
                        article.image ||
                        "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                      }
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    
                    {/* Category Pill Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-block bg-[#001A3D]/75 backdrop-blur-[2px] text-white text-[9.5px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-[2px] border border-white/15 shadow-sm">
                        {article.category || "ARTIFICIAL INTELLIGENCE"}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Date with Calendar Icon */}
                      <div className="flex items-center gap-1.5 text-[11.5px] text-[#8A919D] font-medium mb-2.5">
                        <Calendar className="w-3.5 h-3.5 text-[#8A919D]" />
                        <time dateTime={article.date}>{article.date}</time>
                      </div>

                      {/* Article Title */}
                      <h3 className="text-[15.5px] font-bold text-[#172033] leading-[1.35] mb-2.5 group-hover:text-[#0754C6] transition-colors line-clamp-2">
                        <Link href={article.path || `/resources/blogs/${article.slug || article.id}/`}>
                          {renderTitle(article.title)}
                        </Link>
                      </h3>

                      {/* Excerpt / Description */}
                      <p className="text-[12.5px] text-[#5A6270] leading-[1.58] line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
