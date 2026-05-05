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

const quickLinks = [
  { href: "/places", label: "Explore places" },
  { href: "/plan", label: "Plan a trip" },
  { href: "/food", label: "Eat the river" },
];

export default function HomePage() {
  const featured = getFeaturedPlaces();
  const events = getUpcomingEvents(3);
  const itineraries = getPopularItineraries(3);
  const foodHighlights = food.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden -mt-[68px]">
        <div className="absolute inset-0 -z-10">
          <Image
            src={heroImage}
            alt="The Godavari river at golden hour"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          {/* Calmer two-stop gradient — readability without heaviness */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/30 to-black/55" />
        </div>

        <div className="container min-h-[92vh] flex flex-col justify-end pb-20 pt-40 text-white">
          <div className="max-w-3xl space-y-7 animate-fade-in-up">
            <span className="inline-flex items-center gap-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              Ubhaya Godavari · Living Guide
            </span>
            <h1 className="font-serif text-[40px] leading-[1.05] md:text-6xl lg:text-7xl font-medium text-balance">
              The two Godavaris,
              <br className="hidden sm:block" />
              <span className="italic font-normal text-white/90">told the way they deserve.</span>
            </h1>
            <p className="text-[15px] md:text-lg text-white/80 max-w-xl leading-relaxed text-pretty">
              Temples that wake with the river. Villages that smell of coconut and woodsmoke.
              Festivals that have run on the same calendar for centuries — discovered, planned,
              and tasted, without rushing.
            </p>
            <div className="pt-2">
              <SearchBar />
            </div>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-2 pt-3 text-sm text-white/85">
              {quickLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  {l.label}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="container py-20 md:py-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {valueProps.map((vp, i) => (
            <div key={vp.title} className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-medium tabular-nums text-muted-foreground tracking-eyebrow">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-border" aria-hidden />
                <vp.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <h3 className="font-serif text-lg font-medium leading-snug">{vp.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{vp.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured places */}
      <section className="container pb-20 md:pb-28">
        <SectionHeading
          eyebrow="Featured"
          title="Places that stay with you"
          description="Hand-picked corners of the two Godavaris — from forested gorges to temple towns, riverside ghats to coconut groves."
          ctaHref="/places"
          ctaLabel="See all places"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => (
            <PlaceCard key={p.id} place={p} />
          ))}
        </div>
      </section>

      {/* Events */}
      <section className="bg-secondary/40 border-y border-border/60">
        <div className="container py-20 md:py-28">
          <SectionHeading
            eyebrow="On the calendar"
            title="Festivals & gatherings"
            description="Karthika lamps on the ghats, Sankranti muggu on every doorstep, the once-in-a-lifetime Pushkaralu — the Godavari is always celebrating something."
            ctaHref="/events"
            ctaLabel="See all events"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </div>
      </section>

      {/* Itineraries */}
      <section className="container py-20 md:py-28">
        <SectionHeading
          eyebrow="Plan it"
          title="Itineraries built by people who've been"
          description="Day trips, slow weekends, budget escapes — every plan tested on the ground, not just on a map."
          ctaHref="/plan"
          ctaLabel="Build your trip"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {itineraries.map((it) => (
            <Link
              key={it.id}
              href={`/plan#${it.slug}`}
              className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-2xl"
            >
              <ItineraryCard itinerary={it} />
            </Link>
          ))}
        </div>
      </section>

      {/* Food */}
      <section className="bg-secondary/40 border-y border-border/60">
        <div className="container py-20 md:py-28">
          <SectionHeading
            eyebrow="Eat the river"
            title="A plate of the two Godavaris"
            description="Pulasa in monsoon, pootharekulu in Atreyapuram, bamboo chicken in the forest — a region you can taste."
            ctaHref="/food"
            ctaLabel="See the food guide"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {foodHighlights.map((f) => (
              <FoodCard key={f.id} item={f} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20 md:py-28">
        <Card className="overflow-hidden border-border/70 shadow-soft">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center gap-5">
              <p className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground">
                <span className="h-px w-6 bg-current opacity-40" aria-hidden />
                Ready when you are
              </p>
              <h3 className="font-serif text-3xl md:text-[40px] font-medium leading-[1.1] text-balance">
                Plan a trip to the two Godavaris — at your pace.
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Pick a one-day classic, a slow Konaseema weekend, or a budget forest escape. Every
                plan is editable, printable, and built around how the region actually moves.
              </p>
              <div className="flex flex-wrap gap-3 pt-3">
                <Button asChild size="lg">
                  <Link href="/plan">Plan a trip</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/contact">Ask a local</Link>
                </Button>
              </div>
            </div>
            <div className="relative min-h-[280px] md:min-h-[440px] bg-secondary order-first md:order-last">
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
