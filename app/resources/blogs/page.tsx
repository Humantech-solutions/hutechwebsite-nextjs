import { Suspense } from "react";
import BlogsClient from "./BlogsClient";
import { getBlogs, getBlogPageData } from "@/lib/wordpress";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Blogs | Hutech Solutions",
  description: "Explore the Hutech Solutions blog for technology insights, industry trends, and expert perspectives on AI, cloud, DevOps, and digital transformation.",
  path: "/resources/blogs/",
});


export const revalidate = 60;

export default async function BlogsPage() {
  // Fetch WP data in parallel
  const [wpBlogs, wpPageData, ipublishData] = await Promise.all([
    getBlogs(),
    getBlogPageData(),
    import("@/lib/ipublish").then(m => m.getIPublishContents())
  ]);

  const ipublishBlogs = ipublishData
    .filter((item: any) => item.content_type === "blog")
    .map((item: any) => ({
      id: item.id,
      slug: item.id, // Use ID as slug for routing to our dynamic page
      title: item.title,
      date: new Date(item.published_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      excerpt: item.excerpt || "",
      content: "", // Content will be fetched on the detail page
      author: "Hutech Solutions",
      category: "iPublish",
      imageUrl: item.featured_image_url || undefined,
      readTime: "3 min read",
      tags: [],
      isIPublish: true,
      ipublishMeta: {
        gradientFrom: item.banner_gradient_from,
        gradientTo: item.banner_gradient_to,
        gradientDirection: item.banner_gradient_direction,
        pattern: item.banner_pattern
      }
    }));

  const allBlogs = [...ipublishBlogs, ...wpBlogs];

  // Page title/description: WP ACF if available, else defaults
  const pageTitle =
    wpPageData?.title ||
    "Insights &|Perspectives.";
  const pageDescription =
    wpPageData?.description ||
    "Stay ahead of the curve with the latest trends, expert analyses, and technological innovations curated by our global team.";

  return (
    <Suspense>
      <BlogsClient
        blogs={allBlogs}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        bgImageUrl={wpPageData?.bgImageUrl}
      />
    </Suspense>
  );
}
