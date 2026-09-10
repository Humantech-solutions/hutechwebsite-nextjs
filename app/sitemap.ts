import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getSitemapData, getCareers } from "@/lib/wordpress";
import { getRecruitProJobs } from "@/lib/api";

// Enable dynamic rendering so new CMS pages and posts appear automatically without rebuilding
export const dynamic = "force-dynamic";
export const revalidate = 60;

function url(path: string) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const normalizedPath = cleanPath.endsWith("/") ? cleanPath : `${cleanPath}/`;
  return new URL(normalizedPath, siteConfig.url).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Dynamically load all sections from the existing CMS sitemap generator (pages, services, industries, blogs, case studies, events, docs, legal)
  const [sitemapSections, wpJobs, recruitProJobs] = await Promise.all([
    getSitemapData().catch(() => []),
    getCareers().catch(() => []),
    getRecruitProJobs().catch(() => []),
  ]);

  // Extract all page and post paths generated automatically by getSitemapData()
  const sitemapPaths = sitemapSections.flatMap((section) =>
    section.links.map((link) => link.path)
  );

  // Extract careers / job listing paths
  const jobPaths = [
    ...wpJobs.filter((j) => j.id && j.id !== "careers").map((j) => `/careers/${j.id}/`),
    ...recruitProJobs.filter((j) => j.id && j.id !== "careers").map((j) => `/careers/${j.id}/`),
  ];

  // Primary hubs
  const baseHubs = [
    "/",
    "/services/",
    "/industries/",
    "/resources/",
    "/blogs/",
    "/events/",
  ];

  const COMPANY_SLUGS = new Set([
    "leadership",
    "awards",
    "vision-mission-values",
    "partnership",
    "life-at-hutech",
    "news",
    "press-release",
    "graduates",
    "open-positions",
  ]);

  const RESOURCE_SLUGS = new Set([
    "case-studies",
    "hutech-documents",
  ]);

  const allPaths = [
    ...baseHubs,
    ...sitemapPaths,
    ...jobPaths,
  ]
    .filter((path) => path && path !== "#" && !path.startsWith("http"))
    .map((path) => {
      const clean = path.startsWith("/") ? path : `/${path}`;
      const normalized = clean.endsWith("/") ? clean : `${clean}/`;
      const segments = normalized.split("/").filter(Boolean);

      // Company dropdown pages canonically live under /company/...
      if (segments.length === 1) {
        if (COMPANY_SLUGS.has(segments[0])) return `/company/${segments[0]}/`;
        if (RESOURCE_SLUGS.has(segments[0])) return `/resources/${segments[0]}/`;
      }

      return normalized;
    })
    .filter((path) => path !== "/home/" && path !== "/legal/");

  const uniquePaths = Array.from(new Set(allPaths));

  return uniquePaths.map((path) => ({
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
