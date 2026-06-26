"use client";

import { motion as Motion } from "framer-motion";
import { useParams } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  Calendar, User, ArrowLeft, Tag, Quote, Facebook, Twitter, Linkedin, Clock, ChevronRight, Share2,
} from "lucide-react";
import { useState } from "react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

type ContentBlock = { type: string; text: string; author?: string; designation?: string };

export const BLOG_DATA: Record<string, {
  title: string; date: string; author: string; role: string; category: string;
  readTime: string; image: string; content: ContentBlock[];
  tags: string[]; faqs: { question: string; answer: string }[];
}> = {
  "ai-shopping-assistants-transforming-commerce": {
    title: "AI Shopping Assistants Are Transforming Online Commerce",
    date: "April 18, 2026", author: "Amanda Rodriguez", role: "Head of E-Commerce Solutions",
    category: "E-Commerce", readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    content: [
      { type: "paragraph", text: "The e-commerce landscape is undergoing a dramatic transformation as AI-powered shopping assistants become the new front line of customer engagement. These intelligent systems are not just answering questions—they're understanding context, predicting needs, and creating personalized shopping experiences that rival in-store human assistance." },
      { type: "heading", text: "The Evolution of Customer Engagement" },
      { type: "paragraph", text: "Traditional e-commerce relied on static product pages and basic search functionality. Customers navigated complex category trees, filtered through thousands of options, and often abandoned their carts out of frustration. AI shopping assistants have fundamentally changed this dynamic by acting as intelligent guides throughout the entire shopping journey." },
      { type: "heading", text: "Personalization at Scale" },
      { type: "paragraph", text: "The real power of AI shopping assistants lies in their ability to deliver hyper-personalized experiences to millions of customers simultaneously. By analyzing browsing behavior, purchase history, and style preferences, these systems create unique shopping journeys for each individual." },
      { type: "quote", text: "The future of e-commerce isn't about more products or faster shipping—it's about making every customer feel like they have a personal shopper who truly understands their needs.", author: "Amanda Rodriguez", designation: "Head of E-Commerce Solutions, Hutech Solutions" },
      { type: "heading", text: "The Business Impact" },
      { type: "paragraph", text: "The ROI of AI shopping assistants extends beyond conversion rates. They reduce customer service costs by handling routine inquiries automatically. They increase average order value through intelligent upselling and cross-selling. They reduce return rates by helping customers make better-informed purchase decisions upfront." },
    ],
    tags: ["E-Commerce", "AI Assistants", "Customer Experience", "Conversational AI", "Retail Technology"],
    faqs: [
      { question: "How do AI shopping assistants differ from traditional chatbots?", answer: "Traditional chatbots follow scripted decision trees. AI shopping assistants use advanced NLP and ML to understand context, intent, and nuance — handling open-ended questions and learning from interactions." },
      { question: "What's the typical implementation timeline?", answer: "A basic AI assistant can be deployed in 8-12 weeks. Enterprise-grade solutions with deep integrations typically require 4-6 months." },
      { question: "How do you ensure the AI provides accurate product information?", answer: "Accuracy comes from integration with product information management systems and inventory databases for real-time accuracy, plus confidence thresholds that escalate to human support when uncertain." },
    ],
  },
  "blockchain-supply-chain-revolution": {
    title: "Blockchain: The Supply Chain Revolution",
    date: "April 12, 2026", author: "David Nakamoto", role: "Blockchain Solutions Architect",
    category: "Blockchain", readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    content: [
      { type: "paragraph", text: "Supply chains are among the most complex systems in modern commerce. Blockchain technology is fundamentally reshaping how these networks operate by introducing unprecedented levels of transparency, traceability, and trust without requiring centralized intermediaries." },
      { type: "heading", text: "The Trust Problem in Supply Chains" },
      { type: "paragraph", text: "Traditional supply chains rely on documentation that passes through multiple hands. Each handoff introduces opportunities for errors, fraud, and delays. Blockchain solves this through immutable, distributed ledgers that all parties can access in real-time." },
      { type: "quote", text: "Blockchain doesn't just digitize supply chains—it fundamentally reimagines how trust is established and maintained across complex networks.", author: "David Nakamoto", designation: "Blockchain Solutions Architect, Hutech Solutions" },
      { type: "heading", text: "Smart Contracts: Automation Layer" },
      { type: "paragraph", text: "Smart contracts add programmable logic to blockchain supply chains. Payments can be automatically released when GPS data confirms delivery. At Hutech Solutions, we've implemented smart contract systems that have reduced payment cycles from 45 days to real-time settlement." },
    ],
    tags: ["Blockchain", "Supply Chain", "Distributed Ledger", "Smart Contracts", "Traceability"],
    faqs: [
      { question: "How is blockchain different from a traditional database?", answer: "Traditional databases are centrally controlled and modifiable. Blockchain is distributed across multiple nodes requiring consensus, with immutable, cryptographically secured records." },
      { question: "What's the ROI timeline?", answer: "Quick wins like automated compliance reporting can show returns within 6-12 months. Broader benefits emerge over 18-24 months as more partners join." },
    ],
  },
  "edge-computing-iot-future": {
    title: "Edge Computing: Powering the IoT Future",
    date: "April 05, 2026", author: "Priya Kapoor", role: "IoT & Edge Computing Lead",
    category: "IoT", readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    content: [
      { type: "paragraph", text: "The explosion of IoT devices has created a data tsunami. Sending all this data to centralized cloud data centers introduces latency, consumes bandwidth, and creates privacy risks. Edge computing solves these challenges by processing data where it's generated, at the network edge." },
      { type: "heading", text: "Why Cloud Alone Isn't Enough" },
      { type: "paragraph", text: "Consider an autonomous vehicle making split-second decisions. Sending sensor data to a distant cloud server introduces unacceptable latency. Even milliseconds matter when avoiding collisions. Edge computing enables real-time decision-making by processing critical data locally." },
      { type: "quote", text: "Edge computing isn't about replacing the cloud—it's about creating an intelligent continuum where processing happens at the optimal location.", author: "Priya Kapoor", designation: "IoT & Edge Computing Lead, Hutech Solutions" },
      { type: "heading", text: "Industrial Applications" },
      { type: "paragraph", text: "Predictive maintenance is one of the most compelling use cases. Edge devices analyze vibration patterns, temperature, and acoustic signatures from machinery in real-time, proactively preventing costly unplanned downtime." },
    ],
    tags: ["Edge Computing", "IoT", "Real-Time Analytics", "Smart Cities", "Industrial IoT"],
    faqs: [
      { question: "What's the difference between edge and fog computing?", answer: "Fog computing is a layer between edge devices and the cloud. Edge computing happens directly on or near devices. Many architectures use both in a hierarchical model." },
      { question: "How do you manage thousands of edge devices?", answer: "Modern edge platforms include centralized orchestration with OTA updates and staged rollouts using container technologies like Docker and Kubernetes." },
    ],
  },
  "fintech-regulatory-compliance": {
    title: "Navigating Fintech Regulatory Compliance",
    date: "March 28, 2026", author: "Robert Chen", role: "Fintech Compliance Director",
    category: "Fintech", readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    content: [
      { type: "paragraph", text: "The fintech revolution has democratized financial services, but it has also created complex regulatory challenges. As financial technology companies expand globally, navigating the patchwork of international regulations has become mission-critical." },
      { type: "heading", text: "The Evolving Regulatory Landscape" },
      { type: "paragraph", text: "Financial regulation was designed for traditional institutions. Fintech operates across borders, 24/7, often blurring lines between banking, payments, investments, and insurance. Regulators worldwide are adapting." },
      { type: "quote", text: "Compliance is not a checkbox exercise—it's a continuous process of adaptation. The most successful fintech companies embed regulatory considerations into product design from day one.", author: "Robert Chen", designation: "Fintech Compliance Director, Hutech Solutions" },
    ],
    tags: ["Fintech", "Regulatory Compliance", "KYC", "AML", "Data Privacy", "Open Banking"],
    faqs: [
      { question: "What's the cost of compliance for a fintech startup?", answer: "Payment startups might spend 15-25% of operating budget on compliance. Initial licensing can cost $100K-$500K in legal and consulting fees. Building compliance into architecture from the start reduces long-term costs significantly." },
    ],
  },
  "healthcare-data-analytics-transformation": {
    title: "Healthcare Data Analytics Transformation",
    date: "March 20, 2026", author: "Dr. Emily Zhang", role: "Healthcare AI Director",
    category: "Healthcare", readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    content: [
      { type: "paragraph", text: "Healthcare generates more data than almost any other industry—electronic health records, medical imaging, genomic sequences, wearable device readings. Yet much of this data remains siloed and underutilized." },
      { type: "heading", text: "From Reactive to Predictive Care" },
      { type: "paragraph", text: "Analytics enables predictive healthcare where risk factors are identified before conditions manifest. ML models analyze patient histories, genetics, and lifestyle factors to predict cardiovascular events and hospital readmissions." },
      { type: "quote", text: "Healthcare analytics isn't about replacing clinical judgment—it's about augmenting it with machine learning insights.", author: "Dr. Emily Zhang", designation: "Healthcare AI Director, Hutech Solutions" },
    ],
    tags: ["Healthcare", "Data Analytics", "Medical AI", "Precision Medicine", "Population Health"],
    faqs: [
      { question: "Can smaller healthcare providers afford advanced analytics?", answer: "Cloud-based analytics platforms have dramatically reduced barriers to entry. SaaS solutions provide enterprise-grade capabilities without massive upfront investment." },
    ],
  },
  "devops-culture-best-practices": {
    title: "Building a True DevOps Culture",
    date: "March 15, 2026", author: "Marcus Flynn", role: "Engineering Culture Advisor",
    category: "DevOps", readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    content: [
      { type: "paragraph", text: "DevOps is often misunderstood as a set of tools. While technology enables DevOps, the essence is cultural: breaking down silos between development and operations, fostering collaboration, and creating shared responsibility for software delivery." },
      { type: "heading", text: "The Cultural Foundation" },
      { type: "paragraph", text: "Traditional organizations separate developers who write code from operations teams who run systems. DevOps dissolves this boundary through shared ownership. Teams that build software also run it in production, experiencing the consequences of their design decisions." },
      { type: "quote", text: "You can't buy DevOps culture with tools. The best CI/CD pipeline in the world won't help if teams are still throwing code over walls and blaming each other.", author: "Marcus Flynn", designation: "Engineering Culture Advisor, Hutech Solutions" },
    ],
    tags: ["DevOps", "Engineering Culture", "CI/CD", "Site Reliability", "Team Collaboration"],
    faqs: [
      { question: "How long does DevOps transformation take?", answer: "Most organizations see initial improvements in 6-12 months. Reaching elite DORA metric performance typically requires 2-3 years of sustained effort." },
    ],
  },
  "future-of-ai-in-enterprise": {
    title: "The Future of AI in Enterprise",
    date: "March 10, 2026", author: "Dr. Sarah Chen", role: "Chief AI Strategist",
    category: "Technology", readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    content: [
      { type: "paragraph", text: "Generative AI is no longer a futuristic concept reserved for tech giants and research labs. In 2026, it has become a cornerstone of enterprise strategy, reshaping everything from decision-making frameworks to customer engagement models." },
      { type: "heading", text: "The Transformation of Decision-Making" },
      { type: "paragraph", text: "Traditional BI tools provided historical insights. Modern AI systems go further—predicting outcomes, simulating scenarios, and recommending optimal courses of action in real-time. At Hutech, clients have reduced strategic planning cycles from months to weeks." },
      { type: "quote", text: "The question isn't whether AI will transform your enterprise—it's whether you'll lead that transformation or be forced to react to it.", author: "Dr. Sarah Chen", designation: "Chief AI Strategist, Hutech Solutions" },
      { type: "heading", text: "The Path Forward" },
      { type: "paragraph", text: "At Hutech Solutions, we're committed to helping organizations navigate this transformation with confidence. Whether you're just beginning your AI journey or looking to scale existing initiatives, the time to act is now." },
    ],
    tags: ["Artificial Intelligence", "Enterprise Strategy", "Digital Transformation", "Machine Learning"],
    faqs: [
      { question: "What is the biggest challenge in implementing AI?", answer: "The biggest challenge is cultural, not technical. Change management, upskilling, and executive buy-in are the primary hurdles to successful AI adoption." },
      { question: "How long to see ROI from AI investments?", answer: "Quick wins like process automation can show returns within 3-6 months. Complex ML models typically require 12-18 months." },
    ],
  },
  "securing-hybrid-cloud": {
    title: "Securing the Hybrid Cloud",
    date: "March 05, 2026", author: "James Wilson", role: "Cybersecurity Director",
    category: "Cybersecurity", readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    content: [
      { type: "paragraph", text: "As organizations embrace hybrid cloud architectures, traditional perimeter-based security models become obsolete. The attack surface expands dramatically when workloads span on-premises data centers, public clouds, and edge locations." },
      { type: "heading", text: "Zero Trust: The New Perimeter" },
      { type: "paragraph", text: "Zero trust security operates on the principle of 'never trust, always verify.' Every access request is authenticated and authorized regardless of location. This model is essential for hybrid environments where traditional network boundaries no longer apply." },
      { type: "quote", text: "In a hybrid cloud world, the network perimeter no longer exists. Trust must be earned on every access request, from every device, at every location.", author: "James Wilson", designation: "Cybersecurity Director, Hutech Solutions" },
    ],
    tags: ["Cybersecurity", "Cloud Security", "Zero Trust", "Hybrid Cloud"],
    faqs: [
      { question: "What is zero trust architecture?", answer: "Zero trust is a security model that requires verification for every user and device, regardless of whether they are inside or outside the network perimeter." },
    ],
  },
  "data-driven-logistics": {
    title: "Data-Driven Logistics",
    date: "February 28, 2026", author: "Michael Port", role: "Logistics Technology Lead",
    category: "Logistics", readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    content: [
      { type: "paragraph", text: "Real-time analytics are transforming global supply chain resilience and cost optimization, giving logistics companies unprecedented visibility into their operations." },
      { type: "heading", text: "Real-Time Visibility" },
      { type: "paragraph", text: "Modern logistics demands end-to-end visibility. Advanced analytics platforms aggregate data from GPS trackers, warehouse sensors, and customer systems to provide a single source of truth for entire supply chain operations." },
    ],
    tags: ["Logistics", "Supply Chain", "Analytics", "Real-Time Data"],
    faqs: [
      { question: "How does real-time analytics reduce logistics costs?", answer: "By identifying inefficiencies in routing, warehouse operations, and carrier selection, companies typically reduce logistics costs by 10-15%." },
    ],
  },
  "quantum-computing-enterprise-reality": {
    title: "Quantum Computing: From Lab to Enterprise",
    date: "February 20, 2026", author: "Dr. Kenji Yamamoto", role: "Quantum Computing Research Lead",
    category: "Quantum Tech", readTime: "11 min read",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    content: [
      { type: "paragraph", text: "Quantum computing has long been the domain of theoretical physics. But in 2026, we're witnessing its transition into practical enterprise applications, with specialized quantum algorithms solving optimization and cryptographic problems that classical computers cannot efficiently handle." },
      { type: "heading", text: "Understanding Quantum Advantage" },
      { type: "paragraph", text: "Quantum computers leverage superposition and entanglement to explore solution spaces exponentially larger than classical systems. This allows quantum systems to evaluate multiple possibilities in parallel." },
      { type: "quote", text: "Quantum computing won't replace classical computing—it will augment it. The key is identifying which business problems quantum can uniquely solve.", author: "Dr. Kenji Yamamoto", designation: "Quantum Computing Research Lead, Hutech Solutions" },
    ],
    tags: ["Quantum Computing", "Enterprise Technology", "Cryptography", "Optimization"],
    faqs: [
      { question: "Can enterprises access quantum computing today?", answer: "Yes. IBM, Google, Amazon, and Microsoft offer cloud-based quantum computing platforms with access to real quantum hardware and simulators." },
    ],
  },
  "sustainable-green-software-engineering": {
    title: "Sustainable Tech: Green Software Engineering",
    date: "February 12, 2026", author: "Sofia Lindström", role: "Sustainability Technology Lead",
    category: "Sustainability", readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    content: [
      { type: "paragraph", text: "Software engineering has a carbon footprint. Data centers consume 1-2% of global electricity and this is growing rapidly. Green software engineering is about building software that uses less energy and resources while maintaining performance and scalability." },
      { type: "heading", text: "Measuring Software Carbon Intensity" },
      { type: "paragraph", text: "The Green Software Foundation has developed frameworks for measuring and reducing software carbon intensity—optimizing algorithms, choosing energy-efficient cloud regions, and designing for hardware efficiency." },
    ],
    tags: ["Sustainability", "Green Tech", "Carbon Neutral", "Software Engineering"],
    faqs: [
      { question: "How can software teams reduce their carbon footprint?", answer: "By optimizing code efficiency, using CDNs closer to users, choosing renewable-energy powered cloud regions, and building architecture that scales down in low-demand periods." },
    ],
  },
  "5g-connected-enterprise-transformation": {
    title: "5G and the Connected Enterprise",
    date: "February 05, 2026", author: "Carlos Mendoza", role: "Connectivity Solutions Lead",
    category: "Connectivity", readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    content: [
      { type: "paragraph", text: "5G is not just faster 4G—it's a fundamental rethinking of wireless connectivity designed to support the hyper-connected enterprise of the future with ultra-low latency and massive device density." },
      { type: "heading", text: "Private 5G Networks" },
      { type: "paragraph", text: "Enterprises are increasingly deploying private 5G networks to get the benefits of 5G without relying on public carrier infrastructure. These networks offer dedicated spectrum, enhanced security, and guaranteed quality of service." },
    ],
    tags: ["5G", "Connectivity", "IoT", "Enterprise Networks"],
    faqs: [
      { question: "What is the difference between private and public 5G?", answer: "Private 5G networks are deployed and controlled by an enterprise on their own premises, offering greater security and customization versus public carrier networks." },
    ],
  },
};

