import { Trash2 } from "lucide-react";

export default function DeleteBannerModal({ banner, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
          <Trash2 size={22} />
        </div>

        <h3 className="mt-5 text-lg font-bold text-slate-900">Xóa Banner?</h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Bạn có chắc muốn xóa banner{" "}
          <span className="font-semibold text-slate-700">"{banner.title}"</span>
          ? Hành động này không thể hoàn tác.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Hủy
          </button>

          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/20 hover:bg-red-600"
          >
            Xóa Banner
          </button>
        </div>
      </div>
    </div>
  );
}
