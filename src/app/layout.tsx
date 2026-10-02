import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";

import "./globals.css";

const serif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Oriel",
    template: "%s — Oriel",
  },
  description:
    "Oriel is a small contemporary gallery. See the current exhibition, look through the works, and keep a shortlist for your visit.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
