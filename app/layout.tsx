import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Webask",
  description: "Ask questions about web development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} + min-h-svh bg-[#f5faf5] pt-24 pb-24 relative`}>{children}</body>
    </html>
  );
}
