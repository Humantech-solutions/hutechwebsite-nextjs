import CaseStudyDetailClient from "./CaseStudyDetailClient";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/wordpress";
import { CASE_STUDIES } from "@/lib/data/case-studies";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const wpCaseStudies = await getCaseStudies().catch(() => []);
  const staticSlugs = Object.keys(CASE_STUDIES);
  const slugs = new Set([
    ...staticSlugs,
    ...wpCaseStudies.map((study) => study.slug).filter(Boolean),
  ]);

  return Array.from(slugs).map((slug) => ({ slug }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug).catch(() => null);

  if (study) {
    return <CaseStudyDetailClient study={study} />;
  }

  const staticStudy = CASE_STUDIES[slug];
  if (!staticStudy) {
    notFound();
  }

  return <CaseStudyDetailClient study={staticStudy} />;
}
