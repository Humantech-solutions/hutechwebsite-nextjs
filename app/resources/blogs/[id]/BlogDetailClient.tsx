"use client";

import { motion as Motion, AnimatePresence } from "motion/react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  Calendar,
  Share2,
  ArrowLeft,
  Tag,
  Quote,
  Facebook,
  Twitter,
  Linkedin,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";
import { useState } from "react";
import { Blog } from "./data";

const BRAND_ORANGE = "#F99D1C";

function FAQAccordion({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border-b border-gray-100 last:border-b-0"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between px-8 py-6 text-left hover:bg-gray-50 transition-colors group"
          >
            <h3 className="font-bold text-[#001A3D] pr-8 leading-snug text-base">
              {faq.question}
            </h3>
            <ChevronRight
              size={20}
              className={`flex-shrink-0 text-gray-400 transition-transform ${
                openIndex === index ? 'rotate-90' : ''
              }`}
            />
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <Motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-6">
                  <p className="text-gray-500 leading-relaxed font-medium text-base">
                    {faq.answer}
                  </p>
                </div>
              </Motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default function BlogDetailClient({ blog }: { blog: Blog }) {
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
    <div className="flex flex-col bg-white min-h-screen">
      <Meta title={`${blog.title} | Blogs | Hutech Solutions`} description={blog.content[0].text} />
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="bg-[#001A3D] text-white min-h-[500px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D] via-transparent to-transparent"></div>
        </div>

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-20 z-10 w-full py-20">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <Link
              href="/resources/blogs"
              className="inline-flex items-center gap-2 text-[#F99D1C] font-bold text-xs uppercase tracking-widest hover:text-white transition-colors"
            >
              <ArrowLeft size={16} /> All Blogs
            </Link>

            <div className="flex items-center gap-6">
               <span className="px-4 py-1.5 bg-[#F99D1C]/10 text-[#F99D1C] text-[10px] font-black uppercase tracking-widest rounded-full border border-[#F99D1C]/20">
                  {blog.category}
               </span>
               <span className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest">
                  <Clock size={14} /> {blog.readTime}
               </span>
            </div>

            <h1 className="text-4xl md:text-7xl font-semibold display-font leading-[1.1] max-w-5xl">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-10 pt-4 border-t border-white/10 w-fit pr-12">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0171c1] flex items-center justify-center font-bold text-lg text-white">
                    {blog.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{blog.author}</div>
                    <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{blog.role}</div>
                  </div>
               </div>
               <div className="flex items-center gap-4 border-l border-white/10 pl-10">
                  <Calendar className="text-[#F99D1C] w-5 h-5" />
                  <div>
                    <div className="text-sm font-bold text-white">{blog.date}</div>
                    <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Published Date</div>
                  </div>
               </div>
            </div>
          </Motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Share Sidebar */}
            <div className="lg:col-span-1 hidden lg:block">
              <div className="sticky top-32 space-y-8">
                 <div className="text-[10px] font-black text-[#001A3D] uppercase tracking-[0.2em] [writing-mode:vertical-rl] flex items-center gap-4 rotate-180 mb-8 mx-auto">
                    Share Article <span className="w-12 h-[1px] bg-gray-200"></span>
                 </div>
                 <div className="flex flex-col items-center gap-4">
                    <button className="p-3 rounded-full bg-gray-50 text-gray-400 hover:bg-[#0171c1] hover:text-white transition-all">
                       <Linkedin size={18} />
                    </button>
                    <button className="p-3 rounded-full bg-gray-50 text-gray-400 hover:bg-[#0171c1] hover:text-white transition-all">
                       <Twitter size={18} />
                    </button>
                    <button className="p-3 rounded-full bg-gray-50 text-gray-400 hover:bg-[#0171c1] hover:text-white transition-all">
                       <Facebook size={18} />
                    </button>
                    <button className="p-3 rounded-full bg-gray-50 text-gray-400 hover:bg-[#F99D1C] hover:text-white transition-all">
                       <Share2 size={18} />
                    </button>
                 </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-7 space-y-12">
              <div className="prose prose-xl prose-slate max-w-none">
                {blog.content.map((block, idx) => {
                  if (block.type === "paragraph") {
                    return <p key={idx} className="text-lg md:text-xl text-gray-500 font-medium leading-[1.8] mb-8">{block.text}</p>;
                  }
                  if (block.type === "heading") {
                    return <h2 key={idx} className="text-3xl md:text-4xl font-bold text-[#001A3D] display-font mt-12 mb-8">{block.text}</h2>;
                  }
                  if (block.type === "quote") {
                    return (
                      <div key={idx} className="my-16 relative p-12 bg-gray-50 rounded-[2rem] border-l-8 border-[#F99D1C]">
                        <Quote className="absolute top-8 right-8 w-12 h-12 text-[#F99D1C]/10" />
                        <blockquote className="space-y-6">
                           <p className="text-2xl font-bold text-[#001A3D] display-font italic leading-relaxed">
                              "{block.text}"
                           </p>
                           <footer className="flex items-center gap-4">
                              <div className="w-10 h-1 h-[2px] bg-[#F99D1C]"></div>
                              <div>
                                 <div className="font-bold text-[#001A3D]">{block.author}</div>
                                 <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">{block.designation}</div>
                              </div>
                           </footer>
                        </blockquote>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Tags */}
              <div className="pt-12 border-t border-gray-100 flex flex-wrap gap-4">
                 <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-4">
                    <Tag size={14} /> Related Tags:
                 </div>
                 {blog.tags.map((tag, idx) => (
                    <span key={idx} className="px-4 py-2 bg-gray-50 text-gray-500 rounded-full text-xs font-bold hover:bg-[#0171c1] hover:text-white transition-all cursor-pointer">
                       #{tag}
                    </span>
                 ))}
              </div>

              {/* FAQ Section */}
              {blog.faqs && blog.faqs.length > 0 && (
                <div className="pt-20 space-y-12">
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-4xl font-bold text-[#001A3D] display-font">
                      Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-500 font-medium max-w-3xl">
                      Common questions about implementing {blog.category} solutions, answered by our experts.
                    </p>
                  </div>
                  <FAQAccordion faqs={blog.faqs} />
                </div>
              )}
            </div>

            {/* Sidebar: Related Blogs */}
            <div className="lg:col-span-4 lg:pl-12">
              <div className="sticky top-32 space-y-12">
                 <div className="space-y-8">
                    <h4 className="text-xl font-bold text-[#001A3D] display-font border-b border-gray-100 pb-4">Latest Thinking</h4>
                    <div className="space-y-8">
                       {[
                         { title: "Securing the Hybrid Cloud", category: "Cybersecurity", date: "Mar 05, 2026" },
                         { title: "Data-Driven Logistics", category: "Logistics", date: "Feb 28, 2026" },
                         { title: "The Rise of Edge Computing in IoT", category: "Technology", date: "Feb 15, 2026" }
                       ].map((item, idx) => (
                         <div key={idx} className="group cursor-pointer">
                            <div className="text-[10px] text-[#F99D1C] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                               <Calendar size={12} /> {item.date}
                            </div>
                            <h5 className="font-bold text-[#001A3D] group-hover:text-[#0171c1] transition-colors leading-snug">
                               {item.title}
                            </h5>
                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">
                               {item.category}
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-300 group-hover:text-[#001A3D] transition-all">
                               Read Article <ChevronRight size={14} />
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* Newsletter CTA */}
                 <div className="bg-[#001A3D] p-10 rounded-[2.5rem] text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#0171c1]/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="relative z-10 space-y-6">
                       <h4 className="text-2xl font-bold display-font">Stay Informed.</h4>
                       <p className="text-sm text-white/50 leading-relaxed font-medium">
                          Get the latest insights and thought leadership delivered to your inbox weekly.
                       </p>
                       <form className="space-y-4">
                          <input
                            type="email"
                            placeholder="Corporate Email"
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-sm focus:outline-none focus:border-[#0171c1] text-sm"
                          />
                          <button className="w-full py-4 bg-[#0171c1] text-white font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-[#001A3D] transition-all duration-500 rounded-sm">
                             Subscribe Now
                          </button>
                       </form>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
