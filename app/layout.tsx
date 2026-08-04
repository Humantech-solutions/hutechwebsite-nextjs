import { constructMetadata, getSiteSchema } from "@/lib/seo";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "./slick-theme.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteChrome } from "@/lib/wordpress";
import { Toaster } from "sonner";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { ChatWidget } from "@/components/ChatWidget";
import { CookieBanner } from "@/components/CookieBanner";
// import TemporaryPasswordGate from "@/components/TemporaryPasswordGate";
import { RouteTracker } from "@/components/RouteTracker";
import { CookieConsentProvider } from "@/context/CookieConsentProvider";
import Script from "next/script";

export const metadata = constructMetadata();

import { ThemeProvider } from "next-themes";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteChrome = await getSiteChrome();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen overflow-x-hidden bg-white font-sans antialiased selection:bg-[#0171c1]/30 selection:text-[#001A3D]">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(getSiteSchema()) }}
          />

          {/*
           * Google Analytics — loaded via gtag.js.
           * Google Consent Mode v2 defaults are set to "denied" before any
           * user interaction. The CookieConsentProvider calls gtag("consent","update")
           * with the actual preferences as soon as consent is known.
           */}
          <Script id="google-consent-defaults" strategy="beforeInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              analytics_storage:       'granted',
              ad_storage:              'denied',
              ad_user_data:            'denied',
              ad_personalization:      'denied',
              functionality_storage:   'denied',
              personalization_storage: 'denied',
              security_storage:        'granted',
              wait_for_update:         500,
            });
          `}</Script>

          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-CZ2CW8X92G"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CZ2CW8X92G', {
                send_page_view: true,
                debug_mode: true
              });
            `}
          </Script>

          {/* ── Cookie Consent Provider wraps everything ── */}
          <CookieConsentProvider>
            {/* <TemporaryPasswordGate> */}
            <RouteTracker />
            <div className="w-full">
              <Navbar data={siteChrome?.header} />
              <main>{children}</main>
              <Footer data={siteChrome?.footer} />
              <ScrollToTopButton />
              <ChatWidget />
              <CookieBanner />
              <Toaster position="top-right" />
            </div>
            {/* </TemporaryPasswordGate> */}
          </CookieConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
