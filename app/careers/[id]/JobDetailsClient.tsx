"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "motion/react";
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
  CalendarCheck,
  X,
  Upload,
  Send
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Link from "next/link";
import { Job } from "@/lib/data/careers";

const BRAND_ORANGE = "#F99D1C";

function ApplicationModal({ isOpen, onClose, jobTitle }: { isOpen: boolean; onClose: () => void; jobTitle: string }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    linkedIn: '',
    resume: null as File | null
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
        <Motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-[#001A3D] rounded-2xl p-8 md:p-12 max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          <div className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-4xl md:text-5xl font-bold text-white display-font">Apply for this role</h2>
              <p className="text-white/60 text-lg">Architect the future with us.</p>
              <div className="text-[#F99D1C] font-bold text-sm tracking-widest uppercase">{jobTitle}</div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <label className="block text-white/40 text-xs font-bold tracking-widest uppercase">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full bg-transparent border-b-2 border-white/20 text-white placeholder-white/30 py-4 px-0 focus:outline-none focus:border-[#F99D1C] transition-colors text-lg"
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <label className="block text-white/40 text-xs font-bold tracking-widest uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full bg-transparent border-b-2 border-white/20 text-white placeholder-white/30 py-4 px-0 focus:outline-none focus:border-[#F99D1C] transition-colors text-lg"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <label className="block text-white/40 text-xs font-bold tracking-widest uppercase">
                  LinkedIn Profile (URL)
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/..."
                  className="w-full bg-transparent border-b-2 border-white/20 text-white placeholder-white/30 py-4 px-0 focus:outline-none focus:border-[#F99D1C] transition-colors text-lg"
                  onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <label className="block text-white/40 text-xs font-bold tracking-widest uppercase">
                  Resume / CV
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="block border-2 border-dashed border-white/20 rounded-lg p-12 text-center cursor-pointer hover:border-[#F99D1C] transition-colors"
                  >
                    <Upload className="mx-auto mb-4 text-white/40" size={40} />
                    <p className="text-white/60 text-sm">
                      {formData.resume ? formData.resume.name : 'PDF, DOCX (Max 5MB)'}
                    </p>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#F99D1C] hover:bg-[#ff9d00] text-[#001A3D] py-5 rounded-lg font-bold transition-all tracking-widest text-sm shadow-xl flex items-center justify-center gap-3"
              >
                SUBMIT APPLICATION <Send size={18} />
              </button>

              <p className="text-white/40 text-xs text-center leading-relaxed">
                By applying, you agree to our recruitment privacy policy. Hutech is an equal opportunity employer.
              </p>
            </form>
          </div>
        </Motion.div>
      </div>
    </AnimatePresence>
  );
}

export default function JobDetailsClient({ job }: { job: Job }) {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

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
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#F99D1C]/20 -skew-x-12 translate-x-1/2"></div>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10 w-full">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <Link href="/careers" className="inline-flex items-center gap-2 text-[#F99D1C] font-semibold text-xs tracking-wide group mb-4">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              BACK TO CAREERS
            </Link>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-3 mb-6">
                {job.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold tracking-widest bg-white/10 text-[#F99D1C] px-3 py-1 rounded-sm border border-[#F99D1C]/30 uppercase">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight display-font max-w-4xl">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-8 text-gray-400 font-semibold text-xs tracking-wide pt-4">
                <span className="flex items-center gap-2"><MapPin size={16} className="text-[#F99D1C]" /> {job.location}</span>
                <span className="flex items-center gap-2"><Briefcase size={16} className="text-[#F99D1C]" /> {job.department}</span>
                <span className="flex items-center gap-2"><Clock size={16} className="text-[#F99D1C]" /> {job.type}</span>
              </div>
            </div>

            <div className="pt-10 flex flex-wrap gap-4">
               <button
                  onClick={() => setIsApplicationModalOpen(true)}
                  className="bg-[#F99D1C] hover:bg-[#ff9d00] text-[#001A3D] px-12 py-5 rounded-sm font-bold transition-all tracking-wide text-xs shadow-xl shadow-[#F99D1C]/20"
               >
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
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-16">
              <div className="space-y-8">
                <h2 className="text-3xl font-semibold text-[#001A3D] display-font tracking-tight">Role Overview</h2>
                <p className="text-lg text-gray-500 leading-relaxed font-medium">
                  {job.desc}
                </p>
              </div>

              {job.whatYoullDo && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-semibold text-[#001A3D] display-font tracking-tight">
                    What You&apos;ll Be <span className="text-[#F99D1C]">Doing</span>
                  </h2>
                  <ul className="space-y-6">
                    {job.whatYoullDo.map((item, i) => (
                      <li key={i} className="flex gap-4">
                        <div className="shrink-0 mt-1">
                          <CheckCircle2 size={20} className="text-[#F99D1C]" />
                        </div>
                        <span className="text-gray-500 font-medium leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-8">
                <h2 className="text-3xl font-semibold text-[#001A3D] display-font tracking-tight">
                  Tech Stack Matchmaker – <span className="text-[#F99D1C]">Is This You?</span>
                </h2>
                <ul className="space-y-6">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="shrink-0 mt-1">
                        <CheckCircle2 size={20} className="text-[#F99D1C]" />
                      </div>
                      <span className="text-gray-500 font-medium leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {job.superpowers && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-semibold text-[#001A3D] display-font tracking-tight">
                    Your <span className="text-[#F99D1C]">Superpowers:</span>
                  </h2>
                  <ul className="space-y-6">
                    {job.superpowers.map((power, i) => (
                      <li key={i} className="flex gap-4">
                        <div className="shrink-0 mt-1">
                          <Zap size={20} className="text-[#F99D1C]" />
                        </div>
                        <span className="text-gray-500 font-medium leading-relaxed">{power}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-8">
                <h2 className="text-3xl font-semibold text-[#001A3D] display-font tracking-tight">
                  What&apos;s In It <span className="text-[#F99D1C]">For You?</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {job.benefits.map((benefit, i) => (
                    <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-start gap-4">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <ShieldCheck size={18} className="text-[#F99D1C]" />
                      </div>
                      <p className="text-sm text-gray-600 font-semibold leading-relaxed">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8 p-10 bg-gradient-to-br from-[#001A3D] to-[#002b66] rounded-[2.5rem] text-white">
                <h2 className="text-3xl font-semibold display-font tracking-tight">
                  About <span className="text-[#F99D1C]">Hutech Solutions</span>
                </h2>
                <div className="space-y-6 text-gray-300 font-medium leading-relaxed">
                  <p>
                    Hutech Solutions is a global software powerhouse at the forefront of the AI revolution. As a leading innovator in Artificial Intelligence, Agentic AI, and Deep Learning technologies, we design and deliver next-generation solutions that empower businesses to unlock transformative intelligence and automation.
                  </p>
                  <p>
                    We are actively partnering with large enterprises and business houses to reimagine and transform enterprise software applications. Our mission is to develop innovative software utilities that accelerate business performance by leveraging cutting-edge AI and Generative AI tools and techniques.
                  </p>
                  <p>
                    From streamlining operations in logistics, enhancing customer experiences in eCommerce, to driving intelligent automation in the BFSI sector, Hutech Solutions is a trusted force in modern digital transformation.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
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
                 </div>

                 <button
                    onClick={() => setIsApplicationModalOpen(true)}
                    className="w-full bg-[#001A3D] text-white font-bold py-5 rounded-sm text-xs tracking-wide shadow-2xl hover:bg-[#002b66] transition-all"
                 >
                    START APPLICATION
                 </button>
              </div>

              <div className="p-8 border-2 border-[#F99D1C]/10 rounded-3xl space-y-4">
                 <div className="flex items-center gap-3">
                    <CalendarCheck className="text-[#F99D1C]" size={20} />
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

      <ApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        jobTitle={job.title}
      />
    </div>
  );
}
