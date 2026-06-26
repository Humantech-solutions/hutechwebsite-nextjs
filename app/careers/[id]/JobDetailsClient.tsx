"use client";

import { useState, useRef, useEffect } from "react";
import { motion as Motion } from "motion/react";
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
  Link as LinkIcon,
  Twitter,
  Facebook,
  Linkedin,
  Check,
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Link from "next/link";
import { Job } from "@/lib/data/careers";
import { ApplicationModal } from "@/components/ApplicationModal";
import { renderTitle } from "@/lib/utils";

export default function JobDetailsClient({ job }: { job: Job }) {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  // Close share dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setIsShareOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pageUrl = typeof window !== "undefined" ? window.location.href.replace(window.location.origin, 'https://hutechsolutions.ai') : "";
  const pageTitle = job.title;

  function handleCopyLink() {
    navigator.clipboard.writeText(pageUrl).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsShareOpen(false);
      }, 1500);
    });
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: pageTitle, url: pageUrl }).catch(() => {});
    } else {
      setIsShareOpen((v) => !v);
    }
  }

  // Split aboutText into paragraphs
  const aboutParagraphs = job.aboutText
    ? job.aboutText.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
    : [];

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

            <div className="pt-10 flex flex-wrap gap-4 items-center">
               <button
                  onClick={() => setIsApplicationModalOpen(true)}
                  className="bg-[#F99D1C] hover:bg-[#ff9d00] text-[#001A3D] px-12 py-5 rounded-sm font-bold transition-all tracking-wide text-xs shadow-xl shadow-[#F99D1C]/20"
               >
                  APPLY FOR THIS ROLE
               </button>

               {/* Share button with dropdown */}
               <div className="relative" ref={shareRef}>
                 <button
                   onClick={handleShare}
                   className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-5 rounded-sm font-bold transition-all tracking-wide text-xs flex items-center gap-2"
                 >
                   <Share2 size={16} /> SHARE
                 </button>

                 {isShareOpen && (
                   <Motion.div
                     initial={{ opacity: 0, y: 8, scale: 0.95 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.95 }}
                     className="absolute left-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 w-52 overflow-hidden"
                   >
                     <a
                       href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                       onClick={() => setIsShareOpen(false)}
                     >
                       <Linkedin size={16} className="text-[#0A66C2]" />
                       Share on LinkedIn
                     </a>
                     <a
                       href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(pageTitle)}&url=${encodeURIComponent(pageUrl)}`}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                       onClick={() => setIsShareOpen(false)}
                     >
                       <Twitter size={16} className="text-[#1DA1F2]" />
                       Share on Twitter
                     </a>
                     <a
                       href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                       onClick={() => setIsShareOpen(false)}
                     >
                       <Facebook size={16} className="text-[#1877F2]" />
                       Share on Facebook
                     </a>
                     <div className="border-t border-gray-100 my-1" />
                     <button
                       onClick={handleCopyLink}
                       className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                     >
                       {copied ? (
                         <>
                           <Check size={16} className="text-green-500" />
                           <span className="text-green-600">Copied!</span>
                         </>
                       ) : (
                         <>
                           <LinkIcon size={16} className="text-gray-400" />
                           Copy Link
                         </>
                       )}
                     </button>
                   </Motion.div>
                 )}
               </div>
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
                <h2 className="text-3xl font-semibold text-[#001A3D] display-font tracking-tight">
                  {renderTitle(job.roleOverviewTitle)}
                </h2>
                <p className="text-lg text-gray-500 leading-relaxed font-medium">
                  {job.desc}
                </p>
              </div>

              {job.whatYoullDo && job.whatYoullDo.length > 0 && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-semibold text-[#001A3D] display-font tracking-tight">
                    {renderTitle(job.whatYoullDoTitle)}
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

              {job.requirements && job.requirements.length > 0 && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-semibold text-[#001A3D] display-font tracking-tight">
                    {renderTitle(job.requirementsTitle)}
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
              )}

              {job.superpowers && job.superpowers.length > 0 && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-semibold text-[#001A3D] display-font tracking-tight">
                    {renderTitle(job.superpowersTitle)}
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

              {job.benefits && job.benefits.length > 0 && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-semibold text-[#001A3D] display-font tracking-tight">
                    {renderTitle(job.benefitsTitle)}
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
              )}

              <div className="space-y-8 p-10 bg-gradient-to-br from-[#001A3D] to-[#002b66] rounded-[2.5rem] text-white">
                <h2 className="text-3xl font-semibold display-font tracking-tight">
                  {renderTitle(job.aboutTitle)}
                </h2>
                <div className="space-y-6 text-gray-300 font-medium leading-relaxed">
                  {aboutParagraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
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
                    <h4 className="font-bold text-[#001A3D] text-sm">{job.hiringTimelineTitle}</h4>
                 </div>
                 <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    {job.hiringTimelineText}
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
