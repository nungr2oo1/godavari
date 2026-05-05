"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Filter, Search, X } from "lucide-react";
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
    <div className="container py-10 md:py-14">
      <div className="space-y-3 mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Places
        </p>
        <h1 className="font-serif text-3xl md:text-5xl font-semibold leading-tight text-balance">
          Wander the two Godavaris
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          From the gorges of Papikondalu to the coconut groves of Konaseema — explore by district,
          by type, or by whatever your heart is asking for today.
        </p>
      </div>

      {/* Filters */}
      <div className="rounded-3xl border bg-card p-4 md:p-5 shadow-soft mb-8">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto] md:items-center">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, district or vibe…"
              className="pl-10"
            />
          </div>
          <Select value={district} onValueChange={setDistrict}>
            <SelectTrigger className="md:w-[200px]">
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
            <SelectTrigger className="md:w-[180px]">
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
          {hasFilters ? (
            <Button variant="ghost" onClick={reset} className="md:w-auto">
              <X className="h-4 w-4" />
              Clear
            </Button>
          ) : (
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-muted-foreground px-3">
              <Filter className="h-3.5 w-3.5" />
              {places.length} places
            </span>
          )}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 space-y-3">
          <p className="font-serif text-xl font-semibold">No places match those filters.</p>
          <p className="text-muted-foreground text-sm">
            Try a wider district or a different type.
          </p>
          <Button variant="outline" onClick={reset} className="mt-2">
            Clear filters
          </Button>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-4">
            Showing {filtered.length} of {places.length} places
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <PlaceCard key={p.id} place={p} />
            ))}
          </div>
        </>
      )}
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
