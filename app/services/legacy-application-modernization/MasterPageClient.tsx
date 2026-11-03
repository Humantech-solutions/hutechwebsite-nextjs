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

export default function MasterPageClient() {
  return (
    <div className="min-h-screen bg-white text-[#101c35]">
      {/* Light breadcrumb bar */}
      <Breadcrumbs variant="light" />

      {/* 1. Hero Section (Section 2 from docx) */}
      <ModernizationHero />

      {/* 2. Introduction: What is Legacy Modernization? & Hutech Approach (Section 3 from docx) */}
      <ModernizationIntro />

      {/* 3. Common Legacy Challenges (Section 4 from docx) */}
      <ModernizationChallenges />

      {/* 4. ⭐ USER REQUESTED SECTION: Modernize by Technology Stack (Links to the 6 inner landing pages) */}
      <LegacyTechGrid />

      {/* 5. Core Modernization Capabilities (Section 5 from docx - CTA button removed as requested) */}
      <ModernizationCapabilities />

      {/* 6. Differentiator: Agentic Development Platform (Section 6 from docx - CTA button removed as requested) */}
      <AgenticPlatformSection />

      {/* 7. Methodology (5 Steps) & The 7 Rs Strategies (Sections 7 & 8 from docx) */}
      <MethodologyAndStrategies />

      {/* 8. Business Outcomes, Industries Served & Why Hutech (Sections 10, 11, & 12 from docx) */}
      <ModernizationOutcomesAndIndustries />

      {/* 9. 15 AEO & SEO FAQs (Section 13 from docx - Styled matching other service pages) */}
      <ModernizationFaq items={MASTER_PAGE_DATA.faqs} />

      {/* 10. Conversion CTA Banner linking directly to /contact */}
      <ModernizationCTA />
    </div>
  );
}
