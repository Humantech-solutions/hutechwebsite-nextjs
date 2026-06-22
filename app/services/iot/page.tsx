"use client";

import { motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  Cpu,
  Wifi,
  Zap,
  Activity,
  ShieldCheck,
  Database,
  MoveRight,
  Smartphone,
  LayoutGrid,
  Network,
  Settings,
  RefreshCw,
  BarChart3,
  Search,
  Layers,
  BrainCircuit,
  Radio,
  Microscope,
  Box,
  Factory,
  Building2,
  HardHat,
  Truck,
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

import { ServiceDetailContactCTA } from "@/components/ServiceDetailContactCTA";

const IOT_SERVICES = [
  {
    title: "Industrial IoT (IIoT)",
    icon: <Factory className="h-8 w-8 text-[#F99D1C]" />,
    desc: "Optimizing manufacturing with real-time asset tracking, predictive maintenance, and digital twins for smart factories.",
  },
  {
    title: "Smart Infrastructure",
    icon: <Building2 className="h-8 w-8 text-[#F99D1C]" />,
    desc: "Intelligent building management systems (IBMS), smart lighting, and energy optimization for sustainable urban environments.",
  },
  {
    title: "Connected Logistics",
    icon: <Truck className="h-8 w-8 text-[#F99D1C]" />,
    desc: "Real-time cold chain monitoring, fleet telemetry, and automated warehouse inventory management via RFID and IoT sensors.",
  },
  {
    title: "Consumer IoT Products",
    icon: <Smartphone className="h-8 w-8 text-[#F99D1C]" />,
    desc: "Development of smart home appliances, wearable health trackers, and intuitive mobile interfaces for the modern consumer.",
  },
];

const ARCHITECTURE_STEPS = [
  {
    step: "01",
    name: "Sensing & Perception",
    desc: "Deployment of advanced sensors, actuators, and smart controllers to capture physical data at the edge.",
    icon: <Microscope className="h-6 w-6" />,
  },
  {
    step: "02",
    name: "Communication & Gateway",
    desc: "Secure data transmission via LoRaWAN, NB-IoT, 5G, Zigbee, or MQTT protocols with edge gateway pre-processing.",
    icon: <Radio className="h-6 w-6" />,
  },
  {
    step: "03",
    name: "Cloud & AI Platform",
    desc: "Data ingestion into high-scale cloud platforms for storage, pattern recognition, and predictive modeling.",
    icon: <BrainCircuit className="h-6 w-6" />,
  },
  {
    step: "04",
    name: "Actionable Intelligence",
    desc: "Real-time dashboards, automated triggers, and mobile apps that empower decision-makers with data.",
    icon: <BarChart3 className="h-6 w-6" />,
  },
];

const CAPABILITIES = [
  {
    title: "Edge Computing Architecture",
    icon: <LayoutGrid className="h-6 w-6 text-[#0171c1]" />,
    desc: "Minimizing latency and bandwidth usage by processing mission-critical data locally before cloud synchronization.",
  },
  {
    title: "IoT Security & Device IAM",
    icon: <ShieldCheck className="h-6 w-6 text-[#0171c1]" />,
    desc: "End-to-end encryption, secure boot, and robust Identity & Access Management (IAM) for device authentication.",
  },
  {
    title: "Data Lake & Stream Processing",
    icon: <Database className="h-6 w-6 text-[#0171c1]" />,
    desc: "Handling massive telemetry streams with Kafka, Spark, and dedicated IoT data lakes for long-term analytics.",
  },
  {
    title: "OTA (Over-The-Air) Updates",
    icon: <RefreshCw className="h-6 w-6 text-[#0171c1]" />,
    desc: "Seamless firmware management and remote security patching for distributed device fleets without manual intervention.",
  },
];

const IOT_STACK = [
  { primary: "AWS IOT", secondary: "CONNECTED DEVICES" },
  { primary: "AZURE IOT", secondary: "DEVICE MANAGEMENT" },
  { primary: "MQTT", secondary: "REAL-TIME MESSAGING" },
  { primary: "RASPBERRY PI", secondary: "EDGE COMPUTING" },
  { primary: "ARDUINO", secondary: "EMBEDDED SYSTEMS" },
  { primary: "NODE.JS", secondary: "BACKEND" },
  { primary: "KAFKA", secondary: "DATA STREAMING" },
  { primary: "DOCKER", secondary: "CONTAINERS" },
  { primary: "KUBERNETES", secondary: "ORCHESTRATION" },
  { primary: "MONGODB", secondary: "DATA STORAGE" },
  { primary: "GRAFANA", secondary: "MONITORING" },
  { primary: "PYTHON", secondary: "AUTOMATION" },
];

export default function IotSolutions() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="IoT (Internet of Things) Solutions | Hutech Solutions"
        description="Comprehensive IoT engineering services—from hardware prototyping and connectivity to smart platforms and Industrial 4.0 automation."
      />
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1639140651961-41392a332bfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Connected Smart Devices Architecture"
            className="h-full w-full scale-105 object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[1px] w-12 bg-[#F99D1C]"></span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#F99D1C] uppercase">
                Industry 4.0 Excellence
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              Connected <br />
              <span className="text-[#F99D1C]">Intelligence.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-bold text-gray-300 md:text-xl">
              Transform your physical infrastructure into a responsive digital ecosystem. We
              engineer end-to-end IoT solutions that capture data, generate insights, and automate
              outcomes in real-time.
            </p>
            <Link href="/contact" className="btn-banner-cta mt-6 group">
              Consult Us
              <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Strategic Content: The IoT Value Chain */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
            <div className="space-y-8">
              <h2 className="display-font text-3xl leading-tight font-semibold text-[#001A3D] md:text-5xl">
                Bridging the gap between <br />
                <span className="text-[#0171c1]">Bits and Atoms.</span>
              </h2>
              <div className="h-1 w-20 bg-[#F99D1C]"></div>
              <p className="text-lg leading-relaxed font-bold text-gray-500">
                Modern IoT is not just about connectivity; it's about business resilience. Hutech
                Solutions provides the engineering depth to handle complex hardware prototyping,
                secure communication protocols, and high-scale cloud ingestion.
              </p>
              <div className="space-y-6">
                {[
                  {
                    title: "Predictive Analytics",
                    text: "Moving from reactive to proactive maintenance models.",
                  },
                  {
                    title: "Operational Visibility",
                    text: "Real-time tracking of assets, energy, and workflows.",
                  },
                  {
                    title: "Smart Automation",
                    text: "Triggering physical actions based on digital intelligence.",
                  },
                ].map((item, i) => (
                  <div key={i} className="group flex gap-4">
                    <div className="h-auto w-1.5 rounded-full bg-[#0171c1]/20 transition-colors group-hover:bg-[#0171c1]"></div>
                    <div>
                      <h4 className="text-lg font-bold text-[#001A3D]">{item.title}</h4>
                      <p className="text-sm font-bold text-gray-500">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="group relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1720036236694-d0a231c52563?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Industrial IoT Sensors"
                  className="h-full w-full object-cover grayscale-[0.2] transition-all duration-700 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D]/60 to-transparent"></div>
              </div>
              <div className="absolute -right-10 -bottom-10 hidden max-w-sm bg-[#0171c1] p-10 text-white shadow-2xl lg:block">
                <h3 className="display-font mb-4 text-2xl font-bold text-white">
                  Industrial Grade
                </h3>
                <p className="mb-6 text-sm leading-relaxed font-bold text-white opacity-90">
                  Our hardware solutions are designed for rugged environments, including
                  manufacturing floors, energy plants, and logistics hubs.
                </p>
                <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest text-white uppercase">
                  <span>IP67 Rated</span>
                  <span className="h-1 w-1 rounded-full bg-white"></span>
                  <span>EMC Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern IoT Grid */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
              Specialized IoT Domains
            </h2>
            <p className="mx-auto max-w-3xl text-lg font-bold text-gray-500">
              We tailor our IoT stack to meet the unique constraints and opportunities of your
              specific industry.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {IOT_SERVICES.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex h-full flex-col space-y-8 rounded-[2.5rem] border border-gray-100 bg-white p-10 shadow-sm transition-all hover:shadow-2xl"
              >
                <div className="w-fit rounded-2xl bg-gray-50 p-4 shadow-sm transition-all duration-500 group-hover:bg-[#0171c1] group-hover:text-white">
                  {item.icon}
                </div>
                <div className="flex-grow space-y-4">
                  <h3 className="display-font text-xl leading-tight font-bold text-[#001A3D]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-bold text-gray-500">{item.desc}</p>
                </div>
                <div className="border-t border-gray-50 pt-4">
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#0171c1] uppercase"
                  >
                    Inquire <MoveRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Roadmap */}
      <section className="relative overflow-hidden bg-[#001A3D] py-24 text-white">
        <div className="absolute top-0 right-0 h-full w-1/2 translate-x-1/2 -skew-x-12 bg-[#0171c1]/5"></div>
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 max-w-3xl space-y-6">
            <h2 className="display-font text-3xl font-semibold tracking-tight text-white md:text-6xl">
              The Hutech IoT <br />
              <span className="text-[#0171c1]">Lifecycle.</span>
            </h2>
            <p className="text-xl font-bold text-gray-400">
              From silicon to cloud, we manage the entire complexity of the connected stack.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {ARCHITECTURE_STEPS.map((step, i) => (
              <div key={i} className="group relative">
                <div className="display-font mb-8 text-6xl font-bold text-[#0171c1]/20 transition-colors group-hover:text-[#0171c1]/40">
                  {step.step}
                </div>
                <div className="space-y-4 text-white">
                  <div className="flex items-center gap-3 text-[#F99D1C]">
                    {step.icon}
                    <h4 className="display-font text-lg font-bold text-white">{step.name}</h4>
                  </div>
                  <p className="text-sm leading-relaxed font-bold text-gray-400">{step.desc}</p>
                </div>
                {i < 3 && (
                  <div className="absolute top-1/2 -right-4 hidden h-[1px] w-8 bg-white/10 lg:block"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Capabilities */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex flex-col items-start gap-20 lg:flex-row">
            <div className="flex-1 lg:sticky lg:top-24">
              <div className="space-y-10">
                <div className="space-y-6">
                  <h2 className="display-font text-3xl leading-tight font-semibold text-[#001A3D] md:text-5xl">
                    Technical Depth in <br />
                    <span className="text-[#0171c1]">Smart Engineering.</span>
                  </h2>
                  <p className="text-lg leading-relaxed font-bold text-gray-500">
                    Our IoT practice is anchored in rigorous engineering standards. We don't just
                    connect things; we build systems that are secure, interoperable, and globally
                    manageable.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {CAPABILITIES.map((cap, i) => (
                    <div
                      key={i}
                      className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-colors hover:bg-gray-50"
                    >
                      <div className="mb-6 transition-transform group-hover:scale-110">
                        {cap.icon}
                      </div>
                      <h4 className="display-font mb-4 text-lg font-bold text-[#001A3D]">
                        {cap.title}
                      </h4>
                      <p className="text-sm leading-relaxed font-bold text-gray-500">{cap.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full flex-1 space-y-12">
              <div className="group relative overflow-hidden rounded-sm shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1760553120209-8e9d5d2493e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Smart City Infrastructure"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D]/80 via-transparent to-transparent"></div>
                <div className="absolute right-8 bottom-8 left-8">
                  <p className="display-font mb-2 text-xl font-bold tracking-tight text-white uppercase">
                    City-Scale Connectivity
                  </p>
                  <p className="text-sm font-bold text-white/70">
                    Hutech provides the backbone for smart urban lighting, waste management, and
                    traffic optimization systems.
                  </p>
                </div>
              </div>

              <div className="border border-gray-100 bg-[#FAF9F6] p-12">
                <h3 className="display-font mb-6 text-2xl font-bold text-[#001A3D]">
                  Device Fleet Management
                </h3>
                <div className="space-y-6">
                  {[
                    "Zero-Touch Provisioning (ZTP)",
                    "Fleet-wide Firmware Over-The-Air (FOTA)",
                    "Real-time Device Health Monitoring",
                    "Automated Fleet Policy Enforcement",
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <CheckIcon className="h-5 w-5 text-[#0171c1]" />
                      <span className="text-sm font-bold tracking-wide text-gray-700 uppercase">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern IoT Stack Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#001A3D] via-[#030E21] to-[#020B1E] py-24 md:py-32 text-white">
        {/* Radial Light Glow behind heading */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Glowing Grid Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
          {/* Header */}
          <div className="mb-16 text-center md:mb-20">
            <div className="flex items-center justify-center gap-3 text-[10px] font-bold tracking-[0.3em] text-[#F99D1C] uppercase">
              <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#F99D1C]" />
              TECHNOLOGY STACK
              <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#F99D1C]" />
            </div>
            
            <h2 className="mt-4 display-font text-3xl font-bold tracking-wider text-white sm:text-4xl md:text-5xl uppercase">
              MODERN IoT STACK
            </h2>
            
            <div className="mx-auto mt-4 h-[3px] w-14 bg-[#F99D1C]" />
            
            <p className="mx-auto mt-6 max-w-2xl text-sm font-medium text-gray-400 md:text-base leading-relaxed">
              Advanced IoT technologies enabling connected devices, intelligent automation, real-time monitoring, and scalable smart ecosystems
            </p>
          </div>

          {/* Cards Grid */}
          <div className="border-l border-t border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {IOT_STACK.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="group relative z-0 hover:z-10 border-r border-b border-white/10 bg-[#030d22]/50 backdrop-blur-sm py-12 px-4 flex flex-col justify-center items-center h-32 md:h-36 text-center transition-all duration-300 ease-out hover:-translate-y-1.5 hover:bg-[#0a2a60]/40 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] hover:border-white/20"
                >
                  <span className="text-white font-bold tracking-wider text-xs md:text-sm uppercase mb-2 group-hover:text-white transition-colors duration-300">
                    {item.primary}
                  </span>
                  <span className="text-cyan-400 font-semibold tracking-wider text-[10px] md:text-xs uppercase transition-colors duration-300">
                    {item.secondary}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

            <ServiceDetailContactCTA />
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
