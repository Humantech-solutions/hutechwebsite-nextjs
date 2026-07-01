// Server component – fetches WordPress data then renders the client UI
import { getAboutPageData } from "@/lib/wordpress";
import AboutClient from "./AboutClient";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "About Hutech Solutions",
  description: "Learn about Hutech Solutions — our story, mission, and the people behind our world-class engineering and digital transformation services.",
  path: "/about/",
});

export default async function AboutHutech() {
  const wpData = await getAboutPageData();

  // Pass WP fields as props; AboutClient falls back to static defaults when a
  // prop is undefined (WP not configured or field not filled in).
  return <AboutClient {...(wpData ?? {})} />;
}
