/**
 * API Integration helpers for submitting contact and career forms.
 * Production API Base URL: https://apis.admin.hutechsolutions.in/
 */

const BASE_URL = "https://apis.admin.hutechsolutions.in";

export interface ContactFormPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  category?: string;
}

export interface CareerFormPayload {
  name: string;
  email: string;
  linkedin: string;
  resume: File;
}

/**
 * Submits a contact inquiry to the Hutech contact API.
 */
export async function submitContactForm(payload: ContactFormPayload): Promise<boolean> {
  const pageTitle = typeof window !== "undefined" ? window.document.title : "";
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  const body = {
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    subject: payload.subject,
    message: payload.message,
    project: "hutech",
    companyName: "Hutech Solutions",
    category: payload.category || "Contact",
    pageTitle: pageTitle,
    pageUrl: pageUrl,
  };

  try {
    const response = await fetch(`${BASE_URL}/api/contact/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[API] Contact submit error response:", errText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("[API] Contact submit failed:", error);
    throw error;
  }
}

/**
 * Submits a job application (with resume upload) to the Hutech career API.
 */
export async function submitCareerForm(payload: CareerFormPayload): Promise<boolean> {
  const pageTitle = typeof window !== "undefined" ? window.document.title : "Careers — Hutech Solutions";
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("email", payload.email);
  formData.append("linkedin", payload.linkedin);
  formData.append("pageTitle", pageTitle);
  formData.append("pageUrl", pageUrl);
  formData.append("project", "hutech");
  formData.append("companyName", "Hutech Solutions");
  formData.append("resume", payload.resume);

  try {
    const response = await fetch(`${BASE_URL}/api/career/apply`, {
      method: "POST",
      body: formData, // Browser automatically sets dynamic multipart/form-data boundary
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[API] Career submit error response:", errText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("[API] Career submit failed:", error);
    throw error;
  }
}
