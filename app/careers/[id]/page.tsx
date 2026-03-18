"use client";

import { motion as Motion } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowLeft, 
  Share2, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  Globe2,
  CalendarCheck
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const JOBS = [
  {
    id: "full-stack-dev",
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Bangalore, India",
    type: "Full-time",
    tags: ["React", "Node.js", "TypeScript"],
    desc: "We are seeking a high-caliber Senior Full Stack Developer to lead the architecture and development of our next-generation enterprise platforms. You will work in an agile environment, collaborating with cross-functional teams to deliver scalable, performant, and secure solutions.",
    requirements: [
      "8+ years of experience in full-stack development with a focus on React and Node.js.",
      "Expertise in TypeScript and modern architectural patterns (Microservices, Event-driven).",
      "Strong understanding of AWS/Azure cloud infrastructure and CI/CD pipelines.",
      "Proven track record of mentoring junior engineers and leading complex technical projects.",
      "Bachelor's or Master's degree in Computer Science or a related field."
    ],
    benefits: [
      "Competitive salary and equity options.",
      "Comprehensive global health insurance.",
      "Annual learning and development budget of $5,000.",
      "Flexible working arrangements (Remote/Hybrid).",
      "Regular team retreats and innovation hackathons."
    ]
  },
  {
    id: "ai-solutions-architect",
    title: "AI/ML Solutions Architect",
    department: "Digital Innovation",
    location: "San Francisco, CA",
    type: "Remote",
    tags: ["Python", "PyTorch", "OpenAI"],
    desc: "Join our Digital Innovation Hub to architect AI-driven solutions that solve complex business challenges for global Fortune 500 clients. You will be at the forefront of the generative AI revolution, designing systems that are robust, ethical, and scalable.",
    requirements: [
      "Deep expertise in Python, PyTorch/TensorFlow, and Large Language Models (LLMs).",
      "Experience designing and deploying ML models in production environments.",
      "Strong grasp of data engineering principles and vector databases.",
      "Ability to translate complex business requirements into technical AI architectures.",
      "A passion for staying ahead of the curve in the rapidly evolving AI landscape."
    ],
    benefits: [
      "Access to state-of-the-art AI research and compute resources.",
      "Opportunity to work on high-impact projects with global visibility.",
      "Generous performance bonuses and innovation incentives.",
      "Unlimited PTO and wellness programs.",
      "Relocation assistance for key tech hubs if preferred."
    ]
  },
  {
    id: "devops-engineer",
    title: "DevOps & SRE Engineer",
    department: "Infrastructure",
    location: "London, UK",
    type: "Hybrid",
    tags: ["AWS", "Kubernetes", "Terraform"],
    desc: "We are looking for a Site Reliability Engineer who is passionate about automation, scalability, and system resilience. You will be responsible for building and maintaining the infrastructure that powers our global operations, ensuring 99.99% uptime and seamless deployments.",
    requirements: [
      "5+ years of experience in DevOps or Site Reliability Engineering.",
      "Mastery of Kubernetes, Docker, and Infrastructure as Code (Terraform/CloudFormation).",
      "Strong scripting skills in Go, Python, or Bash.",
      "Experience with monitoring and observability stacks (Prometheus, Grafana, ELK).",
      "Knowledge of security best practices and compliance frameworks (SOC2, ISO27001)."
    ],
    benefits: [
      "High-performance workstation and home office setup allowance.",
      "Opportunity to work with the latest cloud-native technologies.",
      "Structured career progression and leadership training.",
      "Global mobility options across Hutech's international offices.",
      "Subsidized gym memberships and mental health support."
    ]
  },
  {
    id: "product-designer",
    title: "UI/UX Product Designer",
    department: "Design Hub",
    location: "Berlin, Germany",
    type: "Full-time",
    tags: ["Figma", "Design Systems", "Prototyping"],
    desc: "As a Product Designer at Hutech, you will shape the user experience of enterprise applications used by millions. You'll work closely with product managers and engineers to create intuitive, accessible, and visually stunning interfaces that solve real user problems.",
    requirements: [
      "Portfolio demonstrating exceptional UI/UX skills for complex SaaS or enterprise tools.",
      "Proficiency in Figma, FigJam, and advanced prototyping tools (Protopie/Framer).",
      "Deep understanding of design systems and how to scale them globally.",
      "Ability to conduct user research and translate insights into design solutions.",
      "Strong communication skills to articulate design decisions to stakeholders."
    ],
    benefits: [
      "Work in a design-led culture with direct impact on product vision.",
      "Access to the latest design tools and resources.",
      "Collaborative environment with world-class designers and engineers.",
      "Personalized growth plan and mentorship.",
      "Health and wellness allowance."
    ]
  },
  {
    id: "biz-dev-mgr",
    title: "Business Development Manager",
    department: "Sales & Strategy",
    location: "Singapore",
    type: "Full-time",
    tags: ["Enterprise Sales", "Strategic Partnerships"],
    desc: "Drive the growth of Hutech Solutions in the APAC region. We're looking for a strategic thinker and relationship builder who can identify new opportunities, forge long-term partnerships, and help our clients navigate their digital transformation journeys.",
    requirements: [
      "Proven track record in enterprise software or technology consulting sales.",
      "Strong network within the APAC business community, particularly in BFSI or Logistics.",
      "Ability to understand and articulate complex technical value propositions.",
      "Experience in managing long and complex sales cycles at the C-suite level.",
      "Exceptional negotiation and presentation skills."
    ],
    benefits: [
      "Highly competitive commission structure with uncapped earning potential.",
      "Opportunity to build and lead the regional sales team.",
      "Strategic involvement in Hutech's global expansion plans.",
      "Premium travel allowances and client engagement budget.",
      "Comprehensive executive health and insurance benefits."
    ]
  }
];

