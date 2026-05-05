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
    <Card className="overflow-hidden h-full hover:shadow-lift hover:border-border">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
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
        <h3 className="font-serif text-[19px] font-medium leading-snug text-balance">
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
