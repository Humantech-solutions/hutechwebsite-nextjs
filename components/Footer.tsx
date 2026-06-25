"use client";

import Link from "next/link";
import { 
  Facebook, Instagram, Youtube, Linkedin, 
  ChevronDown, Globe, Mail, Phone, ExternalLink,
  Clock, ShieldCheck
} from "lucide-react";
import Image from "next/image";
import nasscomMember from "../public/assets/nasscom_logo.png";
import nasscomSme from "../public/assets/nasscom_sme_logo.png";
import stpiLogo from "../public/assets/stpi_logo.png";
import cmmiLogo from "../public/assets/cmmi_logo.png";
import isoLogo from "../public/assets/iso_logo.png";
import LanguageSelector from "./LanguageSelector";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#000F1A] text-white pt-12 md:pt-20 border-t border-white/5 font-sans">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        
        {/* Top Navigation Grid (Image 1) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 pb-12 md:pb-20 border-b border-white/5 text-left">
          {/* Services */}
          <div className="space-y-4 md:space-y-6">
            <h4 className="text-lg font-bold tracking-tight text-white/90">Services</h4>
            <ul className="space-y-2.5 md:space-y-3">
              {[
                "AI/ML Solutions", "Cloud Transformation", "SRE & DevOps Services", "Data Engineering", 
                "Data Visualization and Reporting", "Banking & Financial Services", "Ecommerce Development", 
                "Enterprise Digital Solutions", "Development and Maintenance", "Consulting Service", 
                "AI Consulting & Prompt Engineering", "Cybersecurity", "IOT (Internet of Things)"
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-gray-400 hover:text-[#F99D1C] transition-colors">{item}</Link>
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
                  "Banking & Finance", "Healthcare & Life Sciences", "Utilities and Energy", 
                  "Logistics & Supply Chain", "Manufacturing", "Retail & Consumer"
                ].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-gray-400 hover:text-[#F99D1C] transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4 md:space-y-6">
              <h4 className="text-lg font-bold tracking-tight text-white/90">Resources</h4>
              <ul className="space-y-2.5 md:space-y-3">
                {[
                  "Blogs", "Case Studies", "In the News", "Events", "Hutech Documents"
                ].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-gray-400 hover:text-[#F99D1C] transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4 md:space-y-6">
            <h4 className="text-lg font-bold tracking-tight text-white/90">Company</h4>
            <ul className="space-y-2.5 md:space-y-3">
              {[
                "About Hutech", "Vision, Mission & Values", "Leadership Team", "Partnership", 
                "Life At Hutech Solutions", "In The News", "Press Release", 
                "Awards and Recognition", "Open Positions", "Graduates"
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-gray-400 hover:text-[#F99D1C] transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Case Studies */}
          <div className="space-y-4 md:space-y-6">
            <h4 className="text-lg font-bold tracking-tight text-white/90">Case Studies</h4>
            <ul className="space-y-2.5 md:space-y-3">
              {[
                "Transport Management Solutions", "Indoor Positioning System & Tracking", 
                "IoT-based Track & Trace Solutions", "Logistics And Courier Services", 
                "Reward and Recognition"
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-gray-400 hover:text-[#F99D1C] transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Info Grid (Image 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 py-12 md:py-20 border-b border-white/5">
          
          {/* Office Locations */}
          <div className="lg:col-span-4 space-y-8 text-left">
            <h4 className="text-lg font-bold tracking-tight mb-6 md:mb-8 text-white/90">Office Locations</h4>
            
            <div className="space-y-4">
              <h5 className="text-sm font-bold text-[#0171c1] tracking-wide uppercase">Bengaluru (Corporate Office)</h5>
              <div className="text-sm text-gray-400 leading-relaxed space-y-1">
                <p className="text-white/80">Humantech Solutions India Pvt. Ltd</p>
                <p>163, 1st Floor, 9th Main Rd,</p>
                <p>Sector 6, HSR Layout, Bengaluru,</p>
                <p>Karnataka 560102</p>
                <div className="pt-3 flex flex-col items-start gap-1.5">
                  <p className="flex items-center gap-2">
                    <span className="font-bold text-white/60 text-xs">Tel :</span> 
                    <a href="tel:+918867487771" className="hover:text-white transition-colors tracking-tight font-medium">(+91) 8867487771</a>
                  </p>
                  <a href="mailto:sales@hutechsolutions.com" className="text-[#0171c1] font-semibold hover:text-[#F99D1C] transition-colors">sales@hutechsolutions.com</a>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h5 className="text-sm font-bold text-[#0171c1] tracking-wide uppercase">USA:</h5>
              <div className="text-sm text-gray-400 leading-relaxed">
                <p>1205, SE 33rd Street, Bentonville,</p>
                <p>AR 72712</p>
                <p className="pt-2 font-bold text-white tracking-tight">+1 (479) 696 1146</p>
              </div>
            </div>

            {/* Language Selector */}
            <div className="pt-4">
              <LanguageSelector />
            </div>
          </div>

          {/* About Hutech */}
          <div className="lg:col-span-8 space-y-8 text-left">
            <h4 className="text-lg font-bold tracking-tight mb-6 md:mb-8 text-white/90">About Hutech</h4>
            <div className="space-y-6">
              <p className="text-[14px] text-gray-400 leading-relaxed max-w-4xl">
                Hutech Solutions enables Digital Transformation for enterprises and technology providers by delivering seamless customer experience, business efficiency and actionable insights through an integrated set of disruptive technologies: digital transformation, AI, Gen AI, ML, data analytics, Internet of Things, mobility, Cloud, security, unified communications, etc...
              </p>
              <Link href="/about" className="text-sm font-bold text-white hover:text-[#F99D1C] transition-all inline-flex items-center gap-2 group">
                Learn About Hutech
                <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
              
              {/* Trust Badges Asset */}
              <div className="pt-8 flex flex-wrap items-center justify-start gap-6 md:gap-8">
                <Image 
                  src={nasscomMember} 
                  alt="Nasscom Certified Member" 
                  className="h-8 md:h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
                <Image 
                  src={nasscomSme} 
                  alt="Nasscom SME Inspire 2025 Award Winner" 
                  className="h-8 md:h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
                <Image 
                  src={stpiLogo} 
                  alt="STPI" 
                  className="h-8 md:h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
                <Image 
                  src={cmmiLogo} 
                  alt="CMMI Level 3" 
                  className="h-8 md:h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
                <Image 
                  src={isoLogo} 
                  alt="ISO/IEC 9001:2015, 27001:2022" 
                  className="h-8 md:h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </div>

              {/* Social Media Icons */}
              <div className="pt-8 flex items-center justify-start gap-8">
                <a href="#" className="text-gray-500 hover:text-white transition-colors" aria-label="Facebook"><Facebook size={22} strokeWidth={1.5} /></a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors" aria-label="Instagram"><Instagram size={22} strokeWidth={1.5} /></a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors" aria-label="Youtube"><Youtube size={24} strokeWidth={1.5} /></a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors" aria-label="Linkedin"><Linkedin size={22} strokeWidth={1.5} /></a>
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
              onClick={() => localStorage.removeItem('hutech_cookies_accepted')}
              className="bg-[#0171c1] w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg shadow-[#0171c1]/20 cursor-pointer hover:scale-110 transition-transform flex-shrink-0 group"
              title="Cookie Preferences"
            >
              <ShieldCheck size={20} className="group-hover:rotate-12 transition-transform" />
            </div>
            
            <p className="text-center lg:text-left leading-relaxed">Copyright © 2019 - {currentYear}. Humantech Solutions India Pvt. Ltd. All rights reserved.</p>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-6 gap-y-3 lg:border-l lg:border-white/10 lg:pl-8 w-full">
              <Link href="/legal/terms" className="hover:text-white transition-colors border-b border-transparent hover:border-white/20 pb-0.5 whitespace-nowrap">Terms and Condition</Link>
              <Link href="/legal/privacy" className="hover:text-white transition-colors border-b border-transparent hover:border-white/20 pb-0.5 whitespace-nowrap">Privacy Policy</Link>
              <Link href="/legal/cookie-policy" className="hover:text-white transition-colors border-b border-transparent hover:border-white/20 pb-0.5 whitespace-nowrap">Cookie Policy</Link>
              <Link href="/legal/code-of-conduct" className="hover:text-white transition-colors border-b border-transparent hover:border-white/20 pb-0.5 whitespace-nowrap">Code of Conduct</Link>
              <Link href="/legal/sitemap" className="hover:text-white transition-colors border-b border-transparent hover:border-white/20 pb-0.5 whitespace-nowrap">Sitemap</Link>

            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
}


