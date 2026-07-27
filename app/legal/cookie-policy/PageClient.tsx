"use client";

import { motion as Motion } from "framer-motion";
import { Meta } from "@/components/Meta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShieldCheck, BarChart2, Megaphone, Settings2, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import Link from "next/link";

// ─── Cookie inventory ─────────────────────────────────────────────────────────

interface CookieEntry {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
  category: "Essential" | "Analytics" | "Marketing" | "Functional";
}

const COOKIE_TABLE: CookieEntry[] = [
  // Essential
  {
    name: "hutech_cookie_consent",
    provider: "Hutech Solutions",
    purpose: "Stores your cookie consent preferences so the banner does not reappear on every visit.",
    duration: "12 months",
    category: "Essential",
  },
  {
    name: "NEXT_LOCALE",
    provider: "Next.js / Vercel",
    purpose: "Stores your preferred language / locale for the site.",
    duration: "Session",
    category: "Essential",
  },
  // Analytics
  {
    name: "_ga",
    provider: "Google Analytics",
    purpose: "Registers a unique ID used to generate statistical data on how you use the website.",
    duration: "2 years",
    category: "Analytics",
  },
  {
    name: "_ga_*",
    provider: "Google Analytics",
    purpose: "Used by Google Analytics 4 to persist session state across pages.",
    duration: "2 years",
    category: "Analytics",
  },
  {
    name: "_gid",
    provider: "Google Analytics",
    purpose: "Registers a unique ID used to generate statistical data on how you use the website.",
    duration: "24 hours",
    category: "Analytics",
  },
  {
    name: "_gat",
    provider: "Google Analytics",
    purpose: "Used to throttle the request rate to Google Analytics.",
    duration: "1 minute",
    category: "Analytics",
  },
  // Marketing
  {
    name: "_fbp",
    provider: "Meta (Facebook)",
    purpose: "Used by Facebook to deliver advertisements or retargeting when you visit our site or other sites using Meta Pixel.",
    duration: "90 days",
    category: "Marketing",
  },
  {
    name: "_gcl_au",
    provider: "Google Ads",
    purpose: "Used by Google Ads to store and track conversions.",
    duration: "90 days",
    category: "Marketing",
  },
  {
    name: "li_fat_id",
    provider: "LinkedIn",
    purpose: "Used by LinkedIn Insight Tag to track conversions and retargeting.",
    duration: "30 days",
    category: "Marketing",
  },
  // Functional
  {
    name: "intercom-*",
    provider: "Intercom (if enabled)",
    purpose: "Supports live chat functionality and remembers your chat history.",
    duration: "9 months",
    category: "Functional",
  },
];

const CATEGORY_META = {
  Essential:   { color: "bg-green-100 text-green-800",  icon: <ShieldCheck  size={12} className="inline mr-1" /> },
  Analytics:   { color: "bg-blue-100 text-blue-800",    icon: <BarChart2    size={12} className="inline mr-1" /> },
  Marketing:   { color: "bg-orange-100 text-orange-800",icon: <Megaphone    size={12} className="inline mr-1" /> },
  Functional:  { color: "bg-purple-100 text-purple-800",icon: <Settings2    size={12} className="inline mr-1" /> },
};

// ─── Consent status banner ────────────────────────────────────────────────────

