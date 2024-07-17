import type { Metadata } from "next";
import { Ubuntu_Mono } from "next/font/google";
import "./globals.css";

const ubuntuMono = Ubuntu_Mono({ weight: ['400', '700'], subsets: ["latin"] });

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
      <body className={`${ubuntuMono.className} + min-h-svh bg-[#f5faf5] pt-24 pb-24 relative`}>{children}</body>
    </html>
  );
}
