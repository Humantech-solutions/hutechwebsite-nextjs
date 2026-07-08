"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, Loader2, Send, Upload, Briefcase } from "lucide-react";

import { toast } from "sonner";
import { submitCareerForm } from "@/lib/api";

export interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
}

export function ApplicationModal({ isOpen, onClose, jobTitle }: ApplicationModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    linkedIn: "",
    resume: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.resume) {
      toast.error("Please upload your resume.");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitCareerForm({
        name: formData.fullName,
        email: formData.email,
        linkedin: formData.linkedIn,
        resume: formData.resume,
      });
      setIsSuccess(true);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to submit application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  const resetAndClose = () => {
    setFormData({ fullName: "", email: "", linkedIn: "", resume: null });
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetAndClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-xl"
        />

        <Motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[10px] bg-white shadow-2xl md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={resetAndClose}
            className="absolute right-6 top-6 z-20 rounded-full p-2 text-gray-400 transition-all hover:bg-gray-100 hover:text-[#001A3D]"
          >
            <X size={24} />
          </button>

          {/* Left Side: Info */}
          <div className="relative hidden overflow-hidden md:flex md:w-5/12">
            <img
              src="/images/career-banner.jpg"
              alt="Career"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[#001A3D]/80"></div>
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#0171c1]/30 blur-3xl"></div>
            <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white lg:p-12">
              <div>
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md">
                  <Briefcase className="h-7 w-7 text-[#F99D1C]" />
                </div>
                <h3 className="display-font text-3xl font-bold leading-tight">
                  Shape the
                  <br />
                  Future With Us
                </h3>
                <p className="mt-5 text-sm leading-7 text-white/80">
                  Join a team of innovators building world-class digital experiences. Work on
                  exciting projects, learn from talented professionals, and grow your career with
                  us.
                </p>
              </div>
              <div className="border-t border-white/20 pt-6">
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/60">
                  Applying For
                </p>
                <h4 className="text-md font-bold text-[#F99D1C]">{jobTitle}</h4>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="flex-1 overflow-y-auto p-8 [scrollbar-width:none] lg:p-12">
            {!isSuccess ? (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="display-font text-3xl font-bold text-[#001A3D]">
                    Application Form
                  </h2>
                  <p className="text-sm font-medium text-gray-500">
                    Please provide your details below.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="ml-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded-xl border border-gray-100 bg-gray-50 px-5 py-3.5 font-medium text-[#001A3D] transition-all focus:border-[#0171c1] focus:bg-white focus:outline-none"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      className="w-full rounded-xl border border-gray-100 bg-gray-50 px-5 py-3.5 font-medium text-[#001A3D] transition-all focus:border-[#0171c1] focus:bg-white focus:outline-none"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      LinkedIn Profile (URL)
                    </label>
                    <input
                      type="url"
                      className="w-full rounded-xl border border-gray-100 bg-gray-50 px-5 py-3.5 font-medium text-[#001A3D] transition-all focus:border-[#0171c1] focus:bg-white focus:outline-none"
                      placeholder="LinkedIn Profile"
                      value={formData.linkedIn}
                      onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Resume / CV *
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.docx,.doc"
                        onChange={handleFileChange}
                        className="hidden"
                        id="resume-upload"
                      />
                      <label
                        htmlFor="resume-upload"
                        className="flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-5 py-8 transition-all hover:border-[#F99D1C] hover:bg-[#F99D1C]/5"
                      >
                        <Upload className="mb-2 text-gray-400" size={28} />
                        <p className="text-sm font-medium text-[#001A3D]">
                          {formData.resume ? formData.resume.name : "Upload PDF or DOCX (Max 5MB)"}
                        </p>
                      </label>
                    </div>
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
                          SUBMIT APPLICATION <Send size={16} />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="pt-2 text-center text-[10px] font-medium leading-relaxed text-gray-400">
                    By applying, you agree to our recruitment privacy policy. Hutech is an equal
                    opportunity employer.
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
                    Application Received!
                  </h2>
                  <p className="mx-auto max-w-sm font-medium leading-relaxed text-gray-500">
                    Thank you for applying to{" "}
                    <span className="font-bold text-[#001A3D]">{jobTitle}</span>. Our team will
                    review your profile and get back to you shortly.
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
