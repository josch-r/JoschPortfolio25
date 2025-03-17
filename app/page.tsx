import { AboutSection } from "@/components/sections/AboutSection";
import { HeroSection } from "@/components/sections/HeroSection";
import ProjectSection from "@/components/sections/ProjectsSection";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.joschua-rothenbacher.de'),
  title: "Josch",
  description:
    "Welcome to Josch Rothenbachers's portfolio. Explore a diverse collection of web development, Physical Prototyping, UX-Design & XR projects.",
  keywords: [
    "Josch Rothenbacher",
    "Joschua Rothenbacher",
    "XR Developer",
    "React",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Josch Rothenbacher" }],
  openGraph: {
    title: "Josch Rothenbacher | Digital Product Designer & Developer",
    description:
      "Welcome to Josch Rothenbachers's portfolio. Explore a diverse collection of web development, Physical Prototyping, UX-Design & XR projects.",
    type: "website",
    url: "https://www.joschua-rothenbacher.de", // Replace with your actual domain
    images: [
      {
        url: "/images/joschSketchTransparent.png", // Replace with your actual OG image path
        width: 1200,
        height: 630,
        alt: "Josch Rothenbacher Portfolio",
      },
    ],
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
  other: {
    'application/ld+json': JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Josch Rothenbacher",
        "url": "https://www.joschua-rothenbacher.de",
        "jobTitle": "Digital Product Designer & Developer",
        "knowsAbout": ["Digital Product Design", "XR Development", "Web Technologies", "Physical Prototyping", "UX Design"],
        "image": "https://www.joschua-rothenbacher.de/images/joschSketchTransparent.png"
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Josch Rothenbacher Portfolio",
        "url": "https://www.joschua-rothenbacher.de",
        "description": "Portfolio showcasing digital product design, XR development, and physical prototyping projects"
      }
    ])
  }
};

export default function Home() {
  return (
    <div className="!scroll-smooth">
      <ScrollProgress />
      <HeroSection />
      <AboutSection />
      <ProjectSection />
    </div>
  );
}
