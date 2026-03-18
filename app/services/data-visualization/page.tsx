"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Search, 
  Database, 
  Zap, 
  MoveRight, 
  Layout, 
  Monitor, 
  Presentation, 
  Eye, 
  ShieldCheck, 
  Clock, 
  Cpu, 
  Layers
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

const SOLUTIONS = [
  {
    title: "Interactive Dashboards",
    icon: <Layout className="w-8 h-8 text-[#FFAF2B]" />,
    desc: "Building dynamic, drill-down capable dashboards using Power BI, Tableau, and custom React-based visualization frameworks."
  },
  {
    title: "Real-time Reporting",
    icon: <Clock className="w-8 h-8 text-[#FFAF2B]" />,
    desc: "Implementing streaming data visualizations for live operations monitoring, ensuring zero-latency business awareness."
  },
  {
    title: "Executive Insights",
    icon: <Presentation className="w-8 h-8 text-[#FFAF2B]" />,
    desc: "C-suite level reporting that distills complex data into clear, strategic narratives for informed decision making."
  }
];

const CAPABILITIES = [
  {
    title: "Custom Data Viz",
    icon: <Eye className="w-6 h-6 text-[#0171c1]" />,
    desc: "Creating specialized charts and maps tailored to unique industry metrics and proprietary data models."
  },
  {
    title: "Embedded Analytics",
    icon: <Monitor className="w-6 h-6 text-[#0171c1]" />,
    desc: "Seamlessly integrating reporting tools directly into your existing enterprise portals and customer-facing apps."
  },
  {
    title: "Self-Service BI",
    icon: <Zap className="w-6 h-6 text-[#0171c1]" />,
    desc: "Empowering your teams with governed environments to explore data and create their own reports without IT friction."
  },
  {
    title: "Data Storytelling",
    icon: <Search className="w-6 h-6 text-[#0171c1]" />,
    desc: "Transforming raw numbers into visual narratives that highlight trends, anomalies, and hidden opportunities."
  }
];

export default function DataVisualizationReporting() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta 
        title="Data Visualization & Reporting | Hutech Solutions"
        description="Transform complex data into actionable insights with Hutech's expert Data Visualization and Business Intelligence reporting services."
      />
      <Breadcrumbs variant="light" />
      
      {/* Hero Section */}
      <section className="bg-[#001A3D] text-white h-[450px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Data Visualization Dashboard"
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
              <span className="text-[#FFAF2B] font-bold uppercase tracking-[0.3em] text-[10px]">Business Intelligence</span>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight display-font mb-8">
              Visualize Your <br />
              <span className="text-[#FFAF2B]">Business Pulse.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed">
              We turn complex, fragmented data into clear, interactive visual stories. Gain the clarity you need to make rapid, evidence-based strategic decisions.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font leading-tight">Expert Reporting Solutions</h2>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto font-medium">
              We architect and implement modern BI layers that sit atop your data ecosystem, providing a window into every critical business metric.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SOLUTIONS.map((item, i) => (
              <Motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-12 rounded-[2.5rem] bg-white border border-gray-100 space-y-6 hover:shadow-2xl transition-all group h-full shadow-sm"
              >
                <div className="p-4 bg-gray-50 rounded-2xl w-fit shadow-sm group-hover:bg-[#0171c1] group-hover:text-white transition-all duration-500">{item.icon}</div>
                <h3 className="text-2xl font-bold text-[#001A3D] display-font leading-tight">{item.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed text-sm">{item.desc}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1 space-y-10">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font leading-tight">
                  Clarity Across The Enterprise.
                </h2>
                <div className="w-20 h-1 bg-[#0171c1]"></div>
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  Data is only as valuable as the insights it reveals. Our visualization experts work at the intersection of data science and user experience to ensure your reports are not just beautiful, but actionable.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {CAPABILITIES.map((cap, i) => (
                  <div key={i} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="shrink-0">{cap.icon}</div>
                      <h4 className="font-bold text-[#001A3D] text-lg display-font">{cap.title}</h4>
                    </div>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">{cap.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="aspect-square rounded-sm overflow-hidden shadow-2xl">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                  alt="Business Intelligence Interface" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#0171c1] p-8 text-white max-w-xs shadow-2xl hidden md:block">
                <BarChart3 size={32} className="mb-4" />
                <h3 className="text-xl font-bold display-font mb-2">Metrics that Matter</h3>
                <p className="text-xs opacity-80 leading-relaxed font-medium">
                  We define and track KPIs that directly impact your bottom line, removing the noise from your reporting ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#0171c1] text-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 text-center space-y-10">
          <h2 className="text-4xl md:text-6xl font-bold display-font">See Your Data Differently</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">From executive dashboards to customer-facing analytics, we build the visual interfaces that power data-driven companies.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/contact" className="bg-white text-[#0171c1] px-12 py-5 font-bold uppercase tracking-wider text-[11px] hover:bg-[#001A3D] hover:text-white transition-all shadow-2xl rounded-sm">
              Schedule A Demo
            </Link>
            <Link href="/services" className="border-2 border-white/30 text-white px-12 py-5 font-bold uppercase tracking-wider text-[11px] hover:bg-white/10 transition-all rounded-sm">
              Explore All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
