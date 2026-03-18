"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Wallet, 
  Building2, 
  Blocks, 
  FileCheck, 
  Users, 
  BrainCircuit, 
  PiggyBank, 
  Fingerprint, 
  Target, 
  Zap, 
  Shield, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  MoveRight, 
  Check, 
  Rocket, 
  ChevronDown 
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Meta } from "@/components/Meta";

const BRAND_ORANGE = "#FFAF2B";
const BRAND_BLUE = "#001A3D";

const SERVICES = [
  {
    icon: Wallet,
    title: "Digital Payments and Mobile Wallets",
    description: "We develop secure and convenient digital payment systems that enable seamless financial transactions.",
    functions: [
      "Peer-to-peer payments",
      "Mobile wallets",
      "QR code payment systems",
      "Contactless payment solutions",
      "Multi-currency support"
    ]
  },
  {
    icon: Building2,
    title: "Digital Banking and Neobanks",
    description: "We create fully digital banking platforms that allow financial institutions to offer services without physical branches.",
    functions: [
      "Online banking platforms",
      "Digital banking apps",
      "Neobank solutions",
      "Account management systems",
      "Real-time transaction processing"
    ]
  },
  {
    icon: Blocks,
    title: "Cryptocurrency and Blockchain Services",
    description: "Our blockchain-powered fintech solutions support secure and transparent digital financial operations.",
    functions: [
      "Cryptocurrency trading platforms",
      "Digital wallets",
      "Blockchain-based financial systems",
      "Token issuance solutions",
      "Smart contract development"
    ]
  },
  {
    icon: FileCheck,
    title: "RegTech (Regulatory Technology)",
    description: "We develop technologies that help financial institutions stay compliant with regulatory standards.",
    functions: [
      "Compliance automation",
      "Risk management solutions",
      "Regulatory monitoring systems",
      "KYC/AML verification",
      "Audit trail management"
    ]
  },
  {
    icon: Users,
    title: "Online Lending & Peer-to-Peer (P2P) Lending",
    description: "We build lending platforms that connect borrowers and lenders efficiently.",
    functions: [
      "Digital loan platforms",
      "P2P lending systems",
      "Automated credit evaluation",
      "Loan management systems",
      "Risk assessment tools"
    ]
  },
  {
    icon: BrainCircuit,
    title: "Artificial Intelligence & Machine Learning",
    description: "AI-powered fintech solutions help businesses analyze financial data and improve decision-making.",
    functions: [
      "Fraud detection systems",
      "Predictive financial analytics",
      "Automated financial insights",
      "Pattern recognition",
      "Customer behavior analysis"
    ]
  },
  {
    icon: PiggyBank,
    title: "Personal Finance Management (PFM) Tools",
    description: "We build smart applications that help users manage their personal finances effectively.",
    functions: [
      "Expense tracking",
      "Budget management",
      "Financial goal monitoring",
      "Investment tracking",
      "Spending analytics"
    ]
  },
  {
    icon: Fingerprint,
    title: "Biometric Authentication",
    description: "We enhance security with advanced biometric technologies.",
    functions: [
      "Fingerprint authentication",
      "Facial recognition",
      "Secure identity verification",
      "Multi-factor authentication",
      "Voice recognition"
    ]
  }
];

const BENEFITS = [
  {
    icon: Target,
    title: "Payment Optimization",
    description: "Streamline payment processes with secure, fast, and efficient digital transaction systems."
  },
  {
    icon: Zap,
    title: "Operational Efficiency",
    description: "Automate workflows and back-office operations to reduce costs and improve performance."
  },
  {
    icon: Shield,
    title: "Financial Data Security",
    description: "Bank-grade security protocols ensuring complete protection of sensitive financial information."
  },
  {
    icon: TrendingUp,
    title: "Accounting Processes",
    description: "Advanced accounting automation that improves accuracy and streamlines financial operations."
  }
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery and Requirements Analysis",
    description: "We begin by understanding your business goals, challenges, and requirements. This helps us identify opportunities where fintech solutions can create maximum impact."
  },
  {
    number: "02",
    title: "Customized Solution Design",
    description: "Based on insights gathered during discovery, we design tailored fintech solutions including software architecture, user experience design, and integration strategies."
  },
  {
    number: "03",
    title: "Development and Testing",
    description: "Our development team builds secure and high-performance fintech applications while conducting rigorous testing to ensure reliability and quality."
  },
  {
    number: "04",
    title: "Blockchain Integration",
    description: "If required, we integrate blockchain technology to ensure secure, transparent, and tamper-proof financial transactions."
  },
  {
    number: "05",
    title: "Data Security and Compliance",
    description: "Security is critical in fintech. We implement advanced cybersecurity measures to protect financial data and ensure compliance with industry regulations."
  },
  {
    number: "06",
    title: "Mobile & Web Application Development",
    description: "We build user-friendly mobile and web applications that allow customers to manage financial services seamlessly from anywhere."
  }
];

