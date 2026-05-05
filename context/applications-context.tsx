"use client";

import * as React from "react";
import type { ApplicationStatus, PartnerApplication } from "@/lib/types";

type AddApplicationInput = Omit<PartnerApplication, "id" | "createdAt" | "status"> & {
  status?: ApplicationStatus;
};

type ApplicationsContextValue = {
  applications: PartnerApplication[];
  addApplication: (input: AddApplicationInput) => void;
  updateStatus: (id: string, status: ApplicationStatus) => void;
};

const ApplicationsContext = React.createContext<ApplicationsContextValue | null>(null);

const STORAGE_KEY = "ugg.applications";

const SEED_APPLICATIONS: PartnerApplication[] = [
  {
    id: "app_seed_1",
    fullName: "Surya Prakash",
    phone: "+91 99898 12121",
    whatsapp: "+91 99898 12121",
    district: "East Godavari",
    serviceType: "Boat Operator",
    description:
      "Run launch boats from Rajamahendravaram to Pattiseema for 12 years. Family-run, all safety jackets, lunch on board.",
    yearsExperience: 12,
    languages: ["Telugu", "English", "Hindi"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    status: "pending",
  },
  {
    id: "app_seed_2",
    fullName: "Lakshmi Devi",
    phone: "+91 90324 55667",
    district: "Konaseema",
    serviceType: "Homestay",
    description:
      "Three-room homestay tucked between coconut groves and the backwaters. Home-cooked Konaseema meals included.",
    yearsExperience: 6,
    languages: ["Telugu", "English"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
    status: "approved",
  },
  {
    id: "app_seed_3",
    fullName: "Anand Varma",
    phone: "+91 98850 88990",
    whatsapp: "+91 98850 88990",
    district: "West Godavari",
    serviceType: "Guide",
    description:
      "Heritage walks across Bhimavaram and Eluru. Specialist in colonial-era architecture and temple history.",
    yearsExperience: 9,
    languages: ["Telugu", "English", "Sanskrit"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 60).toISOString(),
    status: "pending",
  },
  {
    id: "app_seed_4",
    fullName: "Padma Kumari",
    phone: "+91 99125 76543",
    district: "Kakinada",
    serviceType: "Food Experience",
    description:
      "Backyard pulasa and prawn meals during the monsoon season. Reservations only — six seats per sitting.",
    yearsExperience: 4,
    languages: ["Telugu"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 100).toISOString(),
    status: "rejected",
  },
];

function loadApplications(): PartnerApplication[] {
  if (typeof window === "undefined") return SEED_APPLICATIONS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED_APPLICATIONS;
    const parsed = JSON.parse(raw) as PartnerApplication[];
    if (!Array.isArray(parsed)) return SEED_APPLICATIONS;
    return parsed;
  } catch {
    return SEED_APPLICATIONS;
  }
}

function persist(applications: PartnerApplication[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
}

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `app_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function ApplicationsProvider({ children }: { children: React.ReactNode }) {
  const [applications, setApplications] = React.useState<PartnerApplication[]>([]);

  React.useEffect(() => {
    const initial = loadApplications();
    setApplications(initial);
    if (typeof window !== "undefined" && !window.localStorage.getItem(STORAGE_KEY)) {
      persist(initial);
    }
  }, []);

  const addApplication = React.useCallback((input: AddApplicationInput) => {
    setApplications((prev) => {
      const next: PartnerApplication = {
        ...input,
        id: makeId(),
        createdAt: new Date().toISOString(),
        status: input.status ?? "pending",
      };
      const updated = [next, ...prev];
      persist(updated);
      return updated;
    });
  }, []);

  const updateStatus = React.useCallback((id: string, status: ApplicationStatus) => {
    setApplications((prev) => {
      const updated = prev.map((a) => (a.id === id ? { ...a, status } : a));
      persist(updated);
      return updated;
    });
  }, []);

  const value = React.useMemo<ApplicationsContextValue>(
    () => ({ applications, addApplication, updateStatus }),
    [applications, addApplication, updateStatus]
  );

  return <ApplicationsContext.Provider value={value}>{children}</ApplicationsContext.Provider>;
}

export function useApplications() {
  const ctx = React.useContext(ApplicationsContext);
  if (!ctx) {
    throw new Error("useApplications must be used within ApplicationsProvider");
  }
  return ctx;
}
