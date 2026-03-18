"use client";

import { motion as Motion } from "framer-motion";
import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  Calendar,
  MapPin,
  Clock,
  Share2,
  ArrowLeft,
  CheckCircle2,
  MessageSquare,
  Monitor,
  Video,
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { RegisterEventModal } from "@/components/RegisterEventModal";
import Link from "next/link";

const EVENTS_DATA = {
  "global-ai-summit-2026": {
    title: "Global AI & Cloud Summit 2026",
    tagline: "Unleashing the Potential of Autonomous Intelligence",
    date: "April 20, 2026",
    time: "09:00 AM - 05:00 PM GMT",
    location: "ExCeL London, UK",
    type: "In-Person",
    category: "Summit",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    description:
      "The Global AI & Cloud Summit is Hutech's flagship event, bringing together 5,000+ industry leaders, engineers, and visionaries. This year, we focus on the convergence of Generative AI, Cloud-native architectures, and Sustainable computing.",
    agenda: [
      { time: "09:00 AM", event: "Opening Keynote: The Future of Autonomous Enterprise" },
      { time: "11:00 AM", event: "Cloud-Native Transformation: Best Practices & Pitfalls" },
      { time: "01:00 PM", event: "Networking Lunch & AI Demo Showcase" },
      { time: "02:30 PM", event: "Generative AI in Production: Scaling beyond POCs" },
      { time: "04:30 PM", event: "Closing Panel: Ethics & Governance in the AI Age" },
    ],
    speakers: [
      {
        name: "Dr. Sarah Chen",
        role: "CTO, Hutech Solutions",
        image:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      },
      {
        name: "James Wilson",
        role: "VP of Engineering, CloudCore",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      },
      {
        name: "Elena Rodriguez",
        role: "Head of AI Ethics, GlobalTech",
        image:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      },
    ],
    highlights: [
      "Hands-on AI workshops with real-world datasets",
      "Exclusive preview of Hutech's 2027 Tech Roadmap",
      "VIP Networking evening for registered executives",
      "Certification opportunities for Cloud Architects",
    ],
  },
  "fintech-innovation-workshop": {
    title: "Fintech Innovation Workshop",
    tagline: "Architecting the Future of Digital Finance",
    date: "May 15, 2026",
    time: "10:00 AM - 02:00 PM EST",
    location: "New York / Hybrid",
    type: "Hybrid",
    category: "Workshop",
    image:
      "https://images.unsplash.com/photo-1591115765373-520b7a21769b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    description:
      "A deep-dive workshop focused on the practical application of blockchain, real-time payments, and AI-driven fraud detection in modern financial services.",
    agenda: [
      { time: "10:00 AM", event: "Modernizing Legacy Banking Infrastructure" },
      { time: "11:30 AM", event: "Blockchain Beyond Crypto: Smart Contracts for Finance" },
      { time: "12:30 PM", event: "AI & Fraud Prevention: Real-time Analysis" },
      { time: "01:30 PM", event: "Q&A and Implementation Roadmap Session" },
    ],
    speakers: [
      {
        name: "Michael Ross",
        role: "Fintech Lead, Hutech",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      },
      {
        name: "Amara Okoro",
        role: "Chief Innovation Officer, NeoBank",
        image:
          "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      },
    ],
    highlights: [
      "Case studies of successful legacy migrations",
      "Interactive coding session for smart contracts",
      "Direct consultation with Hutech's Fintech architects",
      "Free access to Hutech's Fintech whitepaper collection",
    ],
  },
  "sustainability-in-tech-symposium": {
    title: "Sustainability in Tech Symposium",
    tagline: "Building a Greener Future through Engineering Excellence",
    date: "June 02, 2026",
    time: "10:00 AM - 04:00 PM CET",
    location: "Berlin, Germany / Online",
    type: "Hybrid",
    category: "Symposium",
    image:
      "https://images.unsplash.com/photo-1475721027187-40247339488b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    description:
      "A gathering of engineers, environmental scientists, and policy makers to discuss the role of green coding, energy-efficient cloud architectures, and sustainable hardware in the next decade of technology.",
    agenda: [
      { time: "10:00 AM", event: "Green Coding: Optimizing Software for Energy Efficiency" },
      { time: "12:00 PM", event: "Sustainable Cloud Data Centers: The Path to Net Zero" },
      { time: "02:00 PM", event: "Hardware Lifecycle & Circular Economy in Tech" },
      { time: "03:30 PM", event: "Closing Keynote: Engineering for the Planet" },
    ],
    speakers: [
      {
        name: "Lars Sorensen",
        role: "Head of Sustainability, Hutech",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      },
      {
        name: "Dr. Anna Mueller",
        role: "Environmental Lead, GreenTech Institute",
        image:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      },
    ],
    highlights: [
      "Case studies on reducing data center carbon footprints",
      "Live demo of energy profiling tools for applications",
      "Networking with sustainability-focused tech leaders",
      "Launch of Hutech's 2026 Sustainability Report",
    ],
  },
};

export default function EventDetailClient({ id }: { id: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const event = EVENTS_DATA[id as keyof typeof EVENTS_DATA] || EVENTS_DATA["global-ai-summit-2026"];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Meta title={`${event.title} | Events | Hutech Solutions`} description={event.tagline} />
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex min-h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#001A3D]/60 to-[#001A3D]"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 py-16 lg:px-20">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Link
              href="/resources/events"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#0171c1] uppercase transition-colors hover:text-white"
            >
              <ArrowLeft size={16} /> Back to All Events
            </Link>

            <div className="flex flex-wrap gap-4">
              <span className="rounded-full border border-[#FFAF2B]/20 bg-[#FFAF2B]/10 px-4 py-1.5 text-[10px] font-bold tracking-widest text-[#FFAF2B] uppercase">
                {event.category}
              </span>
              <span className="rounded-full border border-[#0171c1]/20 bg-[#0171c1]/10 px-4 py-1.5 text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                {event.type}
              </span>
            </div>

            <h1 className="display-font max-w-4xl text-4xl leading-tight font-semibold md:text-7xl">
              {event.title}
            </h1>
            <p className="max-w-2xl text-xl leading-relaxed font-medium text-gray-300 italic">
              "{event.tagline}"
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <section className="py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            {/* Left Column: Event Details */}
            <div className="space-y-16 lg:col-span-8">
              {/* About */}
              <div className="space-y-6">
                <h2 className="display-font text-3xl font-bold text-[#001A3D]">About the Event</h2>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  {event.description}
                </p>
                <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
                  {event.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-3 rounded-xl bg-gray-50 p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#0171c1]" />
                      <span className="text-sm font-bold text-[#001A3D]">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agenda */}
              <div className="space-y-8">
                <h2 className="display-font text-3xl font-bold text-[#001A3D]">Event Agenda</h2>
                <div className="space-y-4">
                  {event.agenda.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-8 rounded-2xl border border-gray-100 p-6 transition-all hover:border-[#0171c1]/30 hover:shadow-lg"
                    >
                      <div className="w-24 text-lg font-black tracking-tight whitespace-nowrap text-[#0171c1]">
                        {item.time}
                      </div>
                      <div className="h-10 w-[1px] bg-gray-100"></div>
                      <div className="text-lg font-bold text-[#001A3D]">{item.event}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Speakers */}
              <div className="space-y-10">
                <h2 className="display-font text-3xl font-bold text-[#001A3D]">
                  Featured Speakers
                </h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {event.speakers.map((speaker, idx) => (
                    <div key={idx} className="group space-y-4 text-center">
                      <div className="aspect-square overflow-hidden rounded-full border-4 border-gray-100 transition-all duration-500 group-hover:border-[#0171c1]">
                        <ImageWithFallback
                          src={speaker.image}
                          alt={speaker.name}
                          className="h-full w-full scale-110 object-cover transition-transform duration-700 group-hover:scale-100"
                        />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xl font-bold text-[#001A3D]">{speaker.name}</h4>
                        <p className="text-sm font-bold tracking-widest text-[#0171c1] uppercase">
                          {speaker.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-[#001A3D] p-10 text-white shadow-2xl">
                  <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-[#0171c1]/20 blur-3xl"></div>
                  <div className="relative z-10 space-y-8">
                    <h3 className="display-font text-2xl font-bold">Registration</h3>
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                          <Calendar className="h-5 w-5 text-[#FFAF2B]" />
                        </div>
                        <div>
                          <div className="mb-1 text-[10px] font-bold tracking-widest text-white/40 uppercase">
                            Date
                          </div>
                          <div className="font-bold">{event.date}</div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                          <Clock className="h-5 w-5 text-[#FFAF2B]" />
                        </div>
                        <div>
                          <div className="mb-1 text-[10px] font-bold tracking-widest text-white/40 uppercase">
                            Time
                          </div>
                          <div className="font-bold">{event.time}</div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                          <MapPin className="h-5 w-5 text-[#FFAF2B]" />
                        </div>
                        <div>
                          <div className="mb-1 text-[10px] font-bold tracking-widest text-white/40 uppercase">
                            Location
                          </div>
                          <div className="font-bold">{event.location}</div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="w-full rounded-sm bg-[#0171c1] py-5 text-[11px] font-black tracking-[0.2em] text-white uppercase transition-all duration-500 hover:bg-white hover:text-[#001A3D]"
                    >
                      Register Now
                    </button>
                    <p className="text-center text-[10px] font-bold tracking-widest text-white/40 uppercase">
                      * Limited slots available
                    </p>
                  </div>
                </div>
                <div className="space-y-6 rounded-3xl border border-gray-100 p-8">
                  <h4 className="font-bold text-[#001A3D]">Helpful Links</h4>
                  <div className="space-y-4">
                    <button className="flex items-center gap-3 text-sm font-bold text-gray-500 transition-colors hover:text-[#0171c1]">
                      <Share2 size={16} /> Share with colleagues
                    </button>
                    <button className="flex items-center gap-3 text-sm font-bold text-gray-500 transition-colors hover:text-[#0171c1]">
                      <Monitor size={16} /> Add to Calendar
                    </button>
                    <Link
                      href="/contact"
                      className="flex items-center gap-3 text-sm font-bold text-gray-500 transition-colors hover:text-[#0171c1]"
                    >
                      <MessageSquare size={16} /> Contact Organizer
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <h2 className="display-font text-4xl leading-tight font-bold text-[#001A3D] md:text-5xl">
                Can't make it to this event?
              </h2>
              <p className="text-lg font-medium text-gray-500">
                Subscribe to our tech newsletter to receive event summaries, recording links, and
                early-bird notifications for our upcoming summits.
              </p>
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your corporate email"
                  className="flex-1 rounded-sm border border-gray-200 px-6 py-4 transition-all focus:border-[#0171c1] focus:outline-none"
                />
                <button className="bg-[#0171c1] px-10 py-4 text-[11px] font-bold tracking-widest text-white uppercase transition-all hover:bg-[#001A3D]">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video overflow-hidden rounded-3xl shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1511512578047-dfb367046420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Newsletter"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-[#001A3D]/20">
                  <div className="group flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-white text-[#0171c1] shadow-2xl">
                    <Video className="h-8 w-8 fill-current" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RegisterEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventTitle={event.title}
      />
    </div>
  );
}
