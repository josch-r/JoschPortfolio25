import Link from "next/link";
import { HeroScene } from "../3D/HeroScene";
import { GridLayout } from "../layout/GridLayout";

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
            <span className="mr-2">Take a look at what I do</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="fill-current text-primary"
            >
              <path d="M9.33938 1.12503C9.33938 0.503741 9.81347 2.64373e-05 10.3982 2.64629e-05C10.9829 2.64884e-05 11.457 0.503742 11.457 1.12503L11.457 10.875C11.457 11.4963 10.9829 12 10.3982 12L1.22177 12C0.637013 12 0.162942 11.4963 0.162942 10.875C0.162942 10.2537 0.637013 9.75 1.22177 9.75L7.84194 9.75L0.473107 1.92049C0.0594602 1.48117 0.0594602 0.768866 0.473107 0.329546C0.886472 -0.109849 1.55692 -0.109849 1.97042 0.329546L9.33938 8.15899L9.33938 1.12503Z" />
            </svg>
          </Link>
        </section>
      </GridLayout>
    </>
  );
}
