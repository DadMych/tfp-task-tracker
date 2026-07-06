import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { getAllTasks, getRecentActivity, getStats } from "@/lib/db";
import { BoardClient } from "@/components/BoardClient";

export default async function BoardPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const [tasks, activity, stats] = await Promise.all([
    getAllTasks(),
    getRecentActivity(30),
    getStats(),
  ]);

  return (
    <BoardClient
      initialTasks={tasks}
      initialActivity={activity}
      stats={stats}
      user={user}
    />
  );
}
