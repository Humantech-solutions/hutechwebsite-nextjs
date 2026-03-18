import ProductDetailClient from "./ProductDetailClient";
import { PRODUCTS_DATA } from "./data";

export async function generateStaticParams() {
  return Object.keys(PRODUCTS_DATA).map((id) => ({
    id: id,
  }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  return <ProductDetailClient id={id} />;
}