const WHY_CHOOSE = [
  {
    icon: Target,
    title: "Industry Expertise",
    description: "Our experienced team has deep knowledge of both fintech and modern IT technologies, enabling us to deliver highly effective financial solutions."
  },
  {
    icon: Sparkles,
    title: "Innovation at the Core",
    description: "We leverage cutting-edge technologies to build innovative fintech applications that keep your business ahead of industry trends."
  },
  {
    icon: Shield,
    title: "Security Without Compromise",
    description: "Security is critical in fintech systems. We implement strong cybersecurity practices to protect financial data and transactions."
  },
  {
    icon: TrendingUp,
    title: "Scalable Solutions",
    description: "Our fintech applications are designed to grow with your business while maintaining performance and user experience."
  },
  {
    icon: Users,
    title: "Client-Centric Approach",
    description: "We prioritize understanding your business vision and requirements to deliver solutions that align perfectly with your goals."
  },
  {
    icon: Rocket,
    title: "Proven Track Record",
    description: "Our diverse fintech project portfolio demonstrates our ability to deliver high-quality solutions that drive innovation, efficiency, and long-term growth."
  }
];

const TECHNOLOGIES = [
  {
    category: "Backend & Development",
    items: ["Java", "Python", "Spring Boot", "Django", "Node.js"]
  },
  {
    category: "Database",
    items: ["MySQL", "PostgreSQL", "MongoDB", "Redis"]
  },
  {
    category: "Frontend & Mobile",
    items: ["JavaScript", "React.js", "Swift", "Kotlin", "Flutter"]
  },
  {
    category: "AI & ML Technologies",
    items: ["PyTorch", "TensorFlow", "OpenCV", "Dlib"]
  }
];

