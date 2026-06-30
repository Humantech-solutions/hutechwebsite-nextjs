"use client";

import { useEffect } from "react";
import { absoluteUrl, buildSeoTitle, cleanSeoText, getWebPageSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

interface MetaProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  schema?: Record<string, unknown>;
}

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attrs).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

function upsertJsonLd(id: string, data: Record<string, unknown>) {
  let element = document.getElementById(id) as HTMLScriptElement | null;

  if (!element) {
    element = document.createElement("script");
    element.id = id;
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
}

export function Meta({
  title = "Hutech Solutions | Advanced Engineering & Digital Transformation",
  description = siteConfig.description,
  keywords = siteConfig.keywords.join(", "),
  ogImage = siteConfig.ogImage,
  canonical,
  noIndex = false,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  schema,
}: MetaProps) {
  useEffect(() => {
    const path =
      canonical ||
      `${window.location.pathname}${window.location.pathname.endsWith("/") ? "" : "/"}`;
    const pageUrl = absoluteUrl(path);
    const metaTitle = buildSeoTitle(title);
    const metaDescription = cleanSeoText(description, siteConfig.description);
    const imageUrl = absoluteUrl(ogImage);

    document.title = metaTitle;

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: metaDescription,
    });
    upsertMeta('meta[name="keywords"]', {
      name: "keywords",
      content: keywords,
    });
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: noIndex ? "noindex,nofollow" : "index,follow,max-image-preview:large",
    });

    upsertLink("canonical", pageUrl);

    const ogTags = [
      ["og:title", metaTitle],
      ["og:description", metaDescription],
      ["og:image", imageUrl],
      ["og:image:alt", metaTitle],
      ["og:type", type],
      ["og:url", pageUrl],
      ["og:site_name", siteConfig.name],
      ["og:locale", "en_US"],
    ];

    ogTags.forEach(([property, content]) => {
      upsertMeta(`meta[property="${property}"]`, { property, content });
    });

    if (type === "article") {
      if (publishedTime) {
        upsertMeta('meta[property="article:published_time"]', {
          property: "article:published_time",
          content: publishedTime,
        });
      }
      if (modifiedTime || publishedTime) {
        upsertMeta('meta[property="article:modified_time"]', {
          property: "article:modified_time",
          content: modifiedTime || publishedTime || "",
        });
      }
      if (author) {
        upsertMeta('meta[property="article:author"]', {
          property: "article:author",
          content: author,
        });
      }
    }

    const twitterHandle = siteConfig.links.twitter.split("/").filter(Boolean).pop();
    const twitterTags = [
      ["twitter:card", "summary_large_image"],
      ["twitter:title", metaTitle],
      ["twitter:description", metaDescription],
      ["twitter:image", imageUrl],
      ["twitter:image:alt", metaTitle],
      ["twitter:site", twitterHandle ? `@${twitterHandle}` : ""],
      ["twitter:creator", twitterHandle ? `@${twitterHandle}` : ""],
    ];

    twitterTags
      .filter(([, content]) => Boolean(content))
      .forEach(([name, content]) => {
        upsertMeta(`meta[name="${name}"]`, { name, content });
      });

    upsertJsonLd(
      "hutech-page-schema",
      schema ||
        getWebPageSchema({
          title: metaTitle,
          description: metaDescription,
          path: pageUrl,
          image: imageUrl,
        })
    );
  }, [
    title,
    description,
    keywords,
    ogImage,
    canonical,
    noIndex,
    type,
    publishedTime,
    modifiedTime,
    author,
    schema,
  ]);

  return null;
}
