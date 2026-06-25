"use client";

import { motion as Motion, AnimatePresence } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  Heart,
  Users,
  Star,
  Award,
  ShieldCheck,
  Trophy,
  MoveRight,
  ChevronLeft,
  ChevronRight,
  X,
  GraduationCap,
  Clock,
  Coins,
  Sparkles,
  HeartHandshake,
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";
import { useState, useCallback, useEffect, useRef } from "react";

export default function LifeAtHutech() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Ecosystem state
  const [ecoActiveIndex, setEcoActiveIndex] = useState(0);
  const [ecoDirection, setEcoDirection] = useState(0);
  const [isEcoHovered, setIsEcoHovered] = useState(false);
  const ecoContainerRef = useRef<HTMLDivElement>(null);

  const ecosystemSlides = [
    {
      src: "https://images.unsplash.com/photo-1761818645928-47e5dad8ec76",
      title: "Modern Collaboration Hubs",
      tag: "Innovation",
    },
    {
      src: "https://images.unsplash.com/photo-1716703373041-bd135107d947",
      title: "Inclusive Social Spaces",
      tag: "Culture",
    },
    {
      src: "https://images.unsplash.com/photo-1726365222176-425a1a1b9b98",
      title: "Innovation Tech Labs",
      tag: "R&D",
    },
    {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c",
      title: "Strategic Thinking Zones",
      tag: "Strategy",
    },
    {
      src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      title: "Cross-Functional Pods",
      tag: "Teams",
    },
  ];

  const nextEcoSlide = useCallback(() => {
    setEcoDirection(1);
    setEcoActiveIndex((prev) => (prev + 1) % 5);
  }, []);

  const prevEcoSlide = useCallback(() => {
    setEcoDirection(-1);
    setEcoActiveIndex((prev) => (prev - 1 + 5) % 5);
  }, []);

  // Keyboard navigation when mouse is hovered
  useEffect(() => {
    if (!isEcoHovered) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextEcoSlide();
      } else if (e.key === "ArrowLeft") {
        prevEcoSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isEcoHovered, nextEcoSlide, prevEcoSlide]);

  // Autoplay functionality
  useEffect(() => {
    const timer = setInterval(() => {
      nextEcoSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextEcoSlide]);

  // Mouse wheel scroll navigation manually attached to support preventDefault
  useEffect(() => {
    const el = ecoContainerRef.current;
    if (!el) return;

    let throttleTimer = false;
    const handleWheelRaw = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 15 || Math.abs(e.deltaX) > 15) {
        e.preventDefault();
        if (throttleTimer) return;
        throttleTimer = true;
        
        if (e.deltaY > 0 || e.deltaX > 0) {
          nextEcoSlide();
        } else {
          prevEcoSlide();
        }

        setTimeout(() => {
          throttleTimer = false;
        }, 800); // Throttling wheel transitions
      }
    };

    el.addEventListener("wheel", handleWheelRaw, { passive: false });
    return () => el.removeEventListener("wheel", handleWheelRaw);
  }, [nextEcoSlide, prevEcoSlide]);

  // Drag start/end state for swiping
  const [dragStartX, setDragStartX] = useState(0);

  const handleDragStart = (e: any, info: any) => {
    setDragStartX(info.point.x);
  };

  const handleDragEnd = (e: any, info: any) => {
    const dragDistance = info.point.x - dragStartX;
    if (dragDistance < -60) {
      nextEcoSlide();
    } else if (dragDistance > 60) {
      prevEcoSlide();
    }
  };

  const openLightbox = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "unset";
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % 8);
  }, []);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + 8) % 8);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, closeLightbox, nextImage, prevImage]);
  const cultureItems = [
    {
      icon: <Heart className="h-8 w-8 text-[#F99D1C]" />,
      title: "The Hutech Family",
      desc: "More than just a workplace, we are a global family that supports each other's personal and professional growth.",
    },
    {
      icon: <Users className="h-8 w-8 text-[#F99D1C]" />,
      title: "Inclusive Culture",
      desc: "We celebrate diversity and foster an environment where every voice is heard and every contribution is valued.",
    },
    {
      icon: <Star className="h-8 w-8 text-[#F99D1C]" />,
      title: "Continuous Learning",
      desc: "We invest in our people with regular workshops, certifications, and mentorship programs to keep us at the cutting edge.",
    },
  ];

  const galleryImages = [
    { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c", tag: "Team Outing" },
    { src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952", tag: "Tech Summit" },
    { src: "https://images.unsplash.com/photo-1543269865-cbf427effbad", tag: "Celebrations" },
    { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f", tag: "Collaboration" },
    { src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18", tag: "Holiday Party" },
    { src: "https://images.unsplash.com/photo-1556761175-b413da4baf72", tag: "Workspace" },
    { src: "https://images.unsplash.com/photo-1552664730-d307ca884978", tag: "Workshop" },
    { src: "https://images.unsplash.com/photo-1600880212340-02d956ea3a92", tag: "Global Meet" },
  ];

  const benefits = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Health & Wellness",
      desc: "Comprehensive healthcare and wellness support.",
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Learning & Growth",
      desc: "Continuous learning, certifications, and career development.",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Work-Life Balance",
      desc: "Flexible work environment and employee-friendly policies.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Rewards & Recognition",
      desc: "Performance incentives and recognition programs.",
    },
  ];




  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="Life at Hutech Solutions | Our Family & Culture"
        description="Experience the vibrant culture at Hutech Solutions. Discover how our family-centric approach drives innovation and excellence."
      />
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Life at Hutech"
            className="h-full w-full scale-105 object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/80 to-transparent"></div>
        </div>

        <div className="absolute inset-0 z-10 flex items-center">
          <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-20">
            <Motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-4xl"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="h-[1px] w-12 bg-[#F99D1C]"></span>
                <span className="text-[10px] font-bold tracking-[0.3em] text-[#F99D1C] uppercase">
                  People & Culture
                </span>
              </div>
              <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
                The Hutech <br />
                <span className="text-[#F99D1C]">Family.</span>
              </h1>
              <p className="max-w-2xl text-xl leading-relaxed font-medium text-gray-400">
                At Hutech Solutions, we don't just build software; we build careers and lifelong
                relationships. Discover what makes us more than just a company.
              </p>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="overflow-hidden bg-white py-24">
        <div className="mx-auto mb-16 max-w-[1280px] space-y-4 px-6 lg:px-20">
          <span className="text-xs font-bold tracking-widest text-[#F99D1C] uppercase">
            Gallery
          </span>
          <h2 className="display-font text-4xl font-semibold tracking-tight text-[#001A3D] md:text-6xl">
            Take a sneak peek at <br /> <span className="text-[#F99D1C]">Life at Hutech</span>
          </h2>
          <p className="max-w-xl text-lg font-medium text-gray-500">
            A visual journey through our celebrations, team building, and everyday excellence across
            our global offices.
          </p>
        </div>

        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {galleryImages.map((img, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => openLightbox(i)}
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-3xl shadow-lg"
              >
                <ImageWithFallback
                  src={`${img.src}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600`}
                  alt={img.tag}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#001A3D]/90 via-[#001A3D]/20 to-transparent p-6">
                  <div className="text-white">
                    <p className="mb-1 text-[10px] font-bold tracking-widest text-[#F99D1C] uppercase">
                      Occasion
                    </p>
                    <h4 className="display-font text-lg font-bold">{img.tag}</h4>
                  </div>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {lightboxOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 md:left-8 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-[#F99D1C] hover:text-[#001A3D]"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <div
              className="relative max-h-[85vh] max-w-5xl w-full overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <ImageWithFallback
                src={`${galleryImages[currentImageIndex].src}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=90&w=1600`}
                alt={galleryImages[currentImageIndex].tag}
                className="h-full w-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-center text-lg font-bold text-white">{galleryImages[currentImageIndex].tag}</p>
                <p className="text-center text-xs text-gray-400">{currentImageIndex + 1} / {galleryImages.length}</p>
              </div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 md:right-8 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-[#F99D1C] hover:text-[#001A3D]"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </section>

      {/* Benefits Section */}
      <section className="relative overflow-hidden border-y border-gray-100 bg-gray-50 py-24">
        {/* Decorative subtle ambient glows to represent premium styling */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#F99D1C]/5 blur-[100px]"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#001A3D]/5 blur-[100px]"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Side Content */}
            <div className="space-y-6 text-left">
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1.5px] bg-[#F99D1C]"></span>
                <span className="text-xs font-bold tracking-widest text-[#F99D1C] uppercase">
                  Benefits
                </span>
              </div>
              <h2 className="display-font text-4xl leading-tight font-semibold tracking-tight text-[#001A3D] md:text-5xl lg:text-6xl">
                Empowering People, <br />
                <span className="text-[#F99D1C]">Enabling Success</span>
              </h2>
              <div className="w-16 h-1 bg-[#F99D1C] my-6"></div>
              <p className="text-lg leading-relaxed font-medium text-gray-500 max-w-xl">
                We care about our people and their well-being. Our benefits are designed to support employees professionally, personally, and financially throughout their journey at Hutech.
              </p>
            </div>

            {/* Right Side Cards (2x2 Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, i) => (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group flex flex-col items-start gap-5 rounded-[1.5rem] border border-white/20 bg-white/60 backdrop-blur-md p-8 shadow-lg shadow-gray-100/50 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:bg-white hover:border-[#F99D1C]/20"
                >
                  <div className="rounded-xl bg-gray-50 p-4 text-[#F99D1C] transition-all duration-300 group-hover:bg-[#F99D1C] group-hover:text-white">
                    {benefit.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="display-font text-lg font-bold text-[#001A3D] group-hover:text-[#F99D1C] transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-sm leading-relaxed font-medium text-gray-500">{benefit.desc}</p>
                  </div>
                </Motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workplace Exploration Section - Heading above, pure visual carousel below */}
      <section className="bg-white pt-20 pb-16 md:pt-28 md:pb-20">
        {/* Top Content Block */}
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20 mb-10 md:mb-14">
          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1.5px] bg-[#F99D1C]"></span>
              <span className="text-[10px] font-bold tracking-widest text-[#F99D1C] uppercase">
                Our Ecosystem
              </span>
            </div>
            <h2 className="display-font text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#001A3D] leading-tight max-w-2xl">
              While There's Still A Lot To{" "}
              <span className="text-[#F99D1C]">Explore In Our Workplace</span>
            </h2>
            <p className="text-base md:text-lg font-medium text-gray-500 max-w-xl leading-relaxed">
              A glimpse into the spaces, labs, and collaborative environments that power Hutech's culture of innovation and excellence.
            </p>
          </Motion.div>
        </div>

        {/* Carousel Area — pure visuals only */}
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div
            ref={ecoContainerRef}
            onMouseEnter={() => setIsEcoHovered(true)}
            onMouseLeave={() => setIsEcoHovered(false)}
            className="w-full h-[420px] md:h-[500px] bg-black flex items-center justify-center relative overflow-hidden select-none rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-white/10"
          >
            {/* Slide Backdrop */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <AnimatePresence initial={false} custom={ecoDirection} mode="popLayout">
                <Motion.div
                  key={ecoActiveIndex}
                  custom={ecoDirection}
                  variants={{
                    enter: (dir: number) => ({
                      x: dir > 0 ? "100%" : "-100%",
                      opacity: 0,
                    }),
                    center: {
                      x: 0,
                      opacity: 1,
                    },
                    exit: (dir: number) => ({
                      x: dir < 0 ? "100%" : "-100%",
                      opacity: 0,
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.25 },
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <ImageWithFallback
                    src={`${ecosystemSlides[ecoActiveIndex].src}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1920`}
                    alt={ecosystemSlides[ecoActiveIndex].title}
                    className="w-full h-full object-cover pointer-events-none select-none"
                  />
                  {/* Subtle vignette for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"></div>
                </Motion.div>
              </AnimatePresence>
            </div>

            {/* Touch Swipe Gesture Overlay */}
            <Motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 z-10 w-full h-full cursor-grab active:cursor-grabbing bg-transparent"
            />

            {/* Left Arrow Button */}
            <button
              onClick={prevEcoSlide}
              className="absolute left-6 z-30 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 backdrop-blur-md text-white shadow-xl transition-all duration-300 hover:bg-[#F99D1C] hover:text-[#001025] hover:scale-110 active:scale-95 group"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} className="transition-transform group-hover:-translate-x-0.5" />
            </button>

            {/* Right Arrow Button */}
            <button
              onClick={nextEcoSlide}
              className="absolute right-6 z-30 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 backdrop-blur-md text-white shadow-xl transition-all duration-300 hover:bg-[#F99D1C] hover:text-[#001025] hover:scale-110 active:scale-95 group"
              aria-label="Next slide"
            >
              <ChevronRight size={24} className="transition-transform group-hover:translate-x-0.5" />
            </button>

            {/* Minimalist Slide Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              {ecosystemSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setEcoActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    ecoActiveIndex === idx ? "w-8 bg-[#F99D1C]" : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-[#001A3D] py-24 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 -mt-48 -mr-48 h-96 w-96 rounded-full bg-[#F99D1C]/20 blur-[100px]"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] space-y-12 px-6 text-center lg:px-20">
          <h2 className="display-font mx-auto max-w-4xl text-4xl leading-tight font-semibold tracking-tight md:text-6xl">
            Ready to become a part of <br /> our <span className="text-[#F99D1C]">Family?</span>
          </h2>
          <div className="flex flex-col justify-center gap-6 sm:flex-row">
            <Link
              href="/careers"
              className="rounded-sm bg-white px-12 py-5 text-center text-xs font-bold tracking-wide text-[#001A3D] transition-all hover:bg-[#F99D1C]"
            >
              See Open Positions
            </Link>
            <Link
              href="/contact"
              className="rounded-sm border border-white/20 bg-transparent px-12 py-5 text-center text-xs font-bold tracking-wide text-white transition-all hover:border-[#F99D1C] hover:text-[#F99D1C]"
            >
              Contact HR Team
            </Link>
          </div>
        </div>
      </section>

      
    </div>
  );
}
