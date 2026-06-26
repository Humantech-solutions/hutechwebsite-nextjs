"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  Brain,
  Cpu,
  Lock,
  Workflow,
  BarChart3,
  ShieldCheck,
  Settings,
  TrendingUp,
  Smartphone,
  Globe,
  Database,
  Network,
  MessageSquare,
  FileText,
  Zap,
  ChevronRight,
  MoveRight,
  ArrowRight,
  Terminal,
  Target,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

import { ServiceDetailContactCTA } from "@/components/ServiceDetailContactCTA";

const AI_CONSULTING_SERVICES = [
  {
    icon: Target,
    title: "AI Strategy & Feasibility",
    description:
      "Navigate your journey to artificial intelligence with confidence. We analyze your business data assets—including unstructured data and legacy systems—to build a high-ROI adoption roadmap.",
  },
  {
    icon: Cpu,
    title: "LLM Selection & Tuning",
    description:
      "Maximize flexibility and avoid vendor lock-in. We design and optimize prompt templates across GPT-4, Claude, and open-source models, ensuring your workloads are optimized for latency and cost.",
  },
  {
    icon: Terminal,
    title: "Advanced Prompt Design",
    description:
      "Build for the future of business. We leverage Chain-of-Thought prompting, structured system messages, and few-shot formatting to extract high-reasoning, accurate outputs from foundational LLMs.",
  },
  {
    icon: Database,
    title: "RAG Architecture Setup",
    description:
      "Stop worrying about model hallucinations. Our experts build semantic search pipelines connecting vector databases directly to model contexts, grounding answers in your private business data.",
  },
  {
    icon: Lock,
    title: "Prompt Security & Defense",
    description:
      "Don't let prompt injections compromise your brand. We implement robust inputs validation, adversarial shields, and jailbreak-resistant instructions to secure public chatbot widgets.",
  },
  {
    icon: Network,
    title: "Multi-Modal AI Pipelines",
    description:
      "Focus on your operations while we handle the cognitive workflows. We build multi-modal models merging text, visual recognition, and audio to automate complex document processing.",
  },
];

const ESSENTIAL_SOLUTIONS = [
  {
    icon: Lock,
    title: "LLMOps & Monitoring",
    description:
      "Protect your AI perimeter. We implement continuous model testing, output validation logs, and prompt analytics to ensure corporate agents perform reliably in production.",
  },
  {
    icon: Workflow,
    title: "Vector Database Strategy",
    description:
      "Accelerate semantic search speeds. We automate your index optimization, metadata filtering, and embedding storage in Pinecone or Weaviate, enabling low-latency document lookups.",
  },
  {
    icon: BarChart3,
    title: "Agentic Workflow Planning",
    description:
      "Unlock the value of autonomous AI. We build multi-step taskforces where autonomous agents plan tasks, call external software APIs, and collaborate to execute complex workflows.",
  },
  {
    icon: ShieldCheck,
    title: "Token Cost Management",
    description:
      "Ensure model bills remain low. We design prompt caching algorithms, contextual window compression, and model routing parameters that slash monthly API costs by up to 40%.",
  },
  {
    icon: Settings,
    title: "Responsible AI Standards",
    description:
      "Automate your governance workflows. We define model validation rules in code, auditing biases, checking output toxicities, and ensuring compliance with emerging AI regulations.",
  },
  {
    icon: TrendingUp,
    title: "Custom Model Fine-Tuning",
    description:
      "Deliver highly tailored model responses. We optimize hyper-parameters and train foundational open-source neural networks on company documents to capture domain terminology.",
  },
];

const INNOVATIONS = [
  {
    icon: Sparkles,
    title: "Automated Prompt Optimizers",
    description:
      "Leverage machine learning to continuously rewrite prompt instructions, finding phrasing that maximizes model benchmark accuracy automatically.",
  },
  {
    icon: Smartphone,
    title: "SLM Edge Optimization",
    description:
      "Deploy models on compact devices. We fine-tune Small Language Models (SLMs) to execute locally on edge chips, reducing cloud hosting overhead and data latency.",
  },
  {
    icon: Globe,
    title: "Self-Correcting LLM Loops",
    description:
      "Minimize coding errors. We engineer multi-step validation loops where a developer agent writes code, compiles it, reads error logs, and fixes bugs autonomously.",
  },
  {
    icon: Database,
    title: "Knowledge Graph Integration",
    description:
      "Expand AI reasoning capabilities. We connect semantic vector databases with structured entity graphs, helping models answer complex cross-document business questions.",
  },
  {
    icon: Network,
    title: "Multi-Agent Collaboration",
    description:
      "Orchestrate complex tasks with ease. We deploy groups of custom-profiled agents that draft plans, peer-review written reports, and compile final business deliverables.",
  },
  {
    icon: Lock,
    title: "Zero-Knowledge Private RAG",
    description:
      "Protect your most sensitive documents. We implement zero-knowledge encryption protocols to verify document data without exposing raw text to public cloud APIs.",
  },
];

