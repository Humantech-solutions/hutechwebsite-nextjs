import EventsClient from "./EventsClient";
import { getEvents, getEventPageData } from "@/lib/wordpress";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Events | Hutech Solutions",
  description: "Stay up to date with Hutech Solutions events, webinars, conferences, and meetups focused on technology, innovation, and digital transformation.",
  path: "/resources/events/",
});


// Static fallback data used when WordPress is not available
const STATIC_EVENTS = [
  {
    id: "global-ai-summit-2026",
    slug: "global-ai-summit-2026",
    title: "Global AI & Cloud Summit 2026",
    date: "April 20, 2026",
    time: "09:00 AM - 05:00 PM GMT",
    location: "London, UK",
    category: "Summit",
    type: "In-Person",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tagline: "",
    description: "",
    highlights: [],
    agenda: [],
    speakers: [],
    ctaTitle: "",
    ctaDescription: "",
    ctaImage: "",
    ctaVideoUrl: "",
  },
  {
    id: "fintech-innovation-workshop",
    slug: "fintech-innovation-workshop",
    title: "Fintech Innovation Workshop",
    date: "May 15, 2026",
    time: "10:00 AM - 02:00 PM EST",
    location: "Online / New York",
    category: "Workshop",
    type: "Hybrid",
    image: "https://images.unsplash.com/photo-1591115765373-520b7a21769b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    tagline: "",
    description: "",
    highlights: [],
    agenda: [],
    speakers: [],
    ctaTitle: "",
    ctaDescription: "",
    ctaImage: "",
    ctaVideoUrl: "",
  },
  {
    id: "sustainability-in-tech-symposium",
    slug: "sustainability-in-tech-symposium",
    title: "Sustainability in Tech Symposium",
    date: "June 02, 2026",
    time: "10:00 AM - 04:00 PM CET",
    location: "Berlin, Germany",
    category: "Symposium",
    type: "In-Person",
    image: "https://images.unsplash.com/photo-1475721027187-40247339488b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    tagline: "",
    description: "",
    highlights: [],
    agenda: [],
    speakers: [],
    ctaTitle: "",
    ctaDescription: "",
    ctaImage: "",
    ctaVideoUrl: "",
  },
];

export default async function EventsPage() {
  const [wpEvents, wpPageData] = await Promise.all([getEvents(), getEventPageData()]);

  const events = wpEvents.length > 0 ? wpEvents : STATIC_EVENTS;

  return (
    <EventsClient
      events={events}
      pageTitle={wpPageData?.title}
      pageDescription={wpPageData?.description}
      bgImageUrl={wpPageData?.bgImageUrl}
    />
  );
}
