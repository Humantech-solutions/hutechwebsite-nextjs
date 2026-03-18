import CaseStudyClient from "./CaseStudyClient";
import { CASE_STUDIES_DETAILS } from "./data";

export async function generateStaticParams() {
  return Object.keys(CASE_STUDIES_DETAILS).map((slug) => ({
    slug: slug,
  }));
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  return <CaseStudyClient slug={slug} />;
}
