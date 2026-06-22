// Server component – fetches WordPress data then renders the client UI
import { getVMVPageData } from "@/lib/wordpress";
import VisionMissionValuesClient from "./VisionMissionValuesClient";

export default async function VisionMissionValuesPage() {
  const wpData = await getVMVPageData();

  // Pass WP fields as props; VisionMissionValuesClient falls back to static
  // defaults when a prop is undefined (WP not configured or field not filled in).
  return <VisionMissionValuesClient {...(wpData ?? {})} />;
}
