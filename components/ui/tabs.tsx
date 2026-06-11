"use client";

import { useId, useMemo, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type TabItem = {
  id: string;
  label: string;
  content: ReactNode;
};

type TabsProps = {
  items: TabItem[];
  defaultTabId?: string;
};

export function Tabs({ items, defaultTabId }: TabsProps) {
  const fallbackId = items[0]?.id;
  const [activeId, setActiveId] = useState(defaultTabId ?? fallbackId);
  const instanceId = useId();

  const activeItem = useMemo(
    () => items.find((item) => item.id === activeId) ?? items[0],
    [activeId, items],
  );

  if (!items.length || !activeItem) {
    return null;
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Content tabs"
        className="inline-flex rounded-xl border border-border bg-surface p-1"
      >
        {items.map((item) => {
          const tabId = `${instanceId}-tab-${item.id}`;
          const panelId = `${instanceId}-panel-${item.id}`;
          const selected = activeItem.id === item.id;

          return (
            <button
              key={item.id}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selected
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              onClick={() => setActiveId(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item) => {
        const tabId = `${instanceId}-tab-${item.id}`;
        const panelId = `${instanceId}-panel-${item.id}`;
        const selected = activeItem.id === item.id;

        return (
          <div
            key={item.id}
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            hidden={!selected}
            className="mt-4 rounded-2xl border border-border bg-surface p-4"
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
}
