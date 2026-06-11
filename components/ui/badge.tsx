import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

import type { ComponentVariant } from "./button";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: ComponentVariant;
};

const badgeVariantClasses: Record<ComponentVariant, string> = {
  primary: "bg-primary text-primary-foreground border-transparent",
  secondary: "bg-muted text-foreground border-transparent",
  ghost: "bg-transparent text-muted-foreground border-transparent",
  outline: "bg-transparent text-foreground border-border",
};

export function Badge({ className, variant = "secondary", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide",
        badgeVariantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
