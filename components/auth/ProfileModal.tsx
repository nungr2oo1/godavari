"use client";

import * as React from "react";
import { CheckCircle2, UserCog, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { useAuth } from "@/context/auth-context";

type ProfileModalProps = {
  open: boolean;
  onClose: () => void;
};

export function ProfileModal({ open, onClose }: ProfileModalProps) {
  const { user, updateProfile } = useAuth();
  const [name, setName] = React.useState(user?.name ?? "");
  const [email, setEmail] = React.useState(user?.email ?? "");
  const [error, setError] = React.useState<string | null>(null);
  const [saved, setSaved] = React.useState(false);
  const savedTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    if (open) {
      setName(user?.name ?? "");
      setEmail(user?.email ?? "");
      setError(null);
      setSaved(false);
    }
  }, [open, user]);

  React.useEffect(() => {
    return () => {
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    };
  }, []);

  if (!user) return null;

  const dirty = name.trim() !== user.name || (email.trim() || undefined) !== user.email;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      setError("Please enter your name (at least 2 characters).");
      return;
    }
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("That email doesn't look right.");
      return;
    }
    setError(null);
    updateProfile({ name: trimmedName, email: email.trim() || undefined });
    setSaved(true);
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    savedTimerRef.current = setTimeout(() => {
      onClose();
    }, 900);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="profile-modal-title"
      describedBy="profile-modal-desc"
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary shrink-0">
            <UserCog className="h-5 w-5" />
          </span>
          <div>
            <h2 id="profile-modal-title" className="font-serif text-xl font-semibold">
              Edit profile
            </h2>
            <p id="profile-modal-desc" className="text-sm text-muted-foreground">
              Update how you appear across the guide. Stays on this device.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="text-muted-foreground hover:text-foreground rounded-full p-1.5 hover:bg-secondary transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="profile-name">Your name</Label>
          <Input
            id="profile-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-email">
            Email <span className="text-muted-foreground font-normal">(optional)</span>
          </Label>
          <Input
            id="profile-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>

        {error && (
          <p className="text-xs text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        )}

        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2 pt-1">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={!dirty || saved} className="sm:min-w-[140px]">
            {saved ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Saved
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
