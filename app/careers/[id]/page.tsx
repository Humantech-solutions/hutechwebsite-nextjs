import JobDetailsClient from "./JobDetailsClient";
import { getCareers, getCareerBySlug } from "@/lib/wordpress";
import { JOBS } from "@/lib/data/careers";
import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/seo";

export const revalidate = 60; // ISR

export async function generateStaticParams() {
  const wpJobs = await getCareers().catch(() => []);
  const ids = new Set([
    ...JOBS.map((job) => job.id),
    ...wpJobs.map((job) => job.id).filter(Boolean),
  ]);

  return Array.from(ids).map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job: any =
    (await getCareerBySlug(id).catch(() => null)) || JOBS.find((item) => item.id === id);

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
  const job = await getCareerBySlug(id).catch(() => null);

  if (job) {
    return <JobDetailsClient job={job} />;
  }

  const staticJob = JOBS.find((item) => item.id === id);
  if (!staticJob) {
    notFound();
  }

  return <JobDetailsClient job={staticJob} />;
}
