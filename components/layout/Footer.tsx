"use client";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="text-center py-5 text-text-tertiary text-caption ">
      <p>Built from hand with &lt;3</p>
      <p>
        <Link href="/impressum" className="underline">
          Impressum
        </Link>{" "}
        |{" "}
        <Link href="/datenschutz" className="underline">
          Datenschutzerklärung
        </Link>
      </p>
      <p className="pt-2">
        © {new Date().getFullYear()} Joschua Rothenbacher. All rights reserved.
      </p>
    </footer>
  );
}
