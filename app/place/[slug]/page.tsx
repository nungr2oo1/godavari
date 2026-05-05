"use client";

import * as React from "react";
import Link from "next/link";
import {
  CalendarDays,
  Compass,
  MapPin,
  Phone,
  Sparkles,
  Utensils,
  Lightbulb,
  ChevronLeft,
} from "lucide-react";
import { ImageGallery } from "@/components/image-gallery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlaceCard } from "@/components/place-card";
import { PlaceActions } from "@/components/place-actions";
import { places } from "@/data/places";
import { useSubmissions } from "@/context/submissions-context";
import type { Place } from "@/lib/types";

const typeLabel: Record<string, string> = {
  nature: "Nature",
  temple: "Temple",
  beach: "Beach",
  village: "Village",
  heritage: "Heritage",
  river: "Riverside",
};

function NotFoundCard() {
  return (
    <div className="container py-20">
      <Card className="mx-auto max-w-lg p-8 text-center shadow-soft">
        <h1 className="font-serif text-2xl md:text-3xl font-medium leading-snug">
          Place not found
        </h1>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          We couldn&apos;t find a place at this address. It may have been removed or never
          existed.
        </p>
        <Button asChild variant="outline" className="mt-6">
          <Link href="/places">Browse all places</Link>
        </Button>
      </Card>
    </div>
  );
}

