import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass, MapPin, Sparkles, Utensils } from "lucide-react";
import { SearchBar } from "@/components/search-bar";
import { SectionHeading } from "@/components/section-heading";
import { PlaceCard } from "@/components/place-card";
import { EventCard } from "@/components/event-card";
import { ItineraryCard } from "@/components/itinerary-card";
import { FoodCard } from "@/components/food-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getFeaturedPlaces } from "@/data/places";
import { getUpcomingEvents } from "@/data/events";
import { getPopularItineraries } from "@/data/itineraries";
import { food } from "@/data/food";

const heroImage =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&q=80&auto=format&fit=crop";

const valueProps = [
  {
    icon: MapPin,
    title: "Two Godavaris, one guide",
    detail:
      "East and West Godavari, Konaseema, Eluru and Kakinada — curated as one living region, not stitched together.",
  },
  {
    icon: Sparkles,
    title: "Stories, not just listings",
    detail:
      "Every place comes with the why — when to visit, what to eat, who to call and what locals would actually do.",
  },
  {
    icon: Compass,
    title: "Plans that respect your time",
    detail:
      "1-day, weekend and budget itineraries built by people who have walked these ghats and ridden these jeeps.",
  },
  {
    icon: Utensils,
    title: "Food worth the journey",
    detail:
      "Pulasa in monsoon, pootharekulu from Atreyapuram, bamboo chicken in the forest — guided by season and street.",
  },
];

export default function HomePage() {
  const featured = getFeaturedPlaces();
  const events = getUpcomingEvents(3);
  const itineraries = getPopularItineraries(3);
  const foodHighlights = food.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={heroImage}
            alt="The Godavari river at golden hour"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />
        </div>

        <div className="container min-h-[88vh] flex flex-col justify-end pb-16 pt-32 text-white">
          <div className="max-w-3xl space-y-6 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em]">
              <span className="h-1.5 w-1.5 rounded-full bg-saffron-300" />
              Ubhaya Godavari · Living Guide
            </span>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] text-balance">
              The two Godavaris, told the way they deserve.
            </h1>
            <p className="text-base md:text-lg text-white/85 max-w-xl">
              Temples that wake with the river. Villages that smell of coconut and woodsmoke.
              Festivals that have run on the same calendar for centuries. Discover them, plan them,
              taste them — without rushing.
            </p>
            <SearchBar />
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-sm text-white/85">
              <Link href="/places" className="inline-flex items-center gap-1 hover:text-white">
                Explore places <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/plan" className="inline-flex items-center gap-1 hover:text-white">
                Plan a trip <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/food" className="inline-flex items-center gap-1 hover:text-white">
                Eat your way through <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="container py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {valueProps.map((vp) => (
            <Card key={vp.title} className="p-6 hover:shadow-lift hover:-translate-y-1 transition-all">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary mb-4">
                <vp.icon className="h-5 w-5" />
              </span>
              <h3 className="font-serif text-lg font-semibold mb-1.5">{vp.title}</h3>
              <p className="text-sm text-muted-foreground">{vp.detail}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured places */}
      <section className="container pb-16 md:pb-20">
        <SectionHeading
          eyebrow="Featured"
          title="Places that stay with you"
          description="Hand-picked corners of the two Godavaris — from forested gorges to temple towns, riverside ghats to coconut groves."
          ctaHref="/places"
          ctaLabel="See all places"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((p) => (
            <PlaceCard key={p.id} place={p} />
          ))}
        </div>
      </section>

      {/* Events */}
      <section className="bg-secondary/40 border-y border-border/60">
        <div className="container py-16 md:py-20">
          <SectionHeading
            eyebrow="On the calendar"
            title="Festivals & gatherings"
            description="Karthika lamps on the ghats, Sankranti muggu on every doorstep, and the once-in-a-lifetime Pushkaralu — the Godavari is always celebrating something."
            ctaHref="/events"
            ctaLabel="See all events"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {events.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </div>
      </section>

      {/* Itineraries */}
      <section className="container py-16 md:py-20">
        <SectionHeading
          eyebrow="Plan it"
          title="Itineraries built by people who’ve been"
          description="Day trips, slow weekends, budget escapes — every plan tested on the ground, not just on a map."
          ctaHref="/plan"
          ctaLabel="Build your trip"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {itineraries.map((it) => (
            <Link key={it.id} href={`/plan#${it.slug}`} className="block focus:outline-none">
              <ItineraryCard itinerary={it} />
            </Link>
          ))}
        </div>
      </section>

      {/* Food */}
      <section className="bg-secondary/40 border-y border-border/60">
        <div className="container py-16 md:py-20">
          <SectionHeading
            eyebrow="Eat the river"
            title="A plate of the two Godavaris"
            description="Pulasa in monsoon, pootharekulu in Atreyapuram, bamboo chicken in the forest — a region you can taste."
            ctaHref="/food"
            ctaLabel="See the food guide"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {foodHighlights.map((f) => (
              <FoodCard key={f.id} item={f} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16 md:py-24">
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center gap-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Ready when you are
              </p>
              <h3 className="font-serif text-3xl md:text-4xl font-semibold leading-tight text-balance">
                Plan a trip to the two Godavaris — at your pace.
              </h3>
              <p className="text-muted-foreground">
                Pick a one-day classic, a slow Konaseema weekend, or a budget forest escape. Every
                plan is editable, printable, and built around how the region actually moves.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild size="lg">
                  <Link href="/plan">Plan a Trip</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/contact">Ask a Local</Link>
                </Button>
              </div>
            </div>
            <div className="relative min-h-[260px] md:min-h-[420px] bg-secondary">
              <Image
                src="https://images.unsplash.com/photo-1604542030959-1cb98b7d92e0?w=1600&q=80&auto=format&fit=crop"
                alt="Konaseema backwaters"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Card>
      </section>
    </>
  );
}
