// Server component – fetches WordPress data then renders the client UI
import { getContactPageData } from "@/lib/wordpress";
import ContactClient from "./ContactClient";

export default async function ContactPage() {
  const wpData = await getContactPageData();

  // Pass WP fields as props; ContactClient falls back to static
  // defaults when a prop is undefined (WP not configured or field not filled in).
  return <ContactClient {...(wpData ?? {})} />;
}
