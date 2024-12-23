import type { Metadata } from "next";
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/navbar";
import { Providers } from "../components/providers";
import { Sidebar } from "../components/sidebar";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "SocialConnect",
  description: "Connect with friends and share your thoughts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1 pt-16">
              <Sidebar />
              <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
