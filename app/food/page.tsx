"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FoodCard } from "@/components/food-card";
import { food } from "@/data/food";
import type { FoodCategory } from "@/lib/types";

const categories: ("All" | FoodCategory)[] = [
  "All",
  "Street food",
  "Traditional meals",
  "Seafood",
  "Sweets",
  "Tribal",
];

export default function FoodPage() {
  const [category, setCategory] = React.useState<string>("All");
  const [q, setQ] = React.useState<string>("");

  const filtered = React.useMemo(() => {
    return food.filter((f) => {
      const catOk = category === "All" || f.category === category;
      const qLow = q.trim().toLowerCase();
      const qOk =
        !qLow ||
        f.name.toLowerCase().includes(qLow) ||
        f.location.toLowerCase().includes(qLow) ||
        f.description.toLowerCase().includes(qLow);
      return catOk && qOk;
    });
  }, [category, q]);

  return (
    <div className="container py-10 md:py-14 space-y-10">
      <div className="space-y-3 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Food guide</p>
        <h1 className="font-serif text-3xl md:text-5xl font-semibold leading-tight text-balance">
          A region you can taste.
        </h1>
        <p className="text-muted-foreground">
          Pulasa in monsoon, pootharekulu in Atreyapuram, bamboo chicken in the forest, kakinada
          kaja from a shop that opened in 1891 — every dish here has a story and an address.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <Tabs value={category} onValueChange={setCategory}>
          <TabsList className="h-auto flex-wrap gap-1">
            {categories.map((c) => (
              <TabsTrigger key={c} value={c}>
                {c}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search dishes, places…"
            className="pl-10"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 space-y-3">
          <p className="font-serif text-xl font-semibold">Nothing matches that craving (yet).</p>
          <Button
            variant="outline"
            onClick={() => {
              setCategory("All");
              setQ("");
            }}
          >
            <X className="h-4 w-4" />
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((f) => (
            <FoodCard key={f.id} item={f} />
          ))}
        </div>
      )}
    </div>
  );
}
