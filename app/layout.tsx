import { constructMetadata, getSiteSchema } from "@/lib/seo";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteChrome } from "@/lib/wordpress";
import { CookieConsentProvider } from "@/context/CookieConsentProvider";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import { ClientWidgets } from "@/components/ClientWidgets";

export const metadata = constructMetadata();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteChrome = await getSiteChrome();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/manrope/Manrope-VariableFont_wght.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen overflow-x-hidden bg-white font-sans antialiased selection:bg-[#0171c1]/30 selection:text-[#001A3D]"
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T3WQDDTC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(getSiteSchema()) }}
          />

          {/* Google Analytics with lazyOnload to improve TBT and FCP */}
          <Script id="google-consent-defaults" strategy="lazyOnload">{`
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
            strategy="lazyOnload"
          />
          <Script id="google-analytics" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CZ2CW8X92G', {
                send_page_view: true
              });
            `}
          </Script>

          <Script id="google-tag-manager" strategy="lazyOnload">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-T3WQDDTC');
            `}
          </Script>

          {/* ── Cookie Consent Provider wraps everything ── */}
          <CookieConsentProvider>
            <div className="w-full">
              <Navbar data={siteChrome?.header} />
              <main>{children}</main>
              <Footer data={siteChrome?.footer} />
              <ClientWidgets />
            </div>
          </CookieConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
