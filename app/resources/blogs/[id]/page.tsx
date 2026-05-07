import BlogDetailClient from "./BlogDetailClient";
import { BLOG_DATA } from "@/lib/data/blogs";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return Object.keys(BLOG_DATA).map((id) => ({
    id,
  }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = BLOG_DATA[id];
  
  if (!blog) {
    notFound();
  }
  
  return <BlogDetailClient blog={blog} />;
}
