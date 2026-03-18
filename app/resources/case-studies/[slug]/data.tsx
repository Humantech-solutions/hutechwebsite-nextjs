import {
  Target,
  Smartphone,
  Globe,
  Zap,
  CheckCircle2,
  Activity,
  Shield,
  Database,
  Cloud,
  BarChart3,
  Cpu,
} from "lucide-react";
import React from "react";

export interface CaseStudy {
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

export const CASE_STUDIES_DETAILS: Record<string, CaseStudy> = {
  "shopify-fashion-storefront": {
    title: "Building a Scalable Shopify Fashion Storefront",
    tagline:
      "Establishing international fashion brand presence with seamless data validation and brand-consistent digital architecture.",
    client: "Global Fashion Retail",
    platform: "Shopify Plus",
    geography: "Global / Indonesia",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    overview:
      "The client is an Indonesian digital solutions firm assisting global fashion brands with e-commerce setups. The initiative aimed at establishing Shopify, linking it with the client's current elements for seamless data validation, and developing and personalizing Shopify storefronts for multiple international clothing brands.",
    secondaryOverview:
      "Our objective was to bridge the gap between complex back-end requirements and the high-fidelity design standards expected by global luxury and fashion houses, ensuring technical resilience at scale.",
    overviewQuote:
      "Developing a brand-consistent, aesthetically pleasing storefront that satisfies local regulations and provide a seamless purchasing experience.",
    challenges: [
      {
        title: "Brand Consistency",
        desc: "Developing a retail space that adhered to international brand standards. The storefront had to adhere closely to the defined visual identity of global fashion brands.",
        icon: <Target className="h-6 w-6" />,
      },
      {
        title: "Cross-Device Experience",
        desc: "Guaranteeing a seamless and uniform user experience across desktop, tablet, and mobile platforms with quick interactions and straightforward navigation.",
        icon: <Smartphone className="h-6 w-6" />,
      },
      {
        title: "Regional Adaptation",
        desc: "Overseeing regional adaptation, including localization and market-specific settings, while ensuring quick loading speeds for the Indonesian market.",
        icon: <Globe className="h-6 w-6" />,
      },
    ],
    solutions: [
      {
        title: "Customized Storefront Development",
        desc: "Created a completely customized Shopify storefront that adhered closely to international brand standards, maintaining uniformity in visuals and typography.",
        icon: <Zap className="h-5 w-5" />,
      },
      {
        title: "User Experience Optimization",
        desc: "Enhanced page layouts and navigation systems to facilitate user access to collections, product discovery, and purchase completion.",
        icon: <Smartphone className="h-5 w-5" />,
      },
      {
        title: "Regional & Localization Engine",
        desc: "Established region-specific settings to address localization needs, including language and currency, allowing effortless expansion.",
        icon: <Globe className="h-5 w-5" />,
      },
      {
        title: "Synchronization & Stability Framework",
        desc: "Synchronized Indonesian storefront revisions according to a set scope and timeline, ensuring stability and uniformity with global updates.",
        icon: <CheckCircle2 className="h-5 w-5" />,
      },
    ],
    processSteps: [
      {
        number: "01",
        title: "Requirements & Brand Alignment",
        desc: "In-depth grasp of requirements and brand alignment, examining global brand guidelines.",
      },
      {
        number: "02",
        title: "Shopify Storefront Development",
        desc: "Development and customization on Shopify, emphasizing layout design and navigation.",
      },
      {
        number: "03",
        title: "Multi-Device & Region Validation",
        desc: "Evaluations performed across various devices and locations to guarantee uniform performance.",
      },
      {
        number: "04",
        title: "Deployment & Handover",
        desc: "Finished storefront released and presented to the client with essential documentation.",
      },
      {
        number: "05",
        title: "Agile Execution & Optimization",
        desc: "Quickly evaluating plugins and third-party apps, adapting to evolving needs.",
      },
    ],
    results: [
      {
        title: "Brand Quality Elevated",
        desc: "Cohesive look and feel aligned with global brand guidelines across all pages.",
      },
      {
        title: "Improved Usability",
        desc: "Notable improvements in navigation allowing customers to browse and purchase seamlessly.",
      },
      {
        title: "Scalable Solution",
        desc: "Designed for growth, enabling efficient regional management and future expansion.",
      },
      {
        title: "Sync & Stability",
        desc: "Synchronized revisions ensuring stability and uniformity with global site updates.",
      },
    ],
  },
  "hutrac-gps-fleet": {
    title: "HuTrac: Next-Gen GPS Fleet Solutions",
    tagline:
      "Transforming logistics with high-precision telematics and predictive maintenance frameworks.",
    client: "Logistics & Transport",
    platform: "IoT / AWS / React",
    geography: "15% Fuel Reduction",
    image:
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    overview:
      "The HuTrac initiative was born from the need to modernize a legacy fleet of over 500 vehicles. The objective was to create a centralized platform that could handle high-frequency data from diverse GPS modules while providing actionable insights for fleet managers.",
    secondaryOverview:
      "Our team engineered a proprietary data processing pipeline that filters noise and provides sub-meter accuracy in vehicle positioning, even in urban canyons or remote terrains.",
    overviewQuote:
      "Developing a high-precision tracking ecosystem that eliminates blind spots in long-haul logistics and enhances driver safety.",
    challenges: [
      {
        title: "Real-Time Latency",
        desc: "Reducing data transmission lag to under 500ms for accurate vehicle tracking across remote geographical regions.",
        icon: <Activity className="h-6 w-6" />,
      },
      {
        title: "Data Integrity",
        desc: "Ensuring 100% accuracy in fuel consumption reports and mileage tracking to prevent unauthorized usage.",
        icon: <Shield className="h-6 w-6" />,
      },
      {
        title: "Hardware Integration",
        desc: "Synchronizing diverse GPS hardware protocols into a unified cloud dashboard for heterogeneous fleet management.",
        icon: <Database className="h-6 w-6" />,
      },
    ],
    solutions: [
      {
        title: "Telematics Audit",
        desc: "Comprehensive analysis of existing fleet hardware and identification of data leakage points in the current tracking ecosystem.",
        icon: <Target className="h-5 w-5" />,
      },
      {
        title: "Cloud Infrastructure Setup",
        desc: "Deploying high-availability AWS instances with MQTT brokers for efficient device-to-cloud communication.",
        icon: <Cloud className="h-5 w-5" />,
      },
      {
        title: "Custom Dashboard Development",
        desc: "Building a React-based real-time dashboard with integrated Mapbox GL for precise spatial visualization.",
        icon: <BarChart3 className="h-5 w-5" />,
      },
      {
        title: "Firmware Optimization",
        desc: "Optimizing GPS device firmware to reduce data packet size and improve battery life during long-haul transit.",
        icon: <Zap className="h-5 w-5" />,
      },
    ],
    processSteps: [
      {
        number: "01",
        title: "Telematics Audit",
        desc: "Comprehensive analysis of existing fleet hardware and identification of data leakage points.",
      },
      {
        number: "02",
        title: "Cloud Infrastructure Setup",
        desc: "Deploying high-availability AWS instances with MQTT brokers for efficient communication.",
      },
      {
        number: "03",
        title: "Custom Dashboard Development",
        desc: "Building a React-based real-time dashboard with integrated Mapbox GL spatial visualization.",
      },
      {
        number: "04",
        title: "Firmware Optimization",
        desc: "Optimizing GPS device firmware to reduce data packet size and improve battery life.",
      },
    ],
    stats: [
      { label: "Fuel Savings", value: "15%" },
      { label: "Uptime", value: "99.9%" },
      { label: "Live Monitoring", value: "24/7" },
      { label: "Latency", value: "<1s" },
    ],
  },
  "iot-fleet-management": {
    title: "IOT - FLEET MANAGEMENT",
    tagline: "Leveraging sensor data and machine learning to optimize fleet efficiency and safety.",
    client: "Enterprise IoT",
    platform: "IoT / Cloud / Data",
    geography: "Global Operations",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    overview:
      "We developed a robust IoT ecosystem that monitors everything from engine health to tire pressure and driver behavior. This data is processed at the edge and in the cloud to provide a comprehensive view of fleet performance.",
    overviewQuote:
      "Our IoT platform provides end-to-end visibility, enabling proactive decisions based on real-time data.",
    challenges: [
      {
        title: "Device Interoperability",
        desc: "Integrating a mix of legacy hardware and new IoT sensors into a cohesive, single-source-of-truth platform.",
        icon: <Cpu className="h-6 w-6" />,
      },
      {
        title: "Data Visualization",
        desc: "Designing a dashboard capable of rendering thousands of concurrent data streams without degrading front-end performance.",
        icon: <BarChart3 className="h-6 w-6" />,
      },
      {
        title: "Cloud Scalability",
        desc: "Architecting a backend that can handle millions of events per hour during peak operational cycles.",
        icon: <Cloud className="h-6 w-6" />,
      },
    ],
  },
  "truck-link": {
    title: "Truck Link: SaaS Logistics Optimization",
    tagline:
      "SaaS-based delivery management with optimized routes and real-time fleet traceability.",
    client: "Carrying & Forwarding (C&F)",
    platform: "Node JS / React / AWS",
    geography: "Regional Logistics Hubs",
    image:
      "https://images.unsplash.com/photo-1590243677390-21377b28f3ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    overview:
      "Truck Link was designed to solve the complexities of modern C&F operations. By integrating real-time routing algorithms with automated dispatch systems, we enabled the client to handle 30% more volume with the same fleet size.",
    overviewQuote:
      "Streamlining the last-mile delivery with precision routing and automated proof-of-delivery systems.",
    challenges: [
      {
        title: "Route Optimization",
        desc: "Developing algorithms to minimize delivery windows while accounting for varying traffic patterns and vehicle constraints.",
        icon: <Target className="h-6 w-6" />,
      },
      {
        title: "Driver Adoption",
        desc: "Creating an intuitive mobile interface for drivers that works reliably in low-connectivity zones.",
        icon: <Smartphone className="h-6 w-6" />,
      },
      {
        title: "Real-Time Tracking",
        desc: "Providing customers with accurate ETAs through a synchronized data pipeline from vehicle to final recipient.",
        icon: <Activity className="h-6 w-6" />,
      },
    ],
    solutions: [
      {
        title: "Smart Dispatch Engine",
        desc: "Automated delivery assignment based on vehicle proximity, capacity, and route efficiency.",
        icon: <Zap className="h-5 w-5" />,
      },
      {
        title: "SaaS Delivery Dashboard",
        desc: "A centralized management hub for dispatchers to monitor fleet health and delivery status in real-time.",
        icon: <BarChart3 className="h-5 w-5" />,
      },
    ],
    stats: [
      { label: "Volume Increase", value: "30%" },
      { label: "Route Efficiency", value: "+25%" },
      { label: "Cost Reduction", value: "18%" },
      { label: "Accuracy", value: "99%" },
    ],
  },
  "engage-loop": {
    title: "Engage Loop: Rewards & Recognition",
    tagline: "Seamless, simplified and customizable engagement platform for enterprise workforce.",
    client: "Human Resources / Corporate",
    platform: "Node JS / React / AWS",
    geography: "Corporate Employee Base",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    overview:
      "Engage Loop addresses the challenge of employee retention and motivation in large organizations. We built a gamified platform that allows for real-time peer recognition, milestone rewards, and cultural alignment tracking.",
    overviewQuote:
      "Transforming corporate culture through continuous feedback and meaningful rewards.",
    challenges: [
      {
        title: "Platform Scalability",
        desc: "Ensuring the platform handles thousands of simultaneous interactions during peak recognition periods (e.g., quarterly reviews).",
        icon: <Cloud className="h-6 w-6" />,
      },
      {
        title: "User Experience",
        desc: "Designing a rewarding experience that feels like a social network rather than a corporate tool to encourage daily usage.",
        icon: <Activity className="h-6 w-6" />,
      },
      {
        title: "Data Privacy",
        desc: "Maintaining strict organizational boundaries and data privacy in a multi-tenant SaaS environment.",
        icon: <Shield className="h-6 w-6" />,
      },
    ],
  },
  "logistics-courier-supply-chain": {
    title: "Logistics: Courier & Supply Chain Solution",
    tagline:
      "Comprehensive routing, dispatch, tracking, and proof of delivery for enterprise logistics.",
    client: "Courier & Logistics Application",
    platform: "Python / MySQL / GPT",
    geography: "Nationwide Operations",
    image:
      "https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    overview:
      "This end-to-end solution provides a unified framework for managing complex courier networks. Utilizing AI for route optimization and GPT-powered customer communication, it represents the next step in logistics automation.",
    overviewQuote:
      "Eliminating operational inefficiencies through intelligent dispatching and real-time end-to-end traceability.",
    challenges: [
      {
        title: "Complex Routing",
        desc: "Managing dynamic route changes for hundreds of couriers simultaneously based on incoming priority requests.",
        icon: <Activity className="h-6 w-6" />,
      },
      {
        title: "AI Integration",
        desc: "Implementing GPT models to handle customer support queries and provide automated delivery updates.",
        icon: <Cpu className="h-6 w-6" />,
      },
    ],
    stats: [
      { label: "Turnaround Time", value: "-20%" },
      { label: "Customer Satisfaction", value: "+40%" },
      { label: "Route Optimization", value: "35%" },
    ],
  },
  "max-drive": {
    title: "Max Drive: End-to-End Fleet Solutions",
    tagline: "Driving innovation with real-time monitoring and high-fidelity vehicle traceability.",
    client: "Automotive Fleet Management",
    platform: "Flutter / Node JS / AWS",
    geography: "Multi-Region Operations",
    image:
      "https://images.unsplash.com/photo-1580674271209-40b48e153ff7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    overview:
      "Max Drive provides fleet owners with a bird's-eye view of their entire operations. From fuel management to predictive maintenance alerts, it serves as the digital backbone for large-scale transportation companies.",
    overviewQuote:
      "Empowering fleet operators with actionable intelligence and real-time operational visibility.",
    challenges: [
      {
        title: "Hardware Agnostic",
        desc: "Connecting to a variety of OBD-II devices and sensors across different vehicle makes and models.",
        icon: <Cpu className="h-6 w-6" />,
      },
      {
        title: "Mobile First",
        desc: "Developing a robust Flutter-based mobile experience for fleet managers to monitor everything on the go.",
        icon: <Smartphone className="h-6 w-6" />,
      },
    ],
  },
  "d2c-platform": {
    title: "D2C Platform: Direct-to-Consumer Excellence",
    tagline: "Streamlined operations from listing to fulfillment for modern ecommerce brands.",
    client: "D2C Brands / Startup Ecosystem",
    platform: "Python / NextJs / PostgreSQL",
    geography: "Emerging Markets",
    image:
      "https://images.unsplash.com/photo-1556742049-13ad733d024c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    overview:
      "The D2C Platform was built to level the playing field for emerging brands. By providing an integrated stack that handles everything from storefront to inventory and logistics, we enabled fast growth for new entrants.",
    overviewQuote:
      "Providing a robust, scalable digital foundation for the next generation of consumer brands.",
    challenges: [
      {
        title: "Market Speed",
        desc: "Allowing brands to set up and start selling within days while maintaining high performance standards.",
        icon: <Zap className="h-6 w-6" />,
      },
      {
        title: "Inventory Sync",
        desc: "Real-time synchronization across multiple sales channels to prevent overselling and customer dissatisfaction.",
        icon: <Database className="h-6 w-6" />,
      },
    ],
    results: [
      { title: "Rapid Deployment", desc: "Average setup time reduced from weeks to days." },
      {
        title: "Conversion Growth",
        desc: "Optimized checkout flow led to significant increase in sales.",
      },
    ],
  },
};
