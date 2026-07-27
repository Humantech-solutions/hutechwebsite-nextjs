export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  listClient?: string;
  listDesc?: string;
  impact: string;
  image: string;
  tags: string[];
  category: string;
  heroImage: string;
  shortDesc: string;
  clientDomain: string;
  platform: string;
  geography: string;
  overviewQuote: string;
  overviewText: string[];
  challenges: {
    title: string;
    desc: string;
    icon: string;
  }[];
  solutions: {
    title: string;
    desc: string;
    icon: string;
  }[];
  process: {
    number: string;
    title: string;
    desc: string;
  }[];
  results: {
    title: string;
    desc: string;
  }[];
  ctaTitle?: string;
  ctaDesc?: string;
  ctaBtnText?: string;
  ctaBtnLink?: string;
  screens?: any[];
  downloadBtnText?: string;
  caseStudyPdf?: string;
  projectOverview?: string;
  img1?: string;
  img2?: string;
  challengesTitle?: string;
  solutionsTitle?: string;
  projectOverviewTitle?: string;
  screensTopTitle?: string;
  screensTitle?: string;
  screensDesc?: string;
  challengesTopTitle?: string;
  challengesSectionTitle?: string;
  challengesDesc?: string;
  processTopTitle?: string;
  processTitle?: string;
  techTopTitle?: string;
  techTitle?: string;
  techDesc?: string;
  techCards?: { title: string; desc: string; icon: string; gradient: string }[];
  techStackTopTitle?: string;
  techStackTitle?: string;
  techStackDesc?: string;
  techStackItems?: { name: string; logo: string }[];
  resultsTitle?: string;
};

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "shopify-fashion-storefront": {
    slug: "shopify-fashion-storefront",
    title: "Building a Scalable Shopify Fashion Storefront",
    client: "Global Fashion Brand Storefront on Shopify",
    impact: "Seamless Data Validation & Brand-Consistent Design",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    tags: ["Shopify", "Ecommerce", "Fashion"],
    category: "Ecommerce",
    heroImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    shortDesc: "Establishing international fashion brand presence with seamless data validation and brand-consistent digital architecture.",
    clientDomain: "Global Fashion Retail",
    platform: "Shopify Plus",
    geography: "Global / Indonesia",
    overviewQuote: "Developing a brand-consistent, aesthetically pleasing storefront that satisfies local regulations and provide a seamless purchasing experience.",
    overviewText: [
      "The client is an Indonesian digital solutions firm assisting global fashion brands with e-commerce setups. The initiative aimed at establishing Shopify, linking it with the client's current elements for seamless data validation, and developing and personalizing Shopify storefronts for multiple international clothing brands.",
      "Our objective was to bridge the gap between complex back-end requirements and the high-fidelity design standards expected by global luxury and fashion houses, ensuring technical resilience at scale."
    ],
    challenges: [
      {
        title: "Brand Consistency",
        desc: "Developing a retail space that adhered to international brand standards. The storefront had to adhere closely to the defined visual identity of global fashion brands.",
        icon: "Target"
      },
      {
        title: "Cross-Device Experience",
        desc: "Guaranteeing a seamless and uniform user experience across desktop, tablet, and mobile platforms with quick interactions.",
        icon: "Smartphone"
      },
      {
        title: "Regional Adaptation",
        desc: "Overseeing regional adaptation, including localization and market-specific settings, while ensuring quick loading speeds.",
        icon: "Globe"
      }
    ],
    solutions: [
      {
        title: "Customized Storefront Development",
        desc: "Created and developed a completely customized Shopify storefront that adhered closely to international brand standards.",
        icon: "Zap"
      },
      {
        title: "User Experience Optimization",
        desc: "Enhanced page layouts and navigation systems to facilitate user access to collections, product discovery, and purchase completion.",
        icon: "Smartphone"
      },
      {
        title: "Regional & Localization Engine",
        desc: "Established region-specific settings to address localization needs, including language, currency, and market-specific configurations.",
        icon: "Globe"
      },
      {
        title: "Synchronization & Stability Framework",
        desc: "Synchronized the Indonesian storefront revisions according to a set scope and timeline, ensuring stability and uniformity.",
        icon: "CheckCircle2"
      }
    ],
    process: [
      {
        number: "01",
        title: "Requirements & Brand Alignment",
        desc: "In-depth grasp of requirements and brand alignment, examining global brand guidelines."
      },
      {
        number: "02",
        title: "Shopify Storefront Development",
        desc: "Development and customization on Shopify, emphasizing layout design and tailored features."
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
      {
        title: "Brand Quality Elevated",
        desc: "Cohesive look and feel aligned with global brand guidelines across all pages."
      },
      {
        title: "Improved Usability",
        desc: "Notable improvements in navigation allowing customers to browse and purchase seamlessly."
      },
      {
        title: "Scalable Solution",
        desc: "Designed for growth, enabling efficient regional management and future expansion."
      },
      {
        title: "Sync & Stability",
        desc: "Synchronized revisions ensuring stability and uniformity with global site updates."
      }
    ]
  },
  "hutrac-gps-fleet": {
    slug: "hutrac-gps-fleet",
    title: "Hutrac: Next-Gen GPS Fleet Solutions",
    client: "Smarter tracking for smarter decisions",
    impact: "Live GPS Tracking & Sensor-Driven Insights",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    tags: ["Angular", "React JS", "AWS", "AI & Analytics"],
    category: "IoT & AI",
    heroImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    shortDesc: "Revolutionizing fleet management with real-time tracking, intelligent sensors, and predictive analytics.",
    clientDomain: "Logistics & Transportation",
    platform: "AWS IoT Core / React / Node.js",
    geography: "Pan-India Operations",
    overviewQuote: "Optimizing fleet performance through data-driven intelligence and real-time operational visibility.",
    overviewText: [
      "Hutrac is an advanced GPS fleet management system designed to solve complex logistics challenges. The platform provides end-to-end visibility into vehicle movements, fuel consumption, and driver behavior.",
      "Our team built a robust IoT infrastructure capable of handling high-velocity data streams from thousands of devices, translating raw telemetry into actionable business insights."
    ],
    challenges: [
      {
        title: "Real-time Latency",
        desc: "Ensuring sub-second tracking updates across varying network conditions in remote areas.",
        icon: "Zap"
      },
      {
        title: "Data Scale",
        desc: "Processing millions of GPS pings and sensor events daily without system degradation.",
        icon: "Database"
      },
      {
        title: "Sensor Integration",
        desc: "Integrating diverse hardware for fuel, temperature, and door-open sensors into a unified dashboard.",
        icon: "Cpu"
      }
    ],
    solutions: [
      {
        title: "Edge Gateway Optimization",
        desc: "Implemented intelligent data buffering at the device level to handle intermittent connectivity.",
        icon: "Zap"
      },
      {
        title: "Serverless Analytics",
        desc: "Leveraged AWS Lambda and Kinesis for cost-effective, real-time data processing and alerting.",
        icon: "ShieldCheck"
      },
      {
        title: "Advanced Geofencing",
        desc: "Developed a high-performance geofencing engine for instant alerts on route deviations.",
        icon: "MapPin"
      },
      {
        title: "Predictive Maintenance",
        desc: "Built AI models to predict vehicle breakdowns based on historical engine telemetry.",
        icon: "BarChart3"
      }
    ],
    process: [
      {
        number: "01",
        title: "IoT Architecture Design",
        desc: "Designing a scalable MQTT-based communication layer for reliable device-to-cloud sync."
      },
      {
        number: "02",
        title: "Cloud Infrastructure Setup",
        desc: "Provisioning resilient AWS resources with multi-region failover capabilities."
      },
      {
        number: "03",
        title: "Dashboard Development",
        desc: "Creating high-fidelity real-time maps and analytics dashboards for fleet managers."
      },
      {
        number: "04",
        title: "Mobile App Rollout",
        desc: "Launching companion apps for drivers and fleet owners with push notification systems."
      }
    ],
    results: [
      {
        title: "20% Fuel Savings",
        desc: "Significant reduction in fuel theft and idling through precise monitoring."
      },
      {
        title: "Real-time Visibility",
        desc: "100% fleet coverage with accurate live location and ETA updates."
      },
      {
        title: "Operational Efficiency",
        desc: "Streamlined dispatch operations and reduced manual record-keeping by 80%."
      },
      {
        title: "Enhanced Safety",
        desc: "Improved driver behavior and reduced accident rates through harsh-braking alerts."
      }
    ]
  }
};

export const CATEGORIES = ["All", "Ecommerce", "Logistics", "IoT & AI", "Product"];
