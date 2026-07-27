// ─── Cookie Consent Library ───────────────────────────────────────────────────
// Pure utility functions — no React dependencies.

import type { CookieConsentPreferences } from "@/types/cookieConsent";

/** Bump this when your privacy policy changes to force re-consent */
export const COOKIE_CONSENT_VERSION = "1";

const STORAGE_KEY = "hutech_cookie_consent";

// ─── Read ─────────────────────────────────────────────────────────────────────

export function getStoredConsent(): CookieConsentPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookieConsentPreferences;
  } catch {
    return null;
  }
}

// ─── Write ────────────────────────────────────────────────────────────────────

export function saveConsent(
  prefs: Omit<CookieConsentPreferences, "version" | "consentDate" | "essential">
): CookieConsentPreferences {
  const consent: CookieConsentPreferences = {
    version: COOKIE_CONSENT_VERSION,
    essential: true,
    analytics: prefs.analytics,
    marketing: prefs.marketing,
    functional: prefs.functional,
    consentDate: new Date().toISOString(),
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  }
  return consent;
}

export function clearConsent(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
    // Remove legacy key too
    localStorage.removeItem("hutech_cookies_accepted");
  }
}

/** Consent expires after 12 months (milliseconds) */
const CONSENT_EXPIRY_MS = 365 * 24 * 60 * 60 * 1000;

/** Returns true only when consent has been given for the CURRENT version and has not expired */
export function isConsentValid(consent: CookieConsentPreferences | null): boolean {
  if (!consent || consent.version !== COOKIE_CONSENT_VERSION) return false;
  const age = Date.now() - new Date(consent.consentDate).getTime();
  return age < CONSENT_EXPIRY_MS;
}

// ─── Preset helpers ───────────────────────────────────────────────────────────

export function buildAcceptAllPrefs(): CookieConsentPreferences {
  return saveConsent({ analytics: true, marketing: true, functional: true });
}

export function buildRejectAllPrefs(): CookieConsentPreferences {
  return saveConsent({ analytics: false, marketing: false, functional: false });
}

// ─── Google Consent Mode v2 ───────────────────────────────────────────────────
// Called from the context provider whenever consent changes.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function applyGoogleConsentMode(consent: CookieConsentPreferences | null): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  const analytics  = consent?.analytics  === true ? "granted" : "denied";
  const marketing  = consent?.marketing  === true ? "granted" : "denied";
  const functional = consent?.functional === true ? "granted" : "denied";

  window.gtag("consent", "update", {
    analytics_storage:       analytics,
    ad_storage:              marketing,
    ad_user_data:            marketing,
    ad_personalization:      marketing,
    functionality_storage:   functional,
    personalization_storage: functional,
    security_storage:        "granted", // essential — always granted
  });
}

// ─── Future integrations helper ───────────────────────────────────────────────
// Add new integrations here; they are called from the context provider.

export function applyThirdPartyConsents(consent: CookieConsentPreferences | null): void {
  // META PIXEL — example (uncomment when pixel is installed)
  // if (typeof window.fbq === "function") {
  //   window.fbq("consent", consent?.marketing ? "grant" : "revoke");
  // }

  // MICROSOFT CLARITY — example
  // if (typeof window.clarity === "function" && consent?.analytics) {
  //   window.clarity("consent");
  // }

  // HOTJAR — example
  // if (typeof window.hj === "function" && consent?.analytics) {
  //   window.hj("optIn");
  // }

  // Keep this function in place — add integrations here as needed.
  void consent;
}
