import { TodoTask } from "@/types/todo";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface TasksTableProps {
  tasks: TodoTask[];
  onToggleComplete: (taskId: number) => void;
  onUpdate: (task: TodoTask) => void;
  onDelete: (task: TodoTask) => void;
}

export function TasksTable({
  tasks,
  onToggleComplete,
  onUpdate,
  onDelete,
}: TasksTableProps) {
  const cellClass = (completed: boolean) =>
    `p-3 text-[#c8c7c7] ${completed ? "line-through opacity-70" : ""}`;

  return (
    <div className="flex-1 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left p-3 border-b border-[#444343] w-12">
              Done
            </th>
            <th className="text-left p-3 border-b border-[#444343]">Title</th>
            <th className="text-left p-3 border-b border-[#444343]">
              Description
            </th>
            <th className="text-left p-3 border-b border-[#444343]">
              Due Date
            </th>
            <th className="text-left p-3 border-b border-[#444343]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-4 text-[#c8c7c7]">
                No tasks found
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr
                key={task.id}
                className={`border-b border-[#444343] ${
                  task.completed ? "opacity-70" : ""
                }`}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleComplete(task.id)}
                    className="w-[18px] h-[18px] cursor-pointer"
                  />
                </td>
                <td className={cellClass(task.completed)}>{task.title}</td>
                <td className={cellClass(task.completed)}>{task.description}</td>
                <td className={cellClass(task.completed)}>
                  {formatDate(task.dueDate)}
                </td>
                <td className="p-3 text-[#c8c7c7]">
                  <Button onClick={() => onUpdate(task)} className="mr-2">
                    Update
                  </Button>
                  <Button onClick={() => onDelete(task)}>Delete</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
