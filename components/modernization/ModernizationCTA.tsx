"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { renderTitle } from "@/lib/utils";

export function ModernizationCTA({
  data,
  buttonText = "Schedule an Architecture Assessment",
}: {
  data?: any;
  buttonText?: string;
}) {
  const cta = data || {};
  return (
    <section id="contact" className="scroll-mt-16 bg-white py-10 lg:py-14">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#001A3D] via-[#00285a] to-[#0171c1] p-10 text-center text-white shadow-2xl sm:p-14 lg:p-16">
          {/* Background radial highlight */}
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-30 blur-2xl"
            style={{ background: "radial-gradient(circle, #35d8eb 0%, transparent 70%)" }}
          />

          <div className="relative z-10 mx-auto max-w-3xl">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-[2px] w-8 bg-[#F99D1C]" />
              <span className="text-xs font-bold tracking-[0.25em] text-[#F99D1C] uppercase">
                LET&apos;S BUILD WHAT&apos;S NEXT
              </span>
            </div>

            <h2 className="display-font text-3xl font-bold leading-tight sm:leading-tight lg:leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {renderTitle(
                cta.heading || "Ready to Give Your Legacy Applications |a Future?",
                "text-white",
                "text-[#F99D1C]",
                "text-[#0171c1]"
              )}
            </h2>

            <p className="mt-4 text-base leading-relaxed text-gray-200 sm:text-lg">
              {cta.description || "Connect with Hutech’s enterprise software architects to explore an AI-powered modernization roadmap tailored to your business, infrastructure, and technology landscape."}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-4 text-sm font-bold text-[#001A3D] shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl"
              >
                {buttonText}
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="mailto:contact@hutechsolutions.ai?subject=Legacy%20Application%20Modernization%20Consultation"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <Mail className="h-4 w-4" />
                Email Our Team Directly
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
