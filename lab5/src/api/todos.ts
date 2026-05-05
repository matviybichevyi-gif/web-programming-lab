import axios from "axios"
import type { Todo, CreateTodoDto, UpdateTodoDto } from "../types/todo"

const API_URL = "http://localhost:3001/todos"

export const todosApi = {
  getAll: async (): Promise<Todo[]> => {
    const res = await axios.get(API_URL)
    return res.data
  },

  create: async (data: CreateTodoDto): Promise<Todo> => {
    const res = await axios.post(API_URL, data)
    return res.data
  },

  update: async (id: number, data: UpdateTodoDto): Promise<Todo> => {
    const res = await axios.patch(`${API_URL}/${id}`, data)
    return res.data
  },

  remove: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`)
  }
}