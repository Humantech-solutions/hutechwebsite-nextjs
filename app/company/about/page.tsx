"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { 
  Users, 
  Globe2, 
  Building2, 
  Briefcase,
  CheckCircle2,
  TrendingUp,
  Layout,
  Settings,
  ShieldCheck,
  Star,
  Award,
  Search,
  Zap,
  MoveRight,
  Code2,
  Cpu,
  Fingerprint
} from "lucide-react";
import Link from "next/link";
import { Meta } from "@/components/Meta";
import { GlobalMap } from "@/components/GlobalMap";

export default function AboutHutech() {
  const stats = [
    { label: "Associates", value: "100+", icon: <Users size={20} /> },
    { label: "Happy Clients", value: "20+", icon: <Briefcase size={20} /> },
    { label: "Project Delivered", value: "40+", icon: <CheckCircle2 size={20} /> },
    { label: "Countries Served", value: "10+", icon: <Globe2 size={20} /> },
    { label: "Years in Business", value: "5+", icon: <TrendingUp size={20} /> },
    { label: "Client Satisfaction", value: "100%", icon: <Star size={20} /> },
  ];

  const milestones = [
    { 
      year: "2019", 
      title: "Foundation",
      desc: "Incorporated with a 2-member core. Grew to 10 members and secured 2 major clients by Q1." 
    },
    { 
      year: "2020 – 21", 
      title: "Resilience",
      desc: "Developed 2 enterprise products for funded startups. Signed MOU with Singapore-based IT org." 
    },
    { 
      year: "2021 – 22", 
      title: "Expansion",
      desc: "Secured tech partnerships in Logistics & EV sectors. Team scaled to 78 specialists." 
    },
    { 
      year: "2022 – 23", 
      title: "Global Reach",
      desc: "Opened Pune office, US subsidiary, and strategic UK collaboration with Acend Solutions." 
    },
    { 
      year: "2023 – 24", 
      title: "Leadership",
      desc: "Established Hutech Inc. (USA), joined NASSCOM, and achieved ISO 9001:2015 certification. Team 90+." 
    },
    { 
      year: "2025 – Now", 
      title: "Innovation",
      desc: "Forged alliances with XOOTS & Maconsus (Vietnam), enhancing our global network and R&D." 
    },
  ];

  return (
    <div className="flex flex-col overflow-hidden bg-white selection:bg-[#0171c1] selection:text-white">
      <Meta 
        title="About Hutech | Hutech Solutions"
        description="Global IT services and consulting company with a strong presence in India, US, and UK, delivering latest technology solutions."
      />
      <Breadcrumbs variant="light" />
      
      {/* Architectural Hero */}
      <section className="relative min-h-[600px] flex items-center bg-[#001A3D] overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 opacity-20">
           <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,#0171c1_0%,transparent_50%)]"></div>
           <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,#FFAF2B_0%,transparent_40%)]"></div>
           <ImageWithFallback 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920" 
              alt="Global IT Services"
              className="w-full h-full object-cover mix-blend-overlay grayscale"
           />
        </div>

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-20 z-10 w-full">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8 space-y-10">
                 <Motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                 >
                    <div className="inline-flex items-center gap-4 py-2 px-6 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                       <span className="w-2 h-2 rounded-full bg-[#FFAF2B] animate-pulse"></span>
                       <span className="text-white font-bold tracking-widest text-[10px] uppercase">Corporate Profile</span>
                    </div>
                    <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight display-font">
                       Architecting <br />
                       <span className="text-[#FFAF2B]">Business Value.</span>
                    </h1>
                    <p className="text-xl text-white/60 leading-relaxed max-w-2xl font-medium">
                       We are a remarkable group of creatives who transform traditional company concepts into reliable digital solutions. We provide comprehensive solutions that effortlessly include cutting-edge ideas by employing cutting-edge methodologies. Our tried-and-true digital techniques follow accepted industry standards and provide usable products that appeal to a wide audience.
                    </p>
                 </Motion.div>
              </div>
              <div className="lg:col-span-4 hidden lg:block">
                 <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, i) => (
                       <Motion.div 
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + (i * 0.1) }}
                          className="p-8 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl text-center"
                       >
                          <div className="text-3xl font-black text-white display-font mb-1">{stat.value}</div>
                          <div className="text-[10px] font-bold text-[#FFAF2B] uppercase tracking-widest">{stat.label}</div>
                       </Motion.div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Strategic Overview - High Density Text Grid */}
      <section className="py-32 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              <div className="lg:col-span-4 space-y-8">
                 <div className="w-20 h-2 bg-[#0171c1]"></div>
                 <h2 className="text-4xl md:text-5xl font-bold text-[#001A3D] display-font leading-tight">
                    Providing The Finest <br /> <span className="text-[#0171c1]">Digital Experiences.</span>
                 </h2>
                 <p className="text-gray-400 font-medium">
                    "We don't just build products; we architect the growth of businesses through engineering precision and creative thinking."
                 </p>
              </div>
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="space-y-6">
                    <div className="p-4 bg-gray-50 rounded-2xl w-fit text-[#0171c1]">
                       <Code2 size={24} />
                    </div>
                    <h4 className="text-xl font-bold text-[#001A3D]">Technical Depth</h4>
                    <p className="text-gray-500 font-medium leading-relaxed">
                       Our team consists of experienced engineers, architects, and creative minds who have developed software for various industries worldwide. We bridge the gap between complex problems and elegant solutions.
                    </p>
                 </div>
                 <div className="space-y-6">
                    <div className="p-4 bg-gray-50 rounded-2xl w-fit text-[#0171c1]">
                       <Cpu size={24} />
                    </div>
                    <h4 className="text-xl font-bold text-[#001A3D]">Flexible Engagement</h4>
                    <p className="text-gray-500 font-medium leading-relaxed">
                       Hire dedicated software development teams or individual experts to work at your premises. We offer seamless integration into your project workflows for maximum operational efficiency.
                    </p>
                 </div>
                 <div className="space-y-6">
                    <div className="p-4 bg-gray-50 rounded-2xl w-fit text-[#0171c1]">
                       <Fingerprint size={24} />
                    </div>
                    <h4 className="text-xl font-bold text-[#001A3D]">Consulting First</h4>
                    <p className="text-gray-500 font-medium leading-relaxed">
                       We help businesses grow by providing a range of services including consulting, design, and long-term software maintenance that consistently generates substantial business value.
                    </p>
                 </div>
                 <div className="space-y-6">
                    <div className="p-4 bg-gray-50 rounded-2xl w-fit text-[#0171c1]">
                       <ShieldCheck size={24} />
                    </div>
                    <h4 className="text-xl font-bold text-[#001A3D]">Certified Quality</h4>
                    <p className="text-gray-500 font-medium leading-relaxed">
                       As an ISO 9001:2015 certified company and a proud NASSCOM member, we adhere to global quality standards across every delivery and partnership milestone.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Narrative Section - Immersive Content */}
      <section className="py-32 bg-[#FAF9F6] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#001A3D] hidden lg:block"></div>
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-20 z-10">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-8 bg-white p-12 lg:p-24 shadow-2xl rounded-l-[3rem] space-y-16">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="space-y-6">
                       <h3 className="text-3xl font-bold text-[#001A3D] display-font">What We Do</h3>
                       <p className="text-gray-500 font-medium leading-relaxed">
                          We offer a wide range of IT services and solutions that empower businesses to leverage technology for success. From core development to advanced enterprise consulting.
                       </p>
                       <ul className="space-y-4">
                          {[
                            "Strategic IT Consulting",
                            "Full-Stack Development",
                            "Cloud Infrastructure",
                            "Managed Maintenance"
                          ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm font-bold text-[#001A3D]">
                               <div className="w-1.5 h-1.5 rounded-full bg-[#0171c1]"></div>
                               {item}
                            </li>
                          ))}
                       </ul>
                    </div>
                    <div className="space-y-6">
                       <h3 className="text-3xl font-bold text-[#001A3D] display-font">Who We Help?</h3>
                       <p className="text-gray-500 font-medium leading-relaxed">
                          We are dedicated to helping a wide range of organizations across various industries, from early-stage funded startups to established global entities.
                       </p>
                       <ul className="space-y-4">
                          {[
                            "Funded Tech Startups",
                            "SME Growth Entities",
                            "Global Enterprises",
                            "Industry Specialists"
                          ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm font-bold text-[#001A3D]">
                               <div className="w-1.5 h-1.5 rounded-full bg-[#FFAF2B]"></div>
                               {item}
                            </li>
                          ))}
                       </ul>
                    </div>
                 </div>
                 <div className="p-10 bg-[#0171c1]/5 border border-[#0171c1]/10 rounded-3xl flex flex-col md:flex-row items-center gap-8">
                    <div className="w-20 h-20 bg-[#0171c1] text-white rounded-2xl flex items-center justify-center shrink-0">
                       <TrendingUp size={40} />
                    </div>
                    <div>
                       <h4 className="text-xl font-bold text-[#001A3D] mb-2">Why Choose Us</h4>
                       <p className="text-gray-500 font-medium leading-relaxed text-sm">
                          Partner with us to unlock the full potential of technology and drive meaningful business outcomes through transparency and engineering excellence.
                       </p>
                    </div>
                 </div>
              </div>
              <div className="lg:col-span-4 bg-[#001A3D] p-12 lg:p-24 flex items-center rounded-r-[3rem]">
                 <div className="space-y-8">
                    <h2 className="text-4xl font-bold text-white display-font leading-tight">Global <br /> <span className="text-[#FFAF2B]">Synergy.</span></h2>
                    <p className="text-white/60 font-medium leading-relaxed">
                       Our offices in India, US, and UK work in a unified ecosystem to provide round-the-clock delivery and strategic support for our global clients.
                    </p>
                    <div className="space-y-6 pt-6">
                       <div className="flex items-center gap-4 group">
                          <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#FFAF2B] group-hover:bg-[#FFAF2B] group-hover:text-[#001A3D] transition-colors">
                             <Globe2 size={20} />
                          </div>
                          <span className="text-white font-bold text-xs tracking-widest uppercase">4 Global Offices</span>
                       </div>
                       <div className="flex items-center gap-4 group">
                          <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#FFAF2B] group-hover:bg-[#FFAF2B] group-hover:text-[#001A3D] transition-colors">
                             <Users size={20} />
                          </div>
                          <span className="text-white font-bold text-xs tracking-widest uppercase">90+ Member Team</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Global Footprint */}
      <GlobalMap />

      {/* History Timeline - Staggered Grid Design */}
      <section className="py-32 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
           <div className="text-center space-y-6 mb-24">
              <span className="text-[#0171c1] font-black tracking-[0.2em] text-[10px] uppercase">Corporate Evolution</span>
              <h2 className="text-4xl md:text-6xl font-bold text-[#001A3D] display-font tracking-tight">Our History.</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {milestones.map((item, idx) => (
                <Motion.div 
                   key={idx}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.1 }}
                   className="p-10 bg-white border border-gray-100 rounded-[2.5rem] relative overflow-hidden group hover:border-[#0171c1] hover:shadow-2xl transition-all duration-500"
                >
                   <div className="absolute top-0 right-0 p-8 opacity-[0.05] text-[#001A3D] pointer-events-none group-hover:opacity-[0.1] transition-opacity">
                      <span className="text-6xl font-black display-font">{item.year.split(" – ")[0]}</span>
                   </div>
                   <div className="space-y-6 relative z-10">
                      <div className="text-3xl font-black text-[#0171c1] display-font">{item.year}</div>
                      <h4 className="text-xl font-bold text-[#001A3D]">{item.title}</h4>
                      <p className="text-gray-500 font-medium leading-relaxed text-sm">
                         {item.desc}
                      </p>
                      <div className="w-12 h-1 bg-[#FFAF2B] group-hover:w-full transition-all duration-700"></div>
                   </div>
                </Motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Modern CTA */}
      <section className="py-24">
         <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
            <div className="relative rounded-[4rem] overflow-hidden bg-[#001A3D] p-12 lg:p-24 text-center">
               <div className="absolute inset-0 z-0">
                  <ImageWithFallback 
                     src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920" 
                     alt="Join Hutech"
                     className="w-full h-full object-cover opacity-10"
                  />
               </div>
               <div className="relative z-10 space-y-10 max-w-4xl mx-auto">
                  <h2 className="text-4xl md:text-6xl font-bold text-white display-font leading-tight">
                     Join the Next <br /> <span className="text-[#FFAF2B]">Digital Revolution.</span>
                  </h2>
                  <p className="text-xl text-white/50 font-medium leading-relaxed">
                     Whether you're looking for a technology partner or your next career move, we're building the future together.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                     <Link href="/contact" className="px-12 py-5 bg-[#0171c1] text-white font-black uppercase tracking-widest text-[11px] hover:bg-[#FFAF2B] hover:text-[#001A3D] transition-all rounded-sm shadow-xl">
                        Start Your Project
                     </Link>
                     <Link href="/careers" className="px-12 py-5 border border-white/20 text-white font-black uppercase tracking-widest text-[11px] hover:bg-white/10 transition-all rounded-sm">
                        Executive Careers
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