function ConsentStatusBanner() {
  const { consent, hasConsent, acceptAll, rejectAll, openModal, resetConsent } = useCookieConsent();

  if (!hasConsent) {
    return (
      <div className="mb-10 flex flex-col gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-amber-800">You have not set your cookie preferences yet.</p>
          <p className="mt-1 text-xs text-amber-700">Choose your preferences below or use the buttons to the right.</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            onClick={rejectAll}
            className="rounded-full border border-amber-400 bg-white px-5 py-2 text-xs font-bold text-amber-800 transition hover:bg-amber-100"
          >
            Reject All
          </button>
          <button
            onClick={openModal}
            className="rounded-full border border-[#0171c1]/30 bg-white px-5 py-2 text-xs font-bold text-[#0171c1] transition hover:bg-[#0171c1]/5"
          >
            Customize
          </button>
          <button
            onClick={acceptAll}
            className="rounded-full bg-[#0171c1] px-5 py-2 text-xs font-bold text-white transition hover:bg-[#001A3D]"
          >
            Accept All
          </button>
        </div>
      </div>
    );
  }

  const consentDate = consent?.consentDate
    ? new Date(consent.consentDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "—";

  return (
    <div className="mb-10 rounded-2xl border border-gray-200 bg-gray-50 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="mb-3 text-sm font-bold text-[#001A3D]">Your current cookie preferences</p>
          <div className="flex flex-wrap gap-2 text-xs">
            {(
              [
                { label: "Essential",  value: true                  },
                { label: "Analytics",  value: consent?.analytics   },
                { label: "Marketing",  value: consent?.marketing   },
                { label: "Functional", value: consent?.functional  },
              ] as { label: string; value: boolean | undefined }[]
            ).map(({ label, value }) => (
              <span
                key={label}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 font-semibold ${
                  value ? "bg-green-100 text-green-800" : "bg-red-50 text-red-700"
                }`}
              >
                {value ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                {label}
              </span>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-gray-400">Consent recorded: {consentDate}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <button
            onClick={openModal}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0171c1]/30 bg-white px-5 py-2.5 text-xs font-bold text-[#0171c1] transition hover:bg-[#0171c1]/5"
          >
            <Settings2 size={13} /> Manage Preferences
          </button>
          <button
            onClick={resetConsent}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-xs font-bold text-gray-600 transition hover:bg-gray-100"
            title="Reset consent — the banner will reappear"
          >
            <RefreshCw size={12} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Cookie table ─────────────────────────────────────────────────────────────

function CookieTable({ category }: { category: CookieEntry["category"] }) {
  const rows = COOKIE_TABLE.filter((c) => c.category === category);
  if (rows.length === 0) return null;
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="bg-gray-50 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
            <th className="px-4 py-3">Cookie Name</th>
            <th className="px-4 py-3">Provider</th>
            <th className="px-4 py-3 hidden md:table-cell">Purpose</th>
            <th className="px-4 py-3 whitespace-nowrap">Duration</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row) => (
            <tr key={row.name} className="bg-white hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 font-mono text-xs font-semibold text-[#001A3D]">{row.name}</td>
              <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{row.provider}</td>
              <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{row.purpose}</td>
              <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Category section ─────────────────────────────────────────────────────────

function CategorySection({
  title,
  category,
  description,
  alwaysEnabled,
}: {
  title: string;
  category: CookieEntry["category"];
  description: string;
  alwaysEnabled?: boolean;
}) {
  const meta = CATEGORY_META[category];
  return (
    <div className="mb-10">
      <div className="mb-3 flex items-center gap-3">
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${meta.color}`}>
          {meta.icon}
          {title}
          {alwaysEnabled && " — Always Enabled"}
        </span>
      </div>
      <p className="mb-2 text-sm leading-relaxed text-gray-600">{description}</p>
      <CookieTable category={category} />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CookiePolicy() {
  return (
    <div className="flex flex-col bg-white">
      <Meta
        title="Cookie Policy | Hutech Solutions"
        description="Learn how Hutech Solutions uses cookies and similar technologies, and manage your consent preferences."
      />
      <Breadcrumbs variant="light" />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#001A3D] py-20 text-white">
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
          <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <h1 className="display-font mb-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Cookie <span className="text-[#F99D1C]">Policy</span>
            </h1>
            <p className="text-base text-gray-300">
              Effective Date: <strong className="text-white">March 15, 2026</strong> &nbsp;·&nbsp;
              Last Updated: <strong className="text-white">July 2026</strong>
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-400">
              This policy explains what cookies are, which ones we use, why we use them, and how
              you can control them. You can update your preferences at any time using the button below.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="max-w-4xl">

            {/* Live consent status block */}
            <ConsentStatusBanner />

            {/* 1. What are cookies */}
            <div className="mb-10">
              <h2 className="mb-3 text-2xl font-bold text-[#001A3D]">1. What Are Cookies?</h2>
              <p className="text-sm leading-relaxed text-gray-600">
                Cookies are small text files placed on your device by websites you visit. They are
                widely used to make websites work efficiently, to provide information to site owners,
                and to personalise content and ads. Cookies can be <em>session cookies</em> (deleted
                when you close your browser) or <em>persistent cookies</em> (stored for a defined
                period or until you delete them).
              </p>
            </div>

            {/* 2. How we use cookies */}
            <div className="mb-10">
              <h2 className="mb-3 text-2xl font-bold text-[#001A3D]">2. How We Use Cookies</h2>
              <p className="text-sm leading-relaxed text-gray-600">
                Hutech Solutions uses cookies to operate the website correctly, to measure how
                visitors interact with our content (analytics), to serve relevant advertising
                (marketing), and to remember your preferences (functional). You are in control —
                you can accept or decline each category below.
              </p>
            </div>

            {/* 3. Cookie categories */}
            <div className="mb-10">
              <h2 className="mb-6 text-2xl font-bold text-[#001A3D]">3. Cookies We Use</h2>

              <CategorySection
                title="Essential Cookies"
                category="Essential"
                alwaysEnabled
                description="These cookies are strictly necessary for the website to function and cannot be disabled. They include cookies that store your consent choices, maintain security, and enable basic navigation. No personal data is collected by these cookies for advertising purposes."
              />

              <CategorySection
                title="Analytics Cookies"
                category="Analytics"
                description="These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. We use Google Analytics 4 to analyse traffic and improve our content. These cookies are only set if you have accepted the Analytics category."
              />

              <CategorySection
                title="Marketing Cookies"
                category="Marketing"
                description="Marketing cookies are used to track visitors across websites to display relevant and personalised advertisements. They are set by advertising partners including Google Ads, Meta (Facebook), and LinkedIn. These cookies are only active when you have accepted the Marketing category."
              />

              <CategorySection
                title="Functional Cookies"
                category="Functional"
                description="Functional cookies enable enhanced features such as live chat support and personalised content. Without these cookies, some features may not work correctly. These cookies are only set when you accept the Functional category."
              />
            </div>

            {/* 4. Consent & control */}
            <div className="mb-10">
              <h2 className="mb-3 text-2xl font-bold text-[#001A3D]">4. Managing Your Preferences</h2>
              <p className="text-sm leading-relaxed text-gray-600">
                You can update your cookie preferences at any time by using the{" "}
                <strong>Manage Preferences</strong> button above, or by clicking{" "}
                <strong>Cookie Preferences</strong> in the footer of any page. Your choices are
                stored for <strong>12 months</strong>. After that period, or if we update this policy
                (indicated by a version change), we will ask for your consent again.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                You may also control cookies through your browser settings. Please note that
                disabling all cookies through your browser may affect the functionality of this and
                many other websites. For guidance, visit{" "}
                <a
                  href="https://www.allaboutcookies.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#0171c1] hover:underline"
                >
                  allaboutcookies.org
                </a>
                .
              </p>
            </div>

            {/* 5. Google Consent Mode */}
            <div className="mb-10">
              <h2 className="mb-3 text-2xl font-bold text-[#001A3D]">5. Google Consent Mode</h2>
              <p className="text-sm leading-relaxed text-gray-600">
                We implement <strong>Google Consent Mode v2</strong>. When you visit the site,
                all Google services default to &quot;denied&quot; until you make a consent choice.
                When you accept Analytics or Marketing cookies, the relevant Google services are
                upgraded to &quot;granted&quot; in real time — meaning no data is sent to Google
                before you have consented.
              </p>
            </div>

            {/* 6. Third-party cookies */}
            <div className="mb-10">
              <h2 className="mb-3 text-2xl font-bold text-[#001A3D]">6. Third-Party Cookies</h2>
              <p className="text-sm leading-relaxed text-gray-600">
                Some cookies are placed by third-party services that appear on our pages. We do
                not control these cookies. Please refer to the relevant privacy policies:
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-gray-600">
                {[
                  { name: "Google Analytics / Ads", url: "https://policies.google.com/privacy" },
                  { name: "Meta (Facebook)", url: "https://www.facebook.com/policy/cookies/" },
                  { name: "LinkedIn", url: "https://www.linkedin.com/legal/cookie-policy" },
                ].map(({ name, url }) => (
                  <li key={name}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#0171c1] hover:underline"
                    >
                      {name} →
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 7. Your rights */}
            <div className="mb-10">
              <h2 className="mb-3 text-2xl font-bold text-[#001A3D]">7. Your Rights</h2>
              <p className="text-sm leading-relaxed text-gray-600">
                Depending on where you are located, you may have the following rights regarding
                your personal data:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-gray-600">
                <li><strong>GDPR (EU/UK):</strong> Right to access, correct, delete, and port your data. Right to object to processing.</li>
                <li><strong>CCPA (California):</strong> Right to know what personal data is collected and the right to opt out of the sale of personal data.</li>
                <li><strong>DPDP Act (India):</strong> Right to access and correct personal data processed by us.</li>
              </ul>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                To exercise any of these rights, please contact us at{" "}
                <a href="mailto:privacy@hutechsolutions.com" className="font-semibold text-[#0171c1] hover:underline">
                  privacy@hutechsolutions.com
                </a>
                .
              </p>
            </div>

            {/* 8. Changes to this policy */}
            <div className="mb-10">
              <h2 className="mb-3 text-2xl font-bold text-[#001A3D]">8. Changes to This Policy</h2>
              <p className="text-sm leading-relaxed text-gray-600">
                We may update this Cookie Policy from time to time to reflect changes in technology,
                legislation, or our data practices. When we do, we will update the &quot;Last
                Updated&quot; date above and, where required by law, ask for your consent again.
                We encourage you to review this page periodically.
              </p>
            </div>

            {/* 9. Contact */}
            <div className="mb-10 rounded-2xl bg-[#001A3D] p-8 text-white">
              <h2 className="mb-3 text-xl font-bold">9. Contact Us</h2>
              <p className="text-sm leading-relaxed text-gray-300">
                If you have any questions about this Cookie Policy or how we handle your data,
                please contact our Privacy team:
              </p>
              <div className="mt-4 space-y-1 text-sm">
                <p>
                  <span className="text-gray-400">Email:</span>{" "}
                  <a href="mailto:privacy@hutechsolutions.com" className="font-semibold text-[#0171c1] hover:underline">
                    privacy@hutechsolutions.com
                  </a>
                </p>
                <p>
                  <span className="text-gray-400">Address:</span>{" "}
                  <span className="text-gray-300">163, 1st Floor, 9th Main Rd, Sector 6, HSR Layout, Bengaluru, Karnataka 560102, India</span>
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/legal/privacy"
                  className="inline-flex items-center rounded-full border border-white/20 px-5 py-2 text-xs font-bold text-white transition hover:bg-white/10"
                >
                  Privacy Policy →
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full bg-[#0171c1] px-5 py-2 text-xs font-bold text-white transition hover:bg-[#0171c1]/80"
                >
                  Contact Us →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
