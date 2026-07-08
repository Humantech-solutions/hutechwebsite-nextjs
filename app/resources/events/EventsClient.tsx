"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Calendar, MapPin, ExternalLink, ArrowRight } from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";
import { renderTitle } from "@/lib/utils";

interface EventItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  location: string;
  category: string;
  image: string;
}

interface Props {
  events: EventItem[];
  pageTitle?: string;
  pageDescription?: string;
  bgImageUrl?: string;
}

export default function EventsClient({ events, pageTitle, pageDescription, bgImageUrl }: Props) {
  const heroTitle = pageTitle || "Connect & |Collaborate.";
  const heroDesc =
    pageDescription ||
    "Join us at global conferences, summits, and workshops where we share our expertise and explore the future of engineering.";

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Meta
        title="Events | Hutech Solutions"
        description="Join Hutech Solutions at the world's leading technology events and workshops."
      />
      <Breadcrumbs variant="light" />

      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        {bgImageUrl && (
          <div className="absolute inset-0 z-0">
            <ImageWithFallback
              src={bgImageUrl}
              alt="Events background"
              className="h-full w-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#001A3D]/40 via-[#001A3D]/80 to-[#001A3D]" />
          </div>
        )}
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-20">
          <Motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="display-font mb-6 text-5xl font-semibold md:text-7xl"
          >
            {renderTitle(heroTitle, "text-inherit", "text-[#F99D1C]", "text-[#0171c1]")}
          </Motion.h1>
          <p className="max-w-2xl text-xl leading-relaxed font-medium text-gray-400">{heroDesc}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-12">
            {events.map((event, i) => (
              <Motion.div
                key={event.id || i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col overflow-hidden rounded-[15px] md:rounded-3xl border border-transparent bg-gray-50 transition-all hover:border-gray-100 hover:bg-white hover:shadow-2xl md:flex-row"
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
                      <span className="rounded-full bg-[#F99D1C]/10 px-3 py-1 text-[10px] font-bold tracking-widest text-[#F99D1C] uppercase">
                        {event.category}
                      </span>
                      <span className="flex items-center gap-2 text-sm font-medium text-gray-500">
                        <Calendar size={14} className="text-[#F99D1C]" /> {event.date}
                      </span>
                      <span className="flex items-center gap-2 text-sm font-medium text-gray-500">
                        <MapPin size={14} className="text-[#F99D1C]" /> {event.location}
                      </span>
                    </div>
                    <h3 className="display-font text-3xl font-bold text-[#001A3D] transition-colors group-hover:text-[#F99D1C]">
                      {event.title}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/resources/events/${event.slug || event.id}`}
                      className="inline-flex items-center gap-2 border-b-2 border-[#F99D1C] pb-1 font-bold text-[#001A3D] transition-all hover:gap-4"
                    >
                      Learn More <ArrowRight size={18} />
                    </Link>
                    <Link
                      href={`/resources/events/${event.slug || event.id}`}
                      className="rounded-full border border-gray-100 bg-white text-[#0a0a0a] p-3 shadow-sm transition-all group-hover:bg-[#001A3D] group-hover:text-white"
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
