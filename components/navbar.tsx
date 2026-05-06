"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/user-menu";
import { useAuth } from "@/context/auth-context";
import { useSaved } from "@/context/saved-context";
import { cn } from "@/lib/utils";

type NavLink = { href: string; label: string };

const baseLinks: NavLink[] = [
  { href: "/places", label: "Places" },
  { href: "/events", label: "Events" },
  { href: "/plan", label: "Plan" },
  { href: "/food", label: "Food" },
  { href: "/saved", label: "Saved" },
  { href: "/contact", label: "Ask" },
];

const partnerLink: NavLink = { href: "/partner/dashboard", label: "Partner" };
const adminLink: NavLink = { href: "/admin", label: "Admin" };
const becomePartnerLink: NavLink = { href: "/partner/apply", label: "Become a Partner" };

function Wordmark() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group" aria-label="Ubhaya Godavari home">
      <span
        aria-hidden
        className="relative grid h-8 w-8 place-items-center rounded-full bg-foreground text-background transition-all duration-500 group-hover:bg-primary group-hover:rotate-[18deg]"
      >
        <span className="font-serif text-sm font-semibold leading-none -mt-0.5">U</span>
        {/* soft glow on hover */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-primary/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </span>
      <span className="leading-none">
        <span className="block font-serif text-[15px] font-semibold tracking-tight">
          Ubhaya Godavari
        </span>
        <span className="block mt-1 text-[10px] uppercase tracking-eyebrow text-muted-foreground">
          Living Guide
        </span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { user, openLogin } = useAuth();
  const { count } = useSaved();
  const savedCount = count();

  const links = React.useMemo<NavLink[]>(() => {
    const role = user?.role;
    if (role === "admin") return [...baseLinks, adminLink];
    if (role === "partner") return [...baseLinks, partnerLink];
    // Only surface the apply CTA to anonymous visitors, not signed-in travelers.
    if (!user) return [...baseLinks, becomePartnerLink];
    return baseLinks;
  }, [user]);

  const navRef = React.useRef<HTMLElement | null>(null);
  const itemRefs = React.useRef<Record<string, HTMLAnchorElement | null>>({});
  const [hoverKey, setHoverKey] = React.useState<string | null>(null);
  const [pillStyle, setPillStyle] = React.useState<{
    left: number;
    width: number;
    opacity: number;
  }>({ left: 0, width: 0, opacity: 0 });

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const updatePill = React.useCallback(
    (key: string | null) => {
      const wrap = navRef.current;
      if (!wrap) return;
      const targetKey =
        key ??
        links.find(
          (l) => pathname === l.href || pathname.startsWith(l.href + "/")
        )?.href ??
        null;
      if (!targetKey) {
        setPillStyle((s) => ({ ...s, opacity: 0 }));
        return;
      }
      const el = itemRefs.current[targetKey];
      if (!el) return;
      const wrapRect = wrap.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      setPillStyle({
        left: rect.left - wrapRect.left,
        width: rect.width,
        opacity: 1,
      });
    },
    [pathname, links]
  );

  // Reposition the pill on path change & resize (also when links list changes,
  // e.g. role switch adds/removes Admin link).
  React.useEffect(() => {
    updatePill(hoverKey);
    const onResize = () => updatePill(hoverKey);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [hoverKey, pathname, updatePill, links]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-soft"
          : "bg-transparent border-b border-transparent"
      )}
    >
      {/* Top scrim — keeps the navbar legible over the hero without darkening the whole image */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background/80 via-background/30 to-transparent transition-opacity duration-300",
          scrolled ? "opacity-0" : "opacity-100"
        )}
      />
      <div className="container relative z-10 flex h-[68px] items-center justify-between gap-6">
        <Wordmark />

        <nav
          ref={navRef as any}
          className="hidden lg:flex relative items-center"
          aria-label="Primary"
          onMouseLeave={() => {
            setHoverKey(null);
          }}
        >
          {/* Magic pill — animated bg follows hover/active */}
          <span
            aria-hidden
            className="absolute top-1/2 -translate-y-1/2 h-9 rounded-full bg-secondary/80 border border-border/60 transition-[transform,width,opacity,background-color] duration-300 [transition-timing-function:cubic-bezier(0.2,0.8,0.2,1)]"
            style={{
              transform: `translate(${pillStyle.left}px, -50%)`,
              width: pillStyle.width,
              opacity: pillStyle.opacity,
            }}
          />
          <div className="relative flex items-center gap-1">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(link.href + "/");
              const showBadge = link.href === "/saved" && savedCount > 0;
              return (
                <Link
                  key={link.href}
                  ref={(el) => {
                    itemRefs.current[link.href] = el;
                  }}
                  href={link.href}
                  onMouseEnter={() => setHoverKey(link.href)}
                  onFocus={() => setHoverKey(link.href)}
                  className={cn(
                    "relative rounded-full px-4 h-9 text-sm font-medium transition-colors inline-flex items-center gap-1.5",
                    active || hoverKey === link.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className="relative z-10 inline-flex items-center gap-1.5">
                    {link.label}
                    {showBadge && (
                      <span className="grid h-4 min-w-4 px-1 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                        {savedCount}
                      </span>
                    )}
                  </span>
                  {active && (
                    <span
                      aria-hidden
                      className="absolute left-1/2 -bottom-1 h-1 w-1 -translate-x-1/2 rounded-full bg-primary z-10"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="flex items-center gap-1.5">
          {user ? (
            <UserMenu />
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => openLogin()}
              className="hidden sm:inline-flex h-9"
            >
              Sign in
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-9 w-9"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur-md animate-fade-in">
          <nav className="container py-3 flex flex-col gap-0.5" aria-label="Mobile">
            {links.map((link, i) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              const showBadge = link.href === "/saved" && savedCount > 0;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ animationDelay: `${i * 40}ms` }}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-medium transition-colors inline-flex items-center justify-between gap-2 animate-fade-in-up",
                    active
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  )}
                >
                  <span className="inline-flex items-center gap-2">
                    {link.href === "/saved" && <Heart className="h-4 w-4" />}
                    {link.label}
                  </span>
                  {showBadge && (
                    <span className="grid h-5 min-w-5 px-1.5 place-items-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                      {savedCount}
                    </span>
                  )}
                </Link>
              );
            })}
            {!user && (
              <Button
                onClick={() => openLogin()}
                variant="default"
                className="mt-3 w-full"
              >
                Sign in
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
