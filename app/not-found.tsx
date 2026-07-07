"use client";

import { motion as Motion } from "framer-motion";
import Link from "next/link";
import {
  MoveRight,
  Home,
  ArrowLeft,
  Search,
  Cpu,
  Globe2,
  Zap,
} from "lucide-react";

const QUICK_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/resources/case-studies" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const FLOATING_ICONS = [
  { Icon: Cpu, delay: 0, x: "10%", y: "20%" },
  { Icon: Globe2, delay: 0.3, x: "80%", y: "15%" },
  { Icon: Zap, delay: 0.6, x: "15%", y: "75%" },
  { Icon: Search, delay: 0.9, x: "75%", y: "70%" },
];

export default function NotFound() {
  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#001A3D] px-6 py-24 text-white">
      {/* Animated background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow blobs */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-[#F99D1C]/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-[#0171c1]/10 blur-[120px]" />

      {/* Floating icons */}
      {FLOATING_ICONS.map(({ Icon, delay, x, y }, i) => (
        <Motion.div
          key={i}
          className="pointer-events-none absolute hidden md:block"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.12, scale: 1 }}
          transition={{ delay, duration: 0.8, ease: "easeOut" }}
        >
          <Motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon size={56} className="text-white" />
          </Motion.div>
        </Motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">

        {/* 404 number */}
        <Motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative select-none"
        >
          <span
            className="absolute inset-0 text-[160px] md:text-[220px] font-black leading-none tracking-tighter text-[#F99D1C]/10 blur-sm"
            aria-hidden
          >
            404
          </span>
          <h1
            className="display-font relative text-[160px] md:text-[220px] font-black leading-none tracking-tighter text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #F99D1C 0%, #ffffff 50%, #0171c1 100%)",
            }}
          >
            404
          </h1>
        </Motion.div>

        {/* Divider line */}
        <Motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mb-10 h-[2px] w-24 rounded-full bg-[#F99D1C]"
        />

        {/* Title */}
        <Motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="display-font mb-6 text-3xl font-semibold tracking-tight md:text-5xl"
        >
          Page Not{" "}
          <span className="text-[#F99D1C]">Found.</span>
        </Motion.h2>

        {/* Description */}
        <Motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12 max-w-lg text-lg font-medium leading-relaxed text-white/60"
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </Motion.p>

        {/* CTA Buttons */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-sm bg-[#F99D1C] px-10 py-5 text-sm font-bold tracking-wide text-[#001A3D] shadow-2xl shadow-[#F99D1C]/20 transition-all duration-300 hover:bg-[#ffad30] hover:shadow-[#F99D1C]/40 hover:-translate-y-0.5"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="group inline-flex items-center gap-3 rounded-sm border border-white/20 px-10 py-5 text-sm font-bold tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Go Back
          </button>
        </Motion.div>

        {/* Quick Links */}
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 w-full"
        >
          <p className="mb-6 text-xs font-semibold tracking-widest text-white/30 uppercase">
            Or explore these sections
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-[#F99D1C]/40 hover:bg-[#F99D1C]/10 hover:text-[#F99D1C]"
              >
                {link.label}
                <MoveRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </Motion.div>

        {/* Brand footer tag */}
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 flex items-center gap-3 text-xs text-white/20 font-medium tracking-wide"
        >
          <span className="h-[1px] w-8 bg-white/20" />
          Hutech Solutions &middot; Technology That Matters
          <span className="h-[1px] w-8 bg-white/20" />
        </Motion.div>
      </div>
    </div>
  );
}
