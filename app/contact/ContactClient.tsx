"use client";

import { motion as Motion } from "framer-motion";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  Linkedin,
  Twitter,
  Youtube,
  ChevronRight,
  Globe,
  Building2,
  CheckCircle2,
  Clock,
  Instagram,
  Facebook,
} from "lucide-react";
import { toast } from "sonner";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Meta } from "@/components/Meta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { renderTitle } from "@/lib/utils";

import { useState } from "react";
import { submitContactForm } from "@/lib/api";

const STATIC_OFFICES = [
  {
    city: "Bangalore",
    country: "India (HQ)",
    address:
      "2nd Floor, Humantech Solutions India Pvt. Ltd House, 218, 9th Main Rd, Sector 6, HSR Layout, Bengaluru, Karnataka - 560102",
    phone: "+91 88674 87771",
    image:
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=800&auto=format&fit=crop",
  },
  {
    city: "San Jose",
    country: "United States",
    address: "2880 Zanker Road, Suite 203, San Jose, CA 95134",
    phone: "+1 408 123 4567",
    image:
      "https://images.unsplash.com/photo-1549144511-f099e773c147?q=80&w=800&auto=format&fit=crop",
  },
  {
    city: "Ireland",
    country: "Ireland",
    address: "46 Ridgewood Manor, Melitta Road, Kildare, Ireland - R51 H728",
    phone: "(+65) 86180073",
    image:
      "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=800&auto=format&fit=crop",
  },
  {
    city: "Singapore",
    country: "Singapore",
    address: "105 Cecil Street, The Octagon, Singapore - 069534",
    phone: "(+65) 86180073",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800&auto=format&fit=crop",
  },
];

const STATIC_TRUST_BUILDERS = [
  { title: "Response Time", sub: "Under 24 Hours" },
  { title: "Global Support", sub: "24/7 Availability" },
  { title: "Enterprise Scale", sub: "Fortune 500 Trusted" },
];

interface ContactClientProps {
  heroTagline?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroBgImage?: string;

  formTitle?: string;
  formDescription?: string;

  directTitle?: string;
  email?: string;
  phone?: string;

  socialTitle?: string;
  socialLinkedin?: string;
  socialInstagram?: string;
  socialFacebook?: string;
  socialTwitter?: string;
  socialYoutube?: string;

  supportLabel?: string;
  supportDescription?: string;
  supportBtnText?: string;
  supportBtnUrl?: string;

  officesTitle?: string;
  officesDescription?: string;
  offices?: { city: string; country: string; address: string; phone: string; image: string }[];

  mapTitle?: string;
  mapDescription?: string;
  mapBgImage?: string;

  trustBuilders?: { title: string; sub: string }[];
}

