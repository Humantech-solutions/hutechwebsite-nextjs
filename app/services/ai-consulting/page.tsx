"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  Sparkles,
  Brain,
  Code,
  Rocket,
  ShieldCheck,
  Database,
  Zap,
  MoveRight,
  Target,
  Terminal,
  Cpu,
  Layers,
  Search,
  ShieldAlert,
  CheckCircle2,
  BarChart3,
  Workflow,
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

const AI_CONSULTING_SERVICES = [
  {
    title: "AI Strategy & Feasibility",
    icon: <Target className="h-8 w-8 text-[#0171c1]" />,
    desc: "We analyze your business objectives, data assets, and technical infrastructure to identify high-ROI AI opportunities and build a strategic adoption roadmap.",
  },
  {
    title: "LLM Selection & Optimization",
    icon: <Cpu className="h-8 w-8 text-[#0171c1]" />,
    desc: "From proprietary models like GPT-4 and Claude 3 to open-source powerhouses like Llama 3 and Mistral, we select the optimal model for your specific latency and cost requirements.",
  },
  {
    title: "AI Ethics & Governance",
    icon: <ShieldCheck className="h-8 w-8 text-[#0171c1]" />,
    desc: "Establishing responsible AI frameworks, ensuring data privacy (GDPR/HIPAA), and mitigating model bias to build trust and ensure long-term regulatory compliance.",
  },
];

const PROMPT_ENGINEERING_SPECIALTIES = [
  {
    title: "Advanced Prompt Design",
    icon: <Terminal className="h-6 w-6 text-[#0171c1]" />,
    desc: "Implementing sophisticated techniques like Chain-of-Thought (CoT), few-shot learning, and least-to-most prompting to extract maximum reasoning from LLMs.",
  },
  {
    title: "Context & RAG Architecture",
    icon: <Layers className="h-6 w-6 text-[#0171c1]" />,
    desc: "Designing Retrieval-Augmented Generation (RAG) systems with vector databases (Pinecone, Weaviate) to provide AI models with real-time, private enterprise knowledge.",
  },
  {
    title: "Prompt Security & Injection Defense",
    icon: <ShieldAlert className="h-6 w-6 text-[#0171c1]" />,
    desc: "Protecting your AI interfaces from prompt injection attacks and ensuring jailbreak-resistant instructions for customer-facing agents.",
  },
  {
    title: "Multi-Modal AI Workflows",
    icon: <Workflow className="h-6 w-6 text-[#0171c1]" />,
    desc: "Building complex pipelines that integrate text, vision, and audio for comprehensive automated reasoning and content creation.",
  },
];

const TRENDING_AI_TOPICS = [
  {
    topic: "LLMOps & Monitoring",
    description:
      "Continuous evaluation and deployment pipelines for AI models to ensure performance doesn't drift and hallucinations are minimized in production.",
  },
  {
    topic: "Vector Database Strategy",
    description:
      "Optimizing semantic search and retrieval performance through high-performance vector embedding management and indexing strategies.",
  },
  {
    topic: "Agentic Workflows",
    description:
      "Moving beyond chatbots to autonomous AI agents that can use tools, browse the web, and complete multi-step tasks independently.",
  },
  {
    topic: "Token Cost Optimization",
    description:
      "Advanced context window management and caching techniques to reduce API overhead by up to 40% without sacrificing accuracy.",
  },
];

