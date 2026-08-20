import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import { getSiteUrl } from "@/lib/utils/site-url";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nyaama — Find Your Way",
    template: "%s · Nyaama",
  },
  description:
    "Too many paths, no clear direction. Nyaama is an AI career coach for young Gambians — one direction, a roadmap, and something real to build.",
  metadataBase: new URL(getSiteUrl()),
  openGraph: {
    title: "Nyaama — Find Your Way",
    description:
      "Discover the technology path that fits you, follow a clear roadmap, and start building real skills.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-navy text-text">
        {children}
      </body>
    </html>
  );
}
