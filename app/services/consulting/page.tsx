"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  Users,
  Lightbulb,
  TrendingUp,
  Globe,
  Briefcase,
  Target,
  ShieldCheck,
  PieChart,
  MoveRight,
  Building2,
  Stethoscope,
  Zap,
  ShoppingCart,
  HardHat,
  Cpu,
  MessagesSquare,
  Award,
  Star,
  CheckCircle2,
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

import { ServiceDetailContactCTA } from "@/components/ServiceDetailContactCTA";

const INDUSTRIES = [
  {
    name: "BFSI & Fintech",
    icon: <Building2 className="h-8 w-8 text-[#0171c1]" />,
    desc: "Digital banking, risk management, and regulatory compliance strategies.",
  },
  {
    name: "Healthcare & Life Sciences",
    icon: <Stethoscope className="h-8 w-8 text-[#0171c1]" />,
    desc: "Optimizing patient care through digital health transformation and data security.",
  },
  {
    name: "Energy & Utilities",
    icon: <Zap className="h-8 w-8 text-[#0171c1]" />,
    desc: "Sustainable energy transitions and grid modernization consulting.",
  },
  {
    name: "Retail & CPG",
    icon: <ShoppingCart className="h-8 w-8 text-[#0171c1]" />,
    desc: "Omnichannel strategy and supply chain resilience for the modern consumer.",
  },
  {
    name: "Manufacturing",
    icon: <HardHat className="h-8 w-8 text-[#0171c1]" />,
    desc: "Lean production systems and Industrial 4.0 operational excellence.",
  },
  {
    name: "High-Tech",
    icon: <Cpu className="h-8 w-8 text-[#0171c1]" />,
    desc: "Product roadmap acceleration and R&D strategy for tech leaders.",
  },
];

const CONSULTANT_EXPERIENCE = [
  {
    title: "Industry Veterans",
    text: "Our lead consultants average 15+ years of domain-specific leadership in Fortune 500 environments.",
  },
  {
    title: "Technical Architects",
    text: "Deep technical depth that ensures strategic advice is grounded in feasible, scalable engineering.",
  },
  {
    title: "Change Management",
    text: "Experts in the human element of transformation, ensuring organizational buy-in and cultural shift.",
  },
  {
    title: "Data Scientists",
    text: "PhD-level researchers turning raw organizational data into predictive strategic roadmaps.",
  },
];

const CONSULTANTS = [
  {
    name: "Sarah Chen",
    role: "Principal Strategist",
    exp: "18 Years",
    skills: "Digital Transformation, M&A",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "Marcus Thorne",
    role: "Technical Architect",
    exp: "15 Years",
    skills: "Cloud Native, Enterprise Scale",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "Elena Rodriguez",
    role: "BFSI Lead",
    exp: "20 Years",
    skills: "Fintech Compliance, Risk",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "David Wu",
    role: "Supply Chain Expert",
    exp: "12 Years",
    skills: "Logistics, AI Optimization",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "Dr. Amara Okafor",
    role: "Healthcare Consultant",
    exp: "16 Years",
    skills: "HealthTech, Data Privacy",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "Jameson Burke",
    role: "Change Management",
    exp: "14 Years",
    skills: "Org Design, Leadership",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "Linda Kawaski",
    role: "Retail Strategist",
    exp: "19 Years",
    skills: "Omnichannel, Consumer UX",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "Robert Vance",
    role: "Energy & Utilities",
    exp: "22 Years",
    skills: "Grid Modernization, ESG",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "Sophia Martinez",
    role: "Data Scientist",
    exp: "10 Years",
    skills: "Predictive Analytics, NLP",
    img: "https://images.unsplash.com/photo-1567532939604-b6b5b0ad2f04?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "Michael Chang",
    role: "Cybersecurity Lead",
    exp: "17 Years",
    skills: "Zero Trust, Governance",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "Rachel Adams",
    role: "Product Strategy",
    exp: "13 Years",
    skills: "SaaS Growth, Roadmap",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "Thomas Klein",
    role: "Lean Manufacturing",
    exp: "25 Years",
    skills: "Six Sigma, Factory 4.0",
    img: "https://images.unsplash.com/photo-1560250094-0b91f9971660?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "Nadia Volkov",
    role: "Fintech Advisor",
    exp: "11 Years",
    skills: "Blockchain, Neobanking",
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "Aarav Patel",
    role: "Cloud Strategist",
    exp: "14 Years",
    skills: "AWS/Azure, FinOps",
    img: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "Catherine Low",
    role: "HR Transformation",
    exp: "16 Years",
    skills: "Talent Strategy, DEI",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
  },
];

