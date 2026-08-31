import { Suspense } from "react";
import BlogsClient from "./BlogsClient";
import { getBlogs, getBlogPageData } from "@/lib/wordpress";
import { getIPublishAllBlogs, getIPublishImageUrl } from "@/lib/ipublish";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Blogs | Hutech Solutions",
  description: "Explore the Hutech Solutions blog for technology insights, industry trends, and expert perspectives on AI, cloud, DevOps, and digital transformation.",
  path: "/resources/blogs/",
});

export const revalidate = 60;

export default async function BlogsPage() {
  // Fetch WP data and iPublish data in parallel
  const [wpBlogs, wpPageData, ipublishData] = await Promise.all([
    getBlogs(),
    getBlogPageData(),
    getIPublishAllBlogs(),
  ]);

  const ipublishBlogs = ipublishData.map((item) => {
    const rawDate = item.updated_at || item.published_at || item.created_at;
    const formattedDate = rawDate
      ? new Date(rawDate).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "Recent";

    const wordCount = item.word_count || 500;
    const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

    return {
      id: item.slug || item.id || "",
      slug: item.slug || item.id || "",
      title: item.title,
      date: formattedDate,
      excerpt: item.excerpt || "",
      content: "",
      author: "Hutech Solutions",
      category: item.content_type
        ? item.content_type.charAt(0).toUpperCase() + item.content_type.slice(1)
        : "iPublish",
      imageUrl: getIPublishImageUrl(item.featured_image_url),
      readTime: `${readTimeMinutes} min read`,
      tags: item.tags || [],
      isIPublish: true,
      ipublishMeta: {
        gradientFrom: item.banner_gradient_from,
        gradientTo: item.banner_gradient_to,
        gradientDirection: item.banner_gradient_direction,
        pattern: item.banner_pattern,
        patternColor: item.banner_pattern_color,
        patternOpacity: item.banner_pattern_opacity,
        overlayColor: item.overlay_color,
        overlayOpacity: item.featured_image_overlay,
        titlePosition: item.featured_title_position,
        titleColor: item.title_color,
        titleColorMode: item.title_color_mode,
        titleGradientTo: item.title_gradient_to,
        titleGradientDirection: item.title_gradient_direction,
        titleFont: item.title_font,
        titleWeight: item.title_weight,
        titleItalic: item.title_italic,
        titleScale: item.title_size_scale,
        titleLineHeight: item.title_line_height,
        titleShadow: item.title_shadow,
        titlePadding: item.featured_title_padding,
        titleMarginX: item.title_margin_x,
        titleMarginY: item.title_margin_y,
      },
    };
  });

  const allBlogs = [...ipublishBlogs, ...wpBlogs];

  // Page title/description: WP ACF if available, else defaults
  const pageTitle = wpPageData?.title || "Insights &|Perspectives.";
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
