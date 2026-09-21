import { NextRequest, NextResponse } from "next/server";

import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value ?? null;
  const session = verifySessionToken(token);

  if (!session) {
    return NextResponse.json({ user: null });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, role: true },
  });

  return NextResponse.json({ user });
}
