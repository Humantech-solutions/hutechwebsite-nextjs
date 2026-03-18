"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Server, 
  Cloud, 
  Activity, 
  Rocket, 
  Shield, 
  Zap, 
  BarChart3, 
  TrendingDown, 
  ArrowRight, 
  MoveRight, 
  Check, 
  Sparkles, 
  DollarSign, 
  Users, 
  Target, 
  Award, 
  CheckCircle2, 
  Settings, 
  GitBranch, 
  Eye, 
  AlertCircle,
  ShieldCheck,
  Workflow,
  Lock,
  MessageSquare,
  FileText,
  ChevronRight,
  RefreshCw,
  Network,
  Terminal,
  Cpu
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

const DEVOPS_SERVICES = [
  {
    icon: Cloud,
    title: "DevOps & Cloud Support",
    description: "End-to-end infrastructure management and cloud platform setup. We handle the heavy lifting of cloud provisioning, scaling, and 24/7 monitoring so your developers can focus on code.",
    functions: [
      "Multi-Cloud Platform Provisioning (AWS, Azure, GCP)",
      "Continuous Monitoring & Real-time Alerting",
      "Infrastructure Scaling & Auto-scaling Setup",
      "Cost Optimization & Resource Utilization Audits"
    ]
  },
  {
    icon: GitBranch,
    title: "Release Management",
    description: "Streamline your software delivery lifecycle. We implement robust CI/CD pipelines that automate testing, security scans, and deployments for zero-downtime releases.",
    functions: [
      "Automated CI/CD Pipeline Design",
      "Blue-Green & Canary Deployment Strategies",
      "Artifact Management & Version Control",
      "Automated Rollback Mechanisms"
    ]
  },
  {
    icon: Eye,
    title: "Site Reliability & Observability",
    description: "Build resilient systems that learn from failure. Our SRE experts implement deep observability to predict issues before they impact your users.",
    functions: [
      "Distributed Tracing & Log Aggregation",
      "Service Level Objective (SLO) Management",
      "Incident Response & Post-Mortem Analysis",
      "Disaster Recovery & High Availability Design"
    ]
  }
];

const INNOVATIONS = [
  {
    icon: Sparkles,
    title: "AIOps Integration",
    description: "Harness AI to analyze petabytes of log data, identifying anomalies and predicting potential system failures before they occur."
  },
  {
    icon: Terminal,
    title: "Infrastructure as Code (IaC)",
    description: "We define your entire data center in code using Terraform and Ansible, ensuring 100% environment consistency and rapid disaster recovery."
  },
  {
    icon: ShieldCheck,
    title: "DevSecOps Transformation",
    description: "Security is no longer an afterthought. We bake security scanning and compliance checks directly into your automated delivery pipelines."
  },
  {
    icon: Activity,
    title: "Chaos Engineering",
    description: "We proactively inject controlled failures into your systems to uncover hidden weaknesses and build bulletproof resilience."
  },
  {
    icon: Cpu,
    title: "Serverless & Containerization",
    description: "Modernize your workloads with Kubernetes and Serverless architectures to maximize efficiency and minimize operational overhead."
  },
  {
    icon: Network,
    title: "Service Mesh Orchestration",
    description: "Manage complex microservices communications with Istio or Linkerd, providing security, visibility, and traffic control at scale."
  }
];

const PRICING_COMPARISON = [
  {
    service: "DevOps & Cloud Support",
    hutechCost: "$700",
    resourceCost: "$2,500+",
    savings: "Save 72%"
  },
  {
    service: "Release Management",
    hutechCost: "$800",
    resourceCost: "$3,000+",
    savings: "Save 67%"
  },
  {
    service: "SRE & Observability",
    hutechCost: "$1,200",
    resourceCost: "$3,500+",
    savings: "Save 66%"
  }
];

const WHY_CHOOSE = [
  {
    title: "Shared-Service Advantage",
    description: "Access a world-class team of SREs and DevOps engineers for a fraction of the cost of a single full-time hire."
  },
  {
    title: "24/7 Global Vigilance",
    description: "Our distributed team provides 'follow-the-sun' monitoring and incident response, ensuring your systems never sleep."
  },
  {
    title: "Vendor-Neutral Philosophy",
    description: "We are experts in AWS, Azure, GCP, and On-Premise, recommending the best architecture for your unique needs."
  },
  {
    title: "Speed to Market focus",
    description: "Our automation frameworks typically reduce software release cycles by up to 60%, getting your features to users faster."
  }
];

