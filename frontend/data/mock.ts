import { TodoList, TodoTask } from "@/types/todo";

const dateStr = (d: Date) =>
  d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const MOCK_LISTS: TodoList[] = [
  { id: 1, name: "Work", createdAt: dateStr(new Date("2026-03-10")), updatedAt: dateStr(new Date("2026-03-13")) },
  { id: 2, name: "Personal", createdAt: dateStr(new Date("2026-03-11")), updatedAt: dateStr(new Date("2026-03-12")) },
  { id: 3, name: "Shopping", createdAt: dateStr(new Date("2026-03-13")), updatedAt: dateStr(new Date("2026-03-13")) },
];

export const MOCK_TASKS: Record<number, TodoTask[]> = {
  1: [
    { id: 1, title: "Review PR", description: "Check the merge request", dueDate: "2026-03-15", completed: false },
    { id: 2, title: "Team standup", description: "Daily sync at 10am", dueDate: "2026-03-14", completed: true },
  ],
  2: [
    { id: 3, title: "Grocery shopping", description: "Milk, eggs, bread", dueDate: "2026-03-14", completed: false },
  ],
  3: [],
};

export const MOCK_LIST_NAMES: Record<number, string> = {
  1: "Work",
  2: "Personal",
  3: "Shopping",
};
