"use client";

import * as React from "react";
import { Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSubmissions } from "@/context/submissions-context";
import type { Submission } from "@/lib/types";

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

function summary(s: Submission): { title: string; subtitle: string; description: string } {
  if (s.kind === "place") {
    return {
      title: s.payload.name,
      subtitle: `${s.payload.type} · ${s.payload.district}`,
      description: s.payload.shortDescription,
    };
  }
  if (s.kind === "event") {
    return {
      title: s.payload.title,
      subtitle: `${s.payload.location} · ${s.payload.district}`,
      description: s.payload.description,
    };
  }
  return {
    title: s.payload.name,
    subtitle: `${s.payload.category} · ${s.payload.location}`,
    description: s.payload.description,
  };
}

function kindLabel(kind: Submission["kind"]) {
  if (kind === "place") return "Place";
  if (kind === "event") return "Event";
  return "Food";
}

export function SubmissionsReview() {
  const { allPending, updateStatus } = useSubmissions();

  if (allPending.length === 0) {
    return (
      <Card className="p-8 text-center shadow-soft">
        <p className="text-sm text-muted-foreground">
          No pending submissions. Partner-submitted places, events, and dishes will queue up here
          for review.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {allPending.map((s) => {
        const meta = summary(s);
        return (
          <Card key={s.id} className="p-5 shadow-soft">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-serif text-lg font-medium leading-snug">{meta.title}</h3>
                  <Badge variant="outline">{kindLabel(s.kind)}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {meta.subtitle} · by {s.partnerName} · {relativeTime(s.createdAt)}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {meta.description}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button size="sm" onClick={() => updateStatus(s.kind, s.id, "approved")}>
                  <Check className="h-4 w-4" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    updateStatus(s.kind, s.id, "rejected", "Doesn't meet listing standards.")
                  }
                >
                  <X className="h-4 w-4" />
                  Reject
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
