import { Project } from "./projectsData";
  
  export const archivedProjects: Project[] = [
    {
      name: "your-fav-img",
      thumbnail: "/images/Projects/yfiThumbnail3.jpg",
      date: "02/2023",
      type: "personal project",
      textColor: "text-text-primary",
      index: 0,
      slug: "your-fav-img",
      description:
        "Your Favourite Image was a side project i did to play around with React-Three-Fiber and generating depth maps with AI.",
      teamMembers: [""],
      context:
        "Personal / Web-Dev Project / Built with React + React Three Fiber",
      projectLinks: [
        { title: "Project Website", url: "https://your-fav-img.netlify.app/" },
        {
          title: "Git Repo",
          url: "https://github.com/josch-r/your-fav-img",
        },
        {
          title: "AI Model",
          url: "https://huggingface.co/spaces/LiheYoung/Depth-Anything"
        }
      ],
    },
    {
      name: "Remote Gardening",
      thumbnail: "/images/Projects/remoteGardeningThumbnail.jpg",
      date: "11/2022",
      type: "University",
      textColor: "text-text-dark",
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
  ]