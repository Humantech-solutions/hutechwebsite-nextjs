"use client";

import { useState, useRef } from "react";
import { motion as Motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { 
  ShoppingCart, 
  Smartphone, 
  TrendingUp, 
  HeadphonesIcon, 
  Zap, 
  Shield, 
  BarChart3, 
  Sparkles, 
  ArrowRight, 
  MoveRight, 
  Check, 
  Rocket, 
  Store, 
  Package, 
  CreditCard, 
  Globe 
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Meta } from "@/components/Meta";

const BRAND_ORANGE = "#FFAF2B";
const BRAND_BLUE = "#001A3D";

const SHOPIFY_SERVICES = [
  {
    icon: Package,
    title: "Custom Theme Development",
    description: "Bespoke Shopify themes built from scratch, optimized for performance and conversions.",
    functions: [
      "Mobile-first responsive design",
      "Advanced product filtering",
      "One-click checkout optimization",
      "Custom animations and interactions",
      "Brand-aligned visual design"
    ]
  },
  {
    icon: Store,
    title: "Shopify Plus Solutions",
    description: "Enterprise-grade implementations with advanced automation and integrations.",
    functions: [
      "Multi-store management",
      "Advanced B2B features",
      "Custom app development",
      "Wholesale channel setup",
      "Enterprise-level customization"
    ]
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Speed optimization and conversion rate improvements that drive measurable results.",
    functions: [
      "Core Web Vitals optimization",
      "A/B testing implementation",
      "Analytics & tracking setup",
      "Page speed enhancement",
      "Conversion funnel optimization"
    ]
  }
];

const PLATFORMS = [
  {
    icon: ShoppingCart,
    title: "Shopify",
    description: "Leading platform for scalable ecommerce with an extensive app ecosystem and built-in features.",
    functions: [
      "Custom theme development",
      "Shopify Plus enterprise solutions",
      "App integrations & custom apps",
      "Migration from other platforms",
      "Multi-currency & multi-language support"
    ]
  },
  {
    icon: Package,
    title: "Magento Commerce",
    description: "Enterprise-grade platform for complex B2B and B2C requirements with advanced customization.",
    functions: [
      "Custom module development",
      "Multi-store & multi-vendor setups",
      "B2B commerce solutions",
      "Performance optimization",
      "Advanced catalog management"
    ]
  },
  {
    icon: Store,
    title: "WooCommerce",
    description: "Flexible WordPress-based solution perfect for content-rich stores and custom functionality.",
    functions: [
      "Custom plugin development",
      "WordPress theme integration",
      "Payment gateway setup",
      "SEO optimization",
      "Content marketing integration"
    ]
  },
  {
    icon: Globe,
    title: "commercetools",
    description: "Headless commerce platform designed for omnichannel experiences and global scalability.",
    functions: [
      "Headless architecture setup",
      "API-first development",
      "Omnichannel commerce experiences",
      "Global marketplace solutions",
      "Microservices integration"
    ]
  }
];

const BENEFITS = [
  {
    icon: Smartphone,
    title: "Mobile-First Approach",
    description: "Every store we build is optimized for mobile users, ensuring seamless shopping experiences across all devices and higher conversion rates."
  },
  {
    icon: TrendingUp,
    title: "Conversion Optimization",
    description: "We implement proven strategies and A/B tested elements that maximize your sales potential — from product pages to checkout flows."
  },
  {
    icon: HeadphonesIcon,
    title: "Ongoing Support",
    description: "Launch is just the beginning. We provide continuous maintenance, updates, and growth strategies to keep your store ahead of the competition."
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Bank-grade security protocols and PCI compliance to protect your customers' data and transactions."
  },
  {
    icon: BarChart3,
    title: "Data-Driven Insights",
    description: "Advanced analytics and reporting tools to track performance, understand customer behavior, and make informed decisions."
  },
  {
    icon: Zap,
    title: "Lightning-Fast Performance",
    description: "Optimized for speed with Core Web Vitals excellence, ensuring superior user experience and higher search rankings."
  }
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description: "We begin with a comprehensive analysis of your business goals, target audience, and competitive landscape to create a tailored ecommerce strategy."
  },
  {
    number: "02",
    title: "Platform Selection",
    description: "Based on your requirements, we recommend the optimal ecommerce platform that aligns with your budget, scalability needs, and technical capabilities."
  },
  {
    number: "03",
    title: "Design & UX",
    description: "Our design team creates conversion-focused user experiences with mobile-first responsive designs that reflect your brand identity."
  },
  {
    number: "04",
    title: "Development & Integration",
    description: "We build your store using best practices, integrating payment gateways, shipping providers, inventory systems, and marketing tools."
  },
  {
    number: "05",
    title: "Testing & QA",
    description: "Rigorous testing across devices, browsers, and scenarios ensures a flawless shopping experience before launch."
  },
  {
    number: "06",
    title: "Launch & Optimization",
    description: "Post-launch, we monitor performance, gather user feedback, and continuously optimize for better conversions and user experience."
  }
];

