import { getServiceBySlug, getBlogsByCategory, getServicesList } from "@/lib/wordpress";
import ServiceDetailClient from "./ServiceDetailClient";

export async function generateStaticParams() {
  const services = await getServicesList();
  
  // These are the static hardcoded pages currently existing.
  // We provide them as fallbacks if WP isn't fully populated yet.
  const staticSlugs = [
    "ai-consulting", "ai-ml", "application-development-maintenance", 
    "cloud-transformation", "consulting", "cybersecurity", "data-engineering", 
    "data-visualization-reporting", "devops", "ecommerce", "erp", "fintech", "iot"
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
