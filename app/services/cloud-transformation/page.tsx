"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ShieldCheck, 
  Cloud, 
  Server, 
  Cpu, 
  Zap, 
  BarChart3, 
  MoveRight, 
  ArrowRight, 
  ChevronRight,
  TrendingUp,
  Workflow,
  Smartphone,
  Lock,
  MessageSquare,
  FileText,
  Sparkles,
  Database,
  RefreshCw,
  LayoutGrid,
  Search,
  Users,
  Building2,
  Globe,
  Settings,
  HardHat,
  Network
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

const CLOUD_SERVICES = [
  {
    icon: Cloud,
    title: "Cloud Migration Strategy",
    description: "Navigate your journey to the cloud with confidence. We develop comprehensive roadmaps—including Rehost, Refactor, and Replatform strategies—to ensure a seamless transition for your legacy systems."
  },
  {
    icon: Database,
    title: "Hybrid & Multi-Cloud Solutions",
    description: "Maximize flexibility and avoid vendor lock-in. We design and manage complex architectures across AWS, Azure, and Google Cloud, ensuring your workloads are optimized for performance and cost."
  },
  {
    icon: Cpu,
    title: "Cloud-Native Development",
    description: "Build for the future of the web. We leverage microservices, containers (Kubernetes), and serverless architectures to create highly scalable, resilient, and high-performance applications."
  },
  {
    icon: Zap,
    title: "Cloud Cost Optimization",
    description: "Stop overspending on unused resources. Our experts perform deep audits of your cloud infrastructure to identify waste, right-size instances, and implement automated cost-saving measures."
  },
  {
    icon: RefreshCw,
    title: "Legacy App Modernization",
    description: "Don't let aging software hold you back. We transform monolithic legacy applications into agile, cloud-ready systems that can take full advantage of modern infrastructure capabilities."
  },
  {
    icon: Network,
    title: "Managed Cloud Services",
    description: "Focus on your business while we handle the infrastructure. We provide 24/7 monitoring, security patching, and proactive maintenance for your entire cloud environment."
  }
];

const ESSENTIAL_SOLUTIONS = [
  {
    icon: Lock,
    title: "Zero-Trust Security",
    description: "Protect your cloud perimeter. We implement robust identity management, end-to-end encryption, and continuous security monitoring to ensure your data remains secure in the cloud."
  },
  {
    icon: Workflow,
    title: "DevOps & CI/CD Pipelines",
    description: "Accelerate your delivery cycles. We automate your development, testing, and deployment workflows, allowing your teams to ship features faster and with higher quality."
  },
  {
    icon: BarChart3,
    title: "Data Cloud & Analytics",
    description: "Unlock the value of your data. We build scalable data lakes and warehouses in the cloud, enabling real-time analytics and AI-driven insights for your organization."
  },
  {
    icon: ShieldCheck,
    title: "Disaster Recovery & Business Continuity",
    description: "Ensure your business never stops. We design automated backup and failover solutions that guarantee your systems are back online in minutes, not days."
  },
  {
    icon: Settings,
    title: "Infrastructure as Code (IaC)",
    description: "Automate your infrastructure management. We use Terraform and CloudFormation to define your environment in code, ensuring consistency, repeatability, and speed."
  },
  {
    icon: TrendingUp,
    title: "Performance Optimization",
    description: "Deliver lightning-fast experiences to your users. We optimize your cloud network, storage, and compute configurations to ensure peak performance under any load."
  }
];

const INNOVATIONS = [
  {
    icon: Sparkles,
    title: "AI-Powered Cloud Management",
    description: "Leverage machine learning to automate resource scaling and anomaly detection, ensuring your cloud remains efficient and self-healing."
  },
  {
    icon: Smartphone,
    title: "Edge Computing Integration",
    description: "Process data closer to the source. We integrate cloud backends with edge devices to reduce latency and improve response times for real-time applications."
  },
  {
    icon: Globe,
    title: "Sustainable Cloud Architectures",
    description: "Reduce your environmental impact. We design energy-efficient cloud solutions that align with your corporate sustainability goals and reduce your carbon footprint."
  },
  {
    icon: Database,
    title: "Serverless Computing",
    description: "Eliminate server management entirely. We build applications that scale automatically from zero to millions of users, charging you only for what you use."
  },
  {
    icon: Network,
    title: "Service Mesh Architectures",
    description: "Manage complex microservices communications with ease. We implement Istio and Linkerd to provide security, visibility, and control across your network."
  },
  {
    icon: Lock,
    title: "Confidential Computing",
    description: "Protect data even while it's being processed. We leverage TEE (Trusted Execution Environments) to ensure your most sensitive workloads remain private."
  }
];

