import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Sitemap | Hutech Solutions",
  description: "Browse the complete sitemap of the Hutech Solutions website to find all our services, industry solutions, resources, and company pages.",
  path: "/legal/sitemap/",
  noIndex: true,
});

export { default } from "./PageClient";
