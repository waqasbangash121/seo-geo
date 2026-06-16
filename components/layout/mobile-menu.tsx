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

export function MobileMenu({ navigation, megaMenuColumns }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const panelBg = isDark ? "#18181b" : "#ffffff";
  const textColor = isDark ? "#f4f4f5" : "#18181b";
  const mutedColor = isDark ? "#a1a1aa" : "#71717a";
  const borderColor = isDark ? "#27272a" : "#e4e4e7";
  const hoverBg = isDark ? "#27272a" : "#f4f4f5";
  const footerBg = isDark ? "#18181b" : "#ffffff";

  const menu = isOpen ? (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
      role="dialog"
      aria-modal="true"
      onClick={() => setIsOpen(false)}
    >
      <div
        id="mobile-nav-panel"
        style={{
          position: "relative",
          zIndex: 9999,
          backgroundColor: panelBg,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          maxWidth: "22rem",
          borderLeft: `1px solid ${borderColor}`,
          boxShadow: "-8px 0 32px rgba(0,0,0,0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.25rem 1.25rem 1rem",
            borderBottom: `1px solid ${borderColor}`,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: mutedColor,
              }}
            >
              Hyper Apps
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="border border-orange-500 ring-1 ring-orange-500 text-orange-500 hover:text-orange-500 hover:bg-orange-500/10"
            >
              Close
            </Button>
          </div>
          <SearchBar compact />
        </div>

        {/* Nav — scrollable */}
        <nav
          aria-label="Mobile navigation"
          style={{ flex: 1, overflowY: "auto", padding: "0.75rem" }}
        >
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {navigation.map((item) => (
              <li key={item.href + item.label}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: "block",
                    padding: "0.6rem 0.75rem",
                    borderRadius: "0.5rem",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: textColor,
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* <div style={{ marginTop: "0.75rem" }}>
            <details
              style={{
                borderRadius: "0.5rem",
                border: `1px solid ${borderColor}`,
                padding: "0.75rem",
              }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: textColor,
                  listStyle: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                ▸ Apps
              </summary>
              <div
                style={{
                  marginTop: "0.75rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {megaMenuColumns.map((column) => (
                  <section key={column.title}>
                    <p
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: mutedColor,
                        marginBottom: "0.5rem",
                      }}
                    >
                      {column.title}
                    </p>
                    <ul
                      style={{
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.15rem",
                      }}
                    >
                      {column.links.map((link) => (
                        <li key={link.href + link.label}>
                          <Link
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            style={{
                              display: "block",
                              padding: "0.35rem 0.5rem",
                              borderRadius: "0.375rem",
                              fontSize: "0.85rem",
                              color: textColor,
                              textDecoration: "none",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.backgroundColor = "transparent")
                            }
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
          </div> */}
        </nav>

        {/* Footer — ThemeSwitcher always pinned at bottom */}
        <div
          style={{
            padding: "1rem 1.25rem",
            borderTop: `1px solid ${borderColor}`,
            backgroundColor: footerBg,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: mutedColor,
            }}
          >
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
        className="md:hidden ml-auto border border-orange-500 ring-1 ring-orange-500 text-orange-500 hover:text-orange-500 hover:bg-orange-500/10"
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
