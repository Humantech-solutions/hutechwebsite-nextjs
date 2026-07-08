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
      toast.error(error instanceof Error ? error.message : "Registration failed. Please try again.");
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
          className="absolute inset-0 bg-[#001A3D]/80 backdrop-blur-md"
        />

        {/* Modal Content */}
        <Motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Close Button */}
          <button 
            onClick={resetAndClose}
            disabled={isSubmitting}
            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-[#001A3D] hover:bg-gray-100 rounded-full transition-all z-20"
          >
            <X size={24} />
          </button>

          {/* Left Side: Info */}
          <div className="hidden md:flex md:w-5/12 bg-[#001A3D] p-10 lg:p-12 text-white flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#0171c1]/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
            
            <div className="relative z-10 space-y-6">
              <div className="w-12 h-12 bg-[#0171c1] rounded-xl flex items-center justify-center shadow-lg shadow-[#0171c1]/20">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold display-font leading-tight">Join the Conversation.</h3>
              <p className="text-sm text-white/60 font-medium leading-relaxed">
                Secure your spot at Hutech's premier technology event. Network with industry leaders and experts.
              </p>
            </div>

            <div className="relative z-10">
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Event Selection</div>
              <div className="font-bold text-[#F99D1C] text-lg">{eventTitle}</div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
            {!isSuccess ? (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-[#001A3D] display-font">Register Now</h2>
                  <p className="text-sm text-gray-500 font-medium">Please fill in your details to confirm your attendance.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name *</label>
                      <input 
                        required 
                        type="text" 
                        name="name"
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#0171c1] focus:bg-white transition-all text-[#001A3D] font-medium" 
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Corporate Email *</label>
                      <input 
                        required 
                        type="email" 
                        name="email"
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#0171c1] focus:bg-white transition-all text-[#001A3D] font-medium" 
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Organization / Company *</label>
                    <input 
                      required 
                      type="text" 
                      name="organization"
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#0171c1] focus:bg-white transition-all text-[#001A3D] font-medium" 
                      placeholder="Acme Corp"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Job Title *</label>
                    <select name="jobTitle" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#0171c1] focus:bg-white transition-all text-[#001A3D] font-medium appearance-none cursor-pointer">
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
                      className="w-full py-4 bg-[#0171c1] text-white rounded-xl font-black uppercase tracking-[0.15em] text-[11px] hover:bg-[#001A3D] hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-[#0171c1]/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> PROCESSING...</>
                      ) : (
                        <>CONFIRM REGISTRATION <Send size={16} /></>
                      )}
                    </button>
                  </div>

                  <p className="text-[10px] text-center text-gray-400 font-medium leading-relaxed pt-2">
                    By registering, you agree to Hutech's Privacy Policy and terms of service regarding event attendance.
                  </p>
                </form>
              </div>
            ) : (
              <Motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12"
              >
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-2 shadow-inner">
                   <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <div className="space-y-3">
                   <h2 className="text-3xl font-bold text-[#001A3D] display-font">Registration Successful!</h2>
                   <p className="text-gray-500 font-medium max-w-sm mx-auto leading-relaxed">
                      A confirmation email with your event pass and calendar invite has been sent to your inbox.
                   </p>
                </div>
                <button 
                  onClick={resetAndClose}
                  className="mt-4 px-10 py-4 bg-[#001A3D] text-white font-black uppercase tracking-widest text-[11px] hover:bg-[#F99D1C] hover:text-[#001A3D] transition-all rounded-xl shadow-lg"
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
