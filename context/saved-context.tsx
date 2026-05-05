"use client";

import * as React from "react";
import { useAuth } from "@/context/auth-context";

export type SavedKind = "places" | "itineraries" | "food";

export type SavedState = {
  places: string[];
  itineraries: string[];
  food: string[];
};

type Toast = { id: number; message: string };

type SavedContextValue = {
  saved: SavedState;
  isSaved: (kind: SavedKind, id: string) => boolean;
  toggleSave: (kind: SavedKind, id: string) => void;
  count: (kind?: SavedKind) => number;
  toasts: Toast[];
};

const SavedContext = React.createContext<SavedContextValue | null>(null);

const STORAGE_KEY = "ugg.saved";
const EMPTY: SavedState = { places: [], itineraries: [], food: [] };

function loadSaved(): SavedState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<SavedState>;
    return {
      places: Array.isArray(parsed?.places) ? parsed.places : [],
      itineraries: Array.isArray(parsed?.itineraries) ? parsed.itineraries : [],
      food: Array.isArray(parsed?.food) ? parsed.food : [],
    };
  } catch {
    return EMPTY;
  }
}

export function SavedProvider({ children }: { children: React.ReactNode }) {
  const { user, requireAuth } = useAuth();
  const [saved, setSaved] = React.useState<SavedState>(EMPTY);
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const toastIdRef = React.useRef(0);

  React.useEffect(() => {
    setSaved(loadSaved());
  }, []);

  const persist = React.useCallback((next: SavedState) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const pushToast = React.useCallback((message: string) => {
    const id = ++toastIdRef.current;
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 1800);
  }, []);

  const isSaved = React.useCallback(
    (kind: SavedKind, id: string) => saved[kind].includes(id),
    [saved]
  );

  const doToggle = React.useCallback(
    (kind: SavedKind, id: string) => {
      setSaved((prev) => {
        const list = prev[kind];
        const exists = list.includes(id);
        const nextList = exists ? list.filter((x) => x !== id) : [...list, id];
        const next = { ...prev, [kind]: nextList };
        persist(next);
        pushToast(exists ? "Removed" : "Saved");
        return next;
      });
    },
    [persist, pushToast]
  );

  const toggleSave = React.useCallback(
    (kind: SavedKind, id: string) => {
      if (user) {
        doToggle(kind, id);
      } else {
        requireAuth(() => doToggle(kind, id));
      }
    },
    [user, requireAuth, doToggle]
  );

  const count = React.useCallback(
    (kind?: SavedKind) => {
      if (!kind) return saved.places.length + saved.itineraries.length + saved.food.length;
      return saved[kind].length;
    },
    [saved]
  );

  const value = React.useMemo<SavedContextValue>(
    () => ({ saved, isSaved, toggleSave, count, toasts }),
    [saved, isSaved, toggleSave, count, toasts]
  );

  return (
    <SavedContext.Provider value={value}>
      {children}
      <SavedToasts toasts={toasts} />
    </SavedContext.Provider>
  );
}

function SavedToasts({ toasts }: { toasts: Toast[] }) {
  if (toasts.length === 0) return null;
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 flex flex-col items-center gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto rounded-full bg-foreground/90 px-4 py-2 text-xs font-medium text-background shadow-lift backdrop-blur"
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}

export function useSaved() {
  const ctx = React.useContext(SavedContext);
  if (!ctx) {
    throw new Error("useSaved must be used within SavedProvider");
  }
  return ctx;
}
