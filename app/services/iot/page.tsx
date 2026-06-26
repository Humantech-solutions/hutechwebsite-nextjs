"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ShieldCheck,
  Cpu,
  Zap,
  BarChart3,
  MoveRight,
  ArrowRight,
  ChevronRight,
  Workflow,
  Smartphone,
  Lock,
  MessageSquare,
  FileText,
  Sparkles,
  Database,
  RefreshCw,
  LayoutGrid,
  Search,
  Users,
  Building2,
  Globe,
  Settings,
  Network,
  Factory,
  Truck,
  Wifi,
  Activity,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

const IOT_SERVICES = [
  {
    icon: Factory,
    title: "Industrial IoT (IIoT)",
    description:
      "Optimize manufacturing workflows with real-time asset tracking, predictive maintenance models, and digital twin implementations to transform legacy operations for smart factories.",
  },
  {
    icon: Building2,
    title: "Smart Infrastructure",
    description:
      "Maximize energy efficiency and automate facility operations. We design intelligent building management systems (IBMS), automated smart lighting, and real-time HVAC optimization.",
  },
  {
    icon: Truck,
    title: "Connected Logistics",
    description:
      "Enable real-time cold chain monitoring, fleet telemetry integration, and automated warehouse inventory tracking using RFID, cellular trackers, and advanced edge sensors.",
  },
  {
    icon: Smartphone,
    title: "Consumer IoT Products",
    description:
      "Accelerate consumer-grade product launches. We build smart home appliances, wearable health monitoring trackers, and intuitive mobile application interfaces for end-users.",
  },
  {
    icon: Cpu,
    title: "Edge Computing & Gateways",
    description:
      "Process mission-critical sensor telemetry locally. We design edge gateways that handle real-time pre-processing, data filtering, and continuous offline operations safely.",
  },
  {
    icon: ShieldCheck,
    title: "IoT Security & Fleet IAM",
    description:
      "Protect your physical device assets. We implement secure boot keys, end-to-end payload encryption, and robust Identity & Access Management (IAM) for device authentication.",
  },
];

const ESSENTIAL_SOLUTIONS = [
  {
    icon: RefreshCw,
    title: "Firmware & OTA Management",
    description:
      "Automate device provisioning and deploy seamless Firmware Over-The-Air (FOTA) updates to patch critical security vulnerabilities remotely across millions of nodes without downtime.",
  },
  {
    icon: Database,
    title: "Real-Time Data Ingestion",
    description:
      "Deploy high-throughput streaming pipelines using Kafka and MQTT to ingest millions of telemetry data points per second with zero data loss or synchronization lag.",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    description:
      "Leverage machine learning algorithms on sensor telemetry to predict equipment failures, optimize wear cycles, and schedule servicing before costly disruptions occur.",
  },
  {
    icon: Network,
    title: "Device Fleet Telemetry",
    description:
      "Establish centralized monitoring consoles to track device connectivity, battery life, network signal strength, and environmental conditions in real time across the globe.",
  },
  {
    icon: Workflow,
    title: "Protocol Interoperability",
    description:
      "Bridge diverse hardware interfaces and protocols. We integrate MQTT, CoAP, LoRaWAN, Zigbee, and HTTP/REST seamlessly into unified enterprise data architectures.",
  },
  {
    icon: Sparkles,
    title: "Edge AI & Diagnostics",
    description:
      "Deploy lightweight machine learning models directly on edge hardware (MCU/MPU) to perform real-time pattern detection and trigger instant anomaly alerts locally.",
  },
];

