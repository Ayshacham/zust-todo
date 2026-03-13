import { TodoList } from '@/types/todo';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';
import { formatDate } from '@/lib/utils';

interface ListsTableProps {
	lists: TodoList[];
	onUpdate: (list: TodoList) => void;
	onDelete: (list: TodoList) => void;
}

export function ListsTable({ lists, onUpdate, onDelete }: ListsTableProps) {
	return (
		<div className="flex-1 overflow-x-auto">
			<table className="w-full border-collapse">
				<thead>
					<tr>
						<th className="text-left p-3 border-b border-[#444343]">Name</th>
						<th className="text-left p-3 border-b border-[#444343]">
							Created At
						</th>
						<th className="text-left p-3 border-b border-[#444343]">
							Updated At
						</th>
						<th className="text-left p-3 border-b border-[#444343]">Actions</th>
					</tr>
				</thead>
				<tbody>
					{lists.length === 0 ? (
						<tr>
							<td colSpan={4} className="p-4 text-[#c8c7c7]">
								No todo lists found
							</td>
						</tr>
					) : (
						lists.map((list) => (
							<tr key={list.id} className="border-b border-[#444343]">
								<td className="p-3 text-[#c8c7c7]">{list.name}</td>
								<td className="p-3 text-[#c8c7c7]">
									{formatDate(list.created_at)}
								</td>
								<td className="p-3 text-[#c8c7c7]">
									{formatDate(list.updated_at)}
								</td>
								<td className="p-3 text-[#c8c7c7]">
									<LinkButton href={`/lists/${list.id}`} className="mr-2">
										View
									</LinkButton>
									<Button onClick={() => onUpdate(list)} className="mr-2">
										Update
									</Button>
									<Button onClick={() => onDelete(list)}>Delete</Button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}
