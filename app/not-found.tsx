import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container py-24 md:py-32 text-center max-w-xl">
      <div className="mx-auto h-16 w-16 grid place-items-center rounded-full bg-primary/10 text-primary mb-6">
        <Compass className="h-7 w-7" />
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
        Lost on the river
      </p>
      <h1 className="font-serif text-4xl md:text-5xl font-semibold leading-tight mb-3 text-balance">
        We couldn’t find that bend.
      </h1>
      <p className="text-muted-foreground mb-8">
        The page you’re looking for has either wandered off into the backwaters or never existed.
        Let’s get you back to dry land.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/">Back home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/places">Browse places</Link>
        </Button>
      </div>
    </div>
  );
}
