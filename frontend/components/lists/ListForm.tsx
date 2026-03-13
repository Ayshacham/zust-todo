import { Input } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';

interface ListFormProps {
	mode: 'create' | 'edit';
	value: string;
	onChange: (value: string) => void;
	onSubmit: (e: React.FormEvent) => void;
	onCancel?: () => void;
}

export function ListForm({
	mode,
	value,
	onChange,
	onSubmit,
	onCancel,
}: ListFormProps) {
	const title = mode === 'create' ? 'Create List' : 'Edit List';

	const showCancel = mode === 'edit' && onCancel;

	return (
		<>
			<h2 className="text-xl font-semibold mb-5">{title}</h2>
			<form onSubmit={onSubmit} className="flex flex-col gap-3">
				<Input
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder="List name"
					required
				/>
				<div className={showCancel ? 'flex gap-6' : ''}>
					<Button
						type="submit"
						variant="primary"
						size="md"
						className={showCancel ? 'flex-1' : 'w-full'}
					>
						{mode === 'create' ? 'Create' : 'Save'}
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
