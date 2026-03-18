"use client";

import { motion as Motion } from "framer-motion";
import { MapPin, Globe, Building2, Users, ArrowRight } from "lucide-react";
import { useState } from "react";

const LOCATIONS = [
  {
    id: "india",
    name: "India (HQ)",
    city: "Pune & Chennai",
    type: "Core Digital Engineering & R&D",
    coords: { top: "62%", left: "70%" },
    details: "90+ engineers delivering advanced AI, Cloud, and SRE solutions.",
  },
  {
    id: "usa",
    name: "United States",
    city: "New Jersey",
    type: "Strategic Sales & Client Success",
    coords: { top: "40%", left: "25%" },
    details: "Hutech Inc. driving digital transformation for Fortune 500 clients.",
  },
  {
    id: "uk",
    name: "United Kingdom",
    city: "London",
    type: "Strategic Collaboration",
    coords: { top: "35%", left: "48%" },
    details: "Partnering with Acend Solutions for EMEA market delivery.",
  },
];

export function GlobalMap() {
  const [activeId, setActiveId] = useState<string | null>("india");

  return (
    <section className="relative overflow-hidden bg-[#001A3D] py-32 text-white">
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 h-full w-full bg-[radial-gradient(circle_at_50%_50%,#0171c1_0%,transparent_70%)] opacity-20"></div>

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
        <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-12">
          {/* Content Left */}
          <div className="space-y-12 lg:col-span-5">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <span className="h-[1px] w-12 bg-[#FFAF2B]"></span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#FFAF2B] uppercase">
                  Global Delivery Model
                </span>
              </div>
              <h2 className="display-font text-4xl leading-tight font-semibold tracking-tight md:text-6xl">
                Global Footprint, <br />
                <span className="text-[#0171c1]">Local Expertise.</span>
              </h2>
              <p className="text-lg leading-relaxed font-medium text-gray-400">
                Hutech Solutions operates through a unified global network, ensuring high-density
                engineering delivery and seamless client engagement across timezones.
              </p>
            </div>

            <div className="space-y-4">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  onMouseEnter={() => setActiveId(loc.id)}
                  className={`group w-full rounded-2xl border p-6 text-left transition-all duration-300 ${
                    activeId === loc.id
                      ? "border-[#FFAF2B] bg-white/10 shadow-[0_0_30px_-10px_rgba(255,175,43,0.3)]"
                      : "border-white/5 bg-transparent hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4
                        className={`display-font text-xl font-bold transition-colors ${activeId === loc.id ? "text-[#FFAF2B]" : "text-white"}`}
                      >
                        {loc.name}
                      </h4>
                      <p className="mt-1 text-xs font-bold tracking-widest text-gray-500 uppercase">
                        {loc.city}
                      </p>
                    </div>
                    <div
                      className={`rounded-lg p-3 transition-all ${activeId === loc.id ? "bg-[#FFAF2B] text-[#001A3D]" : "bg-white/5 text-gray-500"}`}
                    >
                      <MapPin size={18} />
                    </div>
                  </div>

                  {activeId === loc.id && (
                    <Motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="mt-4 border-t border-white/10 pt-4"
                    >
                      <p className="text-sm leading-relaxed font-medium text-gray-400">
                        {loc.details}
                      </p>
                    </Motion.div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Map Right */}
          <div className="relative lg:col-span-7">
            <div className="relative aspect-[16/10] w-full">
              {/* Simplified World Map SVG Placeholder */}
              <svg
                viewBox="0 0 1000 600"
                className="h-full w-full fill-white/5 stroke-white/10 stroke-[0.5]"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Abstract Continents (Simplified for Aesthetic) */}
                <path d="M150,150 Q200,100 300,120 T450,150 T600,100 T800,130 T900,200 T850,350 T700,450 T500,400 T300,450 T150,350 Z" />
                <circle cx="250" cy="250" r="100" className="opacity-10" />
                <circle cx="700" cy="350" r="150" className="opacity-10" />
              </svg>

              {/* Interactive Hotspots */}
              {LOCATIONS.map((loc) => (
                <div
                  key={loc.id}
                  className="absolute cursor-pointer transition-transform duration-500 hover:scale-110"
                  style={{ top: loc.coords.top, left: loc.coords.left }}
                  onMouseEnter={() => setActiveId(loc.id)}
                >
                  {/* Pulse Animation */}
                  <Motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 0.2, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`absolute inset-0 -mt-4 -ml-4 h-8 w-8 rounded-full ${activeId === loc.id ? "bg-[#FFAF2B]" : "bg-[#0171c1]"}`}
                  />

                  {/* Pin Core */}
                  <div
                    className={`relative h-4 w-4 rounded-full border-2 border-[#001A3D] shadow-2xl transition-colors duration-300 ${activeId === loc.id ? "bg-[#FFAF2B]" : "bg-[#0171c1]"}`}
                  ></div>

                  {/* Label (Visible on Active) */}
                  {activeId === loc.id && (
                    <Motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-full left-1/2 mb-4 -translate-x-1/2 rounded-lg bg-white px-4 py-2 whitespace-nowrap text-[#001A3D] shadow-2xl"
                    >
                      <p className="text-[10px] font-black tracking-widest uppercase">{loc.name}</p>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                    </Motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Strategic Stats Overlay */}
            <div className="absolute -right-10 -bottom-10 hidden rounded-[2.5rem] bg-[#0171c1] p-10 shadow-2xl md:block">
              <div className="flex gap-12">
                <div className="text-center">
                  <p className="display-font text-4xl font-black">24/7</p>
                  <p className="text-[10px] font-bold tracking-widest uppercase opacity-60">
                    Operations
                  </p>
                </div>
                <div className="h-12 w-[1px] bg-white/20"></div>
                <div className="text-center">
                  <p className="display-font text-4xl font-black">3</p>
                  <p className="text-[10px] font-bold tracking-widest uppercase opacity-60">
                    Continents
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
