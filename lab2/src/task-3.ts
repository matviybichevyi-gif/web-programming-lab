export {};

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

class TaskManager {
  #tasks: Task[] = [];
  #nextId: number = 1;

  constructor(initialTasks: Task[] = []) {
    this.#tasks = [...initialTasks];

    // корректируем nextId
    this.#nextId =
      initialTasks.length > 0
        ? Math.max(...initialTasks.map(t => t.id)) + 1
        : 1;
  }

  addTask(dto: Omit<Task, "id" | "createdAt">): Task {
    const task: Task = {
      ...dto,
      id: this.#nextId++,
      createdAt: new Date(),
    };

    this.#tasks.push(task);
    return task;
  }

  updateTask(
    id: number,
    updates: Partial<Omit<Task, "id" | "createdAt">>
  ): Task | null {
    const task = this.#tasks.find(t => t.id === id);
    if (!task) return null;

    Object.assign(task, updates);
    return task;
  }

  deleteTask(id: number): boolean {
    const index = this.#tasks.findIndex(t => t.id === id);
    if (index === -1) return false;

    this.#tasks.splice(index, 1);
    return true;
  }

  get tasks(): Task[] {
    return [...this.#tasks];
  }

  get count(): number {
    return this.#tasks.length;
  }

  getById(id: number): Task | undefined {
    return this.#tasks.find(t => t.id === id);
  }
}

class FilteredTaskManager extends TaskManager {
  getByStatus(status: Status): Task[] {
    return this.tasks.filter(t => t.status === status);
  }

  getByPriority(priority: Priority): Task[] {
    return this.tasks.filter(t => t.priority === priority);
  }

  getByAssignee(assignee: string): Task[] {
    return this.tasks.filter(t => t.assignee === assignee);
  }

  getOverdue(): Task[] {
    const now = new Date();

    return this.tasks.filter(
      t =>
        t.dueDate !== null &&
        t.dueDate < now &&
        t.status !== "done" &&
        t.status !== "cancelled"
    );
  }
}

console.log("=== Завдання 3: Класи та модифікатори доступу ===");

const manager = new FilteredTaskManager();

const task1 = manager.addTask({
  title: "Розробити API",
  description: "REST API для задач",
  status: "in_progress",
  priority: "high",
  assignee: "Іван",
  dueDate: new Date("2025-02-01"),
});

console.log("Додано:", task1);
console.log("Кількість задач:", manager.count);

const task2 = manager.addTask({
  title: "Написати тести",
  description: "Unit tests",
  status: "todo",
  priority: "medium",
  assignee: "Олена",
  dueDate: new Date("2025-01-10"),
});

const task3 = manager.addTask({
  title: "Документація",
  description: "Swagger docs",
  status: "done",
  priority: "low",
  assignee: "Іван",
  dueDate: new Date("2025-01-05"),
});

console.log("Усі задачі:", manager.tasks);

// update
console.log("Оновлення task2:");
console.log(
  manager.updateTask(task2.id, { status: "in_progress", priority: "high" })
);

// getById
console.log("Знайти по ID:", manager.getById(task1.id));

// filters
console.log("По статусу todo:", manager.getByStatus("todo"));
console.log("По пріоритету high:", manager.getByPriority("high"));
console.log("По виконавцю Іван:", manager.getByAssignee("Іван"));
console.log("Просрочені:", manager.getOverdue());

// delete
console.log("Видалення task3:", manager.deleteTask(task3.id));
console.log("Кількість після видалення:", manager.count);