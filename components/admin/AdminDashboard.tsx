"use client";

import * as React from "react";
import { StatsCards } from "@/components/admin/StatsCards";
import { ApplicationsList } from "@/components/admin/ApplicationsList";
import { LeadsTable } from "@/components/admin/LeadsTable";

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="space-y-2">
      <p className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground">
        <span className="h-px w-6 bg-current opacity-40" aria-hidden />
        {eyebrow}
      </p>
      <h2 className="font-serif text-2xl md:text-3xl font-medium leading-snug">{title}</h2>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}

export function AdminDashboard() {
  return (
    <div className="container py-12 md:py-16 space-y-12">
      <header className="space-y-4 max-w-2xl">
        <p className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground">
          <span className="h-px w-6 bg-current opacity-40" aria-hidden />
          Admin
        </p>
        <h1 className="font-serif text-[34px] md:text-5xl font-medium leading-[1.05] text-balance">
          Quality control dashboard
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Review partner applications, watch incoming callback leads, and keep an eye on platform
          activity.
        </p>
      </header>

      <section className="space-y-5">
        <SectionHeading eyebrow="At a glance" title="Stats" />
        <StatsCards />
      </section>

      <section className="space-y-5">
        <SectionHeading
          eyebrow="Onboarding"
          title="Partner applications"
          description="Approve to add to the directory, or reject with a note."
        />
        <ApplicationsList />
      </section>

      <section className="space-y-5">
        <SectionHeading
          eyebrow="Inbox"
          title="Callback requests"
          description="Travelers asking to be contacted by a local partner."
        />
        <LeadsTable />
      </section>
    </div>
  );
}
