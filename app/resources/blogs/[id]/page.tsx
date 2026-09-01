import BlogDetailClient from "./BlogDetailClient";
import { getBlogBySlug, getBlogs } from "@/lib/wordpress";
import { BLOG_DATA } from "@/lib/data/blogs";
import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/seo";
import {
  getIPublishPageBySlug,
  getIPublishPages,
  getIPublishImageUrl,
  getIPublishContentById,
} from "@/lib/ipublish";
import { IPublishDetailClient } from "@/components/ipublish/IPublishDetailClient";

export const revalidate = 0;

export async function generateStaticParams() {
  const [wpBlogs, ipublishPages] = await Promise.all([
    getBlogs().catch(() => []),
    getIPublishPages().catch(() => []),
  ]);

  const ids = new Set([
    ...Object.keys(BLOG_DATA),
    ...wpBlogs.map((b) => b.slug).filter(Boolean),
    ...ipublishPages.map((p) => p.slug).filter(Boolean),
  ]);

  return Array.from(ids).map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const wpBlog = await getBlogBySlug(id).catch(() => null);
  const staticBlog = BLOG_DATA[id];
  const blog: any = wpBlog || staticBlog;

  if (blog) {
    return constructMetadata({
      title: blog.title,
      description: blog.excerpt || blog.content?.[0]?.text || blog.content || "",
      image: blog.imageUrl || blog.image,
      path: `/resources/blogs/${blog.slug || id}/`,
      type: "article",
      publishedTime: blog.date,
      authors: [blog.author || "Hutech Team"],
    });
  }

  // Check iPublish
  const ipublishContent =
    (await getIPublishPageBySlug(id)) || (await getIPublishContentById(id));
  if (ipublishContent) {
    const title = ipublishContent.seo_title || ipublishContent.title;
    const description =
      ipublishContent.meta_description ||
      ipublishContent.og_description ||
      ipublishContent.excerpt ||
      "";
    const imageUrl = getIPublishImageUrl(ipublishContent.featured_image_url);
    const baseCanonical =
      ipublishContent.canonical_url ||
      `https://ipublish.hutechsolutions.ai/insights/${ipublishContent.org || "hutech-solutions"}/${ipublishContent.slug || id}`;
    const canonical = baseCanonical.endsWith("/") ? baseCanonical : `${baseCanonical}/`;

    const keywordsList = [
      ipublishContent.focus_keyword,
      ...(ipublishContent.secondary_keywords || []),
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
        title: ipublishContent.og_title || title,
        description: ipublishContent.og_description || description,
        url: canonical,
        images: imageUrl ? [{ url: imageUrl }] : [],
        type: "article",
        publishedTime:
          ipublishContent.updated_at ||
          ipublishContent.published_at ||
          ipublishContent.created_at,
      },
      twitter: {
        card: "summary_large_image",
        title: ipublishContent.og_title || title,
        description: ipublishContent.og_description || description,
        images: imageUrl ? [imageUrl] : [],
      },
    };
  }

  return constructMetadata({
    title: "Blog",
    path: `/resources/blogs/${id}/`,
  });
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // 1. Fetch WP blog & latest blogs in parallel
  const [wpBlog, allWpBlogs] = await Promise.all([
    getBlogBySlug(id).catch(() => null),
    getBlogs().catch(() => []),
  ]);

  const latestBlogs = allWpBlogs.map((b) => ({
    id: b.id,
    slug: b.slug,
    title: b.title,
    category: b.category,
    date: b.date,
    path: `/resources/blogs/${b.slug}/`,
  }));

  if (wpBlog) {
    const blog = {
      id: wpBlog.slug,
      slug: wpBlog.slug,
      title: wpBlog.title,
      date: wpBlog.date,
      author: wpBlog.author,
      role: "",
      category: wpBlog.category,
      readTime: wpBlog.readTime,
      image: wpBlog.imageUrl || undefined,
      excerpt: wpBlog.excerpt,
      contentHtml: wpBlog.content,
      content: [],
      tags: wpBlog.tags,
      faqs: wpBlog.faqs,
      faqTitle: wpBlog.faqTitle,
      faqSubtitle: wpBlog.faqSubtitle,
    };
    return <BlogDetailClient blog={blog as any} latestBlogs={latestBlogs} />;
  }

  const staticBlog = BLOG_DATA[id];
  if (staticBlog) {
    return <BlogDetailClient blog={staticBlog} latestBlogs={latestBlogs} />;
  }

  // Check iPublish
  const ipublishContent =
    (await getIPublishPageBySlug(id)) || (await getIPublishContentById(id));
  if (ipublishContent) {
    const imageUrl = getIPublishImageUrl(ipublishContent.featured_image_url);
    const schemaJsonData = ipublishContent.schema_json
      ? {
          ...ipublishContent.schema_json,
          ...(imageUrl && !ipublishContent.schema_json.image ? { image: imageUrl } : {}),
        }
      : {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: ipublishContent.seo_title || ipublishContent.title,
          description:
            ipublishContent.meta_description ||
            ipublishContent.og_description ||
            ipublishContent.excerpt ||
            "",
          image: imageUrl,
          dateModified:
            ipublishContent.updated_at ||
            ipublishContent.published_at ||
            ipublishContent.created_at,
          keywords: [
            ipublishContent.focus_keyword,
            ...(ipublishContent.secondary_keywords || []),
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
        <IPublishDetailClient content={ipublishContent} slug={id} />
      </>
    );
  }

  notFound();
}
