import { constructMetadata } from "@/lib/seo";
import { ModernProductTemplate } from "@/components/products/ModernProductTemplate";
import { PRODUCT_1_DATA } from "@/lib/product-1-data";

export const revalidate = 0;

export async function generateMetadata() {
  return constructMetadata({
    title: "LumaCore | The Intelligent Work Platform | Hutech Solutions",
    description:
      "LumaCore connects your people, data, and workflows in one adaptive platform—so your organization can move with clarity and speed.",
    path: "/products/product-1/",
  });
}

export default function Product1Page() {
  return <ModernProductTemplate data={PRODUCT_1_DATA} />;
}
