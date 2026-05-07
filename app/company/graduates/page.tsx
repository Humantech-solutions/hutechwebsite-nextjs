"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  GraduationCap,
  Rocket,
  Zap,
  Heart,
  Play,
  ArrowUpRight,
  CheckCircle2,
  Users,
  Code,
  Cpu,
  Globe,
  School,
  Presentation,
  Handshake,
  Briefcase,
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Graduates() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form Data:", data);
    toast.success("Application submitted successfully! Our team will contact you soon.");
    reset();
  };

  const workshops = [
    {
      title: "Cloud Native Architecture",
      category: "Technical Workshop",
      duration: "3 Days Intensive",
      image:
        "https://images.unsplash.com/photo-1623121608226-ca93dec4d94e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "Hands-on session with AWS & Azure experts on building resilient microservices.",
    },
    {
      title: "Modern AI/ML Integration",
      category: "Engineering Series",
      duration: "Weekly Sessions",
      image:
        "https://images.unsplash.com/photo-1758691736067-b309ee3ef7b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description:
        "Exploring the practical applications of Large Language Models in corporate workflows.",
    },
    {
      title: "Leadership & Agile Delivery",
      category: "Professional Growth",
      duration: "2 Days Seminar",
      image:
        "https://images.unsplash.com/photo-1757143137392-0b1e1a27a7de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "Bridging the gap between engineering excellence and project management.",
    },
  ];

  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Team Whiteboard Session",
      span: "md:col-span-2 md:row-span-2",
    },
    {
      url: "https://images.unsplash.com/photo-1517245315842-ac63459c55b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Hutech Hackathon 2025",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Global Delivery Office",
      span: "md:col-span-1 md:row-span-2",
    },
    {
      url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Interactive Workshop",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      url: "https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Graduation Celebration",
      span: "md:col-span-2 md:row-span-1",
    },
  ];

  const milestones = [
    {
      phase: "Phase 01",
      title: "Onboarding & Foundation",
      content:
        "Immersion into Hutech's culture, core engineering principles, and the global delivery model.",
      icon: <Users size={24} />,
    },
    {
      phase: "Phase 02",
      title: "Tech Intensive Training",
      content: "Deep dives into specialized tracks: Cloud Architecture, AI/ML, or Cybersecurity.",
      icon: <Code size={24} />,
    },
    {
      phase: "Phase 03",
      title: "Shadowing & Real Projects",
      content:
        "Working alongside senior consultants on live client engagements across international markets.",
      icon: <Globe size={24} />,
    },
    {
      phase: "Phase 04",
      title: "Autonomy & Graduation",
      content:
        "Owning critical project components and successfully transitioning to full consultant roles.",
      icon: <Cpu size={24} />,
    },
  ];

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="Graduates Program | Hutech Solutions"
        description="Start your career journey with Hutech Solutions. Our graduate program is designed to nurture the next generation of tech leaders."
      />
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Hutech Graduates Program"
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
                Early Careers
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              The Hutech <br />
              <span className="text-[#F99D1C]">Graduates Program.</span>
            </h1>
            <p className="mb-10 max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              Nurturing the next generation of tech leaders. Start your professional journey with
              world-class mentorship and hands-on engineering experience.
            </p>
            <button
              onClick={() =>
                document.getElementById("apply-now")?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-sm bg-[#F99D1C] px-12 py-5 text-[11px] font-black tracking-widest text-[#001A3D] uppercase transition-all duration-500 hover:bg-white"
            >
              Apply for 2026 Cohort
            </button>
          </Motion.div>
        </div>
      </section>

      {/* Program Pillars Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 flex flex-col items-end justify-between gap-8 lg:flex-row">
            <div className="max-w-2xl space-y-6">
              <h2 className="display-font text-3xl leading-tight font-semibold tracking-tight text-[#001A3D] sm:text-4xl md:text-5xl">
                Your 12-Month <span className="text-[#0171c1]">Professional Evolution</span>
              </h2>
              <p className="text-lg leading-relaxed font-medium text-gray-500">
                The Hutech Academy isn't just a training program—it's an intensive immersion into
                the world of elite engineering and high-stakes consulting.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {milestones.map((item, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-[2rem] border border-gray-100 bg-gray-50 p-10 transition-all duration-500 hover:border-[#0171c1]/20 hover:bg-white hover:shadow-2xl"
              >
                <div className="mb-8 w-fit rounded-2xl bg-white p-4 text-[#0171c1] shadow-sm transition-all duration-500 group-hover:bg-[#0171c1] group-hover:text-white">
                  {item.icon}
                </div>
                <div className="space-y-4">
                  <span className="block text-[10px] font-black tracking-widest text-[#F99D1C] uppercase">
                    {item.phase}
                  </span>
                  <h3 className="display-font text-xl leading-tight font-bold text-[#001A3D]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-medium text-gray-500">
                    {item.content}
                  </p>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Series */}
      <section className="overflow-hidden bg-[#001A3D] py-24 text-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-16 flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="space-y-4">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#F99D1C] uppercase">
                Knowledge Transfer
              </span>
              <h2 className="display-font text-3xl leading-tight font-semibold md:text-5xl">
                Workshop Highlights
              </h2>
            </div>
            <button className="flex items-center gap-4 rounded-sm border border-white/10 bg-white/10 px-10 py-5 text-[11px] font-bold tracking-widest uppercase transition-all hover:bg-[#F99D1C] hover:text-[#001A3D]">
              View All Sessions <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {workshops.map((ws, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative"
              >
                <div className="relative mb-8 aspect-[4/5] overflow-hidden rounded-[3rem]">
                  <ImageWithFallback
                    src={ws.image}
                    alt={ws.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D] via-[#001A3D]/20 to-transparent opacity-80 transition-opacity group-hover:opacity-40"></div>

                  <div className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-[#001A3D] opacity-0 shadow-2xl transition-all duration-500 group-hover:opacity-100">
                    <Play size={24} fill="currentColor" />
                  </div>

                  <div className="absolute right-8 bottom-8 left-8">
                    <span className="mb-3 inline-block rounded-full bg-[#F99D1C] px-3 py-1 text-[10px] font-black tracking-widest text-[#001A3D] uppercase">
                      {ws.category}
                    </span>
                    <h3 className="display-font text-2xl font-bold text-white">{ws.title}</h3>
                  </div>
                </div>
                <div className="space-y-3 px-4">
                  <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#F99D1C] uppercase">
                    <CheckCircle2 size={14} /> {ws.duration}
                  </div>
                  <p className="text-sm leading-relaxed font-medium text-gray-400">
                    {ws.description}
                  </p>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Partnerships */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full bg-[#0171c1]/10 px-4 py-2 text-[#0171c1]">
                <School size={18} />
                <span className="text-[10px] font-black tracking-widest uppercase">
                  Academic Liaison
                </span>
              </div>
              <h2 className="display-font text-3xl leading-tight font-semibold text-[#001A3D] md:text-5xl">
                Institutional <br /> <span className="text-[#0171c1]">Collaboration.</span>
              </h2>
              <p className="max-w-xl text-lg leading-relaxed font-medium text-gray-500">
                We partner with leading colleges and universities worldwide to bridge the gap
                between academic theory and high-tier engineering practice.
              </p>

              <div className="grid grid-cols-1 gap-8 pt-4 sm:grid-cols-2">
                {[
                  {
                    icon: <Presentation size={20} />,
                    title: "Workshops",
                    desc: "Expert-led technical seminars and hands-on bootcamps.",
                  },
                  {
                    icon: <Zap size={20} />,
                    title: "Internships",
                    desc: "Real-world project exposure for high-performing students.",
                  },
                  {
                    icon: <Briefcase size={20} />,
                    title: "Placements",
                    desc: "Campus recruitment drives for our global delivery units.",
                  },
                  {
                    icon: <Handshake size={20} />,
                    title: "MOUs",
                    desc: "Strategic long-term partnerships for R&D and curriculum.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="text-[#0171c1]">{item.icon}</div>
                    <h4 className="text-sm font-bold tracking-wider text-[#001A3D] uppercase">
                      {item.title}
                    </h4>
                    <p className="text-xs leading-relaxed font-medium text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[3rem] border border-gray-100 bg-white p-10 shadow-xl md:p-14">
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                    Institution Name
                  </label>
                  <input
                    placeholder="University of Technology"
                    className="w-full rounded-sm border border-gray-200 bg-gray-50 px-4 py-4 text-[#001A3D] placeholder-gray-300 transition-all focus:border-[#0171c1] focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                    Contact Person / Designation
                  </label>
                  <input
                    placeholder="Head of Placements / Dean"
                    className="w-full rounded-sm border border-gray-200 bg-gray-50 px-4 py-4 text-[#001A3D] placeholder-gray-300 transition-all focus:border-[#0171c1] focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                      Email ID
                    </label>
                    <input
                      type="email"
                      placeholder="dean@university.edu"
                      className="w-full rounded-sm border border-gray-200 bg-gray-50 px-4 py-4 text-[#001A3D] placeholder-gray-300 transition-all focus:border-[#0171c1] focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-sm border border-gray-200 bg-gray-50 px-4 py-4 text-[#001A3D] placeholder-gray-300 transition-all focus:border-[#0171c1] focus:outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                    Collaboration Type
                  </label>
                  <select className="w-full appearance-none rounded-sm border border-gray-200 bg-gray-50 px-4 py-4 text-gray-400 transition-all focus:border-[#0171c1] focus:outline-none">
                    <option>Select Purpose</option>
                    <option>Technical Workshop</option>
                    <option>Internship Program</option>
                    <option>Campus Placement</option>
                    <option>Strategic MOU</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    toast.success(
                      "Partnership request sent. Our Academic Liaison will contact you."
                    )
                  }
                  className="w-full rounded-sm bg-[#001A3D] py-5 text-xs font-black tracking-widest text-white uppercase transition-all duration-500 hover:bg-[#0171c1]"
                >
                  Initiate Partnership
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Gallery */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-16 space-y-4 text-center">
            <h2 className="display-font text-3xl font-semibold tracking-tight text-[#001A3D] md:text-5xl">
              The Experience Gallery
            </h2>
            <p className="mx-auto max-w-3xl text-lg font-medium text-gray-500">
              A look inside the life of our graduates—from whiteboard battles to milestone
              celebrations.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {galleryImages.map((img, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${img.span} group relative min-h-[300px] overflow-hidden rounded-[2.5rem] bg-gray-100`}
              >
                <ImageWithFallback
                  src={img.url}
                  alt={img.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-[#001A3D]/40 p-8 opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="text-sm font-bold tracking-widest text-white uppercase">
                    {img.title}
                  </p>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply-now" className="bg-white pb-32">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="relative overflow-hidden rounded-[4rem] bg-[#001A3D] p-12 md:p-24">
            <div className="absolute top-0 right-0 -mt-48 -mr-48 h-96 w-96 rounded-full bg-[#0171c1]/20 blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 -mb-48 -ml-48 h-96 w-96 rounded-full bg-[#F99D1C]/10 blur-[100px]"></div>

            <div className="relative z-10 grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
              <div className="space-y-8 text-left">
                <div className="inline-flex rounded-full bg-white/5 p-4 text-[#F99D1C]">
                  <Rocket size={32} />
                </div>
                <h2 className="display-font text-3xl leading-[1.1] font-semibold text-white md:text-5xl">
                  Launch Your Career <br /> with{" "}
                  <span className="text-[#F99D1C]">Global Reach.</span>
                </h2>
                <p className="max-w-lg text-lg leading-relaxed font-medium text-white/50">
                  Applications for the Summer 2026 cohort are now open. Join a culture of
                  engineering excellence and start your journey with world-class mentorship.
                </p>

                <div className="space-y-4 pt-4">
                  {[
                    "Global Delivery Exposure",
                    "Mentor-led Engineering Projects",
                    "Direct Client Engagement",
                    "Continuous Upskilling Path",
                  ].map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-sm font-medium text-white/80"
                    >
                      <CheckCircle2 size={16} className="text-[#F99D1C]" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[3rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md md:p-12">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <h3 className="display-font mb-8 text-2xl font-bold text-white">
                    Join the Cohort
                  </h3>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest text-[#F99D1C] uppercase">
                      Full Name
                    </label>
                    <input
                      {...register("fullName", { required: true })}
                      placeholder="John Doe"
                      className="w-full rounded-sm border border-white/10 bg-white/5 px-4 py-4 text-white placeholder-white/20 transition-all focus:border-[#0171c1] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest text-[#F99D1C] uppercase">
                      Email Address
                    </label>
                    <input
                      {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                      placeholder="john@example.com"
                      type="email"
                      className="w-full rounded-sm border border-white/10 bg-white/5 px-4 py-4 text-white placeholder-white/20 transition-all focus:border-[#0171c1] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest text-[#F99D1C] uppercase">
                      Graduation Year
                    </label>
                    <select
                      {...register("gradYear", { required: true })}
                      className="w-full appearance-none rounded-sm border border-white/10 bg-[#001A3D] px-4 py-4 text-white/50 transition-all focus:border-[#0171c1] focus:outline-none"
                    >
                      <option value="">Select Year</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026 (Expected)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest text-[#F99D1C] uppercase">
                      Core Interest
                    </label>
                    <select
                      {...register("interest", { required: true })}
                      className="w-full appearance-none rounded-sm border border-white/10 bg-[#001A3D] px-4 py-4 text-white/50 transition-all focus:border-[#0171c1] focus:outline-none"
                    >
                      <option value="">Select Specialization</option>
                      <option value="cloud">Cloud Architecture</option>
                      <option value="ai">AI/ML Engineering</option>
                      <option value="devops">DevOps & Automation</option>
                      <option value="consulting">Business Consulting</option>
                    </select>
                  </div>

                  <div className="pt-4">
                    <button
                      disabled={isSubmitting}
                      className="flex w-full items-center justify-center gap-3 rounded-sm bg-[#F99D1C] py-5 text-xs font-black tracking-widest text-[#001A3D] uppercase transition-all duration-500 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting ? "Processing..." : "Submit Application"}
                      {!isSubmitting && <ArrowUpRight size={16} />}
                    </button>
                    <p className="mt-6 text-center text-[10px] font-medium tracking-widest text-white/30 uppercase">
                      By submitting, you agree to our data policy.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
