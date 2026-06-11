import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

import type { ComponentVariant } from "./button";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: ComponentVariant;
};

const cardVariantClasses: Record<ComponentVariant, string> = {
  primary:
    "border-transparent bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0.3))] shadow-soft",
  secondary: "border-border bg-surface",
  ghost: "border-transparent bg-transparent",
  outline: "border-border bg-transparent",
};

export function Card({ className, variant = "secondary", ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border p-6 text-surface-foreground",
        cardVariantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-1.5", className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-xl font-semibold leading-tight", className)} {...props} />;
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm leading-7 text-muted-foreground", className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-5", className)} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-6 flex items-center gap-3", className)} {...props} />;
}
