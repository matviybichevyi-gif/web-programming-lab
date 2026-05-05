import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./TaskForm.module.css";

const taskSchema = z.object({
  title: z
    .string()
    .min(3, "Мінімум 3 символи")
    .max(100, "Максимум 100 символів"),
  description: z.string().max(500, "Максимум 500 символів"),
  priority: z.enum(["low", "medium", "high"], {
    message: "Оберіть пріоритет",
  }),
});

export type TaskFormData = z.infer<typeof taskSchema>;

interface Props {
  onSubmit: (data: TaskFormData) => void;
}

export default function TaskForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const submitHandler = (data: TaskFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
      <div className={styles.field}>
        <label>Заголовок</label>
        <input {...register("title")} />
        {errors.title && <span className={styles.error}>{errors.title.message}</span>}
      </div>

      <div className={styles.field}>
        <label>Опис</label>
        <textarea {...register("description")} />
        {errors.description && (
          <span className={styles.error}>{errors.description.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label>Пріоритет</label>
        <select {...register("priority")}>
          <option value="">Оберіть пріоритет</option>
          <option value="low">Низький</option>
          <option value="medium">Середній</option>
          <option value="high">Високий</option>
        </select>
        {errors.priority && (
          <span className={styles.error}>{errors.priority.message}</span>
        )}
      </div>

      <button className={styles.submit} type="submit">
        Додати задачу
      </button>
    </form>
  );
}