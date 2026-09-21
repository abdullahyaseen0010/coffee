import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export function ActionLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const styles = {
    primary:
      "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f1c38e] to-[#d38a4f] px-6 py-3 text-sm font-semibold text-[#17110d] shadow-[0_12px_35px_rgba(211,138,79,0.3)] transition hover:brightness-110",
    secondary:
      "inline-flex items-center gap-2 rounded-full border border-[#d4a87c]/20 bg-[#1a120f] px-6 py-3 text-sm font-semibold text-[#f3ebdf] transition hover:border-[#f1c38e]/40 hover:text-white",
  } as const;

  return (
    <Link href={href} className={cn(styles[variant], className)}>
      {children}
      <ArrowRight size={16} />
    </Link>
  );
}
