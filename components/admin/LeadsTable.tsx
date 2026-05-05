"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLeads } from "@/context/leads-context";
import type { Lead, LeadStatus } from "@/lib/types";

function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - then);
  const minutes = Math.round(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.round(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  return new Date(iso).toLocaleDateString();
}

function StatusBadge({ status }: { status: LeadStatus }) {
  if (status === "contacted") return <Badge variant="primary">Contacted</Badge>;
  if (status === "closed") return <Badge variant="muted">Closed</Badge>;
  return <Badge variant="accent">New</Badge>;
}

function LeadRow({ lead }: { lead: Lead }) {
  return (
    <Card className="p-5 shadow-soft">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-medium leading-snug">{lead.userName}</h3>
            <StatusBadge status={lead.status} />
            <span className="text-xs text-muted-foreground">{relativeTime(lead.createdAt)}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {lead.userPhone}
            {lead.placeName && (
              <>
                {" · "}
                <span className="text-foreground">{lead.placeName}</span>
              </>
            )}
            {lead.contactName && <> · routed to {lead.contactName}</>}
          </p>
          {lead.message ? (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {lead.message}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground italic">No message provided.</p>
          )}
        </div>
      </div>
    </Card>
  );
}

export function LeadsTable() {
  const { leads } = useLeads();

  if (leads.length === 0) {
    return (
      <Card className="p-8 text-center shadow-soft">
        <p className="text-sm text-muted-foreground">
          No callback requests yet. They&apos;ll show up here as travelers reach out.
        </p>
      </Card>
    );
  }

  const sorted = [...leads].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-3">
      {sorted.map((lead) => (
        <LeadRow key={lead.id} lead={lead} />
      ))}
    </div>
  );
}
