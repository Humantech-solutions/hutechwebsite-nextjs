"use client";

import { useState, useRef } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  MoveRight,
  ChevronRight,
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
  Star,
} from "lucide-react";
import Slider from "react-slick";
import { MediaShowcase } from "@/components/MediaShowcase";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";
import { Meta } from "@/components/Meta";

// Asset paths
const samAltmanImg = "/assets/22febdba9948fa49e4211b0c440830215a31d096.png";
const heroImg = "/assets/310f3ecce35af7049868ea8c5fbb79881cc4acde.png";
const linePattern = "/assets/c70f0c069be641e3c4679e15a1f46e98bd813e34.png";
const kotakLogo = "/assets/7864b46c9929cf2e5a24585f95cf2482dc8190ba.png";
const serkoLogo = "/assets/adf5bc4ee0b9144881c1a1c79a3c359ab494a4ae.png";
const naukriLogo = "/assets/e1ce3eef6d8c160111b3f547bfd0b3c97f02218c.png";
const designCafeLogo = "/assets/462c968ffa25c75a354979a346ef7ccb5db203d2.png";
const vymoLogo = "/assets/76644f0c90d14e2ea0a74926de1556a5c5a241ed.png";
const payULogo = "/assets/bbaa0c93d772f93977f43a5c890e444433589fee.png";
const doSelectLogo = "/assets/86463c6203c42781d01d6a40c55c0ff8ce26b702.png";
const bluElementLogo = "/assets/9b3639f2d4684182b8f3ee2b1bd7c69276c14824.png";
const litmus7Logo = "/assets/f915b5253a22a259c2bddf9e763b19c8fcf1b707.png";
const dnaInfotechLogo = "/assets/a3b84806d9d1d69a5a53a3e112476a050e8255d8.png";
const analyticsQuad4Logo = "/assets/2c3e4b753aa027c8e811154c1b67507cee5157c5.png";
const delcaperLogo = "/assets/d4ad61407f63e3f084bd78e6b4fcdffa5e9907fe.png";
const shreeMarutiLogo = "/assets/bc2e60d04887555fccd5d509d93e0498be00600a.png";
const mMaxLogo = "/assets/dc65b7d9ded2bba1ba58a9e3fc9f86a4df3bc52e.png";
const gTechLogo = "/assets/f19fa3e782f01d3f92173c6bccc64bc7da0be8b9.png";

const BRAND_BLUE_ACCENT = "#0171c1";
const BRAND_BLUE = "#001A3D";
const MAROON = "#4A0416";

