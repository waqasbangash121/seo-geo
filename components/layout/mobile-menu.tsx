"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import type { MegaMenuColumn, RouteItem } from "@/types";

import { Button } from "../ui/button";
import { SearchBar } from "./search-bar";
import { ThemeSwitcher } from "./theme-switcher";

type MobileMenuProps = {
  navigation: RouteItem[];
  megaMenuColumns: MegaMenuColumn[];
};

export function MobileMenu({ navigation }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const menu = isOpen ? (
    <div
      className="fixed inset-0 z-[9999] flex justify-end bg-black/40 backdrop-blur"
      role="dialog"
      aria-modal="true"
      onClick={() => setIsOpen(false)}
    >
      <div
        id="mobile-nav-panel"
        className="relative z-[9999] flex h-full w-full max-w-[22rem] flex-col border-l border-border bg-surface shadow-[0_0_32px_hsl(var(--shadow)/0.35)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 border-b border-border px-5 pb-4 pt-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Hyper Apps
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="border border-primary text-primary ring-1 ring-primary hover:bg-primary/10 hover:text-primary"
            >
              Close
            </Button>
          </div>
          <SearchBar compact />
        </div>

        <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto p-3">
          <ul>
            {navigation.map((item) => (
              <li key={item.href + item.label}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center justify-between border-t border-border bg-surface px-5 py-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Mode
          </p>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="ml-auto border border-primary text-primary ring-1 ring-primary hover:bg-primary/10 hover:text-primary md:hidden"
        aria-label="Open mobile menu"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        onClick={() => setIsOpen(true)}
      >
        Menu
      </Button>

      {mounted ? createPortal(menu, document.body) : null}
    </>
  );
}
