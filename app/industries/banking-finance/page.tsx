"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ShieldCheck,
  TrendingUp,
  BarChart3,
  MoveRight,
  CheckCircle2,
  Building2,
  Users,
  Database,
  Globe,
  Workflow,
  Monitor,
  Zap,
  Lock,
  MessageSquare,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Target,
  Smartphone,
  Cpu,
  Cloud,
  FileText,
  LayoutGrid,
  Link as LinkIcon,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { InlineContactForm } from "@/components/InlineContactForm";


const BFSI_SERVICES = [
  {
    icon: Building2,
    title: "Banking & Financial Services Consulting",
    description:
      "Whether you need support for core components, wealth management and treasury applications, ensuring rapid digital transformation with market leading solutions for private and commercial banks.",
  },
  {
    icon: Users,
    title: "Customer-Centric Banking",
    description:
      "Focus on customer engagement strategies that build long-term relationships through reimagining digital banking services, with a user-centric approach that provides a seamless experience for customers across all digital touchpoints.",
  },
  {
    icon: Database,
    title: "Data & Intelligence",
    description:
      "Transform your data into actionable insights with our services in BFSI. Strategic integration, automation and analytics technology, transforming enterprise data into business intelligence, helping banks and financial institutions make data-driven decisions.",
  },
  {
    icon: Globe,
    title: "Stable Banking Transformation",
    description:
      "Transform your organization with our end-to-end digital transformation solutions that will optimize your business wealth and value through the adoption of modern, secure, and resilient digital architectures.",
  },
  {
    icon: Workflow,
    title: "Digital Transformation Consulting",
    description:
      "Unlock digital transformation by leveraging advanced technologies – we help software vendors and financial organizations implement agile development processes, build cloud-native platforms, and drive innovation with confidence.",
  },
  {
    icon: Monitor,
    title: "IT & Digital Solutions",
    description:
      "Implement modern, standardized multi-channel strategies to modernize and deliver digitized enterprise services across all platforms, and ensure high operational performance and scalability as your business expands.",
  },
];

const ESSENTIAL_SOLUTIONS = [
  {
    icon: ShieldCheck,
    title: "Regulatory Compliance",
    description:
      "Custom software built with regulatory standards to ensure that your platform complies with the latest financial laws and regulations, reducing the risk of non-compliance.",
  },
  {
    icon: Lock,
    title: "Enhanced Security",
    description:
      "Banking solutions protect sensitive customer data and prevent cyber-attacks, ensuring trust in your financial services and securing digital assets.",
  },
  {
    icon: Zap,
    title: "Operational Efficiency",
    description:
      "Custom solutions streamline your business processes and daily operations, improving performance across all departments and reducing manual efforts.",
  },
  {
    icon: TrendingUp,
    title: "Scalability",
    description:
      "As your business grows, a custom platform can easily scale with it, enabling you to add new features and handle larger volumes of data and transactions.",
  },
  {
    icon: LayoutGrid,
    title: "Business-Specific Features",
    description:
      "Custom solutions ensure you have the exact functionality your business needs, providing a better user experience for both employees and customers.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Insights",
    description:
      "Advanced analytics tools help you gain valuable insights into customer behavior and market trends, allowing for better strategic and informed decisions.",
  },
];

const INNOVATIONS = [
  {
    icon: Cpu,
    title: "AI and Machine Learning",
    description:
      "Improve customer experiences, detect fraud, and provide personalized services with cutting-edge AI and machine learning algorithms built for the financial sector.",
  },
  {
    icon: Smartphone,
    title: "Digital Banking Platforms",
    description:
      "Modernize your banking services with end-to-end digital platforms that are secure, scalable, and built for modern digital-native customers.",
  },
  {
    icon: Workflow,
    title: "Robotic Process Automation (RPA)",
    description:
      "Automate repetitive tasks and back-office operations to improve accuracy, reduce operational costs, and free up your workforce for higher-value activities.",
  },
  {
    icon: LinkIcon,
    title: "Blockchain Technology",
    description:
      "Ensure transparency and improve security across your transactions with distributed ledger technology designed to build trust and eliminate friction.",
  },
  {
    icon: Cloud,
    title: "Cloud Computing",
    description:
      "Scale your infrastructure on-demand with secure and resilient cloud solutions designed for the high-security requirements of the financial industry.",
  },
  {
    icon: BarChart3,
    title: "Big Data and Cloud Analytics",
    description:
      "Gain deeper insights from your large datasets with advanced cloud-native analytics that help you understand market dynamics and customer needs better.",
  },
];

