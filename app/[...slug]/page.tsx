import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPageByUri,
  getAllPageUris,
  getAboutPageData,
  getPartnershipPageData,
  getLifeAtHutechPage,
  getLeadershipPageData,
  getAwardsPageData,
  getVMVPageData,
  getHomePage,
  getContactPageData,
  getCareerPageData,
  getCareers,
  getServicePageData,
  getServiceCategoriesWithServices,
  getIndustryPageData,
  getIndustriesList,
  getBlogs,
  getBlogPageData,
  getEvents,
  getEventPageData,
  getCaseStudies,
  getCaseStudyPageData,
  getNewsItems,
  getNewsPageData,
  getPressReleases,
  getPressReleasePageData,
  getHutechDocuments,
  getDocumentPageData,
  getSitemapData,
} from "@/lib/wordpress";
import { Suspense } from "react";
import PageClient from "./PageClient";
import AboutClient from "@/app/about/AboutClient";
import PartnershipClient from "@/app/company/partnership/PartnershipClient";
import LifeAtHutechClient from "@/app/company/life-at-hutech/PageClient";
import LeadershipClient from "@/app/company/leadership/LeadershipClient";
import AwardsClient from "@/app/company/awards/AwardsClient";
import VisionMissionValuesClient from "@/app/company/vision-mission-values/VisionMissionValuesClient";
import GraduatesClient from "@/app/company/graduates/PageClient";
import HomePageClient from "@/app/HomePageClient";
import ContactClient from "@/app/contact/ContactClient";
import CareersClient from "@/app/careers/CareersClient";
import ServicesClient from "@/app/services/PageClient";
import IndustriesClient from "@/app/industries/PageClient";
import BlogsClient from "@/app/resources/blogs/BlogsClient";
import EventsClient from "@/app/resources/events/EventsClient";
import CaseStudiesClient from "@/app/resources/case-studies/CaseStudiesClient";
import NewsClient from "@/app/company/news/NewsClient";
import PressReleaseClient from "@/app/company/press-release/PressReleaseClient";
import HutechDocumentsClient from "@/app/resources/hutech-documents/HutechDocumentsClient";
import ProductsClient from "@/app/products/PageClient";
import InsightsClient from "@/app/resources/insights/PageClient";
import { constructMetadata, getWebPageSchema } from "@/lib/seo";
import { getRecruitProJobs } from "@/lib/api";
import { JOBS } from "@/lib/data/careers";
import { fallbackCareerPageData } from "@/app/careers/page";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

const DEDICATED_COMPANY_SLUGS = new Set([
  "leadership",
  "awards",
  "vision-mission-values",
  "partnership",
  "life-at-hutech",
  "news",
  "press-release",
  "graduates",
  "open-positions",
  "case-studies",
  "hutech-documents",
]);

const TOP_LEVEL_DEDICATED_SLUGS = new Set([
  "home",
  "about",
  "careers",
  "contact",
  "services",
  "industries",
  "products",
  "blogs",
  "events",
  "resources",
  "company",
  "legal",
]);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug.length === 1 && (DEDICATED_COMPANY_SLUGS.has(slug[0]) || slug[0] === "home")) {
    return constructMetadata({ title: "Page Not Found | Hutech Solutions" });
  }

  if (slug.length === 1 && slug[0] === "careers") {
    const pageData = await getCareerPageData();
    return constructMetadata({
      title: "Careers | Hutech Solutions",
      description:
        pageData?.heroDesc ||
        "Join our talent ecosystem. We're recruiting pioneers to solve complex engineering puzzles and architect the future of digital solutions.",
      path: "/careers/",
    });
  }

  const uri = "/" + slug.join("/") + "/";
  const page = await getPageByUri(uri);
  if (!page) {
    return constructMetadata({ title: "Page Not Found | Hutech Solutions" });
  }

  const excerpt = page.content
    ? page.content.replace(/<[^>]+>/g, "").slice(0, 150) + "..."
    : `${page.title} | Hutech Solutions`;

  return constructMetadata({
    title: `${page.title} | Hutech Solutions`,
    description: excerpt,
    path: uri,
  });
}

