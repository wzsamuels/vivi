import type { Metadata } from "next";
import { Geist, Geist_Mono, Edu_AU_VIC_WA_NT_Hand, Petit_Formal_Script } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const eduHand = Petit_Formal_Script({
  variable: "--font-edu-hand",
  subsets: ["latin"],
  weight: '400'
});

export const metadata: Metadata = {
  title: "Lady Golf Events"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${eduHand.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
