import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";
import Header from "@/component/Header";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "CatFlip",
  description:
    "CatFlip is a Cat-themed memory card game where you flip cards, match Cat pairs, and beat your high score.",
  icons: {
    icon: "/images/cat-logo.png",
  },
  openGraph: {
    images: "/images/og-image.png",
    title: "CatFlip",
    description:
      "CatFlip is a Cat-themed memory card game where you flip cards, match Cat pairs, and beat your high score.",
    url: "https://cat-flip.vercel.app",
    siteName: "CatFlip",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CatFlip",
    description:
      "CatFlip is a Cat-themed memory card game where you flip cards, match Cat pairs, and beat your high score.",
    images: "/images/og-image.png",
  },
};
const pressStart2P = Press_Start_2P({
  variable: "--font-press-start-2p",
  subsets: ["latin"],
  weight: ["400"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pressStart2P.variable} font-press-start-2p container mx-auto flex min-h-screen flex-col antialiased`}
      >
        <Header />
        {children}
        <Toaster position="top-right" />
        <Analytics />
      </body>
    </html>
  );
}
