// FIX: Switched to a named type import for `Metadata` from Next.js to resolve module resolution issues.
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/lib/auth-context";
import { AuthGuard } from "@/components/AuthGuard";
// FIX: Import React to use React.ReactNode
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Faith Clinic - Patient Management",
  description: "Patient Management System for Faith Clinic",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* FIX: Removed redundant Tailwind CSS CDN script. It is handled by the build process. */}
      </head>
      <body className={`${inter.className} bg-white min-h-screen`}>
        <AuthProvider>
          <Navbar />
          <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
            <AuthGuard>
              {children}
            </AuthGuard>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}