import { Suspense } from "react";
import PageClient from "./PageClient";
import { getIndustryPageData, getIndustriesList } from "@/lib/wordpress";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Industries We Serve | Hutech Solutions",
  description: "Hutech Solutions serves banking, healthcare, manufacturing, logistics, and retail with tailored digital transformation solutions.",
  path: "/industries/",
});

export const revalidate = 0;

export default async function IndustriesPage() {
  const [pageData, industriesList] = await Promise.all([
    getIndustryPageData(),
    getIndustriesList(),
  ]);

  return (
    <Suspense>
      <PageClient
        pageData={pageData}
        industriesList={industriesList}
      />
    </Suspense>
  );
}
