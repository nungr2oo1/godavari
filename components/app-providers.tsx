"use client";

import * as React from "react";
import { AuthProvider } from "@/context/auth-context";
import { SavedProvider } from "@/context/saved-context";
import { LeadsProvider } from "@/context/leads-context";
import { ApplicationsProvider } from "@/context/applications-context";
import { LoginModal } from "@/components/auth/LoginModal";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SavedProvider>
        <LeadsProvider>
          <ApplicationsProvider>
            {children}
            <LoginModal />
          </ApplicationsProvider>
        </LeadsProvider>
      </SavedProvider>
    </AuthProvider>
  );
}
