import { Metadata } from "next";
import { getPageByUri, getSitemapData, WpPage } from "@/lib/wordpress";
import PageClient from "@/app/[...slug]/PageClient";
import { constructMetadata, getWebPageSchema } from "@/lib/seo";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const uri = "/legal/sitemap/";
  const page = await getPageByUri(uri);
  const title = page?.title ? `${page.title} | Hutech Solutions` : "Sitemap | Hutech Solutions";
  const description =
    page?.content?.replace(/<[^>]+>/g, "").slice(0, 150) ||
    "A comprehensive directory of our website content.";

  return constructMetadata({
    title,
    description,
    path: uri,
  });
}

export default async function SitemapPage() {
  const uri = "/legal/sitemap/";
  const [page, sitemapSections] = await Promise.all([
    getPageByUri(uri),
    getSitemapData(uri),
  ]);

  const fallbackPage: WpPage = {
    title: page?.title || "Sitemap",
    content: page?.content || "",
    date:
      page?.date ||
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    slug: "sitemap",
    uri: "/legal/sitemap/",
  };

  const schemaJsonData = getWebPageSchema({
    title: page?.title || "Sitemap",
    description: "A comprehensive directory of our website content.",
    path: uri,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonData) }}
      />
      <PageClient page={page || fallbackPage} sitemapSections={sitemapSections} />
    </>
  );
}
