"use client";

import * as React from "react";
import Image from "next/image";
import { Clock, IndianRupee, MapPin, Route } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ItineraryCard } from "@/components/itinerary-card";
import { Timeline } from "@/components/timeline";
import { itineraries } from "@/data/itineraries";

const filterTypes = ["All", "1-day", "Weekend", "Budget"] as const;
type FilterType = (typeof filterTypes)[number];

export default function PlanPage() {
  const [filter, setFilter] = React.useState<FilterType>("All");

  const filtered = React.useMemo(
    () =>
      filter === "All" ? itineraries : itineraries.filter((i) => i.type === filter),
    [filter]
  );

  return (
    <div className="container py-10 md:py-14 space-y-12">
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Plan a trip</p>
        <h1 className="font-serif text-3xl md:text-5xl font-semibold leading-tight text-balance">
          Trips that respect your time.
        </h1>
        <p className="text-muted-foreground">
          A handful of carefully built itineraries — one-day classics, slow weekends, and honest
          budget escapes. Each one tested on the ground, not just on a map.
        </p>
      </div>

      {/* Filter tabs */}
      <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterType)}>
        <TabsList className="h-auto flex-wrap gap-1">
          {filterTypes.map((f) => (
            <TabsTrigger key={f} value={f}>
              {f}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((it) => (
          <a key={it.id} href={`#${it.slug}`} className="block focus:outline-none">
            <ItineraryCard itinerary={it} />
          </a>
        ))}
      </div>

      {/* Detail sections */}
      <div className="space-y-16 pt-6">
        {filtered.map((it) => (
          <section
            key={it.id}
            id={it.slug}
            className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 scroll-mt-24"
          >
            <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
              <Card className="overflow-hidden">
                <div className="relative aspect-[16/10] bg-secondary">
                  <Image
                    src={it.image}
                    alt={it.title}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="forest">{it.type}</Badge>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <h2 className="font-serif text-2xl font-semibold">{it.title}</h2>
                  <p className="text-muted-foreground">{it.summary}</p>
                  <div className="grid grid-cols-3 gap-3 pt-2 border-t">
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        Duration
                      </span>
                      <span className="text-sm font-medium">{it.duration}</span>
                    </div>
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                        <IndianRupee className="h-3.5 w-3.5" />
                        Estimate
                      </span>
                      <span className="text-sm font-medium">{it.estimatedCost}</span>
                    </div>
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                        <Route className="h-3.5 w-3.5" />
                        Stops
                      </span>
                      <span className="text-sm font-medium">{it.placesCovered.length}</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground mb-2 inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      Places covered
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {it.placesCovered.map((p) => (
                        <Badge key={p} variant="muted">
                          {p}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <h3 className="font-serif text-xl font-semibold mb-6">The day, hour by hour</h3>
              <Timeline stops={it.stops} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