const INNOVATIONS = [
  {
    icon: Zap,
    title: "5G-Enabled Edge Computing",
    description:
      "Harness ultra-low latency 5G networks to run high-speed localized decision-making models directly on manufacturing floors and active logistics hubs.",
  },
  {
    icon: Lock,
    title: "Blockchain Device Identity",
    description:
      "Implement decentralized cryptographic keys to verify device identity, prevent hardware spoofing, and secure ledger transactions between machines.",
  },
  {
    icon: LayoutGrid,
    title: "Digital Twin Architectures",
    description:
      "Create virtual replicas of physical assets and workflows, simulating operations to optimize performance and test modifications risk-free.",
  },
  {
    icon: Sparkles,
    title: "Energy-Harvesting Sensors",
    description:
      "Deploy self-powered sensor networks that harvest kinetic, thermal, or ambient solar energy, eliminating the need for periodic battery replacements.",
  },
  {
    icon: Globe,
    title: "LPWAN Smart Grid Networks",
    description:
      "Build battery-efficient, long-range wireless networks using LoRaWAN and NB-IoT for agricultural monitoring and remote utility grid management.",
  },
  {
    icon: Activity,
    title: "AI-Driven Fleet Diagnostics",
    description:
      "Apply cognitive diagnostics to distributed device clusters to automatically detect malfunctioning nodes and trigger self-healing processes.",
  },
];

const WHY_CHOOSE = [
  {
    title: "Silicon-to-Cloud Integration",
    description:
      "We provide complete engineering across the entire IoT stack, from custom embedded firmware and PCB design to wireless networks and cloud-scale data lakes.",
  },
  {
    title: "Industrial-Grade Security",
    description:
      "We protect physical assets and communication streams by embedding end-to-end encryption, device certificates, and zero-trust policies from day one.",
  },
  {
    title: "Agile Prototyping Framework",
    description:
      "Accelerate time-to-market with our rapid prototyping approach, validating hardware designs and network feasibility before committing to full-scale manufacturing.",
  },
  {
    title: "Scalable Fleet Orchestration",
    description:
      "Our cloud backends are designed to manage, monitor, and update millions of distributed device nodes seamlessly, ensuring high reliability and zero downtime.",
  },
];

const FAQS = [
  {
    question: "How do you secure IoT devices from cyber threats?",
    answer:
      "We implement multi-layered security including secure boot keys, device-specific certificates (X.509), TLS/SSL encryption for communication, and zero-trust access control to isolate device networks from public threats.",
  },
  {
    question: "What wireless connectivity protocol is best for our project?",
    answer:
      "It depends on range, battery life, and data requirements. We use LoRaWAN or NB-IoT for long-range, low-power sensor fields, Wi-Fi or cellular (LTE-M/5G) for high-bandwidth telemetry, and Zigbee/BLE for short-range indoor hubs.",
  },
  {
    question: "Can you integrate IoT data with our existing ERP or CRM?",
    answer:
      "Yes, we build secure API endpoints and middleware integrations to feed parsed telemetry, inventory alerts, and predictive maintenance logs directly into SAP, Salesforce, or custom internal systems.",
  },
  {
    question: "Do you handle hardware design and PCB prototyping?",
    answer:
      "Yes, Hutech provides firmware development and edge hardware selection/scoping. For mass production and custom PCB fabrication, we partner with certified electronics manufacturers while managing quality control.",
  },
  {
    question: "What is edge computing and when do we need it?",
    answer:
      "Edge computing processes sensor data locally near the physical source (e.g., on a factory floor gateway) rather than sending it all to the cloud. You need it to reduce latency, save bandwidth cost, or maintain operations when offline.",
  },
];

