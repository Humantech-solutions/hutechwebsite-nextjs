// Server component – fetches WordPress data then renders the client UI
import { getLeadershipPageData } from "@/lib/wordpress";
import LeadershipClient from "./LeadershipClient";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Leadership Team | Hutech Solutions",
  description: "Meet the experienced leadership team driving Hutech Solutions' global engineering and digital transformation services.",
  path: "/company/leadership/",
});

export default async function LeadershipPage() {
  const wpData = await getLeadershipPageData();

  // Pass WP fields as props; LeadershipClient falls back to static
  // defaults when a prop is undefined (WP not configured or field not filled in).
  return <LeadershipClient {...(wpData ?? {})} />;
}
