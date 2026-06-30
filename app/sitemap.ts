import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import {
  getBlogs,
  getCareers,
  getCaseStudies,
  getEvents,
  getServicesList,
} from "@/lib/wordpress";

const staticPaths = [
  "/",
  "/about/",
  "/company/about/",
  "/company/vision-mission-values/",
  "/company/leadership/",
  "/company/partnership/",
  "/company/life-at-hutech/",
  "/company/news/",
  "/company/press-release/",
  "/company/awards/",
  "/careers/",
  "/contact/",
  "/industries/",
  "/industries/banking-finance/",
  "/industries/healthcare-life-sciences/",
  "/industries/logistics-supply-chain/",
  "/industries/manufacturing/",
  "/industries/retail-consumer/",
  "/industries/utilities-energy/",
  "/products/",
  "/resources/",
  "/resources/blogs/",
  "/resources/case-studies/",
  "/resources/events/",
  "/resources/hutech-documents/",
  "/services/",
  "/services/ai-consulting/",
  "/services/ai-ml/",
  "/services/application-development-maintenance/",
  "/services/cloud-transformation/",
  "/services/consulting/",
  "/services/cybersecurity/",
  "/services/data-engineering/",
  "/services/data-visualization-reporting/",
  "/services/devops/",
  "/services/ecommerce/",
  "/services/erp/",
  "/services/fintech/",
  "/services/iot/",
  "/legal/code-of-conduct/",
  "/legal/cookie-policy/",
  "/legal/privacy/",
  "/legal/sitemap/",
  "/legal/terms/",
];

function url(path: string) {
  return new URL(path, siteConfig.url).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [blogs, caseStudies, events, jobs, services] = await Promise.all([
    getBlogs().catch(() => []),
    getCaseStudies().catch(() => []),
    getEvents().catch(() => []),
    getCareers().catch(() => []),
    getServicesList().catch(() => []),
  ]);

  const dynamicPaths = [
    ...blogs.map((item) => `/resources/blogs/${item.slug}/`),
    ...caseStudies.map((item) => `/resources/case-studies/${item.slug}/`),
    ...events.map((item) => `/resources/events/${item.id || item.slug}/`),
    ...jobs.map((item) => `/careers/${item.id}/`),
    ...services.map((item) => `/services/${item.slug}/`),
  ].filter(Boolean);

  return Array.from(new Set([...staticPaths, ...dynamicPaths])).map((path) => ({
    url: url(path),
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.split("/").filter(Boolean).length > 1 ? 0.7 : 0.8,
  }));
}
