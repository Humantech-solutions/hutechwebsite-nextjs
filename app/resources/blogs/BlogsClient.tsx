"use client";

import { motion as Motion } from "motion/react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";
import { useState } from "react";
import { WpBlog } from "@/lib/wordpress";
import { renderTitle } from "@/lib/utils";

type Props = {
  blogs: WpBlog[];
  pageTitle: string;
  pageDescription: string;
  bgImageUrl?: string;
};

export default function BlogsClient({ blogs, pageTitle, pageDescription, bgImageUrl }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;

  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const currentBlogs = blogs.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <Meta
        title="Blogs | Hutech Solutions"
        description="Latest insights and thought leadership from Hutech Solutions experts."
      />
      <Breadcrumbs variant="light" />

      <section className="bg-[#001A3D] text-white h-[450px] relative overflow-hidden flex items-center">
        {bgImageUrl && (
          <div className="absolute inset-0 z-0">
            <ImageWithFallback
              src={bgImageUrl}
              alt={pageTitle}
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D] via-transparent to-transparent"></div>
          </div>
        )}
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10 w-full">
          <Motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-semibold mb-6 display-font"
          >
            {renderTitle(pageTitle)}
          </Motion.h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed font-medium">
            {pageDescription}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          {blogs.length === 0 ? (
            <p className="text-center text-gray-400 py-20 text-lg">
              No articles found. Check back soon!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {currentBlogs.map((blog, i) => (
                <Motion.article
                  key={blog.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex flex-col h-full bg-white border border-gray-100 rounded-[15px] md:rounded-3xl overflow-hidden hover:shadow-2xl transition-all"
                >
                  <div className="relative h-64 overflow-hidden">
                    <ImageWithFallback
                      src={blog.imageUrl || undefined}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-6 left-6 px-4 py-1 bg-[#F99D1C] text-[#001A3D] font-bold text-xs rounded-full uppercase tracking-widest">
                      {blog.category}
                    </div>
                  </div>
                  <div className="p-10 flex flex-col flex-grow space-y-4">
                    <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} /> {blog.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User size={14} /> {blog.author}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#001A3D] display-font group-hover:text-[#F99D1C] transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed flex-grow">
                      {blog.excerpt}
                    </p>
                    <Link
                      href={`/resources/blogs/${blog.slug}`}
                      className="inline-flex items-center gap-2 text-[#001A3D] font-bold group-hover:gap-4 transition-all"
                    >
                      Read Article <ArrowRight size={18} className="text-[#F99D1C]" />
                    </Link>
                  </div>
                </Motion.article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-16">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-3 rounded-full border border-gray-200 text-gray-400 hover:border-[#0171c1] hover:text-[#0171c1] hover:bg-[#0171c1]/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-400 disabled:hover:bg-transparent"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-12 h-12 rounded-full font-bold text-sm transition-all ${
                      currentPage === page
                        ? "bg-[#0171c1] text-white"
                        : "border border-gray-200 text-gray-600 hover:border-[#0171c1] hover:text-[#0171c1] hover:bg-[#0171c1]/5"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-3 rounded-full border border-gray-200 text-gray-400 hover:border-[#0171c1] hover:text-[#0171c1] hover:bg-[#0171c1]/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-400 disabled:hover:bg-transparent"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
