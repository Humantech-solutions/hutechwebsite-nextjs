"use client";

import { motion as Motion } from "framer-motion";
import { Meta } from "@/components/Meta";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function Privacy() {
  return (
    <div className="flex flex-col bg-white">
      <Meta
        title="Privacy Policy | Hutech Solutions"
        description="Learn about our commitment to protecting your privacy."
      />
      <Breadcrumbs variant="light" />

      <section className="relative overflow-hidden bg-[#001A3D] py-20 text-white">
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="display-font mb-6 text-4xl font-semibold tracking-tight md:text-5xl">
              Privacy <span className="text-[#FFAF2B]">Policy</span>
            </h1>
            <p className="text-lg text-gray-300">Effective Date: March 15, 2026</p>
          </Motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="prose prose-blue max-w-4xl space-y-8 leading-relaxed text-gray-600">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-[#001A3D]">1. Data Collection</h2>
              <p>
                We collect various types of information for several purposes to provide and improve
                our services to you.
              </p>
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-bold text-[#001A3D]">2. Use of Data</h2>
              <p>
                Hutech Solutions uses the collected data for various purposes: to provide and
                maintain the service, and to notify you about changes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
