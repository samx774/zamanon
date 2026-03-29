import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://the-paramedics.org"),
  title: {
    default: "DealTop - Latest Products & Best Deals",
    template: "%s | DealTop",
  },
  description:
    "Find the best deals on laptops, desktops, monitors, and tech accessories. Curated Amazon product recommendations.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "DealTop",
    title: "DealTop - Latest Products & Best Deals",
    description:
      "Find the best deals on laptops, desktops, monitors, and tech accessories.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DealTop - Latest Products & Best Deals",
    description:
      "Find the best deals on laptops, desktops, monitors, and tech accessories.",
  },
  keywords: [
    "laptops",
    "desktops",
    "monitors",
    "tech deals",
    "amazon deals",
    "computer deals",
    "best price",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Analytics />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
