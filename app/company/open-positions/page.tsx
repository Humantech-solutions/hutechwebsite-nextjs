"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { Meta } from "@/components/Meta";
import Link from "next/link";

const JOBS = [
  { id: "devops-engineer", title: "Senior Cloud Architect", location: "Bangalore, India", type: "Full-time", tags: ["AWS", "Azure", "Cloud"] },
  { id: "ai-solutions-architect", title: "AI/ML Engineer", location: "London, UK", type: "Remote", tags: ["Python", "PyTorch", "NLP"] },
  { id: "product-designer", title: "Product Designer", location: "San Jose, CA", type: "Hybrid", tags: ["Figma", "UI/UX", "SaaS"] },
  { id: "full-stack-dev", title: "SRE Lead", location: "Singapore", type: "Full-time", tags: ["Kubernetes", "Terraform", "Go"] }
];

export default function OpenPositions() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta 
        title="Open Positions | Hutech Solutions"
        description="Explore active job opportunities and join the engineering excellence hub at Hutech Solutions."
      />
      <Breadcrumbs variant="light" />
      <section className="bg-[#001A3D] text-white h-[450px] relative flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920" 
            alt="Careers at Hutech" 
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
              <span className="text-[#FFAF2B] font-bold uppercase tracking-[0.3em] text-[10px]">Career Opportunities</span>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight display-font mb-8">
              Join Our <br /> 
              <span className="text-[#FFAF2B]">Excellence Hub.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed">
              Explore high-impact roles in engineering, consulting, and global delivery. Shape the future of digital transformation with us.
            </p>
          </Motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="space-y-6">
            {JOBS.map((job, i) => (
              <Link key={job.id} href={`/careers/${job.id}`} className="block">
                <div className="p-6 md:p-8 rounded-[1.5rem] bg-gray-50 border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center group hover:bg-white hover:shadow-2xl transition-all cursor-pointer">
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      {job.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-[#FFAF2B] bg-[#FFAF2B]/10 px-2 py-1 rounded-sm">{tag}</span>
                      ))}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#001A3D] display-font group-hover:text-[#FFAF2B] transition-colors">{job.title}</h3>
                    <div className="flex items-center gap-6 text-gray-400 font-semibold text-xs">
                      <span className="flex items-center gap-2"><MapPin size={14} /> {job.location}</span>
                      <span className="flex items-center gap-2"><Clock size={14} /> {job.type}</span>
                    </div>
                  </div>
                  <div className="mt-6 md:mt-0 p-4 rounded-xl bg-white border border-gray-100 group-hover:bg-[#FFAF2B] transition-all">
                    <ArrowRight size={20} className="text-[#001A3D]" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