export default function BlogClient() {
  const params = useParams();
  const id = params?.id as string;
  const blog = BLOG_DATA[id];
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const shareUrl = typeof window !== 'undefined' ? window.location.href.replace(window.location.origin, 'https://hutechsolutions.ai') : '';

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6">
        <div className="text-center space-y-6">
          <h2 className="display-font text-4xl font-bold text-[#001A3D]">Article Not Found</h2>
          <p className="text-gray-500">The article you&apos;re looking for might have been moved or the link is incorrect.</p>
          <Link href="/resources/blogs" className="inline-block bg-[#001A3D] text-white px-8 py-4 rounded-sm font-bold text-xs tracking-wide">
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white">
      <Meta
        title={`${blog.title} | Hutech Solutions`}
        description={blog.content[0]?.text?.substring(0, 160) || ""}
      />
      <Breadcrumbs variant="light" />

      {/* Hero */}
      <section className="relative h-[500px] bg-[#001A3D] overflow-hidden flex items-end">
        <ImageWithFallback
          src={blog.image}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D] via-[#001A3D]/60 to-transparent"></div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-20 pb-16 w-full">
          <Motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-4">
            <Link href="/resources/blogs" className="inline-flex items-center gap-2 text-[#FFAF2B] font-semibold text-xs tracking-wide group mb-4">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              BACK TO BLOGS
            </Link>
            <div>
              <span className="bg-[#FFAF2B] text-[#001A3D] text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                {blog.category}
              </span>
            </div>
            <h1 className="display-font text-4xl md:text-6xl font-semibold text-white leading-tight tracking-tight">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-400 text-xs font-semibold">
              <span className="flex items-center gap-2"><Calendar size={14} className="text-[#FFAF2B]" /> {blog.date}</span>
              <span className="flex items-center gap-2"><User size={14} className="text-[#FFAF2B]" /> {blog.author} — {blog.role}</span>
              <span className="flex items-center gap-2"><Clock size={14} className="text-[#FFAF2B]" /> {blog.readTime}</span>
            </div>
          </Motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Article Body */}
            <div className="lg:col-span-8 space-y-8">
              {blog.content.map((block, i) => {
                if (block.type === "heading") return (
                  <h2 key={i} className="display-font text-2xl md:text-3xl font-bold text-[#001A3D] tracking-tight mt-12 mb-4">{block.text}</h2>
                );
                if (block.type === "quote") return (
                  <blockquote key={i} className="relative border-l-4 border-[#FFAF2B] bg-gray-50 rounded-r-2xl p-8 my-8">
                    <Quote className="text-[#FFAF2B] mb-4 opacity-50" size={32} />
                    <p className="text-lg md:text-xl font-medium text-[#001A3D] leading-relaxed italic mb-4">&quot;{block.text}&quot;</p>
                    {block.author && (
                      <div>
                        <p className="font-bold text-sm text-[#001A3D]">{block.author}</p>
                        <p className="text-xs text-gray-400 font-semibold">{block.designation}</p>
                      </div>
                    )}
                  </blockquote>
                );
                return <p key={i} className="text-gray-600 text-lg leading-relaxed font-medium">{block.text}</p>;
              })}

              {/* Tags */}
              <div className="flex flex-wrap gap-3 pt-8 border-t border-gray-100">
                {blog.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-full text-[11px] font-bold text-[#001A3D] tracking-wide uppercase">
                    <Tag size={12} className="text-[#FFAF2B]" />{tag}
                  </span>
                ))}
              </div>

              {/* FAQ Section */}
              {blog.faqs.length > 0 && (
                <div className="pt-12 space-y-6">
                  <h2 className="display-font text-3xl font-bold text-[#001A3D] tracking-tight">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {blog.faqs.map((faq, i) => (
                      <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden">
                        <button
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-semibold text-[#001A3D]">{faq.question}</span>
                          <ChevronRight size={18} className={`text-[#FFAF2B] shrink-0 transition-transform ${openFaq === i ? "rotate-90" : ""}`} />
                        </button>
                        {openFaq === i && (
                          <div className="px-6 pb-6 bg-gray-50">
                            <p className="text-gray-600 leading-relaxed font-medium">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-[#001A3D] p-8 rounded-3xl text-white space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#FFAF2B]/20 flex items-center justify-center">
                  <User size={28} className="text-[#FFAF2B]" />
                </div>
                <div>
                  <p className="font-bold text-lg">{blog.author}</p>
                  <p className="text-[#FFAF2B] text-xs font-semibold tracking-wide">{blog.role}</p>
                </div>
                <p className="text-xs text-gray-400 font-medium leading-relaxed">Expert at Hutech Solutions sharing insights on {blog.category} trends and innovations.</p>
              </div>
              <div className="border border-gray-100 rounded-3xl p-8 space-y-6">
                <h4 className="font-bold text-[#001A3D] flex items-center gap-2"><Share2 size={18} className="text-[#FFAF2B]" /> Share Article</h4>
                <div className="flex gap-3">
                  <button
                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')}
                    aria-label="LinkedIn"
                    className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#001A3D] hover:text-white transition-all"
                  >
                    <Linkedin size={18} />
                  </button>
                  <button
                    onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(blog.title)}`, '_blank')}
                    aria-label="Twitter"
                    className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#001A3D] hover:text-white transition-all"
                  >
                    <Twitter size={18} />
                  </button>
                  <button
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
                    aria-label="Facebook"
                    className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#001A3D] hover:text-white transition-all"
                  >
                    <Facebook size={18} />
                  </button>
                </div>
              </div>
              <div className="bg-[#FFAF2B] p-8 rounded-3xl space-y-4">
                <h4 className="font-bold text-[#001A3D] text-lg display-font">Ready to Transform?</h4>
                <p className="text-sm text-[#001A3D]/70 font-medium">Talk to our experts about implementing these solutions for your business.</p>
                <Link href="/contact" className="block text-center bg-[#001A3D] text-white font-bold text-xs tracking-wide py-4 rounded-xl hover:bg-[#002b66] transition-colors">GET IN TOUCH</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
