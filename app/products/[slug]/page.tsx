import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/seo";
import { ModernProductTemplate } from "@/components/products/ModernProductTemplate";
import { PRODUCT_1_DATA } from "@/lib/product-1-data";
import { getProductBySlug } from "@/lib/wordpress";

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
  const data = await getProductBySlug(slug);

  if (!data) {
    notFound();
  }

  return <ModernProductTemplate data={data} />;
}

