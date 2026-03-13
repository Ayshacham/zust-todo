import { useEffect, useState } from "react";

import { CreateTaskProps, UpdateTaskProps, TodoTask } from "@/types/todo";
import { useFetchWithState } from "./use-fetch-with-state";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";
const JSON_HEADERS = { "Content-Type": "application/json" };

export const useTasks = (listId: number) => {
  const [tasks, setTasks] = useState<TodoTask[]>([]);
  const { fetchWithState, isLoading, error } = useFetchWithState();

  const parseResponse = async (res: Response, errorMsg: string) => {
    if (!res.ok) throw new Error(errorMsg);
    return res.json();
  };

  const getTask = (id: number) =>
    fetchWithState(async () => {
      const data = await parseResponse(
        await fetch(`${BASE_URL}/api/tasks/?list=${listId}&id=${id}`),
        "Failed to fetch task"
      );
      return data;
    });

  const getTasks = (listId: number) =>
    fetchWithState(async () => {
      const data = await parseResponse(
        await fetch(`${BASE_URL}/api/tasks/?list=${listId}`),
        "Failed to fetch lists"
      );
      setTasks(data);
    });

  const createTask = ({ title, description, due_date }: CreateTaskProps) =>
    fetchWithState(async () => {
      const data = await parseResponse(
        await fetch(`${BASE_URL}/api/tasks/`, {
          method: "POST",
          headers: JSON_HEADERS,
          body: JSON.stringify({ title, description, due_date: due_date ?? null }),
        }),
        "Failed to create task"
      );
      setTasks((prev) => [...prev, data]);
    });

  const updateTask = ({ id, title, description, due_date }: UpdateTaskProps) =>
    fetchWithState(async () => {
      const data = await parseResponse(
        await fetch(`${BASE_URL}/api/tasks/${id}/`, {
          method: "PUT",
          headers: JSON_HEADERS,
          body: JSON.stringify({ title, description, due_date: due_date ?? null }),
        }),
        "Failed to update task"
      );
      setTasks((prev) => prev.map((l) => (l.id === id ? data : l)));
    });

  const deleteTask = (id: number) =>
    fetchWithState(async () => {
      const res = await fetch(`${BASE_URL}/api/tasks/${id}/`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete task");
      setTasks((prev) => prev.filter((t) => t.id !== id));
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { getTasks(listId); }, [listId]);

  return { tasks, getTask, isLoading, error, createTask, updateTask, deleteTask };
};