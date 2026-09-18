"use client";

import { FileText, Newspaper, BookOpen, Calendar, MoveRight } from "lucide-react";
import Link from "next/link";
import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Meta } from "@/components/Meta";

const RESOURCES_CATEGORIES = [
  {
    category: "Knowledge & Resources",
    items: [
      {
        title: "Blogs",
        href: "/resources/blogs",
        icon: <Newspaper className="h-8 w-8 text-[#F99D1C]" />,
        desc: "Latest tech trends, engineering deep-dives, and company news.",
      },
      {
        title: "Case Studies",
        href: "/resources/case-studies",
        icon: <FileText className="h-8 w-8 text-[#F99D1C]" />,
        desc: "Real-world success stories of our digital transformations.",
      },
      {
        title: "Events",
        href: "/resources/events",
        icon: <Calendar className="h-8 w-8 text-[#F99D1C]" />,
        desc: "Upcoming webinars, tech meetups, and corporate events.",
      },
      {
        title: "Hutech Documents",
        href: "/resources/hutech-documents",
        icon: <BookOpen className="h-8 w-8 text-[#F99D1C]" />,
        desc: "Whitepapers, brochures, and technical documentation.",
      },
    ],
  },
];

const ResourceCard = ({ item, itemIdx }: { item: any; itemIdx: number }) => (
  <Link href={item.href}>
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: itemIdx * 0.1 }}
      className="group h-full cursor-pointer rounded-[2.5rem] border border-gray-100 bg-gray-50 p-12 transition-all duration-500 hover:bg-white hover:shadow-2xl"
    >
      <div className="mb-10 w-fit rounded-2xl bg-white p-4 shadow-sm transition-colors group-hover:bg-[#F99D1C]/10">
        {item.icon}
      </div>
      <h3 className="display-font mb-6 text-2xl font-semibold tracking-tight text-[#001A3D] transition-colors group-hover:text-[#F99D1C]">
        {item.title}
      </h3>
      <p className="mb-10 text-base font-medium leading-relaxed text-gray-500">{item.desc}</p>
      <div className="mt-auto flex items-center text-[11px] font-semibold tracking-wide text-[#001A3D]">
        Explore{" "}
        <MoveRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-2" />
      </div>
    </Motion.div>
  </Link>
);

type HeroSettings = {
  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
};

export default function ResourcesClient({
  dynamicLinks,
  heroSettings,
}: {
  dynamicLinks?: { name: string; path: string }[] | null;
  heroSettings?: HeroSettings;
}) {
  const displayEyebrow = heroSettings?.heroEyebrow || "Knowledge Hub";
  const displayTitle = heroSettings?.heroTitle || "Resources & |Insights.";
  const displayDescription =
    heroSettings?.heroDescription ||
    "Deep dives into the technologies and strategies shaping the future of digital engineering.";

  const renderTitle = (title: string) => {
    return title
      .split("|")
      .map((part, index, array) => (
        <span key={index}>
          {index === array.length - 1 ? <span className="text-[#F99D1C]">{part}</span> : part}
        </span>
      ));
  };

  const getRenderCategories = () => {
    if (!dynamicLinks || dynamicLinks.length === 0) return RESOURCES_CATEGORIES;

    // Deep copy to allow mutation of items
    const renderCats = RESOURCES_CATEGORIES.map((cat) => ({
      ...cat,
      items: cat.items.map((item) => ({ ...item })),
    }));

    const unmappedLinks: { title: string; href: string; icon: any; desc: string }[] =
      [];

    dynamicLinks.forEach((dLink) => {
      const cleanPath = dLink.path.replace(/\/$/, "");
      let foundMatch = false;

      // Check if this dynamic link matches any hardcoded item
      for (const cat of renderCats) {
        const match = cat.items.find((item) => {
          const cleanItemPath = item.href.replace(/\/$/, "");
          return (
            cleanItemPath === cleanPath ||
            cleanItemPath.endsWith(cleanPath) ||
            cleanPath.endsWith(cleanItemPath)
          );
        });
        if (match) {
          match.title = dLink.name; // Update title from WordPress
          foundMatch = true;
          break;
        }
      }

      if (!foundMatch) {
        unmappedLinks.push({
          title: dLink.name,
          href: dLink.path,
          icon: <FileText className="h-8 w-8 text-[#F99D1C]" />,
          desc: "Explore this resource.",
        });
      }
    });

    if (unmappedLinks.length > 0) {
      renderCats.push({
        category: "More Resources",
        items: unmappedLinks as any,
      });
    }

    return renderCats;
  };

  const categories = getRenderCategories();

  return (
    <div className="bg-white">
      <Meta
        title="Resources & Insights | Hutech Solutions"
        description="Explore the latest technology trends, case studies, and digital transformation insights from Hutech Solutions."
      />
      <Breadcrumbs variant="light" />
      <section className="relative flex h-[450px] items-center overflow-hidden border-b border-gray-200 bg-gray-50">
        <div className="absolute right-0 top-0 h-full w-1/4 translate-x-1/2 -skew-x-12 bg-[#F99D1C]/5"></div>
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 text-left lg:px-20">
          <div className="max-w-5xl">
            <span className="text-xs font-semibold tracking-wide text-[#F99D1C]">
              {displayEyebrow}
            </span>
            <h1 className="display-font mt-8 text-5xl font-semibold leading-[1.1] tracking-tight text-[#001A3D] md:text-7xl">
              {renderTitle(displayTitle)}
            </h1>
            <p className="mt-10 max-w-2xl text-xl font-medium text-gray-500">
              {displayDescription}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          {categories.map((cat, idx) => (
            <div key={cat.category} className={`mb-32 last:mb-0`}>
              <div className="mb-16 flex items-center space-x-4">
                <div className="h-[2px] w-12 bg-[#F99D1C]"></div>
                <h2 className="display-font text-sm font-semibold tracking-wide text-[#001A3D]">
                  {cat.category}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {cat.items.map((item, itemIdx) => (
                  <ResourceCard key={item.href} item={item} itemIdx={itemIdx} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="relative overflow-hidden bg-[#001A3D] py-24 text-white">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 opacity-5">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.1" fill="none" />
          </svg>
        </div>
        <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-12 px-6 md:flex-row lg:px-20">
          <div className="display-font max-w-2xl text-3xl font-semibold leading-tight tracking-tight">
            Ready to engineer your next <span className="text-[#F99D1C]">breakthrough?</span>
          </div>
          <Link
            href="/contact"
            className="rounded-sm bg-[#F99D1C] px-12 py-5 text-xs font-bold tracking-wide text-[#001A3D] shadow-xl shadow-[#F99D1C]/20 transition-all hover:bg-[#ff9d00]"
          >
            Start a Project
          </Link>
        </div>
      </section>
    </div>
  );
}
