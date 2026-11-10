import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { MASTER_PAGE_DATA } from "@/lib/data/legacy-modernization";
import { renderTitle } from "@/lib/utils";

export function ModernizationIntro({ data }: { data?: any }) {
  const intro = data || MASTER_PAGE_DATA.intro;

  return (
    <section className="bg-white py-10 lg:py-14">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: What Is Legacy Modernization */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#F99D1C]" />
              <span className="text-xs font-bold tracking-[0.25em] text-[#F99D1C] uppercase">
                {intro.tagline}
              </span>
            </div>

            <h2 className="display-font text-3xl font-bold leading-tight sm:leading-tight lg:leading-tight tracking-tight text-[#001A3D] sm:text-4xl lg:text-5xl">
              {renderTitle(
                intro.heading || "What Is Legacy |Application Modernization?",
                "text-[#001A3D]",
                "text-[#0171c1]",
                "text-[#F99D1C]"
              )}
            </h2>

            <div className="space-y-4 text-base leading-relaxed text-gray-600 sm:text-lg">
              <p>{intro.description1}</p>
              <p className="text-gray-500">{intro.description2}</p>
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-[#0171c1] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#005bb5] hover:shadow-lg"
              >
                Request an Application Assessment
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Hutech's Approach */}
          <div className="rounded-2xl border border-gray-100 bg-[#F8FAFC] p-8 shadow-sm lg:p-10">
            <div className="mb-6 space-y-2">
              <span className="inline-block rounded-md bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0171c1]">
                OUR ENGINEERING APPROACH
              </span>
              <h3 className="display-font text-xl font-bold leading-tight text-[#001A3D] sm:text-2xl">
                {renderTitle(
                  intro.approachTitle || "Hutech’s Approach to |AI-Driven Legacy Modernization",
                  "text-[#001A3D]",
                  "text-[#0171c1]",
                  "text-[#F99D1C]"
                )}
              </h3>
              <p className="text-sm text-gray-500">
                {intro.approachDescription}
              </p>
            </div>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {intro.points.map((point: string, idx: number) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-3.5 text-xs text-gray-700 shadow-xs"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0171c1]" />
                  <span className="leading-snug">{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/60 p-4 text-xs font-medium text-[#001A3D]">
              <strong className="text-[#0171c1]">The Outcome:</strong> {intro.outcome}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
