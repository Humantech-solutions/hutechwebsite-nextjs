"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ShieldCheck, 
  ShoppingBag, 
  Users, 
  Zap, 
  TrendingUp, 
  BarChart, 
  Workflow, 
  Smartphone, 
  Cloud, 
  Lock, 
  MessageSquare, 
  FileText, 
  Sparkles, 
  MoveRight, 
  ArrowRight, 
  ChevronRight,
  Target,
  LayoutGrid,
  Search,
  Building2,
  BarChart3,
  Globe,
  Store,
  CreditCard,
  Truck,
  Heart,
  SmartphoneNfc,
  Laptop
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

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
    question: "Do your retail solutions comply with data privacy laws?",
    answer: "Yes, we prioritize security and privacy, building platforms that are fully compliant with global regulations like GDPR and CCPA to protect your brand and your customers."
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

export default function RetailConsumerGoodsPage() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta 
        title="Retail & Consumer Goods Solutions | Hutech Solutions"
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
              Your Retail Vision. <br />
              <span className="text-[#FFAF2B]">One Digital Commerce Revolution.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-bold leading-relaxed">
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
                <p className="text-lg text-gray-500 font-bold leading-relaxed">
                  At Hutech Solutions, we bring deep expertise in implementing, supporting, and managing integrated commerce platforms. Our end-to-end solutions include system implementation, custom upgrades, performance optimization, and seamless integration with your entire operational stack.
                </p>
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
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Our Services in Retail & Consumer Goods</h2>
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
                  <div className="w-16 h-16 rounded-sm bg-gray-50 flex items-center justify-center text-[#0171c1] group-hover:bg-[#0171c1] group-hover:text-white transition-all duration-500">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-[#001A3D] display-font leading-tight">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-bold">{service.description}</p>
                </Motion.div>
              );
            })}
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

      {/* CTA Section */}
      <section className="py-24 bg-[#FFAF2B] text-[#001A3D]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 text-center">
          <h2 className="text-3xl md:text-5xl font-semibold display-font mb-8">Ready to Transform Your Retail Strategy?</h2>
          <Link href="/contact" className="inline-flex items-center gap-3 bg-[#001A3D] text-white px-10 py-5 font-bold uppercase tracking-wider text-[11px] hover:bg-white hover:text-[#001A3D] transition-all duration-500 shadow-xl rounded-sm">
            Consult Us Now <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
