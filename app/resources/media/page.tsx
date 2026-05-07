"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Play, Mic, Video, Search, X, ArrowRight, Clock, Calendar } from "lucide-react";
import { Meta } from "@/components/Meta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

const MEDIA_DATA = [
  {
    id: 1,
    type: "Podcast",
    title: "Why Melonleaf Consulting: A Strategic Partnership",
    description:
      "In this episode, we dive deep into our partnership with Melonleaf and how it's shaping the future of digital transformation.",
    image:
      "https://images.unsplash.com/photo-1625123627242-97ef1000c6d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    duration: "45:20",
    date: "March 10, 2026",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Strategy",
  },
  {
    id: 2,
    type: "Webinar",
    title: "How Cloud is Driving AI Future in Banking",
    description:
      "Explore the intersection of cloud scalability and AI precision in the modern banking landscape.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    duration: "58:15",
    date: "March 05, 2026",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Cloud & AI",
  },
  {
    id: 3,
    type: "Case Study",
    title: "Automated Sales for a Grass Company",
    description:
      "A visual walkthrough of how we automated complex sales cycles for a leading landscaping enterprise.",
    image:
      "https://images.unsplash.com/photo-1602973240044-ac77578f6dc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    duration: "12:40",
    date: "Feb 28, 2026",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Automation",
  },
  {
    id: 4,
    type: "Podcast",
    title: "The Future of AI in Enterprise Engineering",
    description:
      "Discussing the shift from traditional engineering to AI-first development paradigms.",
    image:
      "https://images.unsplash.com/photo-1558403194-611308249627?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    duration: "32:10",
    date: "Feb 20, 2026",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Engineering",
  },
  {
    id: 5,
    type: "Event",
    title: "Hutech Solutions at TechSummit 2026",
    description:
      "Highlights and key takeaways from our keynote at the Global TechSummit in London.",
    image:
      "https://images.unsplash.com/photo-1540575861501-7ad058a87941?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    duration: "15:00",
    date: "Jan 15, 2026",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Events",
  },
  {
    id: 6,
    type: "Webinar",
    title: "Securing the Perimeter with Zero Trust AI",
    description:
      "Technical deep dive into zero-trust architectures powered by proactive AI monitoring.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    duration: "42:30",
    date: "Jan 10, 2026",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Cybersecurity",
  },
];

const CATEGORIES = ["All", "Podcast", "Webinar", "Case Study", "Event"];

