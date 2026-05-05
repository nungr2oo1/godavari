"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SaveButton } from "@/components/ui/SaveButton";
import { useSaved } from "@/context/saved-context";
import type { FoodItem } from "@/lib/types";

export function FoodCard({ item }: { item: FoodItem }) {
  const { isSaved, toggleSave } = useSaved();
  const saved = isSaved("food", item.id);
  return (
    <Card className="group overflow-hidden h-full lift-on-hover card-magic card-spotlight hover:shadow-lift hover:border-border/90">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform [transition-duration:900ms] [transition-timing-function:cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.06]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"
        />
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <Badge>{item.category}</Badge>
          <SaveButton
            isSaved={saved}
            onToggle={() => toggleSave("food", item.id)}
            size="sm"
          />
        </div>
      </div>
      <div className="p-5 space-y-2.5">
        <h3 className="font-serif text-[19px] font-medium leading-snug text-balance group-hover:text-primary transition-colors duration-300">
          {item.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {item.description}
        </p>
        <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground pt-3 border-t border-border/60 mt-2 w-full">
          <MapPin className="h-3 w-3" />
          {item.location}, {item.district}
        </div>
      </div>
    </Card>
  );
}
