'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

import { TodoTask } from '@/types/todo';

import { useTasks } from '@/hooks/use-tasks';

import { TaskForm } from '@/components/tasks/TaskForm';
import { TasksTable } from '@/components/tasks/TasksTable';

import { PageLayout } from '@/components/layout/PageLayout';

import { SidePanel } from '@/components/ui/SidePanel';
import { LinkButton } from '@/components/ui/LinkButton';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function TodoTasksPage() {
	const params = useParams();
	const listId = Number(params.id) || 1;

	const {
		tasks,
		todoList,
		called,
		isLoading,
		error,
		createTask,
		updateTask,
		deleteTask,
	} = useTasks(listId);

	const listName = todoList?.name || 'My List';

	const [editingTask, setEditingTask] = useState<Partial<TodoTask> | null>(
		null,
	);
	const [newTask, setNewTask] = useState({
		title: '',
		description: '',
		due_date: '',
	});
	const [taskToDelete, setTaskToDelete] = useState<TodoTask | null>(null);

	const handleCreate = (e: React.FormEvent) => {
		e.preventDefault();
		if (newTask.title.trim()) {
			createTask({
				title: newTask.title.trim(),
				description: newTask.description.trim(),
				due_date: newTask.due_date || '',
			});
			setNewTask({ title: '', description: '', due_date: '' });
		}
	};

	const handleUpdate = (e: React.FormEvent) => {
		e.preventDefault();
		if (editingTask?.id && editingTask.title?.trim()) {
			updateTask({
				id: editingTask.id,
				title: editingTask.title!.trim(),
				description: editingTask.description ?? '',
				due_date: editingTask.due_date ?? '',
			});
			setEditingTask(null);
		}
	};

	const toggleComplete = (taskId: number) => {
		updateTask({
			id: taskId,
			completed: !tasks.find((t) => t.id === taskId)?.completed,
		});
	};

	const confirmDelete = () => {
		if (taskToDelete) {
			deleteTask(taskToDelete.id);
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
			{error && <div className="text-red-500">{error.message}</div>}

			{!called && isLoading ? (
				<LoadingSpinner />
			) : (
				<div className="flex gap-6 max-w-6xl mx-auto">
					<TasksTable
						tasks={tasks}
						onToggleComplete={toggleComplete}
						onUpdate={(task) =>
							setEditingTask({
								id: task.id,
								title: task.title,
								description: task.description,
								due_date: task.due_date,
							})
						}
						onDelete={setTaskToDelete}
					/>
					<SidePanel>
						{editingTask ? (
							<TaskForm
								mode="edit"
								title={editingTask.title ?? ''}
								description={editingTask.description ?? ''}
								due_date={editingTask.due_date ?? ''}
								onTitleChange={(title) =>
									setEditingTask({ ...editingTask, title })
								}
								onDescriptionChange={(description) =>
									setEditingTask({ ...editingTask, description })
								}
								onDueDateChange={(due_date) =>
									setEditingTask({ ...editingTask, due_date })
								}
								onSubmit={handleUpdate}
								onCancel={() => setEditingTask(null)}
							/>
						) : (
							<TaskForm
								mode="create"
								title={newTask.title}
								description={newTask.description}
								due_date={newTask.due_date}
								onTitleChange={(title) => setNewTask({ ...newTask, title })}
								onDescriptionChange={(description) =>
									setNewTask({ ...newTask, description })
								}
								onDueDateChange={(due_date) =>
									setNewTask({ ...newTask, due_date })
								}
								onSubmit={handleCreate}
							/>
						)}
					</SidePanel>
				</div>
			)}

			<ConfirmDialog
				open={!!taskToDelete}
				title={
					taskToDelete
						? `Are you sure you want to delete "${taskToDelete.title}"?`
						: ''
				}
				onConfirm={confirmDelete}
				onCancel={() => setTaskToDelete(null)}
			/>
		</PageLayout>
	);
}
