"use client";

import * as React from "react";
import Link from "next/link";
import {
  Bookmark,
  Heart,
  LogIn,
  LogOut,
  User as UserIcon,
  UserCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProfileModal } from "@/components/auth/ProfileModal";
import { useAuth } from "@/context/auth-context";
import { useSaved } from "@/context/saved-context";
import { cn } from "@/lib/utils";

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "").toUpperCase() + (parts[1]?.[0] ?? "").toUpperCase();
}

export function UserMenu({ className }: { className?: string }) {
  const { user, openLogin, logout } = useAuth();
  const { count } = useSaved();
  const total = count();
  const [profileOpen, setProfileOpen] = React.useState(false);

  if (!user) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => openLogin()}
        className={cn("gap-1.5", className)}
      >
        <LogIn className="h-4 w-4" />
        <span className="hidden sm:inline">Sign in</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Account menu"
          className={cn(
            "relative grid h-9 w-9 place-items-center rounded-full bg-secondary text-foreground text-xs font-semibold ring-1 ring-border hover:bg-secondary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            className
          )}
        >
          {initials(user.name) || <UserIcon className="h-4 w-4" />}
          {total > 0 && (
            <span className="absolute -top-1 -right-1 grid h-4 min-w-4 px-1 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
              {total}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <p className="text-sm font-medium leading-none">{user.name}</p>
          {user.email && (
            <p className="text-xs text-muted-foreground leading-none mt-1 truncate">
              {user.email}
            </p>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => {
            // Defer so the dropdown can close + restore focus before modal mounts.
            setTimeout(() => setProfileOpen(true), 0);
          }}
          className="cursor-pointer"
        >
          <UserCog className="h-4 w-4 mr-2" />
          <span>Edit profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/saved" className="cursor-pointer">
            <Heart className="h-4 w-4 mr-2" />
            <span>Saved</span>
            {total > 0 && (
              <span className="ml-auto text-xs text-muted-foreground">{total}</span>
            )}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/plan" className="cursor-pointer">
            <Bookmark className="h-4 w-4 mr-2" />
            <span>Plan a trip</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={logout} className="cursor-pointer">
          <LogOut className="h-4 w-4 mr-2" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
    </DropdownMenu>
  );
}
