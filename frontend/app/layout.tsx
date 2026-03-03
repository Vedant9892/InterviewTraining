import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChatbotIcon } from "@/components/ChatbotIcon";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InterviewTraining - Master Your Interview Presence",
  description:
    "AI-powered behavioral interview coach with face recognition - analyzes confidence, communication, and interview presence",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ChatbotIcon />
      </body>
    </html>
  );
}
