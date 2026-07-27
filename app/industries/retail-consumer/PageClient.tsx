"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, ShoppingBag, Users, Zap, TrendingUp, BarChart, Workflow, Smartphone, Cloud, Lock, MessageSquare, FileText, Sparkles, MoveRight, ArrowRight, ChevronRight, Target, LayoutGrid, Search, Building2, BarChart3, Globe, Store, CreditCard, Truck, Heart, SmartphoneNfc, Laptop
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";
import { InlineContactForm } from "@/components/InlineContactForm";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

const RETAIL_SERVICES = [
  {
    icon: ShoppingBag,
    title: "Omnichannel Commerce Platforms",
    description: "Create a seamless shopping experience across physical stores, web, and mobile. We build unified commerce solutions that synchronize inventory, pricing, and customer data in real-time."
  },
  {
    icon: Users,
    title: "AI-Powered Personalization",
    description: "Deliver hyper-relevant experiences to every customer. Our AI engines analyze behavior to provide personalized product recommendations, dynamic pricing, and targeted marketing campaigns."
  },
  {
    icon: Laptop,
    title: "Next-Gen E-commerce Development",
    description: "Build fast, scalable, and high-converting online stores. We specialize in headless commerce architectures that provide complete creative freedom and superior performance."
  },
  {
    icon: Store,
    title: "Smart In-Store Technology",
    description: "Modernize your brick-and-mortar locations with interactive displays, smart mirrors, and cashierless checkout systems that blend digital convenience with physical experience."
  },
  {
    icon: CreditCard,
    title: "Secure Payment Solutions",
    description: "Simplify and secure every transaction. We integrate multi-channel payment gateways, mobile wallets, and buy-now-pay-later (BNPL) options to provide maximum flexibility for your customers."
  },
  {
    icon: Workflow,
    title: "Retail Process Automation",
    description: "Streamline back-office and front-of-house operations. From automated inventory replenishment to AI-driven customer support, we reduce overhead and improve response times."
  }
];

const ESSENTIAL_SOLUTIONS = [
  {
    icon: BarChart3,
    title: "Inventory & Stock Optimization",
    description: "Eliminate stockouts and overstocking. Our intelligent inventory management systems use predictive analytics to maintain optimal stock levels across all your distribution points."
  },
  {
    icon: Heart,
    title: "Customer Loyalty & CRM",
    description: "Build lasting relationships. We develop sophisticated loyalty programs and CRM platforms that track customer lifecycles and reward engagement across every touchpoint."
  },
  {
    icon: BarChart,
    title: "Retail Data Analytics",
    description: "Turn shopper data into actionable insights. Our dashboards provide deep visibility into sales trends, customer demographics, and marketing ROI to guide your strategy."
  },
  {
    icon: ShieldCheck,
    title: "Data Privacy & Compliance",
    description: "Protect customer data and ensure global compliance with GDPR, CCPA, and PCI DSS. We build security into the heart of your retail technology stack."
  },
  {
    icon: SmartphoneNfc,
    title: "Mobile-First Retail Apps",
    description: "Engage customers on the move. We build feature-rich mobile apps with AR product visualization, mobile-only offers, and seamless in-store navigation."
  },
  {
    icon: Truck,
    title: "Fulfillment & Last-Mile Visibility",
    description: "Perfect the final leg of the customer journey. We build delivery tracking systems that provide real-time updates to customers and optimize logistics for efficiency."
  }
];

const INNOVATIONS = [
  {
    icon: Sparkles,
    title: "AR Virtual Try-Ons",
    description: "Reduce return rates and increase confidence. Augmented Reality allows customers to virtually try on clothing, accessories, or see furniture in their own space before buying."
  },
  {
    icon: Zap,
    title: "Predictive Demand Forecasting",
    description: "Stay ahead of the trends. AI models analyze social signals, weather, and historical data to predict what customers will want before they even know it themselves."
  },
  {
    icon: Globe,
    title: "Blockchain for Sustainability",
    description: "Prove your product's provenance. Blockchain technology provides an immutable record of ethical sourcing and sustainable manufacturing that builds trust with conscious consumers."
  },
  {
    icon: Cloud,
    title: "Serverless Commerce Edge",
    description: "Ensure zero latency and infinite scalability during peak sales events like Black Friday with resilient, globally distributed cloud architectures."
  },
  {
    icon: Lock,
    title: "Fraud Prevention Systems",
    description: "Protect your bottom line. We implement AI-driven fraud detection that identifies suspicious transaction patterns in real-time without slowing down legitimate shoppers."
  },
  {
    icon: MessageSquare,
    title: "Conversational AI Shopping",
    description: "Building intelligent shopping assistants and chatbots that provide personalized advice, answer queries, and complete transactions through natural language."
  }
];

