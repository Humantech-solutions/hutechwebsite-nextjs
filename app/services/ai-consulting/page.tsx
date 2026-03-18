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
  Workflow
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

const AI_CONSULTING_SERVICES = [
  {
    title: "AI Strategy & Feasibility",
    icon: <Target className="w-8 h-8 text-[#0171c1]" />,
    desc: "We analyze your business objectives, data assets, and technical infrastructure to identify high-ROI AI opportunities and build a strategic adoption roadmap."
  },
  {
    title: "LLM Selection & Optimization",
    icon: <Cpu className="w-8 h-8 text-[#0171c1]" />,
    desc: "From proprietary models like GPT-4 and Claude 3 to open-source powerhouses like Llama 3 and Mistral, we select the optimal model for your specific latency and cost requirements."
  },
  {
    title: "AI Ethics & Governance",
    icon: <ShieldCheck className="w-8 h-8 text-[#0171c1]" />,
    desc: "Establishing responsible AI frameworks, ensuring data privacy (GDPR/HIPAA), and mitigating model bias to build trust and ensure long-term regulatory compliance."
  }
];

const PROMPT_ENGINEERING_SPECIALTIES = [
  {
    title: "Advanced Prompt Design",
    icon: <Terminal className="w-6 h-6 text-[#0171c1]" />,
    desc: "Implementing sophisticated techniques like Chain-of-Thought (CoT), few-shot learning, and least-to-most prompting to extract maximum reasoning from LLMs."
  },
  {
    title: "Context & RAG Architecture",
    icon: <Layers className="w-6 h-6 text-[#0171c1]" />,
    desc: "Designing Retrieval-Augmented Generation (RAG) systems with vector databases (Pinecone, Weaviate) to provide AI models with real-time, private enterprise knowledge."
  },
  {
    title: "Prompt Security & Injection Defense",
    icon: <ShieldAlert className="w-6 h-6 text-[#0171c1]" />,
    desc: "Protecting your AI interfaces from prompt injection attacks and ensuring jailbreak-resistant instructions for customer-facing agents."
  },
  {
    title: "Multi-Modal AI Workflows",
    icon: <Workflow className="w-6 h-6 text-[#0171c1]" />,
    desc: "Building complex pipelines that integrate text, vision, and audio for comprehensive automated reasoning and content creation."
  }
];

