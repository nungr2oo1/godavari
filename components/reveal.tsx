"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements;
  delay?: 0 | 1 | 2 | 3 | 4;
  once?: boolean;
}

export function Reveal({
  as = "div",
  delay = 0,
  once = true,
  className,
  children,
  ...rest
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) io.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [once]);

  const Tag = as as any;
  return (
    <Tag
      ref={ref}
      className={cn(
        "reveal",
        visible && "is-visible",
        delay > 0 && `delay-${delay}`,
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
