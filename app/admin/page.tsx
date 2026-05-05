"use client";

import * as React from "react";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

function AccessDenied({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <div className="container py-20">
      <Card className="mx-auto max-w-lg p-8 text-center shadow-soft">
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-secondary text-foreground">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <h1 className="font-serif text-2xl md:text-3xl font-medium leading-snug">
          Access denied
        </h1>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          {isAuthenticated
            ? "Your account doesn't have admin permissions. Use the role switcher in the navbar (development mode) to preview the dashboard."
            : "Sign in with an admin account to view this dashboard. In development, you can switch roles from the navbar after signing in."}
        </p>
        <Button asChild variant="outline" className="mt-6">
          <Link href="/">Back to home</Link>
        </Button>
      </Card>
    </div>
  );
}

export default function AdminPage() {
  const { user } = useAuth();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR / first paint we don't yet know the user's role (it's loaded from
  // localStorage in an effect). Render the gate as a neutral state until mounted
  // to avoid a flash of dashboard content for non-admins.
  if (!mounted) {
    return <AccessDenied isAuthenticated={false} />;
  }

  if (user?.role !== "admin") {
    return <AccessDenied isAuthenticated={!!user} />;
  }

  return <AdminDashboard />;
}
