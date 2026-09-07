"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IPublishPageData, getIPublishImageUrl } from "@/lib/ipublish";
import { getIPublishPatternStyle, extractPatternFromBody } from "@/lib/ipublish-pattern";
import { Linkedin, Twitter, Facebook, Share2, Calendar, Check } from "lucide-react";

interface IPublishDetailClientProps {
  content: IPublishPageData;
  slug?: string;
}

export function IPublishDetailClient({ content }: IPublishDetailClientProps) {
  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href.replace(window.location.origin, "https://hutechsolutions.ai")
      : content.canonical_url || "";

  const [copied, setCopied] = useState(false);

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
    const title = encodeURIComponent(`${content.title} | Hutech Solutions`);

    switch (platform) {
      case "twitter":
        return `https://twitter.com/intent/tweet?url=${currentUrl}&text=${title}`;
      case "linkedin":
        return `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
    }
  };

  // Dynamic Banner Background
  const gradientFrom = content.banner_gradient_from || "#6d5ef8";
  const gradientTo = content.banner_gradient_to || "#ec4899";
  const gradientDirection = content.banner_gradient_direction || "135deg";

  // Dynamic Title Styles
  const titleColor = content.title_color || "#ffffff";
  const titleFont = (content.title_font || "merriweather").toLowerCase().replace(/\s+/g, "-");
  const titleWeight = content.title_weight || 700;
  const titleItalic = Boolean(content.title_italic);
  const titleScale = content.title_size_scale || 100;
  const titleLineHeight = content.title_line_height ? content.title_line_height / 100 : 1.15;
  const titleMarginX = content.title_margin_x || 0;
  const titleMarginY = content.title_margin_y || 0;
  const titlePadding = content.featured_title_padding ?? 32;

  // Title Position Mapping
  const positionClass = useMemo(() => {
    switch (content.featured_title_position) {
      case "bottom-left":
        return "items-end justify-start text-left";
      case "top-left":
        return "items-start justify-start text-left";
      case "center-left":
        return "items-center justify-start text-left";
      case "top-center":
        return "items-start justify-center text-center";
      case "bottom-center":
        return "items-end justify-center text-center";
      case "center-right":
        return "items-center justify-end text-right";
      case "bottom-right":
        return "items-end justify-end text-right";
      case "center-center":
      default:
        return "items-center justify-center text-center";
    }
  }, [content.featured_title_position]);

  // Title Shadow Mapping
  const textShadow = useMemo(() => {
    if (content.title_shadow === "none") return "none";
    if (content.title_shadow === "strong") return "0 4px 16px rgba(0,0,0,0.85)";
    return "0 2px 8px rgba(0,0,0,0.45)";
  }, [content.title_shadow]);

  // Dynamic Banner Pattern matching iPublish CMS inner pages
  const patternStyle = useMemo(() => {
    const extracted = extractPatternFromBody(content.body || content.current_body);
    if (extracted?.backgroundImage) {
      return {
        backgroundImage: extracted.backgroundImage,
        backgroundSize: extracted.backgroundSize,
        opacity:
          extracted.opacity ??
          (content.banner_pattern_opacity !== undefined
            ? content.banner_pattern_opacity / 100
            : 0.2),
      };
    }

    if (!content.banner_pattern && !content.raw_banner_pattern) return null;
    if (content.banner_pattern === "none" && !content.raw_banner_pattern) return null;

    const color = content.banner_pattern_color || "#ffffff";
    const opacity = (content.banner_pattern_opacity ?? 20) / 100;

    return getIPublishPatternStyle(
      content.banner_pattern,
      content.raw_banner_pattern,
      color,
      opacity
    );
  }, [
    content.body,
    content.current_body,
    content.banner_pattern,
    content.raw_banner_pattern,
    content.banner_pattern_color,
    content.banner_pattern_opacity,
  ]);

  // Dynamic Featured Image
  const featuredImageUrl = getIPublishImageUrl(content.featured_image_url);
  const bannerMinHeight = content.featured_image_height
    ? `clamp(150px, 26vw, ${content.featured_image_height}px)`
    : "clamp(150px, 26vw, 260px)";

  // Dynamic Date & Read Time
  const dateFormatted = useMemo(() => {
    const rawDate = content.updated_at || content.published_at || content.created_at;
    if (!rawDate) return "";
    try {
      return new Date(rawDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "";
    }
  }, [content.updated_at, content.published_at, content.created_at]);

  const readTimeMinutes = useMemo(() => {
    const wc = content.word_count || 500;
    return Math.max(1, Math.ceil(wc / 200));
  }, [content.word_count]);

  const bodyFont = (content.body_font || "").toLowerCase().replace(/\s+/g, "-");
  const contentBodyHtml = content.body || content.current_body || "";

  return (
    <div className="ipublish-theme-wrapper min-h-screen bg-ink-bg">
      {/* Theme script matching iPublish */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try{var t=window.localStorage.getItem("ipublish_theme")||"dark";document.documentElement.setAttribute("data-theme",t);}catch(e){}`,
        }}
      />

      <article>
        {/* Banner Section matching iPublish CMS */}
        <div
          className="banner-title-container relative flex overflow-hidden"
          style={{
            minHeight: bannerMinHeight,
            marginBottom: "30px",
            background: `linear-gradient(${gradientDirection}, ${gradientFrom}, ${gradientTo})`,
          }}
        >
          {/* Dynamic Featured Background Image */}
          {featuredImageUrl && (
            <img
              src={featuredImageUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}

          {/* Dynamic Pattern Overlay */}
          {patternStyle && (
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: patternStyle.backgroundImage,
                backgroundSize: patternStyle.backgroundSize,
                opacity: patternStyle.opacity,
              }}
            />
          )}

          {/* Dynamic Overlay / Bottom Fade */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: content.overlay_color
                ? `linear-gradient(to top, ${content.overlay_color} 0%, rgba(0,0,0,0.14) 60%, transparent 100%)`
                : "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.14) 60%, transparent 100%)",
              opacity: (content.featured_image_overlay ?? 80) / 100,
            }}
          />

          {/* Dynamic Title and Metadata Container matching iPublish exactly */}
          <div
            className={`pointer-events-none relative z-10 flex w-full flex-1 ${content.featured_title_position === "bottom-left"
                ? "justify-start items-end"
                : content.featured_title_position === "top-left"
                  ? "justify-start items-start"
                  : content.featured_title_position === "center-left"
                    ? "justify-start items-center"
                    : content.featured_title_position === "top-center"
                      ? "justify-center items-start"
                      : content.featured_title_position === "bottom-center"
                        ? "justify-center items-end"
                        : content.featured_title_position === "center-right"
                          ? "justify-end items-center"
                          : content.featured_title_position === "bottom-right"
                            ? "justify-end items-end"
                            : "justify-center items-center"
              }`}
            style={{
              paddingLeft: `calc(clamp(12px, 2.667cqw, ${titlePadding}px) + clamp(0px, 1.667cqw, ${titleMarginX}px))`,
              paddingRight: `calc(clamp(12px, 2.667cqw, ${titlePadding}px) + clamp(0px, 1.667cqw, ${titleMarginX}px))`,
              paddingTop: `calc(clamp(12px, 2.667cqw, ${titlePadding}px) + ${titleMarginY}px)`,
              paddingBottom: `calc(clamp(12px, 2.667cqw, ${titlePadding}px) + ${titleMarginY}px)`,
            }}
          >
            <div
              className={`flex flex-col ${content.featured_title_position?.includes("left")
                  ? "items-start"
                  : content.featured_title_position?.includes("right")
                    ? "items-end"
                    : "items-center"
                } max-w-full`}
            >
              <h1
                className={`max-w-full whitespace-pre-wrap banner-title font-bold ${content.featured_title_position?.includes("left")
                    ? "text-left"
                    : content.featured_title_position?.includes("right")
                      ? "text-right"
                      : "text-center"
                  }`}
                style={{
                  fontFamily: `var(--font-${titleFont}), ${content.title_font || 'inherit'}, Georgia, serif`,
                  fontWeight: titleWeight,
                  fontStyle: titleItalic ? "italic" : "normal",
                  fontSize: `clamp(0.85rem, ${(3.06 * titleScale) / 100}cqw, ${(2.34 * titleScale) / 100}rem)`,
                  lineHeight: titleLineHeight,
                  color: content.title_color_mode === "gradient" ? "transparent" : titleColor,
                  backgroundImage:
                    content.title_color_mode === "gradient"
                      ? `linear-gradient(${content.title_gradient_direction || "to right"}, ${titleColor}, ${content.title_gradient_to || "#ec4899"})`
                      : undefined,
                  WebkitBackgroundClip: content.title_color_mode === "gradient" ? "text" : undefined,
                  textShadow: content.title_color_mode === "gradient" ? "none" : textShadow,
                }}
              >
                {content.title}
              </h1>

              {/* Dynamic Post Meta Row */}
              <div
                className={`mt-3 flex flex-wrap items-center ${content.featured_title_position?.includes("left")
                    ? "justify-start"
                    : content.featured_title_position?.includes("right")
                      ? "justify-end"
                      : "justify-center"
                  } gap-x-5 gap-y-1 text-sm text-white/90 drop-shadow`}
                style={{ color: "#ffffff" }}
              >
                {dateFormatted && (
                  <span className="flex items-center gap-1.5">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-4 w-4 text-amber-400"
                    >
                      <rect x="3" y="5" width="18" height="16" rx="2" />
                      <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
                    </svg>
                    {dateFormatted}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4 text-amber-400"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path
                      d="M12 7v5l3.5 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {readTimeMinutes} min read
                </span>
              </div>
            </div>
          </div>
        </div>

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
                {content.content_type &&
                  content.content_type.trim().toLowerCase() !== "blog" &&
                  content.content_type.trim().toLowerCase() !== "blogs" && (
                    <>
                      <li className="text-gray-400 select-none">/</li>
                      <li>
                        <span className="text-[#5A6270] font-medium capitalize">
                          {content.content_type}
                        </span>
                      </li>
                    </>
                )}
                <li className="text-gray-400 select-none">/</li>
                <li
                  className="text-[#172033] font-semibold truncate max-w-[240px] sm:max-w-[400px] md:max-w-[500px]"
                  aria-current="page"
                  title={content.title}
                >
                  {content.title}
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

                    {/* Prose Content */}
                    <div
                      className="prose-content text-[15.5px] leading-[1.78] text-[#4E5665]"
                      data-font={bodyFont || undefined}
                      dangerouslySetInnerHTML={{ __html: contentBodyHtml }}
                    />

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
                {[
                  {
                    slug: "small-models-big-impact",
                    title: "Small Models, Big Impact: Why Domain-Specific AI Is...",
                    category: "ARTIFICIAL INTELLIGENCE",
                    date: "July 28, 2026",
                    excerpt: "Introduction For years, the AI conversation was dominated by scale. Bigger models, more...",
                    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
                  },
                  {
                    slug: "agentic-ai-autonomous-operators",
                    title: "Agentic AI: From Chatbots to Autonomous Business Operators",
                    category: "ARTIFICIAL INTELLIGENCE",
                    date: "July 28, 2026",
                    excerpt: "Introduction For years, AI in the enterprise meant chatbots — tools that answered questions,...",
                    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
                  },
                  {
                    slug: "blockchain-supply-chain-revolution",
                    title: "Blockchain: The Supply Chain Revolution",
                    category: "BLOCKCHAIN",
                    date: "June 26, 2026",
                    excerpt: "Supply chains are among the most complex systems in modern commerce, involving countless...",
                    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
                  },
                ].map((article, idx) => (
                  <article
                    key={article.slug || idx}
                    className="group bg-white border border-[#E5E7EB] rounded-[4px] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md hover:border-gray-300"
                  >
                    {/* 16:9 Thumbnail with Category Badge */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />

                      {/* Category Pill Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="inline-block bg-[#001A3D]/75 backdrop-blur-[2px] text-white text-[9.5px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-[2px] border border-white/15 shadow-sm">
                          {article.category}
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
                          <Link href={`/resources/blogs/${article.slug}`}>
                            {article.title}
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
      </article>

      {/* Dynamic iPublish Typography & Prose Stylesheet */}
      <style jsx global>{`
        :root,
        [data-theme="dark"],
        .ipublish-theme-wrapper {
          --ink-bg: #0b0d12;
          --ink-surface: #111318;
          --ink-raised: #181b22;
          --ink-border: hsla(0, 0%, 100%, 0.08);
          --ink-border-strong: hsla(0, 0%, 100%, 0.14);
          --ink-text: #f3f4f6;
          --ink-text-muted: #9ca3af;
          --ink-text-subtle: #6b7280;
          --ink-overlay: hsla(0, 0%, 100%, 0.06);
          --ink-overlay-strong: hsla(0, 0%, 100%, 0.12);
        }

        .bg-ink-bg {
          background-color: var(--ink-bg, #0b0d12);
        }

        .banner-title-container {
          container-type: inline-size;
        }

        .banner-title {
          font-size: clamp(1.05rem, 3.4cqw, 2.6rem);
          line-height: var(--bt-lh, 1.15);
        }

        .prose-content {
          font-size: 1.0625rem;
          line-height: 1.75;
          color: var(--ink-text, #f3f4f6);
        }

        .prose-content > :first-child {
          margin-top: 0;
        }

        .prose-content h1,
        .prose-content h2,
        .prose-content h3,
        .prose-content h4 {
          font-weight: 700;
          letter-spacing: -0.01em;
          line-height: 1.25;
          color: var(--ink-text, #f3f4f6);
        }

        .prose-content h1 {
          font-size: 2.25rem;
          margin: 0 0 0.6em;
        }

        .prose-content h2 {
          font-size: 1.5rem;
          margin: 1.5em 0 0.7em;
        }

        .prose-content h3 {
          font-size: 1.2rem;
          margin: 1.5em 0 0.5em;
        }

        .prose-content h4 {
          font-size: 1.05rem;
          margin: 1.3em 0 0.4em;
        }

        .prose-content p {
          margin: 0 0 1.3em;
        }

        .prose-content strong {
          font-weight: 700;
          color: var(--ink-text, #f3f4f6);
        }

        .prose-content ol,
        .prose-content ul {
          margin: 0 0 1.3em;
          padding-left: 1.4em;
        }

        .prose-content ul {
          list-style: disc;
        }

        .prose-content ol {
          list-style: decimal;
        }

        .prose-content li {
          margin-bottom: 0.45em;
          padding-left: 0.2em;
        }

        .prose-content li > p {
          margin-bottom: 0.3em;
        }

        .prose-content li::marker {
          color: var(--li-color, #6d5ef8);
        }

        .prose-content a {
          color: #6d5ef8;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .prose-content hr {
          height: 0;
          border: none;
          border-top: 1px solid var(--ink-border, hsla(0, 0%, 100%, 0.08));
          margin: 2em 0 0.3em;
        }

        .prose-content img {
          display: block;
          max-width: 100%;
          width: auto;
          height: auto;
          margin: 1.75em auto;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        .prose-content table {
          border-collapse: collapse;
          width: 100%;
          margin: 1.75em 0;
          font-size: 0.95em;
          border-radius: 0.5rem;
          border: 1px solid var(--ink-border, hsla(0, 0%, 100%, 0.08));
          table-layout: fixed;
        }

        .prose-content td,
        .prose-content th {
          border: 1px solid var(--ink-border, hsla(0, 0%, 100%, 0.08));
          padding: 0.65em 0.9em;
          text-align: left;
          overflow-wrap: break-word;
          position: relative;
        }

        .prose-content th {
          background: var(--ink-overlay, hsla(0, 0%, 100%, 0.06));
          font-weight: 600;
          font-size: 0.85em;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          color: var(--ink-text-muted, #9ca3af);
        }

        .prose-content blockquote {
          position: relative;
          border-left: 3px solid var(--quote-accent, #6d5ef8);
          padding: 0.2em 0 0.2em 1.25em;
          margin: 1.75em 0;
          font-size: 1.1em;
          font-style: italic;
          color: var(--quote-text, var(--ink-text-muted, #9ca3af));
        }

        .prose-content code {
          background: var(--ink-overlay, hsla(0, 0%, 100%, 0.06));
          border-radius: 0.3em;
          padding: 0.15em 0.4em;
          font-size: 0.9em;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        }

        .prose-content pre {
          background: var(--ink-overlay, hsla(0, 0%, 100%, 0.06));
          border: 1px solid var(--ink-border, hsla(0, 0%, 100%, 0.08));
          border-radius: 0.6em;
          padding: 1em;
          overflow-x: auto;
          margin: 1.5em 0;
        }

        .prose-content pre code {
          background: none;
          padding: 0;
        }
      `}</style>
    </div>
  );
}
