import { useCallback, useEffect, useState } from "react";

import { TodoList } from "@/types/todo";

import { parseResponse } from "@/lib/utils";
import { fetchWithAuth, API_BASE_URL } from "@/lib/api";

import { useFetchWithState } from "./use-fetch-with-state";

const JSON_HEADERS = { "Content-Type": "application/json" };

export const useTodoLists = () => {
  const [called, setCalled] = useState(false);
  const [lists, setLists] = useState<TodoList[]>([]);
  const { fetchWithState, isLoading, error } = useFetchWithState();

  const getTodoLists = useCallback(() =>
    fetchWithState(async () => {
      const data = await parseResponse(
        await fetchWithAuth(`${API_BASE_URL}/api/lists/`),
        "Failed to fetch lists"
      );
      setLists(data);
      setCalled(true);
    }), [fetchWithState]);

  const createTodoList = (name: string) =>
    fetchWithState(async () => {
      const data = await parseResponse(
        await fetchWithAuth(`${API_BASE_URL}/api/lists/`, {
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
        await fetchWithAuth(`${API_BASE_URL}/api/lists/${id}/`, {
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
      const res = await fetchWithAuth(`${API_BASE_URL}/api/lists/${id}/`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete list");
      setLists((prev) => prev.filter((l) => l.id !== id));
    });

  useEffect(() => { if (!called) { getTodoLists(); } }, [called, getTodoLists]);

  return { lists, called, isLoading, error, createTodoList, updateTodoList, deleteTodoList };
};