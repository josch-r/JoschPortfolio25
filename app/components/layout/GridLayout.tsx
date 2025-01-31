import type React from "react";

interface GridLayoutProps {
  children: React.ReactNode;
}

export function GridLayout({ children }: GridLayoutProps) {
  return (
    <div className="mx-auto w-full px-6 md:px-[124px]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">{children}</div>
    </div>
  );
}

