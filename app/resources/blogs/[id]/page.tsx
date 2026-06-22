import BlogDetailClient from "./BlogDetailClient";
import { getBlogBySlug, getBlogs } from "@/lib/wordpress";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  // Only pre-render WP slugs
  const wpBlogs = await getBlogs().catch(() => []);
  return wpBlogs.map((b) => ({ id: b.slug }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // 1. Try WordPress first
  const wpBlog = await getBlogBySlug(id);

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

  // If not found in WordPress, return 404
  notFound();
}
