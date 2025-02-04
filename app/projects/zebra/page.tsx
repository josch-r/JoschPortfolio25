// app/projects/[project]/page.tsx
// import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projectsData";
import ProjectLayout from"@/components/layout/ProjectLayout";


const slug = "zebra";

// Optionally, look up your project data based on this slug:
const projectData = projects.find((p) => p.slug === slug);

export default function ProjectPage() {

  if (!projectData) {
    return notFound();
  }

  return (
    <ProjectLayout project={projectData}>
      {/* Your project-specific content */}
      {/* <div className="relative w-full aspect-video mb-8">
        <Image
          src={projectData.thumbnail}
          alt={`Thumbnail of ${projectData.name}`}
          fill
          className="rounded-md object-contain"
        />
      </div> */}
      {/* <p>Heres more detail about the project…</p> */}
      <div className="col-span-8 col-start-3 mt-8">
        test
      </div>
    </ProjectLayout>
  );
}
