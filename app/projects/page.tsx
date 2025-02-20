// app/projects/page.tsx
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GridLayout } from "@/components/layout/GridLayout";
import { projects } from "@/lib/projectsData";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Projects | Josch",
  description: "A collection of projects I have worked on.",
};

export default function ProjectsPage() {
  return (
    <GridLayout>
      <section className="col-span-12 mt-20 grid grid-cols-1 lg:grid-cols-2 gap-5">
      {projects.map(
        ({ name, thumbnail, date, type, textColor, index, slug }) => (
          <Link
            key={index}
            href={`/projects/${slug}`}
            className={`cursor-pointer col-span-1 odd:lg:ms-8 even:lg:me-8`}
          >
            <div className="relative w-full aspect-video">
              <Image
                src={thumbnail}
                alt={`Thumbnail of the ${name} project`}
                fill
                sizes="100%"
                className="rounded-md object-cover"
              />
              <div className="absolute bottom-0 left-0 ps-5 md:ps-8 pb-3 md:pb-5">
                <h4 className={`text-hero !${textColor}`}>{name}</h4>
                <h5 className={`text-body-small !${textColor}`}>
                  {type} | {date}
                </h5>
              </div>
            </div>
          </Link>
        )
      )}
      </section>
    </GridLayout>
  );
}
