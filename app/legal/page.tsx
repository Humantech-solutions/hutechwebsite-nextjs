import { Suspense } from "react";
import LegalClient from "./PageClient";
import { constructMetadata } from "@/lib/seo";
import { getSitemapData, getPageByUri } from "@/lib/wordpress";

export const metadata = constructMetadata({
  title: "Legal & Compliance | Hutech Solutions",
  description: "View our terms and conditions, privacy policy, cookie policy, and code of conduct.",
  path: "/legal/",
});

export const revalidate = 0;

export default async function LegalPage() {
  const [sitemapData, pageData] = await Promise.all([getSitemapData(), getPageByUri("/legal/")]);

  const legalSection = sitemapData.find((s) => s.title === "Legal & Policies");
  const dynamicLinks = legalSection?.links || null;

  return (
    <Suspense>
      <LegalClient dynamicLinks={dynamicLinks} heroSettings={pageData?.hubHeroSettings} />
    </Suspense>
  );
}
