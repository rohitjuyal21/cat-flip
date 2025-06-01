import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";
import Header from "@/component/Header";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "PokeFlip",
  description:
    "PokeFlip is a Pokémon-themed memory card game where you flip cards, match Pokémon pairs, and beat your high score. Fun, simple, and nostalgic — Gotta match 'em all!",
  icons: {
    icon: "/images/pokeball.png",
  },
  openGraph: {
    images: "/images/og-image.png",
    title: "PokeFlip",
    description:
      "PokeFlip is a Pokémon-themed memory card game where you flip cards, match Pokémon pairs, and beat your high score. Fun, simple, and nostalgic — Gotta match 'em all!",
    url: "https://poke-flip.vercel.app",
    siteName: "PokeFlip",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PokeFlip",
    description:
      "PokeFlip is a Pokémon-themed memory card game where you flip cards, match Pokémon pairs, and beat your high score. Fun, simple, and nostalgic — Gotta match 'em all!",
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
