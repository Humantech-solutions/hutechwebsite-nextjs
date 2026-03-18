"use client";

import { motion as Motion } from "framer-motion";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { 
  Briefcase, 
  MapPin, 
  Users, 
  Award, 
  Heart, 
  Rocket, 
  MoveRight, 
  Star, 
  Globe2, 
  Clock, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Cpu,
  Smile,
  GraduationCap,
  CalendarCheck
} from "lucide-react";
import Link from "next/link";
import { Meta } from "@/components/Meta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BRAND_ORANGE = "#FFAF2B";
const BRAND_BLUE = "#001A3D";

const OPEN_POSITIONS = [
  {
    id: "full-stack-dev",
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Bangalore, India",
    type: "Full-time",
    tags: ["React", "Node.js", "TypeScript"]
  },
  {
    id: "ai-solutions-architect",
    title: "AI/ML Solutions Architect",
    department: "Digital Innovation",
    location: "San Francisco, CA",
    type: "Remote",
    tags: ["Python", "PyTorch", "OpenAI"]
  },
  {
    id: "devops-engineer",
    title: "DevOps & SRE Engineer",
    department: "Infrastructure",
    location: "London, UK",
    type: "Hybrid",
    tags: ["AWS", "Kubernetes", "Terraform"]
  },
  {
    id: "product-designer",
    title: "UI/UX Product Designer",
    department: "Design Hub",
    location: "Berlin, Germany",
    type: "Full-time",
    tags: ["Figma", "Design Systems", "Prototyping"]
  },
  {
    id: "biz-dev-mgr",
    title: "Business Development Manager",
    department: "Sales & Strategy",
    location: "Singapore",
    type: "Full-time",
    tags: ["Enterprise Sales", "Strategic Partnerships"]
  }
];

const HIRING_PROCESS = [
  { step: "01", title: "Application Submission", desc: "Submit your profile via our portal. Our talent scouts review every single application manually." },
  { step: "02", title: "Screening Interview", desc: "A brief conversation with our recruitment team to align expectations and cultural fitment." },
  { step: "03", title: "Technical Evaluation", desc: "Deep dive into your domain expertise through pair programming or case study discussions." },
  { step: "04", title: "Cultural Fit Round", desc: "Interaction with our leadership team to understand your vision and shared values." },
  { step: "05", title: "Offer & Onboarding", desc: "Welcome to the team! A seamless transition into your new role with a 30-60-90 day plan." }
];

const TESTIMONIALS = [
  {
    name: "Arjun Sharma",
    role: "Engineering Lead",
    text: "At Hutech, Innovation is not just a buzzword; it's our daily culture. We build things that actually move the needle for global enterprises.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Sarah Miller",
    role: "Senior Product Designer",
    text: "The autonomy here is unparalleled. I feel empowered to own my designs from concept to code, working alongside world-class engineers.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Kenji Sato",
    role: "Cloud Architect",
    text: "Working across global hubs has broadened my perspective. The level of collaboration at Hutech is what truly sets us apart.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop"
  }
];

