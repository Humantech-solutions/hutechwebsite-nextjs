"use client";

import { motion as Motion } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Meta } from "@/components/Meta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { 
  Cpu, Shield, Zap, Box, Activity, CheckCircle, 
  ArrowLeft, ArrowRight, Download, PlayCircle, 
  Settings, Layers, Globe, Database, HelpCircle,
  Eye, Sparkles
} from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

const PRODUCTS_DATA = {
  "sentinelcore": {
    title: "SentinelCore AI",
    category: "AI products",
    heroImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1920",
    description: "Proactive threat hunting platform utilizing generative AI and anomaly detection models to protect distributed infrastructure. SentinelCore offers 360-degree visibility into network traffic and application layer security.",
    icon: <Shield className="w-12 h-12" />,
    color: "#FFAF2B",
    stats: [
      { label: "Detection Accuracy", value: "99.99%" },
      { label: "Response Time", value: "< 2 mins" },
      { label: "Network Nodes", value: "Unlimited" }
    ],
    features: [
      "Generative AI security co-pilot for automated threat triage",
      "Deep packet inspection (DPI) at the application layer",
      "Self-healing network configurations upon breach detection",
      "Real-time compliance auditing for SOC2 and HIPAA",
      "Zero-Trust adaptive access control integration"
    ],
    architecture: {
      steps: [
        { title: "Ingestion", desc: "Collects telemetry from edge devices, cloud logs, and endpoints." },
        { title: "Analysis", desc: "Neural engine identifies behavioral anomalies in real-time." },
        { title: "Response", desc: "Orchestrates automated isolation or multi-factor challenges." }
      ]
    },
    faqs: [
      { q: "Does it support legacy on-prem servers?", a: "Yes, via our lightweight agent-based installation or network mirror port." },
      { q: "How is the data secured?", a: "All telemetry is encrypted via TLS 1.3 and stored in isolated VPC environments." }
    ]
  },
  "omniconnect": {
    title: "Hutech OmniConnect",
    category: "Cloud Products",
    heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1920",
    description: "Enterprise-grade IoT orchestration layer designed for multi-vendor industrial environments. OmniConnect bridges the gap between legacy industrial machinery and modern cloud intelligence.",
    icon: <Cpu className="w-12 h-12" />,
    color: "#0171c1",
    stats: [
      { label: "Message Throughput", value: "1.2M/sec" },
      { label: "Connectivity", value: "50+ Protocols" },
      { label: "Latency", value: "< 5ms" }
    ],
    features: [
      "Universal protocol adapter (OPC-UA, Modbus, MQTT, S7)",
      "Distributed edge processing for immediate feedback loops",
      "Visual digital twin mapping for physical assets",
      "Dynamic load balancing across edge gateway clusters",
      "Enterprise-wide centralized firmware management"
    ],
    architecture: {
      steps: [
        { title: "Connect", desc: "Standardize data from diverse PLC and sensor protocols." },
        { title: "Process", desc: "Edge-side filtering and normalization to reduce cloud egress." },
        { title: "Action", desc: "Trigger local safety shutdowns or cloud-based analytics." }
      ]
    },
    faqs: [
      { q: "Is there an offline mode?", a: "Yes, edge nodes continue to operate and buffer data during network outages." },
      { q: "Which cloud providers are supported?", a: "AWS, Azure, and Google Cloud are supported out of the box." }
    ]
  },
  "visionsense": {
    title: "VisionSense Analytics",
    category: "AI products",
    heroImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1920",
    description: "Industrial computer vision for real-time quality inspection and safety monitoring on production floors.",
    icon: <Eye className="w-12 h-12" />,
    color: "#0171c1",
    stats: [
      { label: "Processing Speed", value: "60 FPS" },
      { label: "Accuracy", value: "99.8%" },
      { label: "Defect Detection", value: "Real-time" }
    ],
    features: [
      "Surface defect detection using deep learning",
      "Automated safety perimeter monitoring",
      "Worker PPE compliance verification",
      "Production line throughput analytics"
    ],
    architecture: { steps: [] },
    faqs: []
  },
  "fluxdata-nexus": {
    title: "FluxData Nexus",
    category: "Data Products",
    heroImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=1920",
    description: "Unified data pipeline solution for real-time ingestion, transformation, and global distribution at petabyte scale.",
    icon: <Database className="w-12 h-12" />,
    color: "#0171c1",
    stats: [
      { label: "Daily Volume", value: "PB Scale" },
      { label: "Schema Drift", value: "Auto-Healing" },
      { label: "Availability", value: "99.999%" }
    ],
    features: [
      "Serverless scaling based on data pressure",
      "Native SQL transformation engine",
      "Built-in data lineage and governance tracking",
      "Zero-copy cloning for development environments"
    ],
    architecture: { steps: [] },
    faqs: []
  },
  "automation-forge": {
    title: "Automation Forge",
    category: "AI Productivity tools",
    heroImage: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1920",
    description: "Low-code platform for building complex RPA workflows with cognitive AI capabilities.",
    icon: <Sparkles className="w-12 h-12" />,
    color: "#0171c1",
    stats: [
      { label: "ROI Improvement", value: "35% Average" },
      { label: "Bot Stability", value: "99.9%" },
      { label: "Dev Speed", value: "5x Faster" }
    ],
    features: [
      "Visual drag-and-drop workflow designer",
      "Intelligent document processing (IDP)",
      "Self-healing automation scripts",
      "Centralized bot orchestration and monitoring"
    ],
    architecture: { steps: [] },
    faqs: []
  },
  "digital-twin": {
    title: "Digital Twin Builder",
    category: "Enterprise and ERP products",
    heroImage: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1920",
    description: "Create high-fidelity virtual replicas of physical assets to optimize ROI and predict maintenance needs.",
    icon: <Box className="w-12 h-12" />,
    color: "#FFAF2B",
    stats: [
      { label: "Asset Sync", value: "< 100ms" },
      { label: "Prediction Accuracy", value: "94%" },
      { label: "Visual Fidelity", value: "4K Native" }
    ],
    features: [
      "Physics-based simulation engine",
      "Bi-directional IoT data streaming",
      "What-if scenario analysis tools",
      "Historical data playback for forensic analysis"
    ],
    architecture: { steps: [] },
    faqs: []
  }
};

