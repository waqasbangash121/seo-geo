"use client";

import { useId, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type AccordionItem = {
  id: string;
  title: string;
  content: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
};

export function Accordion({ items, defaultOpenId, allowMultiple = false }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenId ? [defaultOpenId] : []);

  const toggleItem = (id: string) => {
    setOpenIds((current) => {
      const isOpen = current.includes(id);
      if (allowMultiple) {
        return isOpen ? current.filter((value) => value !== id) : [...current, id];
      }
      return isOpen ? [] : [id];
    });
  };

  return (
    <div className="divide-y divide-border rounded-[10px] border border-border bg-surface">
      {items.map((item) => (
        <AccordionEntry
          key={item.id}
          item={item}
          isOpen={openIds.includes(item.id)}
          onToggle={() => toggleItem(item.id)}
        />
      ))}
    </div>
  );
}

type AccordionEntryProps = {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
};

function AccordionEntry({ item, isOpen, onToggle }: AccordionEntryProps) {
  const panelId = useId();
  const buttonId = useId();

  return (
    <section>
      <h3>
        <button
          id={buttonId}
          type="button"
          className="flex w-full items-center justify-between px-4 py-4 text-left text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span>{item.title}</span>
          <span aria-hidden="true">{isOpen ? "-" : "+"}</span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(
          "grid transition-[grid-template-rows] duration-200",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 text-sm leading-7 text-muted-foreground">{item.content}</div>
        </div>
      </div>
    </section>
  );
}
