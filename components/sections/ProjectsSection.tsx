"use client";

import Image from "next/image";
import { GridLayout } from "@/components/layout/GridLayout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const viewport = { once: true, margin: "-10%" };

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
      <motion.h2
        className="col-span-1 md:col-span-12 text-heading-medium !font-normal md:ms-8 mt-16"
        id="projects-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
      >
        Selected Work
      </motion.h2>
      {projects.map(
        ({ name, slug, thumbnail, date, type, textColor, index }) => (
          <motion.div
            key={index}
            className={`col-span-1 md:col-span-12 lg:col-span-6 md:px-8 lg:px-0   ${
              index > 0 ? "lg:pr-8" : "lg:pl-8"
            }`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{
              duration: 0.4,
              ease: [0.215, 0.61, 0.355, 1],
              delay: index * 0.08,
            }}
          >
            <Link href={`/projects/${slug.toLowerCase()}`}>
              <div className="relative w-full aspect-video cursor-pointer">
                <Image
                  src={thumbnail}
                  alt={`${name} project thumbnail - ${type}`}
                  fill
                  className="rounded-md md:saturate-0 object-contain hover:saturate-100 transition-[filter] ease-out duration-300"
                />
                <div className="absolute bottom-0 left-0 ps-8 pb-5">
                  <h3 className={`text-hero !${textColor}`}>{name}</h3>
                  <h4 className={`text-body-small !${textColor}`}>
                    {type} | {date}
                  </h4>
                </div>
              </div>
            </Link>
          </motion.div>
        )
      )}
      <motion.div
        className="flex justify-end pt-auto col-span-1 md:col-span-12 md:me-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1], delay: 0.16 }}
      >
        <Link href="/projects" aria-label="View all projects">
          <Button variant="default" className="cursor-pointer">
            View all projects
          </Button>
        </Link>
      </motion.div>
    </GridLayout>
  );
}
