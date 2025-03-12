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
      date: "07/2021",
      type: "University",
      textColor: "text-text-dark",
      index: 1,
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