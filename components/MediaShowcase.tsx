"use client";

import { useRef, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
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
  X,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const MEDIA_ITEMS = [
  {
    type: "Podcast",
    title: "Why Melonleaf Consulting",
    image:
      "https://images.unsplash.com/photo-1625123627242-97ef1000c6d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    icon: <Mic className="h-3.5 w-3.5" />,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    type: "Case Study",
    title: "Automated Sales for a Grass Company",
    image:
      "https://images.unsplash.com/photo-1602973240044-ac77578f6dc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    icon: <ArrowUpRight className="h-3.5 w-3.5" />,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    type: "Webinar",
    title: "How Cloud is Driving AI Future",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    icon: <Video className="h-3.5 w-3.5" />,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    type: "Podcast",
    title: "The Future of AI in Enterprise Engineering",
    image:
      "https://images.unsplash.com/photo-1558403194-611308249627?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    icon: <Mic className="h-3.5 w-3.5" />,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    type: "Event",
    title: "Hutech Solutions at TechSummit 2026",
    image:
      "https://images.unsplash.com/photo-1540575861501-7ad058a87941?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    icon: <Video className="h-3.5 w-3.5" />,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

export function MediaShowcase() {
  const sliderRef = useRef<Slider | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<(typeof MEDIA_ITEMS)[0] | null>(null);

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
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <section className="overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="display-font text-3xl font-bold tracking-tight text-[#001A3D] md:text-4xl">
            Code, Coffee & Conversations
          </h2>

          <div className="flex items-center gap-6">
            <Link
              href="/resources/media"
              className="group flex items-center gap-2 rounded-full border border-gray-200 px-6 py-2.5 text-[13px] font-bold text-[#001A3D] shadow-sm transition-all hover:bg-gray-50"
            >
              All Podcasts
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={() => sliderRef.current?.slickPrev()}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-all hover:border-[#001A3D] hover:text-[#001A3D]"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => sliderRef.current?.slickNext()}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-all hover:border-[#001A3D] hover:text-[#001A3D]"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="-mx-4">
          <Slider ref={sliderRef} {...settings}>
            {MEDIA_ITEMS.map((item, idx) => (
              <div key={idx} className="group px-4">
                <div
                  className="relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl"
                  onClick={() => setSelectedVideo(item)}
                >
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover grayscale-[0.2] transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D] via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-60"></div>

                  {/* Play Button Overlay */}
                  <div className="absolute top-6 left-6">
                    <div className="flex items-center gap-2.5 rounded-full border border-white/40 bg-black/20 px-4 py-1.5 text-[12px] font-bold text-white backdrop-blur-md transition-all group-hover:border-white group-hover:bg-white group-hover:text-[#001A3D]">
                      <Play size={14} fill="currentColor" />
                      <span>Watch</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute right-8 bottom-8 left-8 space-y-3">
                    <div className="flex items-center gap-2 text-[#FFAF2B]">
                      {item.icon}
                      <span className="text-[11px] font-bold tracking-widest uppercase">
                        {item.type}
                      </span>
                    </div>
                    <h3 className="text-xl leading-tight font-bold text-white group-hover:underline md:text-2xl">
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
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-6 backdrop-blur-xl"
            >
              <Motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl"
              >
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-6 right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20"
                >
                  <X size={24} />
                </button>

                <iframe
                  src={`${selectedVideo.videoUrl}?autoplay=1`}
                  title={selectedVideo.title}
                  className="h-full w-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>

                <div className="pointer-events-none absolute right-0 bottom-0 left-0 bg-linear-to-t from-black via-black/60 to-transparent p-8">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="rounded bg-[#0171c1] px-2 py-0.5 text-[10px] font-bold text-white">
                      {selectedVideo.type}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">{selectedVideo.title}</h2>
                </div>
              </Motion.div>
            </Motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
