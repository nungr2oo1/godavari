"use client";

import * as React from "react";
import type {
  EventSubmission,
  FoodSubmission,
  PlaceSubmission,
  Submission,
  SubmissionKind,
  SubmissionStatus,
} from "@/lib/types";

type SubmissionsState = {
  places: PlaceSubmission[];
  events: EventSubmission[];
  food: FoodSubmission[];
};

type AddPlaceInput = Omit<PlaceSubmission, "id" | "createdAt" | "status" | "kind">;
type AddEventInput = Omit<EventSubmission, "id" | "createdAt" | "status" | "kind">;
type AddFoodInput = Omit<FoodSubmission, "id" | "createdAt" | "status" | "kind">;

type SubmissionsContextValue = {
  submissions: SubmissionsState;
  allPending: Submission[];
  approvedPlaces: PlaceSubmission[];
  approvedEvents: EventSubmission[];
  approvedFood: FoodSubmission[];
  byPartner: (partnerId: string) => Submission[];
  addPlace: (input: AddPlaceInput) => void;
  addEvent: (input: AddEventInput) => void;
  addFood: (input: AddFoodInput) => void;
  updateStatus: (
    kind: SubmissionKind,
    id: string,
    status: SubmissionStatus,
    note?: string
  ) => void;
};

const SubmissionsContext = React.createContext<SubmissionsContextValue | null>(null);

const STORAGE_KEY = "ugg.submissions";

const SEED: SubmissionsState = {
  places: [
    {
      id: "sub_place_1",
      kind: "place",
      partnerId: "u_partner",
      partnerName: "Surya Prakash",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
      status: "pending",
      payload: {
        id: "perantapalli",
        slug: "perantapalli",
        name: "Perantapalli Ashram",
        district: "East Godavari",
        type: "river",
        shortDescription:
          "A riverside ashram tucked into the Papikondalu — silent mornings, filter coffee, and a fading mural of the Godavari aarati.",
        overview:
          "Perantapalli sits on a quiet bend of the Godavari, deep within the Papikondalu range. The ashram has welcomed travelers for nearly a century — pilgrims, painters, monks, and curious wanderers. A small temple, a tea stall, and a rope-strung pier where launch boats stop briefly on the way to Pattiseema.",
        bestTime: "November to February — the river is calm, the air is cool, and mornings are misty.",
        thingsToDo: [
          "Sit by the river before sunrise",
          "Visit the small Sita Rama temple",
          "Filter coffee at the ashram tea stall",
        ],
        foodToTry: ["Filter coffee", "Pulihora prasadam", "Coconut sweets from the next bend"],
        travelTips: ["Carry cash — no signal here", "Quiet voices please, the ashram is in use"],
        images: [
          "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1600&q=80&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1600&q=80&auto=format&fit=crop",
        ],
        contacts: [
          { name: "Surya Prakash", role: "Boat Operator", phone: "+91 99898 12121" },
        ],
      },
    },
  ],
  events: [
    {
      id: "sub_event_1",
      kind: "event",
      partnerId: "u_partner",
      partnerName: "Surya Prakash",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      status: "approved",
      reviewedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
      payload: {
        id: "papi-sunset-cruise",
        slug: "papi-sunset-cruise",
        title: "Papikondalu Sunset Cruise",
        date: "2026-06-15",
        location: "Rajamahendravaram launch dock",
        district: "East Godavari",
        description:
          "A small-group sunset cruise into the Papikondalu — flute music on the upper deck, hot snacks, and a guided commentary in Telugu and English.",
        image:
          "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=1600&q=80&auto=format&fit=crop",
        tags: ["River", "Cruise"],
      },
    },
  ],
  food: [
    {
      id: "sub_food_1",
      kind: "food",
      partnerId: "u_partner",
      partnerName: "Surya Prakash",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      status: "pending",
      payload: {
        id: "boat-thali",
        slug: "boat-thali",
        name: "Launch-boat Thali",
        category: "Traditional meals",
        location: "On board, Rajamahendravaram cruises",
        district: "East Godavari",
        description:
          "Hot rice, gongura pachadi, fish curry, and a sweet — served on banana leaf as the boat drifts through the gorge.",
        image:
          "https://images.unsplash.com/photo-1604542030959-1cb98b7d92e0?w=1600&q=80&auto=format&fit=crop",
      },
    },
  ],
};

