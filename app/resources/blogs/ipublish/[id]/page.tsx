import { notFound } from "next/navigation";
import { getIPublishContentById } from "@/lib/ipublish";
import { IPublishDetailClient } from "@/components/ipublish/IPublishDetailClient";

export default async function IPublishPage({ params }: { params: Promise<{ id: string }> }) {
  // Await the params object in Next.js 15
  const resolvedParams = await params;
  
  if (!resolvedParams.id) {
    notFound();
  }

  const content = await getIPublishContentById(resolvedParams.id);

  if (!content) {
    notFound();
  }

  // The iPublish API returns 'current_body' for the HTML payload
  return <IPublishDetailClient content={content} />;
}
