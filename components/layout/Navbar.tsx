"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import {
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
  motion,
} from "framer-motion";
import { useEffect, useState } from "react";

export function Navbar() {
  const pathname = usePathname();

  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  useEffect(() => {
    if (pathname === "/imprint" || pathname === "/privacy-policy") {
      setVisible(true);
    }
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        className="w-full fixed z-10 bg-bg-primary/50 backdrop-blur-lg py-5 shadow-sm"
        initial={{ opacity: 1, y: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="container mx-auto">
          <ul className="flex items-center justify-center space-x-8">
            {[
              { href: "/", label: "Josch" },
              { href: "/projects", label: "Projects" },
              { href: "/about", label: "About" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                  md:text-base text-[0.875rem] leading-[1.5] transition-all duration-300 ease-in-out
                  hover:text-primary
                  ${styles.navLink}
                  ${
                    isActive(item.href)
                      ? "text-primary font-bold"
                      : "text-text-tertiary font-normal"
                  }
                `}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>
    </AnimatePresence>
  );
}
