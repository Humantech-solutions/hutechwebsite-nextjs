"use client";

import { useState, useRef, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  MoveRight,
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  Cpu,
  Cloud,
  Settings,
  ShieldCheck,
  TrendingUp,
  Award,
  Users,
  Briefcase,
  Zap,
  Globe,
  Activity,
  GraduationCap,
  HeartPulse,
  Monitor,
  ShieldAlert,
  Trophy,
  Star
} from "lucide-react";
import Slider from "react-slick";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";
import { Meta } from "@/components/Meta";

// Asset paths
const samAltmanImg = "/assets/22febdba9948fa49e4211b0c440830215a31d096.png";
const heroImg = "/assets/310f3ecce35af7049868ea8c5fbb79881cc4acde.png";
const linePattern = "/assets/c70f0c069be641e3c4679e15a1f46e98bd813e34.png";
const kotakLogo = "/assets/7864b46c9929cf2e5a24585f95cf2482dc8190ba.png";
const serkoLogo = "/assets/adf5bc4ee0b9144881c1a1c79a3c359ab494a4ae.png";
const naukriLogo = "/imports/image.png";
const designCafeLogo = "/imports/image-1.png";
const vymoLogo = "/assets/76644f0c90d14e2ea0a74926de1556a5c5a241ed.png";
const payULogo = "/imports/image-2.png";
const doSelectLogo = "/imports/image-3.png";
const bluElementLogo = "/imports/image-4.png";
const litmus7Logo = "/imports/image-5.png";
const dnaInfotechLogo = "/imports/image-6.png";
const analyticsQuad4Logo = "/imports/image-8.png";
const delcaperLogo = "/imports/image-9.png";
const shreeMarutiLogo = "/imports/image-10.png";
const mMaxLogo = "/imports/image-11.png";
const gTechLogo = "/assets/f19fa3e782f01d3f92173c6bccc64bc7da0be8b9.png";

const BRAND_BLUE_ACCENT = "#0171c1";
const BRAND_BLUE = "#001A3D";
const MAROON = "#4A0416";


