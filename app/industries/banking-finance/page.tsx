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
  Link as LinkIcon
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

const BFSI_SERVICES = [
  {
    icon: Building2,
    title: "Banking & Financial Services Consulting",
    description: "Whether you need support for core components, wealth management and treasury applications, ensuring rapid digital transformation with market leading solutions for private and commercial banks."
  },
  {
    icon: Users,
    title: "Customer-Centric Banking",
    description: "Focus on customer engagement strategies that build long-term relationships through reimagining digital banking services, with a user-centric approach that provides a seamless experience for customers across all digital touchpoints."
  },
  {
    icon: Database,
    title: "Data & Intelligence",
    description: "Transform your data into actionable insights with our services in BFSI. Strategic integration, automation and analytics technology, transforming enterprise data into business intelligence, helping banks and financial institutions make data-driven decisions."
  },
  {
    icon: Globe,
    title: "Stable Banking Transformation",
    description: "Transform your organization with our end-to-end digital transformation solutions that will optimize your business wealth and value through the adoption of modern, secure, and resilient digital architectures."
  },
  {
    icon: Workflow,
    title: "Digital Transformation Consulting",
    description: "Unlock digital transformation by leveraging advanced technologies – we help software vendors and financial organizations implement agile development processes, build cloud-native platforms, and drive innovation with confidence."
  },
  {
    icon: Monitor,
    title: "IT & Digital Solutions",
    description: "Implement modern, standardized multi-channel strategies to modernize and deliver digitized enterprise services across all platforms, and ensure high operational performance and scalability as your business expands."
  }
];

const ESSENTIAL_SOLUTIONS = [
  {
    icon: ShieldCheck,
    title: "Regulatory Compliance",
    description: "Custom software built with regulatory standards to ensure that your platform complies with the latest financial laws and regulations, reducing the risk of non-compliance."
  },
  {
    icon: Lock,
    title: "Enhanced Security",
    description: "Banking solutions protect sensitive customer data and prevent cyber-attacks, ensuring trust in your financial services and securing digital assets."
  },
  {
    icon: Zap,
    title: "Operational Efficiency",
    description: "Custom solutions streamline your business processes and daily operations, improving performance across all departments and reducing manual efforts."
  },
  {
    icon: TrendingUp,
    title: "Scalability",
    description: "As your business grows, a custom platform can easily scale with it, enabling you to add new features and handle larger volumes of data and transactions."
  },
  {
    icon: LayoutGrid,
    title: "Business-Specific Features",
    description: "Custom solutions ensure you have the exact functionality your business needs, providing a better user experience for both employees and customers."
  },
  {
    icon: BarChart3,
    title: "Data-Driven Insights",
    description: "Advanced analytics tools help you gain valuable insights into customer behavior and market trends, allowing for better strategic and informed decisions."
  }
];

const INNOVATIONS = [
  {
    icon: Cpu,
    title: "AI and Machine Learning",
    description: "Improve customer experiences, detect fraud, and provide personalized services with cutting-edge AI and machine learning algorithms built for the financial sector."
  },
  {
    icon: Smartphone,
    title: "Digital Banking Platforms",
    description: "Modernize your banking services with end-to-end digital platforms that are secure, scalable, and built for modern digital-native customers."
  },
  {
    icon: Workflow,
    title: "Robotic Process Automation (RPA)",
    description: "Automate repetitive tasks and back-office operations to improve accuracy, reduce operational costs, and free up your workforce for higher-value activities."
  },
  {
    icon: LinkIcon,
    title: "Blockchain Technology",
    description: "Ensure transparency and improve security across your transactions with distributed ledger technology designed to build trust and eliminate friction."
  },
  {
    icon: Cloud,
    title: "Cloud Computing",
    description: "Scale your infrastructure on-demand with secure and resilient cloud solutions designed for the high-security requirements of the financial industry."
  },
  {
    icon: BarChart3,
    title: "Big Data and Cloud Analytics",
    description: "Gain deeper insights from your large datasets with advanced cloud-native analytics that help you understand market dynamics and customer needs better."
  }
];

