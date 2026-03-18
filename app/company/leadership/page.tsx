"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { MoveRight, Linkedin, Twitter, Mail, Award, Globe, Briefcase } from "lucide-react";
import Link from "next/link";
import { Meta } from "@/components/Meta";

export default function Leadership() {
  const leaders = [
    { 
      name: "Siddharth Verma", 
      role: "CEO & Founder", 
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      bio: "20+ years of experience in scaling technology consulting firms across APAC and EMEA."
    },
    { 
      name: "Ananya Rao", 
      role: "Chief Technology Officer", 
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      bio: "Former lead architect at a Silicon Valley giant, now driving Hutech's AI and Cloud strategy."
    },
    { 
      name: "Michael Chen", 
      role: "Head of AI Innovation", 
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      bio: "PhD in Machine Learning with a focus on real-time edge computing and industrial automation."
    },
    { 
      name: "Elena Rodriguez", 
      role: "VP of Global Delivery", 
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      bio: "Ensures operational excellence across Hutech's 15+ global delivery centers."
    },
    { 
      name: "David Thorne", 
      role: "Chief Operations Officer", 
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      bio: "Expert in lean management and global supply chain technology integration."
    },
    { 
      name: "Sarah Jenkins", 
      role: "Head of Talent & Culture", 
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      bio: "Scaling Hutech's global workforce while maintaining a culture of engineering integrity."
    },
    { 
      name: "Vikram Malhotra", 
      role: "VP of Sales - Americas", 
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      bio: "Strategizing enterprise growth and key account management for Fortune 500 clients."
    },
    { 
      name: "Li Wei", 
      role: "Head of Cybersecurity", 
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      bio: "Architecting zero-trust security frameworks for Hutech's global fintech implementations."
    }
  ];

  const advisors = [
    { name: "Dr. James Aris", firm: "Former CIO, Global Bank", region: "London" },
    { name: "Linda Kawaski", firm: "Retail Tech Advisor", region: "New York" },
    { name: "Robert Sung", firm: "Cloud Infrastructure Specialist", region: "Singapore" },
  ];

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta 
        title="Leadership Team | Hutech Solutions"
        description="Meet the visionaries and experts leading Hutech Solutions toward innovation and global leadership."
      />
      <Breadcrumbs variant="light" />
      
      {/* Hero Section */}
      <section className="bg-[#001A3D] text-white h-[450px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
           <ImageWithFallback 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920" 
            className="w-full h-full object-cover opacity-10"
            alt="Leadership at Hutech"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#001A3D]"></div>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10 text-left w-full">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <span className="w-12 h-[1px] bg-[#FFAF2B]"></span>
              <span className="text-[#FFAF2B] font-bold tracking-[0.2em] text-[10px] uppercase">The Executive Bench</span>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight display-font">
              The <span className="text-[#FFAF2B]">Visionaries.</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl font-medium italic">
              "Leadership at Hutech is about enabling the brilliance of our engineers to solve the world's most complex digital challenges."
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Main Leadership Grid */}
      <section className="py-32 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20">
            {leaders.map((leader, i) => (
              <Motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-8 relative border border-gray-50 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  <ImageWithFallback src={leader.img} alt={leader.name} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700 grayscale group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                     <div className="flex gap-4">
                        <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FFAF2B] transition-colors flex items-center justify-center backdrop-blur-md">
                           <Linkedin size={16} className="text-white" />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FFAF2B] transition-colors flex items-center justify-center backdrop-blur-md">
                           <Twitter size={16} className="text-white" />
                        </button>
                     </div>
                  </div>
                </div>
                <div className="space-y-3 px-2">
                   <h4 className="text-2xl font-bold text-[#001A3D] tracking-tight display-font">{leader.name}</h4>
                   <p className="text-[#0171c1] font-black text-[10px] tracking-widest uppercase">{leader.role}</p>
                   <p className="text-sm text-gray-400 leading-relaxed font-medium line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                      {leader.bio}
                   </p>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board Section */}
      <section className="py-32 bg-[#FAF9F6] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 opacity-[0.03] text-[#001A3D] pointer-events-none">
           <Globe size={400} />
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              <div className="lg:col-span-4 space-y-8">
                 <h2 className="text-4xl md:text-6xl font-bold text-[#001A3D] display-font leading-tight">Board of <br /> <span className="text-[#0171c1]">Advisors.</span></h2>
                 <p className="text-lg text-gray-500 font-medium leading-relaxed">
                    Our strategic direction is refined by a global board of industry veterans who bring decades of leadership experience from the world's most successful organizations.
                 </p>
                 <Link href="/contact" className="inline-flex px-10 py-5 bg-[#001A3D] text-white font-black uppercase tracking-widest text-[11px] hover:bg-[#0171c1] transition-all rounded-sm gap-3 items-center">
                    Engage with Us <MoveRight size={16} />
                 </Link>
              </div>
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                 {advisors.map((advisor, idx) => (
                   <div key={idx} className="p-10 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 group">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#FFAF2B] group-hover:text-white transition-colors">
                         <Briefcase size={20} />
                      </div>
                      <h4 className="text-xl font-bold text-[#001A3D] mb-1">{advisor.name}</h4>
                      <p className="text-xs text-[#0171c1] font-bold uppercase tracking-widest mb-4">{advisor.firm}</p>
                      <div className="pt-4 border-t border-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-300">
                         {advisor.region}
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Philosophy Join CTA */}
      <section className="py-32">
         <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
            <div className="bg-[#001A3D] rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-96 h-96 bg-[#0171c1]/20 blur-[100px] rounded-full -mr-48 -mt-48"></div>
               <div className="relative z-10 space-y-10 max-w-4xl mx-auto">
                  <div className="flex justify-center">
                     <Award size={64} className="text-[#FFAF2B]" />
                  </div>
                  <h2 className="text-4xl md:text-6xl font-semibold display-font tracking-tight leading-tight">
                     Lead the Next <br /> <span className="text-[#FFAF2B]">Digital Frontier.</span>
                  </h2>
                  <p className="text-gray-400 text-xl font-medium">
                     We are always looking for visionary leaders to join our executive bench. If you have a passion for engineering excellence and global growth, we want to hear from you.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
                    <Link href="/contact" className="bg-[#0171c1] hover:bg-white text-white hover:text-[#001A3D] px-12 py-5 rounded-sm font-black uppercase tracking-widest text-[11px] transition-all shadow-xl text-center">
                       Partner With Us
                    </Link>
                    <Link href="/careers" className="bg-transparent border border-white/20 hover:border-[#FFAF2B] hover:text-[#FFAF2B] text-white px-12 py-5 rounded-sm font-black uppercase tracking-widest text-[11px] transition-all text-center">
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