const WHY_CHOOSE = [
  {
    title: "Cloud-Agnostic Expertise",
    description: "Our team is certified across AWS, Microsoft Azure, and Google Cloud Platform, ensuring you get the best tool for your specific business requirements."
  },
  {
    title: "Security-First Mindset",
    description: "We don't treat security as an afterthought. We build multi-layered protection into every layer of your cloud architecture from day one."
  },
  {
    title: "Proven Migration Framework",
    description: "We use a battle-tested methodology for cloud migration that minimizes risk, prevents data loss, and ensures zero disruption to your business operations."
  },
  {
    title: "Continuous ROI Focus",
    description: "We don't just move you to the cloud; we ensure it's profitable. Our focus is on long-term cost efficiency and maximizing your return on investment."
  }
];

const FAQS = [
  {
    question: "Which cloud provider is best for my business?",
    answer: "The 'best' provider depends on your existing tech stack, budget, and specific needs. AWS is great for vast services, Azure for Microsoft-centric environments, and GCP for data/AI. We help you choose the right one during our discovery phase."
  },
  {
    question: "How long does a cloud migration typically take?",
    answer: "Simple migrations can take 1-3 months, while complex enterprise transformations can take 6-12 months. We use a phased approach to deliver value early and often."
  },
  {
    question: "How do you ensure our data is secure during migration?",
    answer: "We use encrypted data transfer protocols, private connections, and rigorous pre-migration testing to ensure your data remains secure and integer throughout the entire process."
  },
  {
    question: "Can you help us reduce our monthly cloud bill?",
    answer: "Yes, cost optimization is a core part of our service. We identify underutilized resources, optimize instance sizing, and implement automated scaling to significantly reduce overhead."
  },
  {
    question: "Do you provide post-migration support?",
    answer: "Absolutely. We offer 24/7 managed cloud services to ensure your new environment remains secure, updated, and performing at its peak."
  }
];

