"use client";

import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";

const CATEGORIES = ["All", "Technology", "Cybersecurity", "Logistics", "Cloud", "AI"];

const BLOGS = [
  {
    id: 1,
    title: "The Future of AI in Enterprise",
    excerpt: "How generative AI is reshaping the landscape of corporate decision making and operational efficiency across global markets.",
    category: "AI",
    date: "March 10, 2026",
    author: "Dr. Sarah Chen",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: 2,
    title: "Securing the Hybrid Cloud",
    excerpt: "Best practices for maintaining a robust security posture in a distributed cloud environment using zero-trust principles.",
    category: "Cybersecurity",
    date: "March 05, 2026",
    author: "James Wilson",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: 3,
    title: "Data-Driven Logistics",
    excerpt: "Real-time analytics and their impact on global supply chain resilience and cost optimization in the modern era.",
    category: "Logistics",
    date: "February 28, 2026",
    author: "Michael Port",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: 4,
    title: "Cloud Native Transformation",
    excerpt: "Moving beyond virtualization to true cloud-native architectures for unparalleled scalability and developer velocity.",
    category: "Cloud",
    date: "February 15, 2026",
    author: "Elena Rodriguez",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: 5,
    title: "The Ethics of Autonomous Systems",
    excerpt: "Navigating the complex moral landscape of self-driving and self-deciding systems in industrial applications.",
    category: "Technology",
    date: "February 10, 2026",
    author: "Dr. Sarah Chen",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: 6,
    title: "Quantum Computing: A Decadal Outlook",
    excerpt: "Preparing for the post-quantum world and understanding the implications for cryptography and materials science.",
    category: "Technology",
    date: "January 25, 2026",
    author: "James Wilson",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  }
];

export default function Blogs() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = BLOGS.filter(blog => {
    const matchesTab = activeTab === "All" || blog.category === activeTab;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <Meta title="Blogs | Hutech Solutions" description="Latest insights and thought leadership from Hutech Solutions experts." />
      <Breadcrumbs variant="light" />
      
      {/* Hero Section */}
      <section className="bg-[#001A3D] text-white py-24 relative overflow-hidden flex items-center">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10 w-full">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl space-y-6"
          >
            <div className="flex items-center gap-3">
              <span className="block w-8 h-[2px] bg-[#FFAF2B]"></span>
              <span className="text-[#FFAF2B] text-xs font-semibold tracking-widest uppercase">Thought Leadership</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-semibold mb-6 display-font tracking-tight leading-tight">
              Insights & <br /><span className="text-[#FFAF2B]">Perspectives.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-medium">
              Stay ahead of the curve with the latest trends, expert analyses, and technological innovations curated by our global team.
            </p>
          </Motion.div>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full bg-[#0171c1]/5 skew-x-12 translate-x-1/4"></div>
        <div className="absolute -bottom-24 left-24 w-80 h-80 bg-[#FFAF2B]/5 rounded-full blur-[100px]"></div>
      </section>

      {/* Search & Filter Bar */}
      <section className="sticky top-[72px] z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 py-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2.5 rounded-full text-[10px] font-black tracking-[0.2em] transition-all whitespace-nowrap uppercase ${
                  activeTab === cat 
                  ? "bg-[#001A3D] text-white shadow-xl" 
                  : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-[#001A3D]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0171c1]/20 transition-all border-none shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-24 bg-gray-50/30">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredBlogs.map((blog, i) => (
                <Motion.article 
                  key={blog.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden hover:shadow-[0_48px_100px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 border border-transparent hover:border-gray-100"
                >
                  <div className="relative h-72 overflow-hidden">
                    <ImageWithFallback src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-8 left-8">
                       <span className="px-5 py-2 bg-white/90 backdrop-blur-md text-[#001A3D] font-black text-[10px] rounded-full uppercase tracking-widest shadow-xl border border-white/20">
                          {blog.category}
                       </span>
                    </div>
                  </div>
                  <div className="p-10 flex flex-col flex-grow space-y-6">
                    <div className="flex items-center gap-6 text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">
                      <span className="flex items-center gap-2"><Calendar size={14} className="text-[#0171c1]" /> {blog.date}</span>
                      <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
                      <span className="flex items-center gap-2"><User size={14} className="text-[#0171c1]" /> {blog.author}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#001A3D] display-font group-hover:text-[#0171c1] transition-colors leading-tight">
                      {blog.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed font-medium line-clamp-3 text-lg">{blog.excerpt}</p>
                    <div className="mt-auto pt-8 border-t border-gray-50">
                      <Link href={`/resources/blogs/${blog.id}`} className="inline-flex items-center gap-3 text-[#001A3D] font-black text-xs uppercase tracking-[0.2em] group/link hover:text-[#FFAF2B] transition-all">
                        READ ARTICLE <ArrowRight size={18} className="text-[#0171c1] group-hover/link:translate-x-3 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </Motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-40 bg-white rounded-[3rem] shadow-sm border border-gray-100">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <Search size={40} className="text-gray-200" />
              </div>
              <h3 className="text-3xl font-bold text-[#001A3D] mb-4 display-font">No matches found</h3>
              <p className="text-gray-500 max-w-sm mx-auto font-medium mb-10">We couldn't find any articles matching your current search or filter selection.</p>
              <button 
                onClick={() => {setActiveTab("All"); setSearchQuery("");}}
                className="text-[#0171c1] font-black text-xs uppercase tracking-widest hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-[#001A3D] relative overflow-hidden">
         <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
               <div className="space-y-6 text-center lg:text-left max-w-2xl">
                  <h2 className="text-4xl md:text-6xl font-bold text-white display-font tracking-tight leading-tight">Stay updated with <br /><span className="text-[#FFAF2B]">Hutech Insights.</span></h2>
                  <p className="text-gray-400 text-xl font-medium">Get the latest technical reviews and industry reports delivered to your inbox every month.</p>
               </div>
               <div className="w-full lg:w-auto">
                  <form className="flex flex-col sm:flex-row gap-4 p-2 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-md">
                    <input 
                      type="email" 
                      placeholder="Your professional email" 
                      className="flex-1 px-8 py-5 bg-transparent text-white focus:outline-none font-medium text-lg min-w-[300px]"
                    />
                    <button className="px-10 py-5 bg-[#FFAF2B] text-[#001A3D] font-black text-xs uppercase tracking-[0.2em] rounded-[1.5rem] hover:bg-white transition-all shadow-2xl">
                      SUBSCRIBE
                    </button>
                  </form>
               </div>
            </div>
         </div>
         <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-white/5 to-transparent skew-x-12 translate-x-1/4"></div>
      </section>
    </div>
  );
}
