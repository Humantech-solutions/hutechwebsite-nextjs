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
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: "fintech-innovation-workshop",
    title: "Fintech Innovation Workshop",
    date: "May 15, 2026",
    location: "Online / New York",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1591115765373-520b7a21769b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "sustainability-in-tech-symposium",
    title: "Sustainability in Tech Symposium",
    date: "June 02, 2026",
    location: "Berlin, Germany",
    category: "Symposium",
    image: "https://images.unsplash.com/photo-1475721027187-40247339488b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  }
];

export default function Events() {
  return (
    <div className="flex flex-col bg-white min-h-screen">
      <Meta title="Events | Hutech Solutions" description="Join Hutech Solutions at the world's leading technology events and workshops." />
      <Breadcrumbs variant="light" />
      
      <section className="bg-[#001A3D] text-white h-[450px] relative overflow-hidden flex items-center">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10 w-full">
          <Motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-semibold mb-6 display-font"
          >
            Connect & <br /><span className="text-[#FFAF2B]">Collaborate.</span>
          </Motion.h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed font-medium">
            Join us at global conferences, summits, and workshops where we share our expertise and explore the future of engineering.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-12">
            {EVENTS.map((event, i) => (
              <Motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col md:flex-row bg-gray-50 rounded-3xl overflow-hidden hover:bg-white hover:shadow-2xl transition-all border border-transparent hover:border-gray-100"
              >
                <div className="md:w-1/3 h-64 md:h-auto overflow-hidden">
                  <ImageWithFallback src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-10 md:w-2/3 flex flex-col justify-between space-y-8">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-6">
                      <span className="px-3 py-1 bg-[#FFAF2B]/10 text-[#FFAF2B] font-bold text-[10px] rounded-full uppercase tracking-widest">{event.category}</span>
                      <span className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                        <Calendar size={14} className="text-[#FFAF2B]" /> {event.date}
                      </span>
                      <span className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                        <MapPin size={14} className="text-[#FFAF2B]" /> {event.location}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-[#001A3D] display-font group-hover:text-[#FFAF2B] transition-colors">{event.title}</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link href={`/resources/events/${event.id}`} className="inline-flex items-center gap-2 text-[#001A3D] font-bold border-b-2 border-[#FFAF2B] pb-1 hover:gap-4 transition-all">
                      Learn More <ArrowRight size={18} />
                    </Link>
                    <Link href={`/resources/events/${event.id}`} className="p-3 bg-white rounded-full border border-gray-100 group-hover:bg-[#001A3D] group-hover:text-white transition-all shadow-sm">
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
