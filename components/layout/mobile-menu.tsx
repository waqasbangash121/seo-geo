"use client";

import Link from "next/link";
import { useState } from "react";

import type { MegaMenuColumn, RouteItem } from "@/types";

import { Button } from "../ui/button";
import { SearchBar } from "./search-bar";
import { ThemeSwitcher } from "./theme-switcher";

type MobileMenuProps = {
  navigation: RouteItem[];
  megaMenuColumns: MegaMenuColumn[];
};

export function MobileMenu({ navigation, megaMenuColumns }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="md:hidden"
        aria-label="Open mobile menu"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        onClick={() => setIsOpen(true)}
      >
        Menu
      </Button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-[80] bg-background/80 backdrop-blur-sm md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div
            id="mobile-nav-panel"
            className="ml-auto flex h-full w-full max-w-sm flex-col border-l border-border bg-surface p-5"
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
                Navigation
              </p>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </div>

            <SearchBar compact />

            <nav aria-label="Mobile navigation" className="mt-5 flex-1 overflow-y-auto">
              <ul className="space-y-1">
                {navigation.map((item) => (
                  <li key={item.href + item.label}>
                    <Link
                      href={item.href}
                      className="block rounded-lg px-3 py-2 text-sm text-foreground hover:bg-background"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <details className="mt-4 rounded-lg border border-border p-3">
                <summary className="cursor-pointer text-sm font-medium text-foreground">
                  Apps Mega Menu
                </summary>
                <div className="mt-3 space-y-3">
                  {megaMenuColumns.map((column) => (
                    <section key={column.title}>
                      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        {column.title}
                      </h2>
                      <ul className="mt-2 space-y-1">
                        {column.links.map((link) => (
                          <li key={link.href + link.label}>
                            <Link
                              href={link.href}
                              onClick={() => setIsOpen(false)}
                              className="block rounded-md px-2 py-1 text-sm text-foreground hover:bg-background"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </details>
            </nav>

            <div className="pt-4">
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
