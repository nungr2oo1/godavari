import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Event } from "@/lib/types";

export function EventCard({ event }: { event: Event }) {
  return (
    <Card className="overflow-hidden h-full hover:shadow-lift hover:border-border">
      <div className="relative aspect-[5/3] overflow-hidden bg-secondary">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
        />
        {event.tags.slice(0, 1).map((t) => (
          <div key={t} className="absolute top-3 left-3">
            <Badge>{t}</Badge>
          </div>
        ))}
      </div>
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-eyebrow text-muted-foreground">
          <Calendar className="h-3 w-3" />
          {formatDate(event.date)}
          {event.endDate ? ` – ${formatDate(event.endDate)}` : ""}
        </div>
        <h3 className="font-serif text-[19px] font-medium leading-snug text-balance">
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
