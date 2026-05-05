"use client";

import * as React from "react";
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
import { EventCard } from "@/components/event-card";
import { events } from "@/data/events";
import { useSubmissions } from "@/context/submissions-context";
import type { District, Event } from "@/lib/types";

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
  const { approvedEvents } = useSubmissions();

  const allEvents = React.useMemo<Event[]>(() => {
    const submitted = approvedEvents.map((s) => s.payload);
    const ids = new Set(events.map((e) => e.id));
    const dedupedSubmitted = submitted.filter((e) => !ids.has(e.id));
    return [...events, ...dedupedSubmitted];
  }, [approvedEvents]);

  const filtered = React.useMemo(() => {
    const today = new Date("2026-05-04");
    return allEvents
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
  }, [allEvents, district, month, q]);

  const reset = () => {
    setDistrict("all");
    setMonth("all");
    setQ("");
  };
  const hasFilters = district !== "all" || month !== "all" || !!q.trim();

  return (
    <div className="container py-12 md:py-16">
      <header className="space-y-4 mb-10 max-w-3xl">
        <p className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground">
          <span className="h-px w-6 bg-current opacity-40" aria-hidden />
          Events
        </p>
        <h1 className="font-serif text-[34px] md:text-5xl lg:text-[56px] font-medium leading-[1.05] text-balance">
          A region always celebrating
        </h1>
        <p className="text-muted-foreground text-pretty leading-relaxed">
          From Pushkaralu to Karthika lamps, Sankranti muggu to Konaseema coconut festivals — the
          Godavari calendar, all in one place.
        </p>
      </header>

      <div className="flex flex-col gap-3 mb-8 pb-6 border-b border-border/60">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-center">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search events…"
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
          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger className="md:w-[180px] h-11">
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
        </div>
        <div className="flex items-center justify-between gap-3 text-sm">
          <p className="text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "event" : "events"} upcoming
          </p>
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={reset} className="h-8">
              <X className="h-3.5 w-3.5" />
              Clear filters
            </Button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24 max-w-md mx-auto space-y-4">
          <div className="mx-auto h-12 w-12 grid place-items-center rounded-full border border-border bg-card text-muted-foreground">
            <Search className="h-5 w-5" />
          </div>
          <h2 className="font-serif text-xl font-medium">No events match those filters.</h2>
          <p className="text-sm text-muted-foreground">
            Try a different month or open it up to all districts.
          </p>
          <Button variant="outline" onClick={reset} className="mt-2">
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      )}
    </div>
  );
}