const WHY_CHOOSE = [
  {
    title: "Industry Expertise",
    description: "We have deep insight into the BFSI sector, working on several complex projects that meet the unique needs of banking and financial services."
  },
  {
    title: "Custom Development",
    description: "We work with you to create custom solutions that meet your specific needs, whether you are a startup or a global financial institution."
  },
  {
    title: "End-to-End Support",
    description: "From initial discovery and strategy through to deployment and ongoing support, we handle the entire development lifecycle of your BFSI project."
  },
  {
    title: "Technological Innovation",
    description: "We use the latest technology stacks – including AI, Cloud and Blockchain – to create solutions that are built for the future."
  }
];

const FAQS = [
  {
    question: "What types of businesses can benefit from Hutech Solutions BFSI services?",
    answer: "Hutech Solutions BFSI services cater to various businesses, including private and commercial banks, credit unions, investment firms, insurance companies, and fintech startups. Our solutions are designed to handle the unique challenges and requirements of each sector."
  },
  {
    question: "How does Hutech Solutions ensure compliance with BFSI financial regulations?",
    answer: "Compliance is built into our core development process. We integrate regulatory standards (like GDPR, PCI DSS, etc.) from the architectural phase to ensure that your platform meets all local and international financial laws."
  },
  {
    question: "Can Hutech Solutions help with digital banking transformation?",
    answer: "Yes, we specialize in end-to-end digital transformation for traditional banks, helping them migrate legacy systems to modern, cloud-native digital banking platforms."
  },
  {
    question: "What are the advantages of using AI and machine learning in BFSI services?",
    answer: "AI and ML help in fraud detection, predictive analytics for customer behavior, personalized financial advice, and automated credit scoring, significantly improving efficiency and customer experience."
  },
  {
    question: "What ongoing support does Hutech Solutions offer after implementing BFSI solutions?",
    answer: "We provide comprehensive post-deployment support, including performance monitoring, security updates, feature enhancements, and 24/7 technical assistance to ensure continuous uptime."
  }
];

