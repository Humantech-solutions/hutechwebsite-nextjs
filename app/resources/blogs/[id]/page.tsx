import BlogDetailClient from "./BlogDetailClient";
import { getBlogBySlug, getBlogs } from "@/lib/wordpress";
import { BLOG_DATA } from "@/lib/data/blogs";
import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateStaticParams() {
  const wpBlogs = await getBlogs().catch(() => []);
  const ids = new Set([
    ...Object.keys(BLOG_DATA),
    ...wpBlogs.map((b) => b.slug).filter(Boolean),
  ]);

  return Array.from(ids).map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const wpBlog = await getBlogBySlug(id).catch(() => null);
  const staticBlog = BLOG_DATA[id];
  const blog: any = wpBlog || staticBlog;

  if (!blog) {
    return constructMetadata({
      title: "Blog",
      path: `/resources/blogs/${id}/`,
    });
  }

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
    // Convert WpBlog to the Blog shape BlogDetailClient expects
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
      // content as HTML string (rendered from WP)
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
  if (!staticBlog) {
    notFound();
  }

  return <BlogDetailClient blog={staticBlog} latestBlogs={latestBlogs} />;
}
