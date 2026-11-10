import { constructMetadata } from "@/lib/seo";
import { ModernProductTemplate } from "@/components/products/ModernProductTemplate";
import { PRODUCT_1_DATA } from "@/lib/product-1-data";
import { getProductBySlug } from "@/lib/wordpress";

export const revalidate = 0;

export async function generateMetadata() {
  const product = await getProductBySlug("product-1");
  const hero = product?.hero || PRODUCT_1_DATA.hero;
  return constructMetadata({
    title: `${hero.titleLine1 || "LumaCore"} | The Intelligent Work Platform | Hutech Solutions`,
    description: hero.description || PRODUCT_1_DATA.hero.description,
    path: "/products/product-1/",
  });
}

export default async function Product1Page() {
  const data = await getProductBySlug("product-1");
  return <ModernProductTemplate data={data || PRODUCT_1_DATA} />;
}
