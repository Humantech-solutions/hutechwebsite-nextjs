import { getNewsBySlug, getNewsItems, getPressReleases } from "@/lib/wordpress";
import NewsDetailClient from "./NewsDetailClient";
import { constructMetadata } from "@/lib/seo";

const NEWS_DATA = {
  "top-global-tech-firms-2025": {
    title: "Hutech Solutions Ranked Among Top Global Tech Firms",
  },
  "london-expansion-growth": {
    title: "Expanding Global Reach: New Office in London",
  },
  "innovating-ai-framework": {
    title: "Innovating with AI: Hutech's New ML Framework",
  },
};

export async function generateStaticParams() {
  const wpNews = await getNewsItems();
  const wpSlugs = wpNews.map((item) => item.id);
  const staticSlugs = Object.keys(NEWS_DATA);
  const allSlugs = Array.from(new Set([...wpSlugs, ...staticSlugs]));

  return allSlugs.map((id) => ({
    id: id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const news: any = await getNewsBySlug(id).catch(() => null);
  const fallback = NEWS_DATA[id as keyof typeof NEWS_DATA];

  return constructMetadata({
    title: news?.title || fallback?.title || "News",
    description: news?.excerpt || news?.description || "",
    image: news?.image || news?.imageUrl,
    path: `/company/news/${id}/`,
    type: "article",
    publishedTime: news?.date,
  });
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const [wpNews, latestReleases] = await Promise.all([
    getNewsBySlug(id),
    getPressReleases()
  ]);

  return <NewsDetailClient news={wpNews || undefined} id={id} latestReleases={latestReleases} />;
}
