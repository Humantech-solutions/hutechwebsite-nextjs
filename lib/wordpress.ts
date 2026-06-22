import { CaseStudy } from "@/lib/data/case-studies";
// WordPress GraphQL API integration for Hutech Solutions
// Replace NEXT_PUBLIC_WORDPRESS_API_URL in .env.local with your WordPress site's GraphQL endpoint

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace(
  "localhost",
  "127.0.0.1"
);

// ─── Fetch Utility ──────────────────────────────────────────────────────────

export async function fetchGraphQL(query: string, variables = {}) {
  if (!WORDPRESS_API_URL) {
    console.warn("[WP] NEXT_PUBLIC_WORDPRESS_API_URL is not set. Using static fallback data.");
    return { data: null, errors: [{ message: "WORDPRESS_API_URL missing" }] };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const res = await fetch(WORDPRESS_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 }, // Re-fetch from WP every 60 seconds (ISR)
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      console.error(`[WP] HTTP ${res.status}: ${res.statusText}`);
      try {
        const text = await res.text();
        console.error(`[WP] Error Body: ${text}`);
      } catch (e) {}
      return { data: null, errors: [{ message: `HTTP ${res.status}` }] };
    }

    const json = await res.json();
    if (json.errors) {
      console.error("[WP] GraphQL errors:", JSON.stringify(json.errors));
    }
    return json;
  } catch (err: any) {
    if (err.name === "AbortError") {
      console.error("[WP] Request timed out after 10s");
    } else {
      console.error("[WP] Fetch error:", err.message);
    }
    return { data: null, errors: [{ message: err.message }] };
  }
}

// ─── Helper to extract image URL from ACF image field ────────────────────────
function imgUrl(field: any): string | undefined {
  if (!field) return undefined;
  if (typeof field === "string") return field;
  return (
    field?.node?.sourceUrl ||
    field?.node?.mediaItemUrl ||
    field?.sourceUrl ||
    field?.mediaItemUrl ||
    undefined
  );
}

// ─── Homepage Query ──────────────────────────────────────────────────────────

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
  query GetHomePage {
    page(id: "home", idType: URI) {
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
          industry_1 { name icon { node { sourceUrl } } btnText btnLink }
          industry_2 { name icon { node { sourceUrl } } btnText btnLink }
          industry_3 { name icon { node { sourceUrl } } btnText btnLink }
          industry_4 { name icon { node { sourceUrl } } btnText btnLink }
          industry_5 { name icon { node { sourceUrl } } btnText btnLink }
          industry_6 { name icon { node { sourceUrl } } btnText btnLink }
          industry_7 { name icon { node { sourceUrl } } btnText btnLink }
          industry_8 { name icon { node { sourceUrl } } btnText btnLink }
          industry_9 { name icon { node { sourceUrl } } btnText btnLink }
          industry_10 { name icon { node { sourceUrl } } btnText btnLink }
        }
        capabilities {
          title
          description
          capability_1 { name image { node { sourceUrl } } color }
          capability_2 { name image { node { sourceUrl } } color }
          capability_3 { name image { node { sourceUrl } } color }
          capability_4 { name image { node { sourceUrl } } color }
          capability_5 { name image { node { sourceUrl } } color }
          capability_6 { name image { node { sourceUrl } } color }
          capability_7 { name image { node { sourceUrl } } color }
          capability_8 { name image { node { sourceUrl } } color }
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
          story_1 { ${STORY_FIELDS} }
          story_2 { ${STORY_FIELDS} }
          story_3 { ${STORY_FIELDS} }
          story_4 { ${STORY_FIELDS} }
          story_5 { ${STORY_FIELDS} }
          story_6 { ${STORY_FIELDS} }
          story_7 { ${STORY_FIELDS} }
          story_8 { ${STORY_FIELDS} }
        }
        whatsNew {
          title
          description
          news_item_1 { ${NEWS_FIELDS} }
          news_item_2 { ${NEWS_FIELDS} }
          news_item_3 { ${NEWS_FIELDS} }
          news_item_4 { ${NEWS_FIELDS} }
          news_item_5 { ${NEWS_FIELDS} }
          news_item_6 { ${NEWS_FIELDS} }
        }
        techStack {
          title
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
}

export interface WpAccordionItem {
  title?: string;
  content?: string;
}

export interface WpCapability {
  name?: string;
  image?: any;
  color?: string;
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
  };
}

// ─── Data Transform ──────────────────────────────────────────────────────────

