import CaseStudiesClient from "./CaseStudiesClient";
import { getCaseStudies, getCaseStudyPageData } from "@/lib/wordpress";

export const metadata = {
  title: "Case Studies | Hutech Solutions",
  description: "Real-world examples of how Hutech Solutions drives digital transformation.",
};

export default async function CaseStudiesPage() {
  const [wpCaseStudies, wpPageData] = await Promise.all([
    getCaseStudies(),
    getCaseStudyPageData(),
  ]);

  const pageTitle =
    wpPageData?.title ||
    "Success |Stories.";
  const pageDescription =
    wpPageData?.description ||
    "Discover how we've helped leading organizations transform their businesses with innovative technology solutions.";

  return <CaseStudiesClient caseStudies={wpCaseStudies} pageTitle={pageTitle} pageDescription={pageDescription} bgImageUrl={wpPageData?.bgImageUrl} />;
}
