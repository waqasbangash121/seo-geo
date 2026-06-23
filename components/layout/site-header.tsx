import Link from "next/link";

import { appsMegaMenu, primaryNavigation } from "@/config/navigation";

import { BrandMark } from "./brand-mark";
import { MegaMenu } from "./mega-menu";

import { SearchBar } from "./search-bar";
import { ThemeSwitcher } from "./theme-switcher";
import { Container } from "../ui/container";
import dynamic from "next/dynamic";

const MobileMenu = dynamic(
  () => import("./mobile-menu").then((m) => m.MobileMenu)
);

export function SiteHeader() {
  const appsNavigationItem = primaryNavigation.find((item) => item.label === "Apps");
  const regularNavigationItems = primaryNavigation.filter((item) => item.label !== "Apps");
  const visibleNavigationItems = regularNavigationItems.slice(0, 5);
  const overflowNavigationItems = regularNavigationItems.slice(5);

  return (
    <header
      role="banner"
      className="sticky top-0 z-[100] border-b border-border/70 bg-background/95 shadow-sm backdrop-blur-xl"
    >
      <Container className="flex items-center gap-3 py-3 md:py-4">
        <Link href="https://niagarat.com" className="flex items-center gap-3 text-sm font-semibold text-foreground" aria-label="Hyper Apps Homepage">
          <BrandMark className="h-9 w-9 sm:h-10 sm:w-10" />
          <span className="hidden uppercase tracking-[0.35em] sm:inline">Hyper Apps</span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="relative ml-4 hidden items-center gap-4 xl:flex"
        >
          {appsNavigationItem ? (
            <div className="group/mega relative">
              <Link
                href={appsNavigationItem.href}
                className="rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              >
                {appsNavigationItem.label}
              </Link>
              <MegaMenu columns={appsMegaMenu} />
            </div>
          ) : null}

          {visibleNavigationItems.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            >
              {item.label}
            </Link>
          ))}

          {overflowNavigationItems.length > 0 ? (
            <div className="group/overflow relative">
              <button
                type="button"
                className="rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Open more navigation links"
              >
                More
              </button>
              <div className="invisible absolute right-0 top-full z-[65] min-w-48 pt-3 opacity-0 transition duration-150 group-hover/overflow:visible group-hover/overflow:opacity-100 group-focus-within/overflow:visible group-focus-within/overflow:opacity-100">
                <div className="rounded-[8px] border border-border bg-surface p-2 shadow-xl">
                  <ul className="space-y-1">
                    {overflowNavigationItems.map((item) => (
                      <li key={item.href + item.label}>
                        <Link
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-sm text-foreground transition hover:bg-background"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
        </nav>

        <div className="ml-auto hidden w-full max-w-xs lg:block">
          <SearchBar compact />
        </div>

        <div className="hidden md:block">
          <ThemeSwitcher />
        </div>

        <MobileMenu navigation={primaryNavigation} megaMenuColumns={appsMegaMenu} />
      </Container>
    </header>
  );
}
