"use client";

import { useState, useRef } from "react";
import { motion as Motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Brain, TrendingUp, AlertTriangle, MessageSquare, Radio, Eye, Target, Zap, Shield, BarChart3, Check, Rocket, ChevronDown } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Meta } from "@/components/Meta";

const SERVICES = [
  {
    icon: Brain,
    title: "Development of AI Applications",
    description: "We specialize in designing custom AI application development solutions that help optimize business operations and maximize the potential of AI and ML technologies.",
    functions: [
      "Data collection and preprocessing",
      "Model selection and optimization",
      "Algorithm development",
      "Performance enhancement",
      "Predictive analytics"
    ]
  },
  {
    icon: TrendingUp,
    title: "Development of ML Applications",
    description: "We deliver custom Machine Learning application development solutions tailored to meet the needs of various industries.",
    functions: [
      "Data preprocessing",
      "Feature extraction",
      "Model selection and training",
      "Regression analysis",
      "Decision tree analysis"
    ]
  },
  {
    icon: AlertTriangle,
    title: "Anomaly Detection",
    description: "We use advanced machine learning algorithms to detect outliers, anomalies, and irregular patterns in large datasets.",
    functions: [
      "Unsupervised anomaly detection",
      "Supervised anomaly detection",
      "Semi-supervised anomaly detection",
      "Real-time anomaly detection",
      "Batch anomaly detection"
    ]
  },
  {
    icon: MessageSquare,
    title: "Natural Language Processing (NLP)",
    description: "Our NLP services help businesses extract valuable insights from large volumes of unstructured text data.",
    functions: [
      "Text classification",
      "Topic modeling",
      "Information retrieval",
      "Text summarization",
      "Speech recognition"
    ]
  },
  {
    icon: Radio,
    title: "Data-Driven IoT Solutions",
    description: "We develop data-driven IoT solutions that help businesses leverage their data to improve operational efficiency and accelerate growth.",
    functions: [
      "Data collection and management",
      "Data analysis and visualization",
      "Predictive maintenance",
      "Asset tracking and management",
      "Remote monitoring and control"
    ]
  },
  {
    icon: Eye,
    title: "Computer Vision Solutions",
    description: "We provide advanced Computer Vision services using the latest AI and Machine Learning technologies to build intelligent visual recognition systems.",
    functions: [
      "Object detection",
      "Image classification",
      "Face detection",
      "Facial recognition",
      "Optical Character Recognition (OCR)"
    ]
  }
];

const BENEFITS = [
  {
    icon: Target,
    title: "Precision-Driven Results",
    description: "Our AI models deliver accurate predictions and insights that drive informed decision-making."
  },
  {
    icon: Zap,
    title: "Rapid Development",
    description: "Accelerated project timelines with agile methodologies and proven frameworks."
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security protocols ensuring complete data protection and compliance."
  },
  {
    icon: BarChart3,
    title: "Scalable Solutions",
    description: "Built to grow with your business, handling increasing data volumes seamlessly."
  }
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery & Analysis",
    description: "We analyze your business needs, data landscape, and objectives to craft the perfect AI strategy."
  },
  {
    number: "02",
    title: "Design & Architecture",
    description: "Our experts design scalable AI architectures tailored to your specific requirements."
  },
  {
    number: "03",
    title: "Development & Training",
    description: "We build and train sophisticated models using cutting-edge algorithms and frameworks."
  },
  {
    number: "04",
    title: "Deployment & Integration",
    description: "Seamless integration with your existing systems ensuring minimal disruption."
  },
  {
    number: "05",
    title: "Optimization & Support",
    description: "Continuous monitoring, optimization, and support to ensure peak performance."
  }
];

const FAQS = [
  {
    question: "What makes your AI/ML Development Company stand out?",
    answer: "Hutech Solutions combines deep technical expertise with a strong understanding of business challenges. Our team builds customized AI and Machine Learning solutions tailored to each client's requirements."
  },
  {
    question: "Can you handle AI/ML projects across different industries?",
    answer: "Yes, we have experience developing AI and ML solutions for multiple industries including retail, healthcare, finance, logistics, manufacturing, and technology."
  },
  {
    question: "How do you ensure data privacy and security?",
    answer: "We follow strict security protocols and industry best practices to protect sensitive data. This includes secure data handling, encryption, and access control."
  }
];

