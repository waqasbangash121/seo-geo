import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Display({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={cn("type-display", className)} {...props} />;
}

export function Heading({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("type-heading", className)} {...props} />;
}

export function Subheading({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("type-subheading", className)} {...props} />;
}

export function Body({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("type-body", className)} {...props} />;
}

export function Caption({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("type-caption", className)} {...props} />;
}
