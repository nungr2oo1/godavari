"use client";

import * as React from "react";
import { CheckCircle2, Phone, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { useAuth } from "@/context/auth-context";

type CallbackModalProps = {
  open: boolean;
  onClose: () => void;
  placeName?: string;
  contactName?: string;
};

export function CallbackModal({ open, onClose, placeName, contactName }: CallbackModalProps) {
  const { user } = useAuth();
  const [name, setName] = React.useState(user?.name ?? "");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (open) {
      setName(user?.name ?? "");
      setPhone("");
      setMessage("");
      setDone(false);
      setError(null);
    }
  }, [open, user]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError("Please enter your name.");
      return;
    }
    if (!/^[\d+\s()-]{7,}$/.test(phone.trim())) {
      setError("Please enter a valid phone number.");
      return;
    }
    setError(null);
    setPending(true);
    // simulate request
    setTimeout(() => {
      setPending(false);
      setDone(true);
    }, 700);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="callback-modal-title"
      describedBy="callback-modal-desc"
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary shrink-0">
            <Phone className="h-5 w-5" />
          </span>
          <div>
            <h2 id="callback-modal-title" className="font-serif text-xl font-semibold">
              Request a callback
            </h2>
            <p id="callback-modal-desc" className="text-sm text-muted-foreground">
              {contactName
                ? `${contactName} will call you back shortly.`
                : placeName
                ? `A local from ${placeName} will reach out.`
                : "A local partner will reach out shortly."}
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

      {done ? (
        <div className="text-center py-6 space-y-3">
          <div className="mx-auto h-12 w-12 grid place-items-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="font-serif text-lg font-semibold">Request received</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Local partner will contact you shortly.
          </p>
          <Button onClick={onClose} className="mt-2">
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cb-name">Your name</Label>
            <Input
              id="cb-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Lakshmi Devi"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cb-phone">Phone</Label>
            <Input
              id="cb-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cb-message">
              Message <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Textarea
              id="cb-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                placeName
                  ? `Looking for help around ${placeName}…`
                  : "Tell us what you need help with."
              }
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" size="lg" className="w-full" disabled={pending}>
            {pending ? (
              "Sending…"
            ) : (
              <>
                <Send className="h-4 w-4" />
                Request callback
              </>
            )}
          </Button>
        </form>
      )}
    </Modal>
  );
}
