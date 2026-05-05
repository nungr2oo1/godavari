"use client";

import * as React from "react";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  variant?: "hero" | "compact";
  placeholder?: string;
}

const ROTATING_HINTS = [
  "Try Papikondalu, pulasa, or Konaseema",
  "Try Antarvedi, pootharekulu, or Maredumilli",
  "Try Rajamahendravaram, bamboo chicken, or Karthika",
  "Try Dindi, Tatipaka, or Dwaraka Tirumala",
];

export function SearchBar({ variant = "hero", placeholder }: SearchBarProps) {
  const router = useRouter();
  const [q, setQ] = React.useState("");
  const [hintIndex, setHintIndex] = React.useState(0);

  // Rotate placeholder hints every ~3.5s when input is empty (and no explicit placeholder).
  React.useEffect(() => {
    if (placeholder || q || variant !== "hero") return;
    const id = setInterval(() => {
      setHintIndex((i) => (i + 1) % ROTATING_HINTS.length);
    }, 3500);
    return () => clearInterval(id);
  }, [placeholder, q, variant]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/places?q=${encodeURIComponent(term)}` : "/places");
  };

  if (variant === "compact") {
    return (
      <form onSubmit={submit} className="relative w-full max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder ?? "Search places, food, festivals…"}
          className="pl-10 pr-4"
        />
      </form>
    );
  }

  return (
    <div className="relative w-full max-w-xl aurora-bg">
      <form
        onSubmit={submit}
        className="relative w-full bg-background/90 backdrop-blur-xl rounded-full p-1.5 pl-5 border border-border/70 flex items-center gap-2 shadow-lift transition-all duration-300 focus-within:shadow-glow focus-within:border-primary/40 focus-within:bg-background/95 group"
      >
        <Search className="h-4 w-4 text-muted-foreground shrink-0 transition-colors group-focus-within:text-primary" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder ?? ROTATING_HINTS[hintIndex]}
          className="flex-1 bg-transparent outline-none text-sm md:text-[15px] placeholder:text-muted-foreground placeholder:transition-opacity py-2 min-w-0"
        />
        <Button
          type="submit"
          size="sm"
          className="rounded-full px-5 h-9 group/btn relative overflow-hidden"
        >
          <Sparkles className="h-3.5 w-3.5 transition-transform duration-500 group-hover/btn:rotate-12 group-hover/btn:scale-110" />
          <span>Discover</span>
        </Button>
      </form>
    </div>
  );
}
