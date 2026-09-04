import { CaseStudy } from "@/lib/data/case-studies";
// WordPress GraphQL API integration for Hutech Solutions
// Replace NEXT_PUBLIC_WORDPRESS_API_URL in .env.local with your WordPress site's GraphQL endpoint

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
const WORDPRESS_BASE_URL = WORDPRESS_API_URL?.replace(/\/graphql\/?$/i, "");

const DEFAULT_BLOG_IMAGE =
  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800";
const DEFAULT_EVENT_IMAGE =
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920";
const DEFAULT_EVENT_CTA_IMAGE =
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const DEFAULT_SPEAKER_IMAGE =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400";
const DEFAULT_CASE_STUDY_IMAGE =
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920";
const DEFAULT_CONTACT_OFFICE_IMAGES = [
  "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1549144511-f099e773c147?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800&auto=format&fit=crop",
];
const DEFAULT_LEADER_IMAGES = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
];
const DEFAULT_PARTNER_MEET_IMAGES = [
  "/images/partner-card-oots.png",
  "/images/partner-card-maconsus.png",
  "/images/partner-card-nasscom.png",
];
const DEFAULT_PARTNER_LOGOS = [
  "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/d/d4/ServiceNow_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/f/ff/Snowflake_Logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg",
];

function isBlankString(value: unknown): value is string {
  return typeof value === "string" && value.trim() === "";
}

function nonBlank(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() !== "" ? value : undefined;
}

function normalizeBlankStrings<T>(value: T): T {
  if (isBlankString(value)) return undefined as T;
  if (Array.isArray(value)) return value.map(normalizeBlankStrings) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [
        key,
        normalizeBlankStrings(item),
      ])
    ) as T;
  }
  return value;
}

// ─── Fetch Utility ──────────────────────────────────────────────────────────

export async function fetchGraphQL(query: string, variables = {}) {
  if (!WORDPRESS_API_URL) {
    console.warn("[WP] NEXT_PUBLIC_WORDPRESS_API_URL is not set. Using static fallback data.");
    return { data: null, errors: [{ message: "WORDPRESS_API_URL missing" }] };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000); // 30s timeout

    const res = await fetch(WORDPRESS_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
      ...(process.env.NODE_ENV === "development"
        ? { cache: "no-store" }
        : { next: { revalidate: 0 } }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      console.warn(`[WP] HTTP ${res.status}: ${res.statusText}`);
      try {
        const text = await res.text();
        console.warn(`[WP] Error Body: ${text}`);
      } catch (e) {}
      return { data: null, errors: [{ message: `HTTP ${res.status}` }] };
    }

    const json = await res.json();
    if (json.errors) {
      console.warn("[WP] GraphQL errors:", JSON.stringify(json.errors));
    }
    return normalizeBlankStrings(json);
  } catch (err: any) {
    if (err.name === "AbortError") {
      console.warn("[WP] Request timed out after 10s");
    } else {
      console.warn("[WP] Fetch error:", err.message);
    }
    return { data: null, errors: [{ message: err.message }] };
  }
}

// ─── Helper to extract image URL from ACF image field ────────────────────────
function imgUrl(field: any): string | undefined {
  if (!field) return undefined;
  if (typeof field === "string") return nonBlank(field);
  const url =
    field?.node?.sourceUrl ||
    field?.node?.mediaItemUrl ||
    field?.sourceUrl ||
    field?.mediaItemUrl;
  return nonBlank(url);
}

// ─── Homepage Query ──────────────────────────────────────────────────────────

export type ChromeMenuItem = {
  label: string;
  path: string;
  children?: ChromeMenuItem[];
};

export type HeaderNavItem = {
  label: string;
  path: string;
  dropdown?: {
    title: string;
    items: { name: string; path: string }[];
  }[];
};

export type TopNavChromeData = {
  backgroundColor?: string;
  textColor?: string;
  phones?: { text?: string; url?: string }[];
  emails?: { text?: string; url?: string }[];
  socials?: { id?: number; icon?: string; url?: string }[];
};

export type HeaderChromeData = {
  logoUrl?: string;
  logoAlt?: string;
  topNav?: TopNavChromeData;
  navItems?: HeaderNavItem[];
  megaCard?: {
    title?: string;
    text?: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  megaBottomLinks?: { name: string; path: string }[];
  megaBottomTagline?: string;
  mobileCta?: { label?: string; url?: string };
  mobileFooter?: { left?: string; right?: string };
};

export type FooterChromeData = {
  titles?: {
    services?: string;
    industries?: string;
    resources?: string;
    company?: string;
    caseStudies?: string;
    locations?: string;
    about?: string;
  };
  menus?: {
    services?: { name: string; path: string }[];
    industries?: { name: string; path: string }[];
    resources?: { name: string; path: string }[];
    company?: { name: string; path: string }[];
    caseStudies?: { name: string; path: string }[];
    legal?: { name: string; path: string }[];
  };
  offices?: {
    title?: string;
    company?: string;
    address?: string[];
    phone?: string;
    phoneUrl?: string;
    email?: string;
    mapUrl?: string;
  }[];
  about?: {
    text?: string;
    linkText?: string;
    linkUrl?: string;
  };
  badges?: { src: string; alt: string; href?: string }[];
  socials?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
  };
  socialIcons?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
  };
  copyright?: string;
};

export type SiteChromeData = {
  topNav?: TopNavChromeData;
  header: HeaderChromeData;
  footer: FooterChromeData;
};

function applyParentSlug(parentPath: string | undefined, childPath: string | undefined): string {
  const p = parentPath || "#";
  let c = childPath || "#";
  if (c === "#" || c.startsWith("http") || p === "#" || p === "/") return c;
  
  // Remove the default CPT slugs if they exist so we can cleanly append to the parent
  c = c.replace(/^\/(hutech_service|case_study|hutech_event|hutech_news|hutech_career|hutech_press_release|hutech_document)\//, "/");

  const cleanP = p.replace(/\/$/, "");
  if (!c.startsWith(cleanP + "/") && c !== cleanP) {
    const cleanC = c.startsWith("/") ? c : `/${c}`;
    c = `${cleanP}${cleanC}`;
  }
  return c;
}

function flattenMenuItems(items?: ChromeMenuItem[], parentPath?: string): { name: string; path: string }[] {
  return (items || []).map((item) => ({
    name: item.label,
    path: parentPath ? applyParentSlug(parentPath, item.path) : (item.path || "#"),
  }));
}

function transformPrimaryMenu(items?: ChromeMenuItem[]): HeaderNavItem[] {
  return (items || []).map((item) => {
    // Infer a parent path if the top-level item uses '#' or '/'
    const parentPath = item.path && item.path !== "#" && item.path !== "/"
      ? item.path
      : `/${item.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

    const dropdown = item.children?.length
      ? item.children.map((section) => ({
          title: section.label,
          items: section.children?.length
            ? flattenMenuItems(section.children, parentPath)
            : [{ name: section.label, path: applyParentSlug(parentPath, section.path) }],
        }))
      : undefined;

    return {
      label: item.label,
      path: item.path || "#",
      dropdown,
    };
  });
}

export async function getSiteChrome(): Promise<SiteChromeData | null> {
  if (!WORDPRESS_BASE_URL) {
    return null;
  }

  try {
    const res = await fetch(`${WORDPRESS_BASE_URL}/wp-json/hutech/v1/site-chrome`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      console.warn(`[WP] Could not fetch site chrome. HTTP ${res.status}`);
      return null;
    }

    const raw = normalizeBlankStrings(await res.json()) as any;
    const menus = raw?.menus || {};

    return {
      topNav: raw?.topNav,
      header: {
        ...raw.header,
        topNav: raw?.topNav,
        navItems: transformPrimaryMenu(menus.primary),
        megaBottomLinks: flattenMenuItems(menus.megaBottom),
      },
      footer: {
        ...raw.footer,
        menus: {
          services: flattenMenuItems(menus.footerServices, "/services"),
          industries: flattenMenuItems(menus.footerIndustries, "/industries"),
          resources: flattenMenuItems(menus.footerResources, "/resources"),
          company: flattenMenuItems(menus.footerCompany, "/company"),
          caseStudies: flattenMenuItems(menus.footerCaseStudies, "/resources/case-studies"),
          legal: flattenMenuItems(menus.footerLegal, "/legal"),
        },
      },
    };
  } catch (err: any) {
    console.warn("[WP] getSiteChrome() failed:", err?.message || err);
    return null;
  }
}

const SLIDE_FIELDS = `
  eyebrow
  title
  description
  btn1Text
  btn1Link
  btn2Text
  btn2Link
  image { node { sourceUrl } }
  alt
`;

const PARTNER_FIELDS = `
  name
  logo { node { sourceUrl } }
`;

const STORY_FIELDS = `
  name
  title
  text
  image { node { sourceUrl } }
`;

const NEWS_FIELDS = `
  title
  date
  image { node { sourceUrl } }
`;

const ACCORDION_FIELDS = `
  title
  content
`;

const HOMEPAGE_QUERY = `
  query GetHomePage($uri: String!) {
    pageBy(uri: $uri) {
      id
      title
      homepageFields {
        heroSlides {
          slide_1 { ${SLIDE_FIELDS} }
          slide_2 { ${SLIDE_FIELDS} }
          slide_3 { ${SLIDE_FIELDS} }
          slide_4 { ${SLIDE_FIELDS} }
          slide_5 { ${SLIDE_FIELDS} }
        }
        withHutech {
          title
          description
          knowMoreLink { url title }
          brandStoryLink { url title }
          image { node { sourceUrl } }
        }
        bigThinkers {
          title
          quote
          authorName
          authorTitle
          image { node { sourceUrl } }
        }
        expertise {
          title
          description
          category { nodes { slug name } }
          postsCount
        }
        capabilities {
          title
          description
          capability_1 { name image { node { sourceUrl } } description url }
          capability_2 { name image { node { sourceUrl } } description url }
          capability_3 { name image { node { sourceUrl } } description url }
          capability_4 { name image { node { sourceUrl } } description url }
          capability_5 { name image { node { sourceUrl } } description url }
          capability_6 { name image { node { sourceUrl } } description url }
          capability_7 { name image { node { sourceUrl } } description url }
          capability_8 { name image { node { sourceUrl } } description url }
        }
        awards {
          title
          description
          viewAllAwardsLink { url title }
          award_1 { label icon { node { sourceUrl } } }
          award_2 { label icon { node { sourceUrl } } }
          award_3 { label icon { node { sourceUrl } } }
          award_4 { label icon { node { sourceUrl } } }
          award_5 { label icon { node { sourceUrl } } }
          award_6 { label icon { node { sourceUrl } } }
        }
        partners {
          title
          description
          valued_partner_1 { ${PARTNER_FIELDS} }
          valued_partner_2 { ${PARTNER_FIELDS} }
          valued_partner_3 { ${PARTNER_FIELDS} }
          valued_partner_4 { ${PARTNER_FIELDS} }
          valued_partner_5 { ${PARTNER_FIELDS} }
          valued_partner_6 { ${PARTNER_FIELDS} }
          valued_partner_7 { ${PARTNER_FIELDS} }
          valued_partner_8 { ${PARTNER_FIELDS} }
          valued_partner_9 { ${PARTNER_FIELDS} }
          valued_partner_10 { ${PARTNER_FIELDS} }
          valued_partner_11 { ${PARTNER_FIELDS} }
          valued_partner_12 { ${PARTNER_FIELDS} }
          special_partner_1 { ${PARTNER_FIELDS} }
          special_partner_2 { ${PARTNER_FIELDS} }
          special_partner_3 { ${PARTNER_FIELDS} }
          special_partner_4 { ${PARTNER_FIELDS} }
          special_partner_5 { ${PARTNER_FIELDS} }
          special_partner_6 { ${PARTNER_FIELDS} }
        }
        successStories {
          title
          description
          postsCount
        }
        whatsNew {
          title
          description
          category { nodes { slug name } }
          postsCount
        }
        techStack {
          title
          description
          category_1 {
            categoryName
            technology_1 { name icon { node { sourceUrl } } }
            technology_2 { name icon { node { sourceUrl } } }
            technology_3 { name icon { node { sourceUrl } } }
            technology_4 { name icon { node { sourceUrl } } }
            technology_5 { name icon { node { sourceUrl } } }
            technology_6 { name icon { node { sourceUrl } } }
            technology_7 { name icon { node { sourceUrl } } }
            technology_8 { name icon { node { sourceUrl } } }
          }
          category_2 {
            categoryName
            technology_1 { name icon { node { sourceUrl } } }
            technology_2 { name icon { node { sourceUrl } } }
            technology_3 { name icon { node { sourceUrl } } }
            technology_4 { name icon { node { sourceUrl } } }
            technology_5 { name icon { node { sourceUrl } } }
            technology_6 { name icon { node { sourceUrl } } }
            technology_7 { name icon { node { sourceUrl } } }
            technology_8 { name icon { node { sourceUrl } } }
          }
          category_3 {
            categoryName
            technology_1 { name icon { node { sourceUrl } } }
            technology_2 { name icon { node { sourceUrl } } }
            technology_3 { name icon { node { sourceUrl } } }
            technology_4 { name icon { node { sourceUrl } } }
            technology_5 { name icon { node { sourceUrl } } }
            technology_6 { name icon { node { sourceUrl } } }
            technology_7 { name icon { node { sourceUrl } } }
            technology_8 { name icon { node { sourceUrl } } }
          }
          category_4 {
            categoryName
            technology_1 { name icon { node { sourceUrl } } }
            technology_2 { name icon { node { sourceUrl } } }
            technology_3 { name icon { node { sourceUrl } } }
            technology_4 { name icon { node { sourceUrl } } }
            technology_5 { name icon { node { sourceUrl } } }
            technology_6 { name icon { node { sourceUrl } } }
            technology_7 { name icon { node { sourceUrl } } }
            technology_8 { name icon { node { sourceUrl } } }
          }
          category_5 {
            categoryName
            technology_1 { name icon { node { sourceUrl } } }
            technology_2 { name icon { node { sourceUrl } } }
            technology_3 { name icon { node { sourceUrl } } }
            technology_4 { name icon { node { sourceUrl } } }
            technology_5 { name icon { node { sourceUrl } } }
            technology_6 { name icon { node { sourceUrl } } }
            technology_7 { name icon { node { sourceUrl } } }
            technology_8 { name icon { node { sourceUrl } } }
          }
        }
        whyHutech {
          title
          bgImage { node { sourceUrl } }
          paragraph1
          paragraph2
          paragraph3
          accordion_item_1 { ${ACCORDION_FIELDS} }
          accordion_item_2 { ${ACCORDION_FIELDS} }
          accordion_item_3 { ${ACCORDION_FIELDS} }
          accordion_item_4 { ${ACCORDION_FIELDS} }
          accordion_item_5 { ${ACCORDION_FIELDS} }
          accordion_item_6 { ${ACCORDION_FIELDS} }
        }
      }
    }
  }
`;

// ─── Types ───────────────────────────────────────────────────────────────────

export interface WpSlide {
  eyebrow?: string;
  title?: string;
  description?: string;
  btn1Text?: string;
  btn1Link?: string;
  btn2Text?: string;
  btn2Link?: string;
  image?: any;
  alt?: string;
}

export interface WpPartner {
  name?: string;
  logo?: any;
}

export interface WpStory {
  name?: string;
  title?: string;
  text?: string;
  image?: any;
}

export interface WpNewsItem {
  title?: string;
  date?: string;
  image?: any;
  slug?: string;
  imageUrl?: string;
}

export interface WpAccordionItem {
  title?: string;
  content?: string;
}

export interface WpCapability {
  name?: string;
  image?: any;
  description?: string;
  color?: string;
  url?: string;
}

export interface WpIndustry {
  name?: string;
  icon?: any;
  btnText?: string;
  btnLink?: string;
}

export interface HomepageData {
  heroSlides: WpSlide[];
  withHutech: {
    title?: string;
    description?: string;
    knowMoreLink?: { url?: string; title?: string };
    brandStoryLink?: { url?: string; title?: string };
    imageUrl?: string;
  };
  bigThinkers: {
    title?: string;
    quote?: string;
    authorName?: string;
    authorTitle?: string;
    imageUrl?: string;
  };
  expertise: {
    title?: string;
    description?: string;
    industries: (WpIndustry & { iconUrl?: string })[];
  };
  capabilities: {
    title?: string;
    description?: string;
    list: WpCapability[];
  };
  awards: {
    title?: string;
    description?: string;
    viewAllLink?: { url?: string; title?: string };
    list: { label?: string; iconUrl?: string }[];
  };
  partners: {
    title?: string;
    description?: string;
    valued: WpPartner[];
    special: WpPartner[];
  };
  successStories: {
    title?: string;
    description?: string;
    stories: WpStory[];
  };
  whatsNew: {
    title?: string;
    description?: string;
    items: WpNewsItem[];
  };
  whyHutech: {
    title?: string;
    bgImageUrl?: string;
    paragraph1?: string;
    paragraph2?: string;
    paragraph3?: string;
    accordionItems: WpAccordionItem[];
  };
  techStack?: {
    title?: string;
    description?: string;
    categories?: {
      categoryName?: string;
      technologies?: {
        name?: string;
        iconUrl?: string;
      }[];
    }[];
  };
}

// ─── Data Transform ──────────────────────────────────────────────────────────

function transformHomePage(
  raw: any,
  dynamicServices: any[] = [],
  dynamicTestimonials: any[] = [],
  dynamicBlogs: any[] = []
): HomepageData | null {
  const f = raw?.data?.pageBy?.homepageFields || raw?.data?.page?.homepageFields;
  if (!f) return null;

  // Returns true only if the group object has at least one non-blank string value.
  // This prevents empty ACF group slots from overriding the static fallback data.
  const hasContent = (obj: any): boolean => {
    if (!obj || typeof obj !== "object") return false;
    return Object.values(obj).some((v) => {
      if (typeof v === "string") return v.trim() !== "";
      if (typeof v === "object" && v !== null) return hasContent(v);
      return false;
    });
  };

  // Helper to collect numbered group fields into an array,
  // filtering out null/undefined AND empty ACF group slots.
  const collectGroups = (parent: any, prefix: string, count: number) =>
    Array.from({ length: count }, (_, i) => parent?.[`${prefix}_${i + 1}`])
      .filter((item) => Boolean(item) && hasContent(item));

  // Slides — only include slides where at least a title or image is filled in
  const heroSlides: WpSlide[] = collectGroups(f.heroSlides, "slide", 5)
    .filter((s: any) => s?.title?.trim() || imgUrl(s?.image))
    .map((s: any) => ({ ...s, imageUrl: imgUrl(s?.image) }));

  // With Hutech
  const wh = f.withHutech || {};

  // Big Thinkers
  const bt = f.bigThinkers || {};

  // Expertise — prefer dynamic services fetched by category slug
  const exp = f.expertise || {};
  // ACF Free taxonomy fields return AcfTermNodeConnection, so access via nodes[0].slug
  const expCategorySlug = exp.category?.nodes?.[0]?.slug || "";
  let industries: any[];
  if (dynamicServices.length > 0) {
    industries = dynamicServices.map((svc: any) => ({
      name: svc.title,
      iconUrl: imgUrl(svc.featuredImage),
      btnText: "Learn More",
      btnLink: `/services/${svc.slug}/`,
    }));
  } else {
    industries = [];
  }

  // Capabilities — only include capabilities with a name
  const cap = f.capabilities || {};
  const capList: WpCapability[] = collectGroups(cap, "capability", 8)
    .filter((c: any) => c?.name?.trim())
    .map((c: any) => ({ name: c?.name, imageUrl: imgUrl(c?.image), description: c?.description, color: c?.color, url: c?.url || "" }));

  // Awards — only include awards with a label
  const aw = f.awards || {};
  const awardList = collectGroups(aw, "award", 6)
    .filter((a: any) => a?.label?.trim())
    .map((a: any) => ({ label: a?.label, iconUrl: imgUrl(a?.icon) }));

  // Partners — only include partners with a name or logo
  const pt = f.partners || {};
  const valued: WpPartner[] = collectGroups(pt, "valued_partner", 12)
    .filter((p: any) => p?.name?.trim() || imgUrl(p?.logo))
    .map((p: any) => ({ name: p?.name, logoUrl: imgUrl(p?.logo) }));
  const special: WpPartner[] = collectGroups(pt, "special_partner", 6)
    .filter((p: any) => p?.name?.trim() || imgUrl(p?.logo))
    .map((p: any) => ({ name: p?.name, logoUrl: imgUrl(p?.logo) }));

  // Success Stories — prefer dynamic testimonials if available
  const ss = f.successStories || {};
  let stories: WpStory[];
  if (dynamicTestimonials.length > 0) {
    stories = dynamicTestimonials.map((t: any) => ({
      name: t.title,
      title: [t.testimonialFields?.designation, t.testimonialFields?.company]
        .filter(Boolean).join(", ") || "Client",
      text: t.testimonialFields?.description || "",
      imageUrl: imgUrl(t.featuredImage),
    }));
  } else {
    stories = [];
  }

  // What's New — prefer dynamic blog posts if available
  const wn = f.whatsNew || {};
  // ACF Free taxonomy fields return AcfTermNodeConnection, so access via nodes[0].slug
  const wnCategorySlug = wn.category?.nodes?.[0]?.slug || "";
  let newsItems: WpNewsItem[];
  if (dynamicBlogs.length > 0) {
    newsItems = dynamicBlogs.map((b: any) => ({
      title: b.title,
      slug: b.slug,
      date: new Date(b.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      imageUrl: imgUrl(b.featuredImage),
    }));
  } else {
    newsItems = [];
  }

  // Why Hutech — only include accordion items with a title
  const why = f.whyHutech || {};
  const accordionItems: WpAccordionItem[] = collectGroups(why, "accordion_item", 6)
    .filter((a: any) => a?.title?.trim())
    .map((a: any) => ({ title: a?.title, content: a?.content }));


  // Tech Stack
  const ts = f.techStack || {};
  const tsCategories: any[] = [];
  for (let i = 1; i <= 5; i++) {
    const cat = ts[`category_${i}`];
    if (cat && cat.categoryName?.trim()) {
      const techs: any[] = [];
      for (let j = 1; j <= 8; j++) {
        const tech = cat[`technology_${j}`];
        if (tech && tech.name?.trim()) {
          techs.push({
            name: tech.name,
            iconUrl: imgUrl(tech.icon)
          });
        }
      }
      if (techs.length > 0) {
        tsCategories.push({
          categoryName: cat.categoryName,
          technologies: techs
        });
      }
    }
  }

  return {
    heroSlides,
    withHutech: {
      title: wh.title,
      description: wh.description,
      knowMoreLink: wh.knowMoreLink,
      brandStoryLink: wh.brandStoryLink,
      imageUrl: imgUrl(wh.image),
    },
    bigThinkers: {
      title: bt.title,
      quote: bt.quote,
      authorName: bt.authorName,
      authorTitle: bt.authorTitle,
      imageUrl: imgUrl(bt.image),
    },
    expertise: { title: exp.title, description: exp.description, industries },
    capabilities: { title: cap.title, description: cap.description, list: capList },
    awards: {
      title: aw.title,
      description: aw.description,
      viewAllLink: aw.viewAllAwardsLink,
      list: awardList,
    },
    partners: { title: pt.title, description: pt.description, valued, special },
    successStories: { title: ss.title, description: ss.description, stories },
    whatsNew: { title: wn.title, description: wn.description, items: newsItems },
    whyHutech: {
      title: why.title,
      bgImageUrl: imgUrl(why.bgImage),
      paragraph1: why.paragraph1,
      paragraph2: why.paragraph2,
      paragraph3: why.paragraph3,
      accordionItems,
    },
    techStack: {
      title: ts.title,
      description: ts.description,
      categories: tsCategories.length > 0 ? tsCategories : undefined,
    },
  };
}

// ─── Public API ──────────────────────────────────────────────────────────────

// ─── Dynamic queries used by getHomePage ─────────────────────────────────────

const SERVICES_BY_CATEGORY_QUERY = `
  query GetServicesByCategory($categorySlug: [String]!, $limit: Int!) {
    serviceCategories(where: { slug: $categorySlug }) {
      nodes {
        hutechServices(first: $limit) {
          nodes {
            title
            slug
            featuredImage { node { sourceUrl } }
          }
        }
      }
    }
  }
`;

const ALL_SERVICES_QUERY = `
  query GetAllServicesForHome($limit: Int!) {
    hutechServices(first: $limit) {
      nodes {
        title
        slug
        featuredImage { node { sourceUrl } }
      }
    }
  }
`;

const TESTIMONIALS_FOR_HOME_QUERY = `
  query GetTestimonialsForHome($limit: Int!) {
    hutechTestimonials(first: $limit) {
      nodes {
        title
        featuredImage { node { sourceUrl } }
        testimonialFields {
          designation
          company
          description
        }
      }
    }
  }
`;


const BLOGS_FOR_HOME_QUERY = `
  query GetBlogsForHome($limit: Int!) {
    posts(first: $limit, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        title
        date
        slug
        featuredImage { node { sourceUrl } }
      }
    }
  }
`;

const BLOGS_BY_CATEGORY_FOR_HOME_QUERY = `
  query GetBlogsByCategoryForHome($categoryName: String!, $limit: Int!) {
    posts(first: $limit, where: { orderby: { field: DATE, order: DESC }, categoryName: $categoryName }) {
      nodes {
        title
        date
        slug
        featuredImage { node { sourceUrl } }
      }
    }
  }
`;

export async function getHomePage(uri: string = "/"): Promise<HomepageData | null> {
  try {
    const queryUri = uri === "/" ? "home" : uri;
    const raw = await fetchGraphQL(HOMEPAGE_QUERY, { uri: queryUri });
    if (raw?.errors || !raw?.data?.pageBy) {
      console.warn("[WP] Could not fetch homepage data. Using static fallback.");
      return null;
    }

    const acf = raw?.data?.pageBy?.homepageFields || {};
    const exp = acf.expertise || {};
    const ss  = acf.successStories || {};
    const wn  = acf.whatsNew || {};

    // ── Expertise / Industries ──────────────────────────────────────────────
    const serviceCategory = exp.category?.nodes?.[0]?.slug || "";
    const servicesLimit   = exp.postsCount ? Math.max(1, parseInt(exp.postsCount, 10)) : 100;

    let dynamicServices: any[] = [];
    if (serviceCategory) {
      const svcRaw = await fetchGraphQL(SERVICES_BY_CATEGORY_QUERY, {
        categorySlug: [serviceCategory],
        limit: servicesLimit,
      });
      dynamicServices =
        svcRaw?.data?.serviceCategories?.nodes?.[0]?.hutechServices?.nodes || [];
    } else {
      const svcRaw = await fetchGraphQL(ALL_SERVICES_QUERY, { limit: servicesLimit });
      dynamicServices = svcRaw?.data?.hutechServices?.nodes || [];
    }

    // ── Testimonials / Success Stories ──────────────────────────────────────
    const testimonialsLimit = ss.postsCount ? Math.max(1, parseInt(ss.postsCount, 10)) : 100;

    let dynamicTestimonials: any[] = [];
    const tRaw = await fetchGraphQL(TESTIMONIALS_FOR_HOME_QUERY, { limit: testimonialsLimit });
    dynamicTestimonials = tRaw?.data?.hutechTestimonials?.nodes || [];

    // ── Blog Posts / What's New ─────────────────────────────────────────────
    const blogCategory = wn.category?.nodes?.[0]?.slug || "";
    const blogsLimit   = wn.postsCount ? Math.max(1, parseInt(wn.postsCount, 10)) : 100;

    let dynamicBlogs: any[] = [];
    if (blogCategory) {
      const bRaw = await fetchGraphQL(BLOGS_BY_CATEGORY_FOR_HOME_QUERY, {
        categoryName: blogCategory,
        limit: blogsLimit,
      });
      dynamicBlogs = bRaw?.data?.posts?.nodes || [];
    } else {
      const bRaw = await fetchGraphQL(BLOGS_FOR_HOME_QUERY, { limit: blogsLimit });
      dynamicBlogs = bRaw?.data?.posts?.nodes || [];
    }

    return transformHomePage(raw, dynamicServices, dynamicTestimonials, dynamicBlogs);
  } catch (err) {
    console.warn("[WP] getHomePage() failed:", err);
    return null;
  }
}

// ─── Blog Types ───────────────────────────────────────────────────────────────

export type WpBlog = {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  imageUrl?: string;
  readTime: string;
  tags: string[];
  isIPublish?: boolean;
  ipublishMeta?: {
    gradientFrom?: string;
    gradientTo?: string;
    gradientDirection?: string;
    pattern?: string;
    patternColor?: string;
    patternOpacity?: number;
    overlayColor?: string;
    overlayOpacity?: number;
    titlePosition?: string;
    titleColor?: string;
    titleColorMode?: string;
    titleGradientTo?: string;
    titleGradientDirection?: string;
    titleFont?: string;
    titleWeight?: number;
    titleItalic?: boolean;
    titleScale?: number;
    titleLineHeight?: number;
    titleShadow?: string;
    titlePadding?: number;
    titleMarginX?: number;
    titleMarginY?: number;
  };
  faqs?: {
    question: string;
    answer: string;
  }[];
  faqTitle?: string;
  faqSubtitle?: string;
};

export type BlogPageData = {
  title: string;
  description: string;
  bgImageUrl?: string;
};

// ─── Blog GraphQL Queries ─────────────────────────────────────────────────────

const BLOGS_QUERY = `
  query GetAllBlogs {
    posts(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        slug
        title
        date
        excerpt(format: RENDERED)
        featuredImage {
          node {
            sourceUrl
          }
        }
        categories {
          nodes {
            name
          }
        }
        tags {
          nodes {
            name
          }
        }
        author {
          node {
            name
          }
        }
      }
    }
  }
`;

const BLOG_BY_SLUG_QUERY = `
  query GetBlogBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      slug
      title
      date
      content(format: RENDERED)
      excerpt(format: RENDERED)
      featuredImage {
        node {
          sourceUrl
        }
      }
      categories {
        nodes {
          name
        }
      }
      tags {
        nodes {
          name
        }
      }
      author {
        node {
          name
        }
      }
    }
  }
