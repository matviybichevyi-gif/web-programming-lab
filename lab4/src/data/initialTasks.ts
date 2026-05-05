import type { Task } from "../types/task";

export const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Створити UI",
    description: "Зробити дизайн",
    status: "todo",
    priority: "high",
    createdAt: new Date("2025-03-01"),
  },
  {
    id: "2",
    title: "Написати API",
    description: "Бэкенд логіка",
    status: "in-progress",
    priority: "medium",
    createdAt: new Date("2025-03-02"),
  },
  {
    id: "3",
    title: "Тест",
    description: "Перевірка багів",
    status: "done",
    priority: "low",
    createdAt: new Date("2025-03-03"),
  },
  {
    id: "4",
    title: "Деплой",
    description: "Встановити на сервер",
    status: "todo",
    priority: "high",
    createdAt: new Date("2025-03-04"),
  },
];