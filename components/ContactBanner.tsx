"use client";

import { motion as Motion } from "motion/react";
import Link from "next/link";
import { 
  Facebook, Instagram, Linkedin, Youtube, Mail, 
  ArrowUpRight, Star
} from "lucide-react";

// Custom X (Twitter) Icon as lucide doesn't have the new X logo by default in all versions
const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export function ContactBanner() {
  return (
    <section className="bg-[#1E252D] text-white py-16 md:py-24 border-b border-white/5">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: CTA & Socials */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-semibold display-font leading-tight">
                Looking for <br /> expert advice?
              </h2>
              
              <Motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-4 bg-gradient-to-r from-[#FF512F] to-[#DD2476] px-8 py-4 rounded-full font-bold text-sm tracking-wide shadow-lg shadow-pink-500/20"
              >
                Schedule a Call
                <div className="bg-white rounded-full p-1 text-[#DD2476] group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight size={16} strokeWidth={3} />
                </div>
              </Motion.button>
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-8">
                <a href="#" className="text-white hover:text-[#0171c1] transition-colors"><Facebook size={22} /></a>
                <a href="#" className="text-white hover:text-[#0171c1] transition-colors"><XIcon size={20} /></a>
                <a href="#" className="text-white hover:text-[#0171c1] transition-colors"><Instagram size={22} /></a>
                <a href="#" className="text-white hover:text-[#0171c1] transition-colors"><Linkedin size={22} /></a>
                <a href="#" className="text-white hover:text-[#0171c1] transition-colors"><Youtube size={24} /></a>
              </div>
              
              <a href="mailto:connect@hutechsolutions.com" className="flex items-center gap-3 text-sm font-medium text-gray-300 hover:text-white transition-colors group">
                <Mail size={16} className="text-[#DD2476]" />
                <span className="border-b border-transparent group-hover:border-white transition-all">connect@hutechsolutions.com</span>
              </a>
            </div>
          </div>

          {/* Right Column: Addresses & Badges */}
          <div className="lg:col-span-7 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* India Office */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">India Office</h3>
                  <span className="text-xl">🇮🇳</span>
                </div>
                <p className="text-[15px] text-gray-300 leading-relaxed font-medium">
                  #42, Electronic City Phase 1,<br />
                  Bangalore, KA 560100,<br />
                  India
                </p>
              </div>

              {/* USA Office */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">United States Office</h3>
                  <span className="text-xl">🇺🇸</span>
                </div>
                <p className="text-[15px] text-gray-300 leading-relaxed font-medium">
                  2880 Zanker Road, Suite 203,<br />
                  San Jose, CA 95134,<br />
                  United States
                </p>
              </div>
            </div>

            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 pt-6">
              {/* Salesforce AppExchange */}
              <div className="bg-white rounded-lg px-4 py-2 flex items-center gap-3 shadow-xl">
                <div className="bg-[#00A1E0] p-1 rounded-sm">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" alt="SF" className="w-8" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 font-bold leading-none">appexchange</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[10px] font-black text-gray-800">5.0</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} size={8} fill="#F99D1C" className="text-[#F99D1C]" />)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Crest Partner */}
              <div className="bg-white rounded-lg px-4 py-2 flex items-center gap-3 shadow-xl">
                <div className="bg-[#001A3D] p-1 rounded-sm">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" alt="SF" className="w-8 brightness-0 invert" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-800 font-black leading-none">Crest</span>
                  <span className="text-[9px] text-gray-500 font-bold">Partner</span>
                </div>
              </div>

              {/* AWS */}
              <div className="bg-white rounded-lg px-4 py-2 flex items-center gap-3 shadow-xl">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="w-10" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-800 font-black leading-none uppercase">Partner</span>
                  <span className="text-[9px] text-gray-500 font-bold">Network</span>
                </div>
              </div>

              {/* ISO */}
              <div className="bg-[#D92D20] text-white rounded-lg px-5 py-2 flex flex-col items-center justify-center shadow-xl">
                <span className="text-[12px] font-black leading-none">ISO27001</span>
                <span className="text-[8px] font-bold tracking-[0.2em] mt-0.5 opacity-80 uppercase">Certified</span>
              </div>
            </div>

            {/* Clutch Review */}
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full py-2 px-6 w-fit hover:bg-white/10 transition-colors cursor-default">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black font-black text-sm">C</div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-black">5.0</span>
                  <Star size={10} fill="#F99D1C" className="text-[#F99D1C]" />
                </div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Based on 17 clutch reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
