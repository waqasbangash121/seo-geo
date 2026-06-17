import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type SectionSpacing = "none" | "sm" | "md" | "lg";

type SectionProps = HTMLAttributes<HTMLElement> & {
  spacing?: SectionSpacing;
};

const sectionSpacingClasses: Record<SectionSpacing, string> = {
  none: "py-0",
  sm: "py-10 sm:py-12",
  md: "py-16 sm:py-20",
  lg: "py-20 sm:py-24",
};

export function Section({ className, spacing = "md", ...props }: SectionProps) {
  return <section className={cn(sectionSpacingClasses[spacing], className)} {...props} />;
}
