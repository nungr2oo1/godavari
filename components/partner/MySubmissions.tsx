"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/auth-context";
import { useSubmissions } from "@/context/submissions-context";
import type { Submission, SubmissionStatus } from "@/lib/types";

function StatusBadge({ status }: { status: SubmissionStatus }) {
  if (status === "approved") return <Badge variant="primary">Approved</Badge>;
  if (status === "rejected") return <Badge variant="muted">Rejected</Badge>;
  return <Badge variant="accent">Pending</Badge>;
}

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

function submissionTitle(s: Submission): string {
  if (s.kind === "place") return s.payload.name;
  if (s.kind === "event") return s.payload.title;
  return s.payload.name;
}

function submissionDistrict(s: Submission): string {
  return s.payload.district;
}

function submissionTypeLabel(s: Submission): string {
  if (s.kind === "place") return "Place";
  if (s.kind === "event") return "Event";
  return "Food";
}

export function MySubmissions() {
  const { user } = useAuth();
  const { byPartner } = useSubmissions();

  if (!user) return null;
  const mine = byPartner(user.id);

  if (mine.length === 0) {
    return (
      <Card className="p-8 text-center shadow-soft">
        <p className="text-sm text-muted-foreground">
          You haven&apos;t submitted anything yet. Use the tabs above to add a place, event, or
          dish.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {mine.map((s) => (
        <Card key={s.id} className="p-5 shadow-soft">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-medium leading-snug">{submissionTitle(s)}</h3>
                <StatusBadge status={s.status} />
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge variant="outline">{submissionTypeLabel(s)}</Badge>
                <Badge variant="muted">{submissionDistrict(s)}</Badge>
                <span className="text-xs text-muted-foreground">{relativeTime(s.createdAt)}</span>
              </div>
              {s.status === "rejected" && s.rejectionNote && (
                <p className="text-xs text-red-400 leading-relaxed">
                  Reason: {s.rejectionNote}
                </p>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
