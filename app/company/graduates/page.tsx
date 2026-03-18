"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { 
  GraduationCap, 
  Rocket, 
  Zap, 
  Heart, 
  Play, 
  ArrowUpRight, 
  CheckCircle2, 
  Users, 
  Code, 
  Cpu, 
  Globe,
  School,
  Presentation,
  Handshake,
  Briefcase
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Graduates() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data: any) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Form Data:", data);
    toast.success("Application submitted successfully! Our team will contact you soon.");
    reset();
  };

  const workshops = [
    {
      title: "Cloud Native Architecture",
      category: "Technical Workshop",
      duration: "3 Days Intensive",
      image: "https://images.unsplash.com/photo-1623121608226-ca93dec4d94e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "Hands-on session with AWS & Azure experts on building resilient microservices."
    },
    {
      title: "Modern AI/ML Integration",
      category: "Engineering Series",
      duration: "Weekly Sessions",
      image: "https://images.unsplash.com/photo-1758691736067-b309ee3ef7b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "Exploring the practical applications of Large Language Models in corporate workflows."
    },
    {
      title: "Leadership & Agile Delivery",
      category: "Professional Growth",
      duration: "2 Days Seminar",
      image: "https://images.unsplash.com/photo-1757143137392-0b1e1a27a7de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "Bridging the gap between engineering excellence and project management."
    }
  ];

  const galleryImages = [
    { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", title: "Team Whiteboard Session", span: "md:col-span-2 md:row-span-2" },
    { url: "https://images.unsplash.com/photo-1517245315842-ac63459c55b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", title: "Hutech Hackathon 2025", span: "md:col-span-1 md:row-span-1" },
    { url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", title: "Global Delivery Office", span: "md:col-span-1 md:row-span-2" },
    { url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", title: "Interactive Workshop", span: "md:col-span-1 md:row-span-1" },
    { url: "https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", title: "Graduation Celebration", span: "md:col-span-2 md:row-span-1" },
  ];

  const milestones = [
    { phase: "Phase 01", title: "Onboarding & Foundation", content: "Immersion into Hutech's culture, core engineering principles, and the global delivery model.", icon: <Users size={24} /> },
    { phase: "Phase 02", title: "Tech Intensive Training", content: "Deep dives into specialized tracks: Cloud Architecture, AI/ML, or Cybersecurity.", icon: <Code size={24} /> },
    { phase: "Phase 03", title: "Shadowing & Real Projects", content: "Working alongside senior consultants on live client engagements across international markets.", icon: <Globe size={24} /> },
    { phase: "Phase 04", title: "Autonomy & Graduation", content: "Owning critical project components and successfully transitioning to full consultant roles.", icon: <Cpu size={24} /> },
  ];

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta 
        title="Graduates Program | Hutech Solutions"
        description="Start your career journey with Hutech Solutions. Our graduate program is designed to nurture the next generation of tech leaders."
      />
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="bg-[#001A3D] text-white h-[450px] relative flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920" 
            alt="Hutech Graduates Program" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/80 to-transparent"></div>
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10 text-left w-full">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[1px] bg-[#FFAF2B]"></span>
              <span className="text-[#FFAF2B] font-bold uppercase tracking-[0.3em] text-[10px]">Early Careers</span>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight display-font mb-8">
              The Hutech <br /> 
              <span className="text-[#FFAF2B]">Graduates Program.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed mb-10">
              Nurturing the next generation of tech leaders. Start your professional journey with world-class mentorship and hands-on engineering experience.
            </p>
            <button 
              onClick={() => document.getElementById('apply-now')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#FFAF2B] text-[#001A3D] px-12 py-5 rounded-sm font-black uppercase tracking-widest text-[11px] hover:bg-white transition-all duration-500"
            >
              Apply for 2026 Cohort
            </button>
          </Motion.div>
        </div>
      </section>

      {/* Program Pillars Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
            <div className="space-y-6 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#001A3D] display-font tracking-tight leading-tight">
                Your 12-Month <span className="text-[#0171c1]">Professional Evolution</span>
              </h2>
              <p className="text-gray-500 font-medium text-lg leading-relaxed">
                The Hutech Academy isn't just a training program—it's an intensive immersion into the world of elite engineering and high-stakes consulting.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((item, i) => (
              <Motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-gray-50 border border-gray-100 rounded-[2rem] hover:bg-white hover:shadow-2xl hover:border-[#0171c1]/20 transition-all duration-500 group relative"
              >
                <div className="mb-8 p-4 bg-white rounded-2xl w-fit shadow-sm text-[#0171c1] group-hover:bg-[#0171c1] group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>
                <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FFAF2B] block">{item.phase}</span>
                  <h3 className="text-xl font-bold text-[#001A3D] display-font leading-tight">{item.title}</h3>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.content}</p>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Series */}
      <section className="py-24 bg-[#001A3D] text-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
            <div className="space-y-4">
              <span className="text-[#FFAF2B] font-bold uppercase tracking-[0.2em] text-[11px]">Knowledge Transfer</span>
              <h2 className="text-3xl md:text-5xl font-semibold display-font leading-tight">Workshop Highlights</h2>
            </div>
            <button className="flex items-center gap-4 bg-white/10 hover:bg-[#FFAF2B] hover:text-[#001A3D] px-10 py-5 font-bold uppercase tracking-widest text-[11px] transition-all rounded-sm border border-white/10">
              View All Sessions <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {workshops.map((ws, i) => (
              <Motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative"
              >
                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden relative mb-8">
                  <ImageWithFallback 
                    src={ws.image} 
                    alt={ws.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D] via-[#001A3D]/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
                  
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#001A3D] shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 cursor-pointer">
                    <Play size={24} fill="currentColor" />
                  </div>
                  
                  <div className="absolute bottom-8 left-8 right-8">
                    <span className="inline-block px-3 py-1 bg-[#FFAF2B] text-[#001A3D] text-[10px] font-black uppercase tracking-widest rounded-full mb-3">
                      {ws.category}
                    </span>
                    <h3 className="text-2xl font-bold display-font text-white">{ws.title}</h3>
                  </div>
                </div>
                <div className="px-4 space-y-3">
                  <div className="flex items-center gap-2 text-[#FFAF2B] text-xs font-bold uppercase tracking-widest">
                    <CheckCircle2 size={14} /> {ws.duration}
                  </div>
                  <p className="text-gray-400 font-medium text-sm leading-relaxed">
                    {ws.description}
                  </p>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Partnerships */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#0171c1]/10 rounded-full text-[#0171c1]">
                <School size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Academic Liaison</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font leading-tight">
                Institutional <br /> <span className="text-[#0171c1]">Collaboration.</span>
              </h2>
              <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-xl">
                We partner with leading colleges and universities worldwide to bridge the gap between academic theory and high-tier engineering practice.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                {[
                  { icon: <Presentation size={20} />, title: "Workshops", desc: "Expert-led technical seminars and hands-on bootcamps." },
                  { icon: <Zap size={20} />, title: "Internships", desc: "Real-world project exposure for high-performing students." },
                  { icon: <Briefcase size={20} />, title: "Placements", desc: "Campus recruitment drives for our global delivery units." },
                  { icon: <Handshake size={20} />, title: "MOUs", desc: "Strategic long-term partnerships for R&D and curriculum." }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="text-[#0171c1]">{item.icon}</div>
                    <h4 className="text-sm font-bold text-[#001A3D] uppercase tracking-wider">{item.title}</h4>
                    <p className="text-xs text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-xl border border-gray-100">
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Institution Name</label>
                  <input 
                    placeholder="University of Technology"
                    className="w-full bg-gray-50 border border-gray-200 rounded-sm px-4 py-4 text-[#001A3D] placeholder-gray-300 focus:outline-none focus:border-[#0171c1] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Contact Person / Designation</label>
                  <input 
                    placeholder="Head of Placements / Dean"
                    className="w-full bg-gray-50 border border-gray-200 rounded-sm px-4 py-4 text-[#001A3D] placeholder-gray-300 focus:outline-none focus:border-[#0171c1] transition-all"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email ID</label>
                    <input 
                      type="email"
                      placeholder="dean@university.edu"
                      className="w-full bg-gray-50 border border-gray-200 rounded-sm px-4 py-4 text-[#001A3D] placeholder-gray-300 focus:outline-none focus:border-[#0171c1] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Phone Number</label>
                    <input 
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-gray-50 border border-gray-200 rounded-sm px-4 py-4 text-[#001A3D] placeholder-gray-300 focus:outline-none focus:border-[#0171c1] transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Collaboration Type</label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-sm px-4 py-4 text-gray-400 focus:outline-none focus:border-[#0171c1] transition-all appearance-none">
                    <option>Select Purpose</option>
                    <option>Technical Workshop</option>
                    <option>Internship Program</option>
                    <option>Campus Placement</option>
                    <option>Strategic MOU</option>
                  </select>
                </div>
                <button 
                  type="button"
                  onClick={() => toast.success("Partnership request sent. Our Academic Liaison will contact you.")}
                  className="w-full bg-[#001A3D] text-white py-5 rounded-sm font-black uppercase tracking-widest text-xs hover:bg-[#0171c1] transition-all duration-500"
                >
                  Initiate Partnership
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Gallery */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font tracking-tight">The Experience Gallery</h2>
            <p className="text-gray-500 font-medium text-lg max-w-3xl mx-auto">
              A look inside the life of our graduates—from whiteboard battles to milestone celebrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {galleryImages.map((img, i) => (
              <Motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${img.span} relative group rounded-[2.5rem] overflow-hidden bg-gray-100 min-h-[300px]`}
              >
                <ImageWithFallback 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#001A3D]/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                  <p className="text-white font-bold text-sm tracking-widest uppercase">{img.title}</p>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply-now" className="pb-32 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="bg-[#001A3D] rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#0171c1]/20 rounded-full blur-[100px] -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFAF2B]/10 rounded-full blur-[100px] -ml-48 -mb-48"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8 text-left">
                <div className="inline-flex p-4 bg-white/5 rounded-full text-[#FFAF2B]">
                  <Rocket size={32} />
                </div>
                <h2 className="text-3xl md:text-5xl font-semibold text-white display-font leading-[1.1]">
                  Launch Your Career <br /> with <span className="text-[#FFAF2B]">Global Reach.</span>
                </h2>
                <p className="text-lg text-white/50 font-medium leading-relaxed max-w-lg">
                  Applications for the Summer 2026 cohort are now open. Join a culture of engineering excellence and start your journey with world-class mentorship.
                </p>
                
                <div className="space-y-4 pt-4">
                  {[
                    "Global Delivery Exposure",
                    "Mentor-led Engineering Projects",
                    "Direct Client Engagement",
                    "Continuous Upskilling Path"
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-white/80 font-medium text-sm">
                      <CheckCircle2 size={16} className="text-[#FFAF2B]" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <h3 className="text-2xl font-bold text-white display-font mb-8">Join the Cohort</h3>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#FFAF2B]">Full Name</label>
                    <input 
                      {...register("fullName", { required: true })}
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#0171c1] transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#FFAF2B]">Email Address</label>
                    <input 
                      {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                      placeholder="john@example.com"
                      type="email"
                      className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#0171c1] transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#FFAF2B]">Graduation Year</label>
                    <select 
                      {...register("gradYear", { required: true })}
                      className="w-full bg-[#001A3D] border border-white/10 rounded-sm px-4 py-4 text-white/50 focus:outline-none focus:border-[#0171c1] transition-all appearance-none"
                    >
                      <option value="">Select Year</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026 (Expected)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#FFAF2B]">Core Interest</label>
                    <select 
                      {...register("interest", { required: true })}
                      className="w-full bg-[#001A3D] border border-white/10 rounded-sm px-4 py-4 text-white/50 focus:outline-none focus:border-[#0171c1] transition-all appearance-none"
                    >
                      <option value="">Select Specialization</option>
                      <option value="cloud">Cloud Architecture</option>
                      <option value="ai">AI/ML Engineering</option>
                      <option value="devops">DevOps & Automation</option>
                      <option value="consulting">Business Consulting</option>
                    </select>
                  </div>

                  <div className="pt-4">
                    <button 
                      disabled={isSubmitting}
                      className="w-full bg-[#FFAF2B] text-[#001A3D] py-5 rounded-sm font-black uppercase tracking-widest text-xs hover:bg-white transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? "Processing..." : "Submit Application"}
                      {!isSubmitting && <ArrowUpRight size={16} />}
                    </button>
                    <p className="text-[10px] text-white/30 text-center mt-6 uppercase tracking-widest font-medium">
                      By submitting, you agree to our data policy.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
