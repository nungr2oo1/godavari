"use client";

import * as React from "react";
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
import { EventCard } from "@/components/event-card";
import { events } from "@/data/events";
import type { District } from "@/lib/types";

const districts: ("all" | District)[] = [
  "all",
  "East Godavari",
  "West Godavari",
  "Konaseema",
  "Eluru",
  "Kakinada",
];

const months: { value: string; label: string }[] = [
  { value: "all", label: "Any month" },
  ...Array.from({ length: 12 }, (_, i) => ({
    value: String(i),
    label: new Date(2026, i, 1).toLocaleString("en-IN", { month: "long" }),
  })),
];

export default function EventsPage() {
  const [district, setDistrict] = React.useState<string>("all");
  const [month, setMonth] = React.useState<string>("all");
  const [q, setQ] = React.useState<string>("");

  const filtered = React.useMemo(() => {
    const today = new Date("2026-05-04");
    return events
      .filter((e) => new Date(e.endDate ?? e.date) >= today)
      .filter((e) => {
        const districtOk = district === "all" || e.district === district;
        const monthOk = month === "all" || new Date(e.date).getMonth() === Number(month);
        const qLow = q.trim().toLowerCase();
        const qOk =
          !qLow ||
          e.title.toLowerCase().includes(qLow) ||
          e.location.toLowerCase().includes(qLow) ||
          e.description.toLowerCase().includes(qLow);
        return districtOk && monthOk && qOk;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [district, month, q]);

  const reset = () => {
    setDistrict("all");
    setMonth("all");
    setQ("");
  };
  const hasFilters = district !== "all" || month !== "all" || !!q.trim();

  return (
    <div className="container py-10 md:py-14">
      <div className="space-y-3 mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Events</p>
        <h1 className="font-serif text-3xl md:text-5xl font-semibold leading-tight text-balance">
          A region that is always celebrating something
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          From Pushkaralu to Karthika lamps, Sankranti muggu to Konaseema coconut festivals — find
          the next gathering on the Godavari calendar.
        </p>
      </div>

      <div className="rounded-3xl border bg-card p-4 md:p-5 shadow-soft mb-8">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto] md:items-center">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search events…"
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
          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger className="md:w-[180px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {hasFilters ? (
            <Button variant="ghost" onClick={reset}>
              <X className="h-4 w-4" />
              Clear
            </Button>
          ) : (
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-muted-foreground px-3">
              <Filter className="h-3.5 w-3.5" />
              {filtered.length} upcoming
            </span>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 space-y-3">
          <p className="font-serif text-xl font-semibold">No events match those filters.</p>
          <p className="text-muted-foreground text-sm">
            Try a different month or open it up to all districts.
          </p>
          <Button variant="outline" onClick={reset} className="mt-2">
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      )}
    </div>
  );
}
