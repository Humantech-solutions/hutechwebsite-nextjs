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
  author_name?: string;
  faqs?: { question: string; answer: string }[];
  faq_enabled?: boolean;
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
  author_name?: string;
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
 * Extracts FAQ items from iPublish API response data.
 * Checks direct .faq, .seo_metadata.faq, and schema_json.
 */
export function extractFaqsFromIPublishData(data: any): { question: string; answer: string }[] {
  if (!data) return [];

  // 1. Direct faq array on object
  if (Array.isArray(data.faq) && data.faq.length > 0) {
    return data.faq
      .map((item: any) => ({
        question: item.question || item.name || "",
        answer: item.answer || item.text || item.acceptedAnswer?.text || "",
      }))
      .filter((item: any) => item.question && item.answer);
  }

  // 2. From seo_metadata.faq
  if (Array.isArray(data.seo_metadata?.faq) && data.seo_metadata.faq.length > 0) {
    return data.seo_metadata.faq
      .map((item: any) => ({
        question: item.question || item.name || "",
        answer: item.answer || item.text || item.acceptedAnswer?.text || "",
      }))
      .filter((item: any) => item.question && item.answer);
  }

  // 3. From schema_json (FAQPage in @graph or root)
  if (data.schema_json) {
    let schemaObj = data.schema_json;
    if (typeof schemaObj === "string") {
      try {
        schemaObj = JSON.parse(schemaObj);
      } catch {
        schemaObj = null;
      }
    }
    if (schemaObj) {
      const graph = Array.isArray(schemaObj["@graph"])
        ? schemaObj["@graph"]
        : [schemaObj];
      const faqNode = graph.find(
        (node: any) =>
          node &&
          (node["@type"] === "FAQPage" ||
            (Array.isArray(node["@type"]) && node["@type"].includes("FAQPage")))
      );
      if (faqNode && Array.isArray(faqNode.mainEntity)) {
        return faqNode.mainEntity
          .map((item: any) => ({
            question: item.name || item.question || "",
            answer: item.acceptedAnswer?.text || item.answer || item.text || "",
          }))
          .filter((item: any) => item.question && item.answer);
      }
    }
  }

  return [];
}

/**
 * Fetches full dynamic content directly by content ID using the authenticated content endpoint.
 * Swagger: GET /api/v1/content/{content_id}
 */
