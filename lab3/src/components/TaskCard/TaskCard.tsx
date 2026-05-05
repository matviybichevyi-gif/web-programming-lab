import type { Task, TaskStatus } from "../../types/task";
import styles from "./TaskCard.module.css";
import clsx from "clsx";

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

export default function TaskCard({ task, onDelete, onStatusChange }: Props) {
  return (
    <div
      className={clsx(styles.card, {
        [styles.cardLow]: task.priority === "low",
        [styles.cardMedium]: task.priority === "medium",
        [styles.cardHigh]: task.priority === "high",
      })}
    >
      <h3 className={styles.title}>{task.title}</h3>

      {task.description && <p>{task.description}</p>}

      <p className={styles.meta}>
        {task.priority} | {task.createdAt.toLocaleDateString()}
      </p>

      <div className={styles.actions}>
        <select
          value={task.status}
          onChange={(e) =>
            onStatusChange(task.id, e.target.value as TaskStatus)
          }
        >
          <option value="todo">Нові</option>
          <option value="in-progress">В роботі</option>
          <option value="done">Виконані</option>
        </select>

        <button onClick={() => onDelete(task.id)}>Видалити</button>
      </div>
    </div>
  );
}