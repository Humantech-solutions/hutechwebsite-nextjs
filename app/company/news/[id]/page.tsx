import NewsDetailClient from "./NewsDetailClient";

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
  return Object.keys(NEWS_DATA).map((id) => ({
    id: id,
  }));
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  return <NewsDetailClient id={id} />;
}
