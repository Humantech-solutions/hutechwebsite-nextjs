"use client";

import { useState, useRef } from "react";
import { motion as Motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Brain,
  TrendingUp,
  AlertTriangle,
  MessageSquare,
  Radio,
  Eye,
  Target,
  Zap,
  Shield,
  BarChart3,
  Check,
  Rocket,
  ChevronDown, MoveRight, } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Meta } from "@/components/Meta";

import { ServiceDetailContactCTA } from "@/components/ServiceDetailContactCTA";

const SERVICES = [
  {
    icon: Brain,
    title: "Development of AI Applications",
    description:
      "We specialize in designing custom AI application development solutions that help optimize business operations and maximize the potential of AI and ML technologies.",
    functions: [
      "Data collection and preprocessing",
      "Model selection and optimization",
      "Algorithm development",
      "Performance enhancement",
      "Predictive analytics",
    ],
  },
  {
    icon: TrendingUp,
    title: "Development of ML Applications",
    description:
      "We deliver custom Machine Learning application development solutions tailored to meet the needs of various industries.",
    functions: [
      "Data preprocessing",
      "Feature extraction",
      "Model selection and training",
      "Regression analysis",
      "Decision tree analysis",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Anomaly Detection",
    description:
      "We use advanced machine learning algorithms to detect outliers, anomalies, and irregular patterns in large datasets.",
    functions: [
      "Unsupervised anomaly detection",
      "Supervised anomaly detection",
      "Semi-supervised anomaly detection",
      "Real-time anomaly detection",
      "Batch anomaly detection",
    ],
  },
  {
    icon: MessageSquare,
    title: "Natural Language Processing (NLP)",
    description:
      "Our NLP services help businesses extract valuable insights from large volumes of unstructured text data.",
    functions: [
      "Text classification",
      "Topic modeling",
      "Information retrieval",
      "Text summarization",
      "Speech recognition",
    ],
  },
  {
    icon: Radio,
    title: "Data-Driven IoT Solutions",
    description:
      "We develop data-driven IoT solutions that help businesses leverage their data to improve operational efficiency and accelerate growth.",
    functions: [
      "Data collection and management",
      "Data analysis and visualization",
      "Predictive maintenance",
      "Asset tracking and management",
      "Remote monitoring and control",
    ],
  },
  {
    icon: Eye,
    title: "Computer Vision Solutions",
    description:
      "We provide advanced Computer Vision services using the latest AI and Machine Learning technologies to build intelligent visual recognition systems.",
    functions: [
      "Object detection",
      "Image classification",
      "Face detection",
      "Facial recognition",
      "Optical Character Recognition (OCR)",
    ],
  },
];

const BENEFITS = [
  {
    icon: Target,
    title: "Precision-Driven Results",
    description:
      "Our AI models deliver accurate predictions and insights that drive informed decision-making.",
  },
  {
    icon: Zap,
    title: "Rapid Development",
    description: "Accelerated project timelines with agile methodologies and proven frameworks.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security protocols ensuring complete data protection and compliance.",
  },
  {
    icon: BarChart3,
    title: "Scalable Solutions",
    description: "Built to grow with your business, handling increasing data volumes seamlessly.",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery & Analysis",
    description:
      "We analyze your business needs, data landscape, and objectives to craft the perfect AI strategy.",
  },
  {
    number: "02",
    title: "Design & Architecture",
    description:
      "Our experts design scalable AI architectures tailored to your specific requirements.",
  },
  {
    number: "03",
    title: "Development & Training",
    description:
      "We build and train sophisticated models using cutting-edge algorithms and frameworks.",
  },
  {
    number: "04",
    title: "Deployment & Integration",
    description: "Seamless integration with your existing systems ensuring minimal disruption.",
  },
  {
    number: "05",
    title: "Optimization & Support",
    description: "Continuous monitoring, optimization, and support to ensure peak performance.",
  },
];

const FAQS = [
  {
    question: "What makes your AI/ML Development Company stand out?",
    answer:
      "Hutech Solutions combines deep technical expertise with a strong understanding of business challenges. Our team builds customized AI and Machine Learning solutions tailored to each client's requirements.",
  },
  {
    question: "Can you handle AI/ML projects across different industries?",
    answer:
      "Yes, we have experience developing AI and ML solutions for multiple industries including retail, healthcare, finance, logistics, manufacturing, and technology.",
  },
  {
    question: "How do you ensure data privacy and security?",
    answer:
      "We follow strict security protocols and industry best practices to protect sensitive data. This includes secure data handling, encryption, and access control.",
  },
];

const AI_ML_STACK = [
  { primary: "OPENAI", secondary: "GENERATIVE AI" },
  { primary: "LANGCHAIN", secondary: "ORCHESTRATION" },
  { primary: "HUGGING FACE", secondary: "MODELS" },
  { primary: "PYTORCH", secondary: "DEEP LEARNING" },
  { primary: "TENSORFLOW", secondary: "ML FRAMEWORK" },
  { primary: "PINECONE", secondary: "VECTOR DB" },
  { primary: "AWS SAGEMAKER", secondary: "CLOUD AI" },
  { primary: "AZURE AI", secondary: "CLOUD AI" },
  { primary: "GOOGLE VERTEX AI", secondary: "CLOUD AI" },
  { primary: "NVIDIA CUDA", secondary: "ACCELERATION" },
  { primary: "KUBEFLOW", secondary: "MLOPS" },
  { primary: "PYTHON", secondary: "LANGUAGE" },
];

function ServiceCard({ service, index }: { service: (typeof SERVICES)[0]; index: number }) {
  const Icon = service.icon;

  return (
    <Motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative h-full"
    >
      <div className="flex h-full flex-col border border-gray-100 bg-white p-8 transition-all duration-500 hover:shadow-2xl md:p-10">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#0171c1]/10 text-[#0171c1] transition-transform duration-500 group-hover:scale-110 md:h-20 md:w-20">
          <Icon size={32} />
        </div>
        <h3 className="mb-4 text-xl font-bold text-[#001A3D] md:text-2xl">{service.title}</h3>
        <p className="mb-8 text-sm leading-relaxed text-gray-600 md:text-base">
          {service.description}
        </p>
        <div className="mt-auto space-y-3">
          {service.functions.map((f, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-gray-500 md:text-sm">
              <Check size={14} className="mt-0.5 text-[#0171c1]" />
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </Motion.div>
  );
}

function FAQItem({ faq, index }: { faq: (typeof FAQS)[0]; index: number }) {
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
          {faq.question}
        </span>
        <ChevronDown
          size={24}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-base leading-relaxed text-gray-600 md:text-lg">{faq.answer}</p>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AiMlSolutions() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen overflow-hidden bg-white">
      <Meta
        title="AI & ML Application Development | Hutech Solutions"
        description="Transform your business with precision AI/ML solutions. Expert AI application development, anomaly detection, NLP, and computer vision services."
      />
      <Breadcrumbs variant="light" />

      <section
        ref={heroRef}
        className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D]"
      >
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="AI/ML solutions background"
            className="h-full w-full scale-105 object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/80 to-transparent"></div>
        </div>

        <Motion.div
          className="relative z-10 mx-auto flex h-full w-full max-w-[1280px] items-center px-6 md:px-8 lg:px-20"
          style={{ opacity: heroOpacity }}
        >
          <div className="max-w-4xl py-12">
            <Motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="h-[1px] w-12 bg-[#F99D1C]"></span>
                <span className="text-[10px] font-bold tracking-[0.3em] text-[#F99D1C] uppercase">
                  Intelligence Redefined
                </span>
              </div>
              <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
                AI/ML Application <br />
                <span className="text-[#F99D1C]">Development.</span>
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
                Step into a realm of endless possibilities. We blend visionary thinking with
                cutting-edge technology to create powerful solutions for businesses of all sizes.
              </p>
              <Link href="/contact" className="btn-banner-cta mt-6 group">
              Consult Us
              <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
            </Link>
            </Motion.div>
          </div>
        </Motion.div>
      </section>

      {/* Intro Section */}
      <section className="overflow-hidden bg-gray-50 py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="grid items-center gap-12 md:gap-20 lg:grid-cols-2">
            <Motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-6 inline-block rounded-full bg-[#0171c1]/10 px-4 py-2 text-sm font-bold text-[#0171c1]">
                Why Intelligence?
              </div>
              <h2 className="mb-6 text-3xl leading-tight font-bold text-[#001A3D] md:text-5xl">
                Transforming Business Through Intelligent Solutions
              </h2>
              <p className="text-base leading-relaxed text-gray-600 md:text-lg">
                We tailor our solutions to meet each client's unique requirements, ensuring optimal
                outcomes that drive business objectives. By harnessing the power of Artificial
                Intelligence, we help organizations improve operational efficiency and gain a
                competitive advantage.
              </p>
            </Motion.div>
            <Motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Tech Vision"
                className="h-full w-full rounded-2xl object-cover shadow-2xl"
              />
              <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-[#0171c1]/10 blur-3xl" />
            </Motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services-section" className="bg-white py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="mb-16 space-y-4 text-center md:mb-20">
            <h2 className="display-font text-3xl font-semibold tracking-tight text-[#001A3D] md:text-5xl">
              Our Specialized AI/ML Services
            </h2>
            <div className="mx-auto h-1.5 w-24 rounded-full bg-[#0171c1]" />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <ServiceCard key={i} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-[#001A3D] py-20 text-white">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="mb-16 space-y-4 md:mb-20">
            <h2 className="display-font text-3xl font-semibold tracking-tight md:text-5xl">
              Our AI/ML Roadmap
            </h2>
            <p className="max-w-2xl text-white/60">
              A systematic approach to engineering excellence.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
            {PROCESS_STEPS.map((step, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-4"
              >
                <div className="display-font text-4xl font-semibold text-[#0171c1] opacity-30 md:text-5xl">
                  {step.number}
                </div>
                <h4 className="display-font text-xl font-semibold">{step.title}</h4>
                <p className="text-sm leading-relaxed text-white/70">{step.description}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern AI/ML Stack Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#001A3D] via-[#030E21] to-[#020B1E] py-24 md:py-32 text-white">
        {/* Radial Light Glow behind heading */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Glowing Grid Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        
        <div className="relative z-10 mx-auto max-w-[1280px] px-6">
          {/* Header */}
          <div className="mb-16 text-center md:mb-20">
            <div className="flex items-center justify-center gap-3 text-[10px] font-bold tracking-[0.3em] text-[#F99D1C] uppercase">
              <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#F99D1C]" />
              TECHNOLOGY STACK
              <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#F99D1C]" />
            </div>
            
            <h2 className="mt-4 display-font text-3xl font-bold tracking-wider text-white sm:text-4xl md:text-5xl uppercase">
              MODERN AI/ML STACK
            </h2>
            
            <div className="mx-auto mt-4 h-[3px] w-14 bg-[#F99D1C]" />
            
            <p className="mx-auto mt-6 max-w-2xl text-sm font-medium text-gray-400 md:text-base leading-relaxed">
              Industry-leading AI and machine learning technologies powering intelligent digital transformation
            </p>
          </div>

          {/* Cards Grid */}
          <div className="border-l border-t border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {AI_ML_STACK.map((item, idx) => (
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

      {/* FAQ Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="grid gap-12 md:gap-20 lg:grid-cols-3">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-[#001A3D] md:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-500">Everything you need to know about our AI/ML services.</p>
            </div>
            <div className="space-y-2 lg:col-span-2">
              {FAQS.map((faq, i) => (
                <FAQItem key={i} faq={faq} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <ServiceDetailContactCTA />

    </div>
  );
}