export default function JobDetails() {
  const params = useParams();
  const id = params?.id as string;
  const job = JOBS.find(j => j.id === id);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold text-[#001A3D] display-font">Job Not Found</h2>
          <p className="text-gray-500">The position you're looking for might have been filled or the link is incorrect.</p>
          <Link href="/careers" className="inline-block bg-[#001A3D] text-white px-8 py-4 rounded-sm font-bold text-xs tracking-wide">
            View All Openings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta 
        title={`${job.title} | Careers | Hutech Solutions`}
        description={`Join Hutech Solutions as a ${job.title}. ${job.desc.substring(0, 150)}...`}
      />
      <Breadcrumbs variant="light" />
      
      {/* Hero Section */}
      <section className="bg-[#001A3D] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#FFAF2B]/20 -skew-x-12 translate-x-1/2"></div>
        </div>
        
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10 w-full">
          <Motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <Link href="/careers" className="inline-flex items-center gap-2 text-[#FFAF2B] font-semibold text-xs tracking-wide group mb-4">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              BACK TO CAREERS
            </Link>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3 mb-6">
                {job.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold tracking-widest bg-white/10 text-[#FFAF2B] px-3 py-1 rounded-sm border border-[#FFAF2B]/30 uppercase">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight display-font max-w-4xl">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-8 text-gray-400 font-semibold text-xs tracking-wide pt-4">
                <span className="flex items-center gap-2"><MapPin size={16} className="text-[#FFAF2B]" /> {job.location}</span>
                <span className="flex items-center gap-2"><Briefcase size={16} className="text-[#FFAF2B]" /> {job.department}</span>
                <span className="flex items-center gap-2"><Clock size={16} className="text-[#FFAF2B]" /> {job.type}</span>
              </div>
            </div>

            <div className="pt-10 flex flex-wrap gap-4">
               <button className="bg-[#FFAF2B] hover:bg-[#ff9d00] text-[#001A3D] px-12 py-5 rounded-sm font-bold transition-all tracking-wide text-xs shadow-xl shadow-[#FFAF2B]/20">
                  APPLY FOR THIS ROLE
               </button>
               <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-5 rounded-sm font-bold transition-all tracking-wide text-xs flex items-center gap-2">
                  <Share2 size={16} /> SHARE
               </button>
            </div>
          </Motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Left Column: Details */}
            <div className="lg:col-span-8 space-y-16">
              <div className="space-y-8">
                <h2 className="text-3xl font-semibold text-[#001A3D] display-font tracking-tight">Role Overview</h2>
                <p className="text-lg text-gray-500 leading-relaxed font-medium">
                  {job.desc}
                </p>
              </div>

              <div className="space-y-8">
                <h2 className="text-3xl font-semibold text-[#001A3D] display-font tracking-tight">Key Requirements</h2>
                <ul className="space-y-6">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="shrink-0 mt-1">
                        <CheckCircle2 size={20} className="text-[#FFAF2B]" />
                      </div>
                      <span className="text-gray-500 font-medium leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-8">
                <h2 className="text-3xl font-semibold text-[#001A3D] display-font tracking-tight">Why Hutech? (Benefits)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {job.benefits.map((benefit, i) => (
                    <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-start gap-4">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <ShieldCheck size={18} className="text-[#FFAF2B]" />
                      </div>
                      <p className="text-sm text-gray-600 font-semibold leading-relaxed">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-10 border-t border-gray-100 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-[#001A3D]">
                       <Cpu size={24} />
                    </div>
                    <div>
                       <p className="text-sm font-bold text-[#001A3D]">Hiring Manager</p>
                       <p className="text-[11px] text-gray-400 font-semibold tracking-wide uppercase">Technical Recruitment Hub</p>
                    </div>
                 </div>
                 <button className="text-[#001A3D] font-bold text-xs tracking-wide underline underline-offset-4 decoration-[#FFAF2B] decoration-2">
                    Ask a question
                 </button>
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-4 space-y-10">
              <div className="bg-[#FAF9F6] p-10 rounded-[2.5rem] border border-gray-100 space-y-8 sticky top-32">
                 <h3 className="text-xl font-bold text-[#001A3D] display-font">Quick Facts</h3>
                 <div className="space-y-6">
                    <div className="flex items-center justify-between py-4 border-b border-gray-200/50">
                       <span className="text-xs font-semibold text-gray-400 tracking-wide">DEPARTMENT</span>
                       <span className="text-xs font-bold text-[#001A3D]">{job.department}</span>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b border-gray-200/50">
                       <span className="text-xs font-semibold text-gray-400 tracking-wide">LOCATION</span>
                       <span className="text-xs font-bold text-[#001A3D]">{job.location}</span>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b border-gray-200/50">
                       <span className="text-xs font-semibold text-gray-400 tracking-wide">WORK TYPE</span>
                       <span className="text-xs font-bold text-[#001A3D]">{job.type}</span>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b border-gray-200/50">
                       <span className="text-xs font-semibold text-gray-400 tracking-wide">REPORTS TO</span>
                       <span className="text-xs font-bold text-[#001A3D]">Director of {job.department}</span>
                    </div>
                 </div>
                 
                 <div className="space-y-4 pt-4">
                    <p className="text-[11px] font-bold text-[#001A3D] tracking-widest uppercase">TRUSTED BY INNOVATORS</p>
                    <div className="flex flex-wrap gap-4 opacity-30">
                       <Globe2 size={24} />
                       <Zap size={24} />
                       <ShieldCheck size={24} />
                       <Cpu size={24} />
                    </div>
                 </div>

                 <button className="w-full bg-[#001A3D] text-white font-bold py-5 rounded-sm text-xs tracking-wide shadow-2xl hover:bg-[#002b66] transition-all">
                    START APPLICATION
                 </button>
              </div>
              
              <div className="p-8 border-2 border-[#FFAF2B]/10 rounded-3xl space-y-4">
                 <div className="flex items-center gap-3">
                    <CalendarCheck className="text-[#FFAF2B]" size={20} />
                    <h4 className="font-bold text-[#001A3D] text-sm">Hiring Timeline</h4>
                 </div>
                 <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    This is an active opening. Our team typically responds to qualified applicants within 48-72 business hours.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
         <div className="max-w-[1280px] mx-auto px-6 lg:px-20 text-center space-y-8">
            <h2 className="text-3xl font-semibold text-[#001A3D] display-font tracking-tight">Not the right fit?</h2>
            <p className="text-gray-500 max-w-xl mx-auto font-medium">Explore our other opportunities or sign up for our talent network to be the first to know about new roles.</p>
            <div className="flex justify-center gap-6">
               <Link href="/careers" className="text-[#001A3D] font-bold text-xs tracking-wide uppercase border-b-2 border-[#FFAF2B] pb-1">
                  Browse All Roles
               </Link>
               <Link href="/contact" className="text-[#001A3D] font-bold text-xs tracking-wide uppercase border-b-2 border-[#FFAF2B] pb-1">
                  Talent Pool
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
}
