import { constructMetadata, getSiteSchema } from "@/lib/seo";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "./slick-theme.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { ChatWidget } from "@/components/ChatWidget";
import { CookieBanner } from "@/components/CookieBanner";

export const metadata = constructMetadata();

import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen overflow-x-hidden bg-white font-sans antialiased selection:bg-[#0171c1]/30 selection:text-[#001A3D]">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(getSiteSchema()) }}
          />
          <div className="pt-[80px] md:pt-[80px]">
            <Navbar />
            <main>{children}</main>
            <Footer />
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
