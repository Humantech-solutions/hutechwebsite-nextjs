// Server component – fetches WordPress data then renders the client UI
import { getAwardsPageData } from "@/lib/wordpress";
import AwardsClient from "./AwardsClient";

export default async function AwardsPage() {
  const wpData = await getAwardsPageData();

  // Pass WP fields as props; AwardsClient falls back to static
  // defaults when a prop is undefined (WP not configured or field not filled in).
  return <AwardsClient {...(wpData ?? {})} />;
}
