import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type ComponentVariant = "primary" | "secondary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ComponentVariant;
  size?: ButtonSize;
};

const buttonVariantClasses: Record<ComponentVariant, string> = {
  primary:
    "bg-[linear-gradient(135deg,#f97316_0%,#ef4444_100%)] text-white shadow-[0_18px_36px_-18px_rgba(239,68,68,0.7)] hover:-translate-y-0.5",
  secondary: "bg-surface text-foreground border border-border hover:bg-muted",
  ghost: "bg-transparent text-foreground hover:bg-muted/70",
  outline: "border border-border bg-transparent text-foreground hover:bg-muted/60",
};

const buttonSizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-6 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
        buttonVariantClasses[variant],
        buttonSizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
