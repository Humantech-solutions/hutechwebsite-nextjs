"use client";

import { useMemo } from "react";
import { IPublishPageData, getIPublishImageUrl } from "@/lib/ipublish";
import { getIPublishPatternStyle, extractPatternFromBody } from "@/lib/ipublish-pattern";
import { Linkedin, Twitter, Facebook, Share2 } from "lucide-react";

interface IPublishDetailClientProps {
  content: IPublishPageData;
  slug?: string;
}

export function IPublishDetailClient({ content }: IPublishDetailClientProps) {
  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href.replace(window.location.origin, "https://hutechsolutions.ai")
      : content.canonical_url || "";

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
            className={`pointer-events-none relative z-10 flex w-full flex-1 ${
              content.featured_title_position === "bottom-left"
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
              className={`flex flex-col ${
                content.featured_title_position?.includes("left")
                  ? "items-start"
                  : content.featured_title_position?.includes("right")
                  ? "items-end"
                  : "items-center"
              } max-w-full`}
            >
              <h1
                className={`max-w-full whitespace-pre-wrap banner-title font-bold ${
                  content.featured_title_position?.includes("left")
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
                className={`mt-3 flex flex-wrap items-center ${
                  content.featured_title_position?.includes("left")
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

        {/* Dynamic Content Body with Sticky Share Sidebar */}
        <div className="mx-auto px-6 pb-16 sm:px-12 max-w-[1280px]">
          <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-16">
            {/* Share Sidebar matching website blog template */}
            <div className="hidden lg:block shrink-0">
              <div className="sticky top-32 space-y-8">
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] [writing-mode:vertical-rl] flex items-center gap-4 rotate-180 mb-8 mx-auto">
                  Share Article <span className="w-12 h-[1px] bg-white/10"></span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <button
                    onClick={() =>
                      window.open(
                        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
                        "_blank"
                      )
                    }
                    className="p-3 rounded-full bg-white/5 text-gray-400 hover:bg-[#0171c1] hover:text-white transition-all"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin size={18} />
                  </button>
                  <button
                    onClick={() =>
                      window.open(
                        `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(content.title)}`,
                        "_blank"
                      )
                    }
                    className="p-3 rounded-full bg-white/5 text-gray-400 hover:bg-[#0171c1] hover:text-white transition-all"
                    aria-label="Share on Twitter"
                  >
                    <Twitter size={18} />
                  </button>
                  <button
                    onClick={() =>
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                        "_blank"
                      )
                    }
                    className="p-3 rounded-full bg-white/5 text-gray-400 hover:bg-[#0171c1] hover:text-white transition-all"
                    aria-label="Share on Facebook"
                  >
                    <Facebook size={18} />
                  </button>
                  <button
                    onClick={async () => {
                      if (navigator.share) {
                        try {
                          await navigator.share({
                            title: content.title,
                            text: content.excerpt || content.title,
                            url: shareUrl,
                          });
                        } catch (err) {
                          console.log("Error sharing", err);
                        }
                      } else {
                        navigator.clipboard.writeText(shareUrl);
                        alert("Link copied to clipboard!");
                      }
                    }}
                    className="p-3 rounded-full bg-white/5 text-gray-400 hover:bg-[#F99D1C] hover:text-white transition-all"
                    aria-label="Share Article"
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Dynamic Content Body */}
            <div
              className="flex-1 w-full max-w-full"
              style={{
                maxWidth: content.content_width
                  ? `${content.content_width}px`
                  : "816px",
              }}
            >
              <div
                className="prose-content"
                data-font={bodyFont || undefined}
                dangerouslySetInnerHTML={{ __html: contentBodyHtml }}
              />

              {/* Mobile Share Row */}
              <div className="mt-12 pt-8 border-t border-white/10 lg:hidden flex items-center justify-center gap-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mr-2">
                  Share:
                </span>
                <button
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
                      "_blank"
                    )
                  }
                  className="p-3 rounded-full bg-white/5 text-gray-400 hover:bg-[#0171c1] hover:text-white transition-all"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin size={16} />
                </button>
                <button
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(content.title)}`,
                      "_blank"
                    )
                  }
                  className="p-3 rounded-full bg-white/5 text-gray-400 hover:bg-[#0171c1] hover:text-white transition-all"
                  aria-label="Share on Twitter"
                >
                  <Twitter size={16} />
                </button>
                <button
                  onClick={() =>
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                      "_blank"
                    )
                  }
                  className="p-3 rounded-full bg-white/5 text-gray-400 hover:bg-[#0171c1] hover:text-white transition-all"
                  aria-label="Share on Facebook"
                >
                  <Facebook size={16} />
                </button>
                <button
                  onClick={async () => {
                    if (navigator.share) {
                      try {
                        await navigator.share({
                          title: content.title,
                          text: content.excerpt || content.title,
                          url: shareUrl,
                        });
                      } catch (err) {
                        console.log("Error sharing", err);
                      }
                    } else {
                      navigator.clipboard.writeText(shareUrl);
                      alert("Link copied to clipboard!");
                    }
                  }}
                  className="p-3 rounded-full bg-white/5 text-gray-400 hover:bg-[#F99D1C] hover:text-white transition-all"
                  aria-label="Share Article"
                >
                  <Share2 size={16} />
                </button>
              </div>
            </div>
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