function loadState(): SubmissionsState {
  if (typeof window === "undefined") return SEED;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED;
    const parsed = JSON.parse(raw) as Partial<SubmissionsState>;
    return {
      places: Array.isArray(parsed?.places) ? parsed.places : [],
      events: Array.isArray(parsed?.events) ? parsed.events : [],
      food: Array.isArray(parsed?.food) ? parsed.food : [],
    };
  } catch {
    return SEED;
  }
}

function persist(state: SubmissionsState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function makeId(prefix: string): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

const EMPTY_STATE: SubmissionsState = { places: [], events: [], food: [] };

export function SubmissionsProvider({ children }: { children: React.ReactNode }) {
  const [submissions, setSubmissions] = React.useState<SubmissionsState>(EMPTY_STATE);

  React.useEffect(() => {
    const initial = loadState();
    setSubmissions(initial);
    if (typeof window !== "undefined" && !window.localStorage.getItem(STORAGE_KEY)) {
      persist(initial);
    }
  }, []);

  const addPlace = React.useCallback((input: AddPlaceInput) => {
    setSubmissions((prev) => {
      const next: PlaceSubmission = {
        ...input,
        kind: "place",
        id: makeId("sub_place"),
        createdAt: new Date().toISOString(),
        status: "pending",
      };
      const updated = { ...prev, places: [next, ...prev.places] };
      persist(updated);
      return updated;
    });
  }, []);

  const addEvent = React.useCallback((input: AddEventInput) => {
    setSubmissions((prev) => {
      const next: EventSubmission = {
        ...input,
        kind: "event",
        id: makeId("sub_event"),
        createdAt: new Date().toISOString(),
        status: "pending",
      };
      const updated = { ...prev, events: [next, ...prev.events] };
      persist(updated);
      return updated;
    });
  }, []);

  const addFood = React.useCallback((input: AddFoodInput) => {
    setSubmissions((prev) => {
      const next: FoodSubmission = {
        ...input,
        kind: "food",
        id: makeId("sub_food"),
        createdAt: new Date().toISOString(),
        status: "pending",
      };
      const updated = { ...prev, food: [next, ...prev.food] };
      persist(updated);
      return updated;
    });
  }, []);

  const updateStatus = React.useCallback(
    (kind: SubmissionKind, id: string, status: SubmissionStatus, note?: string) => {
      setSubmissions((prev) => {
        const reviewedAt = new Date().toISOString();
        const map = <T extends Submission>(arr: T[]): T[] =>
          arr.map((s) =>
            s.id === id
              ? ({ ...s, status, reviewedAt, rejectionNote: note ?? s.rejectionNote } as T)
              : s
          );
        const updated: SubmissionsState =
          kind === "place"
            ? { ...prev, places: map(prev.places) }
            : kind === "event"
            ? { ...prev, events: map(prev.events) }
            : { ...prev, food: map(prev.food) };
        persist(updated);
        return updated;
      });
    },
    []
  );

  const approvedPlaces = React.useMemo(
    () => submissions.places.filter((s) => s.status === "approved"),
    [submissions.places]
  );
  const approvedEvents = React.useMemo(
    () => submissions.events.filter((s) => s.status === "approved"),
    [submissions.events]
  );
  const approvedFood = React.useMemo(
    () => submissions.food.filter((s) => s.status === "approved"),
    [submissions.food]
  );

  const allPending = React.useMemo<Submission[]>(() => {
    const merged: Submission[] = [
      ...submissions.places,
      ...submissions.events,
      ...submissions.food,
    ];
    return merged
      .filter((s) => s.status === "pending")
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [submissions]);

  const byPartner = React.useCallback(
    (partnerId: string): Submission[] => {
      const merged: Submission[] = [
        ...submissions.places,
        ...submissions.events,
        ...submissions.food,
      ];
      return merged
        .filter((s) => s.partnerId === partnerId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    },
    [submissions]
  );

  const value = React.useMemo<SubmissionsContextValue>(
    () => ({
      submissions,
      allPending,
      approvedPlaces,
      approvedEvents,
      approvedFood,
      byPartner,
      addPlace,
      addEvent,
      addFood,
      updateStatus,
    }),
    [
      submissions,
      allPending,
      approvedPlaces,
      approvedEvents,
      approvedFood,
      byPartner,
      addPlace,
      addEvent,
      addFood,
      updateStatus,
    ]
  );

  return <SubmissionsContext.Provider value={value}>{children}</SubmissionsContext.Provider>;
}

export function useSubmissions() {
  const ctx = React.useContext(SubmissionsContext);
  if (!ctx) {
    throw new Error("useSubmissions must be used within SubmissionsProvider");
  }
  return ctx;
}
