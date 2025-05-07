import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WalletWhisperer – Your AI-Powered Personal Finance Coach",
  description:
    "WalletWhisperer is an AI-powered personal finance assistant that helps you take control of your money through smart conversations. Get budgeting advice, savings tips, and personalized finance reports—all without spreadsheets or shame.",
  keywords: [
    "AI finance coach",
    "personal finance assistant",
    "budgeting app",
    "financial wellness",
    "money chatbot",
    "AI financial advisor",
    "budget planner",
    "smart money app",
    "Gen Z finance",
    "financial planning",
    "debt management",
    "savings goals",
    "financial health score",
    "money management",
    "financial literacy",
  ],
  authors: [{ name: "Brian Millonte" }],
  creator: "Brian Millonte",
  publisher: "WalletWhisperer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://walletwhisperer.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "WalletWhisperer – Your AI-Powered Personal Finance Coach",
    description:
      "Talk to your money, get clarity, and take control—WalletWhisperer is your smart, judgment-free AI financial coach.",
    url: "https://walletwhisperer.vercel.app",
    siteName: "WalletWhisperer",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/landing-page.png",
        width: 1200,
        height: 630,
        alt: "WalletWhisperer - AI Personal Finance Chat",
      },
      {
        url: "/chat-ui.png",
        width: 1200,
        height: 630,
        alt: "WalletWhisperer Chat Interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WalletWhisperer – Your AI-Powered Personal Finance Coach",
    description:
      "Smart, friendly financial advice from your AI money confidant. No spreadsheets, no shame—just better money moves.",
    images: ["/landing-page.png"],
    creator: "@brianmillonte",
    site: "@walletwhisperer",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} bg-slate-50 antialiased`}>
        {children}
        <Toaster richColors />
        <Analytics />
      </body>
    </html>
  );
}
