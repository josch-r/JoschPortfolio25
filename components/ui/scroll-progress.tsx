"use client";

import { useEffect, useState } from "react";
import { useScroll, useSpring, motion, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  color?: string;
  width?: number;
  zIndex?: number;
  className?: string;
  hideScrollbar?: boolean;
  ariaLabel?: string;
}

export function ScrollProgress({
  color,
  width = 5,
  zIndex = 50,
  className,
  hideScrollbar = true,
  ariaLabel = "Page scroll progress",
}: ScrollProgressProps) {
  const [ariaProgress, setAriaProgress] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.5 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setAriaProgress(Math.round(v * 100));
  });

  useEffect(() => {
    if (hideScrollbar) {
      const styleElement = document.createElement("style");
      styleElement.textContent = `
        html { overflow: scroll; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 0; background: transparent; }
      `;
      document.head.appendChild(styleElement);
      return () => {
        document.head.removeChild(styleElement);
      };
    }
  }, [hideScrollbar]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const behavior = prefersReduced ? "auto" : "smooth";
      if (e.key === "PageUp") {
        window.scrollBy({ top: -window.innerHeight * 0.9, behavior });
      } else if (e.key === "PageDown") {
        window.scrollBy({ top: window.innerHeight * 0.9, behavior });
      } else if (e.key === "Home") {
        window.scrollTo({ top: 0, behavior });
      } else if (e.key === "End") {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="sr-only" aria-live="polite">
        {ariaProgress}% scrolled
      </div>

      <div
        className={cn("fixed top-0 right-0 h-full pointer-events-none", className)}
        style={{ zIndex, width: `${width}px` }}
      >
        <div
          className="absolute top-0 right-0 w-full h-full bg-muted/20"
          style={{ width: `${width}px` }}
        />
        <motion.div
          className={cn("absolute top-0 right-0 w-full h-full bg-neutral-600", color && `bg-[${color}]`)}
          style={{
            scaleY,
            transformOrigin: "top",
            width: `${width}px`,
          }}
          role="progressbar"
          aria-valuenow={ariaProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={ariaLabel}
        />
      </div>
    </>
  );
}
