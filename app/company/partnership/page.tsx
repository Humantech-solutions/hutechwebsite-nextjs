// Server component – fetches WordPress data then renders the client UI
import { getPartnershipPageData } from "@/lib/wordpress";
import PartnershipClient from "./PartnershipClient";

export default async function PartnershipPage() {
  const wpData = await getPartnershipPageData();

  // Pass WP fields as props; PartnershipClient falls back to static
  // defaults when a prop is undefined (WP not configured or field not filled in).
  return <PartnershipClient {...(wpData ?? {})} />;
}
