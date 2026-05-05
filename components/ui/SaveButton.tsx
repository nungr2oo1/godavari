"use client";

import * as React from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type SaveButtonProps = {
  isSaved: boolean;
  onToggle: () => void;
  size?: "sm" | "md" | "lg";
  variant?: "floating" | "inline";
  className?: string;
  label?: string;
};

const sizeMap = {
  sm: { btn: "h-8 w-8", icon: "h-4 w-4" },
  md: { btn: "h-9 w-9", icon: "h-[18px] w-[18px]" },
  lg: { btn: "h-11 w-11", icon: "h-5 w-5" },
};

export function SaveButton({
  isSaved,
  onToggle,
  size = "md",
  variant = "floating",
  className,
  label,
}: SaveButtonProps) {
  const sz = sizeMap[size];

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle();
  };

  if (variant === "inline") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={isSaved}
        aria-label={isSaved ? "Remove from saved" : "Save"}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
          isSaved
            ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400"
            : "border-input bg-background hover:bg-secondary",
          className
        )}
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-transform",
            isSaved && "fill-current scale-110"
          )}
        />
        {label ?? (isSaved ? "Saved" : "Save")}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isSaved}
      aria-label={isSaved ? "Remove from saved" : "Save"}
      className={cn(
        "grid place-items-center rounded-full bg-background/90 text-foreground shadow-soft backdrop-blur transition-all hover:scale-105 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        sz.btn,
        className
      )}
    >
      <Heart
        className={cn(
          sz.icon,
          "transition-all",
          isSaved ? "fill-red-500 text-red-500 scale-110" : "text-foreground"
        )}
      />
    </button>
  );
}
