"use client";

import * as React from "react";
import { Search } from "lucide-react";
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
      className="w-full max-w-xl bg-background/95 backdrop-blur-md rounded-full p-1.5 pl-5 border border-border/70 flex items-center gap-2 shadow-soft transition-shadow focus-within:shadow-lift focus-within:border-foreground/20"
    >
      <Search className="h-4 w-4 text-muted-foreground shrink-0" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={
          placeholder ?? "Try Papikondalu, pulasa, or Konaseema"
        }
        className="flex-1 bg-transparent outline-none text-sm md:text-[15px] placeholder:text-muted-foreground py-2 min-w-0"
      />
      <Button type="submit" size="sm" className="rounded-full px-5 h-9">
        Discover
      </Button>
    </form>
  );
}
