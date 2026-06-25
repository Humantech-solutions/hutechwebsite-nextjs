"use client";

import { useState } from "react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { X, Upload, Send } from "lucide-react";

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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
        <Motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-[#001A3D] rounded-2xl p-8 md:p-12 max-h-[90vh] overflow-y-auto hide-scrollbar"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          <div className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-4xl md:text-5xl font-bold text-white display-font">Apply for this role</h2>
              <p className="text-white/60 text-lg">Architect the future with us.</p>
              <div className="text-[#F99D1C] font-bold text-sm tracking-widest uppercase">{jobTitle}</div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <label className="block text-white/40 text-xs font-bold tracking-widest uppercase">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full bg-transparent border-b-2 border-white/20 text-white placeholder-white/30 py-4 px-0 focus:outline-none focus:border-[#F99D1C] transition-colors text-lg"
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <label className="block text-white/40 text-xs font-bold tracking-widest uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full bg-transparent border-b-2 border-white/20 text-white placeholder-white/30 py-4 px-0 focus:outline-none focus:border-[#F99D1C] transition-colors text-lg"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <label className="block text-white/40 text-xs font-bold tracking-widest uppercase">
                  LinkedIn Profile (URL)
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/..."
                  className="w-full bg-transparent border-b-2 border-white/20 text-white placeholder-white/30 py-4 px-0 focus:outline-none focus:border-[#F99D1C] transition-colors text-lg"
                  onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <label className="block text-white/40 text-xs font-bold tracking-widest uppercase">
                  Resume / CV
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
                    className="block border-2 border-dashed border-white/20 rounded-lg p-12 text-center cursor-pointer hover:border-[#F99D1C] transition-colors"
                  >
                    <Upload className="mx-auto mb-4 text-white/40" size={40} />
                    <p className="text-white/60 text-sm">
                      {formData.resume ? formData.resume.name : 'PDF, DOCX (Max 5MB)'}
                    </p>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#F99D1C] hover:bg-[#ff9d00] text-[#001A3D] py-5 rounded-lg font-bold transition-all tracking-widest text-sm shadow-xl flex items-center justify-center gap-3"
              >
                SUBMIT APPLICATION <Send size={18} />
              </button>

              <p className="text-white/40 text-xs text-center leading-relaxed">
                By applying, you agree to our recruitment privacy policy. Hutech is an equal opportunity employer.
              </p>
            </form>
          </div>
        </Motion.div>
      </div>
    </AnimatePresence>
  );
}
