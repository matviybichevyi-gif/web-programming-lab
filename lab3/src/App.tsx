import { useState } from "react";
import type { Task, TaskStatus } from "./types/task";
import type { TaskFormData } from "./components/TaskForm/TaskForm";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import styles from "./App.module.css";

const VARIANT = 29;

const INITIAL_TASKS: Task[] = [
  {
    id: `task-${VARIANT}-1`,
    title: `Задача А-${VARIANT}`,
    description: "Налаштування середовища",
    status: "done",
    priority: "high",
    createdAt: new Date(),
  },
  {
    id: `task-${VARIANT}-2`,
    title: `Задача Б-${VARIANT}`,
    description: "Документація React",
    status: "in-progress",
    priority: "medium",
    createdAt: new Date(),
  },
  {
    id: `task-${VARIANT}-3`,
    title: `Задача В-${VARIANT}`,
    description: "",
    status: "todo",
    priority: "low",
    createdAt: new Date(),
  },
];

function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [filter, setFilter] = useState<TaskStatus | "all">("all");

  const handleAddTask = (data: TaskFormData) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      priority: data.priority,
      status: "todo",
      createdAt: new Date(),
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleStatusChange = (id: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <div className={styles.app}>
      <header>
        <h1>Task Manager</h1>
      </header>

      <div className={styles.layout}>
        <TaskForm onSubmit={handleAddTask} />

        <div>
          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as TaskStatus | "all")
            }
          >
            <option value="all">Усі</option>
            <option value="todo">Нові</option>
            <option value="in-progress">В роботі</option>
            <option value="done">Виконані</option>
          </select>

          <TaskList
            tasks={filteredTasks}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;