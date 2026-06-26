import BlogDetailClient from "./BlogDetailClient";
import { getBlogBySlug, getBlogs } from "@/lib/wordpress";
import { BLOG_DATA } from "@/lib/data/blogs";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  const wpBlogs = await getBlogs().catch(() => []);
  const ids = new Set([
    ...Object.keys(BLOG_DATA),
    ...wpBlogs.map((b) => b.slug).filter(Boolean),
  ]);

  return Array.from(ids).map((id) => ({ id }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // 1. Try WordPress first
  const wpBlog = await getBlogBySlug(id).catch(() => null);

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
    return <BlogDetailClient blog={blog as any} />;
  }

  const staticBlog = BLOG_DATA[id];
  if (!staticBlog) {
    notFound();
  }

  return <BlogDetailClient blog={staticBlog} />;
}
