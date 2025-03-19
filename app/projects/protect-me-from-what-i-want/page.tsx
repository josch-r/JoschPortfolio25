// app/projects/[project]/page.tsx
import { notFound } from "next/navigation";
import { projects } from "@/lib/projectsData";
import ProjectLayout from "@/components/layout/ProjectLayout";
import ImageWithCaption from "@/components/ui/imgWithCaption";
import { ArrowRight } from "lucide-react";
import { GridLayout } from "@/components/layout/GridLayout";
import { Metadata } from "next";
import BlockQuote from "@/components/ui/blockQuote";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const slug = "protect-me-from-what-i-want";

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
              <span className="text-productname">
                Protect Me From What I Want
              </span>{" "}
              is a concept promoting digital literacy and rethinking our
              relationship with social media. In an era where digital media
              permeates our daily lives, the question of conscious technology
              use is more pressing than ever. We help foster sustainable
              awareness of media consumption and demonstrate ways to create a
              healthy balance between digital and analog worlds.
            </p>

            <ImageWithCaption
              src="/images/Projects/pmfwiwThumbnail.jpg"
              caption="The Product family of Protect me from what i want"
              classprops="mt-5"
            />
          </section>
          <section className="col-span-1 md:col-span-8 md:col-start-3 mt-8">
            <h3 className="text-heading-medium">Concept</h3>
            <p className="text-body mt-2">
              Our approach builds upon existing infrastructure like the
              &quot;one sec&quot; app and focus mode settings. We aim to inform
              and provide a compact knowledge base about mental and biological
              models underlying digital literacy. Rather than promoting
              self-optimization, we frame the discussion around digital
              well-being. While completely abandoning social media might be the
              best long-term solution, we focus on providing low-barrier entry
              points toward digital literacy that can initiate meaningful
              change.
            </p>
            <BlockQuote
              className="mt-5"
              direct
              quote="Media addiction therapy teaches mindful engagement with digital media, known as digital literacy. The core concept is creating moments of rest and reflection after significant activities."
              author="Daniel Rose, Neue Land e.V."
            ></BlockQuote>
          </section>

          <section className="mt-16 col-span-1 md:col-span-8 md:col-start-3 grid grid-cols-10 gap-x-5">
            <h3 className="text-heading-medium col-span-10">
              Methodological Approach
            </h3>
            <div className="col-span-10 lg:col-span-5 mt-2">
              <p className="text-body ">
                Throughout all project phases, we employed Design Thinking
                methods, often creating our own variations. For ideation, we
                combined modified card sorting with Crazy 8&apos;s to quickly
                explore solution spaces across various problem areas. This
                helped us uncover commonalities between different problems. The
                &ldquo;worst-possible-solution&rdquo; exercise provided
                additional valuable insights.
              </p>
            </div>
            <ImageWithCaption
              src="/images/Projects/pmfwiw/pmfwiwCards.jpg"
              caption="Clustering solutions with Problem cards helped us visualize commonalities."
              classprops="col-span-10 lg:col-span-5 mt-5 lg:mt-0"
            />
          </section>

          <section className="mt-16 col-span-1 md:col-span-8 md:col-start-3 text-body">
            <h3 className="text-heading-medium">Double Friction Hook-Model</h3>
            <p className="text-body mt-2">
              Our Double Friction Hook Model enhances the traditional Hook Model
              by introducing additional friction points before both the trigger
              and action phases, effectively interrupting or slowing down
              habitual cycles of digital consumption. By integrating tools like
              OneSec and Focus Mode into this process, we create intentional
              delays that disrupt automatic behavioral patterns. These friction
              points require minimal effort yet significantly impact usage
              behavior. While users might initially find these interrupted
              interactions unfamiliar, they gradually adapt, creating space for
              deeper reflection on their digital consumption habits. The model
              works in two key ways:
            </p>
            <ul className="list-main">
              <li className="list-item">
                <ArrowRight size={16} className="transition-all duration-200" />
                <span>
                  Pre-trigger friction: Interrupts the automatic response to
                  notifications and external triggers
                </span>
              </li>
              <li className="list-item">
                <ArrowRight size={16} className="transition-all duration-200" />
                <span>
                  Pre-action friction: Creates a moment of pause before engaging
                  with digital content
                </span>
              </li>
            </ul>
            <ImageWithCaption
              src="/images/Projects/pmfwiw/pmfwiwHookmodel.jpg"
              caption="A closer look at the small details of our laser-cut elements."
              classprops=""
            />
            <p className="mt-5">
              The implementation through OneSec and Focus Mode serves as a
              catalyst for developing a more balanced digital-analog lifestyle.
              These tools promote rapid behavioral adaptation by encouraging
              users to consciously question and potentially modify their digital
              habits. The beauty of this approach lies in its simplicity - small
              moments of friction leading to meaningful changes in digital
              behavior.
            </p>
          </section>

          <section className="col-span-1 md:col-span-8 md:col-start-3 mt-16">
            <h3 className="text-heading-medium">Technical Implementation</h3>
            <p className="text-body mt-2">
              As technical lead, I developed 3D scenes using React-Three-Fiber,
              while we chose React with Tailwind CSS as our framework. The
              website combines concepts around digital literacy with playful 3D
              components and scenes to make the topic more accessible and
              understandable. While Nyal was responsible for content, Fabienne
              and I handled the technical implementation.
            </p>
            <ImageWithCaption
              src="/images/Projects/pmfwiw/pmfwiwScreenshot.jpg"
              caption="A Screenshot showing the interactivity of our website"
              classprops="col-span-1 md:col-span-8 md:col-start-3 mt-5"
            />
          </section>
          <section className="col-span-1 md:col-span-8 md:col-start-3 mt-16">
            <h3 className="text-heading-medium">Round up</h3>
            <p className="text-body mt-2">
              The project taught us valuable lessons about pivoting and
              not becoming too attached to our own ideas. We initially started
              with a design sprint, convinced we would build a low-tech solution
              using Calm Technology (similar to Google&apos;s Little Signals).
              However, we realized that while users appreciated the visual
              aesthetics, it didn&apos;t effectively address the core issue of
              digital literacy. Our pivot to information presentation with
              direct action steps better addressed the actual needs and
              problems, rather than following our personal preferences. The
              project strengthened our grasp of Design Thinking and prepared us
              for selecting and implementing appropriate methods in our
              subsequent Bachelor&apos;s thesis.
            </p>
          </section>
          <Link className="flex justify-end md:col-start-3 md:col-span-8 my-2" href={`/projects/` + projects[projectData.index + 1 < projects.length ? projectData.index + 1 : 0].slug}>
            <Button variant="default">Next Project</Button>
          </Link>
        </GridLayout>
      </ProjectLayout>
    </>
  );
}
