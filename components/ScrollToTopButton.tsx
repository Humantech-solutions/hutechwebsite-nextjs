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
          className="group fixed right-8 bottom-[100px] z-[100] cursor-pointer rounded-full border border-white/10 bg-[#001A3D] p-4 text-[#FFAF2B] shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-500 hover:bg-[#0171c1] hover:text-white"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
          <span className="pointer-events-none absolute top-1/2 right-full mr-6 -translate-y-1/2 rounded-sm border border-[#FFAF2B]/20 bg-[#001A3D] px-4 py-2 text-[10px] font-bold tracking-[0.2em] whitespace-nowrap text-white uppercase opacity-0 transition-opacity group-hover:opacity-100">
            Back to Top
          </span>
        </Motion.button>
      )}
    </AnimatePresence>
  );
}
