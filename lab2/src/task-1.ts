export {};

type Status = "todo" | "in_progress" | "done" | "cancelled";

type Priority = "low" | "medium" | "high" | "critical";

interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee: string | null;
  createdAt: Date;
  dueDate: Date | null;
}

interface HasId {
  id: number;
}

interface Project extends HasId {
  name: string;
  description: string;
  tasks: Task[];
  ownerId: number;
}

function getTaskStats(tasks: Task[]) {
  const stats: Record<Status, number> = {
    todo: 0,
    in_progress: 0,
    done: 0,
    cancelled: 0
  };

  let overdue = 0;
  const now = new Date();

  for (const task of tasks) {
    stats[task.status]++;

    if (
      task.dueDate &&
      task.dueDate < now &&
      task.status !== "done" &&
      task.status !== "cancelled"
    ) {
      overdue++;
    }
  }

  return {
    total: tasks.length,
    byStatus: stats,
    overdue
  };
}

function formatTask(task: Task): string {
  return `[#${task.id}] ${task.title} (${task.priority}, ${task.status})`;
}

const tasks: Task[] = [
  {
    id: 1,
    title: "Налаштувати CI/CD",
    description: "GitHub Actions pipeline",
    status: "in_progress",
    priority: "high",
    assignee: "Alex",
    createdAt: new Date(),
    dueDate: new Date("2026-04-10")
  },
  {
    id: 2,
    title: "Зробити API",
    description: "REST endpoints",
    status: "todo",
    priority: "critical",
    assignee: "Anna",
    createdAt: new Date(),
    dueDate: new Date("2026-04-20")
  },
  {
    id: 3,
    title: "Виправити баг",
    description: "Помилка логина",
    status: "done",
    priority: "medium",
    assignee: "Ivan",
    createdAt: new Date(),
    dueDate: new Date("2026-04-12")
  },
  {
    id: 4,
    title: "Оновити README",
    description: "Документація",
    status: "cancelled",
    priority: "low",
    assignee: null,
    createdAt: new Date(),
    dueDate: null
  },
  {
    id: 5,
    title: "Тест",
    description: "Unit tests",
    status: "todo",
    priority: "high",
    assignee: "Maria",
    createdAt: new Date(),
    dueDate: new Date("2026-04-14")
  }
];

console.log("=== Завдання 1: Базові типи, інтерфейси та type aliases ===");

for (const task of tasks) {
  console.log(formatTask(task));
}

console.log(getTaskStats(tasks));