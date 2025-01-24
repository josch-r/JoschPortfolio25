import type React from "react";

interface GridLayoutProps {
  children: React.ReactNode;
}

export function GridLayout({ children }: GridLayoutProps) {
  return (
    <div className="container mx-auto px-[124px]">
      <div className="grid grid-cols-12 gap-5">{children}</div>
    </div>
  );
}