`;

const BLOG_FAQ_QUERY = `
  query GetBlogFaq($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      postFields {
        faqTitle
        faqSubtitle
        faq1Question
        faq1Answer
        faq2Question
        faq2Answer
        faq3Question
        faq3Answer
        faq4Question
        faq4Answer
        faq5Question
        faq5Answer
      }
    }
  }
`;

const BLOG_PAGE_QUERY = `
  query GetBlogPageData {
    pages(where: { name: "blogs" }) {
      nodes {
        blogFields {
          title
          description
          bgImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

// ─── Blog Transform Helpers ───────────────────────────────────────────────────

function estimateReadTime(content: string): string {
  const wordCount = content.replace(/<[^>]+>/g, "").split(/\s+/).length;
  const mins = Math.max(1, Math.ceil(wordCount / 200));
  return `${mins} min read`;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").trim();
}

function transformBlogNode(node: any): WpBlog {
  const category = node.categories?.nodes?.[0]?.name ?? "General";
  const tags = node.tags?.nodes?.map((t: any) => t.name) ?? [];
  const author = node.author?.node?.name ?? "Hutech Team";
  const imageUrl = imgUrl(node.featuredImage) || DEFAULT_BLOG_IMAGE;
  const rawContent = node.content ?? node.excerpt ?? "";
  const readTime = estimateReadTime(rawContent);
  const excerpt = stripHtml(node.excerpt ?? "").slice(0, 200);
  const dateFormatted = new Date(node.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const faqs: { question: string; answer: string }[] = [];
  const pf = node.postFields;
  if (pf) {
    for (let i = 1; i <= 5; i++) {
      const q = pf[`faq${i}Question`];
      const a = pf[`faq${i}Answer`];
      if (q && a) {
        faqs.push({ question: q, answer: a });
      }
    }
  }

  return {
    id: node.id,
    slug: node.slug,
    title: node.title ?? "",
    date: dateFormatted,
    excerpt,
    content: rawContent,
    author,
    category,
    imageUrl,
    readTime,
    tags,
    faqs,
    faqTitle: pf?.faqTitle,
    faqSubtitle: pf?.faqSubtitle,
  };
}

// ─── Public Blog API ──────────────────────────────────────────────────────────

/** Fetch all WordPress posts for the blog listing page. Returns [] on failure. */
export async function getBlogs(): Promise<WpBlog[]> {
  try {
    const raw = await fetchGraphQL(BLOGS_QUERY);
    if (raw?.errors || !raw?.data?.posts?.nodes) {
      console.warn("[WP] Could not fetch blogs. Using static fallback.");
      return [];
    }
    return (raw.data.posts.nodes as any[]).map(transformBlogNode);
  } catch (err) {
    console.warn("[WP] getBlogs() failed:", err);
    return [];
  }
}

/** Fetch a single WordPress post by slug for the detail page. Returns null on failure. */
export async function getBlogBySlug(slug: string): Promise<WpBlog | null> {
  try {
    const raw = await fetchGraphQL(BLOG_BY_SLUG_QUERY, { slug });
    if (raw?.errors || !raw?.data?.post) {
      console.error("[WP] getBlogBySlug error:", raw?.errors);
      return null;
    }

    const postNode = raw.data.post;

    // Try to fetch FAQs safely without crashing the main post
    try {
      const faqRaw = await fetchGraphQL(BLOG_FAQ_QUERY, { slug });
      if (!faqRaw?.errors && faqRaw?.data?.post?.postFields) {
        postNode.postFields = faqRaw.data.post.postFields;
      }
    } catch (err) {
      console.warn("[WP] Could not fetch FAQs for blog:", slug);
    }

    return transformBlogNode(postNode);
  } catch (err) {
    console.error("[WP] getBlogBySlug() failed:", err);
    return null;
  }
}

/** Fetch custom ACF fields for the Blog landing page title/description. Returns null on failure. */
export async function getBlogPageData(): Promise<BlogPageData | null> {
  try {
    const raw = await fetchGraphQL(BLOG_PAGE_QUERY);
    const node = raw?.data?.pages?.nodes?.[0]?.blogFields;
    if (!node) return null;
    return {
      title: node.title || "",
      description: node.description || "",
      bgImageUrl: imgUrl(node.bgImage) || DEFAULT_BLOG_IMAGE,
    };
  } catch (err) {
    console.warn("[WP] getBlogPageData() failed:", err);
    return null;
  }
}

// ─── Events GraphQL Queries ───────────────────────────────────────────────────

const EVENTS_LIST_QUERY = `
  query GetAllEvents {
    hutechEvents(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        slug
        title
        date
        featuredImage { node { sourceUrl } }
        eventCategories { nodes { name } }
        eventPostFields {
          eventDate
          eventTimeStart
          eventTimeEnd
          timezone
          location
          eventType
          eventCategoryLabel
        }
      }
    }
  }
`;

const EVENT_BY_SLUG_QUERY = `
  query GetEventBySlug($slug: ID!) {
    hutechEvent(id: $slug, idType: SLUG) {
      id
      slug
      title
      date
      featuredImage { node { sourceUrl } }
      eventCategories { nodes { name } }
      eventPostFields {
        tagline
        eventType
        eventCategoryLabel
        eventDate
        eventTimeStart
        eventTimeEnd
        timezone
        location
        description
        highlight1
        highlight2
        highlight3
        highlight4
        highlight5
        highlight6
        agenda1Time
        agenda1Title
        agenda2Time
        agenda2Title
        agenda3Time
        agenda3Title
        agenda4Time
        agenda4Title
        agenda5Time
        agenda5Title
        agenda6Time
        agenda6Title
        agenda7Time
        agenda7Title
        agenda8Time
        agenda8Title
        speaker1Name
        speaker1Role
        speaker1Image { node { sourceUrl } }
        speaker2Name
        speaker2Role
        speaker2Image { node { sourceUrl } }
        speaker3Name
        speaker3Role
        speaker3Image { node { sourceUrl } }
        speaker4Name
        speaker4Role
        speaker4Image { node { sourceUrl } }
        speaker5Name
        speaker5Role
        speaker5Image { node { sourceUrl } }
        titleAbout
        titleAgenda
        titleSpeakers
        helpfulLinksTitle
        linkShareLabel
        linkCalendarLabel
        linkContactLabel
        linkContactUrl
        ctaTitle
        ctaDescription
        ctaImage { node { sourceUrl } }
        ctaVideoUrl
      }
    }
  }
`;

const EVENT_PAGE_QUERY = `
  query GetEventPageData {
    pages(where: { title: "Events" }) {
      nodes {
        eventPageFields {
          title
          description
          bgImage { node { sourceUrl } }
        }
      }
    }
  }
`;

function formatEventDateString(dateStr: string): string {
  if (!dateStr) return "";
  try {
    // If it's already "April 20, 2026", it will parse or return as is.
    // Handle ACF raw format or ISO string (e.g. "2026-06-25T00:00:00+00:00" or "20260625")
    let d: Date;
    if (/^\d{8}$/.test(dateStr)) {
      const year = dateStr.substring(0, 4);
      const month = dateStr.substring(4, 6);
      const day = dateStr.substring(6, 8);
      d = new Date(`${year}-${month}-${day}T00:00:00`);
    } else {
      d = new Date(dateStr);
    }
    
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }
  } catch (e) {
    // ignore
  }
  return dateStr;
}

function formatEventDateTime(pf: any, nodeDate: string): { date: string; time: string } {
  const rawDate = pf.eventDate || nodeDate || "";
  const date = formatEventDateString(rawDate);
  const start = pf.eventTimeStart || "";
  const end = pf.eventTimeEnd || "";
  const tz = pf.timezone || "";
  let time = "";
  if (start && end) {
    time = `${start} - ${end}${tz ? " " + tz : ""}`;
  } else if (start) {
    time = `${start}${tz ? " " + tz : ""}`;
  }
  return { date, time };
}

function transformEventNode(node: any) {
  const pf = node.eventPostFields || {};
  const { date, time } = formatEventDateTime(pf, node.date);
  const imageUrl = imgUrl(node.featuredImage) || DEFAULT_EVENT_IMAGE;

  const highlights: string[] = [1, 2, 3, 4, 5, 6]
    .map((i) => pf[`highlight${i}`])
    .filter(Boolean);

  const agenda: { time: string; event: string }[] = [1, 2, 3, 4, 5, 6, 7, 8]
    .map((i) => ({ time: pf[`agenda${i}Time`] || "", event: pf[`agenda${i}Title`] || "" }))
    .filter((a) => a.time || a.event);

  const speakers: { name: string; role: string; image: string }[] = [1, 2, 3, 4, 5]
    .map((i) => ({
      name: pf[`speaker${i}Name`] || "",
      role: pf[`speaker${i}Role`] || "",
      image: imgUrl(pf[`speaker${i}Image`]) || DEFAULT_SPEAKER_IMAGE,
    }))
    .filter((s) => s.name);

  return {
    id: node.slug,
    slug: node.slug,
    title: node.title ?? "",
    tagline: pf.tagline ?? "",
    date,
    time,
    location: pf.location ?? "",
    type: Array.isArray(pf.eventType) ? (pf.eventType[0] || "In-Person") : (pf.eventType || "In-Person"),
    category: Array.isArray(pf.eventCategoryLabel) ? (pf.eventCategoryLabel[0] || "Event") : (pf.eventCategoryLabel || node.eventCategories?.nodes?.[0]?.name || "Event"),
    image: imageUrl,
    description: pf.description ?? "",
    highlights,
    agenda,
    speakers,
    
    titleAbout: pf.titleAbout || "About the Event",
    titleAgenda: pf.titleAgenda || "Event Agenda",
    titleSpeakers: pf.titleSpeakers || "Featured Speakers",
    
    helpfulLinksTitle: pf.helpfulLinksTitle || "Helpful Links",
    linkShareLabel: pf.linkShareLabel || "Share with colleagues",
    linkCalendarLabel: pf.linkCalendarLabel || "Add to Calendar",
    linkContactLabel: pf.linkContactLabel || "Contact Organizer",
    linkContactUrl: pf.linkContactUrl || "/contact",

    ctaTitle: pf.ctaTitle ?? "Can't make it to this |Event?",
    ctaDescription: pf.ctaDescription ?? "Subscribe to our tech newsletter to receive event summaries, recording links, and early-bird notifications for our upcoming summits.",
    ctaImage: imgUrl(pf.ctaImage) || DEFAULT_EVENT_CTA_IMAGE,
    ctaVideoUrl: pf.ctaVideoUrl ?? "",
  };
}

export async function getEvents(): Promise<any[]> {
  try {
    const raw = await fetchGraphQL(EVENTS_LIST_QUERY);
    if (raw?.errors || !raw?.data?.hutechEvents?.nodes) {
      console.warn("[WP] Could not fetch events. Using static fallback.");
      return [];
    }
    return (raw.data.hutechEvents.nodes as any[]).map(transformEventNode);
  } catch (err) {
    console.warn("[WP] getEvents() failed:", err);
    return [];
  }
}

export async function getEventBySlug(slug: string): Promise<any | null> {
  try {
    const raw = await fetchGraphQL(EVENT_BY_SLUG_QUERY, { slug });
    if (raw?.errors || !raw?.data?.hutechEvent) {
      console.warn("[WP] getEventBySlug() – no data for:", slug);
      return null;
    }
    return transformEventNode(raw.data.hutechEvent);
  } catch (err) {
    console.warn("[WP] getEventBySlug() failed:", err);
    return null;
  }
}

export async function getEventPageData(): Promise<{ title: string; description: string; bgImageUrl?: string } | null> {
  try {
    const raw = await fetchGraphQL(EVENT_PAGE_QUERY);
    const node = raw?.data?.pages?.nodes?.[0]?.eventPageFields;
    if (!node) return null;
    return {
      title: node.title || "",
      description: node.description || "",
      bgImageUrl: imgUrl(node.bgImage) || DEFAULT_EVENT_IMAGE,
    };
  } catch (err) {
    console.warn("[WP] getEventPageData() failed:", err);
    return null;
  }
}

// ─── Case Studies GraphQL Queries ─────────────────────────────────────────────

const CASE_STUDIES_QUERY = `
  query GetAllCaseStudies {
    caseStudies(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        slug
        title
        date
        excerpt(format: RENDERED)
        featuredImage {
          node {
            sourceUrl
          }
        }
        caseStudyCategories {
          nodes {
            name
          }
        }
        caseStudyTags {
          nodes {
            name
          }
        }
        caseStudyPostFields {
          client
          shortDesc
          listClient
          listDesc
          impact
        }
        author {
          node {
            name
          }
        }
      }
    }
  }
`;

const CASE_STUDY_BY_SLUG_QUERY = `
  query GetCaseStudyBySlug($slug: ID!) {
    caseStudy(id: $slug, idType: SLUG) {
      id
      slug
      title
      date
      content(format: RENDERED)
      excerpt(format: RENDERED)
      featuredImage {
        node {
          sourceUrl
        }
      }
      caseStudyCategories {
        nodes {
          name
        }
      }
      caseStudyTags {
        nodes {
          name
        }
      }
      author {
        node {
          name
        }
      }
    }
  }
`;

const CASE_STUDY_FAQ_QUERY = `
  query GetCaseStudyFaq($slug: ID!) {
    caseStudy(id: $slug, idType: SLUG) {
      caseStudyPostFields {
        client
        impact
        shortDesc
        listClient
        listDesc
        clientDomain
        platform
        geography
        downloadBtnText
        caseStudyPdf {
          node {
            sourceUrl
          }
        }
        overviewQuote
        projectOverviewTitle
        overviewText1
        overviewText2
        screensTopTitle
        screensTitle
        screensDesc
        challengesTopTitle
        challengesSectionTitle
        challengesDesc
        challengesTitle
        solutionsTitle
        processTopTitle
        processTitle
        techTopTitle
        techTitle
        techDesc
        techCard1Title
        techCard1Desc
        techCard1Icon
        techCard1Gradient
        techCard2Title
        techCard2Desc
        techCard2Icon
        techCard2Gradient
        techCard3Title
        techCard3Desc
        techCard3Icon
        techCard3Gradient
        techCard4Title
        techCard4Desc
        techCard4Icon
        techCard4Gradient
        techStackTopTitle
        techStackTitle
        techStackDesc
        techItem1Name
        techItem1Logo { node { sourceUrl } }
        techItem2Name
        techItem2Logo { node { sourceUrl } }
        techItem3Name
        techItem3Logo { node { sourceUrl } }
        techItem4Name
        techItem4Logo { node { sourceUrl } }
        techItem5Name
        techItem5Logo { node { sourceUrl } }
        techItem6Name
        techItem6Logo { node { sourceUrl } }
        techItem7Name
        techItem7Logo { node { sourceUrl } }
        techItem8Name
        techItem8Logo { node { sourceUrl } }
        resultsTitle
        challenge1Title
        challenge1Desc
        challenge1Icon
        challenge2Title
        challenge2Desc
        challenge2Icon
        challenge3Title
        challenge3Desc
        challenge3Icon
        challenge4Title
        challenge4Desc
        challenge4Icon
        challenge5Title
        challenge5Desc
        challenge5Icon
        challenge6Title
        challenge6Desc
        challenge6Icon
        challenge7Title
        challenge7Desc
        challenge7Icon
        challenge8Title
        challenge8Desc
        challenge8Icon
        solution1Title
        solution1Icon { node { sourceUrl } }
        solution1Desc
        solution1Icon
        solution2Title
        solution2Icon { node { sourceUrl } }
        solution2Desc
        solution2Icon
        solution3Title
        solution3Icon { node { sourceUrl } }
        solution3Desc
        solution3Icon
        solution4Title
        solution4Icon { node { sourceUrl } }
        solution4Desc
        solution4Icon
        solution5Title
        solution5Icon { node { sourceUrl } }
        solution5Desc
        solution5Icon
        solution6Title
        solution6Icon { node { sourceUrl } }
        solution6Desc
        solution6Icon
        solution7Title
        solution7Icon { node { sourceUrl } }
        solution7Desc
        solution7Icon
        solution8Title
        solution8Icon { node { sourceUrl } }
        solution8Desc
        solution8Icon
        process1Number
        process1Title
        process1Desc
        process2Number
        process2Title
        process2Desc
        process3Number
        process3Title
        process3Desc
        process4Number
        process4Title
        process4Desc
        process5Number
        process5Title
        process5Desc
        process6Number
        process6Title
        process6Desc
        process7Number
        process7Title
        process7Desc
        process8Number
        process8Title
        process8Desc
        result1Title
        result1Desc
        result2Title
        result2Desc
        result3Title
        result3Desc
        result4Title
        result4Desc
        ctaTitle
        ctaDesc
        ctaBtnText
        ctaBtnLink
      }
    }
  }
`;

const CASE_STUDY_SCREENS_QUERY = `
  query GetCaseStudyScreens($slug: ID!) {
    caseStudy(id: $slug, idType: SLUG) {
      caseStudyPostFields {
        img1 { node { sourceUrl } }
        img1Device
        img1TopTitle
        img1Title
        img1Desc
        img2 { node { sourceUrl } }
        img2Device
        img2TopTitle
        img2Title
        img2Desc
        img3 { node { sourceUrl } }
        img3Device
        img3TopTitle
        img3Title
        img3Desc
        img4 { node { sourceUrl } }
        img4Device
        img4TopTitle
        img4Title
        img4Desc
        img5 { node { sourceUrl } }
        img5Device
        img5TopTitle
        img5Title
        img5Desc
        img6 { node { sourceUrl } }
        img6Device
        img6TopTitle
        img6Title
        img6Desc
        img7 { node { sourceUrl } }
        img7Device
        img7TopTitle
        img7Title
        img7Desc
        img8 { node { sourceUrl } }
        img8Device
        img8TopTitle
        img8Title
        img8Desc
      }
    }
  }
`;

const CASE_STUDY_PAGE_QUERY = `
  query GetCaseStudyPageData {
    pages(where: { name: "Case Studies" }) {
      nodes {
        caseStudyPageFields {
          title
          description
          bgImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

// ─── Case Study Transform Helpers ─────────────────────────────────────────────

function transformCaseStudyNode(node: any): CaseStudy {
  const pf = node.caseStudyPostFields || {};
  
  const category = node.caseStudyCategories?.nodes?.[0]?.name ?? "Case Study";
  const tags = node.caseStudyTags?.nodes?.map((t: any) => t.name) ?? node.tags?.nodes?.map((t: any) => t.name) ?? [];
  const imageUrl = imgUrl(node.featuredImage) || DEFAULT_CASE_STUDY_IMAGE;

  const overviewText = [];
  if (pf.overviewText1) overviewText.push(pf.overviewText1);
  if (pf.overviewText2) overviewText.push(pf.overviewText2);

  const challenges = [];
  for (let i = 1; i <= 8; i++) {
    if (pf[`challenge${i}Title`]) {
      challenges.push({
        title: pf[`challenge${i}Title`],
        desc: pf[`challenge${i}Desc`] || "",
        icon: pf[`challenge${i}Icon`] || "Target",
      });
    }
  }

  const solutions = [];
  for (let i = 1; i <= 8; i++) {
    if (pf[`solution${i}Title`]) {
      solutions.push({
        title: pf[`solution${i}Title`],
        desc: pf[`solution${i}Desc`] || "",
        icon: pf[`solution${i}Icon`] || "Zap",
      });
    }
  }

  const process = [];
  for (let i = 1; i <= 8; i++) {
    if (pf[`process${i}Title`]) {
      process.push({
        number: pf[`process${i}Number`] || `0${i}`,
        title: pf[`process${i}Title`],
        desc: pf[`process${i}Desc`] || "",
      });
    }
  }

  const results = [];
  for (let i = 1; i <= 4; i++) {
    if (pf[`result${i}Title`]) {
      results.push({
        title: pf[`result${i}Title`],
        desc: pf[`result${i}Desc`] || "",
      });
    }
  }



  const screens = [];
  for (let i = 1; i <= 8; i++) {
    const screenImg = pf[`img${i}`]?.node?.sourceUrl;
    if (screenImg) {
      screens.push({
        image: screenImg,
        device: pf[`img${i}Device`] || "laptop",
        topTitle: pf[`img${i}TopTitle`] || "",
        title: pf[`img${i}Title`] || "",
        desc: pf[`img${i}Desc`] || "",
      });
    }
  }

  const techCards = [];
  for (let i = 1; i <= 4; i++) {
    if (pf[`techCard${i}Title`]) {
      techCards.push({
        title: pf[`techCard${i}Title`],
        desc: pf[`techCard${i}Desc`] || "",
        icon: pf[`techCard${i}Icon`] || "Layers",
        gradient: pf[`techCard${i}Gradient`] || "from-blue-500 to-blue-700",
      });
    }
  }

  const techStackItems = [];
  for (let i = 1; i <= 8; i++) {
    if (pf[`techItem${i}Name`]) {
      techStackItems.push({
        name: pf[`techItem${i}Name`],
        logo: pf[`techItem${i}Logo`]?.node?.sourceUrl ?? "",
      });
    }
  }

  return {
    slug: node.slug,
    title: node.title ?? "",
    client: pf.client ?? "Client Name",
    listClient: pf.listClient || pf.client || "Client Name",
    listDesc: pf.listDesc || pf.shortDesc || "",
    impact: pf.impact ?? "",
    image: imageUrl,
    heroImage: imageUrl,
    tags,
    category,
    shortDesc: pf.shortDesc ?? "",
    clientDomain: pf.clientDomain ?? "",
    platform: pf.platform ?? "",
    geography: pf.geography ?? "",
    overviewQuote: pf.overviewQuote ?? "",
    projectOverviewTitle: pf.projectOverviewTitle ?? "",
    projectOverview: pf.projectOverview ?? "",
    overviewText,
    img1: pf.img1?.node?.sourceUrl ?? "",
    img2: pf.img2?.node?.sourceUrl ?? "",
    challengesTopTitle: pf.challengesTopTitle ?? "",
    challengesSectionTitle: pf.challengesSectionTitle ?? "",
    challengesDesc: pf.challengesDesc ?? "",
    challengesTitle: pf.challengesTitle ?? "",
    solutionsTitle: pf.solutionsTitle ?? "",
    challenges,
    solutions,
    processTopTitle: pf.processTopTitle ?? "",
    processTitle: pf.processTitle ?? "",
    process,
    techTopTitle: pf.techTopTitle ?? "",
    techTitle: pf.techTitle ?? "",
    techDesc: pf.techDesc ?? "",
    techCards,
    techStackTopTitle: pf.techStackTopTitle ?? "",
    techStackTitle: pf.techStackTitle ?? "",
    techStackDesc: pf.techStackDesc ?? "",
    techStackItems,
    resultsTitle: pf.resultsTitle ?? "",
    results,
    ctaTitle: pf.ctaTitle ?? "",
    ctaDesc: pf.ctaDesc ?? "",
    ctaBtnText: pf.ctaBtnText ?? "",
    ctaBtnLink: pf.ctaBtnLink ?? "",
    screensTopTitle: pf.screensTopTitle ?? "",
    screensTitle: pf.screensTitle ?? "",
    screensDesc: pf.screensDesc ?? "",
    screens,
    downloadBtnText: pf.downloadBtnText ?? "",
    caseStudyPdf: pf.caseStudyPdf?.node?.sourceUrl ?? "",
  } as any;
}

// ─── Public Case Study API ────────────────────────────────────────────────────

export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const raw = await fetchGraphQL(CASE_STUDIES_QUERY);
    if (raw?.errors || !raw?.data?.caseStudies?.nodes) {
      console.warn("[WP] Could not fetch case studies. Using static fallback.");
      return [];
    }
    return (raw.data.caseStudies.nodes as any[]).map(transformCaseStudyNode);
  } catch (err) {
    console.warn("[WP] getCaseStudies() failed:", err);
    return [];
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  try {
    const raw = await fetchGraphQL(CASE_STUDY_BY_SLUG_QUERY, { slug });
    if (raw?.errors || !raw?.data?.caseStudy) {
      console.error("[WP] getCaseStudyBySlug error:", raw?.errors);
      return null;
    }

    const postNode = raw.data.caseStudy;

    try {
      const faqRaw = await fetchGraphQL(CASE_STUDY_FAQ_QUERY, { slug });
      if (!faqRaw?.errors && faqRaw?.data?.caseStudy?.caseStudyPostFields) {
        postNode.caseStudyPostFields = faqRaw.data.caseStudy.caseStudyPostFields;
      }
    } catch (err) {
      console.warn("[WP] Could not fetch FAQs for case study:", slug);
    }

    try {
      const screensRaw = await fetchGraphQL(CASE_STUDY_SCREENS_QUERY, { slug });
      if (!screensRaw?.errors && screensRaw?.data?.caseStudy?.caseStudyPostFields) {
        if (!postNode.caseStudyPostFields) postNode.caseStudyPostFields = {};
        Object.assign(postNode.caseStudyPostFields, screensRaw.data.caseStudy.caseStudyPostFields);
      }
    } catch (err) {
      console.warn("[WP] Could not fetch screens for case study:", slug);
    }

    return transformCaseStudyNode(postNode);
  } catch (err) {
    console.error("[WP] getCaseStudyBySlug() failed:", err);
    return null;
  }
}

export async function getCaseStudyPageData(): Promise<BlogPageData | null> {
  try {
    const raw = await fetchGraphQL(CASE_STUDY_PAGE_QUERY);
    const node = raw?.data?.pages?.nodes?.[0]?.caseStudyPageFields;
    if (!node) return null;
    return {
      title: node.title || "",
      description: node.description || "",
      bgImageUrl: imgUrl(node.bgImage) || DEFAULT_CASE_STUDY_IMAGE,
    };
  } catch (err) {
    console.warn("[WP] getCaseStudyPageData() failed:", err);
    return null;
  }
}

// ─── About Page GraphQL Query ─────────────────────────────────────────────────

const ABOUT_PAGE_QUERY = `
  query GetAboutPageData($uri: String!) {
    pageBy(uri: $uri) {
      aboutPageFields {
          heroTagline
          heroTitle
          heroDescription
          heroBgImage { node { sourceUrl } }
          heroStat1Value heroStat1Label
          heroStat2Value heroStat2Label
          overviewTitle
          overviewDescription
          overviewFeature1Title overviewFeature1Desc
          overviewFeature2Title overviewFeature2Desc
          overviewFeature3Title overviewFeature3Desc
          overviewFeature4Title overviewFeature4Desc
          whatWeDoTitle
          whatWeDoDesc
          whatWeDoBullet1 whatWeDoBullet2 whatWeDoBullet3 whatWeDoBullet4
          whoWeHelpTitle whoWeHelpDesc
          whoWeHelpBullet1 whoWeHelpBullet2 whoWeHelpBullet3 whoWeHelpBullet4
          whyChooseUsTitle
          whyChooseUsDesc
          globalSynergyTitle globalSynergyDesc
          synergyStat1Label synergyStat2Label
          globalFootprintTitle globalFootprintDesc
          globalStat1Value globalStat1Label globalStat2Value globalStat2Label
          location1Name location1City location1Type location1Details location1Lat location1Lng
          location2Name location2City location2Type location2Details location2Lat location2Lng
          location3Name location3City location3Type location3Details location3Lat location3Lng
          location4Name location4City location4Type location4Details location4Lat location4Lng
          location5Name location5City location5Type location5Details location5Lat location5Lng
          historySubtitle
          historyTitle
          milestone1Year milestone1Title milestone1Desc
          milestone2Year milestone2Title milestone2Desc
          milestone3Year milestone3Title milestone3Desc
          milestone4Year milestone4Title milestone4Desc
          milestone5Year milestone5Title milestone5Desc
          milestone6Year milestone6Title milestone6Desc
          ctaBgImage { node { sourceUrl } }
          ctaTitle ctaDescription
          ctaButton1Text ctaButton1Url
          ctaButton2Text ctaButton2Url
      }
    }
  }
`;

function transformAboutPageData(f: any) {
  const stats = [1, 2, 3, 4, 5, 6].map(i => ({
    value: f[`heroStat${i}Value`] || "",
    label: f[`heroStat${i}Label`] || "",
  })).filter(s => s.value);

  const whatWeDoItems = [1, 2, 3, 4].map(i => f[`whatWeDoBullet${i}`] || "").filter(Boolean);
  const whoWeHelpItems = [1, 2, 3, 4].map(i => f[`whoWeHelpBullet${i}`] || "").filter(Boolean);

  const milestones = [1, 2, 3, 4, 5, 6].map(i => ({
    year:  f[`milestone${i}Year`]  || "",
    title: f[`milestone${i}Title`] || "",
    desc:  f[`milestone${i}Desc`]  || "",
  })).filter(m => m.year);

  const features = [1, 2, 3, 4].map(i => ({
    title: f[`overviewFeature${i}Title`] || "",
    desc:  f[`overviewFeature${i}Desc`] || "",
    icon:  ["Code2", "Cpu", "Fingerprint", "ShieldCheck"][i - 1] || "Code2"
  })).filter(feat => feat.title);

  const offices = [1, 2, 3, 4, 5].map(i => ({
    id: (f[`location${i}Name`] || f[`location${i}City`] || `office-${i}`).toLowerCase().replace(/\s+/g, '-'),
    name: f[`location${i}Name`] || f[`location${i}City`] || "",
    city: f[`location${i}City`] || "",
    type: f[`location${i}Type`] || "",
    details: f[`location${i}Details`] || "",
    lat: f[`location${i}Lat`] || "",
    lng: f[`location${i}Lng`] || ""
  })).filter(loc => loc.city || loc.name);

  return {
    heroTagline:    f.heroTagline    || undefined,
    heroTitle:      f.heroTitle      || undefined,
    heroDescription:f.heroDescription|| undefined,
    heroBgImage:    imgUrl(f.heroBgImage) || undefined,
    stats:          stats.length > 0 ? stats : undefined,
    overviewTitle:  f.overviewTitle  || undefined,
    overviewQuote:  f.overviewDescription || undefined,
    features:       features.length > 0 ? features : undefined,
    whatWeDoTitle:  f.whatWeDoTitle  || undefined,
    whatWeDoDesc:   f.whatWeDoDesc   || undefined,
    whatWeDoItems:  whatWeDoItems.length > 0 ? whatWeDoItems : undefined,
    whoWeHelpTitle: f.whoWeHelpTitle || undefined,
    whoWeHelpDesc:  f.whoWeHelpDesc  || undefined,
    whoWeHelpItems: whoWeHelpItems.length > 0 ? whoWeHelpItems : undefined,
    whyChooseTitle: f.whyChooseUsTitle || undefined,
    whyChooseDesc:  f.whyChooseUsDesc  || undefined,
    synergyTitle:   f.globalSynergyTitle || undefined,
    synergyDesc:    f.globalSynergyDesc || undefined,
    synergyStat1:   f.synergyStat1Label || undefined,
    synergyStat2:   f.synergyStat2Label || undefined,
    // Map stats
    mapTitle:       f.globalFootprintTitle || undefined,
    mapDescription: f.globalFootprintDesc || undefined,
    mapStat1Value:  f.globalStat1Value  || undefined,
    mapStat1Label:  f.globalStat1Label  || undefined,
    mapStat2Value:  f.globalStat2Value  || undefined,
    mapStat2Label:  f.globalStat2Label  || undefined,
    offices:        offices.length > 0 ? offices : undefined,
    historySubtitle:f.historySubtitle || undefined,
    historyTitle:   f.historyTitle   || undefined,
    milestones:     milestones.length > 0 ? milestones : undefined,
    ctaBgImage:     imgUrl(f.ctaBgImage) || undefined,
    ctaTitle:       f.ctaTitle       || undefined,
    ctaDescription: f.ctaDescription || undefined,
    ctaBtn1Text:    f.ctaButton1Text || undefined,
    ctaBtn1Url:     f.ctaButton1Url  || undefined,
    ctaBtn2Text:    f.ctaButton2Text || undefined,
    ctaBtn2Url:     f.ctaButton2Url  || undefined,
  };
}

export async function getAboutPageData(uri: string = "/about/"): Promise<ReturnType<typeof transformAboutPageData> | null> {
  try {
    let raw = await fetchGraphQL(ABOUT_PAGE_QUERY, { uri });
    let f = raw?.data?.pageBy?.aboutPageFields;

    if (!f && uri !== "/about/") {
      raw = await fetchGraphQL(ABOUT_PAGE_QUERY, { uri: "/about/" });
      f = raw?.data?.pageBy?.aboutPageFields;
    }

    if (!f && uri !== "about") {
      raw = await fetchGraphQL(ABOUT_PAGE_QUERY, { uri: "about" });
      f = raw?.data?.pageBy?.aboutPageFields;
    }

    if (!f) return null;
    return transformAboutPageData(f);
  } catch (err) {
    console.warn(`[WP] getAboutPageData(${uri}) failed:`, err);
    return null;
  }
}

// ─── Awards Page ─────────────────────────────────────────────────────────────

const AWARDS_PAGE_QUERY = `
  query GetAwardsPageData($uri: String!) {
    pageBy(uri: $uri) {
        awardsPageFields {
          awardsHeroTagline
          awardsHeroTitle
          awardsHeroDescription
          awardsHeroBgImage { node { sourceUrl } }
          
          awardsJourneyTagline
          awardsJourneyTitle
          awardsJourneyDescription
          
          awardsAward1Title awardsAward1Year awardsAward1Issuer awardsAward1Desc awardsAward1Icon awardsAward1Link
          awardsAward2Title awardsAward2Year awardsAward2Issuer awardsAward2Desc awardsAward2Icon awardsAward2Link
          awardsAward3Title awardsAward3Year awardsAward3Issuer awardsAward3Desc awardsAward3Icon awardsAward3Link
          awardsAward4Title awardsAward4Year awardsAward4Issuer awardsAward4Desc awardsAward4Icon awardsAward4Link
          awardsAward5Title awardsAward5Year awardsAward5Issuer awardsAward5Desc awardsAward5Icon awardsAward5Link
          awardsAward6Title awardsAward6Year awardsAward6Issuer awardsAward6Desc awardsAward6Icon awardsAward6Link
          awardsAward7Title awardsAward7Year awardsAward7Issuer awardsAward7Desc awardsAward7Icon awardsAward7Link
          awardsAward8Title awardsAward8Year awardsAward8Issuer awardsAward8Desc awardsAward8Icon awardsAward8Link
          awardsAward9Title awardsAward9Year awardsAward9Issuer awardsAward9Desc awardsAward9Icon awardsAward9Link
          awardsAward10Title awardsAward10Year awardsAward10Issuer awardsAward10Desc awardsAward10Icon awardsAward10Link
          awardsAward11Title awardsAward11Year awardsAward11Issuer awardsAward11Desc awardsAward11Icon awardsAward11Link
          awardsAward12Title awardsAward12Year awardsAward12Issuer awardsAward12Desc awardsAward12Icon awardsAward12Link
          
          awardsFeaturedTitle
          awardsFeaturedDescription
          awardsFeaturedImage { node { sourceUrl } }
          
          awardsStat1Label awardsStat1Value
          awardsStat2Label awardsStat2Value
          awardsStat3Label awardsStat3Value
          awardsStat4Label awardsStat4Value
          
          awardsCtaTitle
          awardsCtaBtn1Text awardsCtaBtn1Url
          awardsCtaBtn2Text awardsCtaBtn2Url
        }
    }
  }
`;

function transformAwardsPageData(f: any) {
  const awardsList = Array.from({ length: 12 }, (_, i) => {
    const idx = i + 1;
    return {
      title: f[`awardsAward${idx}Title`] || "",
      year: f[`awardsAward${idx}Year`] || "",
      issuer: f[`awardsAward${idx}Issuer`] || "",
      desc: f[`awardsAward${idx}Desc`] || "",
      iconName: f[`awardsAward${idx}Icon`] || "Trophy",
      link: f[`awardsAward${idx}Link`] || ""
    };
  }).filter(a => a.title);

  const stats = Array.from({ length: 4 }, (_, i) => {
    const idx = i + 1;
    return {
      label: f[`awardsStat${idx}Label`] || "",
      value: f[`awardsStat${idx}Value`] || ""
    };
  }).filter(s => s.value);

  return {
    heroTagline: f.awardsHeroTagline || "Our Milestones",
    heroTitle: f.awardsHeroTitle || "Awards & |Recognition.",
    heroDescription: f.awardsHeroDescription || "",
    heroBgImage: imgUrl(f.awardsHeroBgImage),
    
    journeyTagline: f.awardsJourneyTagline || "Milestones",
    journeyTitle: f.awardsJourneyTitle || "A Journey of Distinction",
    journeyDescription: f.awardsJourneyDescription || "",
    awardsList: awardsList.length > 0 ? awardsList : undefined,
    
    featuredTitle: f.awardsFeaturedTitle || "Recognized for |Global Excellence.",
    featuredDescription: f.awardsFeaturedDescription || "",
    featuredImage: imgUrl(f.awardsFeaturedImage),
    stats: stats.length > 0 ? stats : undefined,
    
    ctaTitle: f.awardsCtaTitle || "Join our award-winning |journey.",
    ctaBtn1Text: f.awardsCtaBtn1Text || "Explore Case Studies",
    ctaBtn1Url: f.awardsCtaBtn1Url || "/resources/case-studies",
    ctaBtn2Text: f.awardsCtaBtn2Text || "Partner With Us",
    ctaBtn2Url: f.awardsCtaBtn2Url || "/contact"
  };
}

export async function getAwardsPageData(uri: string = "/awards/"): Promise<ReturnType<typeof transformAwardsPageData> | null> {
  try {
    const raw = await fetchGraphQL(AWARDS_PAGE_QUERY, { uri });
    const f = raw?.data?.pageBy?.awardsPageFields;
    if (!f) return null;
    return transformAwardsPageData(f);
  } catch (err) {
    console.warn("[WP] getAwardsPageData failed:", err);
    return null;
  }
}

// ─── Vision Mission & Values Page ────────────────────────────────────────────

const VMV_PAGE_QUERY = `
  query GetVMVPageData($uri: String!) {
    pageBy(uri: $uri) {
        visionMissionValuesPageFields {
          vmvHeroTagline
          vmvHeroTitle
          vmvHeroDescription
          vmvVisionTitle
          vmvVisionDescription
          vmvMissionTitle
          vmvMissionDescription
          vmvValuesTagline
          vmvValuesTitle
          vmvValuesDescription
          vmvValue1Title vmvValue1Desc
          vmvValue2Title vmvValue2Desc
          vmvValue3Title vmvValue3Desc
          vmvValue4Title vmvValue4Desc
          vmvValue5Title vmvValue5Desc
          vmvValue6Title vmvValue6Desc
          vmvCtaTitle
          vmvCtaDescription
          vmvCtaBtn1Text vmvCtaBtn1Url
          vmvCtaBtn2Text vmvCtaBtn2Url
    }
  }
  }
`;

function transformVMVPageData(f: any) {
  const values = [1, 2, 3, 4, 5, 6].map(i => ({
    title: f[`vmvValue${i}Title`] || "",
    desc:  f[`vmvValue${i}Desc`]  || "",
  })).filter(v => v.title);

  return {
    heroTagline:        f.vmvHeroTagline        || "Our Purpose",
    heroTitle:          f.vmvHeroTitle          || "Our Vision, |Mission & ^Values.",
    heroDescription:    f.vmvHeroDescription    || "",
    visionTitle:        f.vmvVisionTitle        || "Our Vision",
    visionDescription:  f.vmvVisionDescription  || "",
    missionTitle:       f.vmvMissionTitle       || "Our Mission",
    missionDescription: f.vmvMissionDescription || "",
    valuesTagline:      f.vmvValuesTagline      || "The Pillars of Hutech",
    valuesTitle:        f.vmvValuesTitle        || "Our Core Values",
    valuesDescription:  f.vmvValuesDescription  || "",
    values: values.length > 0 ? values : undefined,
    ctaTitle:           f.vmvCtaTitle           || "Join Us in Shaping the Future of Technology.",
    ctaDescription:     f.vmvCtaDescription     || "",
    ctaBtn1Text:        f.vmvCtaBtn1Text        || "Partner With Us",
    ctaBtn1Url:         f.vmvCtaBtn1Url         || "/contact",
    ctaBtn2Text:        f.vmvCtaBtn2Text        || "View Careers",
    ctaBtn2Url:         f.vmvCtaBtn2Url         || "/careers",
  };
}

export async function getVMVPageData(uri: string = "/vision-mission-values/"): Promise<ReturnType<typeof transformVMVPageData> | null> {
  try {
    const raw = await fetchGraphQL(VMV_PAGE_QUERY, { uri });
    const f = raw?.data?.pageBy?.visionMissionValuesPageFields;
    if (!f) return null;
    return transformVMVPageData(f);
  } catch (err) {
    console.warn("[WP] getVMVPageData() failed:", err);
    return null;
  }
}

// ─── Leadership Page ─────────────────────────────────────────────────────────

const LEADERSHIP_PAGE_QUERY = `
  query GetLeadershipPageData($uri: String!) {
    pageBy(uri: $uri) {
        leadershipPageFields {
          leadHeroTagline
          leadHeroTitle
          leadHeroDescription
          leadHeroBgImage { node { sourceUrl } }
          leadLeader1Name leadLeader1Role leadLeader1Img { node { sourceUrl } } leadLeader1Bio leadLeader1Linkedin leadLeader1LinkedinIcon { node { sourceUrl } } leadLeader1Twitter leadLeader1TwitterIcon { node { sourceUrl } }
          leadLeader2Name leadLeader2Role leadLeader2Img { node { sourceUrl } } leadLeader2Bio leadLeader2Linkedin leadLeader2LinkedinIcon { node { sourceUrl } } leadLeader2Twitter leadLeader2TwitterIcon { node { sourceUrl } }
          leadLeader3Name leadLeader3Role leadLeader3Img { node { sourceUrl } } leadLeader3Bio leadLeader3Linkedin leadLeader3LinkedinIcon { node { sourceUrl } } leadLeader3Twitter leadLeader3TwitterIcon { node { sourceUrl } }
          leadLeader4Name leadLeader4Role leadLeader4Img { node { sourceUrl } } leadLeader4Bio leadLeader4Linkedin leadLeader4LinkedinIcon { node { sourceUrl } } leadLeader4Twitter leadLeader4TwitterIcon { node { sourceUrl } }
          leadLeader5Name leadLeader5Role leadLeader5Img { node { sourceUrl } } leadLeader5Bio leadLeader5Linkedin leadLeader5LinkedinIcon { node { sourceUrl } } leadLeader5Twitter leadLeader5TwitterIcon { node { sourceUrl } }
          leadLeader6Name leadLeader6Role leadLeader6Img { node { sourceUrl } } leadLeader6Bio leadLeader6Linkedin leadLeader6LinkedinIcon { node { sourceUrl } } leadLeader6Twitter leadLeader6TwitterIcon { node { sourceUrl } }
          leadLeader7Name leadLeader7Role leadLeader7Img { node { sourceUrl } } leadLeader7Bio leadLeader7Linkedin leadLeader7LinkedinIcon { node { sourceUrl } } leadLeader7Twitter leadLeader7TwitterIcon { node { sourceUrl } }
          leadLeader8Name leadLeader8Role leadLeader8Img { node { sourceUrl } } leadLeader8Bio leadLeader8Linkedin leadLeader8LinkedinIcon { node { sourceUrl } } leadLeader8Twitter leadLeader8TwitterIcon { node { sourceUrl } }
          leadLeader9Name leadLeader9Role leadLeader9Img { node { sourceUrl } } leadLeader9Bio leadLeader9Linkedin leadLeader9LinkedinIcon { node { sourceUrl } } leadLeader9Twitter leadLeader9TwitterIcon { node { sourceUrl } }
          leadAdvisoryTitle
          leadAdvisoryDescription
          leadAdvisoryBtnText leadAdvisoryBtnUrl
          leadAdvisor1Name leadAdvisor1Firm leadAdvisor1Region
          leadAdvisor2Name leadAdvisor2Firm leadAdvisor2Region
          leadAdvisor3Name leadAdvisor3Firm leadAdvisor3Region
          leadAdvisor4Name leadAdvisor4Firm leadAdvisor4Region
          leadAdvisor5Name leadAdvisor5Firm leadAdvisor5Region
          leadAdvisor6Name leadAdvisor6Firm leadAdvisor6Region
          leadCtaTitle
          leadCtaDescription
          leadCtaBtn1Text leadCtaBtn1Url
          leadCtaBtn2Text leadCtaBtn2Url
        }
    }
  }
`;

function transformLeadershipPageData(f: any) {
  const leaders = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => ({
    name:         f[`leadLeader${i}Name`] || "",
    role:         f[`leadLeader${i}Role`] || "",
    img:          imgUrl(f[`leadLeader${i}Img`]) || DEFAULT_LEADER_IMAGES[i - 1] || DEFAULT_LEADER_IMAGES[0],
    bio:          f[`leadLeader${i}Bio`]  || "",
    linkedin:     f[`leadLeader${i}Linkedin`] || "",
    linkedinIcon: imgUrl(f[`leadLeader${i}LinkedinIcon`]) || "",
    twitter:      f[`leadLeader${i}Twitter`] || "",
    twitterIcon:  imgUrl(f[`leadLeader${i}TwitterIcon`]) || "",
  })).filter(l => l.name);

  const advisors = [1, 2, 3, 4, 5, 6].map(i => ({
    name:   f[`leadAdvisor${i}Name`]   || "",
    firm:   f[`leadAdvisor${i}Firm`]   || "",
    region: f[`leadAdvisor${i}Region`] || "",
  })).filter(a => a.name);

  return {
    heroTagline:         f.leadHeroTagline         || "The Executive Bench",
    heroTitle:           f.leadHeroTitle           || "The ^Visionaries.",
    heroDescription:     f.leadHeroDescription     || "",
    heroBgImage:         imgUrl(f.leadHeroBgImage) || "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    leaders:             leaders.length > 0 ? leaders : undefined,
    advisoryTitle:       f.leadAdvisoryTitle       || "Board of |~Advisors.",
    advisoryDescription: f.leadAdvisoryDescription || "",
    advisoryBtnText:     f.leadAdvisoryBtnText     || "Engage with Us",
    advisoryBtnUrl:      f.leadAdvisoryBtnUrl      || "/contact",
    advisors:            advisors.length > 0 ? advisors : undefined,
    ctaTitle:            f.leadCtaTitle            || "Lead the Next |^Digital Frontier.",
    ctaDescription:      f.leadCtaDescription      || "",
    ctaBtn1Text:         f.leadCtaBtn1Text         || "Partner With Us",
    ctaBtn1Url:          f.leadCtaBtn1Url          || "/contact",
    ctaBtn2Text:         f.leadCtaBtn2Text         || "Executive Careers",
    ctaBtn2Url:          f.leadCtaBtn2Url          || "/careers",
  };
}

export async function getLeadershipPageData(uri: string = "/leadership/"): Promise<ReturnType<typeof transformLeadershipPageData> | null> {
  try {
    const raw = await fetchGraphQL(LEADERSHIP_PAGE_QUERY, { uri });
    const f = raw?.data?.pageBy?.leadershipPageFields;
    if (!f) return null;
    return transformLeadershipPageData(f);
  } catch (err) {
    console.warn("[WP] getLeadershipPageData() failed:", err);
    return null;
  }
}

// ─── Partnership Page ────────────────────────────────────────────────────────

const PARTNERSHIP_PAGE_QUERY = `
  query GetPartnershipPageData($uri: String!) {
    pageBy(uri: $uri) {
      partnershipPageFields {
          partHeroTagline
          partHeroTitle
          partHeroDescription
          partHeroBgImage { node { sourceUrl } }
          
          partIntroTitle
          partIntroDescription
          partIntroBullet1 partIntroBullet2 partIntroBullet3 partIntroBullet4
          partIntroImg { node { sourceUrl } }
          
          partCategoriesTitle
          partCategoriesDescription
          partCat1Title partCat1Desc partCat1Partners
          partCat2Title partCat2Desc partCat2Partners
          partCat3Title partCat3Desc partCat3Partners
          
          partMeetTitle
          partMeetDescription
          partMeetBtnText partMeetBtnUrl
          partMeetImg1 { node { sourceUrl } } partMeetAlt1
          partMeetImg2 { node { sourceUrl } } partMeetAlt2
          partMeetImg3 { node { sourceUrl } } partMeetAlt3
          partMeetImg4 { node { sourceUrl } } partMeetAlt4
          partMeetImg5 { node { sourceUrl } } partMeetAlt5
          partMeetImg6 { node { sourceUrl } } partMeetAlt6
          partMeetImg7 { node { sourceUrl } } partMeetAlt7
          partMeetImg8 { node { sourceUrl } } partMeetAlt8
          partMeetImg9 { node { sourceUrl } } partMeetAlt9
          
          partLogo1Name partLogo1Img { node { sourceUrl } }
          partLogo2Name partLogo2Img { node { sourceUrl } }
          partLogo3Name partLogo3Img { node { sourceUrl } }
          partLogo4Name partLogo4Img { node { sourceUrl } }
          partLogo5Name partLogo5Img { node { sourceUrl } }
          partLogo6Name partLogo6Img { node { sourceUrl } }
          partLogo7Name partLogo7Img { node { sourceUrl } }
          partLogo8Name partLogo8Img { node { sourceUrl } }
          partLogo9Name partLogo9Img { node { sourceUrl } }
          partLogo10Name partLogo10Img { node { sourceUrl } }
          partLogo11Name partLogo11Img { node { sourceUrl } }
          partLogo12Name partLogo12Img { node { sourceUrl } }
          partLogo13Name partLogo13Img { node { sourceUrl } }
          partLogo14Name partLogo14Img { node { sourceUrl } }
          partLogo15Name partLogo15Img { node { sourceUrl } }
          partLogo16Name partLogo16Img { node { sourceUrl } }
          
          partBenTitle
          partBenImg { node { sourceUrl } }
          partBen1Title partBen1Desc
          partBen2Title partBen2Desc
          partBen3Title partBen3Desc
          partBen4Title partBen4Desc
          
          partCtaTitle
          partCtaDescription
          partCtaEmail
        }
    }
  }
`;

function transformPartnershipPageData(f: any) {
  const introBullets = [1, 2, 3, 4].map(i => f[`partIntroBullet${i}`] || "").filter(Boolean);
  
  const categories = [1, 2, 3].map(i => ({
    title:    f[`partCat${i}Title`] || "",
    desc:     f[`partCat${i}Desc`] || "",
    partners: f[`partCat${i}Partners`] || ""
  })).filter(c => c.title);

  const meetImages = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => ({
    src: imgUrl(f[`partMeetImg${i}`]) || DEFAULT_PARTNER_MEET_IMAGES[i - 1] || "",
    alt: f[`partMeetAlt${i}`] || ""
  })).filter(m => m.src);

  const logos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(i => {
    const name = f[`partLogo${i}Name`] || "";
    const logo = imgUrl(f[`partLogo${i}Img`]);
    return {
      name,
      logo: logo || (name ? DEFAULT_PARTNER_LOGOS[i - 1] || DEFAULT_PARTNER_LOGOS[0] : "")
    };
  }).filter(l => l.name || l.logo);

  const benefits = [1, 2, 3, 4].map(i => ({
    title: f[`partBen${i}Title`] || "",
    desc:  f[`partBen${i}Desc`] || ""
  })).filter(b => b.title);

  return {
    heroTagline:    f.partHeroTagline || "Ecosystem of Excellence",
    heroTitle:      f.partHeroTitle || "Strategic |Technology ^Alliances.",
    heroDescription:f.partHeroDescription || "",
    heroBgImage:    imgUrl(f.partHeroBgImage) || "https://images.unsplash.com/photo-1591453214154-c95db71dbd83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
    
    introTitle:       f.partIntroTitle || "Architecting |Shared ^Success.",
    introDescription: f.partIntroDescription || "",
    introBullets:     introBullets.length > 0 ? introBullets : undefined,
    introImage:       imgUrl(f.partIntroImg) || "https://images.unsplash.com/photo-1610702876884-0f8473590287?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    
    categoriesTitle:  f.partCategoriesTitle || "Partner Ecosystem",
    categoriesDescription: f.partCategoriesDescription || "",
    categories:       categories.length > 0 ? categories : undefined,
    
    meetTitle:        f.partMeetTitle || "Meet Our Partners",
    meetDescription:  f.partMeetDescription || "",
    meetBtnText:      f.partMeetBtnText || "Find What You Need",
    meetBtnUrl:       f.partMeetBtnUrl || "/services",
    meetImages:       meetImages.length > 0 ? meetImages : undefined,
    
    logos:            logos.length > 0 ? logos : undefined,
    
    benefitsTitle:    f.partBenTitle || "Value of |^Association.",
    benefitsImage:    imgUrl(f.partBenImg) || "https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    benefits:         benefits.length > 0 ? benefits : undefined,
    
    ctaTitle:         f.partCtaTitle || "Become a |^Strategic Partner.",
    ctaDescription:   f.partCtaDescription || "",
    ctaEmail:         f.partCtaEmail || "alliances@hutechsolutions.com",
  };
}

export async function getPartnershipPageData(uri: string = "/partnership/"): Promise<ReturnType<typeof transformPartnershipPageData> | null> {
  try {
    const raw = await fetchGraphQL(PARTNERSHIP_PAGE_QUERY, { uri });
    const f = raw?.data?.pageBy?.partnershipPageFields;
    if (!f) return null;
    return transformPartnershipPageData(f);
  } catch (err) {
    console.warn(`[WP] getPartnershipPageData(${uri}) failed:`, err);
    return null;
  }
}

// ─── Contact Us Page ────────────────────────────────────────────────────────

const CONTACT_PAGE_QUERY = `
  query GetContactPageData {
    pages(where: { title: "Contact" }) {
      nodes {
        contactPageFields {
          contactHeroTagline
          contactHeroTitle
          contactHeroDescription
          contactHeroBgImage { node { sourceUrl } }
          
          contactFormTitle
          contactFormDescription
          
          contactDirectTitle
          contactEmail
          contactPhone
          
          contactSocialTitle
          contactSocialLinkedin
          contactSocialInstagram
          contactSocialFacebook
          contactSocialTwitter
          contactSocialYoutube
          
          contactSupportLabel
          contactSupportDescription
          contactSupportBtnText
          contactSupportBtnUrl
          
          contactOfficesTitle
          contactOfficesDescription
          
          contactOffice1City contactOffice1Country contactOffice1Phone contactOffice1Address contactOffice1Img { node { sourceUrl } }
          contactOffice2City contactOffice2Country contactOffice2Phone contactOffice2Address contactOffice2Img { node { sourceUrl } }
          contactOffice3City contactOffice3Country contactOffice3Phone contactOffice3Address contactOffice3Img { node { sourceUrl } }
          contactOffice4City contactOffice4Country contactOffice4Phone contactOffice4Address contactOffice4Img { node { sourceUrl } }
          contactOffice5City contactOffice5Country contactOffice5Phone contactOffice5Address contactOffice5Img { node { sourceUrl } }
          contactOffice6City contactOffice6Country contactOffice6Phone contactOffice6Address contactOffice6Img { node { sourceUrl } }
          
          contactMapTitle
          contactMapDescription
          contactMapBgImage { node { sourceUrl } }
          
          contactTrust1Title contactTrust1Sub
          contactTrust2Title contactTrust2Sub
          contactTrust3Title contactTrust3Sub
        }
      }
    }
  }
`;

function transformContactPageData(f: any) {
  const offices = [1, 2, 3, 4, 5, 6].map(i => ({
    city: f[`contactOffice${i}City`] || "",
    country: f[`contactOffice${i}Country`] || "",
    phone: f[`contactOffice${i}Phone`] || "",
    address: f[`contactOffice${i}Address`] || "",
    image: imgUrl(f[`contactOffice${i}Img`]) || DEFAULT_CONTACT_OFFICE_IMAGES[i - 1] || DEFAULT_CONTACT_OFFICE_IMAGES[0]
  })).filter(o => o.city);

  const trustBuilders = [1, 2, 3].map(i => ({
    title: f[`contactTrust${i}Title`] || "",
    sub: f[`contactTrust${i}Sub`] || ""
  })).filter(t => t.title);

  return {
    heroTagline: f.contactHeroTagline || "Get in Touch",
    heroTitle: f.contactHeroTitle || "Let's Engineer Your |Next ^Success.",
    heroDescription: f.contactHeroDescription || "",
    heroBgImage: imgUrl(f.contactHeroBgImage) || "https://images.unsplash.com/photo-1771964427867-1b734fc7f5a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",

    formTitle: f.contactFormTitle || "Send a Message",
    formDescription: f.contactFormDescription || "",

    directTitle: f.contactDirectTitle || "Direct Contact",
    email: f.contactEmail || "sales@hutechsolutions.com",
    phone: f.contactPhone || "+91 90351 80487",

    socialTitle: f.contactSocialTitle || "Social Connect",
    socialLinkedin: f.contactSocialLinkedin || "",
    socialInstagram: f.contactSocialInstagram || "",
    socialFacebook: f.contactSocialFacebook || "",
    socialTwitter: f.contactSocialTwitter || "",
    socialYoutube: f.contactSocialYoutube || "",

    supportLabel: f.contactSupportLabel || "Customer Support",
    supportDescription: f.contactSupportDescription || "",
    supportBtnText: f.contactSupportBtnText || "Support Portal",
    supportBtnUrl: (() => {
      const raw = f.contactSupportBtnUrl;
      if (!raw) return "";
      // If already an absolute URL, hash, or root-relative path, use as-is
      if (raw.startsWith("http") || raw.startsWith("//") || raw.startsWith("/") || raw.startsWith("#")) return raw;
      // Otherwise it's a bare slug like "contact" — prepend slash
      return `/${raw}`;
    })(),

    officesTitle: f.contactOfficesTitle || "Our Offices",
    officesDescription: f.contactOfficesDescription || "",
    offices: offices.length > 0 ? offices : undefined,

    mapTitle: f.contactMapTitle || "Worldwide Delivery.",
    mapDescription: f.contactMapDescription || "",
    mapBgImage: imgUrl(f.contactMapBgImage) || "https://images.unsplash.com/photo-1731700128691-16fcc9043d11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",

    trustBuilders: trustBuilders.length > 0 ? trustBuilders : undefined,
  };
}

export async function getContactPageData(): Promise<ReturnType<typeof transformContactPageData> | null> {
  try {
    const raw = await fetchGraphQL(CONTACT_PAGE_QUERY);
    const f = raw?.data?.pages?.nodes?.[0]?.contactPageFields;
    if (!f) return null;
    return transformContactPageData(f);
  } catch (err) {
    console.warn("[WP] getContactPageData() failed:", err);
    return null;
  }
}

// ─── Hutech Documents ──────────────────────────────────────────────────────────

const DOCUMENTS_PAGE_QUERY = `
  query GetHutechDocumentsPage {
    pages(where: {title: "Hutech Documents"}) {
      nodes {
        documentPageFields {
          docPageHeroTagline
          docPageHeroTitle
          docPageHeroDesc
          docPageCtaTitle
          docPageCtaDesc
          docPageCtaBtnText
          docPageCtaBtnUrl
        }
      }
    }
  }
`;

const DOCUMENTS_LIST_QUERY = `
  query GetHutechDocuments {
    hutechDocuments(first: 100) {
      nodes {
        title
        date
        documentCategories {
          nodes {
            name
          }
        }
        documentPostFields {
          documentFile {
            node {
              mediaItemUrl
              mimeType
              fileSize
            }
          }
          documentUrl
        }
      }
    }
  }
`;

export interface HutechDocument {
  id: string;
  title: string;
  date: string;
  category: string;
  fileUrl?: string;
  externalUrl?: string;
  mimeType?: string;
  sizeText?: string;
}

function formatBytes(bytes: number, decimals = 1) {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export async function getDocumentPageData() {
  try {
    const raw = await fetchGraphQL(DOCUMENTS_PAGE_QUERY);
    const f = raw?.data?.pages?.nodes?.[0]?.documentPageFields;
    if (!f) return null;
    return {
      heroTagline: f.docPageHeroTagline || "Resource Library",
      heroTitle: f.docPageHeroTitle || "Hutech Documents.",
      heroDesc: f.docPageHeroDesc || "Access official publications, corporate reports, and technical whitepapers.",
      ctaTitle: f.docPageCtaTitle || "Need custom documentation?",
      ctaDesc: f.docPageCtaDesc || "Our specialized teams can provide tailored technical whitepapers and architecture documentation for your enterprise needs.",
      ctaBtnText: f.docPageCtaBtnText || "REQUEST ACCESS",
      ctaBtnUrl: f.docPageCtaBtnUrl || "/contact",
    };
  } catch (err) {
    console.warn("[WP] getDocumentPageData failed:", err);
    return null;
  }
}

export async function getHutechDocuments(): Promise<HutechDocument[]> {
  try {
    const raw = await fetchGraphQL(DOCUMENTS_LIST_QUERY);
    const nodes = raw?.data?.hutechDocuments?.nodes || [];
    return nodes.map((node: any, idx: number) => {
      const f = node.documentPostFields || {};
      const fileNode = f.documentFile?.node;
      
      const computedSize = fileNode?.fileSize ? formatBytes(fileNode.fileSize) : undefined;
      
      return {
        id: `doc-${idx}`,
        title: node.title,
        date: new Date(node.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        category: node.documentCategories?.nodes?.[0]?.name || "Uncategorized",
        fileUrl: fileNode?.mediaItemUrl || undefined,
        mimeType: fileNode?.mimeType || undefined,
        externalUrl: f.documentUrl || undefined,
        sizeText: computedSize,
      };
    });
  } catch (err) {
    console.warn("[WP] getHutechDocuments failed:", err);
    return [];
  }
}

// ==========================================
// CAREERS (hutech_career)
// ==========================================

const CAREERS_PAGE_QUERY = `
  query GetCareersPageData {
    pages(where: {title: "Careers"}) {
      nodes {
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        careerPageFields {
          careerPageHeroTagline
          careerPageHeroTitle
          careerPageHeroDesc
          careerOpeningsTagline
          careerOpeningsTitle
          careerOpeningsNoJobsTitle
          careerOpeningsNoJobsDesc
          careerOpeningsGenBtn
          careerCultureTagline
          careerCultureTitle
          careerCultureDesc
          careerCultureImg {
            node {
              mediaItemUrl
            }
          }
          careerCultureStat1Val
          careerCultureStat1Label
          careerCultureStat2Val
          careerCultureStat2Label
          careerCultureBadge1
          careerCultureBadge2
          careerHiringTagline
          careerHiringDesc
          careerHiringStep1Num
          careerHiringStep1Title
          careerHiringStep1Desc
          careerHiringStep2Num
          careerHiringStep2Title
          careerHiringStep2Desc
          careerHiringStep3Num
          careerHiringStep3Title
          careerHiringStep3Desc
          careerHiringStep4Num
          careerHiringStep4Title
          careerHiringStep4Desc
          careerHiringStep5Num
          careerHiringStep5Title
          careerHiringStep5Desc
          careerBenefitsTagline
          careerBenefitsTitle
          careerBenefitsDesc
          careerBenefitsMainTitle
          careerBenefitsMainDesc
          careerBenefit1Title
          careerBenefit1Desc
          careerBenefit2Title
          careerBenefit2Desc
          careerBenefit3Title
          careerBenefit3Desc
          careerBenefit4Title
          careerBenefit4Desc
          careerBenefit5Title
          careerBenefit5Desc
          careerBenefit6Title
          careerBenefit6Desc
          careerInternshipTagline
          careerInternshipTitle
          careerInternshipDesc
          careerInternshipImg {
            node {
              mediaItemUrl
            }
          }
          careerInternshipBadge1
          careerInternshipBadge2
          careerInternshipBtn1
          careerInternshipBtn1Link
          careerInternshipBtn2
          careerInternshipBtn2File {
            node {
              mediaItemUrl
            }
          }
          careerProgram1Title
          careerProgram1Duration
          careerProgram2Title
          careerProgram2Duration
          careerProgram3Title
          careerProgram3Duration
          careerProgram4Title
          careerProgram4Duration
          careerWhyTagline
          careerWhyTitle
          careerWhyPoint1Num
          careerWhyPoint1Title
          careerWhyPoint2Num
          careerWhyPoint2Title
          careerWhyPoint3Num
          careerWhyPoint3Title
          careerWhyPoint4Num
          careerWhyPoint4Title
          careerWhyPoint5Num
          careerWhyPoint5Title
          careerWhyPoint6Num
          careerWhyPoint6Title
          careerCtaTitle
          careerCtaDesc
          careerCtaCard1Title
          careerCtaCard1Desc
          careerCtaCard2Title
          careerCtaCard2Desc
        }
      }
    }
  }
`;

const CAREERS_LIST_QUERY = `
  query GetCareers {
    hutechCareers(first: 100) {
      nodes {
        slug
        title
        careerDepartments {
          nodes {
            name
          }
        }
        careerTags {
          nodes {
            name
          }
        }
        careerDetails {
          careerLocation
          careerType
        }
      }
    }
  }
`;

const CAREER_DETAIL_QUERY = `
  query GetCareerBySlug($id: ID!) {
    hutechCareer(id: $id, idType: SLUG) {
      slug
      title
      careerDepartments {
        nodes {
          name
        }
      }
      careerTags {
        nodes {
          name
        }
      }
      careerDetails {
        careerLocation
        careerType
        careerDescription
        careerWhatYoullDo
        careerRequirements
        careerSuperpowers
        careerBenefits
      }
    }
  }
`;

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  tags: string[];
  desc: string;
  roleOverviewTitle: string;
  whatYoullDo: string[];
  whatYoullDoTitle: string;
  requirements: string[];
  requirementsTitle: string;
  superpowers: string[];
  superpowersTitle: string;
  benefits: string[];
  benefitsTitle: string;
  hiringTimelineTitle: string;
  hiringTimelineText: string;
  aboutTitle: string;
  aboutText: string;
}

export async function getCareerPageData() {
  try {
    const raw = await fetchGraphQL(CAREERS_PAGE_QUERY);
    const node = raw?.data?.pages?.nodes?.[0];
    const f = node?.careerPageFields;
    const heroBgImg = imgUrl(node?.featuredImage) || "https://images.unsplash.com/photo-1760611656615-db3fad24a314?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920";
    if (!f) return null;
    return {
      heroBgImg,
      heroTagline: f.careerPageHeroTagline || "Join our Talent Ecosystem",
      heroTitle: f.careerPageHeroTitle || "Build your ^Legacy. with us.",
      heroDesc: f.careerPageHeroDesc || "Recruiting pioneers to solve complex engineering puzzles and architect the future.",
      openingsTagline: f.careerOpeningsTagline || "Open Opportunities",
      openingsTitle: f.careerOpeningsTitle || "Join the \n Excellence Hub.",
      openingsNoJobsTitle: f.careerOpeningsNoJobsTitle || "No relevant opening for your skill set?",
      openingsNoJobsDesc: f.careerOpeningsNoJobsDesc || "We're always looking for exceptional talent. Drop your resume in our talent pool.",
      openingsGenBtn: f.careerOpeningsGenBtn || "General Application",
      cultureTagline: f.careerCultureTagline || "The Hutech Spirit",
      cultureTitle: f.careerCultureTitle || "Innovation is \n our ^North Star.",
      cultureDesc: f.careerCultureDesc || "We foster a culture of radical transparency and extreme ownership. Here, your ideas aren't just heard—they are engineered into reality. We believe in high-performance agility balanced with empathy.",
      cultureImg: imgUrl(f.careerCultureImg) || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80",
      cultureStat1Val: f.careerCultureStat1Val || "92%",
      cultureStat1Label: f.careerCultureStat1Label || "Engineering Ratio",
      cultureStat2Val: f.careerCultureStat2Val || "15+",
      cultureStat2Label: f.careerCultureStat2Label || "Global Tech Hubs",
      cultureBadge1: f.careerCultureBadge1 || "Great Place",
      cultureBadge2: f.careerCultureBadge2 || "To Work Certified",
      hiringTagline: f.careerHiringTagline || "Our Selection DNA",
      hiringDesc: f.careerHiringDesc || "We look for clarity of thought, passion for problem-solving, and a commitment to excellence.",
      hiringSteps: [
        { stepNumber: f.careerHiringStep1Num || "01", stepTitle: f.careerHiringStep1Title || "Application", stepDesc: f.careerHiringStep1Desc || "Submit your profile." },
        { stepNumber: f.careerHiringStep2Num || "02", stepTitle: f.careerHiringStep2Title || "Screening", stepDesc: f.careerHiringStep2Desc || "Initial HR screening." },
        { stepNumber: f.careerHiringStep3Num || "03", stepTitle: f.careerHiringStep3Title || "Technical", stepDesc: f.careerHiringStep3Desc || "Technical interview." },
        { stepNumber: f.careerHiringStep4Num || "04", stepTitle: f.careerHiringStep4Title || "Culture Fit", stepDesc: f.careerHiringStep4Desc || "Meeting the team." },
        { stepNumber: f.careerHiringStep5Num || "05", stepTitle: f.careerHiringStep5Title || "Offer", stepDesc: f.careerHiringStep5Desc || "Welcome aboard!" },
      ].filter(s => s.stepTitle),
      benefitsTagline: f.careerBenefitsTagline || "Perks & Benefits",
      benefitsTitle: f.careerBenefitsTitle || "Investing \n in your \n ^Success.",
      benefitsDesc: f.careerBenefitsDesc || "We provide the resources, environment, and support you need to do the best work of your life.",
      benefitsMainTitle: f.careerBenefitsMainTitle || "Learning Budget",
      benefitsMainDesc: f.careerBenefitsMainDesc || "$5,000 annual allowance for certifications, conferences, and courses.",
      benefitsGrid: [
        { benefitTitle: f.careerBenefit1Title || "Premium Health", benefitDesc: f.careerBenefit1Desc || "Comprehensive insurance." },
        { benefitTitle: f.careerBenefit2Title || "Performance Bonus", benefitDesc: f.careerBenefit2Desc || "Quarterly rewards." },
        { benefitTitle: f.careerBenefit3Title || "Flexible Work", benefitDesc: f.careerBenefit3Desc || "Remote & Hybrid support." },
        { benefitTitle: f.careerBenefit4Title || "Time to Recharge", benefitDesc: f.careerBenefit4Desc || "Generous PTO." },
        { benefitTitle: f.careerBenefit5Title || "Modern Stack", benefitDesc: f.careerBenefit5Desc || "Access the latest tools." },
        { benefitTitle: f.careerBenefit6Title || "Global Mobility", benefitDesc: f.careerBenefit6Desc || "Transfer opportunities." },
      ].filter(b => b.benefitTitle),
      internshipTagline: f.careerInternshipTagline || "Internship Programme",
      internshipTitle: f.careerInternshipTitle || "Launch Your Career ^at Nabhira",
      internshipDesc: f.careerInternshipDesc || "The Nabhira Emerging Talent Programme is a structured 12-week immersion into enterprise technology...",
      internshipImg: imgUrl(f.careerInternshipImg) || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop",
      internshipBadge1: f.careerInternshipBadge1 || "Applications Open",
      internshipBadge2: f.careerInternshipBadge2 || "2026 Cohort",
      internshipBtn1: f.careerInternshipBtn1 || "Apply Now",
      internshipBtn1Link: f.careerInternshipBtn1Link || "#",
      internshipBtn2: f.careerInternshipBtn2 || "Download Brochure",
      internshipBtn2File: imgUrl(f.careerInternshipBtn2File) || "#",
      internshipPrograms: [
        { programTitle: f.careerProgram1Title || "AI & Data Engineering", programDuration: f.careerProgram1Duration || "12 Weeks" },
        { programTitle: f.careerProgram2Title || "Cloud Architecture", programDuration: f.careerProgram2Duration || "12 Weeks" },
        { programTitle: f.careerProgram3Title || "Digital Strategy", programDuration: f.careerProgram3Duration || "10 Weeks" },
        { programTitle: f.careerProgram4Title || "Product & UX Design", programDuration: f.careerProgram4Duration || "10 Weeks" },
      ].filter(p => p.programTitle),
      whyTagline: f.careerWhyTagline || "Career Advantage",
      whyTitle: f.careerWhyTitle || "Why Nabhira is ^Different",
      whyPoints: [
        { pointNumber: f.careerWhyPoint1Num || "01", pointTitle: f.careerWhyPoint1Title || "Global Exposure" },
        { pointNumber: f.careerWhyPoint2Num || "02", pointTitle: f.careerWhyPoint2Title || "Accelerated Growth" },
        { pointNumber: f.careerWhyPoint3Num || "03", pointTitle: f.careerWhyPoint3Title || "World-Class Mentorship" },
        { pointNumber: f.careerWhyPoint4Num || "04", pointTitle: f.careerWhyPoint4Title || "Certified Excellence" },
        { pointNumber: f.careerWhyPoint5Num || "05", pointTitle: f.careerWhyPoint5Title || "Inclusive Culture" },
        { pointNumber: f.careerWhyPoint6Num || "06", pointTitle: f.careerWhyPoint6Title || "Innovation Time" },
      ].filter(p => p.pointTitle),
      ctaTitle: f.careerCtaTitle || "Your Next Chapter \n starts ^now.",
      ctaDesc: f.careerCtaDesc || "Join a global team of visionaries, engineers, and creatives working together to build a more agile and innovative future.",
      ctaCard1Title: f.careerCtaCard1Title || "Interview Ready?",
      ctaCard1Desc: f.careerCtaCard1Desc || "Get tips for success",
      ctaCard2Title: f.careerCtaCard2Title || "Fast-Track",
      ctaCard2Desc: f.careerCtaCard2Desc || "Hiring in 14 days",
    };
  } catch (err) {
    console.warn("[WP] getCareerPageData failed:", err);
    return null;
  }
}

function parseTextareaList(text?: string): string[] {
  if (!text) return [];
  return text.split('\n').map(line => line.trim()).filter(Boolean);
}

export async function getCareers(): Promise<Job[]> {
  try {
    const raw = await fetchGraphQL(CAREERS_LIST_QUERY);
    const nodes = raw?.data?.hutechCareers?.nodes || [];
    return nodes.map((node: any) => {
      const details = node.careerDetails || {};
      const dept = node.careerDepartments?.nodes?.[0]?.name || "Engineering";
      const tags = node.careerTags?.nodes?.map((t: any) => t.name) || [];

      return {
        id: node.slug,
        title: node.title,
        department: dept,
        location: details.careerLocation || "Bangalore, India",
        type: details.careerType || "Full-time",
        tags: tags,
        desc: "", // Not needed for the list
        whatYoullDo: [],
        requirements: [],
        superpowers: [],
        benefits: [],
      };
    });
  } catch (err) {
    console.warn("[WP] getCareers failed:", err);
    return [];
  }
}

export async function getCareerBySlug(slug: string): Promise<Job | null> {
  try {
    const raw = await fetchGraphQL(CAREER_DETAIL_QUERY, { id: slug });
    const node = raw?.data?.hutechCareer;
    if (!node) return null;

    const details = node.careerDetails || {};
    const dept = node.careerDepartments?.nodes?.[0]?.name || "Engineering";
    const tags = node.careerTags?.nodes?.map((t: any) => t.name) || [];

    const defaultBenefits = [
      "Health Insurance",
      "Provident Fund + Performance Bonus",
      "2 Special Leave Days (Just Because!)",
      "Maternity + Paternity Leave",
      "A chance to work on cutting-edge global tech with high-impact delivery",
      "A culture that celebrates code, creativity, and coffee",
    ];

    const benefitsParsed = parseTextareaList(details.careerBenefits);

    return {
      id: node.slug,
      title: node.title,
      department: dept,
      location: details.careerLocation || "Bangalore, India",
      type: details.careerType || "Full-time",
      tags: tags,
      desc: details.careerDescription || "",
      roleOverviewTitle: details.careerRoleOverviewTitle || "Role Overview",
      whatYoullDo: parseTextareaList(details.careerWhatYoullDo),
      whatYoullDoTitle: details.careerWhatYoullDoTitle || "What You'll Be ^Doing",
      requirements: parseTextareaList(details.careerRequirements),
      requirementsTitle: details.careerRequirementsTitle || "Tech Stack Matchmaker – ^Is This You?",
      superpowers: parseTextareaList(details.careerSuperpowers),
      superpowersTitle: details.careerSuperpowersTitle || "Your ^Superpowers:",
      benefits: benefitsParsed.length > 0 ? benefitsParsed : defaultBenefits,
      benefitsTitle: details.careerBenefitsTitle || "What's In It ^For You?",
      hiringTimelineTitle: details.careerHiringTimelineTitle || "Hiring Timeline",
      hiringTimelineText: details.careerHiringTimelineText || "This is an active opening. Our team typically responds to qualified applicants within 48-72 business hours.",
      aboutTitle: details.careerAboutTitle || "About ^Hutech Solutions",
      aboutText: details.careerAboutText || "Hutech Solutions is a global software powerhouse at the forefront of the AI revolution. As a leading innovator in Artificial Intelligence, Agentic AI, and Deep Learning technologies, we design and deliver next-generation solutions that empower businesses to unlock transformative intelligence and automation.\n\nWe are actively partnering with large enterprises and business houses to reimagine and transform enterprise software applications. Our mission is to develop innovative software utilities that accelerate business performance by leveraging cutting-edge AI and Generative AI tools and techniques.\n\nFrom streamlining operations in logistics, enhancing customer experiences in eCommerce, to driving intelligent automation in the BFSI sector, Hutech Solutions is a trusted force in modern digital transformation.",
    };
  } catch (err) {
    console.warn("[WP] getCareerBySlug failed:", err);
    return null;
  }
}

// ==========================================
// PRESS RELEASE PAGE & POST TYPE
// ==========================================

const PRESS_RELEASE_PAGE_QUERY = `
  query GetPressReleasePageData {
    pages(where: { name: "press-release" }) {
      nodes {
        pressReleasePageFields {
          pressReleaseHeroTagline
          pressReleaseHeroTitle
          pressReleaseHeroDescription
          pressReleaseHeroBgImage {
            node {
              mediaItemUrl
            }
          }
        }
      }
    }
  }
`;

const PRESS_RELEASES_LIST_QUERY = `
  query GetPressReleases {
    hutechPressReleases(first: 100) {
      nodes {
        title
        date
        pressReleaseFields {
          pressReleaseDate
          pressReleaseExternalUrl
        }
      }
    }
  }
`;

export interface PressReleaseItem {
  title: string;
  date: string;
  externalUrl?: string;
}

export async function getPressReleasePageData() {
  try {
    const raw = await fetchGraphQL(PRESS_RELEASE_PAGE_QUERY);
    const node = raw?.data?.pages?.nodes?.[0];
    const f = node?.pressReleasePageFields;
    if (!f) return null;
    return {
      heroTagline: f.pressReleaseHeroTagline || undefined,
      heroTitle: f.pressReleaseHeroTitle || undefined,
      heroDescription: f.pressReleaseHeroDescription || undefined,
      heroBgImage: imgUrl(f.pressReleaseHeroBgImage) || undefined,
    };
  } catch (err) {
    console.warn("[WP] getPressReleasePageData failed:", err);
    return null;
  }
}

export async function getPressReleases(): Promise<PressReleaseItem[]> {
  try {
    const raw = await fetchGraphQL(PRESS_RELEASES_LIST_QUERY);
    const nodes = raw?.data?.hutechPressReleases?.nodes || [];
    return nodes.map((node: any) => {
      const f = node.pressReleaseFields || {};
      
      const dateVal = f.pressReleaseDate || node.date;
      let formattedDate = "";
      try {
        if (dateVal) {
          formattedDate = new Date(dateVal).toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
          });
        }
      } catch (e) {
        formattedDate = dateVal || "";
      }

      return {
        title: node.title,
        date: formattedDate,
        externalUrl: f.pressReleaseExternalUrl || undefined,
      };
    });
  } catch (err) {
    console.warn("[WP] getPressReleases failed:", err);
    return [];
  }
}

// ==========================================
// NEWS PAGE & POST TYPE
// ==========================================

const NEWS_PAGE_QUERY = `
  query GetNewsPageData {
    pages(where: { name: "news" }) {
      nodes {
        newsPageFields {
          newsHeroTagline
          newsHeroTitle
          newsHeroDescription
          newsHeroBgImage {
            node {
              mediaItemUrl
            }
          }
          newsCtaTitle
          newsCtaDescription
          newsCtaBtnText
          newsCtaBtnUrl
        }
      }
    }
  }
`;

const NEWS_LIST_QUERY = `
  query GetNewsItems {
    hutechNewsItems(first: 100) {
      nodes {
        slug
        title
        date
        content(format: RENDERED)
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        newsCategories {
          nodes {
            name
          }
        }
        newsTags {
          nodes {
            name
          }
        }
        newsFields {
          newsDate
          newsAuthor
          newsRole
          newsSource
        }
      }
    }
  }
`;

const NEWS_DETAIL_QUERY = `
  query GetNewsBySlug($slug: ID!) {
    hutechNews(id: $slug, idType: SLUG) {
      slug
      title
      date
      content(format: RENDERED)
      featuredImage {
        node {
          mediaItemUrl
        }
      }
      newsCategories {
        nodes {
          name
        }
      }
      newsTags {
        nodes {
          name
        }
      }
      newsFields {
        newsDate
        newsAuthor
        newsRole
        newsSource
      }
    }
  }
`;

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  desc?: string;
  author: string;
  role: string;
  source?: string;
  image?: string;
  contentHtml?: string;
  tags: string[];
}
function transformNewsNode(node: any): NewsItem {
  const f = node.newsFields || {};
  
  const dateVal = f.newsDate || node.date;
  let formattedDate = "";
  try {
    if (dateVal) {
      formattedDate = new Date(dateVal).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      });
    }
  } catch (e) {
    formattedDate = dateVal || "";
  }

  const category = node.newsCategories?.nodes?.[0]?.name || node.categories?.nodes?.[0]?.name || "Corporate";
  const tags = node.newsTags?.nodes?.map((t: any) => t.name) || node.tags?.nodes?.map((t: any) => t.name) || ["News"];

  const rawContent = node.content || "";
  let desc = "";
  if (rawContent) {
    desc = rawContent.replace(/<[^>]*>/g, '').trim().substring(0, 160) + "...";
  }

  const readTime = estimateReadTime(rawContent);

  return {
    id: node.slug,
    title: node.title,
    date: formattedDate,
    category,
    readTime,
    desc: desc || undefined,
    author: f.newsAuthor || "",
    role: f.newsRole || "",
    source: f.newsSource || f.newsAuthor || "",
    image: imgUrl(node.featuredImage) || undefined,
    contentHtml: rawContent || undefined,
    tags: tags.length > 0 ? tags : ["News"],
  };
}

export async function getNewsItems(): Promise<NewsItem[]> {
  try {
    const raw = await fetchGraphQL(NEWS_LIST_QUERY);
    const nodes = raw?.data?.hutechNewsItems?.nodes || [];
    return nodes.map(transformNewsNode);
  } catch (err) {
    console.warn("[WP] getNewsItems failed:", err);
    return [];
  }
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  try {
    const raw = await fetchGraphQL(NEWS_DETAIL_QUERY, { slug });
    const node = raw?.data?.hutechNews;
    if (!node) return null;
    return transformNewsNode(node);
  } catch (err) {
    console.warn("[WP] getNewsBySlug failed:", err);
    return null;
  }
}

export async function getNewsPageData() {
  try {
    const raw = await fetchGraphQL(NEWS_PAGE_QUERY);
    const node = raw?.data?.pages?.nodes?.[0];
    const f = node?.newsPageFields;
    if (!f) return null;
    return {
      heroTagline: f.newsHeroTagline || undefined,
      heroTitle: f.newsHeroTitle || undefined,
      heroDescription: f.newsHeroDescription || undefined,
      heroBgImage: imgUrl(f.newsHeroBgImage) || undefined,
      ctaTitle: f.newsCtaTitle || undefined,
      ctaDescription: f.newsCtaDescription || undefined,
      ctaBtnText: f.newsCtaBtnText || undefined,
      ctaBtnUrl: f.newsCtaBtnUrl || undefined,
    };
  } catch (err) {
    console.warn("[WP] getNewsPageData failed:", err);
    return null;
  }
}


// ─── Service Custom Post Type GraphQL ──────────────────────────────────────────

export interface HutechService {
  id: string;
  slug: string;
  title: string;
  heroTagline?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroBgImage?: string;
  
  introHeading?: string;
  introText1?: string;
  introText2?: string;
  introImage?: string;
  introImageTitle?: string;
  introImageIcon?: string;
  introImageDesc?: string;
  stats?: { label: string; value: string }[];
  
  servicesSectionTitle?: string;
  servicesSectionDesc?: string;
  services?: { title: string; description: string; btnname: string; btnurl: string }[];
  
  solutionsSectionTitle?: string;
  solutionsSectionDesc?: string;
  solutions?: { title: string; description: string; btnname: string; btnurl: string }[];
  
  innovationsSectionTitle?: string;
  innovationsSectionDesc?: string;
  innovations?: { title: string; description: string; btnname: string; btnurl: string }[];
  
  ctaTitle?: string;
  ctaDescription?: string;
  ctaBtnName?: string;
  ctaBtnUrl?: string;
  ctaImage?: string;
  
  techStackTagline?: string;
  techStackTitle?: string;
  techStackDesc?: string;
  techStack?: { name: string; cat: string }[];
  
  whyChooseSectionTitle?: string;
  whyChooseSectionDesc?: string;
  whyChoose?: { title: string; description: string }[];
  
  contactFormTitle?: string;
  contactFormBtnName?: string;
  nextStepSectionTitle?: string;
  nextSteps?: { title: string }[];
  
  faqSectionTitle?: string;
  faqs?: { question: string; answer: string }[];
  
  blogSectionTitle?: string;
  blogSectionDesc?: string;
  blogLinkName?: string;
  blogLinkUrl?: string;
  blogCategory?: string;
  blogCategorySlug?: string;
}

const SERVICES_LIST_QUERY = `
  query GetAllServices {
    hutechServices(first: 100) {
      nodes {
        slug
      }
    }
  }
`;

const SERVICE_BY_SLUG_QUERY = `
  query GetServiceBySlug($slug: ID!) {
    hutechService(id: $slug, idType: SLUG) {
      id
      slug
      title
      serviceFields {
        heroTagline
        heroTitle
        heroDescription
        heroBgImage { node { sourceUrl } }
        
        introHeading
        introText1
        introText2
        introImage { node { sourceUrl } }
        introImageTitle
        introImageDesc
        
        stat1Value
        stat1Label
        stat2Value
        stat2Label
        stat3Value
        stat3Label
        
        servicesSectionTitle
        servicesSectionDesc
        service1Title
        service1Description
        service1BtnName
        service1BtnUrl { url title target }
        service2Title
        service2Description
        service2BtnName
        service2BtnUrl { url title target }
        service3Title
        service3Description
        service3BtnName
        service3BtnUrl { url title target }
        service4Title
        service4Description
        service4BtnName
        service4BtnUrl { url title target }
        service5Title
        service5Description
        service5BtnName
        service5BtnUrl { url title target }
        service6Title
        service6Description
        service6BtnName
        service6BtnUrl { url title target }
        service7Title
        service7Description
        service7BtnName
        service7BtnUrl { url title target }
        service8Title
        service8Description
        service8BtnName
        service8BtnUrl { url title target }
        service9Title
        service9Description
        service9BtnName
        service9BtnUrl { url title target }
        service10Title
        service10Description
        service10BtnName
        service10BtnUrl { url title target }
        
        solutionsSectionTitle
        solutionsSectionDesc
        solution1Title
        solution1Description
        solution1BtnName
        solution1BtnUrl { url title target }
        solution2Title
        solution2Description
        solution2BtnName
        solution2BtnUrl { url title target }
        solution3Title
        solution3Description
        solution3BtnName
        solution3BtnUrl { url title target }
        solution4Title
        solution4Description
        solution4BtnName
        solution4BtnUrl { url title target }
        solution5Title
        solution5Description
        solution5BtnName
        solution5BtnUrl { url title target }
        solution6Title
        solution6Description
        solution6BtnName
        solution6BtnUrl { url title target }
        solution7Title
        solution7Description
        solution7BtnName
        solution7BtnUrl { url title target }
        solution8Title
        solution8Description
        solution8BtnName
        solution8BtnUrl { url title target }
        solution9Title
        solution9Description
        solution9BtnName
        solution9BtnUrl { url title target }
        solution10Title
        solution10Description
        solution10BtnName
        solution10BtnUrl { url title target }
        
        innovationsSectionTitle
        innovationsSectionDesc
        innovation1Title
        innovation1Description
        innovation1BtnName
        innovation1BtnUrl { url title target }
        innovation2Title
        innovation2Description
        innovation2BtnName
        innovation2BtnUrl { url title target }
        innovation3Title
        innovation3Description
        innovation3BtnName
        innovation3BtnUrl { url title target }
        innovation4Title
        innovation4Description
        innovation4BtnName
        innovation4BtnUrl { url title target }
        innovation5Title
        innovation5Description
        innovation5BtnName
        innovation5BtnUrl { url title target }
        innovation6Title
        innovation6Description
        innovation6BtnName
        innovation6BtnUrl { url title target }
        innovation7Title
        innovation7Description
        innovation7BtnName
        innovation7BtnUrl { url title target }
        innovation8Title
        innovation8Description
        innovation8BtnName
        innovation8BtnUrl { url title target }
        innovation9Title
        innovation9Description
        innovation9BtnName
        innovation9BtnUrl { url title target }
        innovation10Title
        innovation10Description
        innovation10BtnName
        innovation10BtnUrl { url title target }
        
        ctaTitle
        ctaDescription
        ctaBtnName
        ctaBtnUrl { url title target }
        ctaImage { node { sourceUrl } }
        
        techStackTagline
        techStackTitle
        techStackDesc
        techStack1Name
        techStack1Cat
        techStack2Name
        techStack2Cat
        techStack3Name
        techStack3Cat
        techStack4Name
        techStack4Cat
        techStack5Name
        techStack5Cat
        techStack6Name
        techStack6Cat
        techStack7Name
        techStack7Cat
        techStack8Name
        techStack8Cat
        techStack9Name
        techStack9Cat
        techStack10Name
        techStack10Cat
        techStack11Name
        techStack11Cat
        techStack12Name
        techStack12Cat
        techStack13Name
        techStack13Cat
        techStack14Name
        techStack14Cat
        techStack15Name
        techStack15Cat
        
        whyChooseSectionTitle
        whyChooseSectionDesc
        whyChoose1Title
        whyChoose1Description
        whyChoose2Title
        whyChoose2Description
        whyChoose3Title
        whyChoose3Description
        whyChoose4Title
        whyChoose4Description
        whyChoose5Title
        whyChoose5Description
        whyChoose6Title
        whyChoose6Description
        whyChoose7Title
        whyChoose7Description
        whyChoose8Title
        whyChoose8Description
        
        contactFormTitle
        contactFormBtnName
        nextStepSectionTitle
        nextStep1Title
        nextStep2Title
        nextStep3Title
        nextStep4Title
        nextStep5Title
        
        faqSectionTitle
        faq1Question
        faq1Answer
        faq2Question
        faq2Answer
        faq3Question
        faq3Answer
        faq4Question
        faq4Answer
        faq5Question
        faq5Answer
        faq6Question
        faq6Answer
        faq7Question
        faq7Answer
        faq8Question
        faq8Answer
        faq9Question
        faq9Answer
        faq10Question
        faq10Answer
        
        blogSectionTitle
        blogSectionDesc
        blogLinkName
        blogLinkUrl { url title target }
        blogCategory {
          nodes {
            slug
            name
          }
        }
      }
    }
  }
`;

const BLOGS_BY_CATEGORY_QUERY = `
  query GetBlogsByCategory($categoryName: String!) {
    posts(first: 10, where: { orderby: { field: DATE, order: DESC }, categoryName: $categoryName }) {
      nodes {
        id
        slug
        title
        date
        excerpt(format: RENDERED)
        featuredImage {
          node {
            sourceUrl
          }
        }
        categories {
          nodes {
            name
          }
        }
        tags {
          nodes {
            name
          }
        }
        author {
          node {
            name
          }
        }
      }
    }
  }
`;


function transformServiceNode(node: any): HutechService {
  const f = node.serviceFields || {};

  const parseRepeater = (prefix: string, max: number, fields: string[]) => {
    const items = [];
    for (let i = 1; i <= max; i++) {
      let hasData = false;
      const item: any = {};
      for (const field of fields) {
        const val = f[`${prefix}${i}${field}`];
        if (val) hasData = true;
        let finalVal = val || "";
        if (typeof val === 'object' && val !== null) {
          if (val.node && val.node.sourceUrl) {
            finalVal = val.node.sourceUrl;
          } else if (val.url) {
            finalVal = val.url;
          }
        }
        item[field.toLowerCase()] = finalVal;
      }
      if (hasData) items.push(item);
    }
    return items;
  };

  const blogCatObj = f.blogCategory;
  const blogCatName =
    blogCatObj?.name ||
    blogCatObj?.nodes?.[0]?.name ||
    (typeof blogCatObj === "string" ? blogCatObj : "") ||
    "AI/ML";
  const blogCatSlug =
    blogCatObj?.slug ||
    blogCatObj?.nodes?.[0]?.slug ||
    (typeof blogCatObj === "string" ? blogCatObj.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "");

  return {
    id: node.id,
    slug: node.slug,
    title: node.title,
    heroTagline: f.heroTagline,
    heroTitle: f.heroTitle,
    heroDescription: f.heroDescription,
    heroBgImage: imgUrl(f.heroBgImage) || undefined,
    
    introHeading: f.introHeading,
    introText1: f.introText1,
    introText2: f.introText2,
    introImage: imgUrl(f.introImage) || undefined,
    introImageTitle: f.introImageTitle,
    introImageDesc: f.introImageDesc,
    stats: parseRepeater('stat', 3, ['Value', 'Label']),
    
    servicesSectionTitle: f.servicesSectionTitle,
    servicesSectionDesc: f.servicesSectionDesc,
    services: parseRepeater('service', 10, ['Title', 'Description', 'BtnName', 'BtnUrl']),
    
    solutionsSectionTitle: f.solutionsSectionTitle,
    solutionsSectionDesc: f.solutionsSectionDesc,
    solutions: parseRepeater('solution', 10, ['Title', 'Description', 'BtnName', 'BtnUrl']),
    
    innovationsSectionTitle: f.innovationsSectionTitle,
    innovationsSectionDesc: f.innovationsSectionDesc,
    innovations: parseRepeater('innovation', 10, ['Title', 'Description', 'BtnName', 'BtnUrl']),
    
    ctaTitle: f.ctaTitle,
    ctaDescription: f.ctaDescription,
    ctaBtnName: f.ctaBtnName,
    ctaBtnUrl: f.ctaBtnUrl?.url || (typeof f.ctaBtnUrl === 'string' ? f.ctaBtnUrl : ""),
    ctaImage: imgUrl(f.ctaImage) || undefined,
    
    techStackTagline: f.techStackTagline,
    techStackTitle: f.techStackTitle,
    techStackDesc: f.techStackDesc,
    techStack: parseRepeater('techStack', 15, ['Name', 'Cat']),
    
    whyChooseSectionTitle: f.whyChooseSectionTitle,
    whyChooseSectionDesc: f.whyChooseSectionDesc,
    whyChoose: parseRepeater('whyChoose', 8, ['Title', 'Description']),
    
    contactFormTitle: f.contactFormTitle,
    contactFormBtnName: f.contactFormBtnName,
    nextStepSectionTitle: f.nextStepSectionTitle,
    nextSteps: parseRepeater('nextStep', 5, ['Title']),
    
    faqSectionTitle: f.faqSectionTitle,
    faqs: parseRepeater('faq', 10, ['Question', 'Answer']),
    
    blogSectionTitle: f.blogSectionTitle,
    blogSectionDesc: f.blogSectionDesc,
    blogLinkName: f.blogLinkName,
    blogLinkUrl: f.blogLinkUrl?.url || (typeof f.blogLinkUrl === 'string' ? f.blogLinkUrl : ""),
    blogCategory: blogCatName,
    blogCategorySlug: blogCatSlug,
  };
}

export async function getServicesList(): Promise<{ slug: string }[]> {
  try {
    const raw = await fetchGraphQL(SERVICES_LIST_QUERY);
    const nodes = raw?.data?.hutechServices?.nodes || [];
    return nodes.map((n: any) => ({ slug: n.slug }));
  } catch (err) {
    console.warn("[WP] getServicesList failed:", err);
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<HutechService | null> {
  try {
    const raw = await fetchGraphQL(SERVICE_BY_SLUG_QUERY, { slug });
    const node = raw?.data?.hutechService;
    if (!node) return null;
    return transformServiceNode(node);
  } catch (err) {
    console.warn("[WP] getServiceBySlug failed:", err);
    return null;
  }
}

export async function getBlogsByCategory(categoryName: string): Promise<WpBlog[]> {
  try {
    const raw = await fetchGraphQL(BLOGS_BY_CATEGORY_QUERY, { categoryName });
    const nodes = raw?.data?.posts?.nodes || [];
    return nodes.map(transformBlogNode);
  } catch (err) {
    console.warn("[WP] getBlogsByCategory failed:", err);
    return [];
  }
}

// ─── Service List Page Queries ───────────────────────────────────────────────────

const SERVICE_PAGE_QUERY = `
  query GetServicePageData {
    pages(where: { name: "services" }) {
      nodes {
        servicePageSettings {
          title
          description
          expertiseLabel
          ctaTitle
          ctaBtnText
          ctaBtnLink
        }
      }
    }
  }
`;

const ALL_SERVICES_WITH_CATEGORIES_QUERY = `
  query GetAllServicesWithCategories {
    hutechServices(first: 100) {
      nodes {
        title
        slug
        featuredImage { node { sourceUrl } }
        serviceFields {
          heroDescription
        }
        serviceCategories {
          nodes {
            name
            slug
          }
        }
        serviceSubCategories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

export interface ServiceCategoryGroup {
  category: string;
  subcategories?: {
    name: string;
    items: {
      title: string;
      href: string;
      iconUrl: string;
      desc: string;
      slug: string;
    }[];
  }[];
  items?: {
    title: string;
    href: string;
    iconUrl: string;
    desc: string;
    slug: string;
  }[];
}

export interface ServicePageData {
  title: string;
  description: string;
  expertiseLabel: string;
  ctaTitle: string;
  ctaBtnText: string;
  ctaBtnLink: string;
}

export async function getServicePageData(): Promise<ServicePageData | null> {
  try {
    const raw = await fetchGraphQL(SERVICE_PAGE_QUERY);
    const node = raw?.data?.pages?.nodes?.[0]?.servicePageSettings;
    if (!node) return null;
    return {
      title: node.title || "",
      description: node.description || "",
      expertiseLabel: node.expertiseLabel || "Our Expertise",
      ctaTitle: node.ctaTitle || "Ready to engineer your next ^breakthrough?^",
      ctaBtnText: node.ctaBtnText || "Start a Project",
      ctaBtnLink: node.ctaBtnLink || "/contact",
    };
  } catch (err) {
    console.warn("[WP] getServicePageData() failed:", err);
    return null;
  }
}

export async function getServiceCategoriesWithServices(): Promise<ServiceCategoryGroup[]> {
  try {
    const raw = await fetchGraphQL(ALL_SERVICES_WITH_CATEGORIES_QUERY);
    const nodes = raw?.data?.hutechServices?.nodes || [];
    
    // Grouping structure: Map<CategoryName, Map<SubcategoryName, items[]>>
    const groupMap = new Map<string, Map<string, any[]>>();

    nodes.forEach((svc: any) => {
      const catNodes = svc.serviceCategories?.nodes || [];
      const subCatNodes = svc.serviceSubCategories?.nodes || [];
      
      const catName = catNodes.length > 0 ? catNodes[0].name : "General Services";
      const subCatName = subCatNodes.length > 0 ? subCatNodes[0].name : ""; // Empty string for no subcategory

      if (!groupMap.has(catName)) {
        groupMap.set(catName, new Map<string, any[]>());
      }
      
      const subMap = groupMap.get(catName)!;
      if (!subMap.has(subCatName)) {
        subMap.set(subCatName, []);
      }

      subMap.get(subCatName)!.push({
        title: svc.title,
        slug: svc.slug,
        href: `/services/${svc.slug}`,
        iconUrl: imgUrl(svc.featuredImage) || "",
        desc: svc.serviceFields?.heroDescription || "",
      });
    });

    const result: ServiceCategoryGroup[] = [];

    groupMap.forEach((subMap, catName) => {
      const subcategories: { name: string; items: any[] }[] = [];
      let directItems: any[] = []; // Items without a subcategory

      subMap.forEach((items, subCatName) => {
        if (subCatName === "") {
          directItems = items;
        } else {
          subcategories.push({ name: subCatName, items });
        }
      });

      result.push({
        category: catName,
        subcategories: subcategories.length > 0 ? subcategories : undefined,
        items: directItems.length > 0 ? directItems : undefined,
      });
    });

    return result;
  } catch (err) {
    console.warn("[WP] getServiceCategoriesWithServices() failed:", err);
    return [];
  }
}

// ─── Industry List Page Queries ──────────────────────────────────────────────────

const INDUSTRY_PAGE_QUERY = `
  query GetIndustryPageData {
    pages(where: { name: "industries" }) {
      nodes {
        industryPageSettings {
          industryVerticalLabel
          pageTitle
          pageDescription
          ctaTitle
          ctaBtn1Text
          ctaBtn1Link
          ctaBtn2Text
          ctaBtn2Link
        }
      }
    }
  }
`;

const ALL_INDUSTRIES_QUERY = `
  query GetAllIndustries {
    hutechServices(first: 100) {
      nodes {
        title
        slug
        featuredImage { node { sourceUrl } }
        excerpt
        serviceFields {
          heroDescription
          stat1Value
          stat1Label
          stat2Value
          stat2Label
          stat3Value
          stat3Label
          solution1Title
          solution2Title
          solution3Title
        }
        serviceCategories {
          nodes {
            slug
          }
        }
      }
    }
  }
`;

export interface IndustryPageData {
  label: string;
  title: string;
  description: string;
  ctaTitle: string;
  ctaBtnText: string;
  ctaBtnLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
}

export interface IndustryItem {
  title: string;
  slug: string;
  href: string;
  imageUrl: string;
  desc: string;
  stats?: { value: string; label: string }[];
  topSolutions?: string[];
}

export async function getIndustryPageData(): Promise<IndustryPageData | null> {
  try {
    const raw = await fetchGraphQL(INDUSTRY_PAGE_QUERY);
    const node = raw?.data?.pages?.nodes?.[0]?.industryPageSettings;
    if (!node) return null;
    return {
      label: node.industryVerticalLabel || "Industry Verticals",
      title: node.pageTitle || "Domain Expertise. |Universal Impact.",
      description: node.pageDescription || "We specialize in vertical-specific technology solutions that address the unique complexities and compliance requirements of global markets.",
      ctaTitle: node.ctaTitle || "Scale Your Industry Dominance Today.",
      ctaBtnText: node.ctaBtn1Text || "Request Consultation",
      ctaBtnLink: node.ctaBtn1Link || "/contact",
      ctaSecondaryText: node.ctaBtn2Text || "Global Offices",
      ctaSecondaryLink: node.ctaBtn2Link || "/contact",
    };
  } catch (err) {
    console.warn("[WP] getIndustryPageData() failed:", err);
    return null;
  }
}

export async function getIndustriesList(): Promise<IndustryItem[]> {
  try {
    const raw = await fetchGraphQL(ALL_INDUSTRIES_QUERY);
    const allNodes = raw?.data?.hutechServices?.nodes || [];
    
    // Filter to only include items in the "industries" category
    const nodes = allNodes.filter((item: any) => {
      const cats = item.serviceCategories?.nodes || [];
      return cats.some((cat: any) => cat.slug === 'industries' || cat.slug === 'industry');
    });

    return nodes.map((item: any) => {
      const sf = item.serviceFields || {};
      const stats = [];
      if (sf.stat1Value || sf.stat1Label) stats.push({ value: sf.stat1Value || "", label: sf.stat1Label || "" });
      if (sf.stat2Value || sf.stat2Label) stats.push({ value: sf.stat2Value || "", label: sf.stat2Label || "" });
      if (sf.stat3Value || sf.stat3Label) stats.push({ value: sf.stat3Value || "", label: sf.stat3Label || "" });

      const topSolutions = [];
      if (sf.solution1Title) topSolutions.push(sf.solution1Title);
      if (sf.solution2Title) topSolutions.push(sf.solution2Title);
      if (sf.solution3Title) topSolutions.push(sf.solution3Title);

      return {
        title: item.title,
        slug: item.slug,
        href: `/industries/${item.slug}`,
        imageUrl: imgUrl(item.featuredImage) || "",
        desc: sf.heroDescription || item.excerpt || "",
        stats,
        topSolutions,
      };
    });
  } catch (err) {
    console.warn("[WP] getIndustriesList() failed:", err);
    return [];
  }
}

// ─── Life at Hutech Query ────────────────────────────────────────────────────────

const LIFE_AT_HUTECH_QUERY = `
  query GetLifeAtHutechPage($uri: String!) {
    page: pageBy(uri: $uri) {
      title
      lifeAtHutechSettings {
        heroEyebrow
        heroTitle
        heroDescription
        heroImage { node { sourceUrl } }
        galleryEyebrow
        galleryTitle
        galleryDescription
        galleryCategories { nodes { name slug } }
        galleryTags { nodes { name slug } }
        benefitsEyebrow
        benefitsTitle
        benefit1 { icon title description }
        benefit2 { icon title description }
        benefit3 { icon title description }
        benefit4 { icon title description }
        workplaceEyebrow
        workplaceTitle
        workplaceCategories { nodes { name slug } }
        workplaceTags { nodes { name slug } }
        ctaTitle
        ctaBtn1Text
        ctaBtn1Link
        ctaBtn2Text
        ctaBtn2Link
      }
    }
    lifeGalleries(first: 100) {
      nodes {
        title
        featuredImage { node { sourceUrl } }
        content
        lifeGalleryCategories { nodes { name slug } }
        lifeGalleryTags { nodes { name slug } }
      }
    }
  }
`;

export interface LifeGalleryPost {
  title: string;
  imageUrl: string;
  categories: { name: string; slug: string }[];
  tags: { name: string; slug: string }[];
  imagesFromContent: string[];
}

export interface LifeAtHutechData {
  title: string;
  settings: any;
  galleries: LifeGalleryPost[];
}

export async function getLifeAtHutechPage(uri: string = "/life-at-hutech/"): Promise<LifeAtHutechData | null> {
  try {
    const raw = await fetchGraphQL(LIFE_AT_HUTECH_QUERY, { uri });
    if (!raw?.data?.page) return null;
    
    const settings = raw.data.page.lifeAtHutechSettings || {};
    const galleriesNodes = raw.data.lifeGalleries?.nodes || [];
    
    const galleries = galleriesNodes.map((n: any) => {
      const content = n.content || "";
      const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
      const images = [];
      let match;
      while ((match = imgRegex.exec(content)) !== null) {
        images.push(match[1]);
      }
      
      return {
        title: n.title,
        imageUrl: n.featuredImage?.node?.sourceUrl || images[0] || "",
        categories: n.lifeGalleryCategories?.nodes || [],
        tags: n.lifeGalleryTags?.nodes || [],
        imagesFromContent: images,
      };
    });
    
    return {
      title: raw.data.page.title,
      settings: {
        heroEyebrow: settings.heroEyebrow,
        heroTitle: settings.heroTitle,
        heroDescription: settings.heroDescription,
        heroImage: settings.heroImage?.node?.sourceUrl || "",
        galleryEyebrow: settings.galleryEyebrow,
        galleryTitle: settings.galleryTitle,
        galleryDescription: settings.galleryDescription,
        galleryCategories: settings.galleryCategories?.nodes || [],
        galleryTags: settings.galleryTags?.nodes || [],
        benefitsEyebrow: settings.benefitsEyebrow,
        benefitsTitle: settings.benefitsTitle,
        benefit1: settings.benefit1,
        benefit2: settings.benefit2,
        benefit3: settings.benefit3,
        benefit4: settings.benefit4,
        workplaceEyebrow: settings.workplaceEyebrow,
        workplaceTitle: settings.workplaceTitle,
        workplaceCategories: settings.workplaceCategories?.nodes || [],
        workplaceTags: settings.workplaceTags?.nodes || [],
        ctaTitle: settings.ctaTitle,
        ctaBtn1Text: settings.ctaBtn1Text,
        ctaBtn1Link: settings.ctaBtn1Link,
        ctaBtn2Text: settings.ctaBtn2Text,
        ctaBtn2Link: settings.ctaBtn2Link,
      },
      galleries,
    };
  } catch (err) {
    console.warn("[WP] getLifeAtHutechPage failed:", err);
    return null;
  }
}

// ─── Standard Pages ────────────────────────────────────────────────────────────

export type WpPage = {
  title: string;
  content: string | null;
  date: string;
  slug: string;
  uri: string;
  templateName?: string;
  pageRoutingSettings?: {
    nextjsTemplate?: string[] | string;
  };
};

const PAGE_BY_URI_QUERY = `
  query GetPageByUri($uri: String!) {
    pageBy(uri: $uri) {
      title
      content
      date
      uri
      slug
      template {
        templateName
      }
      pageRoutingSettings {
        nextjsTemplate
      }
    }
  }
`;

export async function getPageByUri(uri: string): Promise<WpPage | null> {
  try {
    const raw = await fetchGraphQL(PAGE_BY_URI_QUERY, { uri });
    const pageNode = raw?.data?.pageBy;
    if (!pageNode) return null;
    
    return {
      title: pageNode.title,
      content: pageNode.content,
      date: new Date(pageNode.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      slug: pageNode.slug,
      uri: pageNode.uri,
      templateName: pageNode.template?.templateName,
      pageRoutingSettings: pageNode.pageRoutingSettings,
    };
  } catch (err) {
    console.warn(`[WP] getPageByUri(${uri}) failed:`, err);
    return null;
  }
}

const ALL_PAGE_URIS_QUERY = `
  query GetAllPageUris {
    pages(first: 100) {
      nodes {
        uri
        slug
      }
    }
  }
`;

export async function getAllPageUris(): Promise<{ uri: string, slug: string }[]> {
  try {
    const raw = await fetchGraphQL(ALL_PAGE_URIS_QUERY);
    const nodes = raw?.data?.pages?.nodes || [];
    return nodes.map((node: any) => ({ uri: node.uri, slug: node.slug }));
  } catch (err) {
    console.warn("[WP] getAllPageUris failed:", err);
    return [];
  }
}

// ─── Sitemap Dynamic Query & Types ─────────────────────────────────────────────

export type SitemapLink = {
  name: string;
  path: string;
};

export type SitemapSection = {
  title: string;
  links: SitemapLink[];
};

const SITEMAP_GRAPHQL_QUERY = `
  query GetSitemapData {
    menus {
      nodes {
        id
        name
        slug
        locations
        menuItems(first: 1000) {
          nodes {
            id
            label
            url
            path
            parentId
          }
        }
      }
    }
    pages(first: 1000) {
      nodes {
        id
        title
        slug
        uri
      }
    }
    hutechServices(first: 1000) {
      nodes {
        title
        slug
        serviceCategories {
          nodes {
            slug
          }
        }
      }
    }
    posts(first: 1000) {
      nodes {
        title
        slug
      }
    }
    caseStudies(first: 1000) {
      nodes {
        title
        slug
      }
    }
    hutechEvents(first: 1000) {
      nodes {
        title
        slug
      }
    }
    hutechDocuments(first: 1000) {
      nodes {
        title
        slug
      }
    }
  }
`;

function cleanSitemapTitle(title: string): string {
  return (title || "").replace(/\^/g, "").replace(/\|/g, "").trim();
}

function normalizeSitemapPath(rawPath: string): string {
  if (!rawPath) return "#";
  if (rawPath.startsWith("http")) {
    try {
      const parsed = new URL(rawPath);
      return parsed.pathname.replace(/^\/hutech-website/, "") || "/";
    } catch {
      return rawPath;
    }
  }
  return rawPath.replace(/^\/hutech-website/, "") || "/";
}

export async function getSitemapData(pageUri: string = "/legal/sitemap/"): Promise<SitemapSection[]> {
  try {
    const raw = await fetchGraphQL(SITEMAP_GRAPHQL_QUERY);
    const data = raw?.data || {};
    const pages: any[] = data.pages?.nodes || [];
    const services: any[] = data.hutechServices?.nodes || [];
    const caseStudies: any[] = data.caseStudies?.nodes || [];
    const events: any[] = data.hutechEvents?.nodes || [];
    const documents: any[] = data.hutechDocuments?.nodes || [];

    const blogs = await getBlogs().catch(() => []);

    // Company pages (ordered logically)
    const companyOrder = [
      "/about/",
      "/vision-mission-values/",
      "/leadership/",
      "/partnership/",
      "/life-at-hutech/",
      "/news/",
      "/press-release/",
      "/awards/",
      "/careers/",
      "/graduates/",
      "/contact/",
    ];

    const companyPages = pages
      .filter((p) => {
        const u = p.uri || "";
        return u.startsWith("/company/") || companyOrder.includes(u);
      })
      .sort((a, b) => {
        const indexA = companyOrder.indexOf(a.uri);
        const indexB = companyOrder.indexOf(b.uri);
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return (a.title || "").localeCompare(b.title || "");
      })
      .map((p) => ({
        name: cleanSitemapTitle(p.title),
        path: p.uri,
      }));

    // Services vs Industries
    const liveServices: SitemapLink[] = [];
    const liveIndustries: SitemapLink[] = [];

    services.forEach((s) => {
      const cats = s.serviceCategories?.nodes?.map((c: any) => c.slug?.toLowerCase()) || [];
      if (cats.includes("industries") || cats.includes("industry")) {
        liveIndustries.push({
          name: cleanSitemapTitle(s.title),
          path: `/industries/${s.slug}`,
        });
      } else {
        liveServices.push({
          name: cleanSitemapTitle(s.title),
          path: `/services/${s.slug}`,
        });
      }
    });

    // Blogs
    const liveBlogs = blogs.map((b) => ({
      name: cleanSitemapTitle(b.title),
      path: b.isIPublish ? `/resources/blogs/ipublish/${b.slug}` : `/resources/blogs/${b.slug}`,
    }));

    // Case Studies
    const liveCaseStudies = caseStudies.map((c) => ({
      name: cleanSitemapTitle(c.title),
      path: `/resources/case-studies/${c.slug}`,
    }));

    // Events
    const liveEvents = events.map((e) => ({
      name: cleanSitemapTitle(e.title),
      path: `/resources/events/${e.slug || e.id}`,
    }));

    // Documents
    const liveDocs = documents.map((d) => ({
      name: cleanSitemapTitle(d.title),
      path: `/resources/hutech-documents/${d.slug}`,
    }));

    // Legal Pages
    const legalPages = pages
      .filter((p) => {
        const u = p.uri || "";
        return u.startsWith("/legal/") || ["/legal/terms/", "/legal/privacy/", "/legal/sitemap/"].includes(u);
      })
      .map((p) => ({
        name: cleanSitemapTitle(p.title),
        path: p.uri,
      }));

    const sections: SitemapSection[] = [
      { title: "Company", links: companyPages },
      { title: "Services", links: liveServices },
      { title: "Industries", links: liveIndustries },
      { title: "Blogs", links: liveBlogs },
      { title: "Case Studies", links: liveCaseStudies },
      { title: "Events", links: liveEvents },
      { title: "Documents", links: liveDocs },
      { title: "Legal & Policies", links: legalPages },
    ].filter((s) => s.links && s.links.length > 0);

    return sections;
  } catch (err) {
    console.warn("[WP] getSitemapData failed:", err);
    return [];
  }
}

