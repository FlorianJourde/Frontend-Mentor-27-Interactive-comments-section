import type { Metadata } from "next";
import { Ubuntu_Mono } from "next/font/google";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ weight: ['400', '700'], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Webask",
  description: "Renseigne-toi sur le développement web !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} + min-h-svh bg-[#f8f3e9] pt-12 pb-12 relative`}>{children}</body>
    </html>
  );
}
