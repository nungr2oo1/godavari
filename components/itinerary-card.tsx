"use client";

import Image from "next/image";
import { Clock, IndianRupee, Route } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SaveButton } from "@/components/ui/SaveButton";
import { useSaved } from "@/context/saved-context";
import type { Itinerary } from "@/lib/types";

export function ItineraryCard({ itinerary }: { itinerary: Itinerary }) {
  const { isSaved, toggleSave } = useSaved();
  const saved = isSaved("itineraries", itinerary.id);
  return (
    <Card className="overflow-hidden h-full hover:shadow-lift hover:border-border flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        <Image
          src={itinerary.image}
          alt={itinerary.title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
        />
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <Badge>{itinerary.type}</Badge>
          <SaveButton
            isSaved={saved}
            onToggle={() => toggleSave("itineraries", itinerary.id)}
            size="sm"
          />
        </div>
      </div>
      <div className="p-5 space-y-3 flex-1 flex flex-col">
        <h3 className="font-serif text-[19px] font-medium leading-snug text-balance">
          {itinerary.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {itinerary.summary}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-2 pt-3 border-t border-border/60 mt-auto text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {itinerary.duration}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <IndianRupee className="h-3.5 w-3.5" />
            {itinerary.estimatedCost}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Route className="h-3.5 w-3.5" />
            {itinerary.placesCovered.length} stops
          </span>
        </div>
      </div>
    </Card>
  );
}
