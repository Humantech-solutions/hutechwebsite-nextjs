"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";
import {
  Brain,
  TrendingUp,
  MessageSquare,
  Eye,
  Cpu,
  Zap,
  BarChart3,
  MoveRight,
  ArrowRight,
  ChevronRight,
  Workflow,
  Smartphone,
  Globe,
  Database,
  Network,
  Lock,
  Sparkles,
  Settings,
  ShieldCheck,
  RefreshCw,
  Users,
  FileText,
  Cloud,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { submitContactForm } from "@/lib/api";
import { HutechService } from "@/lib/wordpress";

const FALLBACK_ICONS = [
  Brain,
  TrendingUp,
  MessageSquare,
  Eye,
  Cpu,
  BarChart3,
  Lock,
  Workflow,
  ShieldCheck,
  Settings,
  Sparkles,
  Smartphone,
  Globe,
  Database,
  Network,
  Zap,
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

export default function ServiceDetailClient({ service, blogs = [] }: { service: HutechService, blogs?: any[] }) {
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  
  const heroTitleParts = (service.heroTitle || service.title || "").split("|");
  const heroTitle1 = heroTitleParts[0];
  const heroTitle2 = heroTitleParts.length > 1 ? heroTitleParts[1] : "";

  const statsToRender = service.stats && service.stats.length > 0 ? service.stats : [
    { value: "200+", label: "Models Deployed" },
    { value: "95%", label: "Avg Accuracy Rate" },
    { value: "3x", label: "Avg ROI Increase" },
  ];

  const servicesToRender = service.services && service.services.length > 0 ? service.services : [
    { title: "AI Application Development", description: "Design and deploy custom AI-powered applications that automate complex workflows, optimize business processes, and unlock the full potential of artificial intelligence across your enterprise.", btnname: "Learn More", btnurl: "/contact" },
    { title: "Machine Learning Solutions", description: "Build production-grade ML models tailored to your industry. From predictive analytics to recommendation engines, we develop data-driven systems that evolve and improve over time.", btnname: "Learn More", btnurl: "/contact" },
    { title: "Natural Language Processing", description: "Extract actionable insights from unstructured text at scale. Our NLP services cover sentiment analysis, entity recognition, document summarization, and intelligent chatbot development.", btnname: "Learn More", btnurl: "/contact" },
    { title: "Computer Vision Solutions", description: "Teach machines to see and understand. We build visual recognition systems for object detection, facial recognition, quality inspection, and real-time video analytics.", btnname: "Learn More", btnurl: "/contact" },
    { title: "Generative AI & LLM Integration", description: "Harness the power of large language models. We integrate GPT-4, Claude, and Gemini into your products, building RAG pipelines, AI agents, and custom fine-tuned models.", btnname: "Learn More", btnurl: "/contact" },
    { title: "Predictive Analytics & Forecasting", description: "Turn historical data into future intelligence. Our predictive models help you forecast demand, detect churn, identify fraud, and anticipate market shifts with high accuracy.", btnname: "Learn More", btnurl: "/contact" },
  ];

  const solutionsToRender = service.solutions && service.solutions.length > 0 ? service.solutions : [
    { title: "Data Privacy & Governance", description: "Protect your AI systems from the ground up. We implement robust data governance frameworks, access controls, and model explainability tools to ensure regulatory compliance.", btnname: "", btnurl: "" },
    { title: "MLOps & Model Lifecycle Management", description: "Accelerate your AI delivery cycles. We automate model training, versioning, deployment, and monitoring so your teams can ship reliable models faster and with confidence.", btnname: "", btnurl: "" },
    { title: "Real-Time Data Pipelines", description: "Power your AI with live data. We architect low-latency streaming pipelines using Kafka and Spark, ensuring your models always operate on the most current information.", btnname: "", btnurl: "" },
    { title: "Responsible AI & Bias Mitigation", description: "Build AI your users can trust. We apply fairness audits, bias detection, and interpretability techniques to ensure your models are transparent, equitable, and defensible.", btnname: "", btnurl: "" },
    { title: "Feature Engineering & Data Prep", description: "Great models start with great data. We transform raw datasets into powerful feature sets, handling missing values, normalization, and domain-specific transformations at scale.", btnname: "", btnurl: "" },
    { title: "Continuous Model Optimization", description: "Keep your AI performing at its peak. We implement automated retraining triggers, A/B model testing, and performance monitoring to prevent model drift and maintain accuracy.", btnname: "", btnurl: "" },
  ];

  const innovationsToRender = service.innovations && service.innovations.length > 0 ? service.innovations : [
    { title: "Agentic AI Systems", description: "Deploy autonomous AI agents that plan, reason, and act. We build multi-agent workflows that handle complex, multi-step tasks without constant human supervision.", btnname: "", btnurl: "" },
    { title: "On-Device AI & Edge Inference", description: "Run intelligence at the edge. We optimize and deploy ML models directly on mobile and IoT devices, enabling real-time AI without cloud dependency or latency.", btnname: "", btnurl: "" },
    { title: "Multimodal AI Architectures", description: "Go beyond text. We build multimodal systems combining vision, audio, and language models to create richer, more context-aware AI experiences for your users.", btnname: "", btnurl: "" },
    { title: "Vector Search & RAG Pipelines", description: "Give your LLMs a memory. We build retrieval-augmented generation systems that ground AI responses in your proprietary data, dramatically improving accuracy and relevance.", btnname: "", btnurl: "" },
    { title: "Federated Learning", description: "Train AI without centralizing sensitive data. Our federated learning frameworks enable collaborative model training across distributed nodes while preserving full data privacy.", btnname: "", btnurl: "" },
    { title: "AI Security & Adversarial Defense", description: "Protect your models from attacks. We implement adversarial robustness testing, prompt injection defenses, and model hardening techniques to keep your AI systems secure.", btnname: "", btnurl: "" },
  ];

  const techStackToRender = service.techStack && service.techStack.length > 0 ? service.techStack : [
    { name: "OPENAI", cat: "GENERATIVE AI" },
    { name: "LANGCHAIN", cat: "ORCHESTRATION" },
    { name: "HUGGING FACE", cat: "MODELS" },
    { name: "PYTORCH", cat: "DEEP LEARNING" },
    { name: "TENSORFLOW", cat: "ML FRAMEWORK" },
    { name: "PINECONE", cat: "VECTOR DB" },
    { name: "AWS SAGEMAKER", cat: "CLOUD AI" },
    { name: "AZURE AI", cat: "COGNITIVE SERVICES" },
    { name: "VERTEX AI", cat: "GOOGLE CLOUD" },
    { name: "NVIDIA CUDA", cat: "ACCELERATION" },
    { name: "KUBEFLOW", cat: "MLOPS" },
    { name: "PYTHON", cat: "LANGUAGE" },
  ];

  const whyChooseToRender = service.whyChoose && service.whyChoose.length > 0 ? service.whyChoose : [
    { title: "Deep AI Research Foundation", description: "Our team includes researchers and engineers with backgrounds in top AI labs. We bring academic rigor and production pragmatism to every model we build." },
    { title: "End-to-End ML Ownership", description: "We don't just build models — we own the full lifecycle from data ingestion to production deployment, monitoring, and continuous improvement." },
    { title: "Business-Outcome Obsessed", description: "We measure success in business metrics, not model metrics. Every AI system we build is tied directly to a measurable impact on revenue, efficiency, or risk." },
    { title: "Rapid Proof-of-Value Delivery", description: "We use sprint-based delivery to put working AI prototypes in your hands within weeks, validating business value before committing to full-scale development." },
  ];

  const faqsToRender = service.faqs && service.faqs.length > 0 ? service.faqs : [
    { question: "What industries do you serve with AI/ML solutions?", answer: "We have delivered AI/ML projects across healthcare, financial services, retail, manufacturing, logistics, and technology. Our team adapts models and architectures to the unique data and regulatory requirements of each industry." },
    { question: "How long does it take to build and deploy an AI model?", answer: "A focused proof-of-concept typically takes 4–8 weeks. A production-grade ML system with full MLOps pipelines ranges from 3–6 months depending on data readiness, integration complexity, and model requirements." },
    { question: "How do you ensure our data remains private and secure?", answer: "We operate with a security-first mindset — using encrypted data pipelines, role-based access, and on-premises or private cloud deployments where required. We are compliant with GDPR, HIPAA, and SOC 2 standards." },
    { question: "Can you integrate AI into our existing software systems?", answer: "Absolutely. We design AI solutions as modular APIs and microservices that integrate seamlessly with your existing ERP, CRM, data warehouse, or custom applications with minimal disruption." },
    { question: "Do you offer post-deployment support and model maintenance?", answer: "Yes. We offer managed AI services including 24/7 monitoring, drift detection, automated retraining pipelines, and dedicated support to ensure your models continue to perform at their best." },
  ];

  const nextStepsToRender = service.nextSteps && service.nextSteps.length > 0 ? service.nextSteps : [
    { title: "An AI/ML consultant will review your request and contact you within a few business hours." },
    { title: "We will schedule a deep-dive session to understand your data landscape, use cases, and AI goals." },
    { title: "You will receive a detailed proposal including model architecture, implementation roadmap, and ROI analysis." },
  ];
  
  const stepIcons = [MessageSquare, FileText, Sparkles, Zap, Brain];

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;
    const serviceName = service.title || service.slug || "Service";

    setIsContactSubmitting(true);

    try {
      await submitContactForm({
        name,
        email,
        phone,
        subject: `Service Inquiry: ${serviceName}`,
        message,
        category: `Service Consultation: ${serviceName}`,
      });
      toast.success("Thank you! Your project request has been submitted successfully.");
      form.reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to submit request. Please try again later.");
    } finally {
      setIsContactSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title={service.title ? `${service.title} | Hutech Solutions` : "AI & ML Solutions | Hutech Solutions"}
        description={service.heroDescription || "Transform your business with Hutech's AI & ML solutions. Expert AI application development, NLP, computer vision, generative AI, and predictive analytics services."}
      />

      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={service.heroBgImage || "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"}
            alt={service.heroTitle || service.title}
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
                {service.heroTagline || "Intelligence Redefined"}
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              {heroTitle1} {heroTitle2 && <br />}
              {heroTitle2 && <span className="text-[#F99D1C]">{heroTitle2}</span>}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              {service.heroDescription || "We craft intelligent data-driven experiences through cutting-edge AI/ML models and expert consulting for global enterprise leaders."}
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
                  {service.introHeading || "Empowering Organizations with Smart, Scalable AI-First Solutions"}
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
              </div>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  {service.introText1 || "At Hutech Solutions, we bring deep expertise in implementing, supporting, and managing integrated AI platforms. Our end-to-end solutions include model development, MLOps pipelines, performance optimization, and seamless enterprise integrations."}
                </p>
                {service.introText2 && (
                  <p className="text-lg leading-relaxed font-medium text-gray-500">
                    {service.introText2}
                  </p>
                )}
                {!service.introText1 && !service.introText2 && (
                   <p className="text-lg leading-relaxed font-medium text-gray-500">
                     We ensure our clients can operate with intelligence, security, and efficiency, enabling them to expand operations and integrate fresh AI-driven solutions to meet specific business and market needs.
                   </p>
                )}
              </div>
              <div className="flex flex-wrap gap-8 pt-4">
                {statsToRender.map((stat: any, idx: number) => (
                    <div key={idx} className="flex gap-8">
                      <div className="space-y-1">
                        <p className="display-font text-3xl font-bold text-[#001A3D]">{stat.value}</p>
                        <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                          {stat.label}
                        </p>
                      </div>
                      {idx < statsToRender.length - 1 && (
                        <div className="hidden h-12 w-[1px] bg-gray-200 md:block"></div>
                      )}
                    </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-sm shadow-2xl">
                <ImageWithFallback
                  src={service.introImage || "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"}
                  alt={service.introImageTitle || "Intro"}
                  className="h-full w-full object-cover"
                />
              </div>
              {(service.introImageTitle || "Intelligent Automation") && (
                <div className="absolute -bottom-10 -left-10 hidden max-w-xs space-y-4 bg-[#0171c1] p-10 text-white shadow-2xl md:block">
                  <Brain size={32} strokeWidth={1.5} />
                  <h3 className="display-font text-xl font-bold">{service.introImageTitle || "Intelligent Automation"}</h3>
                  <p className="text-sm leading-relaxed font-medium opacity-80">
                    {service.introImageDesc || "Integrating cutting-edge AI and machine learning across enterprise platforms to automate tasks and enhance decision intelligence."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
              {service.servicesSectionTitle || "Our AI & Machine Learning Services"}
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              {service.servicesSectionDesc || "At Hutech Solutions, we specialize in delivering cutting-edge AI and ML solutions tailored for the global enterprise landscape."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {servicesToRender.map((item: any, i: number) => {
              const Icon = FALLBACK_ICONS[i % FALLBACK_ICONS.length];
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
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-medium text-gray-500">
                    {item.description}
                  </p>
                  {(item.btnname || "Learn More") && (
                    <div className="mt-auto pt-4">
                      <Link
                        href={item.btnurl || "/contact"}
                        className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#0171c1] uppercase transition-all group-hover:gap-4"
                      >
                        {item.btnname || "Learn More"} <MoveRight size={14} />
                      </Link>
                    </div>
                  )}
                </Motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Essential Solutions Section */}
      <section className="overflow-hidden bg-[#001A3D] py-24 text-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font mx-auto max-w-4xl text-3xl leading-tight font-semibold md:text-5xl">
              {service.solutionsSectionTitle || "What Makes Custom AI/ML Solutions Essential for Your Business?"}
            </h2>
            <div className="mx-auto h-1 w-20 bg-[#0171c1]"></div>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-400">
              {service.solutionsSectionDesc || "In the modern digital landscape, custom AI and machine learning solutions are key to staying competitive and ensuring operational excellence."}
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {solutionsToRender.map((item: any, i: number) => {
              const Icon = FALLBACK_ICONS[(i + 6) % FALLBACK_ICONS.length];
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
              {service.innovationsSectionTitle || "Which Innovations Can Transform Your AI Capabilities?"}
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-500">
              {service.innovationsSectionDesc || "Incorporating advanced AI technologies can significantly enhance your business capabilities for the intelligence-first era."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {innovationsToRender.map((item: any, i: number) => {
              const Icon = FALLBACK_ICONS[(i + 10) % FALLBACK_ICONS.length];
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

      {/* CTA Section */}
      <section className="overflow-hidden bg-[#F2F2F2] py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex flex-col items-center gap-20 lg:flex-row">
            <div className="flex-1 space-y-10">
              <div className="space-y-6">
                <h2 className="display-font text-3xl leading-[1.2] font-semibold text-[#001A3D] md:text-5xl">
                  {service.ctaTitle || "Discover Your AI & ML Transformation Strategy With Us"}
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  {service.ctaDescription || "Schedule a consultation with our expert AI/ML team and take the first step towards a data-driven, intelligence-first business transformation."}
                </p>
              </div>
              <div>
                <Link
                  href={service.ctaBtnUrl || "/contact"}
                  className="inline-flex items-center gap-3 rounded-sm bg-[#F99D1C] px-10 py-5 text-[11px] font-bold tracking-wider text-[#001A3D] uppercase shadow-xl transition-all duration-500 hover:bg-[#001A3D] hover:text-white"
                >
                  {service.ctaBtnName || "Consult Us Now"} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="relative flex-1">
              <div className="relative z-10 aspect-video rounded-sm bg-white p-2 shadow-2xl">
                <ImageWithFallback
                  src={service.ctaImage || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"}
                  alt="AI Analytics Dashboard"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -top-10 -right-10 -z-10 h-64 w-64 rounded-full bg-[#0171c1]/5 blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 -z-10 h-48 w-48 rounded-full bg-[#F99D1C]/10 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#001A3D] via-[#030E21] to-[#020B1E] py-24 md:py-32 text-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-16 text-center md:mb-20">
            <div className="flex items-center justify-center gap-3 text-[10px] font-bold tracking-[0.3em] text-[#F99D1C] uppercase">
              <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#F99D1C]" />
              {service.techStackTagline || "TECHNOLOGY STACK"}
              <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#F99D1C]" />
            </div>

            <h2 className="mt-4 display-font text-3xl font-bold tracking-wider text-white sm:text-4xl md:text-5xl uppercase">
              {service.techStackTitle || "MODERN AI/ML STACK"}
            </h2>

            <div className="mx-auto mt-4 h-[3px] w-14 bg-[#F99D1C]" />

            <p className="mx-auto mt-6 max-w-2xl text-sm font-medium text-gray-400 md:text-base leading-relaxed">
              {service.techStackDesc || "Industry-leading technologies powering intelligent, scalable, and future-ready enterprise transformation"}
            </p>
          </div>

          <div className="border-l border-t border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {techStackToRender.map((item: any, idx: number) => (
                <Motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="group relative z-0 hover:z-10 border-r border-b border-white/10 bg-[#030d22]/50 backdrop-blur-sm py-12 px-4 flex flex-col justify-center items-center h-32 md:h-36 text-center transition-all duration-300 ease-out hover:-translate-y-1.5 hover:bg-[#0a2a60]/40 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] hover:border-white/20"
                >
                  <span className="text-white font-bold tracking-wider text-xs md:text-sm uppercase mb-2 group-hover:text-white transition-colors duration-300">
                    {item.name}
                  </span>
                  <span className="text-cyan-400 font-semibold tracking-wider text-[10px] md:text-xs uppercase transition-colors duration-300">
                    {item.cat}
                  </span>
                </Motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
              {service.whyChooseSectionTitle || "Why Choose Hutech Solutions for Your AI/ML Project?"}
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              {service.whyChooseSectionDesc || "At Hutech Solutions, we specialize in delivering AI and machine learning solutions tailored to your unique organizational needs."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-20 gap-y-16 md:grid-cols-2">
            {whyChooseToRender.map((item: any, i: number) => (
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
                {service.contactFormTitle || "Share Your AI/ML Project With Us"}
              </h2>
              <form onSubmit={handleContactSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Name*"
                  className="w-full border border-gray-200 p-4 text-sm font-medium transition-all outline-none focus:border-[#0171c1]"
                />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Email*"
                  className="w-full border border-gray-200 p-4 text-sm font-medium transition-all outline-none focus:border-[#0171c1]"
                />
                <input
                  required
                  type="tel"
                  name="phone"
                  placeholder="Phone Number*"
                  className="w-full border border-gray-200 p-4 text-sm font-medium transition-all outline-none focus:border-[#0171c1] md:col-span-2"
                />
                <textarea
                  required
                  name="message"
                  placeholder="Tell us about your requirements"
                  rows={4}
                  className="w-full resize-none border border-gray-200 p-4 text-sm font-medium transition-all outline-none focus:border-[#0171c1] md:col-span-2"
                ></textarea>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={isContactSubmitting}
                    className="w-full rounded-sm bg-[#F99D1C] px-12 py-5 text-[11px] font-bold tracking-wider text-[#001A3D] uppercase shadow-xl transition-all duration-500 hover:bg-[#001A3D] hover:text-white md:w-auto disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isContactSubmitting ? "Submitting..." : service.contactFormBtnName || "Submit Project Request"}
                  </button>
                </div>
              </form>
            </div>
            <div className="space-y-12 py-8 lg:col-span-5">
              <h2 className="display-font text-3xl font-bold text-[#001A3D]">
                {service.nextStepSectionTitle || "What Is The Next Step?"}
              </h2>
              <div className="space-y-10">
                {nextStepsToRender.map((step: any, i: number) => {
                  const Icon = stepIcons[i % stepIcons.length];
                  return (
                    <div key={i} className="group flex items-start gap-8">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gray-200 text-[#0171c1] transition-all duration-500 group-hover:border-[#0171c1] group-hover:bg-[#0171c1] group-hover:text-white">
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      <p className="pt-2 text-lg leading-relaxed font-medium text-gray-500">
                        {step.title}
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
              {service.faqSectionTitle || "Frequently Asked Questions"}
            </h2>
            <div className="mx-auto h-1 w-20 bg-[#0171c1]"></div>
          </div>
          <div className="mx-auto max-w-4xl divide-y divide-gray-100">
            {faqsToRender.map((faq: any, i: number) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      {blogs && blogs.length > 0 && (
        <section className="bg-gray-50 py-24">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
            <div className="mb-16 flex items-end justify-between gap-8">
              <div className="max-w-2xl space-y-6">
                <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
                  {service.blogSectionTitle || "AI/ML Insights & Articles"}
                </h2>
                {service.blogSectionDesc && (
                  <p className="text-lg font-medium text-gray-500">
                    {service.blogSectionDesc}
                  </p>
                )}
              </div>
              <Link
                href={service.blogLinkUrl || "/resources"}
                className="hidden items-center gap-2 pb-2 text-[11px] font-bold tracking-widest text-[#0171c1] uppercase transition-all hover:gap-4 md:flex"
              >
                {service.blogLinkName || "View All Resources"} <MoveRight size={16} />
              </Link>
            </div>

            <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              {blogs.map((post: any, i: number) => (
                <div
                  key={i}
                  className="group overflow-hidden rounded-sm bg-white shadow-sm transition-all duration-500 hover:shadow-2xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <ImageWithFallback
                      src={post.featuredImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="rounded-sm bg-[#0171c1] px-3 py-1 text-[9px] font-bold tracking-widest text-white uppercase">
                        {post.categories?.nodes[0]?.name || "Article"}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4 p-8">
                    <h3 className="display-font line-clamp-2 min-h-[3.5rem] text-xl leading-tight font-bold text-[#001A3D] transition-colors group-hover:text-[#0171c1]">
                      {post.title}
                    </h3>
                    <div 
                      className="line-clamp-3 text-sm leading-relaxed font-medium text-gray-500" 
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                    <div className="border-t border-gray-50 pt-4">
                      <Link
                        href={`/resources/blogs/${post.slug}`}
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
                href={service.blogLinkUrl || "/resources"}
                className="inline-flex items-center gap-3 rounded-sm bg-[#0171c1] px-10 py-5 text-[11px] font-bold tracking-wider text-white uppercase shadow-xl"
              >
                {service.blogLinkName || "Explore Resources"} <MoveRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