const FAQS = [
  {
    question: "What is the Shared-Service Model?",
    answer: "Our shared-service model allows multiple clients to share a pool of elite DevOps and SRE experts. This drastically reduces individual costs while ensuring you have access to senior-level talent whenever you need it."
  },
  {
    question: "How do you handle security in your DevOps pipelines?",
    answer: "We follow DevSecOps principles, integrating static and dynamic security analysis (SAST/DAST) into every build. We also implement secrets management and zero-trust networking as standard."
  },
  {
    question: "Can you help us migrate to Kubernetes?",
    answer: "Yes, Kubernetes orchestration is one of our core specialties. We handle cluster setup, networking, storage, and the containerization of your applications."
  },
  {
    question: "What is your response time for critical incidents?",
    answer: "For our Enterprise-tier clients, we offer guaranteed response times as low as 15 minutes for P0 incidents, backed by strict SLAs."
  },
  {
    question: "Do we need to change our current cloud provider?",
    answer: "Not at all. We adapt our DevOps frameworks to your existing infrastructure, whether it's public cloud, private cloud, or hybrid."
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

export default function SreDevopsServices() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta 
        title="SRE & DevOps Services | Hutech Solutions"
        description="Enterprise-grade SRE and DevOps as a Service. Save up to 70% with our shared-service model. Accelerate your releases with elite reliability."
      />
      
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="bg-[#001A3D] text-white h-[450px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="DevOps and Infrastructure Monitoring"
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
              <span className="text-[#FFAF2B] font-bold uppercase tracking-[0.3em] text-[10px]">Reliability Engineering</span>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight display-font mb-8">
              Velocity Without Risk. <br />
              <span className="text-[#FFAF2B]">Enterprise Reliability.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed">
              We help businesses thrive with elite-tier SRE and DevOps solutions. Break the silos, automate the toil, and ship with absolute confidence.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Intro / Value Prop Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font leading-tight">
                  Redefining Reliability with a Budget-First Approach
                </h2>
                <div className="w-20 h-1 bg-[#0171c1]"></div>
              </div>
              <div className="space-y-6">
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  Our SRE and DevOps as a Service operates on a unique shared-service model that is simple, scalable, and budget-friendly. We eliminate the need for expensive full-time hires while providing enterprise-grade support.
                </p>
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  By leveraging automation, observability, and elite engineering talent, we help organizations reduce their operational costs by up to 70% without compromising on system stability or release speed.
                </p>
              </div>
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-[#001A3D] display-font">70%</p>
                  <p className="text-[10px] font-bold text-[#0171c1] uppercase tracking-widest">Avg Cost Reduction</p>
                </div>
                <div className="w-[1px] h-12 bg-gray-200 hidden md:block"></div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-[#001A3D] display-font">60%</p>
                  <p className="text-[10px] font-bold text-[#0171c1] uppercase tracking-widest">Faster Release Cycles</p>
                </div>
                <div className="w-[1px] h-12 bg-gray-200 hidden md:block"></div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-[#001A3D] display-font">99.9%</p>
                  <p className="text-[10px] font-bold text-[#0171c1] uppercase tracking-widest">System Reliability</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-sm overflow-hidden shadow-2xl">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                  alt="DevOps Engineering Dashboard" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-[#0171c1] p-10 text-white space-y-4 max-w-xs shadow-2xl hidden md:block">
                <Zap size={32} strokeWidth={1.5} />
                <h3 className="text-xl font-bold display-font">Shared Expertise</h3>
                <p className="text-sm font-medium opacity-80 leading-relaxed">
                  Access senior-level DevOps talent starting from $700/month through our innovative service model.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Comprehensive DevOps Solutions</h2>
            <p className="text-lg text-gray-500 max-w-4xl mx-auto font-medium leading-relaxed">
              We specialize in delivering robust automation and reliability frameworks tailored for modern high-growth organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DEVOPS_SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-12 shadow-sm border border-gray-100 flex flex-col space-y-6 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden h-full"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Icon size={80} strokeWidth={1} />
                  </div>
                  <div className="w-16 h-16 rounded-sm bg-gray-50 flex items-center justify-center text-[#0171c1] group-hover:bg-[#0171c1] group-hover:text-white transition-all duration-500">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-[#001A3D] display-font leading-tight">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">{service.description}</p>
                  
                  <ul className="space-y-3 pt-4">
                    {service.functions.map((func, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs text-gray-600 font-medium">
                        <Check size={14} className="text-[#0171c1] shrink-0 mt-0.5" />
                        <span>{func}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-8 mt-auto">
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

      {/* Pricing Comparison Section */}
      <section className="py-24 bg-[#001A3D] text-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold display-font leading-tight max-w-4xl mx-auto">
              Save Up to 70% on Operations
            </h2>
            <div className="w-20 h-1 bg-[#0171c1] mx-auto"></div>
            <p className="text-gray-400 max-w-3xl mx-auto font-medium text-lg leading-relaxed">
              Compare our shared-service model with the cost of traditional hiring. Enterprise-grade support at a fraction of the budget.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-sm overflow-hidden mb-20">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-8 text-xs font-bold uppercase tracking-widest text-gray-400">Service Package</th>
                  <th className="p-8 text-xs font-bold uppercase tracking-widest text-[#0171c1]">Hutech Cost (Monthly)</th>
                  <th className="p-8 text-xs font-bold uppercase tracking-widest text-gray-400">Traditional Hiring</th>
                  <th className="p-8 text-xs font-bold uppercase tracking-widest text-emerald-400">Total Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 font-medium">
                {PRICING_COMPARISON.map((row, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="p-8 text-lg font-bold display-font">{row.service}</td>
                    <td className="p-8 text-xl font-bold text-[#0171c1]">{row.hutechCost}</td>
                    <td className="p-8 text-gray-500 line-through">{row.resourceCost}</td>
                    <td className="p-8 text-emerald-400 font-bold tracking-tight">{row.savings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="text-center bg-white/5 p-12 rounded-sm border border-white/10">
            <h3 className="text-2xl font-bold display-font mb-4">Ready to optimize your infrastructure costs?</h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Our consultants will perform a free audit of your current operations and show you exactly where you can save.</p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-[#FFAF2B] text-[#001A3D] px-10 py-5 font-bold uppercase tracking-wider text-[11px] hover:bg-white transition-all shadow-xl rounded-sm">
              Request A Free Audit <MoveRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Innovations Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font tracking-tight">Which Innovations Can Propel Your Reliability?</h2>
            <p className="text-lg text-gray-500 font-medium max-w-3xl mx-auto leading-relaxed">
              We integrate the latest advancements in reliability engineering to ensure your systems remain future-proof.
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

      {/* Why Choose Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Why Choose Hutech Solutions for DevOps?</h2>
            <p className="text-lg text-gray-500 font-medium max-w-4xl mx-auto leading-relaxed">
              We specialize in delivering high-impact DevOps and SRE solutions tailored for rapid-growth enterprise environments.
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
                  <Settings size={24} strokeWidth={1.5} />
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
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-7 bg-white p-10 md:p-14 shadow-2xl border border-gray-100 rounded-sm">
              <h2 className="text-3xl font-bold text-[#001A3D] display-font mb-10">Scale Your Reliability Today</h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Name*" className="w-full p-4 border border-gray-200 outline-none focus:border-[#0171c1] transition-all font-medium text-sm" />
                <input type="email" placeholder="Email*" className="w-full p-4 border border-gray-200 outline-none focus:border-[#0171c1] transition-all font-medium text-sm" />
                <input type="tel" placeholder="Phone Number*" className="w-full p-4 border border-gray-200 outline-none focus:border-[#0171c1] transition-all font-medium text-sm md:col-span-2" />
                <textarea placeholder="Tell us about your infrastructure or reliability goals" rows={4} className="w-full p-4 border border-gray-200 outline-none focus:border-[#0171c1] transition-all font-medium text-sm md:col-span-2 resize-none"></textarea>
                <div className="md:col-span-2">
                  <button className="bg-[#FFAF2B] text-[#001A3D] px-12 py-5 font-bold uppercase tracking-wider text-[11px] hover:bg-[#001A3D] hover:text-white transition-all duration-500 shadow-xl rounded-sm w-full md:w-auto">
                    Submit Inquiry
                  </button>
                </div>
              </form>
            </div>
            <div className="lg:col-span-5 space-y-12 py-8">
              <h2 className="text-3xl font-bold text-[#001A3D] display-font">The Roadmap To Excellence</h2>
              <div className="space-y-10">
                {[
                  { icon: MessageSquare, text: "A senior DevOps architect reviews your infrastructure goals and contacts you within 4 hours." },
                  { icon: FileText, text: "We perform a preliminary audit of your CI/CD pipelines and cloud architecture." },
                  { icon: Sparkles, text: "You receive a custom shared-service proposal with immediate cost-saving recommendations." }
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
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font tracking-tight">Expert SRE Insights (FAQ)</h2>
            <div className="w-20 h-1 bg-[#0171c1] mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto divide-y divide-gray-100 bg-white p-8 md:p-12 shadow-sm rounded-sm">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#0171c1] text-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 text-center space-y-10">
          <h2 className="text-4xl md:text-6xl font-bold display-font">Ready to Transform Your Operations?</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">Join the 100+ organizations that have optimized their reliability and costs with Hutech Solutions.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/contact" className="bg-white text-[#0171c1] px-12 py-5 font-bold uppercase tracking-wider text-[11px] hover:bg-[#001A3D] hover:text-white transition-all shadow-2xl rounded-sm">
              Schedule A Discovery Call
            </Link>
            <Link href="/services" className="border-2 border-white/30 text-white px-12 py-5 font-bold uppercase tracking-wider text-[11px] hover:bg-white/10 transition-all rounded-sm">
              Explore All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
