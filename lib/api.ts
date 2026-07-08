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

function inferCategory(pageUrl: string, payloadCategory?: string): string {
  const urlLower = pageUrl.toLowerCase();
  const catLower = (payloadCategory || "").toLowerCase();

  if (urlLower.includes("/industries") || catLower.includes("industries")) return "Industries";
  if (urlLower.includes("/solutions") || catLower.includes("solutions")) return "Solutions";
  if (urlLower.includes("/case-studies") || catLower.includes("case study")) return "Case Study";
  if (urlLower.includes("/blogs") || catLower.includes("blog")) return "Blog";
  if (urlLower.includes("/services") || catLower.includes("service")) return "Service";
  if (urlLower.includes("/careers") || catLower.includes("career")) return "Career";
  if (urlLower.includes("/clients") || catLower.includes("client")) return "Client";
  if (catLower.includes("footer")) return "Footer";
  if (urlLower.includes("/contact") || catLower.includes("contact")) return "Contact";
  
  return "Other";
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
    category: inferCategory(pageUrl, payload.category),
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
 * Submits a document download request.
 */
export async function submitDocumentRequest(payload: DocumentRequestPayload): Promise<boolean> {
  const { pageTitle, pageUrl } = getPageMeta("Document Download");

  try {
    const formData = new FormData();
    formData.append("name", clean(payload.name));
    formData.append("email", clean(payload.email));
    formData.append("phone", clean(payload.phone, "N/A"));
    formData.append("documentName", clean(payload.documentTitle));
    formData.append("project", "hutech-solutions");
    formData.append("companyName", "Hutech Solutions");

    // Fetch the document and append as Blob
    if (payload.downloadUrl && payload.downloadUrl !== "#") {
      try {
        const fileRes = await fetch(payload.downloadUrl);
        if (fileRes.ok) {
          const blob = await fileRes.blob();
          const filename = payload.downloadUrl.split("/").pop() || "document.pdf";
          formData.append("document", blob, filename);
        } else {
          console.warn("[API] Failed to fetch document for attachment:", fileRes.status);
        }
      } catch (err) {
        console.warn("[API] Could not attach document:", err);
      }
    }

    const response = await fetch(`${API_BASE_URL}/api/documents/request`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errText = await getErrorMessage(response);
      console.error("[API] Document request submit error response:", response.status, errText);
      throw new Error(errText || `HTTP error! status: ${response.status}`);
    }

    return parseSubmitResponse(response);
  } catch (error) {
    console.error("[API] Document request submit failed:", error);
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

// ─────────────────────────────────────────────────────────
// RecruitPro HR App — Job Listings
// ─────────────────────────────────────────────────────────

const RECRUIT_PRO_API_URL =
  process.env.RECRUIT_PRO_API_URL?.replace(/\/+$/, "") ||
  "https://apis.test-recruitpro.hutechsolutions.in";

const RECRUIT_PRO_COMPANY_ID =
  process.env.RECRUIT_PRO_COMPANY_ID || "4b805074-5fb0-4431-a7a3-30c38682e6c8";

const RECRUIT_PRO_TOKEN = process.env.RECRUIT_PRO_TOKEN || "";

/** Raw shape returned by the RecruitPro API */
export interface RecruitProJob {
  id: string;
  title: string;
  slug: string;
  description: string;
  requirements: string;
  location: string;
  experience: string;
  enabled: boolean;
  createdAt: string;
  createdBy: string;
  createdByName: string;
  companyId: string;
  minCtc: string;
  maxCtc: string;
}

/**
 * Maps a raw RecruitPro job into the site's Job type so no UI changes are needed.
 */
function mapRecruitProJob(raw: RecruitProJob) {
  // Parse description bullets (split on ". " or newlines)
  const descBullets = raw.description
    ? raw.description
        .split(/(?<=[.!?])\s+(?=[A-Z])|\n+/)
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  // Parse requirements bullets
  const reqBullets = raw.requirements
    ? raw.requirements
        .split(/\.\s+(?=[A-Z])|\n+/)
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  // Derive department from title keywords
  const titleLower = raw.title.toLowerCase();
  let department = "Engineering";
  if (titleLower.includes("design") || titleLower.includes("ui") || titleLower.includes("ux"))
    department = "Design";
  else if (titleLower.includes("sales") || titleLower.includes("business"))
    department = "Sales & Business";
  else if (titleLower.includes("data") || titleLower.includes("ai") || titleLower.includes("ml"))
    department = "Data & AI";
  else if (titleLower.includes("devops") || titleLower.includes("cloud") || titleLower.includes("sre"))
    department = "DevOps & Cloud";
  else if (titleLower.includes("manager") || titleLower.includes("lead") || titleLower.includes("senior"))
    department = "Leadership";

  const ctcRange =
    raw.minCtc && raw.maxCtc
      ? `₹${raw.minCtc}L – ₹${raw.maxCtc}L`
      : "";

  return {
    // Core identity — use slug as ID so the URL is human-readable
    id: raw.slug || raw.id,
    title: raw.title,
    department,
    location: raw.location || "Bangalore, India",
    type: "Full-time",
    tags: raw.experience ? [raw.experience, department] : [department],

    // Detail page fields
    desc: raw.description || "",
    roleOverviewTitle: "Role Overview",
    whatYoullDoTitle: "What You'll Do",
    whatYoullDo: descBullets,
    requirementsTitle: "Requirements",
    requirements: reqBullets,
    superpowersTitle: "Your Superpowers",
    superpowers: raw.experience ? [`${raw.experience} of relevant experience`] : [],
    benefitsTitle: "Benefits",
    benefits: [
      "Health Insurance",
      "Provident Fund + Performance Bonus",
      "Maternity + Paternity Leave",
      "Flexible work environment",
      ctcRange ? `CTC Range: ${ctcRange}` : "Competitive compensation",
    ].filter(Boolean),
    hiringTimelineTitle: "Hiring Timeline",
    hiringTimelineText:
      "Our typical hiring process takes 7–14 business days from the first interview to offer letter.",
    aboutTitle: "About Hutech Solutions",
    aboutText:
      "Hutech Solutions is a global software powerhouse at the forefront of the AI revolution. Across data, cloud, and engineering, we help enterprises innovate faster.",
  };
}

/**
 * Fetches all enabled jobs from the RecruitPro HR platform.
 * Falls back to an empty array on any network or parse error.
 */
export async function getRecruitProJobs() {
  try {
    const url = `${RECRUIT_PRO_API_URL}/api/jobs/company/${RECRUIT_PRO_COMPANY_ID}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${RECRUIT_PRO_TOKEN}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 120 }, // ISR: refresh every 2 minutes
    });

    if (!res.ok) {
      console.warn("[RecruitPro] Failed to fetch jobs:", res.status);
      return [];
    }

    const data = await res.json();
    const jobs: RecruitProJob[] = data?.jobs || [];
    return jobs.filter((j) => j.enabled).map(mapRecruitProJob);
  } catch (err) {
    console.warn("[RecruitPro] getRecruitProJobs error:", err);
    return [];
  }
}

/**
 * Finds a single job by slug from the RecruitPro HR platform.
 * Returns null if not found or on error.
 */
export async function getRecruitProJobBySlug(slug: string) {
  try {
    const jobs = await getRecruitProJobs();
    return jobs.find((j) => j.id === slug || j.id === slug) || null;
  } catch (err) {
    console.warn("[RecruitPro] getRecruitProJobBySlug error:", err);
    return null;
  }
}
