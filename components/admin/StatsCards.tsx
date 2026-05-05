"use client";

import * as React from "react";
import { Bookmark, MessageSquare, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useApplications } from "@/context/applications-context";
import { useLeads } from "@/context/leads-context";
import { useSaved } from "@/context/saved-context";

export function StatsCards() {
  const { leads } = useLeads();
  const { applications } = useApplications();
  const { count } = useSaved();

  const totalPartners = applications.filter((a) => a.status === "approved").length;
  const totalSaved = count();

  const stats = [
    { label: "Total Leads", value: leads.length, Icon: MessageSquare },
    { label: "Total Partners", value: totalPartners, Icon: Users },
    { label: "Total Saved Items", value: totalSaved, Icon: Bookmark },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map(({ label, value, Icon }) => (
        <Card key={label} className="p-6 shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground">
                {label}
              </p>
              <p className="mt-2 font-serif text-4xl font-medium leading-none">{value}</p>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-foreground">
              <Icon className="h-5 w-5" />
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
