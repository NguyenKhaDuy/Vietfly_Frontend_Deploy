import { AlertTriangle, Trash2, X, Loader2 } from "lucide-react";

export default function DeleteFeedbackModal({
  feedback,
  onClose,
  onConfirm,
  deleting = false,
}) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <AlertTriangle size={21} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">Xóa feedback</h2>

              <p className="mt-1 text-sm text-slate-500">Xác nhận thao tác</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="px-6 py-6">
          <p className="text-sm leading-6 text-slate-600">
            Bạn có chắc chắn muốn xóa feedback của{" "}
            <span className="font-semibold text-slate-900">
              {feedback.fullname}
            </span>
            ?
          </p>

          <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-4">
            <p className="text-xs leading-5 text-red-600">
              Feedback sau khi xóa sẽ không còn hiển thị trên hệ thống.
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Hủy
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-semibold text-white shadow-md shadow-red-600/20 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleting ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Đang xóa...
              </>
            ) : (
              <>
                <Trash2 size={17} />
                Xóa feedback
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
