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
      description:"zebra is an innovative tool that simplifies and enhances the creation of audio descriptions for live theater. With synchronized scripts, role-specific views, and accessibility-focused features, it streamlines the workflow for both blind and sighted users. ",
      teamMembers: ["Fabienne Vatter", "Nyal Hettmer"],
      context: "University / Bachelorthesis at HfG Gmünd / Supervised by: Jens Döring, Fabian Rauch",
      projectLinks: [ { title: "Project Website", url: "https://zebra-linktree.vercel.app/" }, {title: "Documentation", url: "todo"}, {title: "UX-Design-Awards", url: "https://ux-design-awards.com/winners/2025-1-zebra"}],
    },
    {
      name: "Eine Stadt wird bunt",
      thumbnail: "/images/Projects/eswbThumbnail.jpg",
      date: "11/2022",
      type: "client",
      textColor: "text-text-primary",
      index: 1,
      description:"Eine Stadt wird bunt is an AR App",
      slug: "eswb",
      teamMembers: ["FLUUR"],
      context: "Client / Exhibition Design / as Intern at FLUUR",
      projectLinks: [ { title: "Project Website", url: "https://www.fluur.de/" }, {title: "Documentation", url: ""}],
    },
    // ...other projects
  ];
  