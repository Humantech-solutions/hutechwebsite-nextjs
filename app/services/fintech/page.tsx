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
  ChevronDown,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Meta } from "@/components/Meta";

const BRAND_ORANGE = "#F99D1C";
const BRAND_BLUE = "#001A3D";

const SERVICES = [
  {
    icon: Wallet,
    title: "Digital Payments and Mobile Wallets",
    description:
      "We develop secure and convenient digital payment systems that enable seamless financial transactions.",
    functions: [
      "Peer-to-peer payments",
      "Mobile wallets",
      "QR code payment systems",
      "Contactless payment solutions",
      "Multi-currency support",
    ],
  },
  {
    icon: Building2,
    title: "Digital Banking and Neobanks",
    description:
      "We create fully digital banking platforms that allow financial institutions to offer services without physical branches.",
    functions: [
      "Online banking platforms",
      "Digital banking apps",
      "Neobank solutions",
      "Account management systems",
      "Real-time transaction processing",
    ],
  },
  {
    icon: Blocks,
    title: "Cryptocurrency and Blockchain Services",
    description:
      "Our blockchain-powered fintech solutions support secure and transparent digital financial operations.",
    functions: [
      "Cryptocurrency trading platforms",
      "Digital wallets",
      "Blockchain-based financial systems",
      "Token issuance solutions",
      "Smart contract development",
    ],
  },
  {
    icon: FileCheck,
    title: "RegTech (Regulatory Technology)",
    description:
      "We develop technologies that help financial institutions stay compliant with regulatory standards.",
    functions: [
      "Compliance automation",
      "Risk management solutions",
      "Regulatory monitoring systems",
      "KYC/AML verification",
      "Audit trail management",
    ],
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
      "Risk assessment tools",
    ],
  },
  {
    icon: BrainCircuit,
    title: "Artificial Intelligence & Machine Learning",
    description:
      "AI-powered fintech solutions help businesses analyze financial data and improve decision-making.",
    functions: [
      "Fraud detection systems",
      "Predictive financial analytics",
      "Automated financial insights",
      "Pattern recognition",
      "Customer behavior analysis",
    ],
  },
  {
    icon: PiggyBank,
    title: "Personal Finance Management (PFM) Tools",
    description:
      "We build smart applications that help users manage their personal finances effectively.",
    functions: [
      "Expense tracking",
      "Budget management",
      "Financial goal monitoring",
      "Investment tracking",
      "Spending analytics",
    ],
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
      "Voice recognition",
    ],
  },
];

const BENEFITS = [
  {
    icon: Target,
    title: "Payment Optimization",
    description:
      "Streamline payment processes with secure, fast, and efficient digital transaction systems.",
  },
  {
    icon: Zap,
    title: "Operational Efficiency",
    description:
      "Automate workflows and back-office operations to reduce costs and improve performance.",
  },
  {
    icon: Shield,
    title: "Financial Data Security",
    description:
      "Bank-grade security protocols ensuring complete protection of sensitive financial information.",
  },
  {
    icon: TrendingUp,
    title: "Accounting Processes",
    description:
      "Advanced accounting automation that improves accuracy and streamlines financial operations.",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery and Requirements Analysis",
    description:
      "We begin by understanding your business goals, challenges, and requirements. This helps us identify opportunities where fintech solutions can create maximum impact.",
  },
  {
    number: "02",
    title: "Customized Solution Design",
    description:
      "Based on insights gathered during discovery, we design tailored fintech solutions including software architecture, user experience design, and integration strategies.",
  },
  {
    number: "03",
    title: "Development and Testing",
    description:
      "Our development team builds secure and high-performance fintech applications while conducting rigorous testing to ensure reliability and quality.",
  },
  {
    number: "04",
    title: "Blockchain Integration",
    description:
      "If required, we integrate blockchain technology to ensure secure, transparent, and tamper-proof financial transactions.",
  },
  {
    number: "05",
    title: "Data Security and Compliance",
    description:
      "Security is critical in fintech. We implement advanced cybersecurity measures to protect financial data and ensure compliance with industry regulations.",
  },
  {
    number: "06",
    title: "Mobile & Web Application Development",
    description:
      "We build user-friendly mobile and web applications that allow customers to manage financial services seamlessly from anywhere.",
  },
];

