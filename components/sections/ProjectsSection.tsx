import Image from "next/image";
import { GridLayout } from "@/components/layout/GridLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProjectSection() {
  const projects = [
    {
      name: "zebra",
      thumbnail: "/images/SelectedWork/zebraThumbnail.jpg",
      date: "07/2024",
      type: "bachelor thesis",
      textColor: "text-text-dark",
      index: 0,
    },
    {
      name: "ESWB",
      thumbnail: "/images/SelectedWork/eswbThumbnail.jpg",
      date: "02/2023",
      type: "client",
      textColor: "text-text-primary",
      index: 1,
    },
  ];

  return (
    <GridLayout>
      <h2 className="col-span-1 md:col-span-12 text-heading-medium !font-normal md:ms-8 mt-16">
        Selected Work
      </h2>
      {projects.map(({ name, thumbnail, date, type, textColor, index }) => (
        <div
          key={index}
          className={`col-span-1 md:col-span-12 lg:col-span-6 md:px-8 lg:px-0 ${index > 0 ? "lg:pr-8" : "lg:pl-8"}`}
        >
          <div className="relative w-full aspect-video">
            <Image
              src={thumbnail}
              alt={`Thumbnail of the ${name} project`}
              fill
              className="rounded-md object-contain"
            />
            <div className="absolute bottom-0 left-0 ps-8 pb-5">
              <h4 className={`text-hero !${textColor}`}>{name}</h4>
              <h5 className={`text-body-small !${textColor}`}>
                {type} | {date}
              </h5>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-end pt-auto col-span-1 md:col-span-12 md:me-8">
        <Link href="/projects">
          <Button variant="default">View all projects</Button>
        </Link>
      </div>
    </GridLayout>
  );
}
