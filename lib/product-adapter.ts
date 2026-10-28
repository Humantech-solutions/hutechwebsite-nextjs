import { ModernProductData } from "@/components/products/ModernProductTemplate";
import { PRODUCT_1_DATA } from "@/lib/product-1-data";

export interface Product {
  title: string;
  category: string;
  heroImage?: string;
  description: string;
  stats?: { label: string; value: string }[];
  overviewDetails?: { summary?: string };
  keyFeaturesList?: Array<{ id: string; title: string; description: string; tag: string }>;
  businessBenefits?: Array<{ metric: string; metricLabel: string; title: string; description: string }>;
  howItWorksWorkflow?: Array<{ step: number; title: string; subtitle: string; description: string; latency: string; highlights: string[]; techPills: string[] }>;
  useCasesList?: Array<{ id: string; title: string; industry: string; challenge: string; solution: string; impact: string; metrics: { label: string; value: string }[] }>;
  industriesList?: Array<{ name: string; description: string; metric: string; compliancePills: string[]; iconName: string }>;
  faqsList?: Array<{ question: string; answer: string; category?: string }>;
}

export function mapProductToModernData(product: Product, id?: string): ModernProductData {
  if (id === "product-1") {
    return PRODUCT_1_DATA;
  }

  return {
    hero: {
      badge: (product.category || "ENTERPRISE PLATFORM").toUpperCase(),
      titleLine1: product.title.split(" ")[0] || "Next-Gen",
      titleLine2: product.title.split(" ").slice(1).join(" ") || "Platform",
      titleItalic: "effortless.",
      description:
        product.overviewDetails?.summary ||
        product.description ||
        "Next-generation intelligent platform engineered for scalable enterprise operations and resilient infrastructure.",
      primaryCtaText: `Explore ${product.title}`,
      primaryCtaUrl: "/contact",
      secondaryCtaText: "See how it works",
      ratingScore: "4.9/5",
      ratingText: "from 1,500+ global deployments",
      dashboard: {
        velocity: product.stats?.[0]?.value || "99.99%",
        velocityDelta: "+14.2%",
        activeTasks: product.stats?.[2]?.value || "100k+ Nodes",
        activeTasksDelta: "+8.4%",
        timeSavedWeekly: `MTTR Response: ${product.stats?.[1]?.value || "< 90s"}`,
        activeTaskTitle: "Automated threat quarantine",
        activeTaskSubtitle: "Zero-touch micro-isolation",
      },
    },
    overview: {
      sectionTag: "PRODUCT / 01",
      sectionTitle: "PRODUCT OVERVIEW",
      headlineLine1: "One platform.",
      headlineItalic: "Every possibility.",
      description:
        product.overviewDetails?.summary ||
        product.description ||
        "The intelligent operating layer for modern enterprise architectures. Replaces fragmented point tools with unified, measurable workflows.",
      stat1Value: product.stats?.[0]?.value || "3.2×",
      stat1Label: product.stats?.[0]?.label || "FASTER DELIVERY",
      stat2Value: product.stats?.[3]?.value || product.stats?.[1]?.value || "42%",
      stat2Label: product.stats?.[3]?.label || product.stats?.[1]?.label || "TCO REDUCTION",
    },
    features: {
      sectionTag: "CAPABILITY / 02",
      sectionTitle: "KEY FEATURES",
      headlinePrefix: "Built for the way",
      headlineItalic: "great teams work.",
      description:
        "Powerful enough for your most complex multi-cloud processes. Simple and intuitive enough for everyone to use.",
      cards: (product.keyFeaturesList && product.keyFeaturesList.length >= 4
        ? product.keyFeaturesList.slice(0, 4)
        : [
            {
              id: "1",
              title: "Unified workspace",
              description: "Bring scattered tools, context, and decisions into one beautifully organized command center.",
              tag: "Platform",
            },
            {
              id: "2",
              title: "Intelligent automation",
              description: "Build reliable workflows that remove repetitive work without losing human oversight.",
              tag: "Automation",
            },
            {
              id: "3",
              title: "Real-time intelligence",
              description: "Turn live operational data into clear signals your team can act on immediately.",
              tag: "Analytics",
            },
            {
              id: "4",
              title: "Enterprise controls",
              description: "Scale confidently with granular permissions, audit trails, and policy management.",
              tag: "Governance",
            },
          ]
      ).map((item, idx) => ({
        number: `0${idx + 1}`,
        title: item.title,
        description: item.description,
        iconType: (["concentric", "diamond", "square", "rings"] as const)[idx % 4],
      })),
    },
    benefits: {
      sectionTag: "IMPACT / 03",
      sectionTitle: "BENEFITS & BUSINESS VALUE",
      headlineLine1: "Less friction.",
      headlineItalic: "More momentum.",
      description: "Transform day-to-day operations into measurable, compounding business advantage.",
      donutStat: product.businessBenefits?.[0]?.metric || "67%",
      donutLabel: product.businessBenefits?.[0]?.metricLabel || "FEWER DECISIONS",
      card1Title: product.businessBenefits?.[0]?.title || "Move at market speed",
      card1Description:
        product.businessBenefits?.[0]?.description ||
        "Shared context and live insights shorten the distance between signal and action.",
      card2Title: product.businessBenefits?.[1]?.title || "Do more with every hour",
      card2Description:
        product.businessBenefits?.[1]?.description ||
        "Automate repetitive operational work and give teams more room for high-value thinking.",
      card2Stat: product.businessBenefits?.[1]?.metric || "12.5k",
      card2StatLabel: product.businessBenefits?.[1]?.metricLabel || "HOURS RECLAIMED / YR",
      card3Title: product.businessBenefits?.[2]?.title || "Scale without the drag",
      card3Description:
        product.businessBenefits?.[2]?.description ||
        "Standardize what matters while keeping distributed teams flexible, creative, and fast.",
    },
    howItWorks: {
      sectionTag: "WORKFLOW / 04",
      sectionTitle: "HOW IT WORKS",
      headlinePrefix: "From scattered to",
      headlineItalic: "streamlined.",
      description: `Connect your systems, design your flow, and let ${product.title} keep work moving smoothly.`,
      steps: (product.howItWorksWorkflow && product.howItWorksWorkflow.length >= 3
        ? product.howItWorksWorkflow.slice(0, 3)
        : [
            {
              step: 1,
              title: "Connect",
              subtitle: "Phase 1",
              description: "Link the tools, APIs, and data streams your teams already rely on.",
              latency: "< 5ms",
              highlights: [],
              techPills: [],
            },
            {
              step: 2,
              title: "Compose",
              subtitle: "Phase 2",
              description: "Shape your ideal workflow with intuitive building blocks and cognitive rules.",
              latency: "< 12ms",
              highlights: [],
              techPills: [],
            },
            {
              step: 3,
              title: "Activate",
              subtitle: "Phase 3",
              description: "Launch, learn, and continuously improve with real-time live telemetry insights.",
              latency: "< 60ms",
              highlights: [],
              techPills: [],
            },
          ]
      ).map((st, idx) => ({
        number: `0${idx + 1}`,
        title: st.title,
        description: st.description,
        activeStep: (idx + 1) as 1 | 2 | 3,
      })),
    },
    useCases: {
      sectionTag: "SOLUTIONS / 05",
      sectionTitle: "USE CASES",
      headlinePrefix: "Whatever the work,",
      headlineItalic: "make it flow.",
      cards: (product.useCasesList && product.useCasesList.length >= 3
        ? product.useCasesList.slice(0, 3)
        : [
            {
              id: "1",
              title: "Revenue operations",
              industry: "General",
              challenge: "",
              solution: "",
              impact: "",
              metrics: [],
            },
            {
              id: "2",
              title: "Service delivery",
              industry: "General",
              challenge: "",
              solution: "",
              impact: "",
              metrics: [],
            },
            {
              id: "3",
              title: "Business operations",
              industry: "General",
              challenge: "",
              solution: "",
              impact: "",
              metrics: [],
            },
          ]
      ).map((uc, idx) => ({
        number: `0${idx + 1}`,
        title: uc.title,
        description: uc.solution || uc.impact || "Orchestrate consistent, high-quality client experiences.",
        pills: uc.metrics && uc.metrics.length > 0 ? uc.metrics.map((m) => `${m.label}: ${m.value}`) : ["High Efficiency", "Real-Time Tracking"],
      })),
    },
    industries: {
      sectionTag: "EXPERTISE / 06",
      sectionTitle: "INDUSTRIES WE SERVE",
      headlinePrefix: "Built for your\nreal-world",
      headlineItalic: "complexity.",
      description: "Flexible foundations, tailored patterns, and controls for the way your industry works.",
      items: (product.industriesList && product.industriesList.length >= 5
        ? product.industriesList.slice(0, 5)
        : [
            { name: "Financial services", description: "Governance without slowing growth.", metric: "", compliancePills: [], iconName: "Building2" },
            { name: "Healthcare & life sciences", description: "Connected care, protected data.", metric: "", compliancePills: [], iconName: "HeartPulse" },
            { name: "Technology & software", description: "Build and scale at full speed.", metric: "", compliancePills: [], iconName: "Factory" },
            { name: "Professional services", description: "Deliver excellence, consistently.", metric: "", compliancePills: [], iconName: "ShoppingCart" },
            { name: "Retail & commerce", description: "Know customers. Move inventory.", metric: "", compliancePills: [], iconName: "Truck" },
          ]
      ).map((item, idx) => ({
        number: `0${idx + 1}`,
        name: item.name,
        tagline: item.description,
      })),
    },
    technicalSpecs: {
      sectionTag: "DETAILS / 07",
      sectionTitle: "TECHNICAL SPECIFICATIONS",
      headlinePrefix: "Engineered for",
      headlineItalic: "enterprise scale.",
      specs: [
        {
          number: "01",
          category: "Platform",
          details: "Cloud-native, multi-region architecture",
          metric: "99.99% availability",
        },
        {
          number: "02",
          category: "Performance",
          details: "Global edge network, intelligent caching",
          metric: "Sub-200ms response",
        },
        {
          number: "03",
          category: "Data",
          details: "Structured & unstructured, real-time sync",
          metric: "Unlimited records",
        },
        {
          number: "04",
          category: "Extensibility",
          details: "REST API, webhooks, custom functions",
          metric: "SDKs for JS & Python",
        },
        {
          number: "05",
          category: "Administration",
          details: "Central controls, usage analytics",
          metric: "Granular RBAC",
        },
      ],
    },
    integrations: {
      sectionTag: "ECOSYSTEM / 08",
      sectionTitle: "INTEGRATIONS & COMPATIBILITY",
      headlinePrefix: "Plays well with",
      headlineItalic: "everything.",
      description: `Connect ${product.title} to the tools your teams love. Sync data, trigger actions, and build a truly connected stack.`,
      buttonText: "View all integrations →",
      buttonUrl: "/contact",
    },
    security: {
      sectionTag: "TRUST / 09",
      sectionTitle: "SECURITY & COMPLIANCE",
      headlinePrefix: "Your trust is",
      headlineItalic: "our architecture.",
      description:
        "Security isn't a feature we add. It's the foundation we build on—from infrastructure to every interaction.",
      pillars: [
        {
          number: "01",
          title: "Enterprise-grade encryption",
          description: "AES-256 at rest and TLS 1.3 in transit.",
        },
        {
          number: "02",
          title: "Identity & access",
          description: "SAML, SSO, SCIM, MFA, and granular RBAC.",
        },
        {
          number: "03",
          title: "Continuous protection",
          description: "24/7 monitoring, audit logs, and threat detection.",
        },
      ],
      badges: ["SOC 2 TYPE II", "ISO 27001", "GDPR COMPLIANT", "HIPAA READY"],
    },
    faqs: {
      sectionTag: "SUPPORT / 10",
      sectionTitle: "FREQUENTLY ASKED QUESTIONS (FAQS)",
      headlinePrefix: "Good questions.",
      headlineItalic: "Clear answers.",
      description: "Still curious? Our product specialists are here to help.",
      contactText: "Talk to an expert",
      contactUrl: "/contact",
      items: (product.faqsList && product.faqsList.length >= 4
        ? product.faqsList.slice(0, 4)
        : [
            {
              question: "How quickly can our team get started?",
              answer:
                "Most teams launch their first workspace in under a day. Our guided setup, templates, and import tools make onboarding fast and low-risk.",
              category: "Deployment",
            },
            {
              question: `Can ${product.title} replace our existing tools?`,
              answer: `Yes, or it can seamlessly orchestrate them. ${product.title} is designed to either unify point tools or act as the coordinating intelligence layer over your existing software stack.`,
              category: "Deployment",
            },
            {
              question: "Is it suitable for enterprise organizations?",
              answer:
                "Absolutely. Built with multi-region redundancy, granular RBAC, SSO/SCIM integration, and compliant with SOC 2 Type II, ISO 27001, and HIPAA.",
              category: "Deployment",
            },
            {
              question: "What support is included?",
              answer:
                "Every enterprise tier includes dedicated solution architect onboarding, 24/7 priority SLA support, and regular architecture reviews.",
              category: "Deployment",
            },
          ]
      ).map((f, idx) => ({
        number: `0${idx + 1}`,
        question: f.question,
        answer: f.answer,
      })),
    },
    ctaBanner: {
      tag: "READY WHEN YOU ARE",
      headlineLine1: "Turn your best ideas",
      headlineLine2: "into",
      headlineItalic: "real momentum.",
      description: `See how ${product.title} can transform the way your organization works.`,
      buttonText: "Book your personalized demo",
      buttonUrl: "/contact",
    },
  };
}
