"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { 
  Users, 
  Lightbulb, 
  TrendingUp, 
  Globe, 
  Briefcase, 
  Target, 
  ShieldCheck, 
  PieChart, 
  MoveRight, 
  Building2, 
  Stethoscope, 
  Zap, 
  ShoppingCart, 
  HardHat,
  Cpu,
  MessagesSquare,
  Award,
  Star,
  CheckCircle2
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

const INDUSTRIES = [
  {
    name: "BFSI & Fintech",
    icon: <Building2 className="w-8 h-8 text-[#0171c1]" />,
    desc: "Digital banking, risk management, and regulatory compliance strategies."
  },
  {
    name: "Healthcare & Life Sciences",
    icon: <Stethoscope className="w-8 h-8 text-[#0171c1]" />,
    desc: "Optimizing patient care through digital health transformation and data security."
  },
  {
    name: "Energy & Utilities",
    icon: <Zap className="w-8 h-8 text-[#0171c1]" />,
    desc: "Sustainable energy transitions and grid modernization consulting."
  },
  {
    name: "Retail & CPG",
    icon: <ShoppingCart className="w-8 h-8 text-[#0171c1]" />,
    desc: "Omnichannel strategy and supply chain resilience for the modern consumer."
  },
  {
    name: "Manufacturing",
    icon: <HardHat className="w-8 h-8 text-[#0171c1]" />,
    desc: "Lean production systems and Industrial 4.0 operational excellence."
  },
  {
    name: "High-Tech",
    icon: <Cpu className="w-8 h-8 text-[#0171c1]" />,
    desc: "Product roadmap acceleration and R&D strategy for tech leaders."
  }
];

const CONSULTANT_EXPERIENCE = [
  {
    title: "Industry Veterans",
    text: "Our lead consultants average 15+ years of domain-specific leadership in Fortune 500 environments."
  },
  {
    title: "Technical Architects",
    text: "Deep technical depth that ensures strategic advice is grounded in feasible, scalable engineering."
  },
  {
    title: "Change Management",
    text: "Experts in the human element of transformation, ensuring organizational buy-in and cultural shift."
  },
  {
    title: "Data Scientists",
    text: "PhD-level researchers turning raw organizational data into predictive strategic roadmaps."
  }
];

