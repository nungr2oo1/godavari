"use client";

import * as React from "react";
import { AuthProvider } from "@/context/auth-context";
import { SavedProvider } from "@/context/saved-context";
import { LeadsProvider } from "@/context/leads-context";
import { ApplicationsProvider } from "@/context/applications-context";
import { SubmissionsProvider } from "@/context/submissions-context";
import { LoginModal } from "@/components/auth/LoginModal";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SavedProvider>
        <LeadsProvider>
          <ApplicationsProvider>
            <SubmissionsProvider>
              {children}
              <LoginModal />
            </SubmissionsProvider>
          </ApplicationsProvider>
        </LeadsProvider>
      </SavedProvider>
    </AuthProvider>
  );
}
