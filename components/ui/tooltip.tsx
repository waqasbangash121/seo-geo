"use client";

import {
  cloneElement,
  isValidElement,
  useId,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

type TooltipProps = {
  label: string;
  children: ReactNode;
};

type DescribedElementProps = {
  "aria-describedby"?: string;
  onFocus?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
};

function mergeDescribedBy(existing: string | undefined, tooltipId: string | undefined) {
  return [existing, tooltipId].filter(Boolean).join(" ") || undefined;
}

export function Tooltip({ label, children }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();
  const describedBy = open ? tooltipId : undefined;

  const handleFocus = () => setOpen(true);
  const handleBlur = () => setOpen(false);

  const trigger = isValidElement<DescribedElementProps>(children)
    ? cloneElement(children as ReactElement<DescribedElementProps>, {
        "aria-describedby": mergeDescribedBy(children.props["aria-describedby"], describedBy),
        onFocus: (event) => {
          handleFocus();
          children.props.onFocus?.(event);
        },
        onBlur: (event) => {
          handleBlur();
          children.props.onBlur?.(event);
        },
      })
    : children;

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {trigger}
      <span
        id={tooltipId}
        role="tooltip"
        className={cn(
          "pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-max -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-xs text-background transition",
          open ? "opacity-100" : "opacity-0",
        )}
      >
        {label}
      </span>
    </span>
  );
}
