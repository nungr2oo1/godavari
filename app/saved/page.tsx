"use client";

import * as React from "react";
import Link from "next/link";
import { Bookmark, Heart, MapPin, Route, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlaceCard } from "@/components/place-card";
import { FoodCard } from "@/components/food-card";
import { ItineraryCard } from "@/components/itinerary-card";
import { useSaved } from "@/context/saved-context";
import { useAuth } from "@/context/auth-context";
import { places } from "@/data/places";
import { food } from "@/data/food";
import { itineraries } from "@/data/itineraries";

export default function SavedPage() {
  const { user, openLogin } = useAuth();
  const { saved, count } = useSaved();

  const savedPlaces = React.useMemo(
    () => places.filter((p) => saved.places.includes(p.id)),
    [saved.places]
  );
  const savedFood = React.useMemo(
    () => food.filter((f) => saved.food.includes(f.id)),
    [saved.food]
  );
  const savedItineraries = React.useMemo(
    () => itineraries.filter((i) => saved.itineraries.includes(i.id)),
    [saved.itineraries]
  );

  const total = count();

  return (
    <div className="container py-12 md:py-16 space-y-12">
      <header className="space-y-4 max-w-3xl">
        <p className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground">
          <span className="h-px w-6 bg-current opacity-40" aria-hidden />
          Your library
        </p>
        <h1 className="font-serif text-[34px] md:text-5xl lg:text-[56px] font-medium leading-[1.05] text-balance">
          {user ? `${user.name}'s saved Godavari` : "Your saved Godavari"}
        </h1>
        <p className="text-muted-foreground text-pretty leading-relaxed">
          Places, plans and food you've bookmarked along the way. Open them anytime — even
          the river goes back to the same ghats.
        </p>
      </header>

      {!user ? (
        <EmptyShell
          icon={<Heart className="h-6 w-6" />}
          title="Sign in to see your saves"
          body="Save places, itineraries and dishes once you've signed in. We'll keep them in your library."
          action={<Button onClick={() => openLogin()}>Continue as a local</Button>}
        />
      ) : total === 0 ? (
        <EmptyShell
          icon={<Bookmark className="h-6 w-6" />}
          title="You haven't saved anything yet."
          body="Tap the heart on any place, itinerary or dish to keep it here for later."
          action={
            <div className="flex flex-wrap gap-2 justify-center">
              <Button asChild variant="default">
                <Link href="/places">Browse places</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/plan">See itineraries</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/food">Find food</Link>
              </Button>
            </div>
          }
        />
      ) : (
        <div className="space-y-16">
          <SavedSection
            title="Places"
            icon={<MapPin className="h-4 w-4" />}
            count={savedPlaces.length}
            emptyHref="/places"
            emptyLabel="Browse places"
          >
            {savedPlaces.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedPlaces.map((p) => (
                  <PlaceCard key={p.id} place={p} />
                ))}
              </div>
            )}
          </SavedSection>

          <SavedSection
            title="Itineraries"
            icon={<Route className="h-4 w-4" />}
            count={savedItineraries.length}
            emptyHref="/plan"
            emptyLabel="See itineraries"
          >
            {savedItineraries.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedItineraries.map((it) => (
                  <ItineraryCard key={it.id} itinerary={it} />
                ))}
              </div>
            )}
          </SavedSection>

          <SavedSection
            title="Food"
            icon={<Utensils className="h-4 w-4" />}
            count={savedFood.length}
            emptyHref="/food"
            emptyLabel="Find food"
          >
            {savedFood.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {savedFood.map((f) => (
                  <FoodCard key={f.id} item={f} />
                ))}
              </div>
            )}
          </SavedSection>
        </div>
      )}
    </div>
  );
}

function SavedSection({
  title,
  icon,
  count,
  emptyHref,
  emptyLabel,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  count: number;
  emptyHref: string;
  emptyLabel: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-border/60">
        <div className="flex items-baseline gap-3">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-secondary text-muted-foreground self-center">
            {icon}
          </span>
          <h2 className="font-serif text-xl md:text-2xl font-medium">{title}</h2>
          <span className="text-xs tabular-nums text-muted-foreground">
            {count}
          </span>
        </div>
      </div>
      {count === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/40 p-10 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Nothing saved here yet.
          </p>
          <Button asChild variant="outline" size="sm">
            <Link href={emptyHref}>{emptyLabel}</Link>
          </Button>
        </div>
      ) : (
        children
      )}
    </section>
  );
}

function EmptyShell({
  icon,
  title,
  body,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  action: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-10 md:p-16 text-center space-y-5 max-w-2xl mx-auto">
      <div className="mx-auto h-12 w-12 grid place-items-center rounded-full border border-border bg-background text-muted-foreground">
        {icon}
      </div>
      <h2 className="font-serif text-2xl md:text-[28px] font-medium leading-snug text-balance">
        {title}
      </h2>
      <p className="text-muted-foreground max-w-md mx-auto text-pretty leading-relaxed">{body}</p>
      <div className="pt-2">{action}</div>
    </div>
  );
}
