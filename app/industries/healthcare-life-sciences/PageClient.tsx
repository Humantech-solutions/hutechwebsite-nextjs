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
  BarChart3
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";
import { InlineContactForm } from "@/components/InlineContactForm";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

const HEALTHCARE_SERVICES = [
  {
    icon: Smartphone,
    title: "Healthcare App Development",
    description: "Whether you need a patient engagement portal, a doctor's appointment app, or a complete hospital management system, we provide custom healthcare app development services tailored to your specific needs."
  },
  {
    icon: Activity,
    title: "Telemedicine & Virtual Care",
    description: "Provide high-quality care remotely with our telemedicine solutions. We build secure, video-enabled platforms that allow doctors to consult with patients anywhere, anytime, while ensuring full regulatory compliance."
  },
  {
    icon: Database,
    title: "EHR/EMR Integration",
    description: "Streamline your healthcare operations with our EHR and EMR integration services. We help you digitize patient records, improve data accessibility, and ensure interoperability between different healthcare systems."
  },
  {
    icon: HeartPulse,
    title: "Health IoT & Wearables",
    description: "Leverage the power of IoT to monitor patients in real-time. We develop software that integrates with medical wearables to track vital signs, providing proactive care and better patient outcomes."
  },
  {
    icon: Microscope,
    title: "Pharmaceutical & Life Sciences",
    description: "Accelerate your research and development with our specialized software solutions for life sciences. We help pharmaceutical companies manage clinical trials, data analysis, and regulatory documentation."
  },
  {
    icon: Workflow,
    title: "Digital Health Consulting",
    description: "Navigate the complex landscape of digital health with our expert consulting services. We help you architect innovative, future-forward solutions that grow efficiency and drive value to your healthcare business."
  }
];

const ESSENTIAL_SOLUTIONS = [
  {
    icon: ShieldCheck,
    title: "HIPAA & GDPR Compliance",
    description: "Healthcare software must follow strict regulations. We ensure your platforms comply with HIPAA, GDPR, and other international health data standards to protect sensitive information."
  },
  {
    icon: Lock,
    title: "Patient Data Security",
    description: "Security is non-negotiable in healthcare. We implement robust encryption, multi-factor authentication, and secure cloud storage to safeguard patient records from cyber threats."
  },
  {
    icon: Zap,
    title: "Operational Efficiency",
    description: "Our solutions automate administrative tasks, patient scheduling, and billing processes, allowing healthcare providers to focus more on patient care and less on paperwork."
  },
  {
    icon: Target,
    title: "Scalability for Growth",
    description: "As your healthcare facility expands, our custom platforms scale with you, handling increased patient loads and data volumes without compromising on performance."
  },
  {
    icon: Heart,
    title: "Patient-Centric Experience",
    description: "We design user-friendly interfaces that improve patient engagement, making it easier for them to access records, book appointments, and communicate with providers."
  },
  {
    icon: BarChart3,
    title: "Data-Driven Diagnostics",
    description: "Advanced analytics and AI help healthcare professionals gain deeper insights into patient health trends, allowing for earlier diagnosis and more personalized treatment plans."
  }
];

const INNOVATIONS = [
  {
    icon: Cpu,
    title: "AI & Machine Learning",
    description: "From predictive analytics for patient outcomes to AI-powered medical imaging and diagnostics, we bring the latest machine learning models to your healthcare platforms."
  },
  {
    icon: Globe,
    title: "Remote Patient Monitoring",
    description: "Empower patients to manage their chronic conditions from home with remote monitoring tools that alert providers to any changes in vital statistics in real-time."
  },
  {
    icon: Cloud,
    title: "Cloud-Native Health Data",
    description: "Transition your legacy systems to secure, resilient cloud environments that offer high availability and seamless data sharing across different healthcare departments."
  },
  {
    icon: Lock,
    title: "Blockchain for Health Records",
    description: "Ensure the integrity and traceability of medical records with blockchain technology, creating a secure and transparent system for sharing patient data among providers."
  },
  {
    icon: Smartphone,
    title: "Mobile Health (mHealth)",
    description: "Developing comprehensive mobile health solutions that put healthcare in the palm of the patient's hand, increasing accessibility and improving adherence to treatments."
  },
  {
    icon: Sparkles,
    title: "Augmented Reality in Health",
    description: "Utilizing AR and VR for medical training, surgical planning, and patient education, providing an immersive experience that enhances understanding and precision."
  }
];

