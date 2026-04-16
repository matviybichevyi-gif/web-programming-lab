import { VARIANT } from "./config";

// Типы
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

// API Response generic
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

// success response
function createSuccessResponse<T>(data: T): ApiResponse<T> {
  return {
    data,
    status: 200,
    message: "Success",
    timestamp: new Date(),
  };
}

// error response
function createErrorResponse<T>(message: string): ApiResponse<T | null> {
  return {
    data: null,
    status: 400,
    message,
    timestamp: new Date(),
  };
}

// DTO types
type CreateTaskDto = Omit<Task, "id" | "createdAt">;

type UpdateTaskDto = Partial<Omit<Task, "id" | "createdAt">>;

// данные
const tasks: Task[] = [
  {
    id: 1 + VARIANT,
    title: "Розробити API",
    description: "Реалізувати REST API для управління задачами",
    status: "in_progress",
    priority: "high",
    assignee: "Іван Петренко",
    createdAt: new Date("2025-01-10"),
    dueDate: new Date("2025-02-01"),
  },
  {
    id: 2 + VARIANT,
    title: "Написати тести",
    description: "Покрити unit-тестами основну логіку",
    status: "todo",
    priority: "medium",
    assignee: null,
    createdAt: new Date("2025-01-12"),
    dueDate: new Date("2025-02-15"),
  },
  {
    id: 3 + VARIANT,
    title: "Налаштувати БД",
    description: "Підключити PostgreSQL, виконати міграції",
    status: "done",
    priority: "critical",
    assignee: "Олена Коваль",
    createdAt: new Date("2025-01-05"),
    dueDate: new Date("2025-01-20"),
  },
  {
    id: 4 + VARIANT,
    title: "Оновити документацію",
    description: "Описати API у Swagger",
    status: "todo",
    priority: "low",
    assignee: null,
    createdAt: new Date("2025-01-15"),
    dueDate: null,
  },
  {
    id: 5 + VARIANT,
    title: "Code review",
    description: "Перевірити pull request від команди",
    status: "cancelled",
    priority: "medium",
    assignee: "Андрій Лисенко",
    createdAt: new Date("2025-01-18"),
    dueDate: new Date("2025-01-25"),
  },
];

// generic filter
function filterTasks<K extends keyof Task>(
  tasks: Task[],
  key: K,
  value: Task[K]
): Task[] {
  return tasks.filter((task) => task[key] === value);
}

// DEMO
console.log("=== Завдання 2: Generics та Utility Types ===");
console.log("Варіант:", VARIANT);

// success response
const success = createSuccessResponse(tasks);
console.log("Success response:", success);

// error response
const error = createErrorResponse<Task[]>("Something went wrong");
console.log("Error response:", error);

// filter examples
console.log("Filtered by status(todo):", filterTasks(tasks, "status", "todo"));
console.log("Filtered by priority(high):", filterTasks(tasks, "priority", "high"));