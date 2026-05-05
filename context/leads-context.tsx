"use client";

import * as React from "react";
import type { Lead, LeadStatus } from "@/lib/types";

type AddLeadInput = Omit<Lead, "id" | "createdAt" | "status"> & {
  status?: LeadStatus;
};

type LeadsContextValue = {
  leads: Lead[];
  addLead: (input: AddLeadInput) => void;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
};

const LeadsContext = React.createContext<LeadsContextValue | null>(null);

const STORAGE_KEY = "ugg.leads";

const SEED_LEADS: Lead[] = [
  {
    id: "lead_seed_1",
    userName: "Ravi Teja",
    userPhone: "+91 98480 11111",
    placeId: "papikondalu",
    placeName: "Papikondalu",
    contactName: "Boatman Surya",
    message: "Looking for a 1-day launch trip for 4 adults this Saturday.",
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    status: "new",
  },
  {
    id: "lead_seed_2",
    userName: "Anita Reddy",
    userPhone: "+91 99634 22222",
    placeId: "konaseema-backwaters",
    placeName: "Konaseema Backwaters",
    message: "Want a quiet homestay for two nights with traditional meals included.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    status: "contacted",
  },
  {
    id: "lead_seed_3",
    userName: "Karthik N.",
    userPhone: "+91 98661 33333",
    placeId: "maredumilli",
    placeName: "Maredumilli",
    message: "Are forest treks open in late November? Need a local guide.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    status: "new",
  },
  {
    id: "lead_seed_4",
    userName: "Priya S.",
    userPhone: "+91 90100 44444",
    placeId: "rajamahendravaram",
    placeName: "Rajamahendravaram",
    contactName: "Guide Lakshmi",
    message: "City heritage walk for a family of 5, including kids.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
    status: "closed",
  },
];

function loadLeads(): Lead[] {
  if (typeof window === "undefined") return SEED_LEADS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED_LEADS;
    const parsed = JSON.parse(raw) as Lead[];
    if (!Array.isArray(parsed)) return SEED_LEADS;
    return parsed;
  } catch {
    return SEED_LEADS;
  }
}

function persist(leads: Lead[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function LeadsProvider({ children }: { children: React.ReactNode }) {
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    const initial = loadLeads();
    setLeads(initial);
    if (typeof window !== "undefined" && !window.localStorage.getItem(STORAGE_KEY)) {
      persist(initial);
    }
    setHydrated(true);
  }, []);

  const addLead = React.useCallback((input: AddLeadInput) => {
    setLeads((prev) => {
      const next: Lead = {
        ...input,
        id: makeId(),
        createdAt: new Date().toISOString(),
        status: input.status ?? "new",
      };
      const updated = [next, ...prev];
      persist(updated);
      return updated;
    });
  }, []);

  const updateLeadStatus = React.useCallback((id: string, status: LeadStatus) => {
    setLeads((prev) => {
      const updated = prev.map((l) => (l.id === id ? { ...l, status } : l));
      persist(updated);
      return updated;
    });
  }, []);

  const value = React.useMemo<LeadsContextValue>(
    () => ({ leads, addLead, updateLeadStatus }),
    [leads, addLead, updateLeadStatus]
  );

  // Avoid hydration mismatch on SSR — render children immediately, but
  // consumers will see seed/persisted leads after the effect runs.
  void hydrated;

  return <LeadsContext.Provider value={value}>{children}</LeadsContext.Provider>;
}

export function useLeads() {
  const ctx = React.useContext(LeadsContext);
  if (!ctx) {
    throw new Error("useLeads must be used within LeadsProvider");
  }
  return ctx;
}
