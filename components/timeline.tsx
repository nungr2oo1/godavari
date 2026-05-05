import type { ItineraryStop } from "@/lib/types";

export function Timeline({ stops }: { stops: ItineraryStop[] }) {
  return (
    <ol className="relative border-l-2 border-dashed border-primary/30 pl-6 space-y-6">
      {stops.map((stop, idx) => (
        <li key={idx} className="relative">
          <span className="absolute -left-[34px] top-1 grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-soft">
            {idx + 1}
          </span>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-primary font-semibold">
              {stop.time}
            </p>
            <h4 className="font-serif text-base font-semibold">{stop.title}</h4>
            <p className="text-sm text-muted-foreground">{stop.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
