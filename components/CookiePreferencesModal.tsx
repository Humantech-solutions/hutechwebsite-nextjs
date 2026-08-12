"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, BarChart2, Megaphone, Settings2 } from "lucide-react";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import type { CookieConsentPreferences } from "@/types/cookieConsent";

// ─── Toggle Component ─────────────────────────────────────────────────────────

interface ToggleProps {
  id: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
  label: string;
}

function Toggle({ id, checked, disabled = false, onChange, label }: ToggleProps) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`
        relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full
        transition-colors duration-200 ease-in-out focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-[#0171c1] focus-visible:ring-offset-2
        ${checked ? "bg-[#0171c1]" : "bg-gray-300"}
        ${disabled ? "cursor-not-allowed opacity-60" : ""}
      `}
    >
      <span
        className={`
          pointer-events-none inline-block h-4 w-4 translate-x-1 rounded-full bg-white shadow
          transition-transform duration-200 ease-in-out
          ${checked ? "translate-x-6" : "translate-x-1"}
        `}
      />
    </button>
  );
}

// ─── Category Row ─────────────────────────────────────────────────────────────

interface CategoryRowProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  toggleId: string;
  checked: boolean;
  disabled?: boolean;
  alwaysEnabled?: boolean;
  onToggle: (value: boolean) => void;
}

function CategoryRow({
  icon,
  title,
  description,
  toggleId,
  checked,
  disabled,
  alwaysEnabled,
  onToggle,
}: CategoryRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-gray-100 py-5 last:border-b-0">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex-shrink-0 rounded-lg bg-[#0171c1]/10 p-2 text-[#0171c1]">
          {icon}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[#001A3D]">{title}</span>
            {alwaysEnabled && (
              <span className="rounded-full bg-[#0171c1]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0171c1]">
                Always On
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{description}</p>
        </div>
      </div>
      <div className="shrink-0 pt-0.5">
        <Toggle
          id={toggleId}
          checked={checked}
          disabled={disabled}
          onChange={onToggle}
          label={`Toggle ${title}`}
        />
      </div>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

export function CookiePreferencesModal() {
  const { consent, isModalOpen, closeModal, updateConsent } = useCookieConsent();

  // Local draft state — only applied on "Save Preferences"
  const [draft, setDraft] = useState({
    analytics:  consent?.analytics  ?? false,
    marketing:  consent?.marketing  ?? false,
    functional: consent?.functional ?? false,
  });

  // Sync draft when modal opens or consent changes
  useEffect(() => {
    if (isModalOpen) {
      setDraft({
        analytics:  consent?.analytics  ?? false,
        marketing:  consent?.marketing  ?? false,
        functional: consent?.functional ?? false,
      });
    }
  }, [isModalOpen, consent]);

  // Focus trap: close on Escape
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isModalOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKey);
    // Move focus into modal
    modalRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKey);
  }, [isModalOpen, closeModal]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isModalOpen]);

  const handleSave = () => {
    updateConsent(draft);
    closeModal();
  };

  const set = (key: keyof typeof draft) => (value: boolean) =>
    setDraft((d) => ({ ...d, [key]: value }));

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <Motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
            onClick={closeModal}
          />

          {/* Modal panel */}
          <Motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-modal-title"
            ref={modalRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-0 z-[10000] flex items-end justify-center p-4 sm:items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-100 bg-[#001A3D] px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-[#0171c1]/20 p-2">
                    <ShieldCheck className="text-[#0171c1]" size={20} />
                  </div>
                  <div>
                    <h2
                      id="cookie-modal-title"
                      className="text-sm font-bold uppercase tracking-wider text-[#0171c1]"
                    >
                      Cookie Preferences
                    </h2>
                    <p className="text-xs text-gray-400">
                      Manage your privacy settings
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  aria-label="Close preferences modal"
                  className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="max-h-[60vh] overflow-y-auto px-6">
                <p className="py-4 text-[13px] leading-relaxed text-gray-500">
                  We use different types of cookies to personalise your experience and to analyse
                  site traffic. You can choose which categories to accept below.
                </p>

                <CategoryRow
                  icon={<ShieldCheck size={16} />}
                  title="Essential Cookies"
                  description="Required for the site to function. Cannot be disabled. These include session management, security, and accessibility features."
                  toggleId="toggle-essential"
                  checked={true}
                  disabled={true}
                  alwaysEnabled={true}
                  onToggle={() => {}}
                />

                <CategoryRow
                  icon={<BarChart2 size={16} />}
                  title="Analytics Cookies"
                  description="Help us understand how visitors interact with the site (e.g. Google Analytics). Data is anonymised and used only to improve our content."
                  toggleId="toggle-analytics"
                  checked={draft.analytics}
                  onToggle={set("analytics")}
                />

                <CategoryRow
                  icon={<Megaphone size={16} />}
                  title="Marketing Cookies"
                  description="Used to deliver relevant advertisements and measure the effectiveness of ad campaigns across platforms such as Google Ads and Meta."
                  toggleId="toggle-marketing"
                  checked={draft.marketing}
                  onToggle={set("marketing")}
                />

                <CategoryRow
                  icon={<Settings2 size={16} />}
                  title="Functional Cookies"
                  description="Enable enhanced features such as live chat, personalisation, and remembering your preferences across visits."
                  toggleId="toggle-functional"
                  checked={draft.functional}
                  onToggle={set("functional")}
                />
              </div>

              {/* Footer */}
              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 px-6 py-5 sm:flex-row sm:justify-end">
                <button
                  onClick={closeModal}
                  className="w-full rounded-full border border-gray-200 px-6 py-2.5 text-[13px] font-bold text-gray-600 transition-all hover:bg-gray-50 sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="w-full rounded-full bg-[#0171c1] px-8 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-[#0171c1]/20 transition-all hover:bg-[#001A3D] sm:w-auto"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </Motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
