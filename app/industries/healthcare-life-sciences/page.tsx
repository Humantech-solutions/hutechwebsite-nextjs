"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ShieldCheck,
  Activity,
  Stethoscope,
  Smartphone,
  Database,
  Cloud,
  Cpu,
  Zap,
  Lock,
  FileText,
  Workflow,
  Sparkles,
  ChevronRight,
  MoveRight,
  ArrowRight,
  MessageSquare,
  Users,
  Building2,
  Heart,
  HeartPulse,
  Microscope,
  Target,
  LayoutGrid,
  Globe,
  BarChart3,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

const HEALTHCARE_SERVICES = [
  {
    icon: Smartphone,
    title: "Healthcare App Development",
    description:
      "Whether you need a patient engagement portal, a doctor's appointment app, or a complete hospital management system, we provide custom healthcare app development services tailored to your specific needs.",
  },
  {
    icon: Activity,
    title: "Telemedicine & Virtual Care",
    description:
      "Provide high-quality care remotely with our telemedicine solutions. We build secure, video-enabled platforms that allow doctors to consult with patients anywhere, anytime, while ensuring full regulatory compliance.",
  },
  {
    icon: Database,
    title: "EHR/EMR Integration",
    description:
      "Streamline your healthcare operations with our EHR and EMR integration services. We help you digitize patient records, improve data accessibility, and ensure interoperability between different healthcare systems.",
  },
  {
    icon: HeartPulse,
    title: "Health IoT & Wearables",
    description:
      "Leverage the power of IoT to monitor patients in real-time. We develop software that integrates with medical wearables to track vital signs, providing proactive care and better patient outcomes.",
  },
  {
    icon: Microscope,
    title: "Pharmaceutical & Life Sciences",
    description:
      "Accelerate your research and development with our specialized software solutions for life sciences. We help pharmaceutical companies manage clinical trials, data analysis, and regulatory documentation.",
  },
  {
    icon: Workflow,
    title: "Digital Health Consulting",
    description:
      "Navigate the complex landscape of digital health with our expert consulting services. We help you architect innovative, future-forward solutions that grow efficiency and drive value to your healthcare business.",
  },
];

const ESSENTIAL_SOLUTIONS = [
  {
    icon: ShieldCheck,
    title: "HIPAA & GDPR Compliance",
    description:
      "Healthcare software must follow strict regulations. We ensure your platforms comply with HIPAA, GDPR, and other international health data standards to protect sensitive information.",
  },
  {
    icon: Lock,
    title: "Patient Data Security",
    description:
      "Security is non-negotiable in healthcare. We implement robust encryption, multi-factor authentication, and secure cloud storage to safeguard patient records from cyber threats.",
  },
  {
    icon: Zap,
    title: "Operational Efficiency",
    description:
      "Our solutions automate administrative tasks, patient scheduling, and billing processes, allowing healthcare providers to focus more on patient care and less on paperwork.",
  },
  {
    icon: Target,
    title: "Scalability for Growth",
    description:
      "As your healthcare facility expands, our custom platforms scale with you, handling increased patient loads and data volumes without compromising on performance.",
  },
  {
    icon: Heart,
    title: "Patient-Centric Experience",
    description:
      "We design user-friendly interfaces that improve patient engagement, making it easier for them to access records, book appointments, and communicate with providers.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Diagnostics",
    description:
      "Advanced analytics and AI help healthcare professionals gain deeper insights into patient health trends, allowing for earlier diagnosis and more personalized treatment plans.",
  },
];

const INNOVATIONS = [
  {
    icon: Cpu,
    title: "AI & Machine Learning",
    description:
      "From predictive analytics for patient outcomes to AI-powered medical imaging and diagnostics, we bring the latest machine learning models to your healthcare platforms.",
  },
  {
    icon: Globe,
    title: "Remote Patient Monitoring",
    description:
      "Empower patients to manage their chronic conditions from home with remote monitoring tools that alert providers to any changes in vital statistics in real-time.",
  },
  {
    icon: Cloud,
    title: "Cloud-Native Health Data",
    description:
      "Transition your legacy systems to secure, resilient cloud environments that offer high availability and seamless data sharing across different healthcare departments.",
  },
  {
    icon: Lock,
    title: "Blockchain for Health Records",
    description:
      "Ensure the integrity and traceability of medical records with blockchain technology, creating a secure and transparent system for sharing patient data among providers.",
  },
  {
    icon: Smartphone,
    title: "Mobile Health (mHealth)",
    description:
      "Developing comprehensive mobile health solutions that put healthcare in the palm of the patient's hand, increasing accessibility and improving adherence to treatments.",
  },
  {
    icon: Sparkles,
    title: "Augmented Reality in Health",
    description:
      "Utilizing AR and VR for medical training, surgical planning, and patient education, providing an immersive experience that enhances understanding and precision.",
  },
];