const WHY_CHOOSE = [
  {
    title: "Customer-First Philosophy",
    description: "We design technology from the perspective of the end-consumer, ensuring every digital touchpoint is intuitive, engaging, and builds brand loyalty."
  },
  {
    title: "High-Volume Scalability",
    description: "Our platforms are built to handle the extreme traffic spikes of the retail calendar, ensuring your storefront remains fast and available when it matters most."
  },
  {
    title: "Seamless Ecosystem Integration",
    description: "We specialize in connecting your commerce platforms with ERPs, CRMs, and 3PL providers for a perfectly synchronized operational flow."
  },
  {
    title: "Rapid Time-to-Market",
    description: "In the fast-moving world of retail, speed is everything. We use agile methodologies and pre-built modules to launch your digital solutions faster."
  }
];

const FAQS = [
  {
    question: "How do you handle high traffic during peak sales events?",
    answer: "We use cloud-native, auto-scaling architectures and advanced content delivery networks (CDNs) to ensure your platform can handle millions of simultaneous users without performance degradation."
  },
  {
    question: "Can you integrate our physical stores with our online shop?",
    answer: "Absolutely. We specialize in omnichannel integration, allowing for 'Buy Online, Pick Up In-Store' (BOPIS), cross-channel returns, and unified customer profiles."
  },
  {
    question: "How does AI help in reducing product returns?",
    answer: "AI can help through accurate sizing recommendations, AR virtual try-ons, and hyper-personalized product matching, ensuring customers get exactly what they expect the first time."
  },
  {
    question: "Do your retail solutions comply with data privacy laws?",
    answer: "Yes, we prioritize security and privacy, building platforms that are fully compliant with global regulations like GDPR and CCPA to protect your brand and your customers."
  },
  {
    question: "What is the typical ROI for a digital retail transformation?",
    answer: "While it varies, our clients typically see significant ROI through increased conversion rates, improved customer retention, and reduced operational overhead within the first 6-12 months."
  }
];