const LATEST_THINKING = [
  {
    title: "Building an AI-Driven Bank of Tomorrow",
    category: "Banking & Finance",
    image:
      "https://images.unsplash.com/photo-1768270181430-3e3672a32283?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    title: "Adapting to the World of Adaptive Manufacturing",
    category: "Manufacturing & Retail",
    image:
      "https://images.unsplash.com/photo-1715059120691-d6b06c275d74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    title: "De-mystifying 5G Telecom",
    category: "Telecom",
    image:
      "https://images.unsplash.com/photo-1761039232971-bb55a290762c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    title: "Enabling Vendor Excellence with Next-Gen SCCs",
    category: "Auto",
    image:
      "https://images.unsplash.com/photo-1762279388952-85187155e48d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    title: "Driving AI and Sustainability in Product Development",
    category: "Hi-Tech | Semiconductors",
    image:
      "https://images.unsplash.com/photo-1686130841435-2dc0312afa1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

const WHATS_NEW = [
  {
    title: "Hutech Solutions & AWS Partner to Accelerate Fintech Solutions",
    date: "News • March 10, 2026",
    image:
      "https://images.unsplash.com/photo-1762279388952-85187155e48d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    title: "Hutech Named 'Leader' in Gartner Magic Quadrant for Managed IT Services",
    date: "News • February 15, 2026",
    image:
      "https://images.unsplash.com/photo-1714601344981-75e003bc5d18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    title: "Tech Mahindra & Hutech Partnering to Drive Next-Gen AI Consulting",
    date: "Press Release • January 20, 2026",
    image:
      "https://images.unsplash.com/photo-1758843412266-e8661a80ada2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

const SUCCESS_STORIES = [
  {
    name: "Marco Abbado",
    title: "CIO, European Bank",
    text: "Innovation is key to our strategy, and Hutech Cloud is driving the future of enterprise AI.",
    image:
      "https://images.unsplash.com/photo-1614927879396-50307fd9e488?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    name: "Jenny Legg",
    title: "CEO, Retail Group",
    text: "The expertise Hutech brings to the table is unmatched in digital retail transformation.",
    image:
      "https://images.unsplash.com/photo-1738566061505-556830f8b8f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    name: "Alex Reed",
    title: "VP, Global Logistics",
    text: "Our supply chain has never been more resilient thanks to Hutech's predictive analytics.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    name: "Sarah Chen",
    title: "Head of AI, Tech Giant",
    text: "The technical depth and delivery speed from Hutech is truly impressive for global scale.",
    image:
      "https://images.unsplash.com/photo-1522071823991-b1ae5e6a3048?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
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
  { name: "DNA Infotech", logo: dnaInfotechLogo },
];

const SPECIAL_PARTNERS = [
  { logo: analyticsQuad4Logo, name: "Analytics Quad4" },
  { logo: delcaperLogo, name: "Delcaper" },
  { logo: shreeMarutiLogo, name: "Shree Maruti" },
  { logo: mMaxLogo, name: "M Max" },
  { logo: gTechLogo, name: "G-Tech" },
];

const CAPABILITIES_DATA = [
  {
    name: "Artificial Intelligence",
    image:
      "https://images.unsplash.com/photo-1770233621425-5d9ee7a0a700?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    color: "#002964",
  },
  {
    name: "Banking & Financial Services",
    image:
      "https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    color: "#001A3D",
  },
  {
    name: "Ecommerce Development",
    image:
      "https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    color: "#1A2E35",
  },
  {
    name: "SRE & DevOps Services",
    image:
      "https://images.unsplash.com/photo-1692133226337-55e513450a32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    color: "#2C3E50",
  },
  {
    name: "Cloud Transformation",
    image:
      "https://images.unsplash.com/photo-1761762678321-98572476620e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    color: "#1C2833",
  },
  {
    name: "Blockchain Development",
    image:
      "https://images.unsplash.com/photo-1763739527737-e3626d731072?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    color: "#001A3D",
  },
  {
    name: "Enterprise Digital Solutions",
    image:
      "https://images.unsplash.com/photo-1772272935464-2e90d8218987?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    color: "#002964",
  },
  {
    name: "Development and Maintenance",
    image:
      "https://images.unsplash.com/photo-1632910121591-29e2484c0259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    color: "#003366",
  },
];

export default function Home() {
  const [activeCapIdx, setActiveCapIdx] = useState(0);
  const industrySliderRef = useRef<Slider | null>(null);
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
  };

  const HERO_SLIDES = [
    {
      eyebrow: "",
      titlePart1: "Innovate with AI,",
      titleHighlight: "Accelerate",
      titlePart2: "with ML",
      description:
        "Transform your business with precision AI/ML solutions that optimize operations, enhance customer experiences, and drive growth.",
      image: heroImg,
      alt: "AI & ML Solutions",
    },
    {
      eyebrow: "",
      titlePart1: "Driving Innovation In",
      titleHighlight: "Banking, Financial Services\nand Insurance Domain",
      titlePart2: "",
      description:
        "Secure, Scalable, and Tailored Solutions to Transform Financial Institutions and Elevate Customer Experiences.",
      image:
        "https://images.unsplash.com/photo-1726137065566-153debe32a53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5raW5nJTIwZmluYW5jaWFsJTIwdGVjaG5vbG9neSUyMGZpbnRlY2glMjBkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MXx8fHwxNzczMTI5Njk3fDA&ixlib=rb-4.1.0&q=80&w=1920",
      alt: "Banking Financial Services Insurance",
    },
    {
      eyebrow: "",
      titlePart1: "Next Gen Ecommerce\nApplication Development",
      titleHighlight: "Services",
      titlePart2: "",
      description:
        "Hutech Solutions transforms your eCommerce vision into a high-performing digital store that attracts customers and boosts profits.",
      image:
        "https://images.unsplash.com/photo-1768987439382-894ea4e2a736?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBvbmxpbmUlMjBzaG9wcGluZyUyMGRpZ2l0YWwlMjBzdG9yZSUyMGludGVyZmFjZXxlbnwxfHx8fDE3NzMxMjk2OTh8MA&ixlib=rb-4.1.0&q=80&w=1920",
      alt: "Ecommerce Application Development",
    },
    {
      eyebrow: "",
      titlePart1: "Digital Transformation\nFor The",
      titleHighlight: "Digital Age",
      titlePart2: "",
      description:
        "Our solutions are designed to keep your business ahead of the competition in an ever-changing market.",
      image:
        "https://images.unsplash.com/photo-1761912149936-8f662fc2a13e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdHJhbnNmb3JtYXRpb24lMjBmdXR1cmlzdGljJTIwdGVjaG5vbG9neSUyMGFic3RyYWN0fGVufDF8fHx8MTc3MzEyOTY5OHww&ixlib=rb-4.1.0&q=80&w=1920",
      alt: "Digital Transformation",
    },
    {
      eyebrow: "",
      titlePart1: "IoT: Smart Solutions\nfor a",
      titleHighlight: "Connected World",
      titlePart2: "",
      description:
        "Our IoT services offer seamless integration of devices and systems, enabling limitless possibilities for innovation and growth.",
      image:
        "https://images.unsplash.com/photo-1746893737268-81fe686e6a51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJb1QlMjBzbWFydCUyMGNvbm5lY3RlZCUyMGRldmljZXMlMjBuZXR3b3JrJTIwc2Vuc29yc3xlbnwxfHx8fDE3NzMxMjk2OTh8MA&ixlib=rb-4.1.0&q=80&w=1920",
      alt: "IoT Smart Connected World",
    },
  ];

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="Hutech Solutions | Advanced AI, Cloud & Engineering"
        description="Premium corporate engineering solutions specializing in AI/ML, Cloud Transformation, SRE & DevOps, and Fintech app development."
      />
      {/* Hero Carousel Section */}
      <section className="relative w-full overflow-hidden" aria-label="Hero Section">
        <Slider {...heroSettings}>
          {HERO_SLIDES.map((slide, idx) => (
            <div key={idx} className="relative h-[600px] md:h-[620px]">
              <ImageWithFallback
                src={slide.image}
                alt={slide.alt}
                className="h-full w-full object-cover brightness-[0.6]"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D]/95 via-[#001A3D]/60 to-transparent"></div>
              {/* Blue accent bar */}
              <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-transparent via-[#0171c1] to-transparent opacity-90"></div>
              {/* Bottom fade */}
              <div className="absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t from-[#001A3D]/30 to-transparent"></div>

              <div className="absolute inset-0 flex items-center">
                <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-20">
                  <div className="max-w-4xl space-y-6 md:space-y-8">
                    {/* Eyebrow */}
                    <div className="flex items-center gap-3">
                      <span className="block h-[2px] w-6 shrink-0 bg-[#FFAF2B] md:w-8"></span>
                      <span className="text-[11px] font-semibold tracking-wide text-[#FFAF2B] md:text-[12px]">
                        {slide.eyebrow || "Digital Engineering Excellence"}
                      </span>
                    </div>

                    {/* Headline */}
                    <h1 className="display-font text-3xl leading-[1.1] font-semibold tracking-tight whitespace-pre-line text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
                      {slide.titlePart1}{" "}
                      <span className="whitespace-pre-line text-[#FFAF2B]">
                        {slide.titleHighlight}
                      </span>
                      {slide.titlePart2 && (
                        <>
                          {"\n"}
                          {slide.titlePart2}
                        </>
                      )}
                    </h1>

                    {/* Description */}
                    <p className="max-w-2xl text-base leading-relaxed font-medium text-gray-200 opacity-90 md:text-xl">
                      {slide.description}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center md:gap-6">
                      <Link
                        href="/contact"
                        className="group flex w-full items-center justify-center gap-3 bg-[#0171c1] px-8 py-4 text-[11px] font-bold tracking-wider text-white shadow-xl transition-all duration-300 hover:bg-white hover:text-[#001A3D] sm:w-auto md:px-10 md:text-xs"
                      >
                        Contact Us
                        <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                      <Link
                        href="/services"
                        className="flex w-full items-center justify-center border border-white/40 px-8 py-4 text-[11px] font-semibold tracking-wider text-white transition-all duration-300 hover:border-white hover:bg-white/10 sm:w-auto md:px-10 md:text-xs"
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
        <style>{`
          .custom-dots {
            position: absolute !important;
            bottom: 40px !important;
            right: 40px !important;
            left: auto !important;
            width: auto !important;
            justify-content: flex-end !important;
            list-style: none !important;
            display: flex !important;
            gap: 8px !important;
            margin: 0 !important;
            padding: 0 !important;
            z-index: 20 !important;
          }
          .custom-dots li {
            margin: 0 !important;
            display: block !important;
            width: 12px !important;
            height: 12px !important;
          }
          .custom-dots li button {
            font-size: 0 !important;
            line-height: 0 !important;
            display: block !important;
            width: 100% !important;
            height: 100% !important;
            cursor: pointer !important;
            color: transparent !important;
            border: 0 !important;
            outline: none !important;
            background: transparent !important;
            position: relative !important;
            padding: 0 !important;
          }
          .custom-dots li button:before {
            content: "" !important;
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            width: 8px !important;
            height: 8px !important;
            border-radius: 50% !important;
            background-color: white !important;
            opacity: 0.5 !important;
            transition: all 0.3s ease !important;
          }
          .custom-dots li.slick-active button:before {
            opacity: 1 !important;
            background-color: #FFAF2B !important;
            width: 10px !important;
            height: 10px !important;
          }
        `}</style>
      </section>

      {/* "with Hutech Solutions" section */}
      <section
        className="overflow-hidden border-b border-gray-100 bg-[#FAF9F6] py-20"
        aria-label="About Hutech Solutions"
      >
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-12 px-6 md:flex-row md:gap-32 lg:px-20">
          <div className="order-2 flex-1 space-y-6 md:order-1 md:space-y-8">
            <h2 className="display-font text-3xl leading-tight font-semibold tracking-tight text-[#001A3D] sm:text-4xl md:text-5xl">
              with Hutech <span className="text-gray-400">Solutions</span>
            </h2>
            <p className="max-w-xl text-base leading-relaxed font-medium text-gray-600 md:text-lg">
              We are a remarkable group of creatives who transform traditional company concepts into
              reliable digital solutions. We provide comprehensive solutions that effortlessly
              include cutting-edge ideas by employing cutting-edge methodologies.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/about"
                className="flex items-center justify-center bg-[#0171c1] px-10 py-4 text-[11px] font-semibold tracking-wider text-white shadow-lg transition-all hover:bg-[#001A3D] hover:shadow-xl"
              >
                Know More
              </Link>
              <Link
                href="/about"
                className="flex items-center justify-center border border-[#0171c1] px-10 py-4 text-[11px] font-semibold tracking-wider text-[#0171c1] transition-all hover:bg-[#0171c1]/5"
              >
                The Brand Story
              </Link>
            </div>
          </div>
          <div className="relative order-1 w-full flex-1 md:order-2">
            <div className="aspect-[16/9] rotate-1 overflow-hidden rounded-sm shadow-2xl md:rotate-2">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1699324210812-64ebf17a3149?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Digital engineering excellence at Hutech Solutions"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Decorative BG element */}
            <div className="absolute -inset-4 -z-10 -rotate-1 bg-[#0171c1]/5 md:-rotate-2"></div>
          </div>
        </div>
      </section>

      {/* "The Big Thinkers" Section */}
      <section
        className="relative overflow-hidden bg-linear-to-br from-[#001A3D] via-[#002964] to-[#001A3D] py-20 text-white"
        aria-label="Quotes"
      >
        <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col items-center gap-12 px-6 md:flex-row md:items-end lg:px-20">
          <div className="relative z-10 w-full flex-1 space-y-8 pb-4 md:space-y-10 md:pb-8">
            <div className="flex items-center gap-3">
              <span className="text-xl font-semibold text-[#0171c1] italic md:text-2xl">The</span>
              <span className="display-font text-3xl font-semibold tracking-tight text-white italic md:text-4xl">
                Big
              </span>
              <span className="text-3xl font-medium text-blue-200 italic md:text-4xl">
                Thinkers
              </span>
            </div>
            <h3 className="display-font max-w-2xl text-3xl leading-[1.2] font-semibold tracking-tight sm:text-4xl md:text-5xl md:leading-[1.1]">
              Artificial Intelligence is the <br className="hidden md:block" />
              most important technology <br className="hidden md:block" />
              of our generation.
            </h3>
            <div className="space-y-1">
              <p className="text-lg font-semibold tracking-tight text-white">Sam Altman</p>
              <p className="text-[11px] font-semibold tracking-wider text-blue-200">CEO, OpenAI</p>
            </div>
          </div>
          <div className="group/thinker relative h-[350px] w-full flex-1 cursor-pointer md:h-[500px]">
            <ImageWithFallback
              src={samAltmanImg}
              alt="Sam Altman - AI visionary"
              className="relative z-10 h-full w-full object-contain object-bottom grayscale-[0.6] transition-all duration-700 group-hover/thinker:grayscale-0"
            />
            {/* Abstract glow */}
            <div className="absolute top-1/2 left-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0171c1]/10 blur-[120px] transition-all duration-700 group-hover/thinker:bg-[#0171c1]/20"></div>
            <div className="absolute inset-0 z-0 bg-linear-to-t from-[#001A3D]/40 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Latest Thinking Section */}
      <section className="bg-white py-20" aria-labelledby="latest-thinking-title">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end md:gap-8">
            <h2
              id="latest-thinking-title"
              className="display-font text-3xl font-semibold tracking-tight text-[#001A3D] sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Latest Thinking
            </h2>
            <p className="max-w-md text-sm leading-relaxed font-medium text-gray-500 md:text-base">
              Read what we're thinking, research into various domains which we help organizations
              challenge traditional domains.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group relative cursor-pointer overflow-hidden rounded-sm sm:col-span-2 lg:col-span-1 lg:row-span-2">
              <ImageWithFallback
                src={LATEST_THINKING[0].image}
                alt={LATEST_THINKING[0].title}
                className="h-full min-h-[400px] w-full object-cover grayscale-[0.6] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-[#001A3D]/30 mix-blend-color transition-opacity duration-700 group-hover:opacity-0"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 z-10 space-y-2 p-6 md:space-y-3 md:p-8">
                <span className="text-[10px] font-semibold tracking-wide text-[#0171c1] md:text-[11px]">
                  {LATEST_THINKING[0].category}
                </span>
                <h4 className="text-lg leading-tight font-semibold text-white group-hover:underline md:text-xl">
                  {LATEST_THINKING[0].title}
                </h4>
              </div>
            </div>
            {LATEST_THINKING.slice(1).map((item, idx) => (
              <div
                key={idx}
                className="group relative h-[280px] cursor-pointer overflow-hidden rounded-sm md:h-[300px]"
              >
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover grayscale-[0.6] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-[#001A3D]/30 mix-blend-color transition-opacity duration-700 group-hover:opacity-0"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"></div>
                <div className="absolute bottom-0 left-0 z-10 space-y-1 p-5 md:space-y-2 md:p-6">
                  <span className="text-[10px] font-semibold tracking-wide text-[#0171c1] md:text-[11px]">
                    {item.category}
                  </span>
                  <h4 className="text-base leading-tight font-semibold text-white group-hover:underline md:text-lg">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's New Section */}
      <section
        className="relative overflow-hidden bg-[#FAF9F6] py-20"
        aria-label="Updates and News"
      >
        {/* Pattern Background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url(${linePattern})`,
            backgroundSize: "200px",
            backgroundRepeat: "repeat",
          }}
        ></div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-12 flex flex-col items-start justify-between gap-8 md:mb-16 md:flex-row md:items-center">
            <div className="space-y-3">
              <h2 className="display-font text-3xl font-semibold tracking-tight text-[#001A3D] sm:text-4xl md:text-5xl">
                What's New
              </h2>
              <p className="text-sm font-medium text-gray-500 md:text-base">
                Stay connected with our latest updates, press releases, and upcoming events.
              </p>
            </div>
            <div className="hidden gap-3 md:flex">
              <button className="rounded-full border border-gray-300 p-3 transition-all hover:bg-white">
                <ArrowRight className="h-5 w-5 rotate-180" />
              </button>
              <button className="rounded-full border border-gray-300 p-3 transition-all hover:bg-white">
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {WHATS_NEW.map((news, idx) => (
              <div
                key={idx}
                className="group flex h-full flex-col overflow-hidden rounded-sm bg-white shadow-sm transition-all hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden md:h-56">
                  <ImageWithFallback
                    src={news.image}
                    alt={news.title}
                    className="h-full w-full object-cover grayscale-[0.5] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-[#001A3D]/20 mix-blend-color transition-opacity duration-700 group-hover:opacity-0"></div>
                </div>
                <div className="flex flex-grow flex-col space-y-4 p-6 md:p-8">
                  <span className="text-[10px] font-semibold tracking-wide text-blue-600 md:text-[11px]">
                    {news.date}
                  </span>
                  <h4 className="flex-grow text-base leading-snug font-semibold text-[#001A3D] transition-colors group-hover:text-blue-600 md:text-lg">
                    {news.title}
                  </h4>
                  <div className="h-0.5 w-10 bg-blue-600 transition-all duration-500 group-hover:w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Showcase Section */}
      <MediaShowcase />

      {/* Capabilities Section */}
      <section
        className="overflow-hidden py-20 text-white transition-colors duration-700 ease-in-out"
        style={{ backgroundColor: CAPABILITIES_DATA[activeCapIdx].color }}
        aria-labelledby="capabilities-title"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-12 max-w-2xl space-y-4 md:mb-16">
            <h2
              id="capabilities-title"
              className="display-font text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
            >
              Capabilities
            </h2>
            <p className="text-sm leading-relaxed font-medium text-blue-100/70 md:text-base">
              Deploying solutions and platforms that actually move the needle across customer
              experience and business outcomes.
            </p>
          </div>

          <div className="flex flex-col items-start gap-12 lg:flex-row lg:gap-20">
            <div className="relative z-10 w-full flex-1 space-y-1">
              <div className="grid grid-cols-1">
                {CAPABILITIES_DATA.map((cap, idx) => (
                  <button
                    key={idx}
                    onMouseEnter={() => setActiveCapIdx(idx)}
                    onClick={() => setActiveCapIdx(idx)}
                    className={`group flex w-full items-center justify-between border-b border-white/10 py-4 text-left transition-all duration-300 md:py-6 ${activeCapIdx === idx ? "pl-2 text-[#0171c1] md:pl-4" : "hover:pl-1 hover:text-blue-300 md:hover:pl-2"}`}
                  >
                    <span
                      className={`text-lg font-medium tracking-tight md:text-xl ${activeCapIdx === idx ? "font-semibold" : "font-normal"}`}
                    >
                      {cap.name}
                    </span>
                    <ChevronRight
                      className={`h-5 w-5 transition-all duration-300 md:h-6 md:w-6 ${activeCapIdx === idx ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="relative hidden h-[400px] w-full flex-1 md:block md:h-[600px]">
              <div className="relative h-full w-full">
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
                      className="h-full w-full rounded-sm object-cover shadow-2xl brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#002964]/40 to-transparent"></div>
                  </Motion.div>
                </AnimatePresence>

                {/* Decorative elements */}
                <div className="pointer-events-none absolute -top-4 -right-4 h-24 w-24 border-t-2 border-r-2 border-[#0171c1]/40 md:h-32 md:w-32"></div>
                <div className="pointer-events-none absolute -bottom-4 -left-4 h-24 w-24 border-b-2 border-l-2 border-[#0171c1]/40 md:h-32 md:w-32"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition Section */}
      <section className="border-y border-gray-100 bg-white py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
            <div className="max-w-md space-y-4">
              <h2 className="display-font text-3xl font-semibold tracking-tight text-[#001A3D] md:text-4xl">
                Recognized for Excellence.
              </h2>
              <p className="leading-relaxed font-medium text-gray-500">
                Our commitment to engineering quality and innovation has been recognized by global
                industry leaders and certification bodies.
              </p>
              <Link
                href="/company/awards"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0171c1] transition-all hover:gap-4"
              >
                View All Awards <MoveRight size={16} />
              </Link>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
              {[
                { icon: <Award className="h-8 w-8" />, label: "Excellence in Digital" },
                { icon: <ShieldCheck className="h-8 w-8" />, label: "ISO 27001 Certified" },
                { icon: <Trophy className="h-8 w-8" />, label: "AI Innovation" },
                { icon: <Star className="h-8 w-8" />, label: "Top Workplace" },
              ].map((item, i) => (
                <div key={i} className="group flex flex-col items-center space-y-3 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 text-[#0171c1] shadow-sm transition-all duration-500 group-hover:bg-[#0171c1] group-hover:text-white group-hover:shadow-lg">
                    {item.icon}
                  </div>
                  <span className="text-[10px] leading-tight font-bold tracking-widest text-[#001A3D] uppercase">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Across Industries */}
      <section className="relative overflow-hidden bg-white py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-12 flex flex-col items-start justify-between gap-8 md:mb-20 md:flex-row md:items-end">
            <div className="max-w-2xl space-y-6">
              <h2 className="display-font text-4xl leading-tight font-semibold tracking-tight text-[#001A3D] md:text-5xl">
                Expertise Across Industries
              </h2>
              <p className="text-sm leading-relaxed font-medium text-gray-500">
                Our expertise spans 15 industries including Banking, Insurance, Healthcare, Life
                Sciences, Media, Entertainment, Distribution and more.
              </p>
            </div>
            <div className="flex gap-3 md:mb-2">
              <button
                onClick={() => industrySliderRef.current?.slickPrev()}
                className="cursor-pointer rounded-full border border-gray-200 p-3 text-[#001A3D] transition-all hover:bg-[#001A3D] hover:text-white md:p-4"
              >
                <ArrowRight className="h-4 w-4 rotate-180 md:h-5 md:w-5" />
              </button>
              <button
                onClick={() => industrySliderRef.current?.slickNext()}
                className="cursor-pointer rounded-full border border-gray-200 p-3 text-[#001A3D] transition-all hover:bg-[#001A3D] hover:text-white md:p-4"
              >
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </div>
          </div>

          <div className="industry-slider-container -mx-3">
            <Slider
              ref={industrySliderRef}
              dots={false}
              infinite={true}
              speed={600}
              slidesToShow={4}
              slidesToScroll={1}
              arrows={false}
              responsive={[
                {
                  breakpoint: 1280,
                  settings: {
                    slidesToShow: 3,
                  },
                },
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
              ]}
            >
              {[
                { name: "Education", icon: <GraduationCap className="h-10 w-10" /> },
                { name: "Energy & Utilities", icon: <Zap className="h-10 w-10" /> },
                { name: "Healthcare & Life Sciences", icon: <HeartPulse className="h-10 w-10" /> },
                { name: "Hi-Tech", icon: <Monitor className="h-10 w-10" /> },
                { name: "Insurance", icon: <ShieldAlert className="h-10 w-10" /> },
                { name: "Banking & Finance", icon: <Globe className="h-10 w-10" /> },
                { name: "Logistics", icon: <Activity className="h-10 w-10" /> },
                { name: "Public Sector", icon: <Users className="h-10 w-10" /> },
              ].map((industry, idx) => (
                <div key={idx} className="px-3 pb-6 md:pb-10">
                  <div className="group flex min-h-[300px] cursor-pointer flex-col justify-between border border-gray-100 bg-white p-8 shadow-sm transition-all hover:border-[#FFAF2B]/30 hover:shadow-2xl md:min-h-[340px] md:p-10">
                    <div className="text-[#FFAF2B] transition-all group-hover:scale-110">
                      {industry.icon}
                    </div>
                    <div className="space-y-4 md:space-y-6">
                      <h4 className="display-font text-xl leading-tight font-bold tracking-tight text-[#001A3D] md:text-2xl">
                        {industry.name}
                      </h4>
                      <div className="border-t border-gray-100 pt-4 md:pt-6">
                        <Motion.button
                          whileHover="expanded"
                          initial="initial"
                          className="flex h-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-[#FFAF2B]/40 bg-transparent text-[#FFAF2B] hover:border-[#FFAF2B] md:h-12"
                          variants={{
                            initial: { width: 40 },
                            expanded: { width: "auto", paddingLeft: 16, paddingRight: 16 },
                          }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <Motion.span
                            variants={{
                              initial: { width: 0, opacity: 0, marginRight: 0 },
                              expanded: { width: "auto", opacity: 1, marginRight: 8 },
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden text-[11px] font-semibold tracking-wide whitespace-nowrap"
                          >
                            Know More
                          </Motion.span>
                          <ChevronRight className="h-4 w-4 shrink-0" />
                        </Motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-16 space-y-3">
            <h2 className="display-font text-4xl leading-tight font-semibold tracking-tight text-[#001A3D] md:text-5xl">
              The <span className="text-[#FFAF2B]">Stack</span> Behind
              <br />
              Every Build
            </h2>
            <p className="max-w-xl text-sm leading-relaxed font-medium text-gray-500">
              We leverage best-in-class technologies across every layer of the stack to engineer
              robust, scalable, and future-ready solutions.
            </p>
          </div>

          <div className="overflow-hidden rounded-sm border border-gray-200 shadow-sm">
            {/* Row: Data & AI */}
            <div className="flex flex-col border-b border-gray-200 md:flex-row">
              <div className="flex w-full shrink-0 items-center border-b border-gray-200 bg-gray-50 px-8 py-8 md:w-[200px] md:border-r md:border-b-0">
                <span className="text-sm leading-snug font-semibold tracking-tight text-[#001A3D]">Data &amp; AI</span>
              </div>
              <div className="flex flex-1 flex-wrap items-center gap-x-10 gap-y-8 px-10 py-8">
                <div className="group flex cursor-pointer flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center">
                    <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none">
                      <path d="M24 4C13 4 13.5 9 13.5 9L13.51 14.2H24.2V15.8H9S4 15.2 4 26.1C4 37 8.3 36.6 8.3 36.6H11.2V31.1S11.1 26.8 15.4 26.8H25.9S30 26.9 30 23V10.5S30.6 4 24 4Z" fill="#3776AB"/>
                      <path d="M24 44C35 44 34.5 39 34.5 39L34.49 33.8H23.8V32.2H39S44 32.8 44 21.9C44 11 39.7 11.4 39.7 11.4H36.8V16.9S36.9 21.2 32.6 21.2H22.1S18 21.1 18 25V37.5S17.4 44 24 44Z" fill="#FFD43B"/>
                      <circle cx="19.5" cy="9" r="2" fill="white"/>
                      <circle cx="28.5" cy="39" r="2" fill="white"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-gray-500 transition-colors group-hover:text-[#001A3D]">Python</span>
                </div>
                <div className="group flex cursor-pointer flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center">
                    <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none">
                      <ellipse cx="24" cy="22" rx="14" ry="6" fill="#FEC514"/>
                      <ellipse cx="24" cy="15" rx="9" ry="4" fill="#00BFB3"/>
                      <ellipse cx="24" cy="29" rx="9" ry="4" fill="#00BFB3"/>
                      <ellipse cx="24" cy="22" rx="11" ry="4.5" fill="#343741"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-gray-500 transition-colors group-hover:text-[#001A3D]">Elasticsearch</span>
                </div>
                <div className="group flex cursor-pointer flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center">
                    <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none">
                      <path d="M24 4L4 15.5V32.5L24 44L44 32.5V15.5L24 4Z" fill="#FF6F00"/>
                      <path d="M24 14V34M16 18V30L24 34M32 18V30L24 34" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-gray-500 transition-colors group-hover:text-[#001A3D]">TensorFlow</span>
                </div>
                <div className="group flex cursor-pointer flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-black">
                    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="white">
                      <path d="M22.28 9.94a5.76 5.76 0 0 0-.5-4.73 5.93 5.93 0 0 0-6.38-2.83 5.76 5.76 0 0 0-4.35-1.94 5.93 5.93 0 0 0-5.65 4.1 5.76 5.76 0 0 0-3.84 2.79 5.93 5.93 0 0 0 .73 6.95 5.76 5.76 0 0 0 .5 4.73 5.93 5.93 0 0 0 6.38 2.83 5.76 5.76 0 0 0 4.34 1.94 5.93 5.93 0 0 0 5.66-4.1 5.76 5.76 0 0 0 3.84-2.79 5.93 5.93 0 0 0-.73-6.95zM13.4 21.5a4.4 4.4 0 0 1-2.82-1.02l.14-.08 4.68-2.7a.78.78 0 0 0 .39-.67v-6.6l1.98 1.14a.07.07 0 0 1 .04.06v5.46a4.42 4.42 0 0 1-4.41 4.41zM3.67 17.77a4.4 4.4 0 0 1-.53-2.96l.14.09 4.68 2.7a.77.77 0 0 0 .78 0l5.71-3.3v2.28a.08.08 0 0 1-.03.07l-4.73 2.73a4.42 4.42 0 0 1-6.02-1.61zm-.9-9.67a4.4 4.4 0 0 1 2.3-1.94V11.5a.77.77 0 0 0 .39.67l5.71 3.3-1.98 1.14a.08.08 0 0 1-.07 0L4.4 13.88a4.42 4.42 0 0 1-1.63-5.78zm16.27 3.79-5.71-3.3 1.98-1.14a.08.08 0 0 1 .07 0l4.72 2.73a4.41 4.41 0 0 1-.68 7.96V12.78a.77.77 0 0 0-.38-.68zm1.97-3-.14-.09-4.67-2.73a.78.78 0 0 0-.78 0l-5.71 3.3V7.1a.08.08 0 0 1 .03-.07l4.72-2.72a4.41 4.41 0 0 1 6.55 4.58zM9.09 13.17l-1.98-1.14a.08.08 0 0 1-.04-.06V6.51a4.41 4.41 0 0 1 7.24-3.39l-.14.08-4.68 2.7a.77.77 0 0 0-.39.67l-.01 6.6zm1.07-2.32 2.54-1.47 2.54 1.47v2.93l-2.54 1.47-2.54-1.47v-2.93z"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-gray-500 transition-colors group-hover:text-[#001A3D]">OpenAI</span>
                </div>
                <div className="group flex cursor-pointer flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center">
                    <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none">
                      <rect width="48" height="48" rx="8" fill="#E8488A"/>
                      <path d="M12 12H20V36L12 28V12Z" fill="white"/>
                      <path d="M20 24L36 36H20V24Z" fill="white" opacity="0.6"/>
                      <path d="M20 12L36 28L28 36L20 24V12Z" fill="white" opacity="0.85"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-gray-500 transition-colors group-hover:text-[#001A3D]">Kibana</span>
                </div>
              </div>
            </div>

            {/* Row: Cloud Technology */}
            <div className="flex flex-col border-b border-gray-200 md:flex-row">
              <div className="flex w-full shrink-0 items-center border-b border-gray-200 bg-gray-50 px-8 py-8 md:w-[200px] md:border-r md:border-b-0">
                <span className="text-sm leading-snug font-semibold tracking-tight text-[#001A3D]">Cloud Technology</span>
              </div>
              <div className="flex flex-1 flex-wrap items-center gap-x-10 gap-y-8 px-10 py-8">
                <div className="group flex cursor-pointer flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center">
                    <svg viewBox="0 0 80 50" className="h-10 w-14" fill="none">
                      <path d="M22.9 21.6c0 .8.1 1.5.3 2 .2.5.5.9.9 1.3.1.1.2.2.2.4 0 .2-.1.3-.3.5l-1 .7c-.1.1-.3.1-.4.1-.2 0-.3-.1-.5-.2-.2-.2-.4-.5-.6-.8-.2-.3-.3-.6-.5-1-1.2 1.4-2.7 2.1-4.6 2.1-1.3 0-2.4-.4-3.1-1.1-.8-.7-1.2-1.7-1.2-2.9 0-1.3.5-2.3 1.4-3.1.9-.8 2.2-1.2 3.7-1.2.5 0 1 0 1.5.1s1 .2 1.6.3v-1c0-1-.2-1.7-.7-2.2-.5-.5-1.2-.7-2.3-.7-.5 0-1 .1-1.5.2-.5.1-1 .3-1.5.5-.2.1-.4.2-.5.2-.1 0-.2-.1-.2-.3v-.8c0-.2 0-.3.1-.4.1-.1.2-.2.5-.3.5-.2 1.1-.4 1.7-.5.7-.1 1.4-.2 2.1-.2 1.6 0 2.8.4 3.6 1.1.8.7 1.2 1.8 1.2 3.2v4.3l.1.1zm-6.3 2.4c.5 0 1-.1 1.5-.3.5-.2.9-.5 1.3-1 .2-.3.4-.6.5-1 .1-.4.1-.8.1-1.3v-.6c-.4-.1-.9-.2-1.3-.2-.5-.1-.9-.1-1.4-.1-.9 0-1.6.2-2.1.6-.5.4-.7 1-.7 1.7 0 .7.2 1.2.5 1.6.4.4.9.6 1.6.6zm11.4 1.5c-.2 0-.4 0-.5-.1-.1-.1-.2-.3-.3-.6l-3.3-10.7c-.1-.3-.1-.5-.1-.6 0-.2.1-.3.3-.3h1.3c.2 0 .4 0 .5.1.1.1.2.3.3.6l2.4 9.3 2.2-9.3c.1-.3.2-.5.3-.6.1-.1.3-.1.5-.1h1.1c.2 0 .4 0 .5.1.1.1.2.3.3.6l2.2 9.4 2.5-9.4c.1-.3.2-.5.3-.6.1-.1.3-.1.5-.1h1.2c.2 0 .3.1.3.3 0 .1 0 .2-.1.4 0 .1-.1.2-.1.3L34.4 25c-.1.3-.2.5-.3.6-.1.1-.3.1-.5.1h-1.2c-.2 0-.4 0-.5-.1-.1-.1-.2-.3-.3-.6l-2.2-9.1-2.2 9.1c-.1.3-.2.5-.3.6-.1.1-.3.1-.5.1h-1.5zm14.8.3c-.8 0-1.5-.1-2.2-.4-.7-.2-1.3-.5-1.6-.9-.1-.1-.2-.3-.2-.4 0-.2.1-.3.3-.3h.8c.1 0 .3 0 .4.1.1.1.2.1.3.2.3.2.6.4 1 .5.4.2.8.2 1.2.2.6 0 1.1-.1 1.5-.4.4-.2.5-.6.5-1 0-.3-.1-.5-.3-.7-.2-.2-.6-.4-1.2-.6l-1.7-.5c-.9-.3-1.5-.7-2-1.2-.4-.5-.7-1-.7-1.7 0-.5.1-1 .4-1.4.3-.4.7-.7 1.2-1 .5-.2 1.1-.3 1.7-.3.3 0 .6 0 .9.1.3.1.6.1.9.2.3.1.5.2.7.4.2.1.4.3.5.4.1.1.1.3.1.4v.7c0 .2-.1.3-.3.3-.1 0-.3-.1-.5-.2-.5-.4-1.1-.6-1.8-.6-.6 0-1 .1-1.3.3-.3.2-.5.5-.5.9 0 .3.1.5.3.7.2.2.7.4 1.4.6l1.6.5c.9.3 1.5.7 1.9 1.2.4.5.6 1 .6 1.7 0 .5-.1 1-.4 1.5-.3.5-.7.8-1.2 1.1-.6.2-1.2.4-1.8.4z" fill="#252F3E"/>
                      <path d="M48.5 30.2c-5.4 4-13.2 6.1-19.9 6.1-9.4 0-17.9-3.5-24.3-9.3-.5-.4-.1-1.1.6-.7 6.9 4 15.5 6.4 24.3 6.4 6 0 12.5-1.2 18.5-3.8.9-.4 1.7.6 1.8 1.3z" fill="#FF9900"/>
                      <path d="M50.7 27.7c-.7-.9-4.5-.4-6.2-.2-.5.1-.6-.4-.1-.7 3-2.2 8-1.5 8.6-.8.6.7-.2 5.7-3 8.2-.4.4-.9.2-.7-.3.7-1.5 2.1-5.2 1.4-6.2z" fill="#FF9900"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-gray-500 transition-colors group-hover:text-[#001A3D]">AWS</span>
                </div>
                <div className="group flex cursor-pointer flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center">
                    <svg viewBox="0 0 48 48" className="h-11 w-11" fill="none">
                      <path d="M17.5 4L6 38h10.5L27 14.5 17.5 4z" fill="#0078D4"/>
                      <path d="M27 14.5L16.5 38H42L27 14.5z" fill="#0078D4" opacity="0.75"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-gray-500 transition-colors group-hover:text-[#001A3D]">Microsoft Azure</span>
                </div>
                <div className="group flex cursor-pointer flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center">
                    <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none">
                      <path d="M29.2 15.1l3.5-3.5.2-1.5C29.3 7.1 25 5.5 20.6 5.5c-8.3 0-15.3 5.6-17.5 13.2l1.3-.2 7.1-1.2 1.2-1.2c1.8-2 4.4-3.1 7.2-3.1 2.4 0 4.6.9 6.4 2.5l2.9-.4z" fill="#EA4335"/>
                      <path d="M38.8 18.5c-.8-3-2.7-5.6-5.2-7.5l-5.4 5.4c2.1 1.7 3.5 4.3 3.5 7.1v.9c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5H22.6l-.9.9v5.4l.9.9h9.2c6.6 0 11.9-5.3 11.9-11.9a11.9 11.9 0 0 0-5-9.7l.1-.5z" fill="#4285F4"/>
                      <path d="M13.4 41.6h9.2v-7.1h-9.2c-.7 0-1.3-.1-1.9-.4l-1.3.4-3.5 3.5-.3 1.3c1.9 1.4 4.3 2.2 6.9 2.2l.1.1z" fill="#34A853"/>
                      <path d="M13.4 18.1C6.8 18.1 1.5 23.4 1.5 30s5.3 11.9 11.9 11.9c3.2 0 6.2-1.3 8.4-3.5l-4.5-4.5c-1 1-2.4 1.6-3.9 1.6-3 0-5.4-2.4-5.4-5.4s2.4-5.4 5.4-5.4c1.5 0 2.9.6 3.9 1.6l4.5-4.5a12 12 0 0 0-8.4-3.7z" fill="#FBBC05"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-gray-500 transition-colors group-hover:text-[#001A3D]">Google Cloud</span>
                </div>
                <div className="group flex cursor-pointer flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center">
                    <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none">
                      <rect width="48" height="48" rx="6" fill="#F80000" opacity="0.1"/>
                      <rect x="8" y="17" width="32" height="14" rx="7" stroke="#F80000" strokeWidth="2.5" fill="none"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-gray-500 transition-colors group-hover:text-[#001A3D]">Oracle Cloud</span>
                </div>
                <div className="group flex cursor-pointer flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center">
                    <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none">
                      <rect x="4" y="13" width="40" height="4" rx="2" fill="#1F70C1"/>
                      <rect x="4" y="21" width="40" height="4" rx="2" fill="#1F70C1"/>
                      <rect x="4" y="29" width="40" height="4" rx="2" fill="#1F70C1"/>
                      <rect x="12" y="13" width="4" height="4" fill="white"/>
                      <rect x="32" y="13" width="4" height="4" fill="white"/>
                      <rect x="12" y="29" width="4" height="4" fill="white"/>
                      <rect x="32" y="29" width="4" height="4" fill="white"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-gray-500 transition-colors group-hover:text-[#001A3D]">IBM Cloud</span>
                </div>
                <div className="group flex cursor-pointer flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center">
                    <svg viewBox="0 0 48 48" className="h-11 w-11" fill="none">
                      <circle cx="24" cy="20" r="14" fill="#0080FF" opacity="0.12"/>
                      <circle cx="24" cy="20" r="14" stroke="#0080FF" strokeWidth="2" fill="none"/>
                      <path d="M24 8C17.4 8 12 13.4 12 20s5.4 12 12 12v-6c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6h6c0-6.6-5.4-12-12-12z" fill="#0080FF"/>
                      <rect x="18" y="32" width="6" height="4" rx="1" fill="#0080FF"/>
                      <rect x="12" y="26" width="6" height="4" rx="1" fill="#0080FF"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-gray-500 transition-colors group-hover:text-[#001A3D]">DigitalOcean</span>
                </div>
              </div>
            </div>

            {/* Row: Platform Engineering */}
            <div className="flex flex-col border-b border-gray-200 md:flex-row">
              <div className="flex w-full shrink-0 items-center border-b border-gray-200 bg-gray-50 px-8 py-8 md:w-[200px] md:border-r md:border-b-0">
                <span className="text-sm leading-snug font-semibold tracking-tight text-[#001A3D]">Platform Engineering</span>
              </div>
              <div className="flex flex-1 flex-wrap items-center gap-x-10 gap-y-8 px-10 py-8">
                <div className="group flex cursor-pointer flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center">
                    <svg viewBox="0 0 48 48" className="h-11 w-11" fill="none">
                      <path d="M24 4L6 14.5v19L24 44l18-10.5v-19L24 4z" fill="#539E43"/>
                      <path d="M21 17v14l3 1.7 3-1.7V17h-6z" fill="white" opacity="0.9"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-gray-500 transition-colors group-hover:text-[#001A3D]">Node.js</span>
                </div>
                <div className="group flex cursor-pointer flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center">
                    <svg viewBox="0 0 48 48" className="h-11 w-11" fill="none">
                      <path d="M44 13L32 6 20 13 8 6 4 13v22l8 5 12-7 12 7 8-5V13z" fill="#FF2D20" opacity="0.12"/>
                      <path d="M44 13L32 6 20 13v14l12 7 12-7V13z" fill="#FF2D20" opacity="0.7"/>
                      <path d="M20 13L8 6 4 13v14l8 5 8-5V13z" fill="#FF2D20"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-gray-500 transition-colors group-hover:text-[#001A3D]">Laravel</span>
                </div>
                <div className="group flex cursor-pointer flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center">
                    <svg viewBox="0 0 48 48" className="h-11 w-11" fill="none">
                      <path d="M18 34s-2 1.2 1.4 1.6c4.1.5 6.2.4 10.7-.5 0 0 1.2.7 2.8 1.3C22.5 40 10 36.6 18 34z" fill="#EA2D2E"/>
                      <path d="M16.5 29.5s-2.2 1.6 1.2 2c4.4.5 7.8.5 13.8-.7 0 0 .8.8 2.1 1.3-12.2 3.6-25.8.2-17.1-2.6z" fill="#EA2D2E"/>
                      <path d="M26.9 20.7c2.5 2.9-.7 5.5-.7 5.5s6.3-3.2 3.4-7.2c-2.7-3.7-4.8-5.5 6.5-11.8 0 0-17.8 4.4-9.2 13.5z" fill="#EA2D2E"/>
                      <path d="M19 25.3s-9.9 2.4-3.5 3.2c2.7.4 8 .3 12.9-.1 4-.3 8.1-1 8.1-1s-1.4.6-2.4 1.3c-9.7 2.5-28.5 1.4-23.1-.8 4.7-1.7 8-2.6 8-2.6z" fill="#5382A1"/>
                      <path d="M35 32.7c9.9-5.1 5.3-10.1 2.1-9.4-.8.2-1.1.4-1.1.4s.3-.4.9-.6c6.5-2.3 11.5 6.8-2 10.3 0-.1.1-.2.1-.7z" fill="#5382A1"/>
                      <path d="M28 4s5.7 5.7-5.4 14.4c-8.8 7-2 11 0 15.6-5.2-4.7-9-8.8-6.4-12.7C20 16.3 30.3 13.7 28 4z" fill="#5382A1"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-gray-500 transition-colors group-hover:text-[#001A3D]">Java</span>
                </div>
                <div className="group flex cursor-pointer flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#512BD4]">
                    <svg viewBox="0 0 40 30" className="h-8 w-10" fill="white">
                      <text x="0" y="10" fontFamily="Arial" fontSize="7" fontWeight="bold">Microsoft</text>
                      <text x="2" y="26" fontFamily="Arial" fontSize="16" fontWeight="bold">.NET</text>
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-gray-500 transition-colors group-hover:text-[#001A3D]">.Net</span>
                </div>
                <div className="group flex cursor-pointer flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center">
                    <svg viewBox="0 0 48 48" className="h-11 w-11" fill="none">
                      <path d="M24 3L4 10l3.1 26.9L24 45l16.9-8.1L44 10 24 3z" fill="#DD0031"/>
                      <path d="M24 3v42l16.9-8.1L44 10 24 3z" fill="#C3002F"/>
                      <path d="M24 8.5L11.5 36h4.5l2.5-6.3h11l2.5 6.3h4.5L24 8.5zm0 7.5l4 10h-8l4-10z" fill="white"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-gray-500 transition-colors group-hover:text-[#001A3D]">Angular</span>
                </div>
                <div className="group flex cursor-pointer flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center">
                    <svg viewBox="0 0 48 48" className="h-11 w-11" fill="none">
                      <path d="M24 42L2 8h8.5l13.5 24 13.5-24H46L24 42z" fill="#41B883"/>
                      <path d="M24 42L10.5 18H18L24 28l6-10h7.5L24 42z" fill="#35495E"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-gray-500 transition-colors group-hover:text-[#001A3D]">Vue.js</span>
                </div>
                <div className="group flex cursor-pointer flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center">
                    <svg viewBox="0 0 48 48" className="h-11 w-11" fill="none">
                      <ellipse cx="24" cy="24" rx="5" ry="5" fill="#61DAFB"/>
                      <ellipse cx="24" cy="24" rx="22" ry="9" stroke="#61DAFB" strokeWidth="2" fill="none"/>
                      <ellipse cx="24" cy="24" rx="22" ry="9" stroke="#61DAFB" strokeWidth="2" fill="none" transform="rotate(60 24 24)"/>
                      <ellipse cx="24" cy="24" rx="22" ry="9" stroke="#61DAFB" strokeWidth="2" fill="none" transform="rotate(120 24 24)"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-gray-500 transition-colors group-hover:text-[#001A3D]">React.js</span>
                </div>
              </div>
            </div>

            {/* Row: Mobile Development */}
            <div className="flex flex-col md:flex-row">
              <div className="flex w-full shrink-0 items-center border-b border-gray-200 bg-gray-50 px-8 py-8 md:w-[200px] md:border-r md:border-b-0">
                <span className="text-sm leading-snug font-semibold tracking-tight text-[#001A3D]">Mobile Development</span>
              </div>
              <div className="flex flex-1 flex-wrap items-center gap-x-10 gap-y-8 px-10 py-8">
                <div className="group flex cursor-pointer flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#282C34]">
                    <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none">
                      <ellipse cx="24" cy="24" rx="5" ry="5" fill="#61DAFB"/>
                      <ellipse cx="24" cy="24" rx="20" ry="8" stroke="#61DAFB" strokeWidth="2" fill="none"/>
                      <ellipse cx="24" cy="24" rx="20" ry="8" stroke="#61DAFB" strokeWidth="2" fill="none" transform="rotate(60 24 24)"/>
                      <ellipse cx="24" cy="24" rx="20" ry="8" stroke="#61DAFB" strokeWidth="2" fill="none" transform="rotate(120 24 24)"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-gray-500 transition-colors group-hover:text-[#001A3D]">React Native</span>
                </div>
                <div className="group flex cursor-pointer flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center">
                    <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
                      <path d="M13 24L26 11h10L22 25l14 14H26L13 26l5-1-5-1z" fill="#54C5F8"/>
                      <path d="M26 39L13 26l5-1 13 13-5 1z" fill="#01579B"/>
                      <path d="M26 39l-8-8 5-5 10 10-7 3z" fill="#29B6F6"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-gray-500 transition-colors group-hover:text-[#001A3D]">Flutter</span>
                </div>
                <div className="group flex cursor-pointer flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center">
                    <svg viewBox="0 0 48 48" className="h-11 w-11" fill="none">
                      <rect width="48" height="48" rx="10" fill="#FA7343"/>
                      <path d="M37.6 28.7c.4-1.1.6-2.3.6-3.6 0-5.8-4.2-10.6-9.7-11.7C32 17 33.6 22 31 26.4c-.2.3-.4.7-.7 1L21 38h6.5l4.5-5.5c2.5-3 4.3-2.5 5.6-3.8z" fill="white"/>
                      <path d="M10 30.5c1.8 4.3 6.2 7.5 11.4 7.5H31L21 27c-3.6-3.8-5.7-8.7-5.5-13.6C10.9 16.4 8 21 8 26.2c0 1.5.7 3 2 4.3z" fill="white"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-gray-500 transition-colors group-hover:text-[#001A3D]">Swift</span>
                </div>
                <div className="group flex cursor-pointer flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center">
                    <svg viewBox="0 0 48 48" className="h-11 w-11" fill="none">
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
                  <span className="text-[11px] font-medium text-gray-500 transition-colors group-hover:text-[#001A3D]">Kotlin</span>
                </div>
                <div className="group flex cursor-pointer flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center">
                    <svg viewBox="0 0 48 48" className="h-11 w-11" fill="none">
                      <circle cx="24" cy="22" r="14" stroke="#3880FF" strokeWidth="2" fill="none"/>
                      <circle cx="24" cy="22" r="7" fill="#3880FF"/>
                      <circle cx="24" cy="22" r="3.5" fill="white"/>
                      <circle cx="36" cy="10" r="3.5" fill="#3880FF"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-gray-500 transition-colors group-hover:text-[#001A3D]">Ionic</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-16 flex items-end justify-between">
            <div className="space-y-4">
              <h2 className="display-font text-4xl font-semibold tracking-tight text-[#001A3D] md:text-5xl">
                Success Stories
              </h2>
              <p className="max-w-xl text-sm font-medium text-gray-500">
                We focus on partner with global enterprises solve challenges, accelerate
                transformation, and drive business outcomes.
              </p>
            </div>
            <div className="mb-2 flex gap-2">
              <button className="border border-gray-300 px-6 py-3 text-[11px] font-semibold tracking-wide transition-all hover:bg-gray-50">
                All
              </button>
              <button className="border border-gray-300 px-6 py-3 text-[11px] font-semibold tracking-wide transition-all hover:bg-gray-50">
                Latest
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {SUCCESS_STORIES.map((story, idx) => (
              <div key={idx} className="group relative h-[500px] cursor-pointer overflow-hidden">
                <ImageWithFallback
                  src={story.image}
                  alt={story.name}
                  className="h-full w-full object-cover grayscale-[0.7] transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-[#001A3D]/40 mix-blend-color transition-opacity duration-700 group-hover:opacity-0"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 z-10 transform space-y-4 p-8 transition-transform duration-500 group-hover:-translate-y-2">
                  <p className="line-clamp-4 text-sm leading-relaxed font-medium text-white italic">
                    "{story.text}"
                  </p>
                  <div className="border-t border-white/20 pt-4">
                    <p className="text-sm font-semibold text-white">{story.name}</p>
                    <p className="text-[10px] font-semibold tracking-widest text-[#FFAF2B]">
                      {story.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Valued Partners Section */}
      <section className="overflow-hidden border-y border-gray-100 bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 flex flex-col items-start justify-between gap-12 md:flex-row md:items-end">
            <div className="max-w-2xl space-y-6">
              <h2 className="display-font text-4xl leading-tight font-semibold tracking-tight text-[#001A3D] md:text-5xl">
                Our Valued Partners
              </h2>
              <p className="max-w-xl text-base leading-relaxed font-medium text-gray-500 md:text-lg">
                Our trusted customer-centric approach offers entrepreneurs, startups, small and
                medium businesses, and large corporations an unmatched combination of innovation and
                excellence.
              </p>
            </div>
            <div className="group flex cursor-pointer items-center gap-4">
              <div className="h-[2px] w-12 bg-[#FFAF2B]"></div>
              <span className="text-xs font-bold tracking-widest text-[#001A3D] uppercase transition-colors group-hover:text-[#0171c1]">
                Trusted Globally
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px border border-gray-100 bg-gray-100 sm:grid-cols-2 lg:grid-cols-5">
            {[...VALUED_PARTNERS, ...SPECIAL_PARTNERS].map((partner, idx) => (
              <div
                key={idx}
                className="flex aspect-video items-center justify-center bg-white p-4 md:p-0"
              >
                <div className="flex h-full w-full items-center justify-center">
                  <ImageWithFallback
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Final CTA: Limitless Together */}
      <section className="relative flex h-[80vh] items-center justify-center overflow-hidden text-center">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1758518727077-ffb66ffccced?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Collaboration"
          className="absolute inset-0 h-full w-full object-cover brightness-[0.4]"
        />
        <div className="relative z-10 max-w-4xl space-y-10 px-6">
          <div className="space-y-4">
            <h2 className="display-font text-5xl font-semibold tracking-tight text-white md:text-6xl">
              Limitless together
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              At Hutech Solutions, you&apos;re not just joining a company — you&apos;re becoming part of a
              community. Let&apos;s be limitless together.
            </p>
          </div>
          <Link
            href="/careers"
            className="inline-block bg-white px-12 py-5 text-xs font-semibold tracking-widest text-[#001A3D] shadow-2xl transition-all hover:bg-[#FFAF2B] hover:text-[#001A3D]"
          >
            Join now
          </Link>
        </div>
      </section>
    </div>
  );
}
