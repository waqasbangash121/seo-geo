import Image from "next/image";

type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <Image
      src="/icon.svg"
      alt=""
      aria-hidden="true"
      className={`${className} rounded-xl`}
      width={40}
      height={40}
    />
  );
}
