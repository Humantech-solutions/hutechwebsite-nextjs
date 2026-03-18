"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BookOpen, Newspaper, FileText, PlayCircle, MoveRight } from "lucide-react";
import { Meta } from "@/components/Meta";
import Link from "next/link";

export default function Insights() {
  return (
    <div className="bg-white min-h-screen">
      <Meta 
        title="Resources & Insights | Hutech Solutions"
        description="Explore the latest technology trends, case studies, and digital transformation insights from Hutech Solutions."
      />
      <Breadcrumbs variant="light" />
      <section className="bg-[#001A3D] text-white h-[450px] relative overflow-hidden flex items-center">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10 text-left w-full">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="text-[#FFAF2B] font-semibold tracking-wide text-xs">Knowledge Hub</span>
            <h1 className="text-5xl md:text-8xl font-semibold leading-tight display-font">
              Resources & <span className="text-[#FFAF2B]">Insights.</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl font-medium">
              Deep dives into the technologies and strategies shaping the future of digital engineering.
            </p>
          </Motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Case Studies", icon: <FileText className="text-[#FFAF2B]" />, desc: "Real-world success stories.", href: "/resources/case-studies" },
              { title: "Whitepapers", icon: <BookOpen className="text-[#FFAF2B]" />, desc: "Technical deep-dives.", href: "/resources/documents" },
              { title: "Tech Blogs", icon: <Newspaper className="text-[#FFAF2B]" />, desc: "Weekly innovation updates.", href: "/blogs" },
              { title: "Webinars", icon: <PlayCircle className="text-[#FFAF2B]" />, desc: "Expert-led video sessions.", href: "/resources/media" }
            ].map((item, i) => (
              <Link key={i} href={item.href}>
                <div className="p-10 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-xl transition-all group h-full">
                  <div className="mb-6">{item.icon}</div>
                  <h3 className="text-xl font-bold text-[#001A3D] mb-2 display-font">{item.title}</h3>
                  <p className="text-gray-500 text-sm mb-6">{item.desc}</p>
                  <div className="flex items-center text-[11px] font-semibold text-[#001A3D] tracking-wide">
                    Explore <MoveRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
