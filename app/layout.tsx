import type { Metadata } from "next";
import { Geist, Geist_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";
import Header from "@/component/Header";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PokeFlip",
  description:
    "PokeFlip is a Pokémon-themed memory card game where you flip cards, match Pokémon pairs, and beat your high score. Fun, simple, and nostalgic — Gotta match 'em all!",
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
        className={`${geistSans.variable} ${geistMono.variable} ${pressStart2P.variable} font-press-start-2p container mx-auto flex min-h-screen flex-col antialiased`}
      >
        <Header />
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
