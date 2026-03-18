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
  Laptop,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

const RETAIL_SERVICES = [
  {
    icon: ShoppingBag,
    title: "Omnichannel Commerce Platforms",
    description:
      "Create a seamless shopping experience across physical stores, web, and mobile. We build unified commerce solutions that synchronize inventory, pricing, and customer data in real-time.",
  },
  {
    icon: Users,
    title: "AI-Powered Personalization",
    description:
      "Deliver hyper-relevant experiences to every customer. Our AI engines analyze behavior to provide personalized product recommendations, dynamic pricing, and targeted marketing campaigns.",
  },
  {
    icon: Laptop,
    title: "Next-Gen E-commerce Development",
    description:
      "Build fast, scalable, and high-converting online stores. We specialize in headless commerce architectures that provide complete creative freedom and superior performance.",
  },
  {
    icon: Store,
    title: "Smart In-Store Technology",
    description:
      "Modernize your brick-and-mortar locations with interactive displays, smart mirrors, and cashierless checkout systems that blend digital convenience with physical experience.",
  },
  {
    icon: CreditCard,
    title: "Secure Payment Solutions",
    description:
      "Simplify and secure every transaction. We integrate multi-channel payment gateways, mobile wallets, and buy-now-pay-later (BNPL) options to provide maximum flexibility for your customers.",
  },
  {
    icon: Workflow,
    title: "Retail Process Automation",
    description:
      "Streamline back-office and front-of-house operations. From automated inventory replenishment to AI-driven customer support, we reduce overhead and improve response times.",
  },
];

const FAQS = [
  {
    question: "How do you handle high traffic during peak sales events?",
    answer:
      "We use cloud-native, auto-scaling architectures and advanced content delivery networks (CDNs) to ensure your platform can handle millions of simultaneous users without performance degradation.",
  },
  {
    question: "Can you integrate our physical stores with our online shop?",
    answer:
      "Absolutely. We specialize in omnichannel integration, allowing for 'Buy Online, Pick Up In-Store' (BOPIS), cross-channel returns, and unified customer profiles.",
  },
  {
    question: "Do your retail solutions comply with data privacy laws?",
    answer:
      "Yes, we prioritize security and privacy, building platforms that are fully compliant with global regulations like GDPR and CCPA to protect your brand and your customers.",
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

export default function RetailConsumerGoodsPage() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="Retail & Consumer Goods Solutions | Hutech Solutions"
        description="Empowering Retail with Smart, Scalable, AI-Driven Solutions. Specialized in omnichannel commerce, personalization, and supply chain agility."
      />

      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1764795849878-59b546cfe9c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Modern Retail Technology"
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
              <span className="h-[1px] w-12 bg-[#FFAF2B]"></span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#FFAF2B] uppercase">
                Retail Excellence
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              Your Retail Vision. <br />
              <span className="text-[#FFAF2B]">One Digital Commerce Revolution.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-bold text-gray-300 md:text-xl">
              We craft intelligent retail experiences through cutting-edge software solutions and
              expert consulting for global consumer brands.
            </p>
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
                  Empowering Retail & Consumer Goods with Smart, Scalable, AI-Driven Solutions
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
              </div>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed font-bold text-gray-500">
                  At Hutech Solutions, we bring deep expertise in implementing, supporting, and
                  managing integrated commerce platforms. Our end-to-end solutions include system
                  implementation, custom upgrades, performance optimization, and seamless
                  integration with your entire operational stack.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-sm shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1768796373360-95d80c5830fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Commerce Fulfillment"
                  className="h-full w-full object-cover"
                />
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
              Our Services in Retail & Consumer Goods
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {RETAIL_SERVICES.map((service, i) => {
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
                  <div className="flex h-16 w-16 items-center justify-center rounded-sm bg-gray-50 text-[#0171c1] transition-all duration-500 group-hover:bg-[#0171c1] group-hover:text-white">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="display-font text-xl leading-tight font-bold text-[#001A3D]">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-bold text-gray-500">
                    {service.description}
                  </p>
                </Motion.div>
              );
            })}
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

      {/* CTA Section */}
      <section className="bg-[#FFAF2B] py-24 text-[#001A3D]">
        <div className="mx-auto max-w-[1280px] px-6 text-center lg:px-20">
          <h2 className="display-font mb-8 text-3xl font-semibold md:text-5xl">
            Ready to Transform Your Retail Strategy?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 rounded-sm bg-[#001A3D] px-10 py-5 text-[11px] font-bold tracking-wider text-white uppercase shadow-xl transition-all duration-500 hover:bg-white hover:text-[#001A3D]"
          >
            Consult Us Now <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
