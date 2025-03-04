import { GridLayout } from "@/components/layout/GridLayout";
import Gallery from "@/components/sections/Gallery";
import ImageWithCaption from "@/components/ui/imgWithCaption";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.joschua-rothenbacher.de"),
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

interface Image {
  src: string;
  caption: string;
  id: number;
}

const images: Image[] = [
  
  {
    src: "/images/about/gallery/2.jpg",
    caption: "Analog photography: more stickers?",
    id: 0,
  },
  {
    src: "/images/about/gallery/1.jpg",
    caption: "Nyal, Fabienne and me after we held our final presentation in our Bachelor",
    id: 1,
  },
  {
    src: "/images/about/gallery/3.jpg",
    caption: "In the mountains, Photography by Luna Klöss",
    id: 2,
  },
  {
    src: "/images/about/gallery/4.jpg",
    caption: "Analog photography: going surfing",
    id: 3,
  },
  {
    src: "/images/about/gallery/5.jpg",
    caption: "Analog photography: Me going surfing",
    id: 4,
  },
  {
    src: "/images/about/gallery/7.jpg",
    caption: "Me in Luna's exhibition about places of retreat",
    id: 5,
  },
  {
    src: "/images/about/gallery/6.jpg",
    caption: "Analog photography",
    id: 6,
  },
  {
    src: "/images/about/gallery/8.jpg",
    caption: "Spinning some tunes",
    id: 8,
  },
];

export default function About() {
  return (
    <GridLayout>
      <section className="col-span-1 lg:col-start-3 lg:col-span-4 mt-20">
        <h1 className="text-heading-large">About me</h1>
        <p className="text-body mt-8">
          I&apos;m a creative technologist passionate about blending design and
          technology to create human-centered solutions. My journey is driven by
          curiosity, innovation, and the desire to make a meaningful impact. For
          me, technology is more than just tools—it&apos;s a way to connect,
          inspire, and create experiences that matter. I believe in putting
          humans first, ensuring that every solution, whether digital or analog,
          addresses real needs with thoughtfulness and care.
        </p>
      </section>
      <section className="col-span-1 lg:col-start-7 lg:col-span-4 lg:mt-32">
        <ImageWithCaption classprops="w-full" src="/images/about/profile.png" caption="Portrait of me" />
      </section>

      <section className="col-span-1 lg:col-start-3 lg:col-span-8 mt-12 lg:mt-32">
        <h2 className="text-heading-medium">How I work</h2>
        <p className="text-body mt-2">
          Collaboration, adaptability, and iterative design are the foundation
          of how I approach every project. I&apos;m deeply inspired by Design
          Thinking principles, emphasizing empathy and problem-solving through
          understanding real user needs. My process revolves around maintaining
          constant dialogue with users to ensure that solutions created{" "}
          <span className="text-productname">with</span> them, not just{" "}
          <span className="text-productname">for</span> them.
        </p>
      </section>
      <ImageWithCaption
        src="/images/about/desk.jpg"
        caption="Momentary snapshot of my desk, whilst creating this page!"
        classprops="col-span-1 lg:col-start-3 lg:col-span-4"
      />
      <ImageWithCaption
        src="/images/about/arGlasses.jpg"
        caption="Testing VR-Gloves at the Immersive Tech Week 2022 in Rotterdam"
        classprops="col-span-1 lg:col-start-7 lg:col-span-4"
      />
      <section className="col-span-1 lg:col-start-3 lg:col-span-4 mt-2">
        <p>
          I prioritize rapid prototyping to test ideas early and refine them
          based on feedback. Whether using tools like Figma, Arduino, 3D
          printing, Lasercutting, Unity or frameworks such as React and
          Three.js, I focus on choosing the right tools for the task and
          learning new ones as needed to adapt to project demands. This
          flexibility allows me to tackle complex challenges and deliver
          functional and user-centered results.
        </p>
      </section>
      <section className="col-span-1 lg:col-start-7 lg:col-span-4 mt-2">
        <p>
          During our Bachelor&apos;s project, for example, my team and I combined
          iterative prototyping and user collaboration to develop a tool for
          accessibility in theater. We worked closely with stakeholders, testing
          prototypes in real-world scenarios and refining our ideas based on
          direct feedback. This hands-on, human-first approach continues to
          shape how I tackle every project today.
        </p>
      </section>

      <section className="col-span-1 lg:col-start-3 lg:col-span-8 mt-12 lg:mt-32">
        <h3 className="text-heading-medium">What else?</h3>
        <p className="mt-2">Besides Design, coding and technology, I enjoy DJing, analog photography, and cycling. Below are some of my favorite pictures—welcome to my gallery.</p>
      </section>
      <Gallery images={images}/>
    </GridLayout>
  );
}
