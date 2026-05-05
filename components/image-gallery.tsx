"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const next = React.useCallback(
    () => setActive((i) => (i + 1) % images.length),
    [images.length]
  );
  const prev = React.useCallback(
    () => setActive((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, next, prev]);

  return (
    <div>
      <div className="grid grid-cols-4 grid-rows-2 gap-1.5 md:gap-2 h-[280px] md:h-[440px] rounded-2xl overflow-hidden">
        <button
          type="button"
          onClick={() => {
            setActive(0);
            setOpen(true);
          }}
          className="relative col-span-4 row-span-2 md:col-span-2 group bg-secondary"
        >
          <Image
            src={images[0]}
            alt={`${alt} – main`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            priority
          />
        </button>
        {images.slice(1, 5).map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => {
              setActive(i + 1);
              setOpen(true);
            }}
            className="relative hidden md:block group bg-secondary"
          >
            <Image
              src={src}
              alt={`${alt} – ${i + 2}`}
              fill
              sizes="25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            />
            {i === 3 && images.length > 5 && (
              <span className="absolute inset-0 grid place-items-center bg-black/50 text-white text-sm font-medium">
                +{images.length - 5} more
              </span>
            )}
          </button>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute top-4 right-4 rounded-full bg-white/15 hover:bg-white/25 p-2 text-white"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            className="absolute left-4 md:left-8 rounded-full bg-white/15 hover:bg-white/25 p-2 text-white"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div className="relative w-full max-w-5xl aspect-video">
            <Image
              src={images[active]}
              alt={`${alt} – ${active + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="absolute right-4 md:right-8 rounded-full bg-white/15 hover:bg-white/25 p-2 text-white"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === active ? "w-6 bg-white" : "w-1.5 bg-white/40"
                )}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
