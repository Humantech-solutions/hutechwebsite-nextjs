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
import { constructMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
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
    .filter((p) => p.slug.length > 0);

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

  // ── Home ─────────────────────────────────────────────────────────────────────
  if (activeTemplate === "home") {
    const data = await getHomePage(uri);
    return <HomePageClient data={data} />;
  }

  // ── About ─────────────────────────────────────────────────────────────────────
  if (
    activeTemplate === "about" ||
    activeTemplate === "template - about" ||
    activeTemplate === "about template"
  ) {
    const data = await getAboutPageData(uri);
    return <AboutClient {...(data ?? {})} />;
  }

  // ── Partnership ───────────────────────────────────────────────────────────────
  if (
    activeTemplate === "partnership" ||
    activeTemplate === "template - partnership" ||
    activeTemplate === "partnership template"
  ) {
    const data = await getPartnershipPageData(uri);
    return <PartnershipClient {...(data ?? {})} />;
  }

  // ── Life at Hutech ────────────────────────────────────────────────────────────
  if (
    activeTemplate === "life" ||
    activeTemplate === "life-at-hutech" ||
    activeTemplate === "life at hutech" ||
    activeTemplate === "life at hutech template"
  ) {
    const data = await getLifeAtHutechPage(uri);
    return <LifeAtHutechClient data={data} />;
  }

  // ── Leadership ────────────────────────────────────────────────────────────────
  if (
    activeTemplate === "leadership" ||
    activeTemplate === "template - leadership" ||
    activeTemplate === "leadership template"
  ) {
    const data = await getLeadershipPageData(uri);
    return <LeadershipClient {...(data ?? {})} />;
  }

  // ── Awards ────────────────────────────────────────────────────────────────────
  if (
    activeTemplate === "awards" ||
    activeTemplate === "template - awards" ||
    activeTemplate === "awards template"
  ) {
    const data = await getAwardsPageData(uri);
    return <AwardsClient {...(data ?? {})} />;
  }

  // ── Vision, Mission & Values ──────────────────────────────────────────────────
  if (
    activeTemplate === "vmv" ||
    activeTemplate === "vision-mission-values" ||
    activeTemplate === "vision mission values" ||
    activeTemplate === "template - vmv"
  ) {
    const data = await getVMVPageData(uri);
    return <VisionMissionValuesClient {...(data ?? {})} />;
  }

  // ── Graduates ─────────────────────────────────────────────────────────────────
  if (
    activeTemplate === "graduates" ||
    activeTemplate === "graduate" ||
    activeTemplate === "template - graduates"
  ) {
    return <GraduatesClient />;
  }

  // ── Contact ───────────────────────────────────────────────────────────────────
  if (activeTemplate === "contact") {
    const data = await getContactPageData();
    return <ContactClient {...(data ?? {})} />;
  }

  // ── Careers ───────────────────────────────────────────────────────────────────
  if (activeTemplate === "careers" || activeTemplate === "career") {
    const pageData = await getCareerPageData();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <CareersClient pageData={pageData as any} jobs={[]} />;
  }

  // ── Services ──────────────────────────────────────────────────────────────────
  if (activeTemplate === "services" || activeTemplate === "service") {
    const [pageData, categories] = await Promise.all([
      getServicePageData(),
      getServiceCategoriesWithServices(),
    ]);
    return <ServicesClient pageData={pageData} serviceCategories={categories} pageTitle={pageData?.title} pageDescription={pageData?.description} />;
  }

  // ── Industries ────────────────────────────────────────────────────────────────
  if (activeTemplate === "industries" || activeTemplate === "industry") {
    const [pageData, industries] = await Promise.all([
      getIndustryPageData(),
      getIndustriesList(),
    ]);
    return <IndustriesClient pageData={pageData} industriesList={industries} />;
  }

  // ── Blogs ────────────────────────────────────────────────────────────────────
  if (activeTemplate === "blogs" || activeTemplate === "blog") {
    const [wpBlogs, wpPageData] = await Promise.all([getBlogs(), getBlogPageData()]);
    const pageTitle = wpPageData?.title || "Insights &|Perspectives.";
    const pageDescription = wpPageData?.description || "Stay ahead of the curve with the latest trends, expert analyses, and technological innovations curated by our global team.";
    return (
      <Suspense>
        <BlogsClient blogs={wpBlogs} pageTitle={pageTitle} pageDescription={pageDescription} bgImageUrl={wpPageData?.bgImageUrl} />
      </Suspense>
    );
  }

  // ── Events ───────────────────────────────────────────────────────────────────
  if (activeTemplate === "events" || activeTemplate === "event") {
    const [wpEvents, wpPageData] = await Promise.all([getEvents(), getEventPageData()]);
    return (
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
    return <CaseStudiesClient caseStudies={wpCaseStudies} pageTitle={pageTitle} pageDescription={pageDescription} bgImageUrl={wpPageData?.bgImageUrl} />;
  }

  // ── News ─────────────────────────────────────────────────────────────────────
  if (activeTemplate === "news") {
    const [wpNews, wpPageData] = await Promise.all([getNewsItems(), getNewsPageData()]);
    return <NewsClient newsItems={wpNews} {...(wpPageData ?? {})} />;
  }

  // ── Press Release ─────────────────────────────────────────────────────────────
  if (activeTemplate === "press-release" || activeTemplate === "press release") {
    const [wpReleases, wpPageData] = await Promise.all([getPressReleases(), getPressReleasePageData()]);
    return <PressReleaseClient releases={wpReleases} {...(wpPageData ?? {})} />;
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
    return <HutechDocumentsClient documents={documents || []} pageData={pageData || fallbackPageData} />;
  }

  // ── Products ──────────────────────────────────────────────────────────────────
  if (activeTemplate === "products" || activeTemplate === "product") {
    return <ProductsClient />;
  }

  // ── Insights ─────────────────────────────────────────────────────────────────
  if (activeTemplate === "insights" || activeTemplate === "insight") {
    return <InsightsClient />;
  }

  // ── Sitemap ──────────────────────────────────────────────────────────────────
  if (activeTemplate === "sitemap" || page.slug === "sitemap" || slug.includes("sitemap")) {
    const sitemapSections = await getSitemapData(uri);
    return <PageClient page={page} sitemapSections={sitemapSections} />;
  }

  // ── Fallback: generic text/legal content page ─────────────────────────────────
  return <PageClient page={page} />;
}
