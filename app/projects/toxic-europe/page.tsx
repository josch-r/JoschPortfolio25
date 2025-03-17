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

const slug = "toxic-europe";

// Optionally, look up your project data based on this slug:
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
      "Toxic Europe",
      "Giftiges Europa",
      "Exhibtion Design",
      "Eshibtion development",
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
              &quot;Digital Exhibits&quot; was a collaborative course with the
              State Museum of Natural History Stuttgart, where we developed{" "}
              <span className="text-productname">Toxic Europe</span>, an
              interactive installation about poisonous creatures in Europe. The
              project combined physical and digital elements through projection
              mapping and touch-sensitive interfaces to create an engaging
              educational experience.
            </p>

            <YouTubeEmbed
              videoId="lx3FH4wMkLY"
              caption="A video showcasing the interactive Element of Toxic Europe."
            />
          </section>
          <section className="col-span-1 md:col-span-8 md:col-start-3 mt-8">
            <p className="text-body">
              The installation serves as a prototype for a larger exhibition
              concept exploring Europe&apos;s diverse toxic creatures. We
              developed a life-sized interactive stele featuring one poisonous
              species to demonstrate how visitors could engage with and learn
              about these fascinating but dangerous animals. Through this
              physical prototype, we showcased how the complete exhibition would
              allow visitors to discover various European toxic species through
              a combination of tactile elements, digital storytelling, and
              interactive features. The modular design of our stele system means
              it could be easily adapted to showcase different species while
              maintaining a consistent educational and interactive approach
              throughout the exhibition.
            </p>
            <ImageWithCaption
              src="/images/Projects/iks/iksFamily.jpg"
              caption="Our Vision of multiple Steles showcasing different toxic creatures and our built prototype."
              classprops="mt-5"
            />
          </section>

          <section className="mt-16 col-span-1 md:col-span-8 md:col-start-3 text-body">
            <h3 className="text-heading-medium">
              Technical Role and Contributions
            </h3>
            <p className="text-body mt-2">
              As the technical lead in our interdisciplinary team, I:
            </p>
            <ul className="list-main">
              <li className="list-item">
                <ArrowRight size={16} className="transition-all duration-200" />
                <span>
                  Developed and implemented the projection mapping system using
                  MadMapper
                </span>
              </li>
              <li className="list-item">
                <ArrowRight size={16} className="transition-all duration-200" />
                <span>
                  Created the interactive elements using Bare Conductive Board
                  and copper foil sensors
                </span>
              </li>
              <li className="list-item">
                <ArrowRight size={16} className="transition-all duration-200" />
                <span>
                  Contributed to concept development and hardware integration
                </span>
              </li>
              <li className="list-item">
                <ArrowRight size={16} className="transition-all duration-200" />
                <span>
                  Supported the team with 3D rendering and visualization work
                </span>
              </li>
            </ul>
            <p>
              The project thrived through the collaboration of a diverse team,
              combining my expertise as a digital product designer and developer
              with two communication designers and an education student. This
              mix of disciplines proved invaluable: while I focused on technical
              implementation, the communication designers crafted the visual
              language and graphics, and our education student brought crucial
              pedagogical insights. The pedagogical expertise helped ensure the
              content was accessible and engaging for our target audience, while
              the mix of technical and design skills enabled us to create an
              effective interactive experience.
            </p>

            <ImageWithCaption
              src="/images/Projects/iks/iksLaserClose.jpg"
              caption="A closer look at the small details of our laser-cut elements."
              classprops="mt-5"
            />
          </section>
          <section className="mt-16 col-span-1 md:col-span-8 md:col-start-3 grid grid-cols-10 gap-x-5">
            <h3 className="text-heading-medium col-span-10">
              Physical Creation
            </h3>
            <div className="col-span-10 lg:col-span-5 mt-2">
              <p className="text-body ">
                The hands-on construction phase was a collaborative effort where
                our interdisciplinary team came together to create tangible
                elements. We laser-cut icons and illustrations from 4mm thick
                poplar plywood to create tactile, three-dimensional elements
                that would make the installation more engaging and accessible.
                The physical construction involved multiple techniques: foil
                cutting for headlines, adhesive foils for body text due to poor
                adhesion on MDF, and spray-painted accents in our highlight
                colors. The wooden skeleton was built using MDF boards and
                timber, with a projector and lighting mounted on the top plate.
                This physical crafting process allowed us to create an
                installation that engages multiple senses - visitors can see,
                touch, and interact with various elements, making the learning
                experience more immersive and inclusive.
              </p>
            </div>
            <ImageWithCaption
              src="/images/Projects/iks/iksDetail.jpg"
              caption="A closeup look of our little shrew."
              classprops="col-span-10 lg:col-span-5 mt-5 lg:mt-0"
            />
          </section>
          <ImageWithCaption
            src="/images/Projects/iks/iksHand.jpg"
            caption="A look into the interactive area of our exhibit."
            classprops="col-span-1 md:col-span-8 md:col-start-3 mt-5"
          />
          <Link className="flex justify-end md:col-start-3 md:col-span-8 my-2" href={`/projects/` + projects[projectData.index + 1 < projects.length ? projectData.index + 1 : 0].slug}>
            <Button variant="default">Next Project</Button>
          </Link>
        </GridLayout>
      </ProjectLayout>
    </>
  );
}
