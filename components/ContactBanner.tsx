import { motion as Motion } from "framer-motion";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube, Mail, ArrowUpRight, Star } from "lucide-react";

// Custom X (Twitter) Icon as lucide doesn't have the new X logo by default in all versions
const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export function ContactBanner() {
  return (
    <section className="border-b border-white/5 bg-[#1E252D] py-16 text-white md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-20">
          {/* Left Column: CTA & Socials */}
          <div className="space-y-10 lg:col-span-5">
            <div className="space-y-6">
              <h2 className="display-font text-4xl leading-tight font-semibold md:text-5xl">
                Looking for <br /> expert advice?
              </h2>

              <Motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-4 rounded-full bg-gradient-to-r from-[#FF512F] to-[#DD2476] px-8 py-4 text-sm font-bold tracking-wide shadow-lg shadow-pink-500/20"
              >
                Schedule a Call
                <div className="rounded-full bg-white p-1 text-[#DD2476] transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={16} strokeWidth={3} />
                </div>
              </Motion.button>
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-8">
                <a href="#" className="text-white transition-colors hover:text-[#0171c1]">
                  <Facebook size={22} />
                </a>
                <a href="#" className="text-white transition-colors hover:text-[#0171c1]">
                  <XIcon size={20} />
                </a>
                <a href="#" className="text-white transition-colors hover:text-[#0171c1]">
                  <Instagram size={22} />
                </a>
                <a href="#" className="text-white transition-colors hover:text-[#0171c1]">
                  <Linkedin size={22} />
                </a>
                <a href="#" className="text-white transition-colors hover:text-[#0171c1]">
                  <Youtube size={24} />
                </a>
              </div>

              <a
                href="mailto:connect@hutechsolutions.com"
                className="group flex items-center gap-3 text-sm font-medium text-gray-300 transition-colors hover:text-white"
              >
                <Mail size={16} className="text-[#DD2476]" />
                <span className="border-b border-transparent transition-all group-hover:border-white">
                  connect@hutechsolutions.com
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Addresses & Badges */}
          <div className="space-y-12 lg:col-span-7">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              {/* India Office */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase">
                    India Office
                  </h3>
                  <span className="text-xl">🇮🇳</span>
                </div>
                <p className="text-[15px] leading-relaxed font-medium text-gray-300">
                  #42, Electronic City Phase 1,
                  <br />
                  Bangalore, KA 560100,
                  <br />
                  India
                </p>
              </div>

              {/* USA Office */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase">
                    United States Office
                  </h3>
                  <span className="text-xl">🇺🇸</span>
                </div>
                <p className="text-[15px] leading-relaxed font-medium text-gray-300">
                  2880 Zanker Road, Suite 203,
                  <br />
                  San Jose, CA 95134,
                  <br />
                  United States
                </p>
              </div>
            </div>

            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-4 pt-6 md:gap-6">
              {/* Salesforce AppExchange */}
              <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-2 shadow-xl">
                <div className="rounded-sm bg-[#00A1E0] p-1">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg"
                    alt="SF"
                    className="w-8"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] leading-none font-bold text-gray-500">
                    appexchange
                  </span>
                  <div className="mt-0.5 flex items-center gap-1">
                    <span className="text-[10px] font-black text-gray-800">5.0</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={8} fill="#FFAF2B" className="text-[#FFAF2B]" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Crest Partner */}
              <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-2 shadow-xl">
                <div className="rounded-sm bg-[#001A3D] p-1">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg"
                    alt="SF"
                    className="w-8 brightness-0 invert"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] leading-none font-black text-gray-800">Crest</span>
                  <span className="text-[9px] font-bold text-gray-500">Partner</span>
                </div>
              </div>

              {/* AWS */}
              <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-2 shadow-xl">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
                  alt="AWS"
                  className="w-10"
                />
                <div className="flex flex-col">
                  <span className="text-[10px] leading-none font-black text-gray-800 uppercase">
                    Partner
                  </span>
                  <span className="text-[9px] font-bold text-gray-500">Network</span>
                </div>
              </div>

              {/* ISO */}
              <div className="flex flex-col items-center justify-center rounded-lg bg-[#D92D20] px-5 py-2 text-white shadow-xl">
                <span className="text-[12px] leading-none font-black">ISO27001</span>
                <span className="mt-0.5 text-[8px] font-bold tracking-[0.2em] uppercase opacity-80">
                  Certified
                </span>
              </div>
            </div>

            {/* Clutch Review */}
            <div className="flex w-fit cursor-default items-center gap-4 rounded-full border border-white/10 bg-white/5 px-6 py-2 transition-colors hover:bg-white/10">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-black text-black">
                C
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-black">5.0</span>
                  <Star size={10} fill="#FFAF2B" className="text-[#FFAF2B]" />
                </div>
                <span className="text-[10px] font-bold tracking-wide text-gray-400 uppercase">
                  Based on 17 clutch reviews
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
