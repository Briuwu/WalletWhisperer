import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

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
  ],
  // openGraph: {
  //   title: "WalletWhisperer – Your AI-Powered Personal Finance Coach",
  //   description:
  //     "Talk to your money, get clarity, and take control—WalletWhisperer is your smart, judgment-free AI financial coach.",
  //   url: "https://walletwhisperer.com", // Replace with your actual URL
  //   type: "website",
  //   siteName: "WalletWhisperer",
  //   images: [
  //     {
  //       url: "/og-image.png", // Update with your OG image path
  //       width: 1200,
  //       height: 630,
  //       alt: "WalletWhisperer - AI Personal Finance Chat",
  //     },
  //   ],
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "WalletWhisperer – Your AI-Powered Personal Finance Coach",
  //   description:
  //     "Smart, friendly financial advice from your AI money confidant. No spreadsheets, no shame—just better money moves.",
  //   images: ["/og-image.png"], // Same image as OG
  //   creator: "@yourhandle", // Optional
  // },
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
      </body>
    </html>
  );
}
