"use client";

import * as React from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  variant?: "hero" | "compact";
  placeholder?: string;
}

export function SearchBar({ variant = "hero", placeholder }: SearchBarProps) {
  const router = useRouter();
  const [q, setQ] = React.useState("");

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
    <form
      onSubmit={submit}
      className="w-full max-w-2xl bg-card/95 backdrop-blur-md rounded-full p-2 pl-3 shadow-lift border border-border/60 flex items-center gap-2"
    >
      <MapPin className="h-5 w-5 text-primary shrink-0 ml-2" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={
          placeholder ?? "Try ‘Papikondalu’, ‘Pulasa fish’, or ‘Konaseema’"
        }
        className="flex-1 bg-transparent outline-none text-sm md:text-base placeholder:text-muted-foreground py-2"
      />
      <Button type="submit" size="default" className="rounded-full">
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Discover</span>
      </Button>
    </form>
  );
}
