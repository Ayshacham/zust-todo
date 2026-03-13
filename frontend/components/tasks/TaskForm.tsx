import { Input, TextArea } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';

interface TaskFormProps {
	mode: 'create' | 'edit';
	title: string;
	description: string;
	due_date: string;
	onTitleChange: (v: string) => void;
	onDescriptionChange: (v: string) => void;
	onDueDateChange: (v: string) => void;
	onSubmit: (e: React.FormEvent) => void;
	onCancel?: () => void;
}

export function TaskForm({
	mode,
	title,
	description,
	due_date,
	onTitleChange,
	onDescriptionChange,
	onDueDateChange,
	onSubmit,
	onCancel,
}: TaskFormProps) {
	const formTitle = mode === 'create' ? 'Add Task' : 'Edit Task';
	const submitLabel = mode === 'create' ? 'Add Task' : 'Save';
	const showCancel = mode === 'edit' && onCancel;

	return (
		<>
			<h2 className="text-xl font-semibold mb-5">{formTitle}</h2>
			<form onSubmit={onSubmit} className="flex flex-col gap-3">
				<Input
					type="text"
					value={title}
					onChange={(e) => onTitleChange(e.target.value)}
					placeholder="Title"
					required
				/>
				<TextArea
					value={description}
					onChange={(e) => onDescriptionChange(e.target.value)}
					placeholder="Description"
					rows={3}
				/>
				<Input
					type="date"
					value={due_date}
					onChange={(e) => onDueDateChange(e.target.value)}
				/>
				<div className={showCancel ? 'flex gap-6' : ''}>
					<Button
						type="submit"
						variant="primary"
						size="md"
						className={showCancel ? 'flex-1' : ''}
					>
						{submitLabel}
					</Button>
					{showCancel && (
						<Button
							type="button"
							variant="cancel"
							size="md"
							className="flex-1"
							onClick={onCancel}
						>
							Cancel
						</Button>
					)}
				</div>
			</form>
		</>
	);
}
