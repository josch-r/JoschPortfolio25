import { Project } from "./projectsData";
  
  export const archivedProjects: Project[] = [
    {
      name: "endstation visuals",
      thumbnail: "/images/Projects/endstationVisualsThumbnail.jpg",
      date: "05/2025",
      type: "personal project",
      textColor: "text-text-primary",
      index: 0,
      slug: "endstation-visuals",
      description:
        "Endstation Visuals is a personal project that explores the intersection of art and technology, utilizing AI Generation to create immersive visuals.",
      teamMembers: ["Joschua Rothenbacher"],
      context:
        "Personal / Audiodreactive Visuals / Built with Touchdesigner + Streamdiffusion",
      projectLinks: [
        {
          title: "StreamDiffusion TOX",
          url: "https://www.patreon.com/c/dotsimulate/home"
        }
      ],
    },
    {
      name: "your-fav-img",
      thumbnail: "/images/Projects/yfiThumbnail3.jpg",
      date: "02/2023",
      type: "personal project",
      textColor: "text-text-primary",
      index: 1,
      slug: "your-fav-img",
      description:
        "Your Favourite Image was a side project i did to play around with React-Three-Fiber and generating depth maps with AI.",
      teamMembers: ["Joschua Rothenbacher"],
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
      date: "07/2021",
      type: "University",
      textColor: "text-text-dark",
      index: 2,
      description:
        "Remote Gardening: An innovative smart garden system that waters your plants automatically while you're away. Control your garden remotely, monitor plant health, and never worry about neglected plants again. Perfect for travelers and busy plant lovers.",
      slug: "remote-gardening",
      teamMembers: ["Jannes Blobel", "Fabienne Vatter"],
      context: "University / Technical Fundamentals II – 2nd Semester /  Supervised by: Prof. Michael Schuster, Benjamin Thomsen",
      projectLinks: [
        { title: "Online Exhibition", url: "https://ausstellung.hfg-gmuend.de/s-2121/projekte/remote-gardening" },
        { title: "Git Repo", url: "https://github.com/josch-r/RemoteGardeningTG2" }
      ],
    },
  ]