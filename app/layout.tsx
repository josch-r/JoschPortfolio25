
import { Geist } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";
import { Providers } from "./providers";

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
      <body
        className={`font-geist bg-bg-primary text-text-primary ${geist.className}`}
      >
        <Navbar />
        <Providers>
          <main>{children}</main>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