const TRENDING_AI_TOPICS = [
  {
    topic: "LLMOps & Monitoring",
    description: "Continuous evaluation and deployment pipelines for AI models to ensure performance doesn't drift and hallucinations are minimized in production."
  },
  {
    topic: "Vector Database Strategy",
    description: "Optimizing semantic search and retrieval performance through high-performance vector embedding management and indexing strategies."
  },
  {
    topic: "Agentic Workflows",
    description: "Moving beyond chatbots to autonomous AI agents that can use tools, browse the web, and complete multi-step tasks independently."
  },
  {
    topic: "Token Cost Optimization",
    description: "Advanced context window management and caching techniques to reduce API overhead by up to 40% without sacrificing accuracy."
  }
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
      <section className="bg-[#001A3D] text-white h-[450px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1764336312138-14a5368a6cd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="AI Neural Network Visualization"
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
              <span className="text-[#FFAF2B] font-bold uppercase tracking-[0.3em] text-[10px]">Enterprise Generative AI</span>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight display-font mb-8">
              AI Strategy & <br />
              <span className="text-[#FFAF2B]">Prompt Engineering.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed">
              We bridge the gap between raw AI potential and production-grade business value. From strategic consulting to advanced prompt architecture, we build the intelligence that scales.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Main Consulting Services */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-6">
             <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font leading-tight">Strategic AI Consulting</h2>
             <p className="text-lg text-gray-500 max-w-3xl mx-auto font-medium">
                We don't just implement AI; we architect it to solve your most complex operational challenges while ensuring safety and scalability.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {AI_CONSULTING_SERVICES.map((item, i) => (
              <Motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-12 rounded-[2.5rem] bg-white border border-gray-100 space-y-8 hover:shadow-2xl transition-all group h-full shadow-sm"
              >
                <div className="p-4 bg-gray-50 rounded-2xl w-fit shadow-sm group-hover:bg-[#0171c1] group-hover:text-white transition-all duration-500">{item.icon}</div>
                <h3 className="text-2xl font-bold text-[#001A3D] display-font leading-tight">{item.title}</h3>
                 <p className="text-gray-500 font-medium leading-relaxed text-sm">{item.desc}</p>
                <div className="pt-4 flex items-center text-[10px] font-bold text-[#0171c1] uppercase tracking-[0.15em] border-t border-gray-50 mt-auto">
                   Explore Solution <MoveRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Prompt Engineering Detail */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1 space-y-12">
               <div className="space-y-6">
                  <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font leading-tight">
                    Beyond Simple Chat: <br />
                    <span className="text-[#0171c1]">Advanced Prompt Design.</span>
                  </h2>
                   <div className="w-20 h-1 bg-[#0171c1]"></div>
                  <p className="text-lg text-gray-500 font-medium leading-relaxed">
                    Generic prompts yield generic results. Our prompt engineers craft precise, structural instructions that force LLMs into high-reasoning modes, reducing hallucinations and ensuring output reliability.
                  </p>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {PROMPT_ENGINEERING_SPECIALTIES.map((spec, i) => (
                    <div key={i} className="space-y-4 p-6 border border-gray-50 rounded-2xl hover:bg-gray-50 transition-colors group">
                       <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-[#0171c1]/5 rounded-lg text-[#0171c1] group-hover:bg-[#0171c1] group-hover:text-white transition-all">{spec.icon}</div>
                          <h4 className="font-bold text-[#001A3D] display-font text-lg">{spec.title}</h4>
                       </div>
                       <p className="text-sm text-gray-500 font-medium leading-relaxed">{spec.desc}</p>
                    </div>
                  ))}
               </div>
             </div>
            <div className="flex-1 relative">
               <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                    alt="AI Logic Visualization" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#001A3D]/20"></div>
                  {/* Floating Metric Card */}
                  <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 max-w-xs hidden md:block">
                     <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-green-50 text-green-600 rounded-full">
                           <BarChart3 size={24} />
                        </div>
                        <div>
                           <div className="text-2xl font-bold text-[#001A3D]">99.2%</div>
                           <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Accuracy Rate</div>
                        </div>
                     </div>
                     <p className="text-xs text-gray-500 font-medium leading-relaxed">
                        Achieved through custom RAG architectures and multi-step reasoning prompt flows.
                     </p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending AI Topics */}
       <section className="py-24 bg-[#001A3D] text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5 pointer-events-none">
           <div className="w-full h-full bg-[radial-gradient(circle_at_center,_#0171c1_0%,_transparent_70%)] opacity-30"></div>
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10">
           <div className="flex items-center gap-4 mb-16">
              <div className="w-12 h-[2px] bg-[#0171c1]"></div>
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-[#0171c1]">The Future of AI Operations</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {TRENDING_AI_TOPICS.map((topic, i) => (
                <div key={topic.topic} className="space-y-6">
                   <div className="text-4xl font-bold text-[#0171c1]/30 display-font">0{i+1}</div>
                   <h3 className="text-xl font-bold display-font">{topic.topic}</h3>
                   <p className="text-gray-400 text-sm font-medium leading-relaxed">
                      {topic.description}
                   </p>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* Case Study/Proof Points */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
           <div className="bg-gray-50 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden">
              <div className="relative z-10 max-w-3xl">
                 <div className="inline-flex items-center gap-2 bg-[#0171c1] text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8">
                    Featured Implementation
                 </div>
                 <h2 className="text-3xl md:text-5xl font-bold text-[#001A3D] display-font mb-8 leading-tight">
                    Optimizing Global Supply Chain Logic with Multi-Modal AI.
                 </h2>
                 <p className="text-lg text-gray-500 font-medium mb-12 leading-relaxed">
                    By implementing an agentic RAG workflow, we enabled a Fortune 500 logistics provider to automate 85% of complex customs documentation processing, reducing operational overhead by $1.2M annually.
                 </p>
                 <Link href="/contact" className="inline-flex items-center text-[#0171c1] font-bold border-b-2 border-[#0171c1] pb-1 hover:text-[#001A3D] hover:border-[#001A3D] transition-all">
                    View Full Case Study <MoveRight className="ml-2 w-4 h-4" />
                  </Link>
              </div>
              <div className="absolute right-0 bottom-0 w-1/3 h-2/3 opacity-10 hidden lg:block">
                 <Zap className="w-full h-full text-[#0171c1]" />
              </div>
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white pb-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="bg-[#0171c1] rounded-2xl p-12 md:p-20 text-center text-white space-y-10 shadow-3xl">
            <Sparkles className="w-16 h-16 mx-auto opacity-50 mb-4" />
            <h2 className="text-4xl md:text-6xl font-bold display-font leading-tight">
              Don't just use AI. <br /> Master it.
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto font-medium">
              Join leading enterprises who trust Hutech Solutions to architect their AI-driven future.
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-6">
              <Link href="/contact" className="bg-white text-[#0171c1] px-12 py-5 font-bold uppercase tracking-wider text-[11px] hover:bg-[#001A3D] hover:text-white transition-all shadow-xl rounded-sm">
                Start AI Discovery
              </Link>
              <Link href="/services" className="border-2 border-white/30 text-white px-12 py-5 font-bold uppercase tracking-wider text-[11px] hover:bg-white/10 transition-all rounded-sm">
                Explore All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
