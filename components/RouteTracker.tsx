"use client";

import { useEffect } from "react";

export function RouteTracker() {
  useEffect(() => {
    // 1. Clear on hard reload or initial direct load of the contact page.
    if (window.location.pathname.toLowerCase().includes("/contact")) {
      const navEntries = window.performance.getEntriesByType("navigation");
      if (navEntries.length > 0 && (navEntries[0] as PerformanceNavigationTiming).type === "reload") {
        sessionStorage.removeItem("hutech_prev_url");
        sessionStorage.removeItem("hutech_prev_title");
      }
    }

    // 2. Globally listen for clicks on any link pointing to /contact
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Find the closest anchor tag
      const link = target.closest("a");
      
      if (link && link.href && link.href.toLowerCase().includes("/contact")) {
        // If the link is inside a nav, header, or footer, it's a generic menu link.
        // The user DOES NOT want to capture source data for these generic links.
        const isGenericNav = !!link.closest("header") || !!link.closest("nav") || !!link.closest("footer");
        
        if (isGenericNav) {
          sessionStorage.removeItem("hutech_prev_url");
          sessionStorage.removeItem("hutech_prev_title");
        } else {
          // Otherwise, it's a specific button within the page content (e.g. Service page CTA).
          sessionStorage.setItem("hutech_prev_url", window.location.href);
          sessionStorage.setItem("hutech_prev_title", document.title);
        }
      }
    };

    // Use capture phase so we can intercept before any React router preventDefault happens
    document.addEventListener("click", handleGlobalClick, true);

    return () => {
      document.removeEventListener("click", handleGlobalClick, true);
    };
  }, []);

  return null;
}
