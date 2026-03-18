"use client";

import { motion as Motion } from "framer-motion";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import {
  Briefcase,
  MapPin,
  Users,
  Award,
  Heart,
  Rocket,
  MoveRight,
  Star,
  Globe2,
  Clock,
  ChevronRight,
  ShieldCheck,
  Zap,
  Cpu,
  Smile,
  GraduationCap,
  CalendarCheck,
} from "lucide-react";
import Link from "next/link";
import { Meta } from "@/components/Meta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BRAND_ORANGE = "#FFAF2B";
const BRAND_BLUE = "#001A3D";

const OPEN_POSITIONS = [
  {
    id: "full-stack-dev",
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Bangalore, India",
    type: "Full-time",
    tags: ["React", "Node.js", "TypeScript"],
  },
  {
    id: "ai-solutions-architect",
    title: "AI/ML Solutions Architect",
    department: "Digital Innovation",
    location: "San Francisco, CA",
    type: "Remote",
    tags: ["Python", "PyTorch", "OpenAI"],
  },
  {
    id: "devops-engineer",
    title: "DevOps & SRE Engineer",
    department: "Infrastructure",
    location: "London, UK",
    type: "Hybrid",
    tags: ["AWS", "Kubernetes", "Terraform"],
  },
  {
    id: "product-designer",
    title: "UI/UX Product Designer",
    department: "Design Hub",
    location: "Berlin, Germany",
    type: "Full-time",
    tags: ["Figma", "Design Systems", "Prototyping"],
  },
  {
    id: "biz-dev-mgr",
    title: "Business Development Manager",
    department: "Sales & Strategy",
    location: "Singapore",
    type: "Full-time",
    tags: ["Enterprise Sales", "Strategic Partnerships"],
  },
];

const HIRING_PROCESS = [
  {
    step: "01",
    title: "Application Submission",
    desc: "Submit your profile via our portal. Our talent scouts review every single application manually.",
  },
  {
    step: "02",
    title: "Screening Interview",
    desc: "A brief conversation with our recruitment team to align expectations and cultural fitment.",
  },
  {
    step: "03",
    title: "Technical Evaluation",
    desc: "Deep dive into your domain expertise through pair programming or case study discussions.",
  },
  {
    step: "04",
    title: "Cultural Fit Round",
    desc: "Interaction with our leadership team to understand your vision and shared values.",
  },
  {
    step: "05",
    title: "Offer & Onboarding",
    desc: "Welcome to the team! A seamless transition into your new role with a 30-60-90 day plan.",
  },
];

const TESTIMONIALS = [
  {
    name: "Arjun Sharma",
    role: "Engineering Lead",
    text: "At Hutech, Innovation is not just a buzzword; it's our daily culture. We build things that actually move the needle for global enterprises.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Sarah Miller",
    role: "Senior Product Designer",
    text: "The autonomy here is unparalleled. I feel empowered to own my designs from concept to code, working alongside world-class engineers.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Kenji Sato",
    role: "Cloud Architect",
    text: "Working across global hubs has broadened my perspective. The level of collaboration at Hutech is what truly sets us apart.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
  },
];

