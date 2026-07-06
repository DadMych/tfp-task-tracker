import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getRecentActivity,
  getStats,
  getTask,
  updateTask,
} from "@/lib/db";
import {
  notifyTaskCreated,
  notifyTaskDeleted,
  notifyTaskUpdated,
} from "@/lib/telegram";
import type {
  TaskCategory,
  TaskImportance,
  TaskSite,
  TaskStatus,
  TaskUrgency,
} from "@/lib/types";

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [tasks, activity, stats] = await Promise.all([
    getAllTasks(),
    getRecentActivity(30),
    getStats(),
  ]);

  return NextResponse.json({ tasks, activity, stats });
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, description, category, urgency, importance, site } =
    body as {
      title?: string;
      description?: string;
      category?: TaskCategory;
      urgency?: TaskUrgency;
      importance?: TaskImportance;
      site?: TaskSite;
    };

  if (!title?.trim()) {
    return NextResponse.json({ error: "Title required" }, { status: 400 });
  }

  const { task } = await createTask(
    {
      title: title.trim(),
      description: description?.trim() ?? "",
      category: category ?? "other",
      urgency: urgency ?? "not_urgent",
      importance: importance ?? "yellow",
      site: site ?? "fofgod.com",
    },
    user.role
  );

  await notifyTaskCreated(task, user.role);

  return NextResponse.json({ task }, { status: 201 });
}

export async function PATCH(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, title, description, status, category, urgency, importance, site } =
    body as {
      id?: string;
      title?: string;
      description?: string;
      status?: TaskStatus;
      category?: TaskCategory;
      urgency?: TaskUrgency;
      importance?: TaskImportance;
      site?: TaskSite;
    };

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const result = await updateTask(
    id,
    { title, description, status, category, urgency, importance, site },
    user.role
  );

  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (result.activity) {
    await notifyTaskUpdated(result.task, result.activity, user.role);
  }

  return NextResponse.json({ task: result.task });
}

export async function DELETE(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const existing = await getTask(id);
  const result = await deleteTask(id, user.role);

  if (!result.ok) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (existing) {
    await notifyTaskDeleted(existing.title, user.role);
  }

  return NextResponse.json({ ok: true });
}
