import { HeroScene } from "./components/3D/HeroScene";
import { GridLayout } from "./components/layout/GridLayout";

export default function Home() {
  return (
    <>
      <HeroScene />
      <GridLayout>
        <div className="col-span-12">
          {/* <h1 className="text-heading-large">Welcome to My Portfolio</h1> */}
        </div>
      </GridLayout>
    </>
  );
}
