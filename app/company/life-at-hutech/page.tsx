"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Heart, Users, Coffee, Globe, Star, Smile, Sparkles, Camera, Award, ShieldCheck, Zap, Trophy, MoveRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Slider from "react-slick";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function LifeAtHutech() {
  const cultureItems = [
    {
      icon: <Heart className="w-8 h-8 text-[#FFAF2B]" />,
      title: "The Hutech Family",
      desc: "More than just a workplace, we are a global family that supports each other's personal and professional growth."
    },
    {
      icon: <Users className="w-8 h-8 text-[#FFAF2B]" />,
      title: "Inclusive Culture",
      desc: "We celebrate diversity and foster an environment where every voice is heard and every contribution is valued."
    },
    {
      icon: <Star className="w-8 h-8 text-[#FFAF2B]" />,
      title: "Continuous Learning",
      desc: "We invest in our people with regular workshops, certifications, and mentorship programs to keep us at the cutting edge."
    }
  ];

  const galleryImages = [
    { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c", tag: "Team Outing" },
    { src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952", tag: "Tech Summit" },
    { src: "https://images.unsplash.com/photo-1543269865-cbf427effbad", tag: "Celebrations" },
    { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f", tag: "Collaboration" },
    { src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18", tag: "Holiday Party" },
    { src: "https://images.unsplash.com/photo-1556761175-b413da4baf72", tag: "Workspace" },
    { src: "https://images.unsplash.com/photo-1552664730-d307ca884978", tag: "Workshop" },
    { src: "https://images.unsplash.com/photo-1600880212340-02d956ea3a92", tag: "Global Meet" }
  ];

  const awards = [
    {
      icon: <Trophy className="w-10 h-10" />,
      title: "Excellence in Digital Innovation",
      org: "Global Tech Awards 2025",
      desc: "Recognized for pioneering AI-driven solutions that transformed regional banking ecosystems."
    },
    {
      icon: <Award className="w-10 h-10" />,
      title: "Best Workplace Culture",
      org: "Industry Excellence Forums",
      desc: "Awarded for our 'Family First' philosophy and commitment to employee well-being and growth."
    },
    {
      icon: <ShieldCheck className="w-10 h-10" />,
      title: "Cybersecurity Leadership",
      org: "SecureWorld Summit",
      desc: "Honored for outstanding contributions to enterprise security and zero-trust implementation."
    }
  ];

  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#001A3D] hover:bg-[#001A3D] hover:text-white transition-all duration-300 shadow-sm cursor-pointer group"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>
    );
  };

  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#001A3D] hover:bg-[#001A3D] hover:text-white transition-all duration-300 shadow-sm cursor-pointer group"
        aria-label="Next slide"
      >
        <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
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
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta 
        title="Life at Hutech Solutions | Our Family & Culture"
        description="Experience the vibrant culture at Hutech Solutions. Discover how our family-centric approach drives innovation and excellence."
      />
      <Breadcrumbs variant="light" />
      
      {/* Hero Section */}
      <section className="bg-[#001A3D] text-white h-[450px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Life at Hutech"
            className="w-full h-full object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/80 to-transparent"></div>
        </div>
        
        <div className="absolute inset-0 flex items-center z-10">
          <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-20">
            <Motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-12 h-[1px] bg-[#FFAF2B]"></span>
                <span className="text-[#FFAF2B] font-bold uppercase tracking-[0.3em] text-[10px]">People & Culture</span>
              </div>
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight display-font mb-8">
                The Hutech <br />
                <span className="text-[#FFAF2B]">Family.</span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed max-w-2xl font-medium">
                At Hutech Solutions, we don't just build software; we build careers and lifelong relationships. Discover what makes us more than just a company.
              </p>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 mb-16 space-y-4">
          <span className="text-[#FFAF2B] font-bold tracking-widest text-xs uppercase">Gallery</span>
          <h2 className="text-4xl md:text-6xl font-semibold text-[#001A3D] display-font tracking-tight">Take a sneak peek at <br /> <span className="text-[#FFAF2B]">Life at Hutech</span></h2>
          <p className="text-gray-500 font-medium max-w-xl text-lg">A visual journey through our celebrations, team building, and everyday excellence across our global offices.</p>
        </div>
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {galleryImages.map((img, i) => (
              <Motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="aspect-square rounded-3xl overflow-hidden shadow-lg group relative cursor-pointer"
              >
                <ImageWithFallback 
                  src={`${img.src}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600`}
                  alt={img.tag}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D]/90 via-[#001A3D]/20 to-transparent flex items-end p-6">
                   <div className="text-white">
                      <p className="text-[#FFAF2B] text-[10px] font-bold uppercase tracking-widest mb-1">Occasion</p>
                      <h4 className="text-lg font-bold display-font">{img.tag}</h4>
                   </div>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-20 opacity-[0.03] text-[#001A3D] pointer-events-none">
          <Trophy size={400} />
        </div>
        
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-[#FFAF2B] font-bold tracking-widest text-xs uppercase">Achievements</span>
                <h2 className="text-4xl md:text-6xl font-semibold text-[#001A3D] display-font tracking-tight leading-tight">
                  Awards And <br /> <span className="text-[#FFAF2B]">Recognition.</span>
                </h2>
              </div>
              <p className="text-gray-500 font-medium text-lg leading-relaxed">
                Our commitment to engineering excellence and people-first culture has been consistently recognized by global industry bodies. We take pride in the milestones we've achieved together as a family.
              </p>
              <div className="pt-4">
                 <Link href="/company/awards" className="inline-flex items-center gap-3 bg-[#001A3D] text-white px-8 py-4 rounded-sm font-bold tracking-wide text-xs hover:bg-[#002A5D] transition-all">
                    View All Awards <MoveRight className="w-4 h-4" />
                 </Link>
              </div>
            </div>
            
            <div className="lg:col-span-7 grid gap-6">
               {awards.map((award, i) => (
                 <Motion.div 
                   key={i}
                   initial={{ opacity: 0, x: 30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="p-10 rounded-[2.5rem] bg-white border border-gray-100 flex flex-col md:flex-row gap-8 items-start hover:shadow-2xl transition-all group"
                 >
                    <div className="p-5 bg-gray-50 rounded-2xl text-[#FFAF2B] group-hover:bg-[#FFAF2B] group-hover:text-white transition-all duration-500">
                      {award.icon}
                    </div>
                    <div className="space-y-3">
                       <p className="text-[#FFAF2B] text-[11px] font-bold uppercase tracking-widest">{award.org}</p>
                       <h3 className="text-2xl font-bold text-[#001A3D] display-font">{award.title}</h3>
                       <p className="text-gray-500 font-medium leading-relaxed">{award.desc}</p>
                    </div>
                 </Motion.div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workplace Exploration Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 mb-16 space-y-4">
          <span className="text-[#FFAF2B] font-bold tracking-widest text-xs uppercase">Our Ecosystem</span>
          <h2 className="text-4xl md:text-5xl font-semibold text-[#001A3D] display-font tracking-tight">
            While There's Still A Lot To <br /> <span className="text-[#FFAF2B]">Explore In Our Workplace</span>
          </h2>
        </div>
        
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 pb-16 workplace-carousel relative">
          <Slider {...carouselSettings}>
            {[
              { src: "https://images.unsplash.com/photo-1761818645928-47e5dad8ec76", title: "Modern Collaboration Hubs", tag: "Innovation" },
              { src: "https://images.unsplash.com/photo-1716703373041-bd135107d947", title: "Inclusive Social Spaces", tag: "Culture" },
              { src: "https://images.unsplash.com/photo-1726365222176-425a1a1b9b98", title: "Innovation Tech Labs", tag: "R&D" },
              { src: "https://images.unsplash.com/photo-1497366216548-37526070297c", title: "Strategic Thinking Zones", tag: "Strategy" },
              { src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c", title: "Cross-Functional Pods", tag: "Teams" }
            ].map((slide, i) => (
              <div key={i} className="px-4 py-8">
                <div className="rounded-[3rem] overflow-hidden bg-white border border-gray-100 aspect-[4/5] relative group shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)] transition-all duration-700">
                  <ImageWithFallback 
                    src={`${slide.src}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800`}
                    alt={slide.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D] via-[#001A3D]/20 to-transparent opacity-90 transition-opacity duration-500 flex flex-col justify-end p-10">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="inline-block px-4 py-1.5 bg-[#FFAF2B] text-[#001A3D] text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
                        {slide.tag}
                      </span>
                      <h4 className="text-2xl font-bold text-white display-font leading-tight">
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
      <section className="py-24 bg-[#001A3D] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFAF2B]/20 blur-[100px] rounded-full -mr-48 -mt-48"></div>
        </div>
        
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 text-center relative z-10 space-y-12">
           <h2 className="text-4xl md:text-6xl font-semibold display-font tracking-tight leading-tight max-w-4xl mx-auto">
             Ready to become a part of <br /> our <span className="text-[#FFAF2B]">Family?</span>
           </h2>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <Link href="/careers" className="bg-white text-[#001A3D] px-12 py-5 rounded-sm font-bold transition-all tracking-wide text-xs hover:bg-[#FFAF2B] text-center">
                See Open Positions
             </Link>
             <Link href="/contact" className="bg-transparent border border-white/20 text-white px-12 py-5 rounded-sm font-bold transition-all tracking-wide text-xs hover:border-[#FFAF2B] hover:text-[#FFAF2B] text-center">
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
            background: #E5E7EB;
            border-radius: 9999px;
            transition: all 0.3s ease;
        }
        .workplace-carousel .slick-dots li.slick-active {
            background: #FFAF2B;
        }
      `}</style>
    </div>
  );
}
