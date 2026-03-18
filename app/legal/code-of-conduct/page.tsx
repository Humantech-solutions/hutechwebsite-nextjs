"use client";

import { motion as Motion } from "framer-motion";
import { Meta } from "@/components/Meta";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function CodeOfConduct() {
  return (
    <div className="flex flex-col bg-white">
      <Meta
        title="Code of Conduct | Hutech Solutions"
        description="Our ethical standards and community guidelines."
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
              Code of <span className="text-[#FFAF2B]">Conduct</span>
            </h1>
            <p className="text-lg text-gray-300">Effective Date: March 15, 2026</p>
          </Motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="prose prose-blue max-w-4xl space-y-8 leading-relaxed text-gray-600">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-[#001A3D]">1. Ethical Conduct</h2>
              <p>
                Hutech Solutions and its employees must at all times comply with all applicable laws
                and regulations. We are committed to conducting our business in an ethical manner
                and with the highest degree of integrity.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-[#001A3D]">
                2. Respectful Communication
              </h2>
              <p>
                We believe in maintaining a work environment that is free from discrimination and
                harassment. All communication and interaction between employees, clients, and
                partners should be respectful and professional.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-[#001A3D]">3. Professional Excellence</h2>
              <p>
                We strive for excellence in everything we do. Our commitment to professional
                excellence means delivering high-quality services, being accountable for our
                actions, and continuously improving our skills and processes.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-[#001A3D]">4. Confidentiality</h2>
              <p>
                Maintaining the confidentiality of client and company information is a fundamental
                part of our code of conduct. We are committed to protecting sensitive data and
                respecting intellectual property rights.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-[#001A3D]">5. Reporting Violations</h2>
              <p>
                Any suspected violations of this Code of Conduct should be reported immediately
                through our official channels. We take all reports seriously and will conduct
                thorough investigations as needed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
