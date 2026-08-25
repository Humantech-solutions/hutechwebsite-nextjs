// ─── Cookie Consent Types ────────────────────────────────────────────────────

export interface CookieConsentPreferences {
  version: string;
  essential: true; 
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  consentDate: string; 
}

export type CookieConsentCategory = keyof Omit<
  CookieConsentPreferences,
  "version" | "consentDate"
>;

export interface CookieConsentContextValue {
  consent: CookieConsentPreferences | null;
  hasConsent: boolean;
  isModalOpen: boolean;
  updateConsent: (prefs: Partial<Omit<CookieConsentPreferences, "essential" | "version" | "consentDate">>) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  resetConsent: () => void;
  openModal: () => void;
  closeModal: () => void;
}
