import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { setSessionCookie } from "@/lib/auth";
import { prisma } from "@/lib/db";

const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => ({}));
  const parsed = loginSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid sign-in details." },
      { status: 400 },
    );
  }

  const { email, password } = parsed.data;
  const normalizedEmail = email.toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    select: { id: true, name: true, email: true, role: true, hashedPassword: true },
  });

  if (!user || !user.hashedPassword || !(await bcrypt.compare(password, user.hashedPassword))) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const response = NextResponse.json({
    ok: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });

  setSessionCookie(response, {
    userId: user.id,
    email: user.email,
    role: user.role,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
  });

  return response;
}