export default function AIConsulting() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="AI Consulting & Prompt Engineering | Hutech Solutions"
        description="Expert AI strategy, advanced prompt design, and RAG architecture implementation. Leverage Large Language Models (LLMs) to drive business transformation."
      />
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1764336312138-14a5368a6cd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="AI Neural Network Visualization"
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
                Enterprise Generative AI
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              AI Strategy & <br />
              <span className="text-[#F99D1C]">Prompt Engineering.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              We bridge the gap between raw AI potential and production-grade business value. From
              strategic consulting to advanced prompt architecture, we build the intelligence that
              scales.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Main Consulting Services */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl leading-tight font-semibold text-[#001A3D] md:text-5xl">
              Strategic AI Consulting
            </h2>
            <p className="mx-auto max-w-3xl text-lg font-medium text-gray-500">
              We don't just implement AI; we architect it to solve your most complex operational
              challenges while ensuring safety and scalability.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {AI_CONSULTING_SERVICES.map((item, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group h-full space-y-8 rounded-[2.5rem] border border-gray-100 bg-white p-12 shadow-sm transition-all hover:shadow-2xl"
              >
                <div className="w-fit rounded-2xl bg-gray-50 p-4 shadow-sm transition-all duration-500 group-hover:bg-[#0171c1] group-hover:text-white">
                  {item.icon}
                </div>
                <h3 className="display-font text-2xl leading-tight font-bold text-[#001A3D]">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed font-medium text-gray-500">{item.desc}</p>
                <div className="mt-auto flex items-center border-t border-gray-50 pt-4 text-[10px] font-bold tracking-[0.15em] text-[#0171c1] uppercase">
                  Explore Solution{" "}
                  <MoveRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-2" />
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Prompt Engineering Detail */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex flex-col items-center gap-20 lg:flex-row">
            <div className="flex-1 space-y-12">
              <div className="space-y-6">
                <h2 className="display-font text-3xl leading-tight font-semibold text-[#001A3D] md:text-5xl">
                  Beyond Simple Chat: <br />
                  <span className="text-[#0171c1]">Advanced Prompt Design.</span>
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  Generic prompts yield generic results. Our prompt engineers craft precise,
                  structural instructions that force LLMs into high-reasoning modes, reducing
                  hallucinations and ensuring output reliability.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                {PROMPT_ENGINEERING_SPECIALTIES.map((spec, i) => (
                  <div
                    key={i}
                    className="group space-y-4 rounded-2xl border border-gray-50 p-6 transition-colors hover:bg-gray-50"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="rounded-lg bg-[#0171c1]/5 p-2 text-[#0171c1] transition-all group-hover:bg-[#0171c1] group-hover:text-white">
                        {spec.icon}
                      </div>
                      <h4 className="display-font text-lg font-bold text-[#001A3D]">
                        {spec.title}
                      </h4>
                    </div>
                    <p className="text-sm leading-relaxed font-medium text-gray-500">{spec.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative flex-1">
              <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="AI Logic Visualization"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[#001A3D]/20"></div>
                {/* Floating Metric Card */}
                <div className="absolute -bottom-8 -left-8 hidden max-w-xs rounded-2xl border border-gray-100 bg-white p-8 shadow-2xl md:block">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="rounded-full bg-green-50 p-3 text-green-600">
                      <BarChart3 size={24} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#001A3D]">99.2%</div>
                      <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                        Accuracy Rate
                      </div>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed font-medium text-gray-500">
                    Achieved through custom RAG architectures and multi-step reasoning prompt flows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending AI Topics */}
      <section className="relative overflow-hidden bg-[#001A3D] py-24 text-white">
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 opacity-5">
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,_#0171c1_0%,_transparent_70%)] opacity-30"></div>
        </div>
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-16 flex items-center gap-4">
            <div className="h-[2px] w-12 bg-[#0171c1]"></div>
            <h2 className="text-sm font-bold tracking-[0.2em] text-[#0171c1] uppercase">
              The Future of AI Operations
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {TRENDING_AI_TOPICS.map((topic, i) => (
              <div key={topic.topic} className="space-y-6">
                <div className="display-font text-4xl font-bold text-[#0171c1]/30">0{i + 1}</div>
                <h3 className="display-font text-xl font-bold">{topic.topic}</h3>
                <p className="text-sm leading-relaxed font-medium text-gray-400">
                  {topic.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study/Proof Points */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="relative overflow-hidden rounded-[3rem] bg-gray-50 p-12 lg:p-20">
            <div className="relative z-10 max-w-3xl">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-[#0171c1] px-4 py-1.5 text-[10px] font-bold tracking-widest text-white uppercase">
                Featured Implementation
              </div>
              <h2 className="display-font mb-8 text-3xl leading-tight font-bold text-[#001A3D] md:text-5xl">
                Optimizing Global Supply Chain Logic with Multi-Modal AI.
              </h2>
              <p className="mb-12 text-lg leading-relaxed font-medium text-gray-500">
                By implementing an agentic RAG workflow, we enabled a Fortune 500 logistics provider
                to automate 85% of complex customs documentation processing, reducing operational
                overhead by $1.2M annually.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center border-b-2 border-[#0171c1] pb-1 font-bold text-[#0171c1] transition-all hover:border-[#001A3D] hover:text-[#001A3D]"
              >
                View Full Case Study <MoveRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="absolute right-0 bottom-0 hidden h-2/3 w-1/3 opacity-10 lg:block">
              <Zap className="h-full w-full text-[#0171c1]" />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white pb-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="shadow-3xl space-y-10 rounded-2xl bg-[#0171c1] p-12 text-center text-white md:p-20">
            <Sparkles className="mx-auto mb-4 h-16 w-16 opacity-50" />
            <h2 className="display-font text-4xl leading-tight font-bold md:text-6xl">
              Don't just use AI. <br /> Master it.
            </h2>
            <p className="mx-auto max-w-2xl text-xl font-medium opacity-90">
              Join leading enterprises who trust Hutech Solutions to architect their AI-driven
              future.
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-6">
              <Link
                href="/contact"
                className="rounded-sm bg-white px-12 py-5 text-[11px] font-bold tracking-wider text-[#0171c1] uppercase shadow-xl transition-all hover:bg-[#001A3D] hover:text-white"
              >
                Start AI Discovery
              </Link>
              <Link
                href="/services"
                className="rounded-sm border-2 border-white/30 px-12 py-5 text-[11px] font-bold tracking-wider text-white uppercase transition-all hover:bg-white/10"
              >
                Explore All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
