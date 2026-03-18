"use client";

import { useEffect } from "react";

interface MetaProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

export function Meta({
  title = "Hutech Solutions | Advanced Engineering & Digital Transformation",
  description = "Hutech Solutions delivers premium AI/ML, Cloud Transformation, SRE & DevOps, and Fintech solutions to help enterprises scale with agility and resilience.",
  keywords = "AI/ML Solutions, Digital Transformation, Cloud Services, DevOps, SRE, Fintech Development, Ecommerce Solutions, Hutech Solutions",
  ogImage = "https://hutechsolutions.com/og-image.jpg", // Placeholder
}: MetaProps) {
  useEffect(() => {
    // Update Title
    document.title = title;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    // Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute("content", keywords);

    // Update Open Graph tags
    const ogTags = [
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: ogImage },
      { property: "og:type", content: "website" },
    ];

    ogTags.forEach((tag) => {
      let element = document.querySelector(`meta[property="${tag.property}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("property", tag.property);
        document.head.appendChild(element);
      }
      element.setAttribute("content", tag.content);
    });
  }, [title, description, keywords, ogImage]);

  return null;
}
