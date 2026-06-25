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
          {
            name: "Data Visualization and Reporting",
            path: "/services/data-visualization-reporting",
          },
        ],
      },
      {
        title: "Application Engineering",
        items: [
          { name: "Banking & Financial Services", path: "/services/fintech" },
          { name: "Ecommerce Development", path: "/services/ecommerce" },
          { name: "Enterprise Digital Solutions", path: "/services/erp" },
          {
            name: "Development and Maintenance",
            path: "/services/application-development-maintenance",
          },
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
  { label: "Products", path: "/products" },
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
        className={`fixed top-0 left-0 z-50 w-full bg-white transition-shadow duration-300 ${
          scrolled ? "border-b border-gray-100 shadow-md" : "border-b border-gray-50"
        }`}
        ref={dropdownRef}
      >
        <div className="mx-auto h-full max-w-[1280px] px-6 lg:px-20">
          <div className="flex h-full items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center" onClick={() => setActiveDropdown(null)}>
                <Motion.div style={{ scale: logoScale }}>
                  <div className="h-16 py-2 md:h-20">
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
            <div className="hidden items-center space-x-1 lg:flex">
              {NAV_ITEMS.map((item, idx) => {
                const isMega = item.label === "Company" || item.label === "Services";
                const isSmall =
                  item.label === "Industries" ||
                  item.label === "Resources";

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
                          className="flex items-center py-2 text-[14px] font-semibold tracking-wide text-[#001A3D] transition-colors duration-300 hover:text-[#0171c1]"
                          style={{ color: activeDropdown === idx ? BRAND_BLUE : undefined }}
                        >
                          {item.label}
                          <ChevronDown
                            className={`ml-1.5 h-3.5 w-3.5 transition-transform duration-300 ${activeDropdown === idx ? "rotate-180" : ""}`}
                          />
                        </button>

                        {/* Small Dropdown */}
                        {isSmall && (
                          <AnimatePresence>
                            {activeDropdown === idx && (
                              <Motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-0 mt-0 w-64 rounded-sm border border-gray-100 bg-white py-4 shadow-2xl"
                              >
                                {item.dropdown.map((section) => (
                                  <div key={section.title} className="space-y-1">
                                    {section.items.map((subItem) => (
                                      <Link
                                        key={subItem.name}
                                        href={subItem.path}
                                        className="group/sub block flex items-center px-6 py-2.5 text-[13px] font-semibold text-gray-500 transition-all hover:bg-gray-50 hover:text-[#0171c1]"
                                        onClick={() => setActiveDropdown(null)}
                                      >
                                        <span className="mr-0 h-[1.5px] w-0 bg-[#0171c1] transition-all group-hover/sub:mr-2 group-hover/sub:w-3"></span>
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
                                className="fixed top-[80px] left-0 z-50 w-full overflow-hidden border-t border-gray-100 bg-white shadow-2xl"
                                style={{ top: scrolled ? "64px" : "80px" }}
                              >
                                <div className="mx-auto max-w-[1280px] px-6 py-12 lg:px-20">
                                  <div className="grid grid-cols-12 gap-12">
                                    <div className="col-span-3">
                                      <div className="group relative overflow-hidden rounded-lg bg-[#001A3D] p-8 text-white">
                                        <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-[#0171c1]/10 transition-transform duration-700 group-hover:scale-150"></div>
                                        <h3 className="relative z-10 mb-4 text-base leading-tight font-normal">
                                          Experience <span className="text-[#0171c1]">Digital</span>{" "}
                                          Excellence
                                        </h3>
                                        <p className="relative z-10 mb-6 text-sm text-gray-400">
                                          Join 200+ global enterprises scaling with our engineering
                                          expertise.
                                        </p>
                                        <Link
                                          href="/contact"
                                          className="group relative z-10 inline-flex items-center text-sm font-semibold tracking-wide text-[#0171c1]"
                                        >
                                          Work With Us
                                          <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                      </div>
                                    </div>

                                    <div className={`col-span-9 grid gap-8 ${item.dropdown?.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                                      {item.dropdown?.map((section) => (
                                        <div key={section.title} className="space-y-6">
                                          <h4 className="border-b border-gray-100 pb-3 text-[13px] font-semibold text-[#001A3D]">
                                            {section.title}
                                          </h4>
                                          <div className="flex flex-col space-y-4">
                                            {section.items.map((subItem) => (
                                              <Link
                                                key={subItem.name}
                                                href={subItem.path}
                                                className="group/item flex items-center text-sm font-medium text-gray-500 transition-all hover:text-[#0171c1]"
                                                onClick={() => setActiveDropdown(null)}
                                              >
                                                <span className="mr-0 h-[1.5px] w-0 bg-[#0171c1] transition-all group-hover/item:mr-2 group-hover/item:w-3"></span>
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
                                <div className="border-t border-gray-100 bg-gray-50 py-4">
                                  <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 text-xs font-semibold tracking-wide text-gray-500 lg:px-20">
                                    <div className="flex space-x-8">
                                      <Link
                                        href="/resources/case-studies"
                                        className="hover:text-[#001A3D]"
                                      >
                                        Case Studies
                                      </Link>
                                      <Link href="/resources/hutech-documents" className="hover:text-[#001A3D]">
                                        Hutech Documents
                                      </Link>
                                      <Link href="/careers" className="hover:text-[#001A3D]">
                                        Life at Hutech
                                      </Link>
                                    </div>
                                    <div className="text-[#0171c1]">
                                      Accelerating Business Agility
                                    </div>
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
                        className="block py-2 text-[14px] font-semibold tracking-wide text-[#001A3D] transition-colors duration-300 hover:text-[#0171c1]"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-[#001A3D] transition-colors hover:text-[#0171c1] focus:outline-none"
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
            className="fixed inset-0 z-[100] flex h-[100vh] flex-col bg-[#001A3D]"
            style={{ height: "100dvh" }}
          >
            <div className="flex h-[100px] items-center justify-between border-b border-white/10 px-6 py-6">
              <div className="flex items-center">
                <Link
                  href="/"
                  className="flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="h-14 rounded-md bg-white px-3 py-1.5 shadow-md">
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
                className="rounded-full bg-white/10 p-3 text-white transition-all hover:bg-[#0171c1] hover:text-white"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto px-6 py-10">
              {NAV_ITEMS.map((item, idx) => (
                <Motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + idx * 0.05 }}
                  className="border-b border-white/5 pb-4 last:border-0"
                >
                  {item.dropdown ? (
                    <div className="space-y-6">
                      <button
                        onClick={() =>
                          setMobileExpandedItem(mobileExpandedItem === idx ? null : idx)
                        }
                        className="group flex w-full items-center justify-between text-2xl font-semibold tracking-tight text-white"
                      >
                        <span className={mobileExpandedItem === idx ? "text-[#0171c1]" : ""}>
                          {item.label}
                        </span>
                        <ChevronDown
                          className={`h-6 w-6 text-[#0171c1] transition-transform duration-500 ${
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
                                <div
                                  key={section.title}
                                  className="space-y-4 border-l border-[#0171c1]/20 pl-4"
                                >
                                  <h4 className="text-sm font-semibold text-[#0171c1] opacity-80">
                                    {section.title}
                                  </h4>
                                  <div className="grid gap-4">
                                    {section.items.map((subItem) => (
                                      <Link
                                        key={subItem.name}
                                        href={subItem.path}
                                        className="group flex items-center text-base font-semibold text-gray-300 transition-colors hover:text-white"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        <div className="mr-3 h-1.5 w-1.5 rounded-full bg-[#0171c1] opacity-0 transition-opacity group-hover:opacity-100"></div>
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
                      className="block text-2xl font-semibold tracking-tight text-white transition-colors hover:text-[#0171c1]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </Motion.div>
              ))}
            </div>

            <div className="space-y-4 bg-[#00142D] p-8">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full rounded-sm bg-[#0171c1] py-4 text-center font-bold tracking-wide text-white shadow-lg transition-all hover:bg-white hover:text-[#001A3D] active:scale-[0.98]"
              >
                Get In Touch
              </Link>
              <div className="flex items-center justify-between border-t border-white/5 pt-4 text-[11px] font-semibold tracking-wide text-gray-500">
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
