import { Suspense } from "react";
import ResourcesClient from "./PageClient";
import { constructMetadata } from "@/lib/seo";
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
      <ResourcesClient dynamicLinks={dynamicLinks} heroSettings={pageData?.hubHeroSettings} />
    </Suspense>
  );
}