const WHY_CHOOSE = [
  {
    title: "Deep Healthcare Expertise",
    description: "We have years of experience working with hospitals, clinics, and pharmaceutical companies, understanding the unique challenges of the healthcare sector."
  },
  {
    title: "Regulatory First Approach",
    description: "Compliance is never an afterthought. We build healthcare solutions with regulatory standards integrated into the core architecture from day one."
  },
  {
    title: "End-to-End Development",
    description: "From initial discovery and strategy through to deployment and ongoing support, we handle the entire development lifecycle of your healthcare project."
  },
  {
    title: "Customized & Scalable",
    description: "We don't believe in one-size-fits-all. Every solution we build is tailored to your specific workflow and designed to grow as your business grows."
  }
];

const FAQS = [
  {
    question: "How do you ensure HIPAA compliance in healthcare apps?",
    answer: "We ensure HIPAA compliance by implementing strict data encryption (at rest and in transit), secure user authentication, role-based access control, and detailed audit trails for all data interactions."
  },
  {
    question: "What types of healthcare businesses do you work with?",
    answer: "We work with a wide range of healthcare organizations, including large hospitals, private clinics, telemedicine startups, pharmaceutical companies, and health insurance providers."
  },
  {
    question: "Can you integrate our existing legacy systems with new digital solutions?",
    answer: "Yes, we specialize in healthcare interoperability. We can build custom APIs and use HL7/FHIR standards to integrate your legacy EHR/EMR systems with modern mobile apps and web portals."
  },
  {
    question: "Do you offer post-launch support and maintenance?",
    answer: "Absolutely. We provide comprehensive maintenance services, including regular security patches, performance updates, and new feature development to ensure your healthcare platform stays current."
  },
  {
    question: "How does AI benefit healthcare applications?",
    answer: "AI can be used for predictive patient analytics, automating medical transcription, enhancing medical imaging diagnosis, and providing personalized health recommendations through chatbots and virtual assistants."
  }
];

