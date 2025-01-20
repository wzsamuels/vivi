import type { Metadata } from "next";
import { Petit_Formal_Script } from "next/font/google";
import "./globals.css";

const eduHand = Petit_Formal_Script({
  variable: "--font-edu-hand",
  subsets: ["latin"],
  weight: '400'
});

export const metadata: Metadata = {
  title: "Heritage Women's Golf"
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
