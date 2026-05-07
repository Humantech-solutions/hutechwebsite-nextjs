"use client";

import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

const BLOGS = [
  {
    id: "ai-shopping-assistants-transforming-commerce",
    title: "AI Shopping Assistants Transform Commerce",
    excerpt: "Discover how intelligent conversational AI is revolutionizing the customer shopping experience and driving unprecedented conversion rates.",
    category: "E-Commerce",
    date: "April 18, 2026",
    author: "Amanda Rodriguez",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "blockchain-supply-chain-revolution",
    title: "Blockchain: The Supply Chain Revolution",
    excerpt: "Exploring how distributed ledger technology is creating unprecedented transparency and efficiency in global logistics networks.",
    category: "Blockchain",
    date: "April 12, 2026",
    author: "David Nakamoto",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "edge-computing-iot-future",
    title: "Edge Computing: Powering the IoT Future",
    excerpt: "How processing data at the edge is enabling real-time insights and transforming industrial operations worldwide.",
    category: "IoT",
    date: "April 05, 2026",
    author: "Priya Kapoor",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "fintech-regulatory-compliance",
    title: "Navigating Fintech Regulatory Compliance",
    excerpt: "Essential strategies for financial technology companies to maintain compliance in an evolving regulatory landscape.",
    category: "Fintech",
    date: "March 28, 2026",
    author: "Robert Chen",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "healthcare-data-analytics-transformation",
    title: "Healthcare Data Analytics Transformation",
    excerpt: "Leveraging advanced analytics to improve patient outcomes, reduce costs, and accelerate medical research.",
    category: "Healthcare",
    date: "March 20, 2026",
    author: "Dr. Emily Zhang",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "devops-culture-best-practices",
    title: "Building a True DevOps Culture",
    excerpt: "Beyond tools and automation: creating collaborative engineering teams that deliver software faster and more reliably.",
    category: "DevOps",
    date: "March 15, 2026",
    author: "Marcus Flynn",
    image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "future-of-ai-in-enterprise",
    title: "The Future of AI in Enterprise",
    excerpt: "How generative AI is reshaping the landscape of corporate decision making and operational efficiency.",
    category: "Technology",
    date: "March 10, 2026",
    author: "Dr. Sarah Chen",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "securing-hybrid-cloud",
    title: "Securing the Hybrid Cloud",
    excerpt: "Best practices for maintaining a robust security posture in a distributed cloud environment.",
    category: "Cybersecurity",
    date: "March 05, 2026",
    author: "James Wilson",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "data-driven-logistics",
    title: "Data-Driven Logistics",
    excerpt: "Real-time analytics and their impact on global supply chain resilience and cost optimization.",
    category: "Logistics",
    date: "February 28, 2026",
    author: "Michael Port",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "quantum-computing-enterprise-reality",
    title: "Quantum Computing: From Lab to Enterprise",
    excerpt: "Understanding how quantum algorithms are solving previously intractable business problems in optimization and cryptography.",
    category: "Quantum Tech",
    date: "February 20, 2026",
    author: "Dr. Kenji Yamamoto",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "sustainable-green-software-engineering",
    title: "Sustainable Tech: Green Software Engineering",
    excerpt: "Practical approaches to reducing the carbon footprint of software systems while maintaining performance and scalability.",
    category: "Sustainability",
    date: "February 12, 2026",
    author: "Sofia Lindström",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "5g-connected-enterprise-transformation",
    title: "5G and the Connected Enterprise",
    excerpt: "How next-generation wireless networks are enabling new business models and transforming industrial operations.",
    category: "Connectivity",
    date: "February 05, 2026",
    author: "Carlos Mendoza",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
];

export default function Blogs() {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;

  const totalPages = Math.ceil(BLOGS.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const currentBlogs = BLOGS.slice(startIndex, startIndex + blogsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Meta
        title="Blogs | Hutech Solutions"
        description="Latest insights and thought leadership from Hutech Solutions experts."
      />
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex items-center overflow-hidden bg-[#001A3D] h-[450px] text-white">
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-20">
          <Motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="display-font mb-6 text-5xl font-semibold tracking-tight md:text-7xl"
          >
            Insights &amp; <br />
            <span className="text-[#F99D1C]">Perspectives.</span>
          </Motion.h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed font-medium">
            Stay ahead of the curve with the latest trends, expert analyses, and technological innovations curated by our global team.
          </p>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {currentBlogs.map((blog, i) => (
              <Motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white transition-all hover:shadow-2xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={blog.image}
                    alt={blog.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6 px-4 py-1 bg-[#F99D1C] text-[#001A3D] font-bold text-xs rounded-full uppercase tracking-widest">
                    {blog.category}
                  </div>
                </div>
                <div className="flex flex-grow flex-col space-y-4 p-10">
                  <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {blog.date}</span>
                    <span className="flex items-center gap-1"><User size={14} /> {blog.author}</span>
                  </div>
                  <h3 className="display-font text-2xl font-bold text-[#001A3D] transition-colors group-hover:text-[#F99D1C]">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed flex-grow">{blog.excerpt}</p>
                  <Link
                    href={`/resources/blogs/${blog.id}`}
                    className="inline-flex items-center gap-2 text-[#001A3D] font-bold group-hover:gap-4 transition-all"
                  >
                    Read Article <ArrowRight size={18} className="text-[#F99D1C]" />
                  </Link>
                </div>
              </Motion.article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-16">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-3 rounded-full border border-gray-200 text-gray-400 hover:border-[#0171c1] hover:text-[#0171c1] hover:bg-[#0171c1]/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-12 h-12 rounded-full font-bold text-sm transition-all ${
                      currentPage === page
                        ? "bg-[#0171c1] text-white"
                        : "border border-gray-200 text-gray-600 hover:border-[#0171c1] hover:text-[#0171c1]"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-3 rounded-full border border-gray-200 text-gray-400 hover:border-[#0171c1] hover:text-[#0171c1] hover:bg-[#0171c1]/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
