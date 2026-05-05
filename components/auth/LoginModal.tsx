"use client";

import * as React from "react";
import { LogIn, Waves, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/auth-context";
import { Modal } from "@/components/ui/modal";
import { DEMO_ACCOUNTS } from "@/lib/mock-auth";

const ROLE_LABEL: Record<string, string> = {
  traveler: "Traveler",
  partner: "Partner",
  admin: "Admin",
};

export function LoginModal() {
  const { loginModalOpen, closeLogin, login } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [pending, setPending] = React.useState(false);

  React.useEffect(() => {
    if (!loginModalOpen) {
      const t = setTimeout(() => {
        setEmail("");
        setPassword("");
        setError(null);
        setPending(false);
      }, 200);
      return () => clearTimeout(t);
    }
  }, [loginModalOpen]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }
    setError(null);
    setPending(true);

    // simulate network
    setTimeout(() => {
      const result = login({ email: email.trim(), password });
      if (!result.ok) {
        setError(result.error);
        setPending(false);
        return;
      }
      // success — auth context closes the modal itself
      setPending(false);
    }, 350);
  };

  const fillDemo = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError(null);
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
              Sign in
            </h2>
            <p id="login-modal-desc" className="text-sm text-muted-foreground">
              Sign in to save places, request callbacks, list a service, or manage the platform.
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
          <Label htmlFor="login-email">Email</Label>
          <Input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoFocus
            autoComplete="email"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="login-password">Password</Label>
          <Input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••"
            autoComplete="current-password"
            required
          />
        </div>

        {error && (
          <p className="text-xs text-red-400" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={pending}>
          {pending ? (
            "Signing in…"
          ) : (
            <>
              <LogIn className="h-4 w-4" />
              Sign in
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 pt-5 border-t border-border/60 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] uppercase tracking-eyebrow text-muted-foreground">
            Try a demo account
          </p>
          <p className="text-[11px] text-muted-foreground">password: demo</p>
        </div>
        <div className="space-y-1.5">
          {DEMO_ACCOUNTS.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => fillDemo(a.email, a.password)}
              className="w-full flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-background hover:bg-secondary/50 transition-colors px-3.5 py-2.5 text-left"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{a.name}</p>
                <p className="text-xs text-muted-foreground truncate">{a.email}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant={a.role === "admin" ? "primary" : a.role === "partner" ? "accent" : "muted"}>
                  {ROLE_LABEL[a.role]}
                </Badge>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground text-center pt-1">
          Click any account to fill credentials, then press Sign in.
        </p>
      </div>
    </Modal>
  );
}
