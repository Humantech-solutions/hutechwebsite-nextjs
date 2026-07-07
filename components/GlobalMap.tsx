"use client";

import { motion as Motion } from "motion/react";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { renderTitle } from "@/lib/utils";

export interface OfficeLocation {
  id: string;
  name: string;
  city: string;
  type: string;
  details: string;
  lat?: string;
  lng?: string;
}

interface GlobalMapProps {
  label?: string;
  title?: string;
  description?: string;
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
  locations?: OfficeLocation[];
}

// Map Calibration Offsets
// Used to perfectly align the mathematical projection with your specific world-map.svg
const MAP_OFFSET_X = -3.5; 
const MAP_OFFSET_Y = -6.0; 

function calculatePosition(latStr?: string, lngStr?: string): { left: number; top: number } {
  if (!latStr || !lngStr) return { left: 50, top: 50 }; // Fallback to center
  
  let lat = parseFloat(latStr);
  let lng = parseFloat(lngStr);
  
  if (isNaN(lat) || isNaN(lng)) return { left: 50, top: 50 };

  // Adjust for South and West from string (if user typed "S" or "W")
  if (latStr.toUpperCase().includes('S')) lat = -Math.abs(lat);
  if (lngStr.toUpperCase().includes('W')) lng = -Math.abs(lng);

  // Web Mercator Projection
  const x = (lng + 180) / 360 * 100;
  const latRad = (lat * Math.PI) / 180;
  const yMercator = (1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * 100;

  return { 
    left: Number((x + MAP_OFFSET_X).toFixed(4)), 
    top: Number((yMercator + MAP_OFFSET_Y).toFixed(4))
  };
}

const STATIC_LOCATIONS: OfficeLocation[] = [
  { id: "india", name: "India (HQ)", city: "Pune & Chennai", type: "Core Digital Engineering & R&D", details: "90+ engineers delivering advanced AI, Cloud, and SRE solutions.", lat: "18.5204", lng: "73.8567" },
  { id: "usa",   name: "United States", city: "New Jersey", type: "Strategic Sales & Client Success", details: "Hutech Inc. driving digital transformation for Fortune 500 clients.", lat: "40.0583", lng: "-74.4057" },
  { id: "uk",    name: "United Kingdom", city: "London", type: "Strategic Collaboration", details: "Partnering with Acend Solutions for EMEA market delivery.", lat: "51.5072", lng: "-0.1276" },
];

export function GlobalMap({
  label        = "Global Delivery Model",
  title        = "Global Footprint, |Local Expertise.",
  description  = "Hutech Solutions operates through a unified global network, ensuring high-density engineering delivery and seamless client engagement across timezones.",
  stat1Value   = "24/7",
  stat1Label   = "Operations",
  stat2Value   = "3",
  stat2Label   = "Continents",
  locations    = STATIC_LOCATIONS,
}: GlobalMapProps) {
  const [activeId, setActiveId] = useState<string>(locations[0]?.id ?? "india");

  return (
    <section className="relative overflow-hidden bg-[#001A3D] py-[50px] lg:py-32 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(1,113,193,0.25)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">

          {/* ── Left panel ───────────────────────────────────────────────── */}
          <div className="space-y-10 lg:col-span-5">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-10 bg-[#F99D1C]" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#F99D1C] uppercase">{label}</span>
              </div>
              <h2 className="display-font text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                {renderTitle(title, "text-white", "text-[#0171c1]", "text-[#F99D1C]")}
              </h2>
              <p className="text-base leading-relaxed text-gray-400">{description}</p>
            </div>

            {/* Location cards */}
            <div className="space-y-3">
              {locations.map((loc) => {
                const active = activeId === loc.id; 
                return (
                  <button
                    key={loc.id}
                    onMouseEnter={() => setActiveId(loc.id)}
                    onClick={() => setActiveId(loc.id)}
                    className={`w-full rounded-[15px] border p-5 text-left transition-all duration-300 ${
                      active
                        ? "border-[#F99D1C] bg-white/10 shadow-[0_0_30px_-10px_rgba(255,175,43,0.25)]"
                        : "border-white/5 bg-transparent hover:border-white/15"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className={`display-font text-xl font-bold transition-colors ${active ? "text-[#F99D1C]" : "text-white"}`}>
                          {loc.name} {loc.type && <span>({loc.type})</span>}
                        </h4>
                        <p className="mt-0.5 text-[11px] font-bold uppercase tracking-widest text-gray-500">{loc.city}</p>
                      </div>
                      <div className={`rounded-lg p-2.5 transition-all ${active ? "bg-[#F99D1C] text-[#001A3D]" : "bg-white/5 text-gray-500"}`}>
                        <MapPin size={16} />
                      </div>
                    </div>
                    {active && (
                      <Motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="mt-3 border-t border-white/10 pt-3"
                      >
                        <p className="text-sm leading-relaxed text-gray-400">{loc.details}</p>
                      </Motion.div>
                    )}
                  </button>
                );
              })}
            </div>


          </div>

          {/* ── Right panel: World map ────────────────────────────────────── */}
          <div className="lg:col-span-7">
            <div className="relative w-full">
              {/* The base world map provided by user */}
              <img 
                src="/world-map.svg" 
                alt="Global Footprint Map" 
                className="w-full h-auto object-contain opacity-40 select-none"
              />

              {/* ── Highlighted countries and Office pins ── */}
              {locations.map((loc) => {
                const pin = calculatePosition(loc.lat, loc.lng);
                const active = activeId === loc.id;
                
                return (
                  <div
                    key={`pin-group-${loc.id}`}
                    className="absolute z-10 cursor-pointer"
                    style={{ left: `${pin.left}%`, top: `${pin.top}%` }}
                    onMouseEnter={() => setActiveId(loc.id)}
                    onClick={() => setActiveId(loc.id)}
                  >
                    {/* Centered container so percentage represents center */}
                    <div className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                      
                      {/* Inner glowing pulse */}
                      <Motion.div
                        className="absolute rounded-full border-2"
                        style={{ 
                          borderColor: active ? "#F99D1C" : "#0171c1",
                        }}
                        animate={{ 
                          width: active ? [20, 44, 20] : 20, 
                          height: active ? [20, 44, 20] : 20,
                          opacity: active ? [0.7, 0, 0.7] : 0 
                        }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
                      />

                      {/* Pin dot */}
                      <div 
                        className="h-3 w-3 rounded-full border-[2px] border-[#001A3D] relative z-10"
                        style={{ backgroundColor: active ? "#F99D1C" : "#0171c1" }}
                      />

                      {/* Tooltip on active */}
                      {active && (
                        <div className="absolute bottom-[100%] left-1/2 mb-3 w-[120px] -translate-x-1/2">
                          <div className="relative rounded-lg bg-white p-2 shadow-xl shadow-black/20 text-center">
                            <h5 className="text-[10px] font-black uppercase tracking-widest text-[#001A3D]">
                              {loc.name}
                            </h5>
                            <p className="text-[9px] font-semibold text-gray-500 truncate">
                              {loc.city}
                            </p>
                            {/* Triangle pointer */}
                            <div className="absolute left-1/2 top-full -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              {/* Floating Stats */}
              <div className="absolute -bottom-10 right-4 z-20 rounded-[15px] bg-[#0171c1] px-6 py-5 shadow-xl md:-bottom-28 md:right-0">
                <div className="flex items-center gap-10">
                  <div className="text-center">
                    <p className="display-font text-4xl font-black text-white">{stat1Value}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/80">{stat1Label}</p>
                  </div>
                  <div className="h-12 w-px bg-white/20" />
                  <div className="text-center">
                    <p className="display-font text-4xl font-black text-white">{stat2Value}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/80">{stat2Label}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