const WHY_CHOOSE = [
  {
    title: "Deep Healthcare Expertise",
    description:
      "We have years of experience working with hospitals, clinics, and pharmaceutical companies, understanding the unique challenges of the healthcare sector.",
  },
  {
    title: "Regulatory First Approach",
    description:
      "Compliance is never an afterthought. We build healthcare solutions with regulatory standards integrated into the core architecture from day one.",
  },
  {
    title: "End-to-End Development",
    description:
      "From initial discovery and strategy through to deployment and ongoing support, we handle the entire development lifecycle of your healthcare project.",
  },
  {
    title: "Customized & Scalable",
    description:
      "We don't believe in one-size-fits-all. Every solution we build is tailored to your specific workflow and designed to grow as your business grows.",
  },
];

const FAQS = [
  {
    question: "How do you ensure HIPAA compliance in healthcare apps?",
    answer:
      "We ensure HIPAA compliance by implementing strict data encryption (at rest and in transit), secure user authentication, role-based access control, and detailed audit trails for all data interactions.",
  },
  {
    question: "What types of healthcare businesses do you work with?",
    answer:
      "We work with a wide range of healthcare organizations, including large hospitals, private clinics, telemedicine startups, pharmaceutical companies, and health insurance providers.",
  },
  {
    question: "Can you integrate our existing legacy systems with new digital solutions?",
    answer:
      "Yes, we specialize in healthcare interoperability. We can build custom APIs and use HL7/FHIR standards to integrate your legacy EHR/EMR systems with modern mobile apps and web portals.",
  },
  {
    question: "Do you offer post-launch support and maintenance?",
    answer:
      "Absolutely. We provide comprehensive maintenance services, including regular security patches, performance updates, and new feature development to ensure your healthcare platform stays current.",
  },
  {
    question: "How does AI benefit healthcare applications?",
    answer:
      "AI can be used for predictive patient analytics, automating medical transcription, enhancing medical imaging diagnosis, and providing personalized health recommendations through chatbots and virtual assistants.",
  },
];

