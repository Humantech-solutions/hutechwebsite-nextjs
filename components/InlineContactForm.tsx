"use client";

import { useState } from "react";
import { toast } from "sonner";
import { submitContactForm } from "@/lib/api";

interface InlineContactFormProps {
  textareaPlaceholder: string;
  category: string;
  submitButtonText?: string;
}

export function InlineContactForm({
  textareaPlaceholder,
  category,
  submitButtonText = "Submit Project Request",
}: InlineContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    try {
      await submitContactForm({
        name,
        email,
        phone,
        subject: `Project Request: ${category}`,
        message,
        category,
      });
      toast.success("Thank you! Your project request has been submitted successfully.");
      e.currentTarget.reset();
    } catch (error) {
      toast.error("Failed to submit request. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <input
        required
        type="text"
        name="name"
        placeholder="Name*"
        className="w-full border border-gray-200 p-4 text-sm font-medium transition-all outline-none focus:border-[#0171c1]"
      />
      <input
        required
        type="email"
        name="email"
        placeholder="Email*"
        className="w-full border border-gray-200 p-4 text-sm font-medium transition-all outline-none focus:border-[#0171c1]"
      />
      <input
        required
        type="tel"
        name="phone"
        placeholder="Phone Number*"
        className="w-full border border-gray-200 p-4 text-sm font-medium transition-all outline-none focus:border-[#0171c1] md:col-span-2"
      />
      <textarea
        required
        name="message"
        placeholder={textareaPlaceholder}
        rows={4}
        className="w-full resize-none border border-gray-200 p-4 text-sm font-medium transition-all outline-none focus:border-[#0171c1] md:col-span-2"
      ></textarea>
      <div className="md:col-span-2">
        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full rounded-sm bg-[#F99D1C] px-12 py-5 text-[11px] font-bold tracking-wider text-[#001A3D] uppercase shadow-xl transition-all duration-500 hover:bg-[#001A3D] hover:text-white md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : submitButtonText}
        </button>
      </div>
    </form>
  );
}
