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
    fullName: '',
    email: '',
    linkedIn: '',
    resume: null as File | null
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
        resume: formData.resume
      });
      setIsSuccess(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to submit application. Please try again.");
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
    setFormData({ fullName: '', email: '', linkedIn: '', resume: null });
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
          className="absolute inset-0 bg-[#001A3D]/80 backdrop-blur-md"
        />

        <Motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Close Button */}
          <button 
            onClick={resetAndClose}
            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-[#001A3D] hover:bg-gray-100 rounded-full transition-all z-20"
          >
            <X size={24} />
          </button>

          {/* Left Side: Info */}
          <div className="hidden md:flex md:w-5/12 bg-[#001A3D] p-10 lg:p-12 text-white flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#0171c1]/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
            
            <div className="relative z-10 space-y-6">
              <div className="w-12 h-12 bg-[#0171c1] rounded-xl flex items-center justify-center shadow-lg shadow-[#0171c1]/20">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold display-font leading-tight">Join Our Team.</h3>
              <p className="text-sm text-white/60 font-medium leading-relaxed">
                Build the future with us. We're looking for passionate individuals to architect cutting-edge solutions.
              </p>
            </div>

            <div className="relative z-10">
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Applying for</div>
              <div className="font-bold text-[#F99D1C] text-lg">{jobTitle}</div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
            {!isSuccess ? (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-[#001A3D] display-font">Application Form</h2>
                  <p className="text-sm text-gray-500 font-medium">Please provide your details below.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name *</label>
                    <input 
                      required 
                      type="text" 
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#0171c1] focus:bg-white transition-all text-[#001A3D] font-medium" 
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address *</label>
                    <input 
                      required 
                      type="email" 
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#0171c1] focus:bg-white transition-all text-[#001A3D] font-medium" 
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">LinkedIn Profile (URL)</label>
                    <input 
                      type="url" 
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#0171c1] focus:bg-white transition-all text-[#001A3D] font-medium" 
                      placeholder="https://linkedin.com/in/..."
                      value={formData.linkedIn}
                      onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Resume / CV *</label>
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
                        className="flex flex-col items-center justify-center w-full px-5 py-8 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#F99D1C] hover:bg-[#F99D1C]/5 transition-all"
                      >
                        <Upload className="mb-2 text-gray-400" size={28} />
                        <p className="text-sm font-medium text-[#001A3D]">
                          {formData.resume ? formData.resume.name : 'Upload PDF or DOCX (Max 5MB)'}
                        </p>
                      </label>
                    </div>
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
                        <>SUBMIT APPLICATION <Send size={16} /></>
                      )}
                    </button>
                  </div>

                  <p className="text-[10px] text-center text-gray-400 font-medium leading-relaxed pt-2">
                    By applying, you agree to our recruitment privacy policy. Hutech is an equal opportunity employer.
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
                   <h2 className="text-3xl font-bold text-[#001A3D] display-font">Application Received!</h2>
                   <p className="text-gray-500 font-medium max-w-sm mx-auto leading-relaxed">
                      Thank you for applying to <span className="font-bold text-[#001A3D]">{jobTitle}</span>. Our team will review your profile and get back to you shortly.
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
