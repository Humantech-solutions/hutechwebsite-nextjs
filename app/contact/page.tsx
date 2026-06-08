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

const OFFICES = [
  {
    city: "Bangalore",
    country: "India (HQ)",
    address: "2nd Floor, Humantech Solutions India Pvt. Ltd House, 218, 9th Main Rd, Sector 6, HSR Layout, Bengaluru, Karnataka - 560102",
    phone: "+91 88674 87771",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=800&auto=format&fit=crop",
  },
  {
    city: "San Jose",
    country: "United States",
    address: "2880 Zanker Road, Suite 203, San Jose, CA 95134",
    phone: "+1 408 123 4567",
    image: "https://images.unsplash.com/photo-1549144511-f099e773c147?q=80&w=800&auto=format&fit=crop",
  },
  {
    city: "Ireland",
    country: "Ireland",
    address: "46 Ridgewood Manor, Melitta Road, Kildare, Ireland - R51 H728",
    phone: "(+65) 86180073",
    image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=800&auto=format&fit=crop",
  },
  {
    city: "Singapore",
    country: "Singapore",
    address: "105 Cecil Street, The Octagon, Singapore - 069534",
    phone: "(+65) 86180073",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800&auto=format&fit=crop",
  },
];

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! Your inquiry has been received. Our team will contact you shortly.");
  };

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
            src="https://images.unsplash.com/photo-1771964427867-1b734fc7f5a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Corporate Office"
            className="h-full w-full scale-105 object-cover opacity-20 brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D]/95 via-[#001A3D]/70 to-transparent"></div>
          <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-transparent via-[#F99D1C] to-transparent opacity-90"></div>
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
              <span className="text-[11px] font-semibold tracking-wide text-[#F99D1C] uppercase md:text-[12px]">
                Get in Touch
              </span>
            </div>
            <h1 className="display-font text-3xl leading-tight font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
              Let&apos;s Engineer Your <span className="text-[#F99D1C]">Next Success.</span>
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed font-medium text-gray-200 opacity-90 md:text-lg">
              Consultants ready to discuss your next breakthrough project and digital engineering needs.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Main Content: Form & Offices */}
      <section id="contact-form" className="relative z-20 bg-white py-20">
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
                    Send a Message
                  </h2>
                  <p className="text-lg font-medium text-gray-500">
                    Have a specific project in mind? Our consultants are ready to discuss your requirements.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-[#001A3D]">Full Name</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. John Doe"
                        className="w-full rounded-sm border border-gray-100 bg-gray-50 px-6 py-4 font-medium text-[#001A3D] transition-all focus:border-[#F99D1C] focus:ring-1 focus:ring-[#F99D1C] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-[#001A3D]">Email Address</label>
                      <input
                        required
                        type="email"
                        placeholder="john@company.com"
                        className="w-full rounded-sm border border-gray-100 bg-gray-50 px-6 py-4 font-medium text-[#001A3D] transition-all focus:border-[#F99D1C] focus:ring-1 focus:ring-[#F99D1C] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-[#001A3D]">Phone Number</label>
                      <input
                        required
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="w-full rounded-sm border border-gray-100 bg-gray-50 px-6 py-4 font-medium text-[#001A3D] transition-all focus:border-[#F99D1C] focus:ring-1 focus:ring-[#F99D1C] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-[#001A3D]">Subject</label>
                      <select className="w-full cursor-pointer appearance-none rounded-sm border border-gray-100 bg-gray-50 px-6 py-4 font-medium text-[#001A3D] transition-all focus:border-[#F99D1C] focus:ring-1 focus:ring-[#F99D1C] focus:outline-none">
                        <option>New Project Inquiry</option>
                        <option>Partnership Opportunity</option>
                        <option>Career Inquiry</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-wide text-[#001A3D]">Message</label>
                    <textarea
                      required
                      rows={6}
                      placeholder="How can we help you?"
                      className="w-full resize-none rounded-sm border border-gray-100 bg-gray-50 px-6 py-4 font-medium text-[#001A3D] transition-all focus:border-[#F99D1C] focus:ring-1 focus:ring-[#F99D1C] focus:outline-none"
                    ></textarea>
                  </div>

                  <Motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "#001A3D", color: "#F99D1C" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex w-full items-center justify-center gap-4 rounded-sm bg-[#F99D1C] px-12 py-5 text-sm font-bold tracking-wide text-[#001A3D] shadow-xl shadow-[#F99D1C]/10 transition-all md:w-fit"
                  >
                    Send Inquiry <Send size={18} />
                  </Motion.button>
                </form>
              </Motion.div>
            </div>

            {/* Side Info - Right Column */}
            <div className="space-y-12 lg:col-span-5">
              <Motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative space-y-12 overflow-hidden rounded-[2rem] bg-[#001A3D] p-6 sm:p-10 text-white md:p-14"
              >
                <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-[#F99D1C]/10 blur-2xl"></div>

                <div className="space-y-6">
                  <h3 className="display-font text-xl font-semibold tracking-tight md:text-2xl">Direct Contact</h3>
                  <div className="space-y-6">
                    <a href="mailto:sales@hutechsolutions.com" className="group flex items-center gap-5 md:gap-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 transition-all duration-300 group-hover:bg-[#F99D1C] group-hover:text-[#001A3D]">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold tracking-wide text-gray-400">Email Us</p>
                        <p className="text-sm font-bold sm:text-base md:text-lg break-all">sales@hutechsolutions.com</p>
                      </div>
                    </a>
                    <a href="tel:+919035180487" className="group flex items-center gap-5 md:gap-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 transition-all duration-300 group-hover:bg-[#F99D1C] group-hover:text-[#001A3D]">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold tracking-wide text-gray-400">Call Us</p>
                        <p className="text-lg font-bold">+91 90351 80487</p>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="space-y-6 border-t border-white/10 pt-10">
                  <h3 className="display-font text-xl font-semibold tracking-tight md:text-2xl">Social Connect</h3>
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {[
                      { icon: <Linkedin size={22} />, label: "LinkedIn", url: "https://www.linkedin.com/company/hutechsolutions/" },
                      { icon: <Instagram size={22} />, label: "Instagram", url: "#" },
                      { icon: <Facebook size={22} />, label: "Facebook", url: "#" },
                      { icon: <Twitter size={22} />, label: "Twitter", url: "#" },
                      { icon: <Youtube size={22} />, label: "YouTube", url: "#" },
                    ].map((item, idx) => (
                      <a
                        key={idx}
                        href={item.url}
                        target={item.url !== "#" ? "_blank" : undefined}
                        rel={item.url !== "#" ? "noopener noreferrer" : undefined}
                        className="group flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 transition-all duration-300 hover:bg-[#F99D1C] hover:text-[#001A3D]"
                        aria-label={item.label}
                      >
                        {item.icon}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 rounded-2xl bg-[#F99D1C] p-8 text-[#001A3D]">
                  <h4 className="text-xs font-semibold tracking-wide">Customer Support</h4>
                  <p className="text-lg leading-snug font-bold">
                    Need technical assistance? Our support desk is active 24/7 for managed service clients.
                  </p>
                  <button className="flex items-center gap-2 border-b-2 border-[#001A3D] pb-1 text-[11px] font-semibold tracking-wide">
                    Support Portal <ChevronRight size={14} />
                  </button>
                </div>
              </Motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence - Offices Grid */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="mx-auto mb-20 max-w-2xl space-y-4 text-center">
            <h2 className="display-font text-3xl font-semibold tracking-tight text-[#001A3D] md:text-5xl">Our Offices</h2>
            <div className="mx-auto h-1 w-16 bg-[#F99D1C]"></div>
            <p className="font-medium text-gray-500">
              Strategically located in the world&apos;s leading technology hubs to serve you better.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {OFFICES.map((office, idx) => (
              <Motion.div
                key={office.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-xl transition-all duration-500 hover:shadow-2xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={office.image}
                    alt={office.city}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#001A3D]/20 transition-colors group-hover:bg-[#001A3D]/40"></div>
                  <div className="absolute bottom-6 left-8">
                    <h3 className="display-font text-2xl font-semibold tracking-tight text-white">{office.city}</h3>
                    <p className="text-[11px] font-semibold tracking-wide text-[#F99D1C]">{office.country}</p>
                  </div>
                </div>
                <div className="space-y-6 p-10">
                  <div className="flex items-start gap-4">
                    <MapPin className="mt-1 shrink-0 text-[#F99D1C]" size={18} />
                    <p className="text-sm leading-relaxed font-medium text-gray-600">{office.address}</p>
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

      {/* World Map Section */}
      <section className="overflow-hidden bg-white py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="relative aspect-[21/9] overflow-hidden rounded-[3rem] bg-[#001A3D]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1731700128691-16fcc9043d11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
              alt="Global Network"
              className="h-full w-full object-cover opacity-40 grayscale"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-[#001A3D] to-transparent p-10 text-center">
              <div className="max-w-2xl space-y-6">
                <Globe className="mx-auto h-16 w-16 animate-pulse text-[#F99D1C]" />
                <h2 className="display-font text-3xl font-semibold tracking-tight text-white md:text-5xl">Worldwide Delivery.</h2>
                <p className="text-lg leading-relaxed font-medium text-gray-300">
                  Supporting clients across 4 continents with our seamless global delivery model and 24/7 engineering capability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Builders */}
      <section className="border-t border-gray-100 py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="flex flex-wrap items-center justify-between gap-10">
            <div className="flex items-center gap-4">
              <CheckCircle2 className="text-[#F99D1C]" size={24} />
              <div>
                <p className="text-[11px] font-semibold tracking-wide text-[#001A3D]">Response Time</p>
                <p className="text-sm font-bold text-gray-500">Under 24 Hours</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Clock className="text-[#F99D1C]" size={24} />
              <div>
                <p className="text-[11px] font-semibold tracking-wide text-[#001A3D]">Global Support</p>
                <p className="text-sm font-bold text-gray-500">24/7 Availability</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Building2 className="text-[#F99D1C]" size={24} />
              <div>
                <p className="text-[11px] font-semibold tracking-wide text-[#001A3D]">Enterprise Scale</p>
                <p className="text-sm font-bold text-gray-500">Fortune 500 Trusted</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
