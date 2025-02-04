import Link from "next/link";
import { HeroScene } from "@/components/3D/HeroScene";
import { GridLayout } from "@/components/layout/GridLayout";
import { ArrowDownRight } from "lucide-react";

export function HeroSection() {
  return (
    <>
      <HeroScene />
      <GridLayout>
        <section className="md:col-span-12 relative flex flex-col items-center text-center h-[90vh] justify-between pt-[20vh]">
          <h1 className="text-hero xl:max-w-xl">
            I&apos;m <span className="text-primary">Josch</span> and I
            enjoy creating things that simultaneously live in the{" "}
            <span className="text-primary">digital</span> and the{" "}
            <span className="text-primary">real world</span>.
          </h1>

          <Link
            href="#work"
            className="inline-flex items-center text-link hover:text-primary/90 transition-colors no-underline mb-12"
          >
            <span className="mr-1">Take a look at what I do</span>
            <ArrowDownRight className="text-primary"/>
          </Link>
        </section>
      </GridLayout>
    </>
  );
}
