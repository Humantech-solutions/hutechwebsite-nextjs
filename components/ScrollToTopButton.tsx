"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion as Motion, AnimatePresence } from "framer-motion";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <Motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-[100px] right-8 z-[100] bg-[#001A3D] border border-white/10 text-[#FFAF2B] p-4 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:bg-[#0171c1] hover:text-white transition-all duration-500 group cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
          <span className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-[#001A3D] text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-[#FFAF2B]/20">
            Back to Top
          </span>
        </Motion.button>
      )}
    </AnimatePresence>
  );
}