const BLOG_POSTS = [
  {
    title: "Financials 2026: Celebrating 25 Years of core banking transformation with Hutech Solutions' Fintech excellence",
    description: "Celebrating 25 years of innovation & domain-driven excellence in the financial services sector...",
    image: "https://images.unsplash.com/photo-1768270181430-3e3672a32283?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    title: "Celebrating 5 Years of Innovation and Investment at Hutech Solutions",
    description: "An incredible journey of digital transformation and excellence as we look back on 5 years of progress...",
    image: "https://images.unsplash.com/photo-1715059120691-d6b06c275d74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    title: "Fintech Solutions Spearheads the Future of AI at BFSI-2026",
    description: "Exploring the latest AI trends in the financial sector at the upcoming BFSI 2026 conference...",
    image: "https://images.unsplash.com/photo-1761039232971-bb55a290762c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
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

export default function BankingFinance() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta 
        title="Banking & Financial Services | Hutech Solutions"
        description="Empowering Banking & Financial Services with Smart, Scalable, AI-Driven Solutions. Specialized in core banking, fintech, and digital transformation."
      />
      
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="bg-[#001A3D] text-white h-[450px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1597088794600-3a8fd990dd7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Banking Digital Revolution"
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
              <span className="text-[#FFAF2B] font-bold uppercase tracking-[0.3em] text-[10px]">Industry Excellence</span>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight display-font mb-8">
              Your Vision. Our Code. <br />
              <span className="text-[#FFAF2B]">One Digital Banking Revolution.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed">
              We craft next-step digital banking experiences through cutting-edge software solutions and expert consulting for both private and commercial banks from the ground up.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font leading-tight">
                  Empowering Banking & Financial Services with Smart, Scalable, AI-Driven Solutions
                </h2>
                <div className="w-20 h-1 bg-[#0171c1]"></div>
              </div>
              <div className="space-y-6">
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  Hutech Solutions, we bring deep expertise in implementing, supporting, and managing banking platforms and top software providers. Our end-to-end solutions include system implementation, custom upgrades, performance optimization, and third-party integrations.
                </p>
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  We ensure our clients can operate with agility, security and compliance, enabling them to expand operations and integrate fresh digital solutions and stay resilient to meet specific business and regulatory needs.
                </p>
              </div>
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-[#001A3D] display-font">25+</p>
                  <p className="text-[10px] font-bold text-[#0171c1] uppercase tracking-widest">Years Experience</p>
                </div>
                <div className="w-[1px] h-12 bg-gray-200 hidden md:block"></div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-[#001A3D] display-font">150+</p>
                  <p className="text-[10px] font-bold text-[#0171c1] uppercase tracking-widest">Projects Delivered</p>
                </div>
                <div className="w-[1px] h-12 bg-gray-200 hidden md:block"></div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-[#001A3D] display-font">100%</p>
                  <p className="text-[10px] font-bold text-[#0171c1] uppercase tracking-widest">Compliance Rate</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-sm overflow-hidden shadow-2xl">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                  alt="Financial Professional" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-[#0171c1] p-10 text-white space-y-4 max-w-xs shadow-2xl hidden md:block">
                <Target size={32} strokeWidth={1.5} />
                <h3 className="text-xl font-bold display-font">Strategic Vision</h3>
                <p className="text-sm font-medium opacity-80 leading-relaxed">
                  Helping financial institutions streamline repetitive tasks, enhance customer experience, and reduce operational costs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Our Services in the BFSI Industry</h2>
            <p className="text-lg text-gray-500 max-w-4xl mx-auto font-medium leading-relaxed">
              At Hutech Solutions, we specialize in delivering cutting-edge software technology solutions tailored for the Banking and Financial Services industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BFSI_SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-12 shadow-sm border border-gray-100 flex flex-col space-y-6 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Icon size={80} strokeWidth={1} />
                  </div>
                  <div className="w-16 h-16 rounded-sm bg-gray-50 flex items-center justify-center text-[#0171c1] group-hover:bg-[#0171c1] group-hover:text-white transition-all duration-500">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-[#001A3D] display-font leading-tight">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">{service.description}</p>
                  <div className="pt-4 mt-auto">
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

      {/* Essential Solutions Section (Dark) */}
      <section className="py-24 bg-[#001A3D] text-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold display-font leading-tight max-w-4xl mx-auto">
              What Makes Custom BFSI Solutions Essential for Your Business?
            </h2>
            <div className="w-20 h-1 bg-[#0171c1] mx-auto"></div>
            <p className="text-gray-400 max-w-3xl mx-auto font-medium text-lg leading-relaxed">
              In the modern financial landscape, custom software solutions are key to staying competitive and expanding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10">
            {ESSENTIAL_SOLUTIONS.map((item, i) => {
              const Icon = item.icon;
              return (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-6 p-8 border border-white/5 hover:bg-white/5 transition-colors rounded-sm group"
                >
                  <div className="w-14 h-14 bg-white/10 rounded-sm flex items-center justify-center text-[#0171c1] group-hover:scale-110 transition-transform">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold display-font tracking-tight">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed font-medium">{item.description}</p>
                  </div>
                </Motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Innovations Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Which Innovations Can Transform Your BFSI Services?</h2>
            <p className="text-lg text-gray-500 font-medium max-w-3xl mx-auto leading-relaxed">
              Incorporating advanced technologies can significantly enhance your BFSI offerings for the modern financial industry.
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

      {/* CTA Section / Strategy */}
      <section className="py-24 bg-[#F2F2F2] overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 space-y-10">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font leading-[1.2]">
                  Discover Your Banking and Financial Solutions Development Strategy With Us
                </h2>
                <div className="w-20 h-1 bg-[#0171c1]"></div>
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  Schedule a consultation with our expert Banking & Finance software team and take the first step towards transforming your business.
                </p>
              </div>
              <div>
                <Link href="/contact" className="inline-flex items-center gap-3 bg-[#FFAF2B] text-[#001A3D] px-10 py-5 font-bold uppercase tracking-wider text-[11px] hover:bg-[#001A3D] hover:text-white transition-all duration-500 shadow-xl rounded-sm">
                  Consult Us Now <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="aspect-video bg-white p-2 rounded-sm shadow-2xl relative z-10">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                  alt="Financial Analytics" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#0171c1]/5 blur-3xl rounded-full -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#FFAF2B]/10 blur-2xl rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Why Choose Hutech Solutions for Your BFSI Project?</h2>
            <p className="text-lg text-gray-500 font-medium max-w-4xl mx-auto leading-relaxed">
              At Hutech Solutions, we specialize in delivering BFSI solutions tailored to your business needs. Here is why you should partner with us:
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
                  <Zap size={24} strokeWidth={1.5} />
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
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-7 bg-white p-10 md:p-14 shadow-2xl border border-gray-100 rounded-sm">
              <h2 className="text-3xl font-bold text-[#001A3D] display-font mb-10">Share Your Project With Us</h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Name*" className="w-full p-4 border border-gray-200 outline-none focus:border-[#0171c1] transition-all font-medium text-sm" />
                <input type="email" placeholder="Email*" className="w-full p-4 border border-gray-200 outline-none focus:border-[#0171c1] transition-all font-medium text-sm" />
                <input type="tel" placeholder="Phone Number*" className="w-full p-4 border border-gray-200 outline-none focus:border-[#0171c1] transition-all font-medium text-sm md:col-span-2" />
                <textarea placeholder="Message" rows={4} className="w-full p-4 border border-gray-200 outline-none focus:border-[#0171c1] transition-all font-medium text-sm md:col-span-2 resize-none"></textarea>
                <div className="md:col-span-2">
                  <button className="bg-[#FFAF2B] text-[#001A3D] px-12 py-5 font-bold uppercase tracking-wider text-[11px] hover:bg-[#001A3D] hover:text-white transition-all duration-500 shadow-xl rounded-sm w-full md:w-auto">
                    Submit Project Request
                  </button>
                </div>
              </form>
            </div>
            <div className="lg:col-span-5 space-y-12 py-8">
              <h2 className="text-3xl font-bold text-[#001A3D] display-font">What Is The Next Step?</h2>
              <div className="space-y-10">
                {[
                  { icon: MessageSquare, text: "You will receive a response from our team within a few business hours." },
                  { icon: FileText, text: "An initial project consultation will be scheduled for us." },
                  { icon: Sparkles, text: "The complexity of the project is given wider view to give the accurate analysis and strategies." }
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
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font tracking-tight">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-[#0171c1] mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto divide-y divide-gray-100">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Resource Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="flex justify-between items-end mb-16 gap-8">
            <div className="space-y-6 max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">More Articles From Our Resource Library</h2>
              <p className="text-lg text-gray-500 font-medium">
                Stay updated with the latest trends and insights in the financial technology space.
              </p>
            </div>
            <Link href="/resources" className="hidden md:flex items-center gap-2 text-[11px] font-bold text-[#0171c1] uppercase tracking-widest hover:gap-4 transition-all pb-2">
              View All Resources <MoveRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {BLOG_POSTS.map((post, i) => (
              <div key={i} className="bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <ImageWithFallback 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#0171c1] text-white text-[9px] font-bold px-3 py-1 uppercase tracking-widest rounded-sm">Fintech</span>
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="text-xl font-bold text-[#001A3D] display-font group-hover:text-[#0171c1] transition-colors line-clamp-2 leading-tight min-h-[3.5rem]">{post.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 font-medium">{post.description}</p>
                  <div className="pt-4 border-t border-gray-50">
                    <Link href="/resources" className="inline-flex items-center gap-2 text-[10px] font-bold text-[#001A3D] uppercase tracking-widest hover:text-[#0171c1] transition-colors">
                      Read Article <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center md:hidden">
            <Link href="/resources" className="inline-flex items-center gap-3 bg-[#0171c1] text-white px-10 py-5 font-bold uppercase tracking-wider text-[11px] shadow-xl rounded-sm">
              Explore Resources <MoveRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