export default function ProductDetail() {
  const params = useParams();
  const id = params?.id as string;
  const product = id ? PRODUCTS_DATA[id as keyof typeof PRODUCTS_DATA] : null;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-20">
        <div className="text-center space-y-8 max-w-md px-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
            <HelpCircle size={48} />
          </div>
          <h1 className="text-4xl font-semibold text-[#001A3D] display-font">Solution Not Found</h1>
          <p className="text-gray-500 font-medium">The specific solution page you are looking for has been moved or is currently being updated in our engineering catalog.</p>
          <Link href="/products" className="inline-flex items-center gap-3 bg-[#001A3D] text-white px-10 py-5 rounded-sm font-black uppercase tracking-[0.2em] text-[11px] hover:bg-[#0171c1] transition-all">
            <ArrowLeft size={16} /> Return to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white">
      <Meta 
        title={`${product.title} | Technical Overview | Hutech Solutions`}
        description={product.description}
      />
      
      {/* Dynamic Header / Hero */}
      <section className="bg-[#001A3D] pt-32 pb-60 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 scale-105">
          <ImageWithFallback 
            src={product.heroImage} 
            alt={product.title}
            className="w-full h-full object-cover blur-[2px]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#001A3D]/40 via-[#001A3D]/80 to-[#001A3D]"></div>
        
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-12">
               <Link href="/products" className="text-white/60 hover:text-[#0171c1] transition-colors flex items-center gap-2 text-[11px] font-black uppercase tracking-widest">
                 <ArrowLeft size={14} /> Back
               </Link>
               <div className="h-4 w-[1px] bg-white/20"></div>
               <span className="text-[#0171c1] font-black uppercase tracking-[0.3em] text-[11px]">{product.category}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end gap-8 mb-10">
              <div className="bg-white/10 backdrop-blur-xl p-6 rounded-sm border border-white/10 shadow-2xl">
                <div className="text-[#0171c1]">{product.icon}</div>
              </div>
              <div>
                <h1 className="text-5xl md:text-7xl font-semibold text-white display-font mb-4 tracking-tight leading-none">
                  {product.title}
                </h1>
                <div className="flex items-center gap-4 text-[#FFAF2B] font-bold text-sm tracking-wide">
                  <Globe size={18} /> Global Availability <span className="text-white/20">•</span> v4.2.0 Stable
                </div>
              </div>
            </div>

            <p className="text-xl md:text-2xl text-gray-300 font-medium leading-relaxed max-w-3xl border-l-4 border-[#0171c1] pl-8 py-2">
              {product.description}
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="relative z-20 -mt-32 px-6 lg:px-20 max-w-[1280px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 bg-white shadow-2xl rounded-sm overflow-hidden border border-gray-100">
          {product.stats.map((stat, idx) => (
            <div key={stat.label} className={`p-12 text-center group hover:bg-gray-50 transition-colors duration-500 ${idx !== 2 ? 'md:border-r border-gray-100' : ''}`}>
              <div className="text-gray-400 text-[10px] font-black uppercase tracking-[0.25em] mb-4 group-hover:text-[#0171c1] transition-colors">{stat.label}</div>
              <div className="text-[#001A3D] text-4xl font-semibold display-font">{stat.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Deep Dive */}
      <section className="py-32">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Left: Capabilities */}
            <div className="lg:col-span-7 space-y-16">
              <div>
                <h2 className="text-4xl font-semibold text-[#001A3D] display-font mb-8">Core Engineering Capabilities</h2>
                <p className="text-gray-500 text-lg leading-relaxed font-medium mb-12">
                  Built on a foundation of resilience and high-availability, {product.title} addresses the most demanding requirements of modern enterprise infrastructure.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {product.features.map((feature, idx) => (
                    <Motion.div 
                      key={idx}
                      whileHover={{ x: 5 }}
                      className="flex gap-4 p-6 bg-gray-50 border-l-2 border-[#0171c1] rounded-sm group hover:bg-white hover:shadow-xl transition-all duration-300"
                    >
                      <CheckCircle className="w-5 h-5 text-[#0171c1] shrink-0 mt-1" />
                      <span className="text-[#001A3D] font-bold text-sm leading-snug">{feature}</span>
                    </Motion.div>
                  ))}
                </div>
              </div>

              {/* Architecture Visualization Placeholder */}
              {product.architecture?.steps && product.architecture.steps.length > 0 && (
                <div className="bg-gray-50 p-12 rounded-sm border border-gray-100">
                  <h3 className="text-xl font-semibold text-[#001A3D] display-font mb-10 flex items-center gap-3">
                    <Layers className="text-[#0171c1]" /> Technical Architecture
                  </h3>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
                    {product.architecture.steps.map((step, idx) => (
                      <div key={step.title} className="flex-1 text-center relative z-10">
                        <div className="w-12 h-12 bg-[#001A3D] text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4 border-4 border-white shadow-lg">
                          {idx + 1}
                        </div>
                        <h4 className="font-bold text-[#001A3D] text-sm mb-2">{step.title}</h4>
                        <p className="text-[12px] text-gray-500 font-medium leading-relaxed">{step.desc}</p>
                      </div>
                    ))}
                    {/* Connector line */}
                    <div className="hidden md:block absolute top-6 left-0 w-full h-[2px] bg-gray-200 -z-0"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: CTA & Resources */}
            <div className="lg:col-span-5 space-y-10">
              <div className="bg-[#001A3D] p-12 rounded-sm text-white relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                  <h3 className="text-3xl font-semibold mb-6 display-font leading-tight">Implement {product.title}</h3>
                  <p className="text-gray-400 mb-10 text-lg font-medium">
                    Collaborate with our solution architects to design a custom integration path for your infrastructure.
                  </p>
                  <div className="space-y-4">
                    <button className="w-full bg-[#0171c1] text-white py-6 rounded-sm font-black uppercase tracking-widest text-[11px] hover:bg-white hover:text-[#001A3D] transition-all flex items-center justify-center gap-3 group">
                      Schedule Technical Demo <PlayCircle size={18} className="group-hover:scale-110 transition-transform" />
                    </button>
                    <button className="w-full bg-transparent border border-white/20 text-white py-6 rounded-sm font-black uppercase tracking-widest text-[11px] hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                      View Documentation <Download size={18} />
                    </button>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#0171c1]/10 rounded-full blur-[100px] -mr-32 -mb-32"></div>
              </div>

              {/* Compliance Trust */}
              <div className="p-10 border border-gray-100 rounded-sm space-y-8">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Security Certifications</h4>
                  <Shield size={16} className="text-[#0171c1]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-sm text-center">
                    <div className="font-black text-[11px] text-[#001A3D]">ISO 27001</div>
                    <div className="text-[9px] text-gray-400 uppercase font-bold mt-1">Verified</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-sm text-center">
                    <div className="font-black text-[11px] text-[#001A3D]">SOC2 TYPE II</div>
                    <div className="text-[9px] text-gray-400 uppercase font-bold mt-1">Certified</div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              {product.faqs && product.faqs.length > 0 && (
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Common Inquiries</h4>
                  <div className="space-y-4">
                    {product.faqs.map((faq, i) => (
                      <div key={i} className="group cursor-help">
                        <div className="font-bold text-[#001A3D] text-sm mb-1 flex items-start gap-2">
                           <span className="text-[#0171c1]">Q:</span> {faq.q}
                        </div>
                        <div className="text-gray-500 text-[13px] leading-relaxed pl-6 font-medium">
                          {faq.a}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Integration Banner */}
      <section className="bg-gray-50 border-y border-gray-100 py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row items-center gap-16">
             <div className="flex-1 text-center lg:text-left">
               <span className="text-[#0171c1] font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Connectivity First</span>
               <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font mb-6 leading-tight">
                 Engineered for <br /> Multi-Vendor Ecosystems
               </h2>
               <p className="text-gray-500 text-lg font-medium max-w-xl">
                 We ensure our products integrate seamlessly with your existing technology stack, reducing time-to-value for global engineering teams.
               </p>
             </div>
             <div className="grid grid-cols-3 md:grid-cols-4 gap-8 grayscale opacity-40">
                <Settings size={48} />
                <Zap size={48} />
                <Globe size={48} />
                <Cpu size={48} />
             </div>
          </div>
        </div>
      </section>

      {/* Catalog Navigation */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 flex flex-col md:flex-row justify-between items-center gap-12">
           <Link href="/products" className="group flex items-center gap-6 text-[#001A3D] transition-all">
             <div className="w-16 h-16 rounded-full border-2 border-gray-100 flex items-center justify-center group-hover:bg-[#0171c1] group-hover:border-[#0171c1] group-hover:text-white group-hover:shadow-xl transition-all duration-500">
               <ArrowLeft size={20} />
             </div>
             <div>
               <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Explore More</div>
               <div className="text-lg font-bold">Return to Product Catalog</div>
             </div>
           </Link>
           
           <Link href="/contact" className="group flex items-center gap-6 text-[#001A3D] text-right transition-all">
             <div className="text-right">
               <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Next Step</div>
               <div className="text-lg font-bold">Inquire Technical Spec</div>
             </div>
             <div className="w-16 h-16 rounded-full bg-[#001A3D] text-white flex items-center justify-center group-hover:bg-[#0171c1] group-hover:shadow-xl transition-all duration-500">
               <ArrowRight size={20} />
             </div>
           </Link>
        </div>
      </section>
    </div>
  );
}
