"use client";

import { useContext } from "react";
import { CookieConsentContext } from "@/context/CookieConsentProvider";
import type { CookieConsentContextValue } from "@/types/cookieConsent";

/**
 * useCookieConsent
 *
 * Returns the full cookie consent context.
 * Must be used inside <CookieConsentProvider>.
 *
 * @example
 * const { consent, hasConsent, acceptAll, rejectAll } = useCookieConsent();
 *
 * // Guard analytics / marketing scripts:
 * if (consent?.analytics) { initAnalytics(); }
 */
export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used inside <CookieConsentProvider>");
  }
  return ctx;
}
