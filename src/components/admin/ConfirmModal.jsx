import { AlertTriangle, X, Trash2 } from "lucide-react";

export default function ConfirmModal({
  open,
  title = "Xác nhận xóa",
  message = "Bạn có chắc chắn muốn thực hiện thao tác này?",
  itemName,
  onCancel,
  onConfirm,
  loading = false,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
              <AlertTriangle
                size={21}
                className="text-red-500"
              />
            </div>

            <h2 className="text-lg font-bold text-slate-800">
              {title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="px-6 py-6">
          <p className="text-sm leading-6 text-slate-600">
            {message}
          </p>

          {itemName && (
            <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
              <p className="text-xs font-medium text-red-400">
                Lịch trình sẽ bị xóa
              </p>

              <p className="mt-1 break-words text-sm font-semibold text-red-600">
                {itemName}
              </p>
            </div>
          )}

          <p className="mt-4 text-xs text-slate-400">
            Hành động này không thể hoàn tác.
          </p>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Hủy
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Đang xóa...
              </>
            ) : (
              <>
                <Trash2 size={17} />
                Xóa lịch trình
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
