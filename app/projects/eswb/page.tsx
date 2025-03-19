// app/projects/[project]/page.tsx
import { notFound } from "next/navigation";
import { projects } from "@/lib/projectsData";
import ProjectLayout from "@/components/layout/ProjectLayout";
import YouTubeEmbed from "@/components/ui/youtubeEmbeded";
import ImageWithCaption from "@/components/ui/imgWithCaption";
import { ArrowRight } from "lucide-react";
import { GridLayout } from "@/components/layout/GridLayout";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const slug = "eswb";

const projectData = projects.find((p) => p.slug === slug);

export async function generateMetadata(): Promise<Metadata> {
  if (!projectData) {
    return {
      title: "Project not found | Josch",
      description: "Project details and insights",
    };
  }
  return {
    metadataBase: new URL("https://www.joschua-rothenbacher.de"),
    title: `${projectData.name} | Josch`,
    description: projectData.description || "Project details and insights",
    keywords: [
      "Josch Rothenbacher",
      "Joschua Rothenbacher",
      "Portfolio Project",
      "eswb",
      "AR Design & Development",
      "exhibition development",
    ],
    authors: [{ name: "Josch Rothenbacher" }],
    openGraph: {
      title: `${projectData.name} - Josch Rothenbacher Portfolio`,
      description: projectData.description,
      type: "article",
      url: `/projects/${projectData.slug}`,
      images: [
        {
          url: projectData.thumbnail,
          width: 1200,
          height: 630,
          alt: `${projectData.name} - Project Preview`,
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
}

export default function ProjectPage() {
  if (!projectData) {
    return notFound();
  }

  return (
    <>
    <ScrollProgress />
      <ProjectLayout project={projectData}>
        <GridLayout>
          <section className="col-span-1 md:col-span-8 md:col-start-3 mt-8">
            <h3 className="text-heading-medium">Description</h3>
            <p className="text-body mt-2">
              <span className="text-productname">Eine Stadt wird bunt</span> is
              an exhibition exploring the rise of graffiti culture in Hamburg
              during the 1980s and 90s. The exhibition blends archival
              materials, digital experiences, and interactive elements to bring
              this cultural movement to life. A key part of the experience is
              the accompanying app, which allows visitors to explore historic
              locations and dive deeper into the stories behind the artwork.
            </p>

            <YouTubeEmbed
              videoId="Q7xRKDXmAJs"
              caption="A video showcasing the App for Eine Stadt wird bunt. Courtesy: FLUUR"
            />
          </section>
          <section className="mt-16 col-span-1 md:col-span-8 md:col-start-3 grid grid-cols-10 gap-x-5">
            <h3 className="text-heading-medium col-span-10">My Role</h3>
            <p className="text-body mt-2 col-span-10 lg:col-span-5">
              During my internship at fluur, I worked on both the UX development
              of the app and the technical implementation of the
              exhibition&rsquo;s digital infrastructure. My contributions ranged
              from improving user flows to setting up the interactive
              installations. Additionally, I was responsible for testing the app
              in Hamburg, ensuring that all mapped locations were correctly
              represented.
            </p>
            <ImageWithCaption
              src="/images/Projects/eswb/eswbPano.jpeg"
              caption="The exhibition space in Hamburg. Photo: Christian Brodack / Courtesy: SHMH, MHG, EINE STADT WIRD BUNT."
              classprops="col-span-10 lg:col-span-5 mt-5 lg:mt-0"
            />
          </section>

          <section className="mt-16 col-span-1 md:col-span-8 md:col-start-3 text-body">
            <h3 className="text-heading-medium col-span-10">
              Technical Development
            </h3>
            <p className="text-body col-span-10 mt-2 2xl:max-w-[50%]">
              A major part of my role involved the configuration and deployment
              of various digital elements in the exhibition, including:
            </p>
            <ul className="list-main">
              <li className="list-item">
                <ArrowRight size={16} className="transition-all duration-200" />
                <span>
                  A large screen with headphones, playing music from the era.
                </span>
              </li>
              <li className="list-item">
                <ArrowRight size={16} className="transition-all duration-200" />
                <span>
                  A NUC running archival interviews, offering deeper insights
                  into the graffiti scene.
                </span>
              </li>
              <li className="list-item">
                <ArrowRight size={16} className="transition-all duration-200" />
                <span>
                  A big screen displaying the app’s interactive map, visualizing
                  key locations.
                </span>
              </li>
              <li className="list-item">
                <ArrowRight size={16} className="transition-all duration-200" />
                <span>
                  Multiple tablets showcasing scanned writing books, allowing
                  visitors to flip through pages interactively.
                </span>
              </li>
            </ul>
            <p className="text-body col-span-10 mt-2 2xl:max-w-[50%]">
              I was responsible for flashing and configuring these devices,
              ensuring that they functioned reliably throughout the exhibition.
              I also helped install hardware components, managed device
              monitoring via a kiosk system for remote supervision and
              maintenance, and worked with React Native for the first time to
              support development for the tablets used in the exhibition.
            </p>
          </section>

          <section className="mt-16 col-span-1 md:col-span-8 md:col-start-3 text-body">
            <h3 className="text-heading-medium">Round-Up</h3>
            <p className="text-body mt-2">
              This project was a unique opportunity to work at the intersection
              of UX, digital media, and exhibition technology. By combining
              user-centered design with hands-on technical problem-solving, I
              helped shape an engaging and accessible experience for visitors
              exploring Hamburg&rsquo;s graffiti history.
            </p>
          </section>
          <ImageWithCaption
            src="/images/Projects/eswb/eswbFoto.jpg"
            caption="The photo that stood out to me the most from the exhibition. Photo: Bernd Euler / Courtesy: SHMH, MHG, EINE STADT WIRD BUNT."
            classprops="col-span-1 md:col-span-8 md:col-start-3"
          />
          <Link className="flex justify-end md:col-start-3 md:col-span-8 my-2" href={`/projects/` + projects[projectData.index + 1 < projects.length ? projectData.index + 1 : 0].slug}>
            <Button variant="default">Next Project</Button>
          </Link>
        </GridLayout>
      </ProjectLayout>
    </>
  );
}
