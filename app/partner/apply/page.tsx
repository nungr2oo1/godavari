"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, Handshake, ShieldCheck, Sprout } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { PartnerForm } from "@/components/partner/PartnerForm";

function AlreadyPartner({ destination, label }: { destination: string; label: string }) {
  return (
    <div className="container py-20">
      <Card className="mx-auto max-w-lg p-8 text-center shadow-soft">
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h1 className="font-serif text-2xl md:text-3xl font-medium leading-snug">
          You&apos;re already in.
        </h1>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          You don&apos;t need to apply — head to {label} to manage your listings or review the
          platform.
        </p>
        <Button asChild className="mt-6">
          <Link href={destination}>{label}</Link>
        </Button>
      </Card>
    </div>
  );
}

export default function PartnerApplyPage() {
  const { user } = useAuth();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted && user?.role === "partner") {
    return <AlreadyPartner destination="/partner/dashboard" label="your partner dashboard" />;
  }
  if (mounted && user?.role === "admin") {
    return <AlreadyPartner destination="/admin" label="the admin dashboard" />;
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-20 items-start">
        <div className="space-y-6 lg:sticky lg:top-28">
          <p className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground">
            <span className="h-px w-6 bg-current opacity-40" aria-hidden />
            Become a Partner
          </p>
          <h1 className="font-serif text-[34px] md:text-5xl lg:text-[56px] font-medium leading-[1.05] text-balance">
            Share your corner
            <br />
            <span className="italic font-normal text-muted-foreground">of the Godavari.</span>
          </h1>
          <p className="text-muted-foreground max-w-prose text-pretty leading-relaxed">
            Local guides, boat operators, homestay hosts, and home cooks — apply to be listed on
            Ubhaya Godavari. We curate carefully, respond personally, and only list partners we&apos;d
            send our own family to.
          </p>

          <div className="space-y-4 pt-4 border-t border-border/60">
            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-foreground shrink-0 mt-0.5">
                <Handshake className="h-4 w-4" />
              </span>
              <div className="text-sm">
                <p className="font-medium">Direct connections</p>
                <p className="text-muted-foreground">
                  Travelers reach you through callbacks — no commissions, no middlemen.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-foreground shrink-0 mt-0.5">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <div className="text-sm">
                <p className="font-medium">Verified before listed</p>
                <p className="text-muted-foreground">
                  We call every applicant. Quality over quantity.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-foreground shrink-0 mt-0.5">
                <Sprout className="h-4 w-4" />
              </span>
              <div className="text-sm">
                <p className="font-medium">Slow tourism, real stories</p>
                <p className="text-muted-foreground">
                  We send travelers who want depth, not crowds.
                </p>
              </div>
            </div>
          </div>
        </div>

        <PartnerForm />
      </div>
    </div>
  );
}
