"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/auth-context";
import type { UserRole } from "@/lib/types";
import { cn } from "@/lib/utils";

const ROLES: { value: UserRole; label: string }[] = [
  { value: "traveler", label: "Traveler" },
  { value: "partner", label: "Partner" },
  { value: "admin", label: "Admin" },
];

type RoleSwitcherProps = {
  className?: string;
  fullWidth?: boolean;
};

export function RoleSwitcher({ className, fullWidth }: RoleSwitcherProps) {
  const { user, setRole } = useAuth();

  if (process.env.NODE_ENV !== "development") return null;

  const disabled = !user;

  return (
    <div
      className={cn("items-center gap-2", fullWidth ? "flex w-full" : "flex", className)}
      title={disabled ? "Sign in to switch roles" : "Dev role switcher"}
    >
      <span className="text-[10px] uppercase tracking-eyebrow text-muted-foreground shrink-0">
        Role
      </span>
      <Select
        value={user?.role ?? "traveler"}
        onValueChange={(v) => setRole(v as UserRole)}
        disabled={disabled}
      >
        <SelectTrigger
          className={cn(
            "h-9 px-3 text-xs",
            fullWidth ? "w-full" : "w-[120px]"
          )}
        >
          <SelectValue placeholder="Traveler" />
        </SelectTrigger>
        <SelectContent>
          {ROLES.map((r) => (
            <SelectItem key={r.value} value={r.value}>
              {r.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