function ServiceCard({ service, index }: { service: typeof SERVICES[0], index: number }) {
  const Icon = service.icon;

  return (
    <Motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative h-full"
    >
      <div className="bg-white border border-gray-100 p-8 md:p-10 h-full flex flex-col transition-all duration-500 hover:shadow-2xl">
        <div className="mb-6 w-16 h-16 md:w-20 md:h-20 bg-[#0171c1]/10 rounded-full flex items-center justify-center text-[#0171c1] transition-transform duration-500 group-hover:scale-110">
          <Icon size={32} />
        </div>
        <h3 className="text-xl md:text-2xl font-bold mb-4 text-[#001A3D]">{service.title}</h3>
        <p className="text-gray-600 mb-8 text-sm md:text-base leading-relaxed">{service.description}</p>
        <div className="mt-auto space-y-3">
          {service.functions.map((f, i) => (
            <div key={i} className="flex gap-2 items-start text-xs md:text-sm text-gray-500">
              <Check size={14} className="text-[#0171c1] mt-0.5" />
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </Motion.div>
  );
}

function FAQItem({ faq, index }: { faq: typeof FAQS[0], index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left group"
      >
        <span className={`text-lg md:text-xl font-bold transition-colors ${isOpen ? "text-[#0171c1]" : "text-[#001A3D] group-hover:text-[#0171c1]"}`}>{faq.question}</span>
        <ChevronDown size={24} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <Motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600 leading-relaxed text-base md:text-lg">{faq.answer}</p>
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
    <div className="min-h-screen bg-white overflow-hidden">
      <Meta 
        title="AI & ML Application Development | Hutech Solutions"
        description="Transform your business with precision AI/ML solutions. Expert AI application development, anomaly detection, NLP, and computer vision services."
      />
      <Breadcrumbs variant="light" />
      
      <section 
        ref={heroRef}
        className="relative overflow-hidden h-[450px] bg-[#001A3D] flex items-center"
      >
        <div className="absolute inset-0 z-0">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
            alt="AI/ML solutions background" 
            className="w-full h-full object-cover opacity-20 scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/80 to-transparent"></div>
        </div>
        
        <Motion.div 
          className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-20 h-full flex items-center relative z-10 w-full"
          style={{ opacity: heroOpacity }}
        >
          <div className="max-w-4xl py-12">
            <Motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-12 h-[1px] bg-[#FFAF2B]"></span>
                <span className="text-[#FFAF2B] font-bold uppercase tracking-[0.3em] text-[10px]">Intelligence Redefined</span>
              </div>
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight display-font mb-8">
                AI/ML Application <br />
                <span className="text-[#FFAF2B]">Development.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed">
                Step into a realm of endless possibilities. We blend visionary thinking with cutting-edge technology to create powerful solutions for businesses of all sizes.
              </p>
            </Motion.div>
          </div>
        </Motion.div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <Motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-block px-4 py-2 rounded-full bg-[#0171c1]/10 text-[#0171c1] text-sm font-bold mb-6">Why Intelligence?</div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#001A3D] mb-6 leading-tight">Transforming Business Through Intelligent Solutions</h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                We tailor our solutions to meet each client's unique requirements, ensuring optimal outcomes that drive business objectives. By harnessing the power of Artificial Intelligence, we help organizations improve operational efficiency and gain a competitive advantage.
              </p>
            </Motion.div>
            <Motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative">
              <ImageWithFallback src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" alt="Tech Vision" className="w-full h-full object-cover rounded-2xl shadow-2xl" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#0171c1]/10 blur-3xl rounded-full" />
            </Motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services-section" className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16 md:mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font tracking-tight">Our Specialized AI/ML Services</h2>
            <div className="w-24 h-1.5 bg-[#0171c1] mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((s, i) => <ServiceCard key={i} service={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-[#001A3D] text-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="mb-16 md:mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-semibold display-font tracking-tight">Our AI/ML Roadmap</h2>
            <p className="text-white/60 max-w-2xl">A systematic approach to engineering excellence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <Motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-4"
              >
                <div className="text-4xl md:text-5xl font-semibold text-[#0171c1] opacity-30 display-font">{step.number}</div>
                <h4 className="text-xl font-semibold display-font">{step.title}</h4>
                <p className="text-white/70 text-sm leading-relaxed">{step.description}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 md:gap-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#001A3D] mb-6">Frequently Asked Questions</h2>
              <p className="text-gray-500">Everything you need to know about our AI/ML services.</p>
            </div>
            <div className="lg:col-span-2 space-y-2">
              {FAQS.map((faq, i) => <FAQItem key={i} faq={faq} index={i} />)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