export default function PlaceDetail({ params }: { params: { slug: string } }) {
  const { approvedPlaces } = useSubmissions();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const allPlaces = React.useMemo<Place[]>(() => {
    const submissionPlaces = approvedPlaces.map((s) => s.payload);
    const ids = new Set(places.map((p) => p.id));
    return [...places, ...submissionPlaces.filter((p) => !ids.has(p.id))];
  }, [approvedPlaces]);

  const place: Place | undefined = React.useMemo(
    () => allPlaces.find((p) => p.slug === params.slug),
    [allPlaces, params.slug]
  );

  const related = React.useMemo(() => {
    if (!place) return [] as Place[];
    return allPlaces
      .filter((p) => p.id !== place.id && p.district === place.district)
      .slice(0, 3);
  }, [allPlaces, place]);

  // During first paint we don't yet have submissions hydrated; if the slug
  // isn't in the static data, wait one tick before rendering the not-found
  // card to avoid a flash for partner-submitted places.
  if (!place) {
    if (!mounted) return <div className="container py-20" />;
    return <NotFoundCard />;
  }

  return (
    <article>
      <div className="container pt-10 pb-4">
        <Link
          href="/places"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          All places
        </Link>
      </div>

      {/* Header */}
      <header className="container space-y-5 mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>{typeLabel[place.type]}</Badge>
          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {place.district}
          </span>
        </div>
        <h1 className="font-serif text-[40px] md:text-5xl lg:text-[64px] font-medium leading-[1.05] text-balance">
          {place.name}
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-3xl text-pretty leading-relaxed">
          {place.shortDescription}
        </p>
        <PlaceActions placeId={place.id} placeName={place.name} />
      </header>

      <div className="container">
        <ImageGallery images={place.images} alt={place.name} />
      </div>

      <div className="container grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-14 mt-12">
        {/* Main content */}
        <div className="space-y-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="h-auto flex-wrap gap-1 bg-transparent p-0 border-b border-border/60 rounded-none w-full justify-start">
              <TabsTrigger
                value="overview"
                className="rounded-none border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:border-foreground data-[state=active]:shadow-none px-4 pb-3 pt-2"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="things"
                className="rounded-none border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:border-foreground data-[state=active]:shadow-none px-4 pb-3 pt-2"
              >
                Things to do
              </TabsTrigger>
              <TabsTrigger
                value="food"
                className="rounded-none border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:border-foreground data-[state=active]:shadow-none px-4 pb-3 pt-2"
              >
                Food
              </TabsTrigger>
              <TabsTrigger
                value="tips"
                className="rounded-none border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:border-foreground data-[state=active]:shadow-none px-4 pb-3 pt-2"
              >
                Travel tips
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="space-y-10 py-2">
                <section className="flex items-start gap-4">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-foreground shrink-0">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <div className="space-y-2">
                    <h2 className="font-serif text-xl md:text-2xl font-medium">
                      About {place.name}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-pretty">
                      {place.overview}
                    </p>
                  </div>
                </section>
                <section className="flex items-start gap-4 pt-8 border-t border-border/60">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-foreground shrink-0">
                    <CalendarDays className="h-4 w-4" />
                  </span>
                  <div className="space-y-2">
                    <h2 className="font-serif text-xl md:text-2xl font-medium">
                      Best time to visit
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">{place.bestTime}</p>
                  </div>
                </section>
              </div>
            </TabsContent>

            <TabsContent value="things">
              <section className="py-2 space-y-5">
                <div className="flex items-center gap-2">
                  <Compass className="h-4 w-4 text-muted-foreground" />
                  <h2 className="font-serif text-xl md:text-2xl font-medium">Things to do</h2>
                </div>
                <ul className="space-y-3">
                  {place.thingsToDo.map((t, i) => (
                    <li key={t} className="flex gap-4 group">
                      <span className="text-[11px] tabular-nums text-muted-foreground tracking-eyebrow pt-1.5 w-6 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-foreground/85 leading-relaxed border-l border-border/60 pl-4 group-hover:border-foreground/40 transition-colors">
                        {t}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </TabsContent>

            <TabsContent value="food">
              <section className="py-2 space-y-5">
                <div className="flex items-center gap-2">
                  <Utensils className="h-4 w-4 text-muted-foreground" />
                  <h2 className="font-serif text-xl md:text-2xl font-medium">Food to try</h2>
                </div>
                {place.foodToTry.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {place.foodToTry.map((f) => (
                      <Badge key={f} variant="muted" className="px-3.5 py-1 text-sm">
                        {f}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Food recommendations coming soon for this place.
                  </p>
                )}
              </section>
            </TabsContent>

            <TabsContent value="tips">
              <section className="py-2 space-y-5">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-muted-foreground" />
                  <h2 className="font-serif text-xl md:text-2xl font-medium">Travel tips</h2>
                </div>
                {place.travelTips.length > 0 ? (
                  <ul className="space-y-3">
                    {place.travelTips.map((t, i) => (
                      <li key={t} className="flex gap-4">
                        <span className="text-[11px] tabular-nums text-muted-foreground tracking-eyebrow pt-1.5 w-6 shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-foreground/85 leading-relaxed border-l border-border/60 pl-4">
                          {t}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No travel tips listed yet for this place.
                  </p>
                )}
              </section>
            </TabsContent>
          </Tabs>

          {/* Map preview */}
          <Card className="p-6 md:p-8">
            <h2 className="font-serif text-xl font-medium mb-4 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              On the map
            </h2>
            <div className="aspect-[16/9] rounded-xl bg-secondary/60 grid place-items-center text-center p-6 border border-border/60">
              <div className="space-y-3">
                <p className="font-serif text-lg font-medium">{place.name}</p>
                <p className="text-sm text-muted-foreground">{place.district} · Andhra Pradesh</p>
                <Button asChild variant="outline" size="sm">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      place.name + ", " + place.district
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Google Maps
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <Card className="p-6">
            <h3 className="font-serif text-lg font-medium mb-5 flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              Local contacts
            </h3>
            <div className="space-y-4">
              {place.contacts.map((c) => (
                <div key={c.phone} className="border-b border-border/60 last:border-0 pb-4 last:pb-0">
                  <p className="font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground mb-2">{c.role}</p>
                  <a
                    href={`tel:${c.phone.replace(/\s/g, "")}`}
                    className="text-sm text-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {c.phone}
                  </a>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-secondary/40 border-border/60">
            <h3 className="font-serif text-lg font-medium mb-2">Need a hand planning?</h3>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              Send your dates and we&apos;ll suggest a route, a place to stay, and a meal worth the
              drive.
            </p>
            <Button asChild className="w-full">
              <Link href="/contact">Ask a Local</Link>
            </Button>
          </Card>
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="container py-20 md:py-28">
          <div className="mb-10 space-y-3">
            <p className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground">
              <span className="h-px w-6 bg-current opacity-40" aria-hidden />
              Nearby
            </p>
            <h2 className="font-serif text-2xl md:text-4xl font-medium leading-snug text-balance">
              More from {place.district}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((r) => (
              <PlaceCard key={r.id} place={r} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
