import { forwardRef, type TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

import type { ComponentVariant } from "./button";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  variant?: ComponentVariant;
};

const textareaVariantClasses: Record<ComponentVariant, string> = {
  primary: "border-primary/40 bg-background",
  secondary: "border-border bg-surface",
  ghost: "border-transparent bg-muted/50",
  outline: "border-border bg-transparent",
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, variant = "secondary", ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-28 w-full rounded-[8px] border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        textareaVariantClasses[variant],
        className,
      )}
      {...props}
    />
  );
});
