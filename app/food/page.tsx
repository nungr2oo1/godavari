"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FoodCard } from "@/components/food-card";
import { food } from "@/data/food";
import { useSubmissions } from "@/context/submissions-context";
import type { FoodCategory, FoodItem } from "@/lib/types";

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
  const { approvedFood } = useSubmissions();

  const allFood = React.useMemo<FoodItem[]>(() => {
    const submitted = approvedFood.map((s) => s.payload);
    const ids = new Set(food.map((f) => f.id));
    const dedupedSubmitted = submitted.filter((f) => !ids.has(f.id));
    return [...food, ...dedupedSubmitted];
  }, [approvedFood]);

  const filtered = React.useMemo(() => {
    return allFood.filter((f) => {
      const catOk = category === "All" || f.category === category;
      const qLow = q.trim().toLowerCase();
      const qOk =
        !qLow ||
        f.name.toLowerCase().includes(qLow) ||
        f.location.toLowerCase().includes(qLow) ||
        f.description.toLowerCase().includes(qLow);
      return catOk && qOk;
    });
  }, [allFood, category, q]);

  return (
    <div className="container py-12 md:py-16 space-y-10">
      <header className="space-y-4 max-w-3xl">
        <p className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground">
          <span className="h-px w-6 bg-current opacity-40" aria-hidden />
          Food guide
        </p>
        <h1 className="font-serif text-[34px] md:text-5xl lg:text-[56px] font-medium leading-[1.05] text-balance">
          A region you can taste.
        </h1>
        <p className="text-muted-foreground text-pretty leading-relaxed">
          Pulasa in monsoon, pootharekulu in Atreyapuram, bamboo chicken in the forest, kakinada
          kaja from a shop that opened in 1891 — every dish here has a story and an address.
        </p>
      </header>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pb-6 border-b border-border/60">
        <Tabs value={category} onValueChange={setCategory}>
          <TabsList className="h-auto flex-wrap gap-1 bg-transparent p-0">
            {categories.map((c) => (
              <TabsTrigger
                key={c}
                value={c}
                className="rounded-full data-[state=active]:bg-foreground data-[state=active]:text-background"
              >
                {c}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search dishes, places…"
            className="pl-10 h-11"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24 max-w-md mx-auto space-y-4">
          <div className="mx-auto h-12 w-12 grid place-items-center rounded-full border border-border bg-card text-muted-foreground">
            <Search className="h-5 w-5" />
          </div>
          <h2 className="font-serif text-xl font-medium">Nothing matches that craving (yet).</h2>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((f) => (
            <FoodCard key={f.id} item={f} />
          ))}
        </div>
      )}
    </div>
  );
}
