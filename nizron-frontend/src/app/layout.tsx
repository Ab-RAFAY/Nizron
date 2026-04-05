import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/providers";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

import GlobalBackground from "@/components/home/global-background";

export const metadata: Metadata = {
  title: "Nizron IT Solutions | Professional & Creative IT Services",
  description: "Next-generation IT solutions for modern businesses. Specializing in Web Development, Mobile Apps, and Enterprise ERP systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-body bg-[#080a0f] relative overflow-x-hidden">
        <GlobalBackground />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
