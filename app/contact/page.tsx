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
  Clock
} from "lucide-react";
import { toast } from "sonner";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Meta } from "@/components/Meta";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const BRAND_ORANGE = "#FFAF2B";
const BRAND_BLUE = "#001A3D";

const OFFICES = [
  {
    city: "Bangalore",
    country: "India (HQ)",
    address: "Hutech Solutions Pvt Ltd, Level 4, Prestige Meridian 1, 29 MG Road, Bangalore - 560001",
    phone: "+91 80 4123 4567",
    email: "india.sales@hutechsolutions.com",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=800&auto=format&fit=crop"
  },
  {
    city: "San Jose",
    country: "United States",
    address: "2880 Zanker Road, Suite 203, San Jose, CA 95134",
    phone: "+1 408 123 4567",
    email: "usa.sales@hutechsolutions.com",
    image: "https://images.unsplash.com/photo-1549144511-f099e773c147?q=80&w=800&auto=format&fit=crop"
  },
  {
    city: "Noida",
    country: "India",
    address: "Suite 502, Tower B, Logix Technova, Sector 132, Noida - 201304",
    phone: "+91 120 4123 4567",
    email: "noida@hutechsolutions.com",
    image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=800&auto=format&fit=crop"
  }
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
      <section className="bg-[#001A3D] text-white h-[300px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1771964427867-1b734fc7f5a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920" 
            alt="Corporate Office" 
            className="w-full h-full object-cover opacity-20 scale-105 brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D]/95 via-[#001A3D]/70 to-transparent"></div>
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-[#FFAF2B] to-transparent opacity-90"></div>
        </div>
        
        <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl space-y-3 md:space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="block w-6 md:w-8 h-[2px] bg-[#FFAF2B] shrink-0"></span>
              <span className="text-[#FFAF2B] text-[11px] md:text-[12px] font-semibold tracking-wide uppercase">
                Get in Touch
              </span>
            </div>

            <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight display-font">
              Let's Engineer Your <span className="text-[#FFAF2B]">Next Success.</span>
            </h1>

            <p className="text-gray-200 text-sm md:text-lg font-medium max-w-2xl leading-relaxed opacity-90">
              Consultants ready to discuss your next breakthrough project and digital engineering needs.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Main Content: Form & Offices */}
      <section id="contact-form" className="py-20 bg-white relative z-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Contact Form - Left Column (7 cols) */}
            <div className="lg:col-span-7">
              <Motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font tracking-tight">Send a Message</h2>
                  <p className="text-lg text-gray-500 font-medium">Have a specific project in mind? Our consultants are ready to discuss your requirements.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#001A3D] tracking-wide">Full Name</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="e.g. John Doe"
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-sm focus:outline-none focus:border-[#FFAF2B] focus:ring-1 focus:ring-[#FFAF2B] transition-all font-medium text-[#001A3D]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#001A3D] tracking-wide">Email Address</label>
                      <input 
                        required 
                        type="email" 
                        placeholder="john@company.com"
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-sm focus:outline-none focus:border-[#FFAF2B] focus:ring-1 focus:ring-[#FFAF2B] transition-all font-medium text-[#001A3D]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#001A3D] tracking-wide">Phone Number</label>
                      <input 
                        required 
                        type="tel" 
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-sm focus:outline-none focus:border-[#FFAF2B] focus:ring-1 focus:ring-[#FFAF2B] transition-all font-medium text-[#001A3D]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#001A3D] tracking-wide">Subject</label>
                      <select className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-sm focus:outline-none focus:border-[#FFAF2B] focus:ring-1 focus:ring-[#FFAF2B] transition-all font-medium text-[#001A3D] appearance-none cursor-pointer">
                        <option>New Project Inquiry</option>
                        <option>Partnership Opportunity</option>
                        <option>Career Inquiry</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#001A3D] tracking-wide">Message</label>
                    <textarea 
                      required 
                      rows={6}
                      placeholder="How can we help you?"
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-sm focus:outline-none focus:border-[#FFAF2B] focus:ring-1 focus:ring-[#FFAF2B] transition-all font-medium text-[#001A3D] resize-none"
                    ></textarea>
                  </div>

                  <Motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "#001A3D", color: "#FFAF2B" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full md:w-fit px-12 py-5 bg-[#FFAF2B] text-[#001A3D] font-bold tracking-wide text-sm rounded-sm transition-all shadow-xl shadow-[#FFAF2B]/10 flex items-center justify-center gap-4"
                  >
                    Send Inquiry <Send size={18} />
                  </Motion.button>
                </form>
              </Motion.div>
            </div>

            {/* Side Info - Right Column (5 cols) */}
            <div className="lg:col-span-5 space-y-12">
              <Motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#001A3D] p-10 md:p-14 rounded-[2rem] text-white space-y-12 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFAF2B]/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                
                <div className="space-y-6">
                  <h3 className="text-xl md:text-2xl font-semibold display-font tracking-tight">Direct Contact</h3>
                  <div className="space-y-6">
                    <a href="mailto:info@hutechsolutions.com" className="flex items-center gap-6 group">
                      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-[#FFAF2B] group-hover:text-[#001A3D] transition-all duration-300">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold tracking-wide text-gray-400">Email Us</p>
                        <p className="text-lg font-bold">info@hutechsolutions.com</p>
                      </div>
                    </a>
                    <a href="tel:+918041234567" className="flex items-center gap-6 group">
                      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-[#FFAF2B] group-hover:text-[#001A3D] transition-all duration-300">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold tracking-wide text-gray-400">Call Us</p>
                        <p className="text-lg font-bold">+91 80 4123 4567</p>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="space-y-6 pt-10 border-t border-white/10">
                  <h3 className="text-xl md:text-2xl font-semibold display-font tracking-tight">Social Connect</h3>
                  <div className="flex gap-4">
                    {[
                      { icon: <Linkedin size={22} />, label: "LinkedIn" },
                      { icon: <Twitter size={22} />, label: "Twitter" },
                      { icon: <Youtube size={22} />, label: "YouTube" }
                    ].map((item, idx) => (
                      <a 
                        key={idx} 
                        href="#" 
                        className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-[#FFAF2B] hover:text-[#001A3D] transition-all duration-300 group"
                        aria-label={item.label}
                      >
                        {item.icon}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="bg-[#FFAF2B] p-8 rounded-2xl text-[#001A3D] space-y-4">
                  <h4 className="font-semibold tracking-wide text-xs">Customer Support</h4>
                  <p className="font-bold text-lg leading-snug">Need technical assistance? Our support desk is active 24/7 for managed service clients.</p>
                  <button className="flex items-center gap-2 font-semibold tracking-wide text-[11px] border-b-2 border-[#001A3D] pb-1">
                    Support Portal <ChevronRight size={14} />
                  </button>
                </div>
              </Motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Global Presence - Offices Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#001A3D] display-font tracking-tight">Our Offices</h2>
            <div className="w-16 h-1 bg-[#FFAF2B] mx-auto"></div>
            <p className="text-gray-500 font-medium">Strategically located in the world's leading technology hubs to serve you better.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {OFFICES.map((office, idx) => (
              <Motion.div
                key={office.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                <div className="h-48 overflow-hidden relative">
                  <ImageWithFallback 
                    src={office.image} 
                    alt={office.city} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-[#001A3D]/20 group-hover:bg-[#001A3D]/40 transition-colors"></div>
                  <div className="absolute bottom-6 left-8">
                    <h3 className="text-2xl font-semibold text-white tracking-tight display-font">{office.city}</h3>
                    <p className="text-[#FFAF2B] font-semibold tracking-wide text-[11px]">{office.country}</p>
                  </div>
                </div>
                <div className="p-10 space-y-6">
                  <div className="flex gap-4 items-start">
                    <MapPin className="text-[#FFAF2B] shrink-0 mt-1" size={18} />
                    <p className="text-sm font-medium text-gray-600 leading-relaxed">{office.address}</p>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-4">
                      <Phone className="text-[#FFAF2B]" size={16} />
                      <span className="text-sm font-bold text-[#001A3D]">{office.phone}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Mail className="text-[#FFAF2B]" size={16} />
                      <span className="text-sm font-bold text-[#001A3D]">{office.email}</span>
                    </div>
                  </div>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* World Map Section - Visual Identity */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="relative aspect-[21/9] rounded-[3rem] overflow-hidden bg-[#001A3D]">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1731700128691-16fcc9043d11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920" 
              alt="Global Network" 
              className="w-full h-full object-cover opacity-40 grayscale"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 bg-gradient-to-t from-[#001A3D] to-transparent">
              <div className="space-y-6 max-w-2xl">
                <Globe className="text-[#FFAF2B] mx-auto w-16 h-16 animate-pulse" />
                <h2 className="text-3xl md:text-5xl font-semibold text-white display-font tracking-tight">Worldwide Delivery.</h2>
                <p className="text-lg text-gray-300 font-medium leading-relaxed">
                  Supporting clients across 4 continents with our seamless global delivery model and 24/7 engineering capability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Builders */}
      <section className="py-20 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="flex flex-wrap justify-between items-center gap-10">
            <div className="flex items-center gap-4">
              <CheckCircle2 className="text-[#FFAF2B]" size={24} />
              <div>
                <p className="text-[11px] font-semibold tracking-wide text-[#001A3D]">Response Time</p>
                <p className="text-sm font-bold text-gray-500">Under 24 Hours</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Clock className="text-[#FFAF2B]" size={24} />
              <div>
                <p className="text-[11px] font-semibold tracking-wide text-[#001A3D]">Global Support</p>
                <p className="text-sm font-bold text-gray-500">24/7 Availability</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Building2 className="text-[#FFAF2B]" size={24} />
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
