"use client";

import { motion as Motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { submitContactForm } from "@/lib/api";
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
  Linkedin,
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { RegisterEventModal } from "@/components/RegisterEventModal";
import Link from "next/link";
import { renderTitle } from "@/lib/utils";

export default function EventDetailClient({ event }: { event: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);
    const formData = new FormData(form);
    const emailVal = formData.get("email") as string;

    try {
      await submitContactForm({
        name: "Event Subscriber",
        email: emailVal,
        phone: "N/A",
        subject: `Event Newsletter Subscription: ${event.title}`,
        message: `User subscribed to event newsletter from event detail page: ${event.title}`,
        category: "Event Newsletter Subscription",
      });
      toast.success("Subscribed successfully!");
      form.reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const ctaTitle = event.ctaTitle || "Missed this |Event?";
  const ctaDesc =
    event.ctaDescription ||
    "Gain access to exclusive event transcripts, recording links, and early notification of upcoming engineering summits.";
  const ctaImage =
    event.ctaImage ||
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
  const ctaVideoUrl = event.ctaVideoUrl || "";

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: event.title,
          text: event.tagline,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.log("Error sharing", err);
    }
  };

  const handleAddToCalendar = () => {
    const startDate = new Date(event.date);
    if (isNaN(startDate.getTime())) return;

    // Create a basic all-day event for the calendar
    const startStr = startDate.toISOString().split("T")[0].replace(/-/g, "");

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${startStr}/${startStr}&details=${encodeURIComponent(
      event.tagline || ""
    )}&location=${encodeURIComponent(event.location || "")}`;

    window.open(googleCalendarUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Meta title={`${event.title} | Events | Hutech Solutions`} description={event.tagline} />
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#001A3D]/40 via-[#001A3D]/80 to-[#001A3D]"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pt-[70px] pb-16 lg:px-20">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Link
              href="/resources/events"
              className="group inline-flex items-center gap-3 text-[10px] font-bold tracking-widest text-[#0171c1] uppercase transition-all hover:text-white"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />{" "}
              Back to All Events
            </Link>

            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-bold tracking-wider text-[#FFAF2B] uppercase">
                {event.category?.toUpperCase()}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-bold tracking-wider text-[#0171c1] uppercase">
                {event.type?.toUpperCase()}
              </span>
            </div>

            <div className="space-y-4 pt-2">
              <h1 className="max-w-5xl text-4xl leading-tight font-semibold tracking-tight text-white md:text-6xl lg:text-[64px]">
                {event.title.endsWith(" 2026") ? (
                  <>
                    {event.title.replace(" 2026", "")}
                    <br />
                    2026
                  </>
                ) : (
                  event.title
                )}
              </h1>
              <p className="max-w-3xl text-lg font-medium text-gray-300 md:text-xl">
                &quot;{event.tagline}&quot;
              </p>
            </div>
          </Motion.div>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <section className="bg-[#F8FAFC] py-[96px]">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="flex flex-col lg:flex-row lg:gap-[64px]">
            {/* Left Column: Event Details */}
            <div className="flex-1 space-y-[96px]">
              
              {/* Description */}
              <div>
                <h2 className="mb-6 text-3xl font-bold text-[#001A3D] display-font">
                  {renderTitle(event.titleAbout || "About the Event")}
                </h2>
                <p className="mb-10 max-w-[700px] text-[18px] leading-[1.8] text-[#64748B]">
                  {event.description}
                </p>
                {event.highlights?.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.highlights.map((highlight: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 rounded-xl border border-[#E5E7EB] bg-white p-5"
                      >
                        <CheckCircle2 className="h-5 w-5 text-[#2563EB] flex-shrink-0" />
                        <span className="text-[16px] font-semibold text-[#0F172A]">
                          {renderTitle(highlight)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Agenda */}
              {event.agenda?.length > 0 && (
                <div>
                  <h2 className="mb-8 text-3xl font-bold text-[#001A3D] display-font">
                    {renderTitle(event.titleAgenda || "Event Agenda")}
                  </h2>
                  <div className="space-y-4">
                    {event.agenda.map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex flex-col md:flex-row items-start md:items-center rounded-2xl border border-[#E5E7EB] bg-white p-6 md:h-[88px] md:px-8 md:py-0"
                      >
                        <div className="text-[#0171c1] font-black text-lg whitespace-nowrap w-24 tracking-tight">
                          {item.time}
                        </div>
                        <div className="hidden h-10 w-[1px] bg-[#E5E7EB] md:block mr-8"></div>
                        <div className="font-bold text-[#001A3D] text-lg">
                          {renderTitle(item.event)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Speakers */}
              {event.speakers?.length > 0 && (
                <div>
                  <h2 className="mb-12 text-3xl font-bold text-[#001A3D] display-font">
                    {renderTitle(event.titleSpeakers || "Featured Speakers")}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-center">
                    {event.speakers.map((speaker: any, idx: number) => (
                      <div key={idx} className="group transition-transform hover:-translate-y-1">
                        <div className="mx-auto mb-5 h-[180px] w-[180px] overflow-hidden rounded-full border border-[#E5E7EB] shadow-md bg-white">
                          <ImageWithFallback
                            src={speaker.image}
                            alt={speaker.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <h4 className="text-[24px] font-bold text-[#0F172A]">
                          {renderTitle(speaker.name)}
                        </h4>
                        <div className="mt-1 flex flex-col items-center justify-center gap-3">
                          <p className="text-sm text-[#0171c1] font-bold uppercase tracking-widest">
                            {speaker.role}
                          </p>
                          {speaker.linkedin && (
                            <a
                              href={speaker.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#2563EB] transition-opacity hover:opacity-70 cursor-pointer"
                            >
                              <Linkedin size={20} />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Sidebar Sticky */}
            <div className="w-full lg:w-[320px] flex-shrink-0 mt-12 lg:mt-0">
              <div className="sticky top-24">
                {/* Registration Card */}
                <div className="rounded-[28px] bg-[#031B4E] p-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                  <h3 className="mb-[24px] text-[24px] font-bold leading-[1.1] text-white">
                    Registration
                  </h3>

                  <div className="space-y-[20px]">
                    <div className="flex items-center gap-[12px]">
                      <div className="flex h-[48px] w-[48px] flex-shrink-0 items-center justify-center rounded-[12px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.06)]">
                        <Calendar className="h-5 w-5 text-[#F5A623]" />
                      </div>
                      <div>
                        <div className="mb-1 text-[10px] font-semibold uppercase tracking-[1px] text-[rgba(255,255,255,0.45)]">DATE</div>
                        <div className="text-[16px] font-bold leading-[1.4] text-white">{event.date}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-[12px]">
                      <div className="flex h-[48px] w-[48px] flex-shrink-0 items-center justify-center rounded-[12px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.06)]">
                        <Clock className="h-5 w-5 text-[#F5A623]" />
                      </div>
                      <div>
                        <div className="mb-1 text-[10px] font-semibold uppercase tracking-[1px] text-[rgba(255,255,255,0.45)]">TIME</div>
                        <div className="text-[16px] font-bold leading-[1.4] text-white">{event.time}</div>
                      </div>
                    </div>

                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(event.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-[12px] transition-opacity hover:opacity-80 cursor-pointer"
                    >
                      <div className="flex h-[48px] w-[48px] flex-shrink-0 items-center justify-center rounded-[12px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.06)]">
                        <MapPin className="h-5 w-5 text-[#F5A623]" />
                      </div>
                      <div>
                        <div className="mb-1 text-[10px] font-semibold uppercase tracking-[1px] text-[rgba(255,255,255,0.45)]">LOCATION</div>
                        <div className="text-[16px] font-bold leading-[1.4] text-white">{event.location}</div>
                      </div>
                    </a>
                  </div>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-[24px] w-full bg-[#0171c1] hover:bg-white hover:text-[#001A3D] text-white py-5 rounded-sm font-black uppercase tracking-[0.2em] text-[11px] transition-all duration-500 shadow-lg"
                  >
                    REGISTER NOW
                  </button>
                  <p className="mt-[20px] text-center text-[10px] font-semibold uppercase tracking-[1px] text-[rgba(255,255,255,0.35)]">
                    * LIMITED SLOTS AVAILABLE
                  </p>
                </div>

                {/* Helpful Links Card */}
                <div className="mt-6 rounded-[20px] border border-[#E5E7EB] bg-white p-6">
                  <h4 className="mb-4 text-[16px] font-bold text-[#0F172A]">
                    {event.helpfulLinksTitle || "Helpful Links"}
                  </h4>
                  <div className="space-y-4">
                    <button 
                      onClick={handleShare}
                      className="flex items-center gap-3 text-sm font-bold text-gray-500 hover:text-[#0171c1] transition-colors"
                    >
                      <Share2 className="h-4 w-4 flex-shrink-0" />
                      {event.linkShareLabel || "Share with colleagues"}
                    </button>
                    <button 
                      onClick={handleAddToCalendar}
                      className="flex items-center gap-3 text-sm font-bold text-gray-500 hover:text-[#0171c1] transition-colors"
                    >
                      <Monitor className="h-4 w-4 flex-shrink-0" />
                      {event.linkCalendarLabel || "Add to Calendar"}
                    </button>
                    <Link
                      href={event.linkContactUrl || "/contact"}
                      className="flex items-center gap-3 text-sm font-bold text-gray-500 hover:text-[#0171c1] transition-colors"
                    >
                      <MessageSquare className="h-4 w-4 flex-shrink-0" />
                      {event.linkContactLabel || "Contact Organizer"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="bg-white py-[80px]">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="flex flex-col items-center gap-[48px] lg:flex-row">
            {/* Left Content */}
            <div className="w-full lg:w-1/2">
              <h2 className="mb-[32px] max-w-[500px] text-[40px] font-bold leading-[1.1] text-[#041B4D] md:text-[48px]">
                {renderTitle(ctaTitle, "text-inherit", "text-[#0171c1]", "text-[#0171c1]")}
              </h2>
              <p className="mb-[40px] max-w-[620px] text-[16px] font-normal leading-[1.8] text-[#64748B] md:text-[18px]">
                {ctaDesc}
              </p>
              <form onSubmit={handleSubscribe} className="flex w-full flex-col gap-[12px] md:flex-row md:gap-[16px]">
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Enter your corporate email"
                  className="h-[56px] w-full rounded-[8px] border border-[#E5E7EB] bg-white px-[20px] text-[16px] placeholder:text-[16px] placeholder:text-[#94A3B8] focus:border-[#0171c1] focus:outline-none md:w-[420px]"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-[56px] w-full rounded-[8px] bg-[#0171c1] text-[14px] font-bold uppercase tracking-[2px] text-white transition-colors duration-300 hover:bg-blue-600 md:w-[180px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Subscribed" : "SUBSCRIBE"}
                </button>
              </form>
            </div>

            {/* Right Side Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative h-[350px] w-full overflow-hidden rounded-[20px] shadow-xl md:rounded-[24px]">
                <ImageWithFallback
                  src={ctaImage}
                  alt="Event recording"
                  className="h-full w-full object-cover"
                />
                {/* Play Button Overlay */}
                <div
                  className={`absolute inset-0 flex items-center justify-center bg-black/10 ${ctaVideoUrl ? "cursor-pointer" : "pointer-events-none"}`}
                  onClick={() => ctaVideoUrl && setVideoOpen(true)}
                >
                  <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-300 hover:scale-105">
                    <Video className="h-8 w-8 fill-current text-[#0171c1]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
