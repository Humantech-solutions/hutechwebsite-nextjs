"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ShoppingCart,
  Store,
  Package,
  CreditCard,
  Globe,
  Lock,
  Workflow,
  BarChart3,
  ShieldCheck,
  Settings,
  TrendingUp,
  Sparkles,
  Smartphone,
  Network,
  MessageSquare,
  FileText,
  Zap,
  ChevronRight,
  MoveRight,
  ArrowRight,
  RefreshCw,
  Cpu,
  Database,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";

import { ServiceDetailContactCTA } from "@/components/ServiceDetailContactCTA";

const ECOMMERCE_SERVICES = [
  {
    icon: ShoppingCart,
    title: "Headless Commerce Architecture",
    description:
      "Navigate your journey to headless commerce with confidence. We decouple your frontend (Next.js) from your backend platform—including Shopify or commercetools—to deliver lightning-fast page speeds.",
  },
  {
    icon: Store,
    title: "Shopify Plus Solutions",
    description:
      "Maximize flexibility and avoid vendor limitations. We design and manage complex enterprise setups, B2B wholesale channels, and custom app integrations, ensuring your workloads are optimized for high sales volumes.",
  },
  {
    icon: Cpu,
    title: "Custom Theme Development",
    description:
      "Build for the future of digital retail. We leverage responsive styling, conversion-optimized grids, and custom checkout components to create highly scalable, custom-coded ecommerce experiences.",
  },
  {
    icon: Zap,
    title: "Magento & Adobe Commerce",
    description:
      "Stop losing customers to slow load times. Our certified experts design, upgrade, and optimize complex multi-vendor Magento platforms, ensuring your catalog runs efficiently under heavy traffic.",
  },
  {
    icon: RefreshCw,
    title: "WooCommerce Implementation",
    description:
      "Don't let rigid systems limit your store design. We transform standard WooCommerce setups into highly customizable, content-rich commerce sites integrated with custom plugins.",
  },
  {
    icon: Network,
    title: "Omnichannel Integrations",
    description:
      "Focus on your sales while we handle the data pipelines. We provide automated integrations bridging your store with Amazon, eBay, social channels, and third-party logistics (3PL) providers.",
  },
];

const ESSENTIAL_SOLUTIONS = [
  {
    icon: Lock,
    title: "Conversion Rate Optimization",
    description:
      "Protect your advertising spend. We implement robust layout modifications, conversion audits, and A/B tested checkout flows to ensure your website visitors convert into buyers.",
  },
  {
    icon: Workflow,
    title: "Mobile-First Design Flow",
    description:
      "Accelerate mobile purchase journeys. We optimize your cart buttons, mobile menus, and transaction inputs, allowing customers to buy items on any screen size in seconds.",
  },
  {
    icon: BarChart3,
    title: "Core Web Vitals Excellence",
    description:
      "Unlock the value of fast loading speeds. We optimize image weight, bundle sizes, and browser execution times, ensuring high organic search ranking and immediate response.",
  },
  {
    icon: ShieldCheck,
    title: "ERP & Inventory Syncing",
    description:
      "Ensure warehouse synchronization never stops. We design automated connections between your ecommerce orders and physical backend ERP systems like SAP or NetSuite.",
  },
  {
    icon: Settings,
    title: "Global Tax & Multi-Currency",
    description:
      "Automate your international operations. We use localized pricing, automated tax engines, and multi-language setups to help you sell across global borders with zero friction.",
  },
  {
    icon: TrendingUp,
    title: "PCI-DSS Security Compliance",
    description:
      "Deliver absolute transaction peace of mind. We secure checkout scripts, encrypt payment gateways, and configure user permissions to protect customer data under strict retail rules.",
  },
];

const INNOVATIONS = [
  {
    icon: Sparkles,
    title: "AI Product Recommendations",
    description:
      "Leverage machine learning to suggest personalized upsells, relevant accessories, and bundle packages, ensuring your average order value increases automatically.",
  },
  {
    icon: Smartphone,
    title: "One-Click Biometric Checkout",
    description:
      "Reduce checkout fields to a single action. We integrate Apple Pay and biometric validation into checkout flows to lower cart abandonment and secure data.",
  },
  {
    icon: Globe,
    title: "AR Product Demonstration",
    description:
      "Bring products to life in the buyer's home. We build lightweight augmented reality viewers, allowing customers to inspect 3D models of items before purchase.",
  },
  {
    icon: Database,
    title: "Predictive Stock Analytics",
    description:
      "Eliminate inventory blockages. We use predictive analytics to calculate run-rates, automating replenishment purchase orders before catalog items run out.",
  },
  {
    icon: Network,
    title: "Web3 Commerce Portals",
    description:
      "Support decentralized assets. We integrate non-custodial crypto wallet payments, token-gated product access, and digital receipt NFTs into standard checkouts.",
  },
  {
    icon: Lock,
    title: "Voice-Activated Checkout",
    description:
      "Enable purchases without screens. We sync digital product catalog schemas with household smart speakers, allowing customers to order items via verbal actions.",
  },
];

