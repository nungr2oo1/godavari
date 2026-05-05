import * as React from "react";
import { cn } from "@/lib/utils";

interface MarqueeStripProps {
  items: string[];
  className?: string;
  /** seconds per loop — lower = faster */
  speed?: number;
}

/**
 * Edge-faded, continuously scrolling row of short tags.
 * Pauses on hover (group-hover:[animation-play-state:paused]).
 */
export function MarqueeStrip({ items, className, speed = 38 }: MarqueeStripProps) {
  const doubled = [...items, ...items];

  return (
    <div
      className={cn(
        "group relative overflow-hidden marquee-mask py-3",
        className
      )}
      aria-hidden
    >
      <div
        className="flex w-max gap-3 animate-marquee group-hover:[animation-play-state:paused] will-change-transform"
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-sm"
          >
            <span className="h-1 w-1 rounded-full bg-primary/70" aria-hidden />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
