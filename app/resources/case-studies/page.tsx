import CaseStudiesClient from "./CaseStudiesClient";
import { getCaseStudies, getCaseStudyPageData } from "@/lib/wordpress";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Case Studies | Hutech Solutions",
  description: "Explore real-world case studies showcasing how Hutech Solutions drives digital transformation across banking, healthcare, retail, and more.",
  path: "/resources/case-studies/",
});


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
