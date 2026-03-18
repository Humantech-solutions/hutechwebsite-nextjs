"use client";

import { motion as Motion } from "framer-motion";
import { Meta } from "@/components/Meta";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function Terms() {
  return (
    <div className="flex flex-col bg-white">
      <Meta 
        title="Terms and Condition | Hutech Solutions"
        description="Read our terms and conditions for using Hutech Solutions services."
      />
      <Breadcrumbs variant="light" />

      <section className="bg-[#001A3D] text-white py-20 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-semibold mb-6 display-font tracking-tight">Terms and <span className="text-[#FFAF2B]">Condition</span></h1>
            <p className="text-lg text-gray-300">Effective Date: March 15, 2026</p>
          </Motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="prose prose-blue max-w-4xl text-gray-600 leading-relaxed space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[#001A3D] mb-4">1. Acceptance of Terms</h2>
              <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-[#001A3D] mb-4">2. Use of License</h2>
              <p>Permission is granted to temporarily download one copy of the materials (information or software) on Hutech Solutions' website for personal, non-commercial transitory viewing only.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#001A3D] mb-4">3. Disclaimer</h2>
              <p>The materials on Hutech Solutions' website are provided on an 'as is' basis. Hutech Solutions makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#001A3D] mb-4">4. Limitations</h2>
              <p>In no event shall Hutech Solutions or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Hutech Solutions' website.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#001A3D] mb-4">5. Governing Law</h2>
              <p>These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in Bengaluru, Karnataka.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
