// Server component – fetches WordPress data then renders the client UI
import { getNewsItems, getNewsPageData } from "@/lib/wordpress";
import NewsClient from "./NewsClient";

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
