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

  const departments = [
    "All Categories",
    ...Array.from(new Set(jobs.map((j) => j.department).filter(Boolean))),
  ];

  const filteredJobs = jobs.filter((job) => {
    return activeDepartment === "All Categories" || job.department === activeDepartment;
  });

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <section className="relative flex h-[300px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={pageData.heroBgImg}
            alt="Careers Hero"
            className="h-full w-full scale-105 object-cover opacity-20 brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D]/95 via-[#001A3D]/70 to-transparent"></div>
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-[#F99D1C] to-transparent opacity-90"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-20">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl space-y-3 md:space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="block h-[2px] w-6 shrink-0 bg-[#F99D1C] md:w-8"></span>
              <span className="text-[11px] font-semibold uppercase tracking-wide text-[#F99D1C] md:text-[12px]">
                {pageData.heroTagline}
              </span>
            </div>

            <h1 className="display-font text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              {renderTitle(pageData.heroTitle)}
            </h1>

            <p className="max-w-2xl text-sm font-medium leading-relaxed text-gray-200 opacity-90 md:text-lg">
              {pageData.heroDesc}
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="openings" className="bg-white py-[50px]">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <span className="h-[1px] w-12 bg-[#F99D1C]"></span>
                <span className="text-[11px] font-semibold tracking-wide text-[#F99D1C]">
                  {pageData.openingsTagline}
                </span>
              </div>
              <h2 className="display-font whitespace-pre-line text-4xl font-semibold leading-tight tracking-tight text-[#001A3D] md:text-5xl lg:text-6xl">
                {renderTitle(pageData.openingsTitle)}
              </h2>
            </div>

            {/* Horizontal Scrollable Tabs */}
            <div className="flex max-w-full flex-nowrap items-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveDepartment(dept)}
                  className={`shrink-0 whitespace-nowrap rounded-md px-6 py-3 text-xs font-semibold transition-all ${
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
            <div className="rounded-xl border border-gray-100 bg-gray-50 py-[50px] text-center">
              <p className="text-lg font-medium text-gray-500">
                No open positions found in this category.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredJobs.map((job, i) => (
                <Link key={job.id} href={`/careers/${job.id}`} className="block">
                  <Motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="group relative flex cursor-pointer flex-col justify-between gap-6 overflow-hidden border border-gray-100 bg-white p-6 transition-all duration-500 hover:border-[#F99D1C] hover:shadow-2xl md:flex-row md:items-center md:p-8"
                  >
                    <div className="absolute left-0 top-0 h-0 w-1 bg-[#F99D1C] transition-all duration-500 group-hover:h-full"></div>
                    <div className="space-y-3">
                      <div className="mb-2 flex flex-wrap gap-2">
                        {job.tags &&
                          job.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-sm bg-gray-100 px-2 py-1 text-[10px] font-semibold tracking-wide text-gray-500 transition-colors group-hover:bg-[#F99D1C]/10 group-hover:text-[#001A3D]"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                      <h4 className="display-font text-xl font-semibold tracking-tight text-[#001A3D] transition-colors group-hover:text-[#F99D1C] md:text-2xl">
                        {job.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-6 text-[11px] font-semibold tracking-wide text-gray-400">
                        <span className="flex items-center gap-2">
                          <MapPin size={14} className="text-[#F99D1C]" /> {job.location}
                        </span>
                        <span className="flex items-center gap-2">
                          <Briefcase size={14} className="text-[#F99D1C]" /> {job.department}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock size={14} className="text-[#F99D1C]" /> {job.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 rounded-[15px] bg-[#F99D1C] px-5 py-3 text-xs font-bold tracking-wide text-[#001A3D] transition-all duration-500 group-hover:bg-[#001A3D] group-hover:text-[#F99D1C] md:rounded-xl">
                      Apply Now <MoveRight size={16} />
                    </div>
                  </Motion.div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-16 flex flex-col items-center justify-between gap-8 rounded-3xl border border-gray-100 bg-[#FAF9F6] p-10 md:flex-row">
            <div className="space-y-2 text-center md:text-left">
              <p className="text-lg font-semibold tracking-tight text-[#001A3D]">
                {pageData.openingsNoJobsTitle}
              </p>
              <p className="text-sm font-medium text-gray-500">{pageData.openingsNoJobsDesc}</p>
            </div>
            <button
              onClick={() => {
                setSelectedJobTitle("General Application");
                setIsApplicationModalOpen(true);
              }}
              className="whitespace-nowrap rounded-sm bg-[#001A3D] px-10 py-4 text-[11px] font-semibold tracking-wide text-white shadow-xl transition-all hover:bg-[#002b66] active:scale-95"
            >
              {pageData.openingsGenBtn}
            </button>
          </div>
        </div>
      </section>

      {/* Culture & Spirit */}
      <section className="relative bg-white py-[50px]">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex flex-col items-center gap-20 lg:flex-row">
            <div className="flex-1 space-y-10">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <span className="h-[1px] w-12 bg-[#001A3D]"></span>
                  <span className="text-[11px] font-semibold tracking-wide text-[#001A3D]">
                    {pageData.cultureTagline}
                  </span>
                </div>
                <h2 className="display-font whitespace-pre-line text-3xl font-semibold leading-tight tracking-tight text-[#001A3D] md:text-5xl">
                  {renderTitle(pageData.cultureTitle)}
                </h2>
              </div>
              <p className="max-w-xl whitespace-pre-line text-lg font-medium leading-relaxed text-gray-500">
                {pageData.cultureDesc}
              </p>

              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-2">
                  <div className="text-4xl font-semibold text-[#001A3D]">
                    {pageData.cultureStat1Val}
                  </div>
                  <p className="text-[11px] font-semibold tracking-wide text-gray-400">
                    {pageData.cultureStat1Label}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-semibold text-[#F99D1C]">
                    {pageData.cultureStat2Val}
                  </div>
                  <p className="text-[11px] font-semibold tracking-wide text-gray-400">
                    {pageData.cultureStat2Label}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative w-full flex-1">
              <div className="shadow-3xl relative z-10 aspect-[4/3] rotate-2 overflow-hidden rounded-[15px] lg:rounded-[3rem]">
                <ImageWithFallback
                  src={pageData.cultureImg}
                  alt="Team Collaboration"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -inset-6 -z-10 -rotate-2 rounded-[4rem] bg-[#F99D1C]/10"></div>
              <div className="absolute -bottom-10 -left-10 z-20 hidden rounded-3xl border-4 border-white bg-[#001A3D] p-8 shadow-2xl md:block">
                <div className="flex items-center gap-4">
                  <Award className="text-[#F99D1C]" size={32} />
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-white">
                      {pageData.cultureBadge1}
                    </p>
                    <p className="text-[11px] font-semibold text-[#F99D1C]">
                      {pageData.cultureBadge2}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="border-y border-gray-100 bg-[#FAF9F6] py-[50px]">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mx-auto mb-20 max-w-3xl space-y-4 text-center">
            <h2 className="display-font text-3xl font-semibold tracking-tight text-[#001A3D] md:text-5xl">
              {renderTitle(pageData.hiringTagline)}
            </h2>
            <div className="mx-auto h-1 w-16 bg-[#F99D1C]"></div>
            <p className="whitespace-pre-line text-sm font-medium text-gray-500 md:text-base">
              {pageData.hiringDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
            {(pageData.hiringSteps?.length > 0
              ? pageData.hiringSteps
              : HIRING_PROCESS.map((s) => ({
                  stepNumber: s.step,
                  stepTitle: s.title,
                  stepDesc: s.desc,
                }))
            ).map((item, idx) => (
              <Motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                <div className="flex h-full flex-col rounded-[15px] border border-gray-100 bg-white p-8 shadow-sm transition-all duration-500 hover:shadow-xl md:rounded-3xl">
                  <div className="display-font mb-6 text-4xl font-semibold text-gray-100 transition-colors group-hover:text-[#F99D1C]/20">
                    {item.stepNumber}
                  </div>
                  <h4 className="display-font mb-4 text-lg font-semibold tracking-tight text-[#001A3D] transition-colors group-hover:text-[#F99D1C]">
                    {item.stepTitle}
                  </h4>
                  <p className="flex-grow text-xs font-medium leading-relaxed text-gray-500">
                    {item.stepDesc}
                  </p>
                </div>
                {idx < 4 && (
                  <div className="absolute -right-4 top-1/2 z-20 hidden translate-x-1/2 md:block">
                    <ChevronRight className="text-gray-200" size={24} />
                  </div>
                )}
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-[50px]">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-20 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-4">
              <div className="space-y-4">
                <div className="text-[11px] font-semibold tracking-wide text-[#F99D1C]">
                  {pageData.benefitsTagline}
                </div>
                <h2 className="display-font whitespace-pre-line text-3xl font-semibold leading-tight tracking-tight text-[#001A3D] md:text-5xl">
                  {renderTitle(pageData.benefitsTitle)}
                </h2>
              </div>
              <p className="whitespace-pre-line font-medium leading-relaxed text-gray-500">
                {pageData.benefitsDesc}
              </p>
              <div className="space-y-4 rounded-3xl bg-[#001A3D] p-8 text-white">
                <GraduationCap className="text-[#F99D1C]" size={32} />
                <h4 className="display-font text-lg font-semibold">{pageData.benefitsMainTitle}</h4>
                <p className="whitespace-pre-line text-xs font-medium leading-relaxed text-gray-400">
                  {pageData.benefitsMainDesc}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-8">
              {(pageData.benefitsGrid?.length > 0
                ? pageData.benefitsGrid
                : [
                    {
                      benefitTitle: "Premium Health",
                      benefitDesc:
                        "Comprehensive insurance for you and your dependents with mental wellness support.",
                    },
                    {
                      benefitTitle: "Performance Bonus",
                      benefitDesc:
                        "Quarterly rewards based on impact, innovation, and client success metrics.",
                    },
                    {
                      benefitTitle: "Flexible Work",
                      benefitDesc:
                        "Choose your environment. We support Remote, Hybrid, and In-office models globally.",
                    },
                    {
                      benefitTitle: "Time to Recharge",
                      benefitDesc:
                        "Generous PTO, sabbatical programs, and 'Innovation Fridays' for your own projects.",
                    },
                    {
                      benefitTitle: "Modern Stack",
                      benefitDesc:
                        "Access the latest hardware and enterprise software tools to boost your productivity.",
                    },
                    {
                      benefitTitle: "Global Mobility",
                      benefitDesc:
                        "Opportunities to transfer to our offices across USA, Europe, and Asia Pacific.",
                    },
                  ]
              ).map((benefit, idx) => {
                const icons = [
                  <ShieldCheck key="1" className="text-blue-500" />,
                  <Zap key="2" className="text-yellow-500" />,
                  <Clock key="3" className="text-green-500" />,
                  <Smile key="4" className="text-orange-500" />,
                  <Cpu key="5" className="text-purple-500" />,
                  <Globe2 key="6" className="text-cyan-500" />,
                ];
                return (
                  <div
                    key={idx}
                    className="group rounded-[15px] border border-gray-100 bg-gray-50 p-8 transition-all hover:border-[#F99D1C]/30 hover:bg-white hover:shadow-lg md:rounded-2xl"
                  >
                    <div className="mb-6 transition-transform group-hover:scale-110">
                      {icons[idx % icons.length]}
                    </div>
                    <h4 className="display-font mb-2 text-lg font-semibold tracking-tight text-[#001A3D]">
                      {benefit.benefitTitle}
                    </h4>
                    <p className="whitespace-pre-line text-xs font-medium leading-relaxed text-gray-500">
                      {benefit.benefitDesc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Internship Programme */}
      <section className="border-t border-gray-100 bg-white py-[50px]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-12 lg:px-20">
          {/* Left Column: Image with Badge */}
          <div className="relative lg:col-span-5">
            <div className="group relative overflow-hidden rounded-[15px] shadow-xl lg:rounded-[2rem]">
              <ImageWithFallback
                src={pageData.internshipImg}
                alt="Internship Programme Campus"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 right-6 z-20 rounded-2xl bg-[#F99D1C] px-8 py-4 text-center font-bold text-[#001A3D] shadow-xl">
              <p className="mb-1 text-[10px] uppercase tracking-widest opacity-90">
                {pageData.internshipBadge1}
              </p>
              <p className="whitespace-nowrap text-xl font-extrabold">
                {pageData.internshipBadge2}
              </p>
            </div>
          </div>

          {/* Right Column: Content and Cards */}
          <div className="space-y-8 lg:col-span-7">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-[#F99D1C]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#F99D1C]">
                  {pageData.internshipTagline}
                </span>
              </div>
              <h2 className="display-font whitespace-pre-line text-3xl font-semibold leading-tight tracking-tight text-[#001A3D] md:text-5xl">
                {renderTitle(pageData.internshipTitle)}
              </h2>
              <div className="my-6 h-0.5 w-16 bg-[#F99D1C]"></div>
            </div>

            <p className="whitespace-pre-line font-medium leading-relaxed text-gray-500">
              {pageData.internshipDesc}
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {(pageData.internshipPrograms?.length > 0
                ? pageData.internshipPrograms
                : [
                    { programTitle: "AI & Data Engineering", programDuration: "12 Weeks" },
                    { programTitle: "Cloud Architecture", programDuration: "12 Weeks" },
                    { programTitle: "Digital Strategy", programDuration: "10 Weeks" },
                    { programTitle: "Product & UX Design", programDuration: "10 Weeks" },
                  ]
              ).map((prog, idx) => {
                const icons = [
                  <Zap key="1" className="h-6 w-6" />,
                  <Cloud key="2" className="h-6 w-6" />,
                  <Lightbulb key="3" className="h-6 w-6" />,
                  <BookOpen key="4" className="h-6 w-6" />,
                ];
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-4 rounded-[15px] border border-gray-100 bg-gray-50 p-5 transition-all hover:border-[#F99D1C]/30 hover:bg-white hover:shadow-lg md:rounded-2xl"
                  >
                    <div className="flex-shrink-0 rounded-xl bg-white p-3 text-[#F99D1C] shadow-sm">
                      {icons[idx % icons.length]}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#001A3D]">{prog.programTitle}</h4>
                      <p className="text-xs text-gray-400">{prog.programDuration}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex w-full flex-row gap-3 pt-4">
              {pageData.internshipBtn1Link && pageData.internshipBtn1Link !== "#" ? (
                <Link
                  href={pageData.internshipBtn1Link}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#001A3D] px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:bg-[#002B66] active:scale-[0.98]"
                >
                  {pageData.internshipBtn1} <ChevronRight size={14} />
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setSelectedJobTitle("Emerging Talent / Internship Programme");
                    setIsApplicationModalOpen(true);
                  }}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#001A3D] px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:bg-[#002B66] active:scale-[0.98]"
                >
                  {pageData.internshipBtn1} <ChevronRight size={14} />
                </button>
              )}
              <button
                onClick={() => setIsDownloadModalOpen(true)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-[#001A3D]/30 bg-white px-6 py-4 text-center text-[11px] font-bold uppercase tracking-widest text-[#001A3D] transition-all hover:border-[#001A3D] active:scale-[0.98]"
              >
                {pageData.internshipBtn2}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Nabhira is Different */}
      <section className="border-b border-t border-gray-100 bg-gray-50 py-[50px]">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-[1px] w-12 bg-[#F99D1C]"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#F99D1C]">
                {pageData.whyTagline}
              </span>
              <span className="h-[1px] w-12 bg-[#F99D1C]"></span>
            </div>
            <h2 className="display-font whitespace-pre-line text-3xl font-semibold leading-tight tracking-tight text-[#001A3D] md:text-5xl">
              {renderTitle(pageData.whyTitle)}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-x-16 gap-y-0 md:grid-cols-2">
            {/* Left Column benefits */}
            <div className="divide-y divide-gray-100 border-b border-t border-gray-100">
              {(pageData.whyPoints?.length > 0
                ? pageData.whyPoints.slice(0, Math.ceil(pageData.whyPoints.length / 2))
                : [
                    { pointNumber: "01", pointTitle: "Global Exposure" },
                    { pointNumber: "03", pointTitle: "World-Class Mentorship" },
                    { pointNumber: "05", pointTitle: "Inclusive Culture" },
                  ]
              ).map((point, idx) => {
                const icons = [
                  <Globe2 key="1" className="h-5 w-5" />,
                  <Users key="2" className="h-5 w-5" />,
                  <Heart key="3" className="h-5 w-5" />,
                ];
                return (
                  <div
                    key={idx}
                    className="group flex cursor-pointer items-center justify-between py-6 transition-all hover:pl-2"
                  >
                    <div className="flex items-center gap-6">
                      <span className="text-xs font-bold tracking-wider text-[#F99D1C]">
                        {point.pointNumber}
                      </span>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#001A3D] text-white shadow-md transition-colors group-hover:bg-[#F99D1C] group-hover:text-[#001A3D]">
                        {icons[idx % icons.length]}
                      </div>
                      <span className="text-lg font-semibold text-[#001A3D] transition-colors group-hover:text-[#F99D1C]">
                        {point.pointTitle}
                      </span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-[#F99D1C]" />
                  </div>
                );
              })}
            </div>

            {/* Right Column benefits */}
            <div className="divide-y divide-gray-100 border-b border-t border-gray-100">
              {(pageData.whyPoints?.length > 0
                ? pageData.whyPoints.slice(Math.ceil(pageData.whyPoints.length / 2))
                : [
                    { pointNumber: "02", pointTitle: "Accelerated Growth" },
                    { pointNumber: "04", pointTitle: "Certified Excellence" },
                    { pointNumber: "06", pointTitle: "Innovation Time" },
                  ]
              ).map((point, idx) => {
                const icons = [
                  <TrendingUp key="1" className="h-5 w-5" />,
                  <Award key="2" className="h-5 w-5" />,
                  <Lightbulb key="3" className="h-5 w-5" />,
                ];
                return (
                  <div
                    key={idx}
                    className="group flex cursor-pointer items-center justify-between py-6 transition-all hover:pl-2"
                  >
                    <div className="flex items-center gap-6">
                      <span className="text-xs font-bold tracking-wider text-[#F99D1C]">
                        {point.pointNumber}
                      </span>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#001A3D] text-white shadow-md transition-colors group-hover:bg-[#F99D1C] group-hover:text-[#001A3D]">
                        {icons[idx % icons.length]}
                      </div>
                      <span className="text-lg font-semibold text-[#001A3D] transition-colors group-hover:text-[#F99D1C]">
                        {point.pointTitle}
                      </span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-[#F99D1C]" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-gray-100 bg-gray-50 py-[50px]">
        <div className="mx-auto max-w-[1280px] space-y-12 px-6 text-center lg:px-20">
          <div className="mx-auto max-w-2xl space-y-6">
            <h2 className="display-font whitespace-pre-line text-3xl font-semibold leading-tight tracking-tight text-[#001A3D] md:text-5xl">
              {renderTitle(pageData.ctaTitle)}
            </h2>
            <p className="whitespace-pre-line font-medium leading-relaxed text-gray-500">
              {pageData.ctaDesc}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex w-full items-center gap-4 rounded-[15px] border border-gray-100 bg-white p-6 shadow-sm md:w-auto md:rounded-2xl">
              <CalendarCheck className="text-[#F99D1C]" size={24} />
              <div className="text-left">
                <p className="text-[11px] font-semibold tracking-wide text-[#001A3D]">
                  {pageData.ctaCard1Title}
                </p>
                <p className="text-xs font-medium text-gray-500">{pageData.ctaCard1Desc}</p>
              </div>
            </div>
            <div className="flex w-full items-center gap-4 rounded-[15px] border border-gray-100 bg-white p-6 shadow-sm md:w-auto md:rounded-2xl">
              <Zap className="text-[#F99D1C]" size={24} />
              <div className="text-left">
                <p className="text-[11px] font-semibold tracking-wide text-[#001A3D]">
                  {pageData.ctaCard2Title}
                </p>
                <p className="text-xs font-medium text-gray-500">{pageData.ctaCard2Desc}</p>
              </div>
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-md flex-row gap-3 pt-2">
            <button
              onClick={() => {
                setSelectedJobTitle("General Application");
                setIsApplicationModalOpen(true);
              }}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#F99D1C] px-6 py-4 text-sm font-bold tracking-wide text-[#001A3D] shadow-lg transition-all hover:bg-[#e08a10] active:scale-95"
            >
              Apply Now <MoveRight size={16} />
            </button>
            <Link
              href="#"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-[#001A3D] bg-white px-6 py-4 text-center text-sm font-bold tracking-wide text-[#001A3D] transition-all hover:bg-[#001A3D] hover:text-white"
            >
              Download Brochure
            </Link>
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
