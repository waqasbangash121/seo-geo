type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <img
      src="/icon.svg"
      alt=""
      aria-hidden="true"
      className={className}
    />
  );
}