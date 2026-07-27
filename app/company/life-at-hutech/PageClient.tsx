"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  HeartPulse,
  BookOpen,
  Coffee,
  Trophy,
  ChevronLeft,
  ChevronRight,
  X,
  Star,
  ShieldCheck,
  Award,
  Heart,
  Users,
  Cpu
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Slider from "react-slick";
import Link from "next/link";
import { useState, useCallback, useEffect, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LifeAtHutechData } from "@/lib/wordpress";

const formatTitle = (text: string | undefined) => {
  if (!text) return null;
  const parts = text.split('|');
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts[0]} <br />
      <span className="text-[#F99D1C]">{parts.slice(1).join('')}</span>
    </>
  );
}

const getIcon = (name: string | undefined, defaultIcon: React.ReactNode) => {
  if (!name) return defaultIcon;
  const lower = name.toLowerCase();
  if (lower.includes('health') || lower.includes('heart')) return <HeartPulse className="h-10 w-10" />;
  if (lower.includes('learn') || lower.includes('book')) return <BookOpen className="h-10 w-10" />;
  if (lower.includes('work') || lower.includes('coffee') || lower.includes('balance')) return <Coffee className="h-10 w-10" />;
  if (lower.includes('reward') || lower.includes('trophy')) return <Trophy className="h-10 w-10" />;
  if (lower.includes('star')) return <Star className="h-10 w-10" />;
  if (lower.includes('shield')) return <ShieldCheck className="h-10 w-10" />;
  if (lower.includes('award')) return <Award className="h-10 w-10" />;
  if (lower.includes('user') || lower.includes('people')) return <Users className="h-10 w-10" />;
  return defaultIcon;
};

