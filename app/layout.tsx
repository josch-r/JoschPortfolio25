import { Geist } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.variable}>
      <head>
        <meta name="apple-mobile-web-app-title" content="josch" />
      </head>
      <body
        className={`font-geist bg-bg-primary text-text-primary ${geist.className}`}
      >
        <Navbar />
        <Providers>
          <main>{children}</main>
          <Analytics />
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
