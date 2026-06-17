import { Suspense } from "react";
import BlogsClient from "./BlogsClient";
import { getBlogs, getBlogPageData } from "@/lib/wordpress";


export const revalidate = 60;

export default async function BlogsPage() {
  // Fetch WP data in parallel
  const [wpBlogs, wpPageData] = await Promise.all([
    getBlogs(),
    getBlogPageData(),
  ]);

  const allBlogs = wpBlogs;

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
