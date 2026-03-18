import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { ChatWidget } from "@/components/ChatWidget";
import { CookieBanner } from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: "Hutech Solutions",
  description: "Innovation through Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-white font-sans overflow-x-hidden selection:bg-[#0171c1]/30 selection:text-[#001A3D]">
        <div className="pt-[80px] md:pt-[80px]">
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
          <ScrollToTopButton />
          <ChatWidget />
          <CookieBanner />
          <Toaster position="top-right" />
        </div>
      </body>
    </html>
  );
}
