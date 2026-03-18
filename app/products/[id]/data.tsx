import {
  Shield,
  Cpu,
  Eye,
  Database,
  Sparkles,
  Box,
  FileText,
  Zap,
  HardDrive,
  GraduationCap,
  ExternalLink,
  Briefcase,
  Truck,
  Activity,
} from "lucide-react";
import React from "react";

export interface Product {
  title: string;
  category: string;
  heroImage: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  stats: { label: string; value: string }[];
  features: string[];
  architecture: {
    steps: { title: string; desc: string }[];
  };
  faqs: { q: string; a: string }[];
}

export const PRODUCTS_DATA: Record<string, Product> = {
  sentinelcore: {
    title: "SentinelCore AI",
    category: "Gen AI Products",
    heroImage:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1920",
    description:
      "Proactive threat hunting platform utilizing generative AI and anomaly detection models to protect distributed infrastructure.",
    icon: <Shield className="h-12 w-12" />,
    color: "#FFAF2B",
    stats: [
      { label: "Detection Accuracy", value: "99.99%" },
      { label: "Response Time", value: "< 2 mins" },
      { label: "Network Nodes", value: "Unlimited" },
    ],
    features: [
      "Generative AI security co-pilot for automated threat triage",
      "Deep packet inspection (DPI) at the application layer",
      "Self-healing network configurations upon breach detection",
      "Real-time compliance auditing for SOC2 and HIPAA",
    ],
    architecture: {
      steps: [
        { title: "Ingestion", desc: "Collects telemetry from edge devices and cloud logs." },
        { title: "Analysis", desc: "Neural engine identifies behavioral anomalies in real-time." },
        { title: "Response", desc: "Orchestrates automated isolation or multi-factor challenges." },
      ],
    },
    faqs: [
      { q: "Is there an offline mode?", a: "Yes, edge nodes continue to operate and buffer data." },
    ],
  },
  visionsense: {
    title: "VisionSense Analytics",
    category: "Gen AI Products",
    heroImage:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1920",
    description:
      "Industrial computer vision for real-time quality inspection and safety monitoring on production floors using generative models.",
    icon: <Eye className="h-12 w-12" />,
    color: "#0171c1",
    stats: [
      { label: "Processing Speed", value: "60 FPS" },
      { label: "Accuracy", value: "99.8%" },
      { label: "Defect Detection", value: "Real-time" },
    ],
    features: [
      "Surface defect detection using deep learning",
      "Automated safety perimeter monitoring",
      "Worker PPE compliance verification",
      "Production line throughput analytics",
    ],
    architecture: { steps: [] },
    faqs: [],
  },
  "automation-forge": {
    title: "Automation Forge",
    category: "AI productivity tools",
    heroImage:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1920",
    description: "Low-code platform for building complex RPA workflows with cognitive AI capabilities.",
    icon: <Sparkles className="h-12 w-12" />,
    color: "#0171c1",
    stats: [
      { label: "ROI Improvement", value: "35% Average" },
      { label: "Bot Stability", value: "99.9%" },
      { label: "Dev Speed", value: "5x Faster" },
    ],
    features: [
      "Visual drag-and-drop workflow designer",
      "Intelligent document processing (IDP)",
      "Self-healing automation scripts",
      "Centralized bot orchestration and monitoring",
    ],
    architecture: { steps: [] },
    faqs: [],
  },
  "hutech-assist": {
    title: "Hutech Assist",
    category: "AI productivity tools",
    heroImage:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1920",
    description: "Enterprise-wide AI assistant for technical documentation and knowledge management.",
    icon: <FileText className="h-12 w-12" />,
    color: "#FFAF2B",
    stats: [
      { label: "Doc Search Speed", value: "< 500ms" },
      { label: "Accuracy", value: "95%" },
      { label: "Supported Formats", value: "50+" },
    ],
    features: [
      "Semantic search across corporate repositories",
      "Automated documentation generation from code",
      "Multi-language translation for global teams",
      "Integration with Jira, Confluence, and Slack",
    ],
    architecture: { steps: [] },
    faqs: [],
  },
  cloudorbit: {
    title: "CloudOrbit SRE",
    category: "DevOps & SRE Automation",
    heroImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920",
    description: "Automated reliability engineering platform for complex multi-cloud deployments.",
    icon: <Zap className="h-12 w-12" />,
    color: "#FFAF2B",
    stats: [
      { label: "MTTR Reduction", value: "60%" },
      { label: "Uptime", value: "99.999%" },
      { label: "Deploy Frequency", value: "10x Faster" },
    ],
    features: [
      "AI-driven root cause analysis (RCA)",
      "Automated canary deployments and rollbacks",
      "Chaos engineering experiments as a service",
      "Integrated SLI/SLO monitoring and alerting",
    ],
    architecture: { steps: [] },
    faqs: [],
  },
  "skynode-edge": {
    title: "SkyNode Edge",
    category: "DevOps & SRE Automation",
    heroImage:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1920",
    description: "Distributed infrastructure for low-latency edge computing and local data processing.",
    icon: <HardDrive className="h-12 w-12" />,
    color: "#0171c1",
    stats: [
      { label: "Edge Latency", value: "< 10ms" },
      { label: "Bandwidth Savings", value: "70%" },
      { label: "Global Nodes", value: "500+" },
    ],
    features: [
      "Local AI inference at the edge",
      "Zero-latency data filtering and aggregation",
      "Automated edge node provisioning and updates",
      "Secure tunnel for heterogeneous device connectivity",
    ],
    architecture: { steps: [] },
    faqs: [],
  },
  "edu-nexus": {
    title: "EduNexus LMS",
    category: "LMS",
    heroImage:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1920",
    description: "Comprehensive learning management system for enterprise training and skill certification.",
    icon: <GraduationCap className="h-12 w-12" />,
    color: "#FFAF2B",
    stats: [
      { label: "User Engagement", value: "85%" },
      { label: "Course Completion", value: "92%" },
      { label: "Certification ROI", value: "40%" },
    ],
    features: [
      "AI-personalized learning paths",
      "Interactive video and simulation modules",
      "Skills gap analysis and reporting",
      "Mobile-first learning with offline support",
    ],
    architecture: { steps: [] },
    faqs: [],
  },
  "erp-nexus": {
    title: "ERP Nexus",
    category: "ERP & Office Productivity",
    heroImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1920",
    description: "Seamless integration layer for SAP, Oracle, and modern cloud applications.",
    icon: <ExternalLink className="h-12 w-12" />,
    color: "#0171c1",
    stats: [
      { label: "Sync Latency", value: "< 1s" },
      { label: "Data Integrity", value: "100%" },
      { label: "Connector Count", value: "100+" },
    ],
    features: [
      "Bi-directional data synchronization",
      "Custom business logic injection points",
      "Enterprise security and audit logging",
      "Unified dashboard for multi-ERP ecosystems",
    ],
    architecture: { steps: [] },
    faqs: [],
  },
  "office-flow": {
    title: "OfficeFlow",
    category: "ERP & Office Productivity",
    heroImage:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1920",
    description: "Unified productivity suite for team collaboration and document workflow automation.",
    icon: <Briefcase className="h-12 w-12" />,
    color: "#FFAF2B",
    stats: [
      { label: "Meeting Efficiency", value: "+45%" },
      { label: "Email Reduction", value: "30%" },
      { label: "File Search Time", value: "-80%" },
    ],
    features: [
      "Real-time document co-authoring",
      "Automated approval workflows",
      "Unified project management boards",
      "Secure enterprise file sharing",
    ],
    architecture: { steps: [] },
    faqs: [],
  },
  "supplychain-sentry": {
    title: "SupplyChain Sentry",
    category: "Logistics and Delivery",
    heroImage:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1920",
    description: "Real-time logistics optimization and risk management for global supply chains.",
    icon: <Truck className="h-12 w-12" />,
    color: "#0171c1",
    stats: [
      { label: "Inventory Turn", value: "+25%" },
      { label: "Cost Reduction", value: "15%" },
      { label: "Risk Mitigation", value: "90%" },
    ],
    features: [
      "Predictive delay and disruption alerts",
      "Inventory level optimization using AI",
      "Digital twin mapping of supply routes",
      "Supplier performance and risk scoring",
    ],
    architecture: { steps: [] },
    faqs: [],
  },
  "hutrac-gps": {
    title: "HuTrac GPS",
    category: "Logistics and Delivery",
    heroImage:
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=1920",
    description: "Advanced fleet tracking and route optimization for last-mile delivery services.",
    icon: <Activity className="h-12 w-12" />,
    color: "#FFAF2B",
    stats: [
      { label: "GPS Accuracy", value: "1m" },
      { label: "Route Efficiency", value: "+20%" },
      { label: "Fuel Savings", value: "12%" },
    ],
    features: [
      "Real-time vehicle tracking and telematics",
      "Dynamic route re-optimization",
      "Driver behavior and safety monitoring",
      "Automated delivery proof and verification",
    ],
    architecture: { steps: [] },
    faqs: [],
  },
};
