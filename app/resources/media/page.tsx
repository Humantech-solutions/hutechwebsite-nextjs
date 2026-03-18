"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Mic, 
  Video, 
  Search, 
  X,
  ArrowRight,
  Clock,
  Calendar
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

const MEDIA_DATA = [
  {
    id: 1,
    type: "Podcast",
    title: "Why Melonleaf Consulting: A Strategic Partnership",
    description: "In this episode, we dive deep into our partnership with Melonleaf and how it's shaping the future of digital transformation.",
    image: "https://images.unsplash.com/photo-1625123627242-97ef1000c6d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    duration: "45:20",
    date: "March 10, 2026",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Strategy"
  },
  {
    id: 2,
    type: "Webinar",
    title: "How Cloud is Driving AI Future in Banking",
    description: "Explore the intersection of cloud scalability and AI precision in the modern banking landscape.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    duration: "58:15",
    date: "March 05, 2026",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Cloud & AI"
  },
  {
    id: 3,
    type: "Case Study",
    title: "Automated Sales for a Grass Company",
    description: "A visual walkthrough of how we automated complex sales cycles for a leading landscaping enterprise.",
    image: "https://images.unsplash.com/photo-1602973240044-ac77578f6dc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    duration: "12:40",
    date: "Feb 28, 2026",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Automation"
  },
  {
    id: 4,
    type: "Podcast",
    title: "The Future of AI in Enterprise Engineering",
    description: "Discussing the shift from traditional engineering to AI-first development paradigms.",
    image: "https://images.unsplash.com/photo-1558403194-611308249627?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    duration: "32:10",
    date: "Feb 20, 2026",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Engineering"
  },
  {
    id: 5,
    type: "Event",
    title: "Hutech Solutions at TechSummit 2026",
    description: "Highlights and key takeaways from our keynote at the Global TechSummit in London.",
    image: "https://images.unsplash.com/photo-1540575861501-7ad058a87941?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    duration: "15:00",
    date: "Jan 15, 2026",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Events"
  },
  {
    id: 6,
    type: "Webinar",
    title: "Securing the Perimeter with Zero Trust AI",
    description: "Technical deep dive into zero-trust architectures powered by proactive AI monitoring.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    duration: "42:30",
    date: "Jan 10, 2026",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Cybersecurity"
  }
];

const CATEGORIES = ["All", "Podcast", "Webinar", "Case Study", "Event"];

