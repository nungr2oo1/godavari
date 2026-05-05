"use client";

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
  return (
    <Link
      href={`/place/${place.slug}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-2xl"
    >
      <Card className="overflow-hidden h-full group-hover:shadow-lift group-hover:border-border">
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
          <Image
            src={place.images[0]}
            alt={place.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-x-0 top-0 p-3 flex items-start justify-between">
            <Badge>{typeLabel[place.type]}</Badge>
            <SaveButton
              isSaved={saved}
              onToggle={() => toggleSave("places", place.id)}
              size="sm"
            />
          </div>
        </div>
        <div className="p-5 space-y-2.5">
          <div className="flex items-center text-[11px] uppercase tracking-eyebrow text-muted-foreground gap-1.5">
            <MapPin className="h-3 w-3" />
            <span>{place.district}</span>
          </div>
          <h3 className="font-serif text-[19px] font-medium leading-snug text-balance">
            {place.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {place.shortDescription}
          </p>
          <div className="flex items-center gap-1 text-sm font-medium text-foreground pt-3 border-t border-border/60 mt-3">
            <span>View details</span>
            <ArrowUpRight className="h-3.5 w-3.5 ml-auto transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
