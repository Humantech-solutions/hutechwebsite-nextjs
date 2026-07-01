import HutechDocumentsClient from "./HutechDocumentsClient";
import { getHutechDocuments, getDocumentPageData } from "@/lib/wordpress";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Hutech Documents | Hutech Solutions",
  description: "Access whitepapers, technical guides, case study reports, and other resources from Hutech Solutions to support your digital transformation journey.",
  path: "/resources/hutech-documents/",
});


export const revalidate = 60; // ISR revalidation every 60 seconds

export default async function HutechDocumentsPage() {
  const [documents, pageData] = await Promise.all([
    getHutechDocuments(),
    getDocumentPageData(),
  ]);

  // Fallback default page data in case WP fails
  const fallbackPageData = {
    heroTagline: "Resource Library",
    heroTitle: "Hutech ^Documents.",
    heroDesc: "Access official publications, corporate reports, and technical whitepapers.",
    ctaTitle: "Need custom documentation?",
    ctaDesc: "Our specialized teams can provide tailored technical whitepapers and architecture documentation for your enterprise needs.",
    ctaBtnText: "REQUEST ACCESS",
    ctaBtnUrl: "/contact",
  };

  return <HutechDocumentsClient documents={documents || []} pageData={pageData || fallbackPageData} />;
}