const WHY_CHOOSE = [
  {
    title: "Advanced Prompting Mastery",
    description:
      "We focus on structural formatting, few-shot optimization, and jailbreak security, ensuring your models yield reliable responses from day one.",
  },
  {
    title: "Model-Agnostic Guidance",
    description:
      "We don't sell a single model. We analyze cost, speed, and accuracy to recommend the best tool—whether open-source Llama or enterprise GPT-4.",
  },
  {
    title: "Direct Application Integration",
    description:
      "Our AI consultants work directly with frontend and backend developers to integrate model calls smoothly into your existing web dashboards.",
  },
  {
    title: "Proven Token Cost Reduction",
    description:
      "We build semantic compression layers and model routing engines that slash API bills, ensuring your AI strategy stays profitable over time.",
  },
];

const FAQS = [
  {
    question: "What is the difference between AI Consulting and AI Development?",
    answer:
      "AI Consulting analyzes feasibility, designs prompt architectures, optimizes model costs, and maps out implementation roadmaps. AI Development writes the actual software integrations and deploys the finished model pipelines.",
  },
  {
    question: "How do you protect LLMs from prompt injection and jailbreak attacks?",
    answer:
      "We implement input sanitation layers, dual-LLM validation steps, system prompt walls, and post-generation boundary checks to catch malicious requests before they reach the model.",
  },
  {
    question: "Can you help us reduce our monthly LLM API bills?",
    answer:
      "Yes, cost control is a primary service. We implement semantic cache wrappers, compress context windows, route simple tasks to Small Language Models, and optimize instruction tokens.",
  },
  {
    question: "What is a Retrieval-Augmented Generation (RAG) pipeline?",
    answer:
      "RAG is a system that retrieves relevant text paragraphs from your internal databases and appends them to your prompt request. This grounds the LLM in factual company data, reducing hallucinations.",
  },
  {
    question: "Do you offer custom model fine-tuning?",
    answer:
      "Yes. While we look to solve challenges with advanced prompting first, we fine-tune open-source models (like Llama 3 or Mistral) on custom datasets when domain-specific terminology is required.",
  },
];

