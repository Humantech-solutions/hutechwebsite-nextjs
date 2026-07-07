"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { motion as Motion } from "framer-motion";
import { MessageSquare, FileText, Sparkles, MoveRight } from "lucide-react";
import { toast } from "sonner";

import { submitContactForm } from "@/lib/api";

interface FormState {
  name: string;
  email: string;
  phone: string;
  requirements: string;
}

export function ServiceDetailContactCTA() {
  const pathname = usePathname() || "";
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    requirements: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic content config mapping based on the active service page URL path
  const getServiceConfig = (path: string) => {
    const defaults = {
      serviceName: "Digital Transformation",
      heading: "Share Your Digital Transformation Project With Us",
      placeholder: "Tell us about your project requirements",
      step1: "A technology consultant will review your request and contact you within a few business hours.",
      step2: "We will schedule a discovery session to understand your business goals and technical requirements.",
      step3: "You will receive a tailored solution proposal including architecture, timeline, and cost estimation.",
    };

    if (path.includes("/services/cloud-transformation")) {
      return {
        serviceName: "Cloud Transformation",
        heading: "Share Your Cloud Transformation Project With Us",
        placeholder: "Tell us about your infrastructure needs",
        step1: "A cloud technology consultant will review your request and contact you within a few business hours.",
        step2: "We will schedule a deep-dive session to understand your current infrastructure and modernization goals.",
        step3: "You will receive a detailed proposal including technical architecture and cloud ROI analysis.",
      };
    }
    if (path.includes("/services/ai-ml")) {
      return {
        serviceName: "AI/ML Solutions",
        heading: "Share Your AI/ML Project With Us",
        placeholder: "Tell us about your AI/ML requirements",
        step1: "An AI/ML technology consultant will review your request and contact you within a few business hours.",
        step2: "We will schedule a discovery session to understand your business goals and data readiness.",
        step3: "You will receive a tailored solution proposal including modeling approach, timeline, and cost estimation.",
      };
    }
    if (path.includes("/services/cybersecurity")) {
      return {
        serviceName: "Cybersecurity",
        heading: "Share Your Cybersecurity Project With Us",
        placeholder: "Tell us about your security and compliance requirements",
        step1: "A security consultant will review your request and contact you within a few business hours.",
        step2: "We will schedule a discovery session to assess your current security posture and requirements.",
        step3: "You will receive a tailored solution proposal including risk mitigation steps, timeline, and cost estimation.",
      };
    }
    if (path.includes("/services/data-engineering")) {
      return {
        serviceName: "Data Engineering",
        heading: "Share Your Data Engineering Project With Us",
        placeholder: "Tell us about your data pipeline and warehouse requirements",
        step1: "A data consultant will review your request and contact you within a few business hours.",
        step2: "We will schedule a discovery session to understand your data sources and architecture goals.",
        step3: "You will receive a tailored solution proposal including pipeline design, timeline, and cost estimation.",
      };
    }
    if (path.includes("/services/data-visualization-reporting")) {
      return {
        serviceName: "Data Visualization & Reporting",
        heading: "Share Your Data Visualization Project With Us",
        placeholder: "Tell us about your reporting and dashboard needs",
        step1: "A BI consultant will review your request and contact you within a few business hours.",
        step2: "We will schedule a discovery session to understand your reporting metrics and source databases.",
        step3: "You will receive a tailored solution proposal including dashboard layouts, timeline, and cost estimation.",
      };
    }
    if (path.includes("/services/devops")) {
      return {
        serviceName: "DevOps & SRE",
        heading: "Share Your DevOps & SRE Project With Us",
        placeholder: "Tell us about your CI/CD, automation, or reliability needs",
        step1: "A DevOps consultant will review your request and contact you within a few business hours.",
        step2: "We will schedule a discovery session to analyze your current deployment pipeline and operations.",
        step3: "You will receive a tailored solution proposal including automation strategy, timeline, and cost estimation.",
      };
    }
    if (path.includes("/services/ecommerce")) {
      return {
        serviceName: "Ecommerce Development",
        heading: "Share Your Ecommerce Project With Us",
        placeholder: "Tell us about your online store or marketplace requirements",
        step1: "An ecommerce consultant will review your request and contact you within a few business hours.",
        step2: "We will schedule a discovery session to understand your products, target audience, and platform preferences.",
        step3: "You will receive a tailored solution proposal including platform selection, timeline, and cost estimation.",
      };
    }
    if (path.includes("/services/fintech")) {
      return {
        serviceName: "Fintech & Banking",
        heading: "Share Your Fintech & Banking Project With Us",
        placeholder: "Tell us about your payment, banking, or fintech requirements",
        step1: "A fintech consultant will review your request and contact you within a few business hours.",
        step2: "We will schedule a discovery session to review compliance, security, and transaction requirements.",
        step3: "You will receive a tailored solution proposal including compliance path, timeline, and cost estimation.",
      };
    }
    if (path.includes("/services/iot")) {
      return {
        serviceName: "IoT Solutions",
        heading: "Share Your IoT Project With Us",
        placeholder: "Tell us about your connected devices or hardware integration needs",
        step1: "An IoT consultant will review your request and contact you within a few business hours.",
        step2: "We will schedule a discovery session to understand your device fleet, protocols, and data endpoints.",
        step3: "You will receive a tailored solution proposal including hardware/software architecture, timeline, and cost estimation.",
      };
    }
    if (path.includes("/services/ai-consulting")) {
      return {
        serviceName: "AI Consulting",
        heading: "Share Your AI Consulting Project With Us",
        placeholder: "Tell us about your prompt engineering or generative AI requirements",
        step1: "An AI strategist will review your request and contact you within a few business hours.",
        step2: "We will schedule a discovery session to map your business processes to AI/LLM opportunities.",
        step3: "You will receive a tailored solution proposal including proof-of-concept design, timeline, and cost estimation.",
      };
    }
    if (path.includes("/services/application-development-maintenance")) {
      return {
        serviceName: "Application Development",
        heading: "Share Your Application Development Project With Us",
        placeholder: "Tell us about your software development or maintenance needs",
        step1: "A software delivery consultant will review your request and contact you within a few business hours.",
        step2: "We will schedule a discovery session to discuss your scope, tech stack, and legacy code base.",
        step3: "You will receive a tailored solution proposal including execution roadmap, timeline, and cost estimation.",
      };
    }
    if (path.includes("/services/erp")) {
      return {
        serviceName: "Enterprise Digital Solutions",
        heading: "Share Your Enterprise Project With Us",
        placeholder: "Tell us about your ERP, integration, or custom business software needs",
        step1: "An enterprise consultant will review your request and contact you within a few business hours.",
        step2: "We will schedule a discovery session to understand your operational workflows and integration touchpoints.",
        step3: "You will receive a tailored solution proposal including systems architecture, timeline, and cost estimation.",
      };
    }
    if (path.includes("/services/consulting")) {
      return {
        serviceName: "Technology Consulting",
        heading: "Share Your Consulting Project With Us",
        placeholder: "Tell us about your technology strategy or advisory requirements",
        step1: "A technology consultant will review your request and contact you within a few business hours.",
        step2: "We will schedule a discovery session to analyze your current technology challenges and business targets.",
        step3: "You will receive a tailored solution proposal including strategic recommendations, timeline, and cost estimation.",
      };
    }

    return defaults;
  };

  const config = getServiceConfig(pathname);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `Inquiry for ${config.serviceName}`,
        message: formData.requirements,
        category: `Service Consultation: ${config.serviceName}`,
      });
      toast.success("Thank you! Your project request has been submitted successfully. A consultant will contact you shortly.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        requirements: "",
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to submit request. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] py-[80px] md:py-[100px] border-t border-gray-150" aria-label="Project Consultation Form">
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          
          {/* Left Column: Contact Form Card */}
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100/50"
          >
            <h3 className="display-font text-2xl md:text-3xl font-bold tracking-tight text-[#001A3D] mb-8 leading-[1.25]">
              {config.heading}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email Field Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name*"
                    aria-label="Name"
                    className="w-full rounded-sm border border-gray-200 bg-gray-50/50 px-5 py-3.5 text-sm font-medium text-[#001A3D] placeholder-gray-400 transition-all focus:border-[#F99D1C] focus:bg-white focus:ring-1 focus:ring-[#F99D1C] focus:outline-none"
                  />
                </div>
                <div className="relative">
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email*"
                    aria-label="Email"
                    className="w-full rounded-sm border border-gray-200 bg-gray-50/50 px-5 py-3.5 text-sm font-medium text-[#001A3D] placeholder-gray-400 transition-all focus:border-[#F99D1C] focus:bg-white focus:ring-1 focus:ring-[#F99D1C] focus:outline-none"
                  />
                </div>
              </div>

              {/* Phone Number Field */}
              <div className="relative">
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number*"
                  aria-label="Phone Number"
                  className="w-full rounded-sm border border-gray-200 bg-gray-50/50 px-5 py-3.5 text-sm font-medium text-[#001A3D] placeholder-gray-400 transition-all focus:border-[#F99D1C] focus:bg-white focus:ring-1 focus:ring-[#F99D1C] focus:outline-none"
                />
              </div>

              {/* Tell us about requirements */}
              <div className="relative">
                <textarea
                  required
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  placeholder={config.placeholder}
                  aria-label="Project Requirements"
                  rows={4}
                  className="w-full resize-none rounded-sm border border-gray-200 bg-gray-50/50 px-5 py-3.5 text-sm font-medium text-[#001A3D] placeholder-gray-400 transition-all focus:border-[#F99D1C] focus:bg-white focus:ring-1 focus:ring-[#F99D1C] focus:outline-none h-32"
                />
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <Motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex items-center justify-center rounded-sm bg-[#F99D1C] text-[#001A3D] px-10 py-5 text-[11px] font-black tracking-[0.2em] uppercase shadow-xl shadow-[#F99D1C]/15 transition-all hover:bg-[#ff9d00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F99D1C] focus-visible:ring-offset-2 w-full sm:w-auto cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Project Request"}
                  <MoveRight className="ml-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </Motion.button>
              </div>
            </form>
          </Motion.div>

          {/* Right Column: "What Is The Next Step?" Block */}
          <Motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-10"
          >
            <h3 className="display-font text-3xl font-bold tracking-tight text-[#001A3D] leading-tight mb-8">
              What Is The Next Step?
            </h3>

            <div className="space-y-8 md:space-y-10">
              {/* Step 1 */}
              <div className="flex items-start gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-[#0171c1]/5 text-[#0171c1] shadow-sm">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <p className="text-gray-500 font-medium text-sm sm:text-base leading-relaxed pt-2">
                  {config.step1}
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-[#0171c1]/5 text-[#0171c1] shadow-sm">
                  <FileText className="h-5 w-5" />
                </div>
                <p className="text-gray-500 font-medium text-sm sm:text-base leading-relaxed pt-2">
                  {config.step2}
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-[#0171c1]/5 text-[#0171c1] shadow-sm">
                  <Sparkles className="h-5 w-5" />
                </div>
                <p className="text-gray-500 font-medium text-sm sm:text-base leading-relaxed pt-2">
                  {config.step3}
                </p>
              </div>
            </div>
          </Motion.div>

        </div>
      </div>
    </section>
  );
}
