import { Suspense } from "react";
import CompanyClient from "./PageClient";
import { constructMetadata } from "@/lib/seo";
import { getSitemapData, getPageByUri } from "@/lib/wordpress";

export const metadata = constructMetadata({
  title: "Company | Hutech Solutions",
  description:
    "Discover Hutech Solutions: our journey, leadership, culture, news, and career opportunities.",
  path: "/company/",
});

export const revalidate = 0;

export default async function CompanyPage() {
  const [sitemapData, pageData] = await Promise.all([getSitemapData(), getPageByUri("/company/")]);

  const companySection = sitemapData.find((s) => s.title === "Company");
  const dynamicLinks = companySection?.links || null;

  return (
    <Suspense>
      <CompanyClient dynamicLinks={dynamicLinks} heroSettings={pageData?.hubHeroSettings} />
    </Suspense>
  );
}
