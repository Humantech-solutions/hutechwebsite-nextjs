import { Metadata } from "next";
import { siteConfig } from "../config/site";

type SeoInput = {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  icons?: string;
  noIndex?: boolean;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

function trimTrailingSlash(url: string) {
  return url.replace(/\/+$/, "");
}

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${trimTrailingSlash(siteConfig.url)}${normalizedPath}`;
}

export function cleanSeoText(value?: string, fallback = "") {
  return (value || fallback).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

export function buildSeoTitle(title?: string) {
  if (!title) return siteConfig.name;
  return title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;
}

export function constructMetadata({
  title,
  description,
  image = siteConfig.ogImage,
  path = "./",
  icons = "/icon.png",
  noIndex = false,
  keywords = siteConfig.keywords,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
}: SeoInput = {}): Metadata {
  const metaTitle = buildSeoTitle(title);
  const metaDescription = cleanSeoText(description, siteConfig.description);
  const metaImage = absoluteUrl(image);
  const canonical = path === "./" ? "./" : absoluteUrl(path);
  const twitterHandle = siteConfig.links.twitter.split("/").filter(Boolean).pop();

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
      absolute: metaTitle,
    },
    description: metaDescription,
    keywords,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: {
      canonical,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonical,
      siteName: siteConfig.name,
      locale: "en_US",
      type,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      ...(type === "article" && {
        publishedTime,
        modifiedTime: modifiedTime || publishedTime,
        authors: authors?.length ? authors : [siteConfig.name],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
      site: twitterHandle ? `@${twitterHandle}` : undefined,
      creator: twitterHandle ? `@${twitterHandle}` : undefined,
    },
    icons,
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
          },
        },
  };
}

export function getSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: {
          "@type": "ImageObject",
          url: siteConfig.logo,
        },
        sameAs: [siteConfig.links.twitter, siteConfig.links.linkedin].filter(Boolean),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "sales@hutechsolutions.com",
          areaServed: "Worldwide",
          availableLanguage: ["English"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
    ],
  };
}

export function getWebPageSchema({
  title,
  description,
  path = "/",
  image,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}) {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: buildSeoTitle(title),
    description: cleanSeoText(description, siteConfig.description),
    image: image ? absoluteUrl(image) : siteConfig.ogImage,
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
    about: {
      "@id": `${siteConfig.url}/#organization`,
    },
  };
}

/** @deprecated Use getSiteSchema() instead */
export function getOrganizationSchema() {
  return getSiteSchema();
}
/** @deprecated Use getSiteSchema() instead */
export function getWebsiteSchema() {
  return getSiteSchema();
}

export function getArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
  url,
}: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: cleanSeoText(description),
    image: [absoluteUrl(image)],
    datePublished,
    dateModified: dateModified || datePublished,
    author: [
      {
        "@type": "Person",
        name: authorName,
      },
    ],
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.item),
    })),
  };
}
