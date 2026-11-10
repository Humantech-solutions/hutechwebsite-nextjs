"use client";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ModernizationHero } from "@/components/modernization/ModernizationHero";
import { ModernizationIntro } from "@/components/modernization/ModernizationIntro";
import { ModernizationChallenges } from "@/components/modernization/ModernizationChallenges";
import { ModernizationCapabilities } from "@/components/modernization/ModernizationCapabilities";
import { LegacyTechGrid } from "@/components/modernization/LegacyTechGrid";
import { AgenticPlatformSection } from "@/components/modernization/AgenticPlatformSection";
import { MethodologyAndStrategies } from "@/components/modernization/MethodologyAndStrategies";
import { ModernizationOutcomesAndIndustries } from "@/components/modernization/ModernizationOutcomesAndIndustries";
import { ModernizationFaq } from "@/components/modernization/ModernizationFaq";
import { ModernizationCTA } from "@/components/modernization/ModernizationCTA";
import { MASTER_PAGE_DATA } from "@/lib/data/legacy-modernization";

export default function MasterPageClient({ data }: { data?: any }) {
  const d = data || MASTER_PAGE_DATA;

  return (
    <div className="min-h-screen bg-white text-[#101c35]">
      {/* Light breadcrumb bar */}
      <Breadcrumbs variant="light" />

      {/* 1. Hero Section */}
      <ModernizationHero data={d.hero} />

      {/* 2. Introduction */}
      <ModernizationIntro data={d.intro} />

      {/* 3. Common Legacy Challenges */}
      <ModernizationChallenges
        data={d.challenges}
        tagline={d.challengesTagline}
        heading={d.challengesHeading}
        description={d.challengesDescription}
      />

      {/* 4. Modernize by Technology Stack */}
      <LegacyTechGrid
        data={d.technologies}
        tagline={d.techGridTagline}
        heading={d.techGridHeading}
        description={d.techGridDescription}
      />

      {/* 5. Core Modernization Capabilities */}
      <ModernizationCapabilities
        data={d.capabilities}
        tagline={d.capabilitiesTagline}
        heading={d.capabilitiesHeading}
        description={d.capabilitiesDescription}
      />

      {/* 6. Differentiator: Agentic Development Platform */}
      <AgenticPlatformSection data={d.platform} />

      {/* 7. Methodology (5 Steps) & The 7 Rs Strategies */}
      <MethodologyAndStrategies
        data={d.methodology}
        strategies={d.strategies}
        methodologyHeading={d.methodologyHeading}
        strategiesHeading={d.strategiesHeading}
      />

      {/* 8. Business Outcomes, Industries Served & Why Hutech */}
      <ModernizationOutcomesAndIndustries
        benefits={d.businessBenefits}
        industries={d.industries}
        whyChoose={d.whyChooseHutech}
        benefitsHeading={d.benefitsHeading}
        industriesHeading={d.industriesHeading}
        whyHeading={d.whyHeading}
      />

      {/* 9. FAQs */}
      <ModernizationFaq items={d.faqs || MASTER_PAGE_DATA.faqs} heading={d.faqsHeading} />

      {/* 10. Conversion CTA Banner */}
      <ModernizationCTA data={d.cta} />
    </div>
  );
}
