"use client";

import { cn } from "@/lib/utils";
import type { Task, TaskImportance } from "@/lib/types";
import {
  CATEGORY_LABELS,
  SITE_LABELS,
} from "@/lib/types";
import { formatRelative } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

const IMPORTANCE_DOT: Record<TaskImportance, string> = {
  green: "bg-emerald-500",
  yellow: "bg-amber-400",
  red: "bg-red-500",
};

export function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left rounded-lg p-3.5",
        "bg-surface-overlay/60 border border-white/[0.04]",
        "hover:border-accent/20 hover:bg-surface-overlay",
        "transition-all duration-200 group",
        task.urgency === "urgent" && "border-red-500/20"
      )}
    >
      <div className="flex items-start gap-2 mb-2">
        <span
          className={cn(
            "mt-1.5 w-2 h-2 rounded-full shrink-0",
            IMPORTANCE_DOT[task.importance]
          )}
        />
        <h3 className="text-sm font-medium text-zinc-100 leading-snug group-hover:text-white flex-1">
          {task.title}
        </h3>
        {task.urgency === "urgent" && (
          <span className="text-[10px] text-red-400 font-medium shrink-0">
            ⚡
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-2 ml-4">
        <Tag>{SITE_LABELS[task.site]}</Tag>
        <Tag>{CATEGORY_LABELS[task.category]}</Tag>
      </div>

      {task.description && (
        <p className="text-xs text-zinc-500 line-clamp-2 mb-2 ml-4">
          {task.description}
        </p>
      )}

      <p className="text-[11px] text-zinc-600 ml-4">
        {formatRelative(task.updated_at)}
      </p>
    </button>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-400">
      {children}
    </span>
  );
}
