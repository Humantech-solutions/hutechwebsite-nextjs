import CaseStudyDetailClient from "./CaseStudyDetailClient";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/wordpress";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return <CaseStudyDetailClient study={study} />;
}
