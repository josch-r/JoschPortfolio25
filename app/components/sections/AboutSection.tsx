import Image from "next/image";
import { GridLayout } from "../layout/GridLayout";
import { Button } from "@/components/ui/button"

export function AboutSection() {
  return (
    <section className="pt-28">
      <GridLayout>
        <AboutText />
        <ShortVita />
        <Education />
      </GridLayout>
    </section>
  );
}

function AboutText() {
  return (
    <div className="col-span-4 mx-8">
      <h2 className="text-heading-medium !font-normal mb-5">About me</h2>
      <div className="flex flex-row items-center">
        <Image
          src="/images/joschSketch.png"
          width={80}
          height={80}
          alt="Portrait shot of Josch, wearing a dark outfit"
          className="rounded-full object-cover"
        />
        <div className="ml-5 flex flex-col">
          <p className="text-body">Joschua Rothenbacher</p>
          <p className="text-text-tertiary">Creative Technologist</p>
        </div>
      </div>
      <p className="text-body-small !text-text-secondary mt-4">
        I&apos;m a creative technologist exploring the intersection of design
        and technology to create user-centered solutions. From exploring hybrid
        experiences to designing meaningful interactions, my work is driven by a
        passion for creating impactful and thoughtful designs. Explore my
        projects and see for yourself!
      </p>
    </div>
  );
}

function ShortVita() {
  const experiences = [
    {
      year: "2019",
      role: "Software Developer Intern",
      company: "Widerstand & Söhne",
      location: "Ulm, Germany",
      link: "https://www.widerstandundsoehne.de/",
    },
    {
      year: "2022",
      role: "Design & Development Intern",
      company: "Fluur",
      location: "Cologne, Germany",
      link: "https://fluur.de",
    },
    {
      year: "2024",
      role: "Supervisor Medialab",
      company: "HfG Schwäbisch Gmünd",
      location: "Schwäbisch Gmünd, Germany",
      link: "https://hfg-gmuend.de",
    },
  ];

  return (
    <div className="col-span-4 mx-8">
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
                className="text-body-small !text-text-secondary underline inline-flex items-center gap-1 hover:text-primary/80 transition"
              >
                {company}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="9"
                  viewBox="0 0 8 9"
                  fill="none"
                  className="fill-current"
                >
                  <path d="M0.750018 2.13428C0.335828 2.13428 1.76728e-05 1.79847 1.76728e-05 1.38428C1.76728e-05 0.970087 0.335828 0.634277 0.750018 0.634277H7.25C7.6642 0.634277 8 0.970087 8 1.38428V7.88426C8 8.29846 7.6642 8.63426 7.25 8.63426C6.8358 8.63426 6.5 8.29846 6.5 7.88426V3.19497L1.28033 8.41456C0.987448 8.70756 0.512578 8.70756 0.219698 8.41456C-0.0732325 8.12176 -0.0732325 7.64686 0.219698 7.35396L5.43933 2.13428H0.750018Z" />
                </svg>
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
      year: "2019",
      degree: "Abitur",
      company: "Waldorfschule am Illerblick",
      location: "Ulm, Germany",
      link: "https://www.waldorfschule-am-illerblick.de/",
    },
    {
      year: "2024",
      degree: "B.A. Digital Product Design & Development",
      company: "HfG Schwäbisch Gmünd",
      location: "Schwäbisch Gmünd, Germany",
      link: "https://hfg-gmuend.de",
    },
  ];

  return (
    <div className="col-span-4 mx-8">
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
                className="text-body-small !text-text-secondary underline inline-flex items-center gap-1 hover:text-primary/80 transition"
              >
                {company}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="9"
                  viewBox="0 0 8 9"
                  fill="none"
                  className="fill-current"
                >
                  <path d="M0.750018 2.13428C0.335828 2.13428 1.76728e-05 1.79847 1.76728e-05 1.38428C1.76728e-05 0.970087 0.335828 0.634277 0.750018 0.634277H7.25C7.6642 0.634277 8 0.970087 8 1.38428V7.88426C8 8.29846 7.6642 8.63426 7.25 8.63426C6.8358 8.63426 6.5 8.29846 6.5 7.88426V3.19497L1.28033 8.41456C0.987448 8.70756 0.512578 8.70756 0.219698 8.41456C-0.0732325 8.12176 -0.0732325 7.64686 0.219698 7.35396L5.43933 2.13428H0.750018Z" />
                </svg>
              </a>
              <p className="text-body-small !text-text-tertiary">{location}</p>
            </div>
          </div>
        ))}
        <Button variant="secondary">Button</Button>
      </div>
    </div>
  );
}
