import { GridLayout } from "@/components/layout/GridLayout";

export default function Impressum() {
  return (
    <GridLayout>
      <section className="mt-20 col-span-6 col-start-4 text-body mb-20">
        <h3 className="text-heading-large">Imprint</h3>
        <p className="text-heading-medium mt-10">
          Information pursuant to § 5 TMG
        </p>
        <ul>
          <li>Joschua Rothenbacher</li>
        </ul>
        <h3 className="text-heading-medium mt-5">Contact:</h3>
        <ul>
          <li>E-Mail: j.rothenbacher@yahoo.de</li>
          <li>Phone: +49 1573 9082816</li>
        </ul>
        <h3 className="text-heading-medium mt-5"> Notes:</h3>
        <p>Responsible for content: Joschua Rothenbacher</p>
        <h3 className="text-heading-medium mt-5">Disclaimer:</h3>
        <p>
          Despite careful content control, I assume no liability for the content
          of external links. The operators of the linked pages are solely
          responsible for their content.
        </p>
        <h3 className="text-heading-medium mt-5">Copyright:</h3>
        <p>
          The content published on this website is subject to German copyright
          law. Reproduction, editing, or distribution requires the written
          consent of the respective author.
        </p>
      </section>
    </GridLayout>
  );
}
