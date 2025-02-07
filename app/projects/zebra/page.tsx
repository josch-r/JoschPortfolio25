// app/projects/[project]/page.tsx
import { notFound } from "next/navigation";
import { projects } from "@/lib/projectsData";
import ProjectLayout from "@/components/layout/ProjectLayout";
import YouTubeEmbed from "@/components/ui/youtubeEmbeded";
import ImageWithCaption from "@/components/ui/imgWithCaption";
import BlockQuote from "@/components/ui/blockQuote";
import { GridLayout } from "@/components/layout/GridLayout";
import { Metadata } from "next";

const slug = "zebra";

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
      "zebra",
      "inclusive design",
      "audiodescription",
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
              Live theater is an immersive experience, but for blind and
              visually impaired audiences, it often lacks accessibility.
              Traditional audiodescription workflows are labor-intensive, rely
              on sighted professionals, and rarely include blind authors all the
              way in the creative process. Additionally, the process of
              synchronizing descriptions with performances can be complex and
              time-consuming. With zebra, we set out to solve these challenges
              by developing a tool that streamlines, simplifies, and empowers
              all creators—blind and sighted alike.
            </p>

            <YouTubeEmbed
              videoId="37hy9mMcZbM"
              caption="A video explaining zebra"
            />
            <p className="text-body mt-2">
              zebra is an innovative tool that simplifies and enhances the
              creation of audio descriptions for live theater. With synchronized
              scripts, role-specific views, and accessibility-focused features,
              it streamlines the workflow for both blind and sighted users. A
              screenreader-optimized interface enables blind authors to
              contribute from the start, fostering autonomy and inclusion.
              Developed in close collaboration with audio description
              professionals, theater makers, and blind users, it breaks down
              barriers and makes the production of high-quality descriptions
              more efficient. By improving accessibility, zebra helps create a
              more inclusive theater experience for all.
            </p>
          </section>
          <section className="mt-16 col-span-1 md:col-span-8 md:col-start-3 grid grid-cols-10 gap-x-5">
            <h3 className="text-heading-medium col-span-10">Process</h3>
            <p className="text-body mt-2 col-span-10 md:col-span-5">
              Developing zebra was a deeply iterative and research-driven
              journey. We started by engaging with theater professionals,
              audiodescription experts, and blind users to understand the
              real-world challenges in the field. Through hands-on
              research—including interviews, observations, and workflow
              analysis—we uncovered inefficiencies and accessibility gaps in
              existing methods. With this foundation, we moved into prototyping
              and user testing, refining each feature based on real-world
              feedback. Our goal was to create a tool that not only enhances
              efficiency but also fosters seamless collaboration between blind
              and sighted creators. By integrating zebra directly into existing
              workflows, we ensure that accessibility is not an afterthought but
              a core part of the creative process.
            </p>
            <ImageWithCaption
              src="/images/Projects/zebra/zebraProcess.jpg"
              caption="Nyal infront of one of our many Whiteboards"
              classprops="col-span-10 md:col-span-5 mt-5 md:mt-0"
            />
          </section>

          <section className="mt-16 col-span-1 md:col-span-8 md:col-start-3">
            <BlockQuote
              author="— From our interviews with audiodescription specialists"
              direct={false}
              quote="Creating live audiodescriptions is extremely time-consuming and demanding. There is often not enough room for true collaboration, especially with blind authors. A tool that structures and simplifies this process could revolutionize the entire workflow and ultimately significantly improve the quality of audiodescriptions"
            />
          </section>

          <section className="mt-16 col-span-1 md:col-span-8 md:col-start-3 grid grid-cols-10 gap-x-5 text-body">
            <h3 className="text-heading-medium col-span-10">
              Key Features & How It Works
            </h3>
            <p className="text-body col-span-10 mt-2 md:max-w-[50%]">
              zebra simplifies the creation of live audiodescriptions by
              combining intuitive editing, real-time synchronization, and
              dedicated interfaces for authors and narrators.
            </p>
            <div className="col-span-10 md:col-span-5 mt-8 flex flex-col justify-between">
              <div>
                <h3 className="text-heading-medium">
                  Efficient Editing & Script Management
                </h3>
                <p className="mt-2">
                  The editing view allows users to structure, refine, and time
                  audiodescriptions efficiently. Descriptions can be added
                  directly into the script, adjusted with precise timestamps,
                  and collaboratively edited in real time. A clean interface
                  ensures smooth navigation, making the workflow intuitive for
                  both sighted and blind users.
                </p>
              </div>
              <ImageWithCaption
                src="/images/Projects/zebra/zebraEdit.jpg"
                caption="The editing view of zebra"
                classprops=""
              />
            </div>
            <div className="col-span-10 md:col-span-5 mt-8 flex flex-col justify-between">
              <div>
                <h3 className="text-heading-medium">Review & Editorial View</h3>
                <p className="mt-2">
                  The Editorial View is designed for reviewing and refining
                  descriptions before a performance, especially tailored for
                  visually impaired authors. Users can preview synthesized
                  speech to ensure proper timing. A built-in comment function
                  enables collaboration, while the notes feature allows
                  structured observations without altering the script.
                </p>
              </div>
              <ImageWithCaption
                src="/images/Projects/zebra/zebraReview.jpg"
                caption="The review view of zebra"
                classprops="mt-8"
              />
            </div>
            <div className="col-span-10 md:col-span-5 mt-16 flex flex-col justify-between">
              <h3 className="text-heading-medium">
                Real-Time Narration with Live Mode
              </h3>
              <p className="mt-2">
                The Live Mode provides a distraction-free, high-contrast
                interface for narrators, with scrolling text and precise
                indicators, when an AD is needed. Synchronization with the
                live-performance ensures seamless delivery, helping speakers
                keep pace effortlessly.
              </p>
              <ImageWithCaption
                src="/images/Projects/zebra/zebraLive.jpg"
                caption="The live view of zebra"
                classprops="mt-auto"
              />
            </div>
            <div className="col-span-10 md:col-span-5 mt-16 flex flex-col justify-between">
              <h3 className="text-heading-medium">
                Enhancing Audiodescription with Early Collaboration
              </h3>
              <p className="mt-2">
                zebra streamlines the entire audiodescription process by
                allowing blind and sighted authors to collaborate
                asynchronously. Visually impaired contributors can start working
                on descriptions much earlier, rather than being involved only at
                later review stages. This not only enhances efficiency but also
                improves the overall quality of audiodescriptions by ensuring
                diverse perspectives are integrated from the start.
              </p>
              <ImageWithCaption
                src="/images/Projects/zebra/zebraFeatureDiagram.png"
                caption="The collaboration view of zebra"
                classprops="mt-8"
              />
            </div>
          </section>

          <section className="col-span-1 md:col-span-4 md:col-start-3 mt-16">
            <h3 className="text-heading-medium">Round-Up</h3>
            <p className="text-body mt-2">
              zebra is the result of an intensive research and design process,
              informed by interviews, user testing, and real-world theater
              applications. Initially stepping into unfamiliar territory, we
              engaged deeply with audio description professionals, theater
              makers, and blind users to understand and improve existing
              workflows. The result is a tool that enables asynchronous
              collaboration between blind and sighted authors, improving both
              efficiency and quality.
            </p>
            <p className="text-body mt-2">
              Our work is rooted in the belief that accessibility should not be
              an afterthought but a fundamental part of the creative process. By
              allowing blind authors to contribute earlier and aligning text
              with video more efficiently, zebra significantly enhances the
              quality of audiodescriptions while making their production more
              sustainable for theaters.
            </p>
          </section>
          <ImageWithCaption
            src="/images/Projects/zebra/zebraMockup.jpg"
            caption="Mockup of zebra"
            classprops="col-span-1 md:col-span-8 md:col-start-3"
          />
        </GridLayout>
      </ProjectLayout>
    </>
  );
}
