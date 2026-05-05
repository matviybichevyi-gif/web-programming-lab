import { useState } from "react";
import { useNavigate } from "react-router";
import type { Task, TaskPriority } from "../../types/task";
import styles from "./NewTaskPage.module.css";

interface Props {
  onAdd: (task: Task) => void;
}

export default function NewTaskPage({ onAdd }: Props) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] =
    useState<TaskPriority>("medium");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (title.trim().length < 3) {
      setError("Мінімум 3 символи");
      return;
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      status: "todo",
      priority,
      createdAt: new Date(),
    };

    onAdd(newTask);
    navigate("/tasks");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📝 Нова задача</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label>Назва *</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {error && <span className={styles.error}>{error}</span>}
        </div>

        <div className={styles.field}>
          <label>Опис</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Пріоритет</label>
          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as TaskPriority)
            }
          >
            <option value="low">🟢 Низький</option>
            <option value="medium">🟡 Середній</option>
            <option value="high">🔴 Високий</option>
          </select>
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.submitBtn}>
            Створити
          </button>

          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => navigate("/tasks")}
          >
            Скасувати
          </button>
        </div>
      </form>
    </div>
  );
}