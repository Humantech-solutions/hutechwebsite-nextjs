import JobDetailsClient from "./JobDetailsClient";
import { getCareers, getCareerBySlug } from "@/lib/wordpress";
import { JOBS } from "@/lib/data/careers";
import { notFound } from "next/navigation";

export const revalidate = 60; // ISR

export async function generateStaticParams() {
  const wpJobs = await getCareers().catch(() => []);
  const ids = new Set([
    ...JOBS.map((job) => job.id),
    ...wpJobs.map((job) => job.id).filter(Boolean),
  ]);

  return Array.from(ids).map((id) => ({ id }));
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
