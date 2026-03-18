"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { 
  Database, 
  Settings, 
  BarChart3, 
  Users, 
  Zap, 
  ShieldCheck, 
  MoveRight, 
  LayoutGrid, 
  Cloud, 
  Workflow, 
  Globe, 
  Lock, 
  RefreshCw,
  Rocket,
  ArrowRight,
  MessageSquare,
  Monitor,
  CheckCircle2,
  Layers,
  Cpu,
  TrendingUp,
  Server
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

const ENTERPRISE_SOLUTIONS = [
  {
    title: "SAP Implementation",
    tagline: "The Intelligent Enterprise Core",
    icon: <Database className="w-10 h-10 text-[#FFAF2B]" />,
    desc: "Hutech enables organizations to transition from legacy ECC environments to SAP S/4HANA, creating a digital-first foundation for global operations. Our methodology focuses on 'Clean Core' principles to ensure future-proof upgrades.",
    capabilities: [
      { name: "S/4HANA Transformation", detail: "Greenfield, Brownfield, and Selective Data Transitions." },
      { name: "SAP BTP Integration", detail: "Extension and integration using Business Technology Platform." },
      { name: "RISE with SAP", detail: "Accelerated cloud journeys with managed services." },
      { name: "Fiori UX Modernization", detail: "Intuitive, role-based user experiences for all modules." }
    ],
    sectors: ["Manufacturing", "Automotive", "Retail", "Life Sciences"]
  },
  {
    title: "ServiceNow Implementation",
    tagline: "Digital Workflow Orchestration",
    icon: <Workflow className="w-10 h-10 text-[#FFAF2B]" />,
    desc: "We transform fragmented internal processes into unified digital workflows. By leveraging the Now Platform, we help enterprises automate IT, HR, and Customer Service operations while maintaining a single system of record.",
    capabilities: [
      { name: "IT Service Management (ITSM)", detail: "Standardizing IT delivery and operational excellence." },
      { name: "HR Service Delivery (HRSD)", detail: "Enhancing employee experience and self-service." },
      { name: "IT Operations Management (ITOM)", detail: "AIOps-driven visibility and service mapping." },
      { name: "App Engine Low-Code", detail: "Custom application development for unique business needs." }
    ],
    sectors: ["Financial Services", "Technology", "Healthcare", "Public Sector"]
  },
  {
    title: "Oracle Implementation",
    tagline: "Agile Cloud Infrastructure & ERP",
    icon: <Globe className="w-10 h-10 text-[#FFAF2B]" />,
    desc: "Our Oracle practice specializes in Fusion Cloud applications and NetSuite implementations. We provide deep expertise in financial management, supply chain orchestration, and human capital management on a global scale.",
    capabilities: [
      { name: "Oracle Fusion Cloud ERP", detail: "Automated financials and real-time reporting." },
      { name: "Supply Chain (SCM)", detail: "End-to-end visibility and demand forecasting." },
      { name: "Oracle HCM Cloud", detail: "Strategic workforce planning and talent management." },
      { name: "NetSuite for Scale-ups", detail: "Rapid ERP deployment for fast-growing businesses." }
    ],
    sectors: ["Logistics", "Energy", "E-commerce", "High-Tech"]
  },
  {
    title: "Salesforce Implementation",
    tagline: "Customer-Centric Growth Platforms",
    icon: <Cloud className="w-10 h-10 text-[#FFAF2B]" />,
    desc: "Hutech helps you build a 360-degree view of your customer. We implement complex multi-cloud Salesforce solutions that bridge the gap between sales, service, marketing, and commerce through Einstein AI-driven insights.",
    capabilities: [
      { name: "Sales & Service Cloud", detail: "Lead-to-cash automation and omnichannel support." },
      { name: "Marketing Cloud Engagement", detail: "Personalized customer journeys at scale." },
      { name: "Financial Services Cloud", detail: "Verticalized CRM for banking and wealth management." },
      { name: "MuleSoft Integration", detail: "API-led connectivity for legacy system synchronization." }
    ],
    sectors: ["Banking", "Insurance", "Professional Services", "Media"]
  },
  {
    title: "Pega Implementation",
    tagline: "Intelligent Automation & Case Management",
    icon: <LayoutGrid className="w-10 h-10 text-[#FFAF2B]" />,
    desc: "We leverage Pega’s low-code platform to solve complex business problems. Our Pega experts focus on Decision Hub and Customer Service modules to deliver hyper-personalized experiences and operational efficiency.",
    capabilities: [
      { name: "BPM & Case Management", detail: "Streamlining complex enterprise processes." },
      { name: "Customer Decision Hub", detail: "Next-Best-Action (NBA) predictive analytics." },
      { name: "Pega RPA", detail: "Robotic automation for repetitive manual tasks." },
      { name: "Government Platform", detail: "Compliance-heavy workflow solutions for agencies." }
    ],
    sectors: ["Government", "Telecommunications", "Insurance", "Retail"]
  },
  {
    title: "Open Source Implementation",
    tagline: "Sovereign & Customizable ERP Solutions",
    icon: <Rocket className="w-10 h-10 text-[#FFAF2B]" />,
    desc: "For enterprises seeking flexibility and lower TCO, we provide implementations of Odoo and ERPNext. We customize these platforms into high-performance systems that match your specific business DNA without vendor lock-in.",
    capabilities: [
      { name: "Odoo Enterprise", detail: "Modular apps for accounting, CRM, and manufacturing." },
      { name: "ERPNext Customization", detail: "Python-based flexible ERP for modern enterprises." },
      { name: "Headless ERP Architecture", detail: "Decoupling front-end from core business logic." },
      { name: "Cloud-Native Deployment", detail: "Kubernetes-ready open source scaling." }
    ],
    sectors: ["SMEs", "Education", "Hospitality", "Non-Profits"]
  }
];

