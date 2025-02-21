export interface Link {
  title: string;
  url: string;
}

export interface Project {
  name: string;
  thumbnail: string;
  date: string;
  type: string;
  textColor: string;
  index: number;
  slug: string;
  description: string;
  teamMembers: string[];
  context: string;
  projectLinks: Link[];
}

export const projects: Project[] = [
  {
    name: "zebra",
    thumbnail: "/images/Projects/zebraThumbnail.jpg",
    date: "07/2024",
    type: "bachelor thesis",
    textColor: "text-text-dark",
    index: 0,
    slug: "zebra",
    description:
      "zebra is an innovative tool that simplifies and enhances the creation of audio descriptions for live theater. With synchronized scripts, role-specific views, and accessibility-focused features, it streamlines the workflow for both blind and sighted users. ",
    teamMembers: ["Fabienne Vatter", "Nyal Hettmer"],
    context:
      "University / Bachelorthesis at HfG Gmünd / Supervised by: Jens Döring, Fabian Rauch",
    projectLinks: [
      { title: "Project Website", url: "https://zebra-linktree.vercel.app/" },
      { title: "Documentation", url: "todo" },
      {
        title: "UX-Design-Awards",
        url: "https://ux-design-awards.com/winners/2025-1-zebra",
      },
    ],
  },
  {
    name: "Eine Stadt wird bunt",
    thumbnail: "/images/Projects/eswbThumbnail.jpg",
    date: "11/2022",
    type: "client",
    textColor: "text-text-primary",
    index: 1,
    description:
      "UX & technical development for Eine Stadt wird bunt – an interactive exhibition blending digital media, app design, and installation technology to bring Hamburg's graffiti history to life.",
    slug: "eswb",
    teamMembers: ["FLUUR"],
    context: "Client Work / Digital Experience & UX / as Intern at FLUUR",
    projectLinks: [
      { title: "Project Website", url: "https://www.fluur.de/" },
      { title: "Exhibition", url: "https://www.shmh.de/ausstellungen/eswb/" },
      {
        title: "ADAC Tourism Award",
        url: "https://presse.adac.de/regionalclubs/hansa/adac-tourismuspreis.html",
      },
    ],
  },
  {
    name: "Commemor",
    thumbnail: "/images/Projects/CommemorThumbnail.jpg",
    date: "07/2022",
    type: "university",
    textColor: "text-text-primary",
    index: 2,
    description:
      "Commemor is an innovative augmented reality project that aims to preserve and modernize remembrance culture by bringing the stories behind Stolpersteine (memorial stones) to life through digital technology12. The project addresses the critical challenge of maintaining historical memory as fewer Holocaust survivors remain to share their firsthand accounts.",
    slug: "commemor",
    teamMembers: ["Evelin Gariung", "Vincent Paul"],
    context:
      "University / Invention Design II – 4th Semester /  Supervised by: Ludwig Kannicht, Patrick Kenzler",
    projectLinks: [
      {
        title: "HfG Portfolio",
        url: "https://portfolio.hfg-gmuend.de/s-2222/projekte/commemor",
      },
      { title: "Stolperstein Project", url: "https://www.stolpersteine.eu/" },
    ],
  },
  {
    name: "Toxic Europe",
    thumbnail: "/images/Projects/iksThumbnail.jpg",
    date: "07/2022",
    type: "university",
    textColor: "text-text-primary",
    index: 3,
    description:
      "An interactive museum installation combining projection mapping and touch interfaces to educate visitors about Europe's toxic creatures through innovative digital storytelling and physical interaction.",
    slug: "toxic-europe",
    teamMembers: ["Henri Kral", "Anna Schneider", "Gül Saritas"],
    context:
      "University / Digital Exhibits – 4th Semester / Supervised by: Prof. Jens Döring, Prof. Marc Guntow",
    projectLinks: [
      {
        title: "HfG Portfolio",
        url: "https://portfolio.hfg-gmuend.de/s-2222/projekte/commemor",
      },
      { title: "Documentation", url: "https://www.tbd.com/" },
    ],
  },
  {
    name: "Protect me from what I want",
    thumbnail: "/images/Projects/pmfwiwThumbnail.jpg",
    date: "02/2024",
    type: "university",
    textColor: "text-text-primary",
    index: 4,
    description:
      "A digital literacy initiative exploring mindful technology use and social media habits, offering practical strategies for achieving sustainable balance between digital engagement and analog well-being.",
    slug: "protect-me-from-what-i-want",
    teamMembers: ["Fabienne Vatter", "Nyal Hettmer"],
    context:
      "University / Lean Design Project – 6th Semester / Supervised by: Prof. Jens Döring, Prof. Dr. Gerhard Buurman",
    projectLinks: [
      {
        title: "Open Project",
        url: "https://protectmefromwhatiwant.netlify.app/",
      },
      { title: "One Sec", url: "https://one-sec.app/" },
    ],
  },
];
