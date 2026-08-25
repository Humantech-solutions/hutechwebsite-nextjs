"use client";

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CookieConsentContextValue, CookieConsentPreferences } from "@/types/cookieConsent";
import {
  applyGoogleConsentMode,
  applyThirdPartyConsents,
  buildAcceptAllPrefs,
  buildRejectAllPrefs,
  clearConsent,
  getStoredConsent,
  isConsentValid,
  saveConsent,
} from "@/lib/cookieConsent";

// ─── Context ──────────────────────────────────────────────────────────────────

export const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<CookieConsentPreferences | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = getStoredConsent();
    if (isConsentValid(stored)) {
      setConsent(stored);
      applyGoogleConsentMode(stored);
      applyThirdPartyConsents(stored);
    }
  }, []);

  // Apply consent side-effects whenever consent changes
  const applyConsent = useCallback((next: CookieConsentPreferences) => {
    setConsent(next);
    applyGoogleConsentMode(next);
    applyThirdPartyConsents(next);
  }, []);

  const acceptAll = useCallback(() => {
    applyConsent(buildAcceptAllPrefs());
  }, [applyConsent]);

  const rejectAll = useCallback(() => {
    applyConsent(buildRejectAllPrefs());
  }, [applyConsent]);

  const updateConsent = useCallback(
    (prefs: Partial<Omit<CookieConsentPreferences, "essential" | "version" | "consentDate">>) => {
      const current = getStoredConsent();
      const next = saveConsent({
        analytics:  prefs.analytics  ?? current?.analytics  ?? false,
        marketing:  prefs.marketing  ?? current?.marketing  ?? false,
        functional: prefs.functional ?? current?.functional ?? false,
      });
      applyConsent(next);
    },
    [applyConsent]
  );

  const resetConsent = useCallback(() => {
    clearConsent();
    setConsent(null);
  }, []);

  const openModal  = useCallback(() => setIsModalOpen(true),  []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const hasConsent = isConsentValid(consent);

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      consent,
      hasConsent,
      isModalOpen,
      updateConsent,
      acceptAll,
      rejectAll,
      resetConsent,
      openModal,
      closeModal,
    }),
    [consent, hasConsent, isModalOpen, updateConsent, acceptAll, rejectAll, resetConsent, openModal, closeModal]
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}