export default function Consulting() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="Strategic Consulting Services | Hutech Solutions"
        description="Empower your business with Hutech's strategic consulting. Our diverse consultants bring cross-industry expertise to solve your most complex challenges."
      />
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1656646424292-cf207f3f1749?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Hutech Strategic Consulting"
            className="h-full w-full scale-105 object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-20">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[1px] w-12 bg-[#F99D1C]"></span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#F99D1C] uppercase">
                Corporate Strategy & Transformation
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              Strategic Insight. <br />
              <span className="text-[#F99D1C]">Decisive Action.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              In an era of relentless disruption, Hutech Solutions provides the strategic clarity
              and operational depth needed to navigate complexity and achieve sustainable growth.
            </p>
            <Link href="/contact" className="btn-banner-cta mt-6 group">
              Consult Us
              <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
            </Link>
          </Motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
            <div className="space-y-8">
              <h2 className="display-font text-3xl leading-tight font-semibold text-[#001A3D] md:text-5xl">
                Beyond Advice: <br />
                <span className="text-[#0171c1]">Execution Excellence.</span>
              </h2>
              <div className="h-1 w-20 bg-[#0171c1]"></div>
              <p className="text-lg leading-relaxed font-medium text-gray-500">
                Consulting at Hutech isn't just about delivering reports—it's about partnering with
                leadership teams to solve real-world problems. We combine deep domain expertise with
                a bias for action, ensuring that every strategic roadmap is backed by a practical
                execution path.
              </p>
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                <div className="space-y-4 border-l-2 border-gray-50 pl-6">
                  <h3 className="display-font text-lg font-bold text-[#001A3D]">
                    Visionary Strategy
                  </h3>
                  <p className="text-sm font-medium text-gray-400">
                    Helping you define 'where to play' and 'how to win' in your specific competitive
                    landscape.
                  </p>
                </div>
                <div className="space-y-4 border-l-2 border-gray-50 pl-6">
                  <h3 className="display-font text-lg font-bold text-[#001A3D]">
                    Operational Rigor
                  </h3>
                  <p className="text-sm font-medium text-gray-400">
                    Streamlining internal processes to maximize efficiency and reduce organizational
                    drag.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-[3rem] border border-gray-100 bg-gray-50 p-4">
                <div className="aspect-[4/3] overflow-hidden rounded-[2.5rem]">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1565688527174-775059ac429c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                    alt="Diverse Consulting Group"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -top-6 -right-6 hidden rounded-2xl bg-[#0171c1] p-10 text-white shadow-2xl md:block">
                  <p className="display-font mb-1 text-4xl font-bold">500+</p>
                  <p className="text-[10px] font-bold tracking-widest uppercase opacity-80">
                    Transformations Delivered
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
              Diverse Industry Experience
            </h2>
            <p className="mx-auto max-w-3xl text-lg font-medium text-gray-500">
              We bring cross-pollinated insights from diverse global sectors, allowing us to apply
              proven solutions from one industry to solve unique problems in another.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((industry, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group h-full rounded-2xl border border-gray-100 bg-white p-10 shadow-sm transition-all hover:shadow-2xl"
              >
                <div className="mb-8 w-fit rounded-xl bg-gray-50 p-4 transition-all duration-500 group-hover:bg-[#0171c1] group-hover:text-white">
                  {industry.icon}
                </div>
                <h3 className="display-font mb-4 text-2xl leading-tight font-bold text-[#001A3D]">
                  {industry.name}
                </h3>
                <p className="text-sm leading-relaxed font-medium text-gray-500">{industry.desc}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultants Section */}
      <section className="overflow-hidden bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
            <div className="max-w-2xl space-y-6">
              <h2 className="display-font text-3xl leading-tight font-semibold text-[#001A3D] md:text-6xl">
                Meet Our <br />
                <span className="text-[#0171c1]">Consultants.</span>
              </h2>
              <div className="h-1 w-20 bg-[#0171c1]"></div>
              <p className="text-lg leading-relaxed font-medium text-gray-500">
                Direct access to world-class expertise. Our global network of consultants provides
                the specific domain knowledge required for your most complex assignments.
              </p>
            </div>
            <div className="max-w-sm rounded-2xl border border-gray-100 bg-gray-50 p-6">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0171c1]/10">
                  <CheckCircle2 className="h-6 w-6 text-[#0171c1]" />
                </div>
                <h4 className="text-sm font-bold tracking-wide text-[#001A3D] uppercase">
                  Deployment Models
                </h4>
              </div>
              <p className="mb-4 text-xs leading-relaxed font-medium text-gray-400">
                Available for full-time consulting, dedicated fractional assignments, or
                project-specific advisory roles.
              </p>
              <Link
                href="/contact"
                className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#0171c1] uppercase transition-all hover:gap-4"
              >
                Inquire Now <MoveRight size={14} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {CONSULTANTS.map((consultant, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 5) * 0.1 }}
                className="group relative"
              >
                <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-2xl">
                  <ImageWithFallback
                    src={consultant.img}
                    alt={consultant.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#001A3D]/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="text-[10px] font-bold tracking-widest text-white uppercase">
                      {consultant.skills}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm leading-tight font-bold text-[#001A3D]">
                    {consultant.name}
                  </h4>
                  <p className="text-[10px] font-bold tracking-wider text-[#0171c1] uppercase">
                    {consultant.role}
                  </p>
                  <p className="text-[10px] font-medium text-gray-400">
                    {consultant.exp} Experience
                  </p>
                </div>
              </Motion.div>
            ))}
          </div>

          <div className="relative mt-20 space-y-8 overflow-hidden rounded-[2rem] bg-[#001A3D] p-10 text-center">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Briefcase size={120} className="text-white" />
            </div>
            <h3 className="display-font relative z-10 text-2xl font-bold text-white md:text-3xl">
              Scale Your Leadership Bench
            </h3>
            <p className="relative z-10 mx-auto max-w-2xl text-sm font-medium text-gray-400">
              Hire our consultants for <strong>Full-Time</strong> engagements or{" "}
              <strong>Fractional</strong> assignments to bridge leadership gaps, lead high-stakes
              transformations, or provide on-demand technical strategy.
            </p>
            <div className="relative z-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-sm bg-[#0171c1] px-10 py-5 text-[11px] font-bold tracking-wider text-white uppercase transition-all duration-500 hover:bg-white hover:text-[#001A3D]"
              >
                Hire a Consultant <MoveRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Human Side Section */}
      <section className="overflow-hidden bg-gray-50 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex flex-col items-center gap-20 lg:flex-row">
            <div className="relative order-2 flex-1 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400"
                    className="aspect-[3/4] w-full rounded-2xl object-cover"
                  />
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400"
                    className="aspect-square w-full rounded-2xl object-cover"
                  />
                </div>
                <div className="mt-12 space-y-4">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400"
                    className="aspect-square w-full rounded-2xl object-cover"
                  />
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1560250094-0b91f9971660?auto=format&fit=crop&q=80&w=400"
                    className="aspect-[3/4] w-full rounded-2xl object-cover"
                  />
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-xl xl:block">
                <Users size={48} className="mx-auto text-[#0171c1]" />
              </div>
            </div>
            <div className="order-1 flex-1 space-y-10 lg:order-2">
              <div className="space-y-6">
                <h2 className="display-font text-3xl leading-tight font-semibold text-[#001A3D] md:text-5xl">
                  Our People: Diverse <br />
                  <span className="text-[#0171c1]">Consulting Expertise.</span>
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  Our consultants are our greatest asset. They come from multi-disciplinary
                  backgrounds—including management consulting, research science, specialized
                  engineering, and high-growth startups—bringing a unique perspective to every
                  engagement.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                {CONSULTANT_EXPERIENCE.map((exp, i) => (
                  <div key={i} className="space-y-3">
                    <div className="text-sm font-bold tracking-widest text-[#0171c1] uppercase">
                      0{i + 1}. {exp.title}
                    </div>
                    <p className="text-sm leading-relaxed font-medium text-gray-400">{exp.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      <ServiceDetailContactCTA />

    </div>
  );
}
