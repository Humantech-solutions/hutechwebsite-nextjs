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