export default function MediaListing() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<typeof MEDIA_DATA[0] | null>(null);

  const filteredMedia = MEDIA_DATA.filter(item => {
    const matchesTab = activeTab === "All" || item.type === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
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
      <section className="bg-[#001A3D] text-white py-24 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl space-y-6 text-center md:text-left"
          >
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <span className="block w-8 h-[2px] bg-[#FFAF2B]"></span>
              <span className="text-[#FFAF2B] text-xs font-semibold tracking-widest uppercase">Multimedia Archive</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-semibold mb-6 display-font tracking-tight leading-tight">
              Code, Coffee & <br /><span className="text-[#FFAF2B]">Conversations</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-medium">
              Explore our collection of expert-led webinars, in-depth podcasts, and highlight reels from global tech events. Stay ahead of the curve with Hutech Solutions.
            </p>
          </Motion.div>
        </div>
        {/* Abstract background element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-[#0171c1]/20 to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-24 right-20 w-80 h-80 bg-[#FFAF2B]/10 rounded-full blur-[100px] pointer-events-none"></div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-[72px] z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 py-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-black tracking-widest transition-all whitespace-nowrap ${
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
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0171c1]/20 transition-all"
            />
          </div>
        </div>
      </section>

      {/* Media Grid */}
      <section className="py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          {filteredMedia.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredMedia.map((item, idx) => (
                <Motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
                >
                  <div className="relative aspect-video overflow-hidden cursor-pointer" onClick={() => setSelectedVideo(item)}>
                    <ImageWithFallback 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-[#001A3D]/40 transition-colors"></div>
                    
                    {/* Duration Badge */}
                    <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-lg text-[10px] text-white font-black tracking-widest flex items-center gap-1.5 border border-white/10 uppercase">
                      <Clock size={12} />
                      {item.duration}
                    </div>

                    {/* Play Button Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-[#FFAF2B] text-[#001A3D] flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                        <Play size={28} fill="currentColor" className="ml-1" />
                      </div>
                    </div>

                    {/* Category Overlay Tag */}
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-1.5 bg-white/95 backdrop-blur-md text-[#001A3D] text-[9px] font-black uppercase tracking-[0.2em] rounded-md shadow-sm">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 md:p-10 flex flex-col flex-grow bg-white">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-2.5 bg-gray-50 rounded-lg group-hover:bg-[#0171c1]/5 transition-colors">
                        {item.type === "Podcast" ? <Mic size={16} className="text-[#0171c1]" /> : <Video size={16} className="text-[#0171c1]" />}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-[#0171c1] uppercase tracking-widest">{item.type}</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.date}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-[#001A3D] mb-4 leading-tight group-hover:text-[#0171c1] transition-colors cursor-pointer display-font" onClick={() => setSelectedVideo(item)}>
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                      {item.description}
                    </p>
                    
                    <div className="mt-auto pt-8 border-t border-gray-50">
                      <button 
                        onClick={() => setSelectedVideo(item)}
                        className="text-[11px] font-black text-[#001A3D] flex items-center gap-3 group/btn hover:text-[#FFAF2B] transition-all tracking-[0.2em]"
                      >
                        VIEW RECORDING
                        <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                      </button>
                    </div>
                  </div>
                </Motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-40 bg-white rounded-[3rem] shadow-sm border border-gray-100">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <Search size={40} className="text-gray-200" />
              </div>
              <h3 className="text-3xl font-bold text-[#001A3D] mb-4 display-font">No results found</h3>
              <p className="text-gray-500 max-w-md mx-auto font-medium mb-10">We couldn't find any media items matching your search criteria. Try using different keywords.</p>
              <button 
                onClick={() => {setActiveTab("All"); setSearchQuery("");}}
                className="text-[#0171c1] font-black text-xs uppercase tracking-widest hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-32 bg-[#001A3D] text-white relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
          <div className="max-w-2xl space-y-8 text-center lg:text-left">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight display-font leading-tight">Never Miss an <span className="text-[#FFAF2B]">Episode.</span></h2>
            <p className="text-gray-400 text-xl font-medium leading-relaxed">Join 10k+ engineers and technology leaders who receive our latest technical insights and webinar recordings weekly.</p>
          </div>
          <form className="w-full max-w-lg flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Your professional email" 
              className="flex-1 px-8 py-6 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FFAF2B] transition-all font-medium"
            />
            <button className="px-10 py-6 bg-[#FFAF2B] text-[#001A3D] font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-white transition-all shadow-2xl shadow-[#FFAF2B]/10">
              Subscribe
            </button>
          </form>
        </div>
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#0171c1]/10 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FFAF2B]/5 rounded-full blur-[120px]"></div>
      </section>

      {/* Video Modal Player */}
      <AnimatePresence>
        {selectedVideo && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl"
          >
            <Motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-8 right-8 z-10 w-14 h-14 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all border border-white/10 backdrop-blur-md"
              >
                <X size={28} />
              </button>

              <iframe
                src={`${selectedVideo.videoUrl}?autoplay=1`}
                title={selectedVideo.title}
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              <div className="absolute bottom-0 left-0 right-0 p-12 bg-linear-to-t from-black via-black/80 to-transparent pointer-events-none">
                <div className="flex items-center gap-4 mb-4">
                   <span className="px-3 py-1 bg-[#FFAF2B] text-[#001A3D] text-[10px] font-black tracking-widest rounded-md uppercase">{selectedVideo.type}</span>
                   <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">{selectedVideo.date}</span>
                </div>
                <h2 className="text-white text-3xl font-bold display-font">{selectedVideo.title}</h2>
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
