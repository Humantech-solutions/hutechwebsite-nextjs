"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, Loader2, Send, FileText } from "lucide-react";
import { toast } from "sonner";
import { submitDocumentRequest } from "@/lib/api";

export interface DownloadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentTitle: string;
  downloadUrl: string;
}

export function DownloadFormModal({
  isOpen,
  onClose,
  documentTitle,
  downloadUrl,
}: DownloadFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const resetAndClose = () => {
    if (isSubmitting) return;
    setFormData({ name: "", email: "", phone: "" });
    setIsSuccess(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitDocumentRequest({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        documentTitle,
        downloadUrl,
      });
      setIsSuccess(true);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send the link. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
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
            disabled={isSubmitting}
            className="absolute right-6 top-6 z-20 rounded-full p-2 text-gray-400 transition-all hover:bg-gray-100 hover:text-[#001A3D]"
          >
            <X size={24} />
          </button>

          {/* Left Side: Info */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-[#001A3D] p-10 text-white md:flex md:w-5/12 lg:p-12">
            <img
              src="/images/resource-banner.avif"
              alt="Download Resources"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[#001A3D]/80"></div>
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#0171c1]/30 blur-3xl"></div>
            <div className="relative z-10 space-y-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0171c1] shadow-lg shadow-[#0171c1]/20">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="display-font text-3xl font-bold leading-tight">Access Resources.</h3>
              <p className="text-sm font-medium leading-relaxed text-white/60">
                Unlock premium insights, whitepapers, and guides tailored for digital
                transformation.
              </p>
            </div>
            <div className="relative z-10 border-t border-white/20 pt-6">
              <div className="mb-2 text-xs uppercase tracking-[0.2em] text-white/60">
                Requesting Document
              </div>
              <div className="text-md font-bold text-[#F99D1C]">{documentTitle}</div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="flex-1 overflow-y-auto p-8 [scrollbar-width:none] lg:p-12">
            {!isSuccess ? (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="display-font text-3xl font-bold text-[#001A3D]">
                    Get your download link
                  </h2>
                  <p className="text-sm font-medium text-gray-500">
                    We'll send the document directly to your inbox.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <label className="ml-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded-xl border border-gray-100 bg-gray-50 px-5 py-3.5 font-medium text-[#001A3D] transition-all focus:border-[#0171c1] focus:bg-white focus:outline-none"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      className="w-full rounded-xl border border-gray-100 bg-gray-50 px-5 py-3.5 font-medium text-[#001A3D] transition-all focus:border-[#0171c1] focus:bg-white focus:outline-none"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
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
                          SEND DOWNLOAD LINK <Send size={16} />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="pt-2 text-center text-[10px] font-medium leading-relaxed text-gray-400">
                    We respect your privacy. Your information will not be shared with third parties.
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
                  <h2 className="display-font text-3xl font-bold text-[#001A3D]">Link Sent!</h2>
                  <p className="mx-auto max-w-sm font-medium leading-relaxed text-gray-500">
                    The download link for{" "}
                    <span className="font-bold text-[#001A3D]">{documentTitle}</span> has been sent
                    to your email. Please check your inbox.
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
