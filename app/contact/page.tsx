"use client";

import * as React from "react";
import { CheckCircle2, LogIn, MessageCircleHeart, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/auth-context";

const districts = [
  "East Godavari",
  "West Godavari",
  "Konaseema",
  "Eluru",
  "Kakinada",
  "Not sure yet",
];

export default function ContactPage() {
  const { user, requireAuth } = useAuth();
  const [submitted, setSubmitted] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    if (user) {
      setName((prev) => prev || user.name);
      if (user.email) setEmail((prev) => prev || user.email!);
    }
  }, [user]);

  const submit = () => {
    setPending(true);
    setTimeout(() => {
      setPending(false);
      setSubmitted(true);
    }, 700);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requireAuth(submit);
  };

  return (
    <div className="container py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-20 items-start">
        <div className="space-y-6 lg:sticky lg:top-28">
          <p className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground">
            <span className="h-px w-6 bg-current opacity-40" aria-hidden />
            Ask a Local
          </p>
          <h1 className="font-serif text-[34px] md:text-5xl lg:text-[56px] font-medium leading-[1.05] text-balance">
            Have a question?
            <br />
            <span className="italic font-normal text-muted-foreground">
              Send it to the river.
            </span>
          </h1>
          <p className="text-muted-foreground max-w-prose text-pretty leading-relaxed">
            Wondering when pulasa is in season? Looking for a quiet temple stay in Konaseema? Want
            a houseboat that actually serves Konaseema food? Drop a note — we'll get back with
            something useful, not generic.
          </p>

          <div className="space-y-4 pt-4 border-t border-border/60">
            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-foreground shrink-0 mt-0.5">
                <MessageCircleHeart className="h-4 w-4" />
              </span>
              <div className="text-sm">
                <p className="font-medium">Replies in 24–48 hours</p>
                <p className="text-muted-foreground">
                  Real humans on the ground in both Godavaris.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-foreground shrink-0 mt-0.5">
                <CheckCircle2 className="h-4 w-4" />
              </span>
              <div className="text-sm">
                <p className="font-medium">No spam, no upsell</p>
                <p className="text-muted-foreground">
                  Just answers, recommendations, and occasionally a phone number.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Card className="p-6 md:p-8 shadow-soft">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="mx-auto h-12 w-12 grid place-items-center rounded-full border border-border bg-background text-foreground">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h2 className="font-serif text-2xl md:text-[28px] font-medium leading-snug">
                Got it. Thank you.
              </h2>
              <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
                Someone from the Ubhaya Godavari team will write back within a couple of days. May
                the Godavari be kind to you.
              </p>
              <Button
                variant="outline"
                onClick={() => setSubmitted(false)}
                className="mt-2"
              >
                Send another message
              </Button>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={onSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name">Your name</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Lakshmi Devi"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email or phone</Label>
                <Input
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="lakshmi@example.com or +91…"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Where are you headed?</Label>
                <Select name="location">
                  <SelectTrigger>
                    <SelectValue placeholder="Pick a district" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="question">Your question</Label>
                <Textarea
                  id="question"
                  name="question"
                  required
                  placeholder="When is pulasa season? Any quiet stay near Konaseema? Best temple for an early-morning darshan?"
                />
              </div>

              <Button type="submit" disabled={pending} className="w-full" size="lg">
                {pending ? (
                  "Sending…"
                ) : user ? (
                  <>
                    <Send className="h-4 w-4" />
                    Send to a Local
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    Sign in to send
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                {user
                  ? "We never share your details. This form is UI-only for now — real backend coming soon."
                  : "We'll ask for your name once, then send your question to a local expert."}
              </p>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