const WHY_CHOOSE = [
  {
    title: "Industry Expertise",
    description:
      "We have deep insight into the BFSI sector, working on several complex projects that meet the unique needs of banking and financial services.",
  },
  {
    title: "Custom Development",
    description:
      "We work with you to create custom solutions that meet your specific needs, whether you are a startup or a global financial institution.",
  },
  {
    title: "End-to-End Support",
    description:
      "From initial discovery and strategy through to deployment and ongoing support, we handle the entire development lifecycle of your BFSI project.",
  },
  {
    title: "Technological Innovation",
    description:
      "We use the latest technology stacks – including AI, Cloud and Blockchain – to create solutions that are built for the future.",
  },
];

const FAQS = [
  {
    question: "What types of businesses can benefit from Hutech Solutions BFSI services?",
    answer:
      "Hutech Solutions BFSI services cater to various businesses, including private and commercial banks, credit unions, investment firms, insurance companies, and fintech startups. Our solutions are designed to handle the unique challenges and requirements of each sector.",
  },
  {
    question: "How does Hutech Solutions ensure compliance with BFSI financial regulations?",
    answer:
      "Compliance is built into our core development process. We integrate regulatory standards (like GDPR, PCI DSS, etc.) from the architectural phase to ensure that your platform meets all local and international financial laws.",
  },
  {
    question: "Can Hutech Solutions help with digital banking transformation?",
    answer:
      "Yes, we specialize in end-to-end digital transformation for traditional banks, helping them migrate legacy systems to modern, cloud-native digital banking platforms.",
  },
  {
    question: "What are the advantages of using AI and machine learning in BFSI services?",
    answer:
      "AI and ML help in fraud detection, predictive analytics for customer behavior, personalized financial advice, and automated credit scoring, significantly improving efficiency and customer experience.",
  },
  {
    question: "What ongoing support does Hutech Solutions offer after implementing BFSI solutions?",
    answer:
      "We provide comprehensive post-deployment support, including performance monitoring, security updates, feature enhancements, and 24/7 technical assistance to ensure continuous uptime.",
  },
];

