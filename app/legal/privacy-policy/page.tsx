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
                our services to you. This includes Personal Data (email address, name, phone number)
                and Usage Data (how you use the service).
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-[#001A3D]">2. Use of Data</h2>
              <p>
                Hutech Solutions uses the collected data for various purposes: to provide and
                maintain the service, to notify you about changes, to allow you to participate in
                interactive features, and to provide customer care and support.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-[#001A3D]">3. Security of Data</h2>
              <p>
                The security of your data is important to us, but remember that no method of
                transmission over the Internet, or method of electronic storage is 100% secure.
                While we strive to use commercially acceptable means to protect your Personal Data,
                we cannot guarantee its absolute security.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-[#001A3D]">4. GDPR & Data Protection</h2>
              <p>
                Hutech Solutions is committed to protecting the privacy and security of the personal
                data we process. We comply with applicable data protection laws, including the
                General Data Protection Regulation (GDPR).
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-[#001A3D]">5. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at
                privacy@hutechsolutions.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
