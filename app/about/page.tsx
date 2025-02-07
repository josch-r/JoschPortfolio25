import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.joschua-rothenbacher.de'),
  title: "About | Josch",
  description:
    "Learn about Josch Rothenbacher's journey and expertise in Digital Product Design, XR Development, and Web Technologies. Discover the skills and experiences shaping innovative digital solutions.",
  keywords: [
    "About Josch Rothenbacher",
    "Joschua Rothenbacher Background",
    "XR Developer Experience",
    "Digital Product Design",
    "UX Design Portfolio",
    "Physical Prototyping",
  ],
  authors: [{ name: "Josch Rothenbacher" }],
  openGraph: {
    title: "About Josch Rothenbacher | Digital Product Designer & XR Developer",
    description:
      "Explore Josch Rothenbacher's background in Digital Product Design, XR Development, and innovative tech solutions. Learn about the experiences shaping cutting-edge digital projects.",
    type: "profile", // Changed to 'profile' for the About page
    url: "https://www.joschua-rothenbacher.de/about", // Update with your actual About page URL
    images: [
      {
        url: "/images/joschSketchTransparent.png", // Kept the same image for consistency
        width: 1200,
        height: 630,
        alt: "Josch Rothenbacher - Digital Product Designer & Developer",
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
};


export default function About() {
  return (
    <div>
      <h1>About</h1>
    </div>
  );
}
