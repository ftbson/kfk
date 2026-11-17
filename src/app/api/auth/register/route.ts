import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import {
  clearRateLimit,
  createSession,
  hashPassword,
  isRateLimited,
  isSameOriginRequest,
  setSessionCookie,
} from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  }

  try {
    const body: unknown = await request.json();
    if (!isRecord(body)) {
      return NextResponse.json({ error: "Please check your input." }, { status: 400 });
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (
      name.length < 2 ||
      name.length > 100 ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      password.length < 8 ||
      password.length > 128
    ) {
      return NextResponse.json(
        { error: "Please provide a name, valid email address, and password with at least 8 characters." },
        { status: 400 },
      );
    }

    if (await isRateLimited("register", email, 5, 60 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Too many attempts. Please try again later." },
        { status: 429 },
      );
    }

    const now = new Date().toISOString();
    const [user] = await db
      .insert(users)
      .values({
        id: randomUUID(),
        name,
        email,
        passwordHash: await hashPassword(password),
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoNothing({ target: users.email })
      .returning({ id: users.id, name: users.name, email: users.email });

    if (!user) {
      return NextResponse.json(
        { error: "An account with this email already exists. Please sign in or use a different address." },
        { status: 409 },
      );
    }

    await clearRateLimit("register", email);
    const session = await createSession(user.id, "customer");
    const response = NextResponse.json({ user }, { status: 201 });
    setSessionCookie(response, session.token, session.expiresAt, "customer");
    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Account could not be created. Please try again later." },
      { status: 500 },
    );
  }
}