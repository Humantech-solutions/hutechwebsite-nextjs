"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FileText, Download, ArrowRight } from "lucide-react";
import { Meta } from "@/components/Meta";
import Link from "next/link";

export default function PressRelease() {
  const releases = [
    { title: "Hutech Solutions Announces Q3 Financial Results", date: "Nov 05, 2025" },
    { title: "Strategic Partnership with Major Cloud Provider", date: "Oct 20, 2025" },
    { title: "Launch of Next-Gen Autonomous Systems", date: "Oct 02, 2025" }
  ];

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta 
        title="Press Release | Hutech Solutions"
        description="Official press releases and corporate announcements from Hutech Solutions."
      />
      <Breadcrumbs variant="light" />
      <section className="bg-[#001A3D] text-white h-[450px] relative flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1591453214154-c95db71dbd83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920" 
            alt="Press Releases" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/80 to-transparent"></div>
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10 text-left w-full">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[1px] bg-[#FFAF2B]"></span>
              <span className="text-[#FFAF2B] font-bold uppercase tracking-[0.3em] text-[10px]">Media Center</span>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight display-font mb-8">
              Press <br /> 
              <span className="text-[#FFAF2B]">Releases.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed">
              Official corporate announcements, strategic partnerships, and executive updates from Hutech Solutions' global leadership.
            </p>
          </Motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="space-y-6">
            {releases.map((rel, i) => (
              <div key={i} className="p-8 border-b border-gray-100 flex justify-between items-center group hover:bg-gray-50 transition-all rounded-xl cursor-pointer">
                <div>
                  <p className="text-xs font-bold text-[#FFAF2B] mb-2">{rel.date}</p>
                  <h3 className="text-xl font-bold text-[#001A3D] display-font">{rel.title}</h3>
                </div>
                <button className="flex items-center gap-2 text-xs font-bold text-[#001A3D] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all">
                  Read More <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
