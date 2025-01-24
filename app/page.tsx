import Link from "next/link";
import { GridLayout } from "./components/layout/GridLayout";

export default function Home() {
  return (
    <GridLayout>
      <div className="col-span-12">
        <h1 className="text-heading-large mb-6">Welcome to My Portfolio</h1>
      </div>
      <div className="col-span-6">
        <p className="text-body mb-4">
          Hi, I'm Josch. I'm a web developer specializing in Next.js, React, and
          3D web experiences.
        </p>
      </div>
      <div className="col-span-6">
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/about" className="text-link">
                About
              </Link>
            </li>
            <li>
              <Link href="/projects" className="text-link">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-link">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </GridLayout>
  );
}