function ServiceCard({ service, index }: { service: typeof SERVICES[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="relative overflow-hidden bg-white h-full transition-all duration-700 border border-gray-100">
        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `linear-gradient(135deg, ${BRAND_BLUE} 0%, ${BRAND_BLUE}ee 100%)`
          }}
        />

        {/* Animated corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-0 h-0 border-t-[80px] border-r-[80px] border-transparent transition-all duration-700"
          style={{
            borderTopColor: isHovered ? BRAND_ORANGE : "transparent",
            borderRightColor: isHovered ? BRAND_ORANGE : "transparent"
          }}
        />
        
        <div className="relative z-10 p-10 h-full flex flex-col">
          {/* Icon with animated background */}
          <motion.div
            className="mb-8 relative w-20 h-20 flex items-center justify-center"
            animate={{
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Icon background circle */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ 
                backgroundColor: isHovered ? BRAND_ORANGE : `${BRAND_ORANGE}15`,
              }}
              animate={{
                rotate: isHovered ? 180 : 0
              }}
              transition={{ duration: 0.7 }}
            />
            <Icon 
              size={36} 
              className="relative z-10"
              style={{ 
                color: isHovered ? BRAND_BLUE : BRAND_ORANGE,
                transition: "color 0.5s ease"
              }} 
            />
          </motion.div>

          {/* Title */}
          <h3 
            className="text-2xl font-bold mb-4 transition-colors duration-500 leading-tight"
            style={{ color: isHovered ? "white" : BRAND_BLUE }}
          >
            {service.title}
          </h3>

          {/* Description */}
          <p 
            className="mb-8 leading-relaxed transition-colors duration-500 text-base"
            style={{ color: isHovered ? "rgba(255,255,255,0.92)" : "#555" }}
          >
            {service.description}
          </p>

          {/* Functions */}
          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-4">
              <div 
                className="w-8 h-0.5 transition-colors duration-500"
                style={{ backgroundColor: isHovered ? BRAND_ORANGE : BRAND_BLUE }}
              />
              <h4 
                className="text-xs font-bold tracking-wider transition-colors duration-500"
                style={{ color: isHovered ? BRAND_ORANGE : BRAND_BLUE }}
              >
                KEY CAPABILITIES
              </h4>
            </div>
            <ul className="space-y-3">
              {service.functions.map((func, idx) => (
                <motion.li 
                  key={idx} 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: isHovered ? idx * 0.05 : 0, duration: 0.3 }}
                  className="flex items-start gap-3 text-sm"
                  style={{ color: isHovered ? "rgba(255,255,255,0.88)" : "#666" }}
                >
                  <Check 
                    size={18} 
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: isHovered ? BRAND_ORANGE : BRAND_BLUE }} 
                  />
                  <span className="leading-relaxed">{func}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Learn more link */}
          <motion.div
            className="mt-6 pt-6 border-t transition-all duration-500"
            style={{ 
              borderColor: isHovered ? "rgba(255,255,255,0.2)" : "transparent"
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            <div 
              className="flex items-center gap-2 text-sm font-semibold cursor-pointer"
              style={{ color: BRAND_ORANGE }}
            >
              Learn More
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function FAQItem({ faq, index }: { faq: { question: string, answer: string }, index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left group"
      >
        <span className={`text-lg md:text-xl font-bold transition-colors ${isOpen ? "text-[#FFAF2B]" : "text-[#001A3D] group-hover:text-[#FFAF2B]"}`}>{faq.question}</span>
        <ChevronDown size={24} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600 leading-relaxed text-base md:text-lg">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FintechAppDevelopment() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div className="min-h-screen bg-white">
      <Meta 
        title="Banking & Financial Services | Hutech Solutions"
        description="Secure, scalable, and tailored banking and financial solutions. Expert software engineering, digital payments, blockchain integration, and financial data security."
      />
      <Breadcrumbs variant="light" />
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="bg-[#001A3D] text-white h-[450px] relative overflow-hidden flex items-center"
      >
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1726138388546-30955e45aaec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Fintech Banking and Financial Services"
            className="w-full h-full object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/80 to-transparent"></div>
        </div>
        
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-20 z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[1px] bg-[#FFAF2B]"></span>
              <span className="text-[#FFAF2B] font-bold uppercase tracking-[0.3em] text-[10px]">Banking & Finance IT Services</span>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight display-font mb-8">
              Banking & Financial <br />
              <span className="text-[#FFAF2B]">Services.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed">
              In the fast-paced world of finance, staying ahead requires not only innovative ideas but also robust and secure IT solutions. We specialize in delivering advanced Fintech IT services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1280px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div 
                  className="inline-block px-4 py-2 rounded-full mb-6"
                  style={{ backgroundColor: `${BRAND_ORANGE}15`, color: BRAND_ORANGE }}
                >
                  <span className="text-sm font-semibold tracking-wide">Why Choose Us</span>
                </div>
                <h2 
                  className="text-4xl font-semibold mb-6 leading-tight tracking-tight display-font"
                  style={{ color: BRAND_BLUE }}
                >
                  Transforming Finance with Cutting-Edge IT Services
                </h2>
                <p 
                  className="text-lg leading-relaxed mb-6"
                  style={{ color: "#333" }}
                >
                  Hutech Solutions is a leading provider of banking and financial software development services for clients across the globe. Our experienced in-house developers have a strong track record of delivering powerful financial solutions that automate and streamline financial operations.
                </p>
              </div>
              <div className="flex items-center">
                <div>
                  <p 
                    className="text-lg leading-relaxed mb-6"
                    style={{ color: "#333" }}
                  >
                    By implementing effective FinTech solutions, organizations gain powerful tools that automate workflows and improve business performance. We follow agile development methodologies and use cutting-edge technologies to deliver world-class fintech solutions tailored to each client's needs.
                  </p>
                  <p 
                    className="text-lg leading-relaxed"
                    style={{ color: "#333" }}
                  >
                    Our expert fintech developers create scalable, secure, and customized financial software solutions that perfectly align with your business requirements.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 
              className="text-3xl font-semibold mb-4 display-font tracking-tight"
              style={{ color: BRAND_BLUE }}
            >
              Our Banking & Financial Solutions Help Businesses Improve:
            </h3>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white p-8 border border-gray-100 group hover:shadow-xl transition-all duration-500 relative overflow-hidden"
                >
                  {/* Hover gradient overlay */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${BRAND_BLUE}05 0%, ${BRAND_ORANGE}05 100%)`
                    }}
                  />
                  
                  <div className="relative z-10">
                    <div 
                      className="w-14 h-14 rounded-lg flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                      style={{ backgroundColor: `${BRAND_ORANGE}15` }}
                    >
                      <Icon size={28} style={{ color: BRAND_ORANGE }} />
                    </div>
                    <h3 
                      className="text-xl font-bold mb-3"
                      style={{ color: BRAND_BLUE }}
                    >
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services-section" className="py-20 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="service-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="30" fill="none" stroke={BRAND_BLUE} strokeWidth="1"/>
                <circle cx="50" cy="50" r="15" fill="none" stroke={BRAND_ORANGE} strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#service-pattern)" />
          </svg>
        </div>

        <div className="max-w-[1280px] mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <div 
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full"
                style={{ backgroundColor: `${BRAND_BLUE}10` }}
              >
                <Rocket size={18} style={{ color: BRAND_ORANGE }} />
                <span className="text-sm font-semibold tracking-wide" style={{ color: BRAND_BLUE }}>
                  Our Expertise
                </span>
              </div>
            </motion.div>

            <h2 
              className="text-5xl md:text-6xl font-semibold mb-6 max-w-4xl mx-auto leading-tight display-font tracking-tight"
              style={{ color: BRAND_BLUE }}
            >
              Our Key Fintech Services
            </h2>
            
            <motion.div 
              className="w-32 h-1.5 mx-auto rounded-full"
              style={{ backgroundColor: BRAND_ORANGE }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-8 leading-relaxed">
              Comprehensive fintech solutions designed to revolutionize financial services and drive digital transformation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section 
        className="py-20 relative overflow-hidden"
        style={{ backgroundColor: BRAND_BLUE }}
      >
        {/* Animated background circles */}
        <motion.div
          className="absolute -left-32 top-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ backgroundColor: BRAND_ORANGE }}
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0]
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute -right-32 bottom-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ backgroundColor: BRAND_ORANGE }}
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -50, 0]
          }}
          transition={{ duration: 18, repeat: Infinity }}
        />

        <div className="max-w-[1280px] mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 
              className="text-5xl md:text-6xl font-bold mb-6"
              style={{ color: "white" }}
            >
              Our Fintech App Development Process
            </h2>
            <div 
              className="w-32 h-1.5 mx-auto rounded-full"
              style={{ backgroundColor: BRAND_ORANGE }}
            />
            <p className="text-xl mt-8 max-w-3xl mx-auto" style={{ color: "rgba(255,255,255,0.85)" }}>
              Our development process follows industry best practices to deliver secure, scalable, and efficient fintech solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="relative">
                  {/* Number circle */}
                  <motion.div
                    className="w-24 h-24 rounded-full flex items-center justify-center mb-6 relative z-10 border-4 group-hover:scale-110 transition-transform duration-500"
                    style={{ 
                      backgroundColor: BRAND_BLUE,
                      borderColor: BRAND_ORANGE
                    }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <span 
                      className="text-3xl font-bold"
                      style={{ color: BRAND_ORANGE }}
                    >
                      {step.number}
                    </span>
                  </motion.div>

                  <h3 
                    className="text-xl font-bold mb-4"
                    style={{ color: "white" }}
                  >
                    {step.title}
                  </h3>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.75)" }}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div 
              className="inline-block px-5 py-2 rounded-full mb-6"
              style={{ backgroundColor: `${BRAND_ORANGE}15`, color: BRAND_ORANGE }}
            >
              <span className="text-sm font-bold tracking-wider">TECH STACK</span>
            </div>
            <h2 
              className="text-5xl md:text-6xl font-bold mb-6"
              style={{ color: BRAND_BLUE }}
            >
              Technologies We Use
            </h2>
            <motion.div 
              className="w-32 h-1.5 mx-auto rounded-full"
              style={{ backgroundColor: BRAND_ORANGE }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-8 leading-relaxed">
              We leverage modern technologies and frameworks to build powerful fintech applications.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TECHNOLOGIES.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 border border-gray-100 hover:shadow-xl transition-all duration-500"
              >
                <h3 
                  className="text-lg font-bold mb-6 pb-4 border-b"
                  style={{ 
                    color: BRAND_BLUE,
                    borderColor: `${BRAND_ORANGE}30`
                  }}
                >
                  {tech.category}
                </h3>
                <ul className="space-y-3">
                  {tech.items.map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05, duration: 0.3 }}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: BRAND_ORANGE }}
                      />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div 
              className="inline-block px-5 py-2 rounded-full mb-6"
              style={{ backgroundColor: `${BRAND_BLUE}10`, color: BRAND_BLUE }}
            >
              <span className="text-sm font-bold tracking-wider">WHY CHOOSE US</span>
            </div>
            <h2 
              className="text-5xl md:text-6xl font-bold mb-6"
              style={{ color: BRAND_BLUE }}
            >
              Why Choose Hutech Solutions for Fintech Development?
            </h2>
            <motion.div 
              className="w-32 h-1.5 mx-auto rounded-full"
              style={{ backgroundColor: BRAND_ORANGE }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_CHOOSE.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-gradient-to-br from-gray-50 to-white p-8 border border-gray-100 group hover:shadow-xl transition-all duration-500 relative overflow-hidden"
                >
                  {/* Hover accent line */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: BRAND_ORANGE }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  <div className="relative z-10">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                      style={{ backgroundColor: `${BRAND_ORANGE}15` }}
                    >
                      <Icon size={32} style={{ color: BRAND_ORANGE }} />
                    </div>
                    <h3 
                      className="text-2xl font-bold mb-4"
                      style={{ color: BRAND_BLUE }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-bold">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-20 relative overflow-hidden"
        style={{ backgroundColor: BRAND_BLUE }}
      >
        {/* Animated gradient mesh */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, ${BRAND_ORANGE} 0%, transparent 50%),
                             radial-gradient(circle at 70% 50%, ${BRAND_ORANGE} 0%, transparent 50%)`,
            backgroundSize: "200% 200%"
          }}
        />

        <div className="max-w-[1280px] mx-auto px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-8 border-2"
              style={{ borderColor: BRAND_ORANGE }}
            >
              <Sparkles size={20} style={{ color: BRAND_ORANGE }} />
              <span className="text-sm font-bold" style={{ color: BRAND_ORANGE }}>
                LET'S BUILD THE FUTURE OF FINANCE
              </span>
            </motion.div>

            <h2 
              className="text-5xl md:text-6xl font-bold mb-8 max-w-4xl mx-auto leading-tight"
              style={{ color: "white" }}
            >
              Ready to Transform Your Financial Services?
            </h2>
            <p 
              className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-bold"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              Get a free consultation and discover how our fintech solutions can drive innovation, efficiency, and growth for your business.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <motion.div
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-12 py-6 font-bold text-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300"
                  style={{
                    backgroundColor: BRAND_ORANGE,
                    color: BRAND_BLUE
                  }}
                >
                  Get a Free Consultation
                  <MoveRight size={26} />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/services"
                  className="inline-flex items-center gap-3 px-12 py-6 font-semibold text-xl border-2 transition-all duration-300"
                  style={{
                    borderColor: "rgba(255,255,255,0.3)",
                    color: "white"
                  }}
                >
                  View All Services
                  <ArrowRight size={24} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
