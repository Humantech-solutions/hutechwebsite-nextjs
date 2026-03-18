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
  Layers,
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

const SOLUTIONS = [
  {
    title: "Interactive Dashboards",
    icon: <Layout className="h-8 w-8 text-[#FFAF2B]" />,
    desc: "Building dynamic, drill-down capable dashboards using Power BI, Tableau, and custom React-based visualization frameworks.",
  },
  {
    title: "Real-time Reporting",
    icon: <Clock className="h-8 w-8 text-[#FFAF2B]" />,
    desc: "Implementing streaming data visualizations for live operations monitoring, ensuring zero-latency business awareness.",
  },
  {
    title: "Executive Insights",
    icon: <Presentation className="h-8 w-8 text-[#FFAF2B]" />,
    desc: "C-suite level reporting that distills complex data into clear, strategic narratives for informed decision making.",
  },
];

const CAPABILITIES = [
  {
    title: "Custom Data Viz",
    icon: <Eye className="h-6 w-6 text-[#0171c1]" />,
    desc: "Creating specialized charts and maps tailored to unique industry metrics and proprietary data models.",
  },
  {
    title: "Embedded Analytics",
    icon: <Monitor className="h-6 w-6 text-[#0171c1]" />,
    desc: "Seamlessly integrating reporting tools directly into your existing enterprise portals and customer-facing apps.",
  },
  {
    title: "Self-Service BI",
    icon: <Zap className="h-6 w-6 text-[#0171c1]" />,
    desc: "Empowering your teams with governed environments to explore data and create their own reports without IT friction.",
  },
  {
    title: "Data Storytelling",
    icon: <Search className="h-6 w-6 text-[#0171c1]" />,
    desc: "Transforming raw numbers into visual narratives that highlight trends, anomalies, and hidden opportunities.",
  },
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
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Data Visualization Dashboard"
            className="h-full w-full scale-105 object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-20">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[1px] w-12 bg-[#FFAF2B]"></span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#FFAF2B] uppercase">
                Business Intelligence
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              Visualize Your <br />
              <span className="text-[#FFAF2B]">Business Pulse.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              We turn complex, fragmented data into clear, interactive visual stories. Gain the
              clarity you need to make rapid, evidence-based strategic decisions.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl leading-tight font-semibold text-[#001A3D] md:text-5xl">
              Expert Reporting Solutions
            </h2>
            <p className="mx-auto max-w-3xl text-lg font-medium text-gray-500">
              We architect and implement modern BI layers that sit atop your data ecosystem,
              providing a window into every critical business metric.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {SOLUTIONS.map((item, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group h-full space-y-6 rounded-[2.5rem] border border-gray-100 bg-white p-12 shadow-sm transition-all hover:shadow-2xl"
              >
                <div className="w-fit rounded-2xl bg-gray-50 p-4 shadow-sm transition-all duration-500 group-hover:bg-[#0171c1] group-hover:text-white">
                  {item.icon}
                </div>
                <h3 className="display-font text-2xl leading-tight font-bold text-[#001A3D]">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed font-medium text-gray-500">{item.desc}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex flex-col items-center gap-20 lg:flex-row">
            <div className="flex-1 space-y-10">
              <div className="space-y-6">
                <h2 className="display-font text-3xl leading-tight font-semibold text-[#001A3D] md:text-5xl">
                  Clarity Across The Enterprise.
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  Data is only as valuable as the insights it reveals. Our visualization experts
                  work at the intersection of data science and user experience to ensure your
                  reports are not just beautiful, but actionable.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {CAPABILITIES.map((cap, i) => (
                  <div key={i} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="shrink-0">{cap.icon}</div>
                      <h4 className="display-font text-lg font-bold text-[#001A3D]">{cap.title}</h4>
                    </div>
                    <p className="text-sm leading-relaxed font-medium text-gray-500">{cap.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative flex-1">
              <div className="aspect-square overflow-hidden rounded-sm shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Business Intelligence Interface"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden max-w-xs bg-[#0171c1] p-8 text-white shadow-2xl md:block">
                <BarChart3 size={32} className="mb-4" />
                <h3 className="display-font mb-2 text-xl font-bold">Metrics that Matter</h3>
                <p className="text-xs leading-relaxed font-medium opacity-80">
                  We define and track KPIs that directly impact your bottom line, removing the noise
                  from your reporting ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0171c1] py-24 text-white">
        <div className="mx-auto max-w-[1280px] space-y-10 px-6 text-center lg:px-20">
          <h2 className="display-font text-4xl font-bold md:text-6xl">See Your Data Differently</h2>
          <p className="mx-auto max-w-3xl text-xl opacity-90">
            From executive dashboards to customer-facing analytics, we build the visual interfaces
            that power data-driven companies.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/contact"
              className="rounded-sm bg-white px-12 py-5 text-[11px] font-bold tracking-wider text-[#0171c1] uppercase shadow-2xl transition-all hover:bg-[#001A3D] hover:text-white"
            >
              Schedule A Demo
            </Link>
            <Link
              href="/services"
              className="rounded-sm border-2 border-white/30 px-12 py-5 text-[11px] font-bold tracking-wider text-white uppercase transition-all hover:bg-white/10"
            >
              Explore All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
