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
    <div className="container py-10 md:py-14 space-y-10">
      <div className="space-y-3 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Your library
        </p>
        <h1 className="font-serif text-3xl md:text-5xl font-semibold leading-tight text-balance">
          {user ? `${user.name}'s saved Godavari` : "Your saved Godavari"}
        </h1>
        <p className="text-muted-foreground">
          Places, plans and food you’ve bookmarked along the way. Open them anytime — even
          the river goes back to the same ghats.
        </p>
      </div>

      {!user ? (
        <EmptyShell
          icon={<Heart className="h-7 w-7" />}
          title="Sign in to see your saves"
          body="Save places, itineraries and dishes once you've signed in. We'll keep them in your library."
          action={
            <Button onClick={() => openLogin()}>Continue as a local</Button>
          }
        />
      ) : total === 0 ? (
        <EmptyShell
          icon={<Bookmark className="h-7 w-7" />}
          title="You haven’t saved anything yet."
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
        <div className="space-y-14">
          <SavedSection
            title="Saved places"
            icon={<MapPin className="h-5 w-5 text-primary" />}
            count={savedPlaces.length}
            emptyHref="/places"
            emptyLabel="Browse places"
          >
            {savedPlaces.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {savedPlaces.map((p) => (
                  <PlaceCard key={p.id} place={p} />
                ))}
              </div>
            )}
          </SavedSection>

          <SavedSection
            title="Saved itineraries"
            icon={<Route className="h-5 w-5 text-primary" />}
            count={savedItineraries.length}
            emptyHref="/plan"
            emptyLabel="See itineraries"
          >
            {savedItineraries.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {savedItineraries.map((it) => (
                  <ItineraryCard key={it.id} itinerary={it} />
                ))}
              </div>
            )}
          </SavedSection>

          <SavedSection
            title="Saved food"
            icon={<Utensils className="h-5 w-5 text-primary" />}
            count={savedFood.length}
            emptyHref="/food"
            emptyLabel="Find food"
          >
            {savedFood.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
    <section className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-serif text-2xl font-semibold flex items-center gap-2">
          {icon}
          {title}
          <span className="text-sm font-sans font-normal text-muted-foreground">
            ({count})
          </span>
        </h2>
      </div>
      {count === 0 ? (
        <div className="rounded-2xl border border-dashed bg-card/40 p-8 text-center">
          <p className="text-sm text-muted-foreground mb-3">
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
    <div className="rounded-3xl border bg-card/60 p-10 md:p-14 text-center space-y-4">
      <div className="mx-auto h-14 w-14 grid place-items-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h2 className="font-serif text-2xl font-semibold">{title}</h2>
      <p className="text-muted-foreground max-w-md mx-auto">{body}</p>
      <div className="pt-2">{action}</div>
    </div>
  );
}
