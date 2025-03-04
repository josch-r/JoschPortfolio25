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

const slug = "commemor";

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
      "commemor",
      "AR Design & Development",
      "invention design",
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
              <span className="text-productname">Commemor</span> is an
              innovative augmented reality project that aims to preserve and
              modernize remembrance culture by bringing the stories behind
              Stolpersteine (memorial stones) to life through digital
              technology. The project addresses the critical challenge of
              maintaining historical memory as fewer Holocaust survivors remain
              to share their firsthand accounts.
            </p>

            <YouTubeEmbed
              videoId="ET_vEG4SZqU"
              caption="A video showcasing our concept for Commemor."
            />
          </section>
          <section className="col-span-1 md:col-span-8 md:col-start-3 mt-8">
            <p className="text-body">
              The application uses AR technology to transform existing
              Stolpersteine into interactive storytelling points, allowing users
              to scan these memorial stones and access detailed biographical
              information about the victims of Nazi persecution. By combining
              physical monuments with digital storytelling, Commemor creates an
              immersive learning experience that connects past and present.
            </p>
          </section>

          <section className="mt-16 col-span-1 md:col-span-8 md:col-start-3 grid grid-cols-10 gap-x-5">
            <h3 className="text-heading-medium col-span-10">Technical Role</h3>
            <div className="col-span-10 lg:col-span-5 mt-2">
              <p className="text-body ">
                As both technical lead and UX specialist in our three-person
                team, I:
              </p>
              <ul className="list-main">
                <li className="list-item">
                  <ArrowRight
                    size={16}
                    className="transition-all duration-200"
                  />
                  <span>
                    Led the technical development and prototyping of the AR
                    functionality, including marker tracking and immersion level
                    testing
                  </span>
                </li>
                <li className="list-item">
                  <ArrowRight
                    size={16}
                    className="transition-all duration-200"
                  />
                  <span>
                    Co-developed the core concept and UX framework, ensuring a
                    seamless blend between digital storytelling and physical
                    monuments
                  </span>
                </li>
                <li className="list-item">
                  <ArrowRight
                    size={16}
                    className="transition-all duration-200"
                  />
                  <span>
                    Created and validated user flows and interaction patterns
                    that make historical information accessible and engaging
                  </span>
                </li>
                <li className="list-item">
                  <ArrowRight
                    size={16}
                    className="transition-all duration-200"
                  />
                  <span>
                    Served as the bridge between conceptual design and technical
                    implementation, ensuring feasibility while maintaining the
                    project&apos;s vision
                  </span>
                </li>
              </ul>
            </div>
            <ImageWithCaption
              src="/images/Projects/commemor/commemorApp.jpg"
              caption="A look into one of our technical Proof-of-Concepts for Commemor."
              classprops="col-span-10 lg:col-span-5 mt-5 lg:mt-0"
            />
          </section>

          <section className="mt-16 col-span-1 md:col-span-8 md:col-start-3 text-body">
            <h3 className="text-heading-medium col-span-10">
              Project relevance
            </h3>
            <p className="text-body col-span-10 mt-2 2xl:max-w-[50%]">
              In an era where firsthand witnesses of the Holocaust are becoming
              fewer, Commemor addresses the crucial need to preserve historical
              memory for future generations. By leveraging existing urban
              infrastructure - the Stolpersteine - and combining it with
              innovative AR technology, the project creates meaningful
              educational experiences that make historical information more
              accessible and engaging, particularly for younger audiences. This
              approach to cultural preservation demonstrates how modern
              technology can be thoughtfully applied to maintain and enhance
              remembrance culture, ensuring these important stories continue to
              be told in an impactful way.
            </p>
          </section>

          <section className="mt-16 col-span-1 md:col-span-8 md:col-start-3 text-body">
            <h3 className="text-heading-medium">Future Potential</h3>
            <p className="text-body mt-2">
              The project continues to evolve, with plans to:
            </p>
            <ul className="list-main">
              <li className="list-item">
                <ArrowRight size={16} className="transition-all duration-200" />
                <span>
                  Adapt the concept for museum contexts and exhibitions
                </span>
              </li>
              <li className="list-item">
                <ArrowRight size={16} className="transition-all duration-200" />
                <span>
                  Expand functionality to include other historical monuments and
                  information boards
                </span>
              </li>
              <li className="list-item">
                <ArrowRight size={16} className="transition-all duration-200" />
                <span>
                  Enhance exhibition experiences through interactive AR elements
                </span>
              </li>
              <li className="list-item">
                <ArrowRight size={16} className="transition-all duration-200" />
                <span>
                  Create digital representations of Holocaust victims using AI
                  technology, including voice recreation and interactive
                  testimonies, similar to the{" "}
                  <a
                    className="underline"
                    href="https://expmag.com/2022/06/with-help-from-ai-a-holocaust-survivors-story-lives-on/"
                    target="_blank"
                  >
                    Dimensions in Testimony initiative
                  </a>
                </span>
              </li>
            </ul>
            <p>
              The project exemplifies how digital technology can serve as a
              bridge between physical memorials and detailed historical
              narratives. By combining AR visualization with AI-powered
              interactions, we can create more engaging and personal connections
              to historical figures, ensuring their stories remain vivid and
              meaningful for future generations. This approach not only
              preserves historical memory but also makes it more accessible and
              interactive, helping to ensure that the stories of Holocaust
              victims continue to be told and remembered.
            </p>
          </section>
          <ImageWithCaption
            src="/images/Projects/commemor/commemorSynagogue.png"
            caption="Our digital recreation of the old Synagogue in Schwäbisch Gmünd, put into context by the AR application."
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
