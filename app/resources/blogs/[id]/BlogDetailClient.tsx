"use client";

import React, { useState, useMemo, Fragment } from "react";
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
    slug: "small-models-big-impact-why-domain-specific-ai-is-outperforming-giant-llms",
    title: "Small Models, Big Impact: Why Domain-Specific AI Is the Future of Healthcare & Life Sciences",
    category: "ARTIFICIAL INTELLIGENCE",
    date: "July 28, 2026",
    excerpt:
      "Introduction For years, the AI conversation was dominated by scale. Bigger models, more parameters, broader general-purpose capabilities...",
    image:
      "https://cms.hutechsolutions.ai/wp-content/uploads/2026/08/LLM.webp",
  },
  {
    id: "agentic-ai-autonomous-operators",
    slug: "agentic-ai-from-chatbots-to-autonomous-business-operators",
    title: "Agentic AI: From Chatbots to Autonomous Business Operators",
    category: "ARTIFICIAL INTELLIGENCE",
    date: "July 28, 2026",
    excerpt:
      "Introduction For years, AI in the enterprise meant chatbots — tools that answered questions, generated drafts, or routed customer tickets...",
    image:
      "https://cms.hutechsolutions.ai/wp-content/uploads/2026/08/agentic-ai.webp",
  },
  {
    id: "blockchain-supply-chain-revolution",
    slug: "blockchain-the-supply-chain-revolution",
    title: "Blockchain: The Supply Chain Revolution",
    category: "BLOCKCHAIN",
    date: "June 26, 2026",
    excerpt:
      "Supply chains are among the most complex systems in modern commerce, involving countless participants, transactions, and handoffs across global networks...",
    image:
      "https://cms.hutechsolutions.ai/wp-content/uploads/2026/08/blockchain.webp",
  },
];

const FALLBACK_THUMBNAILS = [
  "https://cms.hutechsolutions.ai/wp-content/uploads/2026/08/LLM.webp",
  "https://cms.hutechsolutions.ai/wp-content/uploads/2026/08/agentic-ai.webp",
  "https://cms.hutechsolutions.ai/wp-content/uploads/2026/08/blockchain.webp",
  "https://cms.hutechsolutions.ai/wp-content/uploads/2026/08/future-ai.webp",
  "https://cms.hutechsolutions.ai/wp-content/uploads/2026/08/healthcare.webp",
  "https://cms.hutechsolutions.ai/wp-content/uploads/2026/08/fintech.webp",
  "https://cms.hutechsolutions.ai/wp-content/uploads/2026/08/IoT-future.webp",
  "https://cms.hutechsolutions.ai/wp-content/uploads/2026/08/ai-shopping.webp",
  "https://cms.hutechsolutions.ai/wp-content/uploads/2026/06/devops.jpg",
];

function isBalanced(html: string) {
  const tags = ["div", "blockquote", "table", "ul", "ol"];
  for (const tag of tags) {
    const openMatches = html.match(new RegExp("<" + tag + "(\\s|>|$)", "gi")) || [];
    const closeMatches = html.match(new RegExp("</" + tag + ">", "gi")) || [];
    if (openMatches.length !== closeMatches.length) return false;
  }
  return true;
}

function splitHtmlContent(html: string): [string, string] {
  if (!html) return ["", ""];
  const pRegex = /<\/p>/gi;
  const matches: number[] = [];
  let match: RegExpExecArray | null;
  while ((match = pRegex.exec(html)) !== null) {
    matches.push(match.index + match[0].length);
  }
  if (matches.length <= 1) {
    return [html, ""];
  }
  const idealIndex =
    matches.length >= 6
      ? Math.min(4, Math.round(matches.length * 0.35))
      : matches.length >= 4
        ? 2
        : 1;

  for (let offset = 0; offset < matches.length; offset++) {
    for (const sign of [0, 1, -1]) {
      const idx = idealIndex + offset * sign;
      if (idx >= 1 && idx < matches.length) {
        const splitPos = matches[idx - 1];
        const part1 = html.slice(0, splitPos);
        if (isBalanced(part1)) {
          return [part1, html.slice(splitPos)];
        }
      }
    }
  }

  const splitPos = matches[idealIndex - 1];
  return [html.slice(0, splitPos), html.slice(splitPos)];
}

