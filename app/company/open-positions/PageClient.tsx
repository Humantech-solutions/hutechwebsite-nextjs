"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { Meta } from "@/components/Meta";
import Link from "next/link";

const JOBS = [
  {
    id: "devops-engineer",
    title: "Senior Cloud Architect",
    location: "Bangalore, India",
    type: "Full-time",
    tags: ["AWS", "Azure", "Cloud"],
  },
  {
    id: "ai-solutions-architect",
    title: "AI/ML Engineer",
    location: "London, UK",
    type: "Remote",
    tags: ["Python", "PyTorch", "NLP"],
  },
  {
    id: "product-designer",
    title: "Product Designer",
    location: "San Jose, CA",
    type: "Hybrid",
    tags: ["Figma", "UI/UX", "SaaS"],
  },
  {
    id: "full-stack-dev",
    title: "SRE Lead",
    location: "Singapore",
    type: "Full-time",
    tags: ["Kubernetes", "Terraform", "Go"],
  },
];

export default function OpenPositions() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="Open Positions | Hutech Solutions"
        description="Explore active job opportunities and join the engineering excellence hub at Hutech Solutions."
      />
      <Breadcrumbs variant="light" />
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Careers at Hutech"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/80 to-transparent"></div>
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 text-left lg:px-20">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[1px] w-12 bg-[#F99D1C]"></span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#F99D1C] uppercase">
                Career Opportunities
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              Join Our <br />
              <span className="text-[#F99D1C]">Excellence Hub.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              Explore high-impact roles in engineering, consulting, and global delivery. Shape the
              future of digital transformation with us.
            </p>
          </Motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="space-y-6">
            {JOBS.map((job, i) => (
              <Link key={job.id} href={`/careers/${job.id}`} className="block">
                <div className="group flex cursor-pointer flex-col items-start justify-between rounded-[1.5rem] border border-gray-100 bg-gray-50 p-6 transition-all hover:bg-white hover:shadow-2xl md:flex-row md:items-center md:p-8">
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-sm bg-[#F99D1C]/10 px-2 py-1 text-[10px] font-bold tracking-widest text-[#F99D1C] uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="display-font text-xl font-bold text-[#001A3D] transition-colors group-hover:text-[#F99D1C] md:text-2xl">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-6 text-xs font-semibold text-gray-400">
                      <span className="flex items-center gap-2">
                        <MapPin size={14} /> {job.location}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock size={14} /> {job.type}
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 rounded-xl border border-gray-100 bg-white p-4 transition-all group-hover:bg-[#F99D1C] md:mt-0">
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
