"use client";

import { motion as Motion } from "framer-motion";
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
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Slider from "react-slick";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function LifeAtHutech() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const awards = [
    {
      icon: <Trophy className="h-10 w-10" />,
      title: "Excellence in Digital Innovation",
      org: "Global Tech Awards 2025",
      desc: "Recognized for pioneering AI-driven solutions that transformed regional banking ecosystems.",
    },
    {
      icon: <Award className="h-10 w-10" />,
      title: "Best Workplace Culture",
      org: "Industry Excellence Forums",
      desc: "Awarded for our 'Family First' philosophy and commitment to employee well-being and growth.",
    },
    {
      icon: <ShieldCheck className="h-10 w-10" />,
      title: "Cybersecurity Leadership",
      org: "SecureWorld Summit",
      desc: "Honored for outstanding contributions to enterprise security and zero-trust implementation.",
    },
  ];

  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="group absolute top-1/2 -left-4 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-[#001A3D] shadow-sm transition-all duration-300 hover:bg-[#001A3D] hover:text-white md:-left-12"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} className="transition-transform group-hover:-translate-x-0.5" />
      </button>
    );
  };

  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="group absolute top-1/2 -right-4 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-[#001A3D] shadow-sm transition-all duration-300 hover:bg-[#001A3D] hover:text-white md:-right-12"
        aria-label="Next slide"
      >
        <ChevronRight size={24} className="transition-transform group-hover:translate-x-0.5" />
      </button>
    );
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
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
        },
      },
    ],
  };

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

      {/* Achievements Section */}
      <section className="relative overflow-hidden border-y border-gray-100 bg-gray-50 py-24">
        <div className="pointer-events-none absolute top-0 right-0 p-20 text-[#001A3D] opacity-[0.03]">
          <Trophy size={400} />
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-5">
              <div className="space-y-4">
                <span className="text-xs font-bold tracking-widest text-[#F99D1C] uppercase">
                  Achievements
                </span>
                <h2 className="display-font text-4xl leading-tight font-semibold tracking-tight text-[#001A3D] md:text-6xl">
                  Awards And <br /> <span className="text-[#F99D1C]">Recognition.</span>
                </h2>
              </div>
              <p className="text-lg leading-relaxed font-medium text-gray-500">
                Our commitment to engineering excellence and people-first culture has been
                consistently recognized by global industry bodies. We take pride in the milestones
                we've achieved together as a family.
              </p>
              <div className="pt-4">
                <Link
                  href="/company/awards"
                  className="inline-flex items-center gap-3 rounded-sm bg-[#001A3D] px-8 py-4 text-xs font-bold tracking-wide text-white transition-all hover:bg-[#002A5D]"
                >
                  View All Awards <MoveRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid gap-6 lg:col-span-7">
              {awards.map((award, i) => (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex flex-col items-start gap-8 rounded-[2.5rem] border border-gray-100 bg-white p-10 transition-all hover:shadow-2xl md:flex-row"
                >
                  <div className="rounded-2xl bg-gray-50 p-5 text-[#F99D1C] transition-all duration-500 group-hover:bg-[#F99D1C] group-hover:text-white">
                    {award.icon}
                  </div>
                  <div className="space-y-3">
                    <p className="text-[11px] font-bold tracking-widest text-[#F99D1C] uppercase">
                      {award.org}
                    </p>
                    <h3 className="display-font text-2xl font-bold text-[#001A3D]">
                      {award.title}
                    </h3>
                    <p className="leading-relaxed font-medium text-gray-500">{award.desc}</p>
                  </div>
                </Motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workplace Exploration Section */}
      <section className="overflow-hidden bg-white py-24">
        <div className="mx-auto mb-16 max-w-[1280px] space-y-4 px-6 lg:px-20">
          <span className="text-xs font-bold tracking-widest text-[#F99D1C] uppercase">
            Our Ecosystem
          </span>
          <h2 className="display-font text-4xl font-semibold tracking-tight text-[#001A3D] md:text-5xl">
            While There's Still A Lot To <br />{" "}
            <span className="text-[#F99D1C]">Explore In Our Workplace</span>
          </h2>
        </div>

        <div className="workplace-carousel relative mx-auto max-w-[1280px] px-6 pb-16 lg:px-20">
          <Slider {...carouselSettings}>
            {[
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
            ].map((slide, i) => (
              <div key={i} className="px-4 py-8">
                <div className="group relative aspect-[4/5] overflow-hidden rounded-[3rem] border border-gray-100 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-700 hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)]">
                  <ImageWithFallback
                    src={`${slide.src}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800`}
                    alt={slide.title}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#001A3D] via-[#001A3D]/20 to-transparent p-10 opacity-90 transition-opacity duration-500">
                    <div className="translate-y-4 transform transition-transform duration-500 group-hover:translate-y-0">
                      <span className="mb-4 inline-block rounded-full bg-[#F99D1C] px-4 py-1.5 text-[10px] font-bold tracking-widest text-[#001A3D] uppercase">
                        {slide.tag}
                      </span>
                      <h4 className="display-font text-2xl leading-tight font-bold text-white">
                        {slide.title}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
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

      <style jsx global>{`
        .workplace-carousel .slick-list {
          overflow: visible;
        }
        .workplace-carousel .slick-dots li {
          margin: 0 4px;
        }
        .workplace-carousel .slick-dots li.slick-active {
          width: 24px;
        }
        .workplace-carousel .slick-dots li button:before {
          display: none;
        }
        .workplace-carousel .slick-dots li {
          width: 8px;
          height: 8px;
          background: #e5e7eb;
          border-radius: 9999px;
          transition: all 0.3s ease;
        }
        .workplace-carousel .slick-dots li.slick-active {
          background: #F99D1C;
        }
      `}</style>
    </div>
  );
}
