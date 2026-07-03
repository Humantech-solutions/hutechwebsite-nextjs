/**
 * API integration helpers for submitting contact and career forms.
 * Production API base URL: https://apis.admin.hutechsolutions.in/
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_HUTECH_API_BASE_URL?.replace(/\/+$/, "") ||
  "https://apis.admin.hutechsolutions.in";

const SITE_BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://hutechsolutions.ai";

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

function clean(value: string | undefined | null, fallback = "") {
  const cleaned = value?.trim();
  return cleaned || fallback;
}

function getPageMeta(defaultTitle: string) {
  if (typeof window === "undefined") {
    return {
      pageTitle: defaultTitle,
      pageUrl: SITE_BASE_URL,
    };
  }

  let pageTitle = clean(window.document.title, defaultTitle);
  const currentUrl = new URL(window.location.href);
  const siteUrl = new URL(SITE_BASE_URL);

  if (currentUrl.hostname === "localhost" || currentUrl.hostname === "127.0.0.1") {
    currentUrl.protocol = siteUrl.protocol;
    currentUrl.host = siteUrl.host;
  }

  let pageUrlStr = currentUrl.toString();

  // If we are currently on the contact page, grab the previous page info
  if (currentUrl.pathname.includes('/contact')) {
    const prevUrl = sessionStorage.getItem('hutech_prev_url');
    const prevTitle = sessionStorage.getItem('hutech_prev_title');
    if (prevUrl) pageUrlStr = prevUrl;
    if (prevTitle) pageTitle = prevTitle;
  }

  return {
    pageTitle,
    pageUrl: pageUrlStr,
  };
}

async function getErrorMessage(response: Response) {
  const text = await response.text();

  if (!text) {
    return response.statusText || `HTTP error ${response.status}`;
  }

  try {
    const data = JSON.parse(text) as { message?: string; error?: string };
    return data.message || data.error || text;
  } catch {
    return text;
  }
}

async function parseSubmitResponse(response: Response) {
  const text = await response.text();

  if (!text) {
    return true;
  }

  try {
    const data = JSON.parse(text) as { success?: boolean; message?: string; error?: string };

    if (data.success === false) {
      throw new Error(data.message || data.error || "Submission failed. Please try again.");
    }

    return true;
  } catch (error) {
    if (error instanceof SyntaxError) {
      return true;
    }

    if (error instanceof Error) {
      throw error;
    }

    return true;
  }
}

/**
 * Submits a contact inquiry to the Hutech contact API.
 */
export async function submitContactForm(payload: ContactFormPayload): Promise<boolean> {
  const { pageTitle, pageUrl } = getPageMeta("Contact Us | Hutech Solutions");
  const sourceCategory = clean(payload.category, "Contact");
  const message = clean(payload.message);

  const body = {
    name: clean(payload.name),
    email: clean(payload.email),
    phone: clean(payload.phone, "N/A"),
    subject: clean(payload.subject, "Website Inquiry"),
    message:
      sourceCategory && sourceCategory !== "Contact"
        ? `Form Source: ${sourceCategory}\n${message}`
        : message,
    project: "hutech",
    companyName: "Hutech Solutions",
    category: "Contact",
    pageTitle,
    pageUrl,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/contact/submit`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errText = await getErrorMessage(response);
      console.error("[API] Contact submit error response:", response.status, errText);
      throw new Error(errText || `HTTP error! status: ${response.status}`);
    }

    return parseSubmitResponse(response);
  } catch (error) {
    console.error("[API] Contact submit failed:", error);
    throw error;
  }
}

/**
 * Submits a job application (with resume upload) to the Hutech career API.
 */
export async function submitCareerForm(payload: CareerFormPayload): Promise<boolean> {
  const { pageTitle, pageUrl } = getPageMeta("Careers - Hutech Solutions");

  const formData = new FormData();
  formData.append("name", clean(payload.name));
  formData.append("email", clean(payload.email));
  formData.append("linkedin", clean(payload.linkedin));
  formData.append("pageTitle", pageTitle);
  formData.append("pageUrl", pageUrl);
  formData.append("project", "hutech");
  formData.append("companyName", "Hutech Solutions");
  formData.append("resume", payload.resume);

  try {
    const response = await fetch(`${API_BASE_URL}/api/career/apply`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errText = await getErrorMessage(response);
      console.error("[API] Career submit error response:", response.status, errText);
      throw new Error(errText || `HTTP error! status: ${response.status}`);
    }

    return parseSubmitResponse(response);
  } catch (error) {
    console.error("[API] Career submit failed:", error);
    throw error;
  }
}