const BLOG_POSTS = [
  {
    title: "The Future of Telemedicine: Trends to Watch in 2026",
    description: "As virtual care becomes the new standard, we explore the innovations that are making remote consultations more effective and accessible...",
    image: "https://images.unsplash.com/photo-1656428964836-78d54bf76231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    title: "Ensuring Data Privacy in the Age of Digital Health",
    description: "With health data breaches on the rise, learn how Hutech Solutions implements advanced security protocols to protect sensitive patient information...",
    image: "https://images.unsplash.com/photo-1645685491865-42a4fbbc9912?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    title: "AI in Clinical Trials: Accelerating Drug Discovery",
    description: "Discover how pharmaceutical companies are leveraging machine learning to shorten clinical trial timelines and bring life-saving treatments to market faster...",
    image: "https://images.unsplash.com/photo-1758691462774-f01ed567f2c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left group"
      >
        <span className={`text-lg md:text-xl font-bold transition-colors ${isOpen ? "text-[#0171c1]" : "text-[#001A3D] group-hover:text-[#0171c1]"}`}>{question}</span>
        <div className={`w-8 h-8 flex items-center justify-center transition-all ${isOpen ? "text-[#0171c1]" : "text-gray-400"}`}>
          <ChevronRight className={`transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} />
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
            <p className="pb-8 text-gray-500 text-lg leading-relaxed">{answer}</p>
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
      <section className="bg-[#001A3D] text-white h-[450px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1666886573212-2de95596d509?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Healthcare Digital Transformation"
            className="w-full h-full object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/80 to-transparent"></div>
        </div>
        
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-20 z-10 w-full">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[1px] bg-[#FFAF2B]"></span>
              <span className="text-[#FFAF2B] font-bold uppercase tracking-[0.3em] text-[10px]">Healthcare Excellence</span>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight display-font mb-8">
              Your Healthcare Vision. Our Code. <br />
              <span className="text-[#FFAF2B]">One Digital Health Revolution.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed">
              We craft patient-centric digital health experiences through cutting-edge software solutions and expert consulting for providers and life science organizations.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font leading-tight">
                  Empowering Healthcare & Life Sciences with Smart, Scalable, AI-Driven Solutions
                </h2>
                <div className="w-20 h-1 bg-[#0171c1]"></div>
              </div>
              <div className="space-y-6">
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  At Hutech Solutions, we bring deep expertise in implementing, supporting, and managing healthcare technology platforms. Our end-to-end solutions include system implementation, custom upgrades, performance optimization, and HIPAA-compliant third-party integrations.
                </p>
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  We ensure our clients can operate with agility, security, and compliance, enabling them to expand care services and integrate fresh digital health solutions to meet specific patient and regulatory needs.
                </p>
              </div>
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-[#001A3D] display-font">10+</p>
                  <p className="text-[10px] font-bold text-[#0171c1] uppercase tracking-widest">Health Verticals</p>
                </div>
                <div className="w-[1px] h-12 bg-gray-200 hidden md:block"></div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-[#001A3D] display-font">HIPAA</p>
                  <p className="text-[10px] font-bold text-[#0171c1] uppercase tracking-widest">Full Compliance</p>
                </div>
                <div className="w-[1px] h-12 bg-gray-200 hidden md:block"></div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-[#001A3D] display-font">24/7</p>
                  <p className="text-[10px] font-bold text-[#0171c1] uppercase tracking-widest">Patient Support</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-sm overflow-hidden shadow-2xl">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1758691462774-f01ed567f2c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                  alt="Medical Innovation" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-[#0171c1] p-10 text-white space-y-4 max-w-xs shadow-2xl hidden md:block">
                <Activity size={32} strokeWidth={1.5} />
                <h3 className="text-xl font-bold display-font">Proactive Care</h3>
                <p className="text-sm font-medium opacity-80 leading-relaxed">
                  Integrating AI and cloud-native services across medical platforms to streamline tasks and enhance patient outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Our Services in Healthcare & Life Sciences</h2>
            <p className="text-lg text-gray-500 max-w-4xl mx-auto font-medium leading-relaxed">
              At Hutech Solutions, we specialize in delivering cutting-edge software technology solutions tailored for the healthcare and life sciences industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {HEALTHCARE_SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-12 shadow-sm border border-gray-100 flex flex-col space-y-6 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Icon size={80} strokeWidth={1} />
                  </div>
                  <div className="w-16 h-16 rounded-sm bg-gray-50 flex items-center justify-center text-[#0171c1] group-hover:bg-[#0171c1] group-hover:text-white transition-all duration-500">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-[#001A3D] display-font leading-tight">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">{service.description}</p>
                  <div className="pt-4 mt-auto">
                    <Link href="/contact" className="inline-flex items-center gap-2 text-[10px] font-bold text-[#0171c1] uppercase tracking-widest group-hover:gap-4 transition-all">
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
      <section className="py-24 bg-[#001A3D] text-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold display-font leading-tight max-w-4xl mx-auto">
              What Makes Custom Healthcare Solutions Essential for Your Business?
            </h2>
            <div className="w-20 h-1 bg-[#0171c1] mx-auto"></div>
            <p className="text-gray-400 max-w-3xl mx-auto font-medium text-lg leading-relaxed">
              In the rapidly evolving medical landscape, custom software solutions are key to ensuring data safety and improving care quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10">
            {ESSENTIAL_SOLUTIONS.map((item, i) => {
              const Icon = item.icon;
              return (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-6 p-8 border border-white/5 hover:bg-white/5 transition-colors rounded-sm group"
                >
                  <div className="w-14 h-14 bg-white/10 rounded-sm flex items-center justify-center text-[#0171c1] group-hover:scale-110 transition-transform">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold display-font tracking-tight">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed font-medium">{item.description}</p>
                  </div>
                </Motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Innovations Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Which Innovations Can Transform Your Health Services?</h2>
            <p className="text-lg text-gray-500 font-medium max-w-3xl mx-auto leading-relaxed">
              Incorporating advanced technologies can significantly enhance your healthcare offerings for the modern age.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {INNOVATIONS.map((item, i) => {
              const Icon = item.icon;
              return (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center space-y-6 group"
                >
                  <div className="text-[#0171c1] group-hover:scale-110 transition-transform duration-500">
                    <Icon size={56} strokeWidth={1} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-[#001A3D] display-font tracking-tight">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium max-w-sm">{item.description}</p>
                  </div>
                </Motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section / Strategy */}
      <section className="py-24 bg-[#F2F2F2] overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 space-y-10">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font leading-[1.2]">
                  Discover Your Healthcare Digital Transformation Strategy With Us
                </h2>
                <div className="w-20 h-1 bg-[#0171c1]"></div>
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  Schedule a consultation with our expert HealthTech team and take the first step towards a digital-first medical experience.
                </p>
              </div>
              <div>
                <Link href="/contact" className="inline-flex items-center gap-3 bg-[#FFAF2B] text-[#001A3D] px-10 py-5 font-bold uppercase tracking-wider text-[11px] hover:bg-[#001A3D] hover:text-white transition-all duration-500 shadow-xl rounded-sm">
                  Consult Us Now <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="aspect-video bg-white p-2 rounded-sm shadow-2xl relative z-10">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1645685491865-42a4fbbc9912?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                  alt="Medical Analytics" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#0171c1]/5 blur-3xl rounded-full -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#FFAF2B]/10 blur-2xl rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Why Choose Hutech Solutions for Your Healthcare Project?</h2>
            <p className="text-lg text-gray-500 font-medium max-w-4xl mx-auto leading-relaxed">
              At Hutech Solutions, we specialize in delivering Healthcare and Life Sciences solutions tailored to your unique clinical needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
            {WHY_CHOOSE.map((item, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-8 group"
              >
                <div className="w-14 h-14 bg-[#0171c1]/5 flex items-center justify-center text-[#0171c1] shrink-0 group-hover:bg-[#0171c1] group-hover:text-white transition-all duration-500 rounded-sm">
                  <Zap size={24} strokeWidth={1.5} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#001A3D] display-font tracking-tight">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">{item.description}</p>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-7 bg-white p-10 md:p-14 shadow-2xl border border-gray-100 rounded-sm">
              <h2 className="text-3xl font-bold text-[#001A3D] display-font mb-10">Share Your Medical Project With Us</h2>
              <InlineContactForm textareaPlaceholder="Message" category="Industries" />
            </div>
            <div className="lg:col-span-5 space-y-12 py-8">
              <h2 className="text-3xl font-bold text-[#001A3D] display-font">What Is The Next Step?</h2>
              <div className="space-y-10">
                {[
                  { icon: MessageSquare, text: "A healthcare consultant will review your request and contact you within a few hours." },
                  { icon: FileText, text: "We will schedule a deep-dive session to understand your clinical workflow and compliance needs." },
                  { icon: Sparkles, text: "You will receive a detailed proposal including technical architecture and regulatory roadmaps." }
                ].map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={i} className="flex items-start gap-8 group">
                      <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center text-[#0171c1] group-hover:bg-[#0171c1] group-hover:text-white group-hover:border-[#0171c1] transition-all duration-500 shrink-0">
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      <p className="text-gray-500 font-medium leading-relaxed text-lg pt-2">{step.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font tracking-tight">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-[#0171c1] mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto divide-y divide-gray-100">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Resource Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="flex justify-between items-end mb-16 gap-8">
            <div className="space-y-6 max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Healthcare Insights & Articles</h2>
              <p className="text-lg text-gray-500 font-medium">
                Explore our latest thinking on medical technology and digital health trends.
              </p>
            </div>
            <Link href="/resources" className="hidden md:flex items-center gap-2 text-[11px] font-bold text-[#0171c1] uppercase tracking-widest hover:gap-4 transition-all pb-2">
              View All Resources <MoveRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {BLOG_POSTS.map((post, i) => (
              <div key={i} className="bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <ImageWithFallback 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#0171c1] text-white text-[9px] font-bold px-3 py-1 uppercase tracking-widest rounded-sm">HealthTech</span>
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="text-xl font-bold text-[#001A3D] display-font group-hover:text-[#0171c1] transition-colors line-clamp-2 leading-tight min-h-[3.5rem]">{post.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 font-medium">{post.description}</p>
                  <div className="pt-4 border-t border-gray-50">
                    <Link href="/resources" className="inline-flex items-center gap-2 text-[10px] font-bold text-[#001A3D] uppercase tracking-widest hover:text-[#0171c1] transition-colors">
                      Read Article <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center md:hidden">
            <Link href="/resources" className="inline-flex items-center gap-3 bg-[#0171c1] text-white px-10 py-5 font-bold uppercase tracking-wider text-[11px] shadow-xl rounded-sm">
              Explore Resources <MoveRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
