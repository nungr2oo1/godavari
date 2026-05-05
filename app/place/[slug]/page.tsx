import { notFound } from "next/navigation";
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
import type { Metadata } from "next";
import { ImageGallery } from "@/components/image-gallery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlaceCard } from "@/components/place-card";
import { PlaceActions } from "@/components/place-actions";
import { getPlaceBySlug, places } from "@/data/places";

export function generateStaticParams() {
  return places.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const place = getPlaceBySlug(params.slug);
  if (!place) return { title: "Place not found" };
  return {
    title: place.name,
    description: place.shortDescription,
  };
}

const typeLabel: Record<string, string> = {
  nature: "Nature",
  temple: "Temple",
  beach: "Beach",
  village: "Village",
  heritage: "Heritage",
  river: "Riverside",
};

export default function PlaceDetail({ params }: { params: { slug: string } }) {
  const place = getPlaceBySlug(params.slug);
  if (!place) notFound();

  const related = places.filter((p) => p.id !== place.id && p.district === place.district).slice(0, 3);

  return (
    <article>
      <div className="container pt-8 pb-4">
        <Link
          href="/places"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          All places
        </Link>
      </div>

      {/* Header */}
      <header className="container space-y-4 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="forest">{typeLabel[place.type]}</Badge>
          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            {place.district}
          </span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-balance">
          {place.name}
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
          {place.shortDescription}
        </p>
        <PlaceActions placeId={place.id} placeName={place.name} />
      </header>

      <div className="container">
        <ImageGallery images={place.images} alt={place.name} />
      </div>

      <div className="container grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 mt-10">
        {/* Main content */}
        <div className="space-y-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="h-auto flex-wrap gap-1">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="things">Things to do</TabsTrigger>
              <TabsTrigger value="food">Food</TabsTrigger>
              <TabsTrigger value="tips">Travel tips</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card className="p-6 md:p-8 space-y-6">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-primary shrink-0">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-serif text-xl font-semibold mb-1">About {place.name}</h2>
                    <p className="text-muted-foreground leading-relaxed">{place.overview}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pt-4 border-t">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-primary shrink-0">
                    <CalendarDays className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-serif text-xl font-semibold mb-1">Best time to visit</h2>
                    <p className="text-muted-foreground">{place.bestTime}</p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="things">
              <Card className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Compass className="h-5 w-5 text-primary" />
                  <h2 className="font-serif text-xl font-semibold">Things to do</h2>
                </div>
                <ul className="space-y-3">
                  {place.thingsToDo.map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span className="text-muted-foreground">{t}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </TabsContent>

            <TabsContent value="food">
              <Card className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Utensils className="h-5 w-5 text-primary" />
                  <h2 className="font-serif text-xl font-semibold">Food to try</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {place.foodToTry.map((f) => (
                    <Badge key={f} variant="saffron" className="px-4 py-1.5 text-sm">
                      {f}
                    </Badge>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="tips">
              <Card className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <h2 className="font-serif text-xl font-semibold">Travel tips</h2>
                </div>
                <ul className="space-y-3">
                  {place.travelTips.map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                      <span className="text-muted-foreground">{t}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Static map preview */}
          <Card className="p-6 md:p-8">
            <h2 className="font-serif text-xl font-semibold mb-3 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              On the map
            </h2>
            <div className="aspect-[16/9] rounded-2xl bg-gradient-to-br from-river-100 via-forest-100 to-saffron-100 dark:from-river-900/30 dark:via-forest-900/30 dark:to-saffron-900/30 grid place-items-center text-center p-6">
              <div className="space-y-2">
                <p className="font-serif text-lg font-semibold">{place.name}</p>
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
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Card className="p-6">
            <h3 className="font-serif text-lg font-semibold mb-4 flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Local contacts
            </h3>
            <div className="space-y-4">
              {place.contacts.map((c) => (
                <div key={c.phone} className="border-b last:border-0 pb-4 last:pb-0">
                  <p className="font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground mb-2">{c.role}</p>
                  <a
                    href={`tel:${c.phone.replace(/\s/g, "")}`}
                    className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {c.phone}
                  </a>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-secondary/60">
            <h3 className="font-serif text-lg font-semibold mb-2">Need a hand planning?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Send us your dates and we’ll suggest a route, a place to stay, and a meal worth the drive.
            </p>
            <Button asChild className="w-full">
              <Link href="/contact">Ask a Local</Link>
            </Button>
          </Card>
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="container py-16 md:py-20">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-6">
            More from {place.district}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((r) => (
              <PlaceCard key={r.id} place={r} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
