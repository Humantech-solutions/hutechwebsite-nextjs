"use client";

import { motion as Motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, Loader2, Send, Calendar } from "lucide-react";
import { useState } from "react";

import { toast } from "sonner";
import { submitContactForm } from "@/lib/api";

export interface RegisterEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
}

export function RegisterEventModal({ isOpen, onClose, eventTitle }: RegisterEventModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const resetAndClose = () => {
    if (isSubmitting) return;
    setIsSuccess(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);

    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const emailVal = formData.get("email") as string;
    const organization = formData.get("organization") as string;
    const jobTitleVal = formData.get("jobTitle") as string;

    try {
      await submitContactForm({
        name,
        email: emailVal,
        phone: "N/A",
        subject: `Event Registration: ${eventTitle}`,
        message: `Registered for event. Company: ${organization}, Title: ${jobTitleVal}`,
        category: "Event Registration",
      });
      setIsSuccess(true);
      form.reset();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
        {/* Backdrop */}
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetAndClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-xl"
        />

        {/* Modal Content */}
        <Motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[10px] bg-white shadow-2xl md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={resetAndClose}
            disabled={isSubmitting}
            className="absolute right-6 top-6 z-20 rounded-full p-2 text-gray-400 transition-all hover:bg-gray-100 hover:text-[#001A3D]"
          >
            <X size={24} />
          </button>

          {/* Left Side: Info */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-[#001A3D] p-10 text-white md:flex md:w-5/12 lg:p-12">
            <img
              src="/images/registration-banner.avif"
              alt="Career"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[#001A3D]/80"></div>
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#0171c1]/30 blur-3xl"></div>
            <div className="relative z-10 space-y-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0171c1] shadow-lg shadow-[#0171c1]/20">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="display-font text-3xl font-bold leading-tight">
                Join the Conversation.
              </h3>
              <p className="text-sm font-medium leading-relaxed text-white/60">
                Secure your spot at Hutech's premier technology event. Network with industry leaders
                and experts.
              </p>
            </div>

            <div className="relative z-10 border-t border-white/20 pt-6">
              <div className="mb-2 text-xs uppercase tracking-[0.2em] text-white/60">
                Event Selection
              </div>
              <div className="text-md font-bold text-[#F99D1C]">{eventTitle}</div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="flex-1 overflow-y-auto p-8 [scrollbar-width:none] lg:p-12">
            {!isSuccess ? (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="display-font text-3xl font-bold text-[#001A3D]">Register Now</h2>
                  <p className="text-sm font-medium text-gray-500">
                    Please fill in your details to confirm your attendance.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="ml-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        name="name"
                        className="w-full rounded-xl border border-gray-100 bg-gray-50 px-5 py-3.5 font-medium text-[#001A3D] transition-all focus:border-[#0171c1] focus:bg-white focus:outline-none"
                        placeholder="Full Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="ml-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        Corporate Email *
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        className="w-full rounded-xl border border-gray-100 bg-gray-50 px-5 py-3.5 font-medium text-[#001A3D] transition-all focus:border-[#0171c1] focus:bg-white focus:outline-none"
                        placeholder="Corporate Email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Organization / Company *
                    </label>
                    <input
                      required
                      type="text"
                      name="organization"
                      className="w-full rounded-xl border border-gray-100 bg-gray-50 px-5 py-3.5 font-medium text-[#001A3D] transition-all focus:border-[#0171c1] focus:bg-white focus:outline-none"
                      placeholder="Organization"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Job Title *
                    </label>
                    <select
                      name="jobTitle"
                      className="w-full cursor-pointer appearance-none rounded-xl border border-gray-100 bg-gray-50 px-5 py-3.5 font-medium text-[#001A3D] transition-all focus:border-[#0171c1] focus:bg-white focus:outline-none"
                    >
                      <option>Senior Executive</option>
                      <option>Engineering Manager</option>
                      <option>Lead Architect</option>
                      <option>Product Manager</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="pt-4">
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#0171c1] py-4 text-[11px] font-black uppercase tracking-[0.15em] text-white shadow-xl shadow-[#0171c1]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#001A3D] disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> PROCESSING...
                        </>
                      ) : (
                        <>
                          CONFIRM REGISTRATION <Send size={16} />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="pt-2 text-center text-[10px] font-medium leading-relaxed text-gray-400">
                    By registering, you agree to Hutech's Privacy Policy and terms of service
                    regarding event attendance.
                  </p>
                </form>
              </div>
            ) : (
              <Motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full flex-col items-center justify-center space-y-6 py-12 text-center"
              >
                <div className="mb-2 flex h-24 w-24 items-center justify-center rounded-full bg-green-50 shadow-inner">
                  <CheckCircle2 className="h-12 w-12 text-green-500" />
                </div>
                <div className="space-y-3">
                  <h2 className="display-font text-3xl font-bold text-[#001A3D]">
                    Registration Successful!
                  </h2>
                  <p className="mx-auto max-w-sm font-medium leading-relaxed text-gray-500">
                    A confirmation email with your event pass and calendar invite has been sent to
                    your inbox.
                  </p>
                </div>
                <button
                  onClick={resetAndClose}
                  className="mt-4 rounded-xl bg-[#001A3D] px-10 py-4 text-[11px] font-black uppercase tracking-widest text-white shadow-lg transition-all hover:bg-[#F99D1C] hover:text-[#001A3D]"
                >
                  Close Window
                </button>
              </Motion.div>
            )}
          </div>
        </Motion.div>
      </div>
    </AnimatePresence>
  );
}
