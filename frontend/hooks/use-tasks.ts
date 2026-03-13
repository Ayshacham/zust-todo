import { useCallback, useEffect, useState } from "react";

import { CreateTaskProps, UpdateTaskProps, TodoTask, TodoList } from "@/types/todo";
import { useFetchWithState } from "./use-fetch-with-state";
import { parseResponse, toApiDate } from "@/lib/utils";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";
const JSON_HEADERS = { "Content-Type": "application/json" };

export const useTasks = (listId: number) => {
  const [tasks, setTasks] = useState<TodoTask[]>([]);
  const [todoList, setTodoList] = useState<TodoList | null>(null);

  const { fetchWithState, isLoading, error } = useFetchWithState();

  const fetchTodoList = useCallback(() =>
    fetchWithState(async () => {
      const data = await parseResponse(
        await fetch(`${BASE_URL}/api/lists/${listId}/`),
        "Failed to fetch list"
      );
      setTodoList(data);
    }), [fetchWithState, listId]);

  const getTask = (id: number) =>
    fetchWithState(async () => {
      const data = await parseResponse(
        await fetch(`${BASE_URL}/api/tasks/?list=${listId}&id=${id}`),
        "Failed to fetch task"
      );
      return data;
    });

  const getTasks = useCallback(() =>
    fetchWithState(async () => {
      const data = await parseResponse(
        await fetch(`${BASE_URL}/api/tasks/?list=${listId}`),
        "Failed to fetch lists"
      );
      setTasks(data);
    }), [fetchWithState, listId]);

  const createTask = ({ title, description, due_date }: CreateTaskProps) =>
    fetchWithState(async () => {
      const data = await parseResponse(
        await fetch(`${BASE_URL}/api/tasks/`, {
          method: "POST",
          headers: JSON_HEADERS,
          body: JSON.stringify({
            title,
            description,
            due_date: toApiDate(due_date ?? ''),
            list: listId,
          }),
        }),
        "Failed to create task"
      );
      setTasks((prev) => [...prev, data]);
    });

  const updateTask = ({ id, ...fields }: UpdateTaskProps) =>
    fetchWithState(async () => {
      const body = Object.fromEntries(
        Object.entries(fields).filter(([, v]) => v !== undefined)
      );
      const data = await parseResponse(
        await fetch(`${BASE_URL}/api/tasks/${id}/`, {
          method: "PATCH",
          headers: JSON_HEADERS,
          body: JSON.stringify({
            ...body,
            ...(fields.due_date !== undefined && { due_date: toApiDate(fields.due_date) }),
          }),
        }),
        "Failed to update task"
      );
      setTasks((prev) => prev.map((t) => (t.id === id ? data : t)));
    });

  const deleteTask = (id: number) =>
    fetchWithState(async () => {
      const res = await fetch(`${BASE_URL}/api/tasks/${id}/`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete task");
      setTasks((prev) => prev.filter((t) => t.id !== id));
    });

  useEffect(() => {
    Promise.all([fetchTodoList(), getTasks()]);
  }, [fetchTodoList, getTasks, listId]);

  return { tasks, getTask, todoList, isLoading, error, createTask, updateTask, deleteTask };
};