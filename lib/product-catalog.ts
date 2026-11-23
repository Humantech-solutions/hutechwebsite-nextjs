import { Product } from "@/lib/product-adapter";
import { PRODUCT_1_DATA } from "@/lib/product-1-data";
import { ModernProductData } from "@/components/products/ModernProductTemplate";

export interface ProductItem {
  id: string;
  databaseId?: string;
  wpId?: string;
  slug: string;
  title: string;
  category: string;
  categorySlug?: string;
  tagline: string;
  description: string;
  badge?: string;
  version?: string;
  featured?: boolean;
  image: string;
  iconName: "sparkles" | "cpu" | "database" | "cloud" | "shield" | "zap" | "layers";
  accentColor: string;
  stats: { value: string; label: string }[];
  capabilities: string[];
  compliance: string[];
  ctaText?: string;
}

export const PRODUCT_CATEGORIES = [
  "All Products",
  "Intelligent Work Platform",
  "Application Modernization",
  "Data & AI Fabric",
  "Cloud & FinOps",
  "Cybersecurity & Zero Trust",
  "GenAI & Autonomous Agents",
] as const;

export const DEFAULT_PRODUCTS: ProductItem[] = [
  {
    id: "product-1",
    slug: "product-1",
    title: "LumaCore",
    category: "Intelligent Work Platform",
    tagline: "Adaptive Enterprise Operating Layer & Unified Workspace",
    description:
      "LumaCore connects your people, data, and workflows in one adaptive platform—so your organization can move with clarity, speed, and continuous governance.",
    badge: "Flagship GA",
    version: "v4.2",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    iconName: "sparkles",
    accentColor: "#0171c1",
    stats: [
      { value: "3.2x", label: "Faster Delivery" },
      { value: "< 90s", label: "MTTR Response" },
      { value: "42%", label: "TCO Reduction" },
      { value: "99.99%", label: "Uptime SLA" },
    ],
    capabilities: [
      "Autonomous Workflow Orchestration",
      "Unified Context & Knowledge Graph",
      "Cross-System Bi-Directional Sync",
      "Policy-Driven Governance Guardrails",
    ],
    compliance: ["SOC 2 Type II", "ISO 27001", "HIPAA Ready"],
    ctaText: "Explore LumaCore",
  },
  {
    id: "omnimodern",
    slug: "omnimodern",
    title: "OmniModern",
    category: "Application Modernization",
    tagline: "Autonomous Monolith Decomposition & AST Code Intelligence",
    description:
      "Decompose tightly coupled legacy architectures into resilient, cloud-native microservices with automated AST code intelligence and zero business logic regression.",
    badge: "Enterprise Suite",
    version: "v3.1",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
    iconName: "cpu",
    accentColor: "#F99D1C",
    stats: [
      { value: "70%", label: "Migration Acceleration" },
      { value: "0%", label: "Logic Regression" },
      { value: "15M+", label: "Lines Refactored" },
      { value: "Multi-Language", label: "Java / .NET / COBOL" },
    ],
    capabilities: [
      "Automated Abstract Syntax Tree Analysis",
      "Domain-Driven Microservice Boundary Extractor",
      "Hexagonal Architecture Generator",
      "Automated API Contract & Schema Generation",
    ],
    compliance: ["PCI-DSS v4.0", "ISO 27001", "SOC 2 Type II"],
    ctaText: "Discover OmniModern",
  },
  {
    id: "datanexus",
    slug: "datanexus",
    title: "DataNexus",
    category: "Data & AI Fabric",
    tagline: "Real-Time Enterprise Data Fabric & Knowledge Graph Engine",
    description:
      "Unify disparate multi-cloud lakes and transactional stores into a real-time, governed semantic fabric that accelerates business intelligence and enterprise AI pipelines.",
    badge: "High Throughput",
    version: "v2.8",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200",
    iconName: "database",
    accentColor: "#0284C7",
    stats: [
      { value: "10M+", label: "Events / Sec" },
      { value: "< 15ms", label: "Query Latency" },
      { value: "100%", label: "Data Lineage" },
      { value: "50+ Connectors", label: "Pre-Built Connectors" },
    ],
    capabilities: [
      "Unified Iceberg / Delta Lakehouse Catalog",
      "Real-Time Stream Processing & CDC",
      "Vector & Knowledge Graph Hybrid Index",
      "Active Metadata & Zero-Trust Governance",
    ],
    compliance: ["GDPR / CCPA", "HIPAA", "SOC 2 Type II"],
    ctaText: "Discover DataNexus",
  },
  {
    id: "cloudoptix",
    slug: "cloudoptix",
    title: "CloudOptix",
    category: "Cloud & FinOps",
    tagline: "Continuous Multi-Cloud Governance & Autonomous FinOps Engine",
    description:
      "Continuously optimize cloud compute, eliminate resource waste, and enforce security policies across AWS, GCP, and Azure with AI-driven anomaly detection.",
    badge: "Cloud Native",
    version: "v3.4",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    iconName: "cloud",
    accentColor: "#10B981",
    stats: [
      { value: "38%", label: "Avg Cost Reduction" },
      { value: "24/7", label: "Autonomous Right-Sizing" },
      { value: "Multi-Cloud", label: "AWS / GCP / Azure" },
      { value: "Kubernetes", label: "Pod Auto-Scaling" },
    ],
    capabilities: [
      "AI Predictive Cost Anomaly Detection",
      "Automated Spot & Reserved Instance Orchestration",
      "Granular FinOps Unit Economics by Team",
      "Automated Infrastructure Policy Enforcement",
    ],
    compliance: ["FinOps Certified", "SOC 2", "ISO 27001"],
    ctaText: "Discover CloudOptix",
  },
  {
    id: "cybershield",
    slug: "cybershield",
    title: "CyberShield AI",
    category: "Cybersecurity & Zero Trust",
    tagline: "Autonomous Threat Defense & Micro-Segmentation Gateway",
    description:
      "Protect critical digital infrastructure with continuous identity validation, AI behavioral heuristics, and sub-minute automated threat containment.",
    badge: "Mission Critical",
    version: "v4.0",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200",
    iconName: "shield",
    accentColor: "#EF4444",
    stats: [
      { value: "< 45s", label: "Threat Quarantine" },
      { value: "99.98%", label: "Precision Rate" },
      { value: "Zero Day", label: "Behavioral Heuristics" },
      { value: "100%", label: "Encrypted Inspection" },
    ],
    capabilities: [
      "Dynamic Micro-Segmentation Gateway",
      "Continuous Behavioral Identity Verification",
      "Automated Incident Containment & Quarantine",
      "Kernel-Level eBPF Telemetry & Auditing",
    ],
    compliance: ["FedRAMP Ready", "ISO 27001", "PCI-DSS"],
    ctaText: "Discover CyberShield",
  },
  {
    id: "agentflow",
    slug: "agentflow",
    title: "AgentFlow",
    category: "GenAI & Autonomous Agents",
    tagline: "Enterprise Multi-Agent Orchestration & Private LLM Framework",
    description:
      "Build, test, and deploy teams of collaborating autonomous AI agents inside your private cloud. Fully guarded with deterministic validation and audit-ready workflows.",
    badge: "AI Native",
    version: "v2.0",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200",
    iconName: "zap",
    accentColor: "#8B5CF6",
    stats: [
      { value: "85%", label: "Task Automation" },
      { value: "100% Private", label: "VPC / On-Premise" },
      { value: "Multi-Agent", label: "Consensus Routing" },
      { value: "< 200ms", label: "Model Routing" },
    ],
    capabilities: [
      "Multi-Agent Consensus & Debate Engine",
      "Private Model Router (Ollama / Bedrock / Vertex)",
      "Hierarchical Vector & Episodic Memory",
      "Enterprise Guardrails for PII & Hallucination",
    ],
    compliance: ["EU AI Act Ready", "SOC 2 Type II", "ISO 27001"],
    ctaText: "Discover AgentFlow",
  },
];

