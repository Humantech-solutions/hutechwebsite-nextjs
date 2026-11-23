import { Suspense } from "react";
import PageClient from "./PageClient";
import { getProductPageData, getProductsList } from "@/lib/wordpress";
import { constructMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
  const pageData = await getProductPageData();
  return constructMetadata({
    title: "Proprietary Enterprise Software Platforms | Hutech Solutions",
    description:
      pageData?.description ||
      "Explore Hutech Solutions suite of proprietary products and enterprise platforms designed to accelerate digital transformation, reduce operational overhead, and power mission-critical workloads.",
    path: "/products/",
  });
}

export default async function ProductsPage() {
  const pageData = await getProductPageData();

  const categorySlug = pageData?.categorySlug || "";
  const categoryName = pageData?.category || "";
  const configuredCount = pageData?.postsCount || pageData?.productsCount || 0;
  const limit = configuredCount > 0 ? configuredCount : 100;

  const products = await getProductsList({
    categorySlug,
    categoryName,
    limit,
  });

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-[#0171c1]"></div>
        </div>
      }
    >
      <PageClient pageData={pageData} products={products} />
    </Suspense>
  );
}
