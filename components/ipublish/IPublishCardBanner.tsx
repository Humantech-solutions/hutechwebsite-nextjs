"use client";

import { useMemo } from "react";
import { WpBlog } from "@/lib/wordpress";

interface IPublishCardBannerProps {
  blog: WpBlog;
}

export function IPublishCardBanner({ blog }: IPublishCardBannerProps) {
  const meta = blog.ipublishMeta;

  // Gradient background
  const gradientFrom = meta?.gradientFrom || "#6d5ef8";
  const gradientTo = meta?.gradientTo || "#ec4899";
  const gradientDirection = meta?.gradientDirection || "135deg";

  // Dynamic Pattern Overlay
  const patternStyle = useMemo(() => {
    if (!meta?.pattern) return null;
    const color = meta.patternColor || "#ffffff";
    const opacity = (meta.patternOpacity ?? 10) / 100;

    let backgroundImage = "";
    let backgroundSize: string | undefined = undefined;

    switch (meta.pattern) {
      case "vertical-lines":
        backgroundImage = `repeating-linear-gradient(90deg, ${color} 0 2px, transparent 2px 14px)`;
        break;
      case "dots":
        backgroundImage = `radial-gradient(${color} 1.5px, transparent 1.5px)`;
        backgroundSize = "16px 16px";
        break;
      case "grid":
        backgroundImage = `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`;
        backgroundSize = "24px 24px";
        break;
      case "diagonal-stripes":
        backgroundImage = `repeating-linear-gradient(45deg, ${color} 0 2px, transparent 2px 14px)`;
        break;
      default:
        backgroundImage = `repeating-linear-gradient(90deg, ${color} 0 2px, transparent 2px 14px)`;
    }

    return {
      backgroundImage,
      backgroundSize,
      opacity,
    };
  }, [meta?.pattern, meta?.patternColor, meta?.patternOpacity]);

  // Dynamic Title Positioning
  const positionClass = useMemo(() => {
    switch (meta?.titlePosition) {
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
  }, [meta?.titlePosition]);

  // Dynamic Text Shadow
  const textShadow = useMemo(() => {
    if (meta?.titleShadow === "none") return "none";
    if (meta?.titleShadow === "strong") return "0 4px 16px rgba(0,0,0,0.85)";
    return "0 2px 8px rgba(0,0,0,0.45)";
  }, [meta?.titleShadow]);

  // Title styling tokens
  const titleFont = (meta?.titleFont || "merriweather").toLowerCase().replace(/\s+/g, "-");
  const titleColor = meta?.titleColor || "#ffffff";
  const titleWeight = meta?.titleWeight || 700;
  const titleItalic = Boolean(meta?.titleItalic);
  const titleScale = meta?.titleScale || 100;
  const titleLineHeight = meta?.titleLineHeight ? meta.titleLineHeight / 100 : 1.2;

  const isGradientTitle = meta?.titleColorMode === "gradient";

  return (
    <div
      className="relative h-full w-full overflow-hidden transition-transform duration-700 group-hover:scale-105"
      style={{
        background: `linear-gradient(${gradientDirection}, ${gradientFrom}, ${gradientTo})`,
      }}
    >
      {/* Dynamic Featured Background Image */}
      {blog.imageUrl && (
        <img
          src={blog.imageUrl}
          alt={blog.title}
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

      {/* Dynamic Dark Gradient Overlay / Bottom Fade */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: meta?.overlayColor
            ? `linear-gradient(to top, ${meta.overlayColor} 0%, rgba(0,0,0,0.14) 60%, transparent 100%)`
            : "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.14) 60%, transparent 100%)",
          opacity: (meta?.overlayOpacity ?? 80) / 100,
        }}
      />

      {/* Dynamic Title Overlay Container */}
      <div
        className={`pointer-events-none relative z-10 flex h-full w-full p-6 ${positionClass}`}
      >
        <h4
          className={`banner-title max-w-full font-bold drop-shadow-md ${
            meta?.titlePosition?.includes("left")
              ? "text-left"
              : meta?.titlePosition?.includes("right")
              ? "text-right"
              : "text-center"
          }`}
          style={{
            fontFamily: `var(--font-${titleFont}), ${meta?.titleFont || "inherit"}, Georgia, serif`,
            fontWeight: titleWeight,
            fontStyle: titleItalic ? "italic" : "normal",
            fontSize: `clamp(1rem, ${(1.25 * titleScale) / 100}rem, 1.45rem)`,
            lineHeight: titleLineHeight,
            color: isGradientTitle ? "transparent" : titleColor,
            backgroundImage: isGradientTitle
              ? `linear-gradient(${meta?.titleGradientDirection || "to right"}, ${titleColor}, ${meta?.titleGradientTo || "#ec4899"})`
              : undefined,
            WebkitBackgroundClip: isGradientTitle ? "text" : undefined,
            textShadow: isGradientTitle ? "none" : textShadow,
          }}
        >
          {blog.title}
        </h4>
      </div>
    </div>
  );
}
