import type { CSSProperties } from "react";

/**
 * Utilities for extracting and generating iPublish banner pattern styles
 * and layout spacing matching the iPublish CMS inner article pages.
 */

export interface IPublishPatternResult {
  backgroundImage: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  opacity: number;
}

/** Reference banner width the configured px values are authored against in iPublish. */
export const BANNER_REFERENCE_WIDTH = 1200;

/** Scales an authored px value with the banner's own container width. */
export function responsiveSpace(value: number, minPx = 0): string {
  if (!value) return `${minPx}px`;
  const share = ((value / BANNER_REFERENCE_WIDTH) * 100).toFixed(3);
  return `clamp(${minPx}px, ${share}cqw, ${value}px)`;
}

/**
 * Padding for the banner title block: uniform padding plus per-axis margin,
 * both scaled to the banner width via container query units (cqw).
 */
export function bannerTitleSpacing(input: {
  featured_title_padding?: number;
  title_margin_x?: number;
  title_margin_y?: number;
}): CSSProperties {
  const pad = responsiveSpace(input.featured_title_padding ?? 24, 12);
  const marginX = responsiveSpace(input.title_margin_x ?? 0, 0);
  const marginY = responsiveSpace(input.title_margin_y ?? 0, 0);
  return {
    paddingLeft: `calc(${pad} + ${marginX})`,
    paddingRight: `calc(${pad} + ${marginX})`,
    paddingTop: `calc(${pad} + ${marginY})`,
    paddingBottom: `calc(${pad} + ${marginY})`,
  };
}

/**
 * Extracts banner pattern CSS directly from the injected styles in the iPublish article body
 * ONLY if .banner-title-container is explicitly present in the stylesheet.
 */
export function extractPatternFromBody(body?: string): IPublishPatternResult | null {
  if (!body) return null;

  const blockMatch = body.match(/\.banner-title-container[^\{]*\{([^}]+)\}/i);
  if (!blockMatch) {
    return null;
  }

  const blockContent = blockMatch[1];
  const bgImageMatch = blockContent.match(/background-image:\s*([^;!]+)(?:!important)?;/i);
  if (!bgImageMatch) {
    return null;
  }

  const backgroundImage = bgImageMatch[1].trim();
  if (backgroundImage === "none" || backgroundImage === "none !important") {
    return { backgroundImage: "none", opacity: 0 };
  }

  const bgSizeMatch = blockContent.match(/background-size:\s*([^;!]+)(?:!important)?;/i);
  const opacityMatch = blockContent.match(/opacity:\s*([^;!]+)(?:!important)?;/i);

  const backgroundSize = bgSizeMatch?.[1]?.trim();
  const opacityStr = opacityMatch?.[1]?.trim();

  return {
    backgroundImage,
    backgroundSize: backgroundSize && backgroundSize !== "auto" ? backgroundSize : undefined,
    opacity: opacityStr ? parseFloat(opacityStr) : 0.2,
  };
}

/**
 * Pattern style generator matching the full suite of iPublish CMS pattern definitions.
 */