const BLOG_POSTS = [
  {
    id: "1",
    title: "The Future of AI in Enterprise: Strategies for 2026",
    description: "Generative AI is no longer just a buzzword; it's becoming the backbone of modern enterprise operations...",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: "2",
    title: "Securing the Hybrid Cloud: A Zero-Trust Approach",
    description: "As organizations move to hybrid cloud environments, security becomes a more complex challenge...",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: "1",
    title: "FinOps: Bringing Financial Accountability to the Cloud",
    description: "Discover how a combined approach of technology and finance is helping companies get 100% visibility...",
    image: "https://images.unsplash.com/photo-1686061593213-98dad7c599b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
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

export default function CloudTransformation() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta 
        title="Cloud Transformation Services | Hutech Solutions"
        description="Accelerate your digital journey with Hutech's Cloud Transformation services. Specialized in cloud migration, modernization, and optimization."
      />
      
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="bg-[#001A3D] text-white h-[450px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Cloud Transformation Architecture"
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
              <span className="text-[#FFAF2B] font-bold uppercase tracking-[0.3em] text-[10px]">Cloud Excellence</span>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight display-font mb-8">
              Your Cloud Vision. <br />
              <span className="text-[#FFAF2B]">Infrastructure Revolution.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed">
              We craft intelligent cloud experiences through cutting-edge migration strategies and expert consulting for global enterprise leaders.
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
                  Empowering Organizations with Smart, Scalable Cloud-First Solutions
                </h2>
                <div className="w-20 h-1 bg-[#0171c1]"></div>
              </div>
              <div className="space-y-6">
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  At Hutech Solutions, we bring deep expertise in implementing, supporting, and managing integrated cloud platforms. Our end-to-end solutions include system implementation, custom upgrades, performance optimization, and seamless multi-cloud integrations.
                </p>
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  We ensure our clients can operate with agility, security, and efficiency, enabling them to expand operations and integrate fresh digital solutions to meet specific infrastructure and market needs.
                </p>
              </div>
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-[#001A3D] display-font">500+</p>
                  <p className="text-[10px] font-bold text-[#0171c1] uppercase tracking-widest">Migrations Completed</p>
                </div>
                <div className="w-[1px] h-12 bg-gray-200 hidden md:block"></div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-[#001A3D] display-font">40%</p>
                  <p className="text-[10px] font-bold text-[#0171c1] uppercase tracking-widest">Avg Cost Savings</p>
                </div>
                <div className="w-[1px] h-12 bg-gray-200 hidden md:block"></div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-[#001A3D] display-font">99.99%</p>
                  <p className="text-[10px] font-bold text-[#0171c1] uppercase tracking-widest">Uptime Guarantee</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-sm overflow-hidden shadow-2xl">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1667984390553-7f439e6ae401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                  alt="Cloud Migration Center" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-[#0171c1] p-10 text-white space-y-4 max-w-xs shadow-2xl hidden md:block">
                <Cloud size={32} strokeWidth={1.5} />
                <h3 className="text-xl font-bold display-font">Scalable Resilience</h3>
                <p className="text-sm font-medium opacity-80 leading-relaxed">
                  Integrating AI and cloud-native services across enterprise platforms to streamline tasks and enhance digital agility.
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
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Our Cloud Transformation Services</h2>
            <p className="text-lg text-gray-500 max-w-4xl mx-auto font-medium leading-relaxed">
              At Hutech Solutions, we specialize in delivering cutting-edge software technology solutions tailored for the global cloud infrastructure landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CLOUD_SERVICES.map((service, i) => {
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

      {/* Essential Solutions Section */}
      <section className="py-24 bg-[#001A3D] text-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold display-font leading-tight max-w-4xl mx-auto">
              What Makes Custom Cloud Solutions Essential for Your Business?
            </h2>
            <div className="w-20 h-1 bg-[#0171c1] mx-auto"></div>
            <p className="text-gray-400 max-w-3xl mx-auto font-medium text-lg leading-relaxed">
              In the modern digital landscape, custom cloud solutions are key to staying competitive and ensuring operational excellence.
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
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Which Innovations Can Transform Your Cloud Infrastructure?</h2>
            <p className="text-lg text-gray-500 font-medium max-w-3xl mx-auto leading-relaxed">
              Incorporating advanced technologies can significantly enhance your cloud capabilities for the digital-first era.
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
                  Discover Your Cloud Digital Transformation Strategy With Us
                </h2>
                <div className="w-20 h-1 bg-[#0171c1]"></div>
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  Schedule a consultation with our expert Cloud transformation team and take the first step towards a digital-first infrastructure experience.
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
                  src="https://images.unsplash.com/photo-1686061593213-98dad7c599b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                  alt="Cloud Cost Analytics" 
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
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Why Choose Hutech Solutions for Your Cloud Project?</h2>
            <p className="text-lg text-gray-500 font-medium max-w-4xl mx-auto leading-relaxed">
              At Hutech Solutions, we specialize in delivering Cloud Transformation solutions tailored to your unique organizational needs.
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
              <h2 className="text-3xl font-bold text-[#001A3D] display-font mb-10">Share Your Cloud Transformation Project With Us</h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Name*" className="w-full p-4 border border-gray-200 outline-none focus:border-[#0171c1] transition-all font-medium text-sm" />
                <input type="email" placeholder="Email*" className="w-full p-4 border border-gray-200 outline-none focus:border-[#0171c1] transition-all font-medium text-sm" />
                <input type="tel" placeholder="Phone Number*" className="w-full p-4 border border-gray-200 outline-none focus:border-[#0171c1] transition-all font-medium text-sm md:col-span-2" />
                <textarea placeholder="Tell us about your infrastructure needs" rows={4} className="w-full p-4 border border-gray-200 outline-none focus:border-[#0171c1] transition-all font-medium text-sm md:col-span-2 resize-none"></textarea>
                <div className="md:col-span-2">
                  <button className="bg-[#FFAF2B] text-[#001A3D] px-12 py-5 font-bold uppercase tracking-wider text-[11px] hover:bg-[#001A3D] hover:text-white transition-all duration-500 shadow-xl rounded-sm w-full md:w-auto">
                    Submit Project Request
                  </button>
                </div>
              </form>
            </div>
            <div className="lg:col-span-5 space-y-12 py-8">
              <h2 className="text-3xl font-bold text-[#001A3D] display-font">What Is The Next Step?</h2>
              <div className="space-y-10">
                {[
                  { icon: MessageSquare, text: "A cloud technology consultant will review your request and contact you within a few business hours." },
                  { icon: FileText, text: "We will schedule a deep-dive session to understand your current infrastructure and modernization goals." },
                  { icon: Sparkles, text: "You will receive a detailed proposal including technical architecture and cloud ROI analysis." }
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
              <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Cloud Insights & Articles</h2>
              <p className="text-lg text-gray-500 font-medium">
                Explore our latest thinking on cloud technology and digital infrastructure trends.
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
                    <span className="bg-[#0171c1] text-white text-[9px] font-bold px-3 py-1 uppercase tracking-widest rounded-sm">CloudTech</span>
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="text-xl font-bold text-[#001A3D] display-font group-hover:text-[#0171c1] transition-colors line-clamp-2 leading-tight min-h-[3.5rem]">{post.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 font-medium">{post.description}</p>
                  <div className="pt-4 border-t border-gray-50">
                    <Link href={`/resources/blogs/${post.id}`} className="inline-flex items-center gap-2 text-[10px] font-bold text-[#001A3D] uppercase tracking-widest hover:text-[#0171c1] transition-colors">
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
