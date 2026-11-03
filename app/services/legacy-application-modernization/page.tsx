import { constructMetadata } from "@/lib/seo";
import MasterPageClient from "./MasterPageClient";
import { MASTER_PAGE_DATA } from "@/lib/data/legacy-modernization";

export const metadata = constructMetadata({
  title: MASTER_PAGE_DATA.meta.title,
  description: MASTER_PAGE_DATA.meta.description,
  path: MASTER_PAGE_DATA.meta.url,
  keywords: [
    "Legacy Application Modernization",
    "AI-Powered Legacy Application Modernization",
    "Legacy System Modernization Services",
    "AI-Driven Application Modernization",
    "Agentic AI Application Modernization",
    "Legacy Software Modernization",
    "Enterprise Application Modernization",
    "Legacy Code Modernization",
    "AI-Powered Code Transformation",
    "Cloud Application Modernization",
    "Legacy to Cloud Migration",
    "Application Reengineering Services",
    "Agentic AI Software Development Platform",
    "Java Modernization",
    ".NET Modernization",
    "COBOL Modernization",
    "PHP Modernization",
    "Python Modernization",
    "Ruby on Rails Modernization",
  ],
});

export const revalidate = 0;

export default function LegacyApplicationModernizationPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI-Powered Legacy Application Modernization Services",
    description: MASTER_PAGE_DATA.meta.description,
    provider: {
      "@type": "Organization",
      name: "Hutech Solutions",
      url: "https://hutechsolutions.ai",
    },
    serviceType: "Software Engineering & Legacy Modernization",
    areaServed: "Global",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Legacy Application Modernization Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Legacy Java Application Modernization",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Legacy .NET Application Modernization",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Legacy PHP Application Modernization",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Legacy Ruby on Rails Application Modernization",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Legacy COBOL Application Modernization",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Legacy Python Application Modernization",
          },
        },
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: MASTER_PAGE_DATA.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://hutechsolutions.ai/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://hutechsolutions.ai/services/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Legacy Application Modernization",
        item: "https://hutechsolutions.ai/services/legacy-application-modernization/",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <MasterPageClient />
    </>
  );
}
