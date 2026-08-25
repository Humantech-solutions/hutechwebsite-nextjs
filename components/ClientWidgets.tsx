"use client";

import React from "react";
import dynamic from "next/dynamic";

const Toaster = dynamic(() => import("sonner").then((m) => m.Toaster), { ssr: false });
const ScrollToTopButton = dynamic(() => import("@/components/ScrollToTopButton").then((m) => m.ScrollToTopButton), { ssr: false });
const ChatWidget = dynamic(() => import("@/components/ChatWidget").then((m) => m.ChatWidget), { ssr: false });
const CookieBanner = dynamic(() => import("@/components/CookieBanner").then((m) => m.CookieBanner), { ssr: false });
const RouteTracker = dynamic(() => import("@/components/RouteTracker").then((m) => m.RouteTracker), { ssr: false });

export function ClientWidgets() {
  return (
    <>
      <RouteTracker />
      <ScrollToTopButton />
      <ChatWidget />
      <CookieBanner />
      <Toaster position="top-right" />
    </>
  );
}
