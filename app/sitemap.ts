import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import {
  getBlogs,
  getCareers,
  getCaseStudies,
  getEvents,
  getServicesList,
  getIndustriesList,
  getNewsItems,
  getPressReleases,
  getHutechDocuments,
  getAllPageUris,
} from "@/lib/wordpress";
import { getRecruitProJobs } from "@/lib/api";

// Required for Next.js static export (output: "export") mode.
export const dynamic = "force-static";
export const revalidate = false;

function url(path: string) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const normalizedPath = cleanPath.endsWith("/") ? cleanPath : `${cleanPath}/`;
  return new URL(normalizedPath, siteConfig.url).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [
    blogs,
    caseStudies,
    events,
    wpJobs,
    recruitProJobs,
    services,
    industries,
    newsItems,
    pressReleases,
    documents,
    allWpPages,
  ] = await Promise.all([
    getBlogs().catch(() => []),
    getCaseStudies().catch(() => []),
    getEvents().catch(() => []),
    getCareers().catch(() => []),
    getRecruitProJobs().catch(() => []),
    getServicesList().catch(() => []),
    getIndustriesList().catch(() => []),
    getNewsItems().catch(() => []),
    getPressReleases().catch(() => []),
    getHutechDocuments().catch(() => []),
    getAllPageUris().catch(() => []),
  ]);

  // Root & section hub paths that exist
  const basePaths = [
    "/",
    "/about/",
    "/careers/",
    "/contact/",
    "/services/",
    "/industries/",
    "/resources/",
    "/blogs/",
    "/events/",
    "/legal/sitemap/",
  ];

  // Live WordPress pages from getAllPageUris()
  const wpPagePaths = allWpPages
    .map((p) => p.uri)
    .filter((uri) => uri && uri !== "/" && !uri.startsWith("/wp-"));

  // Live dynamic paths only
  const dynamicPaths = [
    ...basePaths,
    ...wpPagePaths,
    ...services.map((item) => `/services/${item.slug}/`),
    ...industries.map((item) => `/industries/${item.slug}/`),
    ...blogs.map((item) => `/resources/blogs/${item.slug}/`),
    ...caseStudies.map((item) => `/resources/case-studies/${item.slug}/`),
    ...events.map((item) => `/resources/events/${item.slug || item.id}/`),
    ...events.map((item) => `/events/${item.slug || item.id}/`),
    ...newsItems.map((item) => `/company/news/${item.id || item.slug}/`),
    ...recruitProJobs.map((j) => `/careers/${j.id}/`),
    ...wpJobs.map((j) => `/careers/${j.id}/`),
  ].filter(Boolean);

  const allUniquePaths = Array.from(new Set(dynamicPaths));

  return allUniquePaths.map((path) => ({
    url: url(path),
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority:
      path === "/"
        ? 1
        : path.split("/").filter(Boolean).length > 1
        ? 0.7
        : 0.8,
  }));
}
