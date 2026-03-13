interface ConfirmDialogProps {
  open: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onCancel}
    >
      <div
        className="bg-[#2d2d2d] text-white p-6 rounded-xl max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="mb-4">{title}</p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded bg-[#dc3545] text-white font-semibold hover:bg-[#c82333] transition-colors"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded bg-[#555454] text-white font-semibold hover:bg-[#666] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
