import { CaseStudy } from "@/lib/data/case-studies";
// WordPress GraphQL API integration for Hutech Solutions
// Replace NEXT_PUBLIC_WORDPRESS_API_URL in .env.local with your WordPress site's GraphQL endpoint

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

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

// ─── Partnership Page ────────────────────────────────────────────────────────

const PARTNERSHIP_PAGE_QUERY = `
  query GetPartnershipPageData {
    pages(where: { title: "Partnership" }) {
      nodes {
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
    src: imgUrl(f[`partMeetImg${i}`]) || "",
    alt: f[`partMeetAlt${i}`] || ""
  })).filter(m => m.src);

  const logos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(i => ({
    name: f[`partLogo${i}Name`] || "",
    logo: imgUrl(f[`partLogo${i}Img`]) || ""
  })).filter(l => l.logo);

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

export async function getPartnershipPageData(): Promise<ReturnType<typeof transformPartnershipPageData> | null> {
  try {
    const raw = await fetchGraphQL(PARTNERSHIP_PAGE_QUERY);
    const f = raw?.data?.pages?.nodes?.[0]?.partnershipPageFields;
    if (!f) return null;
    return transformPartnershipPageData(f);
  } catch (err) {
    console.warn("[WP] getPartnershipPageData() failed:", err);
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
    image: imgUrl(f[`contactOffice${i}Img`]) || ""
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
    supportBtnUrl: f.contactSupportBtnUrl || "#",

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
    const heroBgImg = node?.featuredImage?.node?.mediaItemUrl || "https://images.unsplash.com/photo-1760611656615-db3fad24a314?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920";
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
