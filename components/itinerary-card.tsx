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
    <Card className="overflow-hidden h-full hover:shadow-lift hover:-translate-y-1 transition-all flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        <Image
          src={itinerary.image}
          alt={itinerary.title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 hover:scale-[1.04]"
        />
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <Badge variant="forest">{itinerary.type}</Badge>
          <SaveButton
            isSaved={saved}
            onToggle={() => toggleSave("itineraries", itinerary.id)}
            size="sm"
          />
        </div>
      </div>
      <div className="p-5 space-y-3 flex-1 flex flex-col">
        <h3 className="font-serif text-lg font-semibold leading-tight">{itinerary.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{itinerary.summary}</p>
        <div className="grid grid-cols-2 gap-2 pt-1 mt-auto">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5 text-primary" />
            {itinerary.duration}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <IndianRupee className="h-3.5 w-3.5 text-primary" />
            {itinerary.estimatedCost}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground col-span-2">
            <Route className="h-3.5 w-3.5 text-primary" />
            {itinerary.placesCovered.length} stops
          </span>
        </div>
      </div>
    </Card>
  );
}
