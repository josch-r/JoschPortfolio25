import Image from "next/image";
import { GridLayout } from "@/components/layout/GridLayout";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

import Link from "next/link";

export function AboutSection() {
  return (
    <section className="pt-28" id="work" aria-labelledby="about-heading">
      <GridLayout>
        <AboutText />
        <ShortVita />
        <Education />
        <div className="flex justify-end gap-2 pt-auto col-span-1 md:col-span-12 md:me-8">
          <Button
            variant="outline"
            size="icon"
            aria-label="Linkedin Profile"
            asChild
          >
            <a
              href="https://www.linkedin.com/in/joschua-rothenbacher-431448200/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
          </Button>
          <Button variant="outline" size="icon" aria-label="GitHub Profile">
            <a
              href="https://github.com/josch-r"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
          </Button>

          <Link href="/about" aria-label="Read more">
            <Button variant="secondary">Read more</Button>
          </Link>
        </div>
      </GridLayout>
    </section>
  );
}

function AboutText() {
  return (
    <div className="col-span-1 md:col-span-12 lg:col-span-4 md:mx-8">
      <h2 className="text-heading-medium !font-normal mb-5" id="about-heading">
        About me
      </h2>
      <div className="flex flex-row items-center">
        <Image
          src="/images/joschSketch.png"
          width={80}
          height={80}
          alt="Joschua Rothenbacher, Creative technologist. Sketch."
          className="rounded-full object-cover"
        />
        <div className="ml-5 flex flex-col">
          <h3 className="text-body">Joschua Rothenbacher</h3>
          <h4 className="text-text-tertiary">Creative Technologist</h4>
        </div>
      </div>
      <p className="text-body-small !text-text-secondary mt-4">
        I&apos;m a creative technologist passionate about blending design and
        technology to create human-centered solutions. My journey is driven by
        curiosity, innovation, and the desire to make a meaningful impact. For
        me, technology is more than just tools—it&apos;s a way to connect,
        inspire, and create experiences that matter. I believe in putting humans
        first, ensuring that every solution, whether digital or analog,
        addresses real needs with thoughtfulness and care.
      </p>
    </div>
  );
}
function ShortVita() {
  const experiences = [
    {
      year: "2024",
      role: "Supervisor Medialab",
      company: "HfG Schwäbisch Gmünd",
      location: "Schwäbisch Gmünd, Germany",
      link: "https://hfg-gmuend.de",
    },
    {
      year: "2022",
      role: "Design & Development Intern",
      company: "Fluur",
      location: "Cologne, Germany",
      link: "https://fluur.de",
    },
    {
      year: "2019",
      role: "Software Developer Intern",
      company: "Widerstand & Söhne",
      location: "Ulm, Germany",
      link: "https://www.widerstandundsoehne.de/",
    },
  ];

  return (
    <div className="col-span-1 md:col-span-12 lg:col-span-4 md:mx-8">
      <h2 className="text-heading-medium !font-normal mb-5">Short Vita</h2>
      <div className="grid gap-y-6">
        {experiences.map(({ year, role, company, location, link }) => (
          <div key={year} className="grid grid-cols-[auto_1fr] gap-x-16">
            {/* Year Column */}
            <span className="text-body-small !text-text-tertiary">{year}</span>

            {/* Job Info Column */}
            <div>
              <h3 className="text-body-small !font-medium">{role}</h3>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-body-small !text-text-secondary underline inline-flex items-center gap-1 hover:text-primary/80 transition"
                aria-label={`Visit ${company} website`}
              >
                {company}
                <ArrowUpRight size={16} aria-hidden="true" className="group-hover:rotate-45 transition-transform ease-out duration-200" />
              </a>
              <p className="text-body-small !text-text-tertiary">{location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function Education() {
  const education = [
    {
      year: "2024",
      degree: "B.A. Digital Product Design & Development",
      company: "HfG Schwäbisch Gmünd",
      location: "Schwäbisch Gmünd, Germany",
      link: "https://hfg-gmuend.de",
    },
    {
      year: "2019",
      degree: "Abitur",
      company: "Waldorfschule am Illerblick",
      location: "Ulm, Germany",
      link: "https://www.waldorfschule-am-illerblick.de/",
    },
  ];

  return (
    <div className="col-span-1 md:col-span-12 lg:col-span-4 md:mx-8">
      <h2 className="text-heading-medium !font-normal mb-5">Education</h2>
      <div className="grid gap-y-6">
        {education.map(({ year, degree, company, location, link }) => (
          <div key={year} className="grid grid-cols-[auto_1fr] gap-x-16">
            {/* Year Column */}
            <span className="text-body-small !text-text-tertiary">{year}</span>

            {/* Job Info Column */}
            <div>
              <h3 className="text-body-small !font-medium">{degree}</h3>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-body-small !text-text-secondary underline inline-flex items-center gap-1 hover:text-primary/80 transition"
                aria-label={`Visit ${company} website`}
              >
                {company}
                <ArrowUpRight size={16} aria-hidden="true" className="group-hover:rotate-45 transition-transform ease-out duration-200"/>
              </a>
              <p className="text-body-small !text-text-tertiary">{location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