const BLOG_POSTS = [
  {
    id: "1",
    title: "Token Optimization: How to Reduce LLM API Bills by 40%",
    description:
      "Discover how prompt compression, semantic cache layers, and smart routing can slash monthly generative AI overhead...",
    image:
      "https://images.unsplash.com/photo-1764336312138-14a5368a6cd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "2",
    title: "SLMs in Production: Running Local Models on Compact Devices",
    description:
      "Small Language Models are proving to be powerful alternatives to massive cloud APIs, offering low latency and data privacy...",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "3",
    title: "Jailbreak Prevention: Securing Customer-Facing AI Agents",
    description:
      "As corporations launch autonomous support chat systems, protecting user interfaces from prompt injection attacks is critical...",
    image:
      "https://images.unsplash.com/photo-1686061593213-98dad7c599b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

const AI_CONSULTING_STACK = [
  { primary: "GPT-4 / CLAUDE", secondary: "FOUNDATIONAL MODEL" },
  { primary: "LANGCHAIN", secondary: "ORCHESTRATION" },
  { primary: "LLAMAINDEX", secondary: "DATA CONNECTIVITY" },
  { primary: "PINECONE", secondary: "VECTOR STORAGE" },
  { primary: "WEAVIATE", secondary: "VECTOR DATABASE" },
  { primary: "FASTAPI", secondary: "ENGINE APIS" },
  { primary: "PYTHON", secondary: "AUTOMATION CODE" },
  { primary: "HUGGING FACE", secondary: "MODEL REGISTRY" },
  { primary: "OLLAMA", secondary: "LOCAL INFERENCE" },
  { primary: "GROQ", secondary: "ACCELERATION" },
  { primary: "LLMOPS", secondary: "MONITORING TOOLS" },
  { primary: "VLLM", secondary: "EFFICIENT SERVING" },
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

export default function AIConsulting() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="AI Consulting & Prompt Engineering | Hutech Solutions"
        description="Transform your business with Hutech's AI Consulting services. Specialized in prompt engineering, LLM tuning, RAG pipelines, and AI roadmaps."
      />

      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1764336312138-14a5368a6cd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="AI Neural Networking"
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
                AI Strategy Excellence
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              Your AI Vision. <br />
              <span className="text-[#F99D1C]">Prompt Engineering Revolution.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              We craft intelligent enterprise prompts, Large Language Model optimization, and custom RAG architectures for global businesses.
            </p>
            <Link href="/contact" className="btn-banner-cta mt-6 group">
              Consult Us
              <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
            </Link>
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
                  Empowering Organizations with Smart, Scalable Generative AI Consulting
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
              </div>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  At Hutech Solutions, we bring deep expertise in implementing, supporting, and
                  managing integrated LLM platforms. Our end-to-end solutions include AI feasibility
                  audits, advanced prompt template engineering, Retrieval-Augmented Generation (RAG) setups, and token cost optimization.
                </p>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  We ensure our clients can operate with agility, security, and efficiency, enabling
                  them to expand operations and integrate fresh AI-driven solutions to meet specific language modeling and business automation needs.
                </p>
              </div>
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">150+</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    AI Strategies
                  </p>
                </div>
                <div className="hidden h-12 w-[1px] bg-gray-200 md:block"></div>
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">10x</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Productivity Gains
                  </p>
                </div>
                <div className="hidden h-12 w-[1px] bg-gray-200 md:block"></div>
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">40+</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    LLM Integrations
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-sm shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="AI Prompt Design Center"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 hidden max-w-xs space-y-4 bg-[#0171c1] p-10 text-white shadow-2xl md:block">
                <Sparkles size={32} strokeWidth={1.5} />
                <h3 className="display-font text-xl font-bold">Prompt Engineering</h3>
                <p className="text-sm leading-relaxed font-medium opacity-80">
                  Integrating advanced prompt design methodologies, few-shot templates, and jailbreak security layers to enhance model outputs.
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
              Our AI Consulting & Prompt Engineering Services
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              At Hutech Solutions, we specialize in delivering cutting-edge software technology
              solutions tailored for the global generative AI landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {AI_CONSULTING_SERVICES.map((service, i) => {
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

      {/* Essential Solutions Section */}
      <section className="overflow-hidden bg-[#001A3D] py-24 text-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font mx-auto max-w-4xl text-3xl leading-tight font-semibold md:text-5xl">
              What Makes Custom AI Solutions Essential for Your Business?
            </h2>
            <div className="mx-auto h-1 w-20 bg-[#0171c1]"></div>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-400">
              In the modern digital landscape, custom prompt engineering and AI strategy are key to staying
              competitive and ensuring operational safety.
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
              Which Innovations Can Transform Your Prompt Operations?
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-500">
              Incorporating advanced LLM optimizations can significantly enhance your business processes
              for the cognitive-first era.
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

      {/* CTA Section */}
      <section className="overflow-hidden bg-[#F2F2F2] py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex flex-col items-center gap-20 lg:flex-row">
            <div className="flex-1 space-y-10">
              <div className="space-y-6">
                <h2 className="display-font text-3xl leading-[1.2] font-semibold text-[#001A3D] md:text-5xl">
                  Discover Your AI Consulting & Prompt Engineering Strategy With Us
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  Schedule a consultation with our expert AI consulting team and take the first step towards a digital-first prompt experience.
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
                  src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="AI Engine Analytics"
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
          {/* Header */}
          <div className="mb-16 text-center md:mb-20">
            <div className="flex items-center justify-center gap-3 text-[10px] font-bold tracking-[0.3em] text-[#F99D1C] uppercase">
              <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#F99D1C]" />
              TECHNOLOGY STACK
              <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#F99D1C]" />
            </div>

            <h2 className="mt-4 display-font text-3xl font-bold tracking-wider text-white sm:text-4xl md:text-5xl uppercase">
              MODERN GENERATIVE AI STACK
            </h2>

            <div className="mx-auto mt-4 h-[3px] w-14 bg-[#F99D1C]" />

            <p className="mx-auto mt-6 max-w-2xl text-sm font-medium text-gray-400 md:text-base leading-relaxed">
              Enterprise AI frameworks powering robust, secure, and cost-optimized prompt systems
            </p>
          </div>

          {/* Cards Grid */}
          <div className="border-l border-t border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {AI_CONSULTING_STACK.map((item, idx) => (
                <Motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="group relative z-0 hover:z-10 border-r border-b border-white/10 bg-[#030d22]/50 backdrop-blur-sm py-12 px-4 flex flex-col justify-center items-center h-32 md:h-36 text-center transition-all duration-300 ease-out hover:-translate-y-1.5 hover:bg-[#0a2a60]/40 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] hover:border-white/20"
                >
                  <span className="text-white font-bold tracking-wider text-xs md:text-sm uppercase mb-2 group-hover:text-white transition-colors duration-300">
                    {item.primary}
                  </span>
                  <span className="text-cyan-400 font-semibold tracking-wider text-[10px] md:text-xs uppercase transition-colors duration-300">
                    {item.secondary}
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
              Why Choose Hutech Solutions for Your AI Consulting Project?
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              At Hutech Solutions, we specialize in delivering AI Consulting and prompt engineering solutions
              tailored to your unique organizational needs.
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
                Start Your AI Consulting Project
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
                  placeholder="Tell us about your prompt engineering and AI needs"
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
                    text: "An AI consulting specialist will review your request and contact you within a few business hours.",
                  },
                  {
                    icon: FileText,
                    text: "We will schedule a deep-dive session to understand your operational workflows and document data.",
                  },
                  {
                    icon: Sparkles,
                    text: "You will receive a detailed proposal including model options, prompt strategy, and token cost analysis.",
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


      <ServiceDetailContactCTA />

    </div>
  );
}
