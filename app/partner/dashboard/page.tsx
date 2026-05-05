"use client";

import * as React from "react";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/auth-context";
import { useSubmissions } from "@/context/submissions-context";
import { PlaceSubmissionForm } from "@/components/partner/PlaceSubmissionForm";
import { EventSubmissionForm } from "@/components/partner/EventSubmissionForm";
import { FoodSubmissionForm } from "@/components/partner/FoodSubmissionForm";
import { MySubmissions } from "@/components/partner/MySubmissions";

function AccessDenied({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <div className="container py-20">
      <Card className="mx-auto max-w-lg p-8 text-center shadow-soft">
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-secondary text-foreground">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <h1 className="font-serif text-2xl md:text-3xl font-medium leading-snug">
          Partner access only
        </h1>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          {isAuthenticated
            ? "This area is for approved partners. If you'd like to list your service, apply to become a partner."
            : "Sign in with a partner account to access the dashboard."}
        </p>
        <div className="mt-6 flex items-center justify-center gap-2">
          <Button asChild variant="outline">
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild>
            <Link href="/partner/apply">Apply to become a partner</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}

function PartnerDashboard() {
  const { user } = useAuth();
  const { byPartner } = useSubmissions();
  if (!user) return null;
  const mine = byPartner(user.id);
  const counts = {
    total: mine.length,
    pending: mine.filter((s) => s.status === "pending").length,
    approved: mine.filter((s) => s.status === "approved").length,
    rejected: mine.filter((s) => s.status === "rejected").length,
  };

  return (
    <div className="container py-12 md:py-16 space-y-12">
      <header className="space-y-4 max-w-2xl">
        <p className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground">
          <span className="h-px w-6 bg-current opacity-40" aria-hidden />
          Partner dashboard
        </p>
        <h1 className="font-serif text-[34px] md:text-5xl font-medium leading-[1.05] text-balance">
          Welcome back, {user.name.split(" ")[0]}.
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Add the places, events, and food experiences you&apos;d send a friend to. Submissions are
          reviewed by admin before they appear publicly.
        </p>
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <Badge variant="outline">Total: {counts.total}</Badge>
          <Badge variant="accent">Pending: {counts.pending}</Badge>
          <Badge variant="primary">Approved: {counts.approved}</Badge>
          {counts.rejected > 0 && <Badge variant="muted">Rejected: {counts.rejected}</Badge>}
        </div>
      </header>

      <Tabs defaultValue="place" className="space-y-6">
        <TabsList className="h-auto flex-wrap gap-1 bg-transparent p-0">
          <TabsTrigger
            value="place"
            className="rounded-full data-[state=active]:bg-foreground data-[state=active]:text-background"
          >
            Add a Place
          </TabsTrigger>
          <TabsTrigger
            value="event"
            className="rounded-full data-[state=active]:bg-foreground data-[state=active]:text-background"
          >
            Add an Event
          </TabsTrigger>
          <TabsTrigger
            value="food"
            className="rounded-full data-[state=active]:bg-foreground data-[state=active]:text-background"
          >
            Add a Dish
          </TabsTrigger>
          <TabsTrigger
            value="mine"
            className="rounded-full data-[state=active]:bg-foreground data-[state=active]:text-background"
          >
            My Submissions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="place">
          <PlaceSubmissionForm />
        </TabsContent>
        <TabsContent value="event">
          <EventSubmissionForm />
        </TabsContent>
        <TabsContent value="food">
          <FoodSubmissionForm />
        </TabsContent>
        <TabsContent value="mine">
          <MySubmissions />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function PartnerDashboardPage() {
  const { user } = useAuth();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <AccessDenied isAuthenticated={false} />;
  }

  if (!user) return <AccessDenied isAuthenticated={false} />;
  if (user.role !== "partner" && user.role !== "admin") {
    return <AccessDenied isAuthenticated={true} />;
  }

  return <PartnerDashboard />;
}
