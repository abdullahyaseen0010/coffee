import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { setSessionCookie } from "@/lib/auth";
import { prisma } from "@/lib/db";

const registerSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => ({}));
  const parsed = registerSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Please check your details." },
      { status: 400 },
    );
  }

  const { name, email, password } = parsed.data;
  const normalizedEmail = email.toLowerCase();

  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    select: { id: true },
  });

  if (existingUser) {
    return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email: normalizedEmail,
      hashedPassword,
      role: "customer",
    },
    select: { id: true, name: true, email: true, role: true },
  });

  const response = NextResponse.json({
    ok: true,
    user,
  });

  setSessionCookie(response, {
    userId: user.id,
    email: user.email,
    role: user.role,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
  });

  return response;
}
