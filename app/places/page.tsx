"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlaceCard } from "@/components/place-card";
import { SkeletonCard } from "@/components/skeleton-card";
import { places } from "@/data/places";
import type { District, PlaceType } from "@/lib/types";

const districts: ("all" | District)[] = [
  "all",
  "East Godavari",
  "West Godavari",
  "Konaseema",
  "Eluru",
  "Kakinada",
];
const types: ("all" | PlaceType)[] = [
  "all",
  "nature",
  "temple",
  "beach",
  "village",
  "heritage",
  "river",
];

const typeLabel: Record<string, string> = {
  all: "All types",
  nature: "Nature",
  temple: "Temple",
  beach: "Beach",
  village: "Village",
  heritage: "Heritage",
  river: "Riverside",
};

function PlacesContent() {
  const params = useSearchParams();
  const initialDistrict = (params.get("district") as District) || "all";
  const initialQ = params.get("q") || "";

  const [district, setDistrict] = React.useState<string>(initialDistrict);
  const [type, setType] = React.useState<string>("all");
  const [q, setQ] = React.useState<string>(initialQ);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  const filtered = React.useMemo(() => {
    return places.filter((p) => {
      const districtOk = district === "all" || p.district === district;
      const typeOk = type === "all" || p.type === type;
      const qLow = q.trim().toLowerCase();
      const qOk =
        !qLow ||
        p.name.toLowerCase().includes(qLow) ||
        p.shortDescription.toLowerCase().includes(qLow) ||
        p.district.toLowerCase().includes(qLow);
      return districtOk && typeOk && qOk;
    });
  }, [district, type, q]);

  const reset = () => {
    setDistrict("all");
    setType("all");
    setQ("");
  };

  const hasFilters = district !== "all" || type !== "all" || !!q.trim();

  return (
    <div className="container py-12 md:py-16">
      <header className="space-y-4 mb-10 max-w-3xl">
        <p className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground">
          <span className="h-px w-6 bg-current opacity-40" aria-hidden />
          Places
        </p>
        <h1 className="font-serif text-[34px] md:text-5xl lg:text-[56px] font-medium leading-[1.05] text-balance">
          Wander the two Godavaris
        </h1>
        <p className="text-muted-foreground text-pretty leading-relaxed">
          From the gorges of Papikondalu to the coconut groves of Konaseema — explore by district,
          by type, or by whatever your heart is asking for today.
        </p>
      </header>

      {/* Filters — flat row, not a panel */}
      <div className="flex flex-col gap-3 mb-8 pb-6 border-b border-border/60">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-center">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, district or vibe…"
              className="pl-10 h-11"
            />
          </div>
          <Select value={district} onValueChange={setDistrict}>
            <SelectTrigger className="md:w-[200px] h-11">
              <SelectValue placeholder="District" />
            </SelectTrigger>
            <SelectContent>
              {districts.map((d) => (
                <SelectItem key={d} value={d}>
                  {d === "all" ? "All districts" : d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="md:w-[180px] h-11">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {types.map((t) => (
                <SelectItem key={t} value={t}>
                  {typeLabel[t]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between gap-3 text-sm">
          <p className="text-muted-foreground">
            {loading
              ? "Looking…"
              : `${filtered.length} ${filtered.length === 1 ? "place" : "places"}${
                  hasFilters ? ` of ${places.length}` : ""
                }`}
          </p>
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={reset} className="h-8">
              <X className="h-3.5 w-3.5" />
              Clear filters
            </Button>
          )}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState onReset={reset} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <PlaceCard key={p.id} place={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="text-center py-24 max-w-md mx-auto space-y-4">
      <div className="mx-auto h-12 w-12 grid place-items-center rounded-full border border-border bg-card text-muted-foreground">
        <Search className="h-5 w-5" />
      </div>
      <h2 className="font-serif text-xl font-medium">No places match those filters.</h2>
      <p className="text-sm text-muted-foreground">
        Try a wider district, a different type, or just clear everything to start fresh.
      </p>
      <Button variant="outline" onClick={onReset} className="mt-2">
        Clear filters
      </Button>
    </div>
  );
}

export default function PlacesPage() {
  return (
    <React.Suspense fallback={<div className="container py-20" />}>
      <PlacesContent />
    </React.Suspense>
  );
}
