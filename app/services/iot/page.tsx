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
  Truck
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

const IOT_SERVICES = [
  {
    title: "Industrial IoT (IIoT)",
    icon: <Factory className="w-8 h-8 text-[#FFAF2B]" />,
    desc: "Optimizing manufacturing with real-time asset tracking, predictive maintenance, and digital twins for smart factories."
  },
  {
    title: "Smart Infrastructure",
    icon: <Building2 className="w-8 h-8 text-[#FFAF2B]" />,
    desc: "Intelligent building management systems (IBMS), smart lighting, and energy optimization for sustainable urban environments."
  },
  {
    title: "Connected Logistics",
    icon: <Truck className="w-8 h-8 text-[#FFAF2B]" />,
    desc: "Real-time cold chain monitoring, fleet telemetry, and automated warehouse inventory management via RFID and IoT sensors."
  },
  {
    title: "Consumer IoT Products",
    icon: <Smartphone className="w-8 h-8 text-[#FFAF2B]" />,
    desc: "Development of smart home appliances, wearable health trackers, and intuitive mobile interfaces for the modern consumer."
  }
];

const ARCHITECTURE_STEPS = [
  {
    step: "01",
    name: "Sensing & Perception",
    desc: "Deployment of advanced sensors, actuators, and smart controllers to capture physical data at the edge.",
    icon: <Microscope className="w-6 h-6" />
  },
  {
    step: "02",
    name: "Communication & Gateway",
    desc: "Secure data transmission via LoRaWAN, NB-IoT, 5G, Zigbee, or MQTT protocols with edge gateway pre-processing.",
    icon: <Radio className="w-6 h-6" />
  },
  {
    step: "03",
    name: "Cloud & AI Platform",
    desc: "Data ingestion into high-scale cloud platforms for storage, pattern recognition, and predictive modeling.",
    icon: <BrainCircuit className="w-6 h-6" />
  },
  {
    step: "04",
    name: "Actionable Intelligence",
    desc: "Real-time dashboards, automated triggers, and mobile apps that empower decision-makers with data.",
    icon: <BarChart3 className="w-6 h-6" />
  }
];