export default function LifeAtHutech({ data }: { data: LifeAtHutechData | null }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const workplaceSliderRef = useRef<Slider>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openLightbox = useCallback((postIndex: number) => {
    setCurrentPostIndex(postIndex);
    setCurrentImageIndex(0);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "unset";
  }, []);

  const settings = data?.settings || {};
  
  // Group gallery images by post
  const galleryPosts = (data?.galleries || []).map(g => {
    // If the post has a featured image, we prepend it to the content images (if it's not already there)
    // Actually, g.imagesFromContent includes all img tags. g.imageUrl is either featured or first content img.
    // Let's gather all unique images.
    let allImages = [...(g.imagesFromContent || [])];
    if (g.imageUrl && !allImages.includes(g.imageUrl)) {
      allImages.unshift(g.imageUrl);
    }
    return {
      title: g.title,
      tag: g.categories?.[0]?.name || "Occasion",
      coverImage: allImages[0] || "",
      allImages: allImages
    };
  }).filter(p => p.allImages.length > 0);
  
  // Fallback if no images found
  if (galleryPosts.length === 0) {
    galleryPosts.push(
      { 
        title: "Team Outing", 
        tag: "Team Outing", 
        coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
        allImages: ["https://images.unsplash.com/photo-1522071820081-009f0129c71c"]
      },
      { 
        title: "Tech Summit", 
        tag: "Tech Summit", 
        coverImage: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
        allImages: ["https://images.unsplash.com/photo-1517048676732-d65bc937f952"]
      }
    );
  }

  const activePost = galleryPosts[currentPostIndex] || galleryPosts[0];
  const activeImages = activePost?.allImages || [];

  const nextImage = useCallback(() => {
    if (activeImages.length === 0) return;
    setCurrentImageIndex((prev) => (prev + 1) % activeImages.length);
  }, [activeImages.length]);

  const prevImage = useCallback(() => {
    if (activeImages.length === 0) return;
    setCurrentImageIndex((prev) => (prev - 1 + activeImages.length) % activeImages.length);
  }, [activeImages.length]);

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

  const benefits = [
    {
      icon: <Users className="h-7 w-7" />,
      title: "Great Place Great Culture",
      desc: "At Hutech Solutions, we foster a culture of collaboration, innovation, and growth, where every team member is valued and supported. It’s a great place to thrive both personally and professionally."
    },
    {
      icon: <Cpu className="h-7 w-7" />,
      title: "Cutting Edge Tech Work",
      desc: "At our company, we are at the forefront of leveraging the latest technologies like AI ML, IoT, and more, while solving complex tech challenges. Our team thrives on innovation, pushing boundaries to deliver impactful solutions that drive real-world results."
    },
    {
      icon: <Trophy className="h-7 w-7" />,
      title: "Work Hard, Claim Reward",
      desc: "Work hard and you’ll be rewarded. We promote a culture where commitment results in measurable accomplishment because we think that hard work merits acknowledgment."
    }
  ];

  // Filter workplace slides by selected workplaceCategories if any
  const workplaceSlides = (data?.galleries || []).filter(g => {
    if (!settings.workplaceCategories?.length) return true;
    const selectedSlugs = settings.workplaceCategories.map((c: any) => c.slug);
    return g.categories.some(c => selectedSlugs.includes(c.slug));
  }).map(g => {
    let allImages = [...(g.imagesFromContent || [])];
    if (g.imageUrl && !allImages.includes(g.imageUrl)) {
      allImages.unshift(g.imageUrl);
    }
    return {
      title: g.title,
      tag: g.categories?.[0]?.name || "Workplace",
      coverImage: allImages[0] || "",
    };
  }).filter(p => p.coverImage);

  if (workplaceSlides.length === 0) {
    workplaceSlides.push(
      {
        coverImage: "https://images.unsplash.com/photo-1761818645928-47e5dad8ec76",
        title: "Modern Collaboration Hubs",
        tag: "Innovation",
      },
      {
        coverImage: "https://images.unsplash.com/photo-1716703373041-bd135107d947",
        title: "Inclusive Social Spaces",
        tag: "Culture",
      }
    );
  }

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    swipe: true,
    draggable: true,
    adaptiveHeight: false,
  };

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title={data?.title || "Life at Hutech Solutions | Our Family & Culture"}
        description={settings.heroDescription || "Experience the vibrant culture at Hutech Solutions."}
      />
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={settings.heroImage || "https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"}
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
                  {settings.heroEyebrow || "People & Culture"}
                </span>
              </div>
              <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
                {formatTitle(settings.heroTitle) || formatTitle("The Hutech |Family.")}
              </h1>
              <p className="max-w-2xl text-xl leading-relaxed font-medium text-gray-400">
                {settings.heroDescription || "At Hutech Solutions, we don't just build software; we build careers and lifelong relationships."}
              </p>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="overflow-hidden bg-white py-[50px]">
        <div className="mx-auto mb-16 max-w-[1280px] space-y-4 px-6 lg:px-20">
          <span className="text-xs font-bold tracking-widest text-[#F99D1C] uppercase">
            {settings.galleryEyebrow || "Gallery"}
          </span>
          <h2 className="display-font text-4xl font-semibold tracking-tight text-[#001A3D] md:text-6xl">
            {formatTitle(settings.galleryTitle) || formatTitle("Take a sneak peek at |Life at Hutech")}
          </h2>
          <p className="max-w-xl text-lg font-medium text-gray-500">
            {settings.galleryDescription || "A visual journey through our celebrations, team building, and everyday excellence."}
          </p>
        </div>

        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {galleryPosts.map((post, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => openLightbox(i)}
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-[15px] sm:rounded-3xl shadow-lg"
              >
                <ImageWithFallback
                  src={`${post.coverImage}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600`}
                  alt={post.tag}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#001A3D]/90 via-[#001A3D]/20 to-transparent p-6">
                  <div className="text-white">
                    <p className="mb-1 text-[10px] font-bold tracking-widest text-[#F99D1C] uppercase">
                      {post.tag}
                    </p>
                    <h4 className="display-font text-lg font-bold">{post.title}</h4>
                    {post.allImages.length > 1 && (
                      <p className="mt-1 text-xs text-gray-300">
                        {post.allImages.length} Photos
                      </p>
                    )}
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
            
            {activeImages.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 md:left-8 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-[#F99D1C] hover:text-[#001A3D]"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            <div
              className="relative max-h-[85vh] max-w-5xl w-full overflow-hidden rounded-[15px] sm:rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <ImageWithFallback
                src={`${activeImages[currentImageIndex]}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=90&w=1600`}
                alt={activePost.tag}
                className="h-full w-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-center text-lg font-bold text-white">{activePost.title}</p>
                {activeImages.length > 1 && (
                  <p className="text-center text-xs text-gray-400">
                    {currentImageIndex + 1} / {activeImages.length}
                  </p>
                )}
              </div>
            </div>

            {activeImages.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 md:right-8 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-[#F99D1C] hover:text-[#001A3D]"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>
        )}
      </section>

      {/* Benefits Section */}
      <section className="relative overflow-hidden border-y border-gray-100 bg-gray-50 py-[50px]">
        <div className="pointer-events-none absolute top-0 right-0 p-20 text-[#001A3D] opacity-[0.03]">
          <HeartPulse size={400} />
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-16 space-y-4 text-center">
            <span className="text-xs font-bold tracking-widest text-[#F99D1C] uppercase">
              {settings.benefitsEyebrow || "Benefits"}
            </span>
            <h2 className="display-font text-4xl leading-tight font-semibold tracking-tight text-[#001A3D] md:text-6xl">
              {formatTitle(settings.benefitsTitle) || formatTitle("More Than a Workplace— |A Place to Thrive")}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {benefits.map((benefit, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative flex flex-col justify-between items-start rounded-[15px] sm:rounded-[24px] border border-gray-100 bg-white p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 min-h-[300px]"
              >
                <div className="space-y-6 w-full">
                  <div className="shrink-0 w-14 h-14 rounded-[15px] sm:rounded-2xl bg-[#F99D1C]/10 text-[#F99D1C] flex items-center justify-center transition-all duration-500 group-hover:bg-[#F99D1C] group-hover:text-white group-hover:scale-105">
                    {benefit.icon}
                  </div>
                  <div className="space-y-3 w-full">
                    <h3 className="display-font text-xl font-bold text-[#001A3D] tracking-tight">
                      {benefit.title}
                    </h3>
                    <p className="leading-relaxed text-sm font-medium text-gray-500">{benefit.desc}</p>
                  </div>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workplace Exploration Section */}
      <section className="overflow-hidden bg-white py-[50px]">
        <div className="mx-auto mb-12 max-w-[1280px] px-6 lg:px-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <span className="text-xs font-bold tracking-widest text-[#F99D1C] uppercase">
              {settings.workplaceEyebrow || "Our Ecosystem"}
            </span>
            <h2 className="display-font text-4xl font-semibold tracking-tight text-[#001A3D] md:text-5xl">
              {formatTitle(settings.workplaceTitle) || formatTitle("While There's Still A Lot To |Explore In Our Workplace")}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => workplaceSliderRef.current?.slickPrev()}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-[#001A3D] shadow-sm transition-all duration-300 hover:bg-[#f5a623] hover:text-white hover:border-[#f5a623]"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => workplaceSliderRef.current?.slickNext()}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-[#001A3D] shadow-sm transition-all duration-300 hover:bg-[#f5a623] hover:text-white hover:border-[#f5a623]"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="workplace-carousel relative mx-auto w-full max-w-[1440px] overflow-hidden px-4 sm:px-6 lg:px-8">
          {mounted && (
            <Slider 
              ref={workplaceSliderRef} 
              {...carouselSettings}
            >
              {workplaceSlides.map((slide, i) => (
                <div className="w-full min-w-0 outline-none pb-8">
                  <div className="group relative h-[400px] w-full overflow-hidden rounded-[15px] sm:rounded-[2.5rem] shadow-2xl md:h-[500px]">
                    <ImageWithFallback
                      src={`${slide.coverImage}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920`}
                      alt={slide.title}
                      className="h-full w-full object-cover transition-transform duration-[1.5s] ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D]/90 via-[#001A3D]/40 to-transparent mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D]/95 via-[#001A3D]/20 to-transparent"></div>
                    
                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16">
                      <div className="max-w-4xl transform transition-all duration-700 translate-y-2 group-hover:translate-y-0 opacity-90 group-hover:opacity-100">
                        <span className="mb-4 inline-flex items-center rounded-full border border-[#F99D1C]/30 bg-[#F99D1C]/10 px-5 py-2 text-[11px] font-bold tracking-widest text-[#F99D1C] uppercase backdrop-blur-sm">
                          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#F99D1C]"></span>
                          {slide.tag}
                        </span>
                        <h4 className="display-font text-4xl leading-[1.1] font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
                          {slide.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-[#001A3D] py-[50px] text-white">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 -mt-48 -mr-48 h-96 w-96 rounded-full bg-[#F99D1C]/20 blur-[100px]"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] space-y-12 px-6 text-center lg:px-20">
          <h2 className="display-font mx-auto max-w-4xl text-4xl leading-tight font-semibold tracking-tight md:text-6xl">
            {formatTitle(settings.ctaTitle) || formatTitle("Ready to become a part of |our Family?")}
          </h2>
          <div className="flex flex-col justify-center gap-6 sm:flex-row">
            <Link
              href={settings.ctaBtn1Link || "/careers"}
              className="rounded-sm bg-white px-12 py-5 text-center text-xs font-bold tracking-wide text-[#001A3D] transition-all hover:bg-[#F99D1C]"
            >
              {settings.ctaBtn1Text || "See Open Positions"}
            </Link>
            <Link
              href={settings.ctaBtn2Link || "/contact"}
              className="rounded-sm border border-white/20 bg-transparent px-12 py-5 text-center text-xs font-bold tracking-wide text-white transition-all hover:border-[#F99D1C] hover:text-[#F99D1C]"
            >
              {settings.ctaBtn2Text || "Contact HR Team"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
