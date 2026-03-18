"use client";

import { motion as Motion } from "framer-motion";
import { useParams } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { 
  CheckCircle2, 
  ArrowRight, 
  Smartphone, 
  Globe, 
  Zap, 
  Target,
  BarChart3,
  ArrowUp,
  MapPin, 
  Shield, 
  Activity, 
  Database,
  Cpu,
  Cloud,
  MoveRight
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface CaseStudy {
  title: string;
  tagline: string;
  client: string;
  platform: string;
  geography: string;
  image: string;
  overview: string;
  secondaryOverview?: string;
  overviewQuote: string;
  challenges: {
    title: string;
    desc: string;
    icon: React.ReactNode;
  }[];
  solutions?: {
    title: string;
    desc: string;
    icon: React.ReactNode;
  }[];
  processSteps?: {
    number: string;
    title: string;
    desc: string;
  }[];
  results?: {
    title: string;
    desc: string;
  }[];
  stats?: {
    label: string;
    value: string;
  }[];
}

const CASE_STUDIES_DETAILS: Record<string, CaseStudy> = {
  "shopify-fashion-storefront": {
    title: "Building a Scalable Shopify Fashion Storefront",
    tagline: "Establishing international fashion brand presence with seamless data validation and brand-consistent digital architecture.",
    client: "Global Fashion Retail",
    platform: "Shopify Plus",
    geography: "Global / Indonesia",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    overview: "The client is an Indonesian digital solutions firm assisting global fashion brands with e-commerce setups. The initiative aimed at establishing Shopify, linking it with the client's current elements for seamless data validation, and developing and personalizing Shopify storefronts for multiple international clothing brands.",
    secondaryOverview: "Our objective was to bridge the gap between complex back-end requirements and the high-fidelity design standards expected by global luxury and fashion houses, ensuring technical resilience at scale.",
    overviewQuote: "Developing a brand-consistent, aesthetically pleasing storefront that satisfies local regulations and provide a seamless purchasing experience.",
    challenges: [
      {
        title: "Brand Consistency",
        desc: "Developing a retail space that adhered to international brand standards. The storefront had to adhere closely to the defined visual identity of global fashion brands.",
        icon: <Target className="w-6 h-6" />
      },
      {
        title: "Cross-Device Experience",
        desc: "Guaranteeing a seamless and uniform user experience across desktop, tablet, and mobile platforms with quick interactions and straightforward navigation.",
        icon: <Smartphone className="w-6 h-6" />
      },
      {
        title: "Regional Adaptation",
        desc: "Overseeing regional adaptation, including localization and market-specific settings, while ensuring quick loading speeds for the Indonesian market.",
        icon: <Globe className="w-6 h-6" />
      }
    ],
    solutions: [
      {
        title: "Customized Storefront Development",
        desc: "Created a completely customized Shopify storefront that adhered closely to international brand standards, maintaining uniformity in visuals and typography.",
        icon: <Zap className="w-5 h-5" />
      },
      {
        title: "User Experience Optimization",
        desc: "Enhanced page layouts and navigation systems to facilitate user access to collections, product discovery, and purchase completion.",
        icon: <Smartphone className="w-5 h-5" />
      },
      {
        title: "Regional & Localization Engine",
        desc: "Established region-specific settings to address localization needs, including language and currency, allowing effortless expansion.",
        icon: <Globe className="w-5 h-5" />
      },
      {
        title: "Synchronization & Stability Framework",
        desc: "Synchronized Indonesian storefront revisions according to a set scope and timeline, ensuring stability and uniformity with global updates.",
        icon: <CheckCircle2 className="w-5 h-5" />
      }
    ],
    processSteps: [
      {
        number: "01",
        title: "Requirements & Brand Alignment",
        desc: "In-depth grasp of requirements and brand alignment, examining global brand guidelines."
      },
      {
        number: "02",
        title: "Shopify Storefront Development",
        desc: "Development and customization on Shopify, emphasizing layout design and navigation."
      },
      {
        number: "03",
        title: "Multi-Device & Region Validation",
        desc: "Evaluations performed across various devices and locations to guarantee uniform performance."
      },
      {
        number: "04",
        title: "Deployment & Handover",
        desc: "Finished storefront released and presented to the client with essential documentation."
      },
      {
        number: "05",
        title: "Agile Execution & Optimization",
        desc: "Quickly evaluating plugins and third-party apps, adapting to evolving needs."
      }
    ],
    results: [
      { title: "Brand Quality Elevated", desc: "Cohesive look and feel aligned with global brand guidelines across all pages." },
      { title: "Improved Usability", desc: "Notable improvements in navigation allowing customers to browse and purchase seamlessly." },
      { title: "Scalable Solution", desc: "Designed for growth, enabling efficient regional management and future expansion." },
      { title: "Sync & Stability", desc: "Synchronized revisions ensuring stability and uniformity with global site updates." }
    ]
  },
  "hutrac-gps-fleet": {
    title: "HuTrac: Next-Gen GPS Fleet Solutions",
    tagline: "Transforming logistics with high-precision telematics and predictive maintenance frameworks.",
    client: "Logistics & Transport",
    platform: "IoT / AWS / React",
    geography: "15% Fuel Reduction",
    image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    overview: "The HuTrac initiative was born from the need to modernize a legacy fleet of over 500 vehicles. The objective was to create a centralized platform that could handle high-frequency data from diverse GPS modules while providing actionable insights for fleet managers.",
    secondaryOverview: "Our team engineered a proprietary data processing pipeline that filters noise and provides sub-meter accuracy in vehicle positioning, even in urban canyons or remote terrains.",
    overviewQuote: "Developing a high-precision tracking ecosystem that eliminates blind spots in long-haul logistics and enhances driver safety.",
    challenges: [
      {
        title: "Real-Time Latency",
        desc: "Reducing data transmission lag to under 500ms for accurate vehicle tracking across remote geographical regions.",
        icon: <Activity className="w-6 h-6" />
      },
      {
        title: "Data Integrity",
        desc: "Ensuring 100% accuracy in fuel consumption reports and mileage tracking to prevent unauthorized usage.",
        icon: <Shield className="w-6 h-6" />
      },
      {
        title: "Hardware Integration",
        desc: "Synchronizing diverse GPS hardware protocols into a unified cloud dashboard for heterogeneous fleet management.",
        icon: <Database className="w-6 h-6" />
      }
    ],
    solutions: [
      {
        title: "Telematics Audit",
        desc: "Comprehensive analysis of existing fleet hardware and identification of data leakage points in the current tracking ecosystem.",
        icon: <Target className="w-5 h-5" />
      },
      {
        title: "Cloud Infrastructure Setup",
        desc: "Deploying high-availability AWS instances with MQTT brokers for efficient device-to-cloud communication.",
        icon: <Cloud className="w-5 h-5" />
      },
      {
        title: "Custom Dashboard Development",
        desc: "Building a React-based real-time dashboard with integrated Mapbox GL for precise spatial visualization.",
        icon: <BarChart3 className="w-5 h-5" />
      },
      {
        title: "Firmware Optimization",
        desc: "Optimizing GPS device firmware to reduce data packet size and improve battery life during long-haul transit.",
        icon: <Zap className="w-5 h-5" />
      }
    ],
    processSteps: [
      {
        number: "01",
        title: "Telematics Audit",
        desc: "Comprehensive analysis of existing fleet hardware and identification of data leakage points."
      },
      {
        number: "02",
        title: "Cloud Infrastructure Setup",
        desc: "Deploying high-availability AWS instances with MQTT brokers for efficient communication."
      },
      {
        number: "03",
        title: "Custom Dashboard Development",
        desc: "Building a React-based real-time dashboard with integrated Mapbox GL spatial visualization."
      },
      {
        number: "04",
        title: "Firmware Optimization",
        desc: "Optimizing GPS device firmware to reduce data packet size and improve battery life."
      }
    ],
    stats: [
      { label: "Fuel Savings", value: "15%" },
      { label: "Uptime", value: "99.9%" },
      { label: "Live Monitoring", value: "24/7" },
      { label: "Latency", value: "<1s" }
    ]
  },
  "iot-fleet-management": {
    title: "IOT - FLEET MANAGEMENT",
    tagline: "Leveraging sensor data and machine learning to optimize fleet efficiency and safety.",
    client: "Enterprise IoT",
    platform: "IoT / Cloud / Data",
    geography: "Global Operations",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    overview: "We developed a robust IoT ecosystem that monitors everything from engine health to tire pressure and driver behavior. This data is processed at the edge and in the cloud to provide a comprehensive view of fleet performance.",
    overviewQuote: "Our IoT platform provides end-to-end visibility, enabling proactive decisions based on real-time data.",
    challenges: [
      {
        title: "Device Interoperability",
        desc: "Integrating a mix of legacy hardware and new IoT sensors into a cohesive, single-source-of-truth platform.",
        icon: <Cpu className="w-6 h-6" />
      },
      {
        title: "Data Visualization",
        desc: "Designing a dashboard capable of rendering thousands of concurrent data streams without degrading front-end performance.",
        icon: <BarChart3 className="w-6 h-6" />
      },
      {
        title: "Cloud Scalability",
        desc: "Architecting a backend that can handle millions of events per hour during peak operational cycles.",
        icon: <Cloud className="w-6 h-6" />
      }
    ]
  },
  "truck-link": {
    title: "Truck Link: SaaS Logistics Optimization",
    tagline: "SaaS-based delivery management with optimized routes and real-time fleet traceability.",
    client: "Carrying & Forwarding (C&F)",
    platform: "Node JS / React / AWS",
    geography: "Regional Logistics Hubs",
    image: "https://images.unsplash.com/photo-1590243677390-21377b28f3ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    overview: "Truck Link was designed to solve the complexities of modern C&F operations. By integrating real-time routing algorithms with automated dispatch systems, we enabled the client to handle 30% more volume with the same fleet size.",
    overviewQuote: "Streamlining the last-mile delivery with precision routing and automated proof-of-delivery systems.",
    challenges: [
      {
        title: "Route Optimization",
        desc: "Developing algorithms to minimize delivery windows while accounting for varying traffic patterns and vehicle constraints.",
        icon: <Target className="w-6 h-6" />
      },
      {
        title: "Driver Adoption",
        desc: "Creating an intuitive mobile interface for drivers that works reliably in low-connectivity zones.",
        icon: <Smartphone className="w-6 h-6" />
      },
      {
        title: "Real-Time Tracking",
        desc: "Providing customers with accurate ETAs through a synchronized data pipeline from vehicle to final recipient.",
        icon: <Activity className="w-6 h-6" />
      }
    ],
    solutions: [
      {
        title: "Smart Dispatch Engine",
        desc: "Automated delivery assignment based on vehicle proximity, capacity, and route efficiency.",
        icon: <Zap className="w-5 h-5" />
      },
      {
        title: "SaaS Delivery Dashboard",
        desc: "A centralized management hub for dispatchers to monitor fleet health and delivery status in real-time.",
        icon: <BarChart3 className="w-5 h-5" />
      }
    ],
    stats: [
      { label: "Volume Increase", value: "30%" },
      { label: "Route Efficiency", value: "+25%" },
      { label: "Cost Reduction", value: "18%" },
      { label: "Accuracy", value: "99%" }
    ]
  },
  "engage-loop": {
    title: "Engage Loop: Rewards & Recognition",
    tagline: "Seamless, simplified and customizable engagement platform for enterprise workforce.",
    client: "Human Resources / Corporate",
    platform: "Node JS / React / AWS",
    geography: "Corporate Employee Base",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    overview: "Engage Loop addresses the challenge of employee retention and motivation in large organizations. We built a gamified platform that allows for real-time peer recognition, milestone rewards, and cultural alignment tracking.",
    overviewQuote: "Transforming corporate culture through continuous feedback and meaningful rewards.",
    challenges: [
      {
        title: "Platform Scalability",
        desc: "Ensuring the platform handles thousands of simultaneous interactions during peak recognition periods (e.g., quarterly reviews).",
        icon: <Cloud className="w-6 h-6" />
      },
      {
        title: "User Experience",
        desc: "Designing a rewarding experience that feels like a social network rather than a corporate tool to encourage daily usage.",
        icon: <Activity className="w-6 h-6" />
      },
      {
        title: "Data Privacy",
        desc: "Maintaining strict organizational boundaries and data privacy in a multi-tenant SaaS environment.",
        icon: <Shield className="w-6 h-6" />
      }
    ]
  },
  "logistics-courier-supply-chain": {
    title: "Logistics: Courier & Supply Chain Solution",
    tagline: "Comprehensive routing, dispatch, tracking, and proof of delivery for enterprise logistics.",
    client: "Courier & Logistics Application",
    platform: "Python / MySQL / GPT",
    geography: "Nationwide Operations",
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    overview: "This end-to-end solution provides a unified framework for managing complex courier networks. Utilizing AI for route optimization and GPT-powered customer communication, it represents the next step in logistics automation.",
    overviewQuote: "Eliminating operational inefficiencies through intelligent dispatching and real-time end-to-end traceability.",
    challenges: [
      {
        title: "Complex Routing",
        desc: "Managing dynamic route changes for hundreds of couriers simultaneously based on incoming priority requests.",
        icon: <Activity className="w-6 h-6" />
      },
      {
        title: "AI Integration",
        desc: "Implementing GPT models to handle customer support queries and provide automated delivery updates.",
        icon: <Cpu className="w-6 h-6" />
      }
    ],
    stats: [
      { label: "Turnaround Time", value: "-20%" },
      { label: "Customer Satisfaction", value: "+40%" },
      { label: "Route Optimization", value: "35%" }
    ]
  },
  "max-drive": {
    title: "Max Drive: End-to-End Fleet Solutions",
    tagline: "Driving innovation with real-time monitoring and high-fidelity vehicle traceability.",
    client: "Automotive Fleet Management",
    platform: "Flutter / Node JS / AWS",
    geography: "Multi-Region Operations",
    image: "https://images.unsplash.com/photo-1580674271209-40b48e153ff7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    overview: "Max Drive provides fleet owners with a bird's-eye view of their entire operations. From fuel management to predictive maintenance alerts, it serves as the digital backbone for large-scale transportation companies.",
    overviewQuote: "Empowering fleet operators with actionable intelligence and real-time operational visibility.",
    challenges: [
      {
        title: "Hardware Agnostic",
        desc: "Connecting to a variety of OBD-II devices and sensors across different vehicle makes and models.",
        icon: <Cpu className="w-6 h-6" />
      },
      {
        title: "Mobile First",
        desc: "Developing a robust Flutter-based mobile experience for fleet managers to monitor everything on the go.",
        icon: <Smartphone className="w-6 h-6" />
      }
    ]
  },
  "d2c-platform": {
    title: "D2C Platform: Direct-to-Consumer Excellence",
    tagline: "Streamlined operations from listing to fulfillment for modern ecommerce brands.",
    client: "D2C Brands / Startup Ecosystem",
    platform: "Python / NextJs / PostgreSQL",
    geography: "Emerging Markets",
    image: "https://images.unsplash.com/photo-1556742049-13ad733d024c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    overview: "The D2C Platform was built to level the playing field for emerging brands. By providing an integrated stack that handles everything from storefront to inventory and logistics, we enabled fast growth for new entrants.",
    overviewQuote: "Providing a robust, scalable digital foundation for the next generation of consumer brands.",
    challenges: [
      {
        title: "Market Speed",
        desc: "Allowing brands to set up and start selling within days while maintaining high performance standards.",
        icon: <Zap className="w-6 h-6" />
      },
      {
        title: "Inventory Sync",
        desc: "Real-time synchronization across multiple sales channels to prevent overselling and customer dissatisfaction.",
        icon: <Database className="w-6 h-6" />
      }
    ],
    results: [
      { title: "Rapid Deployment", desc: "Average setup time reduced from weeks to days." },
      { title: "Conversion Growth", desc: "Optimized checkout flow led to significant increase in sales." }
    ]
  }
};

export default function CaseStudyDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const study = CASE_STUDIES_DETAILS[slug as keyof typeof CASE_STUDIES_DETAILS] || CASE_STUDIES_DETAILS["shopify-fashion-storefront"];

  return (
    <div className="flex flex-col bg-white min-h-screen overflow-hidden">
      <Meta 
        title={`${study.title} | Case Study | Hutech Solutions`} 
        description={study.tagline} 
      />
      <Breadcrumbs variant="light" />
      
      {/* Hero Section */}
      <section className="bg-[#001A3D] text-white min-h-[600px] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={study.image}
            alt={study.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/90 to-transparent"></div>
        </div>
        
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-20 z-10 w-full py-24">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl space-y-10"
          >
            <Link 
              href="/resources/case-studies" 
              className="inline-flex items-center gap-3 text-[#FFAF2B] font-black text-[11px] uppercase tracking-[0.3em] hover:text-white transition-all group"
            >
              <ArrowUp className="rotate-[-90deg] group-hover:-translate-x-2 transition-transform" size={16} /> Back to All Stories
            </Link>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="w-16 h-[2px] bg-[#FFAF2B]"></span>
                <span className="text-[#FFAF2B] font-black uppercase tracking-[0.4em] text-[10px]">Case Study Analysis</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight display-font">
                {study.title.split(':').length > 1 ? (
                  <>
                    {study.title.split(':')[0]}: <br />
                    <span className="text-[#FFAF2B]">{study.title.split(':')[1]}</span>
                  </>
                ) : (
                  <>Building a Scalable <br /><span className="text-[#FFAF2B]">Digital Future.</span></>
                )}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl font-medium leading-relaxed">
                {study.tagline}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-12 pt-12 border-t border-white/10">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-[#FFAF2B] uppercase tracking-[0.3em] opacity-60">Client Domain</p>
                <p className="text-white font-bold">{study.client}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black text-[#FFAF2B] uppercase tracking-[0.3em] opacity-60">Technology Stack</p>
                <p className="text-white font-bold">{study.platform}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black text-[#FFAF2B] uppercase tracking-[0.3em] opacity-60">Key Impact</p>
                <p className="text-white font-bold">{study.geography}</p>
              </div>
            </div>
          </Motion.div>
        </div>
        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-1/3 h-full bg-[#0171c1]/5 skew-x-12 translate-x-1/2"></div>
      </section>

      {/* Project Overview */}
      <section className="py-32 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
            <div className="lg:col-span-5 space-y-10">
              <div className="w-24 h-2 bg-[#0171c1]"></div>
              <h2 className="text-4xl font-bold text-[#001A3D] display-font leading-tight tracking-tight">Project <br />Overview</h2>
              <p className="text-2xl text-gray-600 font-medium leading-relaxed italic border-l-4 border-[#FFAF2B] pl-10">
                "{study.overviewQuote}"
              </p>
            </div>
            <div className="lg:col-span-7 space-y-8">
              <p className="text-gray-500 text-lg leading-relaxed font-medium">
                {study.overview}
              </p>
              {study.secondaryOverview && (
                <p className="text-gray-500 text-lg leading-relaxed font-medium mt-6">
                  {study.secondaryOverview}
                </p>
              )}
              <div className="pt-10">
                 <Link href="/contact" className="inline-flex items-center gap-4 text-[#001A3D] font-black text-sm uppercase tracking-[0.2em] group">
                    GET SIMILAR RESULTS <ArrowRight className="group-hover:translate-x-3 transition-transform text-[#0171c1]" />
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-32 bg-gray-50/50 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10">
          <div className="text-center mb-24 space-y-6">
            <span className="text-[#0171c1] font-black uppercase tracking-[0.4em] text-[10px]">Strategic Hurdles</span>
            <h2 className="text-5xl md:text-7xl font-bold text-[#001A3D] display-font tracking-tight uppercase">Critical Challenges</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {study.challenges.map((item, i) => (
              <Motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-16 rounded-[4rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] hover:shadow-[0_48px_100px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 group border border-gray-100/50"
              >
                <div className="mb-10 w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-[#0171c1] group-hover:bg-[#0171c1] group-hover:text-white transition-all duration-500 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#001A3D] mb-4">{item.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed text-sm">
                  {item.desc}
                </p>
              </Motion.div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-full h-full bg-[#0171c1]/5 blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      </section>

      {/* Solutions Section - Custom for each if available */}
      {study.solutions && (
        <section className="py-32 bg-white">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
              <div className="lg:col-span-12 space-y-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-gray-100 pb-16">
                  <div className="space-y-6">
                    <span className="text-[#0171c1] font-black uppercase tracking-[0.4em] text-[10px]">Our Intervention</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#001A3D] display-font tracking-tight">Solution Provided</h2>
                  </div>
                  <p className="text-gray-500 font-medium max-w-xl text-xl leading-relaxed">
                    Our engineering team collaborated closely with the client to implement these high-impact solutions.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-20">
                  {study.solutions.map((sol, i) => (
                    <div key={i} className="space-y-8 group">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-[#0171c1] group-hover:bg-[#0171c1] group-hover:text-white transition-all duration-500 shadow-sm">
                          {sol.icon}
                        </div>
                        <div className="w-12 h-1 bg-[#FFAF2B] group-hover:w-24 transition-all duration-700"></div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-[#001A3D]">{sol.title}</h3>
                        <p className="text-gray-500 leading-relaxed font-medium text-lg">
                          {sol.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Implementation Process Section */}
      {study.processSteps && (
        <section className="py-32 bg-white">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
              <div className="lg:col-span-4">
                <div className="sticky top-32 space-y-8">
                  <h2 className="text-5xl font-bold text-[#001A3D] display-font tracking-tight uppercase">Execution <br />Strategy</h2>
                  <p className="text-xl text-gray-500 font-medium leading-relaxed">
                    The project was carried out in organized stages to guarantee quality and conformity with brand standards.
                  </p>
                  <div className="p-10 bg-[#001A3D] text-white rounded-[2.5rem] space-y-6 shadow-2xl">
                    <Zap className="text-[#FFAF2B] w-8 h-8" />
                    <h4 className="font-bold text-2xl display-font">Agile Methodology</h4>
                    <p className="text-base opacity-70 font-medium leading-relaxed">Quickly evaluating plugins and third-party apps, adapting to evolving needs through continuous optimization.</p>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-8 space-y-16">
                {study.processSteps.map((step, i) => (
                  <div key={i} className="flex gap-10 group">
                    <div className="text-6xl font-black text-gray-100 group-hover:text-[#FFAF2B] transition-colors display-font shrink-0">
                      {step.number}
                    </div>
                    <div className="pt-2 space-y-6 border-b border-gray-100 pb-16 w-full">
                      <h3 className="text-3xl font-bold text-[#001A3D] display-font tracking-tight">{step.title}</h3>
                      <p className="text-gray-500 font-medium leading-relaxed text-xl italic">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section - Specific to some */}
      {study.stats && (
        <section className="py-32 bg-[#0171c1] text-white overflow-hidden relative">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24">
              {study.stats.map((stat, i) => (
                <div key={i} className="space-y-4 text-center lg:text-left">
                  <div className="text-6xl md:text-8xl font-black text-[#FFAF2B] display-font tracking-tighter">{stat.value}</div>
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/3"></div>
        </section>
      )}

      {/* Final Results for Shopify style */}
      {study.results && (
        <section className="py-32 bg-[#001A3D] text-white relative overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10">
            <div className="max-w-4xl space-y-20">
              <h2 className="text-5xl md:text-8xl font-bold display-font tracking-tight uppercase">Results & <br /><span className="text-[#FFAF2B]">Outcomes.</span></h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16">
                {study.results.map((res, i) => (
                  <div key={i} className="space-y-6">
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 bg-[#FFAF2B]/20 rounded-xl flex items-center justify-center text-[#FFAF2B]">
                        <CheckCircle2 size={24} />
                      </div>
                      <h4 className="font-bold text-2xl display-font uppercase tracking-tight">{res.title}</h4>
                    </div>
                    <p className="text-gray-400 font-medium leading-relaxed text-xl">
                      {res.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-20 opacity-5">
             <BarChart3 size={500} />
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 text-center relative z-10">
          <div className="bg-gray-50 rounded-[4rem] p-16 lg:p-32 flex flex-col lg:flex-row justify-between items-center gap-16 border border-gray-100 shadow-sm">
            <div className="max-w-2xl space-y-8 text-center lg:text-left">
              <h2 className="text-5xl md:text-7xl font-bold text-[#001A3D] display-font leading-tight tracking-tight uppercase">Ready to <br /><span className="text-[#0171c1]">Scale?</span></h2>
              <p className="text-2xl text-gray-500 font-medium leading-relaxed">Let our engineering experts build your next-gen digital ecosystem with precision and peak performance.</p>
            </div>
            <Link href="/contact" className="bg-[#001A3D] text-white px-16 py-8 font-black uppercase tracking-[0.3em] text-[11px] hover:bg-[#0171c1] transition-all rounded-[1rem] flex items-center gap-4 shadow-2xl group h-20">
              DISCUSS YOUR PROJECT <MoveRight className="group-hover:translate-x-3 transition-transform" size={20} />
            </Link>
          </div>

          <Motion.button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group mt-24 flex flex-col items-center gap-6 mx-auto"
            whileHover={{ y: -10 }}
          >
            <div className="w-16 h-16 rounded-full border-2 border-gray-100 flex items-center justify-center text-[#0171c1] group-hover:bg-[#001A3D] group-hover:text-white group-hover:border-[#001A3D] transition-all duration-700 shadow-sm">
              <ArrowUp size={24} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#001A3D] opacity-40 group-hover:opacity-100 transition-opacity">Back to top</span>
          </Motion.button>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gray-50/50 -z-10 translate-y-1/2 rounded-t-[100%] blur-[120px]"></div>
      </section>
    </div>
  );
}
