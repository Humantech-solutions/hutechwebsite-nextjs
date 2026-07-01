// Server component – fetches WordPress data then renders the client UI
import { getContactPageData } from "@/lib/wordpress";
import ContactClient from "./ContactClient";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Contact Us | Hutech Solutions",
  description: "Get in touch with Hutech Solutions. Connect with our experts for inquiries about AI, cloud transformation, DevOps, and enterprise digital solutions.",
  path: "/contact/",
});

export default async function ContactPage() {
  const wpData = await getContactPageData();

  // Pass WP fields as props; ContactClient falls back to static
  // defaults when a prop is undefined (WP not configured or field not filled in).
  return <ContactClient {...(wpData ?? {})} />;
}
