"use client";

import { motion as Motion } from "framer-motion";
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
  CalendarCheck,
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function JobDetailsClient({ job }: { job: any }) {
  if (!job) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white p-6">
        <div className="space-y-6 text-center">
          <h2 className="display-font text-4xl font-bold text-[#001A3D]">Job Not Found</h2>
          <p className="text-gray-500">
            The position you're looking for might have been filled or the link is incorrect.
          </p>
          <Link
            href="/careers"
            className="inline-block rounded-sm bg-[#001A3D] px-8 py-4 text-xs font-bold tracking-wide text-white"
          >
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
      <section className="relative overflow-hidden bg-[#001A3D] py-20 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 h-full w-1/3 translate-x-1/2 -skew-x-12 bg-[#FFAF2B]/20"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-20">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <Link
              href="/careers"
              className="group mb-4 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-[#FFAF2B]"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              BACK TO CAREERS
            </Link>

            <div className="space-y-4">
              <div className="mb-6 flex flex-wrap gap-3">
                {job.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-sm border border-[#FFAF2B]/30 bg-white/10 px-3 py-1 text-[10px] font-bold tracking-widest text-[#FFAF2B] uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="display-font max-w-4xl text-4xl leading-tight font-semibold tracking-tight md:text-6xl">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-8 pt-4 text-xs font-semibold tracking-wide text-gray-400">
                <span className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#FFAF2B]" /> {job.location}
                </span>
                <span className="flex items-center gap-2">
                  <Briefcase size={16} className="text-[#FFAF2B]" /> {job.department}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} className="text-[#FFAF2B]" /> {job.type}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-10">
              <button className="rounded-sm bg-[#FFAF2B] px-12 py-5 text-xs font-bold tracking-wide text-[#001A3D] shadow-xl shadow-[#FFAF2B]/20 transition-all hover:bg-[#ff9d00]">
                APPLY FOR THIS ROLE
              </button>
              <button className="flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-8 py-5 text-xs font-bold tracking-wide text-white transition-all hover:bg-white/10">
                <Share2 size={16} /> SHARE
              </button>
            </div>
          </Motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-20 lg:grid-cols-12">
            {/* Left Column: Details */}
            <div className="space-y-16 lg:col-span-8">
              <div className="space-y-8">
                <h2 className="display-font text-3xl font-semibold tracking-tight text-[#001A3D]">
                  Role Overview
                </h2>
                <p className="text-lg leading-relaxed font-medium text-gray-500">{job.desc}</p>
              </div>

              <div className="space-y-8">
                <h2 className="display-font text-3xl font-semibold tracking-tight text-[#001A3D]">
                  Key Requirements
                </h2>
                <ul className="space-y-6">
                  {job.requirements.map((req: string, i: number) => (
                    <li key={i} className="flex gap-4">
                      <div className="mt-1 shrink-0">
                        <CheckCircle2 size={20} className="text-[#FFAF2B]" />
                      </div>
                      <span className="leading-relaxed font-medium text-gray-500">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-8">
                <h2 className="display-font text-3xl font-semibold tracking-tight text-[#001A3D]">
                  Why Hutech? (Benefits)
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {job.benefits.map((benefit: string, i: number) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-6"
                    >
                      <div className="rounded-lg bg-white p-2 shadow-sm">
                        <ShieldCheck size={18} className="text-[#FFAF2B]" />
                      </div>
                      <p className="text-sm leading-relaxed font-semibold text-gray-600">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 pt-10">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-[#001A3D]">
                    <Cpu size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#001A3D]">Hiring Manager</p>
                    <p className="text-[11px] font-semibold tracking-wide text-gray-400 uppercase">
                      Technical Recruitment Hub
                    </p>
                  </div>
                </div>
                <button className="text-xs font-bold tracking-wide text-[#001A3D] underline decoration-[#FFAF2B] decoration-2 underline-offset-4">
                  Ask a question
                </button>
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="space-y-10 lg:col-span-4">
              <div className="sticky top-32 space-y-8 rounded-[2.5rem] border border-gray-100 bg-[#FAF9F6] p-10">
                <h3 className="display-font text-xl font-bold text-[#001A3D]">Quick Facts</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-200/50 py-4">
                    <span className="text-xs font-semibold tracking-wide text-gray-400">
                      DEPARTMENT
                    </span>
                    <span className="text-xs font-bold text-[#001A3D]">{job.department}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-200/50 py-4">
                    <span className="text-xs font-semibold tracking-wide text-gray-400">
                      LOCATION
                    </span>
                    <span className="text-xs font-bold text-[#001A3D]">{job.location}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-200/50 py-4">
                    <span className="text-xs font-semibold tracking-wide text-gray-400">
                      WORK TYPE
                    </span>
                    <span className="text-xs font-bold text-[#001A3D]">{job.type}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-200/50 py-4">
                    <span className="text-xs font-semibold tracking-wide text-gray-400">
                      REPORTS TO
                    </span>
                    <span className="text-xs font-bold text-[#001A3D]">
                      Director of {job.department}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <p className="text-[11px] font-bold tracking-widest text-[#001A3D] uppercase">
                    TRUSTED BY INNOVATORS
                  </p>
                  <div className="flex flex-wrap gap-4 opacity-30">
                    <Globe2 size={24} />
                    <Zap size={24} />
                    <ShieldCheck size={24} />
                    <Cpu size={24} />
                  </div>
                </div>

                <button className="w-full rounded-sm bg-[#001A3D] py-5 text-xs font-bold tracking-wide text-white shadow-2xl transition-all hover:bg-[#002b66]">
                  START APPLICATION
                </button>
              </div>

              <div className="space-y-4 rounded-3xl border-2 border-[#FFAF2B]/10 p-8">
                <div className="flex items-center gap-3">
                  <CalendarCheck className="text-[#FFAF2B]" size={20} />
                  <h4 className="text-sm font-bold text-[#001A3D]">Hiring Timeline</h4>
                </div>
                <p className="text-xs leading-relaxed font-medium text-gray-500">
                  This is an active opening. Our team typically responds to qualified applicants
                  within 48-72 business hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-gray-100 bg-gray-50 py-20">
        <div className="mx-auto max-w-[1280px] space-y-8 px-6 text-center lg:px-20">
          <h2 className="display-font text-3xl font-semibold tracking-tight text-[#001A3D]">
            Not the right fit?
          </h2>
          <p className="mx-auto max-w-xl font-medium text-gray-500">
            Explore our other opportunities or sign up for our talent network to be the first to
            know about new roles.
          </p>
          <div className="flex justify-center gap-6">
            <Link
              href="/careers"
              className="border-b-2 border-[#FFAF2B] pb-1 text-xs font-bold tracking-wide text-[#001A3D] uppercase"
            >
              Browse All Roles
            </Link>
            <Link
              href="/contact"
              className="border-b-2 border-[#FFAF2B] pb-1 text-xs font-bold tracking-wide text-[#001A3D] uppercase"
            >
              Talent Pool
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
