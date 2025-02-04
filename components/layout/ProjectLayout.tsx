import { Project } from "@/lib/projectsData";
import { GridLayout } from "./GridLayout";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function ProjectLayout({
  project,
  children,
}: {
  project: Project;
  children: React.ReactNode;
}) {
  const contextLines = project.context.split("/");

  return (
    <GridLayout>
      <Link
        href="/projects"
        className="col-span-1 col-start-2 mt-[120px] flex items-center justify-end"
      >
        <ArrowLeft color="#F5F5F5" />
      </Link>
      <div className="col-span-8 col-start-3 mt-[120px]">
        <h1 className="text-heading-large">{project.name}</h1>
      </div>

      {/* Project information  */}
      <div className="col-span-4 col-start-3 mt-8">
        <h4 className="text-heading-small">CONTEXT</h4>
        <div className="space-y-0 mt-2 text-body-small !text-text-tertiary">
          {contextLines.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
      <div className="col-span-2 col-start-7 mt-8">
        <h4 className="text-heading-small">DATE</h4>
        <div className="space-y-0 mt-2 text-body-small !text-text-tertiary">
          <p>{project.date}</p>
        </div>
      </div>
      <div className="col-span-2 col-start-9 mt-8">
        <h4 className="text-heading-small">TEAM</h4>
        <div className="space-y-0 mt-2 text-body-small !text-text-tertiary">
          {project.teamMembers.map((member, index) => (
            <p key={index}>{member}</p>
          ))}
        </div>
      </div>

      {/* Project Links  */}
      <div className="col-span-8 col-start-3 mt-8 flex flex-row space-x-12">
        {project.projectLinks.map((link, index) => (
          <div key={index} className="flex items-center space-x-2">
            <ArrowUpRight />
            <h2  className="text-link">
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.title}
              </a>
            </h2>
          </div>
        ))}
      </div>

      {children}
    </GridLayout>
  );
}
