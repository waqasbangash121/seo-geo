"use client";

import Image from "next/image";
import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

function wrapIndex(n: number, len: number) {
  return ((n % len) + len) % len;
}

function signedOffset(i: number, active: number, len: number, loop: boolean) {
  const raw = i - active;
  if (!loop) return raw;

  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

export type CardStackItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc?: string;
};

export type CardStackProps<T> = {
  items: T[];
  cardHeight?: number;
  autoAdvance?: boolean;
  intervalMs?: number;
  className?: string;
};

export function CardStack<T extends CardStackItem>({
  items,
  cardHeight = 380,
  autoAdvance = true,
  intervalMs = 3500,
  className,
}: CardStackProps<T>) {
  const reduceMotion = useReducedMotion();

  const len = items.length;
  const [active, setActive] = React.useState(0);
  const [width, setWidth] = React.useState(0);

  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;

    const obs = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });

    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const isMobile = width < 640;

  const cardWidth = isMobile ? width * 0.92 : Math.min(900, width * 0.75);
  const spacing = cardWidth * 0.55;

  React.useEffect(() => {
    if (!autoAdvance || reduceMotion) return;
    const id = setInterval(() => {
      setActive((a) => wrapIndex(a + 1, len));
    }, intervalMs);

    return () => clearInterval(id);
  }, [len, autoAdvance, intervalMs, reduceMotion]);

  if (!len) return null;

  return (
    <div ref={ref} className={cn("w-full overflow-hidden", className)}>
      <div
        className="relative flex justify-center items-end"
        style={{
          height: cardHeight + 80,
          perspective: "1200px",
        }}
      >
        <AnimatePresence>
          {items.map((item, i) => {
            const off = signedOffset(i, active, len, true);
            const abs = Math.abs(off);

            if (abs > 2) return null;

            const isActive = off === 0;

            return (
              <motion.div
                key={item.id}
                onClick={() => setActive(i)}
                className="absolute bottom-0 rounded-2xl overflow-hidden shadow-xl border border-border bg-black cursor-pointer"
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  zIndex: 100 - abs,
                }}
                animate={{
                  x: off * spacing,
                  scale: isActive ? 1 : 0.92,
                  rotateY: off * -8,
                  y: abs * 12,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
              >
                <div className="absolute inset-0">
                  {item.imageSrc ? (
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      className={isMobile ? "object-contain bg-black" : "object-cover"}
                      sizes="(max-width: 768px) 100vw, 900px"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-white/60">
                      No Image
                    </div>
                  )}
                </div>

                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                  <div className="font-semibold">{item.title}</div>
                  {item.description && (
                    <div className="text-sm text-white/70 line-clamp-2">{item.description}</div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
