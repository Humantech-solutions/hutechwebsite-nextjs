"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Calendar, MapPin, ExternalLink, ArrowRight } from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

const EVENTS = [
  {
    id: "global-ai-summit-2026",
    title: "Global AI & Cloud Summit 2026",
    date: "April 20, 2026",
    location: "London, UK",
    category: "Summit",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "fintech-innovation-workshop",
    title: "Fintech Innovation Workshop",
    date: "May 15, 2026",
    location: "Online / New York",
    category: "Workshop",
    image:
      "https://images.unsplash.com/photo-1591115765373-520b7a21769b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "sustainability-in-tech-symposium",
    title: "Sustainability in Tech Symposium",
    date: "June 02, 2026",
    location: "Berlin, Germany",
    category: "Symposium",
    image:
      "https://images.unsplash.com/photo-1475721027187-40247339488b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
];

export default function Events() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Meta
        title="Events | Hutech Solutions"
        description="Join Hutech Solutions at the world's leading technology events and workshops."
      />
      <Breadcrumbs variant="light" />

      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-20">
          <Motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="display-font mb-6 text-5xl font-semibold md:text-7xl"
          >
            Connect & <br />
            <span className="text-[#FFAF2B]">Collaborate.</span>
          </Motion.h1>
          <p className="max-w-2xl text-xl leading-relaxed font-medium text-gray-400">
            Join us at global conferences, summits, and workshops where we share our expertise and
            explore the future of engineering.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-12">
            {EVENTS.map((event, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col overflow-hidden rounded-3xl border border-transparent bg-gray-50 transition-all hover:border-gray-100 hover:bg-white hover:shadow-2xl md:flex-row"
              >
                <div className="h-64 overflow-hidden md:h-auto md:w-1/3">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-between space-y-8 p-10 md:w-2/3">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-6">
                      <span className="rounded-full bg-[#FFAF2B]/10 px-3 py-1 text-[10px] font-bold tracking-widest text-[#FFAF2B] uppercase">
                        {event.category}
                      </span>
                      <span className="flex items-center gap-2 text-sm font-medium text-gray-500">
                        <Calendar size={14} className="text-[#FFAF2B]" /> {event.date}
                      </span>
                      <span className="flex items-center gap-2 text-sm font-medium text-gray-500">
                        <MapPin size={14} className="text-[#FFAF2B]" /> {event.location}
                      </span>
                    </div>
                    <h3 className="display-font text-3xl font-bold text-[#001A3D] transition-colors group-hover:text-[#FFAF2B]">
                      {event.title}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/resources/events/${event.id}`}
                      className="inline-flex items-center gap-2 border-b-2 border-[#FFAF2B] pb-1 font-bold text-[#001A3D] transition-all hover:gap-4"
                    >
                      Learn More <ArrowRight size={18} />
                    </Link>
                    <Link
                      href={`/resources/events/${event.id}`}
                      className="rounded-full border border-gray-100 bg-white p-3 shadow-sm transition-all group-hover:bg-[#001A3D] group-hover:text-white"
                    >
                      <ExternalLink size={20} />
                    </Link>
                  </div>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