export default function ContactClient({
  heroTagline = "Get in Touch",
  heroTitle = "Let's Engineer Your |Next ^Success.",
  heroDescription = "Consultants ready to discuss your next breakthrough project and digital engineering needs.",
  heroBgImage = "https://images.unsplash.com/photo-1771964427867-1b734fc7f5a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",

  formTitle = "Send a Message",
  formDescription = "Have a specific project in mind? Our consultants are ready to discuss your requirements.",

  directTitle = "Direct Contact",
  email = "sales@hutechsolutions.com",
  phone = "+91 90351 80487",

  socialTitle = "Social Connect",
  socialLinkedin = "https://www.linkedin.com/company/hutechsolutions/",
  socialInstagram = "#",
  socialFacebook = "#",
  socialTwitter = "#",
  socialYoutube = "#",

  supportLabel = "Customer Support",
  supportDescription = "Need technical assistance? Our support desk is active 24/7 for managed service clients.",
  supportBtnText = "Support Portal",
  supportBtnUrl = "#",

  officesTitle = "Our Offices",
  officesDescription = "Strategically located in the world's leading technology hubs to serve you better.",
  offices = STATIC_OFFICES,

  mapTitle = "Worldwide Delivery.",
  mapDescription = "Supporting clients across 4 continents with our seamless global delivery model and 24/7 engineering capability.",
  mapBgImage = "https://images.unsplash.com/photo-1731700128691-16fcc9043d11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",

  trustBuilders = STATIC_TRUST_BUILDERS,
}: ContactClientProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);

    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const emailVal = formData.get("email") as string;
    const phoneVal = formData.get("phone") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    try {
      await submitContactForm({
        name,
        email: emailVal,
        phone: phoneVal,
        subject,
        message,
        category: "Contact Us Form",
      });
      toast.success(
        "Thank you! Your inquiry has been received. Our team will contact you shortly."
      );
      form.reset();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to submit inquiry. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: <Linkedin size={22} />, label: "LinkedIn", url: socialLinkedin },
    { icon: <Instagram size={22} />, label: "Instagram", url: socialInstagram },
    { icon: <Facebook size={22} />, label: "Facebook", url: socialFacebook },
    { icon: <Twitter size={22} />, label: "Twitter", url: socialTwitter },
    { icon: <Youtube size={22} />, label: "YouTube", url: socialYoutube },
  ].filter((item) => item.url && item.url !== "");

  return (
    <div className="flex flex-col bg-white">
      <Meta
        title="Contact Us | Hutech Solutions"
        description="Get in touch with Hutech Solutions. Our consultants are ready to discuss your next breakthrough project and digital engineering needs."
      />
      <Breadcrumbs variant="light" />

      {/* Hero Section */}
      <section className="relative flex h-[300px] items-center overflow-hidden bg-[#001A3D] text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={heroBgImage}
            alt="Corporate Office"
            className="h-full w-full scale-105 object-cover opacity-20 brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D]/95 via-[#001A3D]/70 to-transparent"></div>
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-[#F99D1C] to-transparent opacity-90"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-20">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl space-y-3 md:space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="block h-[2px] w-6 shrink-0 bg-[#F99D1C] md:w-8"></span>
              <span className="text-[11px] font-semibold uppercase tracking-wide text-[#F99D1C] md:text-[12px]">
                {heroTagline}
              </span>
            </div>
            <h1 className="display-font text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              {renderTitle(heroTitle, "text-white", "text-[#F99D1C]", "text-[#0171c1]")}
            </h1>
            <p className="max-w-2xl text-sm font-medium leading-relaxed text-gray-200 opacity-90 md:text-lg">
              {heroDescription}
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Main Content: Form & Offices */}
      <section id="contact-form" className="relative z-20 bg-white py-[50px]">
        {/* Desktop: side-by-side grid inside max-width container */}
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
            {/* Contact Form - Left Column */}
            <div className="lg:col-span-7">
              <Motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <div className="space-y-4">
                  <h2 className="display-font text-3xl font-semibold tracking-tight text-[#001A3D] md:text-5xl">
                    {renderTitle(formTitle, "text-[#001A3D]", "text-[#F99D1C]", "text-[#0171c1]")}
                  </h2>
                  <p className="text-lg font-medium text-gray-500">{formDescription}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-[#001A3D]">
                        Full Name
                      </label>
                      <input
                        required
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className="w-full rounded-sm border border-gray-100 bg-gray-50 px-6 py-4 font-medium text-[#001A3D] transition-all focus:border-[#F99D1C] focus:outline-none focus:ring-1 focus:ring-[#F99D1C]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-[#001A3D]">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="w-full rounded-sm border border-gray-100 bg-gray-50 px-6 py-4 font-medium text-[#001A3D] transition-all focus:border-[#F99D1C] focus:outline-none focus:ring-1 focus:ring-[#F99D1C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-[#001A3D]">
                        Phone Number
                      </label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        className="w-full rounded-sm border border-gray-100 bg-gray-50 px-6 py-4 font-medium text-[#001A3D] transition-all focus:border-[#F99D1C] focus:outline-none focus:ring-1 focus:ring-[#F99D1C]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-[#001A3D]">
                        Subject
                      </label>
                      <select
                        name="subject"
                        className="w-full cursor-pointer appearance-none rounded-sm border border-gray-100 bg-gray-50 px-6 py-4 font-medium text-[#001A3D] transition-all focus:border-[#F99D1C] focus:outline-none focus:ring-1 focus:ring-[#F99D1C]"
                      >
                        <option>New Project Inquiry</option>
                        <option>Partnership Opportunity</option>
                        <option>Career Inquiry</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-wide text-[#001A3D]">
                      Message
                    </label>
                    <textarea
                      required
                      name="message"
                      rows={6}
                      placeholder="How can we help you?"
                      className="w-full resize-none rounded-sm border border-gray-100 bg-gray-50 px-6 py-4 font-medium text-[#001A3D] transition-all focus:border-[#F99D1C] focus:outline-none focus:ring-1 focus:ring-[#F99D1C]"
                    ></textarea>
                  </div>

                  <Motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "#001A3D", color: "#F99D1C" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-4 rounded-sm bg-[#F99D1C] px-12 py-5 text-sm font-bold tracking-wide text-[#001A3D] shadow-xl shadow-[#F99D1C]/10 transition-all disabled:cursor-not-allowed disabled:opacity-50 md:w-fit"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Inquiry <Send size={18} />
                      </>
                    )}
                  </Motion.button>
                </form>
              </Motion.div>
            </div>

            {/* Side Info - Right Column (desktop: inside grid, mobile: full-width below form) */}
            <div className="hidden lg:col-span-5 lg:block">
              <Motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative space-y-12 overflow-hidden rounded-[2rem] bg-[#001A3D] p-10 text-white"
              >
                <div className="absolute right-0 top-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-[#0171c1]/20 blur-2xl"></div>

                <div className="space-y-6">
                  <h3 className="display-font text-xl font-semibold tracking-tight md:text-2xl">
                    {directTitle}
                  </h3>
                  <div className="space-y-6">
                    <a href={`mailto:${email}`} className="group flex items-center gap-5 md:gap-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 transition-all duration-300 group-hover:bg-[#0171c1] group-hover:text-white">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold tracking-wide text-gray-400">
                          Email Us
                        </p>
                        <p className="break-all text-sm font-bold sm:text-base md:text-lg">
                          {email}
                        </p>
                      </div>
                    </a>
                    <a
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="group flex items-center gap-5 md:gap-6"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 transition-all duration-300 group-hover:bg-[#0171c1] group-hover:text-white">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold tracking-wide text-gray-400">
                          Call Us
                        </p>
                        <p className="text-lg font-bold">{phone}</p>
                      </div>
                    </a>
                  </div>
                </div>

                {socialLinks.length > 0 && (
                  <div className="space-y-6 border-t border-white/10 pt-10">
                    <h3 className="display-font text-xl font-semibold tracking-tight md:text-2xl">
                      {socialTitle}
                    </h3>
                    <div className="flex flex-wrap gap-3 sm:gap-4">
                      {socialLinks.map((item, idx) => (
                        <a
                          key={idx}
                          href={item.url}
                          target={item.url !== "#" ? "_blank" : undefined}
                          rel={item.url !== "#" ? "noopener noreferrer" : undefined}
                          className="group flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 transition-all duration-300 hover:bg-[#0171c1] hover:text-white"
                          aria-label={item.label}
                        >
                          {item.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-4 rounded-2xl bg-[#0171c1] p-8 text-white">
                  <h4 className="text-xs font-semibold tracking-wide text-white/80">
                    {supportLabel}
                  </h4>
                  <p className="text-lg font-bold leading-snug">{supportDescription}</p>
                  <a
                    href={supportBtnUrl}
                    className="flex w-fit items-center gap-2 border-b-2 border-white pb-1 text-[11px] font-semibold tracking-wide transition-colors hover:border-[#F99D1C] hover:text-[#F99D1C]"
                  >
                    {supportBtnText} <ChevronRight size={14} />
                  </a>
                </div>
              </Motion.div>
            </div>
          </div>
        </div>

        {/* Mobile-only: Direct Contact — full width, no horizontal margin */}
        <div className="mt-10 lg:hidden">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative space-y-10 overflow-hidden bg-[#001A3D] p-8 text-white"
          >
            <div className="absolute right-0 top-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-[#0171c1]/20 blur-2xl"></div>

            <div className="space-y-6">
              <h3 className="display-font text-xl font-semibold tracking-tight">{directTitle}</h3>
              <div className="space-y-6">
                <a href={`mailto:${email}`} className="group flex items-center gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 transition-all duration-300 group-hover:bg-[#0171c1] group-hover:text-white">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-wide text-gray-400">
                      Email Us
                    </p>
                    <p className="break-all text-sm font-bold">{email}</p>
                  </div>
                </a>
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="group flex items-center gap-5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 transition-all duration-300 group-hover:bg-[#0171c1] group-hover:text-white">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-wide text-gray-400">Call Us</p>
                    <p className="text-lg font-bold">{phone}</p>
                  </div>
                </a>
              </div>
            </div>

            {socialLinks.length > 0 && (
              <div className="space-y-6 border-t border-white/10 pt-8">
                <h3 className="display-font text-xl font-semibold tracking-tight">{socialTitle}</h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.url}
                      target={item.url !== "#" ? "_blank" : undefined}
                      rel={item.url !== "#" ? "noopener noreferrer" : undefined}
                      className="group flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 transition-all duration-300 hover:bg-[#0171c1] hover:text-white"
                      aria-label={item.label}
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4 rounded-[15px] bg-[#0171c1] p-8 text-white md:rounded-[25px]">
              <h4 className="text-xs font-semibold tracking-wide text-white/80">{supportLabel}</h4>
              <p className="text-lg font-bold leading-snug">{supportDescription}</p>
              <a
                href={supportBtnUrl}
                className="flex w-fit items-center gap-2 border-b-2 border-white pb-1 text-[11px] font-semibold tracking-wide transition-colors hover:border-[#F99D1C] hover:text-[#F99D1C]"
              >
                {supportBtnText} <ChevronRight size={14} />
              </a>
            </div>
          </Motion.div>
        </div>
      </section>

      {/* Global Presence - Offices Grid */}
      <section className="bg-gray-50 py-[50px]">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mx-auto mb-20 max-w-2xl space-y-4 text-center">
            <h2 className="display-font text-3xl font-semibold tracking-tight text-[#001A3D] md:text-5xl">
              {renderTitle(officesTitle, "text-[#001A3D]", "text-[#F99D1C]", "text-[#0171c1]")}
            </h2>
            <div className="mx-auto h-1 w-16 bg-[#F99D1C]"></div>
            <p className="font-medium text-gray-500">{officesDescription}</p>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {offices.map((office, idx) => (
              <Motion.div
                key={office.city + idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group overflow-hidden rounded-[15px] border border-gray-100 bg-white shadow-xl transition-all duration-500 hover:shadow-2xl md:rounded-[2rem]"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={office.image}
                    alt={office.city}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#001A3D]/20 transition-colors group-hover:bg-[#001A3D]/40"></div>
                  <div className="absolute bottom-6 left-8">
                    <h3 className="display-font text-2xl font-semibold tracking-tight text-white">
                      {office.city}
                    </h3>
                    <p className="text-[11px] font-semibold tracking-wide text-[#F99D1C]">
                      {office.country}
                    </p>
                  </div>
                </div>
                <div className="space-y-6 p-10">
                  <div className="flex items-start gap-4">
                    <MapPin className="mt-1 shrink-0 text-[#F99D1C]" size={18} />
                    <p className="whitespace-pre-line text-sm font-medium leading-relaxed text-gray-600">
                      {office.address}
                    </p>
                  </div>
                  <div className="space-y-3 border-t border-gray-50 pt-4">
                    <div className="flex items-center gap-4">
                      <Phone className="text-[#F99D1C]" size={16} />
                      <span className="text-sm font-bold text-[#001A3D]">{office.phone}</span>
                    </div>
                  </div>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Builders */}
      <section className="border-t border-gray-100 py-[50px]">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex flex-wrap items-center justify-between gap-10">
            {trustBuilders.map((builder, idx) => {
              const Icon = idx === 0 ? CheckCircle2 : idx === 1 ? Clock : Building2;
              return (
                <div key={idx} className="flex items-center gap-4">
                  <Icon className="text-[#F99D1C]" size={24} />
                  <div>
                    <p className="text-[11px] font-semibold tracking-wide text-[#001A3D]">
                      {builder.title}
                    </p>
                    <p className="text-sm font-bold text-gray-500">{builder.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
