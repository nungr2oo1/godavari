"use client";

import * as React from "react";
import { LogIn, Waves, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth-context";
import { Modal } from "@/components/ui/modal";

export function LoginModal() {
  const { loginModalOpen, closeLogin, login } = useAuth();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!loginModalOpen) {
      // reset after close
      const t = setTimeout(() => {
        setName("");
        setEmail("");
        setError(null);
      }, 200);
      return () => clearTimeout(t);
    }
  }, [loginModalOpen]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setError("Please enter your name (at least 2 characters).");
      return;
    }
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("That email doesn't look right.");
      return;
    }
    setError(null);
    login({ name: trimmed, email: email.trim() || undefined });
  };

  return (
    <Modal
      open={loginModalOpen}
      onClose={closeLogin}
      labelledBy="login-modal-title"
      describedBy="login-modal-desc"
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full gradient-river text-white shadow-soft shrink-0">
            <Waves className="h-5 w-5" />
          </span>
          <div>
            <h2 id="login-modal-title" className="font-serif text-xl font-semibold">
              Continue as a local
            </h2>
            <p id="login-modal-desc" className="text-sm text-muted-foreground">
              Just your name to save places, request callbacks and write to a local. No
              passwords.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={closeLogin}
          aria-label="Close"
          className="text-muted-foreground hover:text-foreground rounded-full p-1.5 hover:bg-secondary transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="login-name">Your name</Label>
          <Input
            id="login-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Lakshmi Devi"
            autoFocus
            autoComplete="name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="login-email">
            Email <span className="text-muted-foreground font-normal">(optional)</span>
          </Label>
          <Input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="lakshmi@example.com"
            autoComplete="email"
          />
        </div>

        {error && (
          <p className="text-xs text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full">
          <LogIn className="h-4 w-4" />
          Continue
        </Button>

        <p className="text-[11px] text-muted-foreground text-center pt-1">
          By continuing, you agree to be a friendly traveller. We don't share your details.
        </p>
      </form>
    </Modal>
  );
}
