// Server component – fetches WordPress data then renders the client UI
import { getAboutPageData } from "@/lib/wordpress";
import AboutClient from "./AboutClient";

export default async function AboutHutech() {
  const wpData = await getAboutPageData();

  // Pass WP fields as props; AboutClient falls back to static defaults when a
  // prop is undefined (WP not configured or field not filled in).
  return <AboutClient {...(wpData ?? {})} />;
}
