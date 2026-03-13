import { useEffect, useState } from "react";

import { TodoList } from "@/types/todo";
import { useFetchWithState } from "./use-fetch-with-state";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";
const JSON_HEADERS = { "Content-Type": "application/json" };

export const useTodoLists = () => {
  const [lists, setLists] = useState<TodoList[]>([]);
  const { fetchWithState, isLoading, error } = useFetchWithState();

  const parseResponse = async (res: Response, errorMsg: string) => {
    if (!res.ok) throw new Error(errorMsg);
    return res.json();
  };

  const getTodoLists = () =>
    fetchWithState(async () => {
      const data = await parseResponse(
        await fetch(`${BASE_URL}/api/lists/`),
        "Failed to fetch lists"
      );
      setLists(data);
    });

  const createTodoList = (name: string) =>
    fetchWithState(async () => {
      const data = await parseResponse(
        await fetch(`${BASE_URL}/api/lists/`, {
          method: "POST",
          headers: JSON_HEADERS,
          body: JSON.stringify({ name }),
        }),
        "Failed to create list"
      );
      setLists((prev) => [...prev, data]);
    });

  const updateTodoList = (id: number, name: string) =>
    fetchWithState(async () => {
      const data = await parseResponse(
        await fetch(`${BASE_URL}/api/lists/${id}/`, {
          method: "PUT",
          headers: JSON_HEADERS,
          body: JSON.stringify({ name }),
        }),
        "Failed to update list"
      );
      setLists((prev) => prev.map((l) => (l.id === id ? data : l)));
    });

  const deleteTodoList = (id: number) =>
    fetchWithState(async () => {
      const res = await fetch(`${BASE_URL}/api/lists/${id}/`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete list");
      setLists((prev) => prev.filter((l) => l.id !== id));
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { getTodoLists(); }, []);

  return { lists, isLoading, error, createTodoList, updateTodoList, deleteTodoList };
};