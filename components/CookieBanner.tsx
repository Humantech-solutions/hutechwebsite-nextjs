"use client";

import React, { useEffect, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { isConsentValid, getStoredConsent } from "@/lib/cookieConsent";
import { CookiePreferencesModal } from "@/components/CookiePreferencesModal";

export function CookieBanner() {
  const { acceptAll, rejectAll, openModal, hasConsent } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show banner after a short delay if consent is not yet given for current version
    const stored = getStoredConsent();
    if (!isConsentValid(stored)) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Hide banner once consent is saved
  useEffect(() => {
    if (hasConsent) setIsVisible(false);
  }, [hasConsent]);

  const handleAcceptAll = () => {
    acceptAll();
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    rejectAll();          // persists to localStorage
    setIsVisible(false);
  };

  const handleCustomize = () => {
    openModal();
    setIsVisible(false);  // hide banner while modal is open
  };

  return (
    <>
      {/* ── Banner ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isVisible && (
          <Motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="pointer-events-none fixed right-0 bottom-0 left-0 z-[9998] p-4 md:p-6 lg:px-12"
            role="region"
            aria-label="Cookie consent banner"
            aria-live="polite"
          >
            <div className="pointer-events-auto mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-6 rounded-2xl border border-white/10 bg-[#001A3D] p-6 text-white shadow-2xl md:flex-row md:items-center">
              {/* ── Info ── */}
              <div className="flex items-start gap-4 md:items-center">
                <div className="flex-shrink-0 rounded-full bg-[#0171c1]/20 p-3">
                  <ShieldCheck className="text-[#0171c1]" size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#0171c1]">
                    Cookie Preference
                  </h4>
                  <p className="max-w-2xl text-[13px] leading-relaxed text-gray-300">
                    We use cookies to improve your experience on our site, analyze site usage, and
                    support our marketing efforts. By clicking &ldquo;Accept All&rdquo;, you consent
                    to our use of cookies.{" "}
                    <Link
                      href="/privacy-policy"
                      className="ml-1 inline-flex items-center gap-1 font-bold text-[#0171c1] hover:underline"
                    >
                      Read Privacy Policy <ArrowRight size={12} />
                    </Link>
                  </p>
                </div>
              </div>

              {/* ── Actions ── */}
              <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center md:w-auto">
                <button
                  onClick={handleRejectAll}
                  className="w-full rounded-full border border-white/20 px-6 py-2.5 text-[13px] font-bold text-gray-300 transition-all hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto"
                >
                  Reject All
                </button>
                <button
                  onClick={handleCustomize}
                  className="w-full rounded-full border border-[#0171c1]/40 px-6 py-2.5 text-[13px] font-bold text-[#0171c1] transition-all hover:bg-[#0171c1]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0171c1] sm:w-auto"
                >
                  Customize Preferences
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="w-full rounded-full bg-[#0171c1] px-8 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-[#0171c1]/20 transition-all hover:bg-white hover:text-[#001A3D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto"
                >
                  Accept All
                </button>
              </div>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* ── Preferences Modal (rendered globally, portal-style) ──────────── */}
      <CookiePreferencesModal />
    </>
  );
}
