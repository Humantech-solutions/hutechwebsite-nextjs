export interface IPublishPageData {
  title: string;
  body: string;
  excerpt?: string;
  content_type?: string;
  word_count?: number;
  tags?: string[];
  featured_image_url?: string | null;
  featured_image_height?: number;
  featured_image_overlay?: number;
  featured_title_position?: string;
  featured_title_padding?: number;
  content_width?: number;
  banner_gradient_from?: string;
  banner_gradient_to?: string;
  banner_gradient_direction?: string;
  title_color?: string;
  title_color_mode?: string;
  title_gradient_to?: string;
  title_gradient_direction?: string;
  title_shadow?: string;
  overlay_color?: string;
  body_font?: string;
  title_font?: string;
  title_size_scale?: number;
  title_weight?: number;
  title_italic?: boolean;
  banner_pattern?: string;
  banner_pattern_color?: string;
  banner_pattern_opacity?: number;
  title_line_height?: number;
  title_margin_x?: number;
  title_margin_y?: number;
  meta_description?: string;
  updated_at?: string;
  published_at?: string;
  created_at?: string;
  contact_email?: string | null;
  contact_phone?: string | null;
  seo_title?: string;
  focus_keyword?: string;
  secondary_keywords?: string[];
  og_title?: string;
  og_description?: string;
  schema_json?: Record<string, any>;
  canonical_url?: string;
  slug?: string;
  org?: string;
  id?: string;
  current_body?: string;
}

export interface IPublishPageListItem {
  org: string;
  slug: string;
  updated_at: string;
}

const IPUBLISH_BASE_URL =
  process.env.NEXT_PUBLIC_IPUBLISH_API_URL || "https://apis.ipublish.hutechsolutions.ai";
const DEFAULT_ORG_SLUG = process.env.NEXT_PUBLIC_IPUBLISH_ORG_SLUG || "hutech-solutions";

/**
 * Normalize image URL from iPublish API to absolute URL.
 */
export function getIPublishImageUrl(path?: string | null): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanBase = IPUBLISH_BASE_URL.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}

/**
 * Fetches all public pages index from iPublish CMS.
 * Swagger: GET /api/v1/public/v1/pages
 */
export async function getIPublishPages(): Promise<IPublishPageListItem[]> {
  try {
    const res = await fetch(`${IPUBLISH_BASE_URL}/api/v1/public/v1/pages`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.warn("[iPublish] Failed to fetch public pages:", res.status);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("[iPublish] Error fetching public pages:", error);
    return [];
  }
}

/**
 * Fetches full dynamic page data by slug from iPublish CMS.
 * Swagger: GET /api/v1/public/v1/page/{org_slug}/{content_slug}
 */
export async function getIPublishPageBySlug(
  slug: string,
  orgSlug: string = DEFAULT_ORG_SLUG
): Promise<IPublishPageData | null> {
  try {
    const res = await fetch(
      `${IPUBLISH_BASE_URL}/api/v1/public/v1/page/${encodeURIComponent(orgSlug)}/${encodeURIComponent(slug)}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      // If not found with default org, check if the slug belongs to another org
      if (res.status === 404 && orgSlug === DEFAULT_ORG_SLUG) {
        const allPages = await getIPublishPages();
        const matched = allPages.find((p) => p.slug === slug);
        if (matched && matched.org !== DEFAULT_ORG_SLUG) {
          return getIPublishPageBySlug(slug, matched.org);
        }
      }
      console.warn(`[iPublish] Failed to fetch page '${slug}' for org '${orgSlug}':`, res.status);
      return null;
    }

    const data: IPublishPageData = await res.json();
    return {
      ...data,
      slug,
      org: orgSlug,
    };
  } catch (error) {
    console.error(`[iPublish] Error fetching page '${slug}':`, error);
    return null;
  }
}

/**
 * Fetches all published blogs with complete content and dynamic styling.
 */
export async function getIPublishAllBlogs(orgSlug: string = DEFAULT_ORG_SLUG): Promise<IPublishPageData[]> {
  try {
    const pages = await getIPublishPages();
    const targetPages = pages.filter((p) => !orgSlug || p.org === orgSlug);

    const detailedPages = await Promise.all(
      targetPages.map(async (p) => {
        const detail = await getIPublishPageBySlug(p.slug, p.org);
        return detail;
      })
    );

    return detailedPages.filter((item): item is IPublishPageData => item !== null);
  } catch (error) {
    console.error("[iPublish] Error fetching all blogs:", error);
    return [];
  }
}

/**
 * Backwards compatibility helper.
 */
export async function getIPublishContents(): Promise<IPublishPageData[]> {
  return getIPublishAllBlogs();
}

/**
 * Backwards compatibility helper to get by ID or slug.
 */
export async function getIPublishContentById(idOrSlug: string): Promise<IPublishPageData | null> {
  const bySlug = await getIPublishPageBySlug(idOrSlug);
  if (bySlug) return bySlug;

  // Search in all pages if not direct match
  const allBlogs = await getIPublishAllBlogs();
  const matched = allBlogs.find((b) => b.slug === idOrSlug || b.id === idOrSlug);
  return matched || null;
}
