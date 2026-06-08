"use client";

import { motion as Motion } from "framer-motion";
import Link from "next/link";
import { Meta } from "@/components/Meta";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const SITEMAP_DATA = [
  {
    title: "Company",
    links: [
      { name: "About Hutech", path: "/company/about" },
      { name: "Vision, Mission & Values", path: "/company/vision-mission-values" },
      { name: "Leadership Team", path: "/company/leadership" },
      { name: "Partnership", path: "/company/partnership" },
      { name: "Life At Hutech Solutions", path: "/company/life-at-hutech" },
      { name: "In The News", path: "/company/news" },
      { name: "Press Release", path: "/company/press-release" },
      { name: "Awards and Recognition", path: "/company/awards" },
      { name: "Open Positions", path: "/careers" },
      { name: "Graduates", path: "/company/graduates" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "AI/ML Solutions", path: "/services/ai-ml" },
      { name: "Cloud Transformation", path: "/services/cloud-transformation" },
      { name: "SRE & DevOps Services", path: "/services/devops" },
      { name: "Data Engineering", path: "/services/data-engineering" },
      { name: "Data Visualization and Reporting", path: "/services/data-visualization" },
      { name: "Banking & Financial Services", path: "/services/fintech" },
      { name: "Ecommerce Development", path: "/services/ecommerce" },
      { name: "Enterprise Digital Solutions", path: "/services/erp" },
      {
        name: "Development and Maintenance",
        path: "/services/application-development-maintenance",
      },
      { name: "Consulting Service", path: "/services/consulting" },
      { name: "AI Consulting & Prompt Engineering", path: "/services/ai-consulting" },
      { name: "Cybersecurity", path: "/services/cybersecurity" },
      { name: "IOT (Internet of Things)", path: "/services/iot" },
    ],
  },
  {
    title: "Products",
    links: [
      { name: "All Products", path: "/products" },
      { name: "Gen AI Products", path: "/products?category=Gen AI Products" },
      { name: "AI productivity tools", path: "/products?category=AI productivity tools" },
      { name: "DevOps & SRE Automation", path: "/products?category=DevOps & SRE Automation" },
      { name: "LMS", path: "/products?category=LMS" },
      { name: "ERP & Office Productivity", path: "/products?category=ERP & Office Productivity" },
      { name: "Logistics and Delivery", path: "/products?category=Logistics and Delivery" },
    ],
  },
  {
    title: "Industries",
    links: [
      { name: "Banking & Finance", path: "/industries/banking-finance" },
      { name: "Healthcare & Life Sciences", path: "/industries/healthcare-life-sciences" },
      { name: "Utilities and Energy", path: "/industries/utilities-energy" },
      { name: "Logistics & Supply Chain", path: "/industries/logistics-supply-chain" },
      { name: "Manufacturing", path: "/industries/manufacturing" },
      { name: "Retail & Consumer", path: "/industries/retail-consumer" },
    ],
  },
  {
    title: "Legal & Policies",
    links: [
      { name: "Terms and Condition", path: "/legal/terms" },
      { name: "Privacy Policy", path: "/legal/privacy" },
      { name: "Cookie Policy", path: "/legal/cookie-policy" },
      { name: "Code of Conduct", path: "/legal/code-of-conduct" },
      { name: "Sitemap", path: "/legal/sitemap" },
    ],
  },
];

export default function Sitemap() {
  return (
    <div className="flex flex-col bg-white">
      <Meta
        title="Sitemap | Hutech Solutions"
        description="Navigate through all pages on Hutech Solutions website."
      />
      <Breadcrumbs variant="light" />

      <section className="relative overflow-hidden bg-[#001A3D] py-20 text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/80 to-transparent"></div>
        </div>
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="display-font mb-6 text-4xl font-semibold tracking-tight md:text-5xl">
              <span className="text-[#F99D1C]">Site</span>map
            </h1>
            <p className="text-lg text-gray-300">
              A comprehensive directory of our website content.
            </p>
          </Motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {SITEMAP_DATA.map((section) => (
              <div key={section.title} className="space-y-6">
                <h2 className="border-b border-gray-100 pb-4 text-xl font-bold text-[#001A3D]">
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.path}
                        className="group flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-[#0171c1]"
                      >
                        <span className="mr-0 h-[1px] w-0 bg-[#0171c1] transition-all group-hover:mr-2 group-hover:w-3"></span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
