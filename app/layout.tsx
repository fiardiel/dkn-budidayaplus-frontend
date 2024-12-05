import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics } from '@next/third-parties/google'
import Navbar from "@/components/ui/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BudidayaPlus",
  description: "A simple web app for managing your aquaculture business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} h-full bg-zinc-50`}
      >
        <main>
          {children}
        </main>
        <Navbar />
        <Toaster />
      </body>
      <GoogleAnalytics gaId="G-X7DBE88P0J" />
    </html>
  );
}
