import CaseStudiesClient from "./CaseStudiesClient";
import { CASE_STUDIES } from "@/lib/data/case-studies";

export const metadata = {
  title: "Case Studies | Hutech Solutions",
  description: "Real-world examples of how Hutech Solutions drives digital transformation.",
};

export default function CaseStudiesPage() {
  const caseStudiesList = Object.values(CASE_STUDIES);
  return <CaseStudiesClient caseStudies={caseStudiesList} />;
}
