"use client";

import { useState } from "react";
import { TodoList } from "@/types/todo";
import { MOCK_LISTS } from "@/data/mock";
import { PageLayout } from "@/components/layout/PageLayout";
import { ListsTable } from "@/components/lists/ListsTable";
import { ListForm } from "@/components/lists/ListForm";
import { SidePanel } from "@/components/ui/SidePanel";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

const dateStr = () =>
  new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function TodoListsPage() {
  const [lists, setLists] = useState<TodoList[]>(MOCK_LISTS);
  const [editingList, setEditingList] = useState<Pick<TodoList, "id" | "name"> | null>(null);
  const [newListName, setNewListName] = useState("");
  const [listToDelete, setListToDelete] = useState<TodoList | null>(null);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newListName.trim()) {
      setLists([
        ...lists,
        { id: lists.length + 1, name: newListName.trim(), createdAt: dateStr(), updatedAt: dateStr() },
      ]);
      setNewListName("");
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingList?.name.trim()) {
      setLists(
        lists.map((l) =>
          l.id === editingList.id ? { ...l, name: editingList.name.trim() } : l
        )
      );
      setEditingList(null);
    }
  };

  const confirmDelete = () => {
    if (listToDelete) {
      setLists(lists.filter((l) => l.id !== listToDelete.id));
      setListToDelete(null);
    }
  };

  return (
    <PageLayout title="Todo Lists">
      <div className="flex gap-6 max-w-6xl mx-auto">
        <ListsTable
          lists={lists}
          onUpdate={(list) => setEditingList({ id: list.id, name: list.name })}
          onDelete={setListToDelete}
        />
        <SidePanel>
          {editingList ? (
            <ListForm
              mode="edit"
              value={editingList.name}
              onChange={(name) => setEditingList({ ...editingList, name })}
              onSubmit={handleUpdate}
              onCancel={() => setEditingList(null)}
            />
          ) : (
            <ListForm
              mode="create"
              value={newListName}
              onChange={setNewListName}
              onSubmit={handleCreate}
            />
          )}
        </SidePanel>
      </div>

      <ConfirmDialog
        open={!!listToDelete}
        title={
          listToDelete
            ? `Are you sure you want to delete "${listToDelete.name}" and all its tasks?`
            : ""
        }
        onConfirm={confirmDelete}
        onCancel={() => setListToDelete(null)}
      />
    </PageLayout>
  );
}
