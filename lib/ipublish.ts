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
  raw_banner_pattern?: string;
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
  subcategory?: string;
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
  destinations?: {
    name?: string;
    domain?: string;
    site_id?: string;
  }[] | null;
}

export interface IPublishPageListItem {
  org: string;
  slug: string;
  updated_at: string;
}

export interface PublicContentItem {
  id: string;
  title: string;
  slug: string;
  destinations?: { name: string; domain: string; site_id: string }[];
  [key: string]: any;
}

const IPUBLISH_BASE_URL =
  process.env.NEXT_PUBLIC_IPUBLISH_API_URL || "https://apis.ipublish.hutechsolutions.ai";
const DEFAULT_ORG_SLUG = process.env.NEXT_PUBLIC_IPUBLISH_ORG_SLUG || "hutech-solutions";
const IPUBLISH_STATIC_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NzUwYmFlYy1lOTllLTRkYzAtOTM5Yy1hYTVjMWQ1MGFhNWYiLCJvcmdfaWQiOiI0ZjdlYmE4YS05OGZjLTQyODEtODJjZi1jYmM4YzIwZmY0NWUifQ.nkv7ZboCMX2BzwTt_r1F2t_IGAiFi1bcwpexyPBDxfQ";

/**
 * Normalize image URL from iPublish API to absolute URL.
 * Automatically rewrites localhost/127.0.0.1 development server URLs from iPublish CMS exports
 * to the production iPublish API endpoint.
 */
export function getIPublishImageUrl(path?: string | null): string | undefined {
  if (!path || typeof path !== "string" || path.trim() === "") return undefined;
  const cleanBase = IPUBLISH_BASE_URL.replace(/\/$/, "");
  const trimmed = path.trim();

  // Rewrite localhost / 127.0.0.1 URLs (e.g., http://localhost:8004/media/...) to IPUBLISH_BASE_URL
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/.*)?$/i.test(trimmed)) {
    const relativePath = trimmed.replace(/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i, "");
    return `${cleanBase}${relativePath.startsWith("/") ? relativePath : `/${relativePath}`}`;
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  const cleanPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return `${cleanBase}${cleanPath}`;
}

/**
 * Rewrites any localhost / 127.0.0.1 media URLs within HTML strings to the production iPublish API.
 */
export function normalizeIPublishHtml(html?: string | null): string {
  if (!html) return "";
  const cleanBase = IPUBLISH_BASE_URL.replace(/\/$/, "");
  return html.replace(
    /https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/media\/[^\s"'>]+)/gi,
    `${cleanBase}$3`
  );
}

/**
 * Validates if the content should be displayed on the current domain (.ai website).
 */
/**
 * Strictly checks if a specific blog slug is allowed for the current domain
 * by verifying it against the authenticated published content list.
 */
export async function isIPublishBlogSlugAllowed(slug: string): Promise<boolean> {
  const publishedContent = await getIPublishPublishedContent();
  if (!publishedContent) return true; // Fallback: allow all if authenticated API is down
  
  const item = publishedContent.find(c => c.slug === slug);
  if (!item) return false; // Not found in published list at all
  
  if (!Array.isArray(item.destinations) || item.destinations.length === 0) {
    return false;
  }
  
  return item.destinations.some(d => 
    d.domain && (d.domain.toLowerCase().includes('.ai') || d.domain.toLowerCase().includes('hutechsolutions.ai'))
  );
}

/**
 * Fetches the authenticated list of published content, which includes the destinations array.
 * Swagger: GET /api/v1/content/published
 */
export async function getIPublishPublishedContent(): Promise<PublicContentItem[] | null> {
  try {
    const res = await fetch(`${IPUBLISH_BASE_URL}/api/v1/content/published`, {
      headers: {
        "Authorization": `Bearer ${IPUBLISH_STATIC_TOKEN}`,
        "Content-Type": "application/json"
      },
      cache: "no-store",
    });
    
    if (!res.ok) {
      console.warn("[iPublish] Failed to fetch /content/published:", res.status);
      return null;
    }
    
    const data = await res.json();
    return Array.isArray(data) ? data : null;
  } catch (error) {
    console.error("[iPublish] Error fetching published content:", error);
    return null;
  }
}

/**
 * Fetches all public pages index from iPublish CMS.
 * Swagger: GET /api/v1/public/v1/pages
 */
export async function getIPublishPages(): Promise<IPublishPageListItem[]> {
  try {
    const res = await fetch(`${IPUBLISH_BASE_URL}/api/v1/public/v1/pages`, {
      cache: "no-store",
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
        cache: "no-store",
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
      featured_image_url: getIPublishImageUrl(data.featured_image_url) || null,
      body: normalizeIPublishHtml(data.body),
      current_body: normalizeIPublishHtml(data.current_body),
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
export async function getIPublishAllBlogs(
  orgSlug: string = DEFAULT_ORG_SLUG
): Promise<IPublishPageData[]> {
  try {
    const publishedContent = await getIPublishPublishedContent();
    
    if (publishedContent) {
      // Use authenticated endpoint for strict domain filtering
      const filteredContent = publishedContent.filter(item => {
        if (!Array.isArray(item.destinations) || item.destinations.length === 0) {
          return false;
        }
        return item.destinations.some(d => 
          d.domain && (d.domain.toLowerCase().includes('.ai') || d.domain.toLowerCase().includes('hutechsolutions.ai'))
        );
      });
      
      // We map this directly to IPublishPageData to avoid N extra API calls!
      // The listing page doesn't need the HTML 'body' field because it natively uses the banner_pattern fields
      return filteredContent.map(item => ({
        ...item,
        body: "", 
        current_body: "",
        slug: item.slug,
        org: orgSlug,
      })) as IPublishPageData[];
    } else {
      // Fallback to unauthenticated endpoint if authenticated one fails
      const pages = await getIPublishPages();
      const targetPages = pages.filter((p) => !orgSlug || p.org === orgSlug);

      const detailedPages = await Promise.all(
        targetPages.map(async (p) => {
          const detail = await getIPublishPageBySlug(p.slug, p.org);
          return detail;
        })
      );

      return detailedPages.filter((item): item is IPublishPageData => item !== null);
    }
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
