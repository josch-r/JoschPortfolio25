// app/projects/page.tsx
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GridLayout } from "@/components/layout/GridLayout";
import { projects } from "@/lib/projectsData";


export default function ProjectsPage() {
  return (
    <GridLayout>
      {projects.map(
        ({ name, thumbnail, date, type, textColor, index, slug }) => (
          <Link
            key={index}
            href={`/projects/${slug}`}
            className={`cursor-pointer col-span-12 md:col-span-12 lg:col-span-6 mt-20 ${
              index === 1 ? "me-8" : "ms-8"
            }`}
          >
            <div className="relative w-full aspect-video">
              <Image
                src={thumbnail}
                alt={`Thumbnail of the ${name} project`}
                fill
                sizes="100%"
                className="rounded-md object-contain"
              />
              <div className="absolute bottom-0 left-0 ps-8 pb-5">
                <h4 className={`text-hero !${textColor}`}>{name}</h4>
                <h5 className={`text-body-small !${textColor}`}>
                  {type} | {date}
                </h5>
              </div>
            </div>
          </Link>
        )
      )}
    </GridLayout>
  );
}