const BLOG_POSTS = [
  {
    title: "The Future of Telemedicine: Trends to Watch in 2026",
    description:
      "As virtual care becomes the new standard, we explore the innovations that are making remote consultations more effective and accessible...",
    image:
      "https://images.unsplash.com/photo-1656428964836-78d54bf76231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    title: "Ensuring Data Privacy in the Age of Digital Health",
    description:
      "With health data breaches on the rise, learn how Hutech Solutions implements advanced security protocols to protect sensitive patient information...",
    image:
      "https://images.unsplash.com/photo-1645685491865-42a4fbbc9912?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    title: "AI in Clinical Trials: Accelerating Drug Discovery",
    description:
      "Discover how pharmaceutical companies are leveraging machine learning to shorten clinical trial timelines and bring life-saving treatments to market faster...",
    image:
      "https://images.unsplash.com/photo-1758691462774-f01ed567f2c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-center justify-between py-6 text-left"
      >
        <span
          className={`text-lg font-bold transition-colors md:text-xl ${isOpen ? "text-[#0171c1]" : "text-[#001A3D] group-hover:text-[#0171c1]"}`}
        >
          {question}
        </span>
        <div
          className={`flex h-8 w-8 items-center justify-center transition-all ${isOpen ? "text-[#0171c1]" : "text-gray-400"}`}
        >
          <ChevronRight
            className={`transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
          />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-lg leading-relaxed text-gray-500">{answer}</p>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HealthcareLifeSciences() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="Healthcare & Life Sciences App Development | Hutech Solutions"
        description="Empowering Healthcare with Smart, Scalable, AI-Driven Solutions. Specialized in telemedicine, EHR integration, and HIPAA compliant app development."
      />

      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1666886573212-2de95596d509?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Healthcare Digital Transformation"
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
                Healthcare Excellence
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              Your Healthcare Vision. Our Code. <br />
              <span className="text-[#F99D1C]">One Digital Health Revolution.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              We craft patient-centric digital health experiences through cutting-edge software
              solutions and expert consulting for providers and life science organizations.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="display-font text-3xl leading-tight font-semibold text-[#001A3D] md:text-5xl">
                  Empowering Healthcare & Life Sciences with Smart, Scalable, AI-Driven Solutions
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
              </div>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  At Hutech Solutions, we bring deep expertise in implementing, supporting, and
                  managing healthcare technology platforms. Our end-to-end solutions include system
                  implementation, custom upgrades, performance optimization, and HIPAA-compliant
                  third-party integrations.
                </p>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  We ensure our clients can operate with agility, security, and compliance, enabling
                  them to expand care services and integrate fresh digital health solutions to meet
                  specific patient and regulatory needs.
                </p>
              </div>
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">10+</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Health Verticals
                  </p>
                </div>
                <div className="hidden h-12 w-[1px] bg-gray-200 md:block"></div>
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">HIPAA</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Full Compliance
                  </p>
                </div>
                <div className="hidden h-12 w-[1px] bg-gray-200 md:block"></div>
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">24/7</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Patient Support
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-sm shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758691462774-f01ed567f2c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Medical Innovation"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 hidden max-w-xs space-y-4 bg-[#0171c1] p-10 text-white shadow-2xl md:block">
                <Activity size={32} strokeWidth={1.5} />
                <h3 className="display-font text-xl font-bold">Proactive Care</h3>
                <p className="text-sm leading-relaxed font-medium opacity-80">
                  Integrating AI and cloud-native services across medical platforms to streamline
                  tasks and enhance patient outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
              Our Services in Healthcare & Life Sciences
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              At Hutech Solutions, we specialize in delivering cutting-edge software technology
              solutions tailored for the healthcare and life sciences industry.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {HEALTHCARE_SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative flex flex-col space-y-6 overflow-hidden border border-gray-100 bg-white p-12 shadow-sm transition-all duration-500 hover:shadow-2xl"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5 transition-opacity group-hover:opacity-10">
                    <Icon size={80} strokeWidth={1} />
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-sm bg-gray-50 text-[#0171c1] transition-all duration-500 group-hover:bg-[#0171c1] group-hover:text-white">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="display-font text-xl leading-tight font-bold text-[#001A3D]">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-medium text-gray-500">
                    {service.description}
                  </p>
                  <div className="mt-auto pt-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#0171c1] uppercase transition-all group-hover:gap-4"
                    >
                      Learn More <MoveRight size={14} />
                    </Link>
                  </div>
                </Motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Essential Solutions Section (Dark) */}
      <section className="overflow-hidden bg-[#001A3D] py-24 text-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font mx-auto max-w-4xl text-3xl leading-tight font-semibold md:text-5xl">
              What Makes Custom Healthcare Solutions Essential for Your Business?
            </h2>
            <div className="mx-auto h-1 w-20 bg-[#0171c1]"></div>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-400">
              In the rapidly evolving medical landscape, custom software solutions are key to
              ensuring data safety and improving care quality.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {ESSENTIAL_SOLUTIONS.map((item, i) => {
              const Icon = item.icon;
              return (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group space-y-6 rounded-sm border border-white/5 p-8 transition-colors hover:bg-white/5"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-sm bg-white/10 text-[#0171c1] transition-transform group-hover:scale-110">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="display-font text-xl font-bold tracking-tight">{item.title}</h3>
                    <p className="text-sm leading-relaxed font-medium text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </Motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Innovations Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
              Which Innovations Can Transform Your Health Services?
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-500">
              Incorporating advanced technologies can significantly enhance your healthcare
              offerings for the modern age.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {INNOVATIONS.map((item, i) => {
              const Icon = item.icon;
              return (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex flex-col items-center space-y-6 text-center"
                >
                  <div className="text-[#0171c1] transition-transform duration-500 group-hover:scale-110">
                    <Icon size={56} strokeWidth={1} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="display-font text-xl font-bold tracking-tight text-[#001A3D]">
                      {item.title}
                    </h3>
                    <p className="max-w-sm text-sm leading-relaxed font-medium text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </Motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section / Strategy */}
      <section className="overflow-hidden bg-[#F2F2F2] py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex flex-col items-center gap-20 lg:flex-row">
            <div className="flex-1 space-y-10">
              <div className="space-y-6">
                <h2 className="display-font text-3xl leading-[1.2] font-semibold text-[#001A3D] md:text-5xl">
                  Discover Your Healthcare Digital Transformation Strategy With Us
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  Schedule a consultation with our expert HealthTech team and take the first step
                  towards a digital-first medical experience.
                </p>
              </div>
              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-sm bg-[#F99D1C] px-10 py-5 text-[11px] font-bold tracking-wider text-[#001A3D] uppercase shadow-xl transition-all duration-500 hover:bg-[#001A3D] hover:text-white"
                >
                  Consult Us Now <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="relative flex-1">
              <div className="relative z-10 aspect-video rounded-sm bg-white p-2 shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1645685491865-42a4fbbc9912?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Medical Analytics"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -top-10 -right-10 -z-10 h-64 w-64 rounded-full bg-[#0171c1]/5 blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 -z-10 h-48 w-48 rounded-full bg-[#F99D1C]/10 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
              Why Choose Hutech Solutions for Your Healthcare Project?
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              At Hutech Solutions, we specialize in delivering Healthcare and Life Sciences
              solutions tailored to your unique clinical needs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-20 gap-y-16 md:grid-cols-2">
            {WHY_CHOOSE.map((item, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group flex items-start gap-8"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm bg-[#0171c1]/5 text-[#0171c1] transition-all duration-500 group-hover:bg-[#0171c1] group-hover:text-white">
                  <Zap size={24} strokeWidth={1.5} />
                </div>
                <div className="space-y-4">
                  <h3 className="display-font text-xl font-bold tracking-tight text-[#001A3D]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-medium text-gray-500">
                    {item.description}
                  </p>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-20 lg:grid-cols-12">
            <div className="rounded-sm border border-gray-100 bg-white p-10 shadow-2xl md:p-14 lg:col-span-7">
              <h2 className="display-font mb-10 text-3xl font-bold text-[#001A3D]">
                Share Your Medical Project With Us
              </h2>
              <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Name*"
                  className="w-full border border-gray-200 p-4 text-sm font-medium transition-all outline-none focus:border-[#0171c1]"
                />
                <input
                  type="email"
                  placeholder="Email*"
                  className="w-full border border-gray-200 p-4 text-sm font-medium transition-all outline-none focus:border-[#0171c1]"
                />
                <input
                  type="tel"
                  placeholder="Phone Number*"
                  className="w-full border border-gray-200 p-4 text-sm font-medium transition-all outline-none focus:border-[#0171c1] md:col-span-2"
                />
                <textarea
                  placeholder="Tell us about your healthcare needs"
                  rows={4}
                  className="w-full resize-none border border-gray-200 p-4 text-sm font-medium transition-all outline-none focus:border-[#0171c1] md:col-span-2"
                ></textarea>
                <div className="md:col-span-2">
                  <button className="w-full rounded-sm bg-[#F99D1C] px-12 py-5 text-[11px] font-bold tracking-wider text-[#001A3D] uppercase shadow-xl transition-all duration-500 hover:bg-[#001A3D] hover:text-white md:w-auto">
                    Submit Project Request
                  </button>
                </div>
              </form>
            </div>
            <div className="space-y-12 py-8 lg:col-span-5">
              <h2 className="display-font text-3xl font-bold text-[#001A3D]">
                What Is The Next Step?
              </h2>
              <div className="space-y-10">
                {[
                  {
                    icon: MessageSquare,
                    text: "A healthcare consultant will review your request and contact you within a few hours.",
                  },
                  {
                    icon: FileText,
                    text: "We will schedule a deep-dive session to understand your clinical workflow and compliance needs.",
                  },
                  {
                    icon: Sparkles,
                    text: "You will receive a detailed proposal including technical architecture and regulatory roadmaps.",
                  },
                ].map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={i} className="group flex items-start gap-8">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gray-200 text-[#0171c1] transition-all duration-500 group-hover:border-[#0171c1] group-hover:bg-[#0171c1] group-hover:text-white">
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      <p className="pt-2 text-lg leading-relaxed font-medium text-gray-500">
                        {step.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl font-semibold tracking-tight text-[#001A3D] md:text-5xl">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto h-1 w-20 bg-[#0171c1]"></div>
          </div>
          <div className="mx-auto max-w-4xl divide-y divide-gray-100">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Resource Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-16 flex items-end justify-between gap-8">
            <div className="max-w-2xl space-y-6">
              <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
                Healthcare Insights & Articles
              </h2>
              <p className="text-lg font-medium text-gray-500">
                Explore our latest thinking on medical technology and digital health trends.
              </p>
            </div>
            <Link
              href="/resources"
              className="hidden items-center gap-2 pb-2 text-[11px] font-bold tracking-widest text-[#0171c1] uppercase transition-all hover:gap-4 md:flex"
            >
              View All Resources <MoveRight size={16} />
            </Link>
          </div>

          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {BLOG_POSTS.map((post, i) => (
              <div
                key={i}
                className="group overflow-hidden rounded-sm bg-white shadow-sm transition-all duration-500 hover:shadow-2xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="rounded-sm bg-[#0171c1] px-3 py-1 text-[9px] font-bold tracking-widest text-white uppercase">
                      HealthTech
                    </span>
                  </div>
                </div>
                <div className="space-y-4 p-8">
                  <h3 className="display-font line-clamp-2 min-h-[3.5rem] text-xl leading-tight font-bold text-[#001A3D] transition-colors group-hover:text-[#0171c1]">
                    {post.title}
                  </h3>
                  <p className="line-clamp-3 text-sm leading-relaxed font-medium text-gray-500">
                    {post.description}
                  </p>
                  <div className="border-t border-gray-50 pt-4">
                    <Link
                      href="/resources"
                      className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#001A3D] uppercase transition-colors hover:text-[#0171c1]"
                    >
                      Read Article <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center md:hidden">
            <Link
              href="/resources"
              className="inline-flex items-center gap-3 rounded-sm bg-[#0171c1] px-10 py-5 text-[11px] font-bold tracking-wider text-white uppercase shadow-xl"
            >
              Explore Resources <MoveRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
