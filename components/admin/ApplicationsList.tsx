"use client";

import * as React from "react";
import { Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useApplications } from "@/context/applications-context";
import type { ApplicationStatus, PartnerApplication } from "@/lib/types";

function StatusBadge({ status }: { status: ApplicationStatus }) {
  if (status === "approved") return <Badge variant="primary">Approved</Badge>;
  if (status === "rejected") return <Badge variant="muted">Rejected</Badge>;
  return <Badge variant="accent">Pending</Badge>;
}

function ApplicationRow({
  app,
  onApprove,
  onReject,
}: {
  app: PartnerApplication;
  onApprove: () => void;
  onReject: () => void;
}) {
  const isPending = app.status === "pending";
  return (
    <Card className="p-5 shadow-soft">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-serif text-lg font-medium leading-snug">{app.fullName}</h3>
            <StatusBadge status={app.status} />
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="outline">{app.serviceType}</Badge>
            <Badge variant="muted">{app.district}</Badge>
            <Badge variant="default">
              {app.yearsExperience} {app.yearsExperience === 1 ? "year" : "years"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {app.description}
          </p>
          <p className="text-xs text-muted-foreground">
            {app.phone}
            {app.languages.length > 0 && <> · {app.languages.join(", ")}</>}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {isPending ? (
            <>
              <Button size="sm" onClick={onApprove}>
                <Check className="h-4 w-4" />
                Approve
              </Button>
              <Button size="sm" variant="outline" onClick={onReject}>
                <X className="h-4 w-4" />
                Reject
              </Button>
            </>
          ) : (
            <span className="text-xs text-muted-foreground">Decision recorded</span>
          )}
        </div>
      </div>
    </Card>
  );
}

export function ApplicationsList() {
  const { applications, updateStatus } = useApplications();

  if (applications.length === 0) {
    return (
      <Card className="p-8 text-center shadow-soft">
        <p className="text-sm text-muted-foreground">
          No partner applications yet. Submissions will appear here.
        </p>
      </Card>
    );
  }

  const pending = applications.filter((a) => a.status === "pending");
  const decided = applications.filter((a) => a.status !== "pending");
  const ordered = [...pending, ...decided];

  return (
    <div className="space-y-3">
      {ordered.map((app) => (
        <ApplicationRow
          key={app.id}
          app={app}
          onApprove={() => updateStatus(app.id, "approved")}
          onReject={() => updateStatus(app.id, "rejected")}
        />
      ))}
    </div>
  );
}
