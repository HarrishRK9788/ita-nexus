import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { RoleProvider } from "@/components/ui/role-context";

export const metadata: Metadata = {
  title: "ITA Nexus — Secure Digital Operating Platform | PSG College of Technology",
  description: "Official digital platform & institutional memory for the Information Technology Association (ITA).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        <RoleProvider>
          {children}
        </RoleProvider>
      </body>
    </html>
  );
}
