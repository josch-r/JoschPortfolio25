// app/projects/[project]/page.tsx
import { notFound } from "next/navigation";
import { archivedProjects } from "@/lib/archivedProjectsData";
import ProjectLayout from "@/components/layout/ProjectLayout";
import ImageWithCaption from "@/components/ui/imgWithCaption";
import { GridLayout } from "@/components/layout/GridLayout";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import YouTubeEmbed from "@/components/ui/youtubeEmbeded";

const slug = "endstation-visuals";

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
      "visuals",
      "Touchdesigner",
      "Audioreactive visuals",
      "endstation visuals",
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
              This project actually came about quite spontaneously. Through my
              connection to the lighting and tech team of the event committee at
              hfg Schwäbisch Gmünd, I was asked if I’d like to create visuals
              for the Freshers’ Party, which takes place every semester. I
              decided to take on the challenge and develop audio-reactive
              visuals, paired with live image Generation utilizing Touch
              Designer and StableDiffusion.
            </p>
            <YouTubeEmbed
              videoId="76seF2nvdMo"
              caption="Endstation Visuals - Project Video"
            />
          </section>

          <section className="mt-8 col-span-1 md:col-span-8 md:col-start-3 text-body">
            <h3 className="text-heading-medium">
              Execution: TouchDesigner, StreamDiffusion, and a Lot of Curiosity
            </h3>
            <p className="text-body mt-2">
              For this project, I worked with TouchDesigner for the very first
              time. It was all about learning by doing, a handful of YouTube
              tutorials, and plenty of messing around with settings and watching
              the change. My first &quot;Heureka&quot; moment happened, when I
              saw the generated version of myself moving around and about in my
              TouchDesigner Preview window. <br />
              <br />
              At this point, a big shoutout to{" "}
              <a
                className="text-text-tertiary underline"
                target="_blank"
                href="https://www.patreon.com/c/dotsimulate/home"
              >
                DotSimulate
              </a>
              , who developed the StreamDiffusion integration for TouchDesigner.
              Without his fantastic work, the project wouldn’t have been
              possible in this form (or would have taken a lot longer to
              develop).
              <br /> My first step was to make the generated Grafitti react to
              elements within the Music. Every snare hit in the beat distorted
              shapes and generated new graphic elements. Every Kick slightly
              shifted the colors within the visualization and changed the amount
              of AI-Influence. With StreamDiffusion and my own prompts, I could
              further transform these shapes, making them always surprising and
              authentic.
              <br />
              <br /> A particular highlight was making the DJs themselves part
              of the visualization. A camera in front of the DJ booth captured
              them, and StreamDiffusion transformed them live into stylized
              characters (and sometimes even shapes). Depending on the intensity
              of the current track, the visuals became more abstract or stayed
              closer to the original. The perspective was especially important
              to me. The DJ should be at the center, almost like a doubling of
              the real person on stage. Finding the right settings was a real
              experiment for me, how much transformation is exciting, when does
              it become too abstract or too close to the original? The only way
              was to try things out and adjust as needed.
            </p>
            <ImageWithCaption
              src="/images/Projects/endstationVisualsThumbnail.jpg"
              caption="Endstation Visuals"
              classprops="mt-5"
            />
          </section>

          <section className="mt-16 col-span-1 md:col-span-8 md:col-start-3 grid grid-cols-10 gap-x-5">
            <h3 className="text-heading-medium col-span-10">
              Feedback and Outlook
            </h3>
            <div className="col-span-10 lg:col-span-5 mt-2">
              <p className="text-body ">
                The feedback was overwhelmingly positive. Everyone loved the
                visuals. In the future, I’d like to make the visuals even more
                responsive to the music, change up the settings or use them in a
                completetly different context. It would also be exciting to
                dynamically adapt the prompts to the mood or content of the
                songs. This project was a premiere for me in many ways. It was
                my first deep dive into TouchDesigner, my first collaboration
                with generative AI for live visuals, and the first time I could
                directly combine my passion for technology and DJing. The result
                was a fascinating mix of audio-reactive graffiti visuals and a
                exciting new way to show the DJ. I’m genuinely proud of the
                outcome and excited to see what else will be possible with these
                tools and this approach in the future. For me, this journey has
                only just begun! :-)
              </p>
            </div>
            <ImageWithCaption
              src="/images/Projects/endstation/endstationDJ.jpg"
              caption="Jonah and me performing with the visuals at the Freshers' Party"
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
