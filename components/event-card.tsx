import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Event } from "@/lib/types";

export function EventCard({ event }: { event: Event }) {
  return (
    <Card className="group overflow-hidden h-full lift-on-hover card-magic card-spotlight hover:shadow-lift hover:border-border/90">
      <div className="relative aspect-[5/3] overflow-hidden bg-secondary">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform [transition-duration:900ms] [transition-timing-function:cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.06]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"
        />
        {event.tags.slice(0, 1).map((t) => (
          <div key={t} className="absolute top-3 left-3">
            <Badge>{t}</Badge>
          </div>
        ))}
        {/* date chip */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-background/70 backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium uppercase tracking-eyebrow text-foreground/90 border border-white/10">
          <Calendar className="h-3 w-3" />
          {formatDate(event.date)}
        </div>
      </div>
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-eyebrow text-muted-foreground">
          <Calendar className="h-3 w-3" />
          {formatDate(event.date)}
          {event.endDate ? ` – ${formatDate(event.endDate)}` : ""}
        </div>
        <h3 className="font-serif text-[19px] font-medium leading-snug text-balance group-hover:text-primary transition-colors duration-300">
          {event.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {event.description}
        </p>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-2 border-t border-border/60 mt-3">
          <MapPin className="h-3.5 w-3.5" />
          {event.location}, {event.district}
        </div>
      </div>
    </Card>
  );
}
