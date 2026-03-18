"use client";

import { motion as Motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";

interface RegisterEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
}

export function RegisterEventModal({ isOpen, onClose, eventTitle }: RegisterEventModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#001A3D]/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <Motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-[2.5rem] bg-white shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-8 right-8 z-20 rounded-full p-2 text-gray-400 transition-all hover:bg-gray-100 hover:text-[#001A3D]"
            >
              <X size={24} />
            </button>

            <div className="flex h-full flex-col md:flex-row">
              {/* Left Side: Info */}
              <div className="relative hidden flex-col justify-between overflow-hidden bg-[#001A3D] p-12 text-white md:flex md:w-1/3">
                <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-[#0171c1]/20 blur-3xl"></div>

                <div className="relative z-10 space-y-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0171c1]">
                    <Send className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="display-font text-2xl leading-tight font-bold">
                    Join the Conversation.
                  </h3>
                  <p className="text-sm leading-relaxed font-medium text-white/60">
                    Secure your spot at Hutech's premier technology event.
                  </p>
                </div>

                <div className="relative z-10">
                  <div className="mb-2 text-[10px] font-bold tracking-widest text-white/40 uppercase">
                    Event Selection
                  </div>
                  <div className="font-bold text-[#FFAF2B]">{eventTitle}</div>
                </div>
              </div>

              {/* Right Side: Form */}
              <div className="flex-1 p-8 md:p-12">
                {!isSuccess ? (
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <h2 className="display-font text-3xl font-bold text-[#001A3D]">
                        Register Now
                      </h2>
                      <p className="text-sm font-medium text-gray-500 italic">
                        Please fill in your details to confirm your attendance.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="space-y-2">
                          <label className="ml-1 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                            Full Name
                          </label>
                          <input
                            required
                            type="text"
                            className="w-full rounded-lg border border-gray-100 bg-gray-50 px-5 py-3.5 font-medium text-[#001A3D] transition-all focus:border-[#0171c1] focus:bg-white focus:outline-none"
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="ml-1 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                            Corporate Email
                          </label>
                          <input
                            required
                            type="email"
                            className="w-full rounded-lg border border-gray-100 bg-gray-50 px-5 py-3.5 font-medium text-[#001A3D] transition-all focus:border-[#0171c1] focus:bg-white focus:outline-none"
                            placeholder="john@company.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="ml-1 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                          Organization / Company
                        </label>
                        <input
                          required
                          type="text"
                          className="w-full rounded-lg border border-gray-100 bg-gray-50 px-5 py-3.5 font-medium text-[#001A3D] transition-all focus:border-[#0171c1] focus:bg-white focus:outline-none"
                          placeholder="Acme Corp"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="ml-1 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                          Job Title
                        </label>
                        <select className="w-full cursor-pointer appearance-none rounded-lg border border-gray-100 bg-gray-50 px-5 py-3.5 font-medium text-[#001A3D] transition-all focus:border-[#0171c1] focus:bg-white focus:outline-none">
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
                          className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#0171c1] py-5 text-[11px] font-black tracking-[0.2em] text-white uppercase shadow-xl transition-all duration-500 hover:bg-[#001A3D] disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" /> Processing...
                            </>
                          ) : (
                            "Confirm Registration"
                          )}
                        </button>
                      </div>

                      <p className="text-center text-[9px] leading-relaxed font-bold tracking-widest text-gray-400 uppercase">
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
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#FFAF2B]/10">
                      <CheckCircle2 className="h-10 w-10 text-[#FFAF2B]" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="display-font text-3xl font-bold text-[#001A3D]">
                        Registration Successful!
                      </h2>
                      <p className="mx-auto max-w-xs font-medium text-gray-500">
                        A confirmation email with your event pass and calendar invite has been sent
                        to your inbox.
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="rounded-sm border-2 border-[#001A3D] px-10 py-4 text-[11px] font-black tracking-widest text-[#001A3D] uppercase transition-all hover:bg-[#001A3D] hover:text-white"
                    >
                      Close Window
                    </button>
                  </Motion.div>
                )}
              </div>
            </div>
          </Motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