const BLOG_POSTS = [
  {
    id: "1",
    title: "Implementing Predictive Maintenance in Smart Factories",
    description:
      "Learn how sensor-based anomaly detection models are saving manufacturers millions by anticipating mechanical wear and scheduling downtime...",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "2",
    title: "Securing the Edge: Best Practices for Enterprise IoT Fleets",
    description:
      "As connected devices proliferate, securing edge gateways and node telemetry is critical. Discover Hutech's security-first design patterns...",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "3",
    title: "FOTA Updates: Managing Millions of Devices Safely",
    description:
      "Over-the-air firmware updates are essential for modern IoT. Explore the orchestration frameworks that ensure zero-brick updates...",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

const IOT_STACK = [
  { primary: "MQTT", secondary: "REAL-TIME MESSAGING" },
  { primary: "AWS IOT", secondary: "CLOUD PLATFORM" },
  { primary: "AZURE IOT", secondary: "DEVICE MANAGEMENT" },
  { primary: "LoRaWAN", secondary: "LPWAN NETWORK" },
  { primary: "RASPBERRY PI", secondary: "EDGE HARDWARE" },
  { primary: "ARDUINO", secondary: "EMBEDDED SYSTEMS" },
  { primary: "ZIGBEE", secondary: "WIRELESS PROTOCOL" },
  { primary: "NODE-RED", secondary: "WORKFLOW FLOWS" },
  { primary: "INFLUXDB", secondary: "TIME SERIES DB" },
  { primary: "GRAFANA", secondary: "METRICS MONITORING" },
  { primary: "PYTHON", secondary: "EDGE AUTOMATION" },
  { primary: "DOCKER", secondary: "CONTAINERIZATION" },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-center justify-between py-6 text-left"
      >
        <span
          className={`text-lg font-bold transition-colors md:text-xl ${isOpen ? "text-[#0171c1]" : "text-[#001A3D] group-hover:text-[#0171c1]"}`}
        >
          {question}
        </span>
        <div
          className={`flex h-8 w-8 items-center justify-center transition-all ${isOpen ? "text-[#0171c1]" : "text-gray-400"}`}
        >
          <ChevronRight
            className={`transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
          />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-lg leading-relaxed text-gray-500">{answer}</p>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function IotSolutions() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title="IoT (Internet of Things) Solutions | Hutech Solutions"
        description="Transform your physical infrastructure into a responsive digital ecosystem with Hutech's end-to-end IoT engineering, firmware, and cloud services."
      />

      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1639140651961-41392a332bfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="IoT Smart Devices Architecture"
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
              <span className="h-[1px] w-12 bg-[#F99D1C]"></span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#F99D1C] uppercase">
                IoT Excellence
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              Your Device Vision. <br />
              <span className="text-[#F99D1C]">Smart Ecosystem Revolution.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              We craft intelligent connected experiences through cutting-edge hardware prototyping,
              secure network protocols, and expert IoT consulting for global enterprise leaders.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="display-font text-3xl leading-tight font-semibold text-[#001A3D] md:text-5xl">
                  Empowering Organizations with Smart, Scalable IoT Ecosystems
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
              </div>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  At Hutech Solutions, we bring deep expertise in implementing, supporting, and
                  managing integrated IoT platforms. Our end-to-end solutions include custom
                  sensor deployment, edge computing architectures, secure communication protocols,
                  and cloud-based telemetry analytics.
                </p>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  We ensure our clients can operate with agility, high reliability, and real-time
                  visibility, enabling them to expand operations and integrate fresh smart solutions
                  to meet specific infrastructure and industrial needs.
                </p>
              </div>
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">50M+</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Connected Devices
                  </p>
                </div>
                <div className="hidden h-12 w-[1px] bg-gray-200 md:block"></div>
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">99.5%</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Uptime Guarantee
                  </p>
                </div>
                <div className="hidden h-12 w-[1px] bg-gray-200 md:block"></div>
                <div className="space-y-1">
                  <p className="display-font text-3xl font-bold text-[#001A3D]">30%</p>
                  <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                    Avg Cost Reduction
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-sm shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1720036236694-d0a231c52563?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Industrial IoT Sensors"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 hidden max-w-xs space-y-4 bg-[#0171c1] p-10 text-white shadow-2xl md:block">
                <Cpu size={32} strokeWidth={1.5} />
                <h3 className="display-font text-xl font-bold">Smart Automation</h3>
                <p className="text-sm leading-relaxed font-medium opacity-80">
                  Integrating AI and edge processing across IoT platforms to streamline tasks and
                  enhance digital agility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
              Our IoT Services
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              At Hutech Solutions, we specialize in delivering cutting-edge software technology
              solutions tailored for the global connected device landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {IOT_SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative flex flex-col space-y-6 overflow-hidden border border-gray-100 bg-white p-12 shadow-sm transition-all duration-500 hover:shadow-2xl"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5 transition-opacity group-hover:opacity-10">
                    <Icon size={80} strokeWidth={1} />
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-sm bg-gray-50 text-[#0171c1] transition-all duration-500 group-hover:bg-[#0171c1] group-hover:text-white">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="display-font text-xl leading-tight font-bold text-[#001A3D]">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-medium text-gray-500">
                    {service.description}
                  </p>
                  <div className="mt-auto pt-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#0171c1] uppercase transition-all group-hover:gap-4"
                    >
                      Learn More <MoveRight size={14} />
                    </Link>
                  </div>
                </Motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Essential Solutions Section */}
      <section className="overflow-hidden bg-[#001A3D] py-24 text-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font mx-auto max-w-4xl text-3xl leading-tight font-semibold md:text-5xl">
              What Makes Custom IoT Solutions Essential for Your Business?
            </h2>
            <div className="mx-auto h-1 w-20 bg-[#0171c1]"></div>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-400">
              In the modern digital landscape, custom IoT perimeters are key to staying competitive
              and ensuring operational excellence.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {ESSENTIAL_SOLUTIONS.map((item, i) => {
              const Icon = item.icon;
              return (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group space-y-6 rounded-sm border border-white/5 p-8 transition-colors hover:bg-white/5"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-sm bg-white/10 text-[#0171c1] transition-transform group-hover:scale-110">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="display-font text-xl font-bold tracking-tight">{item.title}</h3>
                    <p className="text-sm leading-relaxed font-medium text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </Motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Innovations Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
              Which Innovations Can Transform Your IoT Capabilities?
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-500">
              Incorporating advanced technologies can significantly enhance your connected device
              capabilities for the digital-first era.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {INNOVATIONS.map((item, i) => {
              const Icon = item.icon;
              return (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex flex-col items-center space-y-6 text-center"
                >
                  <div className="text-[#0171c1] transition-transform duration-500 group-hover:scale-110">
                    <Icon size={56} strokeWidth={1} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="display-font text-xl font-bold tracking-tight text-[#001A3D]">
                      {item.title}
                    </h3>
                    <p className="max-w-sm text-sm leading-relaxed font-medium text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </Motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="overflow-hidden bg-[#F2F2F2] py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex flex-col items-center gap-20 lg:flex-row">
            <div className="flex-1 space-y-10">
              <div className="space-y-6">
                <h2 className="display-font text-3xl leading-[1.2] font-semibold text-[#001A3D] md:text-5xl">
                  Discover Your IoT & Smart Ecosystem Strategy With Us
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  Schedule a consultation with our expert IoT engineering team and take the first
                  step towards a connected, digital-first physical infrastructure.
                </p>
              </div>
              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-sm bg-[#F99D1C] px-10 py-5 text-[11px] font-bold tracking-wider text-[#001A3D] uppercase shadow-xl transition-all duration-500 hover:bg-[#001A3D] hover:text-white"
                >
                  Consult Us Now <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="relative flex-1">
              <div className="relative z-10 aspect-video rounded-sm bg-white p-2 shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1760553120209-8e9d5d2493e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Smart City Infrastructure"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -top-10 -right-10 -z-10 h-64 w-64 rounded-full bg-[#0171c1]/5 blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 -z-10 h-48 w-48 rounded-full bg-[#F99D1C]/10 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
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
              Advanced IoT technologies enabling connected devices, intelligent automation,
              real-time monitoring, and scalable smart ecosystems
            </p>
          </div>

          {/* Cards Grid */}
          <div className="border-l border-t border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {IOT_STACK.map((item, idx) => (
                <Motion.div
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
                </Motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
              Why Choose Hutech Solutions for Your IoT Project?
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              At Hutech Solutions, we specialize in delivering IoT engineering solutions tailored to
              your unique organizational needs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-20 gap-y-16 md:grid-cols-2">
            {WHY_CHOOSE.map((item, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group flex items-start gap-8"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm bg-[#0171c1]/5 text-[#0171c1] transition-all duration-500 group-hover:bg-[#0171c1] group-hover:text-white">
                  <Zap size={24} strokeWidth={1.5} />
                </div>
                <div className="space-y-4">
                  <h3 className="display-font text-xl font-bold tracking-tight text-[#001A3D]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-medium text-gray-500">
                    {item.description}
                  </p>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-20 lg:grid-cols-12">
            <div className="rounded-sm border border-gray-100 bg-white p-10 shadow-2xl md:p-14 lg:col-span-7">
              <h2 className="display-font mb-10 text-3xl font-bold text-[#001A3D]">
                Share Your IoT Project With Us
              </h2>
              <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Name*"
                  className="w-full border border-gray-200 p-4 text-sm font-medium transition-all outline-none focus:border-[#0171c1]"
                />
                <input
                  type="email"
                  placeholder="Email*"
                  className="w-full border border-gray-200 p-4 text-sm font-medium transition-all outline-none focus:border-[#0171c1]"
                />
                <input
                  type="tel"
                  placeholder="Phone Number*"
                  className="w-full border border-gray-200 p-4 text-sm font-medium transition-all outline-none focus:border-[#0171c1] md:col-span-2"
                />
                <textarea
                  placeholder="Tell us about your connected device or smart infrastructure needs"
                  rows={4}
                  className="w-full resize-none border border-gray-200 p-4 text-sm font-medium transition-all outline-none focus:border-[#0171c1] md:col-span-2"
                ></textarea>
                <div className="md:col-span-2">
                  <button className="w-full rounded-sm bg-[#F99D1C] px-12 py-5 text-[11px] font-bold tracking-wider text-[#001A3D] uppercase shadow-xl transition-all duration-500 hover:bg-[#001A3D] hover:text-white md:w-auto">
                    Submit Project Request
                  </button>
                </div>
              </form>
            </div>
            <div className="space-y-12 py-8 lg:col-span-5">
              <h2 className="display-font text-3xl font-bold text-[#001A3D]">
                What Is The Next Step?
              </h2>
              <div className="space-y-10">
                {[
                  {
                    icon: MessageSquare,
                    text: "An IoT engineering consultant will review your request and contact you within a few business hours.",
                  },
                  {
                    icon: FileText,
                    text: "We will schedule a technical scoping session to define hardware specifications, connectivity, and data requirements.",
                  },
                  {
                    icon: Sparkles,
                    text: "You will receive a comprehensive implementation proposal covering prototyping, fleet scaling, and cloud integration.",
                  },
                ].map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={i} className="group flex items-start gap-8">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gray-200 text-[#0171c1] transition-all duration-500 group-hover:border-[#0171c1] group-hover:bg-[#0171c1] group-hover:text-white">
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      <p className="pt-2 text-lg leading-relaxed font-medium text-gray-500">
                        {step.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl font-semibold tracking-tight text-[#001A3D] md:text-5xl">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto h-1 w-20 bg-[#0171c1]"></div>
          </div>
          <div className="mx-auto max-w-4xl divide-y divide-gray-100">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Resource Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-16 flex items-end justify-between gap-8">
            <div className="max-w-2xl space-y-6">
              <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
                IoT Insights & Articles
              </h2>
              <p className="text-lg font-medium text-gray-500">
                Explore our latest thinking on IoT technology and smart system trends.
              </p>
            </div>
            <Link
              href="/resources"
              className="hidden items-center gap-2 pb-2 text-[11px] font-bold tracking-widest text-[#0171c1] uppercase transition-all hover:gap-4 md:flex"
            >
              View All Resources <MoveRight size={16} />
            </Link>
          </div>

          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {BLOG_POSTS.map((post, i) => (
              <div
                key={i}
                className="group overflow-hidden rounded-sm bg-white shadow-sm transition-all duration-500 hover:shadow-2xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="rounded-sm bg-[#0171c1] px-3 py-1 text-[9px] font-bold tracking-widest text-white uppercase">
                      IoT
                    </span>
                  </div>
                </div>
                <div className="space-y-4 p-8">
                  <h3 className="display-font line-clamp-2 min-h-[3.5rem] text-xl leading-tight font-bold text-[#001A3D] transition-colors group-hover:text-[#0171c1]">
                    {post.title}
                  </h3>
                  <p className="line-clamp-3 text-sm leading-relaxed font-medium text-gray-500">
                    {post.description}
                  </p>
                  <div className="border-t border-gray-50 pt-4">
                    <Link
                      href={`/resources/blogs/${post.id}`}
                      className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#001A3D] uppercase transition-colors hover:text-[#0171c1]"
                    >
                      Read Article <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center md:hidden">
            <Link
              href="/resources"
              className="inline-flex items-center gap-3 rounded-sm bg-[#0171c1] px-10 py-5 text-[11px] font-bold tracking-wider text-white uppercase shadow-xl"
            >
              Explore Resources <MoveRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