const BLOG_POSTS = [
  {
    title: "The Death of One-Size-Fits-All: The Era of Hyper-Personalized Retail",
    description: "Discover how AI is moving beyond simple recommendations to creating unique shopping journeys for every individual consumer...",
    image: "https://images.unsplash.com/photo-1764795849878-59b546cfe9c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    title: "Sustainability as a Competitive Advantage in Consumer Goods",
    description: "Learn how transparency and ethical supply chain technology are becoming the primary drivers of brand loyalty for Gen Z and Millennials...",
    image: "https://images.unsplash.com/photo-1769981653696-5ce5a59263bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    title: "Omnichannel 2.0: Blending the Physical and Digital Worlds",
    description: "Explore the new technologies that are making the boundary between online shopping and in-store experience completely invisible...",
    image: "https://images.unsplash.com/photo-1640831203488-f87fda5b782d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
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

export default function RetailConsumer() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta 
        title="Retail & Consumer Goods Tech Solutions | Hutech Solutions"
        description="Empowering Retail with Smart, Scalable, AI-Driven Solutions. Specialized in omnichannel commerce, personalization, and supply chain agility."
      />
      
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="bg-[#001A3D] text-white h-[450px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1764795849878-59b546cfe9c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Modern Retail Technology"
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
              <span className="text-[#FFAF2B] font-bold uppercase tracking-[0.3em] text-[10px]">Retail Excellence</span>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight display-font mb-8">
              Your Retail Vision. Our Code. <br />
              <span className="text-[#FFAF2B]">One Digital Commerce Revolution.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed">
              We craft intelligent retail experiences through cutting-edge software solutions and expert consulting for global consumer brands.
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
                  Empowering Retail & Consumer Goods with Smart, Scalable, AI-Driven Solutions
                </h2>
                <div className="w-20 h-1 bg-[#0171c1]"></div>
              </div>
              <div className="space-y-6">
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  At Hutech Solutions, we bring deep expertise in implementing, supporting, and managing integrated commerce platforms. Our end-to-end solutions include system implementation, custom upgrades, performance optimization, and seamless integration with your entire operational stack.
                </p>
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  We ensure our clients can operate with agility, security, and customer-centricity, enabling them to expand channels and integrate fresh digital solutions to meet specific market and shopper needs.
                </p>
              </div>
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-[#001A3D] display-font">200M+</p>
                  <p className="text-[10px] font-bold text-[#0171c1] uppercase tracking-widest">Digital Users</p>
                </div>
                <div className="w-[1px] h-12 bg-gray-200 hidden md:block"></div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-[#001A3D] display-font">$5B+</p>
                  <p className="text-[10px] font-bold text-[#0171c1] uppercase tracking-widest">GMV Processed</p>
                </div>
                <div className="w-[1px] h-12 bg-gray-200 hidden md:block"></div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-[#001A3D] display-font">40%</p>
                  <p className="text-[10px] font-bold text-[#0171c1] uppercase tracking-widest">Loyalty Increase</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-sm overflow-hidden shadow-2xl">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1768796373360-95d80c5830fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                  alt="Commerce Fulfillment" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-[#0171c1] p-10 text-white space-y-4 max-w-xs shadow-2xl hidden md:block">
                <ShoppingBag size={32} strokeWidth={1.5} />
                <h3 className="text-xl font-bold display-font">Seamless Commerce</h3>
                <p className="text-sm font-medium opacity-80 leading-relaxed">
                  Integrating AI and omnichannel services across retail platforms to streamline tasks and enhance shopper loyalty.
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
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Our Services in Retail & Consumer Goods</h2>
            <p className="text-lg text-gray-500 max-w-4xl mx-auto font-medium leading-relaxed">
              At Hutech Solutions, we specialize in delivering cutting-edge software technology solutions tailored for the modern retail and consumer products landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {RETAIL_SERVICES.map((service, i) => {
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
              What Makes Custom Retail Solutions Essential for Your Business?
            </h2>
            <div className="w-20 h-1 bg-[#0171c1] mx-auto"></div>
            <p className="text-gray-400 max-w-3xl mx-auto font-medium text-lg leading-relaxed">
              In the rapidly changing consumer landscape, custom software solutions are key to staying relevant and ensuring operational agility.
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
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Which Innovations Can Transform Your Shopper Experience?</h2>
            <p className="text-lg text-gray-500 font-medium max-w-3xl mx-auto leading-relaxed">
              Incorporating advanced technologies can significantly enhance your retail capabilities for the modern age.
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
                  Discover Your Retail Digital Transformation Strategy With Us
                </h2>
                <div className="w-20 h-1 bg-[#0171c1]"></div>
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  Schedule a consultation with our expert Retail software team and take the first step towards a digital-first commerce experience.
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
                  src="https://images.unsplash.com/photo-1764795849878-59b546cfe9c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                  alt="Retail Interactive Display" 
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
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Why Choose Hutech Solutions for Your Retail Project?</h2>
            <p className="text-lg text-gray-500 font-medium max-w-4xl mx-auto leading-relaxed">
              At Hutech Solutions, we specialize in delivering Retail and Consumer Goods solutions tailored to your unique market needs.
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
              <h2 className="text-3xl font-bold text-[#001A3D] display-font mb-10">Share Your Retail Project With Us</h2>
              <InlineContactForm textareaPlaceholder="Message" category="Industries" />
            </div>
            <div className="lg:col-span-5 space-y-12 py-8">
              <h2 className="text-3xl font-bold text-[#001A3D] display-font">What Is The Next Step?</h2>
              <div className="space-y-10">
                {[
                  { icon: MessageSquare, text: "A retail technology consultant will review your request and contact you within a few business hours." },
                  { icon: FileText, text: "We will schedule a deep-dive session to understand your operational constraints and commerce goals." },
                  { icon: Sparkles, text: "You will receive a detailed proposal including technical architecture and implementation roadmaps." }
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
              <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Retail Insights & Articles</h2>
              <p className="text-lg text-gray-500 font-medium">
                Explore our latest thinking on commerce technology and consumer trends.
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
                    <span className="bg-[#0171c1] text-white text-[9px] font-bold px-3 py-1 uppercase tracking-widest rounded-sm">RetailTech</span>
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
        </div>
      </section>
    </div>
  );
}