export async function getIPublishContentDetailsById(
  contentId: string
): Promise<IPublishPageData | null> {
  try {
    const res = await fetch(
      `${IPUBLISH_BASE_URL}/api/v1/content/${encodeURIComponent(contentId)}`,
      {
        headers: {
          Authorization: `Bearer ${IPUBLISH_STATIC_TOKEN}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.warn(`[iPublish] Failed to fetch content details for ID '${contentId}':`, res.status);
      return null;
    }

    const data = await res.json();
    const faqs = extractFaqsFromIPublishData(data);
    return {
      title: data.title,
      body: normalizeIPublishHtml(data.current_body || data.body),
      current_body: normalizeIPublishHtml(data.current_body || data.body),
      excerpt: data.excerpt,
      content_type: data.content_type,
      word_count: data.word_count,
      tags: data.tags,
      featured_image_url: getIPublishImageUrl(data.featured_image_url) || null,
      featured_image_height: data.featured_image_height,
      featured_image_overlay: data.featured_image_overlay,
      featured_title_position: data.featured_title_position,
      featured_title_padding: data.featured_title_padding,
      content_width: data.content_width,
      banner_gradient_from: data.banner_gradient_from,
      banner_gradient_to: data.banner_gradient_to,
      banner_gradient_direction: data.banner_gradient_direction,
      title_color: data.title_color,
      title_color_mode: data.title_color_mode,
      title_gradient_to: data.title_gradient_to,
      title_gradient_direction: data.title_gradient_direction,
      title_shadow: data.title_shadow,
      overlay_color: data.overlay_color,
      body_font: data.body_font,
      title_font: data.title_font,
      title_size_scale: data.title_size_scale,
      title_weight: data.title_weight,
      title_italic: data.title_italic,
      banner_pattern: data.banner_pattern,
      banner_pattern_color: data.banner_pattern_color,
      banner_pattern_opacity: data.banner_pattern_opacity,
      title_line_height: data.title_line_height,
      title_margin_x: data.title_margin_x,
      title_margin_y: data.title_margin_y,
      meta_description: data.seo_metadata?.meta_description || data.excerpt,
      updated_at: data.updated_at,
      published_at: data.published_at,
      created_at: data.created_at,
      seo_title: data.seo_metadata?.seo_title || data.title,
      subcategory: data.subcategory,
      focus_keyword: data.seo_metadata?.focus_keyword,
      secondary_keywords: data.seo_metadata?.secondary_keywords,
      og_title: data.seo_metadata?.og_title || data.title,
      og_description: data.seo_metadata?.og_description || data.excerpt,
      schema_json: data.seo_metadata?.schema_json,
      canonical_url: data.seo_metadata?.canonical_url,
      slug: data.seo_metadata?.slug || data.slug,
      id: data.id,
      author_name: data.author_name,
      faqs,
      faq_enabled: data.seo_metadata?.faq_enabled ?? data.faq_enabled ?? (faqs.length > 0),
    };
  } catch (error) {
    console.error(`[iPublish] Error fetching content details for ID '${contentId}':`, error);
    return null;
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

      // Resilient fallback: Try fetching via authenticated content detail if public page endpoint fails
      try {
        const publishedContent = await getIPublishPublishedContent();
        const matchedItem = publishedContent?.find((item) => item.slug === slug);
        if (matchedItem?.id) {
          console.info(`[iPublish] Attempting fallback to authenticated content API for '${slug}' (id: ${matchedItem.id})`);
          const fallbackDetail = await getIPublishContentDetailsById(matchedItem.id);
          if (fallbackDetail) {
            return {
              ...fallbackDetail,
              slug,
              org: orgSlug,
            };
          }
        }
      } catch (fallbackError) {
        console.error(`[iPublish] Fallback lookup failed for '${slug}':`, fallbackError);
      }

      return null;
    }

    const data: IPublishPageData = await res.json();
    let faqs = extractFaqsFromIPublishData(data);
    let faq_enabled = (data as any).faq_enabled ?? (data as any).seo_metadata?.faq_enabled ?? (faqs.length > 0);

    // If no faqs found on the public page response, check if authenticated content API has them
    if (faqs.length === 0) {
      try {
        const publishedContent = await getIPublishPublishedContent();
        const matchedItem = publishedContent?.find((item) => item.slug === slug);
        if (matchedItem?.id) {
          const detail = await getIPublishContentDetailsById(matchedItem.id);
          if (detail?.faqs && detail.faqs.length > 0) {
            faqs = detail.faqs;
            faq_enabled = detail.faq_enabled ?? true;
          }
        }
      } catch {
        // Ignore fallback error
      }
    }

    return {
      ...data,
      featured_image_url: getIPublishImageUrl(data.featured_image_url) || null,
      body: normalizeIPublishHtml(data.body),
      current_body: normalizeIPublishHtml(data.current_body),
      slug,
      org: orgSlug,
      faqs,
      faq_enabled,
    };
  } catch (error) {
    console.error(`[iPublish] Error fetching page '${slug}':`, error);

    // Fallback on network/fetch failure
    try {
      const publishedContent = await getIPublishPublishedContent();
      const matchedItem = publishedContent?.find((item) => item.slug === slug);
      if (matchedItem?.id) {
        const fallbackDetail = await getIPublishContentDetailsById(matchedItem.id);
        if (fallbackDetail) {
          return {
            ...fallbackDetail,
            slug,
            org: orgSlug,
          };
        }
      }
    } catch {
      // Ignore fallback error
    }

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
      
      // Fetch details for each item to get full data including author_name
      const detailedPages = await Promise.all(
        filteredContent.map(async (item) => {
          let detail = await getIPublishPageBySlug(item.slug, orgSlug);
          if (!detail && item.id) {
            detail = await getIPublishContentDetailsById(item.id);
          }
          if (detail) {
            return { ...item, ...detail };
          }
          // Never drop a published blog just because detail endpoint had a transient failure:
          return {
            ...item,
            body: item.body || "",
            current_body: item.current_body || "",
            slug: item.slug,
            org: orgSlug,
          } as IPublishPageData;
        })
      );
      
      return detailedPages.filter((item) => item !== null) as IPublishPageData[];
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

  // Try direct content API fetch by ID
  const directDetail = await getIPublishContentDetailsById(idOrSlug);
  if (directDetail) return directDetail;

  // Search in all published content if not direct match
  const allBlogs = await getIPublishAllBlogs();
  const matched = allBlogs.find((b) => b.slug === idOrSlug || b.id === idOrSlug);
  return matched || null;
}