export async function generateStaticParams() {
  const pages = await getAllPageUris();

  const params = pages
    .map((page) => {
      const slugArray = page.uri.split("/").filter(Boolean);
      return { slug: slugArray };
    })
    .filter((p) => p.slug.length > 0)
    .filter(
      (p) =>
        !(
          p.slug.length === 1 &&
          (DEDICATED_COMPANY_SLUGS.has(p.slug[0]) || TOP_LEVEL_DEDICATED_SLUGS.has(p.slug[0]))
        )
    );

  if (params.length === 0) {
    return [
      { slug: ["legal", "privacy"] },
      { slug: ["legal", "terms"] },
    ];
  }

  return params;
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;

  // Pages under company or resources belong exclusively under /company/... or /resources/...
  // Entering root URLs like /leadership must show 404
  if (slug.length === 1 && (DEDICATED_COMPANY_SLUGS.has(slug[0]) || slug[0] === "home")) {
    notFound();
  }

  const uri = "/" + slug.join("/") + "/";
  const page = await getPageByUri(uri);

  if (!page) {
    notFound();
  }

  // Resolve which template to render based on:
  // 1. ACF Page Routing Settings (nextjsTemplate field) — preferred
  // 2. WordPress native page template name — fallback
  const templateName = page.templateName || "Default";
  let acfTemplate = page.pageRoutingSettings?.nextjsTemplate;
  if (Array.isArray(acfTemplate)) acfTemplate = acfTemplate[0];
  const activeTemplate = (acfTemplate || templateName).toLowerCase().trim();


  const schemaJsonData = getWebPageSchema({
    title: (page as any).title,
    description: (page as any).content ? (page as any).content.replace(/<[^>]+>/g, "").slice(0, 150) + "..." : `${(page as any).title} | Hutech Solutions`,
    path: uri,
  });

  let renderedComponent = null;

  // ── Home ─────────────────────────────────────────────────────────────────────
  if (activeTemplate === "home") {
    const data = await getHomePage(uri);
    renderedComponent = <HomePageClient data={data} />;
  }

  // ── About ─────────────────────────────────────────────────────────────────────
  if (
    activeTemplate === "about" ||
    activeTemplate === "template - about" ||
    activeTemplate === "about template"
  ) {
    const data = await getAboutPageData(uri);
    renderedComponent = <AboutClient {...(data ?? {})} />;
  }

  // ── Partnership ───────────────────────────────────────────────────────────────
  if (
    activeTemplate === "partnership" ||
    activeTemplate === "template - partnership" ||
    activeTemplate === "partnership template"
  ) {
    const data = await getPartnershipPageData(uri);
    renderedComponent = <PartnershipClient {...(data ?? {})} />;
  }

  // ── Life at Hutech ────────────────────────────────────────────────────────────
  if (
    activeTemplate === "life" ||
    activeTemplate === "life-at-hutech" ||
    activeTemplate === "life at hutech" ||
    activeTemplate === "life at hutech template"
  ) {
    const data = await getLifeAtHutechPage(uri);
    renderedComponent = <LifeAtHutechClient data={data} />;
  }

  // ── Leadership ────────────────────────────────────────────────────────────────
  if (
    activeTemplate === "leadership" ||
    activeTemplate === "template - leadership" ||
    activeTemplate === "leadership template"
  ) {
    const data = await getLeadershipPageData(uri);
    renderedComponent = <LeadershipClient {...(data ?? {})} />;
  }

  // ── Awards ────────────────────────────────────────────────────────────────────
  if (
    activeTemplate === "awards" ||
    activeTemplate === "template - awards" ||
    activeTemplate === "awards template"
  ) {
    const data = await getAwardsPageData(uri);
    renderedComponent = <AwardsClient {...(data ?? {})} />;
  }

  // ── Vision, Mission & Values ──────────────────────────────────────────────────
  if (
    activeTemplate === "vmv" ||
    activeTemplate === "vision-mission-values" ||
    activeTemplate === "vision mission values" ||
    activeTemplate === "template - vmv"
  ) {
    const data = await getVMVPageData(uri);
    renderedComponent = <VisionMissionValuesClient {...(data ?? {})} />;
  }

  // ── Graduates ─────────────────────────────────────────────────────────────────
  if (
    activeTemplate === "graduates" ||
    activeTemplate === "graduate" ||
    activeTemplate === "template - graduates"
  ) {
    renderedComponent = <GraduatesClient />;
  }

  // ── Contact ───────────────────────────────────────────────────────────────────
  if (activeTemplate === "contact") {
    const data = await getContactPageData();
    renderedComponent = <ContactClient {...(data ?? {})} />;
  }

  // ── Careers ───────────────────────────────────────────────────────────────────
  if (
    activeTemplate === "careers" ||
    activeTemplate === "career" ||
    page.slug === "careers" ||
    (slug.length === 1 && slug[0] === "careers")
  ) {
    const [recruitProJobs, wpJobs, pageData] = await Promise.all([
      getRecruitProJobs(),
      getCareers(),
      getCareerPageData(),
    ]);
    const mergedJobs = [...recruitProJobs, ...wpJobs];
    const jobs = mergedJobs.length > 0 ? mergedJobs : JOBS;
    renderedComponent = <CareersClient pageData={pageData || fallbackCareerPageData} jobs={jobs} />;
  }

  // ── Services ──────────────────────────────────────────────────────────────────
  if (activeTemplate === "services" || activeTemplate === "service") {
    const [pageData, categories] = await Promise.all([
      getServicePageData(),
      getServiceCategoriesWithServices(),
    ]);
    renderedComponent = <ServicesClient pageData={pageData} serviceCategories={categories} pageTitle={pageData?.title} pageDescription={pageData?.description} />;
  }

  // ── Industries ────────────────────────────────────────────────────────────────
  if (activeTemplate === "industries" || activeTemplate === "industry") {
    const [pageData, industries] = await Promise.all([
      getIndustryPageData(),
      getIndustriesList(),
    ]);
    renderedComponent = <IndustriesClient pageData={pageData} industriesList={industries} />;
  }

  // ── Blogs ────────────────────────────────────────────────────────────────────
  if (activeTemplate === "blogs" || activeTemplate === "blog") {
    const [wpBlogs, wpPageData] = await Promise.all([getBlogs(), getBlogPageData()]);
    const pageTitle = wpPageData?.title || "Insights &|Perspectives.";
    const pageDescription = wpPageData?.description || "Stay ahead of the curve with the latest trends, expert analyses, and technological innovations curated by our global team.";
    renderedComponent = (
      <Suspense>
        <BlogsClient blogs={wpBlogs} pageTitle={pageTitle} pageDescription={pageDescription} bgImageUrl={wpPageData?.bgImageUrl} />
      </Suspense>
    );
  }

  // ── Events ───────────────────────────────────────────────────────────────────
  if (activeTemplate === "events" || activeTemplate === "event") {
    const [wpEvents, wpPageData] = await Promise.all([getEvents(), getEventPageData()]);
    renderedComponent = (
      <EventsClient
        events={wpEvents}
        pageTitle={wpPageData?.title}
        pageDescription={wpPageData?.description}
        bgImageUrl={wpPageData?.bgImageUrl}
      />
    );
  }

  // ── Case Studies ─────────────────────────────────────────────────────────────
  if (activeTemplate === "case-studies" || activeTemplate === "case studies" || activeTemplate === "casestudies") {
    const [wpCaseStudies, wpPageData] = await Promise.all([getCaseStudies(), getCaseStudyPageData()]);
    const pageTitle = wpPageData?.title || "Success |Stories.";
    const pageDescription = wpPageData?.description || "Discover how we've helped leading organizations transform their businesses with innovative technology solutions.";
    renderedComponent = <CaseStudiesClient caseStudies={wpCaseStudies} pageTitle={pageTitle} pageDescription={pageDescription} bgImageUrl={wpPageData?.bgImageUrl} />;
  }

  // ── News ─────────────────────────────────────────────────────────────────────
  if (activeTemplate === "news") {
    const [wpNews, wpPageData] = await Promise.all([getNewsItems(), getNewsPageData()]);
    renderedComponent = <NewsClient newsItems={wpNews} {...(wpPageData ?? {})} />;
  }

  // ── Press Release ─────────────────────────────────────────────────────────────
  if (activeTemplate === "press-release" || activeTemplate === "press release") {
    const [wpReleases, wpPageData] = await Promise.all([getPressReleases(), getPressReleasePageData()]);
    renderedComponent = <PressReleaseClient releases={wpReleases} {...(wpPageData ?? {})} />;
  }

  // ── Hutech Documents ──────────────────────────────────────────────────────────
  if (activeTemplate === "hutech-documents" || activeTemplate === "hutech documents") {
    const [documents, pageData] = await Promise.all([getHutechDocuments(), getDocumentPageData()]);
    const fallbackPageData = {
      heroTagline: "Resource Library",
      heroTitle: "Hutech ^Documents.",
      heroDesc: "Access official publications, corporate reports, and technical whitepapers.",
      ctaTitle: "Need custom documentation?",
      ctaDesc: "Our specialized teams can provide tailored technical whitepapers and architecture documentation for your enterprise needs.",
      ctaBtnText: "REQUEST ACCESS",
      ctaBtnUrl: "/contact",
    };
    renderedComponent = <HutechDocumentsClient documents={documents || []} pageData={pageData || fallbackPageData} />;
  }

  // ── Products ──────────────────────────────────────────────────────────────────
  if (activeTemplate === "products" || activeTemplate === "product") {
    renderedComponent = <ProductsClient />;
  }

  // ── Insights ─────────────────────────────────────────────────────────────────
  if (activeTemplate === "insights" || activeTemplate === "insight") {
    renderedComponent = <InsightsClient />;
  }

  // ── Sitemap ──────────────────────────────────────────────────────────────────
  if (activeTemplate === "sitemap" || page.slug === "sitemap" || slug.includes("sitemap")) {
    const sitemapSections = await getSitemapData(uri);
    renderedComponent = <PageClient page={page} sitemapSections={sitemapSections} />;
  }

  // ── Fallback: only render if page has actual text/legal content ───────────────
  if (page.content && page.content.replace(/<[^>]+>/g, "").trim().length > 0) {
    renderedComponent = <PageClient page={page} />;
  }




  if (renderedComponent) {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonData) }} />
        {renderedComponent}
      </>
    );
  }

  // If page has no matching template and no content exists, trigger 404
  notFound();
}
