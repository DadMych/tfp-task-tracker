import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getRecentActivity } from "@/lib/db";

export async function GET(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const since = searchParams.get("since");

  const activity = since
    ? (await getRecentActivity(100)).filter((a) => a.created_at > since)
    : await getRecentActivity(30);

  return NextResponse.json({ activity });
}
