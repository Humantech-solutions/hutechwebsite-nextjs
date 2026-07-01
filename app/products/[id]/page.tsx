import ProductDetailClient from "./ProductDetailClient";
import { PRODUCTS_DATA } from "./data";
import { constructMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return Object.keys(PRODUCTS_DATA).map((id) => ({
    id: id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product: any = PRODUCTS_DATA[id as keyof typeof PRODUCTS_DATA];

  return constructMetadata({
    title: product?.name || product?.title || "Product",
    description: product?.description || product?.tagline || "",
    image: product?.image,
    path: `/products/${id}/`,
  });
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  return <ProductDetailClient id={id} />;
}
