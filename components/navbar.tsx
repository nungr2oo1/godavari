"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import { useAuth } from "@/context/auth-context";
import { useSaved } from "@/context/saved-context";
import { cn } from "@/lib/utils";

const links = [
  { href: "/places", label: "Places" },
  { href: "/events", label: "Events" },
  { href: "/plan", label: "Plan" },
  { href: "/food", label: "Food" },
  { href: "/saved", label: "Saved" },
  { href: "/contact", label: "Ask" },
];

function Wordmark() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group" aria-label="Ubhaya Godavari home">
      <span
        aria-hidden
        className="relative grid h-8 w-8 place-items-center rounded-full bg-foreground text-background transition-colors group-hover:bg-primary"
      >
        <span className="font-serif text-sm font-semibold leading-none -mt-0.5">U</span>
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

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-lg border-b border-border/60"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container flex h-[68px] items-center justify-between gap-6">
        <Wordmark />

        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(link.href + "/");
            const showBadge = link.href === "/saved" && savedCount > 0;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors inline-flex items-center gap-1.5",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {showBadge && (
                  <span className="grid h-4 min-w-4 px-1 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                    {savedCount}
                  </span>
                )}
                {active && (
                  <span
                    aria-hidden
                    className="absolute left-1/2 -bottom-0.5 h-1 w-1 -translate-x-1/2 rounded-full bg-foreground"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
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
            {links.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              const showBadge = link.href === "/saved" && savedCount > 0;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-medium transition-colors inline-flex items-center justify-between gap-2",
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
