import type { UserRole } from "@/lib/types";

export type DemoAccount = {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
};

// Hardcoded demo accounts. In a real backend these would live in the users
// table; here they're the mock backend. Password is "demo" for all three so
// the demo creds panel in the login modal is easy to remember.
export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: "u_traveler",
    email: "traveler@demo.com",
    password: "demo",
    name: "Lakshmi Devi",
    role: "traveler",
  },
  {
    id: "u_partner",
    email: "partner@demo.com",
    password: "demo",
    name: "Surya Prakash",
    role: "partner",
  },
  {
    id: "u_admin",
    email: "admin@demo.com",
    password: "demo",
    name: "Anita Reddy",
    role: "admin",
  },
];

export type TokenPayload = {
  sub: string; // user id
  name: string;
  email: string;
  role: UserRole;
  iat: number; // issued-at, seconds
  exp: number; // expiry, seconds
};

const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days
const MOCK_SIGNATURE = "mock-signature-not-secure";

function utf8ToBase64Url(s: string): string {
  // btoa requires latin1; UTF-8-safe pre-encoding handles non-ASCII names safely.
  const b64 = typeof window === "undefined"
    ? Buffer.from(s, "utf-8").toString("base64")
    : btoa(unescape(encodeURIComponent(s)));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToUtf8(s: string): string {
  const padded = s.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (s.length % 4)) % 4);
  if (typeof window === "undefined") {
    return Buffer.from(padded, "base64").toString("utf-8");
  }
  return decodeURIComponent(escape(atob(padded)));
}

export function mockSignToken(input: Omit<TokenPayload, "iat" | "exp">): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: TokenPayload = {
    ...input,
    iat: now,
    exp: now + TOKEN_TTL_SECONDS,
  };
  const header = { alg: "HS256", typ: "JWT" };
  const headerPart = utf8ToBase64Url(JSON.stringify(header));
  const payloadPart = utf8ToBase64Url(JSON.stringify(payload));
  return `${headerPart}.${payloadPart}.${MOCK_SIGNATURE}`;
}

export function mockVerifyToken(token: string): TokenPayload | null {
  if (typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  if (parts[2] !== MOCK_SIGNATURE) return null;
  try {
    const payload = JSON.parse(base64UrlToUtf8(parts[1])) as TokenPayload;
    if (
      typeof payload.sub !== "string" ||
      typeof payload.name !== "string" ||
      typeof payload.email !== "string" ||
      (payload.role !== "traveler" &&
        payload.role !== "partner" &&
        payload.role !== "admin") ||
      typeof payload.exp !== "number"
    ) {
      return null;
    }
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp <= now) return null;
    return payload;
  } catch {
    return null;
  }
}

export type MockLoginResult =
  | { ok: true; token: string; payload: TokenPayload }
  | { ok: false; error: string };

export function mockLogin(email: string, password: string): MockLoginResult {
  const normalized = email.trim().toLowerCase();
  const account = DEMO_ACCOUNTS.find((a) => a.email.toLowerCase() === normalized);
  if (!account) {
    return { ok: false, error: "No account found with that email." };
  }
  if (account.password !== password) {
    return { ok: false, error: "Incorrect password." };
  }
  const token = mockSignToken({
    sub: account.id,
    name: account.name,
    email: account.email,
    role: account.role,
  });
  const payload = mockVerifyToken(token);
  if (!payload) {
    return { ok: false, error: "Token issuance failed." };
  }
  return { ok: true, token, payload };
}
