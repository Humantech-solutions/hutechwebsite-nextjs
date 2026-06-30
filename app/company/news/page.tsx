// Server component – fetches WordPress data then renders the client UI
import { getNewsItems, getNewsPageData } from "@/lib/wordpress";
import NewsClient from "./NewsClient";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "In The News | Hutech Solutions",
  description: "Latest news and media coverage featuring Hutech Solutions — our milestones, partnerships, and thought leadership in the tech industry.",
  path: "/company/news/",
});

export default async function NewsPage() {
  const [wpNews, wpPageData] = await Promise.all([
    getNewsItems(),
    getNewsPageData()
  ]);

  // Pass WP fields as props; NewsClient falls back to static defaults 
  // when a prop is undefined (WP not configured or field not filled in).
  return (
    <NewsClient
      newsItems={wpNews}
      {...(wpPageData ?? {})}
    />
  );
}
