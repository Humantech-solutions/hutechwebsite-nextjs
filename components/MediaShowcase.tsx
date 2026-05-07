"use client";

import { useRef, useState } from "react";
import { motion as Motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import Slider from "react-slick";
import { 
  Play, 
  Mic, 
  Video, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight,
  MonitorPlay,
  X
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const MEDIA_ITEMS = [
  {
    type: "Podcast",
    title: "Why Hutech Solutions",
    image: "https://images.unsplash.com/photo-1625123627242-97ef1000c6d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    icon: <Mic className="w-3.5 h-3.5" />,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    type: "Case Study",
    title: "Automated Sales for a Grass Company",
    image: "https://images.unsplash.com/photo-1602973240044-ac77578f6dc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    icon: <ArrowUpRight className="w-3.5 h-3.5" />,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    type: "Webinar",
    title: "How Cloud is Driving AI Future",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    icon: <Video className="w-3.5 h-3.5" />,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    type: "Podcast",
    title: "The Future of AI in Enterprise Engineering",
    image: "https://images.unsplash.com/photo-1558403194-611308249627?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    icon: <Mic className="w-3.5 h-3.5" />,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    type: "Event",
    title: "Hutech Solutions at TechSummit 2026",
    image: "https://images.unsplash.com/photo-1540575861501-7ad058a87941?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    icon: <Video className="w-3.5 h-3.5" />,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
];

export function MediaShowcase() {
  const sliderRef = useRef<Slider | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<typeof MEDIA_ITEMS[0] | null>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "20px"
        }
      }
    ]
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#001A3D] tracking-tight display-font">
            Code, Coffee & Conversations
          </h2>
          
          <div className="flex items-center gap-6">
            <Link 
              href="/resources/media"
              className="group flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 text-[#001A3D] text-[13px] font-bold hover:bg-gray-50 transition-all shadow-sm"
            >
              All Podcasts
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => sliderRef.current?.slickPrev()}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#001A3D] hover:border-[#001A3D] transition-all cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => sliderRef.current?.slickNext()}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#001A3D] hover:border-[#001A3D] transition-all cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="-mx-4">
          <Slider ref={sliderRef} {...settings}>
            {MEDIA_ITEMS.map((item, idx) => (
              <div key={idx} className="px-4 group">
                <div 
                  className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => setSelectedVideo(item)}
                >
                  <ImageWithFallback 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[0.2] group-hover:grayscale-0"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute top-6 left-6">
                    <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/40 bg-black/20 backdrop-blur-md text-white text-[12px] font-bold group-hover:bg-white group-hover:text-[#001A3D] group-hover:border-white transition-all">
                      <Play size={14} fill="currentColor" />
                      <span>Watch</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-8 left-8 right-8 space-y-3">
                    <div className="flex items-center gap-2 text-[#F99D1C]">
                      {item.icon}
                      <span className="text-[11px] font-bold uppercase tracking-widest">{item.type}</span>
                    </div>
                    <h3 className="text-white text-xl md:text-2xl font-bold leading-tight group-hover:underline">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

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
                className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
              >
                <button 
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all border border-white/10 backdrop-blur-md"
                >
                  <X size={24} />
                </button>

                <iframe
                  src={`${selectedVideo.videoUrl}?autoplay=1`}
                  title={selectedVideo.title}
                  className="w-full h-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>

                <div className="absolute bottom-0 left-0 right-0 p-8 bg-linear-to-t from-black via-black/60 to-transparent pointer-events-none">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-0.5 bg-[#0171c1] text-white text-[10px] font-bold rounded">{selectedVideo.type}</span>
                  </div>
                  <h2 className="text-white text-2xl font-bold">{selectedVideo.title}</h2>
                </div>
              </Motion.div>
            </Motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