const WHATS_NEW = [
  {
    title: "Hutech Solutions & AWS Partner to Accelerate Fintech Solutions",
    date: "News • March 10, 2026",
    image: "https://images.unsplash.com/photo-1762279388952-85187155e48d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    title: "Hutech Named 'Leader' in Gartner Magic Quadrant for Managed IT Services",
    date: "News • February 15, 2026",
    image: "https://images.unsplash.com/photo-1714601344981-75e003bc5d18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    title: "Tech Mahindra & Hutech Partnering to Drive Next-Gen AI Consulting",
    date: "Press Release • January 20, 2026",
    image: "https://images.unsplash.com/photo-1758843412266-e8661a80ada2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  }
];

const SUCCESS_STORIES = [
  {
    name: "Marco Abbado",
    title: "CIO, European Bank",
    text: "Innovation is key to our strategy, and Hutech Cloud is driving the future of enterprise AI.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    name: "Jenny Legg",
    title: "CEO, Retail Group",
    text: "The expertise Hutech brings to the table is unmatched in digital retail transformation.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    name: "Alex Reed",
    title: "VP, Global Logistics",
    text: "Our supply chain has never been more resilient thanks to Hutech's predictive analytics.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    name: "Sarah Chen",
    title: "Head of AI, Tech Giant",
    text: "The technical depth and delivery speed from Hutech is truly impressive for global scale.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    name: "David Kumar",
    title: "CTO, FinTech Innovators",
    text: "Hutech's blockchain solutions have revolutionized our payment infrastructure with unparalleled security.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    name: "Maria Santos",
    title: "Director, Healthcare Systems",
    text: "The AI-driven diagnostics platform built by Hutech has transformed patient care in our network.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    name: "James Wright",
    title: "VP Engineering, Manufacturing Corp",
    text: "Their IoT solutions brought real-time visibility to our production lines, cutting downtime by 40%.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  }
];

const VALUED_PARTNERS = [
  { name: "Kotak Mahindra Bank", logo: kotakLogo },
  { name: "Serko", logo: serkoLogo },
  { name: "Naukri.com", logo: naukriLogo },
  { name: "Design Cafe", logo: designCafeLogo },
  { name: "Vymo", logo: vymoLogo },
  { name: "PayU", logo: payULogo },
  { name: "DoSelect", logo: doSelectLogo },
  { name: "BluElement", logo: bluElementLogo },
  { name: "Litmus7", logo: litmus7Logo },
  { name: "DNA Infotech", logo: dnaInfotechLogo }
];

const SPECIAL_PARTNERS = [
  { logo: analyticsQuad4Logo, name: "Analytics Quad4" },
  { logo: delcaperLogo, name: "Delcaper" },
  { logo: shreeMarutiLogo, name: "Shree Maruti" },
  { logo: mMaxLogo, name: "M Max" },
  { logo: gTechLogo, name: "G-Tech" }
];

const CAPABILITIES_DATA = [
  { 
    name: "Artificial Intelligence", 
    image: "https://hutechsolutions.com/wp-content/uploads/2026/05/AI.jpg",
    color: "#002964"
  },
  { 
    name: "Banking & Financial Services", 
    image: "https://hutechsolutions.com/wp-content/uploads/2026/05/financial-services.jpg",
    color: "#001A3D"
  },
  { 
    name: "Ecommerce Development", 
    image: "https://hutechsolutions.com/wp-content/uploads/2026/05/next-gen-ecommerce.jpg",
    color: "#1A2E35"
  },
  { 
    name: "SRE & DevOps Services", 
    image: "https://hutechsolutions.com/wp-content/uploads/2026/05/devops-services.jpg",
    color: "#2C3E50"
  },
  { 
    name: "Cloud Transformation", 
    image: "https://hutechsolutions.com/wp-content/uploads/2026/05/clouds-transformation.jpg",
    color: "#1C2833"
  },
  { 
    name: "Blockchain Development", 
    image: "https://hutechsolutions.com/wp-content/uploads/2026/05/blockchain-devlopment.jpg",
    color: "#001A3D"
  },
  { 
    name: "Enterprise Digital Solutions", 
    image: "https://hutechsolutions.com/wp-content/uploads/2026/05/enterprise-digital-solutions.jpg",
    color: "#002964"
  },
  { 
    name: "Development and Maintenance", 
    image: "https://hutechsolutions.com/wp-content/uploads/2026/05/development.jpg",
    color: "#003366"
  }
];

const WHY_NABHIRA_ITEMS = [
  {
    title: "Structured Approach",
    content: "We follow a systematic and well-defined methodology to ensure every project is executed with precision, clarity, and alignment with your business objectives."
  },
  {
    title: "Delivery Maturity",
    content: "Consistently executing complex programs with proven governance, risk control, quality, and delivery processes to a predictable result at scale."
  },
  {
    title: "Automation to the core",
    content: "Embedding intelligent automation across processes, delivery, and operations to drive efficiency, consistency, and scalability by design."
  },
  {
    title: "Predictable Outcome",
    content: "Leveraging architecture rigor, automation, observability, and data-driven controls to consistently deliver measurable technology and business results."
  }
];

function WhyNabhiraAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {WHY_NABHIRA_ITEMS.map((item, index) => (
        <div key={index} className="border-b border-white/10">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-start gap-3 py-4 text-left hover:opacity-80 transition-opacity group"
          >
            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 transition-colors ${openIndex === index ? 'bg-[#F99D1C]' : 'bg-white/40'}`}></div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg">{item.title}</h3>
            </div>
            {openIndex === index ? (
              <Minus size={20} className="flex-shrink-0 text-[#F99D1C] transition-all mt-1" />
            ) : (
              <Plus size={20} className="flex-shrink-0 text-white/60 transition-all mt-1" />
            )}
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <Motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pl-5 pb-4 pr-8">
                  <p className="text-gray-300 text-sm leading-relaxed">{item.content}</p>
                </div>
              </Motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function ValuedPartnersCarousel() {
  const allPartners = [...VALUED_PARTNERS, ...SPECIAL_PARTNERS];
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true },
    [AutoScroll({ playOnInit: true, speed: 1.5, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true })]
  );

  return (
    <div className="relative pb-16">
      {/* Carousel Container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex cursor-grab active:cursor-grabbing touch-pan-y -ml-4 md:-ml-6 py-4">
          {allPartners.map((partner, idx) => (
            <div 
              key={idx} 
              className="flex-[0_0_50%] min-w-[160px] sm:min-w-0 sm:flex-[0_0_33.333%] md:flex-[0_0_25%] lg:flex-[0_0_20%] pl-4 md:pl-6"
            >
              <div className="bg-white border border-gray-100 h-28 sm:h-32 md:h-40 flex items-center justify-center p-6 md:p-8 rounded-[18px] shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-none hover:border-[#0171c1]/50 hover:-translate-y-1 transition-all duration-300 ease-out group select-none">
                <ImageWithFallback
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-contain grayscale-0 opacity-100 transition-transform duration-300 ease-out group-hover:scale-105 pointer-events-none"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function SuccessStoriesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      {/* Header with Navigation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12 md:mb-16">
        <div className="space-y-4 max-w-xl">
          <h2 className="text-4xl md:text-5xl font-semibold text-[#001A3D] display-font tracking-tight leading-tight">Success Stories</h2>
          <p className="text-gray-500 font-medium text-sm">
            We focus on partner with global enterprises solve challenges, accelerate transformation, and drive business outcomes.
          </p>
        </div>
        <div className="flex gap-3 mb-2">
          <button
            onClick={() => scrollRef.current?.scrollBy({ left: -320, behavior: 'smooth' })}
            className="carousel-arrow"
          >
            <ChevronRight size={20} className="rotate-180" />
          </button>
          <button
            onClick={() => scrollRef.current?.scrollBy({ left: 320, behavior: 'smooth' })}
            className="carousel-arrow"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative -mx-6 px-6 lg:-mx-0 lg:px-0">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pb-8 hide-scrollbar"
          style={{ scrollBehavior: 'smooth' }}
        >
          {SUCCESS_STORIES.map((story, idx) => (
            <div key={idx} className="w-[85vw] min-w-[280px] sm:w-[300px] sm:min-w-[300px] md:w-[320px] md:min-w-[320px] lg:w-[calc(25%-18px)] lg:min-w-[calc(25%-18px)] shrink-0 snap-start">
              <div className="relative group h-[500px] overflow-hidden cursor-pointer rounded-sm shadow-sm hover:shadow-xl transition-all">
                <ImageWithFallback
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover transition-all duration-1000 grayscale-[0.7] group-hover:grayscale-0 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#001A3D]/40 mix-blend-color group-hover:opacity-0 transition-opacity duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 sm:p-8 space-y-4 transform group-hover:-translate-y-2 transition-transform duration-500 z-10 w-full">
                  <p className="text-white text-sm sm:text-base font-medium leading-relaxed italic line-clamp-4">"{story.text}"</p>
                  <div className="pt-4 border-t border-white/20">
                    <p className="text-white font-semibold text-sm sm:text-base break-words">{story.name}</p>
                    <p className="text-[#F99D1C] text-[10px] sm:text-xs font-semibold tracking-widest break-words mt-1">{story.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeCapIdx, setActiveCapIdx] = useState(0);
  const industryScrollRef = useRef<HTMLDivElement>(null);
  const heroSliderRef = useRef<Slider>(null);

  // What's New Carousel Hooks
  const [whatsNewRef, whatsNewApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [whatsNewSelectedIndex, setWhatsNewSelectedIndex] = useState(0);
  const [whatsNewHovered, setWhatsNewHovered] = useState(false);

  useEffect(() => {
    if (!whatsNewApi) return;
    const onSelect = () => {
      setWhatsNewSelectedIndex(whatsNewApi.selectedScrollSnap());
    };
    whatsNewApi.on("select", onSelect);
    whatsNewApi.on("init", onSelect);
    return () => {
      whatsNewApi.off("select", onSelect);
      whatsNewApi.off("init", onSelect);
    };
  }, [whatsNewApi]);

  useEffect(() => {
    if (!whatsNewApi || whatsNewHovered) return;
    const intervalId = setInterval(() => {
      whatsNewApi.scrollNext();
    }, 4500);
    return () => clearInterval(intervalId);
  }, [whatsNewApi, whatsNewHovered]);

  const heroSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5500,
    fade: true,
    arrows: false,
    dotsClass: "slick-dots custom-dots",
    customPaging: (i: number) => (
      <div className="w-3 h-3 rounded-full bg-current transition-all duration-300 shadow-sm" />
    )
  };

  const HERO_SLIDES = [
    {
      eyebrow: "",
      titlePart1: "Innovate with AI,",
      titleHighlight: "Accelerate",
      titlePart2: "with ML",
      description: "Transform your business with precision AI/ML solutions that optimize operations, enhance customer experiences, and drive growth.",
      image: heroImg,
      alt: "AI & ML Solutions",
    },
    {
      eyebrow: "",
      titlePart1: "Driving Innovation In",
      titleHighlight: "Banking, Financial Services\nand Insurance Domain",
      titlePart2: "",
      description: "Secure, Scalable, and Tailored Solutions to Transform Financial Institutions and Elevate Customer Experiences.",
      image: "https://hutechsolutions.com/wp-content/uploads/2026/05/banking.jpg",
      alt: "Banking Financial Services Insurance",
    },
    {
      eyebrow: "",
      titlePart1: "Next Gen Ecommerce\nApplication Development",
      titleHighlight: "Services",
      titlePart2: "",
      description: "Hutech Solutions transforms your eCommerce vision into a high-performing digital store that attracts customers and boosts profits.",
      image: "https://hutechsolutions.com/wp-content/uploads/2026/05/next-gen-ecommerce-1.jpg",
      alt: "Ecommerce Application Development",
    },
    {
      eyebrow: "",
      titlePart1: "Digital Transformation\nFor The",
      titleHighlight: "Digital Age",
      titlePart2: "",
      description: "Our solutions are designed to keep your business ahead of the competition in an ever-changing market.",
      image: "https://hutechsolutions.com/wp-content/uploads/2026/05/digital-transforamtions.jpeg",
      alt: "Digital Transformation",
    },
    {
      eyebrow: "",
      titlePart1: "IoT: Smart Solutions\nfor a",
      titleHighlight: "Connected World",
      titlePart2: "",
      description: "Our IoT services offer seamless integration of devices and systems, enabling limitless possibilities for innovation and growth.",
      image: "https://hutechsolutions.com/wp-content/uploads/2026/05/iot-smart-solutions.jpeg",
      alt: "IoT Smart Connected World",
    },
  ];

  return (
    <div className="flex flex-col bg-white overflow-hidden">
      <Meta 
        title="Hutech Solutions | Advanced AI, Cloud & Engineering"
        description="Premium corporate engineering solutions specializing in AI/ML, Cloud Transformation, SRE & DevOps, and Fintech app development."
      />
      {/* Hero Carousel Section */}
      <section className="relative w-full overflow-hidden" aria-label="Hero Section">
        <Slider ref={heroSliderRef} {...heroSettings}>
          {HERO_SLIDES.map((slide, idx) => (
            <div key={idx} className="relative h-[600px] md:h-[620px]">
              <ImageWithFallback
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover brightness-[0.6]"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D]/95 via-[#001A3D]/60 to-transparent"></div>
              {/* Blue accent bar */}
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-[#0171c1] to-transparent opacity-90"></div>
              {/* Bottom fade */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#001A3D]/30 to-transparent"></div>

              <div className="absolute inset-0 flex items-center">
                <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-20">
                  <div className="max-w-4xl space-y-6 md:space-y-8">
                    {/* Eyebrow */}
                    <div className="flex items-center gap-3">
                      <span className="block w-6 md:w-8 h-[2px] bg-[#F99D1C] shrink-0"></span>
                      <span className="text-[#F99D1C] text-[11px] md:text-[12px] font-semibold tracking-wide">
                        {slide.eyebrow || "Digital Engineering Excellence"}
                      </span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight display-font whitespace-pre-line">
                      {slide.titlePart1}{" "}
                      <span className="text-[#F99D1C] whitespace-pre-line">{slide.titleHighlight}</span>
                      {slide.titlePart2 && <>{"\n"}{slide.titlePart2}</>}
                    </h1>

                    {/* Description */}
                    <p className="text-gray-200 text-base md:text-xl font-medium max-w-2xl leading-relaxed opacity-90">
                      {slide.description}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 pt-2">
                      <Link 
                        href="/contact"
                        className="group flex items-center justify-center gap-3 bg-[#0171c1] text-white font-bold py-4 px-8 md:px-10 text-[11px] md:text-xs tracking-wider hover:bg-white hover:text-[#001A3D] transition-all duration-300 shadow-xl w-full sm:w-auto"
                      >
                        Contact Us
                        <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                      <Link 
                        href="/services"
                        className="flex items-center justify-center border border-white/40 text-white font-semibold py-4 px-8 md:px-10 text-[11px] md:text-xs tracking-wider hover:border-white hover:bg-white/10 transition-all duration-300 w-full sm:w-auto"
                      >
                        Our Services
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Navigation Arrows */}
        <div className="absolute right-6 md:right-12 lg:right-20 bottom-8 z-20 flex items-center bg-black/35 backdrop-blur-md border border-white/10 rounded-[4px] shadow-lg overflow-hidden">
          <button 
            onClick={() => heroSliderRef.current?.slickPrev()} 
            className="group flex items-center justify-center w-14 h-14 text-white hover:bg-white/10 transition-all duration-300"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-0.5" />
          </button>
          <div className="h-8 w-[1px] bg-white/20"></div>
          <button 
            onClick={() => heroSliderRef.current?.slickNext()} 
            className="group flex items-center justify-center w-14 h-14 text-white hover:bg-white/10 transition-all duration-300"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>

        <style>{`
          .custom-dots {
            bottom: 32px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            text-align: center !important;
            width: auto !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            margin: 0 !important;
            padding: 0 !important;
            list-style: none !important;
            z-index: 20;
          }
          .custom-dots li {
            margin: 0 6px !important;
            width: 10px !important;
            height: 10px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          .custom-dots li button {
            padding: 0 !important;
            width: 10px !important;
            height: 10px !important;
            display: block !important;
          }
          .custom-dots li button:before {
            display: none !important;
          }
          .custom-dots li div {
            background-color: rgba(255, 255, 255, 0.4) !important;
            border: none !important;
            width: 10px !important;
            height: 10px !important;
            border-radius: 50% !important;
            transition: all 0.3s ease !important;
          }
          .custom-dots li.slick-active div {
            background-color: #F99D1C !important;
            opacity: 1 !important;
            transform: scale(1.25) !important;
            box-shadow: 0 0 10px rgba(249, 157, 28, 0.5) !important;
          }
        `}</style>
      </section>

      {/* "with Hutech Solutions" section */}
      <section className="py-20 bg-[#FAF9F6] border-b border-gray-100 overflow-hidden" aria-label="About Hutech Solutions">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 flex flex-col md:flex-row items-center gap-12 md:gap-32">
          <div className="flex-1 space-y-6 md:space-y-8 order-2 md:order-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#001A3D] display-font tracking-tight leading-tight">
              with Hutech <span className="text-gray-400">Solutions</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg font-medium leading-relaxed max-w-xl">
              We are a remarkable group of creatives who transform traditional company concepts into reliable digital solutions. We provide comprehensive solutions that effortlessly include cutting-edge ideas by employing cutting-edge methodologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/about" className="bg-[#0171c1] text-white flex justify-center items-center font-semibold py-4 px-10 text-[11px] tracking-wider shadow-lg hover:shadow-xl hover:bg-[#001A3D] transition-all">
                Know More
              </Link>
              <Link href="/about" className="border border-[#0171c1] text-[#0171c1] flex justify-center items-center font-semibold py-4 px-10 text-[11px] tracking-wider hover:bg-[#0171c1]/5 transition-all">
                The Brand Story
              </Link>
            </div>
          </div>
          <div className="flex-1 relative order-1 md:order-2 w-full">
            <div className="aspect-[16/9] rounded-sm overflow-hidden shadow-2xl rotate-1 md:rotate-2">
              <ImageWithFallback 
                src="https://hutechsolutions.com/wp-content/uploads/2026/04/home.jpg"
                alt="Digital engineering excellence at Hutech Solutions"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative BG element */}
            <div className="absolute -inset-4 bg-[#0171c1]/5 -z-10 -rotate-1 md:-rotate-2"></div>
          </div>
        </div>
      </section>

      {/* "The Big Thinkers" Section */}
      <section className="py-20 bg-[#001A3D] text-white relative overflow-hidden" aria-label="Quotes">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 flex flex-col md:flex-row items-center md:items-end gap-12 relative z-10">
          <div className="flex-1 space-y-8 md:space-y-10 relative z-10 pb-4 md:pb-8 w-full">
            <div className="flex items-center gap-3">
              <span className="text-[#0171c1] font-semibold italic text-xl md:text-2xl">The</span>
              <span className="text-white font-semibold text-3xl md:text-4xl display-font italic tracking-tight">Big</span>
              <span className="text-blue-200 font-medium text-3xl md:text-4xl italic">Thinkers</span>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.2] md:leading-[1.1] tracking-tight display-font max-w-2xl">
              Artificial Intelligence is the <br className="hidden md:block" />
              most important technology <br className="hidden md:block" />
              of our generation.
            </h3>
            <div className="space-y-1">
              <p className="font-semibold text-lg tracking-tight text-white">Sam Altman</p>
              <p className="text-blue-200 text-[11px] font-semibold tracking-wider">CEO, OpenAI</p>
            </div>
          </div>
          <div className="flex-1 relative h-[350px] md:h-[500px] w-full group/thinker cursor-pointer">
            <ImageWithFallback 
              src={samAltmanImg}
              alt="Sam Altman - AI visionary"
              className="w-full h-full object-contain object-bottom relative z-10 grayscale-[0.6] group-hover/thinker:grayscale-0 transition-all duration-700"
            />
            {/* Abstract glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[#0171c1]/10 blur-[120px] rounded-full group-hover/thinker:bg-[#0171c1]/20 transition-all duration-700"></div>
            <div className="absolute inset-0 bg-linear-to-t from-[#001A3D]/40 to-transparent z-0"></div>
          </div>
        </div>
      </section>


      {/* Expertise Across Industries */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12 md:mb-20">
            <div className="max-w-2xl space-y-6">
              <h2 className="text-4xl md:text-5xl font-semibold text-[#001A3D] display-font tracking-tight leading-tight">Expertise Across Industries</h2>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">
                Our expertise spans 15 industries including Banking, Insurance, Healthcare, Life Sciences, Media, Entertainment, Distribution and more.
              </p>
            </div>
            <div className="flex gap-3 md:mb-2">
              <button 
                onClick={() => industryScrollRef.current?.scrollBy({ left: -320, behavior: 'smooth' })}
                className="carousel-arrow"
              >
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 rotate-180" />
              </button>
              <button 
                onClick={() => industryScrollRef.current?.scrollBy({ left: 320, behavior: 'smooth' })}
                className="carousel-arrow"
              >
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>

          <div 
            ref={industryScrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pb-10 hide-scrollbar -mx-6 px-6 lg:-mx-20 lg:px-20"
            style={{ scrollBehavior: 'smooth' }}
          >
              {[
                { name: "Education", icon: <GraduationCap className="w-10 h-10" /> },
                { name: "Energy & Utilities", icon: <Zap className="w-10 h-10" /> },
                { name: "Healthcare & Life Sciences", icon: <HeartPulse className="w-10 h-10" /> },
                { name: "Hi-Tech", icon: <Monitor className="w-10 h-10" /> },
                { name: "Insurance", icon: <ShieldAlert className="w-10 h-10" /> },
                { name: "Banking & Finance", icon: <Globe className="w-10 h-10" /> },
                { name: "Logistics", icon: <Activity className="w-10 h-10" /> },
                { name: "Public Sector", icon: <Users className="w-10 h-10" /> }
              ].map((industry, idx) => (
                <div key={idx} className="w-[85vw] min-w-[280px] sm:w-[300px] sm:min-w-[300px] md:w-[320px] md:min-w-[320px] lg:w-[calc(25%-18px)] lg:min-w-[calc(25%-18px)] shrink-0 snap-start flex flex-col">
                  <div 
                    className="bg-white p-6 sm:p-8 md:p-10 border border-gray-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer group flex flex-col justify-between min-h-[300px] md:min-h-[340px] hover:border-[#F99D1C]/30 flex-grow"
                  >
                    <div className="text-[#F99D1C] transition-all group-hover:scale-110">
                      {industry.icon}
                    </div>
                    <div className="space-y-4 md:space-y-6">
                      <h4 className="text-[#001A3D] text-xl md:text-2xl font-bold leading-tight tracking-tight display-font break-words">
                        {industry.name}
                      </h4>
                      <div className="pt-4 md:pt-6 border-t border-gray-100">
                        <Motion.button
                          whileHover="expanded"
                          initial="initial"
                          className="flex items-center justify-center h-10 md:h-12 rounded-full border border-[#F99D1C]/40 hover:border-[#F99D1C] bg-transparent text-[#F99D1C] overflow-hidden cursor-pointer"
                          variants={{
                            initial: { width: 40 },
                            expanded: { width: "auto", paddingLeft: 16, paddingRight: 16 }
                          }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <Motion.span
                            variants={{
                              initial: { width: 0, opacity: 0, marginRight: 0 },
                              expanded: { width: "auto", opacity: 1, marginRight: 8 }
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="text-[11px] font-semibold tracking-wide whitespace-nowrap overflow-hidden"
                          >
                            Know More
                          </Motion.span>
                          <ChevronRight className="w-4 h-4 shrink-0" />
                        </Motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section 
        className="py-20 text-white overflow-hidden bg-[#0A2A60]"
        aria-labelledby="capabilities-title"
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="max-w-2xl mb-12 md:mb-16 space-y-4">
            <h2 id="capabilities-title" className="text-4xl sm:text-5xl md:text-6xl font-semibold display-font tracking-tight">Capabilities</h2>
            <p className="text-blue-100/70 font-medium text-sm md:text-base leading-relaxed">
              Deploying solutions and platforms that actually move the needle across customer experience and business outcomes.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
            <div className="flex-1 space-y-1 relative z-10 w-full">
              <div className="grid grid-cols-1">
                {CAPABILITIES_DATA.map((cap, idx) => (
                  <button 
                    key={idx} 
                    onMouseEnter={() => setActiveCapIdx(idx)}
                    onClick={() => setActiveCapIdx(idx)}
                    className={`flex items-center justify-between w-full group py-4 md:py-6 border-b border-white/10 text-left transition-all duration-300 ${activeCapIdx === idx ? "text-[#F99D1C] pl-2 md:pl-4" : "hover:text-[#F99D1C] hover:pl-1 md:hover:pl-2"}`}
                  >
                    <span className={`text-lg md:text-xl font-medium tracking-tight ${activeCapIdx === idx ? "font-semibold" : "font-normal"}`}>{cap.name}</span>
                    <ChevronRight className={`w-5 h-5 md:w-6 md:h-6 transition-all duration-300 ${activeCapIdx === idx ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`} />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex-1 relative h-[400px] md:h-[600px] w-full hidden md:block">
              <div className="relative w-full h-full">
                <AnimatePresence mode="wait">
                  <Motion.div
                    key={activeCapIdx}
                    initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <ImageWithFallback 
                      src={CAPABILITIES_DATA[activeCapIdx].image}
                      alt={CAPABILITIES_DATA[activeCapIdx].name}
                      className="w-full h-full object-cover rounded-sm shadow-2xl brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0A2A60]/40 to-transparent"></div>
                  </Motion.div>
                </AnimatePresence>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 md:w-32 h-24 md:h-32 border-t-2 border-r-2 border-[#0171c1]/40 pointer-events-none"></div>
                <div className="absolute -bottom-4 -left-4 w-24 md:w-32 h-24 md:h-32 border-b-2 border-l-2 border-[#0171c1]/40 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition Section */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-md space-y-4">
               <h2 className="text-3xl md:text-4xl font-semibold text-[#001A3D] display-font tracking-tight">Recognized for Excellence.</h2>
               <p className="text-gray-500 font-medium leading-relaxed">Our commitment to engineering quality and innovation has been recognized by global industry leaders and certification bodies.</p>
               <Link href="/company/awards" className="inline-flex items-center gap-2 text-[#0171c1] font-bold text-sm hover:gap-4 transition-all">
                  View All Awards <MoveRight size={16} />
               </Link>
            </div>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
               {[
                 { icon: <Award className="w-8 h-8" />, label: "Excellence in Digital" },
                 { icon: <ShieldCheck className="w-8 h-8" />, label: "ISO 27001 Certified" },
                 { icon: <Trophy className="w-8 h-8" />, label: "AI Innovation" },
                 { icon: <Star className="w-8 h-8" />, label: "Top Workplace" }
               ].map((item, i) => (
                 <div key={i} className="flex flex-col items-center text-center space-y-3 group">
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-[#0171c1] group-hover:bg-[#0171c1] group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-lg">
                       {item.icon}
                    </div>
                    <span className="text-[10px] font-bold text-[#001A3D] uppercase tracking-widest leading-tight">{item.label}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Valued Partners Section */}
      <section className="py-24 bg-white border-y border-gray-100 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
            <div className="max-w-2xl space-y-6">
              <h2 className="text-4xl md:text-5xl font-semibold text-[#001A3D] display-font tracking-tight leading-tight">Our Valued Partners</h2>
              <p className="text-gray-500 font-medium text-base md:text-lg leading-relaxed max-w-xl">
                Our trusted customer-centric approach offers entrepreneurs, startups, small and medium businesses, and large corporations an unmatched combination of innovation and excellence.
              </p>
            </div>
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-[2px] bg-[#F99D1C]"></div>
              <span className="text-[#001A3D] font-bold text-xs uppercase tracking-widest group-hover:text-[#0171c1] transition-colors">Trusted Globally</span>
            </div>
          </div>

          <ValuedPartnersCarousel />
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <SuccessStoriesCarousel />
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          {/* Heading */}
          <div className="mb-16 space-y-3">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#001A3D] display-font tracking-tight leading-tight">
              The <span className="text-[#F99D1C]">Stack</span> Behind<br />Every Build
            </h2>
            <p className="text-gray-500 font-medium text-sm max-w-xl leading-relaxed">
              We leverage best-in-class technologies across every layer of the stack to engineer robust, scalable, and future-ready solutions.
            </p>
          </div>

          {/* Table */}
          <div className="border border-gray-200 rounded-sm overflow-hidden shadow-sm">

            {/* Row: Data & AI */}
            <div className="flex flex-col md:flex-row border-b border-gray-200">
              <div className="w-full md:w-[200px] shrink-0 flex items-center px-8 py-8 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200">
                <span className="text-[#001A3D] font-semibold text-sm tracking-tight leading-snug">Data & AI</span>
              </div>
              <div className="flex-1 flex flex-wrap items-center gap-x-10 gap-y-8 px-10 py-8">
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-14 h-14 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
                      <path d="M24 4C13 4 13.5 9 13.5 9L13.51 14.2H24.2V15.8H9S4 15.2 4 26.1C4 37 8.3 36.6 8.3 36.6H11.2V31.1S11.1 26.8 15.4 26.8H25.9S30 26.9 30 23V10.5S30.6 4 24 4Z" fill="#3776AB"/>
                      <path d="M24 44C35 44 34.5 39 34.5 39L34.49 33.8H23.8V32.2H39S44 32.8 44 21.9C44 11 39.7 11.4 39.7 11.4H36.8V16.9S36.9 21.2 32.6 21.2H22.1S18 21.1 18 25V37.5S17.4 44 24 44Z" fill="#FFD43B"/>
                      <circle cx="19.5" cy="9" r="2" fill="white"/>
                      <circle cx="28.5" cy="39" r="2" fill="white"/>
                    </svg>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium group-hover:text-[#001A3D] transition-colors">Python</span>
                </div>
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-14 h-14 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
                      <ellipse cx="24" cy="22" rx="14" ry="6" fill="#FEC514"/>
                      <ellipse cx="24" cy="15" rx="9" ry="4" fill="#00BFB3"/>
                      <ellipse cx="24" cy="29" rx="9" ry="4" fill="#00BFB3"/>
                      <ellipse cx="24" cy="22" rx="11" ry="4.5" fill="#343741"/>
                    </svg>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium group-hover:text-[#001A3D] transition-colors">Elasticsearch</span>
                </div>
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-14 h-14 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
                      <path d="M24 4L4 15.5V32.5L24 44L44 32.5V15.5L24 4Z" fill="#FF6F00"/>
                      <path d="M24 14V34M16 18V30L24 34M32 18V30L24 34" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium group-hover:text-[#001A3D] transition-colors">TensorFlow</span>
                </div>
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-14 h-14 flex items-center justify-center bg-black rounded-xl">
                    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="white">
                      <path d="M22.28 9.94a5.76 5.76 0 0 0-.5-4.73 5.93 5.93 0 0 0-6.38-2.83 5.76 5.76 0 0 0-4.35-1.94 5.93 5.93 0 0 0-5.65 4.1 5.76 5.76 0 0 0-3.84 2.79 5.93 5.93 0 0 0 .73 6.95 5.76 5.76 0 0 0 .5 4.73 5.93 5.93 0 0 0 6.38 2.83 5.76 5.76 0 0 0 4.34 1.94 5.93 5.93 0 0 0 5.66-4.1 5.76 5.76 0 0 0 3.84-2.79 5.93 5.93 0 0 0-.73-6.95zM13.4 21.5a4.4 4.4 0 0 1-2.82-1.02l.14-.08 4.68-2.7a.78.78 0 0 0 .39-.67v-6.6l1.98 1.14a.07.07 0 0 1 .04.06v5.46a4.42 4.42 0 0 1-4.41 4.41zM3.67 17.77a4.4 4.4 0 0 1-.53-2.96l.14.09 4.68 2.7a.77.77 0 0 0 .78 0l5.71-3.3v2.28a.08.08 0 0 1-.03.07l-4.73 2.73a4.42 4.42 0 0 1-6.02-1.61zm-.9-9.67a4.4 4.4 0 0 1 2.3-1.94V11.5a.77.77 0 0 0 .39.67l5.71 3.3-1.98 1.14a.08.08 0 0 1-.07 0L4.4 13.88a4.42 4.42 0 0 1-1.63-5.78zm16.27 3.79-5.71-3.3 1.98-1.14a.08.08 0 0 1 .07 0l4.72 2.73a4.41 4.41 0 0 1-.68 7.96V12.78a.77.77 0 0 0-.38-.68zm1.97-3-.14-.09-4.67-2.73a.78.78 0 0 0-.78 0l-5.71 3.3V7.1a.08.08 0 0 1 .03-.07l4.72-2.72a4.41 4.41 0 0 1 6.55 4.58zM9.09 13.17l-1.98-1.14a.08.08 0 0 1-.04-.06V6.51a4.41 4.41 0 0 1 7.24-3.39l-.14.08-4.68 2.7a.77.77 0 0 0-.39.67l-.01 6.6zm1.07-2.32 2.54-1.47 2.54 1.47v2.93l-2.54 1.47-2.54-1.47v-2.93z"/>
                    </svg>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium group-hover:text-[#001A3D] transition-colors">OpenAI</span>
                </div>
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-14 h-14 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
                      <rect width="48" height="48" rx="8" fill="#E8488A"/>
                      <path d="M12 12H20V36L12 28V12Z" fill="white"/>
                      <path d="M20 24L36 36H20V24Z" fill="white" opacity="0.6"/>
                      <path d="M20 12L36 28L28 36L20 24V12Z" fill="white" opacity="0.85"/>
                    </svg>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium group-hover:text-[#001A3D] transition-colors">Kibana</span>
                </div>
              </div>
            </div>

            {/* Row: Cloud Technology */}
            <div className="flex flex-col md:flex-row border-b border-gray-200">
              <div className="w-full md:w-[200px] shrink-0 flex items-center px-8 py-8 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200">
                <span className="text-[#001A3D] font-semibold text-sm tracking-tight leading-snug">Cloud Technology</span>
              </div>
              <div className="flex-1 flex flex-wrap items-center gap-x-10 gap-y-8 px-10 py-8">
                {/* AWS */}
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-14 h-14 flex items-center justify-center">
                    <svg viewBox="0 0 80 50" className="w-14 h-10" fill="none">
                      <path d="M22.9 21.6c0 .8.1 1.5.3 2 .2.5.5.9.9 1.3.1.1.2.2.2.4 0 .2-.1.3-.3.5l-1 .7c-.1.1-.3.1-.4.1-.2 0-.3-.1-.5-.2-.2-.2-.4-.5-.6-.8-.2-.3-.3-.6-.5-1-1.2 1.4-2.7 2.1-4.6 2.1-1.3 0-2.4-.4-3.1-1.1-.8-.7-1.2-1.7-1.2-2.9 0-1.3.5-2.3 1.4-3.1.9-.8 2.2-1.2 3.7-1.2.5 0 1 0 1.5.1s1 .2 1.6.3v-1c0-1-.2-1.7-.7-2.2-.5-.5-1.2-.7-2.3-.7-.5 0-1 .1-1.5.2-.5.1-1 .3-1.5.5-.2.1-.4.2-.5.2-.1 0-.2-.1-.2-.3v-.8c0-.2 0-.3.1-.4.1-.1.2-.2.5-.3.5-.2 1.1-.4 1.7-.5.7-.1 1.4-.2 2.1-.2 1.6 0 2.8.4 3.6 1.1.8.7 1.2 1.8 1.2 3.2v4.3l.1.1zm-6.3 2.4c.5 0 1-.1 1.5-.3.5-.2.9-.5 1.3-1 .2-.3.4-.6.5-1 .1-.4.1-.8.1-1.3v-.6c-.4-.1-.9-.2-1.3-.2-.5-.1-.9-.1-1.4-.1-.9 0-1.6.2-2.1.6-.5.4-.7 1-.7 1.7 0 .7.2 1.2.5 1.6.4.4.9.6 1.6.6zm11.4 1.5c-.2 0-.4 0-.5-.1-.1-.1-.2-.3-.3-.6l-3.3-10.7c-.1-.3-.1-.5-.1-.6 0-.2.1-.3.3-.3h1.3c.2 0 .4 0 .5.1.1.1.2.3.3.6l2.4 9.3 2.2-9.3c.1-.3.2-.5.3-.6.1-.1.3-.1.5-.1h1.1c.2 0 .4 0 .5.1.1.1.2.3.3.6l2.2 9.4 2.5-9.4c.1-.3.2-.5.3-.6.1-.1.3-.1.5-.1h1.2c.2 0 .3.1.3.3 0 .1 0 .2-.1.4 0 .1-.1.2-.1.3L34.4 25c-.1.3-.2.5-.3.6-.1.1-.3.1-.5.1h-1.2c-.2 0-.4 0-.5-.1-.1-.1-.2-.3-.3-.6l-2.2-9.1-2.2 9.1c-.1.3-.2.5-.3.6-.1.1-.3.1-.5.1h-1.5zm14.8.3c-.8 0-1.5-.1-2.2-.4-.7-.2-1.3-.5-1.6-.9-.1-.1-.2-.3-.2-.4 0-.2.1-.3.3-.3h.8c.1 0 .3 0 .4.1.1.1.2.1.3.2.3.2.6.4 1 .5.4.2.8.2 1.2.2.6 0 1.1-.1 1.5-.4.4-.2.5-.6.5-1 0-.3-.1-.5-.3-.7-.2-.2-.6-.4-1.2-.6l-1.7-.5c-.9-.3-1.5-.7-2-1.2-.4-.5-.7-1-.7-1.7 0-.5.1-1 .4-1.4.3-.4.7-.7 1.2-1 .5-.2 1.1-.3 1.7-.3.3 0 .6 0 .9.1.3.1.6.1.9.2.3.1.5.2.7.4.2.1.4.3.5.4.1.1.1.3.1.4v.7c0 .2-.1.3-.3.3-.1 0-.3-.1-.5-.2-.5-.4-1.1-.6-1.8-.6-.6 0-1 .1-1.3.3-.3.2-.5.5-.5.9 0 .3.1.5.3.7.2.2.7.4 1.4.6l1.6.5c.9.3 1.5.7 1.9 1.2.4.5.6 1 .6 1.7 0 .5-.1 1-.4 1.5-.3.5-.7.8-1.2 1.1-.6.2-1.2.4-1.8.4z" fill="#252F3E"/>
                      <path d="M48.5 30.2c-5.4 4-13.2 6.1-19.9 6.1-9.4 0-17.9-3.5-24.3-9.3-.5-.4-.1-1.1.6-.7 6.9 4 15.5 6.4 24.3 6.4 6 0 12.5-1.2 18.5-3.8.9-.4 1.7.6 1.8 1.3z" fill="#FF9900"/>
                      <path d="M50.7 27.7c-.7-.9-4.5-.4-6.2-.2-.5.1-.6-.4-.1-.7 3-2.2 8-1.5 8.6-.8.6.7-.2 5.7-3 8.2-.4.4-.9.2-.7-.3.7-1.5 2.1-5.2 1.4-6.2z" fill="#FF9900"/>
                    </svg>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium group-hover:text-[#001A3D] transition-colors">AWS</span>
                </div>
                {/* Azure */}
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-14 h-14 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-11 h-11" fill="none">
                      <path d="M17.5 4L6 38h10.5L27 14.5 17.5 4z" fill="#0078D4"/>
                      <path d="M27 14.5L16.5 38H42L27 14.5z" fill="#0078D4" opacity="0.75"/>
                    </svg>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium group-hover:text-[#001A3D] transition-colors">Microsoft Azure</span>
                </div>
                {/* Google Cloud */}
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-14 h-14 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
                      <path d="M29.2 15.1l3.5-3.5.2-1.5C29.3 7.1 25 5.5 20.6 5.5c-8.3 0-15.3 5.6-17.5 13.2l1.3-.2 7.1-1.2 1.2-1.2c1.8-2 4.4-3.1 7.2-3.1 2.4 0 4.6.9 6.4 2.5l2.9-.4z" fill="#EA4335"/>
                      <path d="M38.8 18.5c-.8-3-2.7-5.6-5.2-7.5l-5.4 5.4c2.1 1.7 3.5 4.3 3.5 7.1v.9c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5H22.6l-.9.9v5.4l.9.9h9.2c6.6 0 11.9-5.3 11.9-11.9a11.9 11.9 0 0 0-5-9.7l.1-.5z" fill="#4285F4"/>
                      <path d="M13.4 41.6h9.2v-7.1h-9.2c-.7 0-1.3-.1-1.9-.4l-1.3.4-3.5 3.5-.3 1.3c1.9 1.4 4.3 2.2 6.9 2.2l.1.1z" fill="#34A853"/>
                      <path d="M13.4 18.1C6.8 18.1 1.5 23.4 1.5 30s5.3 11.9 11.9 11.9c3.2 0 6.2-1.3 8.4-3.5l-4.5-4.5c-1 1-2.4 1.6-3.9 1.6-3 0-5.4-2.4-5.4-5.4s2.4-5.4 5.4-5.4c1.5 0 2.9.6 3.9 1.6l4.5-4.5a12 12 0 0 0-8.4-3.7z" fill="#FBBC05"/>
                    </svg>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium group-hover:text-[#001A3D] transition-colors">Google Cloud</span>
                </div>
                {/* Oracle */}
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-14 h-14 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
                      <rect width="48" height="48" rx="6" fill="#F80000" opacity="0.1"/>
                      <rect x="8" y="17" width="32" height="14" rx="7" stroke="#F80000" strokeWidth="2.5" fill="none"/>
                    </svg>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium group-hover:text-[#001A3D] transition-colors">Oracle Cloud</span>
                </div>
                {/* IBM */}
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-14 h-14 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
                      <rect x="4" y="13" width="40" height="4" rx="2" fill="#1F70C1"/>
                      <rect x="4" y="21" width="40" height="4" rx="2" fill="#1F70C1"/>
                      <rect x="4" y="29" width="40" height="4" rx="2" fill="#1F70C1"/>
                      <rect x="12" y="13" width="4" height="4" fill="white"/>
                      <rect x="32" y="13" width="4" height="4" fill="white"/>
                      <rect x="12" y="29" width="4" height="4" fill="white"/>
                      <rect x="32" y="29" width="4" height="4" fill="white"/>
                    </svg>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium group-hover:text-[#001A3D] transition-colors">IBM Cloud</span>
                </div>
                {/* DigitalOcean */}
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-14 h-14 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-11 h-11" fill="none">
                      <circle cx="24" cy="20" r="14" fill="#0080FF" opacity="0.12"/>
                      <circle cx="24" cy="20" r="14" stroke="#0080FF" strokeWidth="2" fill="none"/>
                      <path d="M24 8C17.4 8 12 13.4 12 20s5.4 12 12 12v-6c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6h6c0-6.6-5.4-12-12-12z" fill="#0080FF"/>
                      <rect x="18" y="32" width="6" height="4" rx="1" fill="#0080FF"/>
                      <rect x="12" y="26" width="6" height="4" rx="1" fill="#0080FF"/>
                    </svg>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium group-hover:text-[#001A3D] transition-colors">DigitalOcean</span>
                </div>
              </div>
            </div>

            {/* Row: Platform Engineering */}
            <div className="flex flex-col md:flex-row border-b border-gray-200">
              <div className="w-full md:w-[200px] shrink-0 flex items-center px-8 py-8 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200">
                <span className="text-[#001A3D] font-semibold text-sm tracking-tight leading-snug">Platform Engineering</span>
              </div>
              <div className="flex-1 flex flex-wrap items-center gap-x-10 gap-y-8 px-10 py-8">
                {/* Node.js */}
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-14 h-14 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-11 h-11" fill="none">
                      <path d="M24 4L6 14.5v19L24 44l18-10.5v-19L24 4z" fill="#539E43"/>
                      <path d="M21 17v14l3 1.7 3-1.7V17h-6z" fill="white" opacity="0.9"/>
                    </svg>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium group-hover:text-[#001A3D] transition-colors">Node.js</span>
                </div>
                {/* Laravel */}
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-14 h-14 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-11 h-11" fill="none">
                      <path d="M44 13L32 6 20 13 8 6 4 13v22l8 5 12-7 12 7 8-5V13z" fill="#FF2D20" opacity="0.12"/>
                      <path d="M44 13L32 6 20 13v14l12 7 12-7V13z" fill="#FF2D20" opacity="0.7"/>
                      <path d="M20 13L8 6 4 13v14l8 5 8-5V13z" fill="#FF2D20"/>
                    </svg>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium group-hover:text-[#001A3D] transition-colors">Laravel</span>
                </div>
                {/* Java */}
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-14 h-14 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-11 h-11" fill="none">
                      <path d="M18 34s-2 1.2 1.4 1.6c4.1.5 6.2.4 10.7-.5 0 0 1.2.7 2.8 1.3C22.5 40 10 36.6 18 34z" fill="#EA2D2E"/>
                      <path d="M16.5 29.5s-2.2 1.6 1.2 2c4.4.5 7.8.5 13.8-.7 0 0 .8.8 2.1 1.3-12.2 3.6-25.8.2-17.1-2.6z" fill="#EA2D2E"/>
                      <path d="M26.9 20.7c2.5 2.9-.7 5.5-.7 5.5s6.3-3.2 3.4-7.2c-2.7-3.7-4.8-5.5 6.5-11.8 0 0-17.8 4.4-9.2 13.5z" fill="#EA2D2E"/>
                      <path d="M19 25.3s-9.9 2.4-3.5 3.2c2.7.4 8 .3 12.9-.1 4-.3 8.1-1 8.1-1s-1.4.6-2.4 1.3c-9.7 2.5-28.5 1.4-23.1-.8 4.7-1.7 8-2.6 8-2.6z" fill="#5382A1"/>
                      <path d="M35 32.7c9.9-5.1 5.3-10.1 2.1-9.4-.8.2-1.1.4-1.1.4s.3-.4.9-.6c6.5-2.3 11.5 6.8-2 10.3 0-.1.1-.2.1-.7z" fill="#5382A1"/>
                      <path d="M28 4s5.7 5.7-5.4 14.4c-8.8 7-2 11 0 15.6-5.2-4.7-9-8.8-6.4-12.7C20 16.3 30.3 13.7 28 4z" fill="#5382A1"/>
                    </svg>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium group-hover:text-[#001A3D] transition-colors">Java</span>
                </div>
                {/* .NET */}
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-14 h-14 flex items-center justify-center bg-[#512BD4] rounded-xl">
                    <svg viewBox="0 0 40 30" className="w-10 h-8" fill="white">
                      <text x="0" y="10" fontFamily="Arial" fontSize="7" fontWeight="bold">Microsoft</text>
                      <text x="2" y="26" fontFamily="Arial" fontSize="16" fontWeight="bold">.NET</text>
                    </svg>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium group-hover:text-[#001A3D] transition-colors">.Net</span>
                </div>
                {/* Angular */}
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-14 h-14 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-11 h-11" fill="none">
                      <path d="M24 3L4 10l3.1 26.9L24 45l16.9-8.1L44 10 24 3z" fill="#DD0031"/>
                      <path d="M24 3v42l16.9-8.1L44 10 24 3z" fill="#C3002F"/>
                      <path d="M24 8.5L11.5 36h4.5l2.5-6.3h11l2.5 6.3h4.5L24 8.5zm0 7.5l4 10h-8l4-10z" fill="white"/>
                    </svg>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium group-hover:text-[#001A3D] transition-colors">Angular</span>
                </div>
                {/* Vue.js */}
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-14 h-14 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-11 h-11" fill="none">
                      <path d="M24 42L2 8h8.5l13.5 24 13.5-24H46L24 42z" fill="#41B883"/>
                      <path d="M24 42L10.5 18H18L24 28l6-10h7.5L24 42z" fill="#35495E"/>
                    </svg>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium group-hover:text-[#001A3D] transition-colors">Vue.js</span>
                </div>
                {/* React.js */}
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-14 h-14 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-11 h-11" fill="none">
                      <ellipse cx="24" cy="24" rx="5" ry="5" fill="#61DAFB"/>
                      <ellipse cx="24" cy="24" rx="22" ry="9" stroke="#61DAFB" strokeWidth="2" fill="none"/>
                      <ellipse cx="24" cy="24" rx="22" ry="9" stroke="#61DAFB" strokeWidth="2" fill="none" transform="rotate(60 24 24)"/>
                      <ellipse cx="24" cy="24" rx="22" ry="9" stroke="#61DAFB" strokeWidth="2" fill="none" transform="rotate(120 24 24)"/>
                    </svg>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium group-hover:text-[#001A3D] transition-colors">React.js</span>
                </div>
              </div>
            </div>

            {/* Row: Mobile Development */}
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-[200px] shrink-0 flex items-center px-8 py-8 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200">
                <span className="text-[#001A3D] font-semibold text-sm tracking-tight leading-snug">Mobile Development</span>
              </div>
              <div className="flex-1 flex flex-wrap items-center gap-x-10 gap-y-8 px-10 py-8">
                {/* React Native */}
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-14 h-14 flex items-center justify-center bg-[#282C34] rounded-xl">
                    <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none">
                      <ellipse cx="24" cy="24" rx="5" ry="5" fill="#61DAFB"/>
                      <ellipse cx="24" cy="24" rx="20" ry="8" stroke="#61DAFB" strokeWidth="2" fill="none"/>
                      <ellipse cx="24" cy="24" rx="20" ry="8" stroke="#61DAFB" strokeWidth="2" fill="none" transform="rotate(60 24 24)"/>
                      <ellipse cx="24" cy="24" rx="20" ry="8" stroke="#61DAFB" strokeWidth="2" fill="none" transform="rotate(120 24 24)"/>
                    </svg>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium group-hover:text-[#001A3D] transition-colors">React Native</span>
                </div>
                {/* Flutter */}
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-14 h-14 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
                      <path d="M13 24L26 11h10L22 25l14 14H26L13 26l5-1-5-1z" fill="#54C5F8"/>
                      <path d="M26 39L13 26l5-1 13 13-5 1z" fill="#01579B"/>
                      <path d="M26 39l-8-8 5-5 10 10-7 3z" fill="#29B6F6"/>
                    </svg>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium group-hover:text-[#001A3D] transition-colors">Flutter</span>
                </div>
                {/* Swift */}
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-14 h-14 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-11 h-11" fill="none">
                      <rect width="48" height="48" rx="10" fill="#FA7343"/>
                      <path d="M37.6 28.7c.4-1.1.6-2.3.6-3.6 0-5.8-4.2-10.6-9.7-11.7C32 17 33.6 22 31 26.4c-.2.3-.4.7-.7 1L21 38h6.5l4.5-5.5c2.5-3 4.3-2.5 5.6-3.8z" fill="white"/>
                      <path d="M10 30.5c1.8 4.3 6.2 7.5 11.4 7.5H31L21 27c-3.6-3.8-5.7-8.7-5.5-13.6C10.9 16.4 8 21 8 26.2c0 1.5.7 3 2 4.3z" fill="white"/>
                    </svg>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium group-hover:text-[#001A3D] transition-colors">Swift</span>
                </div>
                {/* Kotlin */}
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-14 h-14 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-11 h-11" fill="none">
                      <defs>
                        <linearGradient id="kotlinGrad" x1="0" y1="0" x2="48" y2="48">
                          <stop offset="0%" stopColor="#7F52FF"/>
                          <stop offset="50%" stopColor="#C811E1"/>
                          <stop offset="100%" stopColor="#E44857"/>
                        </linearGradient>
                      </defs>
                      <path d="M4 4h40L24 24 44 44H4V4z" fill="url(#kotlinGrad)"/>
                    </svg>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium group-hover:text-[#001A3D] transition-colors">Kotlin</span>
                </div>
                {/* Ionic */}
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-14 h-14 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-11 h-11" fill="none">
                      <circle cx="24" cy="22" r="14" stroke="#3880FF" strokeWidth="2" fill="none"/>
                      <circle cx="24" cy="22" r="7" fill="#3880FF"/>
                      <circle cx="24" cy="22" r="3.5" fill="white"/>
                      <circle cx="36" cy="10" r="3.5" fill="#3880FF"/>
                    </svg>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium group-hover:text-[#001A3D] transition-colors">Ionic</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* What's New Section */}
      <section className="py-24 bg-[#FAF9F6] relative overflow-hidden" aria-label="Updates and News">
        {/* Pattern Background */}
        <div 
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{ 
            backgroundImage: `url(${linePattern})`,
            backgroundSize: '200px',
            backgroundRepeat: 'repeat'
          }}
        ></div>
        
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 md:mb-16 gap-8">
             <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#001A3D] display-font tracking-tight">What's New</h2>
                <p className="text-gray-500 font-medium text-sm md:text-base">Stay connected with our latest updates, press releases, and upcoming events.</p>
             </div>
             {/* Navigation Arrows */}
             <div className="flex gap-3">
                <button 
                  onClick={() => whatsNewApi?.scrollPrev()} 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#001A3D] hover:border-[#F99D1C] hover:text-[#F99D1C] hover:bg-white transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F99D1C] focus:ring-offset-2 shrink-0"
                >
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </button>
                <button 
                  onClick={() => whatsNewApi?.scrollNext()} 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#F99D1C] bg-white flex items-center justify-center text-[#001A3D] hover:bg-[#F99D1C]/5 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F99D1C] focus:ring-offset-2 shrink-0"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
             </div>
          </div>

          {/* Embla Carousel Viewport */}
          <div 
            className="overflow-hidden" 
            ref={whatsNewRef}
            onMouseEnter={() => setWhatsNewHovered(true)}
            onMouseLeave={() => setWhatsNewHovered(false)}
          >
            <div className="flex -mx-3 md:-mx-4">
              {[...WHATS_NEW, ...WHATS_NEW, ...WHATS_NEW].map((news, idx) => {
                const isSelected = whatsNewSelectedIndex % WHATS_NEW.length === idx % WHATS_NEW.length;
                return (
                  <div 
                    key={`${idx}-${news.title}`} 
                    className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333333%] px-3 md:px-4 shrink-0"
                  >
                    {/* Scale Wrapper to apply active card scale without interfering with Embla physics */}
                    <div 
                      className="h-full transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
                      style={{
                        transform: isSelected ? 'scale(1)' : 'scale(0.975)'
                      }}
                    >
                      {/* Card Container for styling & hover translate animation */}
                      <div className="bg-white rounded-[20px] overflow-hidden border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.015)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.03)] hover:-translate-y-1.5 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group flex flex-col h-full cursor-pointer relative">
                        {/* Image container */}
                        <div className="h-48 md:h-56 overflow-hidden relative">
                          <ImageWithFallback 
                            src={news.image} 
                            alt={news.title} 
                            className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]" 
                          />
                          {/* Hover Overlay Gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                          <div className="absolute inset-0 bg-[#001A3D]/10 mix-blend-color group-hover:opacity-0 transition-opacity duration-700 pointer-events-none"></div>
                        </div>
                        
                        {/* Content details */}
                        <div className="p-6 md:p-8 flex flex-col flex-grow space-y-4">
                          <span className="text-[#0171c1] text-[10px] md:text-[11px] font-semibold tracking-wide uppercase">{news.date}</span>
                          <h4 className="text-[#001A3D] text-base md:text-lg font-semibold leading-snug flex-grow group-hover:text-[#0171c1] transition-colors duration-300">{news.title}</h4>
                          {/* Bottom line indicator */}
                          <div className="h-[2px] w-12 bg-[#0171c1] group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pagination progress bar */}
          <div className="max-w-[180px] mx-auto mt-12 flex items-center gap-3">
            <span className="text-[11px] text-gray-400 font-semibold font-mono">0{((whatsNewSelectedIndex) % WHATS_NEW.length) + 1}</span>
            <div className="h-[2px] flex-1 bg-gray-200 relative overflow-hidden rounded-full">
              <div 
                className="absolute top-0 left-0 h-full bg-[#F99D1C] transition-all duration-500 ease-out"
                style={{ width: `${(((whatsNewSelectedIndex) % WHATS_NEW.length) + 1) / WHATS_NEW.length * 100}%` }}
              />
            </div>
            <span className="text-[11px] text-gray-400 font-semibold font-mono">0{WHATS_NEW.length}</span>
          </div>

        </div>
      </section>



      {/* Why Hutech Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <ImageWithFallback
          src="/images/why-hutech-bg.png"
          alt="Why Hutech"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#001A3D]/80"></div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left Column */}
            <div className="space-y-6">
              <h2 className="text-white text-4xl md:text-5xl font-semibold display-font tracking-tight">Why Hutech?</h2>
              <div className="space-y-4 text-gray-300 text-base leading-relaxed">
                <p>From digital strategy to implementation, we're here to help businesses unlock and realise their true potential through transformative initiatives.</p>
                <p>We help our clients design, develop, and maintain a range of applications for web, mobile, cloud, IoT, analytics, blockchain, and related cutting-edge results.</p>
                <p>With software-driven innovation in mind, we unlock human ingenuity to advance quality, and deliver sustainable value with efficiency.</p>
              </div>
            </div>

            {/* Right Column - Accordion */}
            <WhyNabhiraAccordion />
          </div>
        </div>
      </section>
    </div>
  );
}