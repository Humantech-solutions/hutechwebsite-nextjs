"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import nasscomMember from "../public/assets/nasscom_logo.png";
import nasscomSme from "../public/assets/nasscom_sme_logo.png";
import stpiLogo from "../public/assets/stpi_logo.png";
import cmmiLogo from "../public/assets/cmmi_logo.png";
import isoLogo from "../public/assets/iso_logo.png";
import LanguageSelector from "./LanguageSelector";
import type { FooterChromeData } from "@/lib/wordpress";

type FooterLink = { name: string; path: string };
type TrustBadge = { src: string; alt: string; href?: string };

const DEFAULT_FOOTER_MENUS = {
  services: [
    { name: "AI/ML Solutions", path: "#" },
    { name: "Cloud Transformation", path: "#" },
    { name: "SRE & DevOps Services", path: "#" },
    { name: "Data Engineering", path: "#" },
    { name: "Data Visualization and Reporting", path: "#" },
    { name: "Banking & Financial Services", path: "#" },
    { name: "Ecommerce Development", path: "#" },
    { name: "Enterprise Digital Solutions", path: "#" },
    { name: "Development and Maintenance", path: "#" },
    { name: "Consulting Service", path: "#" },
    { name: "AI Consulting & Prompt Engineering", path: "#" },
    { name: "Cybersecurity", path: "#" },
    { name: "IOT (Internet of Things)", path: "#" },
  ],
  industries: [
    { name: "Banking & Finance", path: "#" },
    { name: "Healthcare & Life Sciences", path: "#" },
    { name: "Utilities and Energy", path: "#" },
    { name: "Logistics & Supply Chain", path: "#" },
    { name: "Manufacturing", path: "#" },
    { name: "Retail & Consumer", path: "#" },
  ],
  resources: [
    { name: "Blogs", path: "#" },
    { name: "Case Studies", path: "#" },
    { name: "In the News", path: "#" },
    { name: "Events", path: "#" },
    { name: "Hutech Documents", path: "#" },
  ],
  company: [
    { name: "About Hutech", path: "#" },
    { name: "Vision, Mission & Values", path: "#" },
    { name: "Leadership Team", path: "#" },
    { name: "Partnership", path: "#" },
    { name: "Life At Hutech Solutions", path: "#" },
    { name: "In The News", path: "#" },
    { name: "Press Release", path: "#" },
    { name: "Awards and Recognition", path: "#" },
    { name: "Open Positions", path: "#" },
    { name: "Graduates", path: "#" },
  ],
  caseStudies: [
    { name: "Transport Management Solutions", path: "#" },
    { name: "Indoor Positioning System & Tracking", path: "#" },
    { name: "IoT-based Track & Trace Solutions", path: "#" },
    { name: "Logistics And Courier Services", path: "#" },
    { name: "Reward and Recognition", path: "#" },
  ],
  legal: [
    { name: "Terms and Condition", path: "/legal/terms" },
    { name: "Privacy Policy", path: "/legal/privacy" },
    { name: "Cookie Policy", path: "/legal/cookie-policy" },
    { name: "Code of Conduct", path: "/legal/code-of-conduct" },
    { name: "Sitemap", path: "/legal/sitemap" },
  ],
};

const DEFAULT_TITLES = {
  services: "Services",
  industries: "Industries",
  resources: "Resources",
  company: "Company",
  caseStudies: "Case Studies",
  locations: "Office Locations",
  about: "About Hutech",
};

const DEFAULT_OFFICES = [
  {
    title: "Bengaluru (Corporate Office)",
    company: "Humantech Solutions India Pvt. Ltd",
    address: [
      "163, 1st Floor, 9th Main Rd,",
      "Sector 6, HSR Layout, Bengaluru,",
      "Karnataka 560102",
    ],
    phone: "(+91) 8867487771",
    phoneUrl: "+918867487771",
    email: "sales@hutechsolutions.com",
    mapUrl: "",
  },
  {
    title: "USA:",
    address: ["1205, SE 33rd Street, Bentonville,", "AR 72712"],
    phone: "+1 (479) 696 1146",
    mapUrl: "",
  },
];

const DEFAULT_BADGES: TrustBadge[] = [
  { src: nasscomMember.src, alt: "Nasscom Certified Member" },
  { src: nasscomSme.src, alt: "Nasscom SME Inspire 2025 Award Winner" },
  { src: stpiLogo.src, alt: "STPI" },
  { src: cmmiLogo.src, alt: "CMMI Level 3" },
  { src: isoLogo.src, alt: "ISO/IEC 9001:2015, 27001:2022" },
];

function hasLinks(links?: FooterLink[]) {
  return Array.isArray(links) && links.length > 0;
}

