"use client";

import Image from "next/image";
import { MapPin, Utensils } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SaveButton } from "@/components/ui/SaveButton";
import { useSaved } from "@/context/saved-context";
import type { FoodItem } from "@/lib/types";

export function FoodCard({ item }: { item: FoodItem }) {
  const { isSaved, toggleSave } = useSaved();
  const saved = isSaved("food", item.id);
  return (
    <Card className="overflow-hidden h-full hover:shadow-lift hover:-translate-y-1 transition-all">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(min-width: 1024px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 hover:scale-[1.04]"
        />
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <Badge variant="saffron" className="gap-1">
            <Utensils className="h-3 w-3" />
            {item.category}
          </Badge>
          <SaveButton
            isSaved={saved}
            onToggle={() => toggleSave("food", item.id)}
            size="sm"
          />
        </div>
      </div>
      <div className="p-5 space-y-2">
        <h3 className="font-serif text-lg font-semibold leading-tight">{item.name}</h3>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {item.location}, {item.district}
        </span>
        <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>
      </div>
    </Card>
  );
}
