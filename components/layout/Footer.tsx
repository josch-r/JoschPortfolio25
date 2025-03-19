
import Link from "next/link";

export function Footer() {
  return (
    <footer className="text-center py-5 text-text-tertiary text-caption ">
      <p>Built from hand with &lt;3</p>
      <p>
        <Link href="/imprint" className="underline">
          Imprint
        </Link>{" "}
        |{" "}
        <Link href="/privacy-policy" className="underline">
          Privacy Policy
        </Link>
      </p>
      <p className="pt-2">
        © {new Date().getFullYear()} Joschua Rothenbacher. All rights reserved.
      </p>
    </footer>
  );
}
