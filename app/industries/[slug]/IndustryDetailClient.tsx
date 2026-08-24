"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Building2,
  Users,
  Database,
  Globe,
  Workflow,
  Monitor,
  Zap,
  Lock,
  MessageSquare,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Target,
  Smartphone,
  Cpu,
  Cloud,
  FileText,
  LayoutGrid,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Heart,
  Activity,
  Factory,
  BatteryCharging,
  MoveRight,
  Brain
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { submitContactForm } from "@/lib/api";
import { HutechService, WpBlog } from "@/lib/wordpress";
import { renderTitle } from "@/lib/utils";
import { toast } from "sonner";

interface IndustryDetailClientProps {
  service: HutechService;
  blogs: WpBlog[];
}

const FALLBACK_ICONS = [
  Building2,
  Users,
  Database,
  Globe,
  Workflow,
  Monitor,
  Zap,
  Lock,
  ShieldCheck,
  Factory,
  Truck,
  Heart,
  Activity,
  BatteryCharging,
  Cloud,
  Cpu,
  Smartphone,
  Target,
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left group"
      >
        <span className={`text-lg md:text-xl font-bold transition-colors ${isOpen ? "text-[#0171c1]" : "text-[#001A3D] group-hover:text-[#0171c1]"}`}>
          {question}
        </span>
        <div className={`flex h-8 w-8 items-center justify-center transition-all ${isOpen ? "text-[#0171c1]" : "text-gray-400"}`}>
          <ChevronRight className={`transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} />
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
            <p className="pb-8 text-lg leading-relaxed font-medium text-gray-500">{answer}</p>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function IndustryDetailClient({ service, blogs }: IndustryDetailClientProps) {
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);

  const heroTitleText = service.heroTitle || service.title || "Industry Solutions";

  const statsToRender = service.stats && service.stats.length > 0 ? service.stats : [
    { value: "25+", label: "Years Experience" },
    { value: "150+", label: "Projects Delivered" },
    { value: "100%", label: "Client Satisfaction" },
  ];

  const servicesToRender = service.services && service.services.length > 0 ? service.services : [
    { title: `${service.title || "Industry"} Strategy & Consulting`, description: `Tailored digital roadmaps and architecture consulting designed to accelerate transformation for ${service.title || "enterprise"} leaders.`, btnname: "Learn More", btnurl: "/contact" },
    { title: "Core Platform Modernization", description: `Migrate legacy infrastructure into cloud-native, highly available architectures built for high transaction throughput and zero downtime.`, btnname: "Learn More", btnurl: "/contact" },
    { title: "Data & Advanced Analytics", description: `Transform enterprise data into real-time business intelligence with automated analytics and machine learning forecasting models.`, btnname: "Learn More", btnurl: "/contact" },
    { title: "Regulatory Compliance & Security", description: `Incorporate robust governance, audit logging, and industry compliance standards into the foundation of your digital ecosystem.`, btnname: "Learn More", btnurl: "/contact" },
    { title: "Process Automation & RPA", description: `Streamline repetitive back-office and customer-facing workflows to enhance operational speed, precision, and efficiency.`, btnname: "Learn More", btnurl: "/contact" },
    { title: "Omnichannel Customer Experience", description: `Deliver frictionless, unified customer touchpoints across mobile, web, and internal enterprise platforms.`, btnname: "Learn More", btnurl: "/contact" },
  ];

  const solutionsToRender = service.solutions && service.solutions.length > 0 ? service.solutions : [
    { title: "Regulatory Compliance", description: "Custom software built with industry standards to ensure full compliance with regional and global regulations, reducing operational risk.", btnname: "", btnurl: "" },
    { title: "Enhanced Security", description: "Multi-layered encryption, identity access management, and threat prevention safeguarding mission-critical organizational data.", btnname: "", btnurl: "" },
    { title: "Operational Efficiency", description: "Automated workflows and centralized management tools that reduce overhead and increase workforce productivity.", btnname: "", btnurl: "" },
    { title: "Enterprise Scalability", description: "Modular microservices and elastic cloud infrastructure engineered to scale effortlessly with your growing business demand.", btnname: "", btnurl: "" },
    { title: "Domain-Specific Workflows", description: "Custom built features addressing the specific operational requirements and integration points of your industry.", btnname: "", btnurl: "" },
    { title: "Data-Driven Insights", description: "Real-time dashboards and predictive analytics that empower leadership to make confident, strategic decisions.", btnname: "", btnurl: "" },
  ];

  const innovationsToRender = service.innovations && service.innovations.length > 0 ? service.innovations : [
    { title: "AI & Machine Learning", description: `Enhance decision-making, automate complex tasks, and deliver hyper-personalized experiences with purpose-built AI models.` },
    { title: "Cloud-Native Architectures", description: `Scale infrastructure dynamically with resilient, highly available cloud systems built for low-latency performance.` },
    { title: "Intelligent Automation (RPA)", description: `Free your workforce for high-value tasks by automating high-volume, rules-based business operations.` },
    { title: "Distributed Ledger & Blockchain", description: `Ensure transparency, provenance, and tamper-proof verification across multi-party transactions and supply networks.` },
    { title: "Edge Computing & IoT Integration", description: `Gather and process telemetry data at the source for instantaneous alerts, preventive maintenance, and real-time control.` },
    { title: "Big Data & Real-Time Analytics", description: `Harness high-velocity streaming data to extract actionable intelligence and predict market trends.` },
  ];

  const techStackToRender = service.techStack && service.techStack.length > 0 ? service.techStack : [
    { name: "AWS / AZURE", cat: "CLOUD INFRA" },
    { name: "KUBERNETES", cat: "CONTAINERS" },
    { name: "TERRAFORM", cat: "IAC" },
    { name: "POSTGRESQL", cat: "DATABASE" },
    { name: "APACHE KAFKA", cat: "STREAMING" },
    { name: "PYTHON / FASTAPI", cat: "BACKEND" },
    { name: "REACT / NEXT.JS", cat: "FRONTEND" },
    { name: "SNOWFLAKE", cat: "DATA WAREHOUSE" },
    { name: "DATABRICKS", cat: "ANALYTICS" },
    { name: "DOCKER", cat: "VIRTUALIZATION" },
    { name: "OPENAI / LLM", cat: "AI MODELS" },
    { name: "GRAPHQL", cat: "API GATEWAY" },
  ];

  const whyChooseToRender = service.whyChoose && service.whyChoose.length > 0 ? service.whyChoose : [
    { title: "Deep Domain Expertise", description: `We bring extensive experience working on high-impact projects tailored to the regulatory and operational demands of the ${service.title || "industry"} sector.` },
    { title: "Bespoke Engineering", description: "We design tailored architectures that integrate seamlessly with your legacy ecosystems and proprietary workflows." },
    { title: "Full Lifecycle Ownership", description: "From strategic discovery and solution architecture to deployment and 24/7 managed support, we own the complete journey." },
    { title: "Future-Proof Innovation", description: "We harness the modern tech stack—AI, cloud, automation, and data analytics—to build resilient, scalable solutions." },
  ];

  const faqsToRender = service.faqs && service.faqs.length > 0 ? service.faqs : [
    { question: `What types of businesses benefit from our ${service.title || "industry"} solutions?`, answer: `We partner with enterprises, mid-market organizations, and innovative startups across the ${service.title || "industry"} sector, delivering customized digital platforms that solve complex operational challenges.` },
    { question: "How do you ensure industry regulatory compliance?", answer: "Compliance and security are embedded into our architecture from day one. We adhere strictly to regional data privacy, governance, and security standards relevant to your domain." },
    { question: "Can you modernize our existing legacy platforms?", answer: "Yes, we specialize in incremental and complete legacy modernization, migrating monolithic systems to cloud-native microservices with zero operational disruption." },
    { question: "How quickly can we begin seeing results?", answer: "We leverage agile sprints to deliver functional MVPs and proof-of-value deliverables within 4–8 weeks, validating business impact early." },
    { question: "What post-launch support and maintenance do you provide?", answer: "We provide comprehensive 24/7 SLA-backed managed services, performance monitoring, proactive security updates, and ongoing feature enhancements." },
  ];

  const nextStepsToRender = service.nextSteps && service.nextSteps.length > 0 ? service.nextSteps : [
    { title: `An industry consultant will review your requirements and connect with you within a few business hours.` },
    { title: `We will schedule a strategic discovery session to evaluate your current technology stack and business goals.` },
    { title: `You will receive a comprehensive transformation roadmap, architecture proposal, and timeline.` },
  ];
  
  const stepIcons = [MessageSquare, FileText, Sparkles, Zap, Brain];

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;
    const industryName = service.title || service.slug || "Industry";

    setIsContactSubmitting(true);

    try {
      await submitContactForm({
        name,
        email,
        phone,
        subject: `Industry Inquiry: ${industryName}`,
        message,
        category: `Industry Consultation: ${industryName}`,
      });
      toast.success("Thank you! Your project request has been submitted successfully.");
      form.reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to submit request. Please try again later.");
    } finally {
      setIsContactSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta
        title={service.title ? `${service.title} | Hutech Solutions` : "Industry Solutions | Hutech Solutions"}
        description={service.heroDescription || `Empower your ${service.title || "industry"} operations with smart, scalable, AI-driven technology solutions from Hutech Solutions.`}
      />

      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={service.heroBgImage || "https://images.unsplash.com/photo-1597088794600-3a8fd990dd7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"}
            alt={service.heroTitle || service.title}
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
                {service.heroTagline || "Industry Excellence"}
              </span>
            </div>
            <h1 className="display-font mb-8 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              {renderTitle(heroTitleText, "text-inherit", "text-[#F99D1C]", "text-[#0171c1]")}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-medium text-gray-300 md:text-xl">
              {service.heroDescription || `We craft next-generation ${service.title || "enterprise"} experiences through cutting-edge technology solutions and expert consulting.`}
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
                  {renderTitle(service.introHeading || `Empowering ${service.title || "Enterprises"} with Smart, Scalable Solutions`, "text-[#001A3D]", "text-[#0171c1]", "text-[#F99D1C]")}
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
              </div>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  {service.introText1 || `At Hutech Solutions, we bring deep domain expertise in implementing, supporting, and managing industry platforms. Our end-to-end solutions include system architecture, modernization, performance optimization, and seamless enterprise integrations.`}
                </p>
                {service.introText2 && (
                  <p className="text-lg leading-relaxed font-medium text-gray-500">
                    {service.introText2}
                  </p>
                )}
                {!service.introText1 && !service.introText2 && (
                   <p className="text-lg leading-relaxed font-medium text-gray-500">
                     We ensure our clients operate with agility, security, and compliance, enabling them to expand operations and integrate resilient digital solutions to meet market needs.
                   </p>
                )}
              </div>
              <div className="flex flex-wrap gap-8 pt-4">
                {statsToRender.map((stat: any, idx: number) => (
                    <div key={idx} className="flex gap-8">
                      <div className="space-y-1">
                        <p className="display-font text-3xl font-bold text-[#001A3D]">{stat.value}</p>
                        <p className="text-[10px] font-bold tracking-widest text-[#0171c1] uppercase">
                          {stat.label}
                        </p>
                      </div>
                      {idx < statsToRender.length - 1 && (
                        <div className="hidden h-12 w-[1px] bg-gray-200 md:block"></div>
                      )}
                    </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-sm shadow-2xl">
                <ImageWithFallback
                  src={service.introImage || "https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"}
                  alt={service.introImageTitle || "Industry Transformation"}
                  className="h-full w-full object-cover"
                />
              </div>
              {(service.introImageTitle || "Digital Transformation") && (
                <div className="absolute -bottom-10 -left-10 hidden max-w-xs space-y-4 bg-[#0171c1] p-10 text-white shadow-2xl md:block">
                  {service.introImageIcon ? (
                    <img src={service.introImageIcon} alt={service.introImageTitle || "Icon"} className="h-8 w-8 object-contain brightness-0 invert" />
                  ) : (
                    <Brain size={32} strokeWidth={1.5} />
                  )}
                  <h3 className="display-font text-xl font-bold">{service.introImageTitle || "Domain Innovation"}</h3>
                  <p className="text-sm leading-relaxed font-medium opacity-80">
                    {service.introImageDesc || `Integrating advanced software engineering across enterprise platforms to accelerate business agility and operational excellence.`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services / Capabilities Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-20 space-y-6 text-center">
            <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
              {renderTitle(service.servicesSectionTitle || `Our ${service.title || "Industry"} Capabilities`, "text-[#001A3D]", "text-[#0171c1]", "text-[#F99D1C]")}
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              {service.servicesSectionDesc || `At Hutech Solutions, we specialize in delivering high-impact technology solutions tailored to the unique complexities of ${service.title || "your sector"}.`}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {servicesToRender.map((item: any, i: number) => {
              const Icon = FALLBACK_ICONS[i % FALLBACK_ICONS.length];
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
                    {item.icon ? (
                      <img src={item.icon} alt={item.title} className="h-20 w-20 object-contain" />
                    ) : (
                      <Icon size={80} strokeWidth={1} />
                    )}
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-sm bg-gray-50 text-[#0171c1] transition-all duration-500 group-hover:bg-[#0171c1] group-hover:text-white">
                    {item.icon ? (
                      <img src={item.icon} alt={item.title} className="h-8 w-8 object-contain transition-all duration-500 group-hover:brightness-0 group-hover:invert" />
                    ) : (
                      <Icon size={32} strokeWidth={1.5} />
                    )}
                  </div>
                  <h3 className="display-font text-xl leading-tight font-bold text-[#001A3D]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-medium text-gray-500">
                    {item.description}
                  </p>
                  {(item.btnname || "Learn More") && (
                    <div className="mt-auto pt-4">
                      <Link
                        href={item.btnurl || "/contact"}
                        className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#0171c1] uppercase transition-all group-hover:gap-4"
                      >
                        {item.btnname || "Learn More"} <MoveRight size={14} />
                      </Link>
                    </div>
                  )}
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
              {renderTitle(service.solutionsSectionTitle || `What Makes Custom ${service.title || "Industry"} Solutions Essential for Your Business?`, "text-white", "text-[#F99D1C]", "text-[#0171c1]")}
            </h2>
            <div className="mx-auto h-1 w-20 bg-[#0171c1]"></div>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-400">
              {service.solutionsSectionDesc || `In the modern digital landscape, tailored technology solutions are key to staying competitive, maintaining compliance, and ensuring operational excellence.`}
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {solutionsToRender.map((item: any, i: number) => {
              const Icon = FALLBACK_ICONS[(i + 6) % FALLBACK_ICONS.length];
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
                    {item.icon ? (
                      <img src={item.icon} alt={item.title} className="h-7 w-7 object-contain" />
                    ) : (
                      <Icon size={28} strokeWidth={1.5} />
                    )}
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
              {renderTitle(service.innovationsSectionTitle || `Which Innovations Can Transform Your ${service.title || "Industry"} Capabilities?`, "text-[#001A3D]", "text-[#0171c1]", "text-[#F99D1C]")}
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-500">
              {service.innovationsSectionDesc || `Incorporating advanced technologies and modern engineering practices will significantly elevate your market positioning.`}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {innovationsToRender.map((item: any, i: number) => {
              const Icon = FALLBACK_ICONS[(i + 10) % FALLBACK_ICONS.length];
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
                    {item.icon ? (
                      <img src={item.icon} alt={item.title} className="h-14 w-14 object-contain" />
                    ) : (
                      <Icon size={56} strokeWidth={1} />
                    )}
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
                  {renderTitle(service.ctaTitle || `Discover Your ${service.title || "Industry"} Transformation Strategy With Us`, "text-[#001A3D]", "text-[#0171c1]", "text-[#F99D1C]")}
                </h2>
                <div className="h-1 w-20 bg-[#0171c1]"></div>
                <p className="text-lg leading-relaxed font-medium text-gray-500">
                  {service.ctaDescription || `Schedule a strategic consultation with our domain experts and take the first step towards a resilient, digital-first business.`}
                </p>
              </div>
              <div>
                <Link
                  href={service.ctaBtnUrl || "/contact"}
                  className="inline-flex items-center gap-3 rounded-sm bg-[#F99D1C] px-10 py-5 text-[11px] font-bold tracking-wider text-[#001A3D] uppercase shadow-xl transition-all duration-500 hover:bg-[#001A3D] hover:text-white"
                >
                  {service.ctaBtnName || "Consult Us Now"} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="relative flex-1">
              <div className="relative z-10 aspect-video rounded-sm bg-white p-2 shadow-2xl">
                <ImageWithFallback
                  src={service.ctaImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"}
                  alt="Enterprise Strategy"
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mb-16 text-center md:mb-20">
            <div className="flex items-center justify-center gap-3 text-[10px] font-bold tracking-[0.3em] text-[#F99D1C] uppercase">
              <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#F99D1C]" />
              {service.techStackTagline || "TECHNOLOGY STACK"}
              <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#F99D1C]" />
            </div>

            <h2 className="mt-4 display-font text-3xl font-bold tracking-wider text-white sm:text-4xl md:text-5xl uppercase">
              {renderTitle(service.techStackTitle || `MODERN ${service.title ? service.title.toUpperCase() : "TECHNOLOGY"} STACK`, "text-white", "text-[#F99D1C]", "text-[#0171c1]")}
            </h2>

            <div className="mx-auto mt-4 h-[3px] w-14 bg-[#F99D1C]" />

            <p className="mx-auto mt-6 max-w-2xl text-sm font-medium text-gray-400 md:text-base leading-relaxed">
              {service.techStackDesc || "Industry-leading technologies powering intelligent, scalable, and future-ready enterprise transformation"}
            </p>
          </div>

          <div className="border-l border-t border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {techStackToRender.map((item: any, idx: number) => (
                <Motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="group relative z-0 hover:z-10 border-r border-b border-white/10 bg-[#030d22]/50 backdrop-blur-sm py-12 px-4 flex flex-col justify-center items-center h-32 md:h-36 text-center transition-all duration-300 ease-out hover:-translate-y-1.5 hover:bg-[#0a2a60]/40 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] hover:border-white/20"
                >
                  <span className="text-white font-bold tracking-wider text-xs md:text-sm uppercase mb-2 group-hover:text-white transition-colors duration-300">
                    {item.name}
                  </span>
                  <span className="text-cyan-400 font-semibold tracking-wider text-[10px] md:text-xs uppercase transition-colors duration-300">
                    {item.cat}
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
              {renderTitle(service.whyChooseSectionTitle || `Why Choose Hutech Solutions for Your ${service.title || "Industry"} Needs?`, "text-[#001A3D]", "text-[#0171c1]", "text-[#F99D1C]")}
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-gray-500">
              {service.whyChooseSectionDesc || `At Hutech Solutions, we specialize in delivering enterprise solutions tailored to your unique industry requirements.`}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-20 gap-y-16 md:grid-cols-2">
            {whyChooseToRender.map((item: any, i: number) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group flex items-start gap-8"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm bg-[#0171c1]/5 text-[#0171c1] transition-all duration-500 group-hover:bg-[#0171c1] group-hover:text-white">
                  {item.icon ? (
                    <img src={item.icon} alt={item.title} className="h-6 w-6 object-contain transition-all duration-500 group-hover:brightness-0 group-hover:invert" />
                  ) : (
                    <Zap size={24} strokeWidth={1.5} />
                  )}
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
                {renderTitle(service.contactFormTitle || `Share Your ${service.title || "Industry"} Project With Us`, "text-[#001A3D]", "text-[#0171c1]", "text-[#F99D1C]")}
              </h2>
              <form onSubmit={handleContactSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Name*"
                  className="w-full border border-gray-200 p-4 text-sm font-medium transition-all outline-none focus:border-[#0171c1]"
                />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Email*"
                  className="w-full border border-gray-200 p-4 text-sm font-medium transition-all outline-none focus:border-[#0171c1]"
                />
                <input
                  required
                  type="tel"
                  name="phone"
                  placeholder="Phone Number*"
                  className="w-full border border-gray-200 p-4 text-sm font-medium transition-all outline-none focus:border-[#0171c1] md:col-span-2"
                />
                <textarea
                  required
                  name="message"
                  placeholder="Tell us about your requirements"
                  rows={4}
                  className="w-full resize-none border border-gray-200 p-4 text-sm font-medium transition-all outline-none focus:border-[#0171c1] md:col-span-2"
                ></textarea>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={isContactSubmitting}
                    className="w-full rounded-sm bg-[#F99D1C] px-12 py-5 text-[11px] font-bold tracking-wider text-[#001A3D] uppercase shadow-xl transition-all duration-500 hover:bg-[#001A3D] hover:text-white md:w-auto disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isContactSubmitting ? "Submitting..." : service.contactFormBtnName || "Submit Project Request"}
                  </button>
                </div>
              </form>
            </div>
            <div className="space-y-12 py-8 lg:col-span-5">
              <h2 className="display-font text-3xl font-bold text-[#001A3D]">
                {renderTitle(service.nextStepSectionTitle || "What Is The Next Step?", "text-[#001A3D]", "text-[#0171c1]", "text-[#F99D1C]")}
              </h2>
              <div className="space-y-10">
                {nextStepsToRender.map((step: any, i: number) => {
                  const Icon = stepIcons[i % stepIcons.length];
                  return (
                    <div key={i} className="group flex items-start gap-8">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gray-200 text-[#0171c1] transition-all duration-500 group-hover:border-[#0171c1] group-hover:bg-[#0171c1] group-hover:text-white">
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      <p className="pt-2 text-lg leading-relaxed font-medium text-gray-500">
                        {step.title}
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
              {renderTitle(service.faqSectionTitle || "Frequently Asked Questions", "text-[#001A3D]", "text-[#0171c1]", "text-[#F99D1C]")}
            </h2>
            <div className="mx-auto h-1 w-20 bg-[#0171c1]"></div>
          </div>
          <div className="mx-auto max-w-4xl divide-y divide-gray-100">
            {faqsToRender.map((faq: any, i: number) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      {blogs && blogs.length > 0 && (
        <section className="bg-gray-50 py-24">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
            <div className="mb-16 flex items-end justify-between gap-8">
              <div className="max-w-2xl space-y-6">
                <h2 className="display-font text-3xl font-semibold text-[#001A3D] md:text-5xl">
                  {renderTitle(service.blogSectionTitle || `${service.title || "Industry"} Insights & Articles`, "text-[#001A3D]", "text-[#0171c1]", "text-[#F99D1C]")}
                </h2>
                {service.blogSectionDesc && (
                  <p className="text-lg font-medium text-gray-500">
                    {service.blogSectionDesc}
                  </p>
                )}
              </div>
              <Link
                href={service.blogLinkUrl || "/resources"}
                className="hidden items-center gap-2 pb-2 text-[11px] font-bold tracking-widest text-[#0171c1] uppercase transition-all hover:gap-4 md:flex"
              >
                {service.blogLinkName || "View All Resources"} <MoveRight size={16} />
              </Link>
            </div>

            <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              {blogs.map((post: any, i: number) => (
                <div
                  key={i}
                  className="group overflow-hidden rounded-sm bg-white shadow-sm transition-all duration-500 hover:shadow-2xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <ImageWithFallback
                      src={post.featuredImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1597088794600-3a8fd990dd7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="rounded-sm bg-[#0171c1] px-3 py-1 text-[9px] font-bold tracking-widest text-white uppercase">
                        {post.categories?.nodes[0]?.name || "Article"}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4 p-8">
                    <h3 className="display-font line-clamp-2 min-h-[3.5rem] text-xl leading-tight font-bold text-[#001A3D] transition-colors group-hover:text-[#0171c1]">
                      {post.title}
                    </h3>
                    <div 
                      className="line-clamp-3 text-sm leading-relaxed font-medium text-gray-500" 
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                    <div className="border-t border-gray-50 pt-4">
                      <Link
                        href={`/resources/blogs/${post.slug}`}
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
                href={service.blogLinkUrl || "/resources"}
                className="inline-flex items-center gap-3 rounded-sm bg-[#0171c1] px-10 py-5 text-[11px] font-bold tracking-wider text-white uppercase shadow-xl"
              >
                {service.blogLinkName || "Explore Resources"} <MoveRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
