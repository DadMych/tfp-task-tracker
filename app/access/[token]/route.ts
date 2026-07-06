import { NextResponse } from "next/server";
import { resolveRoleFromToken } from "@/lib/auth";

interface Context {
  params: Promise<{ token: string }>;
}

export async function GET(request: Request, { params }: Context) {
  const { token } = await params;
  const role = resolveRoleFromToken(token);

  if (!role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const response = NextResponse.redirect(new URL("/board", request.url));
  response.cookies.set("tfp_session", role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 90,
    path: "/",
  });

  return response;
}
