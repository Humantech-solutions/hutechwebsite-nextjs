import { getServiceBySlug, getBlogsByCategory, getServicesList, getService2PageData, getProductBySlug, getPostTemplateBySlug } from "@/lib/wordpress";
import ServiceDetailClient from "./ServiceDetailClient";
import MasterPageClient from "@/app/services/legacy-application-modernization/MasterPageClient";
import { ModernProductTemplate } from "@/components/products/ModernProductTemplate";
import { PRODUCT_1_DATA } from "@/lib/product-1-data";
import { constructMetadata, getWebPageSchema } from "@/lib/seo";

export const revalidate = 0;

export async function generateStaticParams() {
  const services = await getServicesList();
  
  // These are the static slugs provided as fallbacks if WP is unreachable during build
  const staticSlugs = [
    "ai-consulting", "ai-ml", "application-development-maintenance", 
    "cloud-transformation", "consulting", "cybersecurity", "data-engineering", 
    "data-visualization-reporting", "devops", "ecommerce", "erp", "fintech", "iot",
    "retail-consumer", "manufacturing", "logistics-supply-chain", "utilities-energy",
    "healthcare-life-sciences", "banking-finance"
  ];
  
  const allSlugs = Array.from(new Set([...staticSlugs, ...services.map(s => s.slug)]));
  
  return allSlugs.map((slug) => ({ slug }));
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service =
    (await getServiceBySlug(slug)) || {
      id: slug,
      slug,
      title: titleFromSlug(slug),
    };

  const schemaJsonData = getWebPageSchema({
    title: (service as any)?.heroTitle || (service as any)?.title || titleFromSlug(slug),
    description: (service as any)?.heroDescription || `Explore ${(service as any)?.title || titleFromSlug(slug)} services from Hutech Solutions.`,
    path: `/services/${slug}/`,
    image: (service as any)?.heroBgImage
  });

  const postLookup = await getPostTemplateBySlug(slug, `/services/${slug}/`);
  const tpl = (
    postLookup.template ||
    (service as any)?.pageRoutingSettings?.nextjsTemplate ||
    (service as any)?.template ||
    (slug === "legacy-application-modernization" ? "service-2" : "service-1")
  ).toLowerCase().trim();

  // 1. Service-2 Template
  if (tpl === "service-2") {
    const service2Data = await getService2PageData(`/services/${slug}/`, slug);
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonData) }} />
        <MasterPageClient data={service2Data} />
      </>
    );
  }

  // 2. Product Page Template
  if (tpl === "product") {
    const productData = await getProductBySlug(slug);
    return <ModernProductTemplate data={productData || PRODUCT_1_DATA} />;
  }

  // 3. Default to Service-1 (standard service detail)
  const categoryName = service.blogCategorySlug || service.blogCategory || "General";
  const blogs = await getBlogsByCategory(categoryName);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonData) }} />
      <ServiceDetailClient service={service} blogs={blogs} />
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug).catch(() => null);
  const title = service?.heroTitle || service?.title || titleFromSlug(slug);

  return constructMetadata({
    title,
    description:
      service?.heroDescription ||
      `Explore ${title} services from Hutech Solutions.`,
    image: service?.heroBgImage,
    path: `/services/${slug}/`,
  });
}
