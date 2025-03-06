"use client";

import { HeroScene } from "@/components/3D/HeroScene";
import { GridLayout } from "@/components/layout/GridLayout";
import { ArrowDownRight } from "lucide-react";
import { useCallback } from "react";
import { motion } from "framer-motion";

export function HeroSection() {
  const scrollToWork = useCallback(() => {
    const workSection = document.getElementById("work");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <header>
      <div aria-hidden="true">
        <HeroScene />
      </div>
      <GridLayout>
        <section
          aria-labelledby="hero-heading"
          className="md:col-span-12 relative flex flex-col items-center text-center h-[90vh] justify-between pt-[20vh] pointer-events-none"
        >
          <h1 className="text-hero xl:max-w-xl" id="hero-heading">
            I&apos;m <span className="text-primary">josch</span> and I enjoy
            creating things that simultaneously live in the{" "}
            <span className="text-primary">digital</span> and the{" "}
            <span className="text-primary">real world</span>.
          </h1>

          <motion.button
            onClick={scrollToWork}
            aria-label="Take a look at what I do"
            className="inline-flex items-center text-link hover:text-primary/90 transition-colors no-underline mb-12 cursor-pointer pointer-events-auto"
          >
            <span className="mr-1">Take a look at what I do</span>
            <ArrowDownRight aria-hidden="true" className="text-primary" />
          </motion.button>
        </section>
      </GridLayout>
    </header>
  );
}
