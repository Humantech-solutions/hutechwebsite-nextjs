import EventDetailClient from "./EventDetailClient";

const EVENTS_DATA = {
  "global-ai-summit-2026": {
    title: "Global AI & Cloud Summit 2026",
  },
  "fintech-innovation-workshop": {
    title: "Fintech Innovation Workshop",
  },
  "sustainability-in-tech-symposium": {
    title: "Sustainability in Tech Symposium",
  },
};

export async function generateStaticParams() {
  return Object.keys(EVENTS_DATA).map((id) => ({
    id: id,
  }));
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  return <EventDetailClient id={id} />;
}
