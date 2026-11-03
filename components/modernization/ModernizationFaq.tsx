"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { FAQItem as FAQItemType } from "@/lib/data/legacy-modernization";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-center justify-between py-6 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <span
          className={`display-font text-lg font-bold transition-colors md:text-xl ${
            isOpen ? "text-[#0171c1]" : "text-[#001A3D] group-hover:text-[#0171c1]"
          }`}
        >
          {question}
        </span>
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center transition-all ${
            isOpen ? "text-[#0171c1]" : "text-gray-400 group-hover:text-[#0171c1]"
          }`}
        >
          <ChevronRight
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-base leading-relaxed text-gray-500 md:text-lg">
              {answer}
            </p>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ModernizationFaq({ items }: { items: FAQItemType[] }) {
  return (
    <section id="faq" className="scroll-mt-16 bg-white py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
        <div className="mb-20 space-y-6 text-center">
          <h2 className="display-font text-3xl font-semibold tracking-tight text-[#001A3D] md:text-5xl">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto h-1 w-20 bg-[#0171c1]"></div>
        </div>
        <div className="mx-auto max-w-4xl divide-y divide-gray-100">
          {items.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