export function toProductAdapter(item: ProductItem): Product {
  return {
    title: item.title,
    category: item.category,
    heroImage: item.image,
    description: item.description,
    stats: item.stats,
    overviewDetails: { summary: item.tagline },
    keyFeaturesList: item.capabilities.map((cap, i) => ({
      id: `${i + 1}`,
      title: cap,
      description: `Enterprise-grade ${cap.toLowerCase()} engineered for high availability and zero operational friction.`,
      tag: item.category,
    })),
    businessBenefits: [
      {
        metric: item.stats[0]?.value || "3.2x",
        metricLabel: item.stats[0]?.label || "FASTER DELIVERY",
        title: "Accelerate Market Speed",
        description: `Deploy ${item.title} to streamline business operations with measurable velocity gains.`,
      },
      {
        metric: item.stats[1]?.value || "42%",
        metricLabel: item.stats[1]?.label || "TCO REDUCTION",
        title: "Maximize Operational Efficiency",
        description: `Eliminate point tool redundancy and lower total cost of ownership.`,
      },
      {
        metric: item.stats[2]?.value || "99.99%",
        metricLabel: item.stats[2]?.label || "UPTIME SLA",
        title: "Scale Resilient Architecture",
        description: `Engineered from the ground up for mission-critical enterprise workloads.`,
      },
    ],
    howItWorksWorkflow: [
      {
        step: 1,
        title: "Ingest & Connect",
        subtitle: "Zero-friction integration",
        description: `Connect existing enterprise systems, databases, and APIs to ${item.title} in minutes.`,
        latency: "< 5 mins",
        highlights: ["Pre-built connectors", "Automated discovery"],
        techPills: ["REST / GraphQL", "OAuth2", "gRPC"],
      },
      {
        step: 2,
        title: "Orchestrate & Analyze",
        subtitle: "Real-time execution",
        description: `Run continuous intelligence, event triggers, and business logic pipelines.`,
        latency: "< 10ms",
        highlights: ["Deterministic execution", "Continuous audit"],
        techPills: ["Distributed Workers", "Event Mesh"],
      },
      {
        step: 3,
        title: "Deliver & Scale",
        subtitle: "Continuous business impact",
        description: `Stream real-time insights, automated actions, and enterprise visibility.`,
        latency: "Sub-second",
        highlights: ["Executive telemetry", "Automated alerts"],
        techPills: ["OpenTelemetry", "Active Metrics"],
      },
    ],
    useCasesList: [
      {
        id: "uc-1",
        title: "High-Volume Enterprise Operations",
        industry: "Enterprise / SaaS",
        challenge: "Fragmented tooling causing latency and high operational overhead.",
        solution: `Deploy ${item.title} to unify operations and automate decision workflows.`,
        impact: "Reduced operational overhead by 45% in under 90 days.",
        metrics: [{ label: "Efficiency Gain", value: "+45%" }],
      },
      {
        id: "uc-2",
        title: "Regulated Industry Compliance",
        industry: "Financial & Healthcare",
        challenge: "Meeting strict data sovereignty and audit-trail standards.",
        solution: `Leverage built-in compliance frameworks and continuous governance.`,
        impact: "100% audit readiness with zero compliance violations.",
        metrics: [{ label: "Audit Pass Rate", value: "100%" }],
      },
    ],
    industriesList: [
      {
        name: "Banking & Financial Services",
        description: `High-frequency transactional integrity and compliant infrastructure.`,
        metric: "99.999% SLA",
        compliancePills: ["PCI-DSS", "SOC 2"],
        iconName: "landmark",
      },
      {
        name: "Healthcare & Life Sciences",
        description: `Patient-centric security and HIPAA-compliant data orchestrations.`,
        metric: "HIPAA Compliant",
        compliancePills: ["HIPAA", "HITRUST"],
        iconName: "activity",
      },
      {
        name: "Manufacturing & Supply Chain",
        description: `Real-time telematics, IoT integration, and predictive maintenance.`,
        metric: "Sub-10ms Latency",
        compliancePills: ["ISO 27001"],
        iconName: "factory",
      },
    ],
    faqsList: [
      {
        question: `How does ${item.title} integrate with our existing technology stack?`,
        answer: `${item.title} is designed with an API-first, cloud-agnostic architecture. It connects seamlessly to modern clouds (AWS, GCP, Azure), enterprise ERPs, data warehouses, and identity providers via pre-built connectors and open standards.`,
      },
      {
        question: `Can ${item.title} be deployed in a private cloud or on-premise environment?`,
        answer: `Yes. ${item.title} supports fully isolated deployments in your private cloud (AWS VPC, GCP VPC, Azure VNet) or air-gapped on-premise Kubernetes clusters for maximum security and data sovereignty.`,
      },
      {
        question: `What support and SLA packages are available?`,
        answer: `We provide 24/7/365 dedicated enterprise support, guaranteed 99.99% uptime SLAs, designated solution architects, and continuous proactive monitoring.`,
      },
    ],
  };
}

export function getDefaultProduct(slug: string): ProductItem | undefined {
  const norm = (slug || "").toLowerCase().trim();
  if (norm === "product-1" || norm === "lumacore") {
    return DEFAULT_PRODUCTS[0];
  }
  return DEFAULT_PRODUCTS.find((p) => p.slug.toLowerCase() === norm || p.id.toLowerCase() === norm);
}

