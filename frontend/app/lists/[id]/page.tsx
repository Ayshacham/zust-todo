"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { TodoTask } from "@/types/todo";
import { MOCK_TASKS, MOCK_LIST_NAMES } from "@/data/mock";
import { PageLayout } from "@/components/layout/PageLayout";
import { TasksTable } from "@/components/tasks/TasksTable";
import { TaskForm } from "@/components/tasks/TaskForm";
import { SidePanel } from "@/components/ui/SidePanel";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { LinkButton } from "@/components/ui/LinkButton";

export default function TodoTasksPage() {
  const params = useParams();
  const listId = Number(params.id) || 1;
  const listName = MOCK_LIST_NAMES[listId] || "My List";

  const [tasks, setTasks] = useState<TodoTask[]>(
    MOCK_TASKS[listId] ?? MOCK_TASKS[1] ?? []
  );
  const [editingTask, setEditingTask] = useState<Partial<TodoTask> | null>(null);
  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "" });
  const [taskToDelete, setTaskToDelete] = useState<TodoTask | null>(null);

  const nextId = () =>
    tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.title.trim()) {
      setTasks([
        ...tasks,
        {
          id: nextId(),
          title: newTask.title.trim(),
          description: newTask.description.trim(),
          dueDate: newTask.dueDate || "",
          completed: false,
        },
      ]);
      setNewTask({ title: "", description: "", dueDate: "" });
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask?.id && editingTask.title?.trim()) {
      setTasks(
        tasks.map((t) =>
          t.id === editingTask.id
            ? {
                ...t,
                title: editingTask.title!.trim(),
                description: editingTask.description ?? "",
                dueDate: editingTask.dueDate ?? "",
              }
            : t
        )
      );
      setEditingTask(null);
    }
  };

  const toggleComplete = (taskId: number) => {
    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      setTasks(tasks.filter((t) => t.id !== taskToDelete.id));
      setTaskToDelete(null);
    }
  };

  return (
    <PageLayout
      title={`Tasks - ${listName}`}
      backLink={
        <LinkButton href="/" variant="primary">
          ← Back to Lists
        </LinkButton>
      }
    >
      <div className="flex gap-6 max-w-6xl mx-auto">
        <TasksTable
          tasks={tasks}
          onToggleComplete={toggleComplete}
          onUpdate={(task) =>
            setEditingTask({
              id: task.id,
              title: task.title,
              description: task.description,
              dueDate: task.dueDate,
            })
          }
          onDelete={setTaskToDelete}
        />
        <SidePanel>
          {editingTask ? (
            <TaskForm
              mode="edit"
              title={editingTask.title ?? ""}
              description={editingTask.description ?? ""}
              dueDate={editingTask.dueDate ?? ""}
              onTitleChange={(title) => setEditingTask({ ...editingTask, title })}
              onDescriptionChange={(description) =>
                setEditingTask({ ...editingTask, description })
              }
              onDueDateChange={(dueDate) =>
                setEditingTask({ ...editingTask, dueDate })
              }
              onSubmit={handleUpdate}
              onCancel={() => setEditingTask(null)}
            />
          ) : (
            <TaskForm
              mode="create"
              title={newTask.title}
              description={newTask.description}
              dueDate={newTask.dueDate}
              onTitleChange={(title) => setNewTask({ ...newTask, title })}
              onDescriptionChange={(description) =>
                setNewTask({ ...newTask, description })
              }
              onDueDateChange={(dueDate) => setNewTask({ ...newTask, dueDate })}
              onSubmit={handleCreate}
            />
          )}
        </SidePanel>
      </div>

      <ConfirmDialog
        open={!!taskToDelete}
        title={
          taskToDelete
            ? `Are you sure you want to delete "${taskToDelete.title}"?`
            : ""
        }
        onConfirm={confirmDelete}
        onCancel={() => setTaskToDelete(null)}
      />
    </PageLayout>
  );
}
