import type { ItineraryStop } from "@/lib/types";

export function Timeline({ stops }: { stops: ItineraryStop[] }) {
  return (
    <ol className="relative border-l border-border pl-8 space-y-8">
      {stops.map((stop, idx) => (
        <li key={idx} className="relative">
          <span
            aria-hidden
            className="absolute -left-[37px] top-1 grid h-6 w-6 place-items-center rounded-full bg-background border border-border text-[11px] font-medium tabular-nums text-muted-foreground"
          >
            {idx + 1}
          </span>
          <div className="space-y-1.5">
            <p className="text-[11px] uppercase tracking-eyebrow text-muted-foreground font-medium">
              {stop.time}
            </p>
            <h4 className="font-serif text-lg font-medium leading-snug">{stop.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{stop.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
