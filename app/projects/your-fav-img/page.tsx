// app/projects/[project]/page.tsx
import { notFound } from "next/navigation";
import { archivedProjects } from "@/lib/archivedProjectsData"; 
import ProjectLayout from "@/components/layout/ProjectLayout";
import ImageWithCaption from "@/components/ui/imgWithCaption";
import { GridLayout } from "@/components/layout/GridLayout";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const slug = "your-fav-img";

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
      "r3f",
      "Your Favourite Image",
      "Webdevelopment",
      "your-fav-img",
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
      <ProjectLayout project={projectData}>
        <GridLayout>
          <section className="col-span-1 md:col-span-8 md:col-start-3 mt-8">
            <h3 className="text-heading-medium">Description</h3>
            <p className="text-body mt-2">
              <span className="text-productname">Your Favourite Image</span> is
              a personal Project
            </p>
            <ImageWithCaption
              src="/images/Projects/yfi/yfiHeader.jpeg"
              caption="Your Favourite Website"
              classprops="mt-5"
            />
          </section>

          <section className="mt-16 col-span-1 md:col-span-8 md:col-start-3 text-body">
            <h3 className="text-heading-medium">Technical Implementation</h3>
            <p className="text-body mt-2">
              Our solution integrates three key components into a seamless
              warning system. The smart road markers form the foundation,
              equipped with infrared cameras, motion detection, and LED warning
              lights, all powered by solar energy in a custom-designed modular
              housing. These connect to our interactive traffic sign system,
              which displays varying danger levels from &quot;Low Risk&quot; to
              &quot;Acute Danger.&quot; The third component is our mobile
              application, providing real-time warnings and route analysis while
              maintaining a dark mode interface for safe driving.
            </p>

            <ImageWithCaption
              src="/images/Projects/wiwa/wiwaPfosten.jpg"
              caption="A picture of our Prototype, which we tested on a local roadside."
              classprops="mt-5"
            />
          </section>
          <section className="mt-16 col-span-1 md:col-span-8 md:col-start-3 grid grid-cols-10 gap-x-5">
            <h3 className="text-heading-medium col-span-10">
              Technical Architecture
            </h3>
            <div className="col-span-10 lg:col-span-5 mt-2">
              <p className="text-body ">
                The system uses OpenCV and background subtraction for reliable
                wildlife detection. When movement is detected, the camera
                captures an image which is compared to a reference frame.
                Confirmed wildlife presence triggers a cascade of warnings:
                local LED indicators activate, nearby traffic signs update their
                status, and mobile app alerts are dispatched to approaching
                drivers.
              </p>
            </div>
            <ImageWithCaption
              src="/images/Projects/wiwa/wiwaCam.jpg"
              caption="Image captured with one of our cams."
              classprops="col-span-10 lg:col-span-5 mt-5 lg:mt-0"
            />
          </section>

          <section className="mt-16 col-span-1 md:col-span-8 md:col-start-3 text-body">
            <h3 className="text-heading-medium">Design Process</h3>
            <p className="text-body mt-2">
              The development evolved through several critical iterations,
              starting with a basic light barrier system before advancing to our
              current infrared camera solution. A key challenge was optimizing
              power consumption for solar operation, which led to significant
              refinements in our detection algorithms. The modular housing
              design underwent multiple iterations to ensure easy installation
              and maintenance while remaining compatible with existing road
              infrastructure.
            </p>
          </section>

          <section className="mt-16 col-span-1 md:col-span-8 md:col-start-3 text-body">
            <h3 className="text-heading-medium">Innovation</h3>
            <p className="text-body mt-2">
              Unlike traditional wildlife warning systems that rely on
              reflectors or acoustic signals which animals quickly adapt to,{" "}
              <span className="text-productname">WiWa</span> focuses on warning
              drivers through multiple channels. The system provides both
              immediate local warnings and predictive information through the
              mobile app, creating a comprehensive safety solution. The modular
              design allows for easy installation and maintenance, while solar
              power ensures autonomous operation. By combining physical
              infrastructure with digital technology, WiWa creates a sustainable
              and effective solution to wildlife-vehicle collisions.
            </p>
            <ImageWithCaption
              src="/images/Projects/wiwa/wiwaFamily.jpg"
              caption="The WiWa product lineup."
              classprops="col-span-1 md:col-span-8 md:col-start-3 mt-5"
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