const FEATURES = [
  {
    icon: CreditCard,
    title: "Payment Integration",
    description: "Seamless integration with major payment gateways and alternative payment methods."
  },
  {
    icon: Package,
    title: "Inventory Management",
    description: "Real-time inventory tracking across multiple channels and warehouses."
  },
  {
    icon: ShoppingCart,
    title: "Advanced Cart Features",
    description: "Smart cart recovery, upselling, cross-selling, and personalized recommendations."
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Comprehensive reporting on sales, traffic, conversion rates, and customer behavior."
  }
];

function ServiceCard({ service, index }: { service: any, index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = service.icon;

  return (
    <Motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="relative overflow-hidden bg-white h-full transition-all duration-700 border border-gray-100">
        <Motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `linear-gradient(135deg, ${BRAND_BLUE} 0%, ${BRAND_BLUE}ee 100%)`
          }}
        />

        <Motion.div
          className="absolute top-0 right-0 w-0 h-0 border-t-[80px] border-r-[80px] border-transparent transition-all duration-700"
          style={{
            borderTopColor: isHovered ? BRAND_ORANGE : "transparent",
            borderRightColor: isHovered ? BRAND_ORANGE : "transparent"
          }}
        />
        
        <div className="relative z-10 p-10 h-full flex flex-col">
          <Motion.div
            className="mb-8 relative w-20 h-20 flex items-center justify-center"
            animate={{
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Motion.div
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
          </Motion.div>

          <h3 
            className="text-2xl font-bold mb-4 transition-colors duration-500 leading-tight"
            style={{ color: isHovered ? "white" : BRAND_BLUE }}
          >
            {service.title}
          </h3>

          <p 
            className="mb-8 leading-relaxed transition-colors duration-500 text-base"
            style={{ color: isHovered ? "rgba(255,255,255,0.92)" : "#555" }}
          >
            {service.description}
          </p>

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
              {service.functions && service.functions.map((func: string, idx: number) => (
                <Motion.li 
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
                </Motion.li>
              ))}
            </ul>
          </div>

          <Motion.div
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
          </Motion.div>
        </div>
      </div>
    </Motion.div>
  );
}

export default function EcommerceDevelopment() {
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
        title="Ecommerce Development | Hutech Solutions"
        description="Transform your business with cutting-edge ecommerce platforms. Expert Shopify development, custom themes, Magento solutions, and conversion optimization."
      />
      <Breadcrumbs variant="light" />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="bg-[#001A3D] text-white h-[450px] relative overflow-hidden flex items-center"
      >
        <div className="absolute inset-0 z-0">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1763872038252-e6c4e0a11067?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Ecommerce Development"
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
              <span className="text-[#FFAF2B] font-bold uppercase tracking-[0.3em] text-[10px]">Ecommerce Excellence</span>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight display-font mb-8">
              Digital Commerce. <br />
              <span className="text-[#FFAF2B]">Conversion Optimized.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed">
              Transform your business with cutting-edge ecommerce platforms. From Shopify to enterprise solutions, we build scalable online stores that drive measurable results.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1280px] mx-auto px-8">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <div 
              className="inline-block px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: `${BRAND_ORANGE}15`, color: BRAND_ORANGE }}
            >
              <span className="text-sm font-bold tracking-wide">Leading Shopify Development Agency</span>
            </div>
            <h2 
              className="text-4xl font-semibold mb-6 leading-tight tracking-tight display-font text-[#001A3D]"
            >
              As Shopify Experts, We've Built High-Performance Ecommerce Stores
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              From startups to enterprise brands generating millions in revenue, we deliver cutting-edge ecommerce solutions that combine beautiful design with powerful functionality.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Shopify Services Section */}
      <section id="shopify-section" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="shopify-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="30" fill="none" stroke={BRAND_BLUE} strokeWidth="1"/>
                <circle cx="50" cy="50" r="15" fill="none" stroke={BRAND_ORANGE} strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#shopify-pattern)" />
          </svg>
        </div>

        <div className="max-w-[1280px] mx-auto px-8 relative z-10">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <Motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <div 
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full"
                style={{ backgroundColor: `${BRAND_BLUE}10` }}
              >
                <ShoppingCart size={18} style={{ color: BRAND_ORANGE }} />
                <span className="text-sm font-bold tracking-wide text-[#001A3D]">
                  Shopify Expertise
                </span>
              </div>
            </Motion.div>

            <h2 className="text-5xl md:text-6xl font-semibold mb-6 max-w-4xl mx-auto leading-tight display-font tracking-tight text-[#001A3D]">
              Ready to Scale Your Shopify Store?
            </h2>
            
            <Motion.div 
              className="w-32 h-1.5 mx-auto rounded-full"
              style={{ backgroundColor: BRAND_ORANGE }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-8 leading-relaxed">
              Trusted by leading brands and partners for expert Shopify development. Get a free consultation and project estimate today.
            </p>
          </Motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SHOPIFY_SERVICES.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Platform Expertise Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-8 relative z-10">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <Motion.div
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
                <span className="text-sm font-bold tracking-wide text-[#001A3D]">
                  Multi-Platform Mastery
                </span>
              </div>
            </Motion.div>

            <h2 className="text-5xl md:text-6xl font-semibold mb-6 max-w-4xl mx-auto leading-tight display-font tracking-tight text-[#001A3D]">
              Multi-Platform Ecommerce Expertise
            </h2>
            
            <Motion.div 
              className="w-32 h-1.5 mx-auto rounded-full"
              style={{ backgroundColor: BRAND_ORANGE }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-8 leading-relaxed">
              We specialize in all major ecommerce platforms, delivering tailored solutions that match your business needs and technical requirements.
            </p>
          </Motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PLATFORMS.map((platform, index) => (
              <ServiceCard key={index} service={platform} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <Motion.div
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
              <span className="text-sm font-bold tracking-wide">Why Choose Us</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-semibold mb-6 display-font tracking-tight text-[#001A3D]">
              Why Leading Brands Choose Us
            </h2>
            <Motion.div 
              className="w-32 h-1.5 mx-auto rounded-full"
              style={{ backgroundColor: BRAND_ORANGE }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </Motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BENEFITS.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-gradient-to-br from-gray-50 to-white p-8 border border-gray-100 group hover:shadow-xl transition-all duration-500 relative overflow-hidden"
                >
                  <Motion.div
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
                    <h3 className="text-2xl font-bold mb-4 text-[#001A3D]">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </Motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section 
        className="py-20 relative overflow-hidden"
        style={{ backgroundColor: BRAND_BLUE }}
      >
        <Motion.div
          className="absolute -left-32 top-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ backgroundColor: BRAND_ORANGE }}
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0]
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <Motion.div
          className="absolute -right-32 bottom-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ backgroundColor: BRAND_ORANGE }}
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -50, 0]
          }}
          transition={{ duration: 18, repeat: Infinity }}
        />

        <div className="max-w-[1280px] mx-auto px-8 relative z-10">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Our Development Process
            </h2>
            <div 
              className="w-32 h-1.5 mx-auto rounded-full"
              style={{ backgroundColor: BRAND_ORANGE }}
            />
            <p className="text-xl mt-8 max-w-3xl mx-auto" style={{ color: "rgba(255,255,255,0.85)" }}>
              A proven methodology that ensures your ecommerce store is built for success from day one.
            </p>
          </Motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {PROCESS_STEPS.map((step, index) => (
              <Motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="relative">
                  <Motion.div
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
                  </Motion.div>

                  <h3 className="text-xl font-bold mb-4 text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                    {step.description}
                  </p>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <Motion.div
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
              <span className="text-sm font-bold tracking-wider">CORE FEATURES</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-[#001A3D]">
              Essential Ecommerce Features
            </h2>
            <Motion.div 
              className="w-32 h-1.5 mx-auto rounded-full"
              style={{ backgroundColor: BRAND_ORANGE }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </Motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  className="bg-white p-8 border border-gray-100 group hover:shadow-xl transition-all duration-500 relative overflow-hidden"
                >
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
                    <h3 className="text-xl font-bold mb-3 text-[#001A3D]">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Motion.div>
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
        <Motion.div
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
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-8 border-2"
              style={{ borderColor: BRAND_ORANGE }}
            >
              <Sparkles size={20} style={{ color: BRAND_ORANGE }} />
              <span className="text-sm font-bold text-white">
                READY TO GET STARTED?
              </span>
            </Motion.div>

            <h2 className="text-5xl md:text-6xl font-bold mb-8 max-w-4xl mx-auto leading-tight text-white">
              Ready to Transform Your Ecommerce Business?
            </h2>
            <p className="text-xl md:text-2xl mb-4 max-w-3xl mx-auto leading-relaxed text-white opacity-90">
              Join hundreds of successful brands who've trusted us to build their ecommerce presence.
            </p>
            <p className="text-lg mb-12 max-w-2xl mx-auto text-white opacity-70">
              Get a free consultation and detailed project proposal within 24 hours.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <Motion.div
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-12 py-6 font-bold text-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 rounded-sm"
                  style={{
                    backgroundColor: BRAND_ORANGE,
                    color: BRAND_BLUE
                  }}
                >
                  Get Free Consultation
                  <MoveRight size={26} />
                </Link>
              </Motion.div>

              <Motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/industries"
                  className="inline-flex items-center gap-3 px-12 py-6 font-semibold text-xl border-2 transition-all duration-300 rounded-sm"
                  style={{
                    borderColor: "rgba(255,255,255,0.3)",
                    color: "white"
                  }}
                >
                  View Case Studies
                  <ArrowRight size={24} />
                </Link>
              </Motion.div>
            </div>

            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-white opacity-70"
            >
              <div className="flex items-center gap-2">
                <Check size={20} style={{ color: BRAND_ORANGE }} />
                <span>Free consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={20} style={{ color: BRAND_ORANGE }} />
                <span>24-hour response</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={20} style={{ color: BRAND_ORANGE }} />
                <span>No-obligation proposal</span>
              </div>
            </Motion.div>
          </Motion.div>
        </div>
      </section>
    </div>
  );
}
