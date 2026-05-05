"use client";

import * as React from "react";
import type { UserRole } from "@/lib/types";

export type { UserRole } from "@/lib/types";

export type User = {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
};

type PendingAction = (() => void) | null;

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  loginModalOpen: boolean;
  openLogin: (afterLogin?: () => void) => void;
  closeLogin: () => void;
  login: (input: { name: string; email?: string }) => void;
  logout: () => void;
  requireAuth: (action: () => void) => void;
  updateProfile: (input: { name: string; email?: string }) => void;
  setRole: (role: UserRole) => void;
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "ugg.user";

function loadUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<User>;
    if (parsed && typeof parsed.id === "string" && typeof parsed.name === "string") {
      const role: UserRole =
        parsed.role === "partner" || parsed.role === "admin" ? parsed.role : "traveler";
      return { id: parsed.id, name: parsed.name, email: parsed.email, role };
    }
    return null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [loginModalOpen, setLoginModalOpen] = React.useState(false);
  const pendingActionRef = React.useRef<PendingAction>(null);

  React.useEffect(() => {
    setUser(loadUser());
  }, []);

  const persist = React.useCallback((next: User | null) => {
    if (typeof window === "undefined") return;
    if (next) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const openLogin = React.useCallback((afterLogin?: () => void) => {
    pendingActionRef.current = afterLogin ?? null;
    setLoginModalOpen(true);
  }, []);

  const closeLogin = React.useCallback(() => {
    pendingActionRef.current = null;
    setLoginModalOpen(false);
  }, []);

  const login = React.useCallback(
    ({ name, email }: { name: string; email?: string }) => {
      const next: User = {
        id:
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : `u_${Date.now()}`,
        name: name.trim(),
        email: email?.trim() || undefined,
        role: "traveler",
      };
      setUser(next);
      persist(next);
      setLoginModalOpen(false);
      const pending = pendingActionRef.current;
      pendingActionRef.current = null;
      if (pending) {
        // defer so modal close animation doesn't fight with downstream UI
        queueMicrotask(pending);
      }
    },
    [persist]
  );

  const logout = React.useCallback(() => {
    setUser(null);
    persist(null);
  }, [persist]);

  const updateProfile = React.useCallback(
    ({ name, email }: { name: string; email?: string }) => {
      setUser((prev) => {
        if (!prev) return prev;
        const next: User = {
          ...prev,
          name: name.trim(),
          email: email?.trim() || undefined,
        };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const setRole = React.useCallback(
    (role: UserRole) => {
      setUser((prev) => {
        if (!prev) return prev;
        const next: User = { ...prev, role };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const requireAuth = React.useCallback(
    (action: () => void) => {
      if (user) {
        action();
      } else {
        openLogin(action);
      }
    },
    [user, openLogin]
  );

  const value = React.useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      loginModalOpen,
      openLogin,
      closeLogin,
      login,
      logout,
      requireAuth,
      updateProfile,
      setRole,
    }),
    [user, loginModalOpen, openLogin, closeLogin, login, logout, requireAuth, updateProfile, setRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
