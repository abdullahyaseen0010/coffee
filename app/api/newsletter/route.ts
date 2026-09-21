import { NextResponse } from "next/server";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Please enter a valid email address." },
        { status: 400 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: "You’re on the list. Watch for the next roast drop.",
      email: parsed.data.email,
    });
  } catch {
    return NextResponse.json({ error: "Unable to subscribe right now." }, { status: 500 });
  }
}
