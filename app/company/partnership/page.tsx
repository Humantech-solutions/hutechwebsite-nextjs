// Server component – fetches WordPress data then renders the client UI
import { getPartnershipPageData } from "@/lib/wordpress";
import PartnershipClient from "./PartnershipClient";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Technology Partnerships | Hutech Solutions",
  description: "Hutech Solutions partners with AWS, Google Cloud, Microsoft Azure, and other leading technology providers to deliver best-in-class digital solutions.",
  path: "/company/partnership/",
});

export default async function PartnershipPage() {
  const wpData = await getPartnershipPageData();

  // Pass WP fields as props; PartnershipClient falls back to static
  // defaults when a prop is undefined (WP not configured or field not filled in).
  return <PartnershipClient {...(wpData ?? {})} />;
}
