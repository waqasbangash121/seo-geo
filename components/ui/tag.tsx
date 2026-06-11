import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

import type { ComponentVariant } from "./button";

type TagProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: ComponentVariant;
};

const tagVariantClasses: Record<ComponentVariant, string> = {
  primary: "bg-primary/10 text-primary border-primary/30",
  secondary: "bg-muted text-foreground border-border",
  ghost: "bg-transparent text-muted-foreground border-transparent",
  outline: "bg-transparent text-foreground border-border",
};

export function Tag({ className, variant = "outline", ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium",
        tagVariantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
