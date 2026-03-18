"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

interface BreadcrumbsProps {
  variant?: "light" | "dark";
}

export function Breadcrumbs({ variant = "light" }: BreadcrumbsProps) {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);

  if (pathname === "/") return null;

  const breadcrumbMap: Record<string, string> = {
    about: "About Us",
    services: "Services",
    industries: "Industries",
    careers: "Careers",
    contact: "Contact Us",
    "ai-ml": "AI & ML Solutions",
    "ai-consulting": "AI Consulting & Prompt Engineering",
    "data-engineering": "Data Engineering",
    "data-visualization-reporting": "Data Visualization & Reporting",
    "application-development-maintenance": "Development and Maintenance",
    fintech: "Fintech App Development",
    ecommerce: "Ecommerce Development",
    devops: "SRE & DevOps Services",
    cybersecurity: "Cybersecurity",
    iot: "IOT (Internet of Things)",
    "cloud-transformation": "Cloud Transformation",
    news: "In The News",
    "press-release": "Press Release",
    awards: "Awards & Recognition",
    leadership: "Leadership Team",
    partnership: "Partnerships",
    "vision-mission-values": "Vision, Mission & Values",
    blogs: "Blogs",
    "case-studies": "Case Studies",
    insights: "Resources & Insights",
    "banking-finance": "Banking & Finance",
    "healthcare-life-sciences": "Healthcare & Life Sciences",
    "utilities-energy": "Utilities & Energy",
    "logistics-supply-chain": "Logistics & Supply Chain",
    manufacturing: "Manufacturing",
    "retail-consumer": "Retail & Consumer",
  };

  const isLight = variant === "light";
  const textColorClass = isLight ? "text-gray-400" : "text-white/60";
  const hoverColorClass = isLight ? "hover:text-[#0171c1]" : "hover:text-white";
  const activeColorClass = isLight ? "text-[#001A3D]" : "text-white";
  const separatorColorClass = isLight ? "text-gray-300" : "text-white/20";
  const bgColorClass = isLight ? "bg-[#F2F2F2]" : "bg-[#001A3D]";
  const borderColorClass = isLight ? "border-gray-100" : "border-white/5";

  return (
    <section
      className={`flex h-[40px] w-full items-center border-b ${bgColorClass} ${borderColorClass} relative z-30`}
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-[10px] font-bold tracking-[0.05em] uppercase">
            <li className="flex items-center">
              <Link
                href="/"
                className={`${textColorClass} ${hoverColorClass} flex items-center gap-1.5 transition-colors`}
              >
                <span>HOME</span>
              </Link>
            </li>
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const href = `/${pathnames.slice(0, index + 1).join("/")}`;
              const displayName =
                breadcrumbMap[value] ||
                value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " ");

              return (
                <li key={href} className="flex items-center space-x-2">
                  <ChevronRight size={10} className={`${separatorColorClass} shrink-0`} />
                  {last ? (
                    <span className={activeColorClass}>{displayName}</span>
                  ) : (
                    <Link
                      href={href}
                      className={`${textColorClass} ${hoverColorClass} transition-colors`}
                    >
                      {displayName}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </section>
  );
}
