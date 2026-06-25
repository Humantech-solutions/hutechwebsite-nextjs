import JobDetailsClient from "./JobDetailsClient";
import { getCareers, getCareerBySlug } from "@/lib/wordpress";
import { notFound } from "next/navigation";

export const revalidate = 60; // ISR

export async function generateStaticParams() {
  const jobs = await getCareers();
  return jobs.map((job) => ({
    id: job.id,
  }));
}

export default async function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getCareerBySlug(id);

  if (!job) {
    notFound();
  }

  return <JobDetailsClient job={job} />;
}