export default function Careers() {
  const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    dotsClass: "slick-dots custom-dots-careers",
  };

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="Careers | Hutech Solutions"
        description="Join our talent ecosystem. We're recruiting pioneers to solve complex engineering puzzles and architect the future of digital solutions."
      />
      <Breadcrumbs variant="light" />
      <section className="relative flex h-[300px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1760611656615-db3fad24a314?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Life at Hutech"
            className="h-full w-full scale-105 object-cover opacity-20 brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D]/95 via-[#001A3D]/70 to-transparent"></div>
          <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-transparent via-[#FFAF2B] to-transparent opacity-90"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-20">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl space-y-3 md:space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="block h-[2px] w-6 shrink-0 bg-[#FFAF2B] md:w-8"></span>
              <span className="text-[11px] font-semibold tracking-wide text-[#FFAF2B] uppercase md:text-[12px]">
                Join our Talent Ecosystem
              </span>
            </div>

            <h1 className="display-font text-3xl leading-tight font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
              Build your <span className="text-[#FFAF2B]">Legacy</span> with us.
            </h1>

            <p className="max-w-2xl text-sm leading-relaxed font-medium text-gray-200 opacity-90 md:text-lg">
              Recruiting pioneers to solve complex engineering puzzles and architect the future.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Open Positions - Modern List */}
      <section id="openings" className="bg-white py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 flex flex-col items-end justify-between gap-8 md:flex-row">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <span className="h-[1px] w-12 bg-[#FFAF2B]"></span>
                <span className="text-[11px] font-semibold tracking-wide text-[#FFAF2B]">
                  Open Opportunities
                </span>
              </div>
              <h2 className="display-font text-3xl leading-tight font-semibold tracking-tight text-[#001A3D] md:text-5xl lg:text-6xl">
                Join the <br /> Excellence Hub.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-sm bg-[#001A3D] px-6 py-3 text-[11px] font-semibold tracking-wide text-white shadow-lg">
                All Categories
              </button>
              <button className="rounded-sm border border-gray-100 bg-gray-50 px-6 py-3 text-[11px] font-semibold tracking-wide text-gray-400 transition-all hover:bg-white">
                Engineering
              </button>
              <button className="rounded-sm border border-gray-100 bg-gray-50 px-6 py-3 text-[11px] font-semibold tracking-wide text-gray-400 transition-all hover:bg-white">
                Design
              </button>
              <button className="rounded-sm border border-gray-100 bg-gray-50 px-6 py-3 text-[11px] font-semibold tracking-wide text-gray-400 transition-all hover:bg-white">
                Sales
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {OPEN_POSITIONS.map((job, i) => (
              <Link key={job.id} href={`/careers/${job.id}`} className="block">
                <Motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative flex cursor-pointer flex-col justify-between gap-6 overflow-hidden border border-gray-100 bg-white p-6 transition-all duration-500 hover:border-[#FFAF2B] hover:shadow-2xl md:flex-row md:items-center md:p-8"
                >
                  <div className="absolute top-0 left-0 h-0 w-1 bg-[#FFAF2B] transition-all duration-500 group-hover:h-full"></div>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-sm bg-gray-100 px-2 py-1 text-[10px] font-semibold tracking-wide text-gray-500 transition-colors group-hover:bg-[#FFAF2B]/10 group-hover:text-[#001A3D]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="display-font text-xl font-semibold tracking-tight text-[#001A3D] transition-colors group-hover:text-[#FFAF2B] md:text-2xl">
                      {job.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-6 text-[11px] font-semibold tracking-wide text-gray-400">
                      <span className="flex items-center gap-2">
                        <MapPin size={12} className="text-[#FFAF2B]" /> {job.location}
                      </span>
                      <span className="flex items-center gap-2">
                        <Briefcase size={12} className="text-[#FFAF2B]" /> {job.department}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock size={12} className="text-[#FFAF2B]" /> {job.type}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 rounded-xl bg-gray-50 p-4 transition-all duration-500 group-hover:bg-[#FFAF2B] group-hover:text-[#001A3D]">
                    <MoveRight size={24} />
                  </div>
                </Motion.div>
              </Link>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-8 rounded-3xl border border-gray-100 bg-[#FAF9F6] p-10 md:flex-row">
            <div className="space-y-2 text-center md:text-left">
              <p className="text-lg font-semibold tracking-tight text-[#001A3D]">
                No relevant opening for your skill set?
              </p>
              <p className="text-sm font-medium text-gray-500">
                We're always looking for exceptional talent. Drop your resume in our talent pool.
              </p>
            </div>
            <Link
              href="/contact"
              className="rounded-sm bg-[#001A3D] px-10 py-4 text-center text-[11px] font-semibold tracking-wide text-white shadow-xl transition-all hover:bg-[#002b66] active:scale-95"
            >
              General Application
            </Link>
          </div>
        </div>
      </section>

      {/* Culture & Spirit */}
      <section className="relative bg-white py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex flex-col items-center gap-20 lg:flex-row">
            <div className="flex-1 space-y-10">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <span className="h-[1px] w-12 bg-[#001A3D]"></span>
                  <span className="text-[11px] font-semibold tracking-wide text-[#001A3D]">
                    The Hutech Spirit
                  </span>
                </div>
                <h2 className="display-font text-3xl leading-tight font-semibold tracking-tight text-[#001A3D] md:text-5xl">
                  Innovation is <br /> our <span className="text-[#FFAF2B]">North Star.</span>
                </h2>
              </div>
              <p className="max-w-xl text-lg leading-relaxed font-medium text-gray-500">
                We foster a culture of radical transparency and extreme ownership. Here, your ideas
                aren't just heard—they are engineered into reality. We believe in high-performance
                agility balanced with empathy.
              </p>

              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-2">
                  <div className="text-4xl font-semibold text-[#001A3D]">92%</div>
                  <p className="text-[11px] font-semibold tracking-wide text-gray-400">
                    Engineering Ratio
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-semibold text-[#FFAF2B]">15+</div>
                  <p className="text-[11px] font-semibold tracking-wide text-gray-400">
                    Global Tech Hubs
                  </p>
                </div>
              </div>
            </div>

            <div className="relative w-full flex-1">
              <div className="shadow-3xl relative z-10 aspect-[4/3] rotate-2 overflow-hidden rounded-[3rem]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1764391801025-9cee2194f564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Team Collaboration"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -inset-6 -z-10 -rotate-2 rounded-[4rem] bg-[#FFAF2B]/10"></div>
              <div className="absolute -bottom-10 -left-10 z-20 hidden rounded-3xl border-4 border-white bg-[#001A3D] p-8 shadow-2xl md:block">
                <div className="flex items-center gap-4">
                  <Award className="text-[#FFAF2B]" size={32} />
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-white">Great Place</p>
                    <p className="text-[11px] font-semibold text-[#FFAF2B]">To Work Certified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="border-y border-gray-100 bg-[#FAF9F6] py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mx-auto mb-20 max-w-3xl space-y-4 text-center">
            <h2 className="display-font text-3xl font-semibold tracking-tight text-[#001A3D] md:text-5xl">
              Our Selection DNA
            </h2>
            <div className="mx-auto h-1 w-16 bg-[#FFAF2B]"></div>
            <p className="text-sm font-medium text-gray-500 md:text-base">
              We look for clarity of thought, passion for problem-solving, and a commitment to
              excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
            {HIRING_PROCESS.map((item, idx) => (
              <Motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                <div className="flex h-full flex-col rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-500 hover:shadow-xl">
                  <div className="display-font mb-6 text-4xl font-semibold text-gray-100 transition-colors group-hover:text-[#FFAF2B]/20">
                    {item.step}
                  </div>
                  <h4 className="display-font mb-4 text-lg font-semibold tracking-tight text-[#001A3D] transition-colors group-hover:text-[#FFAF2B]">
                    {item.title}
                  </h4>
                  <p className="flex-grow text-xs leading-relaxed font-medium text-gray-500">
                    {item.desc}
                  </p>
                </div>
                {idx < 4 && (
                  <div className="absolute top-1/2 -right-4 z-20 hidden translate-x-1/2 md:block">
                    <ChevronRight className="text-gray-200" size={24} />
                  </div>
                )}
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-20 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-4">
              <div className="space-y-4">
                <div className="text-[11px] font-semibold tracking-wide text-[#FFAF2B]">
                  Perks & Benefits
                </div>
                <h2 className="display-font text-3xl leading-tight font-semibold tracking-tight text-[#001A3D] md:text-5xl">
                  Investing <br /> in your <br />
                  <span className="text-[#FFAF2B]">Success.</span>
                </h2>
              </div>
              <p className="leading-relaxed font-medium text-gray-500">
                We provide the resources, environment, and support you need to do the best work of
                your life.
              </p>
              <div className="space-y-4 rounded-3xl bg-[#001A3D] p-8 text-white">
                <GraduationCap className="text-[#FFAF2B]" size={32} />
                <h4 className="display-font text-lg font-semibold">Learning Budget</h4>
                <p className="text-xs leading-relaxed font-medium text-gray-400">
                  $5,000 annual allowance for certifications, conferences, and courses.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-8">
              {[
                {
                  icon: <ShieldCheck className="text-blue-500" />,
                  title: "Premium Health",
                  desc: "Comprehensive insurance for you and your dependents with mental wellness support.",
                },
                {
                  icon: <Zap className="text-yellow-500" />,
                  title: "Performance Bonus",
                  desc: "Quarterly rewards based on impact, innovation, and client success metrics.",
                },
                {
                  icon: <Clock className="text-green-500" />,
                  title: "Flexible Work",
                  desc: "Choose your environment. We support Remote, Hybrid, and In-office models globally.",
                },
                {
                  icon: <Smile className="text-orange-500" />,
                  title: "Time to Recharge",
                  desc: "Generous PTO, sabbatical programs, and 'Innovation Fridays' for your own projects.",
                },
                {
                  icon: <Cpu className="text-purple-500" />,
                  title: "Modern Stack",
                  desc: "Access the latest hardware and enterprise software tools to boost your productivity.",
                },
                {
                  icon: <Globe2 className="text-cyan-500" />,
                  title: "Global Mobility",
                  desc: "Opportunities to transfer to our offices across USA, Europe, and Asia Pacific.",
                },
              ].map((benefit, idx) => (
                <div
                  key={idx}
                  className="group rounded-2xl border border-gray-100 bg-gray-50 p-8 transition-all hover:border-[#FFAF2B]/30 hover:bg-white hover:shadow-lg"
                >
                  <div className="mb-6 transition-transform group-hover:scale-110">
                    {benefit.icon}
                  </div>
                  <h4 className="display-font mb-2 text-lg font-semibold tracking-tight text-[#001A3D]">
                    {benefit.title}
                  </h4>
                  <p className="text-xs leading-relaxed font-medium text-gray-500">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="overflow-hidden bg-[#001A3D] py-24 text-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex flex-col items-center gap-20 lg:flex-row">
            <div className="lg:w-1/2">
              <h2 className="display-font mb-8 text-3xl font-semibold tracking-tight md:text-5xl">
                Voices From <br />
                <span className="text-[#FFAF2B]">Within the Lab.</span>
              </h2>
              <Slider {...testimonialSettings}>
                {TESTIMONIALS.map((t, idx) => (
                  <div key={idx} className="outline-none">
                    <div className="space-y-8">
                      <p className="text-xl leading-relaxed font-medium text-gray-300 italic md:text-2xl">
                        "{t.text}"
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-[#FFAF2B]">
                          <ImageWithFallback
                            src={t.image}
                            alt={t.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="display-font text-lg font-semibold text-white">{t.name}</p>
                          <p className="text-[11px] font-semibold tracking-wide text-[#FFAF2B]">
                            {t.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
            <div className="hidden lg:block lg:w-1/2">
              <div className="relative aspect-square">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1522071823991-b1ae5e6a3048?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Company Culture"
                  className="h-full w-full rounded-[3rem] object-cover opacity-50 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D] to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          .custom-dots-careers {
            bottom: -60px !important;
            left: 0 !important;
            text-align: left !important;
            width: auto !important;
          }
          .custom-dots-careers li button:before {
            color: white !important;
            opacity: 0.3 !important;
          }
          .custom-dots-careers li.slick-active button:before {
            color: #FFAF2B !important;
            opacity: 1 !important;
          }
        `}</style>
      </section>

      {/* CTA Section */}
      <section className="border-t border-gray-100 bg-gray-50 py-20">
        <div className="mx-auto max-w-[1280px] space-y-12 px-6 text-center lg:px-20">
          <div className="mx-auto max-w-2xl space-y-6">
            <h2 className="display-font text-3xl leading-tight font-semibold tracking-tight text-[#001A3D] md:text-5xl">
              Your Next Chapter <br /> starts <span className="text-[#FFAF2B]">now.</span>
            </h2>
            <p className="leading-relaxed font-medium text-gray-500">
              Join a global team of visionaries, engineers, and creatives working together to build
              a more agile and innovative future.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex w-full items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:w-auto">
              <CalendarCheck className="text-[#FFAF2B]" size={24} />
              <div className="text-left">
                <p className="text-[11px] font-semibold tracking-wide text-[#001A3D]">
                  Interview Ready?
                </p>
                <p className="text-xs font-medium text-gray-500">Get tips for success</p>
              </div>
            </div>
            <div className="flex w-full items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:w-auto">
              <Zap className="text-[#FFAF2B]" size={24} />
              <div className="text-left">
                <p className="text-[11px] font-semibold tracking-wide text-[#001A3D]">Fast-Track</p>
                <p className="text-xs font-medium text-gray-500">Hiring in 14 days</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
