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
          <div className="pt-[80px] md:pt-[80px]">
            <Navbar data={siteChrome?.header} />
            <main>{children}</main>
            <Footer data={siteChrome?.footer} />
            <ScrollToTopButton />
            <ChatWidget />
            <CookieBanner />
            <Toaster position="top-right" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
