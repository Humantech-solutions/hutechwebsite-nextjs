"use client";

import { useState } from "react";
import { motion as Motion } from "motion/react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import {
  Briefcase,
  MapPin,
  Award,
  Globe2,
  Clock,
  ChevronRight,
  ShieldCheck,
  Zap,
  Cpu,
  Smile,
  GraduationCap,
  CalendarCheck,
  MoveRight,
  TrendingUp,
  Users,
  Heart,
  Lightbulb,
  BookOpen,
  Cloud,
} from "lucide-react";
import Link from "next/link";
import { Job, HIRING_PROCESS } from "@/lib/data/careers";
import { ApplicationModal } from "@/components/ApplicationModal";
import { DownloadFormModal } from "@/components/DownloadFormModal";
import { renderTitle } from "@/lib/utils";

interface CareersClientProps {
  jobs: Job[];
  pageData: {
    heroBgImg: string;
    heroTagline: string;
    heroTitle: string;
    heroDesc: string;
    openingsTagline: string;
    openingsTitle: string;
    openingsNoJobsTitle: string;
    openingsNoJobsDesc: string;
    openingsGenBtn: string;
    cultureTagline: string;
    cultureTitle: string;
    cultureDesc: string;
    cultureImg: string;
    cultureStat1Val: string;
    cultureStat1Label: string;
    cultureStat2Val: string;
    cultureStat2Label: string;
    cultureBadge1: string;
    cultureBadge2: string;
    hiringTagline: string;
    hiringDesc: string;
    hiringSteps: { stepNumber: string; stepTitle: string; stepDesc: string }[];
    benefitsTagline: string;
    benefitsTitle: string;
    benefitsDesc: string;
    benefitsMainTitle: string;
    benefitsMainDesc: string;
    benefitsGrid: { benefitTitle: string; benefitDesc: string }[];
    internshipTagline: string;
    internshipTitle: string;
    internshipDesc: string;
    internshipImg: string;
    internshipBadge1: string;
    internshipBadge2: string;
    internshipBtn1: string;
    internshipBtn1Link: string;
    internshipBtn2: string;
    internshipBtn2File: string;
    internshipPrograms: { programTitle: string; programDuration: string }[];
    whyTagline: string;
    whyTitle: string;
    whyPoints: { pointNumber: string; pointTitle: string }[];
    ctaTitle: string;
    ctaDesc: string;
    ctaCard1Title: string;
    ctaCard1Desc: string;
    ctaCard2Title: string;
    ctaCard2Desc: string;
  };
}

const BRAND_ORANGE = "#F99D1C";

