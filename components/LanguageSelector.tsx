"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Language = {
  code: string;
  name: string;
  nativeName: string;
  countryCode: string;
};

export const LANGUAGES: Language[] = [
  { code: "en", name: "English", nativeName: "English", countryCode: "us" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", countryCode: "in" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", countryCode: "in" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", countryCode: "in" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", countryCode: "in" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", countryCode: "in" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", countryCode: "bd" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", countryCode: "in" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", countryCode: "in" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", countryCode: "in" },
  { code: "ur", name: "Urdu", nativeName: "اردو", countryCode: "pk" },
  { code: "ne", name: "Nepali", nativeName: "नेपाली", countryCode: "np" },
  { code: "si", name: "Sinhala", nativeName: "සිංහල", countryCode: "lk" },
  { code: "ar", name: "Arabic", nativeName: "العربية", countryCode: "sa" },
  { code: "fa", name: "Persian", nativeName: "فارسی", countryCode: "ir" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", countryCode: "tr" },
  { code: "ru", name: "Russian", nativeName: "Русский", countryCode: "ru" },
  { code: "uk", name: "Ukrainian", nativeName: "Українська", countryCode: "ua" },
  { code: "fr", name: "French", nativeName: "Français", countryCode: "fr" },
  { code: "de", name: "German", nativeName: "Deutsch", countryCode: "de" },
  { code: "es", name: "Spanish", nativeName: "Español", countryCode: "es" },
  { code: "pt", name: "Portuguese", nativeName: "Português", countryCode: "pt" },
  { code: "it", name: "Italian", nativeName: "Italiano", countryCode: "it" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", countryCode: "nl" },
  { code: "pl", name: "Polish", nativeName: "Polski", countryCode: "pl" },
  { code: "sv", name: "Swedish", nativeName: "Svenska", countryCode: "se" },
  { code: "no", name: "Norwegian", nativeName: "Norsk", countryCode: "no" },
  { code: "da", name: "Danish", nativeName: "Dansk", countryCode: "dk" },
  { code: "fi", name: "Finnish", nativeName: "Suomi", countryCode: "fi" },
  { code: "el", name: "Greek", nativeName: "Ελληνικά", countryCode: "gr" },
  { code: "cs", name: "Czech", nativeName: "Čeština", countryCode: "cz" },
  { code: "hu", name: "Hungarian", nativeName: "Magyar", countryCode: "hu" },
  { code: "ro", name: "Romanian", nativeName: "Română", countryCode: "ro" },
  { code: "bg", name: "Bulgarian", nativeName: "Български", countryCode: "bg" },
  { code: "sr", name: "Serbian", nativeName: "Српски", countryCode: "rs" },
  { code: "hr", name: "Croatian", nativeName: "Hrvatski", countryCode: "hr" },
  { code: "sk", name: "Slovak", nativeName: "Slovenčina", countryCode: "sk" },
  { code: "sl", name: "Slovenian", nativeName: "Slovenščina", countryCode: "si" },
  { code: "lt", name: "Lithuanian", nativeName: "Lietuvių", countryCode: "lt" },
  { code: "lv", name: "Latvian", nativeName: "Latviešu", countryCode: "lv" },
  { code: "et", name: "Estonian", nativeName: "Eesti", countryCode: "ee" },
  { code: "zh-CN", name: "Simplified Chinese", nativeName: "中文", countryCode: "cn" },
  { code: "zh-TW", name: "Traditional Chinese", nativeName: "中文（繁體）", countryCode: "tw" },
  { code: "ja", name: "Japanese", nativeName: "日本語", countryCode: "jp" },
  { code: "ko", name: "Korean", nativeName: "한국어", countryCode: "kr" },
  { code: "th", name: "Thai", nativeName: "ไทย", countryCode: "th" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", countryCode: "vn" },
  { code: "id", name: "Bahasa Indonesia", nativeName: "Bahasa Indonesia", countryCode: "id" },
  { code: "ms", name: "Bahasa Melayu", nativeName: "Bahasa Melayu", countryCode: "my" },
  { code: "tl", name: "Filipino (Tagalog)", nativeName: "Filipino", countryCode: "ph" },
  { code: "sw", name: "Swahili", nativeName: "Kiswahili", countryCode: "tz" },
  { code: "af", name: "Afrikaans", nativeName: "Afrikaans", countryCode: "za" },
  { code: "am", name: "Amharic", nativeName: "አማርኛ", countryCode: "et" },
  { code: "he", name: "Hebrew", nativeName: "עברית", countryCode: "il" },
].sort((a, b) => a.name.localeCompare(b.name));

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(LANGUAGES.find(l => l.code === "en") || LANGUAGES[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Initialize from localStorage
  useEffect(() => {
    const savedCode = localStorage.getItem("hutech_language");
    if (savedCode) {
      const lang = LANGUAGES.find((l) => l.code === savedCode);
      if (lang) setSelectedLanguage(lang);
    }
  }, []);

  // Handle outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when opening
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchQuery("");
    }
  }, [isOpen]);

  const filteredLanguages = LANGUAGES.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (lang: Language) => {
    setSelectedLanguage(lang);
    localStorage.setItem("hutech_language", lang.code);
    setIsOpen(false);
    
    // Optional: Dispatch event for custom i18n hooks to pick up, or reload
    window.dispatchEvent(new CustomEvent("languageChange", { detail: lang.code }));
    // If a full reload is needed to fetch translated content, uncomment:
    // window.location.reload();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown" && isOpen) {
      e.preventDefault();
      const firstItem = listRef.current?.querySelector("li");
      firstItem?.focus();
    }
  };

  const handleItemKeyDown = (e: React.KeyboardEvent, lang: Language, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelect(lang);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextItem = listRef.current?.children[index + 1] as HTMLElement;
      nextItem?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevItem = listRef.current?.children[index - 1] as HTMLElement;
      if (prevItem) {
        prevItem.focus();
      } else {
        inputRef.current?.focus();
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative pt-4 flex justify-start w-full sm:w-auto" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="w-full sm:w-[280px] flex items-center justify-between gap-3 bg-white/5 hover:bg-white/10 text-white px-4 py-3 rounded-lg border border-white/10 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-[#0171c1]"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <img
            src={`https://flagcdn.com/${selectedLanguage.countryCode}.svg`}
            alt={`${selectedLanguage.name} flag`}
            className="w-6 h-4 object-cover rounded-[2px] shadow-sm flex-shrink-0"
            loading="lazy"
          />
          <div className="flex flex-col items-start truncate">
            <span className="text-sm font-semibold truncate leading-tight">
              {selectedLanguage.nativeName}
            </span>
            <span className="text-[11px] text-gray-400 truncate leading-tight">
              {selectedLanguage.name}
            </span>
          </div>
        </div>
        <ChevronDown
          size={16}
          strokeWidth={2.5}
          className={`text-gray-400 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-0 mb-2 w-full sm:w-[320px] bg-[#0A1929] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 flex flex-col"
          >
            <div className="p-3 border-b border-white/10 bg-[#0A1929]/95 backdrop-blur-sm sticky top-0">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search languages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0171c1] transition-all"
                  aria-label="Search languages"
                />
              </div>
            </div>

            <ul
              ref={listRef}
              className="max-h-[300px] overflow-y-auto p-2 space-y-1 custom-scrollbar"
              role="listbox"
            >
              {filteredLanguages.length > 0 ? (
                filteredLanguages.map((lang, index) => {
                  const isSelected = selectedLanguage.code === lang.code;
                  return (
                    <li
                      key={lang.code}
                      role="option"
                      aria-selected={isSelected}
                      tabIndex={0}
                      onClick={() => handleSelect(lang)}
                      onKeyDown={(e) => handleItemKeyDown(e, lang, index)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors outline-none focus:bg-white/10 ${
                        isSelected ? "bg-[#0171c1]/10 text-[#0171c1]" : "hover:bg-white/5 text-gray-300 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://flagcdn.com/${lang.countryCode}.svg`}
                          alt={`${lang.name} flag`}
                          className="w-5 h-3.5 object-cover rounded-[2px] shadow-sm flex-shrink-0 opacity-90"
                          loading="lazy"
                        />
                        <div className="flex flex-col">
                          <span className={`text-sm ${isSelected ? "font-bold" : "font-medium"}`}>
                            {lang.nativeName}
                          </span>
                          <span className="text-[11px] opacity-70">
                            {lang.name}
                          </span>
                        </div>
                      </div>
                      {isSelected && <Check size={16} strokeWidth={3} className="text-[#0171c1]" />}
                    </li>
                  );
                })
              ) : (
                <div className="px-4 py-8 text-center text-gray-500 text-sm">
                  No languages found
                </div>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
    </div>
  );
}
