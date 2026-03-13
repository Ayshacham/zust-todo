'use client';

import { useState } from 'react';

import { TodoList } from '@/types/todo';

import { useTodoLists } from '@/hooks/use-todo-lists';

import { ListForm } from '@/components/lists/ListForm';
import { ListsTable } from '@/components/lists/ListsTable';

import { PageLayout } from '@/components/layout/PageLayout';

import { SidePanel } from '@/components/ui/SidePanel';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function TodoListsPage() {
	const {
		lists,
		called,
		isLoading,
		error,
		createTodoList,
		updateTodoList,
		deleteTodoList,
	} = useTodoLists();

	const [editingList, setEditingList] = useState<Pick<
		TodoList,
		'id' | 'name'
	> | null>(null);
	const [newListName, setNewListName] = useState('');
	const [listToDelete, setListToDelete] = useState<TodoList | null>(null);

	const handleCreate = (e: React.FormEvent) => {
		e.preventDefault();
		if (newListName.trim()) {
			createTodoList(newListName.trim());
			setNewListName('');
		}
	};

	const handleUpdate = (e: React.FormEvent) => {
		e.preventDefault();
		if (editingList?.name.trim()) {
			updateTodoList(editingList.id, editingList.name);
			setEditingList(null);
		}
	};

	const confirmDelete = () => {
		if (listToDelete) {
			deleteTodoList(listToDelete.id as number);
			setListToDelete(null);
		}
	};

	return (
		<PageLayout title="Todo Lists">
			{error && <div className="text-red-500">{error.message}</div>}

			{!called && isLoading ? (
				<LoadingSpinner />
			) : (
				<div className="flex gap-6 max-w-6xl mx-auto">
					<ListsTable
						lists={lists}
						onUpdate={(list) =>
							setEditingList({ id: list.id, name: list.name })
						}
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
			)}

			<ConfirmDialog
				open={!!listToDelete}
				title={
					listToDelete
						? `Are you sure you want to delete "${listToDelete.name}" and all its tasks?`
						: ''
				}
				onConfirm={confirmDelete}
				onCancel={() => setListToDelete(null)}
			/>
		</PageLayout>
	);
}
