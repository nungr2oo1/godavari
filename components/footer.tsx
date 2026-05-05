import Link from "next/link";
import { Mail } from "lucide-react";

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
    title: "Region",
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
    <footer className="mt-24 border-t border-border/60">
      <div className="container py-14 grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-4 max-w-sm">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span
              aria-hidden
              className="grid h-8 w-8 place-items-center rounded-full bg-foreground text-background"
            >
              <span className="font-serif text-sm font-semibold leading-none -mt-0.5">U</span>
            </span>
            <span className="leading-none">
              <span className="block font-serif text-[15px] font-semibold">
                Ubhaya Godavari
              </span>
              <span className="block mt-1 text-[10px] uppercase tracking-eyebrow text-muted-foreground">
                Living Guide
              </span>
            </span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A heartfelt guide to the two Godavaris — temples that wake with the river, villages
            that smell of jasmine, and dishes only your grandmother knows by name.
          </p>
          <a
            href="mailto:hello@ubhayagodavari.guide"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="h-3.5 w-3.5" />
            hello@ubhayagodavari.guide
          </a>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground mb-4">
              {col.title}
            </h4>
            <ul className="space-y-2.5">
              {col.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/80 hover:text-foreground transition-colors"
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
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Ubhaya Godavari Living Guide</p>
          <p>Stories of the river, told slowly.</p>
        </div>
      </div>
    </footer>
  );
}
