import Image, { type ImageProps } from "next/image";
import type { HTMLAttributes } from "react";

import { cn, getInitials } from "@/lib/utils";

type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  src?: string;
  alt?: string;
};

type AvatarImageProps = Omit<ImageProps, "alt"> & {
  alt: string;
};

export function Avatar({ className, name, src, alt, ...props }: AvatarProps) {
  const label = alt ?? name;

  return (
    <div
      className={cn(
        "inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-muted text-sm font-medium text-foreground",
        className,
      )}
      aria-label={label}
      {...props}
    >
      {src ? (
        <Image
          src={src}
          alt={label}
          width={40}
          height={40}
          className="h-full w-full object-cover"
        />
      ) : (
        <span aria-hidden="true">{getInitials(name)}</span>
      )}
    </div>
  );
}

export function AvatarImage({ className, alt, ...props }: AvatarImageProps) {
  return <Image alt={alt} className={cn("h-full w-full object-cover", className)} {...props} />;
}
