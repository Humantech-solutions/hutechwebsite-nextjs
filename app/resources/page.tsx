import { Suspense } from "react";
import ResourcesClient from "./PageClient";
import { constructMetadata, getWebPageSchema } from "@/lib/seo";
import { getSitemapData, getPageByUri } from "@/lib/wordpress";

export const metadata = constructMetadata({
  title: "Resources & Insights | Hutech Solutions",
  description:
    "Explore the latest technology trends, case studies, and digital transformation insights from Hutech Solutions.",
  path: "/resources/",
});

export const revalidate = 0;

export default async function ResourcesPage() {
  const [sitemapData, pageData] = await Promise.all([
    getSitemapData(),
    getPageByUri("/resources/"),
  ]);

  const resourcesSection = sitemapData.find((s) => s.title === "Resources Hub");
  const dynamicLinks = resourcesSection?.links || null;

  return (
    <Suspense>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getWebPageSchema({
              title: "Resources",
              description: "Explore our latest articles, case studies, and insights on technology and digital transformation.",
              path: "/resources/",
            })
          ),
        }}
      />
      <ResourcesClient dynamicLinks={dynamicLinks} heroSettings={pageData?.hubHeroSettings} />
    </Suspense>
  );
}