function FooterList({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div className="space-y-4 md:space-y-6">
      <h4 className="text-lg font-bold tracking-tight text-white/90">{title}</h4>
      <ul className="space-y-2.5 md:space-y-3">
        {links.map((item) => (
          <li key={`${item.name}-${item.path}`}>
            <Link
              href={item.path || "#"}
              className="text-sm text-gray-400 hover:text-[#F99D1C] transition-colors"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer({ data }: { data?: FooterChromeData }) {
  const currentYear = new Date().getFullYear();
  const titles = { ...DEFAULT_TITLES, ...data?.titles };
  const menus = {
    services: hasLinks(data?.menus?.services)
      ? data!.menus!.services!
      : DEFAULT_FOOTER_MENUS.services,
    industries: hasLinks(data?.menus?.industries)
      ? data!.menus!.industries!
      : DEFAULT_FOOTER_MENUS.industries,
    resources: hasLinks(data?.menus?.resources)
      ? data!.menus!.resources!
      : DEFAULT_FOOTER_MENUS.resources,
    company: hasLinks(data?.menus?.company)
      ? data!.menus!.company!
      : DEFAULT_FOOTER_MENUS.company,
    caseStudies: hasLinks(data?.menus?.caseStudies)
      ? data!.menus!.caseStudies!
      : DEFAULT_FOOTER_MENUS.caseStudies,
    legal: hasLinks(data?.menus?.legal) ? data!.menus!.legal! : DEFAULT_FOOTER_MENUS.legal,
  };
  const offices = data?.offices?.length ? data.offices : DEFAULT_OFFICES;
  const about = {
    text:
      data?.about?.text ||
      "Hutech Solutions enables Digital Transformation for enterprises and technology providers by delivering seamless customer experience, business efficiency and actionable insights through an integrated set of disruptive technologies: digital transformation, AI, Gen AI, ML, data analytics, Internet of Things, mobility, Cloud, security, unified communications, etc...",
    linkText: data?.about?.linkText || "Learn About Hutech",
    linkUrl: data?.about?.linkUrl || "/about",
  };
  const badges = data?.badges?.length ? data.badges : DEFAULT_BADGES;
  const socials = {
    facebook: data?.socials?.facebook || "#",
    instagram: data?.socials?.instagram || "#",
    youtube: data?.socials?.youtube || "#",
    linkedin: data?.socials?.linkedin || "#",
  };
  const socialIcons = {
    facebook: data?.socialIcons?.facebook || "",
    instagram: data?.socialIcons?.instagram || "",
    youtube: data?.socialIcons?.youtube || "",
    linkedin: data?.socialIcons?.linkedin || "",
  };
  const copyright = (
    data?.copyright ||
    "Copyright © 2019 - {year}. Humantech Solutions India Pvt. Ltd. All rights reserved."
  ).replace("{year}", String(currentYear));

  return (
    <footer className="bg-[#000F1A] text-white pt-12 md:pt-20 border-t border-white/5 font-sans">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Top Navigation Grid (Image 1) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 pb-12 md:pb-20 border-b border-white/5 text-left">
          <FooterList title={titles.services} links={menus.services} />

          <div className="space-y-10 md:space-y-12">
            <FooterList title={titles.industries} links={menus.industries} />
            <FooterList title={titles.resources} links={menus.resources} />
          </div>

          <FooterList title={titles.company} links={menus.company} />
          <FooterList title={titles.caseStudies} links={menus.caseStudies} />
        </div>

        {/* Bottom Info Grid (Image 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 py-12 md:py-20 border-b border-white/5">
          {/* Office Locations */}
          <div className="lg:col-span-4 space-y-8 text-left">
            <h4 className="text-lg font-bold tracking-tight mb-6 md:mb-8 text-white/90">
              {titles.locations}
            </h4>

            {offices.map((office, index) => (
              <div
                key={`${office.title || "office"}-${index}`}
                className={index === 0 ? "space-y-4" : "space-y-4 pt-2"}
              >
                {office.title && (
                  <h5 className="text-sm font-bold text-[#0171c1] tracking-wide uppercase">
                    {office.title}
                  </h5>
                )}
                <div className="text-sm text-gray-400 leading-relaxed space-y-1">
                  {office.mapUrl ? (
                    <a
                      href={office.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block cursor-pointer hover:text-white transition-colors"
                      title="Open in Google Maps"
                    >
                      {office.company && (
                        <p className="text-white/80">{office.company}</p>
                      )}
                      {office.address?.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </a>
                  ) : (
                    <>
                      {office.company && <p className="text-white/80">{office.company}</p>}
                      {office.address?.map((line) => <p key={line}>{line}</p>)}
                    </>
                  )}
                  {(office.phone || office.email) && (
                    <div className="pt-3 flex flex-col items-start gap-1.5">
                      {office.phone && (
                        <p className="flex items-center gap-2">
                          <span className="font-bold text-white/60 text-xs">Tel :</span>
                          <a
                            href={`tel:${office.phoneUrl || office.phone}`}
                            className="hover:text-white transition-colors tracking-tight font-medium"
                          >
                            {office.phone}
                          </a>
                        </p>
                      )}
                      {office.email && (
                        <a
                          href={`mailto:${office.email}`}
                          className="text-[#0171c1] font-semibold hover:text-[#F99D1C] transition-colors"
                        >
                          {office.email}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Language Selector */}
            <div className="pt-4">
              <LanguageSelector />
            </div>
          </div>

          {/* About Hutech */}
          <div className="lg:col-span-8 space-y-8 text-left">
            <h4 className="text-lg font-bold tracking-tight mb-6 md:mb-8 text-white/90">
              {titles.about}
            </h4>
            <div className="space-y-6">
              <p className="text-[14px] text-gray-400 leading-relaxed max-w-4xl">{about.text}</p>
              <Link
                href={about.linkUrl}
                className="text-sm font-bold text-white hover:text-[#F99D1C] transition-all inline-flex items-center gap-2 group"
              >
                {about.linkText}
                <ExternalLink
                  size={14}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </Link>

              {/* Trust Badges Asset */}
              <div className="pt-8 flex flex-wrap items-center justify-start gap-6 md:gap-8">
                {badges.map((badge) => {
                  const image = (
                    <img
                      src={badge.src}
                      alt={badge.alt}
                      className="h-8 md:h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                  );

                  return badge.href ? (
                    <a
                      key={`${badge.alt}-${badge.src}`}
                      href={badge.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {image}
                    </a>
                  ) : (
                    <span key={`${badge.alt}-${badge.src}`}>{image}</span>
                  );
                })}
              </div>

              {/* Social Media Icons */}
              <div className="pt-8 flex items-center justify-start gap-8">
                <a
                  href={socials.facebook}
                  className="text-gray-500 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  {socialIcons.facebook ? (
                    <img
                      src={socialIcons.facebook}
                      alt="Facebook"
                      className="h-[22px] w-[22px] object-contain opacity-70 transition-opacity hover:opacity-100"
                      loading="lazy"
                    />
                  ) : (
                    <Facebook size={22} strokeWidth={1.5} />
                  )}
                </a>
                <a
                  href={socials.instagram}
                  className="text-gray-500 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  {socialIcons.instagram ? (
                    <img
                      src={socialIcons.instagram}
                      alt="Instagram"
                      className="h-[22px] w-[22px] object-contain opacity-70 transition-opacity hover:opacity-100"
                      loading="lazy"
                    />
                  ) : (
                    <Instagram size={22} strokeWidth={1.5} />
                  )}
                </a>
                <a
                  href={socials.youtube}
                  className="text-gray-500 hover:text-white transition-colors"
                  aria-label="Youtube"
                >
                  {socialIcons.youtube ? (
                    <img
                      src={socialIcons.youtube}
                      alt="Youtube"
                      className="h-6 w-6 object-contain opacity-70 transition-opacity hover:opacity-100"
                      loading="lazy"
                    />
                  ) : (
                    <Youtube size={24} strokeWidth={1.5} />
                  )}
                </a>
                <a
                  href={socials.linkedin}
                  className="text-gray-500 hover:text-white transition-colors"
                  aria-label="Linkedin"
                >
                  {socialIcons.linkedin ? (
                    <img
                      src={socialIcons.linkedin}
                      alt="Linkedin"
                      className="h-[22px] w-[22px] object-contain opacity-70 transition-opacity hover:opacity-100"
                      loading="lazy"
                    />
                  ) : (
                    <Linkedin size={22} strokeWidth={1.5} />
                  )}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#00080F] py-8 md:py-10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8 text-[12px] md:text-[13px] text-gray-500 w-full">
            {/* Preferences Icon */}
            <div
              onClick={() => localStorage.removeItem("hutech_cookies_accepted")}
              className="bg-[#0171c1] w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg shadow-[#0171c1]/20 cursor-pointer hover:scale-110 transition-transform flex-shrink-0 group"
              title="Cookie Preferences"
            >
              <ShieldCheck size={20} className="group-hover:rotate-12 transition-transform" />
            </div>

            <p className="text-center lg:text-left leading-relaxed">{copyright}</p>

            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-6 gap-y-3 lg:border-l lg:border-white/10 lg:pl-8 w-full">
              {menus.legal.map((link) => (
                <Link
                  key={`${link.name}-${link.path}`}
                  href={link.path || "#"}
                  className="hover:text-white transition-colors border-b border-transparent hover:border-white/20 pb-0.5 whitespace-nowrap"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
