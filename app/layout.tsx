import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { layoutcss } from '@/app/ui/fonts';
import Footer from "./footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sunil Sarolkar - Profile",
  description: "This is profile of Software Engineer/Data Scientist/ML Engineer Sunil Sarolkar",
};


export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${layoutcss.className} antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
