import Link from "next/link";

import { primaryNavigation } from "@/config/navigation";

import { BrandMark } from "./brand-mark";
import { Container } from "../ui/container";

export function SiteHeader() {
  return (
    <header
      role="banner"
      className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl"
    >
      <Container className="flex items-center justify-between gap-6 py-5">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold text-foreground">
          <BrandMark className="h-10 w-10" />
          <span className="uppercase tracking-[0.35em]">Hyper Apps</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full border border-transparent bg-[linear-gradient(135deg,#f97316_0%,#ef4444_100%)] px-4 py-2 text-sm font-medium text-white shadow-[0_18px_36px_-18px_rgba(249,115,22,0.7)] transition-transform duration-200 hover:-translate-y-0.5"
        >
          Explore Apps
        </Link>
      </Container>
    </header>
  );
}
