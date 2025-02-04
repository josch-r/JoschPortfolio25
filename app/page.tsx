
import { AboutSection } from "./components/sections/AboutSection";
import { HeroSection } from "./components/sections/HeroSection";
import ProjectSection from "./components/sections/ProjectsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectSection />
    </>
  );
}
