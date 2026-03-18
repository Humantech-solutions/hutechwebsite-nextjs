"use client";

import { motion as Motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  User, 
  Share2, 
  ArrowLeft, 
  CheckCircle2, 
  MessageSquare, 
  ArrowRight,
  Monitor,
  Video,
  ExternalLink
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { RegisterEventModal } from "@/components/RegisterEventModal";
import Link from "next/link";

const EVENTS_DATA = {
  "global-ai-summit-2026": {
    title: "Global AI & Cloud Summit 2026",
    tagline: "Unleashing the Potential of Autonomous Intelligence",
    date: "April 20, 2026",
    time: "09:00 AM - 05:00 PM GMT",
    location: "ExCeL London, UK",
    type: "In-Person",
    category: "Summit",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    description: "The Global AI & Cloud Summit is Hutech's flagship event, bringing together 5,000+ industry leaders, engineers, and visionaries. This year, we focus on the convergence of Generative AI, Cloud-native architectures, and Sustainable computing.",
    agenda: [
      { time: "09:00 AM", event: "Opening Keynote: The Future of Autonomous Enterprise" },
      { time: "11:00 AM", event: "Cloud-Native Transformation: Best Practices & Pitfalls" },
      { time: "01:00 PM", event: "Networking Lunch & AI Demo Showcase" },
      { time: "02:30 PM", event: "Generative AI in Production: Scaling beyond POCs" },
      { time: "04:30 PM", event: "Closing Panel: Ethics & Governance in the AI Age" }
    ],
    speakers: [
      { name: "Dr. Sarah Chen", role: "CTO, Hutech Solutions", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { name: "James Wilson", role: "VP of Engineering, CloudCore", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { name: "Elena Rodriguez", role: "Head of AI Ethics, GlobalTech", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" }
    ],
    highlights: [
      "Hands-on AI workshops with real-world datasets",
      "Exclusive preview of Hutech's 2027 Tech Roadmap",
      "VIP Networking evening for registered executives",
      "Certification opportunities for Cloud Architects"
    ]
  },
  "fintech-innovation-workshop": {
    title: "Fintech Innovation Workshop",
    tagline: "Architecting the Future of Digital Finance",
    date: "May 15, 2026",
    time: "10:00 AM - 02:00 PM EST",
    location: "New York / Hybrid",
    type: "Hybrid",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1591115765373-520b7a21769b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    description: "A deep-dive workshop focused on the practical application of blockchain, real-time payments, and AI-driven fraud detection in modern financial services.",
    agenda: [
      { time: "10:00 AM", event: "Modernizing Legacy Banking Infrastructure" },
      { time: "11:30 AM", event: "Blockchain Beyond Crypto: Smart Contracts for Finance" },
      { time: "12:30 PM", event: "AI & Fraud Prevention: Real-time Analysis" },
      { time: "01:30 PM", event: "Q&A and Implementation Roadmap Session" }
    ],
    speakers: [
      { name: "Michael Ross", role: "Fintech Lead, Hutech", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { name: "Amara Okoro", role: "Chief Innovation Officer, NeoBank", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" }
    ],
    highlights: [
      "Case studies of successful legacy migrations",
      "Interactive coding session for smart contracts",
      "Direct consultation with Hutech's Fintech architects",
      "Free access to Hutech's Fintech whitepaper collection"
    ]
  },
  "sustainability-in-tech-symposium": {
    title: "Sustainability in Tech Symposium",
    tagline: "Eco-conscious Engineering for a Greener Future",
    date: "June 02, 2026",
    time: "10:00 AM - 04:00 PM CET",
    location: "Berlin, Germany",
    type: "In-Person",
    category: "Symposium",
    image: "https://images.unsplash.com/photo-1475721027187-40247339488b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    description: "Join international experts and engineers as we explore how architectural decisions and software efficiency can significantly reduce the carbon footprint of global digital infrastructure.",
    agenda: [
      { time: "10:00 AM", event: "Sustainable Software Engineering: Core Principles" },
      { time: "11:30 AM", event: "Optimizing Data Centers for Carbon Neutrality" },
      { time: "01:30 PM", event: "Panel: The Role of Tech in the Green Energy Transition" },
      { time: "03:00 PM", event: "Networking and Interactive Sustainability Workshop" }
    ],
    speakers: [
      { name: "Anna Schmidt", role: "Sustainability Lead, Hutech", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { name: "Dr. Klaus Mueller", role: "Founder, GreenCloud Labs", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" }
    ],
    highlights: [
      "Launch of Hutech's Open-Source Carbon Monitor",
      "Case studies on low-energy cloud computing",
      "Collaborative breakout sessions on eco-design",
      "Networking with Berlin's leading green-tech startups"
    ]
  }
};

export default function EventDetail() {
  const params = useParams();
  const id = params?.id as string;
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const event = EVENTS_DATA[id as keyof typeof EVENTS_DATA] || EVENTS_DATA["global-ai-summit-2026"];

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <Meta title={`${event.title} | Events | Hutech Solutions`} description={event.tagline} />
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="bg-[#001A3D] text-white min-h-[500px] relative overflow-hidden flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#001A3D]/40 via-[#001A3D]/80 to-[#001A3D]"></div>
        </div>

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-20 z-10 w-full py-16">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            <Link 
              href="/resources/events" 
              className="inline-flex items-center gap-3 text-[#0171c1] font-black text-[11px] uppercase tracking-[0.3em] hover:text-white transition-all group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> Back to All Events
            </Link>
            
            <div className="flex flex-wrap gap-4">
              <span className="px-6 py-2 bg-[#FFAF2B] text-[#001A3D] text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-2xl">
                {event.category.toUpperCase()}
              </span>
              <span className="px-6 py-2 bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-white/20 backdrop-blur-md">
                {event.type.toUpperCase()}
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-8xl font-semibold display-font leading-tight max-w-5xl tracking-tight">
                {event.title}
              </h1>
              <p className="text-2xl text-gray-300 font-medium max-w-3xl leading-relaxed italic border-l-4 border-[#FFAF2B] pl-8">
                "{event.tagline}"
              </p>
            </div>
          </Motion.div>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <section className="py-32 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
            
            {/* Left Column: Event Details */}
            <div className="lg:col-span-8 space-y-24">
              
              {/* Description */}
              <div className="space-y-10">
                <div className="flex items-center gap-4">
                  <span className="block w-12 h-[3px] bg-[#0171c1]"></span>
                  <h2 className="text-4xl font-bold text-[#001A3D] display-font uppercase tracking-tight">About the Event</h2>
                </div>
                <p className="text-2xl text-gray-500 font-medium leading-relaxed">
                  {event.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                  {event.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex gap-5 items-start p-8 bg-gray-50 rounded-[2rem] border border-gray-100/50 group hover:bg-white hover:shadow-2xl transition-all duration-500">
                      <div className="w-10 h-10 bg-[#0171c1]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#0171c1] group-hover:text-white transition-colors">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <span className="text-lg text-[#001A3D] font-bold leading-snug">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agenda */}
              <div className="space-y-12">
                <div className="flex items-center gap-4">
                  <span className="block w-12 h-[3px] bg-[#0171c1]"></span>
                  <h2 className="text-4xl font-bold text-[#001A3D] display-font uppercase tracking-tight">Event Agenda</h2>
                </div>
                <div className="space-y-6">
                  {event.agenda.map((item, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row gap-8 items-start md:items-center p-10 bg-white border border-gray-100 rounded-[2.5rem] hover:border-[#0171c1]/30 hover:shadow-2xl transition-all duration-500 group">
                      <div className="text-[#0171c1] font-black text-2xl whitespace-nowrap md:w-40 tracking-tighter bg-gray-50 px-6 py-2 rounded-xl group-hover:bg-[#0171c1] group-hover:text-white transition-all text-center">{item.time}</div>
                      <div className="hidden md:block h-12 w-[2px] bg-gray-100 group-hover:bg-[#0171c1]/20 transition-all"></div>
                      <div className="font-bold text-[#001A3D] text-2xl display-font leading-tight">{item.event}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Speakers */}
              <div className="space-y-16">
                <div className="flex items-center gap-4">
                  <span className="block w-12 h-[3px] bg-[#0171c1]"></span>
                  <h2 className="text-4xl font-bold text-[#001A3D] display-font uppercase tracking-tight">Featured Speakers</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {event.speakers.map((speaker, idx) => (
                    <div key={idx} className="group text-center space-y-8">
                      <div className="aspect-square rounded-3xl overflow-hidden border-[10px] border-white shadow-2xl group-hover:border-[#0171c1]/10 transition-all duration-700">
                        <ImageWithFallback src={speaker.image} alt={speaker.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100 transition-all duration-1000" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-bold text-2xl text-[#001A3D] display-font tracking-tight">{speaker.name}</h4>
                        <p className="text-xs text-[#0171c1] font-black uppercase tracking-[0.25em]">{speaker.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Sidebar Sticky */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-12">
                
                {/* Info Card */}
                <div className="bg-[#001A3D] text-white p-12 rounded-[3.5rem] shadow-[0_48px_100px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#0171c1]/20 rounded-full blur-[100px] -mr-24 -mt-24"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FFAF2B]/10 rounded-full blur-[80px] -ml-16 -mb-16"></div>
                  
                  <div className="relative z-10 space-y-10">
                    <div className="space-y-2">
                       <span className="text-[#FFAF2B] text-[10px] font-black uppercase tracking-[0.4em]">Secure Your Spot</span>
                       <h3 className="text-3xl font-bold display-font tracking-tight">Registration</h3>
                    </div>
                    
                    <div className="space-y-8">
                      <div className="flex gap-6 items-center">
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-md">
                          <Calendar className="w-6 h-6 text-[#FFAF2B]" />
                        </div>
                        <div>
                          <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Date</div>
                          <div className="font-bold text-lg">{event.date}</div>
                        </div>
                      </div>

                      <div className="flex gap-6 items-center">
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-md">
                          <Clock className="w-6 h-6 text-[#FFAF2B]" />
                        </div>
                        <div>
                          <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Time</div>
                          <div className="font-bold text-lg">{event.time}</div>
                        </div>
                      </div>

                      <div className="flex gap-6 items-center">
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-md">
                          <MapPin className="w-6 h-6 text-[#FFAF2B]" />
                        </div>
                        <div>
                          <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Location</div>
                          <div className="font-bold text-lg">{event.location}</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6 pt-4">
                        <button 
                          onClick={() => setIsModalOpen(true)}
                          className="w-full bg-[#0171c1] hover:bg-white hover:text-[#001A3D] text-white py-6 rounded-2xl font-black uppercase tracking-[0.25em] text-[11px] transition-all duration-500 shadow-2xl flex items-center justify-center gap-4 group"
                        >
                          REGISTER NOW <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </button>
                        
                        <div className="flex items-center justify-center gap-2">
                           <div className="w-2 h-2 bg-[#FFAF2B] rounded-full animate-pulse"></div>
                           <p className="text-[10px] text-center text-white/40 font-black uppercase tracking-widest">
                            Limited engineering slots remaining
                           </p>
                        </div>
                    </div>
                  </div>
                </div>

                {/* Shared & Support */}
                <div className="p-12 border border-gray-100 rounded-[3rem] space-y-10 bg-gray-50/50">
                  <h4 className="font-black text-[10px] text-[#001A3D] uppercase tracking-[0.3em] border-b border-gray-100 pb-6">Helpful Resources</h4>
                  <div className="space-y-6">
                    <button className="flex items-center gap-4 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-[#0171c1] transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                        <Share2 size={16} />
                      </div> Share with colleagues
                    </button>
                    <button className="flex items-center gap-4 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-[#0171c1] transition-all group">
                       <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                        <Monitor size={16} />
                      </div> Add to Calendar
                    </button>
                    <Link href="/contact" className="flex items-center gap-4 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-[#0171c1] transition-all group">
                       <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                        <MessageSquare size={16} />
                      </div> Contact Organizer
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Call to Action */}
      <section className="py-32 bg-gray-50 border-t border-gray-100 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <h2 className="text-5xl md:text-7xl font-bold text-[#001A3D] display-font tracking-tight leading-tight">
                Missed this <br /><span className="text-[#0171c1]">Event?</span>
              </h2>
              <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-lg">
                Gain access to exclusive event transcripts, recording links, and early notification of upcoming engineering summits.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-xl">
                 <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="flex-1 px-8 py-6 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:border-[#0171c1] transition-all font-medium text-lg shadow-sm"
                 />
                 <button className="px-12 py-6 bg-[#001A3D] text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-[#0171c1] transition-all shadow-xl">
                  Subscribe
                 </button>
              </form>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[4rem] overflow-hidden shadow-[0_64px_128px_-32px_rgba(0,0,0,0.2)] rotate-3">
                 <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1511512578047-dfb367046420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                  alt="Newsletter" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                 />
                 <div className="absolute inset-0 bg-[#001A3D]/30 flex items-center justify-center group cursor-pointer">
                    <div className="w-24 h-24 bg-white/90 backdrop-blur-xl rounded-full flex items-center justify-center text-[#0171c1] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] hover:scale-110 transition-transform">
                       <Video className="w-10 h-10 fill-current" />
                    </div>
                 </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#FFAF2B] rounded-3xl -rotate-6 -z-10 shadow-2xl"></div>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#0171c1]/5 skew-x-12 translate-x-1/3"></div>
      </section>

      {/* Modal Integration */}
      <RegisterEventModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        eventTitle={event.title} 
      />
    </div>
  );
}
