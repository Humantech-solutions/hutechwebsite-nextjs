// Server component – fetches WordPress data then renders the client UI
import { getPressReleases, getPressReleasePageData } from "@/lib/wordpress";
import PressReleaseClient from "./PressReleaseClient";

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
