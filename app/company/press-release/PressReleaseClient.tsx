"use client";

import React from "react";
import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight } from "lucide-react";
import { Meta } from "@/components/Meta";
import { renderTitle } from "@/lib/utils";
import { PressReleaseItem } from "@/lib/wordpress";

interface PressReleaseClientProps {
  heroTagline?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroBgImage?: string;
  releases?: PressReleaseItem[];
}

const DEFAULT_RELEASES: PressReleaseItem[] = [
  { title: "Hutech Solutions Announces Q3 Financial Results", date: "Nov 05, 2025" },
  { title: "Strategic Partnership with Major Cloud Provider", date: "Oct 20, 2025" },
  { title: "Launch of Next-Gen Autonomous Systems", date: "Oct 02, 2025" },
];

export default function PressReleaseClient({
  heroTagline = "Media Center",
  heroTitle = "Press |Releases.",
  heroDescription = "Official corporate announcements, strategic partnerships, and executive updates from Hutech Solutions' global leadership.",
  heroBgImage = "https://images.unsplash.com/photo-1591453214154-c95db71dbd83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
  releases = DEFAULT_RELEASES,
}: PressReleaseClientProps) {
  
  const displayReleases = releases.length > 0 ? releases : DEFAULT_RELEASES;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="Press Release | Hutech Solutions"
        description="Official press releases and corporate announcements from Hutech Solutions."
      />
      <Breadcrumbs variant="light" />
      
      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBgImage}
            alt="Press Releases"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 text-left lg:px-20">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[1px] w-12 bg-[#F99D1C]"></span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#F99D1C] uppercase">
                {heroTagline}
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              {renderTitle(heroTitle, "text-white", "text-[#F99D1C]")}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              {heroDescription}
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Listing Section */}
      <section className="py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="space-y-6">
            {displayReleases.map((rel, i) => {
              const itemContent = (
                <Motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                  className="group flex cursor-pointer items-center justify-between rounded-xl border-b border-gray-100 p-8 transition-all hover:bg-gray-50"
                >
                  <div>
                    <p className="mb-2 text-xs font-bold text-[#F99D1C]">{rel.date}</p>
                    <h3 className="display-font text-xl font-bold text-[#001A3D]">{rel.title}</h3>
                  </div>
                  <button className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#001A3D] uppercase opacity-0 transition-all group-hover:opacity-100">
                    Read More <ArrowRight size={14} />
                  </button>
                </Motion.div>
              );

              if (rel.externalUrl) {
                return (
                  <a 
                    key={i} 
                    href={rel.externalUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block hover:no-underline"
                  >
                    {itemContent}
                  </a>
                );
              }

              return <div key={i}>{itemContent}</div>;
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
