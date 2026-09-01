import { getServiceBySlug, getBlogsByCategory, getIndustriesList } from "@/lib/wordpress";
import IndustryDetailClient from "./IndustryDetailClient";
import { constructMetadata } from "@/lib/seo";

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
  const service =
    (await getServiceBySlug(slug)) || {
      id: slug,
      slug,
      title: titleFromSlug(slug),
    };

  // Fetch blogs based on the category specified in ACF or domain default
  const categoryName = service.blogCategorySlug || service.blogCategory || "Industry";
  const blogs = await getBlogsByCategory(categoryName);

  return <IndustryDetailClient service={service} blogs={blogs} />;
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