export default function MediaListing() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<(typeof MEDIA_DATA)[0] | null>(null);

  const filteredMedia = MEDIA_DATA.filter((item) => {
    const matchesTab = activeTab === "All" || item.type === activeTab;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex flex-col bg-[#FAF9F6]">
      <Meta
        title="Podcasts, Webinars & Events | Hutech Solutions"
        description="Watch and listen to our latest technical insights, podcasts, and webinar recordings."
      />
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#001A3D] py-24 text-white">
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl space-y-6 text-center md:text-left"
          >
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <span className="block h-[2px] w-8 bg-[#F99D1C]"></span>
              <span className="text-xs font-semibold tracking-widest text-[#F99D1C] uppercase">
                Multimedia Archive
              </span>
            </div>
            <h1 className="display-font mb-6 text-5xl leading-tight font-semibold tracking-tight md:text-8xl">
              Code, Coffee & <br />
              <span className="text-[#F99D1C]">Conversations</span>
            </h1>
            <p className="text-lg leading-relaxed font-medium text-gray-400 md:text-xl">
              Explore our collection of expert-led webinars, in-depth podcasts, and highlight reels
              from global tech events. Stay ahead of the curve with Hutech Solutions.
            </p>
          </Motion.div>
        </div>
        {/* Abstract background element */}
        <div className="pointer-events-none absolute top-0 right-0 h-full w-1/3 bg-linear-to-l from-[#0171c1]/20 to-transparent"></div>
        <div className="pointer-events-none absolute right-20 -bottom-24 h-80 w-80 rounded-full bg-[#F99D1C]/10 blur-[100px]"></div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-[72px] z-30 border-b border-gray-100 bg-white/80 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-8 px-6 py-6 md:flex-row lg:px-20">
          <div className="no-scrollbar flex w-full items-center gap-3 overflow-x-auto pb-2 md:w-auto md:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`rounded-full px-6 py-2.5 text-xs font-black tracking-widest whitespace-nowrap transition-all ${
                  activeTab === cat
                    ? "bg-[#001A3D] text-white shadow-xl"
                    : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-[#001A3D]"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-100 bg-gray-50 py-3.5 pr-4 pl-12 text-sm font-medium transition-all focus:ring-2 focus:ring-[#0171c1]/20 focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Media Grid */}
      <section className="py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          {filteredMedia.length > 0 ? (
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
              {filteredMedia.map((item, idx) => (
                <Motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:shadow-2xl"
                >
                  <div
                    className="relative aspect-video cursor-pointer overflow-hidden"
                    onClick={() => setSelectedVideo(item)}
                  >
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-[#001A3D]/40"></div>

                    {/* Duration Badge */}
                    <div className="absolute right-4 bottom-4 flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/70 px-3 py-1.5 text-[10px] font-black tracking-widest text-white uppercase backdrop-blur-md">
                      <Clock size={12} />
                      {item.duration}
                    </div>

                    {/* Play Button Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="flex h-16 w-16 scale-75 items-center justify-center rounded-full bg-[#F99D1C] text-[#001A3D] shadow-2xl transition-transform group-hover:scale-100">
                        <Play size={28} fill="currentColor" className="ml-1" />
                      </div>
                    </div>

                    {/* Category Overlay Tag */}
                    <div className="absolute top-4 left-4">
                      <span className="rounded-md bg-white/95 px-4 py-1.5 text-[9px] font-black tracking-[0.2em] text-[#001A3D] uppercase shadow-sm backdrop-blur-md">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-grow flex-col bg-white p-8 md:p-10">
                    <div className="mb-6 flex items-center gap-4">
                      <div className="rounded-lg bg-gray-50 p-2.5 transition-colors group-hover:bg-[#0171c1]/5">
                        {item.type === "Podcast" ? (
                          <Mic size={16} className="text-[#0171c1]" />
                        ) : (
                          <Video size={16} className="text-[#0171c1]" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black tracking-widest text-[#0171c1] uppercase">
                          {item.type}
                        </span>
                        <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                          {item.date}
                        </span>
                      </div>
                    </div>

                    <h3
                      className="display-font mb-4 cursor-pointer text-2xl leading-tight font-bold text-[#001A3D] transition-colors group-hover:text-[#0171c1]"
                      onClick={() => setSelectedVideo(item)}
                    >
                      {item.title}
                    </h3>

                    <p className="mb-8 line-clamp-3 text-sm leading-relaxed font-medium text-gray-500">
                      {item.description}
                    </p>

                    <div className="mt-auto border-t border-gray-50 pt-8">
                      <button
                        onClick={() => setSelectedVideo(item)}
                        className="group/btn flex items-center gap-3 text-[11px] font-black tracking-[0.2em] text-[#001A3D] transition-all hover:text-[#F99D1C]"
                      >
                        VIEW RECORDING
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover/btn:translate-x-2"
                        />
                      </button>
                    </div>
                  </div>
                </Motion.div>
              ))}
            </div>
          ) : (
            <div className="rounded-[3rem] border border-gray-100 bg-white py-40 text-center shadow-sm">
              <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gray-50">
                <Search size={40} className="text-gray-200" />
              </div>
              <h3 className="display-font mb-4 text-3xl font-bold text-[#001A3D]">
                No results found
              </h3>
              <p className="mx-auto mb-10 max-w-md font-medium text-gray-500">
                We couldn't find any media items matching your search criteria. Try using different
                keywords.
              </p>
              <button
                onClick={() => {
                  setActiveTab("All");
                  setSearchQuery("");
                }}
                className="text-xs font-black tracking-widest text-[#0171c1] uppercase hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative overflow-hidden bg-[#001A3D] py-32 text-white">
        <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-16 px-6 lg:flex-row lg:px-20">
          <div className="max-w-2xl space-y-8 text-center lg:text-left">
            <h2 className="display-font text-5xl leading-tight font-bold tracking-tight md:text-7xl">
              Never Miss an <span className="text-[#F99D1C]">Episode.</span>
            </h2>
            <p className="text-xl leading-relaxed font-medium text-gray-400">
              Join 10k+ engineers and technology leaders who receive our latest technical insights
              and webinar recordings weekly.
            </p>
          </div>
          <form className="flex w-full max-w-lg flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Your professional email"
              className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-8 py-6 font-medium transition-all focus:ring-2 focus:ring-[#F99D1C] focus:outline-none"
            />
            <button className="rounded-2xl bg-[#F99D1C] px-10 py-6 text-xs font-black tracking-[0.2em] text-[#001A3D] uppercase shadow-2xl shadow-[#F99D1C]/10 transition-all hover:bg-white">
              Subscribe
            </button>
          </form>
        </div>
        {/* Background blobs */}
        <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-[#0171c1]/10 blur-[100px]"></div>
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#F99D1C]/5 blur-[120px]"></div>
      </section>

      {/* Video Modal Player */}
      <AnimatePresence>
        {selectedVideo && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-6 backdrop-blur-xl"
          >
            <Motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative aspect-video w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl"
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-8 right-8 z-10 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20"
              >
                <X size={28} />
              </button>

              <iframe
                src={`${selectedVideo.videoUrl}?autoplay=1`}
                title={selectedVideo.title}
                className="h-full w-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              <div className="pointer-events-none absolute right-0 bottom-0 left-0 bg-linear-to-t from-black via-black/80 to-transparent p-12">
                <div className="mb-4 flex items-center gap-4">
                  <span className="rounded-md bg-[#F99D1C] px-3 py-1 text-[10px] font-black tracking-widest text-[#001A3D] uppercase">
                    {selectedVideo.type}
                  </span>
                  <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                    {selectedVideo.date}
                  </span>
                </div>
                <h2 className="display-font text-3xl font-bold text-white">
                  {selectedVideo.title}
                </h2>
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
