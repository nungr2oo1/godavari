import Link from "next/link";
import { Waves, Mail, Heart } from "lucide-react";

const cols = [
  {
    title: "Discover",
    items: [
      { label: "Places", href: "/places" },
      { label: "Events", href: "/events" },
      { label: "Food", href: "/food" },
      { label: "Plan a Trip", href: "/plan" },
    ],
  },
  {
    title: "By Region",
    items: [
      { label: "East Godavari", href: "/places?district=East+Godavari" },
      { label: "West Godavari", href: "/places?district=West+Godavari" },
      { label: "Konaseema", href: "/places?district=Konaseema" },
      { label: "Eluru", href: "/places?district=Eluru" },
    ],
  },
  {
    title: "Help",
    items: [
      { label: "Ask a Local", href: "/contact" },
      { label: "About", href: "/" },
      { label: "Privacy", href: "/" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/60 bg-secondary/40">
      <div className="container py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full gradient-river text-white shadow-soft">
              <Waves className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-serif text-base font-semibold">
                Ubhaya Godavari
              </span>
              <span className="block text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Living Guide
              </span>
            </span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-sm">
            A heartfelt guide to the two Godavaris — temples that wake with the river, villages
            that smell of jasmine, and dishes that only your grandmother knows by name.
          </p>
          <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Mail className="h-3.5 w-3.5" />
            hello@ubhayagodavari.guide
          </p>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold mb-3">{col.title}</h4>
            <ul className="space-y-2">
              {col.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60">
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Ubhaya Godavari Living Guide. Stories of the river.</p>
          <p className="inline-flex items-center gap-1.5">
            Crafted with <Heart className="h-3.5 w-3.5 text-accent" fill="currentColor" /> for the
            two Godavaris.
          </p>
        </div>
      </div>
    </footer>
  );
}
