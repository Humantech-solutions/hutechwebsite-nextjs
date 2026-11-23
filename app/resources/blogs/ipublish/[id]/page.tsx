import { notFound } from "next/navigation";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import {
  getIPublishPageBySlug,
  getIPublishPages,
  getIPublishImageUrl,
  getIPublishContentById,
  normalizeIPublishHtml,
  isIPublishBlogSlugAllowed,
} from "@/lib/ipublish";
import { IPublishDetailClient } from "@/components/ipublish/IPublishDetailClient";

export const revalidate = 0;

export async function generateStaticParams() {
  const pages = await getIPublishPages();
  return pages.map((page) => ({
    id: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const content = (await getIPublishPageBySlug(id)) || (await getIPublishContentById(id));

  if (!content || !(await isIPublishBlogSlugAllowed(id))) {
    return {
      title: {
        absolute: "Article Not Found | Hutech Solutions",
      },
    };
  }

  const title = content.seo_title || content.title;
  const description =
    content.meta_description || content.og_description || content.excerpt || "";
  const imageUrl = getIPublishImageUrl(content.featured_image_url);

  // Self-referencing canonical URL matching the sitemap URL on the main site domain
  const blogSlug = content.slug || id;
  const siteUrl = (siteConfig.url || "https://hutechsolutions.ai").replace(/\/$/, "");
  const canonical = `${siteUrl}/resources/blogs/ipublish/${blogSlug}/`;

  const keywordsList = [
    content.focus_keyword,
    ...(content.secondary_keywords || []),
  ].filter(Boolean) as string[];

  return {
    metadataBase: new URL(siteUrl),
    title: {
      absolute: title,
    },
    description,
    keywords: keywordsList.join(", "),
    alternates: {
      canonical,
    },
    openGraph: {
      title: content.og_title || title,
      description: content.og_description || description,
      url: canonical,
      siteName: siteConfig.name,
      locale: "en_US",
      images: imageUrl ? [{ url: imageUrl }] : [],
      type: "article",
      publishedTime: content.updated_at || content.published_at || content.created_at,
    },
    twitter: {
      card: "summary_large_image",
      title: content.og_title || title,
      description: content.og_description || description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function IPublishPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  if (!resolvedParams.id) {
    notFound();
  }

  const content =
    (await getIPublishPageBySlug(resolvedParams.id)) ||
    (await getIPublishContentById(resolvedParams.id));

  if (!content || !(await isIPublishBlogSlugAllowed(resolvedParams.id))) {
    notFound();
  }

  const imageUrl = getIPublishImageUrl(content.featured_image_url);

  const blogSlug = content.slug || resolvedParams.id;
  const siteUrl = (siteConfig.url || "https://hutechsolutions.ai").replace(/\/$/, "");
  const articleCanonical = `${siteUrl}/resources/blogs/ipublish/${blogSlug}/`;

  // Normalize Schema JSON-LD with correct self-referencing canonical URL
  let schemaJsonData: any;
  if (content.schema_json) {
    const rawSchema =
      typeof content.schema_json === "string"
        ? (() => {
            try {
              return JSON.parse(content.schema_json);
            } catch {
              return null;
            }
          })()
        : content.schema_json;

    schemaJsonData = rawSchema
      ? {
          ...rawSchema,
          url: articleCanonical,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": articleCanonical,
          },
          ...(imageUrl && !rawSchema.image ? { image: imageUrl } : {}),
        }
      : null;
  }

  if (!schemaJsonData) {
    schemaJsonData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: content.seo_title || content.title,
      description:
        content.meta_description || content.og_description || content.excerpt || "",
      image: imageUrl,
      dateModified:
        content.updated_at || content.published_at || content.created_at,
      datePublished:
        content.published_at || content.created_at || content.updated_at,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": articleCanonical,
      },
      url: articleCanonical,
      author: {
        "@type": "Person",
        name: content.author_name || "Hutech Team",
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      keywords: [
        content.focus_keyword,
        ...(content.secondary_keywords || []),
      ]
        .filter(Boolean)
        .join(", "),
    };
  }

    const normalizedContent = {
      ...content,
      featured_image_url: imageUrl || null,
      body: normalizeIPublishHtml(content.body),
      current_body: normalizeIPublishHtml(content.current_body),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaJsonData),
          }}
        />
        <IPublishDetailClient content={normalizedContent} slug={resolvedParams.id} />
      </>
    );
}