export default function EnterpriseDigitalSolutions() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta 
        title="Enterprise Digital Solutions | Hutech Solutions"
        description="Comprehensive SAP, ServiceNow, Oracle, Salesforce, Pega and Open Source ERP implementation services. Transform your enterprise with Hutech's digital core solutions."
      />
      <Breadcrumbs variant="light" />
      
      {/* Hero Section */}
      <section className="bg-[#001A3D] text-white h-[450px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Enterprise Technology"
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
              <span className="text-[#FFAF2B] font-bold uppercase tracking-[0.3em] text-[10px]">Enterprise Architecture</span>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight display-font mb-8">
              Modernizing the <br />
              <span className="text-[#FFAF2B]">Enterprise Core.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed">
              We design and deploy integrated enterprise ecosystems that eliminate data silos, automate complex workflows, and provide real-time visibility across your global operations.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Strategic Approach */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1 space-y-6">
               <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font leading-tight">
                  Our Strategic <br />
                  <span className="text-[#0171c1]">Approach.</span>
               </h2>
               <p className="text-gray-500 font-bold leading-relaxed">
                  Enterprise digital transformation is not just about software; it's about business process re-engineering. We follow a four-pillar strategy for every implementation.
               </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10">
               {[
                 { title: "Discovery & Blueprinting", desc: "Aligning technology roadmaps with core business objectives and ROI targets." },
                 { title: "Agile Implementation", desc: "Iterative deployment cycles to ensure rapid value realization and stakeholder feedback." },
                 { title: "Change Management", desc: "Empowering your workforce through targeted training and cultural alignment." },
                 { title: "Managed Evolution", desc: "Continuous optimization and support to ensure your platforms grow with your business." }
               ].map((step, idx) => (
                 <div key={idx} className="flex gap-6">
                    <div className="text-4xl font-bold text-gray-100">0{idx + 1}</div>
                    <div className="space-y-2">
                       <h4 className="font-bold text-[#001A3D]">{step.title}</h4>
                       <p className="text-sm text-gray-400 leading-relaxed font-bold">{step.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Extensive Platform Deep Dive */}
      <section id="solutions" className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-6">
            <div className="inline-block px-4 py-1.5 bg-[#0171c1]/10 text-[#0171c1] text-[10px] font-bold uppercase tracking-widest rounded-full">
               Platform Expertise
            </div>
            <h2 className="text-3xl md:text-6xl font-semibold text-[#001A3D] display-font leading-tight">Global Enterprise Platforms</h2>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed">
              We provide deep domain expertise across the world's leading enterprise platforms, ensuring your implementation is tailored to your industry's unique demands.
            </p>
          </div>

          <div className="space-y-24">
            {ENTERPRISE_SOLUTIONS.map((solution, i) => (
              <Motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-start ${i !== ENTERPRISE_SOLUTIONS.length - 1 ? 'pb-24 border-b border-gray-200' : ''}`}
              >
                {/* Platform Summary */}
                <div className="lg:col-span-4 space-y-8">
                  <div className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100 w-fit">
                    {solution.icon}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold text-[#001A3D] display-font leading-tight">{solution.title}</h3>
                    <div className="text-[#0171c1] font-bold text-sm tracking-wide uppercase">{solution.tagline}</div>
                    <p className="text-gray-500 font-medium leading-relaxed">{solution.desc}</p>
                  </div>
                  
                  <div className="space-y-4 pt-6">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Target Industry Sectors</div>
                    <div className="flex flex-wrap gap-2">
                       {solution.sectors.map((sector, idx) => (
                         <span key={idx} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-[10px] font-bold text-[#001A3D] uppercase">
                            {sector}
                         </span>
                       ))}
                    </div>
                  </div>
                </div>

                {/* Elaborate Capabilities */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {solution.capabilities.map((cap, idx) => (
                    <div key={idx} className="p-8 bg-white border border-gray-100 rounded-2xl hover:shadow-xl hover:border-[#0171c1]/20 transition-all group">
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                           <CheckCircle2 className="w-5 h-5 text-[#0171c1]" />
                        </div>
                        <div className="space-y-2">
                           <h4 className="font-bold text-[#001A3D] group-hover:text-[#0171c1] transition-colors">{cap.name}</h4>
                           <p className="text-sm text-gray-400 font-medium leading-relaxed">{cap.detail}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Additional Value Add Info */}
                  <div className="md:col-span-2 p-8 bg-[#001A3D] rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#0171c1]/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="relative z-10">
                       <h5 className="font-bold text-lg mb-2 text-white">Why Hutech for {solution.title}?</h5>
                       <p className="text-sm text-white/60 font-medium max-w-xl">
                          Our certified consultants combine industry best practices with deep technical mastery to deliver solutions that are scalable, secure, and user-centric.
                       </p>
                    </div>
                    <Link 
                      href="/contact" 
                      className="relative z-10 px-8 py-4 bg-[#0171c1] text-white hover:bg-white hover:text-[#001A3D] transition-all rounded-sm text-[10px] font-bold uppercase tracking-wider flex-shrink-0"
                    >
                      Request Case Study
                    </Link>
                  </div>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Call to Action */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="bg-[#001A3D] rounded-[4rem] p-12 md:p-24 text-center space-y-10 relative overflow-hidden shadow-2xl">
             <div className="absolute inset-0 z-0">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1551288049-bbbda546697c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920" 
                  alt="Enterprise Network" 
                  className="w-full h-full object-cover opacity-10"
                />
             </div>
             <div className="relative z-10 max-w-4xl mx-auto space-y-8">
                <h2 className="text-4xl md:text-7xl font-bold text-white display-font leading-tight text-white gap-2">
                   Architect Your <span className="text-[#FFAF2B]">Digital Future.</span>
                </h2>
                <p className="text-xl text-white/60 font-medium max-w-2xl mx-auto leading-relaxed">
                   Connect with our senior enterprise architects today to discuss your roadmap, from ERP selection and implementation to continuous evolution and support.
                </p>
                <div className="pt-8 flex flex-col md:flex-row justify-center gap-6">
                   <Link 
                     href="/contact" 
                     className="inline-flex items-center justify-center gap-3 bg-[#0171c1] text-white px-12 py-6 font-bold uppercase tracking-wider text-[12px] hover:bg-white hover:text-[#001A3D] transition-all duration-500 rounded-sm"
                   >
                     Initiate Transformation <MessageSquare className="w-5 h-5 ml-2" />
                   </Link>
                   <Link 
                     href="/company/leadership" 
                     className="inline-flex items-center justify-center gap-3 border border-white/20 text-white px-12 py-6 font-bold uppercase tracking-wider text-[12px] hover:bg-white hover:text-[#001A3D] transition-all duration-500 rounded-sm"
                   >
                     Meet Our Strategists
                   </Link>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