const BLOG_POSTS = [
  {
    title:
      "Financials 2026: Celebrating 25 Years of core banking transformation with Hutech Solutions' Fintech excellence",
    description:
      "Celebrating 25 years of innovation & domain-driven excellence in the financial services sector...",
    image:
      "https://images.unsplash.com/photo-1768270181430-3e3672a32283?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    title: "Celebrating 5 Years of Innovation and Investment at Hutech Solutions",
    description:
      "An incredible journey of digital transformation and excellence as we look back on 5 years of progress...",
    image:
      "https://images.unsplash.com/photo-1715059120691-d6b06c275d74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    title: "Fintech Solutions Spearheads the Future of AI at BFSI-2026",
    description:
      "Exploring the latest AI trends in the financial sector at the upcoming BFSI 2026 conference...",
    image:
      "https://images.unsplash.com/photo-1761039232971-bb55a290762c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
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

export default function BankingFinance() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="Banking & Financial Services | Hutech Solutions"
        description="Empowering Banking & Financial Services with Smart, Scalable, AI-Driven Solutions. Specialized in core banking, fintech, and digital transformation."
      />

      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1597088794600-3a8fd990dd7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Banking Digital Revolution"
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
                Industry Excellence
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              Your Vision. Our Code. <br />
              <span className="text-[#F99D1C]">One Digital Banking Revolution.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              We craft next-step digital banking experiences through cutting-edge software solutions
              and expert consulting for both private and commercial banks from the ground up.
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
                  Empowering Banking & Financial Services with Smart, Scalable, AI-Driven Solutions
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
              </div>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  Hutech Solutions, we bring deep expertise in implementing, supporting, and
                  managing banking platforms and top software providers. Our end-to-end solutions
                  include system implementation, custom upgrades, performance optimization, and
                  third-party integrations.
                </p>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  We ensure our clients can operate with agility, security and compliance, enabling
                  them to expand operations and integrate fresh digital solutions and stay resilient
                  to meet specific business and regulatory needs.
                </p>
              </div>
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">25+</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Years Experience
                  </p>
                </div>
                <div className="hidden h-12 w-[1px] bg-gray-200 md:block"></div>
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">150+</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Projects Delivered
                  </p>
                </div>
                <div className="hidden h-12 w-[1px] bg-gray-200 md:block"></div>
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">100%</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Compliance Rate
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-sm shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Financial Professional"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 hidden max-w-xs space-y-4 bg-[#0171c1] p-10 text-white shadow-2xl md:block">
                <Target size={32} strokeWidth={1.5} />
                <h3 className="display-font text-xl font-bold">Strategic Vision</h3>
                <p className="text-sm leading-relaxed font-medium opacity-80">
                  Helping financial institutions streamline repetitive tasks, enhance customer
                  experience, and reduce operational costs.
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
              Our Services in the BFSI Industry
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              At Hutech Solutions, we specialize in delivering cutting-edge software technology
              solutions tailored for the Banking and Financial Services industry.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {BFSI_SERVICES.map((service, i) => {
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

      {/* Essential Solutions Section (Dark) */}
      <section className="overflow-hidden bg-[#001A3D] py-24 text-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font mx-auto max-w-4xl text-3xl leading-tight font-semibold md:text-5xl">
              What Makes Custom BFSI Solutions Essential for Your Business?
            </h2>
            <div className="mx-auto h-1 w-20 bg-[#0171c1]"></div>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-400">
              In the modern financial landscape, custom software solutions are key to staying
              competitive and expanding.
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
              Which Innovations Can Transform Your BFSI Services?
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-500">
              Incorporating advanced technologies can significantly enhance your BFSI offerings for
              the modern financial industry.
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

      {/* CTA Section / Strategy */}
      <section className="overflow-hidden bg-[#F2F2F2] py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex flex-col items-center gap-20 lg:flex-row">
            <div className="flex-1 space-y-10">
              <div className="space-y-6">
                <h2 className="display-font text-3xl leading-[1.2] font-semibold text-[#001A3D] md:text-5xl">
                  Discover Your Banking and Financial Solutions Development Strategy With Us
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  Schedule a consultation with our expert Banking & Finance software team and take
                  the first step towards transforming your business.
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
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Financial Analytics"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -top-10 -right-10 -z-10 h-64 w-64 rounded-full bg-[#0171c1]/5 blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 -z-10 h-48 w-48 rounded-full bg-[#F99D1C]/10 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
              Why Choose Hutech Solutions for Your BFSI Project?
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              At Hutech Solutions, we specialize in delivering BFSI solutions tailored to your
              business needs. Here is why you should partner with us:
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
                Share Your Project With Us
              </h2>
              <InlineContactForm
                category="Banking & Finance"
                textareaPlaceholder="Message"
              />
            </div>
            <div className="space-y-12 py-8 lg:col-span-5">
              <h2 className="display-font text-3xl font-bold text-[#001A3D]">
                What Is The Next Step?
              </h2>
              <div className="space-y-10">
                {[
                  {
                    icon: MessageSquare,
                    text: "You will receive a response from our team within a few business hours.",
                  },
                  {
                    icon: FileText,
                    text: "An initial project consultation will be scheduled for us.",
                  },
                  {
                    icon: Sparkles,
                    text: "The complexity of the project is given wider view to give the accurate analysis and strategies.",
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

      {/* FAQ Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl font-semibold tracking-tight text-[#001A3D] md:text-5xl">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto h-1 w-20 bg-[#0171c1]"></div>
          </div>
          <div className="mx-auto max-w-4xl divide-y divide-gray-100">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Resource Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-16 flex items-end justify-between gap-8">
            <div className="max-w-2xl space-y-6">
              <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
                More Articles From Our Resource Library
              </h2>
              <p className="text-lg font-medium text-gray-500">
                Stay updated with the latest trends and insights in the financial technology space.
              </p>
            </div>
            <Link
              href="/resources"
              className="hidden items-center gap-2 pb-2 text-[11px] font-bold tracking-widest text-[#0171c1] uppercase transition-all hover:gap-4 md:flex"
            >
              View All Resources <MoveRight size={16} />
            </Link>
          </div>

          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {BLOG_POSTS.map((post, i) => (
              <div
                key={i}
                className="group overflow-hidden rounded-sm bg-white shadow-sm transition-all duration-500 hover:shadow-2xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="rounded-sm bg-[#0171c1] px-3 py-1 text-[9px] font-bold tracking-widest text-white uppercase">
                      Fintech
                    </span>
                  </div>
                </div>
                <div className="space-y-4 p-8">
                  <h3 className="display-font line-clamp-2 min-h-[3.5rem] text-xl leading-tight font-bold text-[#001A3D] transition-colors group-hover:text-[#0171c1]">
                    {post.title}
                  </h3>
                  <p className="line-clamp-3 text-sm leading-relaxed font-medium text-gray-500">
                    {post.description}
                  </p>
                  <div className="border-t border-gray-50 pt-4">
                    <Link
                      href="/resources"
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
              href="/resources"
              className="inline-flex items-center gap-3 rounded-sm bg-[#0171c1] px-10 py-5 text-[11px] font-bold tracking-wider text-white uppercase shadow-xl"
            >
              Explore Resources <MoveRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
