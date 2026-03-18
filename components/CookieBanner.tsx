"use client";

import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('hutech_cookies_accepted');
    if (!hasAccepted) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('hutech_cookies_accepted', 'true');
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
          className="fixed bottom-0 left-0 right-0 z-[9998] p-4 md:p-6 lg:px-12 pointer-events-none"
        >
          <div className="max-w-[1280px] mx-auto bg-[#001A3D] text-white p-6 rounded-2xl shadow-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 pointer-events-auto">
            <div className="flex items-start md:items-center gap-4">
              <div className="bg-[#0171c1]/20 p-3 rounded-full flex-shrink-0">
                <ShieldCheck className="text-[#0171c1]" size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm tracking-tight uppercase tracking-wider text-[#0171c1]">Cookie Preference</h4>
                <p className="text-[13px] text-gray-300 leading-relaxed max-w-2xl">
                  We use cookies to improve your experience on our site, analyze site usage, and support our marketing efforts. By clicking "Accept All", you consent to our use of cookies.
                  <Link href="/privacy-policy" className="text-[#0171c1] font-bold ml-1 hover:underline inline-flex items-center gap-1">
                    Read Privacy Policy <ArrowRight size={12} />
                  </Link>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <button
                onClick={handleDecline}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-white/20 text-[13px] font-bold hover:bg-white/5 transition-all text-gray-300"
              >
                Reject All
              </button>
              <button
                onClick={handleAccept}
                className="w-full sm:w-auto px-8 py-2.5 rounded-full bg-[#0171c1] text-white text-[13px] font-bold hover:bg-white transition-all hover:text-[#001A3D] shadow-lg shadow-[#0171c1]/20"
              >
                Accept All
              </button>
            </div>

            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}
