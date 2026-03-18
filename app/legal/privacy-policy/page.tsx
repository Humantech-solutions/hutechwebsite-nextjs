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

      <section className="bg-[#001A3D] text-white py-20 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-semibold mb-6 display-font tracking-tight">Privacy <span className="text-[#FFAF2B]">Policy</span></h1>
            <p className="text-lg text-gray-300">Effective Date: March 15, 2026</p>
          </Motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="prose prose-blue max-w-4xl text-gray-600 leading-relaxed space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[#001A3D] mb-4">1. Data Collection</h2>
              <p>We collect various types of information for several purposes to provide and improve our services to you. This includes Personal Data (email address, name, phone number) and Usage Data (how you use the service).</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-[#001A3D] mb-4">2. Use of Data</h2>
              <p>Hutech Solutions uses the collected data for various purposes: to provide and maintain the service, to notify you about changes, to allow you to participate in interactive features, and to provide customer care and support.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#001A3D] mb-4">3. Security of Data</h2>
              <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#001A3D] mb-4">4. GDPR & Data Protection</h2>
              <p>Hutech Solutions is committed to protecting the privacy and security of the personal data we process. We comply with applicable data protection laws, including the General Data Protection Regulation (GDPR).</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#001A3D] mb-4">5. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at privacy@hutechsolutions.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
