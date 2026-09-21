import crypto from "node:crypto";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export const SESSION_COOKIE = "brewcraft_session";
export const CART_COOKIE = "brewcraft_cart_key";

export type SessionPayload = {
  userId: string;
  email?: string;
  role?: string;
  exp: number;
};

const SESSION_SECRET = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "brewcraft-dev-secret";

function base64UrlEncode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signToken(value: string) {
  return crypto.createHmac("sha256", SESSION_SECRET).update(value).digest("base64url");
}

export function signSessionToken(payload: SessionPayload) {
  const body = base64UrlEncode(JSON.stringify(payload));
  return `${body}.${signToken(body)}`;
}

export function verifySessionToken(token: string | null): SessionPayload | null {
  if (!token) return null;

  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expected = signToken(body);
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(body)) as SessionPayload;
    if (payload.userId && payload.exp > Date.now()) {
      return payload;
    }
  } catch {
    return null;
  }

  return null;
}

export function setSessionCookie(response: NextResponse, payload: SessionPayload) {
  response.cookies.set({
    name: SESSION_COOKIE,
    value: signSessionToken(payload),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: SESSION_COOKIE,
    value: "",
    expires: new Date(0),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export function setCartCookie(response: NextResponse, cartKey: string) {
  response.cookies.set({
    name: CART_COOKIE,
    value: signSessionToken({ userId: cartKey, exp: Date.now() + 1000 * 60 * 60 * 24 * 30 }),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export function getCartCookieValue(request: NextRequest) {
  const token = request.cookies.get(CART_COOKIE)?.value ?? null;
  if (!token) return null;

  const result = verifySessionToken(token);
  return result?.userId ?? null;
}

export async function getAuthenticatedUser(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value ?? null;
  const session = verifySessionToken(token);

  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, email: true, name: true, role: true },
  });

  return user ? { ...user, session } : null;
}

export function isAdminRole(role?: string | null) {
  return role === "admin";
}