const WHY_CHOOSE = [
  {
    icon: Target,
    title: "Industry Expertise",
    description:
      "Our experienced team has deep knowledge of both fintech and modern IT technologies, enabling us to deliver highly effective financial solutions.",
  },
  {
    icon: Sparkles,
    title: "Innovation at the Core",
    description:
      "We leverage cutting-edge technologies to build innovative fintech applications that keep your business ahead of industry trends.",
  },
  {
    icon: Shield,
    title: "Security Without Compromise",
    description:
      "Security is critical in fintech systems. We implement strong cybersecurity practices to protect financial data and transactions.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Solutions",
    description:
      "Our fintech applications are designed to grow with your business while maintaining performance and user experience.",
  },
  {
    icon: Users,
    title: "Client-Centric Approach",
    description:
      "We prioritize understanding your business vision and requirements to deliver solutions that align perfectly with your goals.",
  },
  {
    icon: Rocket,
    title: "Proven Track Record",
    description:
      "Our diverse fintech project portfolio demonstrates our ability to deliver high-quality solutions that drive innovation, efficiency, and long-term growth.",
  },
];

const TECHNOLOGIES = [
  {
    category: "Backend & Development",
    items: ["Java", "Python", "Spring Boot", "Django", "Node.js"],
  },
  {
    category: "Database",
    items: ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    category: "Frontend & Mobile",
    items: ["JavaScript", "React.js", "Swift", "Kotlin", "Flutter"],
  },
  {
    category: "AI & ML Technologies",
    items: ["PyTorch", "TensorFlow", "OpenCV", "Dlib"],
  },
];

