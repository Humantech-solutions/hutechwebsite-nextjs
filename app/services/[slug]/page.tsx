import { getServiceBySlug, getBlogsByCategory, getServicesList } from "@/lib/wordpress";
import ServiceDetailClient from "./ServiceDetailClient";
import { constructMetadata } from "@/lib/seo";

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

  // Fetch blogs based on the category specified in ACF
  const categoryName = service.blogCategorySlug || service.blogCategory || "General";
  const blogs = await getBlogsByCategory(categoryName);

  return <ServiceDetailClient service={service} blogs={blogs} />;
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