const CONSULTANTS = [
  { name: "Sarah Chen", role: "Principal Strategist", exp: "18 Years", skills: "Digital Transformation, M&A", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" },
  { name: "Marcus Thorne", role: "Technical Architect", exp: "15 Years", skills: "Cloud Native, Enterprise Scale", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" },
  { name: "Elena Rodriguez", role: "BFSI Lead", exp: "20 Years", skills: "Fintech Compliance, Risk", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200" },
  { name: "David Wu", role: "Supply Chain Expert", exp: "12 Years", skills: "Logistics, AI Optimization", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" },
  { name: "Dr. Amara Okafor", role: "Healthcare Consultant", exp: "16 Years", skills: "HealthTech, Data Privacy", img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=200" },
  { name: "Jameson Burke", role: "Change Management", exp: "14 Years", skills: "Org Design, Leadership", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200" },
  { name: "Linda Kawaski", role: "Retail Strategist", exp: "19 Years", skills: "Omnichannel, Consumer UX", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" },
  { name: "Robert Vance", role: "Energy & Utilities", exp: "22 Years", skills: "Grid Modernization, ESG", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200" },
  { name: "Sophia Martinez", role: "Data Scientist", exp: "10 Years", skills: "Predictive Analytics, NLP", img: "https://images.unsplash.com/photo-1567532939604-b6b5b0ad2f04?auto=format&fit=crop&q=80&w=200" },
  { name: "Michael Chang", role: "Cybersecurity Lead", exp: "17 Years", skills: "Zero Trust, Governance", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200" },
  { name: "Rachel Adams", role: "Product Strategy", exp: "13 Years", skills: "SaaS Growth, Roadmap", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200" },
  { name: "Thomas Klein", role: "Lean Manufacturing", exp: "25 Years", skills: "Six Sigma, Factory 4.0", img: "https://images.unsplash.com/photo-1560250094-0b91f9971660?auto=format&fit=crop&q=80&w=200" },
  { name: "Nadia Volkov", role: "Fintech Advisor", exp: "11 Years", skills: "Blockchain, Neobanking", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200" },
  { name: "Aarav Patel", role: "Cloud Strategist", exp: "14 Years", skills: "AWS/Azure, FinOps", img: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&q=80&w=200" },
  { name: "Catherine Low", role: "HR Transformation", exp: "16 Years", skills: "Talent Strategy, DEI", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" }
];

export default function Consulting() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta 
        title="Strategic Consulting Services | Hutech Solutions"
        description="Empower your business with Hutech's strategic consulting. Our diverse consultants bring cross-industry expertise to solve your most complex challenges."
      />
      <Breadcrumbs variant="light" />
      
      {/* Hero Section */}
      <section className="bg-[#001A3D] text-white h-[450px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1656646424292-cf207f3f1749?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Hutech Strategic Consulting"
            className="w-full h-full object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/80 to-transparent"></div>
        </div>
        
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-20 z-10 w-full">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[1px] bg-[#FFAF2B]"></span>
              <span className="text-[#FFAF2B] font-bold uppercase tracking-[0.3em] text-[10px]">Corporate Strategy & Transformation</span>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight display-font mb-8">
              Strategic Insight. <br />
              <span className="text-[#FFAF2B]">Decisive Action.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed">
              In an era of relentless disruption, Hutech Solutions provides the strategic clarity and operational depth needed to navigate complexity and achieve sustainable growth.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font leading-tight">
                Beyond Advice: <br />
                <span className="text-[#0171c1]">Execution Excellence.</span>
              </h2>
              <div className="w-20 h-1 bg-[#0171c1]"></div>
              <p className="text-lg text-gray-500 font-medium leading-relaxed">
                Consulting at Hutech isn't just about delivering reports—it's about partnering with leadership teams to solve real-world problems. We combine deep domain expertise with a bias for action, ensuring that every strategic roadmap is backed by a practical execution path.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="space-y-4 border-l-2 border-gray-50 pl-6">
                  <h3 className="font-bold text-[#001A3D] text-lg display-font">Visionary Strategy</h3>
                  <p className="text-sm text-gray-400 font-medium">Helping you define 'where to play' and 'how to win' in your specific competitive landscape.</p>
                </div>
                <div className="space-y-4 border-l-2 border-gray-50 pl-6">
                  <h3 className="font-bold text-[#001A3D] text-lg display-font">Operational Rigor</h3>
                  <p className="text-sm text-gray-400 font-medium">Streamlining internal processes to maximize efficiency and reduce organizational drag.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gray-50 rounded-[3rem] p-4 border border-gray-100 relative z-10">
                <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden">
                   <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1565688527174-775059ac429c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                    alt="Diverse Consulting Group" 
                    className="w-full h-full object-cover"
                   />
                </div>
                <div className="absolute -top-6 -right-6 bg-[#0171c1] p-10 text-white rounded-2xl shadow-2xl hidden md:block">
                   <p className="text-4xl font-bold display-font mb-1">500+</p>
                   <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Transformations Delivered</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Diverse Industry Experience</h2>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto font-medium">
              We bring cross-pollinated insights from diverse global sectors, allowing us to apply proven solutions from one industry to solve unique problems in another.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INDUSTRIES.map((industry, i) => (
              <Motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-white border border-gray-100 hover:shadow-2xl transition-all group rounded-2xl h-full shadow-sm"
              >
                <div className="mb-8 p-4 bg-gray-50 rounded-xl w-fit group-hover:bg-[#0171c1] group-hover:text-white transition-all duration-500">{industry.icon}</div>
                <h3 className="text-2xl font-bold text-[#001A3D] display-font leading-tight mb-4">{industry.name}</h3>
                <p className="text-gray-500 font-medium leading-relaxed text-sm">{industry.desc}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultants Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-6 max-w-2xl">
              <h2 className="text-3xl md:text-6xl font-semibold text-[#001A3D] display-font leading-tight">Meet Our <br /><span className="text-[#0171c1]">Consultants.</span></h2>
              <div className="w-20 h-1 bg-[#0171c1]"></div>
              <p className="text-lg text-gray-500 font-medium leading-relaxed">
                Direct access to world-class expertise. Our global network of consultants provides the specific domain knowledge required for your most complex assignments.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 max-w-sm">
               <div className="flex gap-4 items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#0171c1]/10 flex items-center justify-center">
                    <CheckCircle2 className="text-[#0171c1] w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-[#001A3D] text-sm uppercase tracking-wide">Deployment Models</h4>
               </div>
               <p className="text-xs text-gray-400 font-medium leading-relaxed mb-4">Available for full-time consulting, dedicated fractional assignments, or project-specific advisory roles.</p>
               <Link href="/contact" className="text-[10px] font-bold text-[#0171c1] uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-4 transition-all">
                  Inquire Now <MoveRight size={14} />
               </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {CONSULTANTS.map((consultant, i) => (
              <Motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 5) * 0.1 }}
                className="group relative"
              >
                <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-4 relative">
                  <ImageWithFallback 
                    src={consultant.img} 
                    alt={consultant.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-[10px] text-white font-bold uppercase tracking-widest">{consultant.skills}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-[#001A3D] text-sm leading-tight">{consultant.name}</h4>
                  <p className="text-[#0171c1] text-[10px] font-bold uppercase tracking-wider">{consultant.role}</p>
                  <p className="text-gray-400 text-[10px] font-medium">{consultant.exp} Experience</p>
                </div>
              </Motion.div>
            ))}
          </div>

          <div className="mt-20 p-10 bg-[#001A3D] rounded-[2rem] text-center space-y-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <Briefcase size={120} className="text-white" />
             </div>
             <h3 className="text-2xl md:text-3xl font-bold text-white display-font relative z-10">Scale Your Leadership Bench</h3>
             <p className="text-gray-400 max-w-2xl mx-auto font-medium text-sm relative z-10">
                Hire our consultants for <strong>Full-Time</strong> engagements or <strong>Fractional</strong> assignments to bridge leadership gaps, lead high-stakes transformations, or provide on-demand technical strategy.
             </p>
             <div className="relative z-10">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-3 bg-[#0171c1] text-white px-10 py-5 font-bold uppercase tracking-wider text-[11px] hover:bg-white hover:text-[#001A3D] transition-all duration-500 rounded-sm"
                >
                  Hire a Consultant <MoveRight className="w-4 h-4" />
                </Link>
             </div>
          </div>
        </div>
      </section>

      {/* Human Side Section */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1 order-2 lg:order-1 relative">
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                     <ImageWithFallback src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400" className="w-full aspect-[3/4] object-cover rounded-2xl" />
                     <ImageWithFallback src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400" className="w-full aspect-square object-cover rounded-2xl" />
                  </div>
                  <div className="space-y-4 mt-12">
                     <ImageWithFallback src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400" className="w-full aspect-square object-cover rounded-2xl" />
                     <ImageWithFallback src="https://images.unsplash.com/photo-1560250094-0b91f9971660?auto=format&fit=crop&q=80&w=400" className="w-full aspect-[3/4] object-cover rounded-2xl" />
                  </div>
               </div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-xl border border-white/20 p-8 text-center rounded-full shadow-2xl hidden xl:block">
                  <Users size={48} className="text-[#0171c1] mx-auto" />
               </div>
            </div>
            <div className="flex-1 order-1 lg:order-2 space-y-10">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font leading-tight">
                  Our People: Diverse <br />
                  <span className="text-[#0171c1]">Consulting Expertise.</span>
                </h2>
                <div className="w-20 h-1 bg-[#0171c1]"></div>
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  Our consultants are our greatest asset. They come from multi-disciplinary backgrounds—including management consulting, research science, specialized engineering, and high-growth startups—bringing a unique perspective to every engagement.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                 {CONSULTANT_EXPERIENCE.map((exp, i) => (
                   <div key={i} className="space-y-3">
                      <div className="text-[#0171c1] font-bold text-sm tracking-widest uppercase">0{i+1}. {exp.title}</div>
                      <p className="text-sm text-gray-400 font-medium leading-relaxed">{exp.text}</p>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#001A3D] text-white relative">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 text-center relative z-10">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto space-y-10"
          >
            <h2 className="text-4xl md:text-7xl font-bold display-font leading-[1.1]">
              High-Tier Consultants <br />
              Bringing <span className="text-[#0171c1]">Direct Solutions.</span>
            </h2>
            <p className="text-xl text-gray-400 font-medium">
              Don't settle for high-level concepts. Partner with Hutech's lead consultants for actionable strategy that drives tangible business outcomes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center gap-3 bg-[#0171c1] text-white px-12 py-6 font-bold uppercase tracking-wider text-[12px] hover:bg-white hover:text-[#001A3D] transition-all duration-500 rounded-sm shadow-2xl"
              >
                Contact Our Lead Consultants <MessagesSquare className="w-5 h-5" />
              </Link>
            </div>
          </Motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#0171c1]/5 blur-[100px] -ml-32 -mt-32 rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0171c1]/5 blur-[120px] -mr-48 -mb-48 rounded-full"></div>
      </section>
    </div>
  );
}
