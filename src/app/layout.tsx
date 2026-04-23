import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap"
});

const body = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap"
});

export const viewport: Viewport = {
  themeColor: "#1A2332",
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://fileninja.cloud"
  ),
  title: "Fileninja — The simple way to send your stuff",
  description:
    "Send large files securely. Up to 5 GB free, unlimited on Pro. Built for creators, curated by artists.",
  openGraph: {
    title: "Fileninja",
    description: "The simple way to send your stuff.",
    url: "https://fileninja.cloud",
    siteName: "Fileninja",
    images: ["/logo.png"],
    locale: "en_US",
    type: "website"
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans bg-brand-bg text-brand-ink antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
