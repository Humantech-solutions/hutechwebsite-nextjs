import JobDetailsClient from "./JobDetailsClient";
import { getCareers, getCareerBySlug } from "@/lib/wordpress";
import { JOBS } from "@/lib/data/careers";
import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/seo";
import { getRecruitProJobs, getRecruitProJobBySlug } from "@/lib/api";

export const revalidate = 120; // ISR — refresh every 2 minutes

export async function generateStaticParams() {
  const [recruitProJobs, wpJobs] = await Promise.all([
    getRecruitProJobs().catch(() => []),
    getCareers().catch(() => []),
  ]);

  const ids = new Set([
    ...JOBS.map((job) => job.id),
    ...wpJobs.map((job) => job.id).filter(Boolean),
    ...recruitProJobs.map((job) => job.id).filter(Boolean),
  ]);

  return Array.from(ids).map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job: any =
    (await getRecruitProJobBySlug(id).catch(() => null)) ||
    (await getCareerBySlug(id).catch(() => null)) ||
    JOBS.find((item) => item.id === id);

  return constructMetadata({
    title: job?.title ? `${job.title} | Careers` : "Careers",
    description:
      job?.description ||
      job?.summary ||
      "Explore career opportunities at Hutech Solutions.",
    path: `/careers/${id}/`,
  });
}

export default async function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Priority: RecruitPro → WordPress → static
  const recruitProJob = await getRecruitProJobBySlug(id).catch(() => null);
  if (recruitProJob) {
    return <JobDetailsClient job={recruitProJob as any} source="recruitpro" />;
  }

  const wpJob = await getCareerBySlug(id).catch(() => null);
  if (wpJob) {
    return <JobDetailsClient job={wpJob} source="wordpress" />;
  }

  const staticJob = JOBS.find((item) => item.id === id);
  if (!staticJob) {
    notFound();
  }

  return <JobDetailsClient job={staticJob} source="wordpress" />;
}
