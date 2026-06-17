import { forwardRef, type InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

import type { ComponentVariant } from "./button";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: ComponentVariant;
};

const inputVariantClasses: Record<ComponentVariant, string> = {
  primary: "border-primary/40 bg-background",
  secondary: "border-border bg-surface",
  ghost: "border-transparent bg-muted/50",
  outline: "border-border bg-transparent",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, variant = "secondary", ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-[8px] border px-3 text-sm text-foreground placeholder:text-muted-foreground transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        inputVariantClasses[variant],
        className,
      )}
      {...props}
    />
  );
});