function transformHomePage(raw: any): HomepageData | null {
  const f = raw?.data?.page?.homepageFields;
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

  // Expertise
  const exp = f.expertise || {};
  const industries = collectGroups(exp, "industry", 10)
    .filter((ind: any) => ind?.name?.trim())
    .map((ind: any) => ({
      name: ind?.name,
      iconUrl: imgUrl(ind?.icon),
      btnText: ind?.btnText,
      btnLink: ind?.btnLink
    }));

  // Capabilities — only include capabilities with a name
  const cap = f.capabilities || {};
  const capList: WpCapability[] = collectGroups(cap, "capability", 8)
    .filter((c: any) => c?.name?.trim())
    .map((c: any) => ({ name: c?.name, imageUrl: imgUrl(c?.image), color: c?.color }));

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

  // Success Stories — only include stories with a name or text
  const ss = f.successStories || {};
  const stories: WpStory[] = collectGroups(ss, "story", 8)
    .filter((s: any) => s?.name?.trim() || s?.text?.trim())
    .map((s: any) => ({
      name: s?.name,
      title: s?.title,
      text: s?.text,
      imageUrl: imgUrl(s?.image),
    }));

  // What's New — only include news items with a title
  const wn = f.whatsNew || {};
  const newsItems: WpNewsItem[] = collectGroups(wn, "news_item", 6)
    .filter((n: any) => n?.title?.trim())
    .map((n: any) => ({ title: n?.title, date: n?.date, imageUrl: imgUrl(n?.image) }));

  // Why Hutech — only include accordion items with a title
  const why = f.whyHutech || {};
  const accordionItems: WpAccordionItem[] = collectGroups(why, "accordion_item", 6)
    .filter((a: any) => a?.title?.trim())
    .map((a: any) => ({ title: a?.title, content: a?.content }));


  // Tech Stack
  const ts = f.techStack || {};

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
    },
  };
}

// ─── Public API ──────────────────────────────────────────────────────────────

