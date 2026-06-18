"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

type Props = {
  href: string;
  eventName: string;
  className?: string;
  children: React.ReactNode;
};

export default function TrackLink({ href, eventName, className, children }: Props) {
  const handleClick = () => {
    trackEvent(eventName, {
      event_label: href,
      value: 1,
    });
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
