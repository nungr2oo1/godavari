import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown, Compass, MapPin, Sparkles, Utensils } from "lucide-react";
import { SearchBar } from "@/components/search-bar";
import { SectionHeading } from "@/components/section-heading";
import { PlaceCard } from "@/components/place-card";
import { EventCard } from "@/components/event-card";
import { ItineraryCard } from "@/components/itinerary-card";
import { FoodCard } from "@/components/food-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { MarqueeStrip } from "@/components/marquee-strip";
import { getFeaturedPlaces } from "@/data/places";
import { getUpcomingEvents } from "@/data/events";
import { getPopularItineraries } from "@/data/itineraries";
import { food } from "@/data/food";

const heroImage = "/images/river.png";

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

const marqueeItems = [
  "Papikondalu gorges",
  "Konaseema backwaters",
  "Antarvedi sangamam",
  "Pulasa in monsoon",
  "Pootharekulu of Atreyapuram",
  "Karthika lamps on the ghats",
  "Bamboo chicken at Maredumilli",
  "Dwaraka Tirumala dawn",
  "Rajamahendravaram bridge",
  "Coconut groves of Dindi",
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
          {/* Ken Burns slow zoom on hero image */}
          <div className="absolute inset-0 animate-ken-burns">
            <Image
              src={heroImage}
              alt="The Godavari river at golden hour"
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
          </div>
          {/* base gradient for legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/65" />
          {/* warm vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_120%,hsl(218_30%_8%/0.85),transparent_60%)]" />
          {/* film grain */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.07] mix-blend-overlay bg-noise"
          />
          {/* drifting glow blobs */}
          <div
            aria-hidden
            className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-primary/20 blur-3xl animate-blob"
          />
          <div
            aria-hidden
            className="absolute -bottom-40 -right-24 h-[480px] w-[480px] rounded-full bg-accent/15 blur-3xl animate-blob"
            style={{ animationDelay: "-6s" }}
          />
        </div>

        <div className="container min-h-[92vh] flex flex-col justify-end pb-20 pt-40 text-white">
          <div className="max-w-3xl space-y-7 animate-fade-in-up">
            <span className="inline-flex items-center gap-2.5 rounded-full glass border-white/15 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-eyebrow">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              Ubhaya Godavari · Living Guide
            </span>
            <h1 className="font-serif text-[40px] leading-[1.05] md:text-6xl lg:text-7xl font-medium text-balance">
              The two Godavaris,
              <br className="hidden sm:block" />
              <span className="italic font-normal text-gradient-sunset">
                told the way they deserve.
              </span>
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
                  <span className="relative">
                    {l.label}
                    <span
                      aria-hidden
                      className="absolute -bottom-0.5 left-0 h-px w-0 bg-white transition-all duration-500 group-hover:w-full"
                    />
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-white/70">
          <span className="text-[10px] font-medium uppercase tracking-eyebrow">Scroll</span>
          <span className="relative h-9 w-5 rounded-full border border-white/40">
            <ChevronDown className="absolute inset-x-0 mx-auto top-1.5 h-3 w-3 animate-scroll-hint" />
          </span>
        </div>
      </section>

      {/* Marquee strip — sits right under hero, gives motion at the seam */}
      <section className="border-y border-border/50 bg-card/30">
        <div className="container">
          <MarqueeStrip items={marqueeItems} />
        </div>
      </section>

      {/* Value props */}
      <section className="container py-20 md:py-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {valueProps.map((vp, i) => (
            <Reveal
              key={vp.title}
              delay={(Math.min(i, 3) as 0 | 1 | 2 | 3)}
              className="group space-y-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-medium tabular-nums text-muted-foreground tracking-eyebrow">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-border transition-colors group-hover:bg-primary/60" aria-hidden />
                <span className="grid h-9 w-9 place-items-center rounded-full border border-border/70 bg-card/40 text-muted-foreground transition-all duration-500 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/40 group-hover:rotate-6">
                  <vp.icon className="h-4 w-4" />
                </span>
              </div>
              <h3 className="font-serif text-lg font-medium leading-snug">{vp.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{vp.detail}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured places */}
      <section className="container pb-20 md:pb-28">
        <Reveal>
          <SectionHeading
            eyebrow="Featured"
            title="Places that stay with you"
            description="Hand-picked corners of the two Godavaris — from forested gorges to temple towns, riverside ghats to coconut groves."
            ctaHref="/places"
            ctaLabel="See all places"
          />
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={(Math.min(i, 3) as 0 | 1 | 2 | 3)}>
              <PlaceCard place={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Events */}
      <section className="relative bg-secondary/40 border-y border-border/60 overflow-hidden">
        {/* faint floating decoration */}
        <div
          aria-hidden
          className="absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-float"
        />
        <div className="container py-20 md:py-28 relative">
          <Reveal>
            <SectionHeading
              eyebrow="On the calendar"
              title="Festivals & gatherings"
              description="Karthika lamps on the ghats, Sankranti muggu on every doorstep, the once-in-a-lifetime Pushkaralu — the Godavari is always celebrating something."
              ctaHref="/events"
              ctaLabel="See all events"
            />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((e, i) => (
              <Reveal key={e.id} delay={(Math.min(i, 3) as 0 | 1 | 2 | 3)}>
                <EventCard event={e} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Itineraries */}
      <section className="container py-20 md:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Plan it"
            title="Itineraries built by people who've been"
            description="Day trips, slow weekends, budget escapes — every plan tested on the ground, not just on a map."
            ctaHref="/plan"
            ctaLabel="Build your trip"
          />
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {itineraries.map((it, i) => (
            <Reveal key={it.id} delay={(Math.min(i, 3) as 0 | 1 | 2 | 3)}>
              <Link
                href={`/plan#${it.slug}`}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-2xl"
              >
                <ItineraryCard itinerary={it} />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Food */}
      <section className="relative bg-secondary/40 border-y border-border/60 overflow-hidden">
        <div
          aria-hidden
          className="absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-accent/10 blur-3xl animate-float"
          style={{ animationDelay: "-2s" }}
        />
        <div className="container py-20 md:py-28 relative">
          <Reveal>
            <SectionHeading
              eyebrow="Eat the river"
              title="A plate of the two Godavaris"
              description="Pulasa in monsoon, pootharekulu in Atreyapuram, bamboo chicken in the forest — a region you can taste."
              ctaHref="/food"
              ctaLabel="See the food guide"
            />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {foodHighlights.map((f, i) => (
              <Reveal key={f.id} delay={(Math.min(i, 3) as 0 | 1 | 2 | 3)}>
                <FoodCard item={f} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20 md:py-28">
        <Reveal>
          <Card className="relative overflow-hidden border-border/70 shadow-soft card-magic">
            {/* aurora behind the CTA */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl animate-blob"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-accent/15 blur-3xl animate-blob"
              style={{ animationDelay: "-8s" }}
            />
            <div className="grid md:grid-cols-2 relative">
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center gap-5">
                <p className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground">
                  <span className="h-px w-6 bg-current opacity-40" aria-hidden />
                  Ready when you are
                </p>
                <h3 className="font-serif text-3xl md:text-[40px] font-medium leading-[1.1] text-balance">
                  Plan a trip to the two Godavaris —{" "}
                  <span className="text-gradient-sunset">at your pace.</span>
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Pick a one-day classic, a slow Konaseema weekend, or a budget forest escape. Every
                  plan is editable, printable, and built around how the region actually moves.
                </p>
                <div className="flex flex-wrap gap-3 pt-3">
                  <Button asChild size="lg">
                    <Link href="/plan">
                      Plan a trip
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/contact">Ask a local</Link>
                  </Button>
                </div>
              </div>
              <div className="relative min-h-[280px] md:min-h-[440px] bg-secondary order-first md:order-last overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1604542030959-1cb98b7d92e0?w=1600&q=80&auto=format&fit=crop"
                  alt="Konaseema backwaters"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform [transition-duration:1200ms] group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-r from-card/40 via-transparent to-transparent md:from-card/60"
                />
              </div>
            </div>
          </Card>
        </Reveal>
      </section>
    </>
  );
}
