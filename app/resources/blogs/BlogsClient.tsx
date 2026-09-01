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
import { IPublishCardBanner } from "@/components/ipublish/IPublishCardBanner";

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
    <div className="flex min-h-screen flex-col bg-white">
      <Meta
        title="Blogs | Hutech Solutions"
        description="Latest insights and thought leadership from Hutech Solutions experts."
      />
      <Breadcrumbs variant="light" />

      <section className="relative flex h-[450px] items-center overflow-hidden bg-[#001A3D] text-white">
        {bgImageUrl && (
          <div className="absolute inset-0 z-0">
            <ImageWithFallback
              src={bgImageUrl}
              alt={pageTitle}
              className="h-full w-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D] via-transparent to-transparent"></div>
          </div>
        )}
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-20">
          <Motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="display-font mb-6 text-5xl font-semibold md:text-7xl"
          >
            {renderTitle(pageTitle)}
          </Motion.h1>
          <p className="max-w-2xl text-xl font-medium leading-relaxed text-gray-400">
            {pageDescription}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          {blogs.length === 0 ? (
            <p className="py-20 text-center text-lg text-gray-400">
              No articles found. Check back soon!
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              {currentBlogs.map((blog, i) => (
                <Motion.article
                  key={blog.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex h-full flex-col overflow-hidden rounded-[15px] border border-gray-100 bg-white transition-all hover:shadow-2xl md:rounded-3xl"
                >
                  <Link
                    href={blog.isIPublish ? `/resources/blogs/ipublish/${blog.slug}` : `/resources/blogs/${blog.slug}`}
                    className="items-center gap-2 font-bold text-[#001A3D] transition-all group-hover:gap-4"
                  >
                    <div className="relative h-64 overflow-hidden">
                      {blog.isIPublish && blog.ipublishMeta ? (
                        <IPublishCardBanner blog={blog} />
                      ) : (
                        <ImageWithFallback
                          src={blog.imageUrl || undefined}
                          alt={blog.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute left-6 top-6 z-20 rounded-full bg-[#F99D1C] px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#001A3D]">
                        {blog.category}
                      </div>
                    </div>
                    <div className="flex flex-grow flex-col space-y-4 p-10">
                      <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} /> {blog.date}
                        </span>
                        {/* <span className="flex items-center gap-1">
                          <User size={14} /> {blog.author}
                        </span> */}
                      </div>
                      <h3 className="display-font text-2xl font-bold text-[#001A3D] transition-colors group-hover:text-[#F99D1C]">
                        {blog.title}
                      </h3>
                      <p className="flex-grow leading-relaxed text-gray-500">{blog.excerpt}</p>
                      <p className="inline-flex items-center gap-2 font-bold text-[#001A3D] transition-all group-hover:gap-4">
                        Read Article <ArrowRight size={18} className="text-[#F99D1C]" />
                      </p>
                    </div>
                  </Link>
                </Motion.article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-full border border-gray-200 p-3 text-gray-400 transition-all hover:border-[#0171c1] hover:bg-[#0171c1]/5 hover:text-[#0171c1] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-gray-400"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`h-12 w-12 rounded-full text-sm font-bold transition-all ${
                      currentPage === page
                        ? "bg-[#0171c1] text-white"
                        : "border border-gray-200 text-gray-600 hover:border-[#0171c1] hover:bg-[#0171c1]/5 hover:text-[#0171c1]"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-full border border-gray-200 p-3 text-gray-400 transition-all hover:border-[#0171c1] hover:bg-[#0171c1]/5 hover:text-[#0171c1] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-gray-400"
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
