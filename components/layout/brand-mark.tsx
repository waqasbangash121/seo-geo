import Image from "next/image";

import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <Image
      src="/icon.svg"
      alt="hyper apps logo"
      aria-hidden="true"
      className={cn("rounded-[8px]", className)}
      width={40}
      height={40}
    />
  );
}
