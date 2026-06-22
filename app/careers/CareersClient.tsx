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

const BRAND_ORANGE = "#F99D1C";

export default function CareersClient({ jobs }: { jobs: Job[] }) {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState("General Application");

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <section className="bg-[#001A3D] text-white h-[300px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1760611656615-db3fad24a314?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Life at Hutech"
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
                Join our Talent Ecosystem
              </span>
            </div>

            <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight display-font">
              Build your <span className="text-[#F99D1C]">Legacy</span> with us.
            </h1>

            <p className="text-gray-200 text-sm md:text-lg font-medium max-w-2xl leading-relaxed opacity-90">
              Recruiting pioneers to solve complex engineering puzzles and architect the future.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="openings" className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="mb-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <span className="w-12 h-[1px] bg-[#F99D1C]"></span>
                <span className="text-[#F99D1C] font-semibold tracking-wide text-[11px]">Open Opportunities</span>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-[#001A3D] tracking-tight leading-tight display-font">
                Join the <br /> Excellence Hub.
              </h2>
            </div>
          </div>

          <div className="space-y-6">
            {jobs.map((job, i) => (
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
                  className="group bg-white p-6 md:p-8 border border-gray-100 hover:border-[#F99D1C] hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-0 bg-[#F99D1C] group-hover:h-full transition-all duration-500"></div>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-semibold tracking-wide bg-gray-100 text-gray-500 px-2 py-1 rounded-sm group-hover:bg-[#F99D1C]/10 group-hover:text-[#001A3D] transition-colors">{tag}</span>
                      ))}
                    </div>
                    <h4 className="text-xl md:text-2xl font-semibold text-[#001A3D] tracking-tight group-hover:text-[#F99D1C] transition-colors display-font">{job.title}</h4>
                    <div className="flex flex-wrap items-center gap-6 text-gray-400 font-semibold text-[11px] tracking-wide">
                      <span className="flex items-center gap-2"><MapPin size={12} className="text-[#F99D1C]" /> {job.location}</span>
                      <span className="flex items-center gap-2"><Briefcase size={12} className="text-[#F99D1C]" /> {job.department}</span>
                      <span className="flex items-center gap-2"><Clock size={12} className="text-[#F99D1C]" /> {job.type}</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 group-hover:bg-[#F99D1C] group-hover:text-[#001A3D] p-4 rounded-xl transition-all duration-500 shrink-0">
                    <MoveRight size={24} />
                  </div>
                </Motion.div>
              </Link>
            ))}
          </div>

          <div className="mt-16 p-10 bg-[#FAF9F6] border border-gray-100 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <p className="text-lg font-semibold text-[#001A3D] tracking-tight">No relevant opening for your skill set?</p>
              <p className="text-sm text-gray-500 font-medium">We&apos;re always looking for exceptional talent. Drop your resume in our talent pool.</p>
            </div>
            <button
              onClick={() => {
                setSelectedJobTitle("General Application");
                setIsApplicationModalOpen(true);
              }}
              className="bg-[#001A3D] hover:bg-[#002b66] text-white font-semibold py-4 px-10 rounded-sm text-[11px] tracking-wide transition-all shadow-xl active:scale-95"
            >
              General Application
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
                  <span className="text-[#001A3D] font-semibold tracking-wide text-[11px]">The Hutech Spirit</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] leading-tight tracking-tight display-font">
                  Innovation is <br /> our <span className="text-[#F99D1C]">North Star.</span>
                </h2>
              </div>
              <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-xl">
                We foster a culture of radical transparency and extreme ownership. Here, your ideas aren&apos;t just heard—they are engineered into reality. We believe in high-performance agility balanced with empathy.
              </p>

              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-2">
                  <div className="text-4xl font-semibold text-[#001A3D]">92%</div>
                  <p className="text-[11px] font-semibold tracking-wide text-gray-400">Engineering Ratio</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-semibold text-[#F99D1C]">15+</div>
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
              <div className="absolute -inset-6 bg-[#F99D1C]/10 rounded-[4rem] -z-10 -rotate-2"></div>
              <div className="absolute -bottom-10 -left-10 bg-[#001A3D] p-8 rounded-3xl shadow-2xl z-20 hidden md:block border-4 border-white">
                <div className="flex items-center gap-4">
                  <Award className="text-[#F99D1C]" size={32} />
                  <div>
                    <p className="text-white font-semibold text-xs tracking-wide">Great Place</p>
                    <p className="text-[#F99D1C] font-semibold text-[11px]">To Work Certified</p>
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
            <div className="w-16 h-1 bg-[#F99D1C] mx-auto"></div>
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
                  <div className="text-4xl font-semibold text-gray-100 group-hover:text-[#F99D1C]/20 transition-colors mb-6 display-font">{item.step}</div>
                  <h4 className="text-lg font-semibold text-[#001A3D] tracking-tight mb-4 group-hover:text-[#F99D1C] transition-colors display-font">{item.title}</h4>
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
                <div className="text-[#F99D1C] font-semibold tracking-wide text-[11px]">Perks & Benefits</div>
                <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] leading-tight tracking-tight display-font">
                  Investing <br /> in your <br /><span className="text-[#F99D1C]">Success.</span>
                </h2>
              </div>
              <p className="text-gray-500 font-medium leading-relaxed">
                We provide the resources, environment, and support you need to do the best work of your life.
              </p>
              <div className="p-8 bg-[#001A3D] rounded-3xl text-white space-y-4">
                <GraduationCap className="text-[#F99D1C]" size={32} />
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
                <div key={idx} className="p-8 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-white hover:border-[#F99D1C]/30 hover:shadow-lg transition-all group">
                  <div className="mb-6 group-hover:scale-110 transition-transform">{benefit.icon}</div>
                  <h4 className="text-lg font-semibold text-[#001A3D] display-font tracking-tight mb-2">{benefit.title}</h4>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Internship Programme */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Image with Badge */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/3] overflow-hidden rounded-[2rem] shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop"
                alt="Internship Programme Campus"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 right-6 bg-[#F99D1C] text-[#001A3D] px-8 py-4 rounded-2xl shadow-xl z-20 text-center font-bold">
              <p className="text-[10px] tracking-widest uppercase mb-1 opacity-90">Applications Open</p>
              <p className="text-xl font-extrabold whitespace-nowrap">2026 Cohort</p>
            </div>
          </div>

          {/* Right Column: Content and Cards */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-[#F99D1C]" />
                <span className="text-xs font-bold tracking-widest text-[#F99D1C] uppercase">Internship Programme</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] leading-tight tracking-tight display-font">
                Launch Your Career <span className="font-extrabold">at Nabhira</span>
              </h2>
              <div className="w-16 h-0.5 bg-[#F99D1C] my-6"></div>
            </div>

            <p className="text-gray-500 font-medium leading-relaxed">
              The Nabhira Emerging Talent Programme is a structured 12-week immersion into enterprise technology, strategy consulting, and AI-driven innovation. Work alongside senior architects on real client engagements — not internal projects.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Program 1 */}
              <div className="p-5 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-white hover:border-[#F99D1C]/30 hover:shadow-lg transition-all flex items-center gap-4">
                <div className="flex-shrink-0 p-3 bg-white rounded-xl text-[#F99D1C] shadow-sm">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#001A3D] text-sm">AI & Data Engineering</h4>
                  <p className="text-xs text-gray-400">12 Weeks</p>
                </div>
              </div>

              {/* Program 2 */}
              <div className="p-5 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-white hover:border-[#F99D1C]/30 hover:shadow-lg transition-all flex items-center gap-4">
                <div className="flex-shrink-0 p-3 bg-white rounded-xl text-[#F99D1C] shadow-sm">
                  <Cloud className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#001A3D] text-sm">Cloud Architecture</h4>
                  <p className="text-xs text-gray-400">12 Weeks</p>
                </div>
              </div>

              {/* Program 3 */}
              <div className="p-5 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-white hover:border-[#F99D1C]/30 hover:shadow-lg transition-all flex items-center gap-4">
                <div className="flex-shrink-0 p-3 bg-white rounded-xl text-[#F99D1C] shadow-sm">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#001A3D] text-sm">Digital Strategy</h4>
                  <p className="text-xs text-gray-400">10 Weeks</p>
                </div>
              </div>

              {/* Program 4 */}
              <div className="p-5 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-white hover:border-[#F99D1C]/30 hover:shadow-lg transition-all flex items-center gap-4">
                <div className="flex-shrink-0 p-3 bg-white rounded-xl text-[#F99D1C] shadow-sm">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#001A3D] text-sm">Product & UX Design</h4>
                  <p className="text-xs text-gray-400">10 Weeks</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => {
                  setSelectedJobTitle("Emerging Talent / Internship Programme");
                  setIsApplicationModalOpen(true);
                }}
                className="bg-[#001A3D] hover:bg-[#002B66] text-white font-semibold py-4 px-8 rounded-sm text-[11px] tracking-wide transition-all uppercase inline-flex items-center gap-2 shadow-lg active:scale-[0.98]"
              >
                Apply Now <ChevronRight size={14} />
              </button>
              <Link
                href="#"
                className="border border-[#001A3D]/20 hover:border-[#001A3D] text-[#001A3D] font-semibold py-4 px-8 rounded-sm text-[11px] tracking-wide transition-all uppercase inline-flex items-center justify-center active:scale-[0.98]"
              >
                Download Brochure
              </Link>
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
              <span className="text-xs font-bold tracking-widest text-[#F99D1C] uppercase">Career Advantage</span>
              <span className="w-12 h-[1px] bg-[#F99D1C]"></span>
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] leading-tight tracking-tight display-font">
              Why Nabhira is <span className="font-extrabold">Different</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
            {/* Left Column benefits */}
            <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
              {/* Item 1 */}
              <div className="group flex items-center justify-between py-6 cursor-pointer hover:pl-2 transition-all">
                <div className="flex items-center gap-6">
                  <span className="text-xs font-bold text-[#F99D1C] tracking-wider">01</span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#001A3D] text-white shadow-md group-hover:bg-[#F99D1C] group-hover:text-[#001A3D] transition-colors">
                    <Globe2 className="h-5 w-5" />
                  </div>
                  <span className="font-semibold text-lg text-[#001A3D] group-hover:text-[#F99D1C] transition-colors">Global Exposure</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-[#F99D1C] group-hover:translate-x-1 transition-all" />
              </div>

              {/* Item 3 */}
              <div className="group flex items-center justify-between py-6 cursor-pointer hover:pl-2 transition-all">
                <div className="flex items-center gap-6">
                  <span className="text-xs font-bold text-[#F99D1C] tracking-wider">03</span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#001A3D] text-white shadow-md group-hover:bg-[#F99D1C] group-hover:text-[#001A3D] transition-colors">
                    <Users className="h-5 w-5" />
                  </div>
                  <span className="font-semibold text-lg text-[#001A3D] group-hover:text-[#F99D1C] transition-colors">World-Class Mentorship</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-[#F99D1C] group-hover:translate-x-1 transition-all" />
              </div>

              {/* Item 5 */}
              <div className="group flex items-center justify-between py-6 cursor-pointer hover:pl-2 transition-all">
                <div className="flex items-center gap-6">
                  <span className="text-xs font-bold text-[#F99D1C] tracking-wider">05</span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#001A3D] text-white shadow-md group-hover:bg-[#F99D1C] group-hover:text-[#001A3D] transition-colors">
                    <Heart className="h-5 w-5" />
                  </div>
                  <span className="font-semibold text-lg text-[#001A3D] group-hover:text-[#F99D1C] transition-colors">Inclusive Culture</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-[#F99D1C] group-hover:translate-x-1 transition-all" />
              </div>
            </div>

            {/* Right Column benefits */}
            <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
              {/* Item 2 */}
              <div className="group flex items-center justify-between py-6 cursor-pointer hover:pl-2 transition-all">
                <div className="flex items-center gap-6">
                  <span className="text-xs font-bold text-[#F99D1C] tracking-wider">02</span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#001A3D] text-white shadow-md group-hover:bg-[#F99D1C] group-hover:text-[#001A3D] transition-colors">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <span className="font-semibold text-lg text-[#001A3D] group-hover:text-[#F99D1C] transition-colors">Accelerated Growth</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-[#F99D1C] group-hover:translate-x-1 transition-all" />
              </div>

              {/* Item 4 */}
              <div className="group flex items-center justify-between py-6 cursor-pointer hover:pl-2 transition-all">
                <div className="flex items-center gap-6">
                  <span className="text-xs font-bold text-[#F99D1C] tracking-wider">04</span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#001A3D] text-white shadow-md group-hover:bg-[#F99D1C] group-hover:text-[#001A3D] transition-colors">
                    <Award className="h-5 w-5" />
                  </div>
                  <span className="font-semibold text-lg text-[#001A3D] group-hover:text-[#F99D1C] transition-colors">Certified Excellence</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-[#F99D1C] group-hover:translate-x-1 transition-all" />
              </div>

              {/* Item 6 */}
              <div className="group flex items-center justify-between py-6 cursor-pointer hover:pl-2 transition-all">
                <div className="flex items-center gap-6">
                  <span className="text-xs font-bold text-[#F99D1C] tracking-wider">06</span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#001A3D] text-white shadow-md group-hover:bg-[#F99D1C] group-hover:text-[#001A3D] transition-colors">
                    <Lightbulb className="h-5 w-5" />
                  </div>
                  <span className="font-semibold text-lg text-[#001A3D] group-hover:text-[#F99D1C] transition-colors">Innovation Time</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-[#F99D1C] group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 text-center space-y-12">
          <div className="space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font tracking-tight leading-tight">
              Your Next Chapter <br /> starts <span className="text-[#F99D1C]">now.</span>
            </h2>
            <p className="text-gray-500 font-medium leading-relaxed">
              Join a global team of visionaries, engineers, and creatives working together to build a more agile and innovative future.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full md:w-auto">
              <CalendarCheck className="text-[#F99D1C]" size={24} />
              <div className="text-left">
                <p className="text-[11px] font-semibold tracking-wide text-[#001A3D]">Interview Ready?</p>
                <p className="text-xs text-gray-500 font-medium">Get tips for success</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full md:w-auto">
              <Zap className="text-[#F99D1C]" size={24} />
              <div className="text-left">
                <p className="text-[11px] font-semibold tracking-wide text-[#001A3D]">Fast-Track</p>
                <p className="text-xs text-gray-500 font-medium">Hiring in 14 days</p>
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
    </div>
  );
}