export default function Careers() {
  const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    dotsClass: "slick-dots custom-dots-careers"
  };

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta 
        title="Careers | Hutech Solutions"
        description="Join our talent ecosystem. We're recruiting pioneers to solve complex engineering puzzles and architect the future of digital solutions."
      />
      <Breadcrumbs variant="light" />
      <section className="bg-[#001A3D] text-white h-[300px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1760611656615-db3fad24a314?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Life at Hutech"
            className="w-full h-full object-cover opacity-20 scale-105 brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D]/95 via-[#001A3D]/70 to-transparent"></div>
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-[#FFAF2B] to-transparent opacity-90"></div>
        </div>
        
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10 w-full">
          <Motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl space-y-3 md:space-y-4"
          >
              <div className="flex items-center gap-3">
                <span className="block w-6 md:w-8 h-[2px] bg-[#FFAF2B] shrink-0"></span>
                <span className="text-[#FFAF2B] text-[11px] md:text-[12px] font-semibold tracking-wide uppercase">
                  Join our Talent Ecosystem
                </span>
              </div>

              <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight display-font">
                Build your <span className="text-[#FFAF2B]">Legacy</span> with us.
              </h1>

              <p className="text-gray-200 text-sm md:text-lg font-medium max-w-2xl leading-relaxed opacity-90">
                Recruiting pioneers to solve complex engineering puzzles and architect the future.
              </p>
            </Motion.div>
          </div>
      </section>

      {/* Open Positions - Modern List */}
      <section id="openings" className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <span className="w-12 h-[1px] bg-[#FFAF2B]"></span>
                <span className="text-[#FFAF2B] font-semibold tracking-wide text-[11px]">Open Opportunities</span>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-[#001A3D] tracking-tight leading-tight display-font">
                Join the <br /> Excellence Hub.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
               <button className="px-6 py-3 bg-[#001A3D] text-white text-[11px] font-semibold tracking-wide rounded-sm shadow-lg">All Categories</button>
               <button className="px-6 py-3 bg-gray-50 text-gray-400 text-[11px] font-semibold tracking-wide rounded-sm hover:bg-white border border-gray-100 transition-all">Engineering</button>
               <button className="px-6 py-3 bg-gray-50 text-gray-400 text-[11px] font-semibold tracking-wide rounded-sm hover:bg-white border border-gray-100 transition-all">Design</button>
               <button className="px-6 py-3 bg-gray-50 text-gray-400 text-[11px] font-semibold tracking-wide rounded-sm hover:bg-white border border-gray-100 transition-all">Sales</button>
            </div>
          </div>

          <div className="space-y-6">
             {OPEN_POSITIONS.map((job, i) => (
               <Link 
                key={job.id} 
                href={`/careers/${job.id}`}
                className="block"
               >
                 <Motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-white p-6 md:p-8 border border-gray-100 hover:border-[#FFAF2B] hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer relative overflow-hidden"
                 >
                    <div className="absolute top-0 left-0 w-1 h-0 bg-[#FFAF2B] group-hover:h-full transition-all duration-500"></div>
                    <div className="space-y-3">
                       <div className="flex flex-wrap gap-2">
                          {job.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-semibold tracking-wide bg-gray-100 text-gray-500 px-2 py-1 rounded-sm group-hover:bg-[#FFAF2B]/10 group-hover:text-[#001A3D] transition-colors">{tag}</span>
                          ))}
                       </div>
                       <h4 className="text-xl md:text-2xl font-semibold text-[#001A3D] tracking-tight group-hover:text-[#FFAF2B] transition-colors display-font">{job.title}</h4>
                       <div className="flex flex-wrap items-center gap-6 text-gray-400 font-semibold text-[11px] tracking-wide">
                          <span className="flex items-center gap-2"><MapPin size={12} className="text-[#FFAF2B]" /> {job.location}</span>
                          <span className="flex items-center gap-2"><Briefcase size={12} className="text-[#FFAF2B]" /> {job.department}</span>
                          <span className="flex items-center gap-2"><Clock size={12} className="text-[#FFAF2B]" /> {job.type}</span>
                       </div>
                    </div>
                    <div className="bg-gray-50 group-hover:bg-[#FFAF2B] group-hover:text-[#001A3D] p-4 rounded-xl transition-all duration-500 shrink-0">
                       <MoveRight size={24} />
                    </div>
                 </Motion.div>
               </Link>
             ))}
          </div>
          
          <div className="mt-16 p-10 bg-[#FAF9F6] border border-gray-100 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="space-y-2 text-center md:text-left">
                <p className="text-lg font-semibold text-[#001A3D] tracking-tight">No relevant opening for your skill set?</p>
                <p className="text-sm text-gray-500 font-medium">We're always looking for exceptional talent. Drop your resume in our talent pool.</p>
             </div>
             <Link 
              href="/contact" 
              className="bg-[#001A3D] hover:bg-[#002b66] text-white font-semibold py-4 px-10 rounded-sm text-[11px] tracking-wide transition-all shadow-xl active:scale-95 text-center"
             >
                General Application
             </Link>
          </div>
        </div>
      </section>

      {/* Culture & Spirit */}
      <section className="py-20 bg-white relative">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1 space-y-10">
            <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <span className="w-12 h-[1px] bg-[#001A3D]"></span>
                  <span className="text-[#001A3D] font-semibold tracking-wide text-[11px]">The Hutech Spirit</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] leading-tight tracking-tight display-font">
                  Innovation is <br /> our <span className="text-[#FFAF2B]">North Star.</span>
                </h2>
              </div>
              <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-xl">
                We foster a culture of radical transparency and extreme ownership. Here, your ideas aren't just heard—they are engineered into reality. We believe in high-performance agility balanced with empathy.
              </p>
              
              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-2">
                  <div className="text-4xl font-semibold text-[#001A3D]">92%</div>
                  <p className="text-[11px] font-semibold tracking-wide text-gray-400">Engineering Ratio</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-semibold text-[#FFAF2B]">15+</div>
                  <p className="text-[11px] font-semibold tracking-wide text-gray-400">Global Tech Hubs</p>
                </div>
              </div>
            </div>
            
            <div className="flex-1 relative w-full">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-3xl rotate-2 relative z-10">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1764391801025-9cee2194f564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                  alt="Team Collaboration" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -inset-6 bg-[#FFAF2B]/10 rounded-[4rem] -z-10 -rotate-2"></div>
              <div className="absolute -bottom-10 -left-10 bg-[#001A3D] p-8 rounded-3xl shadow-2xl z-20 hidden md:block border-4 border-white">
                <div className="flex items-center gap-4">
                  <Award className="text-[#FFAF2B]" size={32} />
                  <div>
                    <p className="text-white font-semibold text-xs tracking-wide">Great Place</p>
                    <p className="text-[#FFAF2B] font-semibold text-[11px]">To Work Certified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="py-20 bg-[#FAF9F6] border-y border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font tracking-tight">Our Selection DNA</h2>
            <div className="w-16 h-1 bg-[#FFAF2B] mx-auto"></div>
            <p className="text-gray-500 font-medium text-sm md:text-base">We look for clarity of thought, passion for problem-solving, and a commitment to excellence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {HIRING_PROCESS.map((item, idx) => (
              <Motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative group"
              >
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col">
                  <div className="text-4xl font-semibold text-gray-100 group-hover:text-[#FFAF2B]/20 transition-colors mb-6 display-font">{item.step}</div>
                  <h4 className="text-lg font-semibold text-[#001A3D] tracking-tight mb-4 group-hover:text-[#FFAF2B] transition-colors display-font">{item.title}</h4>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed flex-grow">{item.desc}</p>
                </div>
                {idx < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 translate-x-1/2 z-20">
                    <ChevronRight className="text-gray-200" size={24} />
                  </div>
                )}
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-4 space-y-8">
              <div className="space-y-4">
                <div className="text-[#FFAF2B] font-semibold tracking-wide text-[11px]">Perks & Benefits</div>
                <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] leading-tight tracking-tight display-font">
                  Investing <br /> in your <br /><span className="text-[#FFAF2B]">Success.</span>
                </h2>
              </div>
              <p className="text-gray-500 font-medium leading-relaxed">
                We provide the resources, environment, and support you need to do the best work of your life.
              </p>
              <div className="p-8 bg-[#001A3D] rounded-3xl text-white space-y-4">
                <GraduationCap className="text-[#FFAF2B]" size={32} />
                <h4 className="font-semibold text-lg display-font">Learning Budget</h4>
                <p className="text-xs text-gray-400 font-medium leading-relaxed">$5,000 annual allowance for certifications, conferences, and courses.</p>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: <ShieldCheck className="text-blue-500" />, title: "Premium Health", desc: "Comprehensive insurance for you and your dependents with mental wellness support." },
                { icon: <Zap className="text-yellow-500" />, title: "Performance Bonus", desc: "Quarterly rewards based on impact, innovation, and client success metrics." },
                { icon: <Clock className="text-green-500" />, title: "Flexible Work", desc: "Choose your environment. We support Remote, Hybrid, and In-office models globally." },
                { icon: <Smile className="text-orange-500" />, title: "Time to Recharge", desc: "Generous PTO, sabbatical programs, and 'Innovation Fridays' for your own projects." },
                { icon: <Cpu className="text-purple-500" />, title: "Modern Stack", desc: "Access the latest hardware and enterprise software tools to boost your productivity." },
                { icon: <Globe2 className="text-cyan-500" />, title: "Global Mobility", desc: "Opportunities to transfer to our offices across USA, Europe, and Asia Pacific." }
              ].map((benefit, idx) => (
                <div key={idx} className="p-8 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-white hover:border-[#FFAF2B]/30 hover:shadow-lg transition-all group">
                  <div className="mb-6 group-hover:scale-110 transition-transform">{benefit.icon}</div>
                  <h4 className="text-lg font-semibold text-[#001A3D] display-font tracking-tight mb-2">{benefit.title}</h4>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#001A3D] text-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-8 display-font">Voices From <br /><span className="text-[#FFAF2B]">Within the Lab.</span></h2>
              <Slider {...testimonialSettings}>
                {TESTIMONIALS.map((t, idx) => (
                  <div key={idx} className="outline-none">
                    <div className="space-y-8">
                      <p className="text-xl md:text-2xl font-medium leading-relaxed italic text-gray-300">"{t.text}"</p>
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#FFAF2B]">
                          <ImageWithFallback src={t.image} alt={t.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg text-white display-font">{t.name}</p>
                          <p className="text-[#FFAF2B] font-semibold tracking-wide text-[11px]">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
            <div className="lg:w-1/2 hidden lg:block">
              <div className="relative aspect-square">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1522071823991-b1ae5e6a3048?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                  alt="Company Culture" 
                  className="w-full h-full object-cover rounded-[3rem] opacity-50 grayscale" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D] to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          .custom-dots-careers {
            bottom: -60px !important;
            left: 0 !important;
            text-align: left !important;
            width: auto !important;
          }
          .custom-dots-careers li button:before {
            color: white !important;
            opacity: 0.3 !important;
          }
          .custom-dots-careers li.slick-active button:before {
            color: #FFAF2B !important;
            opacity: 1 !important;
          }
        `}</style>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 text-center space-y-12">
           <div className="space-y-6 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font tracking-tight leading-tight">
                Your Next Chapter <br /> starts <span className="text-[#FFAF2B]">now.</span>
              </h2>
              <p className="text-gray-500 font-medium leading-relaxed">
                Join a global team of visionaries, engineers, and creatives working together to build a more agile and innovative future.
              </p>
           </div>
           
           <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full md:w-auto">
                 <CalendarCheck className="text-[#FFAF2B]" size={24} />
                 <div className="text-left">
                    <p className="text-[11px] font-semibold tracking-wide text-[#001A3D]">Interview Ready?</p>
                    <p className="text-xs text-gray-500 font-medium">Get tips for success</p>
                 </div>
              </div>
              <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full md:w-auto">
                 <Zap className="text-[#FFAF2B]" size={24} />
                 <div className="text-left">
                    <p className="text-[11px] font-semibold tracking-wide text-[#001A3D]">Fast-Track</p>
                    <p className="text-xs text-gray-500 font-medium">Hiring in 14 days</p>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
