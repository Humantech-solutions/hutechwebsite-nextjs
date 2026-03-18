"use client";

import { motion as Motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Share2, 
  ArrowLeft, 
  CheckCircle2, 
  MessageSquare, 
  Monitor,
  Video
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
  }
};

export default function EventDetail() {
  const params = useParams();
  const id = params.id as string;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const event = EVENTS_DATA[id as keyof typeof EVENTS_DATA] || EVENTS_DATA["global-ai-summit-2026"];

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <Meta title={`${event.title} | Events | Hutech Solutions`} description={event.tagline} />
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="bg-[#001A3D] text-white min-h-[450px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#001A3D]/60 to-[#001A3D]"></div>
        </div>

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-20 z-10 w-full py-16">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Link 
              href="/resources/events" 
              className="inline-flex items-center gap-2 text-[#0171c1] font-bold text-xs uppercase tracking-widest hover:text-white transition-colors"
            >
              <ArrowLeft size={16} /> Back to All Events
            </Link>
            
            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-1.5 bg-[#FFAF2B]/10 text-[#FFAF2B] text-[10px] font-bold uppercase tracking-widest rounded-full border border-[#FFAF2B]/20">
                {event.category}
              </span>
              <span className="px-4 py-1.5 bg-[#0171c1]/10 text-[#0171c1] text-[10px] font-bold uppercase tracking-widest rounded-full border border-[#0171c1]/20">
                {event.type}
              </span>
            </div>

            <h1 className="text-4xl md:text-7xl font-semibold display-font leading-tight max-w-4xl">
              {event.title}
            </h1>
            <p className="text-xl text-gray-300 font-medium max-w-2xl leading-relaxed italic">
              "{event.tagline}"
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <section className="py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Column: Event Details */}
            <div className="lg:col-span-8 space-y-16">
              
              {/* Description */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-[#001A3D] display-font">About the Event</h2>
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  {event.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {event.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex gap-3 items-start p-4 bg-gray-50 rounded-xl">
                      <CheckCircle2 className="w-5 h-5 text-[#0171c1] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#001A3D] font-bold">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agenda */}
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-[#001A3D] display-font">Event Agenda</h2>
                <div className="space-y-4">
                  {event.agenda.map((item, idx) => (
                    <div key={idx} className="flex gap-8 items-center p-6 border border-gray-100 rounded-2xl hover:border-[#0171c1]/30 hover:shadow-lg transition-all">
                      <div className="text-[#0171c1] font-black text-lg whitespace-nowrap w-24 tracking-tight">{item.time}</div>
                      <div className="h-10 w-[1px] bg-gray-100"></div>
                      <div className="font-bold text-[#001A3D] text-lg">{item.event}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Speakers */}
              <div className="space-y-10">
                <h2 className="text-3xl font-bold text-[#001A3D] display-font">Featured Speakers</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {event.speakers.map((speaker, idx) => (
                    <div key={idx} className="group text-center space-y-4">
                      <div className="aspect-square rounded-full overflow-hidden border-4 border-gray-0 group-hover:border-[#0171c1] transition-all duration-500">
                        <ImageWithFallback src={speaker.image} alt={speaker.name} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-xl text-[#001A3D]">{speaker.name}</h4>
                        <p className="text-sm text-[#0171c1] font-bold uppercase tracking-widest">{speaker.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Sidebar Sticky */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                
                {/* Info Card */}
                <div className="bg-[#001A3D] text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#0171c1]/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                  
                  <div className="relative z-10 space-y-8">
                    <h3 className="text-2xl font-bold display-font">Registration</h3>
                    
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                          <Calendar className="w-5 h-5 text-[#FFAF2B]" />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Date</div>
                          <div className="font-bold">{event.date}</div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                          <Clock className="w-5 h-5 text-[#FFAF2B]" />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Time</div>
                          <div className="font-bold">{event.time}</div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                          <MapPin className="w-5 h-5 text-[#FFAF2B]" />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Location</div>
                          <div className="font-bold">{event.location}</div>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="w-full bg-[#0171c1] hover:bg-white hover:text-[#001A3D] text-white py-5 rounded-sm font-black uppercase tracking-[0.2em] text-[11px] transition-all duration-500 shadow-lg"
                    >
                      Register Now
                    </button>
                    
                    <p className="text-[10px] text-center text-white/40 font-bold uppercase tracking-widest">
                      * Limited slots available
                    </p>
                  </div>
                </div>

                {/* Shared & Support */}
                <div className="p-8 border border-gray-100 rounded-3xl space-y-6">
                  <h4 className="font-bold text-[#001A3D]">Helpful Links</h4>
                  <div className="space-y-4">
                    <button className="flex items-center gap-3 text-sm font-bold text-gray-500 hover:text-[#0171c1] transition-colors">
                      <Share2 size={16} /> Share with colleagues
                    </button>
                    <button className="flex items-center gap-3 text-sm font-bold text-gray-500 hover:text-[#0171c1] transition-colors">
                      <Monitor size={16} /> Add to Calendar
                    </button>
                    <Link href="/contact" className="flex items-center gap-3 text-sm font-bold text-gray-500 hover:text-[#0171c1] transition-colors">
                      <MessageSquare size={16} /> Contact Organizer
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Call to Action */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-[#001A3D] display-font leading-tight">
                Can't make it to this event?
              </h2>
              <p className="text-lg text-gray-500 font-medium">
                Subscribe to our tech newsletter to receive event summaries, recording links, and early-bird notifications for our upcoming summits.
              </p>
              <div className="flex gap-4">
                 <input 
                  type="email" 
                  placeholder="Enter your corporate email" 
                  className="flex-1 px-6 py-4 rounded-sm border border-gray-200 focus:outline-none focus:border-[#0171c1] transition-all"
                 />
                 <button className="px-10 py-4 bg-[#0171c1] text-white font-bold uppercase tracking-widest text-[11px] hover:bg-[#001A3D] transition-all">
                  Subscribe
                 </button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
                 <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1511512578047-dfb367046420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                  alt="Newsletter" 
                  className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-[#001A3D]/20 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#0171c1] shadow-2xl scale-in group cursor-pointer">
                       <Video className="w-8 h-8 fill-current" />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
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
