import CaseStudyDetailClient from "./CaseStudyDetailClient";
import { CASE_STUDIES } from "@/lib/data/case-studies";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({
    slug,
  }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = CASE_STUDIES[slug];

  if (!study) {
    notFound();
  }

  return <CaseStudyDetailClient study={study} />;
}
