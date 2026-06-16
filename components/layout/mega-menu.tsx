import Link from "next/link";

import type { MegaMenuColumn } from "@/types";

type MegaMenuProps = {
  columns: MegaMenuColumn[];
};

export function MegaMenu({ columns }: MegaMenuProps) {
  return (
    <div className="invisible absolute left-1/2 top-full z-[110] w-[min(92vw,58rem)] -translate-x-1/2 pt-4 opacity-0 transition duration-200 group-hover/mega:visible group-hover/mega:opacity-100 group-focus-within/mega:visible group-focus-within/mega:opacity-100">
      <div className="rounded-2xl border border-border bg-[hsl(var(--surface))] p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] ring-1 ring-border/60">
        <div className="grid gap-4 md:grid-cols-3">
          {columns.map((column) => (
            <section
              key={column.title}
              aria-labelledby={`mega-${column.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <h2
                id={`mega-${column.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground"
              >
                {column.title}
              </h2>
              <ul className="space-y-2">
                {column.links.map((item) => (
                  <li key={item.href + item.label}>
                    <Link
                      href={item.href}
                      className="block rounded-xl border border-transparent p-2 transition hover:border-border hover:bg-orange-600"
                    >
                      <span className="block text-sm font-medium text-foreground">
                        {item.label}
                      </span>
                      {/* <span className="mt-1 block text-xs text-muted-foreground">
                        {item.description}
                      </span> */}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
