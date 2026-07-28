import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/wordpress";
import PageClient from "./PageClient";
import { constructMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) {
    return constructMetadata({ title: "Page Not Found | Hutech Solutions" });
  }

  // Strip HTML for the excerpt
  const excerpt = page.content.replace(/<[^>]+>/g, "").slice(0, 150) + "...";

  return constructMetadata({
    title: `${page.title} | Hutech Solutions`,
    description: excerpt,
    path: `/legal/${params.slug}/`,
  });
}

export function generateStaticParams() {
  return [
    { slug: "privacy" },
    { slug: "terms" },
    { slug: "cookie-policy" },
    { slug: "code-of-conduct" },
    { slug: "sitemap" },
  ];
}

export default async function DynamicLegalPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return <PageClient page={page} />;
}
