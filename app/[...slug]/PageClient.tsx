"use client";

import { motion as Motion } from "framer-motion";
import Link from "next/link";
import { Meta } from "@/components/Meta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { WpPage, SitemapSection } from "@/lib/wordpress";
import { renderTitle } from "@/lib/utils";

interface Props {
  page: WpPage;
  sitemapSections?: SitemapSection[];
}

export default function GenericLegalPageClient({ page, sitemapSections }: Props) {
  const isSitemap = page.slug === "sitemap";
  const sectionsToRender = sitemapSections && sitemapSections.length > 0 ? sitemapSections : [];

  // Order sections: core site sections first, dynamic content sections (Blogs, Case Studies, Events) at the end
  const END_SECTION_TITLES = ["Blogs", "Case Studies", "Events"];
  const mainSections = sectionsToRender.filter(
    (s) => !END_SECTION_TITLES.some((t) => t.toLowerCase() === s.title.toLowerCase())
  );
  const endSections = END_SECTION_TITLES.map((title) =>
    sectionsToRender.find((s) => s.title.toLowerCase() === title.toLowerCase())
  ).filter((s): s is SitemapSection => Boolean(s && s.links && s.links.length > 0));

  const allOrderedSections = [...mainSections, ...endSections];

  return (
    <div className="flex flex-col bg-white">
      <Meta
        title={`${page.title} | Hutech Solutions`}
        description={(page.content || "").replace(/<[^>]+>/g, "").slice(0, 150) || page.title}
      />
      <Breadcrumbs variant="light" />

      <section className="bg-[#001A3D] text-white py-20 relative overflow-hidden">
        {isSitemap && (
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/80 to-transparent"></div>
          </div>
        )}
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-semibold mb-6 display-font tracking-tight">
              {renderTitle(page.title, "text-inherit", "text-[#F99D1C]")}
            </h1>
            <p className="text-lg text-gray-300">
              {isSitemap ? "A comprehensive directory of our website content." : `Effective Date: ${page.date}`}
            </p>
          </Motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          {page.content && (
            <div 
              className="prose prose-blue max-w-4xl text-gray-600 leading-relaxed space-y-8 mb-12"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          )}

          {isSitemap && allOrderedSections.length > 0 && (
            <div className="space-y-12 sm:space-y-14">
              {allOrderedSections.map((section, idx) => (
                <div
                  key={section.title}
                  className={`space-y-6 ${idx !== 0 ? "border-t border-gray-200/80 pt-12 sm:pt-14" : ""}`}
                >
                  <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <h2 className="text-xl font-bold text-[#001A3D]">
                      {section.title}
                    </h2>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                      {section.links.length} {section.links.length === 1 ? "page" : "pages"}
                    </span>
                  </div>
                  <ul className="grid grid-cols-1 gap-x-8 gap-y-3.5 sm:grid-cols-2 lg:grid-cols-3">
                    {section.links.map((link) => (
                      <li key={`${section.title}-${link.name}-${link.path}`}>
                        <Link
                          href={link.path}
                          className="group flex items-start text-sm font-medium text-gray-500 transition-colors hover:text-[#0171c1]"
                        >
                          <span className="mr-2 mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300 transition-colors group-hover:bg-[#0171c1]"></span>
                          <span className="line-clamp-2 leading-relaxed">
                            {link.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
