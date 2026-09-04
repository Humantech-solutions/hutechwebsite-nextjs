/**
 * Utilities for extracting and generating iPublish banner pattern styles
 * matching the iPublish CMS inner article pages.
 */

export interface IPublishPatternResult {
  backgroundImage: string;
  backgroundSize?: string;
  opacity: number;
}

/**
 * Extracts banner pattern CSS directly from the injected styles in the iPublish article body.
 */
export function extractPatternFromBody(body?: string): IPublishPatternResult | null {
  if (!body) return null;

  const blockMatch = body.match(/\.banner-title-container[^\{]*\{([^}]+)\}/i);
  if (!blockMatch) return null;

  const blockContent = blockMatch[1];
  const bgImageMatch = blockContent.match(/background-image:\s*([^;!]+)(?:!important)?;/i);
  if (!bgImageMatch) return null;

  const bgSizeMatch = blockContent.match(/background-size:\s*([^;!]+)(?:!important)?;/i);
  const opacityMatch = blockContent.match(/opacity:\s*([^;!]+)(?:!important)?;/i);

  const backgroundImage = bgImageMatch[1].trim();
  const backgroundSize = bgSizeMatch?.[1]?.trim();
  const opacityStr = opacityMatch?.[1]?.trim();

  return {
    backgroundImage,
    backgroundSize: backgroundSize && backgroundSize !== "auto" ? backgroundSize : undefined,
    opacity: opacityStr ? parseFloat(opacityStr) : 0.2,
  };
}

/**
 * Fallback pattern style generator matching exact iPublish CMS pattern definitions.
 */
export function getIPublishPatternStyle(
  pattern?: string,
  rawPattern?: string,
  color: string = "#ffffff",
  customOpacity?: number
): IPublishPatternResult | null {
  if (!pattern && !rawPattern) return null;
  if (pattern === "none" && !rawPattern) return null;

  const p = (rawPattern || pattern || "").toLowerCase().trim();

  let backgroundImage = "";
  let backgroundSize: string | undefined = undefined;

  switch (p) {
    case "rings":
    case "concentric":
    case "dots":
      backgroundImage = `repeating-radial-gradient(circle at 20% 30%, ${color} 0 1px, transparent 1px 42px)`;
      backgroundSize = "auto";
      break;

    case "crosshatch":
    case "mesh":
    case "diagonal-grid":
    case "grid":
      backgroundImage = `repeating-linear-gradient(45deg, ${color} 0 1px, transparent 1px 12px), repeating-linear-gradient(-45deg, ${color} 0 1px, transparent 1px 12px)`;
      backgroundSize = "auto";
      break;

    case "diamonds":
    case "checkerboard":
    case "diagonal-stripes":
      backgroundImage = `linear-gradient(135deg, ${color} 25%, transparent 25%), linear-gradient(225deg, ${color} 25%, transparent 25%), linear-gradient(315deg, ${color} 25%, transparent 25%), linear-gradient(45deg, ${color} 25%, transparent 25%)`;
      backgroundSize = "24px 24px";
      break;

    case "octagons":
      backgroundImage = `linear-gradient(45deg, ${color} 12%, transparent 12.5%), linear-gradient(-45deg, ${color} 12%, transparent 12.5%), linear-gradient(135deg, ${color} 12%, transparent 12.5%), linear-gradient(-135deg, ${color} 12%, transparent 12.5%)`;
      backgroundSize = "36px 36px";
      break;

    case "vertical-lines":
    case "lines":
    case "stripes":
    default:
      backgroundImage = `repeating-linear-gradient(90deg, ${color} 0 2px, transparent 2px 14px)`;
      backgroundSize = "auto";
      break;
  }

  return {
    backgroundImage,
    backgroundSize: backgroundSize && backgroundSize !== "auto" ? backgroundSize : undefined,
    opacity: customOpacity !== undefined ? customOpacity : 0.2,
  };
}
