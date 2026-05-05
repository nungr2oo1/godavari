"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SaveButton } from "@/components/ui/SaveButton";
import { useSaved } from "@/context/saved-context";
import type { Place } from "@/lib/types";

const typeLabel: Record<Place["type"], string> = {
  nature: "Nature",
  temple: "Temple",
  beach: "Beach",
  village: "Village",
  heritage: "Heritage",
  river: "Riverside",
};

export function PlaceCard({ place }: { place: Place }) {
  const { isSaved, toggleSave } = useSaved();
  const saved = isSaved("places", place.id);
  const cardRef = React.useRef<HTMLDivElement | null>(null);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${mx}%`);
    el.style.setProperty("--my", `${my}%`);
  };

  return (
    <Link
      href={`/place/${place.slug}`}
      onMouseMove={handleMove}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-2xl"
    >
      <Card
        ref={cardRef}
        className="overflow-hidden h-full lift-on-hover card-magic card-spotlight group-hover:shadow-lift group-hover:border-border/90"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
          <Image
            src={place.images[0]}
            alt={place.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform [transition-duration:900ms] [transition-timing-function:cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.06]"
          />
          {/* dark veil that fades in on hover */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"
          />
          {/* sweep highlight on hover */}
          <div
            aria-hidden
            className="absolute -inset-x-1 -top-1 h-1/2 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
          <div className="absolute inset-x-0 top-0 p-3 flex items-start justify-between">
            <Badge>{typeLabel[place.type]}</Badge>
            <SaveButton
              isSaved={saved}
              onToggle={() => toggleSave("places", place.id)}
              size="sm"
            />
          </div>
          {/* district pill drifts up from bottom on hover */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-background/70 backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium uppercase tracking-eyebrow text-foreground/90 border border-white/10 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <MapPin className="h-3 w-3" />
            {place.district}
          </div>
        </div>
        <div className="p-5 space-y-2.5 relative">
          <div className="flex items-center text-[11px] uppercase tracking-eyebrow text-muted-foreground gap-1.5">
            <MapPin className="h-3 w-3" />
            <span>{place.district}</span>
          </div>
          <h3 className="font-serif text-[19px] font-medium leading-snug text-balance group-hover:text-primary transition-colors duration-300">
            {place.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {place.shortDescription}
          </p>
          <div className="flex items-center gap-1 text-sm font-medium text-foreground pt-3 border-t border-border/60 mt-3">
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              View details
            </span>
            <span
              aria-hidden
              className="ml-auto grid h-7 w-7 place-items-center rounded-full border border-border/60 bg-background/60 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary group-hover:rotate-[-12deg]"
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