export default function CareersClient({ jobs, pageData }: CareersClientProps) {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState("General Application");
  const [activeDepartment, setActiveDepartment] = useState("All Categories");

  const departments = ["All Categories", ...Array.from(new Set(jobs.map(j => j.department).filter(Boolean)))];

  const filteredJobs = jobs.filter((job) => {
    return activeDepartment === "All Categories" || job.department === activeDepartment;
  });

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <section className="bg-[#001A3D] text-white h-[300px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={pageData.heroBgImg}
            alt="Careers Hero"
            className="w-full h-full object-cover opacity-20 scale-105 brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D]/95 via-[#001A3D]/70 to-transparent"></div>
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-[#F99D1C] to-transparent opacity-90"></div>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10 w-full">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl space-y-3 md:space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="block w-6 md:w-8 h-[2px] bg-[#F99D1C] shrink-0"></span>
              <span className="text-[#F99D1C] text-[11px] md:text-[12px] font-semibold tracking-wide uppercase">
                {pageData.heroTagline}
              </span>
            </div>

            <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight display-font">
              {renderTitle(pageData.heroTitle)}
            </h1>

            <p className="text-gray-200 text-sm md:text-lg font-medium max-w-2xl leading-relaxed opacity-90">
              {pageData.heroDesc}
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="openings" className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <span className="w-12 h-[1px] bg-[#F99D1C]"></span>
                <span className="text-[#F99D1C] font-semibold tracking-wide text-[11px]">{pageData.openingsTagline}</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#001A3D] tracking-tight leading-tight display-font whitespace-pre-line">
                {renderTitle(pageData.openingsTitle)}
              </h2>
            </div>
            
            {/* Horizontal Scrollable Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden flex-nowrap max-w-full">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveDepartment(dept)}
                  className={`px-6 py-3 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
                    activeDepartment === dept
                      ? "bg-[#001A3D] text-white shadow-lg"
                      : "bg-[#F8F9FA] text-[#6C757D] hover:bg-gray-200"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="py-20 text-center border border-gray-100 rounded-xl bg-gray-50">
              <p className="text-lg text-gray-500 font-medium">No open positions found in this category.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredJobs.map((job, i) => (
                <Link
                  key={job.id}
                  href={`/careers/${job.id}`}
                  className="block"
                >
                  <Motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="group bg-white p-6 md:p-8 border border-gray-100 hover:border-[#F99D1C] hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-0 bg-[#F99D1C] group-hover:h-full transition-all duration-500"></div>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {job.tags && job.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-semibold tracking-wide bg-gray-100 text-gray-500 px-2 py-1 rounded-sm group-hover:bg-[#F99D1C]/10 group-hover:text-[#001A3D] transition-colors">{tag}</span>
                        ))}
                      </div>
                      <h4 className="text-xl md:text-2xl font-semibold text-[#001A3D] tracking-tight group-hover:text-[#F99D1C] transition-colors display-font">{job.title}</h4>
                      <div className="flex flex-wrap items-center gap-6 text-gray-400 font-semibold text-[11px] tracking-wide">
                        <span className="flex items-center gap-2"><MapPin size={14} className="text-[#F99D1C]" /> {job.location}</span>
                        <span className="flex items-center gap-2"><Briefcase size={14} className="text-[#F99D1C]" /> {job.department}</span>
                        <span className="flex items-center gap-2"><Clock size={14} className="text-[#F99D1C]" /> {job.type}</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 text-[#001A3D] group-hover:bg-[#F99D1C] group-hover:text-[#001A3D] p-4 rounded-xl transition-all duration-500 shrink-0">
                      <MoveRight size={24} />
                    </div>
                  </Motion.div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-16 p-10 bg-[#FAF9F6] border border-gray-100 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <p className="text-lg font-semibold text-[#001A3D] tracking-tight">{pageData.openingsNoJobsTitle}</p>
              <p className="text-sm text-gray-500 font-medium">{pageData.openingsNoJobsDesc}</p>
            </div>
            <button
              onClick={() => {
                setSelectedJobTitle("General Application");
                setIsApplicationModalOpen(true);
              }}
              className="bg-[#001A3D] hover:bg-[#002b66] text-white font-semibold py-4 px-10 rounded-sm text-[11px] tracking-wide transition-all shadow-xl active:scale-95 whitespace-nowrap"
            >
              {pageData.openingsGenBtn}
            </button>
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
                  <span className="text-[#001A3D] font-semibold tracking-wide text-[11px]">{pageData.cultureTagline}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] leading-tight tracking-tight display-font whitespace-pre-line">
                  {renderTitle(pageData.cultureTitle)}
                </h2>
              </div>
              <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-xl whitespace-pre-line">
                {pageData.cultureDesc}
              </p>

              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-2">
                  <div className="text-4xl font-semibold text-[#001A3D]">{pageData.cultureStat1Val}</div>
                  <p className="text-[11px] font-semibold tracking-wide text-gray-400">{pageData.cultureStat1Label}</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-semibold text-[#F99D1C]">{pageData.cultureStat2Val}</div>
                  <p className="text-[11px] font-semibold tracking-wide text-gray-400">{pageData.cultureStat2Label}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 relative w-full">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-3xl rotate-2 relative z-10">
                <ImageWithFallback
                  src={pageData.cultureImg}
                  alt="Team Collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -inset-6 bg-[#F99D1C]/10 rounded-[4rem] -z-10 -rotate-2"></div>
              <div className="absolute -bottom-10 -left-10 bg-[#001A3D] p-8 rounded-3xl shadow-2xl z-20 hidden md:block border-4 border-white">
                <div className="flex items-center gap-4">
                  <Award className="text-[#F99D1C]" size={32} />
                  <div>
                    <p className="text-white font-semibold text-xs tracking-wide">{pageData.cultureBadge1}</p>
                    <p className="text-[#F99D1C] font-semibold text-[11px]">{pageData.cultureBadge2}</p>
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
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font tracking-tight">{renderTitle(pageData.hiringTagline)}</h2>
            <div className="w-16 h-1 bg-[#F99D1C] mx-auto"></div>
            <p className="text-gray-500 font-medium text-sm md:text-base whitespace-pre-line">{pageData.hiringDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {(pageData.hiringSteps?.length > 0 ? pageData.hiringSteps : HIRING_PROCESS.map(s => ({ stepNumber: s.step, stepTitle: s.title, stepDesc: s.desc }))).map((item, idx) => (
              <Motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative group"
              >
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col">
                  <div className="text-4xl font-semibold text-gray-100 group-hover:text-[#F99D1C]/20 transition-colors mb-6 display-font">{item.stepNumber}</div>
                  <h4 className="text-lg font-semibold text-[#001A3D] tracking-tight mb-4 group-hover:text-[#F99D1C] transition-colors display-font">{item.stepTitle}</h4>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed flex-grow">{item.stepDesc}</p>
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
                <div className="text-[#F99D1C] font-semibold tracking-wide text-[11px]">{pageData.benefitsTagline}</div>
                <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] leading-tight tracking-tight display-font whitespace-pre-line">
                  {renderTitle(pageData.benefitsTitle)}
                </h2>
              </div>
              <p className="text-gray-500 font-medium leading-relaxed whitespace-pre-line">
                {pageData.benefitsDesc}
              </p>
              <div className="p-8 bg-[#001A3D] rounded-3xl text-white space-y-4">
                <GraduationCap className="text-[#F99D1C]" size={32} />
                <h4 className="font-semibold text-lg display-font">{pageData.benefitsMainTitle}</h4>
                <p className="text-xs text-gray-400 font-medium leading-relaxed whitespace-pre-line">{pageData.benefitsMainDesc}</p>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {(pageData.benefitsGrid?.length > 0 ? pageData.benefitsGrid : [
                { benefitTitle: "Premium Health", benefitDesc: "Comprehensive insurance for you and your dependents with mental wellness support." },
                { benefitTitle: "Performance Bonus", benefitDesc: "Quarterly rewards based on impact, innovation, and client success metrics." },
                { benefitTitle: "Flexible Work", benefitDesc: "Choose your environment. We support Remote, Hybrid, and In-office models globally." },
                { benefitTitle: "Time to Recharge", benefitDesc: "Generous PTO, sabbatical programs, and 'Innovation Fridays' for your own projects." },
                { benefitTitle: "Modern Stack", benefitDesc: "Access the latest hardware and enterprise software tools to boost your productivity." },
                { benefitTitle: "Global Mobility", benefitDesc: "Opportunities to transfer to our offices across USA, Europe, and Asia Pacific." }
              ]).map((benefit, idx) => {
                const icons = [
                  <ShieldCheck key="1" className="text-blue-500" />,
                  <Zap key="2" className="text-yellow-500" />,
                  <Clock key="3" className="text-green-500" />,
                  <Smile key="4" className="text-orange-500" />,
                  <Cpu key="5" className="text-purple-500" />,
                  <Globe2 key="6" className="text-cyan-500" />
                ];
                return (
                  <div key={idx} className="p-8 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-white hover:border-[#F99D1C]/30 hover:shadow-lg transition-all group">
                    <div className="mb-6 group-hover:scale-110 transition-transform">{icons[idx % icons.length]}</div>
                    <h4 className="text-lg font-semibold text-[#001A3D] display-font tracking-tight mb-2">{benefit.benefitTitle}</h4>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed whitespace-pre-line">{benefit.benefitDesc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Internship Programme */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Image with Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative group overflow-hidden rounded-[2rem] shadow-xl">
              <ImageWithFallback
                src={pageData.internshipImg}
                alt="Internship Programme Campus"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 right-6 bg-[#F99D1C] text-[#001A3D] px-8 py-4 rounded-2xl shadow-xl z-20 text-center font-bold">
              <p className="text-[10px] tracking-widest uppercase mb-1 opacity-90">{pageData.internshipBadge1}</p>
              <p className="text-xl font-extrabold whitespace-nowrap">{pageData.internshipBadge2}</p>
            </div>
          </div>

          {/* Right Column: Content and Cards */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-[#F99D1C]" />
                <span className="text-xs font-bold tracking-widest text-[#F99D1C] uppercase">{pageData.internshipTagline}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] leading-tight tracking-tight display-font whitespace-pre-line">
                {renderTitle(pageData.internshipTitle)}
              </h2>
              <div className="w-16 h-0.5 bg-[#F99D1C] my-6"></div>
            </div>

            <p className="text-gray-500 font-medium leading-relaxed whitespace-pre-line">
              {pageData.internshipDesc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(pageData.internshipPrograms?.length > 0 ? pageData.internshipPrograms : [
                { programTitle: "AI & Data Engineering", programDuration: "12 Weeks" },
                { programTitle: "Cloud Architecture", programDuration: "12 Weeks" },
                { programTitle: "Digital Strategy", programDuration: "10 Weeks" },
                { programTitle: "Product & UX Design", programDuration: "10 Weeks" }
              ]).map((prog, idx) => {
                const icons = [
                  <Zap key="1" className="h-6 w-6" />,
                  <Cloud key="2" className="h-6 w-6" />,
                  <Lightbulb key="3" className="h-6 w-6" />,
                  <BookOpen key="4" className="h-6 w-6" />
                ];
                return (
                  <div key={idx} className="p-5 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-white hover:border-[#F99D1C]/30 hover:shadow-lg transition-all flex items-center gap-4">
                    <div className="flex-shrink-0 p-3 bg-white rounded-xl text-[#F99D1C] shadow-sm">
                      {icons[idx % icons.length]}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#001A3D] text-sm">{prog.programTitle}</h4>
                      <p className="text-xs text-gray-400">{prog.programDuration}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              {pageData.internshipBtn1Link && pageData.internshipBtn1Link !== "#" ? (
                <Link
                  href={pageData.internshipBtn1Link}
                  className="bg-[#001A3D] hover:bg-[#002B66] text-white font-semibold py-4 px-8 rounded-sm text-[11px] tracking-wide transition-all uppercase inline-flex items-center gap-2 shadow-lg active:scale-[0.98]"
                >
                  {pageData.internshipBtn1} <ChevronRight size={14} />
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setSelectedJobTitle("Emerging Talent / Internship Programme");
                    setIsApplicationModalOpen(true);
                  }}
                  className="bg-[#001A3D] hover:bg-[#002B66] text-white font-semibold py-4 px-8 rounded-sm text-[11px] tracking-wide transition-all uppercase inline-flex items-center gap-2 shadow-lg active:scale-[0.98]"
                >
                  {pageData.internshipBtn1} <ChevronRight size={14} />
                </button>
              )}
              
              <button
                onClick={() => setIsDownloadModalOpen(true)}
                className="border border-[#001A3D]/20 hover:border-[#001A3D] text-[#001A3D] font-semibold py-4 px-8 rounded-sm text-[11px] tracking-wide transition-all uppercase inline-flex items-center justify-center active:scale-[0.98]"
              >
                {pageData.internshipBtn2}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Nabhira is Different */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="space-y-4 mb-16 text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3">
              <span className="w-12 h-[1px] bg-[#F99D1C]"></span>
              <span className="text-xs font-bold tracking-widest text-[#F99D1C] uppercase">{pageData.whyTagline}</span>
              <span className="w-12 h-[1px] bg-[#F99D1C]"></span>
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] leading-tight tracking-tight display-font whitespace-pre-line">
              {renderTitle(pageData.whyTitle)}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
            {/* Left Column benefits */}
            <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
              {(pageData.whyPoints?.length > 0 ? pageData.whyPoints.slice(0, Math.ceil(pageData.whyPoints.length/2)) : [
                { pointNumber: "01", pointTitle: "Global Exposure" },
                { pointNumber: "03", pointTitle: "World-Class Mentorship" },
                { pointNumber: "05", pointTitle: "Inclusive Culture" }
              ]).map((point, idx) => {
                const icons = [
                  <Globe2 key="1" className="h-5 w-5" />,
                  <Users key="2" className="h-5 w-5" />,
                  <Heart key="3" className="h-5 w-5" />,
                ];
                return (
                  <div key={idx} className="group flex items-center justify-between py-6 cursor-pointer hover:pl-2 transition-all">
                    <div className="flex items-center gap-6">
                      <span className="text-xs font-bold text-[#F99D1C] tracking-wider">{point.pointNumber}</span>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#001A3D] text-white shadow-md group-hover:bg-[#F99D1C] group-hover:text-[#001A3D] transition-colors">
                        {icons[idx % icons.length]}
                      </div>
                      <span className="font-semibold text-lg text-[#001A3D] group-hover:text-[#F99D1C] transition-colors">{point.pointTitle}</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-[#F99D1C] group-hover:translate-x-1 transition-all" />
                  </div>
                );
              })}
            </div>

            {/* Right Column benefits */}
            <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
              {(pageData.whyPoints?.length > 0 ? pageData.whyPoints.slice(Math.ceil(pageData.whyPoints.length/2)) : [
                { pointNumber: "02", pointTitle: "Accelerated Growth" },
                { pointNumber: "04", pointTitle: "Certified Excellence" },
                { pointNumber: "06", pointTitle: "Innovation Time" }
              ]).map((point, idx) => {
                const icons = [
                  <TrendingUp key="1" className="h-5 w-5" />,
                  <Award key="2" className="h-5 w-5" />,
                  <Lightbulb key="3" className="h-5 w-5" />,
                ];
                return (
                  <div key={idx} className="group flex items-center justify-between py-6 cursor-pointer hover:pl-2 transition-all">
                    <div className="flex items-center gap-6">
                      <span className="text-xs font-bold text-[#F99D1C] tracking-wider">{point.pointNumber}</span>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#001A3D] text-white shadow-md group-hover:bg-[#F99D1C] group-hover:text-[#001A3D] transition-colors">
                        {icons[idx % icons.length]}
                      </div>
                      <span className="font-semibold text-lg text-[#001A3D] group-hover:text-[#F99D1C] transition-colors">{point.pointTitle}</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-[#F99D1C] group-hover:translate-x-1 transition-all" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 text-center space-y-12">
          <div className="space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font tracking-tight leading-tight whitespace-pre-line">
              {renderTitle(pageData.ctaTitle)}
            </h2>
            <p className="text-gray-500 font-medium leading-relaxed whitespace-pre-line">
              {pageData.ctaDesc}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full md:w-auto">
              <CalendarCheck className="text-[#F99D1C]" size={24} />
              <div className="text-left">
                <p className="text-[11px] font-semibold tracking-wide text-[#001A3D]">{pageData.ctaCard1Title}</p>
                <p className="text-xs text-gray-500 font-medium">{pageData.ctaCard1Desc}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full md:w-auto">
              <Zap className="text-[#F99D1C]" size={24} />
              <div className="text-left">
                <p className="text-[11px] font-semibold tracking-wide text-[#001A3D]">{pageData.ctaCard2Title}</p>
                <p className="text-xs text-gray-500 font-medium">{pageData.ctaCard2Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        jobTitle={selectedJobTitle}
      />
      
      <DownloadFormModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        documentTitle="Hutech Careers Brochure"
        downloadUrl={pageData.internshipBtn2File || "#"}
      />
    </div>
  );
}
