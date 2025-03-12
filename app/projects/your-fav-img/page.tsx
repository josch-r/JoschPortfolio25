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
              <span className="text-productname">your-fav-img</span> is a
              personal Project exploring the possibilities of r3f, AI depth map
              generation with the goal to revitalize existing Paintings and
              Images. It was built with React, React Three Fiber and
              framer-motion and uses a pre-trained AI model to generate depth
              maps from images. It was part of my learning journey to get more
              familiar with 3D in the browser and React.
            </p>
            <ImageWithCaption
              src="/images/Projects/yfi/yfiWalkthough.gif"
              caption="Your Favourite Website"
              classprops="mt-5"
            />
          </section>

          <section className="mt-16 col-span-1 md:col-span-8 md:col-start-3 text-body">
            <h3 className="text-heading-medium">Take-Aways</h3>
            <p className="text-body mt-2">
              The project was a great starting point to get into web-3D
              development and React. I learned a lot about the possibilities of
              r3f and how to integrate it into my project, plus I had so much
              fun playing around with parameters and different images (shoutouts
              to{" "}
              <a
                className="text-text-tertiary underline"
                target="_blank"
                href="https://lunakloess.de/"
              >
                Luna Kloess
              </a>
              , who let me tinker around with some of her portrait work).
              <br /> All in all a great learning experience that really helped
              me grow my skills.
            </p>

            <ImageWithCaption
              src="/images/Projects/yfi/yfiHeader.jpeg"
              caption="Header Image of your-fav-img. Picture by Luna Kloess"
              classprops="mt-5"
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
