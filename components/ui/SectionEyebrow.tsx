import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SectionEyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex rounded-full border border-[#f1c38e]/30 bg-[#1d120f] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#f0c890]",
        className,
      )}
    >
      {children}
    </p>
  );
}
