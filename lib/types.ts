export type Role = "owner" | "boss";

export type TaskStatus = "backlog" | "in_progress" | "review" | "done";

export type TaskCategory =
  | "bug"
  | "feature"
  | "content"
  | "design"
  | "deploy"
  | "other";

export type TaskUrgency = "urgent" | "not_urgent";

export type TaskImportance = "green" | "yellow" | "red";

export type TaskSite =
  | "store.realreality.com"
  | "fofgod.com"
  | "sacraments.fofgod.com"
  | "spiritualblueprint.com";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  category: TaskCategory;
  urgency: TaskUrgency;
  importance: TaskImportance;
  site: TaskSite;
  created_at: string;
  updated_at: string;
}

export interface Activity {
  id: string;
  task_id: string;
  task_title: string;
  action: string;
  details: string;
  actor: Role;
  created_at: string;
}

export interface SessionUser {
  role: Role;
  name: string;
}

export const STATUS_LABELS: Record<TaskStatus, string> = {
  backlog: "Бэклог",
  in_progress: "В работе",
  review: "На проверке",
  done: "Готово",
};

export const STATUS_ORDER: TaskStatus[] = [
  "backlog",
  "in_progress",
  "review",
  "done",
];

export const CATEGORY_LABELS: Record<TaskCategory, string> = {
  bug: "Баг",
  feature: "Фича",
  content: "Контент",
  design: "Дизайн",
  deploy: "Деплой",
  other: "Другое",
};

export const URGENCY_LABELS: Record<TaskUrgency, string> = {
  urgent: "Срочно",
  not_urgent: "Не срочно",
};

export const IMPORTANCE_LABELS: Record<TaskImportance, string> = {
  green: "Низкая",
  yellow: "Средняя",
  red: "Высокая",
};

export const SITE_LABELS: Record<TaskSite, string> = {
  "store.realreality.com": "Real Reality Store",
  "fofgod.com": "FoFGod",
  "sacraments.fofgod.com": "Sacraments",
  "spiritualblueprint.com": "Spiritual Blueprint",
};

export const ROLE_LABELS: Record<Role, string> = {
  owner: "Исполнитель",
  boss: "Руководитель",
};

export const TASK_SITES: TaskSite[] = [
  "store.realreality.com",
  "fofgod.com",
  "sacraments.fofgod.com",
  "spiritualblueprint.com",
];

export const TASK_CATEGORIES: TaskCategory[] = [
  "bug",
  "feature",
  "content",
  "design",
  "deploy",
  "other",
];
