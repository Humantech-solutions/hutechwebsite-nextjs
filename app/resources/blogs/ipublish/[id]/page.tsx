import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  getIPublishPageBySlug,
  getIPublishPages,
  getIPublishImageUrl,
  getIPublishContentById,
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

  if (!content) {
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

  // Canonical URL with trailing slash matching iPublish convention
  const baseCanonical =
    content.canonical_url ||
    `https://ipublish.hutechsolutions.ai/insights/${content.org || "hutech-solutions"}/${content.slug || id}`;
  const canonical = baseCanonical.endsWith("/") ? baseCanonical : `${baseCanonical}/`;

  const keywordsList = [
    content.focus_keyword,
    ...(content.secondary_keywords || []),
  ].filter(Boolean) as string[];

  return {
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

  if (!content) {
    notFound();
  }

  const imageUrl = getIPublishImageUrl(content.featured_image_url);

  // Normalize Schema JSON-LD
  const schemaJsonData = content.schema_json
    ? {
        ...content.schema_json,
        ...(imageUrl && !content.schema_json.image ? { image: imageUrl } : {}),
      }
    : {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: content.seo_title || content.title,
        description:
          content.meta_description || content.og_description || content.excerpt || "",
        image: imageUrl,
        dateModified:
          content.updated_at || content.published_at || content.created_at,
        keywords: [
          content.focus_keyword,
          ...(content.secondary_keywords || []),
        ]
          .filter(Boolean)
          .join(", "),
      };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaJsonData),
        }}
      />
      <IPublishDetailClient content={content} slug={resolvedParams.id} />
    </>
  );
}
