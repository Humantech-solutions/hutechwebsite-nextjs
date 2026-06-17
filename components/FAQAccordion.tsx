"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { ChevronRight } from "lucide-react";

export function FAQAccordion({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border-b border-gray-100 last:border-b-0"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between px-8 py-6 text-left hover:bg-gray-50 transition-colors group"
          >
            <h3 className="font-bold text-[#001A3D] pr-8 leading-snug text-base">
              {faq.question}
            </h3>
            <ChevronRight
              size={20}
              className={`flex-shrink-0 text-gray-400 transition-transform ${
                openIndex === index ? 'rotate-90' : ''
              }`}
            />
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <Motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-6">
                  <p className="text-gray-500 leading-relaxed font-medium text-base">
                    {faq.answer}
                  </p>
                </div>
              </Motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
