export interface TodoList {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoTask {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}