export function getIPublishPatternStyle(
  pattern?: string,
  rawPattern?: string,
  color: string = "#ffffff",
  customOpacity?: number
): IPublishPatternResult | null {
  // If author specifically set rawPattern to "" or "none", they explicitly chose NO pattern.
  if (rawPattern !== undefined) {
    if (!rawPattern || rawPattern === "none") return null;
  } else {
    if (!pattern || pattern === "none") return null;
  }

  // Choose rawPattern first (author's direct choice in CMS), falling back to pattern
  const p = (rawPattern || pattern || "").toLowerCase().trim();
  if (!p || p === "none") return null;

  const c = color || "#ffffff";
  const alpha = customOpacity !== undefined ? customOpacity : 0.2;

  const patterns: Record<
    string,
    { backgroundImage: string; backgroundSize?: string; backgroundPosition?: string }
  > = {
    "diagonal-lines": {
      backgroundImage: `repeating-linear-gradient(45deg, ${c} 0 2px, transparent 2px 14px)`,
    },
    "horizontal-lines": {
      backgroundImage: `repeating-linear-gradient(0deg, ${c} 0 2px, transparent 2px 14px)`,
    },
    "vertical-lines": {
      backgroundImage: `repeating-linear-gradient(90deg, ${c} 0 2px, transparent 2px 14px)`,
    },
    lines: {
      backgroundImage: `repeating-linear-gradient(90deg, ${c} 0 2px, transparent 2px 14px)`,
    },
    stripes: {
      backgroundImage: `repeating-linear-gradient(90deg, ${c} 0 2px, transparent 2px 14px)`,
    },
    grid: {
      backgroundImage:
        `repeating-linear-gradient(0deg, ${c} 0 1px, transparent 1px 32px), ` +
        `repeating-linear-gradient(90deg, ${c} 0 1px, transparent 1px 32px)`,
    },
    "diagonal-grid": {
      backgroundImage:
        `repeating-linear-gradient(45deg, ${c} 0 1px, transparent 1px 12px), ` +
        `repeating-linear-gradient(-45deg, ${c} 0 1px, transparent 1px 12px)`,
    },
    crosshatch: {
      backgroundImage:
        `repeating-linear-gradient(45deg, ${c} 0 1px, transparent 1px 12px), ` +
        `repeating-linear-gradient(-45deg, ${c} 0 1px, transparent 1px 12px)`,
    },
    dots: {
      backgroundImage: `radial-gradient(${c} 1.5px, transparent 1.6px)`,
      backgroundSize: "18px 18px",
    },
    rings: {
      backgroundImage: `repeating-radial-gradient(circle at 20% 30%, ${c} 0 1px, transparent 1px 42px)`,
    },
    concentric: {
      backgroundImage: `repeating-radial-gradient(circle at 20% 30%, ${c} 0 1px, transparent 1px 42px)`,
    },
    waves: {
      backgroundImage:
        `repeating-radial-gradient(circle at 0% 50%, transparent 0 18px, ${c} 18px 19px, transparent 19px 38px)`,
    },
    mesh: {
      backgroundImage:
        `radial-gradient(circle at 15% 20%, ${c} 0, transparent 38%), ` +
        `radial-gradient(circle at 80% 30%, ${c} 0, transparent 32%), ` +
        `radial-gradient(circle at 50% 85%, ${c} 0, transparent 40%)`,
    },
    triangles: {
      backgroundImage:
        `linear-gradient(45deg, ${c} 25%, transparent 25%), ` +
        `linear-gradient(-45deg, ${c} 25%, transparent 25%)`,
      backgroundSize: "26px 26px",
    },
    hexagons: {
      backgroundImage:
        `linear-gradient(60deg, ${c} 25%, transparent 25.5%, transparent 75%, ${c} 75%), ` +
        `linear-gradient(-60deg, ${c} 25%, transparent 25.5%, transparent 75%, ${c} 75%)`,
      backgroundSize: "40px 70px",
      backgroundPosition: "0 0, 0 0",
    },
    diamonds: {
      backgroundImage:
        `linear-gradient(135deg, ${c} 25%, transparent 25%), ` +
        `linear-gradient(225deg, ${c} 25%, transparent 25%), ` +
        `linear-gradient(315deg, ${c} 25%, transparent 25%), ` +
        `linear-gradient(45deg, ${c} 25%, transparent 25%)`,
      backgroundSize: "24px 24px",
    },
    checkerboard: {
      backgroundImage:
        `linear-gradient(135deg, ${c} 25%, transparent 25%), ` +
        `linear-gradient(225deg, ${c} 25%, transparent 25%), ` +
        `linear-gradient(315deg, ${c} 25%, transparent 25%), ` +
        `linear-gradient(45deg, ${c} 25%, transparent 25%)`,
      backgroundSize: "24px 24px",
    },
    chevron: {
      backgroundImage:
        `linear-gradient(135deg, ${c} 25%, transparent 25%), ` +
        `linear-gradient(225deg, ${c} 25%, transparent 25%)`,
      backgroundSize: "22px 22px",
    },
    "diagonal-stripes": {
      // Remapped alias for chevron
      backgroundImage:
        `linear-gradient(135deg, ${c} 25%, transparent 25%), ` +
        `linear-gradient(225deg, ${c} 25%, transparent 25%)`,
      backgroundSize: "22px 22px",
    },
    octagons: {
      backgroundImage:
        `linear-gradient(45deg, ${c} 12%, transparent 12.5%), ` +
        `linear-gradient(-45deg, ${c} 12%, transparent 12.5%), ` +
        `linear-gradient(135deg, ${c} 12%, transparent 12.5%), ` +
        `linear-gradient(-135deg, ${c} 12%, transparent 12.5%)`,
      backgroundSize: "36px 36px",
    },
    polygons: {
      backgroundImage:
        `linear-gradient(120deg, ${c} 25%, transparent 25.5%), ` +
        `linear-gradient(240deg, ${c} 25%, transparent 25.5%), ` +
        `linear-gradient(0deg, ${c} 25%, transparent 25.5%)`,
      backgroundSize: "44px 44px",
    },
    circuit: {
      backgroundImage:
        `radial-gradient(${c} 2px, transparent 2.5px), ` +
        `repeating-linear-gradient(0deg, ${c} 0 1px, transparent 1px 26px), ` +
        `repeating-linear-gradient(90deg, ${c} 0 1px, transparent 1px 26px)`,
      backgroundSize: "26px 26px, 26px 26px, 26px 26px",
    },
    neural: {
      backgroundImage:
        `radial-gradient(${c} 2.5px, transparent 3px), ` +
        `repeating-linear-gradient(45deg, ${c} 0 1px, transparent 1px 34px), ` +
        `repeating-linear-gradient(-45deg, ${c} 0 1px, transparent 1px 34px)`,
      backgroundSize: "34px 34px, auto, auto",
    },
    "shape-mix": {
      backgroundImage:
        `radial-gradient(${c} 1.5px, transparent 2px), ` +
        `linear-gradient(45deg, ${c} 12%, transparent 12.5%), ` +
        `repeating-linear-gradient(-60deg, ${c} 0 1px, transparent 1px 30px)`,
      backgroundSize: "30px 30px, 30px 30px, auto",
    },
  };

  const style = patterns[p];
  if (!style) return null;

  return {
    backgroundImage: style.backgroundImage,
    backgroundSize:
      style.backgroundSize && style.backgroundSize !== "auto" ? style.backgroundSize : undefined,
    backgroundPosition: style.backgroundPosition,
    opacity: alpha,
  };
}
