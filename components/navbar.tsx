"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, Waves, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import { useAuth } from "@/context/auth-context";
import { useSaved } from "@/context/saved-context";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/places", label: "Places" },
  { href: "/events", label: "Events" },
  { href: "/plan", label: "Plan a Trip" },
  { href: "/food", label: "Food" },
  { href: "/saved", label: "Saved" },
  { href: "/contact", label: "Ask a Local" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { user, openLogin } = useAuth();
  const { count } = useSaved();
  const savedCount = count();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/60 shadow-soft"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="grid h-9 w-9 place-items-center rounded-full gradient-river text-white shadow-soft transition-transform group-hover:rotate-6">
            <Waves className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-base font-semibold tracking-tight">
              Ubhaya Godavari
            </span>
            <span className="block text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Living Guide
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((link) => {
            const active = pathname === link.href;
            const showBadge = link.href === "/saved" && savedCount > 0;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors inline-flex items-center gap-1.5",
                  active
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                )}
              >
                {link.label}
                {showBadge && (
                  <span className="grid h-4 min-w-4 px-1 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                    {savedCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <UserMenu />
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => openLogin()}
              className="hidden sm:inline-flex"
            >
              Sign in
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur-md">
          <nav className="container py-4 flex flex-col gap-1">
            {links.map((link) => {
              const active = pathname === link.href;
              const showBadge = link.href === "/saved" && savedCount > 0;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm font-medium transition-colors inline-flex items-center justify-between gap-2",
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