export async function getHomePage(): Promise<HomepageData | null> {
  try {
    const raw = await fetchGraphQL(HOMEPAGE_QUERY);
    if (raw?.errors || !raw?.data?.page) {
      console.warn("[WP] Could not fetch homepage data. Using static fallback.");
      return null;
    }
    return transformHomePage(raw);
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
  const imageUrl = node.featuredImage?.node?.sourceUrl ?? undefined;
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
      bgImageUrl: imgUrl(node.bgImage),
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
  const imageUrl = node.featuredImage?.node?.sourceUrl ?? "";

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
      image: imgUrl(pf[`speaker${i}Image`]) || "",
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
    ctaTitle: pf.ctaTitle ?? "Missed this |Event?",
    ctaDescription: pf.ctaDescription ?? "",
    ctaImage: imgUrl(pf.ctaImage) ?? imageUrl,
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
      bgImageUrl: imgUrl(node.bgImage),
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
        tags {
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
        overviewQuote
        overviewText1
        overviewText2
        challenge1Title
        challenge1Desc
        challenge1Icon
        challenge2Title
        challenge2Desc
        challenge2Icon
        challenge3Title
        challenge3Desc
        challenge3Icon
        solution1Title
        solution1Desc
        solution1Icon
        solution2Title
        solution2Desc
        solution2Icon
        solution3Title
        solution3Desc
        solution3Icon
        solution4Title
        solution4Desc
        solution4Icon
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
        result1Title
        result1Desc
        result2Title
        result2Desc
        result3Title
        result3Desc
        result4Title
        result4Desc
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
  const tags = node.tags?.nodes?.map((t: any) => t.name) ?? [];
  const imageUrl = node.featuredImage?.node?.sourceUrl ?? "";

  const overviewText = [];
  if (pf.overviewText1) overviewText.push(pf.overviewText1);
  if (pf.overviewText2) overviewText.push(pf.overviewText2);

  const challenges = [];
  for (let i = 1; i <= 3; i++) {
    if (pf[`challenge${i}Title`]) {
      challenges.push({
        title: pf[`challenge${i}Title`],
        desc: pf[`challenge${i}Desc`] || "",
        icon: pf[`challenge${i}Icon`] || "Target",
      });
    }
  }

  const solutions = [];
  for (let i = 1; i <= 4; i++) {
    if (pf[`solution${i}Title`]) {
      solutions.push({
        title: pf[`solution${i}Title`],
        desc: pf[`solution${i}Desc`] || "",
        icon: pf[`solution${i}Icon`] || "Zap",
      });
    }
  }

  const process = [];
  for (let i = 1; i <= 5; i++) {
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

  const faqs = [];
  for (let i = 1; i <= 5; i++) {
    if (pf[`faq${i}Question`] && pf[`faq${i}Answer`]) {
      faqs.push({
        question: pf[`faq${i}Question`],
        answer: pf[`faq${i}Answer`],
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
    overviewText,
    challenges,
    solutions,
    process,
    results,
    faqs,
    faqTitle: pf.faqTitle,
    faqSubtitle: pf.faqSubtitle,
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
      bgImageUrl: imgUrl(node.bgImage),
    };
  } catch (err) {
    console.warn("[WP] getCaseStudyPageData() failed:", err);
    return null;
  }
}

// ─── About Page GraphQL Query ─────────────────────────────────────────────────

const ABOUT_PAGE_QUERY = `
  query GetAboutPageData {
    pages(where: { title: "About" }) {
      nodes {
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
    icon:  "" // Icons are static in AboutClient
  })).filter(feat => feat.title);

  const offices = [1, 2, 3, 4, 5].map(i => ({
    id: f[`location${i}Name`]?.toLowerCase().replace(/\s+/g, '-') || `office-${i}`,
    name: f[`location${i}Name`] || "",
    city: f[`location${i}City`] || "",
    type: f[`location${i}Type`] || "",
    details: f[`location${i}Details`] || "",
    lat: f[`location${i}Lat`] || "",
    lng: f[`location${i}Lng`] || ""
  })).filter(loc => loc.name);

  return {
    heroTagline:    f.heroTagline    || "Corporate Profile",
    heroTitle:      f.heroTitle      || "Architecting |Business Value.",
    heroDescription:f.heroDescription|| "",
    heroBgImage:    imgUrl(f.heroBgImage) || "",
    stats,
    overviewTitle:  f.overviewTitle  || "Providing The Finest |Digital Experiences.",
    overviewQuote:  f.overviewDescription || "",
    features,
    whatWeDoTitle:  f.whatWeDoTitle  || "What We Do",
    whatWeDoDesc:   f.whatWeDoDesc   || "",
    whatWeDoItems,
    whoWeHelpTitle: f.whoWeHelpTitle || "Who We Help?",
    whoWeHelpDesc:  f.whoWeHelpDesc  || "",
    whoWeHelpItems,
    whyChooseTitle: f.whyChooseUsTitle || "Why Choose Us",
    whyChooseDesc:  f.whyChooseUsDesc  || "",
    synergyTitle:   f.globalSynergyTitle || "Global |Synergy.",
    synergyDesc:    f.globalSynergyDesc || "",
    synergyStat1:   f.synergyStat1Label || "4 Global Offices",
    synergyStat2:   f.synergyStat2Label || "90+ Member Team",
    // Map stats
    mapTitle:       f.globalFootprintTitle || "Global Footprint, |Local Expertise.",
    mapDescription: f.globalFootprintDesc || "",
    mapStat1Value:  f.globalStat1Value  || "24/7",
    mapStat1Label:  f.globalStat1Label  || "Operations",
    mapStat2Value:  f.globalStat2Value  || "3",
    mapStat2Label:  f.globalStat2Label  || "Continents",
    offices,
    historySubtitle:f.historySubtitle || "Corporate Evolution",
    historyTitle:   f.historyTitle   || "Our |History.",
    milestones,
    ctaBgImage:     imgUrl(f.ctaBgImage) || "",
    ctaTitle:       f.ctaTitle       || "Join the Next |Digital Revolution.",
    ctaDescription: f.ctaDescription || "",
    ctaBtn1Text:    f.ctaButton1Text || "Start Your Project",
    ctaBtn1Url:     f.ctaButton1Url  || "/contact",
    ctaBtn2Text:    f.ctaButton2Text || "Executive Careers",
    ctaBtn2Url:     f.ctaButton2Url  || "/careers",
  };
}

export async function getAboutPageData(): Promise<ReturnType<typeof transformAboutPageData> | null> {
  try {
    const raw = await fetchGraphQL(ABOUT_PAGE_QUERY);
    const f = raw?.data?.pages?.nodes?.[0]?.aboutPageFields;
    if (!f) return null;
    return transformAboutPageData(f);
  } catch (err) {
    console.warn("[WP] getAboutPageData() failed:", err);
    return null;
  }
}

// ─── Vision Mission & Values Page ────────────────────────────────────────────

const VMV_PAGE_QUERY = `
  query GetVMVPageData {
    pages(where: { title: "Vision Mission Values" }) {
      nodes {
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

export async function getVMVPageData(): Promise<ReturnType<typeof transformVMVPageData> | null> {
  try {
    const raw = await fetchGraphQL(VMV_PAGE_QUERY);
    const f = raw?.data?.pages?.nodes?.[0]?.visionMissionValuesPageFields;
    if (!f) return null;
    return transformVMVPageData(f);
  } catch (err) {
    console.warn("[WP] getVMVPageData() failed:", err);
    return null;
  }
}

// ─── Leadership Page ─────────────────────────────────────────────────────────

const LEADERSHIP_PAGE_QUERY = `
  query GetLeadershipPageData {
    pages(where: { title: "Leadership" }) {
      nodes {
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
  }
`;

function transformLeadershipPageData(f: any) {
  const leaders = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => ({
    name:         f[`leadLeader${i}Name`] || "",
    role:         f[`leadLeader${i}Role`] || "",
    img:          imgUrl(f[`leadLeader${i}Img`]) || "",
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

export async function getLeadershipPageData(): Promise<ReturnType<typeof transformLeadershipPageData> | null> {
  try {
    const raw = await fetchGraphQL(LEADERSHIP_PAGE_QUERY);
    const f = raw?.data?.pages?.nodes?.[0]?.leadershipPageFields;
    if (!f) return null;
    return transformLeadershipPageData(f);
  } catch (err) {
    console.warn("[WP] getLeadershipPageData() failed:", err);
    return null;
  }
}


