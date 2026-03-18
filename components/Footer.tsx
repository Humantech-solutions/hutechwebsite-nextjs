"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  ChevronDown,
  Globe,
  Mail,
  Phone,
  ExternalLink,
  Clock,
  ShieldCheck,
} from "lucide-react";
const nasscomMember = "/assets/d09f19950f17c8d179450f95cc1d4d9935e505f6.png";
const nasscomSme = "/assets/746d50ef326d79a3733bce8b50a37642f65cac8c.png";
const stpiLogo = "/assets/142b057b4dcb543e514a2801279658758494f508.png";
const cmmiLogo = "/assets/80df4d3bd2c2c1467b186c739b96354bddc98418.png";
const isoLogo = "/assets/abc397f38e710e93fbad0d0436afadef6f31331c.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#000F1A] pt-12 font-sans text-white md:pt-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Top Navigation Grid (Image 1) */}
        <div className="grid grid-cols-1 gap-10 border-b border-white/5 pb-12 text-center sm:grid-cols-2 sm:text-left md:gap-12 md:pb-20 lg:grid-cols-4">
          {/* Services */}
          <div className="space-y-4 md:space-y-6">
            <h4 className="text-lg font-bold tracking-tight text-white/90">Services</h4>
            <ul className="space-y-2.5 md:space-y-3">
              {[
                "AI/ML Solutions",
                "Cloud Transformation",
                "SRE & DevOps Services",
                "Data Engineering",
                "Data Visualization and Reporting",
                "Banking & Financial Services",
                "Ecommerce Development",
                "Enterprise Digital Solutions",
                "Development and Maintenance",
                "Consulting Service",
                "AI Consulting & Prompt Engineering",
                "Cybersecurity",
                "IOT (Internet of Things)",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-gray-400 transition-colors hover:text-[#FFAF2B]"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries & Resources */}
          <div className="space-y-10 md:space-y-12">
            <div className="space-y-4 md:space-y-6">
              <h4 className="text-lg font-bold tracking-tight text-white/90">Industries</h4>
              <ul className="space-y-2.5 md:space-y-3">
                {[
                  "Banking & Finance",
                  "Healthcare & Life Sciences",
                  "Utilities and Energy",
                  "Logistics & Supply Chain",
                  "Manufacturing",
                  "Retail & Consumer",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-gray-400 transition-colors hover:text-[#FFAF2B]"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 md:space-y-6">
              <h4 className="text-lg font-bold tracking-tight text-white/90">Resources</h4>
              <ul className="space-y-2.5 md:space-y-3">
                {["Blogs", "Case Studies", "In the News", "Events", "Hutech Documents"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-sm text-gray-400 transition-colors hover:text-[#FFAF2B]"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4 md:space-y-6">
            <h4 className="text-lg font-bold tracking-tight text-white/90">Company</h4>
            <ul className="space-y-2.5 md:space-y-3">
              {[
                "About Hutech",
                "Vision, Mission & Values",
                "Leadership Team",
                "Partnership",
                "Life At Hutech Solutions",
                "In The News",
                "Press Release",
                "Awards and Recognition",
                "Open Positions",
                "Graduates",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-gray-400 transition-colors hover:text-[#FFAF2B]"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Case Studies */}
          <div className="space-y-4 md:space-y-6">
            <h4 className="text-lg font-bold tracking-tight text-white/90">Case Studies</h4>
            <ul className="space-y-2.5 md:space-y-3">
              {[
                "Transport Management Solutions",
                "Indoor Positioning System & Tracking",
                "IoT-based Track & Trace Solutions",
                "Logistics And Courier Services",
                "Reward and Recognition",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-gray-400 transition-colors hover:text-[#FFAF2B]"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Info Grid (Image 2) */}
        <div className="grid grid-cols-1 gap-10 border-b border-white/5 py-12 md:gap-12 md:py-20 lg:grid-cols-12">
          {/* Office Locations */}
          <div className="space-y-8 text-center sm:text-left lg:col-span-4">
            <h4 className="mb-6 text-lg font-bold tracking-tight text-white/90 md:mb-8">
              Office Locations
            </h4>

            <div className="space-y-4">
              <h5 className="text-sm font-bold tracking-wide text-[#0171c1] uppercase">
                Bengaluru (Corporate Office)
              </h5>
              <div className="space-y-1 text-sm leading-relaxed text-gray-400">
                <p className="text-white/80">Humantech Solutions India Pvt. Ltd</p>
                <p>163, 1st Floor, 9th Main Rd,</p>
                <p>Sector 6, HSR Layout, Bengaluru,</p>
                <p>Karnataka 560102</p>
                <div className="flex flex-col items-center gap-1.5 pt-3 sm:items-start">
                  <p className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white/60">Tel :</span>
                    <a
                      href="tel:+918867487771"
                      className="font-medium tracking-tight transition-colors hover:text-white"
                    >
                      (+91) 8867487771
                    </a>
                  </p>
                  <a
                    href="mailto:sales@hutechsolutions.com"
                    className="font-semibold text-[#0171c1] transition-colors hover:text-[#FFAF2B]"
                  >
                    sales@hutechsolutions.com
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h5 className="text-sm font-bold tracking-wide text-[#0171c1] uppercase">USA:</h5>
              <div className="text-sm leading-relaxed text-gray-400">
                <p>1205, SE 33rd Street, Bentonville,</p>
                <p>AR 72712</p>
                <p className="pt-2 font-bold tracking-tight text-white">+1 (479) 696 1146</p>
              </div>
            </div>

            {/* Language Selector */}
            <div className="flex justify-center pt-4 sm:justify-start">
              <div className="inline-flex cursor-pointer items-center gap-3 rounded-sm bg-white px-4 py-2 text-[12px] font-bold text-black transition-colors hover:bg-gray-100">
                <img
                  src="https://flagcdn.com/us.svg"
                  alt="USA Flag"
                  className="h-3.5 w-5 object-cover"
                />
                <span>ENGLISH</span>
                <ChevronDown size={14} strokeWidth={3} />
              </div>
            </div>
          </div>

          {/* About Hutech */}
          <div className="space-y-8 text-center sm:text-left lg:col-span-8">
            <h4 className="mb-6 text-lg font-bold tracking-tight text-white/90 md:mb-8">
              About Hutech
            </h4>
            <div className="space-y-6">
              <p className="mx-auto max-w-4xl text-[14px] leading-relaxed text-gray-400 sm:mx-0">
                Hutech Solutions enables Digital Transformation for enterprises and technology
                providers by delivering seamless customer experience, business efficiency and
                actionable insights through an integrated set of disruptive technologies: digital
                transformation, AI, Gen AI, ML, data analytics, Internet of Things, mobility, Cloud,
                security, unified communications, etc...
              </p>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-sm font-bold text-white transition-all hover:text-[#FFAF2B]"
              >
                Learn About Hutech
                <ExternalLink
                  size={14}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>

              {/* Trust Badges Asset */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-8 sm:justify-start md:gap-8">
                <img
                  src={nasscomMember}
                  alt="Nasscom Certified Member"
                  className="h-8 w-auto object-contain opacity-70 transition-opacity hover:opacity-100 md:h-10"
                  loading="lazy"
                />
                <img
                  src={nasscomSme}
                  alt="Nasscom SME Inspire 2025 Award Winner"
                  className="h-12 w-auto object-contain opacity-70 transition-opacity hover:opacity-100 md:h-16"
                  loading="lazy"
                />
                <img
                  src={stpiLogo}
                  alt="STPI"
                  className="h-8 w-auto object-contain opacity-70 transition-opacity hover:opacity-100 md:h-10"
                  loading="lazy"
                />
                <img
                  src={cmmiLogo}
                  alt="CMMI Level 3"
                  className="h-10 w-auto object-contain opacity-70 transition-opacity hover:opacity-100 md:h-12"
                  loading="lazy"
                />
                <img
                  src={isoLogo}
                  alt="ISO/IEC 9001:2015, 27001:2022"
                  className="h-8 w-auto object-contain opacity-70 transition-opacity hover:opacity-100 md:h-10"
                  loading="lazy"
                />
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center justify-center gap-8 pt-8 sm:justify-start">
                <a
                  href="#"
                  className="text-gray-500 transition-colors hover:text-white"
                  aria-label="Facebook"
                >
                  <Facebook size={22} strokeWidth={1.5} />
                </a>
                <a
                  href="#"
                  className="text-gray-500 transition-colors hover:text-white"
                  aria-label="Instagram"
                >
                  <Instagram size={22} strokeWidth={1.5} />
                </a>
                <a
                  href="#"
                  className="text-gray-500 transition-colors hover:text-white"
                  aria-label="Youtube"
                >
                  <Youtube size={24} strokeWidth={1.5} />
                </a>
                <a
                  href="#"
                  className="text-gray-500 transition-colors hover:text-white"
                  aria-label="Linkedin"
                >
                  <Linkedin size={22} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#00080F] py-8 md:py-10">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-8 px-6 lg:flex-row lg:px-12">
          <div className="flex w-full flex-col items-center gap-6 text-[12px] text-gray-500 md:gap-8 md:text-[13px] lg:flex-row">
            {/* Preferences Icon */}
            <div
              onClick={() => localStorage.removeItem("hutech_cookies_accepted")}
              className="group flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#0171c1] text-white shadow-lg shadow-[#0171c1]/20 transition-transform hover:scale-110"
              title="Cookie Preferences"
            >
              <ShieldCheck size={20} className="transition-transform group-hover:rotate-12" />
            </div>

            <p className="text-center leading-relaxed lg:text-left">
              Copyright © 2019 - {currentYear}. Humantech Solutions India Pvt. Ltd. All rights
              reserved.
            </p>

            <div className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-end lg:border-l lg:border-white/10 lg:pl-8">
              <Link
                href="/legal/terms"
                className="border-b border-transparent pb-0.5 whitespace-nowrap transition-colors hover:border-white/20 hover:text-white"
              >
                Terms and Condition
              </Link>
              <Link
                href="/legal/privacy"
                className="border-b border-transparent pb-0.5 whitespace-nowrap transition-colors hover:border-white/20 hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                href="/legal/cookie-policy"
                className="border-b border-transparent pb-0.5 whitespace-nowrap transition-colors hover:border-white/20 hover:text-white"
              >
                Cookie Policy
              </Link>
              <Link
                href="/legal/code-of-conduct"
                className="border-b border-transparent pb-0.5 whitespace-nowrap transition-colors hover:border-white/20 hover:text-white"
              >
                Code of Conduct
              </Link>
              <Link
                href="/legal/sitemap"
                className="border-b border-transparent pb-0.5 whitespace-nowrap transition-colors hover:border-white/20 hover:text-white"
              >
                Sitemap
              </Link>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group flex cursor-pointer items-center gap-2 border-b border-transparent pb-0.5 text-[10px] font-bold tracking-widest whitespace-nowrap uppercase transition-colors hover:border-[#FFAF2B]/20 hover:text-[#FFAF2B]"
              >
                BACK TO TOP
                <ArrowUp size={12} className="transition-transform group-hover:-translate-y-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const ArrowUp = ({ size, className }: { size: number; className: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m18 15-6-6-6 6" />
  </svg>
);
