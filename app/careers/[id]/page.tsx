import JobDetailsClient from "./JobDetailsClient";
import { JOBS } from "@/lib/data/careers";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return JOBS.map((job) => ({
    id: job.id,
  }));
}

export default async function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = JOBS.find((j) => j.id === id);

  if (!job) {
    notFound();
  }

  return <JobDetailsClient job={job} />;
}