const WHY_CHOOSE = [
  {
    title: "Platform-Agnostic Mastery",
    description:
      "Our developers are certified across Shopify Plus, Magento, and WooCommerce, ensuring you receive the absolute best technical fit for your business.",
  },
  {
    title: "Conversion-Focused Styling",
    description:
      "We design store layouts with a deep focus on customer psychology, transaction speed, and clear checkout flows to maximize your bottom line.",
  },
  {
    title: "Reliable System Integrations",
    description:
      "We possess extensive experience connecting digital stores with enterprise ERPs, warehouse managers (WMS), and marketing suites with zero downtime.",
  },
  {
    title: "Ongoing Performance Auditing",
    description:
      "We don't just launch your store; we guarantee its optimization. We continuously audit pages, test elements, and enhance speed to keep your sales rising.",
  },
];

const FAQS = [
  {
    question: "Which ecommerce platform is best for my business?",
    answer:
      "The ideal platform depends on catalog complexity, transaction volume, and B2B requirements. Shopify Plus is excellent for fast growth and low maintenance, Magento suits complex custom catalogs, and headless architectures offer the fastest speeds.",
  },
  {
    question: "How do you improve my ecommerce store's loading speed?",
    answer:
      "We audit Core Web Vitals, implement next-gen image compression, configure global Content Delivery Networks (CDNs), optimize script load orders, and clean up unused third-party application tags.",
  },
  {
    question: "Can you migrate our store from Magento to Shopify without data loss?",
    answer:
      "Yes. We use custom database migration scripts to securely transfer product variants, customer history, order logs, and catalog redirects, ensuring zero impact on live sales.",
  },
  {
    question: "Do you develop custom Shopify applications?",
    answer:
      "Yes, we build custom private or public Shopify applications using Node.js and React to handle unique shipping rules, product bundles, and custom inventory integrations.",
  },
  {
    question: "What is headless commerce and is it worth the investment?",
    answer:
      "Headless separates your front-end interface (built with Next.js) from the back-end commerce database. It is worth it for high-volume enterprise stores that require extreme loading speed, custom front-end layouts, and global scaling.",
  },
];

