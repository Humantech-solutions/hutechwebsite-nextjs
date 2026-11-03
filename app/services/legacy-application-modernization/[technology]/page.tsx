import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/seo";
import TechDetailClient from "./TechDetailClient";
import {
  LEGACY_TECHNOLOGY_PAGES,
  LegacyTechDetail,
} from "@/lib/data/legacy-modernization";

export const revalidate = 0;

// Aliases for slug resolution
const SLUG_ALIASES: Record<string, string> = {
  java: "legacy-java-application-modernization",
  "legacy-java": "legacy-java-application-modernization",
  "legacy-java-application-modernization": "legacy-java-application-modernization",

  dotnet: "legacy-dotnet-application-modernization",
  net: "legacy-dotnet-application-modernization",
  "legacy-net": "legacy-dotnet-application-modernization",
  "legacy-net-application-modernization": "legacy-dotnet-application-modernization",
  "legacy-dotnet": "legacy-dotnet-application-modernization",
  "legacy-dotnet-application-modernization": "legacy-dotnet-application-modernization",

  php: "legacy-php-application-modernization",
  "legacy-php": "legacy-php-application-modernization",
  "legacy-php-application-modernization": "legacy-php-application-modernization",

  ruby: "legacy-ruby-on-rails-application-modernization",
  "ruby-on-rails": "legacy-ruby-on-rails-application-modernization",
  "legacy-ruby-on-rail": "legacy-ruby-on-rails-application-modernization",
  "legacy-ruby-on-rail-application-modernization": "legacy-ruby-on-rails-application-modernization",
  "legacy-ruby-on-rails": "legacy-ruby-on-rails-application-modernization",
  "legacy-ruby-on-rails-application-modernization": "legacy-ruby-on-rails-application-modernization",

  cobol: "legacy-cobol-application-modernization",
  "legacy-cobol": "legacy-cobol-application-modernization",
  "legacy-cobol-application-modernization": "legacy-cobol-application-modernization",

  python: "legacy-python-application-modernization",
  "legacy-python": "legacy-python-application-modernization",
  "legacy-python-application-modernization": "legacy-python-application-modernization",
};

function getTechData(slug: string): LegacyTechDetail | null {
  const resolvedKey = SLUG_ALIASES[slug.toLowerCase()] || slug;
  return LEGACY_TECHNOLOGY_PAGES[resolvedKey] || null;
}

export async function generateStaticParams() {
  const slugs = Object.keys(LEGACY_TECHNOLOGY_PAGES);
  return slugs.map((slug) => ({ technology: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ technology: string }>;
}) {
  const { technology } = await params;
  const tech = getTechData(technology);

  if (!tech) {
    return constructMetadata({
      title: "Technology Modernization | Hutech Solutions",
      description: "AI-Powered legacy technology modernization and cloud migration services.",
      path: `/services/legacy-application-modernization/${technology}/`,
    });
  }

  return constructMetadata({
    title: `${tech.name} Services | AI-Powered Migration | Hutech Solutions`,
    description: tech.heroSubtitle,
    path: `/services/legacy-application-modernization/${tech.slug}/`,
    keywords: [
      tech.name,
      `${tech.shortName} Modernization`,
      `Legacy ${tech.shortName} Migration`,
      `Modernize ${tech.shortName}`,
      "AI-Powered Code Transformation",
      "Cloud Migration Services",
      "Agentic AI Development",
      ...tech.legacyStack.slice(0, 4),
      ...tech.targetStack.slice(0, 4),
    ],
  });
}

export default async function TechnologyModernizationPage({
  params,
}: {
  params: Promise<{ technology: string }>;
}) {
  const { technology } = await params;
  const tech = getTechData(technology);

  if (!tech) {
    notFound();
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: tech.name,
    description: tech.heroSubtitle,
    provider: {
      "@type": "Organization",
      name: "Hutech Solutions",
      url: "https://hutechsolutions.ai",
    },
    serviceType: "Legacy Application Modernization",
    areaServed: "Global",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tech.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
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
      {
        "@type": "ListItem",
        position: 4,
        name: tech.name,
        item: `https://hutechsolutions.ai/services/legacy-application-modernization/${tech.slug}/`,
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
      <TechDetailClient tech={tech} />
    </>
  );
}
