"use client";

import { motion as Motion } from "framer-motion";
import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  Calendar,
  MapPin,
  Clock,
  Share2,
  ArrowLeft,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  Monitor,
  Video,
  X,
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { RegisterEventModal } from "@/components/RegisterEventModal";
import Link from "next/link";
import { renderTitle } from "@/lib/utils";

export default function EventDetailClient({ event }: { event: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  const ctaTitle = event.ctaTitle || "Missed this |Event?";
  const ctaDesc =
    event.ctaDescription ||
    "Gain access to exclusive event transcripts, recording links, and early notification of upcoming engineering summits.";
  const ctaImage =
    event.ctaImage ||
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
  const ctaVideoUrl = event.ctaVideoUrl || "";

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Meta title={`${event.title} | Events | Hutech Solutions`} description={event.tagline} />
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex min-h-[500px] items-center overflow-hidden bg-[#001A3D] pt-20 text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#001A3D]/40 via-[#001A3D]/80 to-[#001A3D]"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 py-16 lg:px-20">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            <Link
              href="/resources/events"
              className="group inline-flex items-center gap-3 text-[11px] font-black tracking-[0.3em] text-[#0171c1] uppercase transition-all hover:text-white"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-2" />{" "}
              Back to All Events
            </Link>

            <div className="flex flex-wrap gap-4">
              <span className="rounded-full bg-[#FFAF2B] px-6 py-2 text-[10px] font-black tracking-[0.2em] text-[#001A3D] uppercase shadow-2xl">
                {event.category?.toUpperCase()}
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-6 py-2 text-[10px] font-black tracking-[0.2em] text-white uppercase backdrop-blur-md">
                {event.type?.toUpperCase()}
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="display-font max-w-5xl text-5xl leading-tight font-semibold tracking-tight md:text-8xl">
                {renderTitle(event.title, "text-inherit", "text-[#FFAF2B]", "text-[#0171c1]")}
              </h1>
              <p className="max-w-3xl border-l-4 border-[#FFAF2B] pl-8 text-2xl leading-relaxed font-medium text-gray-300 italic">
                &quot;{event.tagline}&quot;
              </p>
            </div>
          </Motion.div>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <section className="bg-white py-32">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-24 lg:grid-cols-12">
            {/* Left Column: Event Details */}
            <div className="space-y-24 lg:col-span-8">
              {/* Description */}
              <div className="space-y-10">
                <div className="flex items-center gap-4">
                  <span className="block h-[3px] w-12 bg-[#0171c1]"></span>
                  <h2 className="display-font text-4xl font-bold tracking-tight text-[#001A3D] uppercase">
                    About the Event
                  </h2>
                </div>
                <p className="text-2xl leading-relaxed font-medium text-gray-500">
                  {event.description}
                </p>
                {event.highlights?.length > 0 && (
                  <div className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-2">
                    {event.highlights.map((highlight: string, idx: number) => (
                      <div
                        key={idx}
                        className="group flex items-start gap-5 rounded-[2rem] border border-gray-100/50 bg-gray-50 p-8 transition-all duration-500 hover:bg-white hover:shadow-2xl"
                      >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#0171c1]/10 transition-colors group-hover:bg-[#0171c1] group-hover:text-white">
                          <CheckCircle2 className="h-6 w-6" />
                        </div>
                        <span className="text-lg leading-snug font-bold text-[#001A3D]">
                          {renderTitle(highlight)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Agenda */}
              {event.agenda?.length > 0 && (
                <div className="space-y-12">
                  <div className="flex items-center gap-4">
                    <span className="block h-[3px] w-12 bg-[#0171c1]"></span>
                    <h2 className="display-font text-4xl font-bold tracking-tight text-[#001A3D] uppercase">
                      Event Agenda
                    </h2>
                  </div>
                  <div className="space-y-6">
                    {event.agenda.map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="group flex flex-col items-start gap-8 rounded-[2.5rem] border border-gray-100 bg-white p-10 transition-all duration-500 hover:border-[#0171c1]/30 hover:shadow-2xl md:flex-row md:items-center"
                      >
                        <div className="rounded-xl bg-gray-50 px-6 py-2 text-center text-2xl font-black tracking-tighter whitespace-nowrap text-[#0171c1] transition-all group-hover:bg-[#0171c1] group-hover:text-white md:w-40">
                          {item.time}
                        </div>
                        <div className="hidden h-12 w-[2px] bg-gray-100 transition-all group-hover:bg-[#0171c1]/20 md:block"></div>
                        <div className="display-font text-2xl leading-tight font-bold text-[#001A3D]">
                          {renderTitle(item.event)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Speakers */}
              {event.speakers?.length > 0 && (
                <div className="space-y-16">
                  <div className="flex items-center gap-4">
                    <span className="block h-[3px] w-12 bg-[#0171c1]"></span>
                    <h2 className="display-font text-4xl font-bold tracking-tight text-[#001A3D] uppercase">
                      Featured Speakers
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                    {event.speakers.map((speaker: any, idx: number) => (
                      <div key={idx} className="group space-y-8 text-center">
                        <div className="aspect-square overflow-hidden rounded-3xl border-[10px] border-white shadow-2xl transition-all duration-700 group-hover:border-[#0171c1]/10">
                          <ImageWithFallback
                            src={speaker.image}
                            alt={speaker.name}
                            className="h-full w-full scale-110 object-cover grayscale transition-all duration-1000 group-hover:scale-100 group-hover:grayscale-0"
                          />
                        </div>
                        <div className="space-y-2">
                          <h4 className="display-font text-2xl font-bold tracking-tight text-[#001A3D]">
                            {renderTitle(speaker.name)}
                          </h4>
                          <p className="text-xs font-black tracking-[0.25em] text-[#0171c1] uppercase">
                            {speaker.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Sidebar Sticky */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-12">
                {/* Info Card */}
                <div className="relative overflow-hidden rounded-[3.5rem] bg-[#001A3D] p-12 text-white shadow-[0_48px_100px_-20px_rgba(0,0,0,0.3)]">
                  <div className="absolute top-0 right-0 -mt-24 -mr-24 h-48 w-48 rounded-full bg-[#0171c1]/20 blur-[100px]"></div>
                  <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-32 w-32 rounded-full bg-[#FFAF2B]/10 blur-[80px]"></div>

                  <div className="relative z-10 space-y-10">
                    <div className="space-y-2">
                      <span className="text-[10px] font-black tracking-[0.4em] text-[#FFAF2B] uppercase">
                        Secure Your Spot
                      </span>
                      <h3 className="display-font text-3xl font-bold tracking-tight">
                        Registration
                      </h3>
                    </div>

                    <div className="space-y-8">
                      <div className="flex items-center gap-6">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                          <Calendar className="h-6 w-6 text-[#FFAF2B]" />
                        </div>
                        <div>
                          <div className="mb-1 text-[10px] font-black tracking-[0.2em] text-white/30 uppercase">
                            Date
                          </div>
                          <div className="text-lg font-bold">{event.date}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                          <Clock className="h-6 w-6 text-[#FFAF2B]" />
                        </div>
                        <div>
                          <div className="mb-1 text-[10px] font-black tracking-[0.2em] text-white/30 uppercase">
                            Time
                          </div>
                          <div className="text-lg font-bold">{event.time}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                          <MapPin className="h-6 w-6 text-[#FFAF2B]" />
                        </div>
                        <div>
                          <div className="mb-1 text-[10px] font-black tracking-[0.2em] text-white/30 uppercase">
                            Location
                          </div>
                          <div className="text-lg font-bold">{event.location}</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6 pt-4">
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="group flex w-full items-center justify-center gap-4 rounded-2xl bg-[#0171c1] py-6 text-[11px] font-black tracking-[0.25em] text-white uppercase shadow-2xl transition-all duration-500 hover:bg-white hover:text-[#001A3D]"
                      >
                        REGISTER NOW{" "}
                        <ArrowRight className="transition-transform group-hover:translate-x-2" />
                      </button>

                      <div className="flex items-center justify-center gap-2">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-[#FFAF2B]"></div>
                        <p className="text-center text-[10px] font-black tracking-widest text-white/40 uppercase">
                          Limited engineering slots remaining
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Share & Support */}
                <div className="space-y-10 rounded-[3rem] border border-gray-100 bg-gray-50/50 p-12">
                  <h4 className="border-b border-gray-100 pb-6 text-[10px] font-black tracking-[0.3em] text-[#001A3D] uppercase">
                    Helpful Resources
                  </h4>
                  <div className="space-y-6">
                    <button className="group flex items-center gap-4 text-xs font-black tracking-widest text-gray-400 uppercase transition-all hover:text-[#0171c1]">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm transition-all group-hover:shadow-md">
                        <Share2 size={16} />
                      </div>{" "}
                      Share with colleagues
                    </button>
                    <button className="group flex items-center gap-4 text-xs font-black tracking-widest text-gray-400 uppercase transition-all hover:text-[#0171c1]">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm transition-all group-hover:shadow-md">
                        <Monitor size={16} />
                      </div>{" "}
                      Add to Calendar
                    </button>
                    <Link
                      href="/contact"
                      className="group flex items-center gap-4 text-xs font-black tracking-widest text-gray-400 uppercase transition-all hover:text-[#0171c1]"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm transition-all group-hover:shadow-md">
                        <MessageSquare size={16} />
                      </div>{" "}
                      Contact Organizer
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section — image with optional video play */}
      <section className="relative overflow-hidden border-t border-gray-100 bg-gray-50 py-32">
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 items-center gap-24 lg:grid-cols-2">
            <div className="space-y-10">
              <h2 className="display-font text-5xl leading-tight font-bold tracking-tight text-[#001A3D] md:text-7xl">
                {renderTitle(ctaTitle, "text-inherit", "text-[#0171c1]", "text-[#F99D1C]")}
              </h2>
              <p className="max-w-lg text-xl leading-relaxed font-medium text-gray-500">{ctaDesc}</p>
              <form className="flex max-w-xl flex-col gap-4 sm:flex-row">
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="flex-1 rounded-2xl border border-gray-200 bg-white px-8 py-6 text-lg font-medium shadow-sm transition-all focus:border-[#0171c1] focus:outline-none"
                />
                <button className="rounded-2xl bg-[#001A3D] px-12 py-6 text-xs font-black tracking-[0.2em] text-white uppercase shadow-xl transition-all hover:bg-[#0171c1]">
                  Subscribe
                </button>
              </form>
            </div>
            <div className="relative">
              <div className="aspect-square rotate-3 overflow-hidden rounded-[4rem] shadow-[0_64px_128px_-32px_rgba(0,0,0,0.2)]">
                <ImageWithFallback
                  src={ctaImage}
                  alt="Event recording"
                  className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                />
                {/* Play button overlay — shown when video URL exists OR as decorative element */}
                <div
                  className={`group absolute inset-0 flex items-center justify-center bg-[#001A3D]/30 ${ctaVideoUrl ? "cursor-pointer" : "pointer-events-none"}`}
                  onClick={() => ctaVideoUrl && setVideoOpen(true)}
                >
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/90 text-[#0171c1] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-transform hover:scale-110">
                    <Video className="h-10 w-10 fill-current" />
                  </div>
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 -z-10 h-40 w-40 -rotate-6 rounded-3xl bg-[#FFAF2B] shadow-2xl"></div>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 h-full w-1/3 translate-x-1/3 skew-x-12 bg-[#0171c1]/5"></div>
      </section>

      {/* Video Modal */}
      {videoOpen && ctaVideoUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-all"
            >
              <X size={20} />
            </button>
            <iframe
              src={ctaVideoUrl.includes("youtube.com/watch") 
                ? ctaVideoUrl.replace("watch?v=", "embed/") + "?autoplay=1"
                : ctaVideoUrl.includes("youtu.be/")
                  ? ctaVideoUrl.replace("youtu.be/", "youtube.com/embed/") + "?autoplay=1"
                  : ctaVideoUrl
              }
              className="h-full w-full"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Modal Integration */}
      <RegisterEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventTitle={event.title}
      />
    </div>
  );
}
