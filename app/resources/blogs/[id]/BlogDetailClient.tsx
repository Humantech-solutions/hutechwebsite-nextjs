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
import { Blog } from "@/lib/data/blogs";
import { renderTitle } from "@/lib/utils";
import { FAQAccordion } from "@/components/FAQAccordion";

const BRAND_ORANGE = "#F99D1C";

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

  const shareUrl = typeof window !== 'undefined' ? window.location.href.replace(window.location.origin, 'https://hutechsolutions.ai') : '';

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <Meta title={`${blog.title} | Blogs | Hutech Solutions`} description={blog.excerpt ?? (blog.content?.[0]?.text ?? "")} />
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="bg-[#001A3D] text-white min-h-[500px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          {blog.image && (
            <ImageWithFallback
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover opacity-20"
            />
          )}
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
              {renderTitle(blog.title)}
            </h1>

            <div className="flex flex-wrap items-center gap-10 pt-4 border-t border-white/10 w-fit pr-12">
               {/* <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0171c1] flex items-center justify-center font-bold text-lg text-white">
                    {blog.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{blog.author}</div>
                    <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{blog.role}</div>
                  </div>
               </div> */}
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
                    <button onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')} className="p-3 rounded-full bg-gray-50 text-gray-400 hover:bg-[#0171c1] hover:text-white transition-all">
                       <Linkedin size={18} />
                    </button>
                    <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(blog.title)}`, '_blank')} className="p-3 rounded-full bg-gray-50 text-gray-400 hover:bg-[#0171c1] hover:text-white transition-all">
                       <Twitter size={18} />
                    </button>
                    <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')} className="p-3 rounded-full bg-gray-50 text-gray-400 hover:bg-[#0171c1] hover:text-white transition-all">
                       <Facebook size={18} />
                    </button>
                    <button onClick={async () => {
                      if (navigator.share) {
                        try {
                          await navigator.share({
                            title: blog.title,
                            text: blog.excerpt || blog.title,
                            url: shareUrl,
                          });
                        } catch (err) {
                          console.log('Error sharing', err);
                        }
                      } else {
                        navigator.clipboard.writeText(shareUrl);
                        alert("Link copied to clipboard!");
                      }
                    }} className="p-3 rounded-full bg-gray-50 text-gray-400 hover:bg-[#F99D1C] hover:text-white transition-all">
                       <Share2 size={18} />
                    </button>
                 </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-7 space-y-12">
              <div className="prose prose-xl prose-slate max-w-none">
                {(blog as any).contentHtml ? (
                  // WordPress post: render HTML content
                  <div
                    className="wp-content text-lg text-gray-500 font-medium leading-[1.8] [&_h2]:text-3xl [&_h2]:md:text-4xl [&_h2]:font-bold [&_h2]:text-[#001A3D] [&_h2]:display-font [&_h2]:mt-12 [&_h2]:mb-8 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-[#001A3D] [&_h3]:mt-8 [&_h3]:mb-4 [&_p]:mb-8 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_li]:mb-2 [&_a]:text-[#0171c1] [&_a]:underline"
                    dangerouslySetInnerHTML={{ __html: (blog as any).contentHtml }}
                  />
                ) : (
                  // Static data: render content blocks
                  blog.content.map((block, idx) => {
                    if (block.type === "paragraph") {
                      return <p key={idx} className="text-lg md:text-xl text-gray-500 font-medium leading-[1.8] mb-8">{block.text}</p>;
                    }
                    if (block.type === "heading") {
                      return <h2 key={idx} className="text-3xl md:text-4xl font-bold text-[#001A3D] display-font mt-12 mb-8">{block.text}</h2>;
                    }
                    if (block.type === "quote") {
                      return (
                        <div key={idx} className="my-16 relative p-12 bg-gray-50 rounded-[15px] md:rounded-[2rem] border-l-8 border-[#F99D1C]">
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
                  })
                )}
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
                      {blog.faqTitle ? renderTitle(blog.faqTitle) : "Frequently Asked Questions"}
                    </h2>
                    <p className="text-lg text-gray-500 font-medium max-w-3xl">
                      {blog.faqSubtitle ? renderTitle(blog.faqSubtitle) : `Common questions about implementing ${blog.category} solutions, answered by our experts.`}
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

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
