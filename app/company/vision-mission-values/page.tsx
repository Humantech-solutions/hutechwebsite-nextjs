// Server component – fetches WordPress data then renders the client UI
import { getVMVPageData } from "@/lib/wordpress";
import VisionMissionValuesClient from "./VisionMissionValuesClient";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Vision, Mission & Values | Hutech Solutions",
  description: "Discover the vision, mission, and core values that guide Hutech Solutions in delivering innovative, people-first technology solutions worldwide.",
  path: "/company/vision-mission-values/",
});

export default async function VisionMissionValuesPage() {
  const wpData = await getVMVPageData();

  // Pass WP fields as props; VisionMissionValuesClient falls back to static
  // defaults when a prop is undefined (WP not configured or field not filled in).
  return <VisionMissionValuesClient {...(wpData ?? {})} />;
}
