"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import styles from "./Navbar.module.css"

export function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <nav className="w-full bg-bg-primary py-4">
      <div className="container mx-auto px-4">
        <ul className="flex items-center justify-center space-x-8">
          {[
            { href: "/", label: "josch" },
            { href: "/projects", label: "projects" },
            { href: "/about", label: "about" },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`
                  text-base leading-[1.5] transition-all duration-300 ease-in-out
                  hover:text-primary
                  ${styles.navLink}
                  ${isActive(item.href) ? "text-primary font-bold" : "text-text-tertiary font-normal"}
                `}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

