import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/seo";
import { ModernProductTemplate } from "@/components/products/ModernProductTemplate";
import { PRODUCT_1_DATA } from "@/lib/product-1-data";
import { getProductBySlug, getPostTemplateBySlug, getService2PageData, getServiceBySlug, getBlogsByCategory } from "@/lib/wordpress";
import MasterPageClient from "@/app/services/legacy-application-modernization/MasterPageClient";
import ServiceDetailClient from "@/app/services/[slug]/ServiceDetailClient";

export const revalidate = 60;

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return constructMetadata({
      title: "Product Not Found | Hutech Solutions",
      description: "The requested product could not be found.",
      path: `/products/${slug}/`,
    });
  }

  const hero = product.hero || PRODUCT_1_DATA.hero;
  return constructMetadata({
    title: `${hero.titleLine1 || "Product"} | Hutech Solutions`,
    description: hero.description || "Explore advanced enterprise solutions with Hutech Solutions.",
    path: `/products/${slug}/`,
  });
}

export default async function ProductDynamicPage({ params }: ProductPageProps) {
  const { slug } = await params;

  // 1. Check template choice across all post types
  const postLookup = await getPostTemplateBySlug(slug, `/products/${slug}/`);
  const activeTemplate = (postLookup.template || "product").toLowerCase().trim();

  // 2. If Service-2 is selected
  if (activeTemplate === "service-2") {
    const service2Data = await getService2PageData(`/products/${slug}/`, slug);
    return <MasterPageClient data={service2Data} />;
  }

  // 3. If Service-1 is selected
  if (activeTemplate === "service-1") {
    const service = (await getServiceBySlug(slug)) || {
      id: slug,
      slug,
      title: slug,
    };
    const categoryName = (service as any).blogCategorySlug || (service as any).blogCategory || "General";
    const blogs = await getBlogsByCategory(categoryName);
    return <ServiceDetailClient service={service} blogs={blogs} />;
  }

  // 4. Default to Product Template
  const data = await getProductBySlug(slug);
  if (!data) {
    notFound();
  }

  return <ModernProductTemplate data={data} />;
}