const BLOG_POSTS = [
  {
    id: "1",
    title: "Headless Commerce: Why Enterprise Brands Are Making the Switch",
    description:
      "Decoupled storefront layouts deliver lightning-fast speed, improved SEO performance, and complete design freedom...",
    image:
      "https://images.unsplash.com/photo-1763872038252-e6c4e0a11067?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "2",
    title: "Maximizing Checkout Conversion: 5 A/B Testing Wins for 2026",
    description:
      "Discover how simple changes to shipping calculations and checkout input fields can lift sales conversion rates by 15%...",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "3",
    title: "Automating Omnichannel Retail: Syncing Stock Across Platforms",
    description:
      "Unified cloud inventory databases are helping modern physical and digital retailers manage worldwide sales channels without lag...",
    image:
      "https://images.unsplash.com/photo-1686061593213-98dad7c599b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

const ECOMMERCE_STACK = [
  { primary: "SHOPIFY", secondary: "COMMERCE ENGINE" },
  { primary: "MAGENTO", secondary: "ENTERPRISE B2B" },
  { primary: "WOOCOMMERCE", secondary: "DIGITAL STORES" },
  { primary: "REACT", secondary: "FRONTEND SHELL" },
  { primary: "NEXT.JS", secondary: "HEADLESS SHELL" },
  { primary: "NODE.JS", secondary: "CUSTOM APIs" },
  { primary: "STRIPE", secondary: "PAYMENT GATEWAY" },
  { primary: "MONGODB", secondary: "PRODUCT STORAGE" },
  { primary: "APACHE KAFKA", secondary: "STOCK UPDATES" },
  { primary: "DOCKER", secondary: "VIRTUALIZATION" },
  { primary: "KUBERNETES", secondary: "ORCHESTRATION" },
  { primary: "PYTHON", secondary: "STOCK SCRIPTS" },
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

export default function EcommerceDevelopment() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="Ecommerce Development Services | Hutech Solutions"
        description="Transform your business with Hutech's Ecommerce Development services. Specialized in Shopify Plus, Magento, WooCommerce, and headless commerce."
      />

      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1763872038252-e6c4e0a11067?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Ecommerce Store Architecture"
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
                Commerce Excellence
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              Your Store Vision. <br />
              <span className="text-[#F99D1C]">Commerce Revolution.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              We craft intelligent customer experiences and future-ready ecommerce solutions for
              global enterprise brands.
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
                  Empowering Brands with Smart, Scalable Ecommerce Solutions
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
              </div>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  At Hutech Solutions, we bring deep expertise in implementing, supporting, and
                  managing integrated ecommerce platforms. Our end-to-end solutions include headless
                  architecture setup, custom theme design, payment integration, and seamless inventory management.
                </p>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  We ensure our clients can operate with agility, high speed, and reliability, enabling
                  them to expand operations and integrate fresh retail features to meet specific commercial and market needs.
                </p>
              </div>
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">400+</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Stores Built
                  </p>
                </div>
                <div className="hidden h-12 w-[1px] bg-gray-200 md:block"></div>
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">200%</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Avg Revenue Lift
                  </p>
                </div>
                <div className="hidden h-12 w-[1px] bg-gray-200 md:block"></div>
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">99.99%</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Store Uptime
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-sm shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Ecommerce Operations Center"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 hidden max-w-xs space-y-4 bg-[#0171c1] p-10 text-white shadow-2xl md:block">
                <ShoppingCart size={32} strokeWidth={1.5} />
                <h3 className="display-font text-xl font-bold">Digital Commerce</h3>
                <p className="text-sm leading-relaxed font-medium opacity-80">
                  Integrating advanced AI search, customized checkout modules, and headless backend engines across enterprise platforms to enhance purchase rates.
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
              Our Ecommerce Development Services
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              At Hutech Solutions, we specialize in delivering cutting-edge software technology
              solutions tailored for the global ecommerce retail landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {ECOMMERCE_SERVICES.map((service, i) => {
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

      {/* Essential Solutions Section */}
      <section className="overflow-hidden bg-[#001A3D] py-24 text-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font mx-auto max-w-4xl text-3xl leading-tight font-semibold md:text-5xl">
              What Makes Custom Ecommerce Solutions Essential for Your Business?
            </h2>
            <div className="mx-auto h-1 w-20 bg-[#0171c1]"></div>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-400">
              In the modern digital landscape, custom retail architectures are key to staying
              competitive and ensuring transactional security.
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
              Which Innovations Can Transform Your Retail Experience?
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-500">
              Incorporating advanced ecommerce technologies can significantly enhance your retail capabilities
              for the digital-first era.
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

      {/* CTA Section */}
      <section className="overflow-hidden bg-[#F2F2F2] py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex flex-col items-center gap-20 lg:flex-row">
            <div className="flex-1 space-y-10">
              <div className="space-y-6">
                <h2 className="display-font text-3xl leading-[1.2] font-semibold text-[#001A3D] md:text-5xl">
                  Discover Your Ecommerce Digital Transformation Strategy With Us
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  Schedule a consultation with our expert digital commerce team and take the
                  first step towards a fast, conversion-optimized retail experience.
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
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Ecommerce Sales Analytics"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -top-10 -right-10 -z-10 h-64 w-64 rounded-full bg-[#0171c1]/5 blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 -z-10 h-48 w-48 rounded-full bg-[#F99D1C]/10 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#001A3D] via-[#030E21] to-[#020B1E] py-24 md:py-32 text-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
          {/* Header */}
          <div className="mb-16 text-center md:mb-20">
            <div className="flex items-center justify-center gap-3 text-[10px] font-bold tracking-[0.3em] text-[#F99D1C] uppercase">
              <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#F99D1C]" />
              TECHNOLOGY STACK
              <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#F99D1C]" />
            </div>

            <h2 className="mt-4 display-font text-3xl font-bold tracking-wider text-white sm:text-4xl md:text-5xl uppercase">
              MODERN ECOMMERCE DEVELOPMENT STACK
            </h2>

            <div className="mx-auto mt-4 h-[3px] w-14 bg-[#F99D1C]" />

            <p className="mx-auto mt-6 max-w-2xl text-sm font-medium text-gray-400 md:text-base leading-relaxed">
              Scalable ecommerce technologies powering seamless shopping experiences, secure payments, inventory management, and digital growth
            </p>
          </div>

          {/* Cards Grid */}
          <div className="border-l border-t border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {ECOMMERCE_STACK.map((item, idx) => (
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

      {/* Why Choose Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
              Why Choose Hutech Solutions for Your Ecommerce Project?
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              At Hutech Solutions, we specialize in delivering Ecommerce solutions tailored to your
              unique organizational needs.
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


      {/* Features Grid */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="mx-auto max-w-[1280px] px-8">
          <Motion.div
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
              <span className="text-sm font-bold tracking-wider">CORE FEATURES</span>
            </div>
            <h2 className="mb-6 text-5xl font-bold text-[#001A3D] md:text-6xl">
              Essential Ecommerce Features
            </h2>
            <Motion.div
              className="mx-auto h-1.5 w-32 rounded-full"
              style={{ backgroundColor: BRAND_ORANGE }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </Motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative overflow-hidden border border-gray-100 bg-white p-8 transition-all duration-500 hover:shadow-xl"
                >
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
                    <h3 className="mb-3 text-xl font-bold text-[#001A3D]">{feature.title}</h3>
                    <p className="leading-relaxed text-gray-600">{feature.description}</p>
                  </div>
                </Motion.div>
              );
            })}
          </div>
        </div>
      </section>

            <ServiceDetailContactCTA />
    </div>
  );
}
