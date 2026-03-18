"use client";

import React, { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, X, ArrowRight } from "lucide-react";
import Link from "next/link";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("hutech_cookies_accepted");
    if (!hasAccepted) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("hutech_cookies_accepted", "true");
    setIsVisible(false);
  };

  const handleDecline = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <Motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="pointer-events-none fixed right-0 bottom-0 left-0 z-[9998] p-4 md:p-6 lg:px-12"
        >
          <div className="pointer-events-auto mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-[#001A3D] p-6 text-white shadow-2xl md:flex-row">
            <div className="flex items-start gap-4 md:items-center">
              <div className="flex-shrink-0 rounded-full bg-[#0171c1]/20 p-3">
                <ShieldCheck className="text-[#0171c1]" size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold tracking-tight tracking-wider text-[#0171c1] uppercase">
                  Cookie Preference
                </h4>
                <p className="max-w-2xl text-[13px] leading-relaxed text-gray-300">
                  We use cookies to improve your experience on our site, analyze site usage, and
                  support our marketing efforts. By clicking "Accept All", you consent to our use of
                  cookies.
                  <Link
                    href="/privacy-policy"
                    className="ml-1 inline-flex items-center gap-1 font-bold text-[#0171c1] hover:underline"
                  >
                    Read Privacy Policy <ArrowRight size={12} />
                  </Link>
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col items-center gap-3 sm:flex-row md:w-auto">
              <button
                onClick={handleDecline}
                className="w-full rounded-full border border-white/20 px-6 py-2.5 text-[13px] font-bold text-gray-300 transition-all hover:bg-white/5 sm:w-auto"
              >
                Reject All
              </button>
              <button
                onClick={handleAccept}
                className="w-full rounded-full bg-[#0171c1] px-8 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-[#0171c1]/20 transition-all hover:bg-white hover:text-[#001A3D] sm:w-auto"
              >
                Accept All
              </button>
            </div>

            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-gray-400 transition-colors hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}
