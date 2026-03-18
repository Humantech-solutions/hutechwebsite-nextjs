"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Globe, Menu, X, ChevronDown, MoveRight } from "lucide-react";
import { motion as Motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
const logoImg = "/assets/c57ecabe59306129194824425137d2ccde6918ce.png";

const NAV_ITEMS = [
  {
    label: "Company",
    path: "/about",
    dropdown: [
      {
        title: "Who We Are",
        items: [
          { name: "About Hutech", path: "/about" },
          { name: "Vision, Mission & Values", path: "/company/vision-mission-values" },
          { name: "Leadership Team", path: "/company/leadership" },
          { name: "Partnership", path: "/company/partnership" },
          { name: "Life At Hutech Solutions", path: "/company/life-at-hutech" },
        ],
      },
      {
        title: "Newsroom",
        items: [
          { name: "In The News", path: "/company/news" },
          { name: "Press Release", path: "/company/press-release" },
          { name: "Awards and Recognition", path: "/company/awards" },
        ],
      },
      {
        title: "Careers",
        items: [
          { name: "Life At Hutech", path: "/company/life-at-hutech" },
          { name: "Open Positions", path: "/company/open-positions" },
          { name: "Graduates", path: "/company/graduates" },
        ],
      },
    ],
  },
  {
    label: "Services",
    path: "/services",
    dropdown: [
      {
        title: "Cloud, Data and AI",
        items: [
          { name: "AI/ML Solutions", path: "/services/ai-ml" },
          { name: "Cloud Transformation", path: "/services/cloud-transformation" },
          { name: "SRE & DevOps Services", path: "/services/devops" },
          { name: "Data Engineering", path: "/services/data-engineering" },
          { name: "Data Visualization and Reporting", path: "/services/data-visualization-reporting" },
        ],
      },
      {
        title: "Application Engineering",
        items: [
          { name: "Banking & Financial Services", path: "/services/fintech" },
          { name: "Ecommerce Development", path: "/services/ecommerce" },
          { name: "Enterprise Digital Solutions", path: "/services/erp" },
          { name: "Development and Maintenance", path: "/services/application-development-maintenance" },
        ],
      },
      {
        title: "Specialized Services",
        items: [
          { name: "Consulting Service", path: "/services/consulting" },
          { name: "AI Consulting & Prompt Engineering", path: "/services/ai-consulting" },
          { name: "Cybersecurity", path: "/services/cybersecurity" },
          { name: "IOT (Internet of Things)", path: "/services/iot" },
        ],
      },
    ],
  },
  {
    label: "Products",
    path: "/products",
    dropdown: [
      {
        title: "Product Categories",
        items: [
          { name: "Gen AI Products", path: "/products?category=Gen AI Products" },
          { name: "AI productivity tools", path: "/products?category=AI productivity tools" },
          { name: "DevOps & SRE Automation", path: "/products?category=DevOps & SRE Automation" },
          { name: "LMS", path: "/products?category=LMS" },
          { name: "ERP & Office Productivity", path: "/products?category=ERP & Office Productivity" },
          { name: "Logistics and Delivery", path: "/products?category=Logistics and Delivery" },
        ],
      },
    ],
  },
  {
    label: "Industries",
    path: "/industries",
    dropdown: [
      {
        title: "Focus Areas",
        items: [
          { name: "Banking & Finance", path: "/industries/banking-finance" },
          { name: "Healthcare & Life Sciences", path: "/industries/healthcare-life-sciences" },
          { name: "Utilities and Energy", path: "/industries/utilities-energy" },
          { name: "Logistics & Supply Chain", path: "/industries/logistics-supply-chain" },
          { name: "Manufacturing", path: "/industries/manufacturing" },
          { name: "Retail & Consumer", path: "/industries/retail-consumer" },
        ],
      },
    ],
  },
  {
    label: "Resources",
    path: "/resources",
    dropdown: [
      {
        title: "Knowledge Hub",
        items: [
          { name: "Blogs", path: "/resources/blogs" },
          { name: "Case Studies", path: "/resources/case-studies" },
          { name: "In the News", path: "/company/news" },
          { name: "Events", path: "/resources/events" },
          { name: "Hutech Documents", path: "/resources/hutech-documents" },
        ],
      },
    ],
  },
  { label: "Careers", path: "/careers" },
  { label: "Contact Us", path: "/contact" },
];

const BRAND_BLUE = "#0171c1";

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedItem, setMobileExpandedItem] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useRouter();

  const { scrollY } = useScroll();
  
  // Fixed states for header
  const navBackground = "rgba(255, 255, 255, 1)";
  const navBlur = "blur(0px)";
  const textColorValue = "rgba(0, 26, 61, 1)";

  // Disable height animation when mobile menu is open
  const navHeight = useTransform(scrollY, [0, 50], ["80px", "64px"]);
  const logoScale = useTransform(scrollY, [0, 50], [1, 0.85]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      // Ensure dropdowns are closed when opening mobile menu if they were open in desktop
      setActiveDropdown(null);
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (index: number) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };

  return (
    <>
      <Motion.nav
        role="navigation"
        aria-label="Main Navigation"
        style={{
          height: navHeight,
          backgroundColor: navBackground,
          backdropFilter: navBlur,
          color: textColorValue,
        }}
        className={`fixed top-0 left-0 w-full z-50 transition-shadow duration-300 bg-white ${
          scrolled ? "shadow-md border-b border-gray-100" : "border-b border-gray-50"
        }`}
        ref={dropdownRef}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center">
              <Link href="/" className="flex items-center" onClick={() => setActiveDropdown(null)}>
                <Motion.div style={{ scale: logoScale }}>
                  <div className="h-16 md:h-20 py-2">
                    <ImageWithFallback
                      src={logoImg}
                      alt="Hutech Solutions Logo"
                      className="h-full w-auto object-contain"
                    />
                  </div>
                </Motion.div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {NAV_ITEMS.map((item, idx) => {
                const isMega = item.label === "Company" || item.label === "Services";
                const isSmall = item.label === "Industries" || item.label === "Resources" || item.label === "Products";

                return (
                  <div 
                    key={item.label} 
                    className={`group px-3 ${isSmall ? "relative" : ""}`}
                    onMouseEnter={() => setActiveDropdown(idx)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.dropdown ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(idx)}
                          className="flex items-center py-2 text-[14px] font-semibold tracking-wide transition-colors duration-300 text-[#001A3D] hover:text-[#0171c1]"
                          style={{ color: activeDropdown === idx ? BRAND_BLUE : undefined }}
                        >
                          {item.label}
                          <ChevronDown className={`ml-1.5 w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === idx ? "rotate-180" : ""}`} />
                        </button>

                        {/* Small Dropdown */}
                        {isSmall && (
                          <AnimatePresence>
                            {activeDropdown === idx && (
                              <Motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-0 w-64 bg-white border border-gray-100 shadow-2xl py-4 mt-0 rounded-sm"
                              >
                                {item.dropdown.map((section) => (
                                  <div key={section.title} className="space-y-1">
                                    {section.items.map((subItem) => (
                                      <Link
                                        key={subItem.name}
                                        href={subItem.path}
                                        className="block px-6 py-2.5 text-[13px] text-gray-500 hover:text-[#0171c1] hover:bg-gray-50 transition-all font-semibold flex items-center group/sub"
                                        onClick={() => setActiveDropdown(null)}
                                      >
                                        <span className="w-0 h-[1.5px] bg-[#0171c1] transition-all group-hover/sub:w-3 mr-0 group-hover/sub:mr-2"></span>
                                        {subItem.name}
                                      </Link>
                                    ))}
                                  </div>
                                ))}
                              </Motion.div>
                            )}
                          </AnimatePresence>
                        )}

                        {/* Mega Dropdown - Now as child to fix hover bridge issue */}
                        {isMega && (
                          <AnimatePresence>
                            {activeDropdown === idx && (
                              <Motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="fixed top-[80px] left-0 w-full bg-white border-t border-gray-100 shadow-2xl overflow-hidden z-50"
                                style={{ top: scrolled ? "64px" : "80px" }}
                              >
                                <div className="max-w-[1280px] mx-auto px-6 lg:px-20 py-12">
                                  <div className="grid grid-cols-12 gap-12">
                                    <div className="col-span-3">
                                          <div className="bg-[#001A3D] p-8 rounded-lg text-white relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0171c1]/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
                                            <h3 className="text-base font-normal mb-4 relative z-10 leading-tight">
                                              Experience <span className="text-[#0171c1]">Digital</span> Excellence
                                            </h3>
                                            <p className="text-gray-400 text-sm mb-6 relative z-10">
                                              Join 200+ global enterprises scaling with our engineering expertise.
                                            </p>
                                            <Link href="/contact" className="inline-flex items-center text-[#0171c1] font-semibold text-sm tracking-wide group relative z-10">
                                              Work With Us
                                              <MoveRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                            </Link>
                                         </div>
                                    </div>

                                    <div className="col-span-9 grid grid-cols-3 gap-8">
                                      {item.dropdown?.map((section) => (
                                        <div key={section.title} className="space-y-6">
                                          <h4 className="text-[#001A3D] text-[13px] font-semibold pb-3 border-b border-gray-100">
                                            {section.title}
                                          </h4>
                                          <div className="flex flex-col space-y-4">
                                            {section.items.map((subItem) => (
                                              <Link
                                                key={subItem.name}
                                                href={subItem.path}
                                                className="text-gray-500 hover:text-[#0171c1] font-medium transition-all text-sm flex items-center group/item"
                                                onClick={() => setActiveDropdown(null)}
                                              >
                                                <span className="w-0 h-[1.5px] bg-[#0171c1] transition-all group-hover/item:w-3 mr-0 group-hover/item:mr-2"></span>
                                                {subItem.name}
                                              </Link>
                                            ))}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                {/* Bottom bar of mega menu */}
                                <div className="bg-gray-50 py-4 border-t border-gray-100">
                                   <div className="max-w-[1280px] mx-auto px-6 lg:px-20 flex justify-between items-center text-xs text-gray-500 font-semibold tracking-wide">
                                      <div className="flex space-x-8">
                                        <Link href="/resources/case-studies" className="hover:text-[#001A3D]">Success Stories</Link>
                                        <Link href="/resources" className="hover:text-[#001A3D]">Knowledge Hub</Link>
                                        <Link href="/careers" className="hover:text-[#001A3D]">Life at Hutech</Link>
                                      </div>
                                      <div className="text-[#0171c1]">Accelerating Business Agility</div>
                                   </div>
                                </div>
                              </Motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.path}
                        className="block py-2 text-[14px] font-semibold tracking-wide transition-colors duration-300 text-[#001A3D] hover:text-[#0171c1]"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="text-[#001A3D] hover:text-[#0171c1] transition-colors p-2 focus:outline-none"
                aria-label="Open menu"
                aria-expanded={false}
              >
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>

      </Motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <Motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#001A3D] z-[100] flex flex-col h-[100vh]"
            style={{ height: '100dvh' }}
          >
            <div className="flex justify-between items-center px-6 py-6 border-b border-white/10 h-[100px]">
              <div className="flex items-center">
                <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                  <div className="h-14 px-3 bg-white rounded-md py-1.5 shadow-md">
                    <ImageWithFallback
                      src={logoImg}
                      alt="Hutech Solutions Logo"
                      className="h-full w-auto object-contain"
                    />
                  </div>
                </Link>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)} 
                className="text-white bg-white/10 p-3 rounded-full hover:bg-[#0171c1] hover:text-white transition-all"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 py-10 space-y-6">
              {NAV_ITEMS.map((item, idx) => (
                <Motion.div 
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + (idx * 0.05) }}
                  className="border-b border-white/5 pb-4 last:border-0"
                >
                  {item.dropdown ? (
                    <div className="space-y-6">
                      <button
                        onClick={() => setMobileExpandedItem(mobileExpandedItem === idx ? null : idx)}
                        className="text-2xl font-semibold text-white flex justify-between items-center tracking-tight w-full group"
                      >
                        <span className={mobileExpandedItem === idx ? "text-[#0171c1]" : ""}>{item.label}</span>
                        <ChevronDown 
                          className={`w-6 h-6 text-[#0171c1] transition-transform duration-500 ${
                            mobileExpandedItem === idx ? "rotate-180" : ""
                          }`} 
                        />
                      </button>
                      <AnimatePresence>
                        {mobileExpandedItem === idx && (
                          <Motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-8 pt-4">
                              {item.dropdown.map((section) => (
                                <div key={section.title} className="space-y-4 pl-4 border-l border-[#0171c1]/20">
                                  <h4 className="text-[#0171c1] text-sm font-semibold opacity-80">
                                    {section.title}
                                  </h4>
                                  <div className="grid gap-4">
                                    {section.items.map((subItem) => (
                                      <Link
                                        key={subItem.name}
                                        href={subItem.path}
                                        className="text-gray-300 text-base font-semibold hover:text-white flex items-center group transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#0171c1] mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        {subItem.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </Motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      className="text-2xl font-semibold text-white block tracking-tight hover:text-[#0171c1] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </Motion.div>
              ))}
            </div>

            <div className="p-8 bg-[#00142D] space-y-4">
               <Link 
                 href="/contact" 
                 onClick={() => setMobileMenuOpen(false)}
                 className="w-full bg-[#0171c1] text-white font-bold py-4 tracking-wide text-center block rounded-sm hover:bg-white hover:text-[#001A3D] transition-all shadow-lg active:scale-[0.98]"
               >
                 Get In Touch
               </Link>
               <div className="flex justify-between items-center text-[11px] text-gray-500 font-semibold tracking-wide pt-4 border-t border-white/5">
                  <div>Hutech Solutions © 2026</div>
                  <div className="text-[#0171c1]">Global Engineering</div>
               </div>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}