export default function BlogDetailClient({
  blog,
  latestBlogs = [],
}: {
  blog: Blog;
  latestBlogs?: LatestThinkingBlog[];
}) {
  const [copied, setCopied] = useState(false);

  if (!blog) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white p-6">
        <div className="space-y-6 text-center">
          <h2 className="display-font text-4xl font-bold text-[#001A3D]">Article Not Found</h2>
          <p className="text-gray-500">
            The article you&apos;re looking for might have been moved or the link is incorrect.
          </p>
          <Link
            href="/resources/blogs"
            className="inline-block rounded-sm bg-[#001A3D] px-8 py-4 text-xs font-bold tracking-wide text-white"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href.replace(window.location.origin, "https://hutechsolutions.ai")
      : "";

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
      item.slug !== currentSlugOrId && item.id !== currentSlugOrId && item.title !== blog.title
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

  const contentHtml = (blog as any).contentHtml as string | undefined;

  const [contentPart1, contentPart2] = useMemo(() => {
    if (!contentHtml) return ["", ""];
    return splitHtmlContent(contentHtml);
  }, [contentHtml]);

  const mobileCtaIndex = useMemo(() => {
    if (contentHtml || !blog.content || blog.content.length <= 1) return -1;
    return blog.content.length >= 5
      ? Math.min(3, Math.floor(blog.content.length / 3))
      : 0;
  }, [contentHtml, blog.content]);

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-[#172033] antialiased selection:bg-[#0754C6]/20 selection:text-[#0754C6]">
      <Meta
        title={`${blog.title} | Blogs | Hutech Solutions`}
        description={blog.excerpt ?? blog.content?.[0]?.text ?? ""}
      />

      {/* ========================================================================= */}
      {/* 1. HERO BANNER SECTION */}
      {/* ========================================================================= */}
      <section className="relative flex min-h-[440px] items-center overflow-hidden bg-[#001A3D] text-white lg:min-h-[480px]">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          {blog.image ? (
            <ImageWithFallback
              src={blog.image}
              alt={blog.title}
              className="h-full w-full object-cover opacity-25"
            />
          ) : (
            <div className="h-full w-full bg-[#001430] opacity-40" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D] via-[#001A3D]/80 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1240px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Back to All Blogs Link */}
            <Link
              href="/resources/blogs"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F99D1C] transition-colors hover:text-white"
            >
              <ArrowLeft size={16} /> All Blogs
            </Link>

            {/* Category Badge & Reading Time */}
            <div className="flex items-center gap-4">
              <span className="rounded-full border border-[#F99D1C]/30 bg-[#F99D1C]/15 px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-[#F99D1C]">
                {blog.category || "Fintech"}
              </span>
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/70">
                <Clock size={14} className="text-[#F99D1C]" /> {blog.readTime || "5 min read"}
              </span>
            </div>

            {/* Hero Main Headline */}
            <h1 className="display-font max-w-4xl text-3xl font-bold leading-[1.12] text-white sm:text-5xl md:text-6xl">
              {renderTitle(blog.title)}
            </h1>

            {/* Author & Published Date Metadata */}
            <div className="flex w-fit flex-wrap items-center gap-8 border-t border-white/10 pt-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0171c1]/30 text-[#F99D1C]">
                  <User size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">
                    {blog.author || "Hutech Solutions"}
                  </div>
                  <div className="text-[10.5px] font-medium uppercase tracking-wider text-white/50">
                    {blog.role || "Technology Practice Lead"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 border-l border-white/10 pl-8">
                <Calendar className="h-5 w-5 text-[#F99D1C]" />
                <div>
                  <div className="text-sm font-bold text-white">{blog.date}</div>
                  <div className="text-[10.5px] font-medium uppercase tracking-wider text-white/50">
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
      <div className="border-b border-gray-200/70 bg-[#F7F7F8] py-3.5">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-[#5A6270] sm:text-[13px]">
              <li>
                <Link href="/" className="font-medium transition-colors hover:text-[#0754C6]">
                  Home
                </Link>
              </li>
              <li className="select-none text-gray-400">/</li>
              <li>
                <Link
                  href="/resources/blogs"
                  className="font-medium transition-colors hover:text-[#0754C6]"
                >
                  Blog
                </Link>
              </li>
              {blog.category &&
                blog.category.trim().toLowerCase() !== "blog" &&
                blog.category.trim().toLowerCase() !== "blogs" && (
                  <>
                    <li className="select-none text-gray-400">/</li>
                    <li>
                      <span className="font-medium text-[#5A6270]">{blog.category}</span>
                    </li>
                  </>
                )}
              <li className="select-none text-gray-400">/</li>
              <li
                className="max-w-[240px] truncate font-semibold text-[#172033] sm:max-w-[400px] md:max-w-[500px]"
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
      <div className="bg-[#F7F7F8] py-10 lg:pb-16 lg:pt-8">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_300px] lg:gap-12 xl:grid-cols-[1fr_320px] xl:gap-14">
            {/* --------------------------------------------------------------------- */}
            {/* LEFT COLUMN: MAIN ARTICLE CONTENT WITH STICKY SOCIAL SHARING */}
            {/* --------------------------------------------------------------------- */}
            <main className="flex w-full min-w-0 items-start gap-6 lg:gap-8 xl:gap-10">
              {/* Sticky Left Social Media Bar (Matching Reference Image) */}
              <div className="sticky top-[100px] hidden shrink-0 select-none flex-col items-center self-start pt-1 md:flex">
                {/* SHARE ARTICLE Vertical Label */}
                <span
                  className="mb-7 select-none text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#8A919D]"
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
                    className="flex items-center justify-center p-1 text-[#8A919D] transition-colors hover:text-[#0A66C2]"
                    aria-label="Share on LinkedIn"
                    title="Share on LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href={getShareUrl("twitter")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-1 text-[#8A919D] transition-colors hover:text-black"
                    aria-label="Share on X"
                    title="Share on X"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href={getShareUrl("facebook")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-1 text-[#8A919D] transition-colors hover:text-[#1877F2]"
                    aria-label="Share on Facebook"
                    title="Share on Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className="group relative flex items-center justify-center p-1 text-[#8A919D] transition-colors hover:text-[#172033]"
                    aria-label="Copy article link"
                    title="Copy link"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <Share2 className="h-4 w-4" />
                    )}
                    {copied && (
                      <span className="pointer-events-none absolute left-7 top-1/2 z-20 -translate-y-1/2 whitespace-nowrap rounded bg-[#172033] px-2 py-1 text-[10px] font-medium text-white shadow-md">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Main Article Content Container */}
              <div className="w-full min-w-0 flex-1">
                <article className="">
                  {/* Mobile/Tablet Fallback Share Row (< md) */}
                  <div className="flex items-center justify-between border-b border-gray-200 pb-6 md:hidden">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#8A919D]">
                      Share Article
                    </span>
                    <div className="flex items-center gap-3">
                      <a
                        href={getShareUrl("linkedin")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-gray-200 bg-white p-2 text-[#8A919D] shadow-sm transition-colors hover:border-[#0A66C2] hover:text-[#0A66C2]"
                        aria-label="Share on LinkedIn"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                      <a
                        href={getShareUrl("twitter")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-gray-200 bg-white p-2 text-[#8A919D] shadow-sm transition-colors hover:border-black hover:text-black"
                        aria-label="Share on X"
                      >
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                      <a
                        href={getShareUrl("facebook")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-gray-200 bg-white p-2 text-[#8A919D] shadow-sm transition-colors hover:border-[#1877F2] hover:text-[#1877F2]"
                        aria-label="Share on Facebook"
                      >
                        <Facebook className="h-4 w-4" />
                      </a>
                      <button
                        onClick={handleCopyLink}
                        className="group relative rounded-full border border-gray-200 bg-white p-2 text-[#8A919D] shadow-sm transition-colors hover:border-[#172033] hover:text-[#172033]"
                        aria-label="Copy article link"
                        title="Copy link"
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <Share2 className="h-4 w-4" />
                        )}
                        {copied && (
                          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#172033] px-2 py-1 text-[10px] font-medium text-white shadow-md">
                            Copied!
                          </span>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Main Article Body Text & Headings */}
                  <div className="prose prose-slate max-w-none">
                    {contentHtml ? (
                      <>
                        <div
                          className="wp-content text-[15.5px] font-normal leading-[1.78] text-[#4E5665] [&_a]:text-[#0754C6] [&_a]:underline [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#172033] [&_h2]:md:text-3xl [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#172033] [&_li]:mb-2 [&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-6 [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6"
                          dangerouslySetInnerHTML={{ __html: contentPart1 }}
                        />

                        {contentPart2 ? (
                          <div className="not-prose my-8 rounded-[4px] bg-[#0754C6] p-6 text-white shadow-md sm:p-7 lg:hidden">
                            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-100/90">
                              Hutech Solutions
                            </div>
                            <h3 className="mb-2.5 font-serif text-[22px] font-normal leading-[1.25] text-white sm:text-[26px]">
                              From Idea to Impact
                            </h3>
                            <p className="mb-5 text-[14px] font-normal leading-[1.6] text-blue-100/90">
                              Tell us what you want to build. We’ll bring the right strategy, team,
                              and technology.
                            </p>
                            <Link
                              href="/contact"
                              className="inline-flex w-full items-center justify-center rounded-[3px] bg-white py-3.5 text-center text-sm font-bold text-[#172033] shadow-sm transition-all hover:bg-blue-50 hover:shadow active:scale-[0.99] sm:w-auto sm:px-6"
                            >
                              Book Meeting
                            </Link>
                          </div>
                        ) : null}

                        {contentPart2 ? (
                          <div
                            className="wp-content text-[15.5px] font-normal leading-[1.78] text-[#4E5665] [&_a]:text-[#0754C6] [&_a]:underline [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#172033] [&_h2]:md:text-3xl [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#172033] [&_li]:mb-2 [&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-6 [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6"
                            dangerouslySetInnerHTML={{ __html: contentPart2 }}
                          />
                        ) : null}
                      </>
                    ) : (
                      blog.content.map((block, idx) => {
                        let blockElement = null;
                        if (block.type === "paragraph") {
                          blockElement = (
                            <p
                              key={idx}
                              className="mb-6 text-[15px] font-normal leading-[1.75] text-[#4E5665] sm:text-[15.5px]"
                            >
                              {block.text}
                            </p>
                          );
                        } else if (block.type === "heading") {
                          blockElement = (
                            <h2
                              key={idx}
                              className="mb-4 mt-10 text-[19px] font-bold leading-snug text-[#172033] sm:text-[22px]"
                            >
                              {block.text}
                            </h2>
                          );
                        } else if (block.type === "quote") {
                          blockElement = (
                            <div
                              key={idx}
                              className="relative my-10 rounded-[4px] border-l-4 border-[#0754C6] bg-white p-8 shadow-sm sm:p-10"
                            >
                              <Quote className="absolute right-6 top-6 h-10 w-10 text-[#0754C6]/15" />
                              <blockquote className="space-y-4">
                                <p className="font-serif text-lg font-normal italic leading-relaxed text-[#172033] sm:text-xl">
                                  &ldquo;{block.text}&rdquo;
                                </p>
                                <footer className="pt-2">
                                  <div className="text-sm font-bold text-[#172033]">
                                    {block.author}
                                  </div>
                                  <div className="text-xs font-medium tracking-wide text-[#8A919D]">
                                    {block.designation}
                                  </div>
                                </footer>
                              </blockquote>
                            </div>
                          );
                        }

                        return (
                          <Fragment key={idx}>
                            {blockElement}
                            {idx === mobileCtaIndex && (
                              <div className="not-prose my-8 rounded-[4px] bg-[#0754C6] p-6 text-white shadow-md sm:p-7 lg:hidden">
                                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-100/90">
                                  Hutech Solutions
                                </div>
                                <h3 className="mb-2.5 font-serif text-[22px] font-normal leading-[1.25] text-white sm:text-[26px]">
                                  From Idea to Impact
                                </h3>
                                <p className="mb-5 text-[14px] font-normal leading-[1.6] text-blue-100/90">
                                  Tell us what you want to build. We’ll bring the right strategy, team,
                                  and technology.
                                </p>
                                <Link
                                  href="/contact"
                                  className="inline-flex w-full items-center justify-center rounded-[3px] bg-white py-3.5 text-center text-sm font-bold text-[#172033] shadow-sm transition-all hover:bg-blue-50 hover:shadow active:scale-[0.99] sm:w-auto sm:px-6"
                                >
                                  Book Meeting
                                </Link>
                              </div>
                            )}
                          </Fragment>
                        );
                      })
                    )}
                  </div>

                  {/* Tags Section */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-3 border-t border-gray-200 pt-8">
                      <div className="mr-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                        <Tag size={14} /> Tags:
                      </div>
                      {blog.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="rounded-[2px] border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:border-[#0754C6] hover:text-[#0754C6]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* FAQ Section */}
                  {blog.faqs && blog.faqs.length > 0 && (
                    <div className="space-y-6 pt-12">
                      <div>
                        <h3 className="text-2xl font-bold text-[#172033]">
                          {blog.faqTitle
                            ? renderTitle(blog.faqTitle)
                            : "Frequently Asked Questions"}
                        </h3>
                        {blog.faqSubtitle && (
                          <p className="mt-1 text-sm text-gray-500">
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
                  <div className="mt-12 rounded-[4px] bg-[#0754C6] p-6 text-white shadow-md sm:p-8">
                    <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                      <div className="max-w-[480px] space-y-2.5">
                        <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-blue-100/90">
                          Turn Your Ideas into Real Impact
                        </div>
                        <p className="font-serif text-[18px] font-normal leading-[1.35] text-white sm:text-[20px]">
                          Partner with Hutech Solutions for Cloud, Data & AI-driven transformation.
                          From strategy to execution, we help you build smarter, faster and for a
                          better tomorrow.
                        </p>
                      </div>

                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center self-start whitespace-nowrap rounded-[3px] bg-white px-6 py-3 text-sm font-bold text-[#172033] shadow-sm transition-all hover:bg-blue-50 hover:shadow active:scale-[0.98] sm:self-center"
                      >
                        Engage Hutech Solutions
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            </main>

            {/* --------------------------------------------------------------------- */}
            {/* RIGHT COLUMN: STICKY SIDEBAR (MATCHING right-side(1).png) */}
            {/* --------------------------------------------------------------------- */}
            <aside className="hidden w-full lg:sticky lg:top-[100px] lg:block lg:self-start">
              <div className="rounded-[4px] bg-[#0754C6] p-7 text-white shadow-md">
                {/* Small Top Label */}
                <div className="mb-3 text-sm font-medium tracking-wide text-blue-100/95">
                  Hutech Solutions
                </div>

                {/* Large Serif Headline */}
                <h3 className="mb-3.5 font-serif text-[28px] font-normal leading-[1.18] text-white sm:text-[30px]">
                  From Idea to Impact
                </h3>

                {/* Supporting Copy */}
                <p className="mb-7 text-[13.5px] font-normal leading-[1.55] text-blue-100/90">
                  Tell us what you want to build. We’ll bring the right strategy, team, and
                  technology.
                </p>

                {/* White Action Button */}
                <Link
                  href="/contact"
                  className="flex w-full items-center justify-center rounded-[3px] bg-white py-3.5 text-center text-sm font-bold text-[#172033] shadow-sm transition-all hover:bg-blue-50 hover:shadow active:scale-[0.99]"
                >
                  Book Meeting
                </Link>
              </div>
            </aside>
          </div>

          {/* ========================================================================= */}
          {/* 5. RELATED ARTICLES / RELATED READING (MATCHING related-article.png) */}
          {/* ========================================================================= */}
          <section
            aria-labelledby="related-reading-heading"
            className="mt-16 border-t border-gray-300 pt-10 lg:mt-20"
          >
            {/* Header with Title and All posts Link */}
            <div className="mb-8 flex items-center justify-between">
              <h2
                id="related-reading-heading"
                className="text-xl font-bold text-[#172033] sm:text-2xl"
              >
                Related reading
              </h2>
              <Link
                href="/resources/blogs"
                className="flex items-center gap-1 text-sm font-semibold text-[#172033] transition-colors hover:text-[#0754C6]"
              >
                All posts
              </Link>
            </div>

            {/* 3-Column Responsive Cards Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-7">
              {relatedReadingItems.map((article, idx) => (
                <article
                  key={article.slug || article.id || idx}
                  className="group flex flex-col overflow-hidden rounded-[4px] border border-[#E5E7EB] bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-md"
                >
                  {/* 16:9 Thumbnail with Category Badge */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                    <Image
                      src={
                        article.image ||
                        FALLBACK_THUMBNAILS[idx % FALLBACK_THUMBNAILS.length]
                      }
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />

                    {/* Category Pill Badge */}
                    <div className="absolute left-3 top-3 z-10">
                      <span className="inline-block rounded-[2px] border border-white/15 bg-[#001A3D]/75 px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-wider text-white shadow-sm backdrop-blur-[2px]">
                        {article.category || "ARTIFICIAL INTELLIGENCE"}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      {/* Date with Calendar Icon */}
                      <div className="mb-2.5 flex items-center gap-1.5 text-[11.5px] font-medium text-[#8A919D]">
                        <Calendar className="h-3.5 w-3.5 text-[#8A919D]" />
                        <time dateTime={article.date}>{article.date}</time>
                      </div>

                      {/* Article Title */}
                      <h3 className="mb-2.5 line-clamp-2 text-[15.5px] font-bold leading-[1.35] text-[#172033] transition-colors group-hover:text-[#0754C6]">
                        <Link
                          href={article.path || `/resources/blogs/${article.slug || article.id}/`}
                        >
                          {renderTitle(article.title)}
                        </Link>
                      </h3>

                      {/* Excerpt / Description */}
                      <p className="line-clamp-2 text-[12.5px] leading-[1.58] text-[#5A6270]">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Mobile Fallback CTA if content was too short to split */}
          {!contentPart2 && mobileCtaIndex === -1 && (
            <div className="mt-12 rounded-[4px] bg-[#0754C6] p-6 text-white shadow-md sm:p-7 lg:hidden">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-100/90">
                Hutech Solutions
              </div>
              <h3 className="mb-2.5 font-serif text-[22px] font-normal leading-[1.25] text-white sm:text-[26px]">
                From Idea to Impact
              </h3>
              <p className="mb-5 text-[14px] font-normal leading-[1.6] text-blue-100/90">
                Tell us what you want to build. We’ll bring the right strategy, team, and
                technology.
              </p>
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-[3px] bg-white py-3.5 text-center text-sm font-bold text-[#172033] shadow-sm transition-all hover:bg-blue-50 hover:shadow active:scale-[0.99] sm:w-auto sm:px-6"
              >
                Book Meeting
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
