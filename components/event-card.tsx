import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Event } from "@/lib/types";

export function EventCard({ event }: { event: Event }) {
  return (
    <Card className="overflow-hidden h-full hover:shadow-lift hover:-translate-y-1 transition-all">
      <div className="relative aspect-[5/3] overflow-hidden bg-secondary">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 hover:scale-[1.04]"
        />
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          {event.tags.slice(0, 2).map((t) => (
            <Badge key={t} variant="saffron">
              {t}
            </Badge>
          ))}
        </div>
      </div>
      <div className="p-5 space-y-3">
        <h3 className="font-serif text-lg font-semibold leading-tight">{event.title}</h3>
        <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-primary" />
            {formatDate(event.date)}
            {event.endDate ? ` – ${formatDate(event.endDate)}` : ""}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-primary" />
            {event.location}, {event.district}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">{event.description}</p>
      </div>
    </Card>
  );
}
