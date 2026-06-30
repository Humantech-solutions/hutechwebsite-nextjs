import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Required for Next.js static export (output: "export") mode.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
