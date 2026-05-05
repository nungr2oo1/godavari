"use client";

import * as React from "react";
import type { UserRole } from "@/lib/types";
import { mockLogin, mockSignToken, mockVerifyToken, type TokenPayload } from "@/lib/mock-auth";

export type { UserRole } from "@/lib/types";

export type User = {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
};

type PendingAction = (() => void) | null;

export type LoginResult = { ok: true } | { ok: false; error: string };

type AuthContextValue = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loginModalOpen: boolean;
  openLogin: (afterLogin?: () => void) => void;
  closeLogin: () => void;
  login: (input: { email: string; password: string }) => LoginResult;
  logout: () => void;
  requireAuth: (action: () => void) => void;
  updateProfile: (input: { name: string; email?: string }) => void;
  hasRole: (role: UserRole | UserRole[]) => boolean;
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

const TOKEN_KEY = "ugg.token";
const LEGACY_USER_KEY = "ugg.user";

function userFromPayload(payload: TokenPayload): User {
  return {
    id: payload.sub,
    name: payload.name,
    email: payload.email,
    role: payload.role,
  };
}

function loadFromStorage(): { token: string; user: User } | null {
  if (typeof window === "undefined") return null;
  // Clean up the pre-JWT user blob if it's still around — it's no longer read.
  try {
    window.localStorage.removeItem(LEGACY_USER_KEY);
  } catch {
    /* ignore */
  }
  try {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    const payload = mockVerifyToken(token);
    if (!payload) {
      window.localStorage.removeItem(TOKEN_KEY);
      return null;
    }
    return { token, user: userFromPayload(payload) };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const [loginModalOpen, setLoginModalOpen] = React.useState(false);
  const pendingActionRef = React.useRef<PendingAction>(null);

  React.useEffect(() => {
    const loaded = loadFromStorage();
    if (loaded) {
      setUser(loaded.user);
      setToken(loaded.token);
    }
  }, []);

  const persistToken = React.useCallback((next: string | null) => {
    if (typeof window === "undefined") return;
    if (next) {
      window.localStorage.setItem(TOKEN_KEY, next);
    } else {
      window.localStorage.removeItem(TOKEN_KEY);
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
    ({ email, password }: { email: string; password: string }): LoginResult => {
      const result = mockLogin(email, password);
      if (!result.ok) return { ok: false, error: result.error };

      setUser(userFromPayload(result.payload));
      setToken(result.token);
      persistToken(result.token);
      setLoginModalOpen(false);

      const pending = pendingActionRef.current;
      pendingActionRef.current = null;
      if (pending) {
        // defer so modal close animation doesn't fight with downstream UI
        queueMicrotask(pending);
      }
      return { ok: true };
    },
    [persistToken]
  );

  const logout = React.useCallback(() => {
    setUser(null);
    setToken(null);
    persistToken(null);
  }, [persistToken]);

  const updateProfile = React.useCallback(
    ({ name, email }: { name: string; email?: string }) => {
      setUser((prev) => {
        if (!prev) return prev;
        const next: User = {
          ...prev,
          name: name.trim(),
          email: (email?.trim() || prev.email),
        };
        // Re-issue a token so the persisted JWT reflects the updated profile.
        const reissued = mockSignToken({
          sub: next.id,
          name: next.name,
          email: next.email ?? "",
          role: next.role,
        });
        setToken(reissued);
        persistToken(reissued);
        return next;
      });
    },
    [persistToken]
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

  const hasRole = React.useCallback(
    (role: UserRole | UserRole[]) => {
      if (!user) return false;
      const roles = Array.isArray(role) ? role : [role];
      return roles.includes(user.role);
    },
    [user]
  );

  const value = React.useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: !!user,
      loginModalOpen,
      openLogin,
      closeLogin,
      login,
      logout,
      requireAuth,
      updateProfile,
      hasRole,
    }),
    [user, token, loginModalOpen, openLogin, closeLogin, login, logout, requireAuth, updateProfile, hasRole]
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
