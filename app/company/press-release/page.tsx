// Server component – fetches WordPress data then renders the client UI
import { getPressReleases, getPressReleasePageData } from "@/lib/wordpress";
import PressReleaseClient from "./PressReleaseClient";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Press Releases | Hutech Solutions",
  description: "Official press releases and announcements from Hutech Solutions covering our latest achievements, product launches, and corporate updates.",
  path: "/company/press-release/",
});

export default async function PressReleasePage() {
  const [wpReleases, wpPageData] = await Promise.all([
    getPressReleases(),
    getPressReleasePageData()
  ]);

  // Pass WP fields as props; PressReleaseClient falls back to static
  // defaults when a prop/field is undefined or empty.
  return (
    <PressReleaseClient
      releases={wpReleases}
      {...(wpPageData ?? {})}
    />
  );
}
