import Image from "next/image";
import { GridLayout } from "@/components/layout/GridLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProjectSection() {
  const projects = [
    {
      name: "zebra",
      slug: "zebra",
      thumbnail: "/images/SelectedWork/zebraThumbnail.jpg",
      date: "07/2024",
      type: "bachelor thesis",
      textColor: "text-text-dark",
      index: 0,
    },
    {
      name: "Eine Stadt wird bunt",
      slug: "eswb",
      thumbnail: "/images/SelectedWork/eswbThumbnail.jpg",
      date: "02/2023",
      type: "client",
      textColor: "text-text-primary",
      index: 1,
    },
  ];

  return (
    <GridLayout aria-labelledby="projects-heading">
        <h2 className="col-span-1 md:col-span-12 text-heading-medium !font-normal md:ms-8 mt-16" id="projects-heading">
          Selected Work
        </h2>
        {projects.map(({ name, slug, thumbnail, date, type, textColor, index }) => (
          <div
            key={index}
            className={`col-span-1 md:col-span-12 lg:col-span-6 md:px-8 lg:px-0 ${
              index > 0 ? "lg:pr-8" : "lg:pl-8"
            }`}
          >
            <Link href={`/projects/${slug.toLowerCase()}`}>
              <div className="relative w-full aspect-video cursor-pointer">
                <Image
                  src={thumbnail}
                  alt={`${name} project thumbnail - ${type}`} 
                  fill
                  className="rounded-md object-contain"
                />
                <div className="absolute bottom-0 left-0 ps-8 pb-5">
                  <h3 className={`text-hero !${textColor}`}>{name}</h3>
                  <h4 className={`text-body-small !${textColor}`}>
                    {type} | {date}
                  </h4>
                </div>
              </div>
            </Link>
          </div>
        ))}
        <div className="flex justify-end pt-auto col-span-1 md:col-span-12 md:me-8">
          <Link href="/projects" aria-label="View all projects">
            <Button variant="default" className="cursor-pointer">
              View all projects
            </Button>
          </Link>
        </div>
    </GridLayout>
  );
}
