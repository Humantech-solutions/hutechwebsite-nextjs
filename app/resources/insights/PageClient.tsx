"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BookOpen, Newspaper, FileText, PlayCircle, MoveRight } from "lucide-react";
import { Meta } from "@/components/Meta";
import Link from "next/link";

export default function Insights() {
  return (
    <div className="min-h-screen bg-white">
      <Meta
        title="Resources & Insights | Hutech Solutions"
        description="Explore the latest technology trends, case studies, and digital transformation insights from Hutech Solutions."
      />
      <Breadcrumbs variant="light" />
      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 text-left lg:px-20">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="text-xs font-semibold tracking-wide text-[#F99D1C]">
              Knowledge Hub
            </span>
            <h1 className="display-font text-5xl leading-tight font-semibold md:text-8xl">
              Resources & <span className="text-[#F99D1C]">Insights.</span>
            </h1>
            <p className="max-w-2xl text-xl font-medium text-gray-400">
              Deep dives into the technologies and strategies shaping the future of digital
              engineering.
            </p>
          </Motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Case Studies",
                icon: <FileText className="text-[#F99D1C]" />,
                desc: "Real-world success stories.",
                href: "/resources/case-studies",
              },
              {
                title: "Whitepapers",
                icon: <BookOpen className="text-[#F99D1C]" />,
                desc: "Technical deep-dives.",
                href: "/resources/documents",
              },
              {
                title: "Tech Blogs",
                icon: <Newspaper className="text-[#F99D1C]" />,
                desc: "Weekly innovation updates.",
                href: "/blogs",
              },
              {
                title: "Webinars",
                icon: <PlayCircle className="text-[#F99D1C]" />,
                desc: "Expert-led video sessions.",
                href: "/resources/media",
              },
            ].map((item, i) => (
              <Link key={i} href={item.href}>
                <div className="group h-full rounded-3xl border border-gray-100 bg-gray-50 p-10 transition-all hover:shadow-xl">
                  <div className="mb-6">{item.icon}</div>
                  <h3 className="display-font mb-2 text-xl font-bold text-[#001A3D]">
                    {item.title}
                  </h3>
                  <p className="mb-6 text-sm text-gray-500">{item.desc}</p>
                  <div className="flex items-center text-[11px] font-semibold tracking-wide text-[#001A3D]">
                    Explore{" "}
                    <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
