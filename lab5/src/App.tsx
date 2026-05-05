import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { todosApi } from "./api/todos"

export default function App() {
  const [title, setTitle] = useState("")

  const queryClient = useQueryClient()

  //  GET todos
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["todos"],
    queryFn: todosApi.getAll,
  })

  //  CREATE
  const createTodoMutation = useMutation({
    mutationFn: todosApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
      setTitle("")
    },
  })

  //  UPDATE (checkbox)
  const updateTodoMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      todosApi.update(id, { completed }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })

  //  DELETE
  const deleteTodoMutation = useMutation({
    mutationFn: todosApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })

  //  LOADING
  if (isLoading) {
    return <div>Завантаження...</div>
  }

  //  ERROR
  if (isError) {
    return <div>Помилка: {(error as Error).message}</div>
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Todos</h1>

      {/*  CREATE */}
      <div style={{ marginBottom: 20 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Нове завдання"
        />

        <button
          onClick={() => {
            if (!title.trim()) return

            createTodoMutation.mutate({
              title,
              completed: false,
            })
          }}
          disabled={createTodoMutation.isPending}
        >
          {createTodoMutation.isPending ? "Додавання..." : "Додати"}
        </button>
      </div>

      {/*  LIST */}
      <ul>
        {data?.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 10,
            }}
          >
            {/*  checkbox update */}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                updateTodoMutation.mutate({
                  id: todo.id,
                  completed: !todo.completed,
                })
              }
            />

            {/* text */}
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.title}
            </span>

            {/*  delete */}
            <button
              onClick={() => deleteTodoMutation.mutate(todo.id)}
              style={{ marginLeft: "auto" }}
            >
              Видалити
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}