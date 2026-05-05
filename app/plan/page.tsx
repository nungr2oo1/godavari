"use client";

import * as React from "react";
import Image from "next/image";
import { Clock, IndianRupee, MapPin, Route } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <div className="container py-12 md:py-16 space-y-12">
      <header className="space-y-4 max-w-3xl">
        <p className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground">
          <span className="h-px w-6 bg-current opacity-40" aria-hidden />
          Plan a trip
        </p>
        <h1 className="font-serif text-[34px] md:text-5xl lg:text-[56px] font-medium leading-[1.05] text-balance">
          Trips that respect your time.
        </h1>
        <p className="text-muted-foreground text-pretty leading-relaxed">
          A handful of carefully built itineraries — one-day classics, slow weekends, and honest
          budget escapes. Each one tested on the ground, not just on a map.
        </p>
      </header>

      <div className="pb-6 border-b border-border/60">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterType)}>
          <TabsList className="h-auto flex-wrap gap-1 bg-transparent p-0">
            {filterTypes.map((f) => (
              <TabsTrigger
                key={f}
                value={f}
                className="rounded-full data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-none"
              >
                {f}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((it) => (
          <a
            key={it.id}
            href={`#${it.slug}`}
            className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-2xl"
          >
            <ItineraryCard itinerary={it} />
          </a>
        ))}
      </div>

      {/* Detail sections */}
      <div className="space-y-20 pt-8">
        {filtered.map((it) => (
          <section
            key={it.id}
            id={it.slug}
            className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 scroll-mt-28"
          >
            <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
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
                    <Badge>{it.type}</Badge>
                  </div>
                </div>
                <div className="p-6 space-y-5">
                  <h2 className="font-serif text-2xl md:text-[28px] font-medium leading-snug text-balance">
                    {it.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">{it.summary}</p>
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/60">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-eyebrow text-muted-foreground inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Duration
                      </span>
                      <p className="text-sm font-medium">{it.duration}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-eyebrow text-muted-foreground inline-flex items-center gap-1">
                        <IndianRupee className="h-3 w-3" />
                        Budget
                      </span>
                      <p className="text-sm font-medium">{it.estimatedCost}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-eyebrow text-muted-foreground inline-flex items-center gap-1">
                        <Route className="h-3 w-3" />
                        Stops
                      </span>
                      <p className="text-sm font-medium">{it.placesCovered.length}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border/60 space-y-2.5">
                    <p className="text-[10px] uppercase tracking-eyebrow text-muted-foreground inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      Places covered
                    </p>
                    <div className="flex flex-wrap gap-1.5">
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
              <p className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground mb-3">
                <span className="h-px w-6 bg-current opacity-40" aria-hidden />
                The day, hour by hour
              </p>
              <h3 className="font-serif text-2xl md:text-3xl font-medium mb-8 leading-snug text-balance">
                {it.title}
              </h3>
              <Timeline stops={it.stops} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