const CAPABILITIES = [
  {
    title: "Edge Computing Architecture",
    icon: <LayoutGrid className="w-6 h-6 text-[#0171c1]" />,
    desc: "Minimizing latency and bandwidth usage by processing mission-critical data locally before cloud synchronization."
  },
  {
    title: "IoT Security & Device IAM",
    icon: <ShieldCheck className="w-6 h-6 text-[#0171c1]" />,
    desc: "End-to-end encryption, secure boot, and robust Identity & Access Management (IAM) for device authentication."
  },
  {
    title: "Data Lake & Stream Processing",
    icon: <Database className="w-6 h-6 text-[#0171c1]" />,
    desc: "Handling massive telemetry streams with Kafka, Spark, and dedicated IoT data lakes for long-term analytics."
  },
  {
    title: "OTA (Over-The-Air) Updates",
    icon: <RefreshCw className="w-6 h-6 text-[#0171c1]" />,
    desc: "Seamless firmware management and remote security patching for distributed device fleets without manual intervention."
  }
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
      <section className="bg-[#001A3D] text-white h-[450px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1639140651961-41392a332bfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Connected Smart Devices Architecture"
            className="w-full h-full object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/80 to-transparent"></div>
        </div>
        
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-20 z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[1px] bg-[#FFAF2B]"></span>
              <span className="text-[#FFAF2B] font-bold uppercase tracking-[0.3em] text-[10px]">Industry 4.0 Excellence</span>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight display-font mb-8">
              Connected <br />
              <span className="text-[#FFAF2B]">Intelligence.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-bold leading-relaxed">
              Transform your physical infrastructure into a responsive digital ecosystem. We engineer end-to-end IoT solutions that capture data, generate insights, and automate outcomes in real-time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Strategic Content: The IoT Value Chain */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font leading-tight text-[#001A3D]">
                Bridging the gap between <br />
                <span className="text-[#0171c1]">Bits and Atoms.</span>
              </h2>
              <div className="w-20 h-1 bg-[#FFAF2B]"></div>
              <p className="text-lg text-gray-500 font-bold leading-relaxed">
                Modern IoT is not just about connectivity; it's about business resilience. Hutech Solutions provides the engineering depth to handle complex hardware prototyping, secure communication protocols, and high-scale cloud ingestion.
              </p>
              <div className="space-y-6">
                 {[
                   { title: "Predictive Analytics", text: "Moving from reactive to proactive maintenance models." },
                   { title: "Operational Visibility", text: "Real-time tracking of assets, energy, and workflows." },
                   { title: "Smart Automation", text: "Triggering physical actions based on digital intelligence." }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-4 group">
                      <div className="w-1.5 h-auto bg-[#0171c1]/20 group-hover:bg-[#0171c1] transition-colors rounded-full"></div>
                      <div>
                        <h4 className="font-bold text-[#001A3D] text-lg">{item.title}</h4>
                        <p className="text-gray-500 text-sm font-bold">{item.text}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
            <div className="relative group">
               <div className="aspect-[4/5] rounded-sm overflow-hidden relative shadow-2xl">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1720036236694-d0a231c52563?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                    alt="Industrial IoT Sensors" 
                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D]/60 to-transparent"></div>
               </div>
               <div className="absolute -bottom-10 -right-10 bg-[#0171c1] p-10 text-white max-w-sm shadow-2xl hidden lg:block">
                  <h3 className="text-2xl font-bold display-font mb-4 text-white">Industrial Grade</h3>
                  <p className="text-sm opacity-90 leading-relaxed font-bold mb-6 text-white">
                    Our hardware solutions are designed for rugged environments, including manufacturing floors, energy plants, and logistics hubs.
                  </p>
                  <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase text-white">
                    <span>IP67 Rated</span>
                    <span className="w-1 h-1 bg-white rounded-full"></span>
                    <span>EMC Certified</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern IoT Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font">Specialized IoT Domains</h2>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto font-bold">
              We tailor our IoT stack to meet the unique constraints and opportunities of your specific industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {IOT_SERVICES.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[2.5rem] bg-white border border-gray-100 space-y-8 hover:shadow-2xl transition-all group flex flex-col h-full shadow-sm"
              >
                <div className="p-4 bg-gray-50 rounded-2xl w-fit shadow-sm group-hover:bg-[#0171c1] group-hover:text-white transition-all duration-500">{item.icon}</div>
                <div className="space-y-4 flex-grow">
                  <h3 className="text-xl font-bold text-[#001A3D] display-font leading-tight">{item.title}</h3>
                  <p className="text-gray-500 font-bold leading-relaxed text-sm">{item.desc}</p>
                </div>
                <div className="pt-4 border-t border-gray-50">
                  <Link href="/contact" className="text-[10px] font-bold text-[#0171c1] uppercase tracking-[0.2em] flex items-center gap-2">
                    Inquire <MoveRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Roadmap */}
      <section className="py-24 bg-[#001A3D] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#0171c1]/5 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10 w-full">
          <div className="max-w-3xl mb-20 space-y-6">
             <h2 className="text-3xl md:text-6xl font-semibold display-font tracking-tight text-white">The Hutech IoT <br /><span className="text-[#0171c1]">Lifecycle.</span></h2>
             <p className="text-xl text-gray-400 font-bold">From silicon to cloud, we manage the entire complexity of the connected stack.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {ARCHITECTURE_STEPS.map((step, i) => (
              <div key={i} className="relative group">
                <div className="text-6xl font-bold text-[#0171c1]/20 display-font mb-8 group-hover:text-[#0171c1]/40 transition-colors">{step.step}</div>
                <div className="space-y-4 text-white">
                  <div className="flex items-center gap-3 text-[#FFAF2B]">
                    {step.icon}
                    <h4 className="text-lg font-bold display-font text-white">{step.name}</h4>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed font-bold">{step.desc}</p>
                </div>
                {i < 3 && <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[1px] bg-white/10"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Capabilities */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-20 items-start">
            <div className="flex-1 lg:sticky lg:top-24">
              <div className="space-y-10">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font leading-tight">
                    Technical Depth in <br />
                    <span className="text-[#0171c1]">Smart Engineering.</span>
                  </h2>
                  <p className="text-lg text-gray-500 font-bold leading-relaxed">
                    Our IoT practice is anchored in rigorous engineering standards. We don't just connect things; we build systems that are secure, interoperable, and globally manageable.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {CAPABILITIES.map((cap, i) => (
                    <div key={i} className="p-8 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors group shadow-sm bg-white">
                      <div className="mb-6 group-hover:scale-110 transition-transform">{cap.icon}</div>
                      <h4 className="font-bold text-[#001A3D] text-lg display-font mb-4">{cap.title}</h4>
                      <p className="text-sm text-gray-500 font-bold leading-relaxed">{cap.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-1 w-full space-y-12">
               <div className="relative group rounded-sm overflow-hidden shadow-2xl">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1760553120209-8e9d5d2493e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                    alt="Smart City Infrastructure" 
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D]/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                     <p className="text-white font-bold text-xl display-font mb-2 uppercase tracking-tight">City-Scale Connectivity</p>
                     <p className="text-white/70 text-sm font-bold">Hutech provides the backbone for smart urban lighting, waste management, and traffic optimization systems.</p>
                  </div>
               </div>
               
               <div className="bg-[#FAF9F6] p-12 border border-gray-100">
                  <h3 className="text-2xl font-bold text-[#001A3D] display-font mb-6">Device Fleet Management</h3>
                  <div className="space-y-6">
                     {[
                       "Zero-Touch Provisioning (ZTP)",
                       "Fleet-wide Firmware Over-The-Air (FOTA)",
                       "Real-time Device Health Monitoring",
                       "Automated Fleet Policy Enforcement"
                     ].map((text, i) => (
                       <div key={i} className="flex items-center gap-4">
                          <CheckIcon className="w-5 h-5 text-[#0171c1]" />
                          <span className="text-gray-700 font-bold text-sm tracking-wide uppercase">{text}</span>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#0171c1] text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-white/5 blur-[120px] rounded-full"></div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 text-center space-y-10 relative z-10">
          <h2 className="text-4xl md:text-7xl font-bold display-font leading-tight text-white">Engineer Your <br /> Connected Future.</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto font-bold text-white">Whether you're building a smart product or digitizing a factory floor, Hutech provides the IoT technical edge.</p>
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <Link href="/contact" className="bg-white text-[#0171c1] px-12 py-5 font-bold uppercase tracking-wider text-[11px] hover:bg-[#001A3D] hover:text-white transition-all shadow-2xl rounded-sm">
              Start IoT Discovery
            </Link>
            <Link href="/services" className="border-2 border-white/30 text-white px-12 py-5 font-bold uppercase tracking-wider text-[11px] hover:bg-white/10 transition-all rounded-sm">
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