function ServiceCard({ service, index }: { service: (typeof SERVICES)[0]; index: number }) {
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
      <div className="relative h-full overflow-hidden border border-gray-100 bg-white transition-all duration-700">
        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: `linear-gradient(135deg, ${BRAND_BLUE} 0%, ${BRAND_BLUE}ee 100%)`,
          }}
        />

        {/* Animated corner accent */}
        <motion.div
          className="absolute top-0 right-0 h-0 w-0 border-t-[80px] border-r-[80px] border-transparent transition-all duration-700"
          style={{
            borderTopColor: isHovered ? BRAND_ORANGE : "transparent",
            borderRightColor: isHovered ? BRAND_ORANGE : "transparent",
          }}
        />

        <div className="relative z-10 flex h-full flex-col p-10">
          {/* Icon with animated background */}
          <motion.div
            className="relative mb-8 flex h-20 w-20 items-center justify-center"
            animate={{
              scale: isHovered ? 1.1 : 1,
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
                rotate: isHovered ? 180 : 0,
              }}
              transition={{ duration: 0.7 }}
            />
            <Icon
              size={36}
              className="relative z-10"
              style={{
                color: isHovered ? BRAND_BLUE : BRAND_ORANGE,
                transition: "color 0.5s ease",
              }}
            />
          </motion.div>

          {/* Title */}
          <h3
            className="mb-4 text-2xl leading-tight font-bold transition-colors duration-500"
            style={{ color: isHovered ? "white" : BRAND_BLUE }}
          >
            {service.title}
          </h3>

          {/* Description */}
          <p
            className="mb-8 text-base leading-relaxed transition-colors duration-500"
            style={{ color: isHovered ? "rgba(255,255,255,0.92)" : "#555" }}
          >
            {service.description}
          </p>

          {/* Functions */}
          <div className="mt-auto">
            <div className="mb-4 flex items-center gap-2">
              <div
                className="h-0.5 w-8 transition-colors duration-500"
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
            className="mt-6 border-t pt-6 transition-all duration-500"
            style={{
              borderColor: isHovered ? "rgba(255,255,255,0.2)" : "transparent",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            <div
              className="flex cursor-pointer items-center gap-2 text-sm font-semibold"
              style={{ color: BRAND_ORANGE }}
            >
              Learn More
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function FAQItem({ faq, index }: { faq: { question: string; answer: string }; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-center justify-between py-6 text-left"
      >
        <span
          className={`text-lg font-bold transition-colors md:text-xl ${isOpen ? "text-[#F99D1C]" : "text-[#001A3D] group-hover:text-[#F99D1C]"}`}
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
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-base leading-relaxed text-gray-600 md:text-lg">{faq.answer}</p>
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
    offset: ["start start", "end start"],
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
        className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white"
      >
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1726138388546-30955e45aaec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Fintech Banking and Financial Services"
            className="h-full w-full scale-105 object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[1px] w-12 bg-[#F99D1C]"></span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#F99D1C] uppercase">
                Banking & Finance IT Services
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              Banking & Financial <br />
              <span className="text-[#F99D1C]">Services.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              In the fast-paced world of finance, staying ahead requires not only innovative ideas
              but also robust and secure IT solutions. We specialize in delivering advanced Fintech
              IT services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="mx-auto max-w-[1280px] px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-5xl"
          >
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <div
                  className="mb-6 inline-block rounded-full px-4 py-2"
                  style={{ backgroundColor: `${BRAND_ORANGE}15`, color: BRAND_ORANGE }}
                >
                  <span className="text-sm font-semibold tracking-wide">Why Choose Us</span>
                </div>
                <h2
                  className="display-font mb-6 text-4xl leading-tight font-semibold tracking-tight"
                  style={{ color: BRAND_BLUE }}
                >
                  Transforming Finance with Cutting-Edge IT Services
                </h2>
                <p className="mb-6 text-lg leading-relaxed" style={{ color: "#333" }}>
                  Hutech Solutions is a leading provider of banking and financial software
                  development services for clients across the globe. Our experienced in-house
                  developers have a strong track record of delivering powerful financial solutions
                  that automate and streamline financial operations.
                </p>
              </div>
              <div className="flex items-center">
                <div>
                  <p className="mb-6 text-lg leading-relaxed" style={{ color: "#333" }}>
                    By implementing effective FinTech solutions, organizations gain powerful tools
                    that automate workflows and improve business performance. We follow agile
                    development methodologies and use cutting-edge technologies to deliver
                    world-class fintech solutions tailored to each client's needs.
                  </p>
                  <p className="text-lg leading-relaxed" style={{ color: "#333" }}>
                    Our expert fintech developers create scalable, secure, and customized financial
                    software solutions that perfectly align with your business requirements.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-[1280px] px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h3
              className="display-font mb-4 text-3xl font-semibold tracking-tight"
              style={{ color: BRAND_BLUE }}
            >
              Our Banking & Financial Solutions Help Businesses Improve:
            </h3>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                  className="group relative overflow-hidden border border-gray-100 bg-white p-8 transition-all duration-500 hover:shadow-xl"
                >
                  {/* Hover gradient overlay */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(135deg, ${BRAND_BLUE}05 0%, ${BRAND_ORANGE}05 100%)`,
                    }}
                  />

                  <div className="relative z-10">
                    <div
                      className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg transition-all duration-500 group-hover:scale-110"
                      style={{ backgroundColor: `${BRAND_ORANGE}15` }}
                    >
                      <Icon size={28} style={{ color: BRAND_ORANGE }} />
                    </div>
                    <h3 className="mb-3 text-xl font-bold" style={{ color: BRAND_BLUE }}>
                      {benefit.title}
                    </h3>
                    <p className="leading-relaxed text-gray-600">{benefit.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services-section" className="relative overflow-hidden bg-white py-20">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 h-full w-1/3 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="service-pattern"
                x="0"
                y="0"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="50" cy="50" r="30" fill="none" stroke={BRAND_BLUE} strokeWidth="1" />
                <circle cx="50" cy="50" r="15" fill="none" stroke={BRAND_ORANGE} strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#service-pattern)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-6 inline-block"
            >
              <div
                className="inline-flex items-center gap-2 rounded-full px-5 py-2"
                style={{ backgroundColor: `${BRAND_BLUE}10` }}
              >
                <Rocket size={18} style={{ color: BRAND_ORANGE }} />
                <span className="text-sm font-semibold tracking-wide" style={{ color: BRAND_BLUE }}>
                  Our Expertise
                </span>
              </div>
            </motion.div>

            <h2
              className="display-font mx-auto mb-6 max-w-4xl text-5xl leading-tight font-semibold tracking-tight md:text-6xl"
              style={{ color: BRAND_BLUE }}
            >
              Our Key Fintech Services
            </h2>

            <motion.div
              className="mx-auto h-1.5 w-32 rounded-full"
              style={{ backgroundColor: BRAND_ORANGE }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-gray-600">
              Comprehensive fintech solutions designed to revolutionize financial services and drive
              digital transformation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative overflow-hidden py-20" style={{ backgroundColor: BRAND_BLUE }}>
        {/* Animated background circles */}
        <motion.div
          className="absolute top-1/4 -left-32 h-96 w-96 rounded-full opacity-10"
          style={{ backgroundColor: BRAND_ORANGE }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full opacity-10"
          style={{ backgroundColor: BRAND_ORANGE }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
          }}
          transition={{ duration: 18, repeat: Infinity }}
        />

        <div className="relative z-10 mx-auto max-w-[1280px] px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            <h2 className="mb-6 text-5xl font-bold md:text-6xl" style={{ color: "white" }}>
              Our Fintech App Development Process
            </h2>
            <div
              className="mx-auto h-1.5 w-32 rounded-full"
              style={{ backgroundColor: BRAND_ORANGE }}
            />
            <p
              className="mx-auto mt-8 max-w-3xl text-xl"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              Our development process follows industry best practices to deliver secure, scalable,
              and efficient fintech solutions.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative">
                  {/* Number circle */}
                  <motion.div
                    className="relative z-10 mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundColor: BRAND_BLUE,
                      borderColor: BRAND_ORANGE,
                    }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <span className="text-3xl font-bold" style={{ color: BRAND_ORANGE }}>
                      {step.number}
                    </span>
                  </motion.div>

                  <h3 className="mb-4 text-xl font-bold" style={{ color: "white" }}>
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
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="mx-auto max-w-[1280px] px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            <div
              className="mb-6 inline-block rounded-full px-5 py-2"
              style={{ backgroundColor: `${BRAND_ORANGE}15`, color: BRAND_ORANGE }}
            >
              <span className="text-sm font-bold tracking-wider">TECH STACK</span>
            </div>
            <h2 className="mb-6 text-5xl font-bold md:text-6xl" style={{ color: BRAND_BLUE }}>
              Technologies We Use
            </h2>
            <motion.div
              className="mx-auto h-1.5 w-32 rounded-full"
              style={{ backgroundColor: BRAND_ORANGE }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-gray-600">
              We leverage modern technologies and frameworks to build powerful fintech applications.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {TECHNOLOGIES.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border border-gray-100 bg-white p-8 transition-all duration-500 hover:shadow-xl"
              >
                <h3
                  className="mb-6 border-b pb-4 text-lg font-bold"
                  style={{
                    color: BRAND_BLUE,
                    borderColor: `${BRAND_ORANGE}30`,
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
                        className="h-2 w-2 rounded-full"
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
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1280px] px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            <div
              className="mb-6 inline-block rounded-full px-5 py-2"
              style={{ backgroundColor: `${BRAND_BLUE}10`, color: BRAND_BLUE }}
            >
              <span className="text-sm font-bold tracking-wider">WHY CHOOSE US</span>
            </div>
            <h2 className="mb-6 text-5xl font-bold md:text-6xl" style={{ color: BRAND_BLUE }}>
              Why Choose Hutech Solutions for Fintech Development?
            </h2>
            <motion.div
              className="mx-auto h-1.5 w-32 rounded-full"
              style={{ backgroundColor: BRAND_ORANGE }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                  className="group relative overflow-hidden border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-8 transition-all duration-500 hover:shadow-xl"
                >
                  {/* Hover accent line */}
                  <motion.div
                    className="absolute top-0 right-0 left-0 h-1"
                    style={{ backgroundColor: BRAND_ORANGE }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                  />

                  <div className="relative z-10">
                    <div
                      className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-110"
                      style={{ backgroundColor: `${BRAND_ORANGE}15` }}
                    >
                      <Icon size={32} style={{ color: BRAND_ORANGE }} />
                    </div>
                    <h3 className="mb-4 text-2xl font-bold" style={{ color: BRAND_BLUE }}>
                      {item.title}
                    </h3>
                    <p className="leading-relaxed font-bold text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-20" style={{ backgroundColor: BRAND_BLUE }}>
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
            backgroundSize: "200% 200%",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1280px] px-8 text-center">
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
              className="mb-8 inline-flex items-center gap-2 rounded-full border-2 px-6 py-3"
              style={{ borderColor: BRAND_ORANGE }}
            >
              <Sparkles size={20} style={{ color: BRAND_ORANGE }} />
              <span className="text-sm font-bold" style={{ color: BRAND_ORANGE }}>
                LET'S BUILD THE FUTURE OF FINANCE
              </span>
            </motion.div>

            <h2
              className="mx-auto mb-8 max-w-4xl text-5xl leading-tight font-bold md:text-6xl"
              style={{ color: "white" }}
            >
              Ready to Transform Your Financial Services?
            </h2>
            <p
              className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed font-bold md:text-2xl"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              Get a free consultation and discover how our fintech solutions can drive innovation,
              efficiency, and growth for your business.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <motion.div whileHover={{ scale: 1.08, y: -4 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-12 py-6 text-xl font-bold shadow-2xl transition-all duration-300 hover:shadow-orange-500/50"
                  style={{
                    backgroundColor: BRAND_ORANGE,
                    color: BRAND_BLUE,
                  }}
                >
                  Get a Free Consultation
                  <MoveRight size={26} />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-3 border-2 px-12 py-6 text-xl font-semibold transition-all duration-300"
                  style={{
                    borderColor: "rgba(255,255,255,0.3)",
                    color: "white",
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
