import { Suspense } from "react";
import PageClient from "./PageClient";
import { getServicePageData, getServiceCategoriesWithServices } from "@/lib/wordpress";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Our Services | Hutech Solutions",
  description: "Explore Hutech Solutions full suite of services including AI/ML, cloud transformation, DevOps, data engineering, cybersecurity, and enterprise digital solutions.",
  path: "/services/",
});

export const revalidate = 60;

export default async function ServicesPage() {
  const [pageData, serviceCategories] = await Promise.all([
    getServicePageData(),
    getServiceCategoriesWithServices(),
  ]);

  const pageTitle = pageData?.title || "Comprehensive Technology Services for |Complex Businesses.";
  const pageDescription = pageData?.description || "From strategic consulting to full-cycle development, we provide the technical edge needed to dominate your industry.";

  return (
    <Suspense>
      <PageClient 
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        serviceCategories={serviceCategories}
        pageData={pageData}
      />
    </Suspense>
  );
}
