import EventDetailClient from "./EventDetailClient";
import { getEvents, getEventBySlug } from "@/lib/wordpress";
import { notFound } from "next/navigation";

// Static fallback for generateStaticParams when WP is unavailable
const STATIC_SLUGS = [
  "global-ai-summit-2026",
  "fintech-innovation-workshop",
  "sustainability-in-tech-symposium",
];

// Static fallback event data
const STATIC_EVENTS: Record<string, any> = {
  "global-ai-summit-2026": {
    id: "global-ai-summit-2026",
    slug: "global-ai-summit-2026",
    title: "Global AI & Cloud Summit 2026",
    tagline: "Unleashing the Potential of Autonomous Intelligence",
    date: "April 20, 2026",
    time: "09:00 AM - 05:00 PM GMT",
    location: "ExCeL London, UK",
    type: "In-Person",
    category: "Summit",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    description: "The Global AI & Cloud Summit is Hutech's flagship event, bringing together 5,000+ industry leaders, engineers, and visionaries. This year, we focus on the convergence of Generative AI, Cloud-native architectures, and Sustainable computing.",
    agenda: [
      { time: "09:00 AM", event: "Opening Keynote: The Future of Autonomous Enterprise" },
      { time: "11:00 AM", event: "Cloud-Native Transformation: Best Practices & Pitfalls" },
      { time: "01:00 PM", event: "Networking Lunch & AI Demo Showcase" },
      { time: "02:30 PM", event: "Generative AI in Production: Scaling beyond POCs" },
      { time: "04:30 PM", event: "Closing Panel: Ethics & Governance in the AI Age" },
    ],
    speakers: [
      { name: "Dr. Sarah Chen", role: "CTO, Hutech Solutions", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { name: "James Wilson", role: "VP of Engineering, CloudCore", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { name: "Elena Rodriguez", role: "Head of AI Ethics, GlobalTech", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    ],
    highlights: [
      "Hands-on AI workshops with real-world datasets",
      "Exclusive preview of Hutech's 2027 Tech Roadmap",
      "VIP Networking evening for registered executives",
      "Certification opportunities for Cloud Architects",
    ],
    ctaTitle: "Missed this |Event?",
    ctaDescription: "Gain access to exclusive event transcripts, recording links, and early notification of upcoming engineering summits.",
    ctaImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ctaVideoUrl: "",
  },
  "fintech-innovation-workshop": {
    id: "fintech-innovation-workshop",
    slug: "fintech-innovation-workshop",
    title: "Fintech Innovation Workshop",
    tagline: "Architecting the Future of Digital Finance",
    date: "May 15, 2026",
    time: "10:00 AM - 02:00 PM EST",
    location: "New York / Hybrid",
    type: "Hybrid",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1591115765373-520b7a21769b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    description: "A deep-dive workshop focused on the practical application of blockchain, real-time payments, and AI-driven fraud detection in modern financial services.",
    agenda: [
      { time: "10:00 AM", event: "Modernizing Legacy Banking Infrastructure" },
      { time: "11:30 AM", event: "Blockchain Beyond Crypto: Smart Contracts for Finance" },
      { time: "12:30 PM", event: "AI & Fraud Prevention: Real-time Analysis" },
      { time: "01:30 PM", event: "Q&A and Implementation Roadmap Session" },
    ],
    speakers: [
      { name: "Michael Ross", role: "Fintech Lead, Hutech", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { name: "Amara Okoro", role: "Chief Innovation Officer, NeoBank", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    ],
    highlights: [
      "Case studies of successful legacy migrations",
      "Interactive coding session for smart contracts",
      "Direct consultation with Hutech's Fintech architects",
      "Free access to Hutech's Fintech whitepaper collection",
    ],
    ctaTitle: "Missed this |Event?",
    ctaDescription: "Gain access to exclusive event transcripts, recording links, and early notification of upcoming engineering summits.",
    ctaImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ctaVideoUrl: "",
  },
  "sustainability-in-tech-symposium": {
    id: "sustainability-in-tech-symposium",
    slug: "sustainability-in-tech-symposium",
    title: "Sustainability in Tech Symposium",
    tagline: "Eco-conscious Engineering for a Greener Future",
    date: "June 02, 2026",
    time: "10:00 AM - 04:00 PM CET",
    location: "Berlin, Germany",
    type: "In-Person",
    category: "Symposium",
    image: "https://images.unsplash.com/photo-1475721027187-40247339488b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    description: "Join international experts and engineers as we explore how architectural decisions and software efficiency can significantly reduce the carbon footprint of global digital infrastructure.",
    agenda: [
      { time: "10:00 AM", event: "Sustainable Software Engineering: Core Principles" },
      { time: "11:30 AM", event: "Optimizing Data Centers for Carbon Neutrality" },
      { time: "01:30 PM", event: "Panel: The Role of Tech in the Green Energy Transition" },
      { time: "03:00 PM", event: "Networking and Interactive Sustainability Workshop" },
    ],
    speakers: [
      { name: "Anna Schmidt", role: "Sustainability Lead, Hutech", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { name: "Dr. Klaus Mueller", role: "Founder, GreenCloud Labs", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    ],
    highlights: [
      "Launch of Hutech's Open-Source Carbon Monitor",
      "Case studies on low-energy cloud computing",
      "Collaborative breakout sessions on eco-design",
      "Networking with Berlin's leading green-tech startups",
    ],
    ctaTitle: "Missed this |Event?",
    ctaDescription: "Gain access to exclusive event transcripts, recording links, and early notification of upcoming engineering summits.",
    ctaImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ctaVideoUrl: "",
  },
};

export async function generateStaticParams() {
  try {
    const wpEvents = await getEvents();
    if (wpEvents.length > 0) {
      return wpEvents.map((e) => ({ id: e.slug || e.id }));
    }
  } catch {}
  return STATIC_SLUGS.map((id) => ({ id }));
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Try WordPress first
  const wpEvent = await getEventBySlug(id);
  if (wpEvent) {
    return <EventDetailClient event={wpEvent} />;
  }

  // Fall back to static data
  const staticEvent = STATIC_EVENTS[id];
  if (!staticEvent) notFound();

  return <EventDetailClient event={staticEvent} />;
}
