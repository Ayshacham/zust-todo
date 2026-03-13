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

export interface CreateTaskProps {
  title: string;
  description: string;
  due_date?: string;
}

export interface UpdateTaskProps {
  id: number;
  title?: string;
  description?: string;
  due_date?: string;
}
