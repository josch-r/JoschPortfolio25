import { Project } from "@/lib/projectsData";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Head from "next/head";

export default function ProjectLayout({
  project,
  children,
}: {
  project: Project;
  children: React.ReactNode;
}) {
  const contextLines = project.context.split("/");

  return (
    <>
      <Head>
        <title>{project.name} | Josch</title>
        <meta
          name="description"
          content={project.description || "Project details and insights"}
        />

        {/* Open Graph for Facebook, LinkedIn, WhatsApp, etc. */}
        <meta property="og:title" content={project.name} />
        <meta property="og:description" content={project.description || ""} />
        <meta property="og:title" content={project.name} />
        <meta property="og:image" content={project.thumbnail} />
        <meta
          property="og:url"
          content={`https://joschua-rothenbacher.de/projects/${project.slug}`}
        />
      </Head>
      <div className="grid grid-cols-2 md:grid-cols-12 gap-5 px-6 md:px-[124px] 2xl:px-[248px]">
        <Link
          href="/projects"
          className="md:col-start-2 mt-20 md:mt-[120px] md:flex items-center justify-start md:justify-end hidden"
        >
          <ArrowLeft color="#F5F5F5" />
        </Link>
        <div className="col-span-2 md:col-span-8 md:col-start-3 mt-20 md:mt-[120px]">
          <h1 className="text-heading-large">{project.name}</h1>
        </div>
        {/* Project information  */}
        <div className="col-span-2 md:col-span-4 md:col-start-3 mt-5 md:mt-8">
          <h4 className="text-heading-small">CONTEXT</h4>
          <div className="space-y-0 mt-2 text-body-small !text-text-tertiary">
            {contextLines.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 md:col-start-7 md:mt-8">
          <h4 className="text-heading-small">TEAM</h4>
          <div className="space-y-0 mt-2 text-body-small !text-text-tertiary">
            {project.teamMembers.map((member, index) => (
              <p key={index}>{member}</p>
            ))}
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 md:col-start-9 md:mt-8">
          <h4 className="text-heading-small">DATE</h4>
          <div className="space-y-0 mt-2 text-body-small !text-text-tertiary">
            <p>{project.date}</p>
          </div>
        </div>

        {/* Project Links  */}
        <div className="col-span-2 md:col-span-8 md:col-start-3 mt-5 flex flex-col lg:flex-row lg:space-x-16 space-y-5 lg:space-y-0">
          {project.projectLinks.map((link, index) => (
            <div key={index} className="flex items-center space-x-2">
              <ArrowUpRight className="text-primary" />
              <h2 className="text-link">
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.title}
                </a>
              </h2>
            </div>
          ))}
        </div>
      </div>
      {children}
    </>
  );
}
