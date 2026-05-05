"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SaveButton } from "@/components/ui/SaveButton";
import { useSaved } from "@/context/saved-context";
import type { Place } from "@/lib/types";

const typeBadge: Record<Place["type"], { label: string; variant: "river" | "forest" | "saffron" | "muted" }> = {
  nature: { label: "Nature", variant: "forest" },
  temple: { label: "Temple", variant: "saffron" },
  beach: { label: "Beach", variant: "river" },
  village: { label: "Village", variant: "forest" },
  heritage: { label: "Heritage", variant: "saffron" },
  river: { label: "Riverside", variant: "river" },
};

export function PlaceCard({ place }: { place: Place }) {
  const tag = typeBadge[place.type];
  const { isSaved, toggleSave } = useSaved();
  const saved = isSaved("places", place.id);
  return (
    <Link href={`/place/${place.slug}`} className="group block focus:outline-none">
      <Card className="overflow-hidden h-full group-hover:shadow-lift group-hover:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-ring">
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
          <Image
            src={place.images[0]}
            alt={place.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-x-0 top-0 p-3 flex items-start justify-between">
            <Badge variant={tag.variant}>{tag.label}</Badge>
            <div className="flex items-center gap-2">
              <SaveButton
                isSaved={saved}
                onToggle={() => toggleSave("places", place.id)}
                size="sm"
              />
              <span className="rounded-full bg-background/90 backdrop-blur p-1.5 text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
        <div className="p-5 space-y-2">
          <div className="flex items-center text-xs text-muted-foreground gap-1">
            <MapPin className="h-3.5 w-3.5" />
            <span>{place.district}</span>
          </div>
          <h3 className="font-serif text-lg font-semibold leading-tight">{place.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {place.shortDescription}
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary pt-1">
            View details
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
