"use client";

import { useEffect, useState } from "react";
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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPosition = window.scrollY;

      if (totalHeight > 0) {
        const progress = (scrollPosition / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    // Initial calculation
    handleScroll();

    // Add event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (hideScrollbar) {
      // Add a style tag to hide the scrollbar
      const styleElement = document.createElement("style");
      styleElement.textContent = `
     html {
    overflow: scroll;
    overflow-x: hidden;
}
::-webkit-scrollbar {
    width: 0;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
}
/* Optional: show position indicator in red */
::-webkit-scrollbar-thumb {
    background: #FF0000;
}
      `;
      document.head.appendChild(styleElement);

      return () => {
        document.head.removeChild(styleElement);
      };
    }
  }, [hideScrollbar]);

  // Add keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Page Up and Page Down for keyboard navigation
      if (e.key === "PageUp") {
        window.scrollBy({ top: -window.innerHeight * 0.9, behavior: "smooth" });
      } else if (e.key === "PageDown") {
        window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" });
      } else if (e.key === "Home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (e.key === "End") {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
    {/* Visually hidden text for screen readers */}
    <div className="sr-only" aria-live="polite">
      {Math.round(scrollProgress)}% scrolled
    </div>

    <div
      className={cn(
        "fixed top-0 right-0 h-full",
        "pointer-events-none",
        className
      )}
      style={{
        zIndex,
        width: `${width}px`,
      }}
    >
      <div
        className={cn(
          "absolute top-0 right-0 w-full bg-neutral-600 ransition-all duration-100 ease-out",
          color && `bg-[${color}]`
        )}
        style={{
          height: `${scrollProgress}%`,
          width: `${width}px`,
        }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel}
      />
      <div
        className="absolute top-0 right-0 w-full h-full bg-muted/20"
        style={{ width: `${width}px` }}
      />
    </div>
    </>
  );
}
