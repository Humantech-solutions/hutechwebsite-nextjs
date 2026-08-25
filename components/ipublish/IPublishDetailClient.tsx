"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";
import { Calendar, Clock } from "lucide-react";

export function IPublishDetailClient({ content }: { content: any }) {
  // Extract dynamic styles
  const gradientFrom = content.banner_gradient_from || "#6d5ef8";
  const gradientTo = content.banner_gradient_to || "#ec4899";
  const gradientDirection = content.banner_gradient_direction || "135deg";
  
  const titleColor = content.title_color || "#ffffff";
  const titleFont = content.title_font || "inter"; // We could map this to next/font if needed
  const titleWeight = content.title_weight || 700;
  
  const date = new Date(content.published_at || content.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Calculate estimated read time (avg 200 words per min)
  const wordCount = content.word_count || 500;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="flex min-h-screen flex-col bg-[#0f172a] text-white">
      <Meta
        title={`${content.title} | Hutech Solutions`}
        description={content.excerpt || ""}
      />
      
      {/* Banner Section matching iPublish exactly */}
      <section 
        className="relative flex flex-col items-center justify-center overflow-hidden py-32 px-6"
        style={{
          background: `linear-gradient(${gradientDirection}, ${gradientFrom}, ${gradientTo})`
        }}
      >
        {/* Optional Pattern Overlay */}
        {content.banner_pattern === "vertical-lines" && (
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(90deg, ${content.banner_pattern_color || '#ffffff'} ${content.banner_pattern_opacity || 10}%, transparent 1%)`,
              backgroundSize: '40px 100%'
            }}
          />
        )}
        
        {/* Overlay Color if specified */}
        {content.overlay_color && (
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundColor: content.overlay_color, opacity: 0.2 }}
          />
        )}

        <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
          <Motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-4xl md:text-5xl lg:text-6xl leading-tight"
            style={{
              color: titleColor,
              fontFamily: titleFont,
              fontWeight: titleWeight,
              fontStyle: content.title_italic ? "italic" : "normal",
              textShadow: content.title_shadow === "soft" ? "0 4px 6px rgba(0,0,0,0.1)" : "none"
            }}
          >
            {content.title}
          </Motion.h1>
          
          <Motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-6 text-sm font-medium"
            style={{ color: titleColor, opacity: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{readTime} min read</span>
            </div>
          </Motion.div>
        </div>
      </section>

      {/* Content Body */}
      <section className="py-16 px-6 lg:px-20">
        <div className="mx-auto max-w-3xl">
          <div 
            className="prose prose-lg prose-invert max-w-none 
                       prose-headings:font-bold prose-headings:text-white
                       prose-p:text-gray-300 prose-p:leading-relaxed
                       prose-a:text-[#F99D1C] hover:prose-a:text-white prose-a:transition-colors
                       prose-strong:text-white"
            dangerouslySetInnerHTML={{ __html: content.current_body || "" }}
          />
        </div>
      </section>
    </div>
  );
}
