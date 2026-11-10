import { getServiceBySlug, getBlogsByCategory, getIndustriesList, getPostTemplateBySlug, getService2PageData, getProductBySlug } from "@/lib/wordpress";
import IndustryDetailClient from "./IndustryDetailClient";
import ServiceDetailClient from "@/app/services/[slug]/ServiceDetailClient";
import MasterPageClient from "@/app/services/legacy-application-modernization/MasterPageClient";
import { ModernProductTemplate } from "@/components/products/ModernProductTemplate";
import { PRODUCT_1_DATA } from "@/lib/product-1-data";
import { constructMetadata, getWebPageSchema } from "@/lib/seo";

export const revalidate = 0;

export async function generateStaticParams() {
  const industries = await getIndustriesList();
  
  // Static slugs provided as fallbacks if WP is unreachable during build
  const staticSlugs = [
    "banking-finance",
    "healthcare-life-sciences",
    "logistics-supply-chain",
    "manufacturing",
    "retail-consumer",
    "utilities-energy",
  ];
  
  const allSlugs = Array.from(new Set([...staticSlugs, ...industries.map(i => i.slug)]));
  
  return allSlugs.map((slug) => ({ slug }));
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Check template choice across all post types
  const postLookup = await getPostTemplateBySlug(slug, `/industries/${slug}/`);
  const activeTemplate = (postLookup.template || "industry").toLowerCase().trim();

  // 2. If Service-2 is selected
  if (activeTemplate === "service-2") {
    const service2Data = await getService2PageData(`/industries/${slug}/`, slug);
    return <MasterPageClient data={service2Data} />;
  }

  // 3. If Service-1 is selected
  if (activeTemplate === "service-1") {
    const service = (await getServiceBySlug(slug)) || {
      id: slug,
      slug,
      title: titleFromSlug(slug),
    };
    const categoryName = service.blogCategorySlug || service.blogCategory || "Industry";
    const blogs = await getBlogsByCategory(categoryName);
    return <ServiceDetailClient service={service} blogs={blogs} />;
  }

  // 4. If Product Page is selected
  if (activeTemplate === "product") {
    const productData = await getProductBySlug(slug);
    return <ModernProductTemplate data={productData || PRODUCT_1_DATA} />;
  }

  // 5. Default to Industry Detail
  const service =
    (await getServiceBySlug(slug)) || {
      id: slug,
      slug,
      title: titleFromSlug(slug),
    };

  const categoryName = service.blogCategorySlug || service.blogCategory || "Industry";
  const blogs = await getBlogsByCategory(categoryName);

  const schemaJsonData = getWebPageSchema({
    title: (service as any)?.heroTitle || (service as any)?.title || titleFromSlug(slug),
    description: (service as any)?.heroDescription || `Explore ${(service as any)?.title || titleFromSlug(slug)} technology and digital transformation solutions from Hutech Solutions.`,
    path: `/industries/${slug}/`,
    image: (service as any)?.heroBgImage
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonData) }} />
      <IndustryDetailClient service={service} blogs={blogs} />
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug).catch(() => null);
  const title = service?.heroTitle || service?.title || titleFromSlug(slug);

  return constructMetadata({
    title: `${title} | Hutech Solutions`,
    description:
      service?.heroDescription ||
      `Explore ${title} technology and digital transformation solutions from Hutech Solutions.`,
    image: service?.heroBgImage,
    path: `/industries/${slug}/`,
  });
}
