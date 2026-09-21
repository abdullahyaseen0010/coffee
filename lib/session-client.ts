"use client";

import { useEffect, useState } from "react";

export type SessionUser = {
  id: string;
  name: string | null;
  email: string;
  role: string;
};

export function useSession() {
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadSession() {
      try {
        const response = await fetch("/api/auth/session", { cache: "no-store" });
        const payload = (await response.json()) as { user?: SessionUser | null };

        if (!isMounted) {
          return;
        }

        if (payload.user) {
          setUser(payload.user);
          setStatus("authenticated");
          return;
        }

        setUser(null);
        setStatus("unauthenticated");
      } catch {
        if (!isMounted) {
          return;
        }

        setUser(null);
        setStatus("unauthenticated");
      }
    }

    void loadSession();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    status,
    user,
    isAuthenticated: status === "authenticated",
  };
}
