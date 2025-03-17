// app/projects/[project]/page.tsx
import { notFound } from "next/navigation";
import { archivedProjects } from "@/lib/archivedProjectsData";
import ProjectLayout from "@/components/layout/ProjectLayout";
import ImageWithCaption from "@/components/ui/imgWithCaption";
import { GridLayout } from "@/components/layout/GridLayout";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import YouTubeEmbed from "@/components/ui/youtubeEmbeded";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const slug = "remote-gardening";

// Optionally, look up your project data based on this slug:
const projectData = archivedProjects.find((p) => p.slug === slug);

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
      "Remote Gardening",
      "IoT",
      "Prototyping",
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
              <span className="text-productname">Remote Gardening</span> solves
              the challenge of plant care during absences. This smart garden
              system automatically waters your plants based on individual needs,
              controllable from anywhere. By connecting plant enthusiasts with
              their greenery remotely, it ensures plants remain healthy while
              you&apos;re away on vacation or business trips.
            </p>
            <YouTubeEmbed videoId="8cyOG9YHTxc" caption="A video showcasing the construction and usage of our Prototype" />
          </section>

          <section className="mt-16 col-span-1 md:col-span-8 md:col-start-3 grid grid-cols-10 gap-x-5">
            <h3 className="text-heading-medium col-span-10">
              Technical Implementation
            </h3>
            <div className="col-span-10 lg:col-span-5 mt-2">
              <p className="text-body ">
                The system consists of a linear track with 3D-printed components
                driven by a stepper motor. A mobile carriage equipped with an
                RFID reader identifies plants by their unique tags. When a plant
                is detected, the carriage stops and delivers water through a
                peristaltic pump system. The MongoDB backend stores plant
                profiles and watering schedules, while the ESP-based control
                unit manages the hardware operations. The system runs automatic
                watering cycles twice daily.
              </p>
            </div>
            <ImageWithCaption
              src="/images/Projects/remoteGardening/remoteGardeningSchema.png"
              caption="The technical Setup of our Remote Gardening System."
              classprops="col-span-10 lg:col-span-5 mt-5 lg:mt-0"
            />
          </section>

          <section className="mt-16 col-span-1 md:col-span-8 md:col-start-3 text-body">
            <h3 className="text-heading-medium">User Experience</h3>
            <p className="text-body mt-2">
              The intuitive frontend displays plants in their actual
              arrangement, allowing users to monitor and adjust care parameters.
              When adding new plants, the system detects unregistered RFID tags
              and emails users with setup links. Each plant&apos;s overview page
              provides species information, care requirements, and watering
              history, creating a seamless connection between users and their
              plants regardless of physical distance.
            </p>
            <ImageWithCaption
              src="/images/Projects/remoteGardening/remoteGardeningHeader.png"
              caption="Working on our Prototype"
              classprops="mt-5"
            />
          </section>

          <section className="mt-16 col-span-1 md:col-span-8 md:col-start-3 grid grid-cols-10 gap-x-5">
            <h3 className="text-heading-medium col-span-10">Sum Up</h3>
            <div className="col-span-10 lg:col-span-5 mt-2">
              <p className="text-body ">
                Remote Gardening transforms plant care through automation and
                connectivity. By combining hardware engineering with
                user-centered software design, it offers peace of mind for plant
                owners and optimal growing conditions for plants. This project
                demonstrates how technology can solve everyday problems while
                fostering a community of plant enthusiasts who can care for
                their greenery from anywhere in the world.
              </p>
            </div>
            <ImageWithCaption
              src="/images/Projects/remoteGardening/remoteGardeningProcess.png"
              caption="Our Workspace during a nightshift working on the Prototype"
              classprops="col-span-10 lg:col-span-5 mt-5 lg:mt-0"
            />
          </section>

          <Link
            className="flex justify-end md:col-start-3 md:col-span-8 my-2"
            href={
              `/projects/` +
              archivedProjects[
                projectData.index + 1 < archivedProjects.length
                  ? projectData.index + 1
                  : 0
              ].slug
            }
          >
            <Button variant="default">Next Project</Button>
          </Link>
        </GridLayout>
      </ProjectLayout>
    </>
  );
}
