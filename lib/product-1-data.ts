import { ModernProductData } from "@/components/products/ModernProductTemplate";

export const PRODUCT_1_DATA: ModernProductData = {
  hero: {
    badge: "THE INTELLIGENT WORK PLATFORM",
    titleLine1: "Make complex",
    titleLine2: "work feel",
    titleItalic: "effortless.",
    description:
      "LumaCore connects your people, data, and workflows in one adaptive platform—so your organization can move with clarity and speed.",
    primaryCtaText: "Explore LumaCore",
    primaryCtaUrl: "/contact",
    secondaryCtaText: "See how it works",
    ratingScore: "4.9/5",
    ratingText: "from 2,000+ modern teams",
    dashboard: {
      velocity: "94.8%",
      velocityDelta: "+12.4%",
      activeTasks: "1,284",
      activeTasksDelta: "+8.1%",
      timeSavedWeekly: "Time saved this week: 128 hours",
      activeTaskTitle: "Automated lead scoring",
      activeTaskSubtitle: "Qualify inbound leads",
    },
  },
  overview: {
    sectionTag: "PRODUCT / 01",
    sectionTitle: "PRODUCT OVERVIEW",
    headlineLine1: "One platform.",
    headlineItalic: "Every possibility.",
    description:
      "LumaCore is the intelligent operating layer for modern organizations. It replaces fragmented processes with connected, measurable workflows that keep everyone moving in the same direction.",
    stat1Value: "3.2×",
    stat1Label: "FASTER DELIVERY",
    stat2Value: "42%",
    stat2Label: "LESS BUSYWORK",
  },
  features: {
    sectionTag: "CAPABILITY / 02",
    sectionTitle: "KEY FEATURES",
    headlinePrefix: "Built for the way",
    headlineItalic: "great teams work.",
    description: "Powerful enough for your most complex processes. Simple enough for everyone to use.",
    cards: [
      {
        number: "01",
        title: "Unified workspace",
        description: "Bring scattered tools, context, and decisions into one beautifully organized command center.",
        iconType: "concentric",
      },
      {
        number: "02",
        title: "Intelligent automation",
        description: "Build reliable workflows that remove repetitive work without losing human oversight.",
        iconType: "diamond",
      },
      {
        number: "03",
        title: "Real-time intelligence",
        description: "Turn live operational data into clear signals your team can act on immediately.",
        iconType: "square",
      },
      {
        number: "04",
        title: "Enterprise controls",
        description: "Scale confidently with granular permissions, audit trails, and policy management.",
        iconType: "rings",
      },
    ],
  },
  benefits: {
    sectionTag: "IMPACT / 03",
    sectionTitle: "BENEFITS & BUSINESS VALUE",
    headlineLine1: "Less friction.",
    headlineItalic: "More momentum.",
    description: "Transform day-to-day work into measurable, compounding business advantage.",
    donutStat: "67%",
    donutLabel: "FEWER DECISIONS",
    card1Title: "Move at market speed",
    card1Description: "Shared context and live insights shorten the distance between signal and action.",
    card2Title: "Do more with every hour",
    card2Description: "Automate repetitive work and give teams more room for high-value thinking.",
    card2Stat: "12.5k",
    card2StatLabel: "HOURS RECLAIMED / YR",
    card3Title: "Scale without the drag",
    card3Description: "Standardize what matters while keeping teams flexible, creative, and fast.",
  },
  howItWorks: {
    sectionTag: "WORKFLOW / 04",
    sectionTitle: "HOW IT WORKS",
    headlinePrefix: "From scattered to",
    headlineItalic: "streamlined.",
    description: "Connect your systems, design your flow, and let LumaCore keep work moving.",
    steps: [
      {
        number: "01",
        title: "Connect",
        description: "Link the tools and data your teams already rely on.",
        activeStep: 1,
      },
      {
        number: "02",
        title: "Compose",
        description: "Shape your ideal workflow with intuitive building blocks.",
        activeStep: 2,
      },
      {
        number: "03",
        title: "Activate",
        description: "Launch, learn, and continuously improve with live insight.",
        activeStep: 3,
      },
    ],
  },
  useCases: {
    sectionTag: "SOLUTIONS / 05",
    sectionTitle: "USE CASES",
    headlinePrefix: "Whatever the work,",
    headlineItalic: "make it flow.",
    cards: [
      {
        number: "01",
        title: "Revenue operations",
        description: "Turn every customer signal into the right next action.",
        pills: ["Pipeline clarity", "Automated handoffs"],
      },
      {
        number: "02",
        title: "Service delivery",
        description: "Orchestrate consistent, high-quality client experiences.",
        pills: ["Resource planning", "Progress visibility"],
      },
      {
        number: "03",
        title: "Business operations",
        description: "Connect cross-functional work from request to result.",
        pills: ["Smart intake", "SLA monitoring"],
      },
    ],
  },
  industries: {
    sectionTag: "EXPERTISE / 06",
    sectionTitle: "INDUSTRIES WE SERVE",
    headlinePrefix: "Built for your\nreal-world",
    headlineItalic: "complexity.",
    description: "Flexible foundations, tailored patterns, and controls for the way your industry works.",
    items: [
      {
        number: "01",
        name: "Financial services",
        tagline: "Governance without slowing growth.",
        description:
          "Automate compliance controls, safeguard financial transactions, and maintain immutable audit trails across core banking, wealth management, and payment rails.",
      },
      {
        number: "02",
        name: "Healthcare & life sciences",
        tagline: "Connected care, protected data.",
        description:
          "Protect sensitive patient health information (PHI) while enabling interoperable EHR data exchange and compliant clinical workflows across care networks.",
      },
      {
        number: "03",
        name: "Technology & software",
        tagline: "Build and scale at full speed.",
        description:
          "Ship faster with standardized microservice deployment guardrails, multi-region auto-scaling, and deep observability across your distributed stack.",
      },
      {
        number: "04",
        name: "Professional services",
        tagline: "Deliver excellence, consistently.",
        description:
          "Streamline multi-client delivery workflows, automate resource scheduling, and ensure total visibility into delivery milestones and project profitability.",
      },
      {
        number: "05",
        name: "Retail & commerce",
        tagline: "Know customers. Move inventory.",
        description:
          "Maintain ultra-responsive checkout experiences during peak traffic surges, sync real-time omnichannel inventory, and personalize customer journeys.",
      },
    ],
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
    description:
      "Connect LumaCore to the tools your teams love. Sync data, trigger actions, and build a truly connected stack.",
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
    items: [
      {
        number: "01",
        question: "How quickly can our team get started?",
        answer:
          "Most teams launch their first workspace in under a day. Our guided setup, templates, and import tools make onboarding fast and low-risk.",
      },
      {
        number: "02",
        question: "Can LumaCore replace our existing tools?",
        answer:
          "Yes, or it can seamlessly orchestrate them. LumaCore is designed to either unify point tools into one workspace or act as the coordinating intelligence layer over your existing software stack.",
      },
      {
        number: "03",
        question: "Is it suitable for enterprise organizations?",
        answer:
          "Absolutely. Built with multi-region redundancy, granular RBAC, SSO/SCIM integration, and compliant with SOC 2 Type II, ISO 27001, and HIPAA.",
      },
      {
        number: "04",
        question: "What support is included?",
        answer:
          "Every enterprise tier includes dedicated solution architect onboarding, 24/7 priority SLA support, and regular architecture reviews.",
      },
    ],
  },
  ctaBanner: {
    tag: "READY WHEN YOU ARE",
    headlineLine1: "Turn your best ideas",
    headlineLine2: "into",
    headlineItalic: "real momentum.",
    description: "See how LumaCore can transform the way your organization works.",
    buttonText: "Book your personalized demo",
    buttonUrl: "/contact",
  },
};